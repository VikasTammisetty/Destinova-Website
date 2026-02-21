const hamIcon = document.getElementById("ham-icon"); 
const menuLinks = document.getElementById("menu-links");

// Run hamburger + menu logic only if the elements exist
if (hamIcon && menuLinks) {

  // Toggle hamburger + menu panel
  hamIcon.addEventListener("click", () => {
    hamIcon.classList.toggle("active");
    menuLinks.classList.toggle("open"); 
  });

  // Close menu when clicking any nav link inside mobile menu
  document.querySelectorAll("#menu-links a").forEach(link => {
    link.addEventListener("click", () => {
      hamIcon.classList.remove("active");
      menuLinks.classList.remove("open"); 
    });
  });

  // Smooth scroll only when hamburger exists
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }

      // Close mobile panel after scrolling
      hamIcon.classList.remove("active");
      menuLinks.classList.remove("open");
    });
  });

}

// ================= SEARCH SYSTEM =================
const countries = [
  "Japan", "Australia", "Switzerland", "Chile",
  "Canada", "Russia", "Republic of Congo", "Singapore",

  "India", "Indonesia", "Italy", "Iceland", "Ireland", "Israel",
  "Jordan", "Kenya", "Nepal", "Norway", "New Zealand",
  "South Korea", "Thailand", "United Kingdom", "United States",
  "Vietnam", "France", "Germany", "Spain", "Portugal"
];

const searchBtn = document.querySelector(".search_btn");
const searchInput = document.querySelector("#country-search");
const suggestionsList = document.querySelector("#suggestions");

// Country Page Map
const countryPages = {
  "japan": "./pacakges/japan.html",
  "australia": "./pacakges/aus.html",
  "switzerland": "./pacakges/swiss.html",
  "chile": "./pacakges/chile.html",
  "canada": "./pacakges/canada.html",
  "russia": "./pacakges/russia.html",
  "republic of congo": "./pacakges/roc.html",
  "singapore": "./pacakges/singapore.html"
};

// Search Button
searchBtn.addEventListener("click", () => {
  const country = searchInput.value.trim().toLowerCase();

  if (countryPages[country]) {
    window.location.href = countryPages[country];
  } else if (country) {
    alert("No package page found for " + searchInput.value);
  } else {
    alert("Please enter a country name!");
  }
});

// Suggestions
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  suggestionsList.innerHTML = "";

  if (query.length === 0) {
    suggestionsList.style.display = "none";
    return;
  }

  const filtered = countries.filter(country =>
    country.toLowerCase().startsWith(query)
  );

  if (filtered.length === 0) {
    suggestionsList.innerHTML = `<li>No results found</li>`;
  } else {
    filtered.forEach(country => {
      const li = document.createElement("li");
      li.textContent = country;
      suggestionsList.appendChild(li);

      li.addEventListener("click", () => {
        const selected = country.toLowerCase();

        if (countryPages[selected]) {
          window.location.href = countryPages[selected];
        } else {
          alert("No package page found for " + country);
        }

        suggestionsList.style.display = "none";
      });
    });
  }

  suggestionsList.style.display = "block";
});

// Hide suggestions when clicking outside
document.addEventListener("click", e => {
  if (!e.target.closest(".search_center")) {
    suggestionsList.style.display = "none";
  }
});


// ================= FAQ ACCORDION =================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});


// ================= SWIPER SLIDER =================
var swiper = new Swiper(".blogSwiper", {
  loop: true,
  speed: 800,

  autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },

  slidesPerView: 3,
  spaceBetween: 30,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 10 },
    600: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});


// ================= BOOKING BUTTON (LOGIN REQUIRED) =================
// import { auth } from "/firebase.js";

// document.querySelectorAll(".book-btn").forEach(btn => {
//   btn.addEventListener("click", () => {
//     const user = auth.currentUser;

//     if (!user) {
//       alert("You must log in first!");
//       window.location.href = "/loginpage/login.html";
//       return;
//     }

//     const country = btn.dataset.country;
//     window.location.href = `/booking.html?country=${country}`;
//   });
// });
