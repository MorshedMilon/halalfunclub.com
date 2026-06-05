/* Form Validation and Success State Handler for Halal Fun Club */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const signupForm = document.getElementById('signup-form');

  // 1. Create Success Modal HTML dynamically
  const successModal = document.createElement('div');
  successModal.id = 'success-modal';
  successModal.className = 'modal';
  successModal.innerHTML = `
    <div class="modal-content">
      <div class="modal-icon">
        <i class="fas fa-check"></i>
      </div>
      <h3 class="modal-title">Thank You!</h3>
      <p class="modal-text">Your message has been sent successfully. We will get back to you shortly!</p>
      <button class="btn btn-secondary modal-close-btn">Close</button>
    </div>
  `;
  document.body.appendChild(successModal);

  const modalCloseBtn = successModal.querySelector('.modal-close-btn');
  const modalText = successModal.querySelector('.modal-text');

  const openModal = (message) => {
    if (message) modalText.textContent = message;
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    successModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtn.addEventListener('click', closeModal);
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      closeModal();
    }
  });

  // 2. Input validation helpers
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    // Basic phone regex matching various international formats
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-s\.]?[0-9]{3}[-s\.]?[0-9]{4,6}$/;
    return phone === '' || re.test(phone);
  };

  const setError = (input, message) => {
    input.classList.add('invalid');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  };

  const clearError = (input) => {
    input.classList.remove('invalid');
    const errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.style.display = 'none';
    }
  };

  // Setup live validation on input focus/blur
  const setupLiveValidation = (form) => {
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        clearError(input);
      });
      input.addEventListener('blur', () => {
        validateField(input);
      });
    });
  };

  const validateField = (input) => {
    clearError(input);
    
    // Check required
    if (input.hasAttribute('required') && input.value.trim() === '') {
      setError(input, `${input.previousElementSibling ? input.previousElementSibling.textContent.replace('*','') : 'This field'} is required.`);
      return false;
    }

    // Check email
    if (input.type === 'email' && input.value.trim() !== '') {
      if (!validateEmail(input.value.trim())) {
        setError(input, 'Please enter a valid email address.');
        return false;
      }
    }

    // Check phone
    if (input.type === 'tel' && input.value.trim() !== '') {
      if (!validatePhone(input.value.trim())) {
        setError(input, 'Please enter a valid phone number (e.g. 123-456-7890).');
        return false;
      }
    }

    return true;
  };

  // 3. Handle Contact Form Submission
  if (contactForm) {
    setupLiveValidation(contactForm);
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = contactForm.querySelectorAll('.form-control');
      
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        // If form has action attribute pointing to a service (e.g. Formspree/Web3Forms), we can send AJAX
        const action = contactForm.getAttribute('action');
        
        if (action && action.startsWith('http')) {
          const formData = new FormData(contactForm);
          
          contactForm.querySelector('button[type="submit"]').disabled = true;
          contactForm.querySelector('button[type="submit"]').textContent = 'Sending...';
          
          fetch(action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(response => {
            if (response.ok) {
              openModal("Thank you! Your message has been sent successfully. We'll get back to you shortly.");
              contactForm.reset();
            } else {
              alert("Oops! There was a problem submitting your form. Please try again.");
            }
          })
          .catch(error => {
            alert("Oops! Network error occurred. Please try again.");
          })
          .finally(() => {
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.disabled = false;
            btn.textContent = 'Send Message';
          });
        } else {
          // Default mock submission
          openModal("Thank you! Your message has been received. (Note: To receive actual emails, configure your Formspree/Web3Forms endpoint in the HTML form action).");
          contactForm.reset();
        }
      }
    });
  }

  // 4. Handle Sign Up Form Submission
  if (signupForm) {
    setupLiveValidation(signupForm);
    
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = signupForm.querySelectorAll('.form-control');
      
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        const action = signupForm.getAttribute('action');
        
        if (action && action.startsWith('http')) {
          const formData = new FormData(signupForm);
          signupForm.querySelector('button[type="submit"]').disabled = true;
          signupForm.querySelector('button[type="submit"]').textContent = 'Submitting...';
          
          fetch(action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          })
          .then(response => {
            if (response.ok) {
              openModal("Registration received! Welcome to the club. We will send you detailed schedule files and invoice links shortly.");
              signupForm.reset();
            } else {
              alert("Oops! There was a problem submitting your form.");
            }
          })
          .catch(error => {
            alert("Oops! Network error occurred.");
          })
          .finally(() => {
            const btn = signupForm.querySelector('button[type="submit"]');
            btn.disabled = false;
            btn.textContent = 'Register Now';
          });
        } else {
          // Default mock submission
          openModal("Registration received! Welcome to the club. We'll send you detailed schedule files and invoice links shortly. (Note: To receive actual emails, configure your Formspree/Web3Forms endpoint in the HTML form action).");
          signupForm.reset();
        }
      }
    });
  }
});
