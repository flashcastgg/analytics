// ─── CONTRACTS.JS ────────────────────────────────────────────
// Each contract has: title (string) and generate(fields) → string

function makeContract(title, scopeDesc, fee, timeline, deliverables) {
  return {
    title,
    generate(f) {
      const pn  = f.providerName    || '[Your Full Name]';
      const pb  = f.providerBiz     || '[Your Business Name]';
      const pe  = f.providerEmail   || '[your@email.com]';
      const pa  = f.providerAddress || '[Your Address], Philippines';
      const cn  = f.clientName      || '[Client Company Name]';
      const cc  = f.clientContact   || '[Client Contact Name]';
      const ce  = f.clientEmail     || '[client@email.com]';
      const ca  = f.clientAddress   || '[Client Address]';
      const hr  = f.hourlyRate      || '[XX]';
      const dt  = new Date().toLocaleDateString('en-PH', { year:'numeric', month:'long', day:'numeric' });

      return `DIGITAL ANALYTICS SERVICES AGREEMENT
${title}

Effective Date: ${dt}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PARTIES

Service Provider:
  Name:           ${pn}
  Business Name:  ${pb}
  Address:        ${pa}
  Email:          ${pe}
  ("Consultant")

Client:
  Company Name:   ${cn}
  Contact Person: ${cc}
  Address:        ${ca}
  Email:          ${ce}
  ("Client")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. SCOPE OF WORK

The Consultant agrees to ${scopeDesc}, as defined in the
agreed Measurement Plan and Tag Specification document
exchanged between the parties prior to signing this Agreement.

Deliverables include:
${deliverables}

Any work outside this defined scope will require a written
Change Order agreed by both parties before work commences.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. TIMELINE

Estimated project timeline: ${timeline}, commencing upon
receipt of the deposit payment and all required access
credentials from the Client.

Delays caused by the Client (delayed access, delayed feedback,
delayed UAT sign-off) will extend the timeline accordingly
and shall not constitute a breach by the Consultant.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. FEES AND PAYMENT

Project Fee: ${fee}

Payment Terms:
• 50% deposit due before work begins (non-refundable once
  work commences)
• Remaining 50% due upon delivery of all agreed deliverables

For ongoing/retainer services, monthly fees are due on the
1st of each month, paid in advance, with a 7-day grace period.

Accepted payment methods: PayPal Business, Wise, or direct
bank transfer (details provided on invoice).

Late payments beyond 14 days will incur a 2% monthly late
fee on the outstanding balance.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. CLIENT RESPONSIBILITIES

The Client agrees to:
(a) Provide access to all required platforms within 2 business
    days of project start (analytics accounts, tag management
    systems, app source code, website CMS, ad platform accounts).
(b) Designate a primary point of contact who responds within
    1 business day.
(c) Provide initial requirements document, screenshots or
    mockups of tracked pages/interactions, and test login
    credentials to staging/UAT environments before project start.
(d) Provide formal UAT sign-off within 5 business days of
    receiving deliverables for review.
(e) Ensure developer support is available and responsive
    during the project timeline for data layer implementation.
(f) Ensure all data collection complies with applicable
    privacy laws (PDPA, GDPR, CCPA, or local equivalents).
    The Consultant is not responsible for the Client's
    privacy compliance.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. INTELLECTUAL PROPERTY

All custom documentation, reports, and deliverables produced
specifically for this engagement become the property of the
Client upon receipt of full payment.

The Consultant retains the right to reference the general
nature of the engagement in their professional portfolio,
without disclosing any confidential business data.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. CONFIDENTIALITY

Both parties agree to keep confidential any proprietary or
commercially valuable information shared during this
engagement, for a period of 2 years following completion.

The Consultant shall not share the Client's analytics data,
business metrics, or platform credentials with any third party.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7. REVISIONS AND CHANGE ORDERS

Up to two (2) rounds of revisions to agreed deliverables
are included within the project fee.

Additional revisions or scope changes will be billed at
$${hr} USD/hour, confirmed in a written Change Order
before work proceeds.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8. TERMINATION

Either party may terminate this Agreement with 14 days'
written notice delivered via email.

Upon termination:
• The Client will pay for all work completed to date.
• The 50% deposit is non-refundable if work has commenced.
• The Consultant will deliver all completed work within
  5 business days of the termination date.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

9. LIMITATION OF LIABILITY

The Consultant's total liability shall not exceed the total
fees paid for the current project or most recent 30-day
retainer period.

The Consultant is not liable for indirect or consequential
business losses, data loss caused by third-party platform
failures, or service outages outside the Consultant's control.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

10. INDEPENDENT CONTRACTOR

The Consultant is an independent contractor, not an employee
of the Client. The Consultant is solely responsible for their
own taxes, social security contributions, and professional
expenses.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

11. GOVERNING LAW

This Agreement is governed by the laws of the Republic of the
Philippines. Disputes shall first be resolved through
good-faith negotiation within 15 days of written notice.
If unresolved, disputes shall be submitted to the appropriate
courts in the Philippines with jurisdiction over the matter.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

12. ENTIRE AGREEMENT

This Agreement, together with any attached project scope or
measurement plan, constitutes the entire agreement between
the parties. Amendments must be in writing and signed by
both parties.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SIGNATURES

Service Provider:
  Signature: ________________________________
  Name:      ${pn}
  Date:      ________________________________

Client:
  Signature: ________________________________
  Name:      ${cc}
  Title:     [Client Title / Position]
  Company:   ${cn}
  Date:      ________________________________`;
    }
  };
}

