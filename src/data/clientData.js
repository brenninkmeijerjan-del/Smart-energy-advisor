export const CLIENT = {
  naam: "Klant A",
  type: "Kantoorpand",
  oppervlakte: 1800,
  bouwjaar: 2005,
  aansluiting: "3×125A",
  maxVermogen: 86,        // kW (3×125A @ 400V)
  contract: "S&O",
};

export const STATS = {
  weekverbruik: 2135,
  weekverbruikDelta: "+7%",
  maxPiek: 81.4,
  maxPiekMoment: "Di 14:00",
  maxPiekBenutting: 95,
  gemBenutting: 78,
  bacKlasse: "D",
  bacDoel: "C",           // GACS verplicht ≥70 kW nominaal
};

export const HOURLY_DATA = [
  { t: "00:00", kw: 6.2  }, { t: "01:00", kw: 5.8  }, { t: "02:00", kw: 5.4  },
  { t: "03:00", kw: 5.2  }, { t: "04:00", kw: 5.5  }, { t: "05:00", kw: 6.1  },
  { t: "06:00", kw: 12.4 }, { t: "07:00", kw: 28.6 }, { t: "08:00", kw: 45.8 },
  { t: "09:00", kw: 61.2 }, { t: "10:00", kw: 72.4 }, { t: "11:00", kw: 78.6 },
  { t: "12:00", kw: 65.8 }, { t: "13:00", kw: 71.4 }, { t: "14:00", kw: 81.4 },
  { t: "15:00", kw: 74.2 }, { t: "16:00", kw: 68.1 }, { t: "17:00", kw: 51.4 },
  { t: "18:00", kw: 32.6 }, { t: "19:00", kw: 19.2 }, { t: "20:00", kw: 14.8 },
  { t: "21:00", kw: 10.4 }, { t: "22:00", kw: 8.6  }, { t: "23:00", kw: 7.2  },
];

export const WEEKLY_DATA = [
  { dag: "Ma", kwh: 420 }, { dag: "Di", kwh: 435 }, { dag: "Wo", kwh: 410 },
  { dag: "Do", kwh: 440 }, { dag: "Vr", kwh: 365 }, { dag: "Za", kwh: 38  },
  { dag: "Zo", kwh: 27  },
];

export const STOPLICHT = [
  {
    label: "Laadplein uitbreiden (4 × 22 kW)",
    status: "rood",
    toelichting: "Aansluiting zit op 95% piekvermogen. Vier extra laadpunten voegen max. 88 kW toe — dat overschrijdt de aansluiting direct. Eerst dynamische laadsturing en eventueel verzwaring naar 3×160A.",
  },
  {
    label: "Dynamische laadsturing instellen",
    status: "groen",
    toelichting: "Softwarematig in te stellen op bestaande laadinfrastructuur. Verwachte piekvermindering 15–25% (12–20 kW). Direct uitvoerbaar door DKC zonder hardware-investering.",
  },
  {
    label: "Zonnepanelen 50 kWp",
    status: "oranje",
    toelichting: "Technisch haalbaar via AC-koppeling binnen 3×125A. Terugverdientijd ~7 jaar. Quickscan dak en oriëntatie vereist — aan te vragen bij DKC.",
  },
  {
    label: "GACS-compliance (BAC-klasse C)",
    status: "oranje",
    toelichting: "Pand valt boven 70 kW nominaal — GACS-verplichting is van toepassing (NEN-EN-ISO 52120). Huidige klasse D. Ontbreekt: IEQ-monitoring, energieflexibiliteitsrapportage en systeemkoppeling.",
  },
];

