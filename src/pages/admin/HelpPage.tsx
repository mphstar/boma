import { HELP_FAQ } from '../../data/admin';

export function HelpPage() {
  return (
    <div className="box">
      <h3 className="pt" style={{ marginBottom: 6 }}>
        Bantuan
      </h3>
      {HELP_FAQ.map(([question, answer]) => (
        <details key={question}>
          <summary>{question}</summary>
          <p>{answer}</p>
        </details>
      ))}
      <p className="help-link">
        <a href="#/">Buka website BOMA ↗</a>
      </p>
    </div>
  );
}
