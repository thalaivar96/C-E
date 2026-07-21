import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client with server-side API Key
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "COFFEE&ENGINEER JEE Advanced Physics Server" });
});

// Gemini AI Physics Doubt Solver & Equation Step-by-Step Breakdown
app.post("/api/gemini/solve-physics", async (req, res) => {
  try {
    const { problem, chapter, mode } = req.body;
    if (!problem || typeof problem !== "string") {
      return res.status(400).json({ error: "Please provide a valid physics problem or doubt." });
    }

    const ai = getGeminiClient();
    // Use gemini-3.1-pro-preview for complex STEM math reasoning
    const model = mode === "fast" ? "gemini-3.6-flash" : "gemini-3.1-pro-preview";

    const systemInstruction = `You are the lead Physics Master and JEE Advanced Subject Matter Expert for COFFEE&ENGINEER.
Your goal is to solve Indian Institute of Technology JEE Advanced level physics questions with extreme mathematical rigor, physical clarity, and deep intuition.

Structure your response into clear Markdown sections:
1. **Physical Overview & Diagram Description**: Identify the system, reference frame, forces, and constraints.
2. **Fundamental Laws & Governing Equations**: State the fundamental principles (e.g., Conservation of Angular Momentum, Gauss's Law, Lagrangian/Calculus constraints, Maxwell-Ampere laws) with clear definitions.
3. **Step-by-Step Mathematical Derivation**: Step-by-step calculus, integration limits, matrix setups, or boundary condition evaluations.
4. **Final Result & Dimensional Sanity Check**: Final mathematical expression and numerical value (if numbers provided), along with dimensional consistency check (M, L, T, A).
5. **JEE Advanced Traps & Alternative Approaches**: Highlight common mistakes students make on this exact problem type in JEE Advanced, plus smart shortcuts (e.g., center of mass frame, virtual work method, symmetry).`;

    const prompt = `[Chapter Context: ${chapter || "General Physics / JEE Advanced Mechanics & Electrodynamics"}]\n\nQuestion / Doubt:\n${problem}`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    res.json({ solution: response.text });
  } catch (err: any) {
    console.error("Error in /api/gemini/solve-physics:", err);
    res.status(500).json({
      error: err.message || "Failed to solve physics problem via Gemini AI.",
    });
  }
});

// Gemini Practice Problem Generator for JEE Advanced
app.post("/api/gemini/generate-problem", async (req, res) => {
  try {
    const { chapter, difficulty, questionType } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `You are a Senior JEE Advanced Physics Test Maker.
Generate an original, high-yielding JEE Advanced Physics problem.
Return JSON strictly adhering to the schema.
Difficulty level: ${difficulty || "Hard (Pathfinder / Irodov Level)"}
Question Type: ${questionType || "Multiple Correct Options (+4/-2 scheme)"}`;

    const prompt = `Generate 1 pristine, challenging JEE Advanced level Physics problem for Chapter: "${chapter || "Rotational Dynamics"}".
Make sure options test conceptual depth (e.g., rolling with slipping, non-inertial frames, impulse during impact).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT" as any,
          properties: {
            title: { type: "STRING" as any },
            question: { type: "STRING" as any },
            questionType: { type: "STRING" as any },
            options: {
              type: "ARRAY" as any,
              items: { type: "STRING" as any },
            },
            correctAnswers: {
              type: "ARRAY" as any,
              items: { type: "STRING" as any },
            },
            hint: { type: "STRING" as any },
            detailedSolution: { type: "STRING" as any },
            jeeTrap: { type: "STRING" as any },
          },
          required: ["title", "question", "options", "correctAnswers", "hint", "detailedSolution", "jeeTrap"],
        },
      },
    });

    const data = JSON.parse(response.text || "{}");
    res.json(data);
  } catch (err: any) {
    console.error("Error in /api/gemini/generate-problem:", err);
    res.status(500).json({ error: err.message || "Failed to generate problem." });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[COFFEE&ENGINEER] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