export const MOCK_RESPONSES = [
  {
    keys: ["laadpaal", "laadplein", "laden", "laad", "ev", "elektrisch"],
    antwoord: "Uitbreiding van het laadplein met vier palen van 22 kW is op dit moment niet verantwoord. Uw aansluiting bereikte dinsdag al 95% van het maximum (81.4 kW van 86 kW). Vier extra palen kunnen theoretisch 88 kW toevoegen — dat overschrijdt uw aansluiting direct. De eerste stap is dynamische laadsturing op de bestaande laadpalen. Daarna pas bekijken of verzwaring naar 3×160A zinvol is. Wilt u weten hoe dat in zijn werk gaat?"
  },
  {
    keys: ["laadstur", "dynamisch", "piek vermin", "peak"],
    antwoord: "Dynamische laadsturing regelt automatisch wanneer en hoe snel uw laadpalen laden op basis van de actuele netbelasting. Het systeem houdt het totaalvermogen onder uw aansluitlimiet van 86 kW. Bij uw pand verwachten we een piekvermindering van 15–25%, wat neerkomt op circa 12–20 kW minder piek. Dit is softwarematig in te stellen — geen nieuwe hardware nodig. DKC kan dit doorgaans binnen één dag realiseren."
  },
  {
    keys: ["gacs", "compliance", "verplichting", "epbd", "wet"],
    antwoord: "GACS is de verplichting uit de EPBD III voor gebouwautomatisering. Omdat uw installatie een nominaal vermogen heeft boven 70 kW, bent u verplicht minimaal BAC-klasse C te halen conform NEN-EN-ISO 52120. Uw pand staat momenteel op klasse D. U mist drie onderdelen: IEQ-monitoring (CO₂, temperatuur, luchtvochtigheid), energieflexibiliteitsrapportage en koppeling tussen klimaat- en energiesystemen. DKC kan alle drie realiseren als uitbreiding op uw S&O-contract."
  },
  {
    keys: ["bac", "klasse", "automatisering", "nen", "iso 52120"],
    antwoord: "De BAC-klassen (Building Automation and Control) lopen van A tot D, waarbij A de hoogste automatiseringsgraad is. Klasse C is het minimum dat GACS vereist voor panden boven 70 kW nominaal — zoals uw pand met 86 kW aansluiting. Op klasse C beschikt u over basisregeling van installaties, energiemeting per systeem en flexibiliteitscapaciteit. Voor uw 1.800 m² kantoor is klasse C haalbaar met een gerichte uitbreiding op uw bestaande installatie."
  },
  {
    keys: ["ieq", "co2", "binnenklimaat", "luchtkwaliteit", "temperatuur", "luchtvochtigheid"],
    antwoord: "IEQ-monitoring (Indoor Environmental Quality) meet continu CO₂-concentratie, temperatuur en luchtvochtigheid in uw pand. Dit is vereist voor BAC-klasse C en daarmee voor GACS-compliance. Voor een pand van 1.800 m² zijn doorgaans 6–10 sensoren nodig. DKC kan deze plaatsen als uitbreiding op het S&O-contract. Verwachte kosten: €2.500–€4.500 inclusief installatie en koppeling aan uw EMS."
  },
  {
    keys: ["congestie", "netcongestie", "liander", "net vol", "teruglevering"],
    antwoord: "Uw locatie valt in een aangewezen congestiegebied van Liander. Met een aansluiting van 3×125A bent u een grotere afnemer — Liander kan u actief benaderen voor flexibiliteitsdiensten. De goedkoopste eerste stap is tijdgestuurde schakeling van niet-kritische verbruikers, zoals luchtbehandeling buiten kantoortijden en het verschuiven van laadmomenten naar de nacht. Dit vermindert uw bijdrage aan de netbelasting en kan u in aanmerking laten komen voor congestievergoeding."
  },
  {
    keys: ["zon", "solar", "pv", "zonnepan", "panelen"],
    antwoord: "Zonnepanelen 50 kWp zijn haalbaar op uw locatie. Het systeem levert naar schatting 42.000 kWh per jaar op — circa 38% van uw huidige jaarverbruik. De installatie past via AC-koppeling binnen uw aansluiting van 3×125A. Terugverdientijd circa 6–8 jaar afhankelijk van dakconstructie en oriëntatie. DKC voert een quickscan uit om dit voor uw specifieke situatie door te rekenen. Wilt u dat aanvragen?"
  },
  {
    keys: ["kost", "prijs", "investering", "budget", "euro", "offerte"],
    antwoord: "Globale kostenrichtlijnen voor uw situatie: dynamische laadsturing €0–€800 (software-update). IEQ-monitoring 6–10 sensoren: €2.500–€4.500. Zonnepanelen 50 kWp: €35.000–€45.000 exclusief subsidie (SDE++ mogelijk). Aansluitverzwaring 3×125A naar 3×160A: €5.000–€12.000. GACS-uitbreiding klasse D naar C: €8.000–€15.000. Voor een exacte offerte op maat neemt DKC contact met u op."
  },
  {
    keys: ["wko", "warmtepomp", "installatie", "luchtbehandeling", "hvac"],
    antwoord: "Uw WKO-installatie draait stabiel. De luchtbehandeling is een aandachtspunt: op 1.800 m² is dit waarschijnlijk verantwoordelijk voor 20–30 kW van de piekbelasting op dinsdag om 14:00. Het is de moeite waard te bekijken of de luchtbehandeling buiten piekmomenten kan worden ingepland of met vraaggestuurde ventilatie kan worden geregeld — dit bespaart direct op de piekbelasting."
  },
  {
    keys: ["aansluiting", "verzwaren", "capaciteit", "uitbreiden", "vermogen", "160"],
    antwoord: "Aansluitverzwaring van 3×125A naar 3×160A geeft u circa 110 kW beschikbaar — ruimte voor laadpleinuitbreiding. Kosten: €5.000–€12.000. In uw congestiegebied zijn wachttijden van 6–18 maanden bij Liander niet ongebruikelijk. Dynamische laadsturing is de snellere en goedkopere eerste maatregel. Pas daarna is verzwaring aan de orde. DKC begeleidt u door het aanvraagproces bij Liander."
  },
];

