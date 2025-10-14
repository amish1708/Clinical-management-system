import { db } from "./firebaseConfig.js";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  doc,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");
const billingForm = document.getElementById("billingForm");
const tokenList = document.getElementById("tokenList");
const billList = document.getElementById("billList");
const tokenDropdown = document.getElementById("patientTokenSelect");

// ✅ Register patient & generate token
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const contact = document.getElementById("contact").value.trim();

  try {
    const tokenNumber = "TKN" + Date.now();

    await addDoc(collection(db, "patients"), {
      name,
      age,
      contact,
      tokenNumber,
      createdAt: new Date(),
    });

    alert(`✅ Token Generated: ${tokenNumber}`);
    registerForm.reset();

    displayTokens();
    displayBills();
  } catch (error) {
    console.error("Error registering patient:", error);
    alert("Error: " + error.message);
  }
});

// ✅ Generate bill
// ✅ Generate bill
billingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const patientToken = tokenDropdown.value;
  const amount = parseFloat(document.getElementById("amount").value.trim());

  console.log("Selected Token:", patientToken);
  console.log("Entered Amount:", amount);

  if (!patientToken) {
    alert("❌ Please select a token!");
    return;
  }
  if (!amount || amount <= 0) {
    alert("❌ Enter a valid amount!");
    return;
  }

  try {
    const patientsRef = collection(db, "patients");
    const q = query(patientsRef, where("tokenNumber", "==", patientToken));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("❌ Token not found in database!");
      return;
    }

    const patientDoc = querySnapshot.docs[0];

    await updateDoc(doc(db, "patients", patientDoc.id), {
      billAmount: amount,
      billedAt: new Date(),
    });

    alert(`✅ Bill Generated for ${patientToken}: ₹${amount}`);
    billingForm.reset();

    displayBills();
  } catch (error) {
    console.error("🔥 Error generating bill:", error);
    alert("Error generating bill: " + error.message);
  }
});

// ✅ Display patient tokens
async function displayTokens() {
  tokenList.innerHTML = "";
  tokenDropdown.innerHTML = `<option value="">-- Select Patient Token --</option>`;

  const patientsRef = collection(db, "patients");
  const querySnapshot = await getDocs(patientsRef);

  querySnapshot.forEach((docSnap) => {
    const patient = docSnap.data();

    // Token list
    const li = document.createElement("li");
    li.classList.add("token-item");
    li.textContent = `${patient.tokenNumber} - ${patient.name}`;
    tokenList.appendChild(li);

    // Dropdown
    const option = document.createElement("option");
    option.value = patient.tokenNumber;
    option.textContent = `${patient.tokenNumber} - ${patient.name}`;
    tokenDropdown.appendChild(option);
  });
}

// ✅ Display bills
async function displayBills() {
  billList.innerHTML = "";

  const patientsRef = collection(db, "patients");
  const querySnapshot = await getDocs(patientsRef);

  querySnapshot.forEach((docSnap) => {
    const patient = docSnap.data();

    if (patient.billAmount) {
      const li = document.createElement("li");
      li.classList.add("bill-item");
      li.textContent = `${patient.tokenNumber} - ${patient.name}: ₹${patient.billAmount}`;
      billList.appendChild(li);
    }
  });
}

// Initial load
displayTokens();
displayBills();
