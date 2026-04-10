// ─── CURRENCY CONVERSION (approx mid-2024 rates) ─────────────
// 1 USD = 58 PHP | 7.8 HKD | 1.36 CAD | 1.53 AUD
function mc(usdLo, usdHi) {
  const f = (n, r) => Math.round(n * r);
  return {
    usd: `$${usdLo}–${usdHi}`,
    php: `₱${f(usdLo,58).toLocaleString()}–${f(usdHi,58).toLocaleString()}`,
    hkd: `HK$${f(usdLo,7.8).toLocaleString()}–${f(usdHi,7.8).toLocaleString()}`,
    cad: `CA$${f(usdLo,1.36)}–${f(usdHi,1.36)}`,
    aud: `A$${f(usdLo,1.53)}–${f(usdHi,1.53)}`
  };
}
function step(n, name, desc, timeLow, timeHigh, usdLo, usdHi) {
  return { n, name, desc, time: `${timeLow}–${timeHigh} hrs`, cost: mc(usdLo, usdHi) };
}
function stepFix(n, name, desc, time, usdLo, usdHi) {
  return { n, name, desc, time, cost: mc(usdLo, usdHi) };
}

// ─── SHARED STEPS ────────────────────────────────────────────
const preDiscovery = (n) => stepFix(n, 'Business requirements gathering',
  'Client provides initial requirements document, screenshots or Figma mockups of tracked pages/interactions, access to design system, test login credentials to staging/UAT environments, and list of stakeholders. Consultant reviews and confirms scope.',
  '1–3 hrs', 25, 85);

const measurementPlan = (n) => stepFix(n, 'Discovery & measurement plan',
  'Workshop with client to define all business KPIs, trackable pages, user interactions, conversion events, and variable taxonomy (eVars, props, events for Adobe; event schema for GA4). Output: formal measurement plan document signed off by stakeholders.',
  '3–6 hrs', 75, 195);

const tagSpec = (n) => stepFix(n, 'Tag specification document',
  'Produce a detailed tag specification (tag spec) covering: page-level data layer variables with expected values per template, event-level tracking code specs for every interaction, custom dimension/metric definitions, and any additional recommended tracking beyond client requirements. This doc is handed to the development team for implementation.',
  '3–5 hrs', 90, 165);

const deployDev = (n, tms) => stepFix(n, 'Deploy to DEV and test in DEV',
  `Publish ${tms} library/profile to the DEV environment. Steps: (1) Build and publish the library/profile to the DEV environment endpoint. (2) Deploy the updated app build or website to the development server. (3) Using browser debugger tools (Adobe Experience Cloud Debugger, Chrome DevTools, Charles Proxy, or Tealium Tools), verify that the SDK/snippet loads correctly. (4) Walk through all tracked pages and interactions per the measurement plan. (5) Confirm all tracking calls fire with correct variable values and payloads. (6) Log any discrepancies and resolve before proceeding to UAT.`,
  '3–5 hrs', 75, 165);

const deployUAT = (n, tms) => stepFix(n, 'Deploy to UAT and test in UAT',
  `Publish ${tms} library/profile to the UAT (User Acceptance Testing) environment. Steps: (1) Build and publish the library/profile to the UAT environment endpoint. (2) Deploy the updated app build or website to the UAT/staging server. (3) Conduct structured QA against the measurement plan — test every tracked page, every interaction, and every conversion event. (4) Use the same debugger tools as DEV to confirm payloads. (5) Walk client stakeholders through each tracked scenario in a shared QA session. (6) Document pass/fail status for every test case in the QA log. (7) Resolve all failing test cases and re-test. (8) Obtain written UAT sign-off from the client before proceeding to PROD.`,
  '3–5 hrs', 75, 165);

const deployProd = (n, tms) => stepFix(n, 'Deploy to PROD and monitor in PROD',
  `After written UAT sign-off, publish ${tms} library/profile to the PRODUCTION environment. Steps: (1) Build and publish the library/profile to the PROD environment endpoint. (2) Coordinate with the client's release team to deploy the app or website update to production. (3) Immediately after release, verify the snippet/SDK loads correctly on production using the debugger tools. (4) Spot-check 5–10 key pages and interactions in real time. (5) Monitor the analytics platform's real-time reporting and Realtime dashboard for 48–72 hours. (6) Verify data is flowing correctly into all reports, dashboards, and downstream integrations (e.g., Google Ads, Adobe Target, CRM). (7) Flag and resolve any post-release data anomalies.`,
  '3–5 hrs', 75, 165);

const docHandover = (n) => stepFix(n, 'Documentation and handover',
  'Deliver complete implementation package: measurement plan, data layer specification, variable mapping matrix, tag/rule/connector inventory, QA test results, and a "how to add new events" guide. Conduct 1-hour handover call with client team and walk through all documentation.',
  '3–5 hrs', 75, 165);

// ─── TEALIUM STEPS (web) ─────────────────────────────────────
function tealiumWebSteps(platform) {
  let n = 1;
  return [
    preDiscovery(n++),
    measurementPlan(n++),
    tagSpec(n++),
    stepFix(n++, 'Tealium iQ profile setup',
      'Create the Tealium iQ web profile. Configure DEV, QA, and PROD publish environments. Set up user permissions, version control settings, and profile-level settings. Verify license and connectivity.',
      '2–3 hrs', 50, 100),
    stepFix(n++, 'utag.js snippet deployment',
      'Add the Tealium utag.js snippet inside <head> on every page — via CMS plugin, template file, or developer. Verify correct loading order on all page templates and single-page app route changes.',
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Universal Data Object (UDO) implementation',
      'Implement the utag_data JavaScript object on every page type. Populate server-side or client-side with the correct variable values for each template before utag.js fires. Handle SPA route changes with utag.link() or re-initialization.',
      '3–6 hrs', 75, 195),
    stepFix(n++, platform + ' tag configuration in Tealium iQ',
      `Add and configure the ${platform} tag from the Tealium marketplace. Map all UDO variables to the tag\'s required parameters (eVars/props/events for Adobe Analytics; event names/parameters for GA4). Set report suite IDs or Measurement IDs per environment. Configure any tag-specific advanced settings (link tracking, channel grouping, etc.). This step typically takes 4–8 hours for large measurement plans.`,
      '4–8 hrs', 100, 260),
    stepFix(n++, 'Tealium extension validation (30 extensions)',
      'Validate all 30 standard Tealium iQ extensions. Easy extensions (×10, ~30 min each): Data Layer, Set DOM Ready, Flatten JSON, Encode URL, Set Data Value, Copy Data Value, Parse URL, Read Cookie, Restrict to Specific Pages, Session Counter. Mid extensions (×10, ~1 hr each): Conditional Values, Advanced Conditional Values, Limit Frequency, Event Conditions, Data Conversion, Persistent Data Value, Visit ID, Visitor ID, Cross-Domain Tracking, Click Tracking. Complex extensions (×10, ~2 hrs each): GDPR/Consent Aware, Adobe Analytics Link Tracking, Adobe Analytics Process Rules, GA4 Ecommerce Mapping, Form Tracking, Video Tracking, Scroll Tracking, Hover Tracking, Performance Timing, Error Tracking. Total estimated: 10–22 hrs across complexity tiers.',
      '10–22 hrs', 260, 715),
    stepFix(n++, 'Load rules and event rules configuration',
      'Configure load rules to control tag firing scope per page type, URL pattern, or data layer condition. Set up event tracking rules for all interactions using Tealium event tracking extension or utag.link() calls. Validate rule logic with Tealium Tools browser extension.',
      '2–5 hrs', 50, 165),
    deployDev(n++, 'Tealium iQ'),
    deployUAT(n++, 'Tealium iQ'),
    deployProd(n++, 'Tealium iQ'),
    docHandover(n++),
  ];
}

