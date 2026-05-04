export const CLIENT = {
  naam: "Klant A",
  type: "Kantoorpand",
  oppervlakte: 450,
  bouwjaar: 1998,
  aansluiting: "3×25A",
  maxVermogen: 17,
  contract: "S&O",
};

export const STATS = {
  weekverbruik: 460,
  weekverbruikDelta: "+5%",
  maxPiek: 16.8,
  maxPiekMoment: "Di 14:00",
  maxPiekBenutting: 99,
  gemBenutting: 84,
  bacKlasse: "D",
  bacDoel: "C",
};

export const HOURLY_DATA = [
  { t: "00:00", kw: 1.2 }, { t: "01:00", kw: 0.9 }, { t: "02:00", kw: 0.8 },
  { t: "03:00", kw: 0.8 }, { t: "04:00", kw: 0.9 }, { t: "05:00", kw: 1.1 },
  { t: "06:00", kw: 2.4 }, { t: "07:00", kw: 5.8 }, { t: "08:00", kw: 9.2 },
  { t: "09:00", kw: 12.1 }, { t: "10:00", kw: 14.3 }, { t: "11:00", kw: 15.9 },
  { t: "12:00", kw: 13.2 }, { t: "13:00", kw: 14.7 }, { t: "14:00", kw: 16.8 },
  { t: "15:00", kw: 15.4 }, { t: "16:00", kw: 13.8 }, { t: "17:00", kw: 10.2 },
  { t: "18:00", kw: 6.1 },  { t: "19:00", kw: 3.8 },  { t: "20:00", kw: 2.9 },
  { t: "21:00", kw: 2.1 },  { t: "22:00", kw: 1.8 },  { t: "23:00", kw: 1.4 },
];

export const WEEKLY_DATA = [
  { dag: "Ma", kwh: 89 }, { dag: "Di", kwh: 92 }, { dag: "Wo", kwh: 87 },
  { dag: "Do", kwh: 94 }, { dag: "Vr", kwh: 78 }, { dag: "Za", kwh: 11 },
  { dag: "Zo", kwh: 9  },
];

export const STOPLICHT = [
  {
    label: "Extra laadpaal (11 kW) plaatsen",
    status: "rood",
    toelichting: "Aansluiting zit op 99% piekvermogen. Plaatsing zonder aansluitverzwaring of laadsturingoptimalisatie is niet verantwoord.",
  },
  {
    label: "Dynamische laadsturing instellen",
    status: "groen",
    toelichting: "Softwarematig in te stellen op bestaande laadpalen. Verwachte piekvermindering 15–25%. Direct uitvoerbaar door DKC.",
  },
  {
    label: "Zonnepanelen 15 kWp",
    status: "groen",
    toelichting: "Past binnen huidige aansluiting via AC-koppeling. Terugverdientijd ~8 jaar. Quickscan aan te vragen bij DKC.",
  },
  {
    label: "GACS-compliance (BAC-klasse C)",
    status: "oranje",
    toelichting: "Huidige situatie: BAC-klasse D. Voor GACS is klasse C vereist (NEN-EN-ISO 52120). Ontbreekt: IEQ-monitoring en energieflexibiliteitsrapportage.",
  },
];

export const MOCK_RESPONSES = [
  {
    keys: ["laadpaal", "laden", "laad", "ev", "elektrisch"],
    antwoord: "Een extra laadpaal van 11 kW is op dit moment niet verantwoord zonder aanvullende maatregelen. Uw aansluiting bereikte dinsdag al 99% van het maximum. De eerste stap is dynamische laadsturing op de twee bestaande laadpalen — daarmee daalt de piekbelasting met naar schatting 15–25% en ontstaat er ruimte. Wilt u weten hoe dat in zijn werk gaat?"
  },
  {
    keys: ["laadstur", "dynamisch", "piek vermin", "peak"],
    antwoord: "Dynamische laadsturing regelt automatisch wanneer en hoe snel uw laadpalen laden op basis van de actuele netbelasting. Het systeem houdt het totaalvermogen onder uw aansluitlimiet door het laadtempo te variëren. In de praktijk betekent dit dat voertuigen iets langer laden maar de netbelasting significant lager blijft. Dit is softwarematig in te stellen op uw bestaande laadpalen — geen nieuwe hardware nodig."
  },
  {
    keys: ["gacs", "compliance", "verplichting", "epbd", "wet"],
    antwoord: "GACS staat voor de verplichting uit de EPBD III om gebouwautomatisering op een minimaal niveau te hebben. De mate van automatisering wordt uitgedrukt in BAC-klassen A t/m D conform NEN-EN-ISO 52120, waarbij klasse A het hoogst is. Voor GACS is minimaal klasse C vereist. Uw pand staat momenteel op klasse D. U mist twee dingen: IEQ-monitoring (CO₂, temperatuur, luchtvochtigheid) en een energieflexibiliteitsrapportage. DKC kan beide realiseren."
  },
  {
    keys: ["bac", "klasse", "automatisering", "nen", "iso 52120"],
    antwoord: "De BAC-klassen (Building Automation and Control) lopen van A tot D, waarbij A de hoogste automatiseringsgraad is. Klasse C is het minimum dat GACS vereist. Op klasse C beschikt u over basisregeling van installaties, energiemeting per systeem, en enige flexibiliteitscapaciteit. Op klasse A heeft u volledige geïntegreerde energiesturing met real-time optimalisatie. Voor uw pand is klasse C het realistisch haalbare doel op korte termijn."
  },
  {
    keys: ["ieq", "co2", "binnenklimaat", "luchtkwaliteit", "temperatuur", "luchtvochtigheid"],
    antwoord: "IEQ-monitoring (Indoor Environmental Quality) meet continu de luchtkwaliteit in uw pand: CO₂-concentratie, temperatuur en luchtvochtigheid. Dit is enerzijds vereist voor BAC-klasse C (GACS), anderzijds waardevol voor het welzijn van de gebruikers. DKC kan sensoren plaatsen als uitbreiding op uw bestaande S&O-contract. Verwachte kosten: €800–€1.500 inclusief installatie en koppeling aan uw EMS."
  },
  {
    keys: ["congestie", "netcongestie", "liander", "net vol", "teruglevering"],
    antwoord: "Uw locatie valt in een aangewezen congestiegebied van Liander. Dit betekent dat de netbeheerder in periodes van hoge netbelasting kan vragen om uw verbruik te beperken. De goedkoopste eerste stap is tijdgestuurde schakeling op niet-kritische verbruikers — zoals de luchtbehandeling buiten kantoortijden. Dit vermindert uw bijdrage aan de netbelasting zonder dat u iets hoeft te investeren in hardware."
  },
  {
    keys: ["zon", "solar", "pv", "zonnepan", "panelen"],
    antwoord: "Zonnepanelen 15 kWp zijn haalbaar op uw locatie. Het systeem levert naar schatting 12.500 kWh per jaar op, wat neerkomt op circa 27% van uw huidige jaarverbruik. De installatie past via AC-koppeling binnen uw huidige aansluiting van 3×25A. Terugverdientijd circa 7–9 jaar afhankelijk van de exacte dakconstructie en oriëntatie. DKC voert een quickscan uit om dit voor uw specifieke situatie door te rekenen."
  },
  {
    keys: ["kost", "prijs", "investering", "budget", "euro", "offerte"],
    antwoord: "Ik zet de globale kostenrichtlijnen voor u op een rij: dynamische laadsturing is veelal een software-update op uw bestaande laadpalen (€0–€500 afhankelijk van het merk). IEQ-monitoring: €800–€1.500 inclusief installatie. Zonnepanelen 15 kWp: €12.000–€16.000 exclusief subsidie. Aansluitverzwaring naar 3×35A: €3.000–€8.000 afhankelijk van netbeheerder. Voor een exacte offerte neemt DKC contact met u op."
  },
  {
    keys: ["wko", "warmtepomp", "installatie", "luchtbehandeling", "hvac"],
    antwoord: "Uw WKO-installatie draait stabiel en geeft op dit moment geen aanleiding tot bijsturing. De luchtbehandeling is wel een aandachtspunt: deze draait mee tijdens de piekbelasting op dinsdag om 14:00. Het is de moeite waard om te bekijken of de luchtbehandeling buiten piekmomenten kan worden ingepland — dit bespaart direct op de piekbelasting zonder comfort te verliezen."
  },
  {
    keys: ["aansluiting", "verzwaren", "capaciteit", "uitbreiden", "vermogen"],
    antwoord: "Aansluitverzwaring (van 3×25A naar bijvoorbeeld 3×35A) is een optie maar niet de eerste stap die DKC adviseert. Het is kostbaar (€3.000–€8.000) en in uw congestiegebied is het de vraag of Liander dit op korte termijn kan realiseren. Dynamische laadsturing lost een groot deel van het probleem op zonder verzwaring. Pas als u daarna structureel meer capaciteit nodig heeft is verzwaring aan de orde."
  },
];

export const MOCK_RAPPORT = `## Samenvatting
Klant A benut de aansluiting structureel op 84% en bereikte dinsdag een piek van 16.8 kW — slechts 0.2 kW onder het aansluitmaximum van 17 kW. De huidige BAC-klasse D voldoet niet aan de GACS-verplichting (minimum klasse C conform NEN-EN-ISO 52120). Twee maatregelen zijn direct uitvoerbaar: dynamische laadsturing en een quickscan voor zonnepanelen.

## Huidige situatie
Het weekverbruik van 460 kWh ligt 5% hoger dan vorige week. De piekbelasting op dinsdag om 14:00 is waarschijnlijk veroorzaakt door gelijktijdig gebruik van beide laadpalen in combinatie met de luchtbehandeling op vol vermogen. De WKO-installatie draait stabiel.

## Top 3 adviezen
1. Dynamische laadsturing instellen op beide laadpalen — softwarematig uitvoerbaar, verwachte piekvermindering 15–25%, geen hardware-investering vereist.
2. IEQ-monitoring installeren (CO₂, temperatuur, luchtvochtigheid) — vereist voor BAC-klasse C en verbetering van het binnenklimaat. Uitvoerbaar als uitbreiding op het bestaande S&O-contract.
3. Quickscan zonnepanelen 15 kWp aanvragen — past binnen huidige aansluiting, terugverdientijd circa 8 jaar.

## GACS & Compliance (NEN-EN-ISO 52120)
Huidige BAC-klasse: D. Vereist voor GACS-compliance: klasse C. Ontbrekend: IEQ-monitoring en energieflexibiliteitsrapportage. DKC kan beide realiseren als uitbreiding op het S&O-contract.

## Aanbevolen volgende stap
Plan een gesprek met DKC over het instellen van dynamische laadsturing op de bestaande laadpalen. Dit is de snelste maatregel om de aansluitingsproblemen te verkleinen zonder extra hardware-investering.`;
