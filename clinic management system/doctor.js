// doctor.js

import { db } from "./firebaseConfig.js";
import { logAction } from "./logger.js";
import {
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

async function loadPatients() {
  const patientList = document.getElementById("patientList");
  patientList.innerHTML = "";

  const snapshot = await getDocs(collection(db, "patients"));
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>${data.name}</strong> (Token: ${data.token})</p>
      <textarea placeholder="Enter prescription" id="pres-${docSnap.id}"></textarea>
      <button onclick="savePrescription('${docSnap.id}', '${data.token}')">Save</button>
    `;
    patientList.appendChild(div);
  });
}

window.savePrescription = async function (patientId, token) {
  const textarea = document.getElementById(`pres-${patientId}`);
  const prescription = textarea.value.trim();

  if (!prescription) {
    alert("Please enter a prescription!");
    return;
  }

  await addDoc(collection(db, "prescriptions"), {
    patientId,
    token,
    prescription,
  });

  console.log("✅ Prescription Saved:", token);
  await logAction("Prescription Saved", { patientId, token }, db);

  alert(`Prescription saved for Token: ${token}`);
  textarea.value = "";
};

loadPatients();
