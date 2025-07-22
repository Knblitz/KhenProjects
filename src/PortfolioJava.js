// Function for the hamburger menu toggle
function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}

// Ensure all DOM-related scripts run after the entire page is loaded
document.addEventListener("DOMContentLoaded", function () {
    // --- Light/Dark Mode Toggle ---
    const toggleBtn = document.getElementById("mode-toggle");
    const body = document.body;

    // Set initial theme based on localStorage or default to light-mode
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.add(savedTheme);
    } else {
        body.classList.add("light-mode"); // Default theme
    }
    toggleBtn.textContent = body.classList.contains("dark-mode") ? "🌙" : "☀️";

    toggleBtn.addEventListener("click", () => {
        if (body.classList.contains("dark-mode")) {
            body.classList.remove("dark-mode");
            body.classList.add("light-mode");
            localStorage.setItem("theme", "light-mode");
            toggleBtn.textContent = "☀️";
        } else {
            body.classList.remove("light-mode");
            body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark-mode");
            toggleBtn.textContent = "🌙";
        }
    });

    // --- Patchnote badge popup logic ---
    const patchnoteBadge = document.getElementById('patchnote-badge');
    const patchnotePopup = document.getElementById('patchnote-popup');
    const closePatchnoteBtn = document.getElementById('close-patchnote');
    const viewFullPatchnoteBtn = document.getElementById('view-full-patchnote');
    const patchnoteFullPopup = document.getElementById('patchnote-full-popup');
    const patchnoteFullContent = document.getElementById('patchnote-full-content');
    const closeFullPatchnoteBtn = document.getElementById('close-full-patchnote');

    // 1. Handle click on the Patchnote Badge (bottom right "vX.X.X" button)
    if (patchnoteBadge) {
        patchnoteBadge.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent this click from bubbling up and closing popups
            // Toggle the display of the summary popup
            patchnotePopup.style.display = (patchnotePopup.style.display === 'block') ? 'none' : 'block';
            // Ensure the full patch notes popup is closed if the summary is opened
            patchnoteFullPopup.style.display = 'none';
        });
    }

    // 2. Handle click on the "Close" button within the summary popup
    if (closePatchnoteBtn) {
        closePatchnoteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent this click from bubbling up to the window
            patchnotePopup.style.display = 'none'; // Hide the summary popup
        });
    }

    // 3. Handle click on the "View full changelog" button within the summary popup
    if (viewFullPatchnoteBtn) {
        viewFullPatchnoteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent this click from bubbling up to the window
            // Fetch the content of patchnotes.html
            fetch('patchnotes.html')
                .then(response => {
                    // Check if the network request was successful
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text(); // Get the response body as text
                })
                .then(html => {
                    // Create a temporary div to parse the fetched HTML string
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    // Find the specific '.patch-list' div within the fetched HTML
                    const patchList = tempDiv.querySelector('.patch-list');

                    if (patchList) {
                        // If '.patch-list' is found, insert its HTML into the full content area
                        patchnoteFullContent.innerHTML = patchList.outerHTML;
                    } else {
                        // Fallback message if the expected content structure is not found
                        patchnoteFullContent.innerHTML = '<h2>Patch Notes Content Missing</h2><p>Could not load the full patch notes content.</p>';
                        console.warn("'.patch-list' div not found in patchnotes.html. Check the structure of patchnotes.html.");
                    }

                    // Display the full patch notes popup
                    patchnoteFullPopup.style.display = 'block';
                    // Hide the summary popup once the full one is open
                    patchnotePopup.style.display = 'none';
                })
                .catch(error => {
                    // Log any errors during the fetch operation
                    console.error('Error fetching patch notes:', error);
                    // Display an error message to the user in the popup
                    patchnoteFullContent.innerHTML = '<h2>Error Loading Patch Notes</h2><p>Failed to load patch notes. Please try again later.</p>';
                    patchnoteFullPopup.style.display = 'block';
                    patchnotePopup.style.display = 'none';
                });
        });
    }

    // 4. Handle click on the "Close" button within the full patch notes popup
    if (closeFullPatchnoteBtn) {
        closeFullPatchnoteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent this click from bubbling up to the window
            patchnoteFullPopup.style.display = 'none'; // Hide the full popup
        });
    }

    // 5. Global click listener to close popups when clicking outside
    window.addEventListener('click', (e) => {
        // Check if the click is outside the summary popup AND not on the badge itself
        const isClickOutsideSummary = patchnotePopup && patchnotePopup.style.display === 'block' && !patchnotePopup.contains(e.target) && e.target !== patchnoteBadge;
        // Check if the click is outside the full popup AND not on the "View full changelog" button
        const isClickOutsideFull = patchnoteFullPopup && patchnoteFullPopup.style.display === 'block' && !patchnoteFullPopup.contains(e.target) && e.target !== viewFullPatchnoteBtn;

        if (isClickOutsideSummary) {
            patchnotePopup.style.display = 'none';
        }

        if (isClickOutsideFull) {
            patchnoteFullPopup.style.display = 'none';
        }
    });

    // 6. Prevent clicks *inside* the popups from closing them (by stopping propagation)
    // This is important because the window click listener will otherwise trigger
    if (patchnotePopup) {
        patchnotePopup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
    if (patchnoteFullPopup) {
        patchnoteFullPopup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

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
            // Corrected image path: Ensure this image exists in your images folder
            image: "../images/img2.jpg",
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
            // Corrected image path: Ensure this image exists in your images folder
            image: "../images/img4.jpg",
        },
        {
            id: 5,
            title: "New Project 5",
            description: "Description...",
            // Corrected image path: Ensure this image exists in your images folder
            image: "../images/img5.jpg",
        },
    ];

    const carouselTrack = document.querySelector(".IndexProject-carousel-track");
    const prevArrow = document.querySelector(".IndexProject-carousel-arrow.prev");
    const nextArrow = document.querySelector(".IndexProject-carousel-arrow.next");
    let currentIndex = 0;

    /**
     * Calculates CSS styles for a carousel card based on its position relative to the active card.
     * This enables a dynamic, overlapping carousel effect.
     * @param {number} index - The index of the current card in the projects array.
     * @param {number} totalCards - The total number of cards in the carousel.
     * @param {number} currentActiveIndex - The index of the currently active (main) card.
     * @returns {object} An object containing CSS style properties.
     */
    const getCardStyles = (index, totalCards, currentActiveIndex) => {
        let distance = index - currentActiveIndex;

        // Handle wrapping for infinite carousel effect by adjusting distance for circularity
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
        let visibility = "hidden"; // Initially hide cards far away

        if (distance === 0) {
            // Main active card: fully visible, larger scale, highest z-index
            translateX_offset = "0%"; // Centered relative to its container
            scale = 1.1; // Slightly larger than neighbors
            zIndex = 20; // On top
            opacity = 1; // Fully opaque
            pointerEvents = "auto"; // Clickable
            visibility = "visible";
        } else if (distance === -1) {
            // Previous card: to the left, smaller scale, lower opacity
            translateX_offset = "-30%"; // Shifted left
            scale = 0.9; // Smaller
            zIndex = 15; // Behind the main card
            opacity = 0.7; // Partially transparent
            pointerEvents = "auto"; // Still clickable
            visibility = "visible";
        } else if (distance === 1) {
            // Next card: to the right, smaller scale, lower opacity
            translateX_offset = "30%"; // Shifted right
            scale = 0.9; // Smaller
            zIndex = 15; // Behind the main card
            opacity = 0.7; // Partially transparent
            pointerEvents = "auto"; // Still clickable
            visibility = "visible";
        } else {
            // Cards further away (more than one position from current)
            translateX_offset = distance < 0 ? "-100%" : "100%"; // Move completely off-screen
            scale = 0.7; // Much smaller
            opacity = 0; // Fully transparent
            zIndex = 1; // Lowest z-index
            visibility = "hidden"; // Not visible or interactive
        }

        // Return CSS properties for the card
        return {
            // Apply transforms: first translate to center, then offset, then scale
            transform: `translate(-50%, -50%) translateX(${translateX_offset}) scale(${scale})`,
            zIndex: zIndex,
            opacity: opacity,
            pointerEvents: pointerEvents,
            visibility: visibility,
            left: "50%", // Position relative to the center of its parent
            top: "50%", // Position relative to the center of its parent
            position: "absolute", // Absolute positioning within the track for layering
            // Smooth transitions for all changing properties
            transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out, visibility 0.5s ease-in-out",
        };
    };

    /**
     * Renders all project carousel cards into the DOM.
     * Cards are positioned and styled dynamically by getCardStyles.
     */
    const renderCarousel = () => {
        carouselTrack.innerHTML = ""; // Clear existing cards to prevent duplicates

        // Iterate over all projects to create and append each card
        projects.forEach((project, index) => {
            const card = document.createElement("div");
            card.classList.add("IndexProject-card"); // Assign the main card class

            // Apply dynamic styles based on its relation to the current active index
            Object.assign(card.style, getCardStyles(index, projects.length, currentIndex));

            // Populate card content. onerror handles missing images with a placeholder.
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" onerror="this.onerror=null;this.src='https://placehold.co/400x250/cccccc/333333?text=Image+Error';" />
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
            carouselTrack.appendChild(card); // Add the card to the carousel track
        });
    };

    /**
     * Advances the project carousel to the next slide.
     */
    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % projects.length; // Cycle through projects
        renderCarousel(); // Re-render to update card positions
    };

    /**
     * Moves the project carousel to the previous slide.
     */
    const prevSlide = () => {
        // Calculate previous index, handling wrap-around for negative results
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        renderCarousel(); // Re-render to update card positions
    };

    // Add event listeners for project carousel navigation arrows
    if (prevArrow) prevArrow.addEventListener("click", prevSlide);
    if (nextArrow) nextArrow.addEventListener("click", nextSlide);

    // Initial rendering of the project carousel on page load
    if (carouselTrack) renderCarousel();


    // --- Leadership Carousel Scripts ---
    const leadershipData = [
        {
            id: 1,
            title: "Early Leadership & Peer Support",
            paragraph1: "During secondary school and ITE, I embraced several **leadership roles** that enhanced my **confidence, teamwork, and communication**.",
            paragraph2: "As a **Peer Support Leader**, I supported classmates’ well-being and helped foster a positive environment. As **Vice Chairperson**, I coordinated class matters and worked closely with teachers to ensure smooth communication.",
            image: "../images/leadership-placeholder.jpg" // Ensure this image path is correct
        },
        {
            id: 2,
            title: "National Cadet Corps (NCC) Leadership",
            paragraph1: "In the **National Cadet Corps (NCC)**, I rose to **Staff Sergeant**, leading training sessions and mentoring younger cadets.",
            paragraph2: "This experience developed my **leadership, mentoring, and motivational skills**, helping me guide and support my team effectively.",
            image: "../images/leadership-NCC.jpg" // Ensure this image path is correct or update with a real image
        },
        {
            id: 3,
            title: "Entrepreneurship Club & Student Mentor", // More concise title
            paragraph1: "At ITE, I further grew as a leader by serving as an **EXCO member** of the Entrepreneurship Club, leading projects such as **Meals on Wheels**.",
            paragraph2: "Additionally, as a **Student Mentor**, I provided academic and personal support to peers. These roles taught me to **inspire others, take initiative, and adapt to diverse team dynamics.**",
            image: "../images/leadership-placeholder-3.jpg" // Another placeholder, update with actual image
        }
        // Add more leadership cards here following the same structure
    ];

    const leadershipCardTrack = document.querySelector(".leadership-card-track");
    const currentLeadershipImage = document.getElementById("currentLeadershipImage");
    const leadershipPrevArrow = document.querySelector(".leadership-arrow.prev");
    const leadershipNextArrow = document.querySelector(".leadership-arrow.next");

    // --- Leadership Carousel Auto-scroll with Pause on Hover/Touch ---
    let leadershipInterval;
    function startLeadershipAutoScroll() {
        if (leadershipData.length > 1) { // Only auto-scroll if there's more than one card
            leadershipInterval = setInterval(() => {
                leadershipNextArrow.click();
            }, 4000);
        }
    }
    function stopLeadershipAutoScroll() {
        clearInterval(leadershipInterval);
    }

    const leadershipCarouselContainer = document.querySelector('.leadership-carousel-container');
    if (leadershipCarouselContainer) {
        leadershipCarouselContainer.addEventListener('mouseenter', stopLeadershipAutoScroll);
        leadershipCarouselContainer.addEventListener('mouseleave', startLeadershipAutoScroll);
        leadershipCarouselContainer.addEventListener('touchstart', stopLeadershipAutoScroll);
        leadershipCarouselContainer.addEventListener('touchend', startLeadershipAutoScroll);
        startLeadershipAutoScroll(); // Start auto-scroll on page load
    }

    let currentLeadershipIndex = 0;

    /**
     * Calculates CSS styles for a leadership carousel card based on its position relative to the active card.
     * This is a slightly simplified version compared to the project carousel, focusing on visibility and basic positioning.
     * @param {number} index - The index of the current card in the leadershipData array.
     * @param {number} currentActiveIndex - The index of the currently active (main) card.
     * @returns {object} An object containing CSS style properties.
     */
    const getLeadershipCardStyles = (index, currentActiveIndex) => {
        let opacity = 0;
        let pointerEvents = "none";
        let transform = "translateX(100%)"; // Off-screen by default
        let zIndex = 1;
        let visibility = "hidden"; // Hidden by default

        if (index === currentActiveIndex) {
            // Active card
            opacity = 1;
            pointerEvents = "auto";
            transform = "translateX(0%)"; // Centered
            zIndex = 10;
            visibility = "visible";
        }

        return {
            opacity: opacity,
            pointerEvents: pointerEvents,
            transform: transform,
            zIndex: zIndex,
            position: "absolute", // Important for layering and transformation
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            visibility: visibility,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out, visibility 0.5s ease-in-out",
        };
    };

    /**
     * Renders the current leadership info card and its corresponding image.
     * Updates the content and image source/alt based on the currentLeadershipIndex.
     */
    const renderLeadershipCarousel = () => {
        if (!leadershipCardTrack || !currentLeadershipImage) return; // Exit if elements not found

        // Clear any existing cards in the track
        leadershipCardTrack.innerHTML = '';

        // Loop through all leadership data to create and append cards
        leadershipData.forEach((data, index) => {
            const card = document.createElement("div");
            card.classList.add("leadership-card");

            // Apply dynamic styles based on if it's the current active card
            Object.assign(card.style, getLeadershipCardStyles(index, currentLeadershipIndex));

            card.innerHTML = `
                <h3><i class="fas fa-user-tie"></i> ${data.title}</h3>
                <p>${data.paragraph1}</p>
                <p>${data.paragraph2 || ''}</p>
            `;
            leadershipCardTrack.appendChild(card);
        });

        // Update the main leadership image display
        currentLeadershipImage.src = leadershipData[currentLeadershipIndex].image;
        currentLeadershipImage.alt = `Image for: ${leadershipData[currentLeadershipIndex].title}`;
    };

    /**
     * Advances the leadership carousel to the next slide.
     */
    const nextLeadershipSlide = () => {
        currentLeadershipIndex = (currentLeadershipIndex + 1) % leadershipData.length;
        renderLeadershipCarousel();
    };

    /**
     * Moves the leadership carousel to the previous slide.
     */
    const prevLeadershipSlide = () => {
        currentLeadershipIndex = (currentLeadershipIndex - 1 + leadershipData.length) % leadershipData.length;
        renderLeadershipCarousel();
    };

    // Add event listeners for leadership carousel navigation arrows
    if (leadershipPrevArrow) leadershipPrevArrow.addEventListener("click", prevLeadershipSlide);
    if (leadershipNextArrow) leadershipNextArrow.addEventListener("click", nextLeadershipSlide);

    // Initial rendering of the leadership carousel on page load
    if (leadershipCardTrack) renderLeadershipCarousel();


    // --- Volunteering Carousel Scripts ---
    const volunteeringData = [
        {
            id: 1,
            title: "Project Rice (ITE College East)",
            paragraph1: "At **ITE College East**, I became more involved in community projects such as **Project Rice**, packing daily necessities for the elderly. While attendance was only required once, I chose to contribute on both days to give back more deeply.",
            image: "../images/Volunteering-ProjectRice.jpg" // Update with actual image path
        },
        {
            id: 2,
            title: "Meals on Wheels (Bethesda Care Services)",
            paragraph1: "The most rewarding experience was with **Meals on Wheels** under **Bethesda Care Services**. Joining through the **Entrepreneurship Club**, I was the only member to consistently participate, delivering meals and offering companionship to elderly recipients.",
            paragraph2: "This experience deepened my empathy and strengthened my sense of responsibility.",
            image: "../images/Volunteering-MealsOnWheels1.jpg", // Update with actual image path
        },
        // Add more volunteering cards here
    ];

    const volunteeringCardTrack = document.querySelector(".volunteering-card-track");
    const currentVolunteeringImage = document.getElementById("currentVolunteeringImage");
    const volunteeringPrevArrow = document.querySelector(".volunteering-arrow.prev");
    const volunteeringNextArrow = document.querySelector(".volunteering-arrow.next");


    // --- Volunteering Carousel Auto-scroll with Pause on Hover/Touch ---
    let volunteeringInterval;
    function startVolunteeringAutoScroll() {
        if (volunteeringData.length > 1) { // Only auto-scroll if there's more than one card
            volunteeringInterval = setInterval(() => {
                volunteeringNextArrow.click();
            }, 4000);
        }
    }
    function stopVolunteeringAutoScroll() {
        clearInterval(volunteeringInterval);
    }

    const volunteeringCarouselContainer = document.querySelector('.volunteering-carousel-container');
    if (volunteeringCarouselContainer) {
        volunteeringCarouselContainer.addEventListener('mouseenter', stopVolunteeringAutoScroll);
        volunteeringCarouselContainer.addEventListener('mouseleave', startVolunteeringAutoScroll);
        volunteeringCarouselContainer.addEventListener('touchstart', stopVolunteeringAutoScroll);
        volunteeringCarouselContainer.addEventListener('touchend', stopVolunteeringAutoScroll); // Use touchend for consistency
        startVolunteeringAutoScroll(); // Start auto-scroll on page load
    }

    let currentVolunteeringIndex = 0;

    /**
     * Calculates CSS styles for a volunteering carousel card.
     * This is a simplified version, similar to leadership, focusing on visibility and basic positioning.
     * @param {number} index - The index of the current card in the volunteeringData array.
     * @param {number} currentActiveIndex - The index of the currently active (main) card.
     * @returns {object} An object containing CSS style properties.
     */
    const getVolunteeringCardStyles = (index, currentActiveIndex) => {
        let opacity = 0;
        let pointerEvents = "none";
        let transform = "translateX(100%)"; // Off-screen by default
        let zIndex = 1;
        let visibility = "hidden"; // Hidden by default

        if (index === currentActiveIndex) {
            // Active card
            opacity = 1;
            pointerEvents = "auto";
            transform = "translateX(0%)"; // Centered
            zIndex = 10;
            visibility = "visible";
        }

        return {
            opacity: opacity,
            pointerEvents: pointerEvents,
            transform: transform,
            zIndex: zIndex,
            position: "absolute", // Important for layering and transformation
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            visibility: visibility,
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out, visibility 0.5s ease-in-out",
        };
    };

    /**
     * Renders the current volunteering info card and its corresponding image.
     * Updates the content and image source/alt based on the currentVolunteeringIndex.
     */
    const renderVolunteeringCarousel = () => {
        if (!volunteeringCardTrack || !currentVolunteeringImage) return; // Exit if elements not found

        volunteeringCardTrack.innerHTML = ''; // Clear existing card content

        // Loop through all volunteering data to create and append cards
        volunteeringData.forEach((data, index) => {
            const card = document.createElement("div");
            card.classList.add("volunteering-card");

            // Apply dynamic styles based on if it's the current active card
            Object.assign(card.style, getVolunteeringCardStyles(index, currentVolunteeringIndex));

            card.innerHTML = `
                <h3><i class="fas fa-hands-helping"></i> ${data.title}</h3>
                <p>${data.paragraph1}</p>
                <p>${data.paragraph2 || ''}</p>
            `;
            volunteeringCardTrack.appendChild(card);
        });

        // Update the main volunteering image display
        currentVolunteeringImage.src = volunteeringData[currentVolunteeringIndex].image;
        currentVolunteeringImage.alt = `Image for: ${volunteeringData[currentVolunteeringIndex].title}`;
    };

    /**
     * Advances the volunteering carousel to the next slide.
     */
    const nextVolunteeringSlide = () => {
        currentVolunteeringIndex = (currentVolunteeringIndex + 1) % volunteeringData.length;
        renderVolunteeringCarousel();
    };

    /**
     * Moves the volunteering carousel to the previous slide.
     */
    const prevVolunteeringSlide = () => {
        currentVolunteeringIndex = (currentVolunteeringIndex - 1 + volunteeringData.length) % volunteeringData.length;
        renderVolunteeringCarousel();
    };

    // Add event listeners for volunteering carousel navigation arrows
    if (volunteeringPrevArrow) volunteeringPrevArrow.addEventListener("click", prevVolunteeringSlide);
    if (volunteeringNextArrow) volunteeringNextArrow.addEventListener("click", nextVolunteeringSlide);

    // Initial rendering of the volunteering carousel on page load
    if (volunteeringCardTrack) renderVolunteeringCarousel();


    // --- Image Modal (Lightbox) for Awards & Certificates ---
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");

    // Add click listeners to all award images to open the modal
    document.querySelectorAll(".award-card img").forEach((img) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    // Add click listeners to all testimonial images to open the modal
    document.querySelectorAll(".testimonial-card img").forEach((img) => {
        img.style.cursor = "pointer";
        img.addEventListener("click", function () {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });

    // Close modal when 'x' is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Close modal when clicking outside the image content (on the dark overlay)
    if (modal) {
        window.addEventListener("click", function (e) {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // --- "View More" Button for Skills (if this is on a separate skills page, this script won't run on index.html) ---
    const toggleSkillsBtn = document.getElementById("toggle-skills-btn");
    if (toggleSkillsBtn) {
        toggleSkillsBtn.addEventListener("click", function () {
            const hiddenSkills = document.querySelector(".hidden-skill");
            const isExpanded = this.getAttribute("data-expanded") === "true";

            if (hiddenSkills) { // Check if hiddenSkills exists
                hiddenSkills.style.display = isExpanded ? "none" : "block";
            }
            this.textContent = isExpanded ? "View More >" : "View Less <";
            this.setAttribute("data-expanded", !isExpanded);
        });
    }

    // --- Form submission handling for popup (from Contact page) ---
    const contactForm = document.getElementById("contact-form");
    const formPopup = document.getElementById("form-popup");

    if (contactForm && formPopup) {
        contactForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const form = e.target;
            const formData = new FormData(form);

            try {
                const response = await fetch("https://formspree.io/f/xldbagko", {
                    method: "POST",
                    headers: { Accept: "application/json" },
                    body: formData
                });

                if (response.ok) {
                    form.reset();
                    formPopup.textContent = "✅ Your message has been sent successfully.";
                    formPopup.classList.add("show");
                    setTimeout(() => {
                        formPopup.classList.remove("show");
                    }, 4000);
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        formPopup.textContent = `❌ Error: ${data.errors.map(error => error.message).join(', ')}`;
                    } else {
                        formPopup.textContent = '❌ An error occurred while sending your message.';
                    }
                    formPopup.classList.add("show");
                    setTimeout(() => {
                        formPopup.classList.remove("show");
                    }, 5000);
                }
            } catch (error) {
                console.error("Form submission error:", error);
                formPopup.textContent = '❌ Network error. Please try again.';
                formPopup.classList.add("show");
                setTimeout(() => {
                    formPopup.classList.remove("show");
                }, 5000);
            }
        });
    }
});
