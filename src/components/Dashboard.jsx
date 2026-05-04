import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Line, ComposedChart,
} from 'recharts';
import { CLIENT, STATS, HOURLY_DATA, WEEKLY_DATA, STOPLICHT } from '../data/clientData';

const HOUR_TICKS = HOURLY_DATA
  .filter((_, i) => i % 3 === 0)
  .map(d => d.t);

function PowerTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value} kW
        </div>
      ))}
    </div>
  );
}

function WeekTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div className="label">{label}</div>
      <div>{payload[0].value} kWh</div>
    </div>
  );
}

const STOPLICHT_ICON = { groen: '✅', oranje: '⚠️', rood: '🚫' };

export default function Dashboard() {
  const dataWithMax = HOURLY_DATA.map(d => ({ ...d, max: CLIENT.maxVermogen }));

  return (
    <div>
      {/* Stat cards */}
      <div className="stat-cards">
        <div className="stat-card blue">
          <div className="stat-label">Weekverbruik</div>
          <div className="stat-value">{STATS.weekverbruik} <small style={{ fontSize: 14, fontWeight: 400 }}>kWh</small></div>
          <div className="stat-sub">
            <span className="stat-badge up">{STATS.weekverbruikDelta}</span>
            vs. vorige week
          </div>
        </div>

        <div className="stat-card red">
          <div className="stat-label">Max. piekbelasting</div>
          <div className="stat-value" style={{ color: 'var(--red)' }}>
            {STATS.maxPiek} <small style={{ fontSize: 14, fontWeight: 400 }}>kW</small>
          </div>
          <div className="stat-sub">
            <span className="stat-badge red">{STATS.maxPiekBenutting}% benutting</span>
            {STATS.maxPiekMoment}
          </div>
        </div>

        <div className="stat-card orange">
          <div className="stat-label">Gem. benutting</div>
          <div className="stat-value" style={{ color: 'var(--orange)' }}>
            {STATS.gemBenutting}<small style={{ fontSize: 14, fontWeight: 400 }}>%</small>
          </div>
          <div className="stat-sub">Aansluiting {CLIENT.aansluiting}</div>
        </div>

        <div className="stat-card orange2">
          <div className="stat-label">BAC-klasse</div>
          <div className="stat-value" style={{ color: 'var(--orange)' }}>Klasse {STATS.bacKlasse}</div>
          <div className="stat-sub">
            <span className="stat-badge warn">GACS vereist klasse {STATS.bacDoel}</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-title">Vermogen vandaag</div>
          <div className="chart-sub">kW per uur · Max. aansluiting {CLIENT.maxVermogen} kW</div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={dataWithMax} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#013888" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#013888" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F8" />
              <XAxis
                dataKey="t"
                ticks={HOUR_TICKS}
                tick={{ fontSize: 10, fill: '#5A6779' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 20]}
                tick={{ fontSize: 10, fill: '#5A6779' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={v => `${v}`}
              />
              <Tooltip content={<PowerTooltip />} />
              <Area
                type="monotone"
                dataKey="kw"
                name="Vermogen"
                stroke="#013888"
                strokeWidth={2}
                fill="url(#blueGrad)"
                dot={false}
                activeDot={{ r: 4, fill: '#013888' }}
              />
              <Line
                type="monotone"
                dataKey="max"
                name="Max. aansluiting"
                stroke="#C0392B"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                dot={false}
                activeDot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-title">Dagverbruik afgelopen week</div>
          <div className="chart-sub">kWh per dag</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={WEEKLY_DATA} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF1F8" vertical={false} />
              <XAxis
                dataKey="dag"
                tick={{ fontSize: 11, fill: '#5A6779' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#5A6779' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<WeekTooltip />} />
              <Bar
                dataKey="kwh"
                name="Verbruik"
                fill="#013888"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stoplicht */}
      <div className="stoplicht-section">
        <div className="section-title">Beslishulp — is deze actie nu mogelijk?</div>
        <div className="section-sub">Gebaseerd op actuele aansluitingsdata en DKC-kennisbank</div>
        <div className="stoplicht-grid">
          {STOPLICHT.map(item => (
            <div key={item.label} className={`stoplicht-card ${item.status}`}>
              <span className="stoplicht-icon">{STOPLICHT_ICON[item.status]}</span>
              <div className="stoplicht-content">
                <div className="label">{item.label}</div>
                <div className="toelichting">{item.toelichting}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
