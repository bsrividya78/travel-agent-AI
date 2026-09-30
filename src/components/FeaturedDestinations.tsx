import React from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import amalfiImg from '../assets/images/destination_amalfi_coast_1790759719874.jpg';
import kyotoImg from '../assets/images/destination_kyoto_temple_1790759688691.jpg';
import alpsImg from '../assets/images/destination_swiss_alps_1790759702035.jpg';
import { CuratedJourney } from '../types';

interface FeaturedDestinationsProps {
  onSelectRoute: (startingPoint: string, destination: string) => void;
}

const JOURNEYS: CuratedJourney[] = [
  {
    id: 'amalfi',
    title: 'The Divine Amalfi & Capri Odyssey',
    region: 'Campania, Italy',
    duration: '10 Days · Private Yacht Charter',
    startingPoint: 'Rome Fiumicino (FCO)',
    destination: 'Positano & Capri, Amalfi Coast',
    image: amalfiImg,
    imageAlt: 'Pastel terraced cliffside villas overlooking turquoise waters of Positano',
    highlights: ['Private Riva speedboat charter to Faraglioni', 'Cliffside cliffhanger suites at Le Sirenuse', 'Private vineyard tasting in Ravello'],
    description: 'Traverse the sun-drenched Sorrentine peninsula into private terraced sanctuaries overlooking the sapphire Tyrrhenian waters.'
  },
  {
    id: 'kyoto',
    title: 'Kyoto Mist & Ancient Alpine Sanctuaries',
    region: 'Kansai & Ishikawa, Japan',
    duration: '12 Days · Ryokan Heritage',
    startingPoint: 'Tokyo Haneda (HND)',
    destination: 'Kyoto, Arashiyama & Kanazawa',
    image: kyotoImg,
    imageAlt: 'Bamboo grove and ancient wooden temple pavilion in Arashiyama Kyoto',
    highlights: ['Exclusive private access to Daitoku-ji Zen gardens', 'Centuries-old kaiseki banquet in Gion', 'Thermal hot springs nestled in cedar valleys'],
    description: 'Immerse in timeless Japanese minimalism, quiet morning temple paths, and centuries-old culinary ceremonies curated with utmost discretion.'
  },
  {
    id: 'alps',
    title: 'Swiss Alpine Glaciers & Grand Rail',
    region: 'Valais & Graubünden, Switzerland',
    duration: '8 Days · Panoramic Rail & Mountain Chalet',
    startingPoint: 'Zurich Airport (ZRH)',
    destination: 'Zermatt, Matterhorn & St. Moritz',
    image: alpsImg,
    imageAlt: 'Panoramic luxury train traversing Swiss Alps pine valleys with snow-capped peaks',
    highlights: ['First-class Excellence Class Glacier Express', 'Helicopter transfer to Matterhorn glacier skiing', 'Private fondue pairing at 3,100 meters'],
    description: 'High-altitude grandeur aboard world-renowned glass-dome observation trains connecting majestic Alpine valleys and five-star mountain sanctuaries.'
  }
];

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({ onSelectRoute }) => {
  return (
    <section id="destinations" className="py-20 md:py-28 bg-[#0b0f17]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-neutral-800 pb-8">
          <div>
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-amber-400/90 font-medium mb-3">
              <span>03. Signature Routes</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Curated Archetypes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-100 font-normal tracking-tight">
              Inspirational Departures
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Each archetype illustrates the depth of bespoke logistics, private transfers, and lodging our travel engine choreographs.
          </p>
        </div>

        {/* 3-Column Destination Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {JOURNEYS.map((journey) => (
            <article
              key={journey.id}
              className="bg-[#0f1522] border border-neutral-800 rounded-xl overflow-hidden flex flex-col group hover:border-neutral-700 transition-colors"
            >
              {/* Image Container with 4:3 Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                <img
                  src={journey.image}
                  alt={journey.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1522] via-transparent to-transparent opacity-80" />
                
                {/* Unboxed clean metadata (Zero-Pill discipline) */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-200 drop-shadow-md">
                  <span className="font-medium tracking-wide">{journey.region}</span>
                  <span className="font-mono text-amber-300">{journey.duration}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-normal text-neutral-100 tracking-tight mb-2 group-hover:text-amber-300 transition-colors">
                    {journey.title}
                  </h3>
                  
                  {/* Origin to Destination Route Indicator */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono mb-4 pb-4 border-b border-neutral-800/80">
                    <span className="text-neutral-300">{journey.startingPoint}</span>
                    <span className="text-amber-400">→</span>
                    <span className="text-amber-200">{journey.destination}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6 font-light">
                    {journey.description}
                  </p>

                  {/* Highlights list without decorative clutter */}
                  <div className="space-y-2 mb-6 text-xs text-neutral-300">
                    {journey.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-amber-400/80 font-mono">·</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA: Auto-fills form */}
                <button
                  onClick={() => onSelectRoute(journey.startingPoint, journey.destination)}
                  className="w-full mt-2 py-3 px-4 bg-neutral-800 hover:bg-amber-400 text-neutral-200 hover:text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-md transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <span>Select This Route</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
