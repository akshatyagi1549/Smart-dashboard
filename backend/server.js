// backend/server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs"; // for password hashing

const app = express();
const port = 5000;

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON bodies
app.use(express.json());

// -------------------- NGO ANSWERS -------------------- //
const DATA_FILE = path.join(process.cwd(), "ngoAnswers.json");

// Load existing answers
let ngoAnswers = {};
if (fs.existsSync(DATA_FILE)) {
  const rawData = fs.readFileSync(DATA_FILE, "utf-8");
  ngoAnswers = JSON.parse(rawData);
}

const saveAnswersToFile = () => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(ngoAnswers, null, 2));
};

// -------------------- USER AUTH -------------------- //
const USERS_FILE = path.join(process.cwd(), "users.json");

let users = {};
if (fs.existsSync(USERS_FILE)) {
  const rawData = fs.readFileSync(USERS_FILE, "utf-8");
  users = JSON.parse(rawData);
}

const saveUsersToFile = () => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running. Use /api/save-questions or /api/auth endpoints.");
});

// -------------------- AUTH ROUTES -------------------- //

// Register new user
app.post("/api/auth/register", async (req, res) => {
  try {
    const { ngoName, email, password } = req.body;
    if (!ngoName || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // Check if user already exists
    if (users[email]) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users[email] = { ngoName, email, password: hashedPassword };
    saveUsersToFile();

    console.log(`✅ Registered user: ${ngoName} (${email})`);
    res.json({ success: true, message: "Registration successful", ngoName });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users[email];
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    console.log(`✅ ${user.ngoName} logged in`);
    res.json({
      success: true,
      message: "Login successful",
      ngoName: user.ngoName,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------- DASHBOARD DATA -------------------- //

app.get("/api/dashboard/:userId", (req, res) => {
  const { userId } = req.params;
  const data = ngoAnswers[userId] || {};
  res.json({ success: true, data });
});

// Save answers
app.post("/api/save-questions", (req, res) => {
  const { userId, answers } = req.body;
  if (!userId || !answers) {
    return res.status(400).json({ success: false, message: "Missing userId or answers" });
  }

  ngoAnswers[userId] = answers;
  saveAnswersToFile();
  console.log(`💾 Saved answers for user ${userId}`);

  res.json({ success: true, message: "Answers saved successfully" });
});

// -------------------- START SERVER -------------------- //
app.listen(port, () => {
  console.log(`🚀 Backend running at http://localhost:${port}`);
});