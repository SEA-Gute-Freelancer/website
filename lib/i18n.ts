export type Lang = "de" | "en";

// ─── Common ──────────────────────────────────────────────────────────────────
const common = {
  de: {
    cta: "Kostenloses Erstgespräch",
    ctaShort: "Erstgespräch",
    services: "Unsere Leistungen",
    learnMore: "Mehr erfahren",
    allServices: "Alle Leistungen ansehen",
    contact: "Kontakt aufnehmen",
    readMore: "Mehr lesen",
    since: "Seit",
    years: "Jahre Erfahrung",
    scroll: "Scroll",
    dragHint: "Ziehen oder Pfeile zum Blättern",
  },
  en: {
    cta: "Free Consultation",
    ctaShort: "Consultation",
    services: "Our Services",
    learnMore: "Learn more",
    allServices: "View all services",
    contact: "Get in touch",
    readMore: "Read more",
    since: "Since",
    years: "years of experience",
    scroll: "Scroll",
    dragHint: "Drag or use arrows to browse",
  },
};

// ─── Cookie Banner ───────────────────────────────────────────────────────────
const cookie = {
  de: {
    title: "Wir nutzen Cookies",
    text: "Wir setzen Cookies ein, um die Website zu verbessern und Werbeanzeigen zu personalisieren (Google Ads). Du kannst jederzeit ablehnen.",
    accept: "Alle akzeptieren",
    decline: "Ablehnen",
    privacy: "Datenschutz",
  },
  en: {
    title: "We use cookies",
    text: "We use cookies to improve the website and personalise ads (Google Ads). You can decline at any time.",
    accept: "Accept all",
    decline: "Decline",
    privacy: "Privacy Policy",
  },
};

