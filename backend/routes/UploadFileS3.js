var express = require("express");
var router = express.Router();
const fs = require("fs");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const Busboy = require("busboy");
const { Upload } = require("@aws-sdk/lib-storage");

router.post("/uploadS3", async (req, res) => {
  const s3Client = new S3Client({
    endpoint: process.env.OLAKRUTRIM_BASE_URL,
    region: process.env.OLAKRUTRIM_REGION,
    credentials: {
      accessKeyId: process.env.OLAKRUTRIM_ACCESS_KEY,
      secretAccessKey: process.env.OLAKRUTRIM_SECRET_KEY,
    },
  });

  const bucketName = process.env.OLAKRUTRIM_BUCKET_NAME;

  const busboy = Busboy({
    headers: req.headers,
    limits: { fileSize: 500 * 1024 * 1024 }, // Limit file size to 500 MB
  });

  // Custom error handling for file size limit
  busboy.on("limit", () => {
    console.error("File size limit exceeded");
    res.status(400).json({ message: "File size exceeds the 500 MB limit" });
    req.unpipe(busboy); // Stop piping the request to Busboy
    busboy.end(); // End the Busboy stream
  });

  busboy.on("file", async (fieldname, file, filename, encoding, mimetype) => {
    console.log(`Uploading file from field: ${fieldname}`);

    const s3Key = `${Date.now()}-${filename}`; // Generate unique file name

    try {
      // Use the Upload utility for streaming uploads
      const upload = new Upload({
        client: s3Client,
        params: {
          Bucket: bucketName,
          Key: s3Key,
          Body: file, // Stream the file directly to S3
          ContentType: mimetype,
        },
        // Optional: Adjust concurrency and part size for better performance
        queueSize: 4, // Number of concurrent uploads
        partSize: 5 * 1024 * 1024, // Size of each part (5 MB)
      });

      upload.on("httpUploadProgress", (progress) => {
        console.log(`Uploaded: ${progress.loaded} of ${progress.total} bytes`);
      });

      await upload.done();

      const signedUrl = await getSignedUrl(
        s3Client,
        new GetObjectCommand({
          Bucket: bucketName,
          Key: s3Key,
        })
      );

      res.json({
        message: "File uploaded successfully",
        videoLink: signedUrl,
      });
      console.log("Upload successful");
    } catch (err) {
      console.error("Error uploading to S3:", err);
      return res
        .status(500)
        .json({ message: "Upload failed", error: err.message });
    }
  });

  req.pipe(busboy); // Pipe the incoming request to Busboy
});

module.exports = router;
