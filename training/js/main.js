// --- Mobile Navigation Toggle ---
const navToggle = document.querySelector('.nav-toggle');
const body = document.body;

navToggle.addEventListener('click', () => {
    // This adds/removes the 'nav-open' class to the <body> tag
    // The CSS uses this class to show/hide the menu and animate the icon
    body.classList.toggle('nav-open');
});