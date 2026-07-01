import { useState } from "react";
import "./styles/turnover-certificate.css";
import ThankYouPage from "./ThankYouPage";
import { GOOGLE_SHEET_WEBHOOK_URL } from "./config";

const WA_NUMBER = "918080918797";
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const WA_ELIGIBILITY = `${WA_LINK}?text=I%20want%20to%20get%20my%20eligibility%20checked%20for%20a%20turnover%20certificate`;
const LINKEDIN_LINK = "https://www.linkedin.com/in/rinky-vishwakarma-6798234a/";

function WaIcon({ className = "tc-wa-ic" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4 8.94 8.94 0 0 0 3.1 12.94c0 1.59.4 3.05 1.16 4.31L3 21l3.86-1.24a8.93 8.93 0 0 0 5.19 1.65A8.94 8.94 0 0 0 21 12.48a8.82 8.82 0 0 0-3.4-6.16ZM12.05 19.6a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.83.91.92-2.76-.18-.28a7.43 7.43 0 0 1-1.15-3.93 7.45 7.45 0 0 1 7.46-7.43 7.4 7.4 0 0 1 5.27 2.18 7.32 7.32 0 0 1 2.18 5.25 7.46 7.46 0 0 1-7.62 7.26Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
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
function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.4 7 .7-5.3 4.7 1.6 6.9L12 17l-6.2 3.7 1.6-6.9L2 8.1l7-.7L12 2z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M4 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h7l5 5v13H7z" strokeLinejoin="round" />
      <path d="M14 3v5h5" strokeLinejoin="round" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z" />
    </svg>
  );
}

const FAQS = [
  {
    q: "How is a turnaround within one hour possible for a CA-signed document?",
    a: "For a single-year certificate with complete documents already shared, our CA can verify and sign within one hour. It is a standardised, repeatable process we have run over a thousand times. Multi-year or incomplete-document cases take longer, and we tell you the real timeline upfront, before you pay.",
  },
  {
    q: "What documents do I need to share?",
    a: "GST returns, bank statements or financial statements for the relevant year. If you have audited financials, that speeds things up further. Missing something? Send what you have and we will tell you exactly what is still needed.",
  },
  {
    q: "Can I get a certificate for multiple years at once?",
    a: "Yes, multi-year certificates are common for tenders and loan applications. Pricing is quoted per year, same CA, same UDIN process for each year.",
  },
  {
    q: "Will this actually be accepted by my bank or tender authority?",
    a: "Yes. We format every certificate to the issuing authority's specific requirements and include a UDIN for independent verification, which is what most rejections come down to in the first place.",
  },
  {
    q: "How is this different from a CA just signing a letter?",
    a: "We verify your figures against actual filings before signing, not a rubber stamp. That verification step is exactly what keeps it from bouncing back later.",
  },
];

const SWITCH_ROWS: [string, string][] = [
  ["Wait 2 to 5 days for a response", "Same-day response"],
  ["Unclear timeline", "Timeline confirmed upfront"],
  ["Generic format", "Format matched to the authority"],
  ["Multiple follow-ups needed", "WhatsApp updates, start to finish"],
  ["No UDIN guidance", "UDIN included and verified"],
  ["One-person dependency", "Dedicated team support"],
];

const REJECTION_TABLE: [string, string][] = [
  ["Missing or invalid UDIN", "Every certificate carries a UDIN generated through ICAI, verifiable on udin.icai.org"],
  ["Figures do not match GST or ITR filings", "Turnover is cross-checked against your actual GST returns and tax filings before signing"],
  ["Wrong format for the requesting authority", "Format is matched to your bank, tender or embassy's specific template"],
  ["Wrong financial year mentioned", "Financial year is confirmed with you in writing before drafting begins"],
  ["Certificate not signed by a practising CA", "Signed by a currently practising, ICAI-registered Chartered Accountant, every time"],
  ["Outdated or expired certificate submitted", "We flag the validity window so you know exactly when a new certificate is needed"],
];

const PROCESS_STEPS = [
  { title: "share your financials", desc: "Send GST returns, bank statements or financial statements. We tell you exactly what's missing before you pay." },
  { title: "CA verifies and drafts", desc: "Figures are cross-checked against your filings, then drafted in the exact format your bank, tender or embassy expects." },
  { title: "signed and delivered", desc: "Standard certificates are signed and emailed within one hour of document submission." },
];