// ─── GTM STEPS (web) ─────────────────────────────────────────
function gtmWebSteps(platform) {
  let n = 1;
  return [
    preDiscovery(n++),
    measurementPlan(n++),
    tagSpec(n++),
    stepFix(n++, 'GTM container setup',
      'Create or access the GTM Web container. Deploy the GTM snippet (head + body code) sitewide via CMS or developer. Verify the container loads on all page templates including error pages and login screens.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'Data layer implementation',
      'Coordinate with the development team to push all required data to the GTM data layer per the tag spec. Create GTM Data Layer variables to read those values into tags. Validate data layer availability on all page types and on dynamic interactions.',
      '2–5 hrs', 50, 165),
    stepFix(n++, platform + ' base tag / configuration tag',
      `Create and configure the ${platform} base tag or Configuration tag in GTM. Set up Measurement ID, report suite ID, or tracking server as applicable. Configure consent mode, user properties, and cross-domain linking if required.`,
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Custom event tags and triggers',
      'Create GTM tags for every custom event in the measurement plan. Configure event parameters, e-commerce data layer mappings, and any custom dimension/metric mappings. Set Click, Form, Custom Event, or Element Visibility triggers with precise conditions for each event.',
      '4–8 hrs', 100, 260),
    stepFix(n++, 'GTM variable configuration',
      'Create all required GTM variables: Data Layer variables, DOM Element variables, URL variables, and JavaScript variables. Build any Lookup Table or RegEx Table variables needed for classification or conditional logic.',
      '2–4 hrs', 50, 130),
    deployDev(n++, 'GTM'),
    deployUAT(n++, 'GTM'),
    deployProd(n++, 'GTM'),
    docHandover(n++),
  ];
}

// ─── ADOBE LAUNCH STEPS (web) ────────────────────────────────
function launchWebSteps(platform) {
  let n = 1;
  return [
    preDiscovery(n++),
    measurementPlan(n++),
    tagSpec(n++),
    stepFix(n++, 'Adobe Launch web property setup',
      'Create the Launch web property in Adobe Experience Platform Data Collection. Configure DEV, Staging, and PROD environments. Set up embed codes. Install the Analytics or Google Analytics extension plus any supporting extensions (Core, Experience Cloud ID Service).',
      '2–3 hrs', 50, 100),
    stepFix(n++, 'Data layer implementation',
      'Design and implement the client-side data layer (adobeDataLayer or custom window object) across all page templates. Ensure the data layer populates fully before the Launch embed code fires. Handle SPA route changes.',
      '2–5 hrs', 50, 165),
    stepFix(n++, platform + ' extension configuration',
      `Configure the ${platform} extension: set tracking server, report suite IDs (Adobe) or Measurement ID (GA4) per environment, configure link tracking settings, character set, currency, ID service, and any advanced extension options. Larger measurement plans require 4–6 hours for variable configuration.`,
      '3–6 hrs', 75, 195),
    stepFix(n++, 'Data elements creation',
      'Build Launch data elements reading values from the data layer, DOM, query string, cookies, and JavaScript variables. Create one data element per measurement plan variable to keep rules clean and maintainable.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'Rules for page views and events',
      'Build Launch rules: one page view rule (page bottom) with Set Variables + Send Beacon actions for all page-level tracking; individual event rules for each interaction type using Click, Direct Call, or Custom Event conditions. Wire all data elements into the appropriate rule actions.',
      '4–8 hrs', 100, 260),
    deployDev(n++, 'Adobe Launch'),
    deployUAT(n++, 'Adobe Launch'),
    deployProd(n++, 'Adobe Launch'),
    docHandover(n++),
  ];
}

// ─── ADOBE ANALYTICS PLATFORM CONFIG STEPS ──────────────────
function aaConfigSteps() {
  let n = 1;
  return [
    stepFix(n++, 'Adobe Analytics Admin — report suite setup',
      'In Adobe Analytics Admin, create or configure the report suite(s) for DEV, UAT, and PROD. Set the correct time zone, currency, base URL, IP exclusions, and data retention settings.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'Traffic variable (prop) configuration',
      'Define and configure all required traffic variables (props): set the prop name, enable pathing if needed, configure list props where applicable. Map prop numbers to the measurement plan.',
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Conversion variable (eVar) configuration',
      'Define and configure all required conversion variables (eVars): set name, allocation model (Most Recent, First Touch, Linear, Participation), expiration, and binding events where applicable. Map eVar numbers to the measurement plan.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'Custom event configuration',
      'Define and configure all required custom events (Event 1–1000): set name, type (Counter, Currency, Numeric), serialization, participation, and polarity. Map event numbers to the measurement plan.',
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Processing rules configuration',
      'Create Adobe Analytics processing rules to map contextData variables to props and eVars, manipulate values (string operations, concatenation), and set rules for fallback values. Requires Admin rights.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'Classification setup',
      'Set up SAINT classifications for any props or eVars that require dimensional breakdowns (e.g., product category, campaign channel). Configure classification hierarchies and upload initial classification data.',
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Virtual report suite configuration',
      'Create virtual report suites (VRS) if required for segmented reporting views (e.g., by region, product line, or app type). Configure VRS-level curation and component availability.',
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Calculated metrics and segments',
      'Build calculated metrics for KPIs that require formula-based computation (bounce rate adjusted, revenue per visit, conversion rate). Create standard segments (New Visitors, Logged-In Users, Mobile Traffic) for use in Workspace reports.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'Analysis Workspace report build',
      'Build the standard Analytics Workspace project for the client: executive summary panel, traffic overview, event performance panel, conversion funnel, and any custom KPI panels. Save as a shared project for the client team.',
      '3–6 hrs', 75, 195),
    stepFix(n++, 'Adobe Analytics Admin validation',
      'Validate all configuration in the DEV report suite: confirm data is flowing, variable values are correct, processing rules are applying, and events are firing. Check for data discrepancies between the tag debugger and the Analytics interface.',
      '2–4 hrs', 50, 130),
  ];
}

// ─── GOOGLE ANALYTICS PLATFORM CONFIG STEPS ─────────────────
function gaConfigSteps() {
  let n = 1;
  return [
    stepFix(n++, 'GA4 property setup and configuration',
      'Create or configure the GA4 property. Set the correct time zone, currency, industry category, and business objectives. Configure data streams (Web, iOS, Android) with appropriate Measurement IDs.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'Enhanced Measurement configuration',
      'Review and configure Enhanced Measurement settings: scrolls, outbound clicks, site search, video engagement, file downloads. Enable or disable per the measurement plan requirements.',
      '30–60 min', 12, 33),
    stepFix(n++, 'Custom dimensions and metrics setup',
      'Define and configure all required custom dimensions (event-scoped, user-scoped, item-scoped) and custom metrics in GA4 Admin. Map to the measurement plan variable taxonomy. Register all parameters used in custom events.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'Conversion event configuration',
      'Mark the correct events as conversions in GA4 Admin. Configure conversion counting: once per event vs once per session. Set up any cross-device or cross-domain attribution as needed.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'Audience definition',
      'Create standard audiences in GA4 for remarketing and analysis: New Users, Engaged Users, Purchasers, Cart Abandoners, and any custom audiences per the client\'s marketing needs. Link to Google Ads if applicable.',
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Google Ads and Search Console linking',
      'Link the GA4 property to Google Ads for conversion import and remarketing. Link to Google Search Console for organic search query data in GA4 reports.',
      '30–60 min', 12, 33),
    stepFix(n++, 'Data retention and consent settings',
      'Set data retention to the maximum (14 months). Configure user data collection, Google Signals, and consent mode settings per the client\'s privacy policy and applicable regulations (PDPA, GDPR, CCPA).',
      '30–60 min', 12, 33),
    stepFix(n++, 'GA4 Explore reports and Looker Studio dashboard',
      'Build GA4 Explore reports for: funnel analysis, path exploration, cohort analysis, and user lifetime value. Connect GA4 to Looker Studio and build a standard monthly performance dashboard for the client.',
      '3–6 hrs', 75, 195),
    stepFix(n++, 'BigQuery export setup (optional)',
      'If the client has BigQuery, configure the GA4 BigQuery export (daily or streaming). Verify the dataset is receiving data. Provide sample SQL queries for common reporting use cases.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'GA4 configuration validation',
      'Validate all GA4 Admin configuration using GA4 DebugView and Realtime reports. Confirm all custom dimensions, events, and conversions are recording correctly. Compare data against the tag debugger.',
      '2–4 hrs', 50, 130),
  ];
}

