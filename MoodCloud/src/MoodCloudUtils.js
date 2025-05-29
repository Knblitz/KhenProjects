// MoodCloudUtils.js

export function getUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

export function saveUsers(usersArray) {
    localStorage.setItem('users', JSON.stringify(usersArray));
}

export function getMessages() {
    const messages = localStorage.getItem('moodMessages');
    return messages ? JSON.parse(messages) : {};
}

export function saveMessages(messagesObj) {
    localStorage.setItem('moodMessages', JSON.stringify(messagesObj));
}

export function generateMessageId(message) {
    // Defensive: handle undefined or missing properties
    const text = message && typeof message.text === 'string' ? message.text : '';
    const timestamp = message && message.timestamp ? message.timestamp : '';
    return btoa(encodeURIComponent(`${text}-${timestamp}-${Math.random().toString(36).substring(2, 9)}`));
}