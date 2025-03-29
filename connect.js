document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
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


    document.addEventListener('DOMContentLoaded', function() {
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        const onlineCount = document.getElementById('online-count');
        
        // In a real app, you would connect to a WebSocket or Firebase here
        // This is a simulation that works offline
        
        // Sample members data
        const members = [
            { id: 1, name: "Saurabh Aditya", avatar: "explorer1.jpg", online: true },
            { id: 2, name: "Aman Kumar", avatar: "explorer2.jpg", online: true },
            { id: 3, name: "Rajvardhan", avatar: "explorer3.jpg", online: false },
            { id: 11, name: "Mr. Sharma", avatar: "teacher.jpg", online: true }
        ];
        
        // Update online count
        function updateOnlineCount() {
            const online = members.filter(m => m.online).length;
            onlineCount.textContent = online;
        }
        
        // Add a message to the chat
        function addMessage(userId, text) {
            const member = members.find(m => m.id === userId);
            const isYou = userId === 0; // 0 represents the current user
            
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message new-message';
            messageDiv.innerHTML = `
                ${!isYou ? `<img src="${member.avatar}" class="message-avatar">` : ''}
                <div class="message-content">
                    <div>
                        <span class="message-user">${isYou ? 'You' : member.name}</span>
                        <small class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                    </div>
                    <div class="message-text">${text}</div>
                </div>
            `;
            
            if (isYou) {
                messageDiv.style.justifyContent = 'flex-end';
                messageDiv.querySelector('.message-text').style.background = 'var(--your-message-bg)';
            }
            
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Send message handler
        function sendMessage() {
            const text = chatInput.value.trim();
            if (text) {
                // Add your message
                addMessage(0, text);
                chatInput.value = '';
                
                // Simulate a reply after 1-3 seconds
                setTimeout(() => {
                    const onlineMembers = members.filter(m => m.online && m.id !== 0);
                    if (onlineMembers.length > 0) {
                        const randomMember = onlineMembers[Math.floor(Math.random() * onlineMembers.length)];
                        const replies = [
                            "That's a great idea!",
                            "I was thinking the same thing!",
                            "Let's discuss this more.",
                            "Interesting point!",
                            "👍",
                            "Can you explain more about that?",
                            "We should definitely explore this."
                        ];
                        const randomReply = replies[Math.floor(Math.random() * replies.length)];
                        addMessage(randomMember.id, randomReply);
                    }
                }, 1000 + Math.random() * 2000);
            }
        }
        
        // Event listeners
        sendButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Initialize
        updateOnlineCount();
        
        // Add some sample messages after a delay
        setTimeout(() => {
            addMessage(1, "Hey everyone! How are you all doing?");
        }, 500);
        
        setTimeout(() => {
            addMessage(11, "Hello explorers! Ready for our next adventure?");
        }, 1500);
        
        // Simulate online status changes
        setInterval(() => {
            members.forEach(member => {
                if (member.id !== 0) { // Don't change your own status
                    member.online = Math.random() > 0.3; // 70% chance to be online
                }
            });
            updateOnlineCount();
        }, 10000);
    });

    // Animate member cards on scroll
    gsap.utils.toArray(".member-card").forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 50,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power1.out"
        });
    });

    // Toggle message text
    function toggleMessage(button) {
        const messageCard = button.closest('.message-card');
        const fullText = messageCard.querySelector('.message-full');
        
        if (fullText.style.display === 'none' || !fullText.style.display) {
            fullText.style.display = 'inline';
            button.textContent = 'Read less';
        } else {
            fullText.style.display = 'none';
            button.textContent = 'Read more';
        }
    }

    // Add event listeners
    document.querySelectorAll('.read-more-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            toggleMessage(this);
        });
    });

    document.querySelector('.add-message-btn').addEventListener('click', function() {
        // In a real implementation, this would open a message submission form
        alert('Message submission form would open here!');
    });

    // Add confetti effect when submitting feedback
    const feedbackForm = document.querySelector('.feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Create confetti effect
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
            
            // Show thank you message
            const thankYou = document.createElement('div');
            thankYou.textContent = 'Thank you for your feedback!';
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
            
            // Reset form
            feedbackForm.reset();
        });
    }
});