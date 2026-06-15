export type Project = {
  slug: string;
  timecode: string;
  title: string;
  client: string;
  agency: string;
  award?: string;
  hue: number;
  year?: string;
  credits?: string[];
  hasFilm?: boolean;
  featured?: boolean;
  overview: string;
  brief: string;
  idea: string;
  result: string;
  video?: string;
};

export const projects: Project[] = [
  {
    slug: "adidas-inevitable",
    featured: true,
    timecode: "00:00:01:00",
    title: "Adidas Inevitable",
    client: "Adidas LATAM / Club América",
    agency: "Independent",
    hue: 25,
    year: "2026",
    credits: [
      "Direction / Editing / Creative Leadership: Edu Menezes",
      "Script: Pedro Rosas",
      "Motion Design: Caio Gandolfi",
      "Soundtrack: Bumblebeat",
      "Adidas LATAM Marketing: Felipe Savone, Alejandro Barrera",
    ],
    overview: "Adidas and Club América turned a jersey launch into a street ritual across Mexico City.",
    brief:
      "Launch Club América's new Adidas kit in a city where old jerseys never really get thrown away — they get traded.",
    idea:
      "Built around Mexico City's \"fierro viejo\" exchange culture, the film turns the jersey swap into a street ritual, tying football devotion, nostalgia and urban life into the launch itself.",
    result:
      "Developed directly with Adidas LATAM's marketing team, the film became the centerpiece of the Club América kit launch across Mexico City.",
    video: "adidas-inevitable.mp4",
    hasFilm: true,
  },
  {
    slug: "one-second-ads",
    featured: true,
    timecode: "00:01:14:08",
    title: "One Second Ads",
    client: "Budweiser / AB InBev",
    agency: "Africa Creative DDB",
    award: "Cannes GP + Gold",
    hue: 45,
    year: "2025",
    credits: [
      "Creative Leadership: Sergio Gordilho, Nicholas Bergantin, Rodrigo Barbosa",
      "Creative Direction: Hélio Maffia, Yllo Pedra",
      "Creative: Maicon Gomes, Guilherme Portugal, Lucas Alcorta",
      "Editing: Fernando Ávila",
      "Motion Design: Edu Menezes",
    ],
    overview: "Budweiser used the first second of iconic songs to turn cultural memory into media.",
    brief:
      "Brazilian broadcast law lets a one-second ad run uncut. Budweiser asked what a brand could do with exactly that — nothing more.",
    idea:
      "Strip entire campaigns down to a single second — just the opening note of an iconic song, repeated until recognition itself becomes the message and the format becomes unmistakably Budweiser's.",
    result:
      "Cannes Lions 2025 Grand Prix and Gold in Audio & Radio, plus two Silver and two Bronze Lions, a Gold and a Bronze at The One Show, a Silver at Clio and a D&AD shortlist — among the most awarded media ideas of the year.",
    video: "one-second-ads.mp4",
    hasFilm: true,
  },
  {
    slug: "autism-journey",
    featured: true,
    timecode: "00:02:30:12",
    title: "The Autism Journey",
    client: "Vivo / Telefônica Brasil",
    agency: "Africa Creative DDB",
    award: "Cannes Bronze",
    hue: 200,
    year: "2023",
    credits: [
      "Creative Leadership: Sergio Gordilho, Nicholas Bergantin, Gustavo Victorino",
      "Creative Direction / Creative: Pedro Galdi, Pedro Rosas, Felipe Luchi",
      "Direction / Production: Rafael Damy / Santería",
      "Motion Design: Edu Menezes",
      "Sound: Satélite Áudio",
      "Autism Expertise: Francisco Baptista Assumpção Junior",
    ],
    overview: "Vivo used AI to help families communicate with autistic individuals through personalized visual cards.",
    brief:
      "Most communication tools for autism are built for caregivers. The Autism Journey was built to translate a child's own sensory world back to the people around them.",
    idea:
      "An AI-driven platform generates personalized visual communication cards, adapted to each person's reality, interests and daily routines — turning overstimulation into a shared language families can actually use.",
    result:
      "Cannes Lions 2023 Bronze in Health & Wellness, a D&AD 2024 Bronze Pencil, and Merit recognitions at The One Show for Design and for Experiential & Immersive.",
    video: "the-autism-journey.mp4",
    hasFilm: true,
  },
  {
    slug: "timeless-show",
    featured: true,
    timecode: "00:03:45:20",
    title: "The Timeless Show",
    client: "Itaú",
    agency: "Africa Creative DDB",
    award: "Cannes Bronze",
    hue: 280,
    year: "2024",
    credits: [
      "Creative Leadership: Sergio Gordilho, Alexandre Peralta",
      "Creative / Co-Creation: Madonna, Dudu Barcelos, Renato Jardim",
      "Creative: Cortez Pereira, Diego Viana, Caio Verçosa",
      "Special Projects: Lica de Souza",
      "Motion Design: Edu Menezes",
    ],
    overview: "Itaú connected its centennial to Madonna's cultural legacy and a historic moment in Rio.",
    brief:
      "Itaú turned 100 — and instead of looking backward, the brand built its centennial moment around an artist who has spent four decades reinventing herself.",
    idea:
      "Decades of performances, edited into a single continuous show where past and present artists share the same stage — linking Itaú's \"Feito de Futuro\" platform to Madonna's place in Brazilian culture.",
    result:
      "Cannes Lions 2024 Bronze in PR and a Silver at MMA Smarties Brasil, expanding from a film into a cultural moment for Brazil's largest cultural patron.",
    video: "the-timeless-show.mp4",
    hasFilm: true,
  },
  {
    slug: "faith-decoded",
    timecode: "00:05:02:04",
    title: "Faith Decoded",
    client: "Estadão Blue Studio",
    agency: "Africa Creative DDB",
    hue: 320,
    year: "2026",
    credits: [
      "Creative Leadership: Sergio Gordilho",
      "Design / Art Direction: Hugo Aranha, Cleber Pereira",
      "Creative Idea / Content: Patricia Colombo",
      "Creative Team: Paulo Aguiar, Adriano Nuevo, Guilherme Bovo",
      "Project Management: Shari Saber",
      "Case Editing: Fernando Faria Freitas, José Ernesto Silva Neto",
      "Motion Design: Edu Menezes / Grupo Caipe",
      "Photography: Marcelo Martins",
      "Sound: Denis Melito",
      "Client Approval: Monalisa Sorio, Regina Fogo, Luis Fernando Bovo",
    ],
    overview: "Estadão Blue Studio investigates synthetic religious influence and AI transparency.",
    brief:
      "A new kind of digital manipulation is spreading: AI-generated spiritual influencers posing as real religious voices.",
    idea:
      "Faith Decoded combines AI analysis with human review to detect synthetic religious language, imagery and behavior — reframing the technology that creates fake faith leaders as the tool that exposes them.",
    result:
      "A data journalism piece for Estadão Blue Studio that traded academic tone for cinematic motion design, pairing editorial typography with rhythm-led data visualization.",
    video: "faith-decoded.mp4",
    hasFilm: true,
  },
  {
    slug: "history-blocks",
    featured: true,
    timecode: "00:06:18:16",
    title: "History Blocks",
    client: "UNESCO",
    agency: "Africa Creative DDB",
    award: "Cannes Bronze",
    hue: 150,
    year: "2019",
    credits: [
      "Creative Leadership: Sergio Gordilho, Sophie Schonburg",
      "Creative: Daniel Ogawa, Raphael Vandystadt, Juliana Leite, Felipe Duarte",
      "Art Direction: Rick Garcia, Adriana Barreto",
      "Special Projects: Monique Lopes Lima",
      "Motion Design: Edu Menezes",
    ],
    overview: "UNESCO turned Minecraft into a preservation tool for endangered cultural heritage.",
    brief:
      "When a historical landmark is destroyed, the memory of it tends to go with it. History Blocks asked whether a generation raised on Minecraft could help keep that memory alive.",
    idea:
      "Endangered and destroyed cultural landmarks rebuilt inside Minecraft, block by block — turning a game younger audiences already live in into a tool for cultural preservation.",
    result:
      "Cannes Lions Bronze, a D&AD Yellow Pencil and Wood Pencil, a Silver Pencil at The One Show, and multiple Gold, Silver and Bronze awards at El Ojo — plus adoption as an educational resource in Brazilian schools.",
    video: "history-blocks.mp4",
    hasFilm: true,
  },
  {
    slug: "amazon-desert-rally",
    timecode: "00:07:33:09",
    title: "Amazon Desert Rally",
    client: "Vivo / Telefônica Brasil",
    agency: "Africa Creative DDB",
    award: "Effie Gold · El Ojo",
    hue: 95,
    year: "2024",
    credits: [
      "Motion Design: Edu Menezes",
      "Script: Pedro Rosas",
      "Africa Team: Laís",
      "GUT Team: Pedro Galdi",
      "Production / Graphic Materials: Black Madre",
      "Creative Direction / Illustration: André Maciel",
      "Executive Direction: Tina Castro",
      "Planning: Leticia Alves, Beatriz Seilhe Perrote",
      "Woodcut: Rafael Kenji, Pedro Cervini, Tiago Costa",
    ],
    overview: "Vivo imagined a rally where a river should exist to expose drought in the Amazon.",
    brief: "Amazon Desert Rally imagined a race where a river used to be.",
    idea:
      "Built around the dry bed of the Rio Branco in Roraima, the film stages a fictional rally through what should be water — with the line \"Don't sponsor this rally\" connecting illegal deforestation, climate crisis and disappearing rivers into one image.",
    result:
      "Effie Awards Latam 2024 Gold, plus Silver and Bronze at El Ojo de Iberoamérica and a shortlist at Clube de Criação.",
    video: "amazon-desert-rally.mp4",
    hasFilm: true,
  },
  {
    slug: "hermeto-made-of-music",
    timecode: "00:08:50:01",
    title: "Hermeto — Made Of Music",
    client: "Budweiser / AB InBev",
    agency: "Africa Creative DDB",
    award: "Cannes Silver",
    hue: 10,
    year: "2018",
    credits: [
      "Motion Design: Edu Menezes",
      "Artist: Hermeto Pascoal",
      "Digital Partner: Webcore",
    ],
    overview: "Budweiser translated Hermeto Pascoal's sound universe into interactive visual compositions.",
    brief: "Hermeto Pascoal turns kettles, saws and bottles into instruments. Made Of Music asked what his sound would look like.",
    idea:
      "Every cut, transition and texture in the film is sourced from Hermeto's own sound world — translating his music into interactive visual compositions for Budweiser.",
    result:
      "Cannes Lions 2018 Silver in Design, a Bronze Pencil and a Merit Award at The One Show 2019, and seven awards at El Ojo.",
    video: "hermeto-made-of-music.mp4",
    hasFilm: true,
  },
  {
    slug: "go-equal",
    featured: true,
    timecode: "00:10:05:18",
    title: "#GoEqual",
    client: "Marta / Go Equal Movement",
    agency: "Africa Creative DDB",
    award: "Cannes Gold",
    hue: 330,
    year: "2019",
    credits: [
      "Creative Leadership: Sergio Gordilho, Matias Menendez, Rodrigo Marangoni",
      "Creative: Chico Medeiros, Mateus Oliveira",
      "Social Media: Sabrina Teixeira, Dayana Teixeira",
      "Motion Design: Edu Menezes",
      "Project: Go Equal Movement / Marta",
    ],
    overview: "Marta turned her boots into a global statement for equality in sport.",
    brief: "Marta is the most decorated player, male or female, in football history. #GoEqual asked why her pay still didn't reflect that.",
    idea:
      "Highlights from men's football, recut with Marta's real stats and commentary — same plays, same numbers, different name. When Marta scored at the 2019 Women's World Cup and pointed to the spot, the gesture closed the loop between film and reality.",
    result: "Cannes Lions 2021 Gold and Silver, plus a Merit at The One Show 2020 — and a global conversation about equal pay in sport.",
    video: "go-equal.mp4",
    hasFilm: true,
  },
  {
    slug: "real-machado",
    timecode: "00:11:20:05",
    title: "The Real Machado",
    client: "Universidade Zumbi dos Palmares",
    agency: "Grey Brasil",
    award: "Cannes Bronze",
    hue: 60,
    year: "2019",
    credits: [
      "Creative Leadership: Adriano Matos, Rodrigo Jatene, Bruno Brux",
      "Creative Direction: Marcelo Bruzzesi, Rafael Gonzaga",
      "Creative: Gustavo Zordan, Julia Mota",
      "Motion Graphics: Edu Menezes",
      "Production: Lemonade / Diego Biazzon",
      "Post / Sound: PixelLove / Satelite Audio",
    ],
    overview: "A portrait correction became a conversation about racism, memory and representation.",
    brief: "For over a century, the most reproduced portrait of Machado de Assis — Brazil's greatest writer — quietly lightened his skin.",
    idea:
      "AI and archival research restored Machado's true Black features in his most circulated portrait, then animated the reveal across his own words.",
    result: "Cannes Lions 2019 Bronze in Design, and a correction that became a national conversation about racism, memory and representation in Brazilian literature.",
    video: "real-machado.mp4",
    hasFilm: true,
  },
  {
    slug: "stolen-art-gallery",
    timecode: "00:12:35:11",
    title: "The Stolen Art Gallery",
    client: "Compass UOL",
    agency: "GUT São Paulo",
    award: "Clube de Criação · 2 Bronze",
    hue: 260,
    year: "2022",
    credits: [
      "Creative: Bruno Brux, Murilo Melo, Rainor Marinho, Murilo Santos",
      "Creative / Art Direction: Pedro Galdi",
      "Copywriting / Script: Giulio Beloto, Pedro Rosas",
      "Motion Design: Edu Menezes",
      "Production: Lemonade Filmes / Manuela Berlanga",
      "Post / Sound: Atomo VFX / Carbono Sound Lab",
    ],
    overview: "Compass UOL rebuilt stolen masterpieces in a digital gallery, turning cultural absence into an exhibition.",
    brief: "Thousands of artworks stolen from museums never come back. The Stolen Art Gallery gave the public a way to see them again anyway.",
    idea:
      "Missing masterpieces recreated in a digital gallery for Compass UOL — turning the absence of the originals into the exhibition itself, and cultural loss into something people can finally look at.",
    result: "Clube de Criação Bronze in both Digital and Use of Technology.",
    video: "stolen-art-gallery.mp4",
    hasFilm: true,
  },
  {
    slug: "inequality-balls",
    timecode: "00:13:50:17",
    title: "Inequality Balls",
    client: "espnW / ESPN + Penalty",
    agency: "Africa Creative DDB",
    award: "Cannes Silver + Bronze",
    hue: 15,
    year: "2018",
    credits: [
      "Creative Direction: Sergio Gordilho",
      "Creative: Guzera Alves, Bill Queiroga",
      "Direction / Photography: Nixon Freire",
      "Editing: Matheus Razera Tibira, Cadu Silveira",
      "Motion Graphics: Edu Menezes",
      "Production: PBA",
      "Sound: Quiet City Music + Sound",
    ],
    overview: "espnW resized balls to match real gender pay gaps in sport — inequality you can hold in your hands.",
    brief: "The gap between men's and women's sport shows up in budgets and broadcast minutes — numbers most people scroll past.",
    idea:
      "Resize the footballs and basketballs themselves to match the real disparities in pay, investment and airtime, and the inequality becomes something you can hold in your hands.",
    result: "Cannes Lions 2018 Silver and Bronze in Design, plus a Clio Sports Grand Award for espnW.",
    video: "inequality-balls.mp4",
    hasFilm: true,
  },
  {
    slug: "my-game-my-name",
    timecode: "00:15:05:23",
    title: "#MyGameMyName",
    client: "Vivo / Telefônica Brasil",
    agency: "Africa Creative DDB",
    award: "Cannes Silver + Bronze",
    hue: 180,
    year: "2018",
    credits: [
      "Creative Direction: Sergio Gordilho, Sophie Schonburg, Marco Bezerra",
      "Creative: Linus Oura, Felipe Lermen",
      "Design: Matteus Faria",
      "Direction / Photography: Amadeo Canonico",
      "Editing: Felipe Tomé, Cadu Silveira",
      "Motion Design: Edu Menezes",
      "Sound: Antfood",
    ],
    overview: "Vivo sent male streamers live under female usernames — and filmed what happened next.",
    brief: "Ask a male gamer what online harassment is like for women, and most will guess. #MyGameMyName had them find out.",
    idea:
      "Male streamers and influencers played live under female usernames — the harassment that followed, unscripted, became the proof the campaign needed.",
    result: "Cannes Lions 2018 Silver in Glass: The Lion for Change, Bronze in PR, and finalist placements in Social & Influencer and Sustainable Development Goals.",
    video: "my-game-my-name.mp4",
    hasFilm: true,
  },
  {
    slug: "itau-rebranding",
    timecode: "00:16:20:02",
    title: "Itaú Rebranding",
    client: "Itaú Unibanco",
    agency: "Africa Creative DDB / Galeria",
    hue: 230,
    year: "2023",
    credits: [
      "Creative: Diego, Cortez Pereira, Renato Jardim",
      "Special Projects: Theo Etlin",
      "Editing: Mari Becker",
      "Motion Design: Edu Menezes",
    ],
    overview: "Itaú refined its century-old mark for the bank's hundredth year without losing a generation of trust.",
    brief: "A century-old logo carries a century of trust. Itaú needed to evolve it without spending any of that down.",
    idea:
      "The mark was rebuilt around the \"Feito de Futuro\" platform — proportions and motion refined so the identity reads as both legacy and forward motion, ready for the bank's hundredth year.",
    result: "The new identity now anchors Itaú's visual system across every touchpoint, heading into the bank's centennial.",
    video: "itau-rebranding.mp4",
    hasFilm: true,
  },
  {
    slug: "letters-from-simone",
    timecode: "00:17:35:08",
    title: "Letters From Simone",
    client: "Itaú",
    agency: "ATENAS.ag",
    award: "BEA World GP · AMPRO Gold",
    hue: 300,
    year: "2024",
    credits: [
      "Creative: Lucinha, Angerson Vieira, Caio Verçosa",
      "Editing: Fernando Freitas",
      "Special Projects: Lica de Souza",
      "Motion Design: Edu Menezes",
    ],
    overview: "Itaú built space around Simone's personal letters and recordings — restraint as structure.",
    brief: "An archive of personal letters and recordings doesn't need decoration — it needs space.",
    idea:
      "Text, image and motion design were paced around the voice in the recordings, holding back wherever the material could carry itself — restraint as the structure, not the absence of one.",
    result: "BEA World Experience Grand Prix, plus Silver in B2C Event and Press & PR, and AMPRO Globe Gold and Bronze for Itaú.",
    video: "letters-from-simone.mp4",
    hasFilm: true,
  },
  {
    slug: "fisherman-storytellers",
    timecode: "00:18:50:14",
    title: "Fisherman Storytellers",
    client: "Corona / AB InBev",
    agency: "Africa Creative DDB",
    award: "Cannes Silver",
    hue: 190,
    year: "2025",
    credits: [
      "Creative Leadership: Sergio Gordilho, Nicholas Bergantin",
      "Creative Direction: Lucas Menegotto, Raphaela Filippetto, Pedro Galdi, Pedro Rosas",
      "ACD / Art Direction: Lucas Andrade",
      "Motion Design: Edu Menezes",
      "Production Company: Black Madre",
      "Animation Direction: Maurício Fahd",
      "Live Action Direction: Eduardo Sá",
      "Audio: LOUD+ / Gustavo Garbato",
    ],
    overview: "Corona turned closed-season oral folklore from fishing communities into a multimedia storytelling format.",
    brief: "When fishing season closes, Brazilian fishing communities lose their main income — and their stories stay local.",
    idea:
      "Oral folklore from local fishermen, turned into a multimedia storytelling format for Corona — repositioning the closed season as cultural tourism instead of downtime.",
    result: "Cannes Lions 2025 Silver in both Audio & Radio and Brand Experience.",
    video: "fisherman-storytellers.mp4",
    hasFilm: true,
  },
  {
    slug: "sos-bees",
    timecode: "00:20:05:20",
    title: "SOS Bees",
    client: "AB InBev / Ambev",
    agency: "Africa Creative DDB",
    award: "Cannes Bronze",
    hue: 130,
    year: "2025",
    credits: [
      "Client: AB InBev / Ambev",
      "Agency: Africa Creative DDB",
      "Motion Design: Edu Menezes",
      "Sound / Audio Production: Satelite Audio",
      "Production / Communications Support: All Set Comunicação",
    ],
    overview: "Ambev rebuilt its B2B ordering app into a crisis hub in under 24 hours after the Rio Grande do Sul floods.",
    brief: "After the floods in Rio Grande do Sul, thousands of bar owners lost their inventory, their infrastructure, and in many cases their only source of income.",
    idea:
      "BEES, Ambev's B2B ordering app, was rebuilt in under 24 hours into a crisis hub — restocking, cleaning supplies, equipment replacement, repair services, cash vouchers, legal aid, insurance support and mental health helplines, all through the login bars already had.",
    result: "6,360 bars helped through the platform, 82% still operating a year later, 98.8% customer confidence in sales recovery, and Crisis Mode is now a permanent feature of the BEES app — alongside Cannes Lions 2025 Bronze in Sustainable Development Goals and a Creative B2B shortlist.",
    video: "sos-bees.mp4",
    hasFilm: true,
  },
  {
    slug: "spaten-night-fight",
    timecode: "00:21:20:01",
    title: "Spaten Night Fight",
    client: "Spaten / Ambev",
    agency: "GUT São Paulo",
    hue: 0,
    year: "2024",
    credits: ["Creative Direction: Lucas Adam", "Motion Design: Edu Menezes"],
    overview: "Spaten launched its fight platform around Anderson Silva and Chael Sonnen's final rematch in Brazil.",
    brief: "Spaten needed a fight platform of its own — and a story Brazil already cared about to launch it with.",
    idea:
      "Chael Sonnen returned to face Anderson Silva one more time, turning Spaten's debut into a live broadcast built around one of MMA's most recognizable rivalries in Brazil.",
    result: "A live branded event that put Spaten inside a symbolic final chapter for Anderson Silva's career in Brazil.",
    video: "spaten-night-fight.mp4",
    hasFilm: true,
  },
  {
    slug: "air-silva",
    timecode: "00:22:35:07",
    title: "Air Silva",
    client: "Silva 1932 / Volt Sport",
    agency: "Africa Creative DDB",
    hue: 35,
    year: "2026",
    credits: [
      "Creative Direction: Sergio Gordilho",
      "Creative: Diogo Dutra, Thiago Monteiro, Matheus Motta",
      "Art / Creative: Cleber Pereira",
      "Production / Projects: Lica de Souza, Giovanna Lima, Lais Vazquez Cattena",
      "Editing: Fernando Freitas",
      "Motion Design: Edu Menezes",
    ],
    overview: "Volt Sport built a jersey collection around Leonidas da Silva's bicycle kick and the year 1932.",
    brief: "Leonidas da Silva — the Black Diamond — was one of the first global icons of Brazilian football, decades before the jersey collections that now reference him.",
    idea:
      "The Silva 1932 collection is built around his bicycle kick and the year 1932, using his silhouette and legacy as the visual spine of the campaign for Volt Sport.",
    result: "A cultural tribute that turns a jersey collection into a piece of football history — connecting Leônidas's legacy to the aesthetics of the modern game.",
    video: "air-silva.mp4",
    hasFilm: true,
  },
  {
    slug: "mr-congressman",
    timecode: "00:23:50:13",
    title: "Mr. Congressman",
    client: "MTV Brasil",
    agency: "Africa Creative DDB",
    award: "El Ojo Bronze",
    hue: 110,
    year: "2018",
    credits: ["Motion Design: Edu Menezes"],
    overview: "MTV Brasil trained an AI on congressional data to build the average answer from Brazil's political class.",
    brief: "Brazil has 513 federal congressmen and, most of the time, no single answer from any of them. Mr. Congressman built one anyway.",
    idea:
      "An AI trained on interviews, articles, news reports and congressional sessions generated a single virtual character whose answers reflected the average position of Brazil's political class — built for MTV Brasil and aimed at young voters.",
    result: "El Ojo de Iberoamérica 2018 Bronze in Creative Data.",
    video: "mr-congressman.mp4",
    hasFilm: true,
  },
  {
    slug: "team-never-lost",
    timecode: "00:25:05:19",
    title: "The Team That Never Lost",
    client: "Corinthians",
    agency: "DM9DDB",
    hue: 170,
    year: "2018",
    credits: ["Motion Design: Edu Menezes"],
    overview: "Corinthians turned its unbeaten Down syndrome futsal team's record into a World Down Syndrome Day campaign.",
    brief: "JR/Corinthians is a futsal team that has never lost a game — and almost no one has heard of it.",
    idea:
      "For World Down Syndrome Day, the team's unbeaten record became the headline — reframing what \"winning\" means for a squad of athletes with Down syndrome, and putting their story ahead of the score.",
    result: "A campaign for Corinthians that shifted the conversation from disability to achievement, built entirely around a record that speaks for itself.",
    video: "team-never-lost.mp4",
    hasFilm: true,
  },
  {
    slug: "havaianas-pinterest",
    timecode: "00:26:20:00",
    title: "Havaianas Pinterest",
    client: "Havaianas / Alpargatas",
    agency: "AlmapBBDO",
    hue: 345,
    year: "2017",
    credits: ["Motion Design: Edu Menezes"],
    overview: "Havaianas extended its Made of Brazilian Summer platform into Pinterest-native discovery assets.",
    brief: "Havaianas' summer campaign lived everywhere except the platform built for saving and discovering it.",
    idea:
      "The brand's color, rhythm and tropical energy were translated into a library of Pinterest-native assets — extending the \"Made of Brazilian Summer\" platform into a space built for scroll-and-save behavior.",
    result: "A digital extension of Havaianas' global visual system for Alpargatas, built for Pinterest's discovery-first audience.",
    video: "havaianas-pinterest.mp4",
    hasFilm: true,
  },
  {
    slug: "vale-dots",
    timecode: "00:27:35:06",
    title: "Vale Dots",
    client: "Vale",
    agency: "Africa Creative DDB",
    hue: 70,
    credits: ["Direction / Editing / Motion Design / SFX: Edu Menezes", "Creative Development: Sergio Gordilho"],
    overview: "A dot-based visual language built to win the Vale pitch — direction, editing, motion and sound in one hand.",
    brief: "Africa Creative DDB needed to win the Vale account — Vale Dots was the film that made the pitch.",
    idea:
      "A modular, dot-based visual language built to translate Vale's institutional themes into emotional, motion-led storytelling — direction, editing, motion design and sound effects in one hand.",
    result: "A new-business pitch reel developed by Edu Menezes with Sergio Gordilho, built to demonstrate creative development and motion storytelling rather than to run as a public campaign.",
    video: "vale-dots.mp4",
    hasFilm: true,
  },
];

// Total individual Cannes Lions won across all projects — update manually when new Lions are added.
export const TOTAL_CANNES_LIONS = 8;

export const DISCIPLINES = ["Direction", "Motion Design", "Editing"] as const;
export type Discipline = (typeof DISCIPLINES)[number];

// Derive Edu's disciplines on a project from the credit line that names him.
// "Direction / Editing / Creative Leadership: Edu Menezes" -> [Direction, Editing]
export function disciplinesOf(project: Project): Discipline[] {
  const line = (project.credits ?? []).find((c) => /Edu Menezes/i.test(c)) ?? "";
  const rolePart = line.split(":")[0] ?? "";
  const out = new Set<Discipline>();
  if (/direc/i.test(rolePart)) out.add("Direction");
  if (/edit/i.test(rolePart)) out.add("Editing");
  if (/motion/i.test(rolePart)) out.add("Motion Design");
  // Default any uncredited project to Motion Design (his core discipline).
  if (out.size === 0) out.add("Motion Design");
  return [...out];
}
