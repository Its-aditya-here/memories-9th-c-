console.log("Created by Saurabh aditya!")

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#6a4c93"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#8a5a44",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": true,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });

    // Animating message papers on scroll
    const messagePapers = document.querySelectorAll('.message-paper');
    
    messagePapers.forEach((paper, index) => {
        paper.style.transform = `rotate(${index % 2 === 0 ? -2 : 2}deg)`;
    });

    // Adding scroll animation
    gsap.utils.toArray('.message-paper, .portal-card').forEach((element) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Adding floating effect to logo
    const logo = document.querySelector('.floating-logo');
    if (logo) {
        setInterval(() => {
            logo.style.animation = 'float 6s ease-in-out infinite';
        }, 100);
    }

    // Adding confetti effect to gratitude button
    const addMessageBtn = document.querySelector('.add-message-btn');
    if (addMessageBtn) {
        addMessageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Createing confetti effect
            const confettiCount = 100;
            const colors = ['#f8c537', '#6a4c93', '#8a5a44', '#ffffff'];
            
            for (let i = 0; i < confettiCount; i++) {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.left = `${Math.random() * 100}vw`;
                confetti.style.top = '-10px';
                confetti.style.zIndex = '1000';
                confetti.style.opacity = '0.8';
                
                document.body.appendChild(confetti);
                
                const animationDuration = Math.random() * 3 + 2;
                
                gsap.to(confetti, {
                    y: window.innerHeight + 10,
                    x: `+=${(Math.random() - 0.5) * 100}`,
                    rotation: Math.random() * 360,
                    duration: animationDuration,
                    ease: 'power1.out',
                    onComplete: () => {
                        document.body.removeChild(confetti);
                    }
                });
            }
            
            // Show a message
            const thankYou = document.createElement('div');
            thankYou.textContent = 'Thank you for sharing your memory!';
            thankYou.style.position = 'fixed';
            thankYou.style.top = '50%';
            thankYou.style.left = '50%';
            thankYou.style.transform = 'translate(-50%, -50%)';
            thankYou.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            thankYou.style.color = 'white';
            thankYou.style.padding = '20px 40px';
            thankYou.style.borderRadius = '10px';
            thankYou.style.zIndex = '1001';
            thankYou.style.fontSize = '1.2rem';
            
            document.body.appendChild(thankYou);
            
            setTimeout(() => {
                gsap.to(thankYou, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        document.body.removeChild(thankYou);
                    }
                });
            }, 2000);
        });
    }
});