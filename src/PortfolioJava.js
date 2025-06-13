// Function for the hamburger menu toggle
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}

// Ensure all DOM-related scripts run after the entire page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // --- Light/Dark Mode Toggle ---
  const toggleBtn = document.getElementById("mode-toggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "🌙";
  } else {
    toggleBtn.textContent = "☀️";
  }
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light",
    );
    toggleBtn.textContent = document.body.classList.contains("dark-mode")
      ? "🌙"
      : "☀️";
  });

  // --- Project Carousel Scripts ---
  const projects = [
    {
      id: 1,
      title: "MoodCloud",
      description:
        "MoodCloud is a personal project that offers a safe, anonymous space to express emotions, share thoughts freely, and receive uplifting messages. It also includes simple tools to support mental well-being.",
      image: "../images/MoodCloudpic1.png",
    },
    {
      id: 2,
      title: "StackUp",
      description:
        "StackUp is a budgeting app designed for youths to build better money habits. It helps users track expenses, set savings goals, and grow their finances through a fun, game-like experience.",
      image: "img2.jpg",
    },
    {
      id: 3,
      title: "BFA Tourist Planner",
      description: "Confidential",
      image: "../images/OneMapTourist.png",
    },
    {
      id: 4,
      title: "New Project 4",
      description: "Description...",
      image: "img4.jpg",
    },
    {
      id: 5,
      title: "New Project 5",
      description: "Description...",
      image: "img5.jpg",
    },
  ];

  const carouselTrack = document.querySelector(".IndexProject-carousel-track");
  const prevArrow = document.querySelector(".IndexProject-carousel-arrow.prev");
  const nextArrow = document.querySelector(".IndexProject-carousel-arrow.next");
  let currentIndex = 0;

  const getCardStyles = (index, totalCards, currentActiveIndex) => {
    let distance = index - currentActiveIndex;

    if (distance > totalCards / 2) {
      distance -= totalCards;
    }
    if (distance < -totalCards / 2) {
      distance += totalCards;
    }

    let translateX_offset = "0%";
    let scale = 0.8;
    let zIndex = 5;
    let opacity = 0;
    let pointerEvents = "none";

    if (distance === 0) {
      translateX_offset = "0%";
      scale = 1.1;
      zIndex = 20;
      opacity = 1;
      pointerEvents = "auto";
    } else if (distance === -1) {
      translateX_offset = "-30%";
      scale = 0.9;
      zIndex = 15;
      opacity = 0.7;
      pointerEvents = "auto";
    } else if (distance === 1) {
      translateX_offset = "30%";
      scale = 0.9;
      zIndex = 15;
      opacity = 0.7;
      pointerEvents = "auto";
    } else {
      translateX_offset = distance < 0 ? "-100%" : "100%";
      scale = 0.7;
      opacity = 0;
      zIndex = 1;
    }

    return {
      transform: `translate(-50%, -50%) translateX(${translateX_offset}) scale(${scale})`,
      zIndex: zIndex,
      opacity: opacity,
      pointerEvents: pointerEvents,
      left: "50%",
      top: "50%",
    };
  };

  const renderCarousel = () => {
    carouselTrack.innerHTML = "";
    const total = projects.length;
    const prevIdx = (currentIndex - 1 + total) % total;
    const nextIdx = (currentIndex + 1) % total;

    const prevCard = document.createElement("div");
    prevCard.classList.add("IndexProject-card");
    Object.assign(prevCard.style, getCardStyles(prevIdx, total, currentIndex));
    prevCard.innerHTML = `
            <img src="${projects[prevIdx].image}" alt="${projects[prevIdx].title}" onerror="this.onerror=null;this.src='https://placehold.co/400x250/cccccc/333333?text=Image+Error';" />
            <h3>${projects[prevIdx].title}</h3>
            <p>${projects[prevIdx].description}</p>
        `;
    carouselTrack.appendChild(prevCard);

    const mainCard = document.createElement("div");
    mainCard.classList.add("IndexProject-card");
    Object.assign(mainCard.style, getCardStyles(currentIndex, total, currentIndex));
    mainCard.innerHTML = `
            <img src="${projects[currentIndex].image}" alt="${projects[currentIndex].title}" onerror="this.onerror=null;this.src='https://placehold.co/400x250/cccccc/333333?text=Image+Error';" />
            <h3>${projects[currentIndex].title}</h3>
            <p>${projects[currentIndex].description}</p>
        `;
    carouselTrack.appendChild(mainCard);

    const nextCard = document.createElement("div");
    nextCard.classList.add("IndexProject-card");
    Object.assign(nextCard.style, getCardStyles(nextIdx, total, currentIndex));
    nextCard.innerHTML = `
            <img src="${projects[nextIdx].image}" alt="${projects[nextIdx].title}" onerror="this.onerror=null;this.src='https://placehold.co/400x250/cccccc/333333?text=Image+Error';" />
            <h3>${projects[nextIdx].title}</h3>
            <p>${projects[nextIdx].description}</p>
        `;
    carouselTrack.appendChild(nextCard);
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % projects.length;
    renderCarousel();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    renderCarousel();
  };

  prevArrow.addEventListener("click", prevSlide);
  nextArrow.addEventListener("click", nextSlide);

  renderCarousel(); // Initial render

  // --- Image Modal (Lightbox) for Awards & Certificates ---
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".award-card img").forEach((img) => {
    img.style.cursor = "pointer"; // Makes the image appear clickable
    img.addEventListener("click", function () {
      modal.style.display = "block"; // Show the modal
      modalImg.src = this.src; // Set the image source
      modalImg.alt = this.alt; // Set the alt text
    });
  });

  // Close modal when 'x' is clicked
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };

  // Close modal when clicking outside the image content
  window.onclick = function (e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  // --- "View More" Button for Skills (if this is on a separate skills page, ensure the ID exists) ---
  const toggleSkillsBtn = document.getElementById("toggle-skills-btn");
  if (toggleSkillsBtn) {
    toggleSkillsBtn.addEventListener("click", function () {
      const hiddenSkills = document.querySelector(".hidden-skill");
      const isExpanded = this.getAttribute("data-expanded") === "true";

      hiddenSkills.style.display = isExpanded ? "none" : "block";
      this.textContent = isExpanded ? "View More >" : "View Less <";
      this.setAttribute("data-expanded", !isExpanded);
    });
  }
});