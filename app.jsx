import React, { useState, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Users,
  History,
  BookOpen,
  Search,
  ChevronRight,
  Info,
  Scroll,
  Church,
  Mic2,
  FileText,
  Compass,
  Library,
  Flame,
  Globe,
  ArrowRightLeft,
  LayoutGrid,
  Layers,
  ListChecks,
  Cross,
  BookMarked,
  ShieldCheck,
  Heart,
  Zap,
  Anchor,
  Feather,
} from "lucide-react";
import { Chart, registerables } from "chart.js";
import { psalmBriefs } from "./psalmBriefs.js?v=psalms-20260703";

Chart.register(...registerables);
Chart.defaults.color = "#64748b";
Chart.defaults.borderColor = "#dff4f6";
Chart.defaults.font.family = "'Inter', sans-serif";

const glossaryEntries = [
  {
    title: "Acrostic",
    terms: ["acrostic"],
    definition: "A poetic structure where lines or stanzas begin with successive letters of the Hebrew alphabet. In the Psalms, acrostics often signal order, completeness, and careful meditation.",
  },
  {
    title: "Alliteration",
    terms: ["alliteration"],
    definition: "The repetition of similar consonant sounds. Hebrew poetry can use sound patterns to make a line memorable or to intensify its emotional force.",
  },
  {
    title: "Anthropomorphism",
    terms: ["anthropomorphism", "anthropomorphisms", "anthropomorphic", "anthropomorphis"],
    definition: "Language that describes God with human body imagery, such as hands, eyes, ears, arm, or face. It does not mean God has a physical body; it communicates His personal action, attention, power, and nearness in terms we can grasp.",
  },
  {
    title: "Anthropopathism",
    terms: ["anthropopathism", "anthropopathic"],
    definition: "Language that describes God with human emotions or inner responses. It helps readers understand divine love, anger, grief, or compassion without reducing God to human limitation.",
  },
  {
    title: "Antithetic Parallelism",
    terms: ["antithetic parallelism"],
    definition: "A Hebrew poetic pattern where the second line contrasts the first. It is common in wisdom psalms, especially when the righteous and wicked are set side by side.",
  },
  {
    title: "Apostrophe",
    terms: ["apostrophe"],
    definition: "A literary device where the speaker directly addresses someone or something absent, unseen, or personified. In the Psalms, the poet may address enemies, the soul, creation, or even abstract realities.",
  },
  {
    title: "Assonance",
    terms: ["assonance"],
    definition: "The repetition of vowel sounds. Like alliteration, it gives poetic texture and can make a Hebrew phrase more vivid or memorable.",
  },
  {
    title: "Canonical",
    terms: ["canonical"],
    definition: "Related to the final ordered shape of Scripture. A canonical reading asks how a psalm works where it stands in the Psalter and in the whole Bible.",
  },
  {
    title: "Chiasm",
    terms: ["chiasm", "chiasmus", "chiastic"],
    definition: "A mirrored literary structure, often described as A-B-B-A or A-B-C-B-A. It draws attention to the center or turning point of a poem and helps show how the psalm is arranged.",
  },
  {
    title: "Climactic Parallelism",
    terms: ["climactic parallelism", "staircase parallelism"],
    definition: "A poetic pattern where a phrase is repeated and then extended, creating a rising or stair-step effect. It often gives worship lines a sense of momentum and emphasis.",
  },
  {
    title: "Communal Lament",
    terms: ["communal lament"],
    definition: "A lament spoken by or for the covenant community rather than only one individual. These psalms bring national grief, defeat, exile, or disaster before God.",
  },
  {
    title: "Covenant",
    terms: ["covenant", "covenantal"],
    definition: "A solemn relationship established by God with promises, obligations, and signs. In the Psalms, covenant language often recalls God's steadfast commitment to Israel, David, and ultimately the Messiah.",
  },
  {
    title: "Davidic Covenant",
    terms: ["Davidic covenant"],
    definition: "God's promise that David's royal line would endure and that a son of David would rule. Messianic readings of the Psalms often flow from this covenant.",
  },
  {
    title: "Doxology",
    terms: ["doxology"],
    definition: "A formal expression of praise to God. The five books of the Psalter each close with doxological praise, marking the movement from prayer toward worship.",
  },
  {
    title: "Delayed Identification",
    terms: ["delayed identification"],
    definition: "A literary technique where the poet withholds the identity of a speaker, subject, or object until later in the poem. This creates suspense and helps the reader feel the movement of discovery.",
  },
  {
    title: "Enallage",
    terms: ["enallage"],
    definition: "A grammatical shift, such as a change in person, number, or tense, used for rhetorical effect. In poetry, these shifts can make the speaker's experience feel immediate or dramatic.",
  },
  {
    title: "Enthronement Psalm",
    terms: ["enthronement psalm", "enthronement"],
    definition: "A psalm that celebrates the Lord as King. These psalms proclaim divine rule over creation, nations, justice, and worship.",
  },
  {
    title: "Hesed",
    terms: ["hesed"],
    definition: "A rich Hebrew word for the Lord's covenant love, loyal mercy, and steadfast kindness. It is love that keeps promise and moves toward the needy with faithfulness.",
  },
  {
    title: "Hyperbole",
    terms: ["hyperbole"],
    definition: "Intentional exaggeration used for emphasis. Psalmists use it to express intense fear, grief, wonder, or praise without requiring wooden literalism.",
  },
  {
    title: "Imperative Parallelism",
    terms: ["imperative parallelism"],
    definition: "A form of parallelism built around repeated commands. It is common in calls to worship, where the repeated imperatives summon the congregation, nations, or creation to praise.",
  },
  {
    title: "Imagery",
    terms: ["imagery"],
    definition: "Concrete picture-language that lets the reader see, feel, or imagine truth. The Psalms often use images such as rocks, rivers, trees, shields, light, storms, and shepherds.",
  },
  {
    title: "Imprecatory",
    terms: ["imprecatory", "imprecation"],
    definition: "A prayer calling on God to judge evil and vindicate the righteous. These psalms entrust justice to God rather than private revenge.",
  },
  {
    title: "Inclusio",
    terms: ["inclusio"],
    definition: "A framing device where similar words or ideas appear at the beginning and end of a section. It signals the boundaries and main concern of a poem.",
  },
  {
    title: "Individual Lament",
    terms: ["individual lament"],
    definition: "A lament spoken from the suffering of one person. It usually includes complaint, petition, trust, and often a turn toward praise.",
  },
  {
    title: "Lament",
    terms: ["lament", "laments"],
    definition: "A faithful prayer of pain, protest, grief, fear, or confusion brought honestly before God. Biblical lament is not unbelief; it is suffering spoken in covenant relationship.",
  },
  {
    title: "Lex Talionis",
    terms: ["lex talionis"],
    definition: "The principle of measured justice often summarized as eye for eye. In psalm interpretation, it can describe prayers that ask God to return evil upon evildoers in fitting judgment.",
  },
  {
    title: "Keyword Repetition",
    terms: ["keyword repetition", "keywords"],
    definition: "The deliberate reuse of a significant word or root. Repetition helps trace a psalm's main concern and often marks its structure or emotional emphasis.",
  },
  {
    title: "Liturgical",
    terms: ["liturgical", "liturgy"],
    definition: "Related to public worship. A liturgical note explains how a psalm may have functioned in temple worship, festivals, processions, confession, or congregational praise.",
  },
  {
    title: "Maskil",
    terms: ["maskil"],
    definition: "A Hebrew term in some psalm superscriptions, likely meaning a contemplative, instructive, or skillful song. Its exact musical or literary function is debated.",
  },
  {
    title: "Merism",
    terms: ["merism", "merisms", "merismus"],
    definition: "A figure of speech that names two extremes to include everything between them. For example, heaven and earth can mean the whole creation, and sitting down and rising up can mean all ordinary activity.",
  },
  {
    title: "Messianic",
    terms: ["messianic"],
    definition: "Related to the Messiah, God's anointed King. A messianic psalm may directly speak of the king, establish a royal pattern, or find fuller fulfillment in Christ.",
  },
  {
    title: "Metaphor",
    terms: ["metaphor", "metaphorical"],
    definition: "A comparison that speaks of one thing as another, such as the Lord as rock, shepherd, shield, or sun. Metaphor compresses theology into vivid poetic images.",
  },
  {
    title: "Metaphorical Shift",
    terms: ["metaphorical shift"],
    definition: "A movement from one controlling image to another. For example, Psalm 23 moves from the Lord as shepherd to the Lord as host, enriching the theology of care and welcome.",
  },
  {
    title: "Miktam",
    terms: ["miktam"],
    definition: "A Hebrew term found in several Davidic superscriptions. Its precise meaning is uncertain, but it likely identifies a type of song, inscription, or treasured composition.",
  },
  {
    title: "Midrash",
    terms: ["midrash", "midrash tehillim"],
    definition: "Jewish interpretive reflection on Scripture. Midrash Tehillim is a rabbinic collection of interpretive comments and homiletical reflections on the Psalms.",
  },
  {
    title: "Onomatopoeia",
    terms: ["onomatopoeia", "onomatopoeic"],
    definition: "A sound effect where words imitate or echo the thing described. In poetry, sound can reinforce meaning, motion, noise, or emotional tone.",
  },
  {
    title: "Nature Parallelism",
    terms: ["nature parallelism"],
    definition: "Parallelism that uses creation imagery to develop the thought. Mountains, seas, trees, animals, clouds, and fields become poetic witnesses to God's rule or the worshiper's experience.",
  },
  {
    title: "Parallelism",
    terms: ["parallelism", "parallelisms"],
    definition: "The basic rhythm of Hebrew poetry, where one line is paired with another through repetition, contrast, completion, or intensification. The meaning often emerges by reading the lines together.",
  },
  {
    title: "Paronomasia",
    terms: ["paronomasia"],
    definition: "Wordplay based on similar sounds or related roots. Hebrew poets use it to connect ideas, sharpen irony, or make a line memorable.",
  },
  {
    title: "Parousia",
    terms: ["parousia"],
    definition: "A New Testament term for the coming or appearing of Christ. In Psalms study, it may appear when a psalm's judgment or kingdom themes are read in light of Christ's return.",
  },
  {
    title: "Penitential",
    terms: ["penitential"],
    definition: "Related to repentance and confession of sin. The traditional penitential psalms give language for guilt, mercy, cleansing, and restored joy.",
  },
  {
    title: "Personification",
    terms: ["personification"],
    definition: "A poetic device where non-human things are described as if they act like persons. The Psalms may personify seas, mountains, righteousness, wisdom, or creation itself.",
  },
  {
    title: "Physiological Metaphor",
    terms: ["physiological metaphor"],
    definition: "A metaphor drawn from the body, such as bones, throat, heart, eyes, or hands. The psalmist uses bodily language to make spiritual distress or renewal concrete.",
  },
  {
    title: "Refrain",
    terms: ["refrain"],
    definition: "A repeated line or phrase that structures a poem. Refrains often mark stanzas and reinforce the central burden or hope of the psalm.",
  },
  {
    title: "Rhetorical Question",
    terms: ["rhetorical question"],
    definition: "A question asked to make a point rather than to request information. In the Psalms, rhetorical questions often expose folly, intensify praise, or press a theological conclusion.",
  },
  {
    title: "Rashi",
    terms: ["rashi"],
    definition: "A major medieval Jewish commentator whose concise explanations shaped Jewish interpretation of the Hebrew Bible. In Psalm notes, Rashi often clarifies grammar, historical setting, and traditional Jewish readings.",
  },
  {
    title: "Sapiential",
    terms: ["sapiential"],
    definition: "Wisdom-oriented. A sapiential psalm teaches the way of wisdom, the contrast between righteous and wicked, or the moral order of life under God.",
  },
  {
    title: "Selah",
    terms: ["selah"],
    definition: "A Hebrew liturgical or musical marker found in many psalms. Its exact meaning is uncertain, but it likely signals a pause, lift, interlude, or moment for reflection.",
  },
  {
    title: "Shekinah",
    terms: ["shekinah", "shekhinah"],
    definition: "A Jewish term associated with the dwelling or manifest presence of God. It is often used to speak of God's nearness among His people.",
  },
  {
    title: "Sheol",
    terms: ["sheol"],
    definition: "The Hebrew term for the realm of the dead or the grave. In the Psalms, Sheol often represents death, silence, helplessness, or distance from earthly praise.",
  },
  {
    title: "Simile",
    terms: ["simile"],
    definition: "An explicit comparison using like or as. Psalmists use similes such as the righteous being like a tree or enemies being like chaff.",
  },
  {
    title: "Superscription",
    terms: ["superscription", "superscriptions"],
    definition: "The heading attached to a psalm, often naming an author, historical occasion, musical direction, or genre. These headings are part of the received Hebrew text.",
  },
  {
    title: "Synonymous Parallelism",
    terms: ["synonymous parallelism"],
    definition: "A poetic pattern where the second line restates or reinforces the first with related wording. It deepens the idea rather than merely repeating it.",
  },
  {
    title: "Synthetic Parallelism",
    terms: ["synthetic parallelism"],
    definition: "A poetic pattern where the second line completes, develops, or extends the thought of the first. The paired lines build a fuller statement together.",
  },
  {
    title: "Talmud",
    terms: ["talmud"],
    definition: "A central collection of rabbinic discussion on law, interpretation, ethics, and tradition. Psalm references in the Talmud often show how Jewish teachers used the Psalms devotionally and legally.",
  },
  {
    title: "Targum",
    terms: ["targum"],
    definition: "An ancient Aramaic rendering or paraphrase of the Hebrew Scriptures. Targums often preserve interpretive traditions as well as translation.",
  },
  {
    title: "Terse Imagery",
    terms: ["terse imagery", "terse construction"],
    definition: "Compressed poetic wording that says much with few words. Hebrew poetry often relies on brevity, letting images carry theological and emotional weight.",
  },
  {
    title: "Theophany",
    terms: ["theophany", "theophanic"],
    definition: "A visible or dramatic manifestation of God, often described with storm, fire, thunder, earthquake, cloud, or cosmic disturbance. Theophany language reveals divine majesty and judgment.",
  },
  {
    title: "Torah",
    terms: ["torah"],
    definition: "The Hebrew word often translated law, but more broadly meaning instruction or teaching. In the Psalms, Torah is God's life-giving word that forms wisdom, worship, and obedience.",
  },
  {
    title: "Typology",
    terms: ["typology", "typological", "type", "antitype"],
    definition: "A way of reading Scripture where earlier persons, events, offices, or patterns point forward to fuller fulfillment in Christ. David, Zion, temple, sacrifice, king, and righteous sufferer can function typologically.",
  },
  {
    title: "Wisdom Psalm",
    terms: ["wisdom psalm", "wisdom literature"],
    definition: "A psalm shaped by instruction, moral contrast, and reflection on the blessed life. These psalms teach readers how to live before God with discernment.",
  },
  {
    title: "Wordplay",
    terms: ["wordplay", "linguistic wordplay"],
    definition: "A meaningful play on sound, spelling, root, or double meaning. Hebrew wordplay can connect ideas that are difficult to reproduce fully in translation.",
  },
  {
    title: "Yahweh",
    terms: ["yahweh", "yhwh"],
    definition: "The covenant name of the Lord revealed to Israel. English Bibles often represent it as LORD in small capitals.",
  },
  {
    title: "Zion",
    terms: ["zion"],
    definition: "The hill of Jerusalem associated with David's city, the temple, divine kingship, and God's dwelling among His people. In the Psalms, Zion often becomes a theological symbol of God's reign and presence.",
  },
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const glossaryLookup = new Map();
glossaryEntries.forEach((entry) => {
  entry.terms.forEach((term) => glossaryLookup.set(term.toLowerCase(), entry));
});
const glossaryPattern = new RegExp(
  `\\b(${glossaryEntries.flatMap((entry) => entry.terms).sort((a, b) => b.length - a.length).map(escapeRegExp).join("|")})\\b`,
  "gi",
);

const normalizeFinderText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const hiddenFinderSourceNames = [
  "timothy keller",
  "alec motyer",
  "d martyn lloyd-jones",
  "d martyn lloyd jones",
  "martyn lloyd-jones",
  "martyn lloyd jones",
  "john stott",
  "charles spurgeon",
  "john calvin",
  "derek kidner",
  "matthew henry",
  "alexander maclaren",
  "franz delitzsch",
  "h c leupold",
  "h.c. leupold",
  "martin luther",
  "keil and delitzsch",
  "j j stewart perowne",
  "j.j. stewart perowne",
  "joseph alexander",
  "allen ross",
  "walter brueggemann",
  "robert alter",
  "warren wiersbe",
  "j a motyer",
  "j.a. motyer",
].map(normalizeFinderText);

const removeFinderSourceNames = (text) => {
  let cleaned = ` ${normalizeFinderText(text)} `;
  hiddenFinderSourceNames.forEach((name) => {
    if (name) cleaned = cleaned.replace(new RegExp(`\\b${escapeRegExp(name)}\\b`, "g"), " ");
  });
  return normalizeFinderText(cleaned);
};

const textIncludesFinderPhrase = (text, phrase) => {
  if (!phrase) return false;
  if (/\d/.test(phrase)) {
    return new RegExp(`\\b${escapeRegExp(phrase)}(?::|\\b(?!\\d))`, "i").test(text);
  }
  return text.includes(phrase);
};

const ntBookNames = [
  "1 thessalonians",
  "2 thessalonians",
  "1 corinthians",
  "2 corinthians",
  "1 timothy",
  "2 timothy",
  "1 peter",
  "2 peter",
  "1 john",
  "2 john",
  "3 john",
  "matthew",
  "romans",
  "galatians",
  "ephesians",
  "philippians",
  "colossians",
  "hebrews",
  "revelation",
  "luke",
  "john",
  "acts",
  "mark",
  "titus",
  "philemon",
  "james",
  "jude",
].sort((a, b) => b.length - a.length);

const parseReferenceQuery = (query) => {
  const book = ntBookNames.find((name) => query === name || query.startsWith(`${name} `));
  if (!book) return null;
  const rest = query.slice(book.length).trim();
  if (!rest) return null;
  const match = rest.match(/^(\d+)(?::(\d+)(?:-\d+)?)?$/);
  if (!match) return null;
  return {
    book,
    chapter: match[1],
    verse: match[2] || "",
    phrase: `${book} ${match[1]}${match[2] ? `:${match[2]}` : ""}`,
  };
};

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const cardAnchorId = (title) => `deep-dive-card-${slugify(title)}`;

const collectCardText = (card) => {
  const pieces = [card?.title, card?.content];
  if (Array.isArray(card?.sections)) {
    card.sections.forEach((section) => pieces.push(section.label, section.content));
  }
  if (Array.isArray(card?.items)) {
    card.items.forEach((item) => {
      if (item && typeof item === "object") {
        pieces.push(item.reference, item.type, item.text);
      } else {
        pieces.push(item);
      }
    });
  }
  if (card?.outline) {
    pieces.push(card.outline.theme);
    (card.outline.items || []).forEach((item) => pieces.push(item.label, item.range));
  }
  return pieces.filter(Boolean).join(" ");
};

const deepDiveTocItems = [
  ["Historical Background", "Background"],
  ["Context Type", "Context"],
  ["Poetic Features", "Poetry"],
  ["Insights", "Insights"],
  ["NT Cross-Reference Tracker", "NT"],
  ["Christ in the Old Testament", "Christ"],
  ["Brief Outline", "Outline"],
  ["Jewish Tradition", "Jewish"],
  ["Brief Exposition", "Exposition"],
];

const quickFilters = [
  { id: "lament", label: "lament", psalms: [3,4,5,6,7,10,12,13,17,22,25,31,35,38,42,44,51,55,69,74,77,80,88,102,109,130,137,143] },
  { id: "forgiveness", label: "forgiveness", psalms: [6,25,32,38,51,65,85,86,103,130,143] },
  { id: "fear", label: "fear", psalms: [3,4,23,27,34,46,56,57,62,91,94,118,121] },
  { id: "praise", label: "praise", psalms: [8,19,29,33,66,96,100,103,104,111,113,117,135,136,145,146,147,148,149,150] },
  { id: "messianic", label: "messianic", psalms: [2,16,22,24,40,45,69,72,89,110,118,132] },
  { id: "wisdom", label: "wisdom", psalms: [1,19,32,34,37,49,73,78,90,112,119,127,128] },
  { id: "trust", label: "trust", psalms: [11,16,23,27,31,46,56,62,63,91,121,125,131] },
  { id: "thanksgiving", label: "thanksgiving", psalms: [18,30,32,34,40,66,92,107,116,118,124,136,138] },
];

const themePathways = [
  {
    id: "afraid",
    title: "When You Feel Afraid",
    desc: "Prayers of refuge, courage, and steadied trust.",
    psalms: [3, 23, 27, 34, 46, 56, 91, 121],
  },
  {
    id: "forgiveness",
    title: "When You Need Forgiveness",
    desc: "Confession, mercy, cleansing, and restored joy.",
    psalms: [6, 32, 38, 51, 103, 130, 143],
  },
  {
    id: "suffering",
    title: "When You Are Suffering",
    desc: "Honest lament for pain, waiting, and unanswered questions.",
    psalms: [13, 22, 42, 44, 69, 88, 102, 137],
  },
  {
    id: "praise",
    title: "Learning to Praise",
    desc: "Creation, rescue, kingship, gratitude, and final hallelujah.",
    psalms: [8, 19, 100, 103, 104, 145, 146, 148, 150],
  },
  {
    id: "messianic",
    title: "Messianic Hope",
    desc: "Royal promise, righteous suffering, priestly kingship, and victory.",
    psalms: [2, 16, 22, 45, 69, 72, 110, 118],
  },
  {
    id: "wisdom",
    title: "Wisdom for the Way",
    desc: "The blessed life, Torah delight, and steady obedience.",
    psalms: [1, 19, 37, 73, 90, 112, 119, 127, 128],
  },
];

const featuredFinderPsalms = [1, 2, 22, 23, 32, 51, 73, 88, 90, 110, 119, 150];

const App = () => {
  const [activePsalm, setActivePsalm] = useState(1);
  const [brief, setBrief] = useState(psalmBriefs[1]);
  const [explorerData, setExplorerData] = useState({ type: null, data: null });
  const [error, setError] = useState(null);
  const [finderQuery, setFinderQuery] = useState("");
  const [finderFilter, setFinderFilter] = useState(null);
  const [activePathway, setActivePathway] = useState(null);
  const [visibleFinderCount, setVisibleFinderCount] = useState(12);

  const authChartRef = useRef(null);
  const eraChartRef = useRef(null);
  const genreChartRef = useRef(null);
  const canonicalChartRef = useRef(null);
  const introStepRefs = useRef([]);
  const [visibleIntroSteps, setVisibleIntroSteps] = useState([0]);
  const [glossaryTooltip, setGlossaryTooltip] = useState(null);

  const authorshipData = [
    { id: "david", name: "David", role: "Sweet Singer of Israel (73 Psalms)", bio: "The primary author and covenantal heart of the Psalter. David's life from shepherd to king gives the collection a living backdrop for prayer, danger, kingship, repentance, and hope. His psalms give the book a strongly messianic and pastoral center.", psalms: [2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,68,69,70,86,101,103,108,109,110,122,124,131,133,138,139,140,141,142,143,144,145] },
    { id: "asaph", name: "Asaph", role: "Levitical Choirmaster (12 Psalms)", bio: "Leader of one of David's music guilds. Asaph's work focuses on God's role as Sovereign Judge, grappling with communal history and theodicy.", psalms: [50,73,74,75,76,77,78,79,80,81,82,83] },
    { id: "korah", name: "Sons of Korah", role: "Temple Gatekeepers (11 Psalms)", bio: "A Levitical guild of musicians whose psalms often linger around Zion, sanctuary, exile, and holy longing. Their poems give the worshiper a language for desiring God's presence when life feels distant from it.", psalms: [42,44,45,46,47,48,49,84,85,87,88] },
    { id: "solomon", name: "Solomon", role: "The Wise King (2 Psalms)", bio: "Author of Ps 72 and Ps 127. These psalms bring royal hope and wisdom reflection together, showing that justice, blessing, labor, and household life all depend on the Lord.", psalms: [72, 127] },
    { id: "moses", name: "Moses", role: "The Man of God (1 Psalm)", bio: "Author of Ps 90, the oldest prayer in the collection. This foundational text contrasts God's eternity with human frailty and teaches the people of God to number their days wisely.", psalms: [90] },
    { id: "heman", name: "Heman the Ezrahite", role: "Sage of Sorrow (1 Psalm)", bio: "Author of Ps 88, the darkest individual lament. It modeled for the church how faith clings to God even in total darkness.", psalms: [88] },
    { id: "ethan", name: "Ethan the Ezrahite", role: "The Covenant Poet (1 Psalm)", bio: "Author of Ps 89, reflecting on the tension between God's 'steadfast love' and the historical collapse of the monarchy.", psalms: [89] },
    { id: "anon", name: "Anonymous", role: "Editorial & Remnant (49 Psalms)", bio: "Anonymous hymns help shape the final form of the Psalter. Many stand at important turning points, teaching the reader to move from wisdom to worship, from exile to restoration, and from lament to praise.", psalms: [1,10,33,43,66,67,71,91,92,93,94,95,96,97,98,99,100,102,104,105,106,107,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,128,129,130,132,134,135,136,147,148,149,150] },
  ];

  const genresData = [
    { title: "Lament", desc: "Cries of distress to God that teach faithful prayer in pain, fear, injustice, and confusion.", psalms: [3,4,5,6,7,10,12,13,17,22,25,26,28,31,35,38,39,42,44,54,55,56,57,59,60,61,64,69,70,71,74,77,79,80,83,85,86,88,89,94,109,140,141,142,143] },
    { title: "Hymn / Praise", desc: "Adoration of God's character and power, often used as corporate praise and spiritual reorientation.", psalms: [8,19,29,33,46,47,48,65,66,67,68,76,81,84,87,92,93,95,96,97,98,99,100,103,104,105,111,113,114,117,135,136,145,146,147,148,149,150] },
    { title: "Songs of Ascent", desc: "Ps 120-134. Traditionally used by pilgrims journeying to Jerusalem.", psalms: [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134] },
    { title: "Penitential", desc: "Seven classic hymns of repentance focusing on human depravity.", psalms: [6, 32, 38, 51, 102, 130, 143] },
    { title: "Imprecatory", desc: "Prayers for divine judgment against extreme evil.", psalms: [35, 55, 58, 59, 69, 79, 83, 109, 137] },
    { title: "Wisdom / Torah", desc: "Instructional hymns on the moral order, the blessed life, and the formative delight of God's word.", psalms: [1, 19, 36, 37, 49, 73, 78, 112, 119] },
    { title: "Royal / Messianic", desc: "Focuses on the Davidic office and Christ.", psalms: [2, 18, 20, 21, 45, 72, 89, 101, 110, 132, 144] },
    { title: "Thanksgiving", desc: "Testimonies shared after deliverance, recounting divine rescue.", psalms: [18, 30, 32, 34, 40, 66, 92, 116, 118, 138] },
  ];

  const erasData = [
    { id: "monarchy", title: "Pre-Exilic (Monarchy)", years: "~1000 - 586 BCE", desc: "First Temple era focusing on royal establishment, military victory, and Davidic covenant theology.", psalms: [2,3,4,5,6,7,8,9,11,12,13,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36,38,39,40,41,45,46,47,48,50,51,52,54,55,56,57,58,59,60,61,62,63,64,65,68,72,75,76,78,81,82,83,84,86,87,101,103,108,109,110,131,132,133,138,139,140,141,142,143,144,145] },
    { id: "captivity", title: "Exilic (Captivity)", years: "586 - 538 BCE", desc: "Written during the Babylonian exile. Marked by national mourning, questions of divine faithfulness, and intense longing.", psalms: [10,14,42,43,44,49,53,69,70,71,73,74,77,79,80,85,88,89,90,94,102,126,130,137] },
    { id: "restoration", title: "Post-Exilic (Restoration)", years: "538 BCE onwards", desc: "Second Temple period focusing on Torah meditation, pilgrim journeys, and final liturgical arrangements.", psalms: [1,33,37,66,67,91,92,93,95,96,97,98,99,100,104,105,106,107,108,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,127,128,129,134,135,136,146,147,148,149,150] },
  ];

  const canonicalBooksData = [
    {
      id: "book-i",
      title: "Book I",
      role: "Psalms 1-41",
      desc: "Book I is heavily Davidic and personal. It begins with the two gates into the Psalter: the blessed life formed by Torah and the royal Son whom the nations must kiss. Its theology teaches that the righteous suffer, pray, confess, and wait under the care of the Lord, while the Davidic king becomes the representative voice of the faithful. The book ends with betrayal, weakness, and a doxology, preparing the reader to see that covenant faith is lived amid real enemies and real mercy.",
      psalms: Array.from({ length: 41 }, (_, index) => index + 1),
    },
    {
      id: "book-ii",
      title: "Book II",
      role: "Psalms 42-72",
      desc: "Book II widens the prayer life of the Psalter from David's personal cries to temple longing, royal hope, and the nations. The Korahite psalms open with thirst for God, and the collection moves through distress, confession, battle, and messianic kingship. The theology of this book teaches that exile from God's presence creates holy longing, but the Lord still reigns through His anointed king. It closes with Psalm 72, a vision of worldwide righteousness and blessing under the royal son.",
      psalms: Array.from({ length: 31 }, (_, index) => index + 42),
    },
    {
      id: "book-iii",
      title: "Book III",
      role: "Psalms 73-89",
      desc: "Book III is the crisis center of the Psalter. Dominated by Asaph and the sons of Korah, it wrestles with the prosperity of the wicked, the ruin of the sanctuary, the suffering of the flock, and the apparent collapse of the Davidic covenant. Its theology refuses shallow answers: faith must pass through the sanctuary, through remembrance, and through lament over judgment. The book ends with Psalm 89 asking how God's steadfast love can stand when the crown lies in the dust.",
      psalms: Array.from({ length: 17 }, (_, index) => index + 73),
    },
    {
      id: "book-iv",
      title: "Book IV",
      role: "Psalms 90-106",
      desc: "Book IV answers the crisis of Book III by turning the reader from the shaken throne of David to the eternal kingship of the Lord. It begins with Moses, reminding Israel that God has been the dwelling place of His people before monarchy, temple, or land security. The central theology is divine reign: the Lord is king, creation is secure, judgment is righteous, and covenant mercy still gathers a sinful people. This book teaches exilic and post-exilic faith to live under God's everlasting rule.",
      psalms: Array.from({ length: 17 }, (_, index) => index + 90),
    },
    {
      id: "book-v",
      title: "Book V",
      role: "Psalms 107-150",
      desc: "Book V moves from rescue and restoration toward final praise. It gathers thanksgiving, royal-messianic hope, Torah delight, pilgrimage songs, and the great Hallelujah conclusion. Its theology says that the Lord redeems wanderers, rebuilds worship, teaches His people to walk by His word, and leads them up to Zion. The final movement of the Psalter is not denial of suffering but the transformation of all faithful prayer into praise, ending with everything that has breath blessing the Lord.",
      psalms: Array.from({ length: 44 }, (_, index) => index + 107),
    },
  ];

  const themeCategories = [
    {
      group: "Attributes of YHWH",
      color: "border-[#d2d6df] bg-[#eef0f2]/80 text-[#243041]",
      icon: <ShieldCheck size={20} className="text-[#59687a]"/>,
      terms: [
        { label: "Hesed", weight: "text-lg font-bold", psalms: [13, 25, 36, 51, 86, 89, 103, 107, 136] },
        { label: "Judge", weight: "text-sm font-medium", psalms: [50, 75, 82, 94, 96, 98] },
        { label: "Creator", weight: "text-base font-semibold", psalms: [8, 19, 33, 104, 139, 148] },
        { label: "Rock", weight: "text-xl font-extrabold", psalms: [18, 28, 31, 61, 62, 71, 92, 144] },
      ],
    },
    {
      group: "The Human Cry",
      color: "border-[#e5d1a4] bg-[#f7e7c2]/60 text-[#4a3520]",
      icon: <Heart size={20} className="text-[#b97818]"/>,
      terms: [
        { label: "Wait", weight: "text-xl font-extrabold", psalms: [25, 27, 33, 37, 40, 62, 130] },
        { label: "Enemies", weight: "text-base font-semibold", psalms: [3, 27, 35, 55, 56, 59, 109, 143] },
        { label: "Disorientation", weight: "text-xl font-extrabold", psalms: [13, 22, 44, 74, 88, 137] },
        { label: "Trust", weight: "text-lg font-bold", psalms: [23, 27, 46, 62, 91, 121] },
      ],
    },
    {
      group: "The Messianic Hope",
      color: "border-[#cfdbc9] bg-[#edf2e5]/70 text-[#243021]",
      icon: <Zap size={20} className="text-[#65775c]"/>,
      terms: [
        { label: "Royal Priest", weight: "text-xl font-extrabold", psalms: [2, 45, 72, 110, 132] },
        { label: "Kingdom", weight: "text-lg font-bold", psalms: [2, 22, 47, 93, 96, 97, 99, 145] },
        { label: "Messiah", weight: "text-base font-semibold", psalms: [2, 16, 22, 45, 69, 110, 118] },
        { label: "Priest-King", weight: "text-lg font-bold", psalms: [110] },
      ],
    },
    {
      group: "Presence & Torah",
      color: "border-[#e2c9b8] bg-[#f3e2d6]/60 text-[#3f2b20]",
      icon: <Anchor size={20} className="text-[#9b5b3b]"/>,
      terms: [
        { label: "Zion", weight: "text-xl font-extrabold", psalms: [2, 48, 76, 84, 87, 122, 125, 126, 137] },
        { label: "Sanctuary", weight: "text-lg font-bold", psalms: [20, 63, 68, 73, 77, 96, 150] },
        { label: "Torah", weight: "text-xl font-extrabold", psalms: [1, 19, 119] },
        { label: "Creation", weight: "text-lg font-bold", psalms: [8, 19, 33, 104, 148] },
      ],
    },
  ];

  const psalmSearchIndex = useMemo(() => {
    const themeTerms = themeCategories.flatMap((category) =>
      category.terms.map((term) => ({
        category: category.group,
        label: term.label,
        psalms: term.psalms,
      })),
    );

    return Array.from({ length: 150 }, (_, index) => {
      const psalm = index + 1;
      const briefData = psalmBriefs[psalm];
      const authors = authorshipData.filter((author) => author.psalms.includes(psalm)).map((author) => author.name);
      const genres = genresData.filter((genre) => genre.psalms.includes(psalm)).map((genre) => genre.title);
      const themes = themeTerms.filter((term) => term.psalms.includes(psalm)).map((term) => term.label);
      const themeGroups = Array.from(new Set(themeTerms.filter((term) => term.psalms.includes(psalm)).map((term) => term.category)));
      const era = erasData.find((item) => item.psalms.includes(psalm));
      const canonicalBook = canonicalBooksData.find((book) => book.psalms.includes(psalm));
      const cardText = removeFinderSourceNames((briefData?.cards || []).map(collectCardText).join(" "));
      const metadataText = [
        `Psalm ${psalm}`,
        ...authors,
        ...genres,
        ...themes,
        ...themeGroups,
        era?.title,
        era?.years,
        canonicalBook?.title,
        canonicalBook?.role,
      ].join(" ");
      const searchText = normalizeFinderText(`${metadataText} ${cardText}`);

      return {
        psalm,
        title: `Psalm ${psalm}`,
        authors,
        genres,
        themes,
        themeGroups,
        era: era?.title || "",
        canonical: canonicalBook ? `${canonicalBook.title} (${canonicalBook.role})` : "",
        metadataText: normalizeFinderText(metadataText),
        searchText,
        summaryLabels: [canonicalBook?.title, genres[0], themes[0] || authors[0]].filter(Boolean),
      };
    });
  }, []);

  const finderResults = useMemo(() => {
    const query = normalizeFinderText(finderQuery);
    const queryTerms = query.split(" ").filter(Boolean);
    const meaningfulQueryTerms = queryTerms.filter((term) => !/^\d+$/.test(term) && term.length > 1);
    const queryNumber = Number(query);
    const referenceQuery = parseReferenceQuery(query);
    const selectedFilter = quickFilters.find((filter) => filter.id === finderFilter);
    const queryMatchedFilter = !selectedFilter && query
      ? quickFilters.find((filter) => normalizeFinderText(filter.label) === query || normalizeFinderText(filter.id) === query)
      : null;
    const activeFilter = selectedFilter || queryMatchedFilter;
    const selectedPathway = themePathways.find((pathway) => pathway.id === activePathway);

    if (selectedPathway) {
      return selectedPathway.psalms
        .map((psalm, order) => {
          const entry = psalmSearchIndex.find((item) => item.psalm === psalm);
          if (!entry) return null;
          return {
            ...entry,
            score: 1000 - order,
            matchLabels: [selectedPathway.title, ...entry.summaryLabels].filter(Boolean).slice(0, 4),
          };
        })
        .filter(Boolean);
    }

    if (!query && !activeFilter) {
      return featuredFinderPsalms
        .map((psalm, order) => {
          const entry = psalmSearchIndex.find((item) => item.psalm === psalm);
          if (!entry) return null;
          return {
            ...entry,
            score: 500 - order,
            matchLabels: ["Suggested", ...entry.summaryLabels].filter(Boolean).slice(0, 4),
          };
        })
        .filter(Boolean);
    }

    return psalmSearchIndex
      .map((entry) => {
        let score = 0;
        const labels = [];

        if (activeFilter) {
          if (activeFilter.psalms.includes(entry.psalm)) {
            score += 180;
            labels.push(activeFilter.label);
          }
          if (entry.searchText.includes(activeFilter.id)) score += 20;
        }

        if (query) {
          if (Number.isInteger(queryNumber) && entry.psalm === queryNumber) {
            score += 1000;
            labels.push("Exact match");
          }

          if (referenceQuery) {
            if (textIncludesFinderPhrase(entry.searchText, referenceQuery.phrase)) {
              score += 900;
              labels.push("Reference");
            } else {
              return { ...entry, score: 0, matchLabels: [] };
            }
          } else if (textIncludesFinderPhrase(entry.metadataText, query)) {
            score += 110;
            labels.push("Metadata");
          } else if (textIncludesFinderPhrase(entry.searchText, query)) {
            score += 55;
            labels.push("Deep Dive");
          }

          const requiresNarrowMatch = queryTerms.length > 1 && meaningfulQueryTerms.length > 0 && !referenceQuery;
          const hasAllMeaningfulTerms = meaningfulQueryTerms.every((term) => entry.searchText.includes(term));
          if (requiresNarrowMatch && !textIncludesFinderPhrase(entry.searchText, query) && !hasAllMeaningfulTerms) {
            return { ...entry, score: 0, matchLabels: [] };
          }

          meaningfulQueryTerms.forEach((term) => {
            if (entry.metadataText.includes(term)) score += 24;
            else if (entry.searchText.includes(term)) score += 8;
          });
        }

        const matchLabels = Array.from(new Set([...labels, ...entry.summaryLabels])).slice(0, 4);
        return { ...entry, score, matchLabels };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.psalm - b.psalm);
  }, [activePathway, finderFilter, finderQuery, psalmSearchIndex]);

  const visibleFinderResults = finderResults.slice(0, visibleFinderCount);
  const selectedPathway = themePathways.find((pathway) => pathway.id === activePathway);
  const selectedFilter = quickFilters.find((filter) => filter.id === finderFilter);

  const resetFinderList = () => setVisibleFinderCount(12);

  const handleFinderQueryChange = (value) => {
    setFinderQuery(value);
    setFinderFilter(null);
    setActivePathway(null);
    resetFinderList();
  };

  const handleQuickFilter = (filterId) => {
    setFinderQuery("");
    setActivePathway(null);
    setFinderFilter((current) => (current === filterId ? null : filterId));
    resetFinderList();
  };

  const handlePathway = (pathwayId) => {
    setFinderQuery("");
    setFinderFilter(null);
    setActivePathway((current) => (current === pathwayId ? null : pathwayId));
    resetFinderList();
  };

  const scrollJump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const steps = introStepRefs.current.filter(Boolean);
    if (!steps.length) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setVisibleIntroSteps([0, 1, 2]);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIntroSteps((current) => {
          const next = new Set(current);
          entries.forEach((entry) => {
            if (entry.isIntersecting) next.add(Number(entry.target.dataset.introStep));
          });
          return Array.from(next);
        });
      },
      {
        root: document.getElementById("main-scroller"),
        rootMargin: "-12% 0px -28% 0px",
        threshold: 0.42,
      },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const charts = [];
    const build = (ref, cfg) => {
      if (ref.current) charts.push(new Chart(ref.current, cfg));
    };

    build(canonicalChartRef, { type: "bar", data: { labels: canonicalBooksData.map(book => book.title), datasets: [{ data: canonicalBooksData.map(book => book.psalms.length), backgroundColor: ["#65775c", "#b97818", "#9b5b3b", "#59687a", "#2b2117"], borderRadius: 8 }] }, options: { maintainAspectRatio: false, plugins: { legend: { display: false } }, onClick: (_, els) => { if (els.length) setExplorerData({ type: "canonical", data: canonicalBooksData[els[0].index] }); }, scales: { x: { grid: { display: false } } } } });
    build(authChartRef, { type: "doughnut", data: { labels: authorshipData.map(a => a.name), datasets: [{ data: authorshipData.map(a => a.psalms.length), backgroundColor: ["#65775c", "#b97818", "#9b5b3b", "#59687a", "#7c6a45", "#8f7350", "#3f4b3a", "#171512"], borderWidth: 4, borderColor: "#fff8ea" }] }, options: { maintainAspectRatio: false, cutout: "75%", plugins: { legend: { display: false } }, onClick: (_, els) => { if (els.length) setExplorerData({ type: "auth", data: authorshipData[els[0].index] }); } } });
    build(eraChartRef, { type: "bar", data: { labels: erasData.map(e => e.title), datasets: [{ data: erasData.map(e => e.psalms.length), backgroundColor: ["#65775c", "#b97818", "#59687a"], borderRadius: 8 }] }, options: { indexAxis: "y", maintainAspectRatio: false, plugins: { legend: { display: false } }, onClick: (_, els) => { if (els.length) setExplorerData({ type: "era", data: erasData[els[0].index] }); }, scales: { y: { grid: { display: false } } } } });
    build(genreChartRef, { type: "doughnut", data: { labels: genresData.map(g => g.title), datasets: [{ data: genresData.map(g => g.psalms.length), backgroundColor: ["#b97818", "#65775c", "#59687a", "#9b5b3b", "#7c6a45", "#8f7350", "#3f4b3a", "#171512"], borderWidth: 4, borderColor: "#fff8ea" }] }, options: { maintainAspectRatio: false, cutout: "75%", plugins: { legend: { display: false } }, onClick: (_, els) => { if (els.length) setExplorerData({ type: "genre", data: genresData[els[0].index] }); } } });

    return () => charts.forEach(c => c.destroy());
  }, []);

  const loadPsalmBrief = (num = activePsalm) => {
    const psalmNum = Number(String(num).trim());

    if (!Number.isInteger(psalmNum) || psalmNum < 1 || psalmNum > 150) {
      setError("Choose a psalm from 1 to 150.");
      return;
    }

    const nextBrief = psalmBriefs[psalmNum];
    if (!nextBrief) {
      setError(`Brief not found for Psalm ${psalmNum}.`);
      return;
    }

    setActivePsalm(psalmNum);
    setBrief(nextBrief);
    setError(null);
    setTimeout(() => scrollJump("deep-dive"), 100);
  };

  const cardIcons = {
    "Historical Background": <History size={20} className="text-[#65775c]"/>,
    "Context Type": <Compass size={20} className="text-[#59687a]"/>,
    "Poetic Features": <Feather size={20} className="text-[#b97818]"/>,
    "Insights": <ListChecks size={20} className="text-[#65775c]"/>,
    "NT Cross-Reference Tracker": <ArrowRightLeft size={20} className="text-[#59687a]"/>,
    "Christ in the Old Testament": <Cross size={20} className="text-[#59687a]"/>,
    "Brief Outline": <FileText size={20} className="text-[#b97818]"/>,
    "Jewish Tradition": <Scroll size={20} className="text-[#9b5b3b]"/>,
    "Brief Exposition": <Mic2 size={20} className="text-[#65775c]"/>,
  };

  const cardThemes = {
    "Historical Background": {
      rail: "bg-[#65775c]",
      border: "border-[#d8cfb4]",
      card: "bg-[#fff8ea]",
      header: "from-[#f4ecd9] via-[#fff8ea] to-[#f9f1df]",
      chip: "border-[#d8cfb4] bg-[#f3ead6] text-[#5f684d]",
      marker: "marker:text-[#60704f]",
      label: "text-[#60704f]",
      themeBox: "border-[#d8cfb4] bg-[#f3ead6]/75",
    },
    "Context Type": {
      rail: "bg-[#59687a]",
      border: "border-[#d3d7dc]",
      card: "bg-[#fbf8ef]",
      header: "from-[#edf0ef] via-[#fff8ea] to-[#f6ead8]",
      chip: "border-[#d3d7dc] bg-[#eef1ef] text-[#59687a]",
      marker: "marker:text-[#59687a]",
      label: "text-[#59687a]",
      themeBox: "border-[#d3d7dc] bg-[#eef1ef]/75",
    },
    "Poetic Features": {
      rail: "bg-[#b97818]",
      border: "border-[#e5d1a4]",
      card: "bg-[#fff8e8]",
      header: "from-[#f5e4bf] via-[#fff8ea] to-[#f6ead8]",
      chip: "border-[#e5d1a4] bg-[#f7e7c2] text-[#8a5614]",
      marker: "marker:text-[#9a6418]",
      label: "text-[#9a6418]",
      themeBox: "border-[#e5d1a4] bg-[#f7e7c2]/75",
    },
    "Insights": {
      rail: "bg-[#65775c]",
      border: "border-[#cfdbc9]",
      card: "bg-[#fbfaf1]",
      header: "from-[#e8eddf] via-[#fff8ea] to-[#f4ead7]",
      chip: "border-[#cfdbc9] bg-[#edf2e5] text-[#4f684f]",
      marker: "marker:text-[#557052]",
      label: "text-[#557052]",
      themeBox: "border-[#cfdbc9] bg-[#edf2e5]/75",
    },
    "NT Cross-Reference Tracker": {
      rail: "bg-[#59687a]",
      border: "border-[#d2d6df]",
      card: "bg-[#fbfaf5]",
      header: "from-[#e8ebef] via-[#fff8ea] to-[#f1e8d8]",
      chip: "border-[#d2d6df] bg-[#eef0f2] text-[#59687a]",
      marker: "marker:text-[#59687a]",
      label: "text-[#59687a]",
      themeBox: "border-[#d2d6df] bg-[#eef0f2]/75",
    },
    "Christ in the Old Testament": {
      rail: "bg-[#59687a]",
      border: "border-[#d2d6df]",
      card: "bg-[#fbfaf5]",
      header: "from-[#e8ebef] via-[#fff8ea] to-[#f1e8d8]",
      chip: "border-[#d2d6df] bg-[#eef0f2] text-[#59687a]",
      marker: "marker:text-[#59687a]",
      label: "text-[#59687a]",
      themeBox: "border-[#d2d6df] bg-[#eef0f2]/75",
    },
    "Brief Outline": {
      rail: "bg-[#b97818]",
      border: "border-[#e5d1a4]",
      card: "bg-[#fff8e8]",
      header: "from-[#f5e4bf] via-[#fff8ea] to-[#f6ead8]",
      chip: "border-[#e5d1a4] bg-[#f7e7c2] text-[#8a5614]",
      marker: "marker:text-[#9a6418]",
      label: "text-[#9a6418]",
      themeBox: "border-[#e5d1a4] bg-[#f7e7c2]/75",
    },
    "Jewish Tradition": {
      rail: "bg-[#9b5b3b]",
      border: "border-[#e2c9b8]",
      card: "bg-[#fff8ef]",
      header: "from-[#f1dfd3] via-[#fff8ea] to-[#eee7dd]",
      chip: "border-[#e2c9b8] bg-[#f3e2d6] text-[#8b4f35]",
      marker: "marker:text-[#8b4f35]",
      label: "text-[#8b4f35]",
      themeBox: "border-[#e2c9b8] bg-[#f3e2d6]/75",
    },
    "Brief Exposition": {
      rail: "bg-[#65775c]",
      border: "border-[#cfdbc9]",
      card: "bg-[#fbfaf1]",
      header: "from-[#e8eddf] via-[#fff8ea] to-[#f4ead7]",
      chip: "border-[#cfdbc9] bg-[#edf2e5] text-[#4f684f]",
      marker: "marker:text-[#557052]",
      label: "text-[#557052]",
      themeBox: "border-[#cfdbc9] bg-[#edf2e5]/75",
    },
  };

  const fallbackCardTheme = cardThemes["Insights"];
  const getCardTheme = (title) => cardThemes[title] || fallbackCardTheme;

  const numberedCards = new Set([
    "Insights",
    "NT Cross-Reference Tracker",
    "Christ in the Old Testament",
  ]);

  const showGlossaryTooltip = (entry, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth || 1024;
    const tooltipWidth = Math.min(352, Math.max(260, viewportWidth - 32));
    const unclampedX = rect.left + rect.width / 2;
    const x = Math.min(Math.max(unclampedX, tooltipWidth / 2 + 16), viewportWidth - tooltipWidth / 2 - 16);
    const placeBelow = rect.top < 190;

    setGlossaryTooltip({
      title: entry.title,
      definition: entry.definition,
      x,
      y: placeBelow ? rect.bottom + 12 : rect.top - 12,
      width: tooltipWidth,
      placement: placeBelow ? "below" : "above",
    });
  };

  const hideGlossaryTooltip = () => setGlossaryTooltip(null);

  const renderGlossaryText = (value, keyPrefix = "glossary") => {
    const text = String(value || "");
    if (!text) return text;

    const parts = text.split(glossaryPattern);
    return parts.map((part, partIndex) => {
      const entry = glossaryLookup.get(part.toLowerCase());
      if (!entry) return part;

      return (
        <span
          key={`${keyPrefix}-${part}-${partIndex}`}
          tabIndex={0}
          aria-label={`${entry.title}: ${entry.definition}`}
          onMouseEnter={(event) => showGlossaryTooltip(entry, event)}
          onMouseLeave={hideGlossaryTooltip}
          onFocus={(event) => showGlossaryTooltip(entry, event)}
          onBlur={hideGlossaryTooltip}
          className="glossary-term relative inline cursor-help rounded-[0.2rem] bg-[#f3ead6]/80 px-1 text-[#2c241c] outline-none ring-1 ring-[#d8cfb4] transition hover:bg-[#f7e7c2]/90 hover:ring-[#b97818] focus:bg-[#f7e7c2]/90 focus:ring-2 focus:ring-[#b97818]"
        >
          {part}
        </span>
      );
    });
  };

  const renderNumberedItem = (item, itemIndex, cardTitle) => {
    const theme = getCardTheme(cardTitle);
    const isStructuredItem = item && typeof item === "object";
    const text = String(isStructuredItem ? item.text : item || "").trim();
    const source = String(isStructuredItem ? item.source || "" : "").trim();
    const reference = String(isStructuredItem ? item.reference || "" : "").trim();
    const itemType = String(isStructuredItem ? item.type || "" : "").trim();
    const displayText = text;

    return (
      <li key={itemIndex} className={`pl-1 marker:font-display marker:text-sm marker:font-bold ${theme.marker}`}>
        <div className="space-y-1.5">
          {cardTitle !== "Insights" && (source || reference || itemType) && (
            <div className="flex flex-wrap gap-2">
              {source && (
                <span className={`inline-flex rounded-full border px-3 py-1 font-sans text-[10px] font-black uppercase tracking-[0.14em] ${theme.chip}`}>
                  {source}
                </span>
              )}
              {reference && (
                <span className={`inline-flex rounded-full border px-3 py-1 font-sans text-[10px] font-black uppercase tracking-[0.14em] ${theme.chip}`}>
                  {reference}
                </span>
              )}
              {itemType && (
                <span className={`inline-flex rounded-full border px-3 py-1 font-sans text-[10px] font-black uppercase tracking-[0.14em] ${theme.chip}`}>
                  {itemType}
                </span>
              )}
            </div>
          )}
          <p className="text-[15.5px] font-normal leading-7 text-slate-700">
            {renderGlossaryText(displayText, `${cardTitle}-${itemIndex}`)}
          </p>
        </div>
      </li>
    );
  };

  const renderLabeledSections = (sections, cardTitle) => {
    const theme = getCardTheme(cardTitle);
    return (
    <div className={`overflow-hidden rounded-2xl border bg-[#fffdf6]/72 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ${theme.border}`}>
      {sections.map((section, sectionIndex) => (
        <div
          key={`${section.label}-${sectionIndex}`}
          className={`grid gap-2 px-4 py-3 md:grid-cols-[9.5rem,1fr] md:gap-4 md:px-5 ${sectionIndex ? `border-t ${theme.border}` : ""}`}
        >
          <div className="md:pt-0.5">
            <span className={`inline-flex rounded-full border px-2.5 py-1 font-sans text-[9px] font-black uppercase tracking-[0.14em] ${theme.chip}`}>{section.label}</span>
          </div>
          <p className="text-[15px] font-normal leading-7 text-slate-700">{renderGlossaryText(section.content, `${cardTitle}-${sectionIndex}`)}</p>
        </div>
      ))}
    </div>
    );
  };

  const renderOutline = (outline, cardTitle) => {
    const theme = getCardTheme(cardTitle);
    return (
    <div className="space-y-3">
      <div className={`rounded-2xl border p-4 ${theme.themeBox}`}>
        <div className={`mb-1 font-sans text-[10px] font-black uppercase tracking-[0.18em] ${theme.label}`}>Theme</div>
        <p className="text-[16px] font-semibold leading-7 text-slate-800">{renderGlossaryText(outline.theme, `${cardTitle}-theme`)}</p>
      </div>
      <ol className="space-y-2.5 pl-5">
        {outline.items.map((item, itemIndex) => (
          <li key={`${item.label}-${itemIndex}`} className={`pl-1 text-[15.5px] font-normal leading-7 text-slate-700 marker:font-display marker:text-sm marker:font-bold ${theme.marker}`}>
            <span>{renderGlossaryText(item.label, `${cardTitle}-outline-${itemIndex}`)}</span>{" "}
            <span className={`font-sans text-xs font-black tracking-[0.08em] ${theme.label}`}>({item.range})</span>
          </li>
        ))}
      </ol>
    </div>
    );
  };

  const outlineLineLevel = (line) => {
    if (/^[IVXLCDM]+\.\s+/i.test(line)) return 0;
    if (/^[A-Z]\.\s+/.test(line)) return 1;
    if (/^\d+\.\s+/.test(line)) return 2;
    return 1;
  };

  const renderOutlineContent = (content, cardTitle) => {
    const theme = getCardTheme(cardTitle);
    const lines = String(content || "").split("\n").map((line) => line.trim()).filter(Boolean);
    const themeLine = lines.find((line) => /^Theme:/i.test(line));
    const outlineLines = lines.filter((line) => !/^Theme:/i.test(line));
    const levelClasses = {
      0: "mt-2 pl-0 text-[15.5px] font-medium leading-7 text-slate-800",
      1: "mt-1 pl-6 text-[14.5px] font-normal leading-7 text-slate-700",
      2: "mt-0.5 pl-10 text-[13.5px] font-normal leading-6 text-slate-600",
    };

    return (
      <div className="space-y-3">
        {themeLine && (
          <div className={`rounded-2xl border p-3.5 ${theme.themeBox}`}>
            <div className={`mb-1 font-sans text-[10px] font-black uppercase tracking-[0.18em] ${theme.label}`}>Theme</div>
            <p className="text-[15.5px] font-semibold leading-7 text-slate-800">{renderGlossaryText(themeLine.replace(/^Theme:\s*/i, ""), `${cardTitle}-theme-line`)}</p>
          </div>
        )}
        <div className="space-y-0">
          {outlineLines.map((line, index) => {
            const level = outlineLineLevel(line);
            return (
              <div key={`${line}-${index}`} className={`${levelClasses[level]} ${index === 0 ? "!mt-0" : ""}`}>
                {renderGlossaryText(line, `${cardTitle}-line-${index}`)}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderCardContent = (card) => {
    if (card.outline) {
      return renderOutline(card.outline, card.title);
    }

    if (card.title === "Brief Outline") {
      return renderOutlineContent(card.content, card.title);
    }

    if (Array.isArray(card.sections)) {
      if (card.sections.length === 0) return null;
      return renderLabeledSections(card.sections, card.title);
    }

    if (Array.isArray(card.items)) {
      if (numberedCards.has(card.title)) {
        return <ol className="list-decimal space-y-3 pl-5">{card.items.map((item, itemIndex) => renderNumberedItem(item, itemIndex, card.title))}</ol>;
      }

      const theme = getCardTheme(card.title);
      return (
        <ul className="list-disc space-y-3 pl-5">
          {card.items.map((item, itemIndex) => (
            <li key={itemIndex} className={`pl-1 text-[15.5px] font-normal leading-7 text-slate-700 ${theme.marker}`}>{renderGlossaryText(item, `${card.title}-item-${itemIndex}`)}</li>
          ))}
        </ul>
      );
    }

    const theme = getCardTheme(card.title);
    return String(card.content || "").split("\n").map((line, lineIndex) => {
      const clean = line.trim();
      if (!clean) return null;
      if (clean.startsWith("•") || clean.startsWith("-")) {
        return <li key={lineIndex} className={`mb-2.5 ml-5 list-disc pl-1 text-[15.5px] font-normal leading-7 text-slate-700 ${theme.marker}`}>{renderGlossaryText(clean.replace(/^[•-]\s*/, ""), `${card.title}-bullet-${lineIndex}`)}</li>;
      }
      return <p key={lineIndex} className="mb-3.5 text-[15.5px] font-normal leading-7 text-slate-700 last:mb-0">{renderGlossaryText(clean, `${card.title}-paragraph-${lineIndex}`)}</p>;
    });
  };

  const navItems = [
    ["intro", "Overview"],
    ["finder", "Finder"],
    ["canonical", "Books"],
    ["authors", "Authors"],
    ["taxonomy", "Genres"],
    ["themes", "Themes"],
    ["history", "History"],
  ];

  const introMoments = [
    {
      title: "What do you do with a heart that is too full, too afraid, too guilty, too angry, or too tired to speak?",
    },
    {
      title: "The Book of Psalms begins there.",
      body: "It gives words for joy, pain, confession, confusion, and faith reaching for light.",
    },
    {
      title: "The Psalms do not offer escape from real life, but worship in the middle of it.",
      body: "They lead from raw honesty to renewed trust, and finally toward Christ, where every cry and song finds its true center.",
      cta: true,
    },
  ];

  const introRevealClass = (index) =>
    visibleIntroSteps.includes(index)
      ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
      : "pointer-events-none translate-y-8 opacity-0 blur-sm";

  return (
    <div className="atlas-page font-sans">
      <div className="atlas-content">
        <nav className="atlas-top-strip">
          <button className="atlas-brand-button text-left" onClick={() => scrollJump("intro")} aria-label="Psalms Companion home">
            <span className="atlas-logo-mark" aria-hidden="true">
              <svg viewBox="0 0 64 64" role="img">
                <circle cx="32" cy="32" r="29" fill="url(#brandMarkGlow)" />
                <path d="M18 22.5c5.4-2.2 10.3-.9 14 3.8 3.7-4.7 8.6-6 14-3.8v24.2c-5.4-2.2-10.3-.9-14 3.8-3.7-4.7-8.6-6-14-3.8V22.5Z" fill="none" stroke="#fff3cf" strokeWidth="3.6" strokeLinejoin="round" />
                <path d="M32 26.3v24.2" stroke="#fff3cf" strokeWidth="3" strokeLinecap="round" />
                <path d="M20.5 18.2c3.5-3.1 7.6-4.7 11.5-4.7s8 1.6 11.5 4.7" fill="none" stroke="#c89335" strokeWidth="2.2" strokeLinecap="round" opacity="0.9" />
                <defs>
                  <radialGradient id="brandMarkGlow" cx="30%" cy="20%" r="80%">
                    <stop offset="0%" stopColor="#6f7d60" />
                    <stop offset="48%" stopColor="#26241c" />
                    <stop offset="100%" stopColor="#b97818" />
                  </radialGradient>
                </defs>
              </svg>
            </span>
            <span className="atlas-brand-title">Psalms Companion</span>
          </button>
          <div className="atlas-top-nav no-scrollbar" aria-label="Main navigation">
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => scrollJump(id)}>
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => scrollJump("deep-dive")} className="atlas-dark-button">Deep Dive</button>
        </nav>

        <main id="main-scroller" className="atlas-main custom-scrollbar">
          <div className="relative">
          <section id="intro" className="relative scroll-mt-28">
            <div className="relative min-h-[260vh]">
              <div className="sticky top-6 z-10 overflow-hidden rounded-lg border border-[#e5d8c2] bg-[rgba(255,248,234,0.88)] shadow-[0_24px_80px_rgba(45,35,24,0.12)] backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(101,119,92,0.1),transparent_34%),radial-gradient(circle_at_86%_84%,rgba(185,120,24,0.13),transparent_32%)]" />
                <div className="pointer-events-none absolute -right-28 -top-20 h-[34rem] w-[34rem] opacity-35 md:opacity-45">
                  <svg className="h-full w-full" viewBox="0 0 900 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <defs>
                      <linearGradient id="introSky" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fff8ea" />
                        <stop offset="52%" stopColor="#f5ead5" />
                        <stop offset="100%" stopColor="#e6cfaa" />
                      </linearGradient>
                      <linearGradient id="introSage" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#d8d2b3" stopOpacity="0.74" />
                        <stop offset="100%" stopColor="#65775c" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="introGold" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#ecd08a" stopOpacity="0.68" />
                        <stop offset="100%" stopColor="#b97818" stopOpacity="0.34" />
                      </linearGradient>
                      <linearGradient id="introIvory" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f6ead8" />
                        <stop offset="100%" stopColor="#d8c2ad" stopOpacity="0.44" />
                      </linearGradient>
                    </defs>
                    <rect width="900" height="900" fill="url(#introSky)" />
                    <g stroke="#fff4df" strokeWidth="14" strokeLinejoin="round" opacity="0.78">
                      <path d="M-80 90 180-40 330 190 60 330Z" fill="url(#introIvory)" />
                      <path d="M60 330 330 190 440 450 155 560Z" fill="#d9c89d" opacity="0.48" />
                      <path d="M330 190 610 30 735 330 440 450Z" fill="url(#introSage)" />
                      <path d="M610 30 980-40 880 310 735 330Z" fill="#f1e4cf" opacity="0.58" />
                      <path d="M735 330 880 310 1000 520 820 670Z" fill="url(#introGold)" />
                      <path d="M440 450 735 330 820 670 500 720Z" fill="#cdb79a" opacity="0.42" />
                      <path d="M155 560 440 450 500 720 190 940Z" fill="#f1dfb5" opacity="0.62" />
                      <path d="M500 720 820 670 980 950 420 980Z" fill="#eadbc6" opacity="0.72" />
                    </g>
                    <rect width="900" height="900" fill="#fff8ea" opacity="0.24" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#fff8ea] via-[#fff8ea]/92 to-[#f3ead6]/70" />

                <div className="relative z-10 flex min-h-[calc(100vh-3rem)] flex-col justify-center p-7 lg:p-14">
                  <div className="mx-auto max-w-4xl text-center">
                    <div className={`transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 ${introRevealClass(0)}`}>
                      <h1 className="font-display text-[clamp(2.45rem,5vw,4.05rem)] font-bold leading-[1.04] tracking-tight text-slate-950">
                        {introMoments[0].title}
                      </h1>
                    </div>

                    <div className={`mx-auto mt-10 max-w-3xl transition-all delay-100 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 ${introRevealClass(1)}`}>
                      <h2 className="font-display text-3xl font-bold tracking-tight text-[#6b5a35] lg:text-4xl">
                        {introMoments[1].title}
                      </h2>
                      <p className="mt-4 text-[19px] font-medium leading-9 text-slate-700 lg:text-[21px] lg:leading-10">
                        {introMoments[1].body}
                      </p>
                    </div>

                    <div className={`mx-auto mt-10 max-w-3xl transition-all delay-150 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 ${introRevealClass(2)}`}>
                      <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                        {introMoments[2].title}
                      </h2>
                      <p className="mt-4 text-[19px] font-medium leading-9 text-slate-700 lg:text-[21px] lg:leading-10">
                        {introMoments[2].body}
                      </p>
                      <button
                        onClick={() => scrollJump("finder")}
                        className="mt-8 rounded-md bg-[#171512] px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_16px_34px_rgba(45,35,24,0.22)] transition hover:-translate-y-0.5 hover:bg-[#5b3a25] focus:outline-none focus:ring-4 focus:ring-[#ecd08a]/45"
                      >
                        Explore Psalms
                      </button>
                    </div>
                  </div>
                  <div className={`pointer-events-none absolute left-1/2 top-[72%] flex -translate-x-1/2 flex-col items-center gap-3 text-center transition-all duration-500 sm:top-[70%] ${visibleIntroSteps.includes(2) ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}>
                    <span className="rounded-full border border-[#d8cfb4] bg-[#fff8ea]/90 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#6b5a35] shadow-[0_12px_30px_rgba(45,35,24,0.08)] backdrop-blur">
                      Scroll down to keep reading
                    </span>
                    <ChevronRight size={22} className="rotate-90 text-[#b97818]" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 z-0">
                {introMoments.map((moment, index) => (
                  <div
                    key={moment.title}
                    ref={(node) => {
                      introStepRefs.current[index] = node;
                    }}
                    data-intro-step={index}
                    className="h-[86vh]"
                  />
                ))}
              </div>
            </div>
          </section>

          <section id="finder" className="atlas-section atlas-shell scroll-mt-28">
            <div className="atlas-paper-card p-5 lg:p-7">
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg border border-[#d8cfb4] bg-[#f3ead6] text-[#8a5614] shadow-sm">
                    <Search size={22} />
                  </div>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-slate-950 lg:text-5xl">Psalm Finder</h2>
                  <p className="mt-3 max-w-2xl text-base font-medium leading-7 text-slate-600">
                    Search by number, theme, author, source, cross-reference, or a word that names what you are carrying.
                  </p>
                </div>
                <div className="rounded-lg border border-[#e5d1a4] bg-[#f7e7c2]/70 px-4 py-3 text-sm font-bold leading-6 text-[#7a4b14]">
                  {selectedPathway ? selectedPathway.title : selectedFilter ? `Filtering by ${selectedFilter.label}` : finderQuery ? `Searching for "${finderQuery}"` : "Suggested starting points"}
                </div>
              </div>

              <div className="atlas-finder-panel">
                <div className="atlas-finder-main p-4">
                  <div className="relative">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a5614]" />
                    <input
                      type="search"
                      value={finderQuery}
                      onChange={(event) => handleFinderQueryChange(event.target.value)}
                      placeholder="Try 23, forgiveness, Romans 4, lament, messianic..."
                      className="w-full rounded-lg border border-white bg-white py-4 pl-12 pr-4 text-base font-bold text-slate-900 shadow-inner outline-none transition placeholder:text-slate-400 focus:border-[#b97818] focus:ring-4 focus:ring-[#ecd08a]/35"
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {quickFilters.map((filter) => {
                      const isActive = finderFilter === filter.id;
                      return (
                        <button
                          key={filter.id}
                          onClick={() => handleQuickFilter(filter.id)}
                          className={`rounded-full border px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition hover:-translate-y-0.5 ${
                            isActive
                              ? "border-[#b97818] bg-[#b97818] text-white shadow-[0_10px_24px_rgba(185,120,24,0.22)]"
                              : "border-[#d8cfb4] bg-white text-[#6f675d] hover:border-[#b97818] hover:text-[#8a5614]"
                          }`}
                        >
                          {filter.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="atlas-finder-side p-4">
                  <div className="mb-3 flex items-center gap-2 text-[#8a5614]">
                    <Flame size={17} />
                    <h3 className="text-[11px] font-black uppercase tracking-[0.16em]">Theme Pathways</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {themePathways.map((pathway) => {
                      const isActive = activePathway === pathway.id;
                      return (
                        <button
                          key={pathway.id}
                          onClick={() => handlePathway(pathway.id)}
                          className={`rounded-lg border p-3 text-left transition hover:-translate-y-0.5 ${
                            isActive
                              ? "border-[#b97818] bg-white shadow-[0_14px_30px_rgba(185,120,24,0.16)]"
                              : "border-white/80 bg-white/70 hover:border-[#d8cfb4] hover:bg-white"
                          }`}
                        >
                          <span className="block text-sm font-black leading-5 text-slate-900">{pathway.title}</span>
                          <span className="mt-1 block text-xs font-medium leading-5 text-slate-500">{pathway.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-xl font-bold text-slate-950">
                    {finderResults.length ? `${finderResults.length} psalm${finderResults.length === 1 ? "" : "s"} found` : "No psalms found"}
                  </h3>
                  {(finderQuery || finderFilter || activePathway) && (
                    <button
                      onClick={() => {
                        setFinderQuery("");
                        setFinderFilter(null);
                        setActivePathway(null);
                        resetFinderList();
                      }}
                      className="self-start rounded-md border border-slate-200 bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] text-slate-500 transition hover:border-[#d8cfb4] hover:text-[#8a5614] sm:self-auto"
                    >
                      Clear Finder
                    </button>
                  )}
                </div>

                {finderResults.length ? (
                  <>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {visibleFinderResults.map((result) => (
                        <div key={result.psalm} className="group rounded-xl border border-white/80 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(15,23,42,0.1)]">
                          <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                              <h4 className="font-display text-2xl font-bold tracking-tight text-slate-950">Psalm {result.psalm}</h4>
                              <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-400">{result.canonical}</p>
                            </div>
                            <button
                              aria-label={`Study Psalm ${result.psalm}`}
                              onClick={() => loadPsalmBrief(result.psalm)}
                              className="rounded-md bg-slate-950 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-sm transition hover:bg-[#5b3a25]"
                            >
                              Study Psalm
                            </button>
                          </div>
                          <div className="mb-3 flex flex-wrap gap-2">
                            {(result.matchLabels.length ? result.matchLabels : result.summaryLabels).map((label) => (
                              <span key={`${result.psalm}-${label}`} className="rounded-full border border-[#d8cfb4] bg-[#f3ead6] px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#6f675d]">
                                {label}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm font-medium leading-6 text-slate-600">
                            {[result.authors[0], result.genres[0], result.themes[0]].filter(Boolean).join(" • ") || "Static study brief available"}
                          </p>
                        </div>
                      ))}
                    </div>

                    {finderResults.length > visibleFinderCount && (
                      <div className="mt-5 flex justify-center">
                        <button
                          onClick={() => setVisibleFinderCount((count) => count + 12)}
                          className="rounded-md border border-[#d8cfb4] bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-[#8a5614] shadow-sm transition hover:-translate-y-0.5 hover:border-[#b97818] hover:bg-[#f7e7c2]/55"
                        >
                          Show More
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm font-bold text-slate-500">
                    Try a different word, source name, verse reference, or psalm number.
                  </div>
                )}
              </div>
            </div>
          </section>

          <section id="canonical" className="atlas-section atlas-band-dark scroll-mt-28">
            <div className="atlas-shell">
            <h2 className="font-display mb-5 flex items-center gap-3 text-4xl font-normal tracking-tight text-white lg:text-6xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#d2d6df] bg-[#eef0f2] shadow-sm"><Layers className="text-[#59687a]" size={22}/></div>
              Canonical Distribution
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="flex flex-col rounded-lg border border-white/80 bg-white/85 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur lg:col-span-7">
                <div className="mb-6 min-h-[320px] flex-1"><canvas ref={canonicalChartRef}></canvas></div>
                <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-5">
                  {canonicalBooksData.map(book => (
                    <button key={book.id} className="group flex flex-col rounded-md border border-[#d8cfb4] bg-gradient-to-br from-white to-[#f3ead6]/60 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#b97818] hover:bg-slate-950" onClick={() => setExplorerData({type: "canonical", data: book})}>
                      <span className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 transition-colors group-hover:text-white/60">{book.title}</span>
                      <span className="text-sm font-black text-slate-800 transition-colors group-hover:text-white">{book.role}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5"><ExplorerCard data={explorerData.type === "canonical" ? explorerData.data : null} type="canonical" onPsalmClick={loadPsalmBrief} /></div>
            </div>
            </div>
          </section>

          <ProfileSection id="authors" icon={<Users className="text-[#65775c]" size={22}/>} iconBg="border-[#cfdbc9] bg-[#edf2e5]" title="Authorial Profiles" chartRef={authChartRef} buttons={authorshipData} buttonLabel={(a) => a.name} onPick={(a) => setExplorerData({type: "auth", data: a})} cardType="auth" explorerData={explorerData} onPsalmClick={loadPsalmBrief} />

          <ProfileSection id="taxonomy" icon={<Compass className="text-[#9b5b3b]" size={22}/>} iconBg="border-[#e2c9b8] bg-[#f3e2d6]" title="Literary Genres" chartRef={genreChartRef} buttons={genresData} buttonLabel={(g) => g.title} onPick={(g) => setExplorerData({type: "genre", data: g})} cardType="genre" explorerData={explorerData} onPsalmClick={loadPsalmBrief} />

          <section id="themes" className="atlas-section atlas-shell scroll-mt-28">
            <h2 className="font-display mb-5 flex items-center gap-3 text-4xl font-normal tracking-tight text-slate-950 lg:text-6xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5d1a4] bg-[#f7e7c2] shadow-sm"><LayoutGrid className="text-[#8a5614]" size={22}/></div>
              Theological Matrix
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
                {themeCategories.map((cat, i) => (
                  <div key={i} className={`flex h-full flex-col rounded-lg border p-5 shadow-[0_16px_38px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,23,42,0.1)] ${cat.color}`}>
                    <div className="mb-5 flex items-center gap-3 border-b border-slate-200/60 pb-4">
                      <div className="rounded-md bg-white p-2 shadow-sm">{cat.icon}</div>
                      <h4 className="text-xs font-black uppercase tracking-[0.14em] text-slate-800">{cat.group}</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {cat.terms.map((t, ti) => (
                        <button key={ti} onClick={() => setExplorerData({ type: "theme", data: { name: t.label, role: cat.group, bio: `A core concept emphasizing ${t.label} within the Psalter's theological structure.`, psalms: t.psalms } })} className="rounded-md border border-white/80 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.1em] shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-950 hover:text-white">{t.label}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="lg:col-span-5"><ExplorerCard data={explorerData.type === "theme" ? explorerData.data : null} type="theme" onPsalmClick={loadPsalmBrief} /></div>
            </div>
          </section>

          <section id="history" className="atlas-section atlas-shell scroll-mt-28">
            <h2 className="font-display mb-5 flex items-center gap-3 text-4xl font-normal tracking-tight text-slate-950 lg:text-6xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5d1a4] bg-[#f7e7c2] shadow-sm"><History className="text-[#8a5614]" size={22}/></div>
              History
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="flex flex-col rounded-lg border border-white/80 bg-white/85 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur lg:col-span-7">
                <div className="mb-6 min-h-[320px] flex-1"><canvas ref={eraChartRef}></canvas></div>
                <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
                  {erasData.map(e => (
                    <button key={e.id} className="group flex flex-col rounded-md border border-[#d8cfb4] bg-gradient-to-br from-white to-[#f3ead6]/60 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#b97818] hover:bg-slate-950" onClick={() => setExplorerData({type: "era", data: e})}>
                      <span className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 transition-colors group-hover:text-white/60">{e.title}</span>
                      <span className="text-sm font-black text-slate-800 transition-colors group-hover:text-white">{e.years}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5"><ExplorerCard data={explorerData.type === "era" ? explorerData.data : null} type="era" onPsalmClick={loadPsalmBrief} /></div>
            </div>
          </section>

          <section id="deep-dive" className="atlas-section atlas-study-reader relative z-10 scroll-mt-28">
            <div className="atlas-shell atlas-reader-shell">
              <aside className="atlas-reader-aside">
                <div className="relative mb-5 overflow-hidden rounded-[1.1rem] border border-white/10 bg-transparent p-0 text-white">
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(155,91,59,0.22),transparent_34%),linear-gradient(315deg,rgba(185,120,24,0.18),transparent_32%)]" />
                  <div className="relative z-10 flex items-center gap-4 text-left">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.85rem] border border-white/15 bg-white/10 text-[#ecd08a] shadow-inner">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <p className="mb-1 font-sans text-[10px] font-black uppercase tracking-[0.2em] text-[#ecd08a]">Study Reader</p>
                      <h2>Psalms Deep Dive</h2>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mb-5 flex flex-col gap-2 rounded-[1rem] border border-white/10 bg-white/10 p-2.5 shadow-inner">
                  <div className="relative flex-1">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl font-black text-[#ecd08a]">#</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={activePsalm}
                      onChange={(e) => setActivePsalm(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          loadPsalmBrief();
                        }
                      }}
                      className="w-full rounded-[0.85rem] border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-xl font-black text-white shadow-inner outline-none transition placeholder:text-white/40 focus:border-[#ecd08a] focus:ring-4 focus:ring-[#ecd08a]/10"
                    />
                  </div>
                  <button onClick={() => loadPsalmBrief()} className="atlas-gold-button w-full">Study Psalm</button>
                </div>

                {error && <div className="relative z-10 mb-5 rounded-[0.85rem] border border-[#e5d1a4] bg-[#f7e7c2] px-4 py-3 text-sm font-bold text-[#7a4b14]">{error}</div>}

                {brief && (
                    <div className="relative z-10 flex flex-col gap-2">
                      {deepDiveTocItems.map(([title, label]) => (
                        <button
                          aria-label={`Jump to ${title}`}
                          key={title}
                          onClick={() => scrollJump(cardAnchorId(title))}
                          className="rounded-xl px-3 py-2 text-left text-[10px] font-black uppercase tracking-[0.12em] text-white/65 transition hover:bg-[#ecd08a] hover:text-slate-950"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                )}
              </aside>

              <div className="relative z-10">
                {brief && (
                    <div className="grid grid-cols-1 gap-3.5">
                      {brief.cards.map((card, idx) => {
                        const theme = getCardTheme(card.title);
                        const shortLabel = deepDiveTocItems.find(([title]) => title === card.title)?.[1] || "Study";
                        const sectionNumber = String(idx + 1).padStart(2, "0");
                        return (
                        <div id={cardAnchorId(card.title)} key={idx} className={`atlas-reader-card group relative scroll-mt-28 overflow-visible ${theme.border} ${theme.card} transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(45,35,24,0.14)]`}>
                          <div className={`atlas-card-accent absolute left-0 top-0 z-[2] h-1.5 w-full ${theme.rail}`} />
                          <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-5 lg:px-6 lg:pt-6">
                            <div className="flex items-start gap-3.5">
                              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-[#fffdf6]/90 shadow-[0_10px_22px_rgba(45,35,24,0.08)] ${theme.border}`}>
                                {cardIcons[card.title] || <Info size={20} className="text-[#65775c]"/>}
                              </div>
                              <div>
                                <p className={`mb-1 font-sans text-[10px] font-black uppercase tracking-[0.18em] ${theme.label}`}>Section {sectionNumber}</p>
                                <h3 className="font-display text-[28px] font-normal leading-none tracking-[-0.035em] text-slate-950 lg:text-[34px]">{card.title}</h3>
                              </div>
                            </div>
                            <span className={`hidden shrink-0 rounded-full border px-3 py-1.5 font-sans text-[9px] font-black uppercase tracking-[0.16em] sm:inline-flex ${theme.chip}`}>
                              {shortLabel}
                            </span>
                          </div>
                          <div className={`mx-5 h-px bg-gradient-to-r from-transparent via-[#d8cfb4] to-transparent lg:mx-6`} />
                          <div className="font-reader px-5 pb-5 pt-4 text-slate-700 lg:px-6 lg:pb-6 lg:pt-5">
                            {renderCardContent(card)}
                          </div>
                        </div>
                        );
                      })}
                    </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      {glossaryTooltip && (
        <div
          className="pointer-events-none fixed z-[9999] rounded-xl border border-slate-200 bg-white p-4 text-left font-sans text-slate-700 opacity-100 shadow-[0_18px_46px_rgba(15,23,42,0.18)]"
          style={{
            left: `${glossaryTooltip.x}px`,
            top: `${glossaryTooltip.y}px`,
            width: `${glossaryTooltip.width}px`,
            transform: glossaryTooltip.placement === "below" ? "translateX(-50%)" : "translate(-50%, -100%)",
          }}
        >
          <span className="mb-1 block text-[11px] font-black uppercase tracking-[0.16em] text-[#8a5614]">{glossaryTooltip.title}</span>
          <span className="block text-sm font-medium leading-6">{glossaryTooltip.definition}</span>
        </div>
      )}
      </div>
    </div>
  );
};

const ProfileSection = ({ id, icon, iconBg, title, chartRef, buttons, buttonLabel, onPick, cardType, explorerData, onPsalmClick }) => (
  <section id={id} className="atlas-section atlas-shell scroll-mt-28">
    <h2 className="font-display mb-5 flex items-center gap-3 text-4xl font-normal tracking-tight text-slate-950 lg:text-6xl">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg border shadow-sm ${iconBg}`}>{icon}</div>
      {title}
    </h2>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="flex flex-col rounded-lg border border-white/80 bg-white/85 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur lg:col-span-7">
        <div className="mb-6 min-h-[320px] flex-1"><canvas ref={chartRef}></canvas></div>
        <div className="flex flex-wrap justify-center gap-2 border-t border-slate-100 pt-5">
          {buttons.map((item) => (
            <button key={item.id || item.title} onClick={() => onPick(item)} className="rounded-md border border-[#d8cfb4] bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b97818] hover:bg-[#5b3a25] hover:text-white">{buttonLabel(item)}</button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5"><ExplorerCard data={explorerData.type === cardType ? explorerData.data : null} type={cardType} onPsalmClick={onPsalmClick} /></div>
    </div>
  </section>
);

const ExplorerCard = ({ data, type, onPsalmClick }) => {
  if (!data) return (
    <div className="atlas-paper-card flex h-full min-h-[420px] flex-col items-center justify-center border-dashed p-8 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#d8cfb4] bg-[#f3ead6] text-[#b97818]">
        {type === "auth" ? <Users size={30}/> : type === "era" ? <History size={30}/> : type === "genre" ? <Compass size={30}/> : type === "canonical" ? <Layers size={30}/> : <LayoutGrid size={30}/>}
      </div>
      <h4 className="text-sm font-black uppercase tracking-[0.16em] text-slate-800">Selection Required</h4>
      <p className="mt-3 max-w-[260px] text-sm leading-6 text-slate-500">Select a category from the matrix to load the research profile.</p>
    </div>
  );

  const icons = { auth: <Users size={18}/>, era: <History size={18}/>, genre: <Compass size={18}/>, theme: <LayoutGrid size={18}/>, canonical: <Layers size={18}/> };
  const accentColors = {
    auth: "border-[#cfdbc9] bg-[#edf2e5] text-[#557052]",
    era: "border-[#d2d6df] bg-[#eef0f2] text-[#59687a]",
    genre: "border-[#e5d1a4] bg-[#f7e7c2] text-[#8a5614]",
    theme: "border-[#e5d1a4] bg-[#f7e7c2] text-[#8a5614]",
    canonical: "border-[#d2d6df] bg-[#eef0f2] text-[#59687a]",
  };

  return (
    <div className="atlas-paper-card relative flex h-full flex-col p-7">
      <div className="relative z-10 mb-7 border-b border-slate-100 pb-6">
        <h4 className="font-display mb-4 text-3xl font-bold leading-tight tracking-tight text-slate-950">{data.name || data.title}</h4>
        <div className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 ${accentColors[type] || accentColors.theme}`}>
          {icons[type]} <span className="text-[11px] font-black uppercase tracking-[0.14em]">{data.role || data.years || "Profile"}</span>
        </div>
      </div>
      <p className="mb-8 flex-1 text-base font-medium italic leading-8 text-slate-600">"{data.bio || data.desc}"</p>
      <div className="mt-auto relative z-10">
        <div className="mb-4 flex items-center gap-3 text-[#8a5614]"><Scroll size={16}/><h5 className="text-[11px] font-black uppercase tracking-[0.16em]">Canonical Index</h5></div>
        <div className="custom-scrollbar flex max-h-[220px] flex-wrap gap-2 overflow-y-auto pr-2">
          {data.psalms.map(p => (
            <button key={p} onClick={() => onPsalmClick(p)} className="rounded-md border border-[#d8cfb4] bg-white px-3 py-2 text-[11px] font-black uppercase tracking-[0.08em] text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-[#b97818] hover:bg-slate-950 hover:text-white">Ps {p}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

createRoot(document.getElementById("root")).render(<App />);
