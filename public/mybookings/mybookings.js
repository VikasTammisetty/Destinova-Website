import { auth, db } from "./firebase.js";
import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import {
  query,
  where,
  getDocs,
  collection,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const bookingsList = document.getElementById("bookings-list");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("Please log in first!");
    window.location.href = "./loginpage/login.html";
    return;
  }

  const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
  const docs = await getDocs(q);

  if (docs.empty) {
    bookingsList.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  docs.forEach((booking) => {
    const item = document.createElement("div");
    item.className = "booking-card";
    item.innerHTML = `
      <p><b>Country:</b> ${booking.data().country}</p>
      <button class="cancel-btn" data-id="${booking.id}">Cancel</button>
    `;
    bookingsList.appendChild(item);
  });

  // Cancel booking
  document.querySelectorAll(".cancel-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      await deleteDoc(doc(db, "bookings", btn.dataset.id));
      alert("Booking cancelled");
      location.reload();
    });
  });
});
