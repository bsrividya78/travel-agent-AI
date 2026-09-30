import React from 'react';
import { X, Calendar, MapPin, Compass, Sparkles, Check, Download, Share2 } from 'lucide-react';

interface ItinerarySimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  origin: string;
  destination: string;
}

export const ItinerarySimulatorModal: React.FC<ItinerarySimulatorModalProps> = ({
  isOpen,
  onClose,
  origin,
  destination,
}) => {
  if (!isOpen) return null;

  const resolvedOrigin = origin || 'London Heathrow (LHR)';
  const resolvedDestination = destination || 'Kyoto, Japan';

  const sampleDays = [
    {
      day: 'Day 01',
      title: 'Arrival & Private Transit',
      description: `Depart ${resolvedOrigin} via premium long-haul corridor. Private chauffeur meet-and-greet upon touchdown, followed by transfer to your secluded boutique suite. Evening restorative wellness tea ceremony.`,
      lodging: 'Selected Sanctuary Villa',
      activity: 'Private Check-in & Acclimatization'
    },
    {
      day: 'Day 02',
      title: 'Heritage & Architectural Immersion',
      description: `Morning private docent-led excursion through iconic heritage sites in ${resolvedDestination}, intentionally timed before public opening. Bespoke multi-course tasting lunch at a historic private dining room.`,
      lodging: 'Selected Sanctuary Villa',
      activity: 'Private Guided Walk & Tasting'
    },
    {
      day: 'Day 03',
      title: 'Artisan Encounters & Scenic Vistas',
      description: `Ascend to panoramic scenic overlooks with private photography accompaniment. Afternoon private atelier visit with master local craftsmen exclusive to Vespera travelers.`,
      lodging: 'Selected Sanctuary Villa',
      activity: 'Private Craft Atelier & Sunset View'
    },
    {
      day: 'Day 04–05',
      title: 'Expedition & Open Exploration',
      description: `Curated self-guided freedom supported by 24/7 on-demand chauffeur and concierge booking desk. Optional private yacht or scenic alpine rail charter depending on terrain.`,
      lodging: 'Secluded Retreat Wing',
      activity: 'Flexible Odyssey & Dining Reserv.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0f1522] border border-neutral-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="sticky top-0 bg-[#0f1522]/95 backdrop-blur-md border-b border-neutral-800 p-6 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Itinerary Architecture Preview</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif text-neutral-100 font-normal">
              {resolvedOrigin} <span className="text-amber-400">→</span> {resolvedDestination}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-200 rounded-md hover:bg-neutral-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-[#0b0f17] border border-neutral-800/80 rounded-lg p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-neutral-500 block">ESTIMATED DURATION</span>
              <span className="text-neutral-200 font-medium text-sm">7 to 10 Days Recommended</span>
            </div>
            <div>
              <span className="text-neutral-500 block">TRANSIT LOGISTICS</span>
              <span className="text-neutral-200 font-medium text-sm">Door-to-Door Private Chauffeur</span>
            </div>
            <div>
              <span className="text-neutral-500 block">AGENT SYNTHESIS</span>
              <span className="text-amber-400 font-mono text-sm">Powered by n8n</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              Sample Day-by-Day Master Sequence
            </h4>

            {sampleDays.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-[#0b0f17] border border-neutral-800/60 hover:border-neutral-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 font-medium">{item.day}</span>
                  <span className="text-neutral-500 text-[11px]">{item.activity}</span>
                </div>
                <h5 className="text-base font-serif text-neutral-100 font-normal">
                  {item.title}
                </h5>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {item.description}
                </p>
                <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-neutral-400" />
                  <span>Lodging: <strong className="text-neutral-300 font-medium">{item.lodging}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Modal Footer Note */}
          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-900/30 text-xs text-neutral-400 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              This is a preliminary blueprint preview. When you submit your request through our form, the n8n agent customizes this outline with real flight numbers, confirmed property rates, and customized seasonal reservations sent to your inbox.
            </p>
          </div>
        </div>

        {/* Action bar */}
        <div className="border-t border-neutral-800 p-6 bg-[#0b0f17]/80 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          >
            Ready to Plan This Trip
          </button>
        </div>
      </div>
    </div>
  );
};
