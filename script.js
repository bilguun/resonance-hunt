// Number of stations in the hunt
const STATION_COUNT = 7;

/**
 * Display the token collection board on the page.
 * Creates seven circular slots, marking those already collected.
 */
function displayTokenBoard() {
    const board = document.getElementById('token-board');
    if (!board) return;
    // Clear existing children
    board.innerHTML = '';
    for (let i = 1; i <= STATION_COUNT; i++) {
        const slot = document.createElement('div');
        slot.classList.add('token-slot');
        const tokenKey = `token${i}`;
        if (localStorage.getItem(tokenKey)) {
            slot.classList.add('collected');
            slot.textContent = i;
        } else {
            slot.textContent = i;
        }
        board.appendChild(slot);
    }
}

/**
 * Display progress message based on collected tokens.
 */
function updateProgressMessage() {
    const messageEl = document.getElementById('progress-message');
    if (!messageEl) return;
    let collected = 0;
    for (let i = 1; i <= STATION_COUNT; i++) {
        if (localStorage.getItem(`token${i}`)) {
            collected++;
        }
    }
    if (collected === STATION_COUNT) {
        messageEl.innerHTML = `You have collected all seven Echo Tokens! <a href="final.html">Enter the Symphony of Stones</a>.`;
    } else {
        messageEl.textContent = `You have collected ${collected} of ${STATION_COUNT} tokens.`;
    }
}

/**
 * Validate the user's answer for a station.
 * If correct, store a token and reveal next-step instructions.
 * @param {Event} event The form submit event
 * @param {number} stationNumber The station number (1–7)
 * @param {string | string[]} correctAnswer The correct answer(s), case-insensitive
 * @param {string} nextPage The URL of the next station (or final page)
 */
function checkAnswer(event, stationNumber, correctAnswer, nextPage) {
    event.preventDefault();
    const input = event.target.elements['answer'];
    const userAnswer = input.value.trim().toLowerCase();
    const answers = Array.isArray(correctAnswer) ? correctAnswer.map(a => a.toLowerCase()) : [String(correctAnswer).toLowerCase()];
    const feedback = document.getElementById('feedback');
    if (answers.includes(userAnswer)) {
        // Mark token collected
        localStorage.setItem(`token${stationNumber}`, 'true');
        displayTokenBoard();
        updateProgressMessage();
        if (feedback) {
            feedback.innerHTML = `<p class="correct">Correct! You have collected Echo Token ${stationNumber}. <a href="${nextPage}">Proceed to the next station</a>.</p>`;
        }
    } else {
        if (feedback) {
            feedback.innerHTML = `<p class="incorrect">That's not quite right. Listen closely to the stones and try again.</p>`;
        }
    }
    return false;
}

// Initialize token board and progress message on page load
window.addEventListener('DOMContentLoaded', () => {
    displayTokenBoard();
    updateProgressMessage();
});