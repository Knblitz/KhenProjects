
function toggleMenu() {
 // alert("Hamburger menu clicked!");//remove when done
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
//alert("PortfolioJava.js is loaded!");

document.getElementById("toggle-skills-btn").addEventListener("click", function () {
  const hiddenSkills = document.querySelector(".hidden-skill");
  const isExpanded = this.getAttribute("data-expanded") === "true";

  // Toggle visibility
  hiddenSkills.style.display = isExpanded ? "none" : "block";

  // Update button text
  this.textContent = isExpanded ? "View More >" : "View Less <";

  // Update the expanded state
  this.setAttribute("data-expanded", !isExpanded);
});

