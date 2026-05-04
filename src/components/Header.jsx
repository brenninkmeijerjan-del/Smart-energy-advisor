import { CLIENT } from '../data/clientData';

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <span className="dkc">DKC</span>
        <span className="totaal">totaaltechniek</span>
      </div>
      <div className="header-right">
        <span className="header-client">
          {CLIENT.naam} · {CLIENT.type} · {CLIENT.aansluiting}
        </span>
      </div>
    </header>
  );
}
