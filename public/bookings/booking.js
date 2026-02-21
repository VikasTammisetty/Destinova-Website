import { auth, db } from "/firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const list = document.getElementById("myBookings");

// LOAD BOOKINGS
onAuthStateChanged(auth, (user) => {
  if (!user) {
    list.innerHTML = `<p class="empty-message">Please login to view your bookings.</p>`;
    return;
  }

  const q = query(
    collection(db, "bookings"),
    where("uid", "==", user.uid)
  );

  onSnapshot(q, (snapshot) => {
    list.innerHTML = "";

    // Always show empty message
    if (snapshot.empty) {
      list.innerHTML = `<p class="empty-message">No bookings found.</p>`;
      return; 
    }

    snapshot.forEach((docData) => {
      const d = docData.data();

      if (d.status === "Cancelled") return;

      // STEP 3 — SAFE FALLBACKS
      const pkg = d.packageName || "Package";
      const country = d.country || "Unknown";
      const duration = d.duration || "Not provided";
      const price = d.price || "Not available";
      const detailsArray = Array.isArray(d.details) ? d.details : [];

      list.innerHTML += `
        <div class="booking-card">

          <h2>${pkg}</h2>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Duration:</strong> ${duration}</p>
          <p><strong>Price:</strong> ${price}</p>

          <ul class="details-list">
            ${detailsArray.map(item => `<li>${item}</li>`).join("")}
          </ul>

          <span class="status-label ${d.status === "Cancelled" ? "status-cancelled" : "status-confirmed"}">
            ${d.status}
          </span>

          <button class="cancel-btn" data-id="${docData.id}">
            Cancel Booking
          </button>
        </div>
      `;
    });

    attachCancelListeners();
  });
});

// CANCEL BUTTON
function attachCancelListeners() {
  document.querySelectorAll(".cancel-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      await updateDoc(doc(db, "bookings", id), {
        status: "Cancelled"
      });

      btn.closest(".booking-card").remove();

      // Correct empty message behavior
      setTimeout(() => {
        if (!document.querySelector(".booking-card")) {
          list.innerHTML = `<p class="empty-message">No bookings found.</p>`;
        }
      }, 50);

      alert("Booking cancelled!");
    });
  });
} 