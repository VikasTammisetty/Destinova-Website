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