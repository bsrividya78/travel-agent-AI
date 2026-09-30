const N8N_FORM_URL = 'https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d';

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, startingPoint, destination, travelers, travelDates, travelStyle, notes } = req.body || {};

    if (!name || !email || !startingPoint || !destination) {
      return res.status(400).json({
        success: false,
        error: 'Missing required travel inquiry fields (name, email, starting point, and destination).'
      });
    }

    let enrichedDestination = destination.trim();
    const additionalDetails: string[] = [];
    if (travelStyle) additionalDetails.push(`Style: ${travelStyle}`);
    if (travelers) additionalDetails.push(`Travelers: ${travelers}`);
    if (travelDates) additionalDetails.push(`Dates: ${travelDates}`);
    if (notes) additionalDetails.push(`Notes: ${notes}`);

    if (additionalDetails.length > 0) {
      enrichedDestination = `${destination.trim()} (${additionalDetails.join(' · ')})`;
    }

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
      // Ignore
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
      return res.status(502).json({
        success: false,
        error: `Travel agent service responded with code ${n8nResponse.status}.`,
        details: responseText
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: 'An unexpected connection error occurred while contacting the travel agent workflow.',
      details: error?.message || String(error)
    });
  }
}