export const MOCK_RAPPORT = `## Samenvatting
Klant A benut de 3×125A-aansluiting (86 kW) structureel op 78% en bereikte dinsdag een piek van 81.4 kW — 95% van het aansluitmaximum. Met een nominaal geïnstalleerd vermogen boven 70 kW valt dit pand onder de GACS-verplichting (EPBD III). De huidige BAC-klasse D voldoet niet aan het vereiste minimum van klasse C conform NEN-EN-ISO 52120. Twee maatregelen zijn direct uitvoerbaar: dynamische laadsturing en IEQ-monitoring.

## Huidige situatie
Het weekverbruik van 2.135 kWh ligt 7% hoger dan vorige week. De piekbelasting op dinsdag om 14:00 wordt waarschijnlijk veroorzaakt door gelijktijdig gebruik van de laadinfrastructuur in combinatie met de luchtbehandeling op vol vermogen. De WKO-installatie draait stabiel en levert een positieve bijdrage aan de energiebalans.

## Top 3 adviezen
1. Dynamische laadsturing instellen op de laadinfrastructuur — softwarematig uitvoerbaar, verwachte piekvermindering 15–25% (circa 12–20 kW), geen hardware-investering vereist.
2. IEQ-monitoring installeren (CO₂, temperatuur, luchtvochtigheid) — vereist voor BAC-klasse C en GACS-compliance. Voor 1.800 m² zijn 6–10 sensoren nodig; uitvoerbaar als uitbreiding op het S&O-contract.
3. Quickscan zonnepanelen 50 kWp aanvragen — past binnen huidige aansluiting, verwacht jaarrendement 42.000 kWh, terugverdientijd circa 6–8 jaar.

## GACS & Compliance (NEN-EN-ISO 52120)
Huidige BAC-klasse: D. Vereist voor GACS-compliance: klasse C. Uw pand valt boven de 70 kW-drempel, waardoor de GACS-verplichting van kracht is. Ontbrekend: IEQ-monitoring, energieflexibiliteitsrapportage en systeemkoppeling tussen klimaat- en energiebeheer. DKC kan alle drie onderdelen realiseren als uitbreiding op het bestaande S&O-contract. Geschatte investering voor klasse D → C: €8.000–€15.000.

## Aanbevolen volgende stap
Plan een gesprek met DKC over het instellen van dynamische laadsturing op de bestaande laadinfrastructuur én het opstellen van een GACS-actieplan. De combinatie van beide geeft u direct resultaat op de piekbelasting én zet u op het juiste pad richting compliance.`;
