import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AdvantageSection } from './components/AdvantageSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ServiceModal } from './components/ServiceModal';
import { QuoteEstimatorModal } from './components/QuoteEstimatorModal';
import { EmailNotificationModal } from './components/EmailNotificationModal';
import { AdminLeadsDrawer } from './components/AdminLeadsDrawer';
import { LegalModal } from './components/LegalModals';

import { ServiceItem, ProjectItem, LeadSubmission } from './types';
import { SERVICES_DATA, PROJECTS_DATA } from './data/agencyData';
import { leadService, EmailNotificationPayload } from './services/leadService';

export default function App() {
  // Modal states
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [emailNotification, setEmailNotification] = useState<EmailNotificationPayload | null>(null);
  const [leadsDrawerOpen, setLeadsDrawerOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Form prefill helper
  const [preselectedService, setPreselectedService] = useState<string>('Website & Web Development');

  // Track leads
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Load initial leads from service
    setLeads(leadService.getLeads());

    // Intersection observer for active navigation section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      sections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  const refreshLeads = () => {
    setLeads(leadService.getLeads());
  };

  const handleLeadSubmitted = (notification: EmailNotificationPayload) => {
    refreshLeads();
    setEmailNotification(notification);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireFromProject = (projectTitle: string) => {
    setPreselectedService(`Inquiry based on case study: ${projectTitle}`);
    scrollToSection('contact');
  };

  const handleInquireFromService = (serviceName: string) => {
    setPreselectedService(serviceName);
    scrollToSection('contact');
  };

  const handleApplyQuote = (quoteDetails: { services: string[]; budget: string; note: string }) => {
    setPreselectedService(quoteDetails.services[0] || 'Website & Web Development');
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#08090b] text-[#e2e8f0] selection:bg-white/20 selection:text-white flex flex-col font-sans">
      {/* Pinned Constant Top Navigation Bar with Contact Details */}
      <Navbar
        onOpenQuoteModal={() => setQuoteModalOpen(true)}
        onOpenLeadsDrawer={() => setLeadsDrawerOpen(true)}
        leadsCount={leads.length}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onGetStarted={() => scrollToSection('contact')}
          onViewWork={() => scrollToSection('projects')}
        />

        {/* What We Do / Services Section */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onExploreAll={() => scrollToSection('services')}
        />

        {/* Featured Projects Section */}
        <ProjectsSection
          onSelectProject={(project) => setSelectedProject(project)}
          onViewAllProjects={() => scrollToSection('projects')}
        />

        {/* The Advantage / Why Choose Us & Industries We Work With */}
        <AdvantageSection />

        {/* Frequently Asked Questions (PYQ) */}
        <FaqSection />

        {/* Contact & Lead Generation Section */}
        <ContactSection
          onLeadSubmitted={handleLeadSubmitted}
          preselectedService={preselectedService}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireFromProject}
      />

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onInquireService={handleInquireFromService}
      />

      <QuoteEstimatorModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        onApplyQuote={handleApplyQuote}
      />

      <EmailNotificationModal
        notification={emailNotification}
        onClose={() => setEmailNotification(null)}
      />

      <AdminLeadsDrawer
        isOpen={leadsDrawerOpen}
        onClose={() => setLeadsDrawerOpen(false)}
        leads={leads}
        onLeadsUpdated={refreshLeads}
      />

      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
