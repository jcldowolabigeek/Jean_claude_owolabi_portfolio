// Intersection Observer for Reveal Animations
const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background toggle on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Hamburger Menu
const hamburgerBtn = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });
}

// Interactive Tags for Contact Form
const tags = document.querySelectorAll('.tag');
const interestsInput = document.getElementById('interests-input');

tags.forEach(tag => {
    tag.addEventListener('click', () => {
        tag.classList.toggle('active');
        
        // Update hidden input with active tags
        const activeTags = Array.from(document.querySelectorAll('.tag.active'))
                                .map(t => t.textContent.trim());
        interestsInput.value = activeTags.join(', ');
    });
});
// Drag to Scroll utility
function setupDragToScroll(selector) {
    const slider = document.querySelector(selector);
    let isMouseDown = false;
    let startX;
    let scrollLeft;

    if (!slider) return;

    slider.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        slider.classList.add('grabbing');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isMouseDown = false;
        slider.classList.remove('grabbing');
    });

    slider.addEventListener('mouseup', () => {
        isMouseDown = false;
        slider.classList.remove('grabbing');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll speed
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Initialize horizontal scrolls
setupDragToScroll('.services-grid');
setupDragToScroll('.testimonials-slider');

// Scroll Services Click
const scrollServicesBtn = document.getElementById('scrollServices');
const servicesGrid = document.querySelector('.services-grid');

if (scrollServicesBtn && servicesGrid) {
    scrollServicesBtn.addEventListener('click', () => {
        // Défilement fluide vers la droite d'environ une carte (400px)
        servicesGrid.scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// Experience Realizations & Modal System
// ==========================================

const experiencesData = {
    ifb: {
        title: "Chargé de Communication",
        orgTag: "Institut Français",
        company: "Institut Français du Bénin, antenne de Parakou",
        duration: "Mai 2026 – Présent",
        stats: [
            { value: "+212K", label: "Vues en 3 mois" },
            { value: "+78K", label: "Spectateurs (+107%)" },
            { value: "+13K", label: "Interactions (+183%)" }
        ],
        missions: [
            "Gestion et animation de la page Facebook et de la chaîne WhatsApp : planification et édition des contenus, mise en ligne, modération des messages et commentaires.",
            "Rédaction de la newsletter officielle de l’antenne de Parakou.",
            "Création de supports de communication (affiches, dépliants, contenus photo et vidéo) dans le respect strict de la charte graphique du réseau des Instituts français.",
            "Promotion et valorisation des activités auprès de la presse locale.",
            "Exécution et pilotage de la stratégie de communication globale établie."
        ]
    },
    layno: {
        title: "Chargé de Communication & Événements",
        orgTag: "Festival Culturel",
        company: "Quand Parakou Rap (LAYNO PROD)",
        duration: "Février 2022 – Présent",
        stats: [
            { value: "2,5M", label: "Vues cumulées" },
            { value: "135K", label: "Interactions générées" },
            { value: "+10 600", label: "Nouveaux abonnés (de 2025 à ce jour)" }
        ],
        missions: [
            "Gestion et animation active de la page Facebook et des groupes WhatsApp du festival.",
            "Conception de visuels et supports graphiques percutants (Canva, Photoshop) conformes à la charte graphique.",
            "Couverture événementielle intégrale : lives, interviews d'artistes, captation photo/vidéo, montage et sous-titrage dynamique (CapCut).",
            "Tenue rigoureuse d’un chronogramme de couverture des événements et respect strict des délais de livraison."
        ]
    },
    mtn: {
        title: "Coach Formateur en Community Management",
        orgTag: "Formation & Tech",
        company: "MTN Bénin & Digital Valley — Parakou",
        duration: "Novembre 2024 – Présent",
        stats: [
            { value: "+90", label: "Apprenants formés" },
            { value: "> 90%", label: "Satisfaction apprenants" },
            { value: "4", label: "Modules déployés" }
        ],
        missions: [
            "Formation pratique de plus de 90 apprenants en community management, création de contenus et publicité en ligne.",
            "Élaboration de stratégies digitales avec veille concurrentielle et suivi des tendances émergentes.",
            "Analyse poussée de statistiques digitales et production de synthèses de performance.",
            "Conception pédagogique et déploiement de 4 modules de formation complets."
        ]
    },
    adhd: {
        title: "Consultant Digital, Chargé de Communication",
        orgTag: "ONG & Institutionnel",
        company: "ADHD ONG — Parakou / Nikki / Pèrèrè",
        duration: "Décembre 2023 – Avril 2024",
        stats: [
            { value: "+10 000", label: "Bénéficiaires touchés" },
            { value: "2", label: "Événements couverts à 100%" },
            { value: "48h", label: "Délai traitement visibilité" }
        ],
        missions: [
            "Création, structuration et animation des canaux de communication institutionnelle de l'organisation.",
            "Production de contenus narratifs (storytelling, témoignages, initiatives de terrain) et couverture photo/vidéo des Journées Culturelles Communales 2024 de Pèrèrè et Nikki.",
            "Recueil proactif des besoins de contenu auprès des équipes programme.",
            "Suivi rigoureux des demandes de visibilité et coordination étroite avec les bailleurs et partenaires techniques et financiers.",
            "Actualisation des supports et bases de contenus institutionnels."
        ]
    },
    bsm: {
        title: "Chargé de Communication",
        orgTag: "Corporate & Groupe",
        company: "BSM Groupe — Abomey-Calavi",
        duration: "Mars 2022 – Décembre 2023",
        stats: [
            { value: "+10 000", label: "Interactions générées" },
            { value: "18 mois", label: "Newsletter mensuelle continue" },
            { value: "0", label: "Incident d’e-réputation" }
        ],
        missions: [
            "Animation quotidienne des communautés en ligne et gestion proactive de l’e-réputation.",
            "Production de contenus digitaux, planification éditoriale et respect scrupuleux de la charte visuelle.",
            "Construction, rédaction et diffusion de newsletters, avec suivi rigoureux des indicateurs de performance.",
            "Traitement des requêtes internes et coordination efficace avec l'ensemble des services."
        ]
    },
    cm: {
        title: "Community Manager",
        orgTag: "Multi-marques",
        company: "Skin Technology by Latania · Ola Christ Market · Tolaro Délices",
        duration: "Janvier 2021 – Octobre 2023",
        stats: [
            { value: "3", label: "Marques gérées simultanément" },
            { value: "Multi-canal", label: "Pages Facebook & WhatsApp" },
            { value: "100%", label: "Respect des chartes" }
        ],
        missions: [
            "Gestion simultanée de 3 pages Facebook et comptes WhatsApp en respectant la charte de chaque marque.",
            "Production continue de visuels et de contenus (affiches, photos produits, vidéos promotionnelles).",
            "Mise en place de calendriers éditoriaux réguliers et modération active des messages entrants.",
            "Accroissement de l'engagement client et valorisation des offres commerciales."
        ]
    },
    radio: {
        title: "Animateur Radio",
        orgTag: "Médias & Presse",
        company: "Station Radio — Parakou",
        duration: "2020",
        stats: [
            { value: "1", label: "Émission solo produite" },
            { value: "100%", label: "Conduite des directs" },
            { value: "Médias", label: "Relations presse & partenaires" }
        ],
        missions: [
            "Animation et production intégrale d’une émission radio en solo.",
            "Relations et coordination avec les professionnels des médias locaux.",
            "Préparation minutieuse des conducteurs d'antenne, animation de débats et réalisation d'interviews en direct."
        ]
    }
};

// Experience Modal Controller
const expModal = document.getElementById('expModal');
const closeExpModalBtn = document.getElementById('closeExpModal');
const footerCloseModalBtn = document.getElementById('footerCloseModal');
const modalOrgTag = document.getElementById('modalOrgTag');
const modalDurationTag = document.getElementById('modalDurationTag');
const modalTitle = document.getElementById('modalTitle');
const modalCompany = document.getElementById('modalCompany');
const modalKpisWrapper = document.getElementById('modalKpisWrapper');
const modalKpiGrid = document.getElementById('modalKpiGrid');
const modalMissionsList = document.getElementById('modalMissionsList');
const modalContactLink = document.getElementById('modalContactLink');

function openExpModal(expId) {
    const data = experiencesData[expId];
    if (!data || !expModal) return;

    modalOrgTag.textContent = data.orgTag || "Expérience";
    modalDurationTag.textContent = data.duration || "";
    modalTitle.textContent = data.title;
    modalCompany.textContent = data.company;

    // Populate KPIs
    if (data.stats && data.stats.length > 0) {
        modalKpiGrid.innerHTML = data.stats.map(stat => `
            <div class="exp-modal-kpi-card">
                <div class="exp-modal-kpi-value">${stat.value}</div>
                <div class="exp-modal-kpi-label">${stat.label}</div>
            </div>
        `).join('');
        modalKpisWrapper.style.display = 'block';
    } else {
        modalKpisWrapper.style.display = 'none';
    }

    // Populate Missions
    modalMissionsList.innerHTML = data.missions.map(mission => `
        <li>${mission}</li>
    `).join('');

    // Open Modal
    expModal.classList.add('active');
    expModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeExpModal() {
    if (!expModal) return;
    expModal.classList.remove('active');
    expModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

// Bind click and keyboard to experience items
document.querySelectorAll('.exp-item').forEach(item => {
    item.addEventListener('click', () => {
        const expId = item.getAttribute('data-exp');
        if (expId) openExpModal(expId);
    });

    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const expId = item.getAttribute('data-exp');
            if (expId) openExpModal(expId);
        }
    });
});

// Close listeners
if (closeExpModalBtn) {
    closeExpModalBtn.addEventListener('click', closeExpModal);
}
if (footerCloseModalBtn) {
    footerCloseModalBtn.addEventListener('click', closeExpModal);
}
if (expModal) {
    expModal.addEventListener('click', (e) => {
        if (e.target === expModal) {
            closeExpModal();
        }
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && expModal && expModal.classList.contains('active')) {
        closeExpModal();
    }
});
if (modalContactLink) {
    modalContactLink.addEventListener('click', () => {
        closeExpModal();
    });
}
