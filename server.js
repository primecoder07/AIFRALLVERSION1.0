const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer();

let resumeText = "";

app.post("/analyze", upload.single("resume"), async (req, res) => {
  const data = await pdfParse(req.file.buffer);
  resumeText = data.text;

  // Mock AI questions
  const questions = Array.from({ length: 15 }, (_, i) => 
    `Question ${i + 1} based on your resume`
  );

  res.json({ questions });
});

app.post("/result", (req, res) => {
  const { answers } = req.body;

  // Mock SWOT + Careers
  const swot = `
Strengths: Good communication
Weakness: Needs technical depth
Opportunities: Growing in AI
Threats: High competition
`;

  const careers = [
    "Software Developer",
    "Data Analyst",
    "AI Engineer"
  ];

  res.json({ swot, careers });
});

app.listen(5000, () => console.log("Server running on port 5000"));
