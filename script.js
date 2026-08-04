/* ==========================================================================
   VACATIO MAXIMA - SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOBIEL MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const navContainer = document.getElementById('nav-container');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navContainer.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Navigatie sluiten op mobiel na op link te klikken
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navContainer && navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                if (menuToggle) {
                    menuToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            }
        });
    });

    // --- 2. FAQ ACCORDION ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            document.querySelectorAll('.faq-answer').forEach(ans => {
                if (ans !== answer) {
                    ans.style.display = 'none';
                    ans.previousElementSibling.querySelector('i').className = 'fa-solid fa-chevron-down';
                }
            });

            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.className = 'fa-solid fa-chevron-down';
            } else {
                answer.style.display = 'block';
                icon.className = 'fa-solid fa-chevron-up';
            }
        });
    });

    // --- 3. LEDENPORTAAL LOGIN SIMULATIE ---
    const loginForm = document.getElementById('login-form');
    const portalLoginForm = document.getElementById('portal-login-form');
    const portalDashboard = document.getElementById('portal-dashboard');
    const userWelcome = document.getElementById('user-welcome');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userInput = document.getElementById('login-user').value;
            portalLoginForm.style.display = 'none';
            portalDashboard.style.display = 'block';
            userWelcome.innerText = `Welkom terug, ${userInput || 'Lid'}!`;
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            portalDashboard.style.display = 'none';
            portalLoginForm.style.display = 'block';
            loginForm.reset();
        });
    }

    // --- 4. MODAL VENSTER ---
    const modal = document.getElementById('info-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');

    function openModal(htmlContent) {
        if (modal && modalBody) {
            modalBody.innerHTML = htmlContent;
            modal.style.display = 'flex';
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Privacy & Voorwaarden Event Listeners
    const privacyBtn = document.getElementById('privacy-btn');
    const termsBtn = document.getElementById('terms-btn');

    if (privacyBtn) {
        privacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(`
                <h3>Privacy Policy</h3>
                <br>
                <p>Vacatio Maxima hecht waarde aan de bescherming van persoonsgegevens. Gegevens verzameld via inschrijvingen op kampen worden uitsluitend gebruikt voor de interne verenigingsadministratie.</p>
            `);
        });
    }

    if (termsBtn) {
        termsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(`
                <h3>Algemene Voorwaarden</h3>
                <br>
                <p>Lidmaatschap van Vacatio Maxima is gratis mits deelname aan een TopVakantie kamp waar een bestuurslid aanwezig is. Leden dienen zich te houden aan de tradities en afspraken binnen de vereniging.</p>
            `);
        });
    }

    // --- 5. FORMULIEREN ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Bedankt voor je aanvraag! Alexandra, Ian of Daan nemen binnenkort contact met je op!');
            registerForm.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Je bericht is succesvol verzonden naar info@topvakantie.be!');
            contactForm.reset();
        });
    }
});