// ─── TEALIUM STEPS (mobile) ──────────────────────────────────
function tealiumMobileSteps(platform, nativeLang) {
  let n = 1;
  return [
    preDiscovery(n++),
    measurementPlan(n++),
    tagSpec(n++),
    stepFix(n++, 'Tealium iQ mobile profile setup',
      'Create the Tealium iQ mobile profile. Configure DEV, QA, and PROD publish environments. Install Tealium Swift SDK (iOS) and Kotlin SDK (Android) via dependency managers. Configure TealiumConfig with account, profile, and environment.',
      '2–3 hrs', 50, 100),
    stepFix(n++, 'SDK integration and module registration',
      `Register required Tealium modules: RemoteCommands (for ${platform}), Lifecycle, Crash Reporter. Configure collect endpoint, batch sizes, and offline storage. Handle iOS App Transport Security and Android network security config.`,
      '3–5 hrs', 75, 165),
    stepFix(n++, 'Universal Data Object (UDO) definition and implementation',
      'Define the UDO structure — all variables populated on every screen and event (screen name, user ID, app version, event category, etc.). Implement UDO population logic in the app on route changes (screen views) and user interactions (events).',
      '4–7 hrs', 100, 230),
    stepFix(n++, platform + ' connector configuration in Tealium iQ',
      `Configure the ${platform} Remote Command connector. Map all UDO variables to the correct tag parameters (eVars/props/events for Adobe; event names/params for GA4). Set report suite IDs or Measurement IDs per environment. This step requires 4–8 hours for large measurement plans.`,
      '4–8 hrs', 100, 260),
    stepFix(n++, 'Tealium extension validation (30 extensions)',
      'Validate all 30 standard Tealium iQ extensions for mobile context. Easy (×10, ~30 min): Data Layer, Set Data Value, Copy Data Value, Flatten JSON, Data Conversion, Set DOM Ready, Parse URL, Encode URL, Conditional Values, Read Cookie. Mid (×10, ~1 hr): Advanced Conditional Values, Limit Frequency, Event Conditions, Persistent Data Value, Session Counter, Visit ID, Visitor ID, Restrict to Specific Pages, Cross-Domain Tracking, Click Tracking. Complex (×10, ~2 hrs): GDPR/Consent Aware, Adobe Analytics Link Tracking, Adobe Analytics Process Rules, GA4 Ecommerce Mapping, Form Tracking, Video Tracking, Scroll Tracking, Hover Tracking, Performance Timing, Error Tracking. Total: 10–22 hrs.',
      '10–22 hrs', 260, 715),
    deployDev(n++, 'Tealium iQ (mobile)'),
    deployUAT(n++, 'Tealium iQ (mobile)'),
    deployProd(n++, 'Tealium iQ (mobile)'),
    docHandover(n++),
  ];
}

// ─── GTM STEPS (mobile) ──────────────────────────────────────
function gtmMobileSteps(platform) {
  let n = 1;
  return [
    preDiscovery(n++),
    measurementPlan(n++),
    tagSpec(n++),
    stepFix(n++, 'Firebase project setup',
      'Create or configure Firebase project. Add iOS and Android app registrations. Download GoogleService-Info.plist (iOS) and google-services.json (Android). Configure Firebase in Xcode and Android Studio.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'GA4 property and data streams linking',
      'Create or verify GA4 property. Link Firebase project to GA4. Add iOS and Android data streams. Note Measurement IDs. Enable Enhanced Measurement for applicable events.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'GTM mobile containers setup',
      'Create iOS and Android GTM containers. Download native container JSON files. Add to Xcode (add to bundle) and Android Studio (assets folder). Configure GTM container manager initialization in app code.',
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Firebase and GTM SDK integration',
      `Add Firebase Analytics and GTM SDK dependencies (CocoaPods/SPM for iOS, Gradle for Android). Initialize Firebase in AppDelegate/Application class. Initialize GTM container manager. Configure ${platform}-specific tracking parameters.`,
      '3–6 hrs', 75, 195),
    stepFix(n++, 'Event tracking implementation in app code',
      'Implement logEvent() or trackAction() calls at every required screen view and interaction in both iOS and Android codebases. Pass all event parameters per the tag specification. Handle edge cases (null values, deep links, push notification opens).',
      '5–10 hrs', 125, 325),
    stepFix(n++, 'GTM tags, triggers, and variables configuration',
      'In GTM, configure event tags mapped to Firebase events. Set up triggers by Firebase event name and parameters. Create variable configurations for event parameter extraction. Test in GTM Preview mode connected to a physical device.',
      '2–5 hrs', 50, 165),
    deployDev(n++, 'GTM (mobile)'),
    deployUAT(n++, 'GTM (mobile)'),
    deployProd(n++, 'GTM (mobile)'),
    docHandover(n++),
  ];
}

// ─── ADOBE LAUNCH STEPS (mobile) ─────────────────────────────
function launchMobileSteps(platform) {
  let n = 1;
  return [
    preDiscovery(n++),
    measurementPlan(n++),
    tagSpec(n++),
    stepFix(n++, 'Adobe Launch mobile property setup',
      'Create the Launch mobile property in Adobe Experience Platform Data Collection. Configure iOS and Android DEV, QA, and PROD environments. Install the Analytics, Identity, Lifecycle, and Signal extensions from the extension catalog.',
      '2–3 hrs', 50, 100),
    stepFix(n++, 'AEP Mobile SDK integration',
      'Install the Adobe Experience Platform Mobile SDK via Swift Package Manager/CocoaPods (iOS) and Gradle (Android). Register all extensions in AppDelegate (iOS) and Application class (Android). Configure MobileCore with the Launch App ID.',
      '3–6 hrs', 75, 195),
    stepFix(n++, 'Data layer and context data design',
      `Design the contextData dictionary structure that will be passed with every trackState() and trackAction() call. Define standard context variables (screen name, user ID, app version) and event-specific variables aligned to the tag specification.`,
      '2–4 hrs', 50, 130),
    stepFix(n++, `${platform} extension configuration in Launch`,
      `Configure the ${platform} extension: tracking server, SSL tracking server, report suite IDs or Measurement IDs per environment. Configure link tracking, lifecycle settings, and any advanced extension options. Map contextData keys to Analytics variables via processing rules or Launch rules.`,
      '4–8 hrs', 100, 260),
    stepFix(n++, 'Screen and event tracking implementation',
      'Implement MobileCore.trackState() for all screen views and MobileCore.trackAction() for all interaction events throughout both iOS and Android codebases. Pass complete contextData dictionaries per the tag specification.',
      '5–10 hrs', 125, 325),
    stepFix(n++, 'Launch rules and data elements (mobile)',
      'Build Launch rules for key mobile events. Create reusable data elements for contextData values. Configure rule conditions to handle platform-specific scenarios (iOS vs Android), and actions to map tracking calls to Analytics variables.',
      '3–6 hrs', 75, 195),
    deployDev(n++, 'Adobe Launch (mobile)'),
    deployUAT(n++, 'Adobe Launch (mobile)'),
    deployProd(n++, 'Adobe Launch (mobile)'),
    docHandover(n++),
  ];
}

// ─── MARKETING PIXEL STEPS ───────────────────────────────────
function pixelSteps(tms) {
  let n = 1;
  const tmsLabel = { tealium: 'Tealium iQ', gtm: 'GTM', launch: 'Adobe Launch' }[tms];
  return [
    preDiscovery(n++),
    stepFix(n++, 'Pixel and event inventory',
      `Document all marketing pixels to implement (Meta, TikTok, LinkedIn, Google Ads, Pinterest, Snapchat, etc.). For each pixel: identify firing pages, conversion events, and required parameters. Gather pixel IDs and conversion event labels from each ad platform account.`,
      '1–3 hrs', 25, 100),
    tagSpec(n++),
    stepFix(n++, `${tmsLabel} pixel tag configuration`,
      `Add and configure each pixel's tag in ${tmsLabel}. For native tag templates (Meta Pixel, Google Ads): use the marketplace template. For platforms without templates (TikTok, LinkedIn, Pinterest): implement via Custom Code/HTML. Configure base PageView tags and all conversion event tags.`,
      '3–6 hrs', 75, 195),
    stepFix(n++, 'Conversion event parameter mapping',
      `Map data layer or UDO variables to pixel-specific event parameters: product IDs, order values, currencies, categories, and hashed email/phone for match quality. Configure standard events (PageView, ViewContent, AddToCart, InitiateCheckout, Purchase, Lead) per each platform's schema.`,
      '2–5 hrs', 50, 165),
    stepFix(n++, 'Load rules and firing conditions',
      `Configure firing conditions: restrict base pixel tags to all pages; restrict conversion event tags to specific confirmation pages or triggered events. Prevent duplicate firing. Set up deduplication event IDs where supported.`,
      '1–3 hrs', 25, 100),
    deployDev(n++, tmsLabel),
    deployUAT(n++, tmsLabel),
    deployProd(n++, tmsLabel),
    stepFix(n++, 'Ad platform validation',
      `In each ad platform's events manager or diagnostics panel, verify pixel shows "Active" with recent signal data. Check match quality scores, event deduplication, and signal accuracy. Resolve any warnings.`,
      '1–2 hrs', 25, 65),
    docHandover(n++),
  ];
}

// ─── UA → GA4 MIGRATION ──────────────────────────────────────
function migrationSteps() {
  let n = 1;
  return [
    preDiscovery(n++),
    stepFix(n++, 'Universal Analytics full audit',
      'Comprehensive audit of the existing UA property: document all views, goals, goal funnels, custom dimensions, custom metrics, filters, audiences, segments, and the top 20 most-used custom reports. This becomes the migration blueprint.',
      '3–6 hrs', 75, 195),
    measurementPlan(n++),
    tagSpec(n++),
    stepFix(n++, 'GA4 property creation and configuration',
      'Create the GA4 property. Configure all data streams, link to Google Ads and Search Console, set data retention to 14 months. Implement consent mode. Configure user data collection and Google Signals settings.',
      '2–3 hrs', 50, 100),
    stepFix(n++, 'Parallel tracking setup',
      'Configure both UA and GA4 to collect simultaneously via the same TMS or gtag.js. Both properties run in parallel for 4–8 weeks to enable data comparison and validation before cutover.',
      '1–3 hrs', 25, 100),
    stepFix(n++, 'Goal and conversion migration',
      'Recreate all UA goals as GA4 conversion events. Map UA goal types (destination, duration, pages/session, event) to GA4 event-based conversions. Verify conversion counting methodology differences and document discrepancies.',
      '2–5 hrs', 50, 165),
    stepFix(n++, 'Custom dimensions, metrics, and e-commerce migration',
      'Recreate all UA custom dimensions and metrics as GA4 custom dimensions/metrics with correct scope (event, user, session, item). Migrate UA Enhanced E-commerce to GA4 e-commerce events using the GA4 item array schema.',
      '4–8 hrs', 100, 260),
    stepFix(n++, 'TMS tag migration (UA → GA4)',
      'Replace or update all UA page view and event tags in GTM, Launch, or Tealium with GA4-equivalent tags. Keep UA tags running during parallel period. Remove UA tags on cutover date.',
      '2–5 hrs', 50, 165),
    deployDev(n++, 'updated TMS'),
    deployUAT(n++, 'updated TMS'),
    deployProd(n++, 'updated TMS'),
    stepFix(n++, 'Parallel data validation',
      'Run both UA and GA4 for 4–8 weeks. Systematically compare session counts, event counts, and conversion data. Investigate all discrepancies >10% and resolve data collection issues. Document known methodology differences (session definition, bounce rate, etc.).',
      '4–8 hrs', 100, 260),
    stepFix(n++, 'GA4 reports and dashboards recreation',
      'Recreate the client\'s most critical UA reports as GA4 Explore reports and Looker Studio dashboards. Train the client team on GA4 reporting differences.',
      '3–6 hrs', 75, 195),
    stepFix(n++, 'UA deprecation and cutover',
      'On the agreed cutover date, remove UA tags and stop UA data collection. Ensure all stakeholders have exported historical UA data (CSV, BigQuery, or Google Sheets). Archive the UA property documentation.',
      '1–2 hrs', 25, 65),
    docHandover(n++),
  ];
}

// ─── SEO CHECKLIST STEPS ─────────────────────────────────────
function seoSteps(cadence) {
  if (cadence === 'weekly') {
    let n = 1;
    return [
      stepFix(n++, 'Google Search Console — performance review',
        'Tools: Google Search Console. Review the Performance report for the past 7 days. Analyze total clicks, impressions, average CTR, and average position by page and query. Flag drops >15% WoW in any metric. Export to Google Sheets for trend tracking.',
        '20–30 min', 12, 18),
      stepFix(n++, 'Index coverage and crawl health check',
        'Tools: Google Search Console, Screaming Frog (quick crawl). Review the Coverage report for new errors (404s, server errors, soft 404s, redirect errors). Compare against last week. Flag any pages newly removed from the index.',
        '15–25 min', 9, 14),
      stepFix(n++, 'Core Web Vitals and page experience check',
        'Tools: Google Search Console (CWV report), PageSpeed Insights, Chrome DevTools. Check for new URLs entering "Poor" or "Needs Improvement" status for LCP, FID/INP, and CLS. Add flagged URLs to the issue tracker for developer action.',
        '15–20 min', 9, 12),
      stepFix(n++, 'Rank tracking report',
        'Tools: Ahrefs, Semrush, SE Ranking, or Moz. Run the weekly keyword position report for the agreed tracked keyword set. Compare WoW positions. Highlight movers (gained 5+ positions) and losers (dropped 5+ positions). Note any keywords entering or leaving the top 3 and top 10.',
        '20–30 min', 12, 18),
      stepFix(n++, 'Backlink monitoring',
        'Tools: Ahrefs (New Backlinks report), Google Search Console (Links report). Check new links gained and lost referring domains. Flag any toxic or suspicious new links for disavow review.',
        '15–20 min', 9, 12),
      stepFix(n++, 'Competitor quick scan',
        'Tools: SimilarWeb, Semrush, manual site review. Perform a 15-minute scan of the top 2–3 competitor websites for new published content, new pages, or significant site changes that may affect rankings. Note any content opportunities.',
        '15–20 min', 9, 12),
      stepFix(n++, 'Technical SEO quick check',
        'Tools: Screaming Frog (spot check), Google Search Console. Spot-check 5–10 recently published or updated pages for missing or duplicate title tags, missing meta descriptions, missing H1, broken internal links, or missing canonical tags.',
        '15–20 min', 9, 12),
      stepFix(n++, 'Weekly SEO summary report',
        'Tools: Google Sheets, Notion, or Confluence. Compile all findings into a 1-page weekly SEO summary: headline metrics, WoW changes, issues found, actions taken, and next recommended actions. Send to stakeholders.',
        '20–30 min', 12, 18),
    ];
  }
  if (cadence === 'monthly') {
    let n = 1;
    return [
      stepFix(n++, 'Full keyword performance review',
        'Tools: Ahrefs, Semrush, SE Ranking, Google Search Console. Pull the complete keyword position report for the month. Segment by brand vs non-brand, by topic cluster, and by position tier (1–3, 4–10, 11–20). Identify top optimization opportunities and keywords at risk of decline.',
        '1–2 hrs', 25, 65),
      stepFix(n++, 'Organic traffic analysis',
        'Tools: Google Analytics 4, Google Search Console. Pull organic traffic for the month. Analyze sessions, engaged sessions, engagement rate, key event completions, and revenue (if applicable). Compare MoM and YoY. Identify top organic landing pages and any pages losing organic traffic.',
        '45–75 min', 18, 49),
      stepFix(n++, 'Full technical SEO audit',
        'Tools: Screaming Frog, Sitebulb, Ahrefs Site Audit, or SEMrush Site Audit. Run a full crawl of the website. Review: broken links (internal and external), redirect chains (3+ hops), missing or duplicate title tags and meta descriptions, missing H1s, orphaned pages, pages blocked by robots.txt that should be indexed, XML sitemap accuracy, hreflang errors (if multilingual), structured data errors (via Google Rich Results Test and Search Console), image alt text coverage, and page speed (Core Web Vitals) across templates.',
        '2–4 hrs', 50, 130),
      stepFix(n++, 'Content performance review',
        'Tools: GA4, Screaming Frog (content audit mode), Ahrefs. Identify top 10 and bottom 10 organic traffic pages for the month. Flag underperforming pages with ranking potential for optimization (update content, add internal links, improve title/meta). Recommend pages for consolidation or removal.',
        '1–2 hrs', 25, 65),
      stepFix(n++, 'Backlink profile review',
        'Tools: Ahrefs, Semrush, Moz. Full backlink audit: new referring domains gained, domains lost, domain rating trend, anchor text distribution, and toxic link review. Generate a disavow file if needed. Review link building progress against targets.',
        '45–75 min', 18, 49),
      stepFix(n++, 'Competitor gap analysis',
        'Tools: Ahrefs Content Gap, Semrush Keyword Gap, SpyFu. Compare keyword rankings against top 3 competitors. Identify keyword gaps (topics competitors rank for in top 10 that the client does not). Present as a prioritized content opportunity list.',
        '45–75 min', 18, 49),
      stepFix(n++, 'Local SEO review (if applicable)',
        'Tools: Google Business Profile, BrightLocal, Moz Local. Review and update the Google Business Profile: respond to all new reviews, verify Q&A accuracy, update hours/contact if changed. Check local pack rankings for key terms. Audit NAP consistency across top 10 directories.',
        '30–60 min', 12, 33),
      stepFix(n++, 'Monthly SEO report',
        'Tools: Google Data Studio (Looker Studio), Google Slides, or agency reporting tool. Produce full monthly SEO report: executive summary, key metrics MoM and YoY comparison table, rank tracking summary, technical findings, content performance, backlink highlights, wins, open issues, and recommended action plan for next month.',
        '1.5–2.5 hrs', 37, 81),
    ];
  }
  // quarterly
  let n = 1;
  return [
    stepFix(n++, 'Comprehensive keyword strategy review',
      'Tools: Ahrefs, Semrush, Google Trends, Google Keyword Planner. Full review and refresh of the keyword strategy. Add new target keywords based on emerging search trends. Remove irrelevant or zero-volume terms. Re-tier priority keywords for Q+1. Review keyword cannibalization across the site.',
      '3–5 hrs', 75, 165),
    stepFix(n++, 'Deep technical SEO audit',
      'Tools: Screaming Frog + Sitebulb + Google Search Console + PageSpeed Insights + Lighthouse. In-depth technical audit covering: crawlability and crawl budget, indexation health, Core Web Vitals across all page templates, mobile usability, structured data (Schema.org), hreflang (multilingual), canonical tags, XML sitemaps, JavaScript rendering issues (via Google\'s URL Inspection tool), HTTPS security, and server response codes.',
      '4–8 hrs', 100, 260),
    stepFix(n++, 'Full content audit and editorial plan',
      'Tools: Screaming Frog, Ahrefs, GA4, SEMrush Content Audit. Classify every page as: Keep, Optimize, Consolidate, or Remove. Identify the top 20 content opportunities based on keyword gaps, user intent, and competitor content. Produce a content calendar for Q+1 with topics, target keywords, and estimated traffic potential.',
      '4–6 hrs', 100, 195),
    stepFix(n++, 'Backlink acquisition strategy review',
      'Tools: Ahrefs, Semrush, Hunter.io. Review the quality and velocity of link acquisition vs targets. Assess anchor text diversity, referring domain quality distribution, and competitor link profiles. Define outreach targets and strategies for Q+1 (guest post targets, digital PR topics, resource page opportunities).',
      '2–3 hrs', 50, 100),
    stepFix(n++, 'Algorithm update impact assessment',
      'Tools: MozCast, SERPstat Sensor, SEMrush Sensor, Ahrefs. Research all confirmed major and minor Google algorithm updates from the past quarter. Cross-reference update dates with traffic and ranking data to identify specific impact. Implement recovery or adaptation actions where indicated.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'CRO analysis for organic traffic',
      'Tools: GA4 Funnel Exploration, Hotjar, Microsoft Clarity, or Crazy Egg. Identify high-traffic organic landing pages with below-average engagement rate or conversion rate. Use heatmaps and session recordings to diagnose conversion friction. Recommend UX, CTA copy, or page structure improvements.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'Quarterly SEO report and strategy presentation',
      'Tools: Looker Studio, Google Slides, Canva. Produce a comprehensive quarterly report: QoQ and YoY performance comparison, organic traffic ROI estimation, keyword ranking distribution changes, backlink growth, technical health score, content audit summary, wins, resolved issues, and a strategic recommendation deck for Q+1 with prioritized action items. Present in a 45–60 minute QBR.',
      '3–5 hrs', 75, 165),
  ];
}

// ─── WEB ANALYTICS CHECKLIST STEPS ──────────────────────────
function webAnalyticsSteps(cadence) {
  if (cadence === 'weekly') {
    let n = 1;
    return [
      stepFix(n++, 'Traffic overview and channel performance check',
        'Tools: Google Analytics 4, Adobe Analytics (Realtime + Overview reports). Why monitor: sudden traffic drops or spikes can indicate tracking issues, server problems, or marketing impact. Review sessions, users, and engaged sessions for the past 7 days vs prior 7 days. Break down by channel (organic, paid, direct, social, email, referral). Flag any channel showing >20% WoW change and investigate root cause.',
        '20–30 min', 12, 18),
      stepFix(n++, 'Key conversion metrics check',
        'Tools: GA4 (Conversions report), Adobe Analytics (Success Events). Why monitor: broken conversion tracking is invisible unless you check — revenue and lead counts can silently drop to zero. Verify all key conversion events are firing and recording. Check conversion rate by channel. Flag any conversion event with 0 data as a potential tracking issue requiring immediate investigation.',
        '15–25 min', 9, 14),
      stepFix(n++, 'Top pages and content performance',
        'Tools: GA4 (Pages and Screens report), Adobe Analytics (Pages report). Why monitor: the top 10 pages drive the majority of value — tracking changes here flags content decay or unexpected gains. Review top 10 pages by sessions and engaged sessions. Note new entries or pages that dropped out of the top 10. Check average engagement time for quality signals.',
        '15–20 min', 9, 12),
      stepFix(n++, 'Data quality and tag health check',
        'Tools: GA4 DebugView, Adobe Debugger, Tag Inspector, ObservePoint. Why monitor: a broken tag can silently corrupt months of data before anyone notices. Spot-check 3–5 key events to confirm they are still firing with correct parameters. Review for referral spam, bot traffic anomalies, or unexpected drops in event counts. Check for duplicate pageviews (common after CMS updates).',
        '15–25 min', 9, 14),
      stepFix(n++, 'Paid media performance integration check',
        'Tools: GA4 (Acquisition reports), Google Ads, Meta Ads Manager. Why monitor: UTM parameters and auto-tagging break frequently after platform updates or CMS changes, causing paid traffic to misattribute as direct. Verify paid channels are correctly attributed. Confirm Google Ads auto-tagging is functioning. Check for "not set" values in campaign/source/medium dimensions.',
        '15–20 min', 9, 12),
      stepFix(n++, 'Weekly analytics summary',
        'Tools: Google Sheets, Notion, Slack. Compile a 1-page executive summary: 5 headline metrics with WoW comparison, 2–3 key observations with likely causes, any data quality issues found and actions taken, and one recommended action for the coming week. Distribute to stakeholders.',
        '20–30 min', 12, 18),
    ];
  }
  if (cadence === 'monthly') {
    let n = 1;
    return [
      stepFix(n++, 'Full traffic and acquisition analysis',
        'Tools: GA4 (Acquisition overview, Traffic acquisition, User acquisition reports), Adobe Analytics (Traffic Sources). Key metrics: sessions, users, new users, engaged sessions, engagement rate, average engagement time, sessions per user. Compare MoM and YoY. Segment by device (mobile/desktop/tablet), geography (country/city), and channel. Why: understanding where traffic comes from and how it trends is the foundation of all digital marketing decisions.',
        '1–1.5 hrs', 25, 49),
      stepFix(n++, 'Conversion and revenue deep dive',
        'Tools: GA4 (Conversions, Monetization reports), Adobe Analytics (Conversion reports), Looker Studio. Key metrics: conversion rate by channel, cost per conversion (if Google Ads linked), revenue, average order value, checkout abandonment rate. Why: these are the metrics that directly correlate to business ROI. A 1% improvement in conversion rate on 10,000 sessions equals 100 additional leads/sales.',
        '45–75 min', 18, 49),
      stepFix(n++, 'Funnel and user journey analysis',
        'Tools: GA4 Funnel Exploration, Adobe Analytics Fallout report. Key metrics: funnel completion rate, highest drop-off step, cart abandonment rate, checkout completion rate. Why: knowing where users abandon the journey lets you prioritize optimization effort. Pages with >70% drop-off in the conversion funnel are the highest-priority UX issues.',
        '45–75 min', 18, 49),
      stepFix(n++, 'Audience and engagement analysis',
        'Tools: GA4 (Demographics, Tech, User attributes reports), Adobe Analytics (Visitor Profile). Key metrics: new vs returning user ratio, session duration trend, pages per session, demographic breakdown. Why: audience composition changes can signal shifts in your marketing audience or content relevance. Rising new user ratio with declining engagement often means acquisition is outpacing retention.',
        '30–45 min', 12, 24),
      stepFix(n++, 'Content performance review',
        'Tools: GA4 (Pages and Screens, Landing page reports), Adobe Analytics (Pages, Entry pages). Key metrics: pageviews, unique pageviews, engagement rate, bounce rate (GA4: engagement rate inverse), average engagement time, conversions assisted. Why: identifying content that drives engagement AND conversions vs content that only drives traffic helps prioritize content investment.',
        '45–60 min', 18, 33),
      stepFix(n++, 'Data integrity audit',
        'Tools: GA4 Admin, Adobe Analytics Admin, Tag Inspector, Screaming Frog. Validate that all key events and custom dimensions are collecting correctly. Check for over-counting (duplicate events from SPA route changes), under-counting (missing pages in crawl), and cross-device tracking gaps. Verify no configuration changes have been made without documentation.',
        '30–45 min', 12, 24),
      stepFix(n++, 'Monthly analytics report',
        'Tools: Looker Studio, Adobe Analytics Workspace, Google Slides. Produce the full monthly analytics report: MoM comparison metrics table, channel performance breakdown chart, funnel analysis, audience insights, top 10 content pages, data quality notes, and 3–5 strategic recommendations. Present in a 30-minute monthly review call.',
        '1.5–2.5 hrs', 37, 81),
    ];
  }
  // quarterly
  let n = 1;
  return [
    stepFix(n++, 'Full quarterly data review and benchmarking',
      'Tools: GA4, Adobe Analytics, Looker Studio, Google Sheets. Key metrics: all core KPIs vs Q-1 and same quarter last year. Build a QoQ and YoY comparison table. Identify seasonal patterns, sustained trends, and statistically significant anomalies. Why: quarterly reviews surface trends that are invisible in weekly noise — they are the basis for strategic decisions.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'KPI framework review and alignment',
      'Tools: Measurement plan document, stakeholder interviews. Reassess whether current tracked KPIs still reflect business objectives for Q+1. Recommend new metrics to add, obsolete metrics to retire, and conversion event configuration changes. Why: KPIs drift from business goals over time — a quarterly review prevents the team from optimizing the wrong things.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'Analytics implementation audit',
      'Tools: GA4 DebugView, Adobe Analytics Debugger, Screaming Frog, ObservePoint, Tag Inspector. Full audit: verify all tags and events still fire correctly on all page types, check for data discrepancies between platforms, review all custom dimensions and events for continued relevance, and validate cross-domain tracking continuity.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'Attribution model review',
      'Tools: GA4 Advertising snapshot, Adobe Analytics Attribution IQ. Evaluate the current attribution model. Compare data-driven, last-click, and first-click attribution side by side for key conversion paths. Recommend model changes based on actual customer journey patterns observed in the data.',
      '1–2 hrs', 25, 65),
    stepFix(n++, 'Advanced user behavior analysis',
      'Tools: GA4 Explore (Path exploration, Funnel exploration, Cohort analysis, User Lifetime), Adobe Analytics Analysis Workspace, Hotjar, Microsoft Clarity. Produce custom analyses: cohort retention curves (how users from different acquisition periods behave over time), multi-step path analysis (what do converters do that non-converters don\'t?), and device/geography segmentation deep dive.',
      '3–5 hrs', 75, 165),
    stepFix(n++, 'Quarterly analytics report and QBR presentation',
      'Tools: Looker Studio, Google Slides, Canva. Produce the comprehensive quarterly analytics report: QoQ and YoY metrics table, channel ROI summary, funnel performance, audience insights, implementation audit findings, attribution analysis, and strategic recommendations for Q+1. Present in a 45–60 minute Quarterly Business Review.',
      '3–5 hrs', 75, 165),
  ];
}

// ─── ACCESSIBILITY CHECKLIST STEPS ──────────────────────────
function a11ySteps(cadence) {
  if (cadence === 'weekly') {
    let n = 1;
    return [
      stepFix(n++, 'Automated accessibility scan',
        'Tools: axe DevTools (browser extension, free + paid), WAVE (WebAIM, free), Lighthouse Accessibility audit (Chrome DevTools). Run automated scan on the 5–10 most-trafficked pages. Review violations by severity (Critical, Serious, Moderate, Minor). Log new issues in the issue tracker. Why monitor weekly: new content and code deployments regularly introduce regressions — catching them early prevents accumulation.',
        '20–30 min', 12, 18),
      stepFix(n++, 'New content and template review',
        'Tools: axe DevTools, WAVE, manual keyboard testing. Review any new pages, blog posts, landing pages, or updated templates deployed in the past 7 days. Check for: missing image alt text, missing form labels, insufficient color contrast, missing heading structure, and keyboard trap issues.',
        '15–25 min', 9, 14),
      stepFix(n++, 'Color contrast and visual check',
        'Tools: WebAIM Contrast Checker, Chrome DevTools (CSS Overview), Stark (Figma/Sketch plugin). Verify all new text and UI elements meet WCAG 2.1 AA contrast ratios: 4.5:1 for normal text, 3:1 for large text and UI components. Why: poor color contrast is the #1 most common accessibility violation (affects 8% of men with color blindness).',
        '10–15 min', 6, 9),
      stepFix(n++, 'Keyboard navigation spot check',
        'Tools: Keyboard only (Tab, Shift+Tab, Enter, Space, Arrow keys), browser focus indicator. Manually tab through 2–3 key user flows (checkout, form submission, navigation). Verify visible focus indicators, correct tab order, no keyboard traps, and that all interactive elements are reachable and operable without a mouse.',
        '15–20 min', 9, 12),
      stepFix(n++, 'Weekly accessibility summary',
        'Tools: Google Sheets or Jira. Log all new issues found this week with severity, WCAG criterion violated (e.g., 1.1.1, 1.4.3), affected URL, and recommended fix. Update open issue count. Flag any Critical issues for immediate developer escalation.',
        '10–15 min', 6, 9),
    ];
  }
  if (cadence === 'monthly') {
    let n = 1;
    return [
      stepFix(n++, 'Full automated accessibility audit',
        'Tools: axe DevTools Pro, Deque WorldSpace Attest, Siteimprove, or WAVE automated scan. Run a comprehensive automated scan across all key page templates: homepage, product/service pages, blog, contact, checkout, login, search results, error pages. Export the violation report. Key metrics to track: total violations count, violations by severity, violations by WCAG criterion, pages with critical violations.',
        '1–2 hrs', 25, 65),
      stepFix(n++, 'Screen reader testing',
        'Tools: NVDA + Firefox (Windows), VoiceOver + Safari (Mac/iOS), TalkBack (Android). Conduct screen reader testing on the 3–5 most critical user flows. Verify: all images have descriptive alt text, forms have associated labels and error messages, navigation landmarks are present (header, main, nav, footer), dynamic content updates are announced, and modal dialogs are properly managed.',
        '1.5–3 hrs', 37, 100),
      stepFix(n++, 'WCAG 2.1 AA compliance check',
        'Tools: axe DevTools, manual testing, WebAIM WCAG checklist. Systematically review compliance against WCAG 2.1 AA success criteria grouped by principle: Perceivable (alt text, captions, color contrast, text resize, no content loss on 400% zoom), Operable (keyboard access, no seizure-inducing content, skip navigation, page titles, focus management), Understandable (language declared, predictable navigation, error identification), Robust (valid HTML, ARIA used correctly, name/role/value for custom widgets).',
        '2–4 hrs', 50, 130),
      stepFix(n++, 'Mobile accessibility check',
        'Tools: iOS Accessibility Inspector, Android Accessibility Scanner, VoiceOver (iOS), TalkBack (Android). Test key flows on mobile devices with built-in screen readers. Verify: touch target sizes (minimum 44×44px per WCAG 2.5.5), pinch-to-zoom not disabled, orientation not locked, mobile-specific component accessibility (carousels, bottom sheets, mobile menus).',
        '1–2 hrs', 25, 65),
      stepFix(n++, 'PDF and document accessibility',
        'Tools: Adobe Acrobat Pro (Accessibility Checker), PAC 3 (PDF Accessibility Checker). If the site has downloadable PDFs: check for tagged PDF structure, reading order, alt text for images, table headers, language setting, and title metadata. Why: PDFs are often overlooked in web accessibility audits but are legally required to be accessible in many jurisdictions.',
        '30–60 min', 12, 33),
      stepFix(n++, 'Monthly accessibility report',
        'Tools: Google Sheets, Jira, or accessibility platform dashboard. Produce the monthly accessibility report: total open issues by severity, issues resolved this month, new issues introduced, WCAG criterion breakdown, pages with most violations, and recommended priority fix list for next month. Include trend chart of open issue count MoM.',
        '45–75 min', 18, 49),
    ];
  }
  // quarterly
  let n = 1;
  return [
    stepFix(n++, 'Comprehensive WCAG 2.1 / 2.2 audit',
      'Tools: axe DevTools Pro + Deque WorldSpace Attest + manual expert review. Conduct a comprehensive accessibility audit against WCAG 2.1 AA (and WCAG 2.2 where applicable). Cover all page templates, interactive components, forms, modal dialogs, carousels, data tables, video/audio content, and custom JavaScript widgets. Produce a formal audit report with: issue inventory, severity classification, WCAG criterion mapped to each violation, affected URLs, and remediation guidance.',
      '6–12 hrs', 150, 390),
    stepFix(n++, 'Assistive technology compatibility testing',
      'Tools: NVDA + Firefox, JAWS + Chrome (Windows), VoiceOver + Safari (Mac and iOS), TalkBack + Chrome (Android), Dragon NaturallySpeaking (voice control). Test key user flows with multiple assistive technologies. Document any AT-specific issues beyond WCAG violations (announcement timing, virtual cursor behavior, etc.).',
      '3–5 hrs', 75, 165),
    stepFix(n++, 'Color and typography accessibility review',
      'Tools: WebAIM Contrast Checker, Colour Contrast Analyser (desktop app), Stark, Color Oracle (color blindness simulator). Review entire color palette against AA and AAA contrast ratios. Simulate color blindness (Deuteranopia, Protanopia, Tritanopia, Achromatopsia). Review font sizes, line spacing, letter spacing, and text over image contrast. Produce a color accessibility matrix for the design system.',
      '2–4 hrs', 50, 130),
    stepFix(n++, 'Accessibility regression testing',
      'Tools: Cypress + axe-core (automated regression), Playwright accessibility testing, Percy + axe. Set up automated accessibility regression tests for key page templates and user flows to prevent future regressions from code deployments. Integrate into CI/CD pipeline if not already done.',
      '3–6 hrs', 75, 195),
    stepFix(n++, 'Legal and compliance review',
      'Tools: ADA (Americans with Disabilities Act) guidance, EN 301 549 (EU), AODA (Canada), Disability Discrimination Act (Australia), RA 7277 (Philippines). Review the site\'s legal accessibility obligations based on the client\'s jurisdiction and industry. Assess risk exposure. Recommend accessibility statement updates. Review any existing VPATs (Voluntary Product Accessibility Templates).',
      '2–3 hrs', 50, 100),
    stepFix(n++, 'Quarterly accessibility report and roadmap',
      'Tools: Looker Studio, Google Slides. Produce the quarterly accessibility report: QoQ compliance trend, issues resolved vs introduced, assistive technology test results, legal compliance summary, and a prioritized accessibility improvement roadmap for Q+1 with effort and impact estimates.',
      '2–4 hrs', 50, 130),
  ];
}

