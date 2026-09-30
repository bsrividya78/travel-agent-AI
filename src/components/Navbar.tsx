import React, { useState } from 'react';
import { Menu, X, Compass, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onPlanClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPlanClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f17]/90 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="/" 
          className="text-2xl font-serif tracking-tight text-neutral-100 hover:text-amber-300/90 transition-colors font-semibold flex items-center gap-2.5"
        >
          <Compass className="w-5 h-5 text-amber-400/90 stroke-[1.75]" />
          <span>Vespera Travel</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a href="#destinations" className="hover:text-neutral-100 transition-colors">
            Destinations
          </a>
          <a href="#plan-trip" className="hover:text-neutral-100 transition-colors">
            Itinerary Engine
          </a>
          <a href="#workflow" className="hover:text-neutral-100 transition-colors">
            Workflow Architecture
          </a>
          <a href="#journal" className="hover:text-neutral-100 transition-colors">
            Client Journal
          </a>
          <a 
            href="https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-neutral-100 transition-colors flex items-center gap-1.5 text-neutral-400"
            title="Open raw n8n cloud form"
          >
            <span>Direct n8n Form</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onPlanClick}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm hover:shadow-amber-400/20 whitespace-nowrap"
          >
            Plan Your Journey
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0d121c] px-6 py-6 space-y-4">
          <a
            href="#destinations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-neutral-100"
          >
            Destinations
          </a>
          <a
            href="#plan-trip"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-neutral-100"
          >
            Itinerary Engine
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-neutral-100"
          >
            Workflow Architecture
          </a>
          <a
            href="#journal"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-neutral-300 hover:text-neutral-100"
          >
            Client Journal
          </a>
          <a
            href="https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-neutral-100"
          >
            <span>Direct n8n Form</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      )}
    </header>
  );
};
