import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const N8N_FORM_URL = 'https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API to forward inquiry directly to the n8n webhook / form
app.post('/api/submit-trip', async (req, res) => {
  try {
    const { name, email, startingPoint, destination, travelers, travelDates, travelStyle, notes } = req.body;

    if (!name || !email || !startingPoint || !destination) {
      return res.status(400).json({
        success: false,
        error: 'Missing required travel inquiry fields (name, email, starting point, and destination).'
      });
    }

    // Format destination with optional enrichment details if provided
    let enrichedDestination = destination.trim();
    const additionalDetails: string[] = [];
    if (travelStyle) additionalDetails.push(`Style: ${travelStyle}`);
    if (travelers) additionalDetails.push(`Travelers: ${travelers}`);
    if (travelDates) additionalDetails.push(`Dates: ${travelDates}`);
    if (notes) additionalDetails.push(`Notes: ${notes}`);

    if (additionalDetails.length > 0) {
      enrichedDestination = `${destination.trim()} (${additionalDetails.join(' · ')})`;
    }

    // Prepare FormData matching n8n form schema
    const formData = new FormData();
    formData.append('field-0', name.trim());
    formData.append('field-1', email.trim());
    formData.append('field-2', startingPoint.trim());
    formData.append('field-3', enrichedDestination);

    const n8nResponse = await fetch(N8N_FORM_URL, {
      method: 'POST',
      body: formData,
    });

    const responseText = await n8nResponse.text();
    let responseJson = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // Non-json response
    }

    if (n8nResponse.ok) {
      return res.status(200).json({
        success: true,
        status: n8nResponse.status,
        message: 'Your bespoke travel inquiry has been received by the n8n travel agent workflow.',
        data: {
          name,
          email,
          startingPoint,
          destination,
          travelStyle: travelStyle || 'Bespoke Luxury',
          submittedAt: new Date().toISOString(),
          n8nDetails: responseJson || { status: 'submitted' }
        }
      });
    } else {
      console.error('n8n submission error status:', n8nResponse.status, responseText);
      return res.status(502).json({
        success: false,
        error: `Travel agent service responded with code ${n8nResponse.status}.`,
        details: responseText
      });
    }
  } catch (error: any) {
    console.error('Server error submitting to n8n:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected connection error occurred while contacting the travel agent workflow.',
      details: error?.message || String(error)
    });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Vespera Travel Studio API',
    n8nConfigured: true,
    n8nUrl: N8N_FORM_URL
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Serve static files from production build
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Vespera Travel Studio running on http://localhost:${PORT}`);
  });
}

startServer();