window.CONTRACTS = {
  'aa_tealium_hybrid': makeContract(
    'Adobe Analytics via Tealium iQ — Hybrid Ionic-Angular App',
    'implement Adobe Analytics via Tealium iQ into the Client\'s Hybrid Ionic-Angular mobile application for both iOS and Android',
    '$900–$1,800 USD',
    '4–6 business days after project start',
    '• Tealium iQ mobile profile published to production\n• Adobe Analytics collecting data on both iOS and Android\n• UDO specification document\n• Tealium connector variable mapping documentation\n• Validated QA report (DEV, UAT, PROD)\n• Implementation guide and handover documentation'
  ),
  'aa_gtm_hybrid': makeContract(
    'Google Analytics 4 via GTM — Hybrid Ionic-Angular App',
    'implement Google Analytics 4 via Google Tag Manager into the Client\'s Hybrid Ionic-Angular mobile application',
    '$700–$1,400 USD',
    '3–5 business days after project start',
    '• GA4 data streams active with all agreed events tracking\n• GTM iOS and Android containers published to production\n• Firebase integration validated on both platforms\n• QA validation report (DEV, UAT, PROD)\n• GTM container exports (JSON) and implementation documentation'
  ),
  'aa_launch_hybrid': makeContract(
    'Adobe Analytics via Adobe Launch — Hybrid Ionic-Angular App',
    'implement Adobe Analytics via Adobe Launch into the Client\'s Hybrid Ionic-Angular mobile application for both iOS and Android',
    '$900–$1,800 USD',
    '4–6 business days after project start',
    '• Adobe Launch mobile property published to production\n• Adobe Analytics collecting data on both iOS and Android\n• Data layer specification\n• Launch property documentation (data elements, rules)\n• Validated QA report (DEV, UAT, PROD)\n• Implementation guide and handover documentation'
  ),
  'aa_tealium_native': makeContract(
    'Adobe Analytics via Tealium iQ — Native iOS & Android App',
    'implement Adobe Analytics via Tealium iQ into the Client\'s native iOS and Android mobile application',
    '$1,200–$2,500 USD',
    '5–8 business days after project start',
    '• Tealium iQ mobile profile published to production\n• Adobe Analytics collecting data on both native platforms\n• UDO specification document\n• iOS and Android integration guides\n• Validated QA report (DEV, UAT, PROD)\n• Full implementation documentation'
  ),
  'aa_gtm_native': makeContract(
    'Google Analytics 4 via GTM — Native iOS & Android App',
    'implement Google Analytics 4 via Google Tag Manager into the Client\'s native iOS and Android application',
    '$1,000–$2,000 USD',
    '4–7 business days after project start',
    '• GA4 data streams active on both native platforms\n• GTM iOS and Android containers published to production\n• Firebase event tracking implemented in Swift and Kotlin\n• QA validation report (DEV, UAT, PROD)\n• GTM container exports and implementation documentation'
  ),
  'aa_launch_native': makeContract(
    'Adobe Analytics via Adobe Launch — Native iOS & Android App',
    'implement Adobe Analytics via Adobe Launch into the Client\'s native iOS and Android mobile application',
    '$1,200–$2,500 USD',
    '5–8 business days after project start',
    '• Adobe Launch mobile property published to production\n• Adobe Analytics collecting data on both native platforms\n• iOS (Swift) and Android (Kotlin) implementation guides\n• Validated QA report (DEV, UAT, PROD)\n• Full implementation documentation'
  ),
  'aa_tealium_web': makeContract(
    'Adobe Analytics via Tealium iQ — Website',
    'implement Adobe Analytics via Tealium iQ on the Client\'s website',
    '$600–$1,200 USD',
    '3–5 business days after project start',
    '• Tealium iQ web profile published to production\n• Adobe Analytics collecting data across all agreed page templates\n• UDO specification per page type\n• Tealium tag configuration and variable mapping documentation\n• Validated QA report (DEV, UAT, PROD)\n• Update guide for future tracking additions'
  ),
  'aa_gtm_web': makeContract(
    'Google Analytics 4 via GTM — Website',
    'implement Google Analytics 4 via Google Tag Manager on the Client\'s website',
    '$500–$1,000 USD',
    '2–4 business days after project start',
    '• GA4 property configured with all agreed events and conversions\n• GTM container published to production\n• GA4 DebugView validation screenshots\n• GTM container export (JSON) and implementation documentation\n• QA report (DEV, UAT, PROD)'
  ),
  'aa_launch_web': makeContract(
    'Adobe Analytics via Adobe Launch — Website',
    'implement Adobe Analytics via Adobe Launch on the Client\'s website',
    '$600–$1,200 USD',
    '3–5 business days after project start',
    '• Adobe Launch web property published to production\n• Adobe Analytics collecting data across all agreed page templates\n• Data element inventory and rule inventory\n• Validated QA report (DEV, UAT, PROD)\n• Measurement plan and update guide'
  ),
  'pixels_tealium': makeContract(
    'Marketing Pixel Implementation via Tealium iQ — Website',
    'implement all agreed marketing tracking pixels via Tealium iQ on the Client\'s website',
    '$400–$800 USD',
    '1–3 business days after project start',
    '• All agreed pixels active and validated in their ad platforms\n• Tealium iQ profile published to production\n• Pixel inventory document (platforms, IDs, pages, conversion events)\n• Pixel helper validation screenshots\n• QA report (DEV, UAT, PROD)'
  ),
  'pixels_gtm': makeContract(
    'Marketing Pixel Implementation via GTM — Website',
    'implement all agreed marketing tracking pixels via Google Tag Manager on the Client\'s website',
    '$350–$700 USD',
    '1–2 business days after project start',
    '• All agreed pixels active and validated in their ad platforms\n• GTM container published to production\n• Pixel inventory document\n• GTM container export (JSON)\n• QA report (DEV, UAT, PROD)'
  ),
  'pixels_launch': makeContract(
    'Marketing Pixel Implementation via Adobe Launch — Website',
    'implement all agreed marketing tracking pixels via Adobe Launch on the Client\'s website',
    '$400–$800 USD',
    '1–3 business days after project start',
    '• All agreed pixels active and validated in their ad platforms\n• Adobe Launch library published to production\n• Pixel inventory and Launch rule documentation\n• QA report (DEV, UAT, PROD)'
  ),
  'ua_migration': makeContract(
    'Universal Analytics → GA4 Migration',
    'migrate the Client\'s existing Universal Analytics implementation to Google Analytics 4',
    '$700–$1,800 USD',
    '3–7 business days (plus 4–8 week parallel validation period)',
    '• GA4 property fully configured with all agreed events, conversions, and custom dimensions\n• Parallel tracking period completed with data validation report\n• UA audit and migration mapping document\n• GA4 Explore reports or Looker Studio dashboard recreated\n• Historical UA data export guidance\n• Full migration documentation'
  ),
  'seo_weekly': makeContract(
    'Weekly SEO Monitoring & Reporting — Ongoing Retainer',
    'provide weekly SEO monitoring, rank tracking, technical health checking, and reporting for the Client\'s website',
    '$80–$200 USD per week (billed monthly)',
    'Ongoing monthly retainer — first report delivered 7 days after commencement',
    '• Weekly Google Search Console performance summary\n• Weekly rank tracking report for agreed keyword set\n• Index coverage and crawl health log\n• Core Web Vitals status update\n• Backlink monitoring summary\n• Technical SEO spot check notes\n• Written weekly SEO summary with recommendations'
  ),
  'seo_monthly': makeContract(
    'Monthly SEO Audit & Reporting — Ongoing Retainer',
    'provide monthly SEO auditing, keyword analysis, technical review, and reporting for the Client\'s website',
    '$175–$450 USD per month (billed monthly)',
    'Ongoing monthly retainer — report delivered by the 10th of the following month',
    '• Full monthly keyword performance report (MoM and YoY)\n• Full technical SEO crawl audit report\n• Content performance review with optimization recommendations\n• Backlink profile report\n• Competitor keyword gap analysis\n• Monthly SEO report with action plan'
  ),
  'seo_quarterly': makeContract(
    'Quarterly SEO Strategy & Reporting',
    'provide quarterly SEO strategy review, deep technical auditing, content gap analysis, and performance reporting for the Client\'s website',
    '$450–$1,000 USD per quarter (billed at start of quarter)',
    'Quarterly engagement — deliverables within 10 business days of quarter end',
    '• Keyword strategy refresh with Q+1 priority list\n• Deep technical SEO audit (all WCAG-level factors)\n• Full content audit and Q+1 editorial calendar\n• Backlink acquisition strategy review\n• Algorithm update impact assessment\n• CRO analysis for organic landing pages\n• Comprehensive QoQ and YoY SEO report and QBR presentation'
  ),
  'analytics_weekly': makeContract(
    'Weekly Web Analytics Monitoring — Ongoing Retainer',
    'provide weekly web analytics monitoring, data quality checking, and reporting for the Client\'s digital properties',
    '$60–$160 USD per week (billed monthly)',
    'Ongoing monthly retainer — first report delivered 7 days after commencement',
    '• Weekly traffic and channel performance summary\n• Conversion tracking health check\n• Top pages performance summary\n• Data quality health log\n• Paid media attribution check\n• Written weekly analytics summary with observations and recommendations'
  ),
  'analytics_monthly': makeContract(
    'Monthly Web Analytics Reporting — Ongoing Retainer',
    'provide monthly web analytics analysis, funnel reporting, audience insights, and data integrity monitoring for the Client\'s digital properties',
    '$150–$380 USD per month (billed monthly)',
    'Ongoing monthly retainer — report delivered by the 10th of the following month',
    '• Full monthly traffic and acquisition analysis\n• Conversion and revenue deep dive\n• Funnel and user journey analysis\n• Audience and engagement report\n• Content performance review\n• Data integrity audit\n• Monthly analytics report and 30-minute review call'
  ),
  'analytics_quarterly': makeContract(
    'Quarterly Web Analytics Review & Strategy',
    'provide quarterly web analytics data review, implementation audit, attribution analysis, and strategic reporting for the Client\'s digital properties',
    '$350–$800 USD per quarter (billed at start of quarter)',
    'Quarterly engagement — deliverables within 10 business days of quarter end',
    '• Full quarterly data review with QoQ and YoY comparison\n• KPI framework review and alignment\n• Analytics implementation audit\n• Attribution model review and recommendation\n• Advanced user behavior analysis (cohort, path, funnel)\n• Quarterly analytics report and QBR presentation'
  ),
  'a11y_weekly': makeContract(
    'Weekly Accessibility Monitoring — Ongoing Retainer',
    'provide weekly accessibility monitoring, automated scanning, and issue logging for the Client\'s website',
    '$40–$120 USD per week (billed monthly)',
    'Ongoing monthly retainer — first report delivered 7 days after commencement',
    '• Weekly automated accessibility scan report\n• New content and template accessibility review\n• Color contrast and visual check\n• Keyboard navigation spot check\n• Weekly accessibility issue log with severity classification'
  ),
  'a11y_monthly': makeContract(
    'Monthly Accessibility Audit — Ongoing Retainer',
    'provide monthly accessibility auditing, screen reader testing, WCAG compliance checking, and reporting for the Client\'s website',
    '$150–$450 USD per month (billed monthly)',
    'Ongoing monthly retainer — report delivered by the 10th of the following month',
    '• Full automated accessibility scan across all page templates\n• Screen reader testing (NVDA, VoiceOver, TalkBack)\n• WCAG 2.1 AA compliance check\n• Mobile accessibility check\n• PDF and document accessibility review\n• Monthly accessibility report with open issue inventory'
  ),
  'a11y_quarterly': makeContract(
    'Quarterly Accessibility Audit & Roadmap',
    'provide comprehensive quarterly WCAG 2.1/2.2 accessibility auditing, assistive technology testing, and accessibility roadmap for the Client\'s website',
    '$450–$1,200 USD per quarter (billed at start of quarter)',
    'Quarterly engagement — deliverables within 10 business days of quarter end',
    '• Comprehensive WCAG 2.1 AA audit with formal issue inventory\n• Assistive technology compatibility testing (NVDA, JAWS, VoiceOver, TalkBack)\n• Color and typography accessibility review with color accessibility matrix\n• Accessibility regression testing setup\n• Legal and compliance review\n• Quarterly accessibility report and prioritized improvement roadmap'
  ),
};

