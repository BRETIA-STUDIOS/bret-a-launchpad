/**
 * Public, site-facing content exposed through the MCP server.
 * Mirrors what any visitor already reads on bretia.studio.
 */

export type Service = {
  id: string;
  name: string;
  summary: string;
  details: string;
  closing: string;
  path: string;
};

export const SERVICES: Service[] = [
  {
    id: "creazione-siti-web",
    name: "Creazione di siti web",
    summary: "Nuovi siti costruiti da zero intorno all'attività del cliente.",
    details:
      "Partiamo da zero e costruiamo una presenza digitale pensata intorno alla tua attività. Ci confrontiamo con il cliente, ne comprendiamo esigenze e obiettivi e sviluppiamo un sito moderno, responsive e personalizzato, con la possibilità di integrare funzionalità come prenotazioni, pagamenti, moduli di contatto e altri strumenti utili.",
    closing:
      "Ogni progetto viene costruito sulle esigenze dell'attività, non adattato a un modello preconfezionato.",
    path: "/servizi",
  },
  {
    id: "restyling",
    name: "Restyling e rivisitazione",
    summary: "Modernizziamo un sito esistente senza buttare via ciò che funziona.",
    details:
      "Un sito vecchio non deve necessariamente essere abbandonato. Analizziamo ciò che già funziona, ascoltiamo le esigenze del cliente e trasformiamo la presenza digitale esistente in un'esperienza più moderna, intuitiva e piacevole da utilizzare.",
    closing: "Conserviamo ciò che ha valore. Miglioriamo tutto ciò che può funzionare meglio.",
    path: "/servizi",
  },
  {
    id: "manutenzione",
    name: "Manutenzione e assistenza",
    summary:
      "Assistenza dopo la pubblicazione: 30 giorni inclusi, poi manutenzione mensile facoltativa.",
    details:
      "Dopo la pubblicazione, un sito può avere bisogno di aggiornamenti e interventi nel tempo. Ogni sito realizzato da BRETÌA include 30 giorni di manutenzione ordinaria gratuita dalla pubblicazione. Successivamente è possibile scegliere un servizio di manutenzione mensile, con diversi livelli di assistenza in base alle necessità dell'attività.",
    closing:
      "Il sito si acquista una sola volta. La manutenzione continuativa, dopo i primi 30 giorni, resta facoltativa.",
    path: "/servizi",
  },
  {
    id: "rebranding",
    name: "Rebranding",
    summary: "Nuova identità visiva: logo, materiali coordinati e presenza online.",
    details:
      "Un'attività può avere una storia importante e avere comunque bisogno di una nuova identità digitale. Il percorso può comprendere revisione o nuova progettazione del logo, identità visiva, materiali coordinati, elementi grafici per la comunicazione, supporto alla presenza sui social e indicazioni strategiche sulla comunicazione digitale.",
    closing: "Dare nuova vita a un'attività che ha già una storia, senza cancellarne l'identità.",
    path: "/servizi",
  },
];

export type MethodStage = { id: string; name: string; summary: string; details: string };

export const METHOD: MethodStage[] = [
  {
    id: "analizziamo",
    name: "Analizziamo",
    summary: "Capiamo l'attività, gli obiettivi e le persone da raggiungere.",
    details:
      "Studiamo l'attività, il pubblico e gli obiettivi prima di prendere qualsiasi decisione.",
  },
  {
    id: "progettiamo",
    name: "Progettiamo",
    summary: "Definiamo struttura, contenuti e direzione visiva.",
    details:
      "Trasformiamo le idee in una struttura chiara, funzionale e coerente con l'identità dell'attività.",
  },
  {
    id: "sviluppiamo",
    name: "Sviluppiamo",
    summary: "Costruiamo un sito veloce, responsive e curato nel dettaglio.",
    details:
      "Diamo forma al progetto curando esperienza, responsive design, performance e dettagli.",
  },
  {
    id: "lanciamo",
    name: "Lanciamo",
    summary: "Pubblichiamo, verifichiamo e accompagniamo l'attività online.",
    details:
      "Mettiamo il progetto online, verifichiamo che tutto funzioni e lasciamo una base pronta per evolvere.",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  kind: "concept";
  description: string;
  path: string;
};

export const PROJECTS: Project[] = [
  {
    id: "osteria-nova",
    title: "Osteria Nòva",
    category: "Restaurant · Web Design · UI/UX · Branding",
    kind: "concept",
    description:
      "Concept completo per un'osteria contemporanea: identità visiva, landing page immersiva con menu, cucina, cantina e prenotazione online. Progetto dimostrativo firmato BRETÌA, navigabile nel portfolio.",
    path: "/portfolio/osteria-nova",
  },
  {
    id: "concept-project-2",
    title: "Concept Project",
    category: "Web Design · UI/UX",
    kind: "concept",
    description: "Concept BRETÌA in preparazione. Nessun cliente reale associato.",
    path: "/portfolio",
  },
  {
    id: "concept-project-3",
    title: "Concept Project",
    category: "Branding · Web Design",
    kind: "concept",
    description: "Concept BRETÌA in preparazione. Nessun cliente reale associato.",
    path: "/portfolio",
  },
];

export const STUDIO = {
  name: "BRETÌA Web Studio",
  tagline: "Professionalità digitale, alla portata di tutti.",
  mission:
    "Una presenza digitale professionale non dovrebbe essere un lusso. BRETÌA progetta siti web moderni, professionali e accessibili per piccole e medie attività.",
  positioning:
    "Studio indipendente e agile: struttura leggera, tempi rapidi e nessun compromesso sulla qualità del progetto.",
  location: "Italia — lavoriamo da remoto",
  email: "hello@bretia.studio",
  language: "it",
  pages: [
    { path: "/", title: "Home" },
    { path: "/servizi", title: "Servizi" },
    { path: "/portfolio", title: "Portfolio" },
    { path: "/metodo", title: "Metodo" },
    { path: "/chi-siamo", title: "Chi siamo" },
    { path: "/contatti", title: "Contatti" },
  ],
};
