// logger.js

import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

export async function logAction(action, details, db) {
  const logEntry = {
    action,
    details,
    timestamp: new Date().toISOString(),
  };

  await addDoc(collection(db, "logs"), logEntry);
  console.log(`✅ Log saved: ${action}`);
}
