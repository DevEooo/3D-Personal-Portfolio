import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load environment variables
dotenv.config();

// Constants
const app = express();
const PORT = process.env.PORT || 4000;
const GEMINI_API =
  "https://generativelanguage.googleapis.com/v1beta1/models/gemini-pro:generateContent";

// Handle __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load Herald's profile (for Gemini prompt grounding)
const profilePath = path.join(__dirname, "data.txt");
const HERALD_PROFILE = fs.readFileSync(profilePath, "utf-8");

// System prompt used in Gemini request
const SYSTEM_PROMPT = {
  role: "user",
  parts: [
    {
      text: `
You are WinterAI, a calm, intelligent, emotionally reserved assistant built into Herald's personal portfolio website.

You help visitors explore Herald's background, skills, mindset, and creative work. You base all answers on this profile:

${HERALD_PROFILE}

Guidelines:
- Be clear, concise, and subtly warm in tone
- Avoid slang or overly casual responses
- If relevant, ask gentle follow-up questions
- Respond in the user's preferred language (English, Indonesian, or German)
- Never refer to yourself as an AI model — only as WinterAI
      `.trim()
    }
  ]
};

// Optional fallback data (pattern-based)
const dataPath = path.join(__dirname, "data.json");
const chatbotData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Pattern fallback matching
function matchIntent(userInput) {
  const normalized = userInput.toLowerCase();

  for (const topic of chatbotData.topics) {
    for (const pattern of topic.patterns) {
      if (normalized.includes(pattern.toLowerCase())) {
        const responses = topic.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  const fallback = chatbotData.topics.find((t) => t.tag === "fallback");
  return fallback?.responses?.[0] || "I'm not sure how to respond to that.";
}

// Middleware
app.use(cors());
app.use(express.json());

// Route: handle messages
app.post("/api/message", async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required." });
  }

  try {
    const response = await axios.post(
      GEMINI_API,
      {
        contents: [
          SYSTEM_PROMPT,
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
        headers: { "Content-Type": "application/json" },
      }
    );

    const botReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!botReply) {
      const fallback = matchIntent(message);
      return res.json({ reply: fallback });
    }

    return res.json({ reply: botReply });
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    const fallback = matchIntent(message);
    return res.json({ reply: fallback });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ WinterAI backend running at http://localhost:${PORT}`);
});



// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import axios from "axios";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import { dirname } from "path";


// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 4000;
// const GEMINI_API =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// // Load local static response data
// const chatbotdataPath = path.join(__dirname, "data.json");
// const chatbotData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// const dataprofilePath = path.join(__dirname, "data.txt");
// const data = fs.readFileSync(dataprofilePath, "utf-8");

// const SYSTEM_PROMPT = {
//   role: "user",
//   parts: [
//     {
//       text: `
// You are WinterAI, a calm, intelligent, emotionally reserved assistant built into Herald's personal portfolio website.

// You help visitors explore Herald's background, skills, mindset, and creative work. You base all answers on this profile:

// ${data}

// Guidelines:
// - Be clear, concise, and subtly warm in tone
// - Avoid slang or overly casual responses
// - If relevant, ask gentle follow-up questions
// - Respond in the user's preferred language (English, Indonesian, or German)
// - Never refer to yourself as an AI model — only as WinterAI
// `
//     }
//   ]
// };

// app.use(cors());
// app.use(express.json());



// // Pattern matching fallback
// function matchIntent(userInput) {
//   const normalizedInput = userInput.toLowerCase();

//   for (const topic of chatbotData.topics) {
//     for (const pattern of topic.patterns) {
//       if (normalizedInput.includes(pattern.toLowerCase())) {
//         // Pick random response
//         const responses = topic.responses;
//         return responses[Math.floor(Math.random() * responses.length)];
//       }
//     }
//   }

//   // If nothing matched, use fallback
//   const fallback = chatbotData.topics.find((t) => t.tag === "fallback");
//   return fallback.responses[0];
// }

// app.post("/api/message", async (req, res) => {
//   const { message } = req.body;

//   if (!message || message.trim() === "") {
//     return res.status(400).json({ error: "Message is required." });
//   }

//   // First try Gemini
//   try {
//     const response = await axios.post(
//       GEMINI_API,
//       {
//         contents: [
//           SYSTEM_PROMPT,
//           {
//             role: "user",
//             parts: [{ text: message }],
//           },
//         ],
//       },
//       {
//         params: { key: process.env.GEMINI_API_KEY },
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     const botReply =
//       response.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

//     // If Gemini reply is empty → fallback to pattern match
//     if (!botReply || botReply.trim() === "") {
//       const matched = matchIntent(message);
//       return res.json({ reply: matched });
//     }

//     return res.json({ reply: botReply });
//   } catch (error) {
//     console.error("❌ Gemini API Error:", error.message);

//     // If Gemini fails → fallback
//     const fallback = matchIntent(message);
//     return res.json({ reply: fallback });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ WinterAI backend running at http://localhost:${PORT}`);
// });
