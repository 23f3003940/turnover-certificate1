// ============================================
// EDIT THIS FILE TO CONNECT YOUR GOOGLE SHEET
// ============================================
//
// Steps:
// 1. Create a new Google Sheet.
// 2. Go to Extensions > Apps Script.
// 3. Delete any code there, paste the contents of "google-apps-script.gs"
//    (included in this zip) instead.
// 4. Click Deploy > New deployment > type: Web app.
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Click Deploy, copy the Web App URL it gives you.
// 6. Paste that URL below, replacing the placeholder.
//
// This single URL both writes each form submission as a new row in your
// Google Sheet, AND sends you an email notification. No separate setup
// needed for the two — they happen from the same script.

export const GOOGLE_SHEET_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyTKMaBxSufT2Iox46xfP5GutGwb-uuZG9yuW3wj0kPQ9zWfQKLeiFd2HjXYjGLJUSI/exec";

// Email address that receives a notification every time someone submits
// the form. Set this inside google-apps-script.gs (see NOTIFY_EMAIL there).
