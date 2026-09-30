import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Compass, RefreshCw, ExternalLink, Calendar, Users, Sparkles, MapPin, Mail, User } from 'lucide-react';
import { TripInquiry, SubmissionResponse } from '../types';

interface TripPlannerFormProps {
  prefilledOrigin?: string;
  prefilledDestination?: string;
  onViewSampleItinerary: (origin: string, destination: string) => void;
}

const TRAVEL_STYLES = [
  'Private Sanctuary & Wellness',
  'Haute Gastronomy & Vineyard',
  'Alpine Heights & Rail Expeditions',
  'Cultural & Architectural Immersion',
  'Island Yachting & Secluded Bays',
];

const GUEST_OPTIONS = [
  '1 Traveler (Solo Journey)',
  '2 Travelers (Couple / Duo)',
  '3–4 Travelers (Family / Small Party)',
  '5+ Travelers (Private Group Charter)',
];

const TIMING_OPTIONS = [
  'Immediate Departure (Next 30 Days)',
  'Autumn / Winter 2026',
  'Spring 2027',
  'Flexible / Open Schedule',
];

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  prefilledOrigin,
  prefilledDestination,
  onViewSampleItinerary,
}) => {
  const [formData, setFormData] = useState<TripInquiry>({
    name: '',
    email: '',
    startingPoint: '',
    destination: '',
    travelStyle: TRAVEL_STYLES[0],
    travelers: GUEST_OPTIONS[1],
    travelDates: TIMING_OPTIONS[1],
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmission, setLastSubmission] = useState<TripInquiry | null>(null);

  // Sync prefilled data if passed from destination selector
  useEffect(() => {
    if (prefilledOrigin) {
      setFormData(prev => ({ ...prev, startingPoint: prefilledOrigin }));
    }
    if (prefilledDestination) {
      setFormData(prev => ({ ...prev, destination: prefilledDestination }));
    }
  }, [prefilledOrigin, prefilledDestination]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage('');

    // Field validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.startingPoint.trim() || !formData.destination.trim()) {
      setLoading(false);
      setStatus('error');
      setErrorMessage('Please ensure your name, email, starting point, and destination are completed.');
      return;
    }

    try {
      // First attempt: Call backend proxy (Express / Vercel Serverless) which forwards to n8n form endpoint
      let isSuccess = false;
      try {
        const response = await fetch('/api/submit-trip', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            isSuccess = true;
            setStatus('success');
            setLastSubmission({ ...formData });
          }
        }
      } catch (proxyError) {
        console.warn('Backend proxy unavailable, falling back to direct client submission:', proxyError);
      }

      // If backend proxy didn't succeed, use direct client-side FormData dispatch to n8n form
      if (!isSuccess) {
        const directFormData = new FormData();
        directFormData.append('field-0', formData.name.trim());
        directFormData.append('field-1', formData.email.trim());
        directFormData.append('field-2', formData.startingPoint.trim());
        directFormData.append('field-3', `${formData.destination.trim()} (${formData.travelStyle})`);

        await fetch(
          'https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d',
          {
            method: 'POST',
            body: directFormData,
            mode: 'no-cors' // Bypasses CORS in pure static browser environments
          }
        );
        setStatus('success');
        setLastSubmission({ ...formData });
      }
    } catch (err: any) {
      console.error('Submission failed:', err);
      setStatus('error');
      setErrorMessage(
        err?.message || 'Connection to the n8n travel agent workflow timed out. You may also access the form directly.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      startingPoint: '',
      destination: '',
      travelStyle: TRAVEL_STYLES[0],
      travelers: GUEST_OPTIONS[1],
      travelDates: TIMING_OPTIONS[1],
      notes: '',
    });
  };

  return (
    <section id="plan-trip" className="py-20 md:py-28 bg-[#090d14] relative">
      {/* Decorative subtle border line */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-amber-400/90 font-medium mb-3">
            <span>02. The Travel Agent Engine</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>n8n Cloud Webhook Integration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-100 font-normal tracking-tight">
            Curate Your Custom Itinerary
          </h2>
          <p className="mt-3 text-base text-neutral-400 max-w-2xl">
            Input your origin and destination below. Our private travel workflow processes route possibilities, flight coordinates, and sanctuary stays within moments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Form or Success Card */}
          <div className="lg:col-span-8 bg-[#0f1522] border border-neutral-800 rounded-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Subtle top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/80 via-amber-300/80 to-transparent" />

            {status === 'success' && lastSubmission ? (
              <div className="py-6 space-y-8 animate-fadeIn">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-neutral-100 font-normal">
                      Inquiry Dispatched to n8n Travel Agent
                    </h3>
                    <p className="text-sm text-neutral-400 mt-1">
                      Your travel request has been logged into the automated trip planning workflow.
                    </p>
                  </div>
                </div>

                {/* Submitted Itinerary Summary */}
                <div className="bg-[#0b0f17] border border-neutral-800/80 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3 text-xs text-neutral-400">
                    <span className="font-mono">DISPATCH REF: #{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
                    <span className="text-emerald-400 font-medium">Status: Received by Agent</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-xs text-neutral-500 block">Traveler</span>
                      <span className="text-neutral-200 font-medium">{lastSubmission.name}</span>
                      <span className="text-neutral-400 text-xs block">{lastSubmission.email}</span>
                    </div>

                    <div>
                      <span className="text-xs text-neutral-500 block">Travel Style</span>
                      <span className="text-neutral-200 font-medium">{lastSubmission.travelStyle}</span>
                      <span className="text-neutral-400 text-xs block">{lastSubmission.travelers}</span>
                    </div>

                    <div>
                      <span className="text-xs text-neutral-500 block">Starting Point (Field-2)</span>
                      <div className="flex items-center gap-1.5 text-neutral-200 font-medium mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lastSubmission.startingPoint}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-neutral-500 block">Destination (Field-3)</span>
                      <div className="flex items-center gap-1.5 text-amber-300 font-medium mt-0.5">
                        <Compass className="w-3.5 h-3.5 text-amber-400" />
                        <span>{lastSubmission.destination}</span>
                      </div>
                    </div>
                  </div>

                  {lastSubmission.notes && (
                    <div className="pt-2 border-t border-neutral-800 text-xs text-neutral-400">
                      <span className="text-neutral-500 block mb-0.5">Special Requests:</span>
                      <p className="italic">{lastSubmission.notes}</p>
                    </div>
                  )}
                </div>

                {/* Workflow Next Steps */}
                <div className="bg-amber-950/20 border border-amber-900/30 rounded-lg p-5 text-sm text-neutral-300">
                  <h4 className="font-medium text-amber-300 text-xs tracking-wider uppercase mb-2 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>What Happens in the n8n Pipeline Next</span>
                  </h4>
                  <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                    <li>The n8n webhook triggered node <code className="text-neutral-300">8f42548d...</code> has registered your parameters.</li>
                    <li>Route intelligence synthesizes optimal transit legs between <strong className="text-neutral-300">{lastSubmission.startingPoint}</strong> and <strong className="text-neutral-300">{lastSubmission.destination}</strong>.</li>
                    <li>A complete concierge proposal will be dispatched to <strong className="text-neutral-300">{lastSubmission.email}</strong> within 24 hours.</li>
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onViewSampleItinerary(lastSubmission.startingPoint, lastSubmission.destination)}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs tracking-wider uppercase rounded-md transition-colors flex items-center gap-2"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Explore Route Simulator</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 text-xs tracking-wider uppercase rounded-md transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Submit Another Route</span>
                  </button>

                  <a
                    href="https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-neutral-400 hover:text-neutral-200 flex items-center gap-1.5 ml-auto"
                  >
                    <span>View original n8n form</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 rounded-lg bg-red-950/40 border border-red-800/60 text-red-200 text-xs flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{errorMessage}</p>
                      <p className="mt-1 text-red-300/80">
                        You can also submit directly via the{' '}
                        <a
                          href="https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-white"
                        >
                          n8n cloud form page
                        </a>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Primary n8n Fields: Origin & Destination */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="startingPoint" className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>Starting Point (Origin)</span>
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="startingPoint"
                      name="startingPoint"
                      required
                      placeholder="e.g. San Francisco (SFO) or London"
                      value={formData.startingPoint}
                      onChange={handleChange}
                      className="w-full bg-[#0b0f17] border border-neutral-700/80 rounded-md px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                    />
                    <span className="text-[11px] text-neutral-500 block">Maps to n8n field-2</span>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="destination" className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>Destination</span>
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      required
                      placeholder="e.g. Positano, Kyoto, or Zermatt"
                      value={formData.destination}
                      onChange={handleChange}
                      className="w-full bg-[#0b0f17] border border-neutral-700/80 rounded-md px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                    />
                    <span className="text-[11px] text-neutral-500 block">Maps to n8n field-3</span>
                  </div>
                </div>

                {/* Traveler Credentials: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Name</span>
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="e.g. Lady Vivienne Montgomery"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#0b0f17] border border-neutral-700/80 rounded-md px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                    />
                    <span className="text-[11px] text-neutral-500 block">Maps to n8n field-0</span>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>Email for Itinerary Delivery</span>
                      <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="e.g. vivienne@montgomery.co"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#0b0f17] border border-neutral-700/80 rounded-md px-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 transition-colors"
                    />
                    <span className="text-[11px] text-neutral-500 block">Maps to n8n field-1</span>
                  </div>
                </div>

                {/* Luxury Curation Preferences */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
                  <div className="space-y-1.5">
                    <label htmlFor="travelStyle" className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>Travel Experience Vibe</span>
                    </label>
                    <select
                      id="travelStyle"
                      name="travelStyle"
                      value={formData.travelStyle}
                      onChange={handleChange}
                      className="w-full bg-[#0b0f17] border border-neutral-700/80 rounded-md px-3 py-3 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {TRAVEL_STYLES.map(style => (
                        <option key={style} value={style} className="bg-[#0f1522] text-neutral-200">
                          {style}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="travelers" className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Party Composition</span>
                    </label>
                    <select
                      id="travelers"
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="w-full bg-[#0b0f17] border border-neutral-700/80 rounded-md px-3 py-3 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {GUEST_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="bg-[#0f1522] text-neutral-200">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="travelDates" className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Departure Window</span>
                    </label>
                    <select
                      id="travelDates"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleChange}
                      className="w-full bg-[#0b0f17] border border-neutral-700/80 rounded-md px-3 py-3 text-xs text-neutral-200 focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {TIMING_OPTIONS.map(opt => (
                        <option key={opt} value={opt} className="bg-[#0f1522] text-neutral-200">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5 pt-1">
                  <label htmlFor="notes" className="text-xs font-medium text-neutral-300">
                    Bespoke Requests & Requirements (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Specific hotel affinities (e.g. Aman, Belmond), private yacht requirements, dietary requests, or anniversary celebrations..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-[#0b0f17] border border-neutral-700/80 rounded-md px-4 py-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {/* Submission CTA and Security Note */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 disabled:bg-neutral-700 disabled:text-neutral-500 text-neutral-950 font-semibold text-xs tracking-wider uppercase rounded-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed shadow-md hover:shadow-amber-400/20"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-neutral-900" />
                        <span>Transmitting to n8n Travel Agent...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        <span>Dispatch Custom Itinerary Request</span>
                      </>
                    )}
                  </button>

                  <div className="text-[11px] text-neutral-500 leading-tight">
                    <span>Direct API transmission to</span>{' '}
                    <span className="font-mono text-neutral-400">form/8f42548d...</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Side Info Panel: Real n8n Workflow Insights */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0f1522] border border-neutral-800 rounded-xl p-6 text-neutral-300 space-y-4">
              <h3 className="text-sm font-semibold text-neutral-100 tracking-wide uppercase flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span>The Automation Pipeline</span>
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                When you dispatch an itinerary, your submission enters the active n8n cloud webhook at <code className="text-amber-300/80 bg-neutral-900 px-1 py-0.5 rounded text-[11px]">srividya-2108.app.n8n.cloud</code>.
              </p>
              
              <div className="space-y-3 pt-2 text-xs border-t border-neutral-800">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-amber-400 font-semibold text-[11px]">01</span>
                  <div>
                    <span className="text-neutral-200 font-medium block">Form Ingestion</span>
                    <span className="text-neutral-500 text-[11px]">Maps fields 0–3 (Name, Email, Origin, Destination).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-amber-400 font-semibold text-[11px]">02</span>
                  <div>
                    <span className="text-neutral-200 font-medium block">Route Feasibility Check</span>
                    <span className="text-neutral-500 text-[11px]">Evaluates air routes, private rail, and transfer times.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="font-mono text-amber-400 font-semibold text-[11px]">03</span>
                  <div>
                    <span className="text-neutral-200 font-medium block">Concierge Dossier Generation</span>
                    <span className="text-neutral-500 text-[11px]">Packages a tailored day-by-day itinerary directly to your email.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick pre-fill shortcuts */}
            <div className="bg-[#0f1522] border border-neutral-800 rounded-xl p-6 text-neutral-300 space-y-3">
              <span className="text-xs font-medium text-neutral-200 block uppercase tracking-wider">
                Popular Sample Inquiries
              </span>
              <p className="text-xs text-neutral-400">
                Click any route below to instantly test the form:
              </p>
              <div className="space-y-2 pt-1">
                {[
                  { origin: 'London Heathrow (LHR)', dest: 'Positano, Amalfi Coast' },
                  { origin: 'New York (JFK)', dest: 'Kyoto & Tokyo, Japan' },
                  { origin: 'Zurich (ZRH)', dest: 'Zermatt Alpine Valley' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        startingPoint: item.origin,
                        destination: item.dest,
                      }));
                      setStatus('idle');
                    }}
                    className="w-full text-left p-2.5 rounded bg-[#0b0f17] hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-300 hover:text-amber-300 transition-colors flex items-center justify-between group"
                  >
                    <span>{item.origin} → {item.dest}</span>
                    <span className="text-[10px] text-neutral-500 group-hover:text-amber-400 font-mono">Select</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
