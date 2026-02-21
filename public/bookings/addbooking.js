import { auth, db } from "/firebase.js";
import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  // Select all book buttons on all package pages
  const buttons = document.querySelectorAll(".book-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      
      const user = auth.currentUser;

      if (!user) {
        alert("Please log in to book a package");
        return;
      }

      // Extract details from button
      const country = btn.dataset.country;
      const packageName = btn.dataset.package;
      const price = btn.dataset.price;

      // Add booking document
      await addDoc(collection(db, "bookings"), {
        uid: user.uid,
        country,
        packageName,
        price,
        status: "Confirmed",
        createdAt: serverTimestamp()
      });

      alert("Booking added successfully!");
    });
  });

});