// ═══════════════════════════════════════════════════════════════
// MAIN DATA STRUCTURES
// ═══════════════════════════════════════════════════════════════

window.IMPL_GROUPS = [

  {
    id: 'analytics_hybrid',
    title: 'Web Analytics Implementation — Hybrid Ionic-Angular App',
    badge: 'badge-adobe',
    badgeLabel: 'Analytics · Hybrid App',
    navLabel: 'Hybrid App Analytics',
    implementations: [
      { tms:'tealium', label:'Tealium iQ', dot:'dot-tealium', totalTime:'4–6 days', totalCost:'$900–1,800', steps: tealiumMobileSteps('Adobe Analytics', 'Swift/Kotlin') },
      { tms:'gtm',     label:'Google Tag Manager', dot:'dot-gtm', totalTime:'3–5 days', totalCost:'$700–1,400', steps: gtmMobileSteps('GA4') },
      { tms:'launch',  label:'Adobe Launch', dot:'dot-adobe', totalTime:'4–6 days', totalCost:'$900–1,800', steps: launchMobileSteps('Adobe Analytics') },
      { tms:'aa',      label:'Adobe Analytics Config', dot:'dot-aa', totalTime:'2–4 days', totalCost:'$400–900', steps: aaConfigSteps() },
      { tms:'ga',      label:'Google Analytics Config', dot:'dot-ga', totalTime:'1–2 days', totalCost:'$200–500', steps: gaConfigSteps() },
    ]
  },

  {
    id: 'analytics_native',
    title: 'Analytics Implementation — Native iOS & Android App',
    badge: 'badge-adobe',
    badgeLabel: 'Analytics · Native App',
    navLabel: 'Native App Analytics',
    implementations: [
      { tms:'tealium', label:'Tealium iQ', dot:'dot-tealium', totalTime:'5–8 days', totalCost:'$1,200–2,500', steps: tealiumMobileSteps('Adobe Analytics', 'Swift / Kotlin') },
      { tms:'gtm',     label:'Google Tag Manager', dot:'dot-gtm', totalTime:'4–7 days', totalCost:'$1,000–2,000', steps: gtmMobileSteps('GA4') },
      { tms:'launch',  label:'Adobe Launch', dot:'dot-adobe', totalTime:'5–8 days', totalCost:'$1,200–2,500', steps: launchMobileSteps('Adobe Analytics') },
      { tms:'aa',      label:'Adobe Analytics Config', dot:'dot-aa', totalTime:'2–4 days', totalCost:'$400–900', steps: aaConfigSteps() },
      { tms:'ga',      label:'Google Analytics Config', dot:'dot-ga', totalTime:'1–2 days', totalCost:'$200–500', steps: gaConfigSteps() },
    ]
  },

  {
    id: 'analytics_web',
    title: 'Analytics Implementation — Website',
    badge: 'badge-google',
    badgeLabel: 'Analytics · Website',
    navLabel: 'Website Analytics',
    implementations: [
      { tms:'tealium', label:'Tealium iQ', dot:'dot-tealium', totalTime:'3–5 days', totalCost:'$600–1,200', steps: tealiumWebSteps('Adobe Analytics') },
      { tms:'gtm',     label:'Google Tag Manager', dot:'dot-gtm', totalTime:'2–4 days', totalCost:'$500–1,000', steps: gtmWebSteps('GA4') },
      { tms:'launch',  label:'Adobe Launch', dot:'dot-adobe', totalTime:'3–5 days', totalCost:'$600–1,200', steps: launchWebSteps('Adobe Analytics') },
      { tms:'aa',      label:'Adobe Analytics Config', dot:'dot-aa', totalTime:'2–4 days', totalCost:'$400–900', steps: aaConfigSteps() },
      { tms:'ga',      label:'Google Analytics Config', dot:'dot-ga', totalTime:'1–2 days', totalCost:'$200–500', steps: gaConfigSteps() },
    ]
  },

  {
    id: 'pixels_web',
    title: 'Marketing Pixels — Website',
    badge: 'badge-pixel',
    badgeLabel: 'Marketing Pixels',
    navLabel: 'Marketing Pixels',
    implementations: [
      { tms:'tealium', label:'Tealium iQ', dot:'dot-tealium', totalTime:'1–3 days', totalCost:'$400–800', steps: pixelSteps('tealium') },
      { tms:'gtm',     label:'Google Tag Manager', dot:'dot-gtm', totalTime:'1–2 days', totalCost:'$350–700', steps: pixelSteps('gtm') },
      { tms:'launch',  label:'Adobe Launch', dot:'dot-adobe', totalTime:'1–3 days', totalCost:'$400–800', steps: pixelSteps('launch') },
    ]
  },

  {
    id: 'ua_migration',
    title: 'Universal Analytics → GA4 Migration',
    badge: 'badge-migration',
    badgeLabel: 'GA4 Migration',
    navLabel: 'UA → GA4 Migration',
    implementations: [
      { tms:'gtm', label:'Via GTM / TMS', dot:'dot-gtm', totalTime:'3–7 days', totalCost:'$700–1,800', steps: migrationSteps() },
    ]
  },

  {
    id: 'seo',
    title: 'SEO Checklist',
    badge: 'badge-seo',
    badgeLabel: 'SEO',
    navLabel: 'SEO Checklist',
    implementations: [
      { tms:'weekly',    label:'Weekly',    dot:'dot-tab', totalTime:'3–5 hrs/week',    totalCost:'$80–200/week',   steps: seoSteps('weekly') },
      { tms:'monthly',   label:'Monthly',   dot:'dot-tab', totalTime:'7–12 hrs/month',  totalCost:'$175–450/month', steps: seoSteps('monthly') },
      { tms:'quarterly', label:'Quarterly', dot:'dot-tab', totalTime:'14–24 hrs/qtr',   totalCost:'$450–1,000/qtr', steps: seoSteps('quarterly') },
    ]
  },

  {
    id: 'web_analytics_checklist',
    title: 'Web Analytics Checklist',
    badge: 'badge-checklist',
    badgeLabel: 'Web Analytics',
    navLabel: 'Analytics Checklist',
    implementations: [
      { tms:'weekly',    label:'Weekly',    dot:'dot-tab', totalTime:'2–4 hrs/week',    totalCost:'$60–160/week',   steps: webAnalyticsSteps('weekly') },
      { tms:'monthly',   label:'Monthly',   dot:'dot-tab', totalTime:'5–9 hrs/month',   totalCost:'$150–380/month', steps: webAnalyticsSteps('monthly') },
      { tms:'quarterly', label:'Quarterly', dot:'dot-tab', totalTime:'10–18 hrs/qtr',   totalCost:'$350–800/qtr',   steps: webAnalyticsSteps('quarterly') },
    ]
  },

  {
    id: 'accessibility',
    title: 'Accessibility Checklist',
    badge: 'badge-accessibility',
    badgeLabel: 'Accessibility',
    navLabel: 'Accessibility',
    implementations: [
      { tms:'weekly',    label:'Weekly',    dot:'dot-tab', totalTime:'1–2 hrs/week',    totalCost:'$40–120/week',   steps: a11ySteps('weekly') },
      { tms:'monthly',   label:'Monthly',   dot:'dot-tab', totalTime:'6–12 hrs/month',  totalCost:'$150–450/month', steps: a11ySteps('monthly') },
      { tms:'quarterly', label:'Quarterly', dot:'dot-tab', totalTime:'15–30 hrs/qtr',   totalCost:'$450–1,200/qtr', steps: a11ySteps('quarterly') },
    ]
  },

];
