import type { Dictionary, Locale } from "./types";

const en: Dictionary = {
  meta: {
    title: "elkapz labs | Practical AI Implementation & Automation",
    description:
      "Practical AI systems for small businesses. We improve support, operations, admin, and reporting workflows with reliable automation and custom software.",
  },
  common: {
    brandLabel: "AI implementation & automation",
    email: "elkapzlabs@gmail.com",
    location: "Belgrade, Serbia · Working across Europe",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    language: "Language",
    bookAudit: "Book an AI Audit",
    seeServices: "See Services",
    getStarted: "Start a conversation",
    selectedLanguage: "Selected language",
  },
  nav: {
    services: "Services",
    whyUs: "Why Us",
    process: "Process",
    pricing: "Pricing",
    faq: "FAQ",
  },
  hero: {
    eyebrow: "AI implementation for small businesses",
    title: "Practical AI systems for businesses drowning in repetitive work.",
    description:
      "We help small businesses integrate AI into support, operations, admin, and content workflows — without buzzwords, bloated tools, or expensive consulting layers.",
    proof: [
      "Husband-and-wife delivery team",
      "Operations + software engineering",
      "Based in Belgrade, working across Europe",
    ],
    workflow: {
      label: "A better operating flow",
      input: "Repetitive work",
      inputItems: ["Copy-paste replies", "Manual reports", "CRM updates"],
      system: "AI-assisted system",
      systemItems: ["Knowledge", "Rules", "Automation"],
      output: "Team output",
      outputItems: ["Faster replies", "Clean data", "More focus"],
      status: "Workflow mapped",
    },
  },
  problem: {
    eyebrow: "The operational drag",
    title: "Your team is not short on effort. The system is creating extra work.",
    description:
      "Small inefficiencies compound: one repeated answer, one manual update, one report rebuilt every week. Soon, capable people spend their day moving information instead of improving the business.",
    items: [
      { title: "Copy-paste work", detail: "The same text rebuilt across email, chat, and documents." },
      { title: "Slow replies", detail: "Customers wait while teams search for the right answer." },
      { title: "Messy SOPs", detail: "Important knowledge lives in old files and individual memory." },
      { title: "Repeated questions", detail: "Teams interrupt each other for information that already exists." },
      { title: "Manual reporting", detail: "Hours disappear into collecting, cleaning, and formatting data." },
      { title: "Admin handoffs", detail: "Simple work stalls between tools, people, and departments." },
    ],
    conclusion:
      "AI should remove friction from work already happening — and create measurable time for higher-value decisions.",
  },
  services: {
    eyebrow: "What we implement",
    title: "Start with the workflow. Add only the technology it needs.",
    description:
      "Every engagement is grounded in your current tools, team habits, and business constraints. No oversized platform and no automation for its own sake.",
    items: [
      {
        title: "AI Business Audit",
        description: "Find where AI can save time, improve consistency, and reduce operational friction.",
        deliverables: ["Workflow review", "AI opportunity map", "Tool recommendations", "Quick wins report"],
      },
      {
        title: "AI Starter Setup",
        description: "Give your team a reliable, documented way to use AI in daily work.",
        deliverables: ["ChatGPT / Claude setup", "Custom AI assistants", "Prompt libraries", "Staff training", "SOP documentation"],
      },
      {
        title: "Customer Support AI System",
        description: "Help support teams answer faster without losing judgment, context, or escalation control.",
        deliverables: ["FAQ automation", "Reply assistants", "Knowledge base structure", "Ticket tagging", "Escalation workflows"],
      },
      {
        title: "AI Automation & Integration",
        description: "Connect repetitive work across the tools your business already uses.",
        deliverables: ["Lead qualification", "Email automation", "CRM updates", "Reporting workflows", "Make / Zapier / n8n / API integrations"],
      },
    ],
  },
  whyUs: {
    eyebrow: "Why work with us",
    title: "Business expertise meets technical execution.",
    description:
      "Successful AI adoption requires more than software. It requires understanding how businesses actually operate. Our combined background lets us design solutions that are technically sound and practical for real teams.",
    bridge: "One team. One workflow. From operational problem to working system.",
    roles: [
      {
        label: "Business side",
        title: "Operations & AI Implementation",
        experience:
          "8+ years across customer support, operations, logistics, management, SOPs, KPIs, reporting, and escalations.",
        skills: ["Team leadership", "Support operations", "Process optimization", "Workflow design", "AI adoption & training"],
      },
      {
        label: "Technical side",
        title: "Software Engineering & Automation",
        experience:
          "Professional software engineering focused on dependable integrations, custom tools, automation systems, and product development.",
        skills: ["Software development", "AI integrations", "Custom tools", "Automation systems", "Technical architecture"],
      },
    ],
  },
  process: {
    eyebrow: "How the work moves",
    title: "A clear route from bottleneck to working system.",
    description:
      "We keep the process visible, test assumptions early, and train the people who will use what we build.",
    steps: [
      { title: "Audit", description: "Review tools, tasks, bottlenecks, and team needs.", output: "Output: priority brief" },
      { title: "Map workflows", description: "Define the current flow and the better future flow.", output: "Output: system map" },
      { title: "Build AI systems", description: "Configure, integrate, test, and document the solution.", output: "Output: working implementation" },
      { title: "Train and improve", description: "Roll out with the team, measure use, and refine.", output: "Output: adoption + next steps" },
    ],
  },
  pricing: {
    eyebrow: "Clear starting points",
    title: "Choose the level of implementation your business needs.",
    description:
      "Fixed starting packages keep scope understandable. We confirm requirements before work begins.",
    items: [
      {
        name: "Launch",
        price: "€999",
        description: "For businesses starting with AI.",
        features: ["AI business audit", "Priority roadmap", "Tool recommendations", "Team training session"],
      },
      {
        name: "Build",
        price: "€2,499",
        description: "For teams ready to implement.",
        badge: "Recommended",
        features: ["Custom AI assistants", "Prompt library", "SOP documentation", "Core workflow setup", "Team handover"],
      },
      {
        name: "Automate",
        price: "from €4,999",
        description: "For businesses that need connected systems.",
        features: ["Automation flows", "API integrations", "Dashboards", "Testing and documentation", "Ongoing launch support"],
      },
      {
        name: "AI Advisor",
        price: "from €499/month",
        description: "For ongoing implementation guidance.",
        features: ["Monthly optimization", "New workflow planning", "Team support", "Tool updates", "Priority guidance"],
      },
    ],
    note: "Need a different scope? We will recommend the smallest engagement that can produce a useful result.",
  },
  faq: {
    eyebrow: "Common questions",
    title: "Practical answers before we start.",
    items: [
      {
        question: "Do I need technical knowledge?",
        answer:
          "No. We translate the technical choices into clear business decisions, handle setup, and document the workflow so your team can use it confidently.",
      },
      {
        question: "Can this work for a small local business?",
        answer:
          "Yes. Small businesses often have the clearest opportunities because repetitive admin, enquiries, scheduling, and reporting are easy to identify. We keep the setup proportional to your size.",
      },
      {
        question: "Do you replace employees?",
        answer:
          "No. Our focus is removing repetitive steps and improving access to information. People remain responsible for judgment, relationships, exceptions, and important decisions.",
      },
      {
        question: "What tools do you use?",
        answer:
          "We select tools around the workflow. Common options include ChatGPT, Claude, Make, Zapier, n8n, OpenAI APIs, existing CRMs, help desks, and custom software when off-the-shelf tools are not enough.",
      },
      {
        question: "How fast can we start?",
        answer:
          "An initial audit can usually begin within one to two weeks. Implementation timing depends on scope, data access, and the number of tools involved.",
      },
    ],
  },
  cta: {
    eyebrow: "A practical first step",
    title: "Start with an AI audit and find out where your business is wasting time.",
    description:
      "Tell us which work feels repetitive, slow, or difficult to scale. We will help you identify the most useful place to begin.",
    response: "Email us directly. We usually reply within two business days.",
  },
  footer: {
    description: "Practical AI implementation and automation for small businesses.",
    navigation: "Navigation",
    contact: "Contact",
    rights: "All rights reserved.",
  },
};

const srLatn: Dictionary = {
  meta: {
    title: "elkapz labs | Praktična AI implementacija i automatizacija",
    description:
      "Praktični AI sistemi za mala preduzeća. Unapređujemo korisničku podršku, operacije, administraciju i izveštavanje pouzdanom automatizacijom i prilagođenim softverom.",
  },
  common: {
    brandLabel: "AI implementacija i automatizacija",
    email: "elkapzlabs@gmail.com",
    location: "Beograd, Srbija · Radimo sa klijentima širom Evrope",
    openMenu: "Otvori navigaciju",
    closeMenu: "Zatvori navigaciju",
    language: "Jezik",
    bookAudit: "Zakažite AI audit",
    seeServices: "Pogledajte usluge",
    getStarted: "Započnimo razgovor",
    selectedLanguage: "Izabrani jezik",
  },
  nav: {
    services: "Usluge",
    whyUs: "Zašto mi",
    process: "Proces",
    pricing: "Cene",
    faq: "Pitanja",
  },
  hero: {
    eyebrow: "AI implementacija za mala preduzeća",
    title: "Praktični AI sistemi za firme zatrpane ponavljajućim poslovima.",
    description:
      "Pomažemo malim preduzećima da uvedu AI u korisničku podršku, operacije, administraciju i sadržaj — bez fraza, suvišnih alata i skupih konsultantskih slojeva.",
    proof: [
      "Bračni tim za kompletnu realizaciju",
      "Operacije + softversko inženjerstvo",
      "Iz Beograda, za klijente širom Evrope",
    ],
    workflow: {
      label: "Bolji tok rada",
      input: "Ponavljajući poslovi",
      inputItems: ["Kopiranje odgovora", "Ručni izveštaji", "CRM izmene"],
      system: "AI sistem podrške",
      systemItems: ["Znanje", "Pravila", "Automatizacija"],
      output: "Rezultat tima",
      outputItems: ["Brži odgovori", "Uredni podaci", "Više fokusa"],
      status: "Tok rada mapiran",
    },
  },
  problem: {
    eyebrow: "Operativno opterećenje",
    title: "Vašem timu ne nedostaje trud. Sistem stvara dodatni posao.",
    description:
      "Male neefikasnosti se sabiraju: isti odgovor, ručna izmena, izveštaj koji se pravi iznova svake nedelje. Sposobni ljudi na kraju premeštaju informacije umesto da unapređuju posao.",
    items: [
      { title: "Kopiranje sadržaja", detail: "Isti tekst se iznova sastavlja u mejlovima, četovima i dokumentima." },
      { title: "Spori odgovori", detail: "Klijenti čekaju dok tim traži tačnu informaciju." },
      { title: "Neuredne procedure", detail: "Važno znanje ostaje u starim fajlovima i glavama pojedinaca." },
      { title: "Ista pitanja", detail: "Tim prekida rad zbog informacija koje već postoje." },
      { title: "Ručno izveštavanje", detail: "Sati odlaze na prikupljanje, čišćenje i formatiranje podataka." },
      { title: "Administrativna predaja", detail: "Jednostavan posao zastaje između alata, ljudi i odeljenja." },
    ],
    conclusion:
      "AI treba da ukloni trenje iz postojećeg rada — i oslobodi merljivo vreme za važnije odluke.",
  },
  services: {
    eyebrow: "Šta implementiramo",
    title: "Počinjemo od toka rada. Dodajemo samo tehnologiju koja mu je potrebna.",
    description:
      "Svaki projekat zasnivamo na vašim alatima, navikama tima i poslovnim ograničenjima. Bez prevelikih platformi i automatizacije bez svrhe.",
    items: [
      {
        title: "AI audit poslovanja",
        description: "Otkrivamo gde AI može da uštedi vreme, uvede doslednost i smanji operativno opterećenje.",
        deliverables: ["Analiza tokova rada", "Mapa AI prilika", "Preporuka alata", "Izveštaj brzih poboljšanja"],
      },
      {
        title: "Početno AI postavljanje",
        description: "Dajemo timu pouzdan i dokumentovan način da koristi AI u svakodnevnom radu.",
        deliverables: ["ChatGPT / Claude postavljanje", "Prilagođeni AI asistenti", "Biblioteka promptova", "Obuka zaposlenih", "SOP dokumentacija"],
      },
      {
        title: "AI sistem za korisničku podršku",
        description: "Pomažemo timu da odgovara brže bez gubitka procene, konteksta i kontrole eskalacija.",
        deliverables: ["Automatizacija čestih pitanja", "Asistenti za odgovore", "Struktura baze znanja", "Označavanje tiketa", "Tokovi eskalacije"],
      },
      {
        title: "AI automatizacija i integracije",
        description: "Povezujemo ponavljajuće poslove kroz alate koje vaša firma već koristi.",
        deliverables: ["Kvalifikacija potencijalnih klijenata", "Automatizacija mejla", "CRM izmene", "Tokovi izveštavanja", "Make / Zapier / n8n / API integracije"],
      },
    ],
  },
  whyUs: {
    eyebrow: "Zašto raditi sa nama",
    title: "Poslovno iskustvo susreće tehničku realizaciju.",
    description:
      "Uspešno uvođenje AI zahteva više od softvera. Potrebno je razumeti kako posao stvarno funkcioniše. Naše zajedničko iskustvo omogućava rešenja koja su tehnički pouzdana i praktična za stvarne timove.",
    bridge: "Jedan tim. Jedan tok rada. Od operativnog problema do sistema koji radi.",
    roles: [
      {
        label: "Poslovna strana",
        title: "Operacije i AI implementacija",
        experience:
          "8+ godina iskustva u korisničkoj podršci, operacijama, logistici, upravljanju, procedurama, KPI pokazateljima, izveštavanju i eskalacijama.",
        skills: ["Vođenje timova", "Operacije podrške", "Optimizacija procesa", "Dizajn tokova rada", "AI usvajanje i obuka"],
      },
      {
        label: "Tehnička strana",
        title: "Softversko inženjerstvo i automatizacija",
        experience:
          "Profesionalno softversko inženjerstvo usmereno na pouzdane integracije, prilagođene alate, automatizaciju i razvoj proizvoda.",
        skills: ["Razvoj softvera", "AI integracije", "Prilagođeni alati", "Sistemi automatizacije", "Tehnička arhitektura"],
      },
    ],
  },
  process: {
    eyebrow: "Kako radimo",
    title: "Jasan put od uskog grla do sistema koji radi.",
    description:
      "Proces držimo vidljivim, rano proveravamo pretpostavke i obučavamo ljude koji će koristiti ono što izgradimo.",
    steps: [
      { title: "Audit", description: "Analiziramo alate, zadatke, uska grla i potrebe tima.", output: "Rezultat: lista prioriteta" },
      { title: "Mapiranje tokova", description: "Definišemo sadašnji i bolji budući tok rada.", output: "Rezultat: mapa sistema" },
      { title: "Izgradnja AI sistema", description: "Postavljamo, povezujemo, testiramo i dokumentujemo rešenje.", output: "Rezultat: funkcionalna implementacija" },
      { title: "Obuka i unapređenje", description: "Uvlačimo tim u rad, merimo korišćenje i dorađujemo.", output: "Rezultat: usvajanje i sledeći koraci" },
    ],
  },
  pricing: {
    eyebrow: "Jasne početne opcije",
    title: "Izaberite nivo implementacije koji odgovara vašem poslovanju.",
    description:
      "Početni paketi sa fiksnom cenom čine obim jasnim. Zahteve potvrđujemo pre početka rada.",
    items: [
      {
        name: "Launch",
        price: "€999",
        description: "Za firme koje počinju sa AI.",
        features: ["AI audit poslovanja", "Mapa prioriteta", "Preporuka alata", "Obuka tima"],
      },
      {
        name: "Build",
        price: "€2,499",
        description: "Za timove spremne za implementaciju.",
        badge: "Preporučeno",
        features: ["Prilagođeni AI asistenti", "Biblioteka promptova", "SOP dokumentacija", "Postavljanje glavnog toka rada", "Predaja timu"],
      },
      {
        name: "Automate",
        price: "od €4,999",
        description: "Za firme kojima trebaju povezani sistemi.",
        features: ["Tokovi automatizacije", "API integracije", "Kontrolne table", "Testiranje i dokumentacija", "Podrška pri puštanju"],
      },
      {
        name: "AI Advisor",
        price: "od €499/mesečno",
        description: "Za kontinuiranu podršku pri implementaciji.",
        features: ["Mesečna optimizacija", "Planiranje novih tokova", "Podrška timu", "Ažuriranje alata", "Prioritetne smernice"],
      },
    ],
    note: "Potreban vam je drugačiji obim? Predložićemo najmanji angažman koji može doneti koristan rezultat.",
  },
  faq: {
    eyebrow: "Česta pitanja",
    title: "Praktični odgovori pre početka.",
    items: [
      {
        question: "Da li mi je potrebno tehničko znanje?",
        answer:
          "Ne. Tehničke izbore pretvaramo u jasne poslovne odluke, radimo postavljanje i dokumentujemo tok rada kako bi tim mogao sigurno da ga koristi.",
      },
      {
        question: "Da li ovo može da radi za malu lokalnu firmu?",
        answer:
          "Da. Male firme često imaju najjasnije prilike jer se ponavljajuća administracija, upiti, zakazivanje i izveštavanje lako prepoznaju. Rešenje prilagođavamo vašoj veličini.",
      },
      {
        question: "Da li zamenjujete zaposlene?",
        answer:
          "Ne. Fokus je na uklanjanju ponavljajućih koraka i boljem pristupu informacijama. Ljudi ostaju odgovorni za procenu, odnose, izuzetke i važne odluke.",
      },
      {
        question: "Koje alate koristite?",
        answer:
          "Alate biramo prema toku rada. Često koristimo ChatGPT, Claude, Make, Zapier, n8n, OpenAI API, postojeće CRM i help desk sisteme, kao i prilagođeni softver kada gotovi alati nisu dovoljni.",
      },
      {
        question: "Koliko brzo možemo da počnemo?",
        answer:
          "Početni audit obično može da počne u roku od jedne do dve nedelje. Vreme implementacije zavisi od obima, pristupa podacima i broja uključenih alata.",
      },
    ],
  },
  cta: {
    eyebrow: "Praktičan prvi korak",
    title: "Počnite AI auditom i saznajte gde vaše poslovanje gubi vreme.",
    description:
      "Recite nam koji poslovi deluju ponavljajuće, sporo ili teško za skaliranje. Pomoći ćemo vam da pronađete najkorisnije mesto za početak.",
    response: "Pišite nam direktno. Obično odgovaramo u roku od dva radna dana.",
  },
  footer: {
    description: "Praktična AI implementacija i automatizacija za mala preduzeća.",
    navigation: "Navigacija",
    contact: "Kontakt",
    rights: "Sva prava zadržana.",
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  "sr-Latn": srLatn,
};
