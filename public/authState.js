import { auth, db } from "/firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import { 
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";


// Helper
const el = id => document.getElementById(id);

// Desktop elements
const usernameDisplay = el("usernameDisplay");
const loginLink = el("loginLink");
const logoutLink = el("logoutLink");
const bookingLink = el("bookingLink");

// Mobile elements
const usernameDisplayMobile = el("usernameDisplayMobile");
const loginLinkMobile = el("loginLinkMobile");
const logoutLinkMobile = el("logoutLinkMobile");
const bookingLinkMobile = el("bookingLinkMobile");

// AUTH STATE CHANGE
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    // Logged OUT UI
    if (usernameDisplay) usernameDisplay.style.display = "none";
    if (loginLink) loginLink.style.display = "inline-block";
    if (logoutLink) logoutLink.style.display = "none";
    if (bookingLink) bookingLink.style.display = "none";

    if (usernameDisplayMobile) usernameDisplayMobile.style.display = "none";
    if (loginLinkMobile) loginLinkMobile.style.display = "inline-block";
    if (logoutLinkMobile) logoutLinkMobile.style.display = "none";
    if (bookingLinkMobile) bookingLinkMobile.style.display = "none";

    return;
  }

  // Logged IN UI
  let displayName = user.displayName || user.email;

  // Try Firestore username
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    if (snap.exists() && snap.data().name) {
      displayName = snap.data().name;
    }
  } catch (_) {}

  // Desktop UI
  if (usernameDisplay) {
    usernameDisplay.style.display = "inline-block";
    usernameDisplay.textContent = `Hello, ${displayName}`;
  }
  if (loginLink) loginLink.style.display = "none";
  if (logoutLink) logoutLink.style.display = "inline-block";
  if (bookingLink) bookingLink.style.display = "inline-block";

  // Mobile UI
  if (usernameDisplayMobile) {
    usernameDisplayMobile.style.display = "block";
    usernameDisplayMobile.textContent = `Hello, ${displayName}`;
  }
  if (loginLinkMobile) loginLinkMobile.style.display = "none";
  if (logoutLinkMobile) logoutLinkMobile.style.display = "block";
  if (bookingLinkMobile) bookingLinkMobile.style.display = "block";
});


// LOGOUT
if (logoutLink) logoutLink.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "/loginpage/login.html");
});
if (logoutLinkMobile) logoutLinkMobile.addEventListener("click", () => {
  signOut(auth).then(() => window.location.href = "/loginpage/login.html");
});


// BOOK NOW SAVE BOOKING
document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      return;
    }

      const packageName = btn.dataset.package || "Unknown Package";
      const country = btn.dataset.country || "Unknown";
      const duration = btn.dataset.duration || "Not specified";
      const price = btn.dataset.price || "Not specified";

      let details = [];
      try {
        details = JSON.parse(btn.dataset.details || "[]");
      } catch (e) {
        console.error("Details JSON parse error:", e);
        details = [];
      }

      console.log("Saving booking:", { packageName, country, duration, price, details });

      await addDoc(collection(db, "bookings"), {
        uid: user.uid,
        packageName,
        country,
        duration,
        price,
        details,
        status: "Confirmed",  
        createdAt: serverTimestamp()
      });

      alert("Booking successful!");
  });
});


// --- CANCEL BOOKING (INSTANT REMOVE) ------------
export function attachCancelLogic() {
  document.querySelectorAll(".cancel-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      if (confirm("Do you want to cancel this booking?")) {

        await updateDoc(doc(db, "bookings", id), {
          status: "Cancelled"
        });

        // Remove visually
        btn.parentElement.remove();

        // Show empty message if all removed
        if (document.querySelectorAll(".booking-card").length === 0) {
          const list = document.getElementById("myBookings");
          list.innerHTML = `<p class="empty-message">No bookings found.</p>`;
        }

        alert("Booking cancelled.");
      }
    });
  });
}
