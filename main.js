// Navigation functionality
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    // Toggle both menu and hamburger animation
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active'); // Remove active class from hamburger
    }
});

// Close menu when clicking a link
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active'); // Remove active class from hamburger
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error sending your message. Please try again.');
    }
});

// Footer social icons hover effect
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add this to your existing main.js
async function handleEmailSubmit(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const formMessage = document.getElementById('formMessage');
    const submitButton = event.target.querySelector('button');
    
    // Add loading state
    submitButton.disabled = true;
    formMessage.textContent = 'Sending...';
    formMessage.className = 'form-message';
    
    try {
        const response = await fetch('https://formspree.io/f/xeoekpbn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        if (response.ok) {
            formMessage.textContent = 'Thank you for subscribing, we will contact you!';
            formMessage.className = 'form-message success';
            event.target.reset();
        } else {
            throw new Error('Failed to send email');
        }
    } catch (error) {
        formMessage.textContent = 'Failed to send. Please try again.';
        formMessage.className = 'form-message error';
    } finally {
        submitButton.disabled = false;
    }

    // Clear success message after 5 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);

    return false;
}

// Chat Widget Implementation
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = document.createElement('div');
    const chatButton = document.createElement('button');
    const chatWindow = document.createElement('div');
    
    chatButton.innerHTML = `
        <span class="widget-icon">💬</span>
        <span class="widget-text">Start Chat</span>
    `;
    chatButton.className = 'chat-widget-button';
    
    chatWindow.innerHTML = `
        <div class="chat-widget-header">
            <h3>Curisal Assistant</h3>
            <button class="close-chat" title="Close Chat">×</button>
        </div>
        <div class="chat-widget-content">
            <iframe
                src="https://cdn.botpress.cloud/webchat/v2.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/02/04/08/20250204081047-G6AST7VB.json"
                width="100%"
                height="100%"
                frameborder="0"
                allow="microphone"
                style="background: transparent;"
            ></iframe>
        </div>
    `;
    chatWindow.className = 'chat-widget-window hidden';
    
    chatWidget.className = 'chat-widget';
    chatWidget.appendChild(chatButton);
    chatWidget.appendChild(chatWindow);
    document.body.appendChild(chatWidget);
    
    // Toggle chat window
    chatButton.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (!chatWindow.classList.contains('hidden')) {
            const iframe = chatWindow.querySelector('iframe');
            iframe.src = iframe.src;
        }
    });
    
    // Close chat window
    chatWindow.querySelector('.close-chat').addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        const iframe = chatWindow.querySelector('iframe');
        iframe.src = iframe.src;
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !chatWindow.classList.contains('hidden')) {
            chatWindow.classList.add('hidden');
            const iframe = chatWindow.querySelector('iframe');
            iframe.src = iframe.src;
        }
    });
});
