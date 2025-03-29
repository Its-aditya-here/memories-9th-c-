document.addEventListener('DOMContentLoaded', function() {
    // Animate student cards on scroll
    gsap.utils.toArray(".portal-card").forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: index * 0.05,
            ease: "power1.out"
        });
    });

    // Make fish swim faster when hovering over gallery
    const gallery = document.querySelector('.memory-portal');
    if (gallery) {
        gallery.addEventListener('mouseenter', () => {
            document.querySelectorAll('.fish').forEach(fish => {
                fish.style.animationDuration = '8s';
            });
        });
        
        gallery.addEventListener('mouseleave', () => {
            document.querySelectorAll('.fish').forEach(fish => {
                fish.style.animationDuration = '20s';
            });
        });
    }

    // Add click effect to student cards
    const studentCards = document.querySelectorAll('.student-portal');
    studentCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent flipping back if clicking on the button
            if (e.target.closest('.portal-btn')) return;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            this.querySelector('.card-front').appendChild(ripple);
            
            // Remove after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Add bubble effect to feedback form submission
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create bubbles
            for (let i = 0; i < 20; i++) {
                createBubble();
            }
            
            // Show thank you message
            const thankYou = document.createElement('div');
            thankYou.textContent = 'Thanks for your feedback!';
            thankYou.style.position = 'fixed';
            thankYou.style.top = '50%';
            thankYou.style.left = '50%';
            thankYou.style.transform = 'translate(-50%, -50%)';
            thankYou.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            thankYou.style.color = 'white';
            thankYou.style.padding = '20px 40px';
            thankYou.style.borderRadius = '10px';
            thankYou.style.zIndex = '1000';
            thankYou.style.fontSize = '1.2rem';
            
            document.body.appendChild(thankYou);
            
            setTimeout(() => {
                thankYou.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(thankYou);
                }, 500);
            }, 2000);
            
            // Reset form
            feedbackForm.reset();
        });
    }

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.classList.add('feedback-bubble');
        
        // Random position at bottom of viewport
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.bottom = '0';
        
        // Random size
        const size = Math.random() * 30 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random opacity
        bubble.style.opacity = Math.random() * 0.5 + 0.3;
        
        document.body.appendChild(bubble);
        
        // Animate bubble
        gsap.to(bubble, {
            bottom: '100vh',
            left: `+=${(Math.random() - 0.5) * 100}`,
            duration: Math.random() * 3 + 2,
            ease: 'power1.out',
            onComplete: () => {
                document.body.removeChild(bubble);
            }
        });
    }
});