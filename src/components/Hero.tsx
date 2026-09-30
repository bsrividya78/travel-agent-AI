import React from 'react';
import { ArrowRight, Sparkles, MapPin, ShieldCheck, Clock } from 'lucide-react';
import heroImage from '../assets/images/hero_luxury_travel_1790759676785.jpg';

interface HeroProps {
  onStartPlanning: () => void;
  onExploreRoutes: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning, onExploreRoutes }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Subhead / Kicker */}
        <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-amber-400/90 font-medium mb-6">
          <span>01. Bespoke Travel Studio</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span>Powered by n8n Workflow Automation</span>
        </div>

        {/* Hero Title & Abstract */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-neutral-100 leading-[1.08] tracking-tight [text-wrap:balance]">
              Where Intention Meets Odyssey.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed mb-6">
              Connect your origin to your desired destination. Our intelligent travel concierge synthesizes private transfers, sanctuary retreats, and bespoke itineraries dispatched straight to your inbox.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={onStartPlanning}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-semibold text-xs tracking-wider uppercase rounded-md transition-all flex items-center gap-2 group shadow-lg shadow-amber-950/20"
              >
                <span>Request Custom Itinerary</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onExploreRoutes}
                className="px-5 py-3.5 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 font-medium text-xs tracking-wider uppercase rounded-md transition-colors"
              >
                Explore Signature Routes
              </button>
            </div>
          </div>
        </div>

        {/* 16:9 Hero Visual Anchor with Measured Scrim & Proof Overlay */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
          <img
            src={heroImage}
            alt="Luxury traveler looking over a sun-drenched coastal terrace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.01]"
          />
          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f17]/95 via-[#0b0f17]/30 to-transparent pointer-events-none" />

          {/* Adjacent Proof Badges at base of Hero Visual */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-300">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400/90" />
                <span className="font-medium text-neutral-200">24-Hour Dossier Dispatch</span>
                <span className="text-neutral-500">via n8n Engine</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400/90" />
                <span className="font-medium text-neutral-200">Door-to-Destination Precision</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400/90" />
                <span className="font-medium text-neutral-200">Private Concierge Verification</span>
              </div>
            </div>

            <div className="font-mono text-neutral-400 text-[11px] tracking-wide">
              ENDPOINT: srividya-2108.app.n8n.cloud
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
