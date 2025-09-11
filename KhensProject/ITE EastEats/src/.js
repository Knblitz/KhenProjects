//MoodCloudJava.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Page Elements ---
    const authPage = document.getElementById('auth-page');
    const dashboardPage = document.getElementById('dashboard-page');
    const aboutUsPage = document.getElementById('about-us-page');

    // --- Auth Forms Elements ---
    const loginForm = document.getElementById('login-form');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const guestLoginBtn = document.getElementById('guest-login-btn');

    const registerForm = document.getElementById('register-form');
    const registerUsernameInput = document.getElementById('register-username');
    const registerEmailInput = document.getElementById('register-email');
    const registerPasswordInput = document.getElementById('register-password');

    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const forgotEmailInput = document.getElementById('forgot-email');

    // --- Dashboard Elements ---
    const displayUsername = document.getElementById('display-username');
    const logoutButton = document.getElementById('logout-button');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const aboutUsButton = document.getElementById('about-us-button');
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');

    const moodButtons = document.querySelectorAll('.mood-btn');
    const universalChatterboxBtn = document.getElementById('universal-chatterbox-btn');
    const currentMoodMessageDisplay = document.getElementById('current-mood-message');
    const currentMoodTitle = document.getElementById('current-mood-title');
    const messagesList = document.getElementById('messages-list');
    const newMessageText = document.getElementById('new-message-text');
    const postMessageBtn = document.getElementById('post-message-btn');
    const sortMessagesSelect = document.getElementById('sort-messages-select');

    // --- New: Motivational Quote Elements ---
    const dailyQuoteDisplay = document.getElementById('daily-quote'); // Added
    const newQuoteBtn = document.getElementById('new-quote-btn');     // Added

    // --- Popups ---
    const welcomeBackPopup = document.getElementById('welcome-back-popup');
    const welcomeBackMessage = document.getElementById('welcome-back-message');
    const yesFeelingBetterBtn = document.getElementById('yes-feeling-better');
    const notReallyFeelingBetterBtn = document.getElementById('not-really-feeling-better');
    const generalMessagePopup = document.getElementById('general-message-popup');
    const generalMessageText = document.getElementById('general-message-text');
    const closeGeneralMessageBtn = document.getElementById('close-general-message');

    // --- New: Post Option Popup Elements ---
    const postOptionPopup = document.getElementById('post-option-popup');
    const postAnonymouslyBtn = document.getElementById('post-anonymously-btn');
    const postWithUsernameBtn = document.getElementById('post-with-username-btn');

    // --- Master Control Panel Elements ---
    const masterControlButton = document.getElementById('master-control-button');
    const masterControlPanel = document.getElementById('master-control-panel');
    const closePanelBtn = masterControlPanel.querySelector('.close-panel'); 
    const deleteAllPostsButton = document.getElementById('delete-all-posts-btn');
    const clearLocalStorageBtn = document.getElementById('clear-local-storage-btn');
    const changeMasterPasswordBtn = document.getElementById('change-master-password-btn');
    const showPostCountBtn = document.getElementById('show-post-count-btn');
    const pinImportantPostBtn = document.getElementById('pin-important-post-btn');
    const clearEmptyPostsBtn = document.getElementById('clear-empty-posts-btn');
    const masterPanelInfo = document.getElementById('master-panel-info');

    // --- Master Control Password Prompt Elements ---
    const masterControlPwPrompt = document.getElementById('master-control-pw-prompt');
    const masterControlPwInput = document.getElementById('master-control-pw-input');
    const masterControlPwSubmit = document.getElementById('master-control-pw-submit');
    const masterControlPwError = document.getElementById('master-control-pw-error');
    const closePwPanelBtn = document.getElementById('close-pw-panel');

    // --- Global State ---
    let currentMood = '';
    const MASTER_PASSWORD = 'ilovemilo675'; // IMPORTANT: For demo only. Never hardcode in production!

    // --- UPDATED: Mood Messages Data ---
    const MOOD_MESSAGES_DATA = {
        "Happy": [
            "That's wonderful! Keep shining bright ✨",
            "Awesome! May your day be filled with joy and laughter.",
            "Glad to hear it! Spread that positivity around!",
            "Fantastic! Embrace this beautiful feeling."
        ],
        "Sad": [
            "It's okay to feel sad. Remember that even the darkest nights give way to dawn.",
            "Allow yourself to feel. This moment will pass, and brighter days are ahead.",
            "Acknowledge your feelings without judgment. You're strong for facing them.",
            "Healing is a journey, not a race. Take your time."
        ],
        "Anxious": [
            "Take a deep breath. You are safe. Focus on what you can control.",
            "Ground yourself. Look around and name five things you can see, four things you can touch, three things you can hear, two things you can smell, and one thing you can taste.",
            "One thought at a time. This feeling is temporary and will subside.",
            "You're facing something tough, but remember your resilience. You've gotten through challenges before."
        ],
        "Lonely": [
            "You are not alone. There are people who care about you.",
            "Even in solitude, you are part of a larger community. Reach out if you can.",
            "Sometimes the best company is a good book or quiet reflection. You are enough.",
            "Connection is a powerful force. Even a small gesture can bridge distances."
        ],
        "Angry": [
            "Acknowledge your anger, then consider its root. What is it trying to tell you?",
            "Channel that energy. Find a healthy outlet for your frustration.",
            "It's okay to feel angry, but remember to react constructively. Breathe first.",
            "Seek understanding, not just release. Your anger is a signal."
        ],
        "Overwhelmed": [
            "One step at a time. Break it down. You've got this.",
            "Prioritize what's essential. It's okay to put some things on hold.",
            "Give yourself permission to rest. You can't pour from an empty cup.",
            "Even small progress is still progress. Be kind to yourself."
        ],
        "Affectionate": [
            "What a lovely feeling! Cherish those connections.",
            "Warm feelings bring warmth back to you. Embrace them.",
            "It's beautiful to feel affection. Let it flow and grow.",
            "Share your love! The world needs more of this kindness."
        ],
        "Grateful": [
            "Feeling grateful is a superpower! Hold onto that joy.",
            "Focusing on gratitude changes everything. What a wonderful perspective!",
            "Every day offers something to be thankful for. You've found it today.",
            "A thankful heart is a magnet for miracles. Keep shining!"
        ],
        "Frustrated": [
            "It's okay to feel stuck. Sometimes, a change of perspective is all you need.",
            "Don't let frustration block your path. Take a break and re-approach.",
            "This feeling signals a challenge, not a defeat. You can find a way through.",
            "Remember your strength. Frustration can be a motivator to find new solutions."
        ]
    };

    // --- UPDATED: Motivational Quotes ---
    const MOTIVATIONAL_QUOTES = [
        "Every day is a new beginning. Take a deep breath and start again.",
        "You are stronger than you think. This too shall pass.",
        "It's okay not to be okay. Allow yourself to feel, then heal.",
        "Be patient and tough; one day this pain will be useful to you.",
        "The best way to predict the future is to create it.",
        "Your only limit is your mind.",
        "Believe you can and you're halfway there.",
        "Difficult roads often lead to beautiful destinations.",
        "The struggle you're in today is developing the strength you need for tomorrow.",
        "You are capable of amazing things.",
        "Success is not final, failure is not fatal: it is the courage to continue that counts.", // New quote
        "The only way to do great work is to love what you do.", // New quote
        "What you get by achieving your goals is not as important as what you become by achieving your goals." // New quote
    ];
    // --- Utility Functions ---
    function showPage(pageElement) {
        document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
        pageElement.classList.remove('hidden');
    }

    /**
     * Displays a general message popup with specified text and styling.
     * @param {string} message - The message to display.
     * @param {string} type - 'success', 'error', or 'info'.
     */
    function showGeneralMessagePopup(message, type = 'info') {
        generalMessageText.textContent = message;
        generalMessageText.style.color = ''; // Reset color
        if (type === 'success') {
            generalMessageText.style.color = 'var(--positive-green)';
        } else if (type === 'error') {
            generalMessageText.style.color = 'var(--negative-red)';
        } else { // 'info' or default
            generalMessageText.style.color = 'var(--accent-blue)';
        }
        generalMessagePopup.classList.remove('hidden');
    }

    function hidePopup(popupElement) {
        popupElement.classList.add('hidden');
    }

    // --- LocalStorage Helpers ---
    function getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    function saveUsers(usersArray) {
        localStorage.setItem('users', JSON.stringify(usersArray));
    }

    function getMessages() {
        const messages = localStorage.getItem('moodMessages');
        return messages ? JSON.parse(messages) : {};
    }

    function saveMessages(messagesObj) {
        localStorage.setItem('moodMessages', JSON.stringify(messagesObj));
    }

    function getUserLikedPosts(username) {
        const likedPosts = localStorage.getItem(`likedPosts_${username}`);
        return likedPosts ? JSON.parse(likedPosts) : {};
    }

    function saveUserLikedPosts(username, likedPostsObj) {
        localStorage.setItem(`likedPosts_${username}`, JSON.stringify(likedPostsObj));
    }

    function generateMessageId(message) {
        // Use a more robust ID, timestamp alone might not be unique if posted too quickly
        // Combining text, timestamp, and a random number
        return btoa(encodeURIComponent(`${message.text}-${message.timestamp}-${Math.random().toString(36).substring(2, 9)}`));
    }


    // --- Dark Mode Logic ---
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.textContent = isDarkMode ? '☀️ Toggle Light Mode' : '🌙 Toggle Dark Mode';
    }

    // Apply dark mode on load
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️ Toggle Light Mode';
    } else {
        darkModeToggle.textContent = '🌙 Toggle Dark Mode';
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);


    // --- User Authentication and Page Navigation ---
    function checkAuthStatus() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            displayUsername.textContent = loggedInUser;
            showPage(dashboardPage);

            // Set Universal Chatterbox as default view on dashboard load
            const universalBtn = document.getElementById('universal-chatterbox-btn');
            if (universalBtn) {
                // Remove 'selected' from all mood buttons first
                moodButtons.forEach(btn => btn.classList.remove('selected'));
                // Add 'selected' to the Universal Chatterbox button
                universalBtn.classList.add('selected');
                currentMood = '__universal__'; // Set the global state for posting
                currentMoodMessageDisplay.textContent = "All moods, all messages. Welcome to the Universal Chatterbox!";
                currentMoodTitle.textContent = "Universal Chatterbox";
                displayUniversalMessages(); // Load and display universal messages
            }

            // Show returning user popup if it's the first time on dashboard after login
            if (!sessionStorage.getItem('popupShownThisSession')) {
                showReturningUserPopup(loggedInUser);
                sessionStorage.setItem('popupShownThisSession', 'true');
            }
        } else {
            showPage(authPage); // Show the combined auth/welcome page
            sessionStorage.removeItem('popupShownThisSession'); // Reset for next session
            // Ensure login form is visible by default
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            forgotPasswordForm.classList.add('hidden');
        }
    }

    // Toggle links between auth forms
    document.querySelectorAll('.toggle-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const targetFormId = e.target.dataset.target;
            document.querySelectorAll('.auth-container form').forEach(form => {
                form.classList.add('hidden');
            });
            document.getElementById(targetFormId).classList.remove('hidden');
        });
    });

    // Guest Login Button on Auth Page
    guestLoginBtn.addEventListener('click', () => {
        localStorage.setItem('loggedInUser', 'Guest');
        showGeneralMessagePopup('Logged in as Guest! Welcome.', 'info');
        checkAuthStatus();
    });

    // Register User
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerUsernameInput.value.trim();
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value.trim();

        if (!username || !email || !password) {
            showGeneralMessagePopup('All fields are required for registration.', 'error');
            return;
        }

        const users = getUsers();
        if (users.some(u => u.username === username)) {
            showGeneralMessagePopup('Username already exists. Please choose a different one.', 'error');
            return;
        }
        if (users.some(u => u.email === email)) {
            showGeneralMessagePopup('Email is already registered. Please use a different one or login.', 'error');
            return;
        }

        // IMPORTANT: In a real app, passwords would be hashed and stored securely on a server.
        users.push({ username, email, password }); // Storing plaintext for demo
        saveUsers(users);

        showGeneralMessagePopup('Registration successful! You can now log in.', 'success');
        registerForm.reset();
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });

    // Login User
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (!username || !password) {
            showGeneralMessagePopup('Please enter both username and password.', 'error');
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', user.username);
            showGeneralMessagePopup('Login successful!', 'success');
            loginForm.reset();
            checkAuthStatus(); // Transition to dashboard
        } else {
            showGeneralMessagePopup('Invalid username or password.', 'error');
        }
    });

    // Forgot Password
    forgotPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = forgotEmailInput.value.trim();

        if (!email) {
            showGeneralMessagePopup('Please enter your email address.', 'error');
            return;
        }

        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (user) {
            showGeneralMessagePopup(`For demo purposes, your password is: "${user.password}". Please remember it!`, 'info');
        } else {
            showGeneralMessagePopup('No account found with that email address.', 'error');
        }
        forgotPasswordForm.reset();
        document.getElementById('forgot-password-form').classList.add('hidden');
        document.getElementById('login-form').classList.remove('hidden');
    });

    // Logout
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('popupShownThisSession'); // Clear session storage for popup
        showPage(authPage); // Go back to the combined auth/welcome page
        // Clear dashboard state
        currentMoodMessageDisplay.textContent = '';
        messagesList.innerHTML = '';
        currentMoodTitle.textContent = '';
        moodButtons.forEach(btn => btn.classList.remove('selected'));
        masterControlPanel.classList.add('hidden'); // Hide panel on logout
    });

    // Welcome Back Popup Logic
    function showReturningUserPopup(username) {
        welcomeBackMessage.textContent = `Welcome back, ${username}! Are you feeling better today?`;
        welcomeBackPopup.classList.remove('hidden');
    }

    yesFeelingBetterBtn.addEventListener('click', () => {
        hidePopup(welcomeBackPopup);
        showGeneralMessagePopup('Glad to hear that! Keep going 💪', 'success');
    });

    notReallyFeelingBetterBtn.addEventListener('click', () => {
        hidePopup(welcomeBackPopup);
        const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
        showGeneralMessagePopup(randomQuote, 'info');
    });

    closeGeneralMessageBtn.addEventListener('click', () => {
        hidePopup(generalMessagePopup);
    });

    // --- About Us Page Logic ---
    aboutUsButton.addEventListener('click', () => {
        showPage(aboutUsPage);
    });

    backToDashboardBtn.addEventListener('click', () => {
        checkAuthStatus(); // This will bring the user back to the dashboard and re-select the default view
    });


    // --- Mood Selection Logic ---
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            moodButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            const selectedMood = button.dataset.mood;

            if (selectedMood === '__universal__') {
                currentMood = '__universal__';
                currentMoodMessageDisplay.textContent = "All moods, all messages. Welcome to the Universal Chatterbox!";
                currentMoodTitle.textContent = "Universal Chatterbox";
                displayUniversalMessages();
            } else {
                currentMood = selectedMood;
                currentMoodMessageDisplay.textContent = MOOD_MESSAGES_DATA[currentMood];
                currentMoodTitle.textContent = currentMood;
                displayMoodMessages(currentMood);
            }
            newMessageText.focus();
        });
    });

    // --- Universal Chatterbox Logic ---
    function displayUniversalMessages() {
        messagesList.innerHTML = '';
        const allMessagesObj = getMessages(); // Retrieve once
        const loggedInUser = localStorage.getItem('loggedInUser');
        const userLikedPosts = getUserLikedPosts(loggedInUser);

        let allMsgs = [];
        Object.keys(allMessagesObj).forEach(mood => {
            (allMessagesObj[mood] || []).forEach(msg => {
                if (typeof msg.likes !== 'number') msg.likes = 0;
                if (typeof msg.views !== 'number') msg.views = 0;
                if (!msg.id) msg.id = generateMessageId(msg);
                allMsgs.push({ ...msg, mood }); // Add original mood to message object
            });
        });

        let sortValue = sortMessagesSelect ? sortMessagesSelect.value : 'newest';
        if (sortValue === 'newest') {
            allMsgs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else if (sortValue === 'oldest') {
            allMsgs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        } else if (sortValue === 'mostLiked') {
            allMsgs.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        } else if (sortValue === 'mostViewed') {
            allMsgs.sort((a, b) => (b.views || 0) - (a.views || 0));
        }

        if (allMsgs.length === 0) {
            messagesList.innerHTML = '<p style="text-align: center; color: var(--text-color);">No messages yet. Be the first to share!</p>';
            return;
        }

        allMsgs.forEach((msg) => {
            if (!sessionStorage.getItem(`viewed_${msg.id}`)) {
                msg.views = (msg.views || 0) + 1;
                sessionStorage.setItem(`viewed_${msg.id}`, 'true');
                // Update the original message object in allMessagesObj directly
                const moodArray = allMessagesObj[msg.mood];
                if (moodArray) {
                    const originalMsgIndex = moodArray.findIndex(m => m.id === msg.id);
                    if (originalMsgIndex !== -1) {
                        moodArray[originalMsgIndex].views = msg.views;
                    }
                }
            }

            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item', 'universal-chatterbox-item'); // ADDED universal-chatterbox-item class
            const displayUser = msg.username ? `by ${msg.username}` : 'Anonymously';
            const isLiked = userLikedPosts[msg.id];
            const likeButtonClass = isLiked ? 'like-btn liked' : 'like-btn';
            const likeButtonText = isLiked ? 'Unlike' : 'Like';

            messageItem.innerHTML = `
                <p>${msg.text}</p>
                <span>
                    <div class="like-section">
                        👍 <span class="like-count">${msg.likes || 0}</span>
                        <button class="${likeButtonClass}" data-message-id="${msg.id}" data-mood="${msg.mood}">${likeButtonText}</button>
                    </div>
                    <div class="message-meta">
                        [${msg.mood}]<br>
                        Posted ${displayUser} on: ${new Date(msg.timestamp).toLocaleString()}<br>
                        👁️ ${msg.views || 0}
                    </div>
                </span>
            `;
            messagesList.appendChild(messageItem);
        });

        // Save messages after view counts are updated in this batch
        saveMessages(allMessagesObj); // Save the modified messages object

        messagesList.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const messageId = this.dataset.messageId;
                const mood = this.dataset.mood;
                const messages = getMessages(); // Re-fetch to ensure latest state
                const loggedInUser = localStorage.getItem('loggedInUser');
                const userLikedPosts = getUserLikedPosts(loggedInUser);

                let targetMessage = null;
                if (messages[mood]) {
                    targetMessage = messages[mood].find(msg => msg.id === messageId);
                }

                if (targetMessage) {
                    if (userLikedPosts[messageId]) {
                        targetMessage.likes = Math.max(0, (targetMessage.likes || 0) - 1);
                        delete userLikedPosts[messageId];
                        showGeneralMessagePopup('Message unliked!', 'info');
                    } else {
                        targetMessage.likes = (targetMessage.likes || 0) + 1;
                        userLikedPosts[messageId] = true;
                        showGeneralMessagePopup('Message liked!', 'success');
                    }
                    saveMessages(messages); // Save the updated messages object
                    saveUserLikedPosts(loggedInUser, userLikedPosts);

                    if (currentMood === '__universal__') {
                        displayUniversalMessages();
                    } else {
                        displayMoodMessages(currentMood);
                    }
                }
            });
        });
    }

    // --- Mood Message Board Logic (localStorage based) ---
    function displayMoodMessages(mood) {
        messagesList.innerHTML = '';
        const allMessages = getMessages(); // Retrieve once
        let moodSpecificMessages = allMessages[mood] || [];
        const loggedInUser = localStorage.getItem('loggedInUser');
        const userLikedPosts = getUserLikedPosts(loggedInUser);

        moodSpecificMessages.forEach(msg => {
            if (typeof msg.likes !== 'number') msg.likes = 0;
            if (typeof msg.views !== 'number') msg.views = 0;
            if (!msg.id) msg.id = generateMessageId(msg);
        });

        let sortValue = sortMessagesSelect ? sortMessagesSelect.value : 'newest';
        if (sortValue === 'newest') {
            moodSpecificMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        } else if (sortValue === 'oldest') {
            moodSpecificMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        } else if (sortValue === 'mostLiked') {
            moodSpecificMessages.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        } else if (sortValue === 'mostViewed') {
            moodSpecificMessages.sort((a, b) => (b.views || 0) - (a.views || 0));
        }

        if (moodSpecificMessages.length === 0) {
            messagesList.innerHTML = '<p style="text-align: center; color: var(--text-color);">No messages yet for this mood. Be the first to share!</p>';
            return;
        }

        moodSpecificMessages.forEach((msg) => {
            if (!sessionStorage.getItem(`viewed_${msg.id}`)) {
                msg.views = (msg.views || 0) + 1;
                sessionStorage.setItem(`viewed_${msg.id}`, 'true');
                // Update the original message object in allMessages directly
                const moodArray = allMessages[mood];
                if (moodArray) {
                    const originalMsgIndex = moodArray.findIndex(m => m.id === msg.id);
                    if (originalMsgIndex !== -1) {
                        moodArray[originalMsgIndex].views = msg.views;
                    }
                }
            }

            const messageItem = document.createElement('div');
            messageItem.classList.add('message-item'); // No universal class here
            const displayUser = msg.username ? `by ${msg.username}` : 'Anonymously';
            const isLiked = userLikedPosts[msg.id];
            const likeButtonClass = isLiked ? 'like-btn liked' : 'like-btn';
            const likeButtonText = isLiked ? 'Unlike' : 'Like';

            messageItem.innerHTML = `
                <p>${msg.text}</p>
                <span>
                    <div class="like-section">
                        👍 <span class="like-count">${msg.likes || 0}</span>
                        <button class="${likeButtonClass}" data-message-id="${msg.id}" data-mood="${mood}">${likeButtonText}</button>
                    </div>
                    <div class="message-meta">
                        Posted ${displayUser} on: ${new Date(msg.timestamp).toLocaleString()}<br>
                        👁️ ${msg.views || 0}
                    </div>
                </span>
            `;
            messagesList.appendChild(messageItem);
        });

        // Save messages after view counts are updated in this batch
        saveMessages(allMessages); // Save the modified messages object

        messagesList.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const messageId = this.dataset.messageId;
                const mood = this.dataset.mood;
                const messages = getMessages(); // Re-fetch to ensure latest state
                const loggedInUser = localStorage.getItem('loggedInUser');
                const userLikedPosts = getUserLikedPosts(loggedInUser);

                let targetMessage = null;
                if (messages[mood]) {
                    targetMessage = messages[mood].find(msg => msg.id === messageId);
                }

                if (targetMessage) {
                    if (userLikedPosts[messageId]) {
                        targetMessage.likes = Math.max(0, (targetMessage.likes || 0) - 1);
                        delete userLikedPosts[messageId];
                        showGeneralMessagePopup('Message unliked!', 'info');
                    } else {
                        targetMessage.likes = (targetMessage.likes || 0) + 1;
                        userLikedPosts[messageId] = true;
                        showGeneralMessagePopup('Message liked!', 'success');
                    }
                    saveMessages(messages); // Save the updated messages object
                    saveUserLikedPosts(loggedInUser, userLikedPosts);
                    displayMoodMessages(mood);
                }
            });
        });
    }

    // Sort dropdown event
    if (sortMessagesSelect) {
        sortMessagesSelect.addEventListener('change', () => {
            if (currentMood === '__universal__') {
                displayUniversalMessages();
            } else if (currentMood) {
                displayMoodMessages(currentMood);
            }
        });
    }

    // --- Post Message Logic ---
    function postMessage(messageText, postUsername) {
        const allMessages = getMessages();
        if (!allMessages[currentMood]) {
            allMessages[currentMood] = [];
        }
        const newMessage = {
            text: messageText,
            timestamp: new Date().toISOString(),
            username: postUsername, // Use the provided username (can be null for anonymous)
            likes: 0,
            views: 0
        };
        newMessage.id = generateMessageId(newMessage);
        allMessages[currentMood].push(newMessage);
        saveMessages(allMessages);
        newMessageText.value = '';
        hidePopup(postOptionPopup); // Hide the options popup
        showGeneralMessagePopup('Message posted successfully!', 'success');
        
        if (currentMood === '__universal__') {
            displayUniversalMessages();
        } else {
            displayMoodMessages(currentMood);
        }
    }

    postMessageBtn.addEventListener('click', () => {
        const messageText = newMessageText.value.trim();
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (!loggedInUser) {
            showGeneralMessagePopup('You must be logged in to post messages.', 'error');
            return;
        }

        if (!messageText) {
            showGeneralMessagePopup('Message cannot be empty.', 'error');
            return;
        }

        if (currentMood === '__universal__') {
            showGeneralMessagePopup('Please select a specific mood to post a message. The Universal Chatterbox is for viewing only.', 'error');
            return;
        }

        if (!currentMood) {
            showGeneralMessagePopup('Please select a mood before posting a message.', 'error');
            return;
        }

        // Show the post option popup
        postOptionPopup.classList.remove('hidden');
    });

    postAnonymouslyBtn.addEventListener('click', () => {
        const messageText = newMessageText.value.trim();
        postMessage(messageText, null); // Post with username as null (anonymous)
    });

    postWithUsernameBtn.addEventListener('click', () => {
        const messageText = newMessageText.value.trim();
        const loggedInUser = localStorage.getItem('loggedInUser');
        postMessage(messageText, loggedInUser); // Post with the logged-in username
    });


    // --- Master Control Panel Logic ---

    masterControlButton.addEventListener('click', () => {
        masterControlPwPrompt.classList.remove('hidden');
        masterControlPwInput.value = '';
        masterControlPwError.style.display = 'none';
        masterControlPwInput.focus();
    });

    masterControlPwSubmit.addEventListener('click', () => {
        if (masterControlPwInput.value === MASTER_PASSWORD) {
            masterControlPwPrompt.classList.add('hidden');
            masterControlPanel.classList.remove('hidden');
            masterControlPwInput.value = '';
            masterControlPwError.style.display = 'none';
            masterPanelInfo.textContent = '';
        } else {
            masterControlPwError.style.display = 'block';
        }
    });
    masterControlPwInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') masterControlPwSubmit.click();
    });

    closePwPanelBtn.addEventListener('click', () => {
        masterControlPwPrompt.classList.add('hidden');
        masterControlPwError.style.display = 'none';
    });

    closePanelBtn.addEventListener('click', () => {
        masterControlPanel.classList.add('hidden');
    });

    // Master Control Actions
    deleteAllPostsButton.onclick = function() {
        if (confirm('Are you sure you want to delete ALL posts? This cannot be undone.')) {
            localStorage.removeItem('moodMessages');
            // Also clear all liked posts data as they are tied to message IDs
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('likedPosts_')) {
                    localStorage.removeItem(key);
                }
            }
            showGeneralMessagePopup('All posts and liked posts data deleted.', 'success');
            // Re-render based on current mood or universal
            if (currentMood === '__universal__') {
                displayUniversalMessages();
            } else if (currentMood) {
                displayMoodMessages(currentMood);
            }
            masterPanelInfo.textContent = 'All posts deleted.';
        }
    };

    clearLocalStorageBtn.onclick = function() {
        if (confirm('Are you sure you want to clear ALL local storage data (users, posts, etc.)? This cannot be undone.')) {
            localStorage.clear();
            showGeneralMessagePopup('All local storage cleared. You will be logged out.', 'success');
            checkAuthStatus();
            masterPanelInfo.textContent = 'Local storage cleared.';
        }
    };

    changeMasterPasswordBtn.onclick = function() {
        showGeneralMessagePopup('Master Password change feature is for demonstration. Cannot be changed directly here.', 'info');
        masterPanelInfo.textContent = 'Master Password change feature coming soon.';
    };

    showPostCountBtn.onclick = function() {
        const allMessages = localStorage.getItem('moodMessages');
        let count = 0;
        if (allMessages) {
            const obj = JSON.parse(allMessages);
            Object.values(obj).forEach(arr => { count += Array.isArray(arr) ? arr.length : 0; });
        }
        masterPanelInfo.textContent = `Total posts: ${count}`;
    };

    pinImportantPostBtn.onclick = function() {
        showGeneralMessagePopup('Pin Important Post feature coming soon.', 'info');
        masterPanelInfo.textContent = 'Pin Important Post feature coming soon.';
    };

    clearEmptyPostsBtn.onclick = function() {
        const allMessages = localStorage.getItem('moodMessages');
        let cleanedCount = 0;
        if (allMessages) {
            const obj = JSON.parse(allMessages);
            Object.keys(obj).forEach(mood => {
                const initialLength = (obj[mood] || []).length;
                obj[mood] = (obj[mood] || []).filter(p => p && p.text && p.text.trim() !== '');
                cleanedCount += (initialLength - obj[mood].length);
            });
            localStorage.setItem('moodMessages', JSON.stringify(obj));
        }
        showGeneralMessagePopup(`Cleared ${cleanedCount} empty/corrupted posts.`, 'success');
        masterPanelInfo.textContent = `Empty/corrupted posts cleared: ${cleanedCount}.`;
        if (currentMood === '__universal__') {
            displayUniversalMessages();
        } else if (currentMood) {
            displayMoodMessages(currentMood);
        }
    };

    // --- Initial Load ---
    checkAuthStatus();
});