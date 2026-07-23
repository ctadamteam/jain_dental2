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

    // 4. Tour Gallery Touch Swipe Support
    const tourDisplay = document.getElementById('tour-main-display');
    if (tourDisplay) {
        let touchStartX = 0;
        let touchEndX = 0;

        tourDisplay.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        tourDisplay.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                if (typeof nextTourImg === 'function') nextTourImg();
            } else if (touchEndX - touchStartX > 50) {
                if (typeof prevTourImg === 'function') prevTourImg();
            }
        }, { passive: true });
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