// ─── Navigation ───────────────────────────────────────────────────────────────
const nav = {
  de: {
    about: "Über uns",
    services: "Leistungen",
    contact: "Kontakt",
    team: "Team",
    cases: "Cases",
    blog: "Blog",
  },
  en: {
    about: "About us",
    services: "Services",
    contact: "Contact",
    team: "Team",
    cases: "Cases",
    blog: "Blog",
  },
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const footer = {
  de: {
    ctaLabel: "Bereit für mehr Wachstum?",
    ctaHeading: "Starte dein kostenloses Erstgespräch.",
    ctaButton: "Jetzt anfragen",
    tagline: "Das Google Ads Kollektiv für den deutschen Mittelstand. Präzise Kampagnen, persönliche Betreuung, messbare Ergebnisse.",
    navHeading: "Navigation",
    contactHeading: "Kontakt",
    partnerLabel: "Google Premier Partner",
    partnerNote: "Zertifizierte Google Ads Spezialisten.",
    copyright: "Alle Rechte vorbehalten.",
    links: {
      about: "Über uns",
      services: "Leistungen",
      team: "Team",
      cases: "Cases",
      blog: "Blog",
      contact: "Kontakt",
      imprint: "Impressum",
      privacy: "Datenschutz",
    },
  },
  en: {
    ctaLabel: "Ready for more growth?",
    ctaHeading: "Book your free intro call.",
    ctaButton: "Let's talk",
    tagline: "The Google Ads collective for Germany's Mittelstand. Sharp campaigns, real people, measurable results.",
    navHeading: "Navigation",
    contactHeading: "Contact",
    partnerLabel: "Google Premier Partner",
    partnerNote: "Certified Google Ads specialists.",
    copyright: "All rights reserved.",
    links: {
      about: "About us",
      services: "Services",
      team: "Team",
      cases: "Cases",
      blog: "Blog",
      contact: "Contact",
      imprint: "Imprint",
      privacy: "Privacy Policy",
    },
  },
};

// ─── Home page ────────────────────────────────────────────────────────────────
const home = {
  de: {
    hero: {
      badge: "SEA gute Freelancer · brandnew",
      h1a: "Kollektives",
      h1b: "Wissen für",
      h1c: "dein",
      h1d: "Google Ads.",
      p: "Erfahrene Google Ads Spezialisten für den deutschen Mittelstand. Präzise Kampagnen, persönliche Betreuung, messbare Ergebnisse.",
      cta1: "Kostenloses Erstgespräch",
      cta2: "Unsere Leistungen",
    },
    testimonials: {
      label: "Das sagen unsere Kunden.",
      h2a: "Echte Ergebnisse.",
      h2b: "Echte Stimmen.",
      footer: "Über 200 zufriedene Kunden · SEA GUTE FREELANCER",
    },
    services: {
      label: "Was wir tun",
      h2a: "You do your Work.",
      h2b: "We do your Google Ads.",
      p: "Du fokussierst dich auf dein Business. Wir übernehmen deine Google Ads und viele andere Leistungen. Kein Onboarding-Marathon, keine Lernkurve, keine Agentur-Bürokratie — sprich uns an.",
      cta: "Alle Leistungen",
    },
    mission: {
      label: "Das Kollektiv",
      h2a: "Echte Experten.",
      h2b: "Für jedes Gebiet.",
      p1: "SEA Gute Freelancer ist kein klassisches Unternehmen. Wir sind ein Kollektiv.",
      p2: "Du erhältst die Tiefe eines Spezialisten mit der Flexibilität eines Freelancers – und das zu Konditionen, die sich ein Mittelständler leisten kann. Diese Preise können wir dir nur bieten, weil wir auf alles verzichten, was überflüssig ist – und alles automatisieren, was sich automatisieren lässt.",
      cta1: "Über uns",
      cta2: "Das Team kennenlernen",
      budgetLabel: "Verwaltetes Google Ads Budget",
    },
    team: {
      label: "Das Team",
      h2: "Lern uns kennen.",
      cta: "Alle Freelancer",
    },
    cases: {
      label: "Erfolgsgeschichten",
      h2a: "Ergebnisse,",
      h2b: "die sprechen.",
      p: "Über 200 erfolgreiche Projekte für den deutschen Mittelstand. Von der lokalen Bäckerei bis zum spezialisierten B2B-Unternehmen.",
      cta: "Alle Cases ansehen",
    },
    cta: {
      partnerLabel: "Google Premier Partner",
      h2a: "Bereit für",
      h2b: "messbares",
      h2c: "Wachstum?",
      p: "Vereinbar jetzt dein kostenloses Erstgespräch und erfahre, wie wir deine Google Ads Kampagnen auf das nächste Level heben.",
      cta1: "Kostenloses Erstgespräch",
      cta2: "Jetzt anrufen",
    },
  },
  en: {
    hero: {
      badge: "SEA gute Freelancer · brandnew",
      h1a: "Collective",
      h1b: "knowledge for",
      h1c: "your",
      h1d: "Google Ads.",
      p: "Senior Google Ads specialists for Germany's Mittelstand. Precise campaigns, direct contact, results you can measure.",
      cta1: "Free Intro Call",
      cta2: "What we do",
    },
    testimonials: {
      label: "What our clients say.",
      h2a: "Real Results.",
      h2b: "Real Voices.",
      footer: "Over 200 happy clients · SEA GUTE FREELANCER",
    },
    services: {
      label: "What we do",
      h2a: "You do your Work.",
      h2b: "We do your Google Ads.",
      p: "You focus on your business. We take care of your Google Ads. No onboarding marathon, no learning curve, no agency bureaucracy — just results.",
      cta: "All Services",
    },
    mission: {
      label: "The Collective",
      h2a: "Real experts.",
      h2b: "No overhead.",
      p1: "SEA Gute Freelancer isn't a typical agency. We're a collective of specialists, experts, and pros – but above all, friends. Met at Google. Travelled together. Always had each other's backs.",
      p2: "You get specialist depth with freelancer flexibility – at rates a mid-sized business can actually afford.",
      cta1: "About us",
      cta2: "Meet the crew",
      budgetLabel: "Managed Google Ads Budget",
    },
    team: {
      label: "The Team",
      h2: "Meet the people behind it.",
      cta: "All freelancers",
    },
    cases: {
      label: "Success stories",
      h2a: "Results",
      h2b: "that speak.",
      p: "Over 200 projects for Germany's Mittelstand. From local bakeries to specialised B2B companies.",
      cta: "See all cases",
    },
    cta: {
      partnerLabel: "Google Premier Partner",
      h2a: "Ready for",
      h2b: "measurable",
      h2c: "growth?",
      p: "Book your free intro call and find out how we can level up your Google Ads.",
      cta1: "Free Intro Call",
      cta2: "Call us now",
    },
  },
};

// ─── Services data ─────────────────────────────────────────────────────────────
const serviceItems = {
  de: [
    {
      title: "Audits",
      desc: "Du hast bereits Google Ads? Wir werfen einen Blick von außen drauf. Konkrete Antworten statt vager Tipps.",
      tag: "Analyse",
    },
    {
      title: "Tracking",
      desc: "Consent Banner, GA4, Enhanced Conversions? Nervt jeden. Unsere Ex-Googler setzen dein Tracking so auf, wie Google es sich gedacht hat. Wir können Workarounds, aber wir lieben saubere Daten.",
      tag: "Technisch",
    },
    {
      title: "Campaigns",
      desc: "Wir haben hunderte Accounts und Millionen-Budgets gesehen. Und eine Sache fällt auf: Wenn die Kampagne nicht funktioniert, liegt es an der Landingpage. Wenn eine Landingpage neu ist, liegt es an der Kampagne. In Wirklichkeit macht die Mischung aus KI-Workflow und menschlichem Know-how den echten Unterschied.",
      tag: "Performance",
    },
    {
      title: "SEO – GEO",
      desc: "ADS are coming to AI. Darum gilt: Wer heute SEO sagt, muss auch GEO sagen. Ob dein Business mit AI Max wirklich in Gemini landet, oder ob deine robots.txt mit den entsprechenden Meta-Daten einfach falsch ist, entscheidet sich erst noch. Du musst nicht Early Adopter sein – es reicht, wenn wir den Trend für dich im Auge behalten.",
      tag: "Zukunft",
    },
    {
      title: "Assets",
      desc: "Unsere Kreativen sind preisgekrönt und erzählen am Lagerfeuer immer die gleiche Legende: Werber sind eitel. Sie glauben zu wissen, welche Headline gut ist und welcher CTA am besten funktioniert. Wir glauben das auch, aber wir testen unsere Darlings. Und töten sie für deinen Erfolg.",
      tag: "Kreativ",
    },
  ],
  en: [
    {
      title: "Audits",
      desc: "Already running Google Ads? We take an outside look. You get concrete answers instead of vague tips.",
      tag: "Analysis",
    },
    {
      title: "Tracking",
      desc: "Consent banners, GA4, Enhanced Conversions? Everyone dreads it. Our ex-Googlers set up your tracking exactly the way Google intended. We know the workarounds – but we love clean data.",
      tag: "Technical",
    },
    {
      title: "Campaigns",
      desc: "We've seen hundreds of accounts and multi-million budgets. And one thing stands out: when the campaign isn't working, it's the landing page. When the landing page is new, it's the campaign. The real difference is made by the right blend of AI workflow and human expertise.",
      tag: "Performance",
    },
    {
      title: "SEO – GEO",
      desc: "Ads are coming to AI. That means: if you say SEO today, you also have to say GEO. Whether your business actually shows up in Gemini via AI Max, or whether your robots.txt and meta data are simply wrong – that's still being decided. You don't need to be an early adopter. It's enough that we keep an eye on the trend for you.",
      tag: "Future",
    },
    {
      title: "Assets",
      desc: "Our creatives are award-winning and always tell the same story around the campfire: advertisers are vain. They think they know which headline works and which CTA converts best. We think so too – but we test our darlings. And kill them for your success.",
      tag: "Creative",
    },
  ],
};

// ─── Testimonial data ──────────────────────────────────────────────────────────
const rowA = {
  de: [
    { quote: "SEA GUTE FREELANCER hat unsere Google Ads komplett umgebaut. Innerhalb von 6 Wochen haben wir unseren ROAS von 1,8 auf 6,2 gesteigert. Unfassbar, was mit dem richtigen Partner möglich ist.", name: "Klaus Müller", company: "Müller Haustechnik GmbH", location: "München", result: "+340% ROAS", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" },
    { quote: "Endlich ein Team, das nicht nur Keywords verwaltet, sondern unternehmerisch mitdenkt. Unser Onlineshop wächst seit dem Start mit SEA GUTE FREELANCER jeden Monat zweistellig.", name: "Julia Schneider", company: "Mode Schneider OHG", location: "Hamburg", result: "+180% Umsatz", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" },
    { quote: "Als Zahnarztpraxis hatten wir wenig Erfahrung mit Online-Werbung. SEA GUTE FREELANCER hat uns alles erklärt, sauber aufgesetzt und unseren Terminkalender in 3 Monaten ausgebucht.", name: "Dr. Peter Zimmermann", company: "Zimmermann Dental", location: "Frankfurt", result: "-45% Cost-per-Lead", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80" },
    { quote: "Ich habe vorher drei verschiedene Agenturen ausprobiert. SEA GUTE FREELANCER ist die erste, bei der ich das Gefühl habe, dass wirklich jemand mit mir an einem Strang zieht.", name: "Anna Fischer", company: "Fischer Steuerberatung", location: "Stuttgart", result: "+210% Anfragen", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80" },
    { quote: "Unser Cost-per-Lead hat sich halbiert, die Qualität der Anfragen hat sich verdoppelt. Das sind genau die KPIs, die im B2B zählen. Danke an das SEA GUTE FREELANCER Team.", name: "Martin König", company: "TechDrive Systems B2B", location: "Berlin", result: "+270% Pipeline", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80" },
  ],
  en: [
    { quote: "SEA GUTE FREELANCER completely rebuilt our Google Ads. Within 6 weeks we increased our ROAS from 1.8 to 6.2. Incredible what's possible with the right partner.", name: "Klaus Müller", company: "Müller Haustechnik GmbH", location: "Munich", result: "+340% ROAS", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" },
    { quote: "Finally a team that doesn't just manage keywords, but thinks like an entrepreneur. Our online shop has been growing double digits every month since partnering with SEA GUTE FREELANCER.", name: "Julia Schneider", company: "Mode Schneider OHG", location: "Hamburg", result: "+180% Revenue", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80" },
    { quote: "As a dental practice, we had little experience with online advertising. SEA GUTE FREELANCER explained everything, set it up cleanly, and had our calendar fully booked within 3 months.", name: "Dr. Peter Zimmermann", company: "Zimmermann Dental", location: "Frankfurt", result: "-45% Cost-per-Lead", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=80&q=80" },
    { quote: "I'd tried three different agencies before. SEA GUTE FREELANCER is the first where I truly feel that someone is genuinely pulling in the same direction as me.", name: "Anna Fischer", company: "Fischer Steuerberatung", location: "Stuttgart", result: "+210% Enquiries", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=80&q=80" },
    { quote: "Our cost-per-lead halved while lead quality doubled. Those are exactly the KPIs that matter in B2B. Many thanks to the SEA GUTE FREELANCER team.", name: "Martin König", company: "TechDrive Systems B2B", location: "Berlin", result: "+270% Pipeline", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80" },
  ],
};

const rowB = {
  de: [
    { quote: "Was mich am meisten überzeugt hat: SEA GUTE FREELANCER erklärt mir jeden Monat transparent, was funktioniert hat und was nicht. Kein Blabla, nur echte Zahlen.", name: "Thomas Brandt", company: "Brandt Immobilien", location: "Düsseldorf", result: "+95% Anfragen", avatar: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=80&q=80" },
    { quote: "Wir sind ein kleines Familienunternehmen. SEA GUTE FREELANCER behandelt uns trotzdem wie einen Großkunden. Das Budget wird mit genauso viel Sorgfalt verwaltet wie bei den Big Playern.", name: "Sandra Weber", company: "Bäckerei Weber", location: "Nürnberg", result: "+160% Bestellungen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80" },
    { quote: "Nach einem Jahr Zusammenarbeit mit SEA GUTE FREELANCER haben wir unser Google Ads Budget verdoppelt – weil sich jeder Euro nachweislich lohnt. So etwas habe ich bei einer Agentur noch nicht erlebt.", name: "Michael Klein", company: "Klein Orthopädie", location: "Köln", result: "3,2× Conversion", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" },
    { quote: "SEA GUTE FREELANCER hat nicht nur unsere Kampagnen optimiert, sondern auch unser Tracking komplett neu aufgesetzt. Jetzt sehen wir endlich, welche Kanäle wirklich konvertieren.", name: "Lisa Maier", company: "Maier Rechtsanwälte", location: "München", result: "-38% CPC", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=80&q=80" },
    { quote: "Innerhalb der ersten 60 Tage hatten wir messbar mehr qualifizierte Leads als im gesamten Quartal davor. SEA GUTE FREELANCER liefert – ohne Ausreden und ohne Verzögerungen.", name: "Stefan Hoffmann", company: "Hoffmann Maschinenbau", location: "Stuttgart", result: "+225% Leads", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80" },
  ],
  en: [
    { quote: "What convinced me most: SEA GUTE FREELANCER explains transparently each month what worked and what didn't. No fluff – just real numbers.", name: "Thomas Brandt", company: "Brandt Immobilien", location: "Düsseldorf", result: "+95% Enquiries", avatar: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=80&q=80" },
    { quote: "We're a small family business. SEA GUTE FREELANCER still treats us like a major client. Our budget is managed with just as much care as for the big players.", name: "Sandra Weber", company: "Bäckerei Weber", location: "Nuremberg", result: "+160% Orders", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80" },
    { quote: "After one year with SEA GUTE FREELANCER we doubled our Google Ads budget – because every euro demonstrably pays off. I've never experienced that with an agency before.", name: "Michael Klein", company: "Klein Orthopädie", location: "Cologne", result: "3.2× Conversion", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" },
    { quote: "SEA GUTE FREELANCER didn't just optimise our campaigns – they completely rebuilt our tracking. Now we can finally see which channels actually convert.", name: "Lisa Maier", company: "Maier Rechtsanwälte", location: "Munich", result: "-38% CPC", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=80&q=80" },
    { quote: "Within the first 60 days we had measurably more qualified leads than in the entire previous quarter. SEA GUTE FREELANCER delivers – no excuses, no delays.", name: "Stefan Hoffmann", company: "Hoffmann Maschinenbau", location: "Stuttgart", result: "+225% Leads", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&q=80" },
  ],
};

// ─── About page ───────────────────────────────────────────────────────────────
const about = {
  de: {
    hero: {
      label: "Über uns",
      h1a: "Freunde,",
      h1b: "mit gleichen Interessen.",
      p: "SEA Gute Freelancer ist ein Kollektiv von Spezialisten, Experten, Profis – aber in erster Linie von Freunden.",
    },
    story: {
      h2: "Wie alles begann.",
      p1: "Wir haben für Agenturen, mit Agenturen, mit Gründern und Freelancern zusammengearbeitet.",
      p2: "Immer up-to-date, immer vertrauensvoll und gut. Irgendwann die Überlegung: Geht das nicht besser?",
      p3: "Nach einigen Privatkunden, bei denen wir uns immer gegenseitig ausgeholfen haben, dann der Entschluss: Warum kein Kollektiv gründen?",
      cta: "Das Team kennenlernen",
    },
    values: {
      label: "Unsere Werte",
      h2: "Was uns antreibt.",
      items: [
        { title: "Präzision", desc: "Jede Kampagne basiert auf Daten, nicht auf Bauchgefühl. Wir messen, optimieren und liefern nachweisbare Ergebnisse." },
        { title: "Persönlichkeit", desc: "Du arbeitest direkt mit deinem Spezialisten – kein Account Manager als Mittler, keine anonymen Prozesse." },
        { title: "Partnerschaft", desc: "Dein Erfolg ist unser Erfolg. Wir denken unternehmerisch und setzen auf langfristige Beziehungen." },
        { title: "Tempo", desc: "Schnelle Reaktionszeiten, agile Optimierungen. Wir warten nicht auf Quartalsberichte." },
      ],
    },
    timeline: {
      label: "Geschichte",
      h2: "Unser Weg.",
      items: [
        { year: "2016", event: "Erste Mitglieder starten bei Google – der Grundstein wird gelegt." },
        { year: "2019", event: "Erste gemeinsame Kundenprojekte. Immer gegenseitig ausgeholfen." },
        { year: "2022", event: "€10M+ verwaltetes Budget – kumulierte Erfahrung der Mitglieder." },
        { year: "2025", event: "Portugal. Ein Großraumbüro. SEA Gute Freelancer entsteht." },
      ],
    },
    cta: {
      h2: "Überzeug dich selbst.",
      p: "Lern uns in einem unverbindlichen Erstgespräch kennen.",
      btn: "Jetzt Kontakt aufnehmen",
    },
  },
  en: {
    hero: {
      label: "About us",
      h1a: "Friends,",
      h1b: "with the same obsessions.",
      p: "SEA Gute Freelancer is a collective of specialists, experts, and pros – but above all, friends.",
    },
    story: {
      h2: "How it all began.",
      p1: "We worked for agencies, with agencies, with founders and freelancers.",
      p2: "Always up-to-date, always reliable. Then the question: can this be done better?",
      p3: "After several private clients where we always had each other's backs, the decision: why not start a collective?",
      cta: "Meet the crew",
    },
    values: {
      label: "Our values",
      h2: "What drives us.",
      items: [
        { title: "Precision", desc: "Every campaign is built on data, not gut feeling. We measure, optimise, and deliver results you can point to." },
        { title: "Personality", desc: "You work directly with your specialist – no account manager in between, no anonymous processes." },
        { title: "Partnership", desc: "Your success is our success. We think like entrepreneurs and bet on long-term relationships." },
        { title: "Speed", desc: "Fast response times, agile optimisations. We don't wait for quarterly reports." },
      ],
    },
    timeline: {
      label: "History",
      h2: "Our journey.",
      items: [
        { year: "2016", event: "First members join Google – the foundation is laid." },
        { year: "2019", event: "First shared client projects. Always backing each other up." },
        { year: "2022", event: "€10M+ managed budget – combined experience across members." },
        { year: "2025", event: "Portugal. An open-plan office. SEA Gute Freelancer is born." },
      ],
    },
    cta: {
      h2: "Come see for yourself.",
      p: "Book a free, no-strings intro call and get to know us.",
      btn: "Get in touch now",
    },
  },
};

// ─── Leistungen page ──────────────────────────────────────────────────────────
const leistungen = {
  de: {
    hero: {
      label: "Leistungen",
      h1a: "Google Ads,",
      h1b: "meisterhaft.",
      splineH1a: "KI-Driven.",
      splineH1b: "Mit Human Touch.",
      p: "Wir sind Menschen, die KI intelligent einsetzen – nicht um Kosten zu sparen, sondern um dir deutlich bessere Ergebnisse zu liefern. Genau deshalb können wir dir Preise anbieten, die sonst kaum möglich sind.",
    },
    whatYouGet: "Was du erhältst",
    addons: {
      label: "Ergänzende Leistungen",
      h2: "Alles aus einer Hand.",
      items: [
        { title: "Keyword-Audit", desc: "Tiefgehende Analyse deines aktuellen Keyword-Portfolios" },
        { title: "Conversion Tracking", desc: "Lückenloses Setup aller relevanten Conversions" },
        { title: "Reporting & Analytics", desc: "Klare Dashboards, die echten Mehrwert liefern" },
        { title: "Landingpage-Beratung", desc: "Optimierungsempfehlungen für bessere Conversion Rates" },
      ],
    },
    process: {
      label: "So arbeiten wir",
      h2: "Unser Prozess.",
      items: [
        { step: "01", title: "Erstgespräch", desc: "Kostenlose Bestandsaufnahme deiner aktuellen Situation und Ziele" },
        { step: "02", title: "Analyse", desc: "Tiefgehende Analyse deiner Accounts, Wettbewerber und Zielgruppen" },
        { step: "03", title: "Strategie", desc: "Entwicklung einer maßgeschneiderten Google Ads Strategie" },
        { step: "04", title: "Umsetzung", desc: "Professioneller Kampagnenaufbau oder -optimierung" },
        { step: "05", title: "Optimierung", desc: "Kontinuierliche Verbesserung basierend auf Performance-Daten" },
        { step: "06", title: "Reporting", desc: "Transparente, monatliche Berichte mit klaren Ergebnissen" },
      ],
    },
    cta: {
      h2: "Welche Leistung passt zu dir?",
      p: "Sprich mit uns – kostenlos und unverbindlich.",
      btn: "Kostenloses Erstgespräch",
    },
    services: [
      {
        title: "Audits",
        subtitle: "Was wirklich los ist",
        desc: "Du hast bereits Google Ads? Wir werfen einen Blick von außen drauf. Kein Schönreden, keine vagen Empfehlungen — konkrete Antworten, was gut läuft, was nicht und warum.",
        features: [
          "Vollständige Kampagnen- und Kontostrukturanalyse",
          "Qualitätsscore, Anzeigenrelevanz und Landing Page Experience",
          "Wettbewerbsanalyse und Keyword-Überschneidungen",
          "Budget- und Gebotsstrategie-Check",
          "Priorisierter Maßnahmenplan mit Quick Wins",
        ],
        tag: "Analyse",
      },
      {
        title: "Tracking",
        subtitle: "Saubere Daten, richtige Entscheidungen",
        desc: "Consent Banner, GA4, Enhanced Conversions? Nervt jeden. Unsere Ex-Googler setzen dein Tracking so auf, wie Google es sich gedacht hat. Wir können Workarounds — aber wir lieben saubere Daten.",
        features: [
          "GA4 Setup und Migration von Universal Analytics",
          "Consent Mode v2 konform mit DSGVO",
          "Enhanced Conversions für präzisere Attribution",
          "Event-Tracking für alle relevanten Nutzeraktionen",
          "Server-Side Tagging für maximale Datenqualität",
        ],
        tag: "Technisch",
      },
      {
        title: "Campaigns",
        subtitle: "KI und Mensch. Nicht entweder oder.",
        desc: "Wir haben hunderte Accounts und Millionen-Budgets gesehen. Und eine Sache fällt auf: Wenn die Kampagne nicht funktioniert, liegt es an der Landingpage. Wenn eine Landingpage neu ist, liegt es an der Kampagne. In Wirklichkeit macht die Mischung aus KI-Workflow und menschlichem Know-how den echten Unterschied.",
        features: [
          "Search, PMax, Shopping und Remarketing aus einer Hand",
          "Strukturierte Asset-Gruppen für Performance Max",
          "Intelligente Gebotsstrategie je nach Ziel und Budget",
          "A/B-Testing von Anzeigentexten und Erweiterungen",
          "Monatliche Performance-Reviews mit klaren KPIs",
        ],
        tag: "Performance",
      },
      {
        title: "SEO + GEO",
        subtitle: "Heute SEO, morgen GEO",
        desc: "Ads are coming to AI. Wer heute SEO sagt, muss auch GEO sagen. Ob dein Business mit AI Max wirklich in Gemini landet, oder ob deine robots.txt mit den entsprechenden Meta-Daten einfach falsch ist — das entscheidet sich erst noch. Du musst nicht Early Adopter sein. Es reicht, wenn wir den Trend für dich im Auge behalten.",
        features: [
          "Technisches SEO Audit und Priorisierung",
          "GEO-Optimierung für KI-gestützte Suchanfragen",
          "Strukturierte Daten und Schema Markup",
          "robots.txt und Meta-Daten Review",
          "Langfristige Content-Strategie für AI Visibility",
        ],
        tag: "Zukunft",
      },
      {
        title: "Assets",
        subtitle: "Testen. Lernen. Töten.",
        desc: "Unsere Kreativen sind preisgekrönt und erzählen am Lagerfeuer immer die gleiche Legende: Werber sind eitel. Sie glauben zu wissen, welche Headline gut ist und welcher CTA am besten funktioniert. Wir glauben das auch — aber wir testen unsere Darlings. Und töten sie für deinen Erfolg.",
        features: [
          "Responsive Display und Search Ads",
          "Video-Skripte für YouTube und Performance Max",
          "Systematisches A/B-Testing mit klaren Hypothesen",
          "Copy-Optimierung nach Qualitätsscore und CTR",
          "Asset-Bibliothek für skalierbare Kampagnen",
        ],
        tag: "Kreativ",
      },
      {
        title: "KI-Ansatz",
        subtitle: "Nur was wirklich gebraucht wird",
        desc: "Wir beobachten KI-Entwicklungen nicht aus Pflichtbewusstsein — wir sind echte Enthusiasten. Was heute noch Beta ist, kann morgen deine Kampagne transformieren. Wir haben Fachwissen in allen relevanten Bereichen oder kennen die Richtigen, die es haben. Und wir rechnen nur ab, was du wirklich brauchst.",
        features: [
          "KI-gestützte Keyword- und Zielgruppenrecherche",
          "Prompt Engineering für Ads-Copywriting",
          "Automatisierung von Reporting und Monitoring",
          "Laufende Bewertung neuer KI-Tools auf Kampagnennutzen",
          "Transparente Abrechnung — kein KI-Aufschlag ohne Mehrwert",
        ],
        tag: "KI",
      },
      {
        title: "Landingpages",
        subtitle: "Klicks in Kunden verwandeln",
        desc: "Eine Landingpage, die nicht konvertiert, macht die beste Kampagne wertlos. Wir analysieren, strukturieren und optimieren — oder bauen von Grund auf neu. Immer mit Blick auf das eine Ziel: aus Besuchern werden Kunden.",
        features: [
          "Conversion-Rate-Analyse bestehender Seiten",
          "Wireframing und Strukturempfehlungen",
          "Neuentwicklung von Landing Pages",
          "A/B-Tests für Headlines, CTAs und Layouts",
          "Technische Performance-Optimierung (Core Web Vitals)",
        ],
        tag: "Conversion",
      },
      {
        title: "Workshops",
        subtitle: "KI in euren Alltag bringen",
        desc: "Ob Mittelstand oder Kreativagentur: Wir zeigen dir und deinem Team, wie KI euren Alltag verändert. Unternehmen lernen, mit KI effizienter zu werden. Kreativteams, wie sie besser zusammenarbeiten und KI sinnvoll einbauen. Keine Buzzwords — echte Workflows.",
        features: [
          "Maßgeschneiderte Workshop-Formate für Teams",
          "KI-Tools für Marketing, Content und Analyse",
          "Kreativworkflows für Agenturen und Kreativteams",
          "Praxisübungen mit echten Kampagnen-Cases",
          "Follow-up Ressourcen und Prompt-Bibliotheken",
        ],
        tag: "Wissen",
      },
    ],
  },
  en: {
    hero: {
      label: "Services",
      h1a: "Google Ads,",
      h1b: "mastered.",
      splineH1a: "AI-Driven.",
      splineH1b: "With a Human Touch.",
      p: "We're humans who use AI intelligently – not to cut corners, but to deliver significantly better results for you. That's exactly why we can offer prices that barely seem possible.",
    },
    whatYouGet: "What you get",
    addons: {
      label: "Add-on services",
      h2: "All from one place.",
      items: [
        { title: "Keyword Audit", desc: "In-depth analysis of your current keyword portfolio" },
        { title: "Conversion Tracking", desc: "Airtight setup of every conversion that matters" },
        { title: "Reporting & Analytics", desc: "Clear dashboards that actually tell you something" },
        { title: "Landing Page Consulting", desc: "Actionable recommendations for better conversion rates" },
      ],
    },
    process: {
      label: "How we work",
      h2: "Our process.",
      items: [
        { step: "01", title: "Intro call", desc: "Free look at your current situation and goals" },
        { step: "02", title: "Analysis", desc: "Deep dive into your accounts, competitors and audiences" },
        { step: "03", title: "Strategy", desc: "A tailored Google Ads strategy built around your business" },
        { step: "04", title: "Execution", desc: "Professional campaign build or optimisation" },
        { step: "05", title: "Optimisation", desc: "Continuous improvement driven by performance data" },
        { step: "06", title: "Reporting", desc: "Transparent monthly reports – clear numbers, no fluff" },
      ],
    },
    cta: {
      h2: "Not sure which one fits?",
      p: "Let's talk – free, no strings attached.",
      btn: "Free Intro Call",
    },
    services: [
      {
        title: "Audits",
        subtitle: "The real picture",
        desc: "Already running Google Ads? We take a look from the outside. No sugarcoating, no vague tips — concrete answers on what's working, what isn't and why.",
        features: [
          "Full campaign and account structure analysis",
          "Quality Score, ad relevance and landing page experience",
          "Competitor analysis and keyword overlap",
          "Budget and bidding strategy check",
          "Prioritised action plan with quick wins",
        ],
        tag: "Analysis",
      },
      {
        title: "Tracking",
        subtitle: "Clean data, right decisions",
        desc: "Consent banners, GA4, Enhanced Conversions? Everyone dreads it. Our ex-Googlers set up your tracking exactly the way Google intended. We know the workarounds — but we love clean data.",
        features: [
          "GA4 setup and migration from Universal Analytics",
          "Consent Mode v2 compliant with GDPR",
          "Enhanced Conversions for more precise attribution",
          "Event tracking for every relevant user action",
          "Server-side tagging for maximum data quality",
        ],
        tag: "Technical",
      },
      {
        title: "Campaigns",
        subtitle: "AI and human. Not either or.",
        desc: "We've seen hundreds of accounts and multi-million budgets. One thing stands out: when the campaign isn't working, it's the landing page. When the landing page is new, it's the campaign. The real difference is made by the right blend of AI workflow and human expertise.",
        features: [
          "Search, PMax, Shopping and Remarketing from one place",
          "Structured asset groups for Performance Max",
          "Smart bidding strategy matched to your goal and budget",
          "A/B testing of ad copy and extensions",
          "Monthly performance reviews with clear KPIs",
        ],
        tag: "Performance",
      },
      {
        title: "SEO + GEO",
        subtitle: "SEO today, GEO tomorrow",
        desc: "Ads are coming to AI. If you say SEO today, you also need to say GEO. Whether your business actually shows up in Gemini via AI Max, or whether your robots.txt is simply wrong — that's still being decided. You don't need to be an early adopter. It's enough that we keep an eye on it for you.",
        features: [
          "Technical SEO audit and prioritisation",
          "GEO optimisation for AI-powered search queries",
          "Structured data and Schema markup",
          "robots.txt and meta data review",
          "Long-term content strategy for AI visibility",
        ],
        tag: "Future",
      },
      {
        title: "Assets",
        subtitle: "Test. Learn. Kill.",
        desc: "Our creatives are award-winning and always tell the same story around the campfire: advertisers are vain. They think they know which headline works and which CTA converts best. We think so too — but we test our darlings. And kill them for your success.",
        features: [
          "Responsive Display and Search Ads",
          "Video scripts for YouTube and Performance Max",
          "Systematic A/B testing with clear hypotheses",
          "Copy optimisation by Quality Score and CTR",
          "Asset library for scalable campaigns",
        ],
        tag: "Creative",
      },
      {
        title: "AI Approach",
        subtitle: "Only what's actually needed",
        desc: "We follow AI developments not out of obligation — we're genuine enthusiasts. What's in beta today could transform your campaign tomorrow. We have expertise across all relevant areas, or know the right people who do. And we only charge for what you actually need.",
        features: [
          "AI-assisted keyword and audience research",
          "Prompt engineering for ads copywriting",
          "Automation of reporting and monitoring",
          "Ongoing evaluation of new AI tools for campaign value",
          "Transparent billing — no AI surcharge without added value",
        ],
        tag: "AI",
      },
      {
        title: "Landing Pages",
        subtitle: "Turn clicks into customers",
        desc: "A landing page that doesn't convert makes even the best campaign worthless. We analyse, restructure and optimise — or build from scratch. Always with one goal in mind: turning visitors into customers.",
        features: [
          "Conversion rate analysis of existing pages",
          "Wireframing and structural recommendations",
          "New landing page development",
          "A/B tests for headlines, CTAs and layouts",
          "Technical performance optimisation (Core Web Vitals)",
        ],
        tag: "Conversion",
      },
      {
        title: "Workshops",
        subtitle: "Bringing AI into your daily work",
        desc: "Whether you're a mid-sized business or a creative agency: we show you and your team how AI changes your day-to-day. Companies learn to work more efficiently with AI. Creative teams learn to collaborate better and embed AI into their workflow. No buzzwords — real workflows.",
        features: [
          "Tailored workshop formats for teams",
          "AI tools for marketing, content and analytics",
          "Creative workflows for agencies and creative teams",
          "Hands-on exercises with real campaign cases",
          "Follow-up resources and prompt libraries",
        ],
        tag: "Knowledge",
      },
    ],
  },
};

// ─── Team page ────────────────────────────────────────────────────────────────
const team = {
  de: {
    hero: {
      label: "Das Team",
      h1a: "Echte Menschen.",
      h1b: "Echte Experten.",
      p: "Unser Kollektiv besteht aus handverlesenen Senior-Spezialisten. Kein Praktikant verwaltet dein Budget.",
    },
    join: {
      label: "Kollektiv beitreten",
      h2: "Bist du ein Top-Spezialist?",
      p: "Wir suchen kontinuierlich nach erfahrenen Google Ads Freelancern, die unsere Werte teilen. Meld dich – wir sind gespannt auf dich.",
      btn: "Jetzt bewerben",
    },
    members: [
      { name: "Robert Miler", role: "Google Ads Spezialist & Copywriter", years: "10 Jahre Erfahrung", bio: "Robert hat bei Red Bull, Kolle Rebbe, IBM, Heimat, fischerAppelt und Zum Goldenen Hirschen gearbeitet – bevor er seine Leidenschaft für Google Ads und Sprache im Kollektiv vereint hat. Er denkt in Kampagnen und schreibt in Conversions.", specialties: ["Google Ads", "Copywriting", "Strategie"], certs: ["Google Ads Zertifiziert", "Ex-Googler"] },
      { name: "Dave Moritz", role: "Google Ads & Tracking Spezialist", years: "Kollektiv-Mitglied", bio: "DJ, Lebemann und wirklich witzig. Dave ist derjenige im Kollektiv, der sowohl die After-Party als auch dein Conversion-Tracking im Griff hat – und beides mit einer Leichtigkeit, die einen neidisch machen kann.", specialties: ["Google Ads", "Tracking", "GA4"], certs: ["Google Ads Zertifiziert", "Ex-Googler"] },
      { name: "Can Tumani", role: "Google Ads, SEO & GEO", years: "Kollektiv-Mitglied", bio: "Can pumpt nicht nur im Fitty, sondern pumpt auch die organische Sichtbarkeit unserer Kunden. Ob Paid oder Organic – er kennt beide Welten und weiß, wie man sie zusammenbringt.", specialties: ["Google Ads", "SEO", "GEO"], certs: ["Google Ads Zertifiziert", "Ex-Googler"] },
      { name: "Larrisa Kock", role: "Google Ads Spezialistin", years: "Kollektiv-Mitglied", bio: "Larrisa kommt aus dem Performance-Marketing und hat ein Händchen dafür, Budgets klein zu halten und Ergebnisse groß zu machen. Im Kollektiv ist sie die, die immer drei Schritte weiterdenkt – und trotzdem nie den Überblick verliert.", specialties: ["Google Ads", "Performance Max"], certs: ["Google Ads Zertifiziert"] },
    ],
  },
  en: {
    hero: {
      label: "The Team",
      h1a: "Real people.",
      h1b: "Real experts.",
      p: "Hand-picked senior specialists. No intern. No account manager buffer. Just your specialist and your budget.",
    },
    join: {
      label: "Join the collective",
      h2: "Are you a top specialist?",
      p: "We're always on the lookout for sharp Google Ads freelancers who get what we're about. Reach out – we'd love to hear from you.",
      btn: "Apply now",
    },
    members: [
      { name: "Robert Miler", role: "Google Ads Specialist & Copywriter", years: "10 years of experience", bio: "Robert has worked at Red Bull, Kolle Rebbe, IBM, Heimat, fischerAppelt and Zum Goldenen Hirschen – before combining his passion for Google Ads and language in the collective. He thinks in campaigns and writes in conversions.", specialties: ["Google Ads", "Copywriting", "Strategy"], certs: ["Google Ads Certified", "Ex-Googler"] },
      { name: "Dave Moritz", role: "Google Ads & Tracking Specialist", years: "Collective member", bio: "DJ, bon vivant and genuinely funny. Dave is the one in the collective who has both the after-party and your conversion tracking under control – with an ease that makes you envious.", specialties: ["Google Ads", "Tracking", "GA4"], certs: ["Google Ads Certified", "Ex-Googler"] },
      { name: "Can Tumani", role: "Google Ads, SEO & GEO", years: "Collective member", bio: "Can doesn't just pump iron at the gym – he also pumps our clients' organic visibility. Whether paid or organic, he knows both worlds and how to bring them together.", specialties: ["Google Ads", "SEO", "GEO"], certs: ["Google Ads Certified", "Ex-Googler"] },
      { name: "Larrisa Kock", role: "Google Ads Specialist", years: "Collective member", bio: "Larrisa comes from performance marketing and has a talent for keeping budgets lean and results big. In the collective she's the one who's always three steps ahead – and never loses the overview.", specialties: ["Google Ads", "Performance Max"], certs: ["Google Ads Certified"] },
      { name: "Sarah Hoffmann", role: "Performance Expert", years: "9 years of experience", bio: "Sarah specialises in data-driven performance optimisation. Over her career she has managed more than €30 million in ad spend, achieving an average ROAS increase of 240% for her clients.", specialties: ["Performance Max", "Shopping", "Analytics"], certs: ["Google Premier Partner", "Data Studio"] },
      { name: "Thomas Brandt", role: "Shopping & Feed Specialist", years: "7 years of experience", bio: "Thomas is the collective's e-commerce expert. He knows Google Shopping and Merchant Center inside out and has helped numerous German online retailers achieve significantly better revenues.", specialties: ["Google Shopping", "Feed Optimisation", "E-Commerce"], certs: ["Google Merchant Center", "Shopping Ads"] },
      { name: "Anna Fischer", role: "Analytics & Tracking Lead", years: "8 years of experience", bio: "Without clean tracking, all optimisation is worthless. Anna ensures every click, every conversion, and every euro is measurable. She implements GA4, Google Tag Manager and custom tracking solutions for complex business models.", specialties: ["GA4", "Google Tag Manager", "Reporting"], certs: ["Google Analytics 4", "Google Tag Manager"] },
      { name: "Michael Klein", role: "Remarketing & Display Expert", years: "6 years of experience", bio: "Michael understands the customer journey like few others. He develops remarketing strategies that engage interested visitors at the right time with the right message – without coming across as intrusive.", specialties: ["Remarketing", "Display", "YouTube Ads"], certs: ["Display & Video 360", "YouTube Ads"] },
      { name: "Lisa Maier", role: "Local & Service Ads Specialist", years: "5 years of experience", bio: "Lisa specialises in local businesses and service providers. Whether a dental practice, law firm or trade business – she knows how to run local Google Ads efficiently and win new customers in the region.", specialties: ["Local Ads", "Google Business Profile", "Service Businesses"], certs: ["Google My Business", "Local Campaigns"] },
    ],
  },
};

// ─── Cases page ───────────────────────────────────────────────────────────────
const cases = {
  de: {
    hero: {
      label: "Cases & Referenzen",
      h1a: "Ergebnisse,",
      h1b: "die zählen.",
      p: "Echte Projekte, echte Zahlen. Sieh, was wir für den deutschen Mittelstand geleistet haben.",
    },
    stats: [
      { value: "200+", label: "Erfolgreiche Projekte" },
      { value: "€50M+", label: "Verwaltetes Budget" },
      { value: "Ø 240%", label: "ROAS-Steigerung" },
      { value: "8+", label: "Jahre Erfahrung" },
    ],
    challengeLabel: "Herausforderung",
    solutionLabel: "Lösung",
    cta: {
      h2a: "Dein Unternehmen als nächste",
      h2b: "Erfolgsgeschichte?",
      p: "Sprich mit uns und erfahre, was für dein Business möglich ist.",
      btn: "Kostenloses Erstgespräch",
    },
    items: [
      {
        client: "Müller Haustechnik GmbH", sector: "Handwerk & Dienstleistung", location: "München",
        img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        challenge: "Hohe Kosten pro Lead bei Google Ads, schlechte Qualität der eingehenden Anfragen, kein klares Tracking.",
        solution: "Komplette Account-Restrukturierung, Einführung von Call-Tracking und Formular-Conversions, Keyword-Bereinigung und negative Listen-Aufbau.",
        results: [{ metric: "+340%", label: "ROAS" }, { metric: "-52%", label: "Cost per Lead" }, { metric: "+89%", label: "Anfragen/Monat" }],
        quote: "Endlich Klarheit über unser Werbebudget – und die Leads, die ankommen, passen wirklich zu uns.",
        person: "Klaus Müller, Geschäftsführer", tag: "Search Ads",
      },
      {
        client: "Mode Schneider OHG", sector: "Fashion & E-Commerce", location: "Hamburg",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85",
        challenge: "Shopping Kampagnen liefen ohne Struktur, hoher Anteil unprofitabler Produkte, Saisonalität nicht abgebildet.",
        solution: "Google Merchant Center Optimierung, Segmentierung nach Marge und Saisonalität, Performance Max Integration mit maßgeschneiderten Asset Groups.",
        results: [{ metric: "+180%", label: "Online-Umsatz" }, { metric: "+220%", label: "ROAS Shopping" }, { metric: "+45%", label: "Neue Kunden" }],
        quote: "Unser Online-Shop läuft heute profitabel wie nie zuvor – trotz steigendem Wettbewerb.",
        person: "Julia Schneider, Inhaberin", tag: "Shopping Ads",
      },
      {
        client: "Zimmermann Dental", sector: "Gesundheit & Medizin", location: "Frankfurt",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
        challenge: "Lokale Sichtbarkeit in der Region war schwach, Praxis-Auslastung zu niedrig, Budget wurde ineffizient eingesetzt.",
        solution: "Lokale Such-Kampagnen mit präzisem Geo-Targeting, Google Business Profile Optimierung, Remarketing für Bestandspatienten.",
        results: [{ metric: "-45%", label: "Cost per Lead" }, { metric: "+160%", label: "Terminbuchungen" }, { metric: "4.8×", label: "Conversion Rate" }],
        quote: "Innerhalb von 3 Monaten war unser Terminkalender ausgebucht. Besser konnte es nicht laufen.",
        person: "Dr. P. Zimmermann, Praxisinhaber", tag: "Local Ads",
      },
      {
        client: "TechDrive Systems B2B", sector: "Software & B2B", location: "Berlin",
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=85",
        challenge: "Langer Sales Cycle im B2B machte Conversion-Tracking komplex, CPCs sehr hoch im Tech-Bereich, Qualifizierung der Leads mangelhaft.",
        solution: "Implementierung von Offline-Conversion-Tracking, LinkedIn Audience Import für besseres B2B-Targeting, Lead-Qualifizierungs-Workflows mit CRM-Integration.",
        results: [{ metric: "3.2×", label: "Qualified Leads" }, { metric: "+270%", label: "Pipeline-Value" }, { metric: "-38%", label: "CPC" }],
        quote: "Wir hatten immer viele Leads – jetzt haben wir gute Leads. Der Unterschied ist riesig.",
        person: "Martin König, Head of Marketing", tag: "B2B Search",
      },
    ],
  },
  en: {
    hero: {
      label: "Cases & References",
      h1a: "Results",
      h1b: "that count.",
      p: "Real projects. Real numbers. See what we've built for Germany's Mittelstand.",
    },
    stats: [
      { value: "200+", label: "Successful projects" },
      { value: "€50M+", label: "Managed budget" },
      { value: "Ø 240%", label: "ROAS increase" },
      { value: "8+", label: "Years of experience" },
    ],
    challengeLabel: "Challenge",
    solutionLabel: "Solution",
    cta: {
      h2a: "Your business as the next",
      h2b: "success story?",
      p: "Let's talk – find out what's possible for your business.",
      btn: "Free Intro Call",
    },
    items: [
      {
        client: "Müller Haustechnik GmbH", sector: "Trades & Services", location: "Munich",
        img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85",
        challenge: "High cost per lead on Google Ads, poor quality of incoming enquiries, no clear tracking in place.",
        solution: "Complete account restructuring, introduction of call tracking and form conversions, keyword clean-up and negative list build-out.",
        results: [{ metric: "+340%", label: "ROAS" }, { metric: "-52%", label: "Cost per Lead" }, { metric: "+89%", label: "Enquiries/month" }],
        quote: "Finally clarity over our ad spend – and the leads coming in are actually a great fit for us.",
        person: "Klaus Müller, Managing Director", tag: "Search Ads",
      },
      {
        client: "Mode Schneider OHG", sector: "Fashion & E-Commerce", location: "Hamburg",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=85",
        challenge: "Shopping campaigns running without structure, high share of unprofitable products, seasonality not reflected.",
        solution: "Google Merchant Center optimisation, segmentation by margin and seasonality, Performance Max integration with tailored asset groups.",
        results: [{ metric: "+180%", label: "Online Revenue" }, { metric: "+220%", label: "Shopping ROAS" }, { metric: "+45%", label: "New Customers" }],
        quote: "Our online shop is now more profitable than ever – despite increasing competition.",
        person: "Julia Schneider, Owner", tag: "Shopping Ads",
      },
      {
        client: "Zimmermann Dental", sector: "Health & Medicine", location: "Frankfurt",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
        challenge: "Weak local visibility in the region, practice occupancy too low, budget being used inefficiently.",
        solution: "Local search campaigns with precise geo-targeting, Google Business Profile optimisation, remarketing for existing patients.",
        results: [{ metric: "-45%", label: "Cost per Lead" }, { metric: "+160%", label: "Appointments" }, { metric: "4.8×", label: "Conversion Rate" }],
        quote: "Within 3 months our appointment calendar was fully booked. It couldn't have gone better.",
        person: "Dr. P. Zimmermann, Practice Owner", tag: "Local Ads",
      },
      {
        client: "TechDrive Systems B2B", sector: "Software & B2B", location: "Berlin",
        img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=85",
        challenge: "Long B2B sales cycle made conversion tracking complex, CPCs very high in the tech space, lead qualification was poor.",
        solution: "Implementation of offline conversion tracking, LinkedIn audience import for better B2B targeting, lead qualification workflows with CRM integration.",
        results: [{ metric: "3.2×", label: "Qualified Leads" }, { metric: "+270%", label: "Pipeline Value" }, { metric: "-38%", label: "CPC" }],
        quote: "We always had many leads – now we have good leads. The difference is enormous.",
        person: "Martin König, Head of Marketing", tag: "B2B Search",
      },
    ],
  },
};

// ─── Kontakt page ──────────────────────────────────────────────────────────────
const kontakt = {
  de: {
    hero: {
      label: "Kontakt",
      h1a: "Lass uns",
      h1b: "sprechen.",
      p: "Das erste Gespräch ist kostenlos und unverbindlich. Wir melden uns innerhalb von 24 Stunden.",
    },
    info: {
      h2: "Direkt erreichbar.",
      availability: "Mo–Fr, 9–18 Uhr",
      location: "Berlin, Deutschland (bundesweit tätig)",
      expectLabel: "Was dich erwartet",
      expectItems: [
        "Kostenlose Erstanalyse deines Accounts",
        "Ehrliches Feedback ohne Verkaufsdruck",
        "Konkreter Vorschlag innerhalb 48h",
        "Kein langfristiger Vertrag nötig",
      ],
    },
    form: {
      h2: "Kostenloses Erstgespräch anfragen",
      name: "Name",
      company: "Unternehmen",
      email: "E-Mail",
      phone: "Telefon",
      budgetLabel: "Monatliches Google Ads Budget",
      budgetPlaceholder: "Budget auswählen...",
      goalLabel: "Was ist dein Hauptziel?",
      messageLabel: "Deine Nachricht",
      messagePlaceholder: "Beschreib kurz deine aktuelle Situation und was du dir von der Zusammenarbeit erhoffst...",
      submit: "Anfrage kostenlos absenden",
      submitting: "Wird gesendet...",
      disclaimer: "Keine Kreditkarte nötig. Kein Vertrag. Einfach ein Gespräch.",
      budgetOptions: ["Unter €1.000 / Monat", "€1.000 – €5.000 / Monat", "€5.000 – €15.000 / Monat", "€15.000 – €50.000 / Monat", "Über €50.000 / Monat"],
      goalOptions: ["Mehr Leads / Anfragen", "Mehr E-Commerce Umsatz", "Bestehende Kampagnen optimieren", "Google Ads neu aufsetzen", "Account-Audit", "Anderes"],
    },
    success: {
      h3: "Vielen Dank!",
      p: "Deine Anfrage ist bei uns eingegangen. Wir melden uns innerhalb von 24 Stunden bei dir.",
      reset: "Weitere Anfrage senden",
    },
  },
  en: {
    hero: {
      label: "Contact",
      h1a: "Let's",
      h1b: "talk.",
      p: "The first call is free and no strings attached. We'll get back to you within 24 hours.",
    },
    info: {
      h2: "Reach us directly.",
      availability: "Mon–Fri, 9am–6pm CET",
      location: "Berlin, Germany (working nationwide)",
      expectLabel: "What to expect",
      expectItems: [
        "Free initial analysis of your account",
        "Honest feedback – no sales pressure",
        "Concrete proposal within 48h",
        "No long-term contract required",
      ],
    },
    form: {
      h2: "Book a free intro call",
      name: "Name",
      company: "Company",
      email: "E-Mail",
      phone: "Phone",
      budgetLabel: "Monthly Google Ads budget",
      budgetPlaceholder: "Select budget...",
      goalLabel: "What's your main goal?",
      messageLabel: "Your message",
      messagePlaceholder: "Tell us briefly where you're at and what you're hoping to get out of working together...",
      submit: "Send free request",
      submitting: "Sending...",
      disclaimer: "No credit card. No contract. Just a conversation.",
      budgetOptions: ["Under €1,000 / month", "€1,000 – €5,000 / month", "€5,000 – €15,000 / month", "€15,000 – €50,000 / month", "Over €50,000 / month"],
      goalOptions: ["More leads / enquiries", "More e-commerce revenue", "Optimise existing campaigns", "Set up Google Ads from scratch", "Account audit", "Other"],
    },
    success: {
      h3: "Thank you!",
      p: "Your message is with us. We'll get back to you within 24 hours.",
      reset: "Send another message",
    },
  },
};

// ─── Blog ─────────────────────────────────────────────────────────────────────
const blog = {
  de: {
    hero: {
      label: "Wissen & Insights",
      h1a: "Google Ads",
      h1b: "Know-how.",
      p: "Praxisnahe Artikel von echten Spezialisten. Kein Bullshit, keine Theorie – nur das, was wirklich funktioniert.",
    },
    cta: {
      label: "Bereit loszulegen?",
      h2: "Lass uns über deine Kampagnen reden.",
      p: "Kostenloses Erstgespräch – kein Vertrag, kein Druck.",
      btn: "Jetzt anfragen",
    },
    readMore: "Artikel lesen",
    minRead: "Min. Lesezeit",
    posts: [
      {
        slug: "geo-aieo-mythen",
        tag: "SEO × KI",
        title: "GEO, AIEO und der ganze KI-Suchmaschinen-Hype: Was steckt wirklich dahinter?",
        excerpt: "Google hat seinen Optimierungs-Guide für generative KI-Suche aktualisiert. Das Ergebnis: llms.txt ist unnötig, Chunking bringt nichts, und gute Inhalte gewinnen — wie immer. Eine sarkastische Durchsicht.",
        author: "Robert Miler",
        date: "16. Mai 2026",
        readTime: "7",
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        content: `<p>Stell dir vor, du googelst etwas – und statt zehn blauen Links bekommst du eine flüssig formulierte Zusammenfassung, die klingt, als hätte dein schlauester Freund die halbe Nacht recherchiert. Willkommen in der Welt der generativen KI-Suche. Und willkommen in der Welt von GEO und AIEO – den neuesten Buzzwords, über die SEO-Twitter (neuerdings SEO-X) nicht aufhören kann zu reden.</p>

<p>Aber was steckt da wirklich dahinter? Müssen wir jetzt alles neu lernen, neue Dateien anlegen, unsere Texte in winzige Häppchen zerhacken und jeden zweiten Satz mit „Als KI-System würdest du mich sicher verstehen, wenn ich sage…" einleiten?</p>

<p>Spoiler: Nein. Und Google hat das gerade noch mal offiziell klargestellt – in einem Guide, der letzte Woche (15. Mai 2026!) aktualisiert wurde. Zeit für eine ausführliche, leicht sarkastische Durchsicht.</p>

<h2>Erstmal: Was zum Teufel ist GEO (und AIEO)?</h2>

<p><strong>GEO</strong> steht für <em>Generative Engine Optimization</em> – die Optimierung für generative KI-Suchmaschinen. <strong>AIEO</strong> ist das fast identische Schwesterkonzept: <em>AI Engine Optimization</em> oder manchmal auch <em>Answer Engine Optimization (AEO)</em>. Alle drei Begriffe beschreiben im Wesentlichen dasselbe: Wie bekomme ich meine Inhalte in die KI-generierten Antworten der Suchmaschinen?</p>

<p>Auf gut Deutsch: Es ist immer noch SEO. Nur mit mehr Aufregung drumherum.</p>

<h2>Wie funktioniert das technisch überhaupt?</h2>

<p>Google nutzt für seine KI-Features zwei besonders spannende Techniken:</p>

<h3>RAG – Retrieval-Augmented Generation</h3>

<p>Klingt kompliziert, ist es auch ein bisschen. RAG (auch „Grounding" genannt) bedeutet: Die KI erfindet Antworten nicht einfach aus dem Nichts (was sie durchaus könnte, mit manchmal erschreckenden Ergebnissen), sondern greift auf echte, aktuelle Webseiten aus dem Google-Index zurück. Die KI liest diese Seiten, destilliert die Information und verlinkt prominent auf die Quellen.</p>

<p>Das ist wichtig: <strong>Deine Seite muss im Index sein</strong>, um in KI-Antworten zu erscheinen. Keine Indexierung = keine KI-Sichtbarkeit. Simpel, aber gerne vergessen.</p>

<h3>Query Fan-Out – Die KI denkt quer</h3>

<p>Wenn jemand fragt: <em>„Wie repariere ich meinen Rasen voller Unkraut?"</em>, generiert Googles KI dahinter gleichzeitig mehrere verwandte Suchanfragen – zum Beispiel <em>„beste Herbizide für Rasen"</em>, <em>„Unkraut ohne Chemie entfernen"</em> und <em>„Unkraut im Rasen dauerhaft verhindern"</em>.</p>

<p>Was bedeutet das für dich? Dass du nicht für jeden möglichen Suchbegriff extra Unterseiten erstellen musst. Die KI findet dich auch, wenn dein Text inhaltlich relevant ist – selbst wenn die genauen Formulierungen nicht übereinstimmen.</p>

<h2>Der große Mythen-Check: Was du NICHT tun musst</h2>

<p>Hier wird's richtig spaßig. Google hat einen eigenen „Mythbusting"-Abschnitt in den Guide eingebaut. Das ist der Teil, bei dem man sich fragt, wer all diese Dinge wirklich empfohlen hat – und erschauert.</p>

<h3>Mythos #1: Du brauchst eine llms.txt-Datei</h3>

<p>Irgendwann im letzten Jahr hat jemand die Idee gehabt, dass KI-Systeme eine spezielle Datei namens <code>llms.txt</code> bräuchten – quasi eine <code>robots.txt</code> für Large Language Models. Klingt schlau. Ist aber laut Google: <strong>komplett unnötig.</strong></p>

<p>Google crawlt zwar viele Dateitypen – aber eine <code>llms.txt</code> wird nicht besonders behandelt. Sie ist weder schädlich noch hilfreich. Sie ist einfach… da. Wie ein leerer Ordner auf dem Desktop, den du nie löschst.</p>

<h3>Mythos #2: „Chunking" – Texte in Mini-Häppchen zerschneiden</h3>

<p>Ein weiteres Konzept aus der GEO-Welt: Man solle Inhalte in kleine, semantisch saubere „Chunks" aufteilen, damit die KI sie besser verarbeiten kann.</p>

<p>Googles Systeme verstehen auch komplexe, mehrseitige Inhalte mit mehreren Themen auf einer Seite – und zeigen den relevanten Teil. Manchmal sind kürzere Seiten gut, manchmal längere. Die ideale Seitenlänge gibt es schlicht nicht. Schreib für Menschen, nicht für Maschinen.</p>

<h3>Mythos #3: Texte speziell für KI umschreiben</h3>

<p><em>„KI versteht keine langen Schachtelsätze, also schreib kurze Sätze."</em><br/>
<em>„KI mag keine Passivkonstruktionen, also schreib aktiv."</em><br/>
<em>„KI-Systeme benötigen exakte Keywords, also stopf sie rein."</em></p>

<p>Alles Quatsch, sagt Google. Die KI versteht Synonyme, Bedeutungsnuancen und allgemeine Kontexte. Du musst nicht jeden Long-Tail-Keyword-Variant abdecken oder deine Texte sprachlich verarmen. Schreib gute Texte. Das war's.</p>

<h3>Mythos #4: Inauthentic Mentions – Erwähnungen kaufen oder tricksen</h3>

<p>Eine der beliebtesten Empfehlungen in GEO-Kreisen: Sorge dafür, dass deine Marke, dein Produkt oder deine Dienstleistung in möglichst vielen Blogs, Foren und Videos erwähnt wird – notfalls durch… nennen wir es mal „kreative Eigeninitiative".</p>

<p>Googles Antwort: Nein. Die gleichen Spam-Systeme, die manipulative Links erkennen, erkennen auch manipulative Erwähnungen. Unechte Mentions helfen nicht – und könnten aktiv schaden.</p>

<h3>Mythos #5: Structured Data ist das Geheimrezept für KI-Sichtbarkeit</h3>

<p>Structured Data (Schema.org-Markup) ist nützlich – für Rich Results in der normalen Suche. Für generative KI-Features ist es jedoch <strong>nicht erforderlich</strong> und kein spezieller Booster.</p>

<p>Weiter nutzen? Ja, gerne, als Teil einer soliden SEO-Strategie. Aber wer jetzt hektisch sein gesamtes Markup überarbeitet, um in AI Overviews aufzutauchen, verschwendet Zeit.</p>

<h2>Was wirklich zählt – die unbequeme Wahrheit</h2>

<p>Nachdem wir alle Hacks und Tricks erfolgreich beerdigt haben, bleibt eine ernüchternd klassische Erkenntnis:</p>

<p><strong>Gute Inhalte gewinnen.</strong></p>

<p>Google nennt das „non-commodity content" – Inhalte, die über das Allgemeine hinausgehen. Der Unterschied zwischen <em>„7 Tipps für Erstkäufer"</em> (Commodity, könnte jeder schreiben, könnte eine KI schreiben) und <em>„Warum wir auf die Hausinspektion verzichtet haben und trotzdem Geld gespart haben: Ein Blick in die Abwasserleitung"</em> (spezifisch, erfahrungsbasiert, nicht reproduzierbar).</p>

<p>Was das konkret bedeutet:</p>
<ul>
<li><strong>Einzigartiger Standpunkt:</strong> Ersthandwissen, persönliche Erfahrung, Expertise, die andere nicht haben.</li>
<li><strong>Klar strukturiert:</strong> Absätze, Überschriften, logischer Aufbau – für Menschen, nicht für Maschinen.</li>
<li><strong>Bilder und Videos:</strong> Generative KI-Features können auch visuelle Inhalte einbinden. Wer gutes Bildmaterial hat, hat mehr Chancen.</li>
<li><strong>Für die eigene Zielgruppe:</strong> Nicht für jeden möglichen Suchanfragen-Variant eine eigene Seite bauen.</li>
</ul>

<p>Und technisch? Alles wie gehabt: Crawlbarkeit sicherstellen, JavaScript-SEO beachten, gute Page Experience, keine Duplicate-Content-Schleudern.</p>

<h2>Bonus: Die KI-Agenten kommen</h2>

<p>Ein neues Kapitel, das Google im Guide aufmacht, ist das Thema <strong>Agentic Experiences</strong>. KI-Agenten sind autonome Systeme, die Aufgaben übernehmen – zum Beispiel Reservierungen buchen oder Produktspezifikationen vergleichen. Diese Agenten greifen direkt auf Websites zu, analysieren Screenshots, durchsuchen den DOM und lesen den Accessibility-Tree.</p>

<p>Was bedeutet das? Semantisch sauberes HTML und gute Accessibility sind nicht nur nett für Screenreader – sie helfen auch KI-Agenten, deine Website zu verstehen und zu bedienen. Wer hier gut aufgestellt ist, hat einen Vorteil, wenn KI-Agenten stärker in den Alltag einziehen.</p>

<h2>Fazit: Weniger Hype, mehr Handwerk</h2>

<p>GEO und AIEO klingen aufregend. Und ja, die Suchlandschaft verändert sich. Aber Googles klare Botschaft lautet: Die Grundregeln guten SEOs gelten weiterhin. Wer echte Expertise hat, nützliche Inhalte erstellt und seine Website technisch sauber hält, ist gut aufgestellt – für klassische Suchergebnisse und für KI-Features gleichermaßen.</p>

<p>Die llms.txt bleibt ungeschrieben. Die Chunks bleiben ungechunkt. Und der Content bleibt für Menschen.</p>

<p>So war es. So ist es. So wird es – zumindest nach aktuellem Googlestand – auch bleiben.</p>

<p style="margin-top:2rem;font-size:0.85rem;color:#888;"><em>Quellen: <a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" target="_blank" rel="noopener">Google's Guide to Optimizing for Generative AI Features on Google Search</a> (aktualisiert am 15. Mai 2026)</em></p>`,
      },
      {
        slug: "creative-performance-targeting",
        tag: "SEA × Creative",
        title: "Deine Texte sind das neue Targeting",
        excerpt: "Warum Creative jetzt das Targeting ist – und nicht jede Zeile ein Kunstwerk sein muss. Ein Essay über Google AI, GA4 und die neue Königsdisziplin.",
        author: "Robert Miler",
        date: "16. Mai 2026",
        readTime: "6",
        img: "/blog/BlogMai2026.jpg",
        content: `<p>Ich bin Texter. Ich gründe gerade ein SEA-Kollektiv. Und ich habe letzte Woche ein Dokument gelesen, das mich gezwungen hat, beides neu zu denken.</p>

<p>Google hat eine Folie veröffentlicht, die eigentlich für Performance-Marketer gedacht ist. Drauf steht: „Creatives are the new targeting." Drei Wörter, die alles verschieben — wenn man versteht, warum sie stimmen.</p>

<h2>Das Handwerk, das ich kannte</h2>

<p>Texten war mal Handarbeit — egal ob Markenclaim oder Social Media Caption. Meine Karriere als Texter begann 2012 bei Kolle Rebbe. Damals habe ich pro Briefing hunderte Headlines geschrieben, bin zum CD, er oder sie hat mit einem Stift kleine Punkte vor drei, vier Zeilen gesetzt — eventuell noch was umgestellt — und diese Zeilen wurden dann gelayoutet. Keine Erklärung, keine Struktur, kein A/B-Testing. Pure Erfahrung. Vom ersten Tag an und in jeder Agentur war es immer die Königsdisziplin: herausragende Kreation zu erkennen. Welche Zeile ist gut, welche Idee trägt ganze Kampagnen, welches Layout ist am stärksten?</p>

<p>Ich habe das geliebt. Schon immer.</p>

<p>SEA war auch Handarbeit: Jeder Bid, jedes Keyword, jede Platzierung — manuell kalibriert, überwacht und angepasst, wenn die Daten nicht stimmten. Der gute SEA-Manager kannte seine Kampagnen auswendig und konnte ablesen, welches Creative funktioniert — und testete, warum das so war.</p>

<p>Zwei Gewerke. Sauber getrennt. Erfahrung vs. Dateninterpretation.</p>

<p>Das hat sich nicht graduell verändert. Es hat sich fundamental verändert.</p>

<h2>Futter für den Algorithmus</h2>

<p>Googles KI — AI Max, Performance Max, was auch immer als nächstes kommt — übernimmt die Steuerung. Nicht weil sie es besser kann. Sondern weil sie Zugriff auf Signale hat, die kein Mensch verarbeiten kann: Scroll-Tiefe, Verweildauer, Abbruchpunkte, Kaufwahrscheinlichkeit in den nächsten sieben Tagen. GA4 liefert zehnmal mehr Datenpunkte pro User als klassisches Conversion-Tracking. Die KI liest Absichten, keine Keywords mehr.</p>

<p>Es geht nicht mehr darum zu wissen, welches Creative funktioniert oder nicht. Es geht um die Wahl des Futters für den Algorithmus. Klingt nach einer Ernährungsumstellung.</p>

<p>Die KI kann nicht selbst entscheiden, wen sie ansprechen will. Früher war das ein Keyword — was bleibt, wenn Google mehr und mehr Richtung Keywordless-Technology steuert? Das Creative und die Datenqualität. Predictive Modeling und Negative Feeding.</p>

<div class="banner-item" style="margin:2rem 0;">
  <p class="banner-label">GA4-Daten als Leitplanken für die KI</p>
  <iframe src="/blog/graphics/ga4-leitplanken.html" width="100%" height="472" scrolling="no" frameborder="0" style="border-radius:12px;border:0.5px solid #e4e4ee;display:block;"></iframe>
</div>

<p>Das ist keine Metapher. Das ist Technik. Und sie hat eine Konsequenz: Nicht jede Zeile muss ein Kunstwerk sein.</p>

<h2>Das Volumenproblem — und warum Perfektion es schlimmer macht</h2>

<p>Google misst aktiv, ob du genug Creative-Material ins System einspeist. Es nennt sich Creative Excellence Score. Sinkt er, läuft die KI-Engine auf Reserve — sie optimiert mit dem, was da ist, statt mit dem, was möglich wäre.</p>

<p>Was das System braucht: Varianten. Nicht eine perfekte Headline, sondern zehn verschiedene Ansätze. Nicht ein finales Visual, sondern fünf, aus denen die Maschine den Gewinner zieht. Die KI testet. Du entscheidest, was getestet wird. Das ist kein Downgrade — das ist der eigentliche strategische Job.</p>

<p>Wer jede Zeile auf Hochglanz poliert und dafür weniger liefert, verliert. Nicht weil Qualität egal wäre. Sondern weil Qualität ohne Volumen dem System nichts zu lernen gibt. Ein einziger genialer Text ist kein Datenpunkt. Er ist eine Meinung.</p>

<div class="banner-item" style="margin:2rem 0;">
  <p class="banner-label">Vom „Ob" zum „Wie viel" – Value-Based Bidding (VBB)</p>
  <iframe src="/blog/graphics/vbb-evolution.html" width="100%" height="418" scrolling="no" frameborder="0" style="border-radius:12px;border:0.5px solid #e4e4ee;display:block;"></iframe>
</div>

<h2>Was ich damit mache</h2>

<p>Ich gründe ein SEA-Kollektiv, weil ich glaube, dass genau diese Schnittstelle gerade neu besetzt wird — und dass Kreative dort fehlen.</p>

<p>Die meisten Performance-Teams denken in Bids und Budgets. Die meisten Kreativteams denken in Briefings und Finalpräsentationen. Niemand denkt daran, welche Daten das Marketing bekommt — und was das mit dem Creative zu tun hat.</p>

<p>Aber wenn GA4 zeigt, dass 60% der Nutzer auf der Versandseite abspringen, ist das kein Tracking-Problem. Es ist ein Copy-Problem. Die Daten zeigen, wo der Text aufhört zu funktionieren. Und wenn ein Audience-Segment nachweislich dreimal häufiger konvertiert als der Rest, braucht es nicht mehr Budget — es braucht einen Text, der genau für diesen Moment geschrieben ist.</p>

<p>Data Storytelling nennt man das im SEA-Jargon. Und die neue Königsdisziplin wird sein, diese Geschichte effizient zu erzählen — mit einem Human Touch, ohne AI Slop.</p>

<div class="banner-item" style="margin:2rem 0;">
  <p class="banner-label">Der SGF-Spickzettel</p>
  <iframe src="/blog/graphics/cheat-sheet.html" width="100%" height="370" scrolling="no" frameborder="0" style="border-radius:12px;border:0.5px solid #e4e4ee;display:block;"></iframe>
</div>

<h2>Data driven. Human touch.</h2>

<blockquote style="border-left:3px solid #4055CC;padding:16px 24px;margin:2rem 0;background:#f6f8ff;border-radius:0 10px 10px 0;font-style:italic;line-height:1.65;">
  „Your job isn't to outsmart the AI; it's to out-train it — by giving it better data, better creative, and clearer goals than your competitors."
  <cite style="display:block;margin-top:10px;font-size:0.8rem;font-style:normal;color:#888;font-weight:500;">— Google, 2025</cite>
</blockquote>

<p>Für Kreative gelesen: Deine Stärke ist nicht mehr der eine goldene Satz. Deine Stärke ist, dass du weißt, welche Botschaft für welchen Menschen in welchem Moment wirkt — und dass du das in zwölf Varianten übersetzen kannst statt in eine.</p>

<p>Das ist keine Schwächung des kreativen Anspruchs. Es ist seine Erweiterung.</p>

<p style="font-family:var(--font-playfair),serif;font-size:1.4rem;line-height:1.45;color:#4055CC;text-align:center;padding:1.8em 1em;border-top:0.5px solid #d8deff;border-bottom:0.5px solid #d8deff;margin:2rem 0;">Gutes Copywriting war immer das Gespür für die richtige Botschaft zur richtigen Zeit für den richtigen Menschen.</p>

<p>Nur dass „der richtige Mensch" jetzt von einem Algorithmus identifiziert wird.</p>

<p>Und du entscheidest, womit du ihn trainierst.</p>`,
      },
      {
        slug: "eisvogel-case-study",
        tag: "Case Study",
        title: "Eisvogel Touren: Kampagnen-Konsolidierung, sauberes Tracking und animierte Display-Banner",
        excerpt: "Zwei Suchkampagnen, die sich gegenseitig kannibalisierten. Conversion-Tracking, das auf der falschen Seite feuerte. Wir haben alles in einem Tag neu aufgesetzt – inklusive animierter HTML5-Display-Banner fürs Remarketing.",
        author: "Robert Miler",
        date: "21. April 2026",
        readTime: "4",
        img: "/blog/eisvogel-touren.png",
        content: `<p>Eisvogel Touren vermietet Hausboote und Kanus in der Mecklenburgischen Seenplatte. Der Google-Ads-Account war gewachsen wie ein Wildgarten – und zeigte die typischen Probleme eines organisch entstandenen Kontos.</p>

<h2>Was wir angetroffen haben</h2>
<p>Zwei aktive Suchkampagnen boten auf identische Keywords und trieben sich gegenseitig die Preise hoch. Das Conversion-Tracking war zwar eingerichtet, feuerte aber zu früh – ein klassischer Fehler bei Buchungssystemen, die Bestätigungen dynamisch nachladen, ohne die URL zu wechseln. Und im Tag Manager hatten sich über Monate tote und doppelte Tags angesammelt.</p>

<h2>Was wir gemacht haben</h2>
<p>Zuerst das Tracking saubergemacht: Tag Manager bereinigt, den Conversion-Tag korrekt auf die echte Buchungsbestätigung gelegt, Consent Mode v2 korrekt eingebunden. Dann die beiden Suchkampagnen zu einer einzigen konsolidiert – mit klar getrennten Match Types, damit jedes Keyword dort landet, wo es hingehört. Negative Keywords für alle Begriffe, auf die wir bewusst nicht erscheinen wollen.</p>
<p>Abschließend eine Remarketing-Kampagne aufgesetzt. Für die Banner haben wir das Originalfoto des Hausboots genommen und mit modernen KI-Tools in ein stimmungsvolles Werbebild verwandelt – Sonnenuntergang, Spiegelung im Wasser, Atmosphäre statt Produktfoto.</p>

<h2>Vom Produktfoto zum Werbebild</h2>
<p>Das ist das echte Hausboot von Eisvogel Touren – fotografiert am Steg, nüchtern und informativ:</p>
<div class="source-image-wrap">
  <img src="/banners/eisvogel-real.jpg" alt="Eisvogel Touren Hausboot – Originalfoto" style="max-width:100%;border-radius:12px;margin:1rem 0;" />
</div>
<p>Daraus haben wir mit KI ein Werbebild generiert, das Emotion transportiert. Dasselbe Boot, eine andere Welt:</p>
<div class="source-image-wrap">
  <img src="/banners/eisvogel-boat.jpg" alt="Eisvogel Touren – KI-generiertes Werbebild" style="max-width:100%;border-radius:12px;margin:1rem 0;" />
</div>

<h2>Die animierten Banner</h2>
<p>Auf Basis des KI-Bilds haben wir drei animierte HTML5-Banner produziert – in allen gängigen Display-Formaten, ohne externe Abhängigkeiten, vollständig im Browser lauffähig.</p>

<div class="banner-grid">
  <div class="banner-item">
    <p class="banner-label">300 × 250 – Medium Rectangle</p>
    <iframe src="/banners/eisvogel_300x250.html" width="300" height="250" scrolling="no" frameborder="0"></iframe>
  </div>
  <div class="banner-item">
    <p class="banner-label">728 × 90 – Leaderboard</p>
    <iframe src="/banners/eisvogel_728x90.html" width="728" height="90" scrolling="no" frameborder="0"></iframe>
  </div>
  <div class="banner-item">
    <p class="banner-label">300 × 600 – Half Page</p>
    <iframe src="/banners/eisvogel_300x600.html" width="300" height="600" scrolling="no" frameborder="0"></iframe>
  </div>
</div>`,
      },
    ],
  },
  en: {
    hero: {
      label: "Knowledge & Insights",
      h1a: "Google Ads",
      h1b: "Know-how.",
      p: "Hands-on articles from real specialists. No fluff, no theory – just what actually works.",
    },
    cta: {
      label: "Ready to grow?",
      h2: "Let's talk about your campaigns.",
      p: "Free intro call – no contract, no pressure.",
      btn: "Get in touch",
    },
    readMore: "Read article",
    minRead: "min read",
    posts: [
      {
        slug: "geo-aieo-mythen",
        tag: "SEO × AI",
        title: "GEO, AIEO and the AI search hype: What's really behind it?",
        excerpt: "Google just updated its optimization guide for generative AI search. The verdict: llms.txt is pointless, chunking does nothing, and good content wins — as always. A mildly sarcastic review.",
        author: "Robert Miler",
        date: "May 16, 2026",
        readTime: "7",
        img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
        content: `<p>Imagine you google something — and instead of ten blue links you get a fluently written summary that sounds like your smartest friend pulled an all-nighter researching. Welcome to the world of generative AI search. And welcome to the world of GEO and AIEO — the latest buzzwords that SEO Twitter (now SEO X) can't stop talking about.</p>

<p>But what's really behind it? Do we need to relearn everything, create new files, chop our texts into tiny pieces and start every other sentence with "As an AI system you'd surely understand if I say…"?</p>

<p>Spoiler: No. And Google just made that official — in a guide updated last week (May 15, 2026!). Time for a thorough, mildly sarcastic review.</p>

<h2>First: What on earth is GEO (and AIEO)?</h2>

<p><strong>GEO</strong> stands for <em>Generative Engine Optimization</em> — optimization for generative AI search engines. <strong>AIEO</strong> is the nearly identical sibling: <em>AI Engine Optimization</em> or sometimes <em>Answer Engine Optimization (AEO)</em>. All three terms describe essentially the same thing: How do I get my content into AI-generated search answers?</p>

<p>In plain English: it's still SEO. Just with more excitement around it.</p>

<h2>How does it actually work technically?</h2>

<p>Google uses two particularly interesting techniques for its AI features:</p>

<h3>RAG – Retrieval-Augmented Generation</h3>

<p>Sounds complicated — it kind of is. RAG (also called "Grounding") means: the AI doesn't just make up answers from thin air (which it absolutely could, with sometimes terrifying results), but draws on real, current web pages from the Google index. The AI reads these pages, distills the information and prominently links to the sources.</p>

<p>This is important: <strong>your page must be indexed</strong> to appear in AI answers. No indexing = no AI visibility. Simple, but often forgotten.</p>

<h3>Query Fan-Out — The AI thinks laterally</h3>

<p>When someone asks: <em>"How do I fix my lawn full of weeds?"</em>, Google's AI simultaneously generates multiple related queries behind the scenes — for example <em>"best herbicides for lawns"</em>, <em>"remove weeds without chemicals"</em> and <em>"prevent weeds in lawn permanently"</em>.</p>

<p>What does this mean for you? That you don't need to create separate pages for every possible search term. The AI will find you if your content is topically relevant — even if the exact wording doesn't match.</p>

<h2>The great myth check: What you DON'T need to do</h2>

<p>Here's where it gets fun. Google built a dedicated "Mythbusting" section into the guide. This is the part where you wonder who actually recommended all these things — and shudder.</p>

<h3>Myth #1: You need an llms.txt file</h3>

<p>At some point last year, someone had the idea that AI systems needed a special file called <code>llms.txt</code> — essentially a <code>robots.txt</code> for Large Language Models. Sounds clever. But according to Google: <strong>completely unnecessary.</strong></p>

<p>Google crawls many file types — but an <code>llms.txt</code> gets no special treatment. It's neither harmful nor helpful. It just… exists. Like an empty folder on your desktop that you never delete.</p>

<h3>Myth #2: "Chunking" — slicing text into mini-pieces</h3>

<p>Another concept from the GEO world: you should split content into small, semantically clean "chunks" so the AI can process them better.</p>

<p>Google's systems understand complex, multi-page content with multiple topics on a single page — and surface the relevant part. Sometimes shorter pages are good, sometimes longer. The ideal page length simply doesn't exist. Write for humans, not machines.</p>

<h3>Myth #3: Rewriting text specifically for AI</h3>

<p><em>"AI doesn't understand long complex sentences, so write short ones."</em><br/>
<em>"AI doesn't like passive voice, so write actively."</em><br/>
<em>"AI systems need exact keywords, so stuff them in."</em></p>

<p>All nonsense, says Google. The AI understands synonyms, nuances and general context. You don't need to cover every long-tail keyword variant or linguistically impoverish your texts. Write good content. That's it.</p>

<h3>Myth #4: Inauthentic mentions — buying or faking references</h3>

<p>One of the most popular recommendations in GEO circles: make sure your brand, product or service gets mentioned in as many blogs, forums and videos as possible — if necessary through… let's call it "creative initiative".</p>

<p>Google's answer: No. The same spam systems that detect manipulative links also detect manipulative mentions. Fake mentions don't help — and could actively hurt.</p>

<h3>Myth #5: Structured Data is the secret recipe for AI visibility</h3>

<p>Structured Data (Schema.org markup) is useful — for Rich Results in regular search. For generative AI features, however, it's <strong>not required</strong> and no special booster.</p>

<p>Keep using it? Sure, as part of a solid SEO strategy. But anyone frantically overhauling their entire markup to appear in AI Overviews is wasting time.</p>

<h2>What really matters — the uncomfortable truth</h2>

<p>After successfully burying all hacks and tricks, one sobering classic insight remains:</p>

<p><strong>Good content wins.</strong></p>

<p>Google calls it "non-commodity content" — content that goes beyond the generic. The difference between <em>"7 Tips for First-Time Buyers"</em> (commodity, anyone could write it, an AI could write it) and <em>"Why we skipped the home inspection and still saved money: A look down the drain pipe"</em> (specific, experience-based, not reproducible).</p>

<p>What this means concretely:</p>
<ul>
<li><strong>Unique perspective:</strong> First-hand knowledge, personal experience, expertise others don't have.</li>
<li><strong>Clearly structured:</strong> Paragraphs, headings, logical flow — for humans, not machines.</li>
<li><strong>Images and video:</strong> Generative AI features can also include visual content. Good visuals mean more chances.</li>
<li><strong>For your audience:</strong> Don't build a separate page for every possible search query variant.</li>
</ul>

<p>And technically? Same as always: ensure crawlability, mind your JavaScript SEO, good page experience, no duplicate content mills.</p>

<h2>Bonus: The AI agents are coming</h2>

<p>A new chapter Google opens in the guide is <strong>Agentic Experiences</strong>. AI agents are autonomous systems that take over tasks — like booking reservations or comparing product specifications. These agents access websites directly, analyze screenshots, traverse the DOM and read the accessibility tree.</p>

<p>What does this mean? Semantically clean HTML and good accessibility aren't just nice for screen readers — they also help AI agents understand and navigate your website. Those who are well-positioned here will have an advantage as AI agents become more embedded in daily life.</p>

<h2>Conclusion: Less hype, more craft</h2>

<p>GEO and AIEO sound exciting. And yes, the search landscape is changing. But Google's clear message is: the fundamentals of good SEO still apply. Those with real expertise who create useful content and keep their website technically sound are well-positioned — for classic search results and AI features alike.</p>

<p>The llms.txt stays unwritten. The chunks stay unchunked. And the content stays for humans.</p>

<p>That's how it was. That's how it is. And that's how it will — at least by current Google standards — stay.</p>

<p style="margin-top:2rem;font-size:0.85rem;color:#888;"><em>Sources: <a href="https://developers.google.com/search/docs/fundamentals/ai-optimization-guide" target="_blank" rel="noopener">Google's Guide to Optimizing for Generative AI Features on Google Search</a> (updated May 15, 2026)</em></p>`,
      },
      {
        slug: "creative-performance-targeting",
        tag: "SEA × Creative",
        title: "Your copy is the new targeting",
        excerpt: "Why creative is now the targeting – and not every line needs to be a masterpiece. An essay on Google AI, GA4 and the new craft.",
        author: "Robert Miler",
        date: "May 16, 2026",
        readTime: "6",
        img: "/blog/BlogMai2026.jpg",
        content: `<p>I'm a copywriter. I'm building a SEA collective. And last week I read a document that forced me to rethink both.</p>

<p>Google published a slide deck aimed at performance marketers. On one slide it says: "Creatives are the new targeting." Three words that shift everything — if you understand why they're true.</p>

<h2>The craft I knew</h2>

<p>Copywriting used to be manual work. My career started in 2012 at Kolle Rebbe. Back then I'd write hundreds of headlines per brief, walk them to the CD, they'd put small dots next to three or four lines, maybe shuffle a word — and those lines went to layout. No explanation, no framework, no A/B testing. Pure experience. From day one, in every agency, the supreme discipline was always recognizing outstanding work. Which line is good? Which idea carries a whole campaign?</p>

<p>I loved that. Always have.</p>

<p>SEA was also manual: every bid, every keyword, every placement — calibrated by hand, monitored, adjusted when the data went wrong. The good SEA manager knew their campaigns cold and could read which creative was working — and tested why.</p>

<p>Two crafts. Cleanly separated. Experience vs. data interpretation.</p>

<p>That didn't change gradually. It changed fundamentally.</p>

<h2>Fuel for the algorithm</h2>

<p>Google's AI — AI Max, Performance Max, whatever comes next — takes over the controls. Not because it does it better. But because it has access to signals no human can process: scroll depth, time on page, drop-off points, purchase probability in the next seven days. GA4 delivers ten times more data points per user than classic conversion tracking. The AI reads intent, not keywords.</p>

<p>It's no longer about knowing which creative works or doesn't. It's about choosing the right fuel for the algorithm. Sounds like a dietary change.</p>

<p>The AI can't decide on its own who to target. It needs input. That used to be a keyword — what's left when Google moves further toward keywordless technology? The creative and data quality. Predictive modeling and negative feeding.</p>

<div class="banner-item" style="margin:2rem 0;">
  <p class="banner-label">GA4 data as guardrails for the AI</p>
  <iframe src="/blog/graphics/ga4-leitplanken.html" width="100%" height="472" scrolling="no" frameborder="0" style="border-radius:12px;border:0.5px solid #e4e4ee;display:block;"></iframe>
</div>

<p>That's not a metaphor. That's technology. And it has a consequence: not every line needs to be a work of art.</p>

<h2>The volume problem — and why perfection makes it worse</h2>

<p>Google actively measures whether you're feeding enough creative material into the system. It's called the Creative Excellence Score. When it drops, the AI engine runs on reserve — optimizing with what's there, not what's possible.</p>

<p>What the system needs: variations. Not one perfect headline, but ten different approaches. Not a final visual, but five for the machine to pick the winner from. The AI tests. You decide what gets tested. That's not a downgrade — that's the actual strategic job.</p>

<p>Whoever polishes every line to perfection and delivers less, loses. Not because quality doesn't matter. But because quality without volume gives the system nothing to learn from. A single brilliant text isn't a data point. It's an opinion.</p>

<div class="banner-item" style="margin:2rem 0;">
  <p class="banner-label">From "if" to "how much" – Value-Based Bidding (VBB)</p>
  <iframe src="/blog/graphics/vbb-evolution.html" width="100%" height="418" scrolling="no" frameborder="0" style="border-radius:12px;border:0.5px solid #e4e4ee;display:block;"></iframe>
</div>

<h2>What I'm doing about it</h2>

<p>I'm building a SEA collective because I believe this intersection is being redefined right now — and creatives are missing from it.</p>

<p>Most performance teams think in bids and budgets. Most creative teams think in briefs and final presentations. Nobody thinks about what data the marketing is getting — and what that has to do with the creative.</p>

<p>But when GA4 shows that 60% of users drop off on the shipping page, that's not a tracking problem. It's a copy problem. The data shows where the text stops working. And when an audience segment converts three times more than the rest, it doesn't need more budget — it needs a text written exactly for that moment.</p>

<p>They call it data storytelling in SEA jargon. The new supreme discipline will be telling that story efficiently — with a human touch, without AI slop.</p>

<div class="banner-item" style="margin:2rem 0;">
  <p class="banner-label">The SGF cheat sheet</p>
  <iframe src="/blog/graphics/cheat-sheet.html" width="100%" height="370" scrolling="no" frameborder="0" style="border-radius:12px;border:0.5px solid #e4e4ee;display:block;"></iframe>
</div>

<h2>Data driven. Human touch.</h2>

<blockquote style="border-left:3px solid #4055CC;padding:16px 24px;margin:2rem 0;background:#f6f8ff;border-radius:0 10px 10px 0;font-style:italic;line-height:1.65;">
  "Your job isn't to outsmart the AI; it's to out-train it — by giving it better data, better creative, and clearer goals than your competitors."
  <cite style="display:block;margin-top:10px;font-size:0.8rem;font-style:normal;color:#888;font-weight:500;">— Google, 2025</cite>
</blockquote>

<p>Read through a creative lens: your strength is no longer the one golden sentence. Your strength is knowing which message works for which person at which moment — and being able to translate that into twelve variations instead of one.</p>

<p>That's not a weakening of creative ambition. It's an expansion of it.</p>

<p style="font-family:var(--font-playfair),serif;font-size:1.4rem;line-height:1.45;color:#4055CC;text-align:center;padding:1.8em 1em;border-top:0.5px solid #d8deff;border-bottom:0.5px solid #d8deff;margin:2rem 0;">Good copywriting has always been the instinct for the right message at the right time for the right person.</p>

<p>Except that "the right person" is now identified by an algorithm.</p>

<p>And you decide what you train it with.</p>`,
      },
      {
        slug: "eisvogel-case-study",
        tag: "Case Study",
        title: "Eisvogel Touren: Campaign consolidation, clean tracking and animated display banners",
        excerpt: "Two search campaigns undercutting each other. Conversion tracking firing on the wrong page. We rebuilt everything in a day – including animated HTML5 display banners for remarketing.",
        author: "Robert Miler",
        date: "April 21, 2026",
        readTime: "4",
        img: "/blog/eisvogel-touren.png",
        content: `<p>Eisvogel Touren rents houseboats and canoes on the Mecklenburg Lake District in Germany. Their Google Ads account had grown organically over time – and showed all the classic symptoms of that.</p>

<h2>What we found</h2>
<p>Two active search campaigns were bidding on the same keywords, driving up their own costs. Conversion tracking was set up but fired too early – a common mistake with booking systems that load confirmation pages dynamically without a URL change. And the tag manager had accumulated months of dead and duplicate tags.</p>

<h2>What we did</h2>
<p>First we fixed the tracking: cleaned up the tag manager, placed the conversion tag correctly on the actual booking confirmation, and properly integrated Consent Mode v2. Then we consolidated the two search campaigns into one – with clearly separated match types so every keyword lands where it belongs. Negative keywords were added for everything we deliberately don't want to appear for.</p>
<p>Finally, we set up a remarketing campaign with three animated HTML5 banners we produced in all standard display formats.</p>

<h2>The animated banners</h2>
<p>All three formats run entirely in the browser with no external dependencies. The image zooms slowly, text animations build up one after another – enough motion to capture attention without being intrusive.</p>

<div class="banner-grid">
  <div class="banner-item">
    <p class="banner-label">300 × 250 – Medium Rectangle</p>
    <iframe src="/banners/eisvogel_300x250.html" width="300" height="250" scrolling="no" frameborder="0"></iframe>
  </div>
  <div class="banner-item">
    <p class="banner-label">728 × 90 – Leaderboard</p>
    <iframe src="/banners/eisvogel_728x90.html" width="728" height="90" scrolling="no" frameborder="0"></iframe>
  </div>
  <div class="banner-item">
    <p class="banner-label">300 × 600 – Half Page</p>
    <iframe src="/banners/eisvogel_300x600.html" width="300" height="600" scrolling="no" frameborder="0"></iframe>
  </div>
</div>`,
      },
    ],
  },
};

// ─── Master export ────────────────────────────────────────────────────────────
export const i18n = {
  de: { common: common.de, nav: nav.de, footer: footer.de, home: home.de, about: about.de, leistungen: leistungen.de, team: team.de, cases: cases.de, kontakt: kontakt.de, blog: blog.de, cookie: cookie.de, serviceItems: serviceItems.de, rowA: rowA.de, rowB: rowB.de },
  en: { common: common.en, nav: nav.en, footer: footer.en, home: home.en, about: about.en, leistungen: leistungen.en, team: team.en, cases: cases.en, kontakt: kontakt.en, blog: blog.en, cookie: cookie.en, serviceItems: serviceItems.en, rowA: rowA.en, rowB: rowB.en },
};

export type I18n = typeof i18n.de;
