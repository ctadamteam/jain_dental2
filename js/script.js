document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Hamburger Menu Toggle (Defensive Guard against Instant Touch Closure)
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    let isMenuToggling = false;
    
    if (hamburgerBtn && navMenu) {
        const toggleMenu = (e) => {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            isMenuToggling = true;
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            setTimeout(() => {
                isMenuToggling = false;
            }, 200);
        };

        hamburgerBtn.addEventListener('click', toggleMenu);

        // Close mobile menu on link click
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside (Guarded by isMenuToggling)
        document.addEventListener('click', (e) => {
            if (isMenuToggling) return;
            if (navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                    hamburgerBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                }
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

        // Update active sub-tab indicator in target section if present
        const targetSec = document.getElementById(targetId);
        if (targetSec) {
            const activeSubBtn = targetSec.querySelector('.tab-btn.active');
            const tabContainer = targetSec.querySelector('.tab-container');
            if (activeSubBtn && tabContainer) {
                const indicator = tabContainer.querySelector('.active-indicator');
                const btnContainer = tabContainer.querySelector('.tab-buttons');
                if (indicator && btnContainer) {
                    const btnRect = activeSubBtn.getBoundingClientRect();
                    const containerRect = btnContainer.getBoundingClientRect();
                    indicator.style.left = (btnRect.left - containerRect.left) + 'px';
                    indicator.style.width = btnRect.width + 'px';
                }
            }
        }
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

    // Boundary-checked resize listener to prevent infinite loops
    let lastWindowWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        if ((lastWindowWidth <= 768 && currentWidth > 768) || (lastWindowWidth > 768 && currentWidth <= 768)) {
            lastWindowWidth = currentWidth;
            initMobileTreatmentTabs();
        }
    });

    // 6. Common Legal Modal Popup (이용약관 & 개인정보처리방침)
    const legalModal = document.getElementById('legal-modal');
    const legalModalTitle = document.getElementById('legal-modal-title');
    const legalModalBody = document.getElementById('legal-modal-body');
    const legalModalCloseBtns = document.querySelectorAll('.legal-modal-close-btn, .legal-modal-confirm-btn');
    const footerLegalBtns = document.querySelectorAll('.footer-legal-btn');
    let lastActiveElement = null;

    function openLegalModal(type) {
        if (!legalModal || typeof LEGAL_DATA === 'undefined') return;
        const data = LEGAL_DATA[type];
        if (!data) return;

        lastActiveElement = document.activeElement;

        legalModalTitle.textContent = data.title;
        legalModalBody.innerHTML = data.content;
        legalModalBody.scrollTop = 0;

        document.body.style.overflow = 'hidden';
        legalModal.classList.add('active');
        legalModal.setAttribute('aria-hidden', 'false');

        // Focus close button inside modal
        const firstCloseBtn = legalModal.querySelector('.legal-modal-close-btn');
        if (firstCloseBtn) {
            firstCloseBtn.focus();
        }
    }

    function closeLegalModal() {
        if (!legalModal) return;

        document.body.style.overflow = '';
        legalModal.classList.remove('active');
        legalModal.setAttribute('aria-hidden', 'true');

        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            lastActiveElement.focus();
        }
    }

    footerLegalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const type = btn.getAttribute('data-legal-type');
            openLegalModal(type);
        });
    });

    legalModalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeLegalModal);
    });

    if (legalModal) {
        // Close modal when clicking overlay background
        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) {
                closeLegalModal();
            }
        });

        // Close modal on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && legalModal.classList.contains('active')) {
                closeLegalModal();
            }
        });
    }
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
