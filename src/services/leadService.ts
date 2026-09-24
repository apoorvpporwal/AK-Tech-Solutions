import { LeadSubmission } from '../types';
import { COMPANY_INFO } from '../data/agencyData';

const LEADS_STORAGE_KEY = 'ak_tech_leads_v1';

export interface EmailNotificationPayload {
  to: string[];
  from: string;
  subject: string;
  lead: LeadSubmission;
  sentAt: string;
  htmlContent: string;
}

export const leadService = {
  getLeads(): LeadSubmission[] {
    try {
      const data = localStorage.getItem(LEADS_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  async submitLead(input: Omit<LeadSubmission, 'id' | 'createdAt' | 'status'>): Promise<{ lead: LeadSubmission; notification: EmailNotificationPayload }> {
    const newLead: LeadSubmission = {
      ...input,
      id: 'lead-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    // Save to local storage
    const currentLeads = this.getLeads();
    const updatedLeads = [newLead, ...currentLeads];
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updatedLeads));
    } catch (e) {
      console.warn('Could not persist lead in localStorage', e);
    }

    // Try sending to local API if backend endpoint is accessible
    try {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
      }).catch(() => {
        // Fallback gracefully if server endpoint is not running
      });
    } catch {
      // Ignore background fetch error
    }

    // Construct formatted email notification payload
    const formattedServices = newLead.services.length > 0 ? newLead.services.join(', ') : 'General Technical Inquiry';
    const emailSubject = `⚡ [NEW LEAD] ${newLead.fullName} – ${newLead.services[0] || 'Technical Consultation'}`;
    
    const htmlEmail = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0d0f12; color: #f1f5f9; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #232733;">
        <div style="border-bottom: 1px solid #232733; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">AK Tech Solutions · New Lead Alert</h2>
          <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px;">Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</p>
        </div>

        <div style="background-color: #141720; border: 1px solid #2a2f3e; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
          <h3 style="margin-top: 0; color: #ffffff; font-size: 16px;">Prospect Details</h3>
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Client Name:</strong> <span style="color: #ffffff;">${newLead.fullName}</span></p>
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Email:</strong> <a href="mailto:${newLead.email}" style="color: #60a5fa; text-decoration: none;">${newLead.email}</a></p>
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Phone:</strong> <a href="tel:${newLead.phone}" style="color: #60a5fa; text-decoration: none;">${newLead.phone}</a></p>
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Selected Services:</strong> <span style="background-color: #232733; padding: 3px 8px; border-radius: 4px; font-size: 12px; color: #e2e8f0;">${formattedServices}</span></p>
          <p style="margin: 8px 0; font-size: 14px;"><strong style="color: #94a3b8;">Estimated Budget:</strong> <span style="color: #34d399; font-weight: 600;">${newLead.budget || 'Custom Scope'}</span></p>
        </div>

        <div style="background-color: #141720; border: 1px solid #2a2f3e; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
          <h4 style="margin-top: 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message & Project Requirements</h4>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap;">${newLead.message}</p>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <a href="mailto:${newLead.email}?subject=Re:%20Inquiry%20with%20AK%20Tech%20Solutions&body=Hi%20${encodeURIComponent(newLead.fullName)},%0D%0A%0D%0AThank%20you%20for%20reaching%20out%20to%20AK%20Tech%20Solutions!" 
             style="display: inline-block; background-color: #ffffff; color: #08090b; font-weight: 600; font-size: 13px; padding: 10px 18px; border-radius: 6px; text-decoration: none;">
            Reply via Email →
          </a>
          <a href="https://wa.me/${newLead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(newLead.fullName)},%20this%20is%20AK%20Tech%20Solutions%20regarding%20your%20project%20inquiry." 
             style="display: inline-block; background-color: #22c55e; color: #ffffff; font-weight: 600; font-size: 13px; padding: 10px 18px; border-radius: 6px; text-decoration: none;">
            Chat on WhatsApp
          </a>
        </div>

        <p style="margin: 0; font-size: 11px; color: #64748b; border-top: 1px solid #232733; padding-top: 16px;">
          Dispatched automatically by AK Tech Solutions Lead Engine to ${COMPANY_INFO.notificationEmail} & ${COMPANY_INFO.email}
        </p>
      </div>
    `;

    const notification: EmailNotificationPayload = {
      to: [COMPANY_INFO.notificationEmail, COMPANY_INFO.email],
      from: 'leads@aktechsolutions.in',
      subject: emailSubject,
      lead: newLead,
      sentAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      htmlContent: htmlEmail
    };

    return { lead: newLead, notification };
  }
};
