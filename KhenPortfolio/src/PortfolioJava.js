document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide-img");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;

  function updateSliderPosition() {
    const slideWidth = sliderTrack.clientWidth; // Use the container's width
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  // Ensure the slider resizes correctly on window resize
  window.addEventListener("resize", updateSliderPosition);
});

document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide-img");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  let currentIndex = 0;

  function updateSliderPosition() {
    const slideWidth = sliderTrack.clientWidth; // Use the container's width
    sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  nextButton.addEventListener("click", () => {
    if (currentIndex < slides.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  // Ensure the slider resizes correctly on window resize
  window.addEventListener("resize", updateSliderPosition);
});
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

