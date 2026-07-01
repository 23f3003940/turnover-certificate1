# Turnover Certificate Page — Final Version

Everything below is already done. You only need to run it.

## What's already set up

| Item | Status |
|---|---|
| Theme | Light theme, matches your uploaded HTML file |
| Google Sheet link | Already pasted in `src/config.ts` |
| Email notification | Works through the same Google Sheet link |
| Thank You page | Light theme, matches your screenshot |
| Footer links | Real links, pulled from shunya.so |
| Get Cost Estimate button | Working — saves lead + shows Thank You page |
| WhatsApp button | Working |

---

## How to run

```
npm install
npm run dev
```

Open the link shown in the terminal (usually `http://localhost:3000`).

---

## How the form works now

```
Person fills form
      ↓
Clicks "Get My Free Cost Estimate"
      ↓
Saved to your Google Sheet (Timestamp, Name, Number, Status)
      ↓
You get an email
      ↓
Person sees the Thank You page
```

---

## Footer links (from shunya.so)

| Link | Goes to |
|---|---|
| home | shunya.so |
| about us | shunya.so/about.html |
| how it works | shunya.so/how-it-works.html |
| blogs | shunya.so/blogs.html |
| consultation | shunya.so/consultation.html |
| startup india | shunya.so/startup-india.html |
| privacy policy | shunya.so/privacy-policy.html |
| terms & conditions | shunya.so/terms-conditions.html |
| cancellation & refund | shunya.so/cancellation-refund.html |

---

## If you ever need to change the Google Sheet link again

- Open `src/config.ts`
- Replace the URL inside the quotes
- Save, restart `npm run dev`

---

## Files in this project

| File | What it is |
|---|---|
| `src/TurnoverCertificate.tsx` | Main page |
| `src/ThankYouPage.tsx` | Thank You screen |
| `src/config.ts` | Your Google Sheet link |
| `src/styles/turnover-certificate.css` | All styling (light theme) |
| `google-apps-script.gs` | Backup copy of your sheet script |
