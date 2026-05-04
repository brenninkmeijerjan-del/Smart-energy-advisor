import { useState, useRef, useEffect } from 'react';
import { MOCK_RESPONSES } from '../data/clientData';
import { SYSTEM_PROMPT } from '../data/systemPrompt';

const USE_LIVE_AI = Boolean(import.meta.env.VITE_ANTHROPIC_API_KEY);

const SUGGESTIONS = [
  'Kan ik nu een extra laadpaal plaatsen?',
  'Wat moet ik doen voor GACS-compliance?',
  'Wat levert dynamische laadsturing op?',
  'Wat zijn de gevolgen van netcongestie voor mij?',
];

const FALLBACK = 'Dat is een goede vraag die ik graag beantwoord op basis van uw specifieke installatie. Op dit moment is de meest urgente actie het instellen van dynamische laadsturing — dit heeft de snelste impact op uw aansluitingsprobleem. Wilt u daar meer over weten, of heeft u een andere vraag?';

const OPENING = 'Goedemiddag. Ik heb uw EMS-data van de afgelopen week geanalyseerd. Uw aansluiting bereikte dinsdag een piek van 16.8 kW — dat is 99% van uw aansluitcapaciteit. Er zijn twee maatregelen die u direct kunt nemen. Wat wilt u weten?';

function getMockResponse(input) {
  const lower = input.toLowerCase();
  for (const item of MOCK_RESPONSES) {
    if (item.keys.some(k => lower.includes(k))) {
      return item.antwoord;
    }
  }
  return FALLBACK;
}

async function fetchAI(messages) {
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
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

function formatTime(date) {
  return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}

export default function Adviseur() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: OPENING, time: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const send = async (text) => {
    const userText = (text ?? input).trim();
    if (!userText || typing) return;

    const userMsg = { role: 'user', content: userText, time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      let replyText;
      if (USE_LIVE_AI) {
        const history = [...messages, userMsg]
          .map(m => ({ role: m.role, content: m.content }));
        replyText = await fetchAI(history);
      } else {
        await new Promise(r => setTimeout(r, 900 + Math.random() * 600));
        replyText = getMockResponse(userText);
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: replyText, time: new Date() },
      ]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `Er is een fout opgetreden: ${e.message}`,
          time: new Date(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const handleSuggestion = (s) => {
    setInput(s);
    inputRef.current?.focus();
  };

  return (
    <div className="adviseur-wrapper">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-text">
          <h2>DKC Energieadviseur</h2>
          <p>Kent uw installatiedata — stel gerust specifieke vragen</p>
        </div>
        <span className={`mode-badge ${USE_LIVE_AI ? 'live' : 'demo'}`}>
          {USE_LIVE_AI ? '🟢 AI actief' : '🟡 Demo-modus'}
        </span>
      </div>

      {/* Messages */}
      <div className="messages-area">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div className="message-bubble">{msg.content}</div>
            <div className="message-time">{formatTime(msg.time)}</div>
          </div>
        ))}

        {typing && (
          <div className="typing-indicator">
            <div className="typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        {SUGGESTIONS.map(s => (
          <button
            key={s}
            className="suggestion-btn"
            onClick={() => handleSuggestion(s)}
            disabled={typing}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="chat-input-row">
        <textarea
          ref={inputRef}
          className="chat-input"
          placeholder="Typ uw vraag…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          disabled={typing}
        />
        <button
          className="send-btn"
          onClick={() => send()}
          disabled={!input.trim() || typing}
        >
          Stuur
        </button>
      </div>
    </div>
  );
}
