import React from 'react';
import { Compass, ExternalLink } from 'lucide-react';

interface FooterProps {
  onPlanClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onPlanClick }) => {
  return (
    <footer className="bg-[#070a0f] border-t border-neutral-900 py-16 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-neutral-800/60">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <a 
              href="/" 
              className="text-2xl font-serif tracking-tight text-neutral-100 hover:text-amber-300 font-semibold flex items-center gap-2"
            >
              <Compass className="w-5 h-5 text-amber-400 stroke-[1.75]" />
              <span>Vespera Travel Studio</span>
            </a>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm font-light">
              Architecting bespoke itineraries and luxury expeditions worldwide. Connected to automated n8n cloud workflows for 24-hour turnaround travel dossiers.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-mono text-neutral-400 block">
                Workflow Webhook:
              </span>
              <a 
                href="https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-amber-400/90 hover:underline break-all inline-flex items-center gap-1 mt-1"
              >
                <span>srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2">
              <li>
                <a href="#destinations" className="hover:text-neutral-200 transition-colors">
                  Signature Routes
                </a>
              </li>
              <li>
                <button
                  onClick={onPlanClick}
                  className="hover:text-neutral-200 transition-colors cursor-pointer text-left"
                >
                  Itinerary Engine
                </button>
              </li>
              <li>
                <a href="#workflow" className="hover:text-neutral-200 transition-colors">
                  Workflow Architecture
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-neutral-200 transition-colors">
                  Client Journal
                </a>
              </li>
            </ul>
          </div>

          {/* Direct n8n form access */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-neutral-200 uppercase tracking-wider block">
              Direct Form Access
            </span>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              This site is directly integrated with the user's n8n cloud form. Submissions trigger the backend travel agent node immediately.
            </p>
            <div className="pt-1">
              <a
                href="https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 rounded text-xs transition-colors border border-neutral-800"
              >
                <span>Open Raw n8n Form</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Vespera Travel Studio</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Private Travel Concierge</span>
            <span aria-hidden="true">·</span>
            <span>Autonomous n8n Pipeline</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
