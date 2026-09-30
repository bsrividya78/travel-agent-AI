import React from 'react';
import { Network, Database, Plane, Mail, Shield, CheckCheck, ExternalLink } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-20 md:py-28 bg-[#090d14] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-amber-400/90 font-medium mb-3">
            <span>04. Automated Operations</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>n8n Orchestration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-neutral-100 font-normal tracking-tight">
            The Agent Architecture
          </h2>
          <p className="mt-4 text-base text-neutral-400 font-light leading-relaxed">
            Behind every bespoke itinerary is an autonomous n8n workflow pipeline running on high-availability cloud infrastructure, coordinating route feasibility, timing buffers, and personalized lodging recommendations.
          </p>
        </div>

        {/* 4-Step Process Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-[#0f1522] border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-400">STAGE 01</span>
                <Network className="w-5 h-5 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-100 mb-2">
                Webhook Ingestion
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                The form triggers node <code className="text-amber-300 font-mono text-[11px]">8f42548d</code> on n8n cloud, validating origin coordinates and destination specifications in sub-second latency.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Input sanitization verified</span>
            </div>
          </div>

          <div className="bg-[#0f1522] border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-400">STAGE 02</span>
                <Plane className="w-5 h-5 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-100 mb-2">
                Route Choreography
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                The pipeline computes optimal flight corridors, private rail connections, transfer buffers, and seasonal climate patterns across the travel window.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transit feasibility evaluated</span>
            </div>
          </div>

          <div className="bg-[#0f1522] border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-400">STAGE 03</span>
                <Database className="w-5 h-5 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-100 mb-2">
                Sanctuary Matching
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Matches traveler preferences (wellness, heritage, gastronomy, or alpine) against verified boutique properties and private villas.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Boutique lodging curated</span>
            </div>
          </div>

          <div className="bg-[#0f1522] border border-neutral-800 rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-amber-400">STAGE 04</span>
                <Mail className="w-5 h-5 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-100 mb-2">
                Dossier Dispatch
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                A formatted digital dossier containing the customized daily itinerary and booking instructions is automatically sent to the traveler’s email.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dispatched within 24 hours</span>
            </div>
          </div>
        </div>

        {/* Integration Callout */}
        <div className="bg-gradient-to-r from-[#0f1522] via-[#121a2a] to-[#0f1522] border border-neutral-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Shield className="w-4 h-4" />
              <span>ACTIVE N8N CLOUD INSTANCE</span>
            </div>
            <p className="text-base text-neutral-200 font-medium">
              Want to inspect the native n8n form interface or workflow trigger?
            </p>
            <p className="text-xs text-neutral-400 font-mono break-all">
              https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d
            </p>
          </div>

          <a
            href="https://srividya-2108.app.n8n.cloud/form/8f42548d-5e84-46aa-a6aa-c6afa6a7a42d"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Open in n8n Cloud</span>
            <ExternalLink className="w-4 h-4 text-amber-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
