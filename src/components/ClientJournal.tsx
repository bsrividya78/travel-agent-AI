import React from 'react';
import { Quote } from 'lucide-react';

interface JournalEntry {
  quote: string;
  author: string;
  role: string;
  route: string;
  duration: string;
  year: string;
}

const ENTRIES: JournalEntry[] = [
  {
    quote: "Submitting our San Francisco to Amalfi request through the platform felt effortless. Within 20 hours, the automated travel agent returned a meticulous dossier that secured a secluded cliffside villa in Positano and private boat moorings in Capri.",
    author: "Elena Rostova",
    role: "Design Principal, Forma Architecture",
    route: "San Francisco (SFO) → Amalfi Coast, Italy",
    duration: "14 Days",
    year: "2026"
  },
  {
    quote: "The multi-leg logistics between London, Tokyo, and secluded Ryokans in Kyoto were coordinated without a single friction point. The train timetable alignments and baggage forwarding arrived fully organized.",
    author: "Julian Sterling",
    role: "Managing Director, Sterling & Finch",
    route: "London Heathrow (LHR) → Kyoto & Kanazawa",
    duration: "12 Days",
    year: "2026"
  },
  {
    quote: "The Glacier Express private observation seats and Zermatt chalet booking were organized faster than any conventional agency we’ve contracted with previously.",
    author: "Claire & Henri De Vries",
    role: "Founders, Atelier Lumière",
    route: "Zurich (ZRH) → Zermatt & St. Moritz",
    duration: "9 Days",
    year: "2026"
  }
];

export const ClientJournal: React.FC = () => {
  return (
    <section id="journal" className="py-20 md:py-28 bg-[#0b0f17] border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-amber-400/90 font-medium mb-3">
            <span>05. Dispatch Log</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>Client Expeditions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-100 font-normal tracking-tight">
            Journals of Dispatched Travelers
          </h2>
          <p className="mt-3 text-base text-neutral-400 font-light">
            Real itineraries coordinated through the n8n travel agent pipeline and executed across the globe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ENTRIES.map((entry, index) => (
            <div
              key={index}
              className="bg-[#0f1522] border border-neutral-800 rounded-xl p-8 flex flex-col justify-between space-y-6"
            >
              <div>
                <Quote className="w-6 h-6 text-amber-400/40 mb-4" />
                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 italic">
                  "{entry.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800/80 space-y-2">
                <div>
                  <h4 className="text-sm font-medium text-neutral-100">{entry.author}</h4>
                  <span className="text-xs text-neutral-500 block">{entry.role}</span>
                </div>

                {/* Zero-Pill unboxed metadata */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 pt-1">
                  <span className="font-mono text-amber-300/90">{entry.route}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>{entry.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