const INCLUDED_ITEMS = [
  ["CA-signed and stamped certificate", "On firm letterhead, with UDIN for verification"],
  ["Turnover for any financial year", "Single year or multi-year, as required"],
  ["Format matched to purpose", "Bank, tender, visa or RBI format, built to spec"],
  ["UDIN verification", "Verifiable on the ICAI portal, accepted everywhere"],
  ["Digital and physical copy", "Signed PDF emailed, hard copy on request"],
  ["Direct CA contact on WhatsApp", "Not a ticket queue, real answers"],
];

export default function TurnoverCertificate() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    if (!fullName.trim() || !phone.trim()) {
      setSubmitError("Please fill in your name and phone number.");
      return;
    }

    setSubmitting(true);

    // Sends the lead to your Google Sheet + triggers the email notification.
    // See src/config.ts for setup instructions.
    if (GOOGLE_SHEET_WEBHOOK_URL && !GOOGLE_SHEET_WEBHOOK_URL.includes("PASTE_YOUR")) {
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            fullName,
            phone,
            source: "Turnover Certificate Page",
          }),
        });
      } catch {
        // no-cors mode can't read the response, so we don't treat this as fatal —
        // the request still reaches the sheet even if we can't confirm it here.
      }
    }

    setSubmitting(false);
    setSubmitted(true);
  }

  function handleSubmitAgain() {
    setSubmitted(false);
    setFullName("");
    setPhone("");
  }

  if (submitted) {
    return <ThankYouPage name={fullName} onSubmitAgain={handleSubmitAgain} />;
  }

  return (
    <div className="tc-page">
      {/* TOP BAR: trust badge + stats */}
      <div className="wrap">
        <div className="tc-hero-glow" />
        <div className="tc-topbar">
          <div className="tc-badge">
            <StarIcon /> Trusted by businesses across India
          </div>
          <div className="tc-topstats">
            <div className="tc-topstat">
              <div className="num">1,000+</div>
              <div className="lbl">Certificates Issued</div>
            </div>
            <div className="tc-topstat">
              <div className="num">1 Hour</div>
              <div className="lbl">Standard Turnaround</div>
            </div>
            <div className="tc-topstat">
              <div className="num">25 Years</div>
              <div className="lbl">of Legacy</div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="tc-hero">
        <div className="wrap">
          <div className="tc-hero-grid">
            <div>
              <h1>
                need a turnover certificate for a <span className="tc-accent tc-accent-lg">bank loan</span> or{" "}
                <span className="tc-accent tc-accent-lg">tender</span>? get it CA-signed within one hour.
              </h1>
              <p className="tc-sub">
                A wrongly formatted certificate is the most common reason banks and tenders reject submissions. A
                CA-signed, UDIN-verified turnover certificate proves your revenue is real, and gets accepted the
                first time.
              </p>

              <div className="tc-hero-cta">
                <a href="#apply" className="tc-btn-primary">
                  Check My Eligibility <ArrowIcon />
                </a>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="tc-btn-secondary">
                  <WaIcon /> WhatsApp an Expert
                </a>
                <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer" className="tc-btn-tertiary">
                  <LinkedInIcon /> Connect on LinkedIn
                </a>
              </div>

              <div className="tc-use-case-row">
                <span className="tc-use-chip">Bank Loan</span>
                <span className="tc-use-chip">Tender Submission</span>
                <span className="tc-use-chip">Visa or Embassy</span>
                <span className="tc-use-chip">Vendor Empanelment</span>
              </div>
            </div>

            <form className="tc-form-card" id="apply" onSubmit={handleStart}>
              <div className="tc-form-avatars">
                <div className="tc-avatar-stack">
                  <span>VA</span>
                  <span>MT</span>
                  <span>RM</span>
                  <span>SS</span>
                </div>
                <p>1,000+ certificates issued</p>
              </div>
              <h3>tell us about your certificate</h3>
              <div className="tc-price-row">
                <span className="tc-price-strike">₹5,999</span>
                <span className="tc-price-final">₹1,499</span>
                <span className="tc-price-off">75% Off</span>
              </div>
              <p className="tc-price-sub">All CA fees included · UDIN issued · Ready within one hour</p>
              <div className="tc-form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="As per PAN"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="tc-form-field">
                <label>WhatsApp Number</label>
                <input
                  type="tel"
                  placeholder="+91..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              {submitError && <p className="tc-form-error">{submitError}</p>}
              <button type="submit" className="tc-btn-primary" disabled={submitting}>
                {submitting ? "Submitting..." : "Get My Free Cost Estimate"} <ArrowIcon />
              </button>
              <div className="tc-form-wa-line">
                <WaIcon className="tc-wa-ic" /> Prefer WhatsApp? +91 80809 18797
              </div>
              <p className="tc-form-note">
                Reviewed by <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer">CA Rinky Vishwakarma</a>
                <br />
                100% Confidential · CA-Managed · No Spam
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="tc-section">
        <div className="wrap">
          <div className="tc-section-head">
            <span className="tc-pill-label">The Problem</span>
            <h2>
              why turnover certificates get <span className="tc-accent">rejected</span>
            </h2>
            <p>
              Banks, tenders and embassies each expect a different format. Sending the wrong one, or one without
              a UDIN, is the single biggest reason certificates bounce back.
            </p>
          </div>

          <div className="tc-important">
            <p>
              <b>Important:</b> a certificate with the wrong format or a missing UDIN can delay your loan
              disbursal or get your tender <em>disqualified outright</em>. Get the format checked before you
              submit, not after it's rejected.
            </p>
          </div>

          <div style={{ height: 26 }} />

          <div className="tc-compare-grid">
            <div className="tc-compare-card">
              <div className="tc-compare-head">
                <div className="tc-compare-ic bad">↘</div>
                <div>
                  <div className="tc-compare-tag">Without Shunya</div>
                  <div className="tc-compare-title">the typical experience</div>
                </div>
              </div>
              <div className="tc-compare-row"><span className="lbl">Turnaround time</span><span className="val bad">2 to 5 days</span></div>
              <div className="tc-compare-row"><span className="lbl">UDIN included</span><span className="val bad">Often missing</span></div>
              <div className="tc-compare-row"><span className="lbl">Format matched to authority</span><span className="val bad">Generic</span></div>
              <div className="tc-compare-row"><span className="lbl">Risk of rejection</span><span className="val bad">High</span></div>
            </div>
            <div className="tc-compare-card">
              <div className="tc-compare-head">
                <div className="tc-compare-ic good">↗</div>
                <div>
                  <div className="tc-compare-tag">With Shunya</div>
                  <div className="tc-compare-title">how it should work</div>
                </div>
              </div>
              <div className="tc-compare-row"><span className="lbl">Turnaround time</span><span className="val good">Within 1 hour</span></div>
              <div className="tc-compare-row"><span className="lbl">UDIN included</span><span className="val good">Always, verified</span></div>
              <div className="tc-compare-row"><span className="lbl">Format matched to authority</span><span className="val good">Bank, tender or visa specific</span></div>
              <div className="tc-compare-row"><span className="lbl">Risk of rejection</span><span className="val good">Minimal</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* THE SOLUTION — numbered process list */}
      <section className="tc-section">
        <div className="wrap">
          <div className="tc-section-head">
            <span className="tc-pill-label">The Solution</span>
            <h2>
              what a <span className="tc-accent">turnover certificate</span> does
            </h2>
          </div>
          <div className="tc-process-list">
            {PROCESS_STEPS.map((step, i) => (
              <div className="tc-process-card" key={step.title}>
                <div className="tc-process-left">
                  <div className="tc-step-num">{i + 1}</div>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
                <span className="tc-process-arrow"><ArrowIcon /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — trust stat cards + feature cards */}
      <section className="tc-section">
        <div className="wrap">
          <div className="tc-section-head">
            <span className="tc-pill-label">Why Choose Us</span>
            <h2>
              trusted by businesses <span className="tc-accent">across India</span>
            </h2>
          </div>
          <div className="tc-trust-grid">
            <div className="tc-trust-card">
              <div className="tc-trust-ic"><CheckIcon /></div>
              <h3>1,000+</h3>
              <p>certificates issued, with a proven, repeatable process.</p>
            </div>
            <div className="tc-trust-card">
              <div className="tc-trust-ic"><CheckIcon /></div>
              <h3>1 hour</h3>
              <p>standard turnaround, once documents are shared.</p>
            </div>
            <div className="tc-trust-card">
              <div className="tc-trust-ic"><CheckIcon /></div>
              <h3>25+ years</h3>
              <p>combined CA experience, ex-EY, ex-Reliance Industries.</p>
            </div>
            <div className="tc-trust-card">
              <div className="tc-trust-ic"><CheckIcon /></div>
              <h3>100%</h3>
              <p>bank and tender accepted, UDIN-verified every time.</p>
            </div>
          </div>

          <div className="tc-feature-grid">
            <div className="tc-feature-card">
              <div className="tc-feature-ic"><DocIcon /></div>
              <h3>end-to-end management</h3>
              <p>Documentation, drafting, verification and delivery, all handled for you.</p>
            </div>
            <div className="tc-feature-card">
              <div className="tc-feature-ic"><TrendIcon /></div>
              <h3>fast turnaround</h3>
              <p>Quick preparation with proactive updates at every step.</p>
            </div>
            <div className="tc-feature-card">
              <div className="tc-feature-ic"><GlobeIcon /></div>
              <h3>100% remote process</h3>
              <p>No office visit required. Everything managed online.</p>
            </div>
          </div>

          <div className="tc-trust-strip">
            <div className="tc-trust-strip-item"><CheckIcon /> Chartered Accountant Managed</div>
            <div className="tc-trust-strip-item"><CheckIcon /> Secure Document Handling</div>
            <div className="tc-trust-strip-item"><CheckIcon /> Dedicated Relationship Manager</div>
            <div className="tc-trust-strip-item"><CheckIcon /> Transparent Process</div>
          </div>
        </div>
      </section>

      {/* DOCUMENTS REQUIRED */}
      <section className="tc-section">
        <div className="wrap">
          <div className="tc-section-head">
            <span className="tc-pill-label">Before You Apply</span>
            <h2>
              documents typically required for a <span className="tc-accent">turnover certificate</span>
            </h2>
          </div>
          <div className="tc-docs-chip-row">
            <span className="tc-docs-chip">GST Returns</span>
            <span className="tc-docs-chip">Bank Statements</span>
            <span className="tc-docs-chip">Financial Statements</span>
            <span className="tc-docs-chip">Income Tax Return</span>
            <span className="tc-docs-chip">PAN and Incorporation Certificate</span>
            <span className="tc-docs-chip">Format Requirement, If Any</span>
          </div>
          <div className="tc-docs-note">
            Don't have everything on this list? Share whatever you have. A CA will tell you exactly what's
            missing before you pay anything.
          </div>
        </div>
      </section>

      {/* ELIGIBILITY BANNER */}
      <section className="tc-eligibility-banner">
        <div className="wrap">
          <div className="tc-eligibility-card">
            <div>
              <h3>Not sure which format or documents you need?</h3>
              <p>Send us your requirement and we'll confirm what applies to your case, free of cost.</p>
            </div>
            <a href={WA_ELIGIBILITY} target="_blank" rel="noreferrer" className="tc-btn-secondary">
              <WaIcon /> WhatsApp an Expert
            </a>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED — checklist grid */}
      <section className="tc-section">
        <div className="wrap">
          <div className="tc-section-head">
            <span className="tc-pill-label">What's Included</span>
            <h2>
              complete <span className="tc-accent">turnover certificate</span> service
            </h2>
          </div>
          <div className="tc-check-grid">
            {INCLUDED_ITEMS.map(([title, desc]) => (
              <div className="tc-check-item" key={title}>
                <span className="tc-check-ic"><CheckIcon /></span>
                <div>
                  <b>{title}</b>
                  <small>{desc}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="tc-verify-card">
            <h3>Verify it yourself, before you even pay</h3>
            <p>
              Every certificate carries a UDIN generated through ICAI's own system. You can confirm it's signed
              by a real, currently practising Chartered Accountant.
            </p>
            <div className="box">
              Search any UDIN at{" "}
              <a href="https://udin.icai.org/" target="_blank" rel="noreferrer">
                udin.icai.org
              </a>{" "}
              — it will show our CA's name, registration, and the exact document it was issued for.
            </div>
          </div>
        </div>
      </section>

      {/* WHY BUSINESSES SWITCH */}
      <section className="tc-section">
        <div className="wrap">
          <div className="tc-section-head">
            <span className="tc-pill-label">The Difference</span>
            <h2>
              why businesses switch to <span className="tc-accent">Shunya</span>
            </h2>
          </div>
          <div className="tc-switch-table-wrap">
            <div className="tc-switch-row tc-switch-header-row">
              <div className="tc-switch-col-label">Typical Experience</div>
              <div className="tc-switch-col-label tc-switch-col-winner">Shunya</div>
            </div>
            {SWITCH_ROWS.map(([bad, good]) => (
              <div className="tc-switch-row" key={bad}>
                <div className="tc-switch-cell tc-switch-cell-bad">
                  <span className="tc-switch-ic tc-switch-ic-bad">&#10005;</span>
                  {bad}
                </div>
                <div className="tc-switch-cell tc-switch-cell-good">
                  <span className="tc-switch-ic tc-switch-ic-good">&#10003;</span>
                  {good}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="tc-section" id="pricing">
        <div className="wrap">
          <p className="tc-market-rate-note">Most local CAs charge ₹4,000 to ₹8,000 for the same certificate.</p>
          <div className="tc-price-card">
            <div className="tc-price-left">
              <h3>Turnover Certificate</h3>
              <p>Fixed fee, no surprises. Clear scope, clear timeline.</p>
              <ul className="tc-price-list">
                <li>CA-signed certificate with UDIN</li>
                <li>Turnaround within one hour for standard cases</li>
                <li>Unlimited format revisions until accepted</li>
                <li>Direct CA contact on WhatsApp, not a ticket queue</li>
              </ul>
            </div>
            <div className="tc-price-right">
              <div className="tc-price-amount">
                <span>₹5,999</span>₹1,499
              </div>
              <div className="tc-price-off-tag">75% Off, Standard Pricing</div>
              <div className="tc-price-actions">
                <a href="#apply" className="tc-btn-primary">
                  Get My Certificate <ArrowIcon />
                </a>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="tc-btn-secondary">
                  <WaIcon /> Ask a CA First
                </a>
              </div>
            </div>
          </div>
          <div className="tc-why-cheap">
            <h3>₹1,499 — is that enough for a real CA-signed document?</h3>
            <p>
              Yes. A turnover certificate is a standardised filing for our team, not a custom audit. We have
              issued over a thousand through the same verified process. The low price comes from volume and a
              repeatable workflow, not from skipping verification.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="tc-section">
        <div className="wrap">
          <div className="tc-section-head">
            <span className="tc-pill-label">Verified Reviews</span>
            <h2>
              real cases, <span className="tc-accent">real outcomes</span>
            </h2>
          </div>
          <div className="tc-test-grid">
            <div className="tc-test-card">
              <span className="tag">Bank Loan</span>
              <p className="quote">
                "Our bank's exact format wasn't something our old CA had handled before. Shunya had it signed and
                matched to SBI's working capital format within the hour. Loan got sanctioned the same week."
              </p>
              <div className="tc-test-author">
                <div className="tc-test-avatar">VA</div>
                <div>
                  <p>Vikram Anand</p>
                  <span>Director, Anand Ventures Pvt Ltd · Bengaluru</span>
                </div>
              </div>
            </div>
            <div className="tc-test-card">
              <span className="tag">Tender Submission</span>
              <p className="quote">
                "Two days before a tender deadline, we realised our previous certificate didn't have a UDIN.
                Shunya reissued a fully compliant one the same day."
              </p>
              <div className="tc-test-author">
                <div className="tc-test-avatar">MT</div>
                <div>
                  <p>Meera Thakur</p>
                  <span>Founder, Thakur Designs · Pune</span>
                </div>
              </div>
            </div>
            <div className="tc-test-card">
              <span className="tag">Visa / Embassy</span>
              <p className="quote">
                "Needed proof of business turnover for a visa interview with barely 48 hours notice. Got a
                signed, UDIN-verified certificate the same evening."
              </p>
              <div className="tc-test-author">
                <div className="tc-test-avatar">RM</div>
                <div>
                  <p>Rajesh Moorthy</p>
                  <span>Managing Director, Moorthy &amp; Co. · Chennai</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REJECTION TABLE */}
      <section className="tc-section">
        <div className="wrap">
          <div className="tc-section-head">
            <span className="tc-pill-label">Avoid This</span>
            <h2>
              why certificates get <span className="tc-accent">rejected</span>
            </h2>
            <p>Most rejections come down to one of these six issues. We check for all of them before signing.</p>
          </div>
          <div className="tc-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Reason for rejection</th>
                  <th>What we check before signing</th>
                </tr>
              </thead>
              <tbody>
                {REJECTION_TABLE.map(([reason, check]) => (
                  <tr key={reason}>
                    <td>{reason}</td>
                    <td>{check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="tc-section" id="faq-section">
        <div className="wrap">
          <div className="tc-authority-strip">
            <p>
              25+ years combined CA experience · Ex-EY, ex-Reliance Industries · RBI recognised practice · MOU
              with IIM Mumbai · 50+ professionals on the team
            </p>
          </div>
          <div className="tc-section-head">
            <span className="tc-pill-label">FAQ</span>
            <h2>questions, answered</h2>
          </div>
          <div className="tc-faq-list">
            {FAQS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div className="tc-faq-item" key={item.q}>
                  <button
                    type="button"
                    className="tc-faq-q"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    {item.q}
                    <span className="tc-faq-toggle">{isOpen ? "\u2013" : "+"}</span>
                  </button>
                  {isOpen && <div className="tc-faq-a">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="tc-final-cta">
        <div className="wrap">
          <h2>
            don't let a wrong format <span className="tc-accent">cost you the deal</span>.
          </h2>
          <p>Share your financials now, get a CA-signed, UDIN-verified certificate within one hour.</p>
          <div className="tc-cta-row">
            <a href="#apply" className="tc-btn-primary">
              Get My Certificate — ₹1,499 <ArrowIcon />
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="tc-btn-secondary">
              <WaIcon /> WhatsApp a CA
            </a>
          </div>
          <p className="tc-note">100% Online · No Office Visit Required · CA Managed from Start to Finish</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="tc-footer">
        <div className="wrap">
          <div className="tc-footer-grid">
            <div>
              <div className="tc-foot-brand">shunya</div>
              <p className="tc-foot-tagline">
                Simplifying business, beautifully. From idea to incorporation, and every compliance step in
                between.
              </p>
            </div>
            <div>
              <div className="tc-foot-heading">Explore</div>
              <div className="tc-foot-links">
                <a href="https://shunya.so/index.html" target="_blank" rel="noreferrer">home</a>
                <a href="https://shunya.so/about.html" target="_blank" rel="noreferrer">about us</a>
                <a href="https://shunya.so/how-it-works.html" target="_blank" rel="noreferrer">how it works</a>
                <a href="https://shunya.so/blogs.html" target="_blank" rel="noreferrer">blogs</a>
                <a href="https://shunya.so/consultation.html" target="_blank" rel="noreferrer">consultation</a>
                <a href="https://shunya.so/startup-india.html" target="_blank" rel="noreferrer">startup india</a>
              </div>
            </div>
            <div>
              <div className="tc-foot-heading">Connect</div>
              <div className="tc-foot-links">
                <a href="#apply">turnover certificate</a>
                <a href="#faq-section">faq</a>
                <a href={WA_LINK} target="_blank" rel="noreferrer">whatsapp an expert</a>
                <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer">linkedin</a>
              </div>
            </div>
          </div>
          <div className="tc-foot-bottom-links">
            <a href="https://shunya.so/privacy-policy.html" target="_blank" rel="noreferrer">privacy policy</a>
            <a href="https://shunya.so/terms-conditions.html" target="_blank" rel="noreferrer">terms &amp; conditions</a>
            <a href="https://shunya.so/cancellation-refund.html" target="_blank" rel="noreferrer">cancellation &amp; refund</a>
          </div>
          <div className="tc-foot-copyright">© 2026 Advocare Technologies Private Limited</div>
        </div>
      </footer>

      <a href={WA_LINK} target="_blank" rel="noreferrer" className="tc-wa-float" aria-label="Chat on WhatsApp">
        <WaIcon className="" />
      </a>
    </div>
  );
}
