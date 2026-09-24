import { ServiceItem, ProjectItem, TestimonialItem, FaqItem, IndustryItem } from '../types';

export const COMPANY_INFO = {
  name: 'AK Tech Solutions',
  legalName: 'AK Tech Solutions Pvt. Ltd.',
  tagline: 'Build Smarter. Grow Faster.',
  subtagline: 'Technology × Automation × Growth',
  phone: '+91 98765 43210',
  phoneDisplay: '+91 98765 43210',
  email: 'info@aktechsolutions.in',
  notificationEmail: 'apsquare01@gmail.com',
  whatsappNumber: '919876543210',
  whatsappUrl: 'https://wa.me/919876543210?text=Hi%20AK%20Tech%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20services.',
  address: 'Parul University, Vadodara (Gujarat, India)',
  city: 'Vadodara',
  state: 'Gujarat',
  country: 'India',
  stats: [
    { value: '50+', label: 'Projects Completed' },
    { value: '30+', label: 'Happy Clients' },
    { value: '100%', label: 'Client Satisfaction' }
  ],
  socials: {
    linkedin: 'https://linkedin.com/company/ak-tech-solutions',
    github: 'https://github.com/aktechsolutions',
    x: 'https://x.com/aktechsolutions',
    instagram: 'https://instagram.com/aktechsolutions',
    youtube: 'https://youtube.com/@aktechsolutions'
  }
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Website & Web Development',
    description: 'Custom websites, web apps, e-commerce and more.',
    fullDescription: 'We engineer ultra-fast, modern, scalable websites and web applications tailored to your business needs with cutting-edge frameworks like React, Next.js, and Node.',
    iconName: 'Code',
    features: [
      'High-performance Next.js & React single page and SSR apps',
      'Custom e-commerce platforms with payment gateway integration',
      'SEO-optimized, lightweight responsive architectures',
      'Full API integrations & custom CMS setups'
    ],
    deliverables: ['Production code repository', 'Deployment & CI/CD pipeline', 'Performance audit (95+ Lighthouse)', 'Documentation & training'],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    timeline: '3 - 6 weeks',
    idealFor: 'Startups, SMEs, and modern brands looking to convert traffic into revenue'
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Website Design',
    description: 'Beautiful, user-friendly and conversion-focused designs.',
    fullDescription: 'Human-centric UI/UX design that balances aesthetics with conversion funnels, ensuring your visitors navigate intuitively and take action.',
    iconName: 'Layout',
    features: [
      'Interactive wireframes and high-fidelity Figma prototypes',
      'Comprehensive design system and reusable component tokens',
      'User journey mapping, heatmaps, and funnel optimization',
      'Mobile-first responsive layout design'
    ],
    deliverables: ['Complete Figma design system', 'Interactive prototype', 'Developer handoff specs', 'Design asset pack'],
    techStack: ['Figma', 'Framer', 'Tokens Studio', 'Adobe CC'],
    timeline: '2 - 4 weeks',
    idealFor: 'Companies redesigning legacy software or launching new digital products'
  },
  {
    id: 'ai-workflows',
    title: 'AI Automation & Workflows',
    description: 'Automate repetitive tasks with AI and modern tools.',
    fullDescription: 'Transform manual operations into autonomous, self-healing automated workflows powered by modern LLMs, autonomous agents, and orchestrators.',
    iconName: 'Bot',
    features: [
      'Autonomous multi-step n8n and Make.com pipeline engineering',
      'Custom LLM prompts, embeddings, and context retrieval',
      'Webhook-triggered task execution across your software stack',
      'Real-time error handling, fallback logic, and alerting'
    ],
    deliverables: ['Configured n8n/Make pipelines', 'Custom API orchestrator', 'Monitoring dashboard', 'Full runbooks'],
    techStack: ['n8n', 'Make', 'Python', 'LangChain', 'OpenAI', 'Gemini'],
    timeline: '2 - 4 weeks',
    idealFor: 'Businesses drowning in manual copy-paste workflows and routine admin tasks'
  },
  {
    id: 'ai-leadgen',
    title: 'AI Lead Generation System',
    description: 'Capture, qualify and convert leads with AI.',
    fullDescription: 'End-to-end intelligent lead acquisition engine that discovers high-intent prospects, qualifies them using behavioral scoring, and routes them automatically to your sales pipeline.',
    iconName: 'Target',
    features: [
      'Multi-channel inbound lead scrapers and enrichment bots',
      'Automated qualification scoring & intent categorization',
      'Instant calendar booking and calendar synchronization',
      'Automated personalized outreach sequences'
    ],
    deliverables: ['Integrated lead capture engine', 'Lead enrichment script', 'CRM webhook connector', 'Sales notification alerts'],
    techStack: ['React', 'Python', 'Clay', 'Apollo', 'HubSpot / Close', 'FastAPI'],
    timeline: '3 - 5 weeks',
    idealFor: 'B2B service firms, agencies, and consultancies wanting consistent client acquisition'
  },
  {
    id: 'email-automation',
    title: 'Email Automation',
    description: 'Automate your email workflows and follow-ups.',
    fullDescription: 'Smart email infrastructure that triggers personalized onboarding, transactional updates, re-engagement drip campaigns, and autonomous cold outreach follow-ups.',
    iconName: 'Mail',
    features: [
      'Behavioral trigger sequences based on user actions',
      'High-deliverability SPF, DKIM, and DMARC domain configuration',
      'Dynamic variable personalization and A/B split testing',
      'AI email re-writing and smart sentiment categorization'
    ],
    deliverables: ['Configured email sequences', 'Template library', 'Deliverability DNS setup', 'Analytics tracking dashboard'],
    techStack: ['Resend', 'SendGrid', 'Smartlead', 'Instantly', 'Postmark'],
    timeline: '2 - 3 weeks',
    idealFor: 'E-commerce, SaaS, and service companies looking to maximize client retention and close rates'
  },
  {
    id: 'whatsapp-automation',
    title: 'WhatsApp Automation',
    description: 'Chatbots, support and lead management.',
    fullDescription: 'Deploy official WhatsApp Business API chatbots that handle 24/7 client inquiries, capture leads, process bookings, send payment receipts, and automate customer support.',
    iconName: 'MessageSquare',
    features: [
      'Official WhatsApp Cloud API verification and onboarding',
      'Conversational AI chatbot with natural language understanding',
      'Automated order confirmation and booking reminders',
      'Live agent handover for complex requests'
    ],
    deliverables: ['Verified WhatsApp Business API', 'Chatbot flow setup', 'CRM contact sync', 'Agent inbox dashboard'],
    techStack: ['Meta WhatsApp Cloud API', 'Node.js', 'Vector DB', 'Wati / Gupshup'],
    timeline: '2 - 3 weeks',
    idealFor: 'Clinics, real estate brokers, schools, e-commerce, and high-touch service providers'
  },
  {
    id: 'business-automation',
    title: 'Business Process Automation',
    description: 'Streamline operations with smart workflows.',
    fullDescription: 'Systematize operations by connecting disparate legacy databases, spreadsheets, payment portals, and ERPs into a frictionless unified workflow.',
    iconName: 'Sliders',
    features: [
      'Automated billing, reconciliation, and payment syncing',
      'Inventory sync across e-commerce and physical storage',
      'Employee onboarding and digital signature routing',
      'Zero-touch reporting sent daily to Telegram/Slack'
    ],
    deliverables: ['Custom integration middleware', 'Error-resilient job queues', 'Automated reconciliation reports'],
    techStack: ['Python', 'Docker', 'PostgreSQL', 'Redis', 'Zapier', 'Stripe'],
    timeline: '3 - 6 weeks',
    idealFor: 'Growing enterprises looking to scale operations without increasing headcount linearly'
  },
  {
    id: 'crms',
    title: 'CRMs',
    description: 'Setup, customization and integration.',
    fullDescription: 'Tailored CRM implementations that organize your sales pipeline, track client interactions, eliminate duplicate records, and automate deal stage progressions.',
    iconName: 'Database',
    features: [
      'Custom pipeline stages, deal scoring, and field architecture',
      'Bidirectional sync between CRM and web forms, WhatsApp, & email',
      'Automated task assignments and SLA breach notifications',
      'Executive revenue projection dashboards'
    ],
    deliverables: ['Configured CRM workspace', 'Data migration from spreadsheets', 'Zapier/Make integration bridges', 'Staff training session'],
    techStack: ['HubSpot', 'Zoho CRM', 'Supabase', 'Airtable', 'Pipedrive'],
    timeline: '2 - 4 weeks',
    idealFor: 'Sales teams and agency owners seeking a single source of truth for all client touchpoints'
  },
  {
    id: 'doc-automation',
    title: 'Document & Data Automation',
    description: 'Extract, organize and manage your data.',
    fullDescription: 'Automate PDF processing, invoice parsing, bank statement OCR extraction, and document categorization directly into your database with 99%+ accuracy.',
    iconName: 'FileText',
    features: [
      'Intelligent OCR extraction for scanned PDFs and photos',
      'Automated contract clause comparison and key-value mapping',
      'Batch generation of customized quotes, proposals, and contracts',
      'Secure document cloud archiving and indexed vector search'
    ],
    deliverables: ['Automated document processing pipeline', 'Custom parsing schema', 'Export connectors to ERP/Excel'],
    techStack: ['Tesseract OCR', 'AWS Textract', 'LangChain', 'Python', 'FastAPI'],
    timeline: '2 - 4 weeks',
    idealFor: 'Accounting firms, logistics providers, law offices, and loan/insurance brokerages'
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics & BI',
    description: 'Turn your data into useful insights.',
    fullDescription: 'Transform messy operational data into clean, interactive real-time executive dashboards that expose hidden bottlenecks and growth opportunities.',
    iconName: 'BarChart3',
    features: [
      'Custom business intelligence dashboards with live metrics',
      'Automated ETL pipelines consolidating multi-channel sources',
      'Customer lifetime value (LTV) and churn predictive modeling',
      'Automated weekly email summaries delivered to management'
    ],
    deliverables: ['Interactive BI dashboard', 'Data warehouse setup', 'Automated ETL pipeline', 'KPI documentation'],
    techStack: ['PowerBI', 'Tableau', 'Metabase', 'PostgreSQL', 'Python', 'Plotly'],
    timeline: '3 - 6 weeks',
    idealFor: 'Decision makers wanting unambiguous real-time visibility over cash flow and unit economics'
  },
  {
    id: 'internal-ai-assistant',
    title: 'Internal AI Assistant',
    description: 'Build your own AI assistant for your team.',
    fullDescription: 'Private, secure enterprise AI assistant connected to your internal SOPs, Slack history, Notion docs, and customer tickets to 10x team productivity.',
    iconName: 'Sparkles',
    features: [
      'Retrieval Augmented Generation (RAG) on company knowledge bases',
      'Secure Slack, Microsoft Teams, and web portal integration',
      'Role-based access control preventing unauthorized data leakage',
      'Autonomous task execution like drafting emails or creating tickets'
    ],
    deliverables: ['Secure deployed AI assistant', 'Embedded vector index', 'Slack/Teams bot integration', 'Admin control console'],
    techStack: ['LangChain', 'Pinecone / pgvector', 'Next.js', 'OpenAI', 'Anthropic'],
    timeline: '3 - 5 weeks',
    idealFor: 'Fast-moving teams that want instant access to company guidelines and technical answers'
  },
  {
    id: 'ai-research',
    title: 'AI Research System',
    description: 'Research, analyze and summarize information.',
    fullDescription: 'Autonomous market and competitor intelligence engines that monitor web sources, track pricing changes, analyze consumer sentiment, and synthesize structured briefings.',
    iconName: 'Search',
    features: [
      'Autonomous web scraping and regulatory change tracking',
      'Competitor feature & pricing shift detection',
      'Deep multi-source synthesis and automated executive memos',
      'Export to Notion, PDF, and Google Slides'
    ],
    deliverables: ['Automated research bot', 'Scheduled reporting pipeline', 'Structured data feed export'],
    techStack: ['Playwright', 'Python', 'BeautifulSoup', 'Gemini / Claude', 'Markdown engine'],
    timeline: '2 - 4 weeks',
    idealFor: 'VCs, strategists, marketers, and founders needing continuous competitive advantage'
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'Business Website',
    category: 'web',
    categoryLabel: 'Corporate Website',
    subtitle: 'High-conversion corporate presence for a premier industrial firm',
    description: 'A lightning-fast, ultra-modern website engineered with Next.js, headless CMS, and conversion-optimized sales architecture.',
    problem: 'The client had an outdated 7-year-old WordPress site with 6.2s load time, zero mobile responsiveness, and near-zero organic leads.',
    solution: 'Designed and engineered a custom dark-mode Next.js website with Tailwind CSS, sub-second load times, and structured SEO markup.',
    impactMetrics: [
      { label: 'Lighthouse Speed', value: '99/100' },
      { label: 'Organic Inbound Leads', value: '+184%' },
      { label: 'Bounce Rate', value: '-42%' }
    ],
    tags: ['Next.js', 'Tailwind CSS', 'SEO'],
    imageSrc: '/images/project_corp_website_1790230329419.jpg',
    images: [
      '/images/project_corp_website_1790230329419.jpg',
      '/images/project_corp_mobile_1790231680641.jpg',
      '/images/hero_device_composition_1790230303735.jpg'
    ],
    mockupType: 'laptop',
    clientIndustry: 'Industrial & B2B Solutions',
    featured: true
  },
  {
    id: 'project-2',
    title: 'AI Workflow Automation',
    category: 'ai',
    categoryLabel: 'Internal Tool',
    subtitle: 'Autonomous multi-agent pipeline replacing 30 hours of weekly manual work',
    description: 'An enterprise automation framework orchestrating lead intake, document validation, and ERP entry using n8n and LangChain.',
    problem: 'Staff spent 4 hours every morning manually copying customer orders from emails into their ERP, leading to errors and delays.',
    solution: 'Engineered an event-driven webhook pipeline that reads incoming emails, extracts order schemas via LLM, validates inventory, and updates the ERP.',
    impactMetrics: [
      { label: 'Hours Saved / Wk', value: '32 hrs' },
      { label: 'Data Accuracy', value: '99.8%' },
      { label: 'Processing Speed', value: '15 sec' }
    ],
    tags: ['Python', 'LangChain', 'n8n'],
    imageSrc: '/images/project_ai_workflow_1790230343937.jpg',
    images: [
      '/images/project_ai_workflow_1790230343937.jpg',
      '/images/project_ai_logs_1790231696467.jpg'
    ],
    mockupType: 'workflow',
    clientIndustry: 'Supply Chain & Logistics',
    featured: true
  },
  {
    id: 'project-3',
    title: 'Lead Generation System',
    category: 'leadgen',
    categoryLabel: 'Landing Page + CRM',
    subtitle: 'Automated multi-channel prospect capture and CRM synchronization',
    description: 'A unified conversion funnel combining interactive assessment tools, high-speed landing pages, and instant CRM enrichment.',
    problem: 'The sales team lost 65% of potential leads due to slow follow-up times (averaging 18 hours after form submission).',
    solution: 'Built an integrated lead generation system with sub-minute SMS/WhatsApp triggers, automated scoring, and direct routing into HubSpot.',
    impactMetrics: [
      { label: 'Avg Follow-Up Time', value: '< 2 min' },
      { label: 'Close Rate Boost', value: '+68%' },
      { label: 'Total Inbound Value', value: '$1.4M' }
    ],
    tags: ['React', 'Node.js', 'MongoDB'],
    imageSrc: '/images/project_lead_funnel_1790230359118.jpg',
    images: [
      '/images/project_lead_funnel_1790230359118.jpg',
      '/images/project_crm_view_1790231711058.jpg'
    ],
    mockupType: 'mobile',
    clientIndustry: 'High-Growth EdTech & SaaS',
    featured: true
  },
  {
    id: 'project-4',
    title: 'Data Analytics Dashboard',
    category: 'analytics',
    categoryLabel: 'Business Intelligence',
    subtitle: 'Executive intelligence platform for real-time unit economics and revenue tracking',
    description: 'Centralized telemetry dashboard aggregating payments, customer acquisition channels, and operational costs into clear insights.',
    problem: 'Leadership lacked a single unified dashboard; numbers were trapped in disparate Excel sheets and payment gateway exports.',
    solution: 'Created an automated PostgreSQL ETL pipeline with Plotly and FastAPI, streaming live KPI widgets, churn forecasts, and cohort matrices.',
    impactMetrics: [
      { label: 'Reporting Latency', value: 'Real-Time' },
      { label: 'Uncovered Leakage', value: '$45,000/yr' },
      { label: 'Exec Time Saved', value: '10 hrs/mo' }
    ],
    tags: ['Python', 'Plotly', 'FastAPI'],
    imageSrc: '/images/project_bi_dashboard_1790230372678.jpg',
    images: [
      '/images/project_bi_dashboard_1790230372678.jpg',
      '/images/project_bi_chart_1790231723485.jpg'
    ],
    mockupType: 'dashboard',
    clientIndustry: 'FinTech & B2B Services',
    featured: true
  },
  {
    id: 'project-5',
    title: 'Omnichannel WhatsApp Assistant',
    category: 'ai',
    categoryLabel: 'Customer Support Automation',
    subtitle: '24/7 autonomous WhatsApp concierge handling inquiries & appointments',
    description: 'An intelligent WhatsApp bot built on the official Meta Cloud API that qualifies prospects and books consultations right in chat.',
    problem: 'Inbound inquiries during off-hours (60% of total) went unanswered until the next business day, leading to customer churn.',
    solution: 'Engineered a semantic AI WhatsApp agent that answers FAQ, queries real-time availability, and books calendar slots natively in WhatsApp.',
    impactMetrics: [
      { label: 'Off-hours Conversion', value: '+210%' },
      { label: 'Response Time', value: '< 3 sec' },
      { label: 'Satisfaction Rate', value: '98.5%' }
    ],
    tags: ['WhatsApp Cloud API', 'Node.js', 'Redis', 'Gemini API'],
    mockupType: 'mobile',
    clientIndustry: 'Healthcare & Real Estate',
    featured: false
  },
  {
    id: 'project-6',
    title: 'Document AI Pipeline',
    category: 'crm',
    categoryLabel: 'Document & Data Automation',
    subtitle: 'Zero-touch optical character extraction and structured database ingestion',
    description: 'Automated invoice and contract intake parsing multi-page documents and validating line items against purchase orders.',
    problem: 'Financial auditors were processing 500+ invoices manually each month with recurring human entry errors.',
    solution: 'Deployed a custom computer-vision and LLM parser that normalizes line items and routes them directly to accounting software.',
    impactMetrics: [
      { label: 'Manual Time Cut', value: '88%' },
      { label: 'Invoices Handled', value: '10k+ / mo' },
      { label: 'Error Rate', value: '< 0.1%' }
    ],
    tags: ['Python', 'OCR', 'LangChain', 'AWS S3'],
    mockupType: 'dashboard',
    clientIndustry: 'Accounting & Professional Firms',
    featured: false
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  { id: 'healthcare', name: 'Healthcare', iconName: 'HeartPulse', description: 'Patient booking bots, HIPAA-aware records automation & portals' },
  { id: 'education', name: 'Education', iconName: 'GraduationCap', description: 'Student lead gen funnels, admission workflows & LMS integrations' },
  { id: 'ecommerce', name: 'E-commerce', iconName: 'ShoppingBag', description: 'High-speed storefronts, inventory sync & checkout optimization' },
  { id: 'realestate', name: 'Real Estate', iconName: 'Building', description: 'Property listing sites, automated lead qualification & tour scheduling' },
  { id: 'manufacturing', name: 'Manufacturing', iconName: 'Factory', description: 'B2B quote engines, ERP connectors & document OCR extraction' },
  { id: 'finance', name: 'Finance', iconName: 'ShieldCheck', description: 'Secure client dashboards, analytics telemetry & compliance pipelines' },
  { id: 'hospitality', name: 'Hospitality', iconName: 'Hotel', description: 'Guest concierge WhatsApp bots, reservation flows & digital menus' },
  { id: 'retail', name: 'Retail', iconName: 'Store', description: 'Omnichannel POS sync, customer loyalty triggers & local SEO' },
  { id: 'andmore', name: 'And More', iconName: 'Sparkles', description: 'Custom technical implementations tailored for your unique domain' }
];

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What kind of businesses do you work with?',
    answer: 'We partner with growing startups, SMEs, and established enterprise organizations across B2B services, healthcare, e-commerce, real estate, manufacturing, and tech. Whether you need an end-to-end digital revamp, an intelligent AI automation pipeline, or a high-converting web platform, our solutions are built to scale with your business.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How long does a typical project take?',
    answer: 'Most standard projects take between 2 to 4 weeks from discovery to deployment. Rapid automation sprints (like WhatsApp bots or email workflows) can be delivered in as little as 7-10 days, while large-scale custom web platforms and complex ERP integrations typically require 4-6 weeks.',
    category: 'Process'
  },
  {
    id: 'faq-3',
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes, absolutely. We do not just build and disappear. Every project includes a 30-day post-launch warranty period, followed by optional monthly retainer packages covering uptime monitoring, maintenance, security patches, prompt optimizations, and iterative feature rollouts.',
    category: 'General'
  },
  {
    id: 'faq-4',
    question: 'How do you handle the design process?',
    answer: 'We follow a rigorous user-centric design workflow: Research & Discovery -> Wireframing -> High-fidelity Figma prototypes -> Interactive user testing -> Pixel-perfect code implementation. You review and approve the clickable designs before a single line of backend production code is finalized.',
    category: 'Process'
  },
  {
    id: 'faq-5',
    question: 'What technologies do you use?',
    answer: 'We specialize in modern, battle-tested technologies including React, Next.js, TypeScript, Tailwind CSS, Node.js, Python, PostgreSQL, n8n, LangChain, Meta WhatsApp Cloud API, and OpenAI/Gemini models. We select tools specifically suited to long-term reliability and zero maintenance bloat.',
    category: 'AI & Tech'
  },
  {
    id: 'faq-6',
    question: 'Can you work with our existing systems?',
    answer: 'Yes! Over 80% of our automation and CRM projects integrate directly into clients existing infrastructure—including HubSpot, Salesforce, Zoho, Google Workspace, Slack, custom SQL databases, and legacy internal portals via modern REST/GraphQL APIs and webhook bridges.',
    category: 'AI & Tech'
  },
  {
    id: 'faq-7',
    question: 'What is your pricing model for automation and custom development?',
    answer: 'We offer transparent, fixed-scope project pricing with zero surprise charges, as well as monthly automation retainer sprints. You receive a detailed breakdown of deliverables, milestones, and guarantees before we begin.',
    category: 'Pricing'
  },
  {
    id: 'faq-8',
    question: 'How secure is our business and customer data with AI automations?',
    answer: 'Security and confidentiality are foundational. We implement strict data encryption in transit and at rest, utilize private API endpoints with zero-data-retention training policies, and configure role-based access control to keep your proprietary information completely confidential.',
    category: 'AI & Tech'
  }
];
