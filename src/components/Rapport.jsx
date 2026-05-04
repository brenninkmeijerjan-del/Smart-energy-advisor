import { useState, useEffect, useRef } from 'react';
import { MOCK_RAPPORT } from '../data/clientData';
import { RAPPORT_PROMPT, SYSTEM_PROMPT } from '../data/systemPrompt';

const USE_LIVE_AI = Boolean(import.meta.env.VITE_ANTHROPIC_API_KEY);

function parseMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ol key={key++} style={{ paddingLeft: 20, marginBottom: 12 }}>
          {listItems.map((li, i) => (
            <li key={i} style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)', marginBottom: 4 }}>
              {li}
            </li>
          ))}
        </ol>
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={key++} style={{
          fontSize: 17,
          fontWeight: 700,
          color: 'var(--blue)',
          margin: '24px 0 8px',
        }}>
          {trimmed.slice(3)}
        </h2>
      );
    } else if (/^\d+\./.test(trimmed)) {
      listItems.push(trimmed.replace(/^\d+\.\s*/, ''));
    } else {
      flushList();
      elements.push(
        <p key={key++} style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text)', marginBottom: 8 }}>
          {trimmed}
        </p>
      );
    }
  }

  flushList();
  return elements;
}

async function fetchRapport() {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
      'anthropic-dangerous-direct-browser-calls': 'true',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: RAPPORT_PROMPT }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

export default function Rapport() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchedRef = useRef(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      if (USE_LIVE_AI) {
        const text = await fetchRapport();
        setContent(text);
      } else {
        await new Promise(r => setTimeout(r, 1500));
        setContent(MOCK_RAPPORT);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      load();
    }
  }, []);

  return (
    <div>
      <div className="rapport-header">
        <h2>Energierapport — Klant A</h2>
        <button className="btn-refresh" onClick={load} disabled={loading}>
          {loading ? (
            <>
              <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
              Laden…
            </>
          ) : '↻ Vernieuwen'}
        </button>
      </div>

      <div className="rapport-card">
        {loading && (
          <div className="rapport-loading">
            <div className="spinner" />
            <span>Rapport wordt gegenereerd…</span>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--red)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>Rapport kon niet worden geladen</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>{error}</div>
          </div>
        )}

        {!loading && !error && content && (
          <div className="rapport-body">
            {parseMarkdown(content)}
          </div>
        )}
      </div>
    </div>
  );
}
