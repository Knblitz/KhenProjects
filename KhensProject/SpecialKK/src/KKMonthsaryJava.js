// JavaScript for Monthsary App
const correctPassword = "ilovemilo675"; // IMPORTANT: This is not secure for production.
const loginForm = document.getElementById("loginForm");
const loginPage = document.getElementById("loginPage");
const mainContent = document.getElementById("mainContent");
const loginError = document.getElementById("loginError");
const tabButtonsContainer = document.getElementById("tabButtons");
const tabContentsContainer = document.getElementById("tabContents");
const addTabForm = document.getElementById("addTabForm");
const tabTitleInput = document.getElementById("tabTitle");

// Input fields for ADD form (these are static in the HTML)
const meetUpTimeInput = document.getElementById("meetUpTime");
const lunchLocationInput = document.getElementById("lunchLocation");
const transportToLunchInput = document.getElementById("transportToLunch");
const snackChillLocationInput = document.getElementById("snackChillLocation");
const transportToSnackChillInput = document.getElementById("transportToSnackChill");
const dinnerLocationInput = document.getElementById("dinnerLocation");
const transportToDinnerInput = document.getElementById("transportToDinner"); // Corrected this selection
const headBackHomeInput = document.getElementById("headBackHome");

const tabPlansInput = document.getElementById("tabPlans"); // Other activities

const titleError = document.getElementById("titleError");
// Error spans for ADD form
const meetUpTimeError = document.getElementById("meetUpTimeError");
const lunchLocationError = document.getElementById("lunchLocationError");
const transportToLunchError = document.getElementById("transportToLunchError");
const snackChillLocationError = document.getElementById("snackChillLocationError");
const transportToSnackChillError = document.getElementById("transportToSnackChillError");
const dinnerLocationError = document.getElementById("dinnerLocationError");
const transportToDinnerError = document.getElementById("transportToDinnerError");
const headBackHomeError = document.getElementById("headBackHomeError");

const plansError = document.getElementById("plansError"); // Error P for plans in add form
const daysTogetherCounterElement = document.getElementById("daysTogetherCounter"); // Get counter element

let tabs = [];
let activeTab = null; // Stores the index of the currently active tab

// --- Calculate and Display Days Together ---
function displayDaysTogether() {
    const startDate = new Date("2024-02-24T00:00:00"); // Set to midnight to count full days
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0); // Set current date to midnight for accurate day difference

    // Calculate the difference in milliseconds
    const differenceInTime = currentDate.getTime() - startDate.getTime();
    
    // Calculate the difference in days
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

    if (daysTogetherCounterElement) {
        if (differenceInDays >= 0) {
            daysTogetherCounterElement.textContent = `Together for ${differenceInDays} wonderful day${differenceInDays === 1 ? '' : 's'}! ❤️`;
        } else {
            daysTogetherCounterElement.textContent = `Counting down to our special day!`; // Or handle future dates differently
        }
    }
}


// --- Check for existing login session ---
if (sessionStorage.getItem('isLoggedIn') === 'true') {
    loginPage.style.display = "none";
    mainContent.style.display = "block";
    displayDaysTogether(); // Display counter on load if logged in
    initializeTabs();
}

// --- Login ---
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const passwordInput = document.getElementById("password").value;

    if (passwordInput === correctPassword) {
        loginPage.style.display = "none";
        mainContent.style.display = "block";
        sessionStorage.setItem('isLoggedIn', 'true'); // Store login state
        displayDaysTogether(); // Display counter on successful login
        initializeTabs(); // Call this function after successful login
    } else {
        loginError.textContent = "Incorrect password. Please try again.";
        loginError.style.display = "block";
        document.getElementById("password").value = ""; // Clear password field
    }
});

// --- Tabs Management ---
function initializeTabs() {
    const savedTabs = localStorage.getItem("monthsaryTabs");
    if (savedTabs) {
        tabs = JSON.parse(savedTabs);
    } else {
        // Default tabs if none are saved
        tabs = [
            { 
                title: "1st Monthsary", 
                details: {
                    meetUpTime: "10:00", // 24hr format
                    lunchLocation: "Cozy Cafe, 1.5 hours",
                    transportToLunch: "Walk, 5 min",
                    snackChillLocation: "Bookstore, 1 hour",
                    transportToSnackChill: "Bus 123, 10 min",
                    dinnerLocation: "Home cooked meal, 2 hours",
                    transportToDinner: "Walk, 0 min",
                    headBackHome: "Chill at home"
                },
                plans: ["Exchange small gifts", "Watch a movie"] 
            },
            { 
                title: "3rd Monthsary", 
                details: {
                    meetUpTime: "11:00", // 24hr format
                    lunchLocation: "Picnic at the park, 2 hours",
                    transportToLunch: "MRT to Botanic Gardens, 20 min",
                    snackChillLocation: "Ice Cream Parlor, 45 min",
                    transportToSnackChill: "Walk, 10 min",
                    dinnerLocation: "Seafood Restaurant, 2 hours",
                    transportToDinner: "Grab, 15 min",
                    headBackHome: "Cab home"
                },
                plans: ["Stargazing (weather permitting)", "Write letters to each other"] 
            },
            { 
                title: "6th Monthsary", 
                details: {
                    meetUpTime: "09:00", // 24hr format
                    lunchLocation: "Hotel Brunch, 2 hours",
                    transportToLunch: "Hotel shuttle, 5 min",
                    snackChillLocation: "Beach cafe, 1.5 hours",
                    transportToSnackChill: "Taxi, 20 min",
                    dinnerLocation: "Fine Dining Restaurant, 2.5 hours",
                    transportToDinner: "Hotel car, 10 min",
                    headBackHome: "Return to hotel"
                },
                plans: ["Weekend trip", "Explore a new city", "Couple's spa day"] 
            },
        ];
        saveTabsToLocalStorage();
    }
    renderTabs();
}

function saveTabsToLocalStorage() {
    localStorage.setItem('monthsaryTabs', JSON.stringify(tabs));
}

function renderTabs() {
    tabButtonsContainer.innerHTML = ""; // Clear existing buttons
    tabContentsContainer.innerHTML = ""; // Clear existing content

    if (tabs.length === 0) {
        tabContentsContainer.innerHTML = `<p class="text-gray-500 text-center py-10">No monthsary plans added yet. Use the form below to add your first plan!</p>`;
        activeTab = null; // Reset active tab if no tabs
        return;
    }

    tabs.forEach((tab, index) => {
        // Create Tab Button
        const tabButtonContainer = document.createElement("div");
        tabButtonContainer.className = "relative flex items-center group mb-2 sm:mb-0"; // Added relative and group for potential future styling

        const tabButton = document.createElement("button");
        // Tailwind classes for styling tab buttons:
        tabButton.className = `tab-button text-sm sm:text-base font-medium py-2 px-4 rounded-t-lg focus:outline-none transition-all duration-200 ease-in-out whitespace-nowrap
                                ${index === activeTab ? 'bg-pink-500 text-white shadow-md' : 'bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-700'}`;
        tabButton.textContent = tab.title;
        tabButton.dataset.tabIndex = index; // Use index for referencing
        tabButton.addEventListener("click", () => {
            showTab(index);
        });

        // Create Delete Button for the tab
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fas fa-times"></i>`; // Using Font Awesome icon
        deleteButton.className = "tab-delete-button ml-2 text-red-400 hover:text-red-600 focus:outline-none";
        deleteButton.title = "Delete this plan"; // Tooltip
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent tab click when deleting
            const isConfirmed = window.confirm(`Are you sure you want to delete the "${tab.title}" plan? This action cannot be undone.`);
            if (isConfirmed) {
                deleteTab(index);
            }
        });

        tabButtonContainer.appendChild(tabButton);
        tabButtonContainer.appendChild(deleteButton);
        tabButtonsContainer.appendChild(tabButtonContainer);

        // Create Tab Content Pane
        const tabContent = document.createElement("div");
        tabContent.id = `tab-content-${index}`;
        tabContent.className = `tab p-6 rounded-b-lg rounded-tr-lg bg-white border border-t-0 border-gray-200 shadow-inner ${index === activeTab ? 'active' : ''}`;
        
        // Populate content with tab details using the new structured data
        let detailsHtml = '';
        if (tab.details) {
            detailsHtml += `
                <div class="mb-4">
                    <p class="text-gray-700"><strong class="text-purple-600">1. Meet Up Time:</strong> ${escapeHTML(tab.details.meetUpTime || 'Not specified')}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <p class="text-gray-700"><strong class="text-purple-600">2. Lunch Location & Duration:</strong> ${escapeHTML(tab.details.lunchLocation || 'Not specified')}</p>
                    <p class="text-gray-700"><strong class="text-purple-600">Transport to Lunch:</strong> ${escapeHTML(tab.details.transportToLunch || 'Not specified')}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <p class="text-gray-700"><strong class="text-purple-600">3. Snack/Chill Location & Duration:</strong> ${escapeHTML(tab.details.snackChillLocation || 'Not specified')}</p>
                    <p class="text-gray-700"><strong class="text-purple-600">Transport to Snack/Chill:</strong> ${escapeHTML(tab.details.transportToSnackChill || 'Not specified')}</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <p class="text-gray-700"><strong class="text-purple-600">4. Dinner Location & Duration:</strong> ${escapeHTML(tab.details.dinnerLocation || 'Not specified')}</p>
                    <p class="text-gray-700"><strong class="text-purple-600">Transport to Dinner:</strong> ${escapeHTML(tab.details.transportToDinner || 'Not specified')}</p>
                </div>
                <div class="mb-6">
                    <p class="text-gray-700"><strong class="text-purple-600">5. Head Back Home:</strong> ${escapeHTML(tab.details.headBackHome || 'Not specified')}</p>
                </div>
            `;
        } else {
            detailsHtml = `<p class="text-gray-500 italic mb-6">No specific daily plan details for this monthsary.</p>`;
        }


        tabContent.innerHTML = `
            <h2 class="dancing-script text-3xl font-semibold text-pink-700 mb-4">${escapeHTML(tab.title)}</h2>
            <h3 class="text-xl font-semibold text-purple-700 mb-3 dancing-script">Our Day Plan:</h3>
            ${detailsHtml}
            <h3 class="text-xl font-semibold text-purple-700 mb-3 dancing-script">Other Activities:</h3>
            ${tab.plans && tab.plans.length > 0 ? `
                <ul class="list-disc list-inside space-y-2 text-gray-600 pl-4">
                    ${tab.plans.map(plan => `<li>${escapeHTML(plan)}</li>`).join('')}
                </ul>` : '<p class="text-gray-500 italic">No additional activities listed for this monthsary.</p>'}
            <div class="mt-8 flex justify-end space-x-3">
                <button class="edit-button bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 text-sm" data-tab-index="${index}">
                    <i class="fas fa-edit mr-1"></i> Edit
                </button>
            </div>
        `;
        tabContentsContainer.appendChild(tabContent);
    });

    // If activeTab is null (e.g., after deleting the last tab, or on initial load with tabs) or invalid, show the first tab.
    if ((activeTab === null || activeTab >= tabs.length) && tabs.length > 0) {
        showTab(0);
    } else if (tabs.length > 0) {
        showTab(activeTab); // Re-apply active state if activeTab is still valid
    }
}

function showTab(index) {
    if (index < 0 || index >= tabs.length) { // Safety check
        if (tabs.length > 0) index = 0; // Default to first if out of bounds
        else { // No tabs left
            activeTab = null;
            renderTabs(); // Re-render to show empty state
            return;
        }
    }

    // Deactivate previously active tab (if any)
    if (activeTab !== null && activeTab < tabs.length) { // Check if activeTab is valid
        const prevTabButton = tabButtonsContainer.querySelector(`[data-tab-index="${activeTab}"]`);
        const prevTabContent = document.getElementById(`tab-content-${activeTab}`);
        if (prevTabButton) {
            prevTabButton.classList.remove('bg-pink-500', 'text-white', 'shadow-md');
            prevTabButton.classList.add('bg-pink-100', 'text-pink-600', 'hover:bg-pink-200', 'hover:text-pink-700');
        }
        if (prevTabContent) {
            prevTabContent.classList.remove('active');
        }
    }

    // Activate new tab
    activeTab = index;
    const currentTabButton = tabButtonsContainer.querySelector(`[data-tab-index="${index}"]`);
    const currentTabContent = document.getElementById(`tab-content-${index}`);

    if (currentTabButton) {
        currentTabButton.classList.add('bg-pink-500', 'text-white', 'shadow-md');
        currentTabButton.classList.remove('bg-pink-100', 'text-pink-600', 'hover:bg-pink-200', 'hover:text-pink-700');
    }
    if (currentTabContent) {
        currentTabContent.classList.add('active');
    }
}

function deleteTab(index) {
    tabs.splice(index, 1); // Remove tab from array
    saveTabsToLocalStorage(); // Update localStorage

    // Adjust activeTab if necessary
    if (activeTab === index) { // If the deleted tab was active
        activeTab = (tabs.length > 0) ? Math.max(0, index -1) : null; // Show previous or first, or none
    } else if (activeTab > index) { // If active tab was after the deleted one
        activeTab--;
    }
    renderTabs(); // Re-render UI
}

// Event listener for Edit buttons (using event delegation)
tabContentsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button') || event.target.closest('.edit-button')) {
        const button = event.target.classList.contains('edit-button') ? event.target : event.target.closest('.edit-button');
        const tabIndex = parseInt(button.dataset.tabIndex);
        if (!isNaN(tabIndex) && tabIndex >= 0 && tabIndex < tabs.length) {
            showEditForm(tabIndex);
        }
    }
});

function showEditForm(index) {
    const tab = tabs[index];

    // Create modal container
    const formModal = document.createElement('div');
    formModal.id = 'editFormModal';
    formModal.className = "fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"; // Added padding for small screens
    formModal.innerHTML = `
        <div class="bg-white rounded-lg shadow-2xl p-6 md:p-8 max-w-lg w-full modal-content-scrollable">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-semibold text-pink-700 dancing-script">Edit Monthsary Plan</h2>
                <button id="closeEditModal" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <form id="editTabForm" class="space-y-6">
                <div>
                    <label for="editTabTitle" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                    <input type="text" id="editTabTitle" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.title)}" placeholder="Enter Title">
                    <p id="editTitleError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="editMeetUpTime" class="block text-gray-700 text-sm font-bold mb-2">1. Meet Up Time (24hr):</label>
                        <input type="time" id="editMeetUpTime" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.details.meetUpTime || '')}">
                        <p id="editMeetUpTimeError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="editLunchLocation" class="block text-gray-700 text-sm font-bold mb-2">2. Lunch Location & Duration:</label>
                        <input type="text" id="editLunchLocation" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.details.lunchLocation || '')}" placeholder="e.g., Italian Restaurant, 2 hours">
                        <p id="editLunchLocationError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                    </div>
                    <div>
                        <label for="editTransportToLunch" class="block text-gray-700 text-sm font-bold mb-2">Transport to Lunch Location:</label>
                        <input type="text" id="editTransportToLunch" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.details.transportToLunch || '')}" placeholder="e.g., Bus 100, 15 min">
                        <p id="editTransportToLunchError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="editSnackChillLocation" class="block text-gray-700 text-sm font-bold mb-2">3. Snack/Chill Location & Duration:</label>
                        <input type="text" id="editSnackChillLocation" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.details.snackChillLocation || '')}" placeholder="e.g., Cafe by the river, 1.5 hours">
                        <p id="editSnackChillLocationError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                    </div>
                    <div>
                        <label for="editTransportToSnackChill" class="block text-gray-700 text-sm font-bold mb-2">Transport to Snack/Chill Location:</label>
                        <input type="text" id="editTransportToSnackChill" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.details.transportToSnackChill || '')}" placeholder="e.g., Taxi, 10 min">
                        <p id="editTransportToSnackChillError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label for="editDinnerLocation" class="block text-gray-700 text-sm font-bold mb-2">4. Dinner Location & Duration:</label>
                        <input type="text" id="editDinnerLocation" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.details.dinnerLocation || '')}" placeholder="e.g., Rooftop Bar & Grill, 2.5 hours">
                        <p id="editDinnerLocationError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                    </div>
                    <div>
                        <label for="editTransportToDinner" class="block text-gray-700 text-sm font-bold mb-2">Transport to Dinner Location:</label>
                        <input type="text" id="editTransportToDinner" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.details.transportToDinner || '')}" placeholder="e.g., MRT, 20 min">
                        <p id="editTransportToDinnerError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                    </div>
                </div>

                <div>
                    <label for="editHeadBackHome" class="block text-gray-700 text-sm font-bold mb-2">5. Head Back Home:</label>
                    <input type="text" id="editHeadBackHome" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.details.headBackHome || '')}" placeholder="e.g., Take the last train, ~30 min">
                    <p id="editHeadBackHomeError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                </div>

                <div>
                    <label for="editTabPlans" class="block text-gray-700 text-sm font-bold mb-2">Other Activities (comma-separated):</label>
                    <input type="text" id="editTabPlans" class="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500" value="${escapeHTML(tab.plans.join(', '))}" placeholder="e.g., Dinner, Movie, Gift">
                    <p id="editPlansError" class="text-red-500 text-xs italic mt-1" style="display: none;"></p>
                </div>
                <div class="flex justify-end space-x-4 pt-4">
                    <button type="button" id="cancelEditBtn" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">Cancel</button>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(formModal);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    // *** IMPORTANT FIX: Re-select elements *after* the modal is in the DOM ***
    const cancelEditBtn = formModal.querySelector('#cancelEditBtn');
    const closeEditModalBtn = formModal.querySelector('#closeEditModal');
    const editForm = formModal.querySelector('#editTabForm');
    const editTitleInput = formModal.querySelector('#editTabTitle');

    // Edit form new input elements
    const editMeetUpTimeInput = formModal.querySelector('#editMeetUpTime');
    // Ensure value is set correctly from the tab data for type="time"
    editMeetUpTimeInput.value = tab.details.meetUpTime || ''; 

    const editLunchLocationInput = formModal.querySelector('#editLunchLocation');
    const editTransportToLunchInput = formModal.querySelector('#editTransportToLunch');
    const editSnackChillLocationInput = formModal.querySelector('#editSnackChillLocation');
    const editTransportToSnackChillInput = formModal.querySelector('#editTransportToSnackChill');
    const editDinnerLocationInput = formModal.querySelector('#editDinnerLocation');
    const editTransportToDinnerInput = formModal.querySelector('#editTransportToDinner');
    const editHeadBackHomeInput = formModal.querySelector('#editHeadBackHome');

    const editTabPlansInput = formModal.querySelector('#editTabPlans');

    // Edit form new error elements
    const editTitleError = formModal.querySelector('#editTitleError');
    const editMeetUpTimeError = formModal.querySelector('#editMeetUpTimeError');
    const editLunchLocationError = formModal.querySelector('#editLunchLocationError');
    const editTransportToLunchError = formModal.querySelector('#editTransportToLunchError');
    const editSnackChillLocationError = formModal.querySelector('#editSnackChillLocationError');
    const editTransportToSnackChillError = formModal.querySelector('#editTransportToSnackChillError');
    const editDinnerLocationError = formModal.querySelector('#editDinnerLocationError');
    const editTransportToDinnerError = formModal.querySelector('#editTransportToDinnerError');
    const editHeadBackHomeError = formModal.querySelector('#editHeadBackHomeError');
    const editPlansError = formModal.querySelector('#editPlansError');

    const closeModal = () => {
        formModal.remove();
        document.body.style.overflow = 'auto';
    };

    cancelEditBtn.addEventListener('click', closeModal);
    closeEditModalBtn.addEventListener('click', closeModal);
    // Optional: Close modal if clicking outside of it
    formModal.addEventListener('click', (event) => {
        if (event.target.id === 'editFormModal') { // Clicked on the backdrop
            closeModal();
        }
    });


    editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = editTitleInput.value.trim();
        
        // Collect data from new fields
        const meetUpTime = editMeetUpTimeInput.value.trim(); // Value is "HH:MM"
        const lunchLocation = editLunchLocationInput.value.trim();
        const transportToLunch = editTransportToLunchInput.value.trim();
        const snackChillLocation = editSnackChillLocationInput.value.trim();
        const transportToSnackChill = editTransportToSnackChillInput.value.trim();
        const dinnerLocation = editDinnerLocationInput.value.trim();
        const transportToDinner = editTransportToDinnerInput.value.trim(); // This was the bug from before
        const headBackHome = editHeadBackHomeInput.value.trim();

        const plansText = editTabPlansInput.value.trim();
        const plans = plansText ? plansText.split(',').map(p => p.trim()).filter(p => p) : [];


        let hasErrors = false;
        // --- Validation for Edit Form ---
        if (!title) {
            editTitleError.textContent = "Please enter a title.";
            editTitleError.style.display = "block";
            hasErrors = true;
        } else {
            editTitleError.style.display = "none";
        }
        
        // Basic validation for new structured fields (optional, can be made more robust)
        // For type="time", the browser handles format validation, but we can check if it's empty
        if (!meetUpTime) {
            editMeetUpTimeError.textContent = "Please enter meet up time.";
            editMeetUpTimeError.style.display = "block";
            hasErrors = true;
        } else {
            editMeetUpTimeError.style.display = "none";
        }

        if (!lunchLocation) {
            editLunchLocationError.textContent = "Please enter lunch details.";
            editLunchLocationError.style.display = "block";
            hasErrors = true;
        } else {
            editLunchLocationError.style.display = "none";
        }
        if (!transportToLunch) {
            editTransportToLunchError.textContent = "Please enter transport to lunch.";
            editTransportToLunchError.style.display = "block";
            hasErrors = true;
        } else {
            editTransportToLunchError.style.display = "none";
        }
        if (!snackChillLocation) {
            editSnackChillLocationError.textContent = "Please enter snack/chill details.";
            snackChillLocationError.style.display = "block";
            hasErrors = true;
        } else {
            snackChillLocationError.style.display = "none";
        }
        if (!transportToSnackChill) {
            editTransportToSnackChillError.textContent = "Please enter transport to snack/chill.";
            editTransportToSnackChillError.style.display = "block";
            hasErrors = true;
        } else {
            editTransportToSnackChillError.style.display = "none";
        }
        if (!dinnerLocation) {
            editDinnerLocationError.textContent = "Please enter dinner details.";
            editDinnerLocationError.style.display = "block";
            hasErrors = true;
        } else {
            editDinnerLocationError.style.display = "none";
        }
        if (!transportToDinner) {
            editTransportToDinnerError.textContent = "Please enter transport to dinner.";
            editTransportToDinnerError.style.display = "block";
            hasErrors = true;
        } else {
            editTransportToDinnerError.style.display = "none";
        }
        if (!headBackHome) {
            editHeadBackHomeError.textContent = "Please enter head back home details.";
            editHeadBackHomeError.style.display = "block";
            hasErrors = true;
        } else {
            editHeadBackHomeError.style.display = "none";
        }


        if (plansText && plans.length === 0 && plansText.split(',').some(p => p.trim() === '')) {
            editPlansError.textContent = "Please enter valid activity items or leave empty.";
            editPlansError.style.display = "block";
            hasErrors = true;
        } else {
            editPlansError.style.display = "none";
        }


        if (hasErrors) {
            return; // Stop submission if there are errors
        }

        // Update tab data
        tabs[index].title = title;
        tabs[index].details = {
            meetUpTime: meetUpTime,
            lunchLocation: lunchLocation,
            transportToLunch: transportToLunch,
            snackChillLocation: snackChillLocation,
            transportToSnackChill: transportToSnackChill,
            dinnerLocation: dinnerLocation,
            transportToDinner: transportToDinner,
            headBackHome: headBackHome
        };
        tabs[index].plans = plans; // Store plans as an array

        saveTabsToLocalStorage();
        renderTabs(); // Re-render all tabs to reflect changes
        showTab(index); // Ensure the edited tab remains active
        closeModal(); // Close the modal
    });
}

// --- Add New Tab Form Submission ---
addTabForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = tabTitleInput.value.trim();
    
    // Collect data from new fields
    const meetUpTime = meetUpTimeInput.value.trim(); // Value is "HH:MM"
    const lunchLocation = lunchLocationInput.value.trim();
    const transportToLunch = transportToLunchInput.value.trim();
    const snackChillLocation = snackChillLocationInput.value.trim();
    const transportToSnackChill = snackChillLocationInput.value.trim(); // Corrected this selection
    const dinnerLocation = dinnerLocationInput.value.trim();
    const transportToDinner = transportToDinnerInput.value.trim(); // Corrected this selection from dinnerLocationInput.value.trim()
    const headBackHome = headBackHomeInput.value.trim();

    const plansText = tabPlansInput.value.trim();
    // Split plans by comma, trim whitespace, and filter out empty strings
    const plans = plansText ? plansText.split(',').map(p => p.trim()).filter(p => p) : [];


    let hasErrors = false;
    // --- Validation for Add Form ---
    if (!title) {
        titleError.textContent = "Please enter a title for the plan.";
        titleError.style.display = "block";
        hasErrors = true;
    } else {
        titleError.style.display = "none";
    }

    // Basic validation for new structured fields
    // For type="time", the browser handles format validation, but we can check if it's empty
    if (!meetUpTime) {
        meetUpTimeError.textContent = "Please enter meet up time.";
        meetUpTimeError.style.display = "block";
        hasErrors = true;
    } else {
        meetUpTimeError.style.display = "none";
    }

    if (!lunchLocation) {
        lunchLocationError.textContent = "Please enter lunch details.";
        lunchLocationError.style.display = "block";
        hasErrors = true;
    } else {
        lunchLocationError.style.display = "none";
    }
    if (!transportToLunch) {
        transportToLunchError.textContent = "Please enter transport to lunch.";
        transportToLunchError.style.display = "block";
        hasErrors = true;
    } else {
        transportToLunchError.style.display = "none";
    }
    if (!snackChillLocation) {
        snackChillLocationError.textContent = "Please enter snack/chill details.";
        snackChillLocationError.style.display = "block";
        hasErrors = true;
    } else {
        snackChillLocationError.style.display = "none";
    }
    if (!transportToSnackChill) {
        transportToSnackChillError.textContent = "Please enter transport to snack/chill.";
        transportToSnackChillError.style.display = "block";
        hasErrors = true;
    } else {
        transportToSnackChillError.style.display = "none";
    }
    if (!dinnerLocation) {
        dinnerLocationError.textContent = "Please enter dinner details.";
        dinnerLocationError.style.display = "block";
        hasErrors = true;
    } else {
        dinnerLocationError.style.display = "none";
    }
    if (!transportToDinner) {
        transportToDinnerError.textContent = "Please enter transport to dinner.";
        transportToDinnerError.style.display = "block";
        hasErrors = true;
    } else {
        transportToDinnerError.style.display = "none";
    }
    if (!headBackHome) {
        headBackHomeError.textContent = "Please enter head back home details.";
        headBackHomeError.style.display = "block";
        hasErrors = true;
    } else {
        headBackHomeError.style.display = "none";
    }

    // Plans are optional, but if text is entered, it should result in valid plans
    if (plansText && plans.length === 0 && plansText.split(',').some(p => p.trim() === '')) {
        plansError.textContent = "Please enter valid activity items or leave empty.";
        plansError.style.display = "block";
        hasErrors = true;
    } else {
        plansError.style.display = "none";
    }


    if (hasErrors) {
        return; // Stop if validation fails
    }

    const newTab = {
        title: title,
        details: { // Store structured data in 'details' object
            meetUpTime: meetUpTime,
            lunchLocation: lunchLocation,
            transportToLunch: transportToLunch,
            snackChillLocation: snackChillLocation,
            transportToSnackChill: transportToSnackChill,
            dinnerLocation: dinnerLocation,
            transportToDinner: transportToDinner,
            headBackHome: headBackHome
        },
        plans: plans, // Store other activities as an array
    };
    tabs.push(newTab);
    saveTabsToLocalStorage();
    renderTabs();
    showTab(tabs.length - 1); // Show the newly added tab
    addTabForm.reset(); // Clear the form fields
});

// Utility function to escape HTML to prevent XSS - basic version
function escapeHTML(str) {
    if (typeof str !== 'string') return str; // Return non-strings as is
    return str.replace(/[&<>"']/g, function (match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;' // or &apos;
        }[match];
    });
}