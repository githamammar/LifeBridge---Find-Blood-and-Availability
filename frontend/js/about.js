// Initialize about page with dynamic content and animations
document.addEventListener("DOMContentLoaded", () => {
    // Add animation to stats boxes
    const statBoxes = document.querySelectorAll('.stat-box');
    const stepElements = document.querySelectorAll('.step');
    
    // Animate stats on scroll
    const animateOnScroll = () => {
        statBoxes.forEach(box => {
            const rect = box.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible && !box.classList.contains('animated')) {
                box.classList.add('animated');
                const numberElement = box.querySelector('.stat-number');
                if (numberElement) {
                    const targetNumber = numberElement.innerText;
                    animateNumber(numberElement, targetNumber);
                }
            }
        });
        
        stepElements.forEach((step, index) => {
            const rect = step.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible && !step.classList.contains('animated')) {
                step.classList.add('animated');
                step.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
            }
        });
    };
    
    // Number animation function
    function animateNumber(element, targetText) {
        const match = targetText.match(/(\d+(?:\.\d+)?)([KMB+]?)/);
        if (!match) return;
        
        let target = parseFloat(match[1]);
        const suffix = match[2];
        
        if (targetText.includes('+')) target = target;
        
        let current = 0;
        const increment = target / 50;
        const duration = 1000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
                element.innerText = Math.floor(current) + (suffix || '') + (targetText.includes('+') ? '+' : '');
            } else {
                element.innerText = Math.floor(current) + (suffix || '');
            }
        }, stepTime);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .stat-box, .step {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.5s ease;
        }
        
        .stat-box.animated, .step.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .step {
            animation-fill-mode: forwards;
        }
    `;
    document.head.appendChild(style);
    
    // Trigger initial animation
    setTimeout(animateOnScroll, 500);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add social media link interactions
    const socialLinks = document.querySelectorAll('.social-links span');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = e.target.innerText;
            alert(`🌐 Connect with us on ${platform}! Our official pages are coming soon.`);
        });
    });
    
    // Add interactive contact info
    const contactParagraphs = document.querySelectorAll('.contact-info p');
    contactParagraphs.forEach(p => {
        p.addEventListener('click', (e) => {
            const text = e.target.innerText;
            if (text.includes('@')) {
                navigator.clipboard.writeText(text.replace('📧 ', ''));
                alert('📧 Email copied to clipboard!');
            } else if (text.includes('1800')) {
                navigator.clipboard.writeText(text.replace('📞 ', ''));
                alert('📞 Helpline number copied!');
            }
        });
        p.style.cursor = 'pointer';
    });
    
    // Add fake register button functionality
    const fakeRegisterBtn = document.getElementById('fakeRegisterBtn');
    if (fakeRegisterBtn) {
        fakeRegisterBtn.addEventListener('click', () => {
            window.location.href = 'ngo.html';
        });
    }
    
    // Track page view
    trackPageView();
});

// Track page views (simple analytics)
function trackPageView() {
    let views = localStorage.getItem('aboutPageViews') || 0;
    views = parseInt(views) + 1;
    localStorage.setItem('aboutPageViews', views);
    
    // Optional: Log in console
    console.log(`About