const { GoogleSpreadsheet } = require("google-spreadsheet");

const serviceAccount = require("../secrets/service-account.json");

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

async function connectSheet() {
  await doc.useServiceAccountAuth({
    client_email: serviceAccount.client_email,
    private_key: serviceAccount.private_key,
  });

  await doc.loadInfo();

  console.log("Connected to sheet:", doc.title);

  return doc;
}

module.exports = connectSheet;