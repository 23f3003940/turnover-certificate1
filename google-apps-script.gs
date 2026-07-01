/**
 * PASTE THIS ENTIRE FILE INTO: Google Sheet > Extensions > Apps Script
 *
 * What it does:
 * 1. Every time the website form is submitted, it adds a new row to this
 *    Google Sheet with the person's Name, Phone, and submission time.
 * 2. It sends you an email notification at the same time.
 *
 * Setup:
 * 1. Change NOTIFY_EMAIL below to your email address.
 * 2. Click Deploy > New deployment > Select type: "Web app".
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Click Deploy, allow the permissions it asks for.
 * 4. Copy the Web App URL and paste it into src/config.ts in the website code.
 */

const NOTIFY_EMAIL = "your-email@example.com"; // <-- change this

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Add header row once, if the sheet is empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp", "Name", "Number", "Status"]);
  }

  const data = JSON.parse(e.postData.contents);
  const timestamp = new Date();

  sheet.appendRow([
    timestamp,
    data.fullName || "",
    data.phone || "",
    "New Lead",
  ]);

  // Email notification
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "New Turnover Certificate Lead — " + (data.fullName || "Unknown"),
    body:
      "New form submission received:\n\n" +
      "Name: " + (data.fullName || "-") + "\n" +
      "Number: " + (data.phone || "-") + "\n" +
      "Time: " + timestamp + "\n" +
      "Status: New Lead",
  });

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
