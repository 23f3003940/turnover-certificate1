function CheckBig() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const NEXT_STEPS = [
  "A CA reviews your documents and eligibility.",
  "We share a clear quote and document checklist on WhatsApp.",
  "We verify your figures and prepare your turnover certificate.",
];

export default function ThankYouPage({
  name,
  onSubmitAgain,
}: {
  name: string;
  onSubmitAgain: () => void;
}) {
  const firstName = name.trim().split(" ")[0] || "there";

  return (
    <div className="tc-page tc-thankyou-page">
      <div className="tc-thankyou-wrap">
        <div className="tc-thankyou-card">
          <div className="tc-thankyou-badge">
            <CheckBig />
          </div>
          <h2 className="tc-thankyou-title">Thank you, {firstName}!</h2>
          <p className="tc-thankyou-sub">
            We've received your application. Our team will contact you on WhatsApp within{" "}
            <b>the next few hours</b> to discuss your Turnover Certificate.
          </p>

          <div className="tc-thankyou-next">
            <div className="tc-thankyou-next-head">
              <ShieldIcon /> What happens next
            </div>
            <ol>
              {NEXT_STEPS.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <button type="button" className="tc-thankyou-btn" onClick={onSubmitAgain}>
            <ArrowIcon /> Submit Again
          </button>
        </div>
      </div>
    </div>
  );
}