window.CONTRACT_OPTIONS = [
  { value:'', label:'— Select a service to load its contract —' },
  { value:'aa_tealium_hybrid', label:'Adobe Analytics via Tealium iQ — Hybrid App' },
  { value:'aa_gtm_hybrid',    label:'GA4 via GTM — Hybrid App' },
  { value:'aa_launch_hybrid', label:'Adobe Analytics via Launch — Hybrid App' },
  { value:'aa_tealium_native', label:'Adobe Analytics via Tealium iQ — Native App' },
  { value:'aa_gtm_native',    label:'GA4 via GTM — Native App' },
  { value:'aa_launch_native', label:'Adobe Analytics via Launch — Native App' },
  { value:'aa_tealium_web',   label:'Adobe Analytics via Tealium iQ — Website' },
  { value:'aa_gtm_web',       label:'GA4 via GTM — Website' },
  { value:'aa_launch_web',    label:'Adobe Analytics via Launch — Website' },
  { value:'pixels_tealium',   label:'Marketing Pixels via Tealium iQ — Website' },
  { value:'pixels_gtm',       label:'Marketing Pixels via GTM — Website' },
  { value:'pixels_launch',    label:'Marketing Pixels via Launch — Website' },
  { value:'ua_migration',     label:'UA → GA4 Migration' },
  { value:'seo_weekly',       label:'Weekly SEO Monitoring (Retainer)' },
  { value:'seo_monthly',      label:'Monthly SEO Audit (Retainer)' },
  { value:'seo_quarterly',    label:'Quarterly SEO Strategy' },
  { value:'analytics_weekly', label:'Weekly Web Analytics Monitoring (Retainer)' },
  { value:'analytics_monthly',label:'Monthly Web Analytics Reporting (Retainer)' },
  { value:'analytics_quarterly', label:'Quarterly Web Analytics Review' },
  { value:'a11y_weekly',      label:'Weekly Accessibility Monitoring (Retainer)' },
  { value:'a11y_monthly',     label:'Monthly Accessibility Audit (Retainer)' },
  { value:'a11y_quarterly',   label:'Quarterly Accessibility Audit & Roadmap' },
];
