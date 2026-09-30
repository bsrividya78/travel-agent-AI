/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TripPlannerForm } from './components/TripPlannerForm';
import { FeaturedDestinations } from './components/FeaturedDestinations';
import { WorkflowSection } from './components/WorkflowSection';
import { ClientJournal } from './components/ClientJournal';
import { Footer } from './components/Footer';
import { ItinerarySimulatorModal } from './components/ItinerarySimulatorModal';

export default function App() {
  const [selectedOrigin, setSelectedOrigin] = useState<string>('');
  const [selectedDestination, setSelectedDestination] = useState<string>('');
  
  // Itinerary Simulator Modal state
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [modalOrigin, setModalOrigin] = useState('');
  const [modalDestination, setModalDestination] = useState('');

  const scrollToPlan = () => {
    const el = document.getElementById('plan-trip');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToDestinations = () => {
    const el = document.getElementById('destinations');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectRoute = (startingPoint: string, destination: string) => {
    setSelectedOrigin(startingPoint);
    setSelectedDestination(destination);
    scrollToPlan();
  };

  const handleOpenSimulator = (origin: string, destination: string) => {
    setModalOrigin(origin || selectedOrigin || 'London Heathrow (LHR)');
    setModalDestination(destination || selectedDestination || 'Positano & Amalfi Coast');
    setSimulatorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* 3-Zone Top Bar Contract */}
      <Navbar onPlanClick={scrollToPlan} />

      <main className="flex-1">
        {/* Hero with 16:9 dominant visual carrier */}
        <Hero 
          onStartPlanning={scrollToPlan} 
          onExploreRoutes={scrollToDestinations} 
        />

        {/* Interactive Trip Planner connecting to the n8n form */}
        <TripPlannerForm
          prefilledOrigin={selectedOrigin}
          prefilledDestination={selectedDestination}
          onViewSampleItinerary={handleOpenSimulator}
        />

        {/* Curated Signature Routes */}
        <FeaturedDestinations onSelectRoute={handleSelectRoute} />

        {/* Technical Architecture of the n8n pipeline */}
        <WorkflowSection />

        {/* Client Journal & Quantitative Rigor */}
        <ClientJournal />
      </main>

      {/* Quiet Footer */}
      <Footer onPlanClick={scrollToPlan} />

      {/* Interactive Itinerary Simulator Modal */}
      <ItinerarySimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
        origin={modalOrigin}
        destination={modalDestination}
      />
    </div>
  );
}
