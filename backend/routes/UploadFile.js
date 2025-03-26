var express = require("express");
var router = express.Router();
const fs = require("fs");
const { google } = require("googleapis");
const multer = require("multer");
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Configure Google Auth using environment variables
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
  },
  scopes: SCOPES,
});

// Create Google Drive API client
const drive = google.drive({ version: "v3", auth });
const upload = multer({ dest: "uploads/" });

async function uploadFileToDrive(filePath, fileName) {
  try {
    const fileMetadata = {
      name: fileName,
    };

    const media = {
      mimeType: "video/mp4",
      body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = response.data.id;

    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const fileInfo = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
    return fileInfo.data.webContentLink;
  } catch (error) {
    console.error("Error uploading to Google Drive:", error.message);
    throw error;
  }
}

router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        status: false,
        message: "No file uploaded.",
      });
    }

    const videoLink = await uploadFileToDrive(
      req.file.path,
      req.file.originalname
    );

    fs.unlinkSync(req.file.path);

    res.status(200).send({
      status: true,
      message: "File uploaded successfully!",
      videoLink,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      error: error.message,
    });
  }
});

module.exports = router;
