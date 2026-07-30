document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Hamburger Menu Toggle (Defensive Null Check)
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // 2. Tab Functionality (No Page Reload)
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabContainer = btn.closest('.tab-container');
            const scope = btn.closest('.section') || tabContainer;
            const targetId = btn.getAttribute('data-tab');
            
            if (scope) {
                scope.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                scope.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            }
            
            btn.classList.add('active');
            if (tabContainer) {
                const indicator = tabContainer.querySelector('.active-indicator');
                if (indicator) {
                    const btnRect = btn.getBoundingClientRect();
                    const containerRect = tabContainer.querySelector('.tab-buttons').getBoundingClientRect();
                    indicator.style.left = (btnRect.left - containerRect.left) + 'px';
                    indicator.style.width = btnRect.width + 'px';
                }
            }
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // 3. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const item = q.closest('.faq-item');
            if (item) {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(other => {
                    other.classList.remove('active');
                });
                if (!isActive) {
                    item.classList.add('active');
                }
            }
        });
    });

    // 5. Mobile Master Treatment Tab Switching (2x3 Grid)
    const mTabButtons = document.querySelectorAll('.m-tab-btn');
    const treatmentSecIds = ['implant', 'aesthetic', 'clear-aligner', 'conservation', 'tmj'];

    function switchMobileTreatmentTab(targetId) {
        mTabButtons.forEach(btn => {
            if (btn.getAttribute('data-target') === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        treatmentSecIds.forEach(secId => {
            const sec = document.getElementById(secId);
            if (sec) {
                if (secId === targetId) {
                    sec.classList.remove('m-treatment-section-hidden');
                    sec.classList.add('m-treatment-section-active');
                } else {
                    sec.classList.remove('m-treatment-section-active');
                    sec.classList.add('m-treatment-section-hidden');
                }
            }
        });

        // Re-calculate any Swiper sliders or tab indicators upon tab reveal
        window.dispatchEvent(new Event('resize'));
    }

    function initMobileTreatmentTabs() {
        if (window.innerWidth <= 768) {
            const activeBtn = document.querySelector('.m-tab-btn.active');
            const initialTarget = activeBtn ? activeBtn.getAttribute('data-target') : 'implant';
            switchMobileTreatmentTab(initialTarget);
        } else {
            // Restore all sections on Desktop for 0px PC Drift
            treatmentSecIds.forEach(secId => {
                const sec = document.getElementById(secId);
                if (sec) {
                    sec.classList.remove('m-treatment-section-hidden');
                    sec.classList.remove('m-treatment-section-active');
                }
            });
        }
    }

    mTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            switchMobileTreatmentTab(targetId);
            const masterSec = document.getElementById('mobile-treatment-section');
            if (masterSec) {
                masterSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Handle GNB menu links on Mobile to auto-switch master treatment tab
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const secId = href.substring(1);
                    if (treatmentSecIds.includes(secId)) {
                        e.preventDefault();
                        switchMobileTreatmentTab(secId);
                        const masterSec = document.getElementById('mobile-treatment-section');
                        if (masterSec) {
                            masterSec.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }
            }
        });
    });

    initMobileTreatmentTabs();
    window.addEventListener('resize', initMobileTreatmentTabs);
});

function updateTabIndicators() {
    document.querySelectorAll('.tab-buttons.text-style').forEach(container => {
        const activeBtn = container.querySelector('.tab-btn.active');
        const indicator = container.querySelector('.active-indicator');
        if (activeBtn && indicator) {
            const btnRect = activeBtn.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            indicator.style.left = (btnRect.left - containerRect.left) + 'px';
            indicator.style.width = btnRect.width + 'px';
        }
    });
}
window.addEventListener('load', updateTabIndicators);
window.addEventListener('resize', updateTabIndicators);
