/* ==========================================================================
   VACATIO MAXIMA - INTERACTIEVE LOGICA & FUNCTIONALITEIT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MOBIEL NAVIGATIE MENU ---
    const menuToggle = document.getElementById('menu-toggle');
    const navContainer = document.getElementById('nav-container');

    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            navContainer.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- 2. TELLERS VOOR STATISTIEKEN (ANIMATIE) ---
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let count = 0;
            const increment = Math.ceil(target / 50);

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.innerText = count;
                    setTimeout(updateCount, 30);
                } else {
                    stat.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Trigger de animatie bij het scrollen naar de hero sectie
    window.addEventListener('scroll', () => {
        if (!animated && window.scrollY < 400) {
            animateStats();
            animated = true;
        }
    });
    animateStats(); // eenmalig direct starten

    // --- 3. GALERIJ FILTERING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actieve klasse wisselen
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 4. FAQ ACCORDION & ZOEKBALK ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqSearchInput = document.getElementById('faq-search-input');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            // Sluit eventuele andere open antwoorden
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

    // FAQ Zoekfunctionaliteit
    if (faqSearchInput) {
        faqSearchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            const faqItems = document.querySelectorAll('.faq-item');

            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(term)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --- 5. LEDENPORTAAL LOGIN SIMULATIE ---
    const loginForm = document.getElementById('login-form');
    const portalLoginForm = document.getElementById('portal-login-form');
    const portalDashboard = document.getElementById('portal-dashboard');
    const userWelcome = document.getElementById('user-welcome');
    const logoutBtn = document.getElementById('logout-btn');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userInput = document.getElementById('login-user').value;

            // Inloggen simuleren
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

    // --- 6. MODAL SYSTEM (Voor evenementen, bestellen & privacy) ---
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

    // Event Details Knoppen
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const eventName = btn.getAttribute('data-event');
            openModal(`
                <h3 style="color: var(--secondary-blue); margin-bottom: 10px;">${eventName}</h3>
                <p><strong>Inschrijvingen:</strong> Leden ontvangen korting op vertoon van hun lidkaart.</p>
                <br>
                <p>Wil je deelnemen of helpen in de organisatie van dit evenement? Neem contact op met ons praesidium!</p>
                <br>
                <button class="btn btn-primary" onclick="document.getElementById('info-modal').style.display='none'">Sluiten</button>
            `);
        });
    });

    // Merchandise Bestellen Knoppen
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productName = btn.getAttribute('data-product');
            openModal(`
                <h3 style="color: var(--primary-green); margin-bottom: 10px;">Bestelling: ${productName}</h3>
                <p>Om deze artikelen te bestellen of te passen, kun je terecht bij onze Quaestor tijdens de wekelijkse bijeenkomsten of stuur een mailtje naar <strong>shop@vacatiomaxima.be</strong>.</p>
                <br>
                <button class="btn btn-gold" onclick="document.getElementById('info-modal').style.display='none'">Begrepen</button>
            `);
        });
    });

    // Privacy & Voorwaarden
    const privacyBtn = document.getElementById('privacy-btn');
    const termsBtn = document.getElementById('terms-btn');

    if (privacyBtn) {
        privacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(`
                <h3>Privacy Policy</h3>
                <br>
                <p>Vacatio Maxima vzw hecht grote waarde aan de bescherming van je persoonsgegevens. Wij verwerken enkel gegevens die nodig zijn voor de ledenadministratie en communicatie over onze activiteiten. Je gegevens worden nooit verkocht aan derden.</p>
            `);
        });
    }

    if (termsBtn) {
        termsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(`
                <h3>Algemene Voorwaarden</h3>
                <br>
                <p>Lidmaatschap van Vacatio Maxima geldt per academiejaar. Leden verbinden zich ertoe de statuten van de vereniging en het doopcharter na te leven.</p>
            `);
        });
    }

    // --- 7. FORMULIER VERWERKING (SIMULATIES) ---
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Bedankt voor je aanmelding! We sturen je binnenkort een bevestigingsmail met de betalingsgegevens.');
            registerForm.reset();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Je bericht is succesvol verzonden. We nemen zo snel mogelijk contact met je op!');
            contactForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Bedankt voor je inschrijving op onze nieuwsbrief!');
            newsletterForm.reset();
        });
    }
});
