document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const responseMessage = document.getElementById('response-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Show loading state
        const submitButton = form.querySelector('.submit-btn');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        // Get form data
        const templateParams = {
            to_name: "Recipient", // Add recipient name
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            reply_to: document.getElementById('email').value
        };

        // Send email using EmailJS
        emailjs.send('service_23eaxja', 'template_x34h968', templateParams)
            .then(function() {
                responseMessage.className = 'success';
                responseMessage.textContent = 'Message sent successfully!';
                form.reset();
            })
            .catch(function(error) {
                responseMessage.className = 'error';
                responseMessage.textContent = 'Failed to send message. Please try again.';
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                // Reset button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;

                // Clear response message after 5 seconds
                setTimeout(() => {
                    responseMessage.textContent = '';
                    responseMessage.className = '';
                }, 5000);
            });
    });

    // Add input validation
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function() {
        if (emailInput.validity.typeMismatch) {
            emailInput.setCustomValidity('Please enter a valid email address');
        } else {
            emailInput.setCustomValidity('');
        }
    });
});
