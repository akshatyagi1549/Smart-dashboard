import fs from "fs";
import path from "path";

const USERS_FILE = path.join(process.cwd(), "users.json");

// Load users
let users = {};
if (fs.existsSync(USERS_FILE)) {
  const rawData = fs.readFileSync(USERS_FILE, "utf-8");
  users = JSON.parse(rawData);
} else {
  console.log("No users.json file found.");
  process.exit(1);
}

// Update each user
Object.keys(users).forEach((email) => {
  const user = users[email];

  // Add default organization if missing
  if (!user.organization) {
    user.organization = "NGO India";
  }

  // Add default role if missing
  if (!user.role) {
    // If email contains 'director', assign director, else employee
    if (email.toLowerCase().includes("director")) {
      user.role = "director";
    } else if (email.toLowerCase().includes("executive")) {
      user.role = "executive";
    } else {
      user.role = "employee";
    }
  }
});

// Save back
fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
console.log("✅ Users migration completed successfully.");
