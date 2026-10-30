// LMS Interactive Functionality

document.addEventListener('DOMContentLoaded', () => {
  // 1. Learn More Buttons Popup Logic
  const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
  const courseModalElement = document.getElementById('courseModal');
  const coursePopupMessage = document.getElementById('coursePopupMessage');

  let courseModal = null;
  if (courseModalElement && window.bootstrap) {
    courseModal = new bootstrap.Modal(courseModalElement);
  }

  learnMoreButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Retrieve course name from data attribute or fallback to card title
      let courseName = btn.getAttribute('data-course');
      if (!courseName) {
        const card = btn.closest('.course-card');
        if (card) {
          const titleEl = card.querySelector('.card-title');
          if (titleEl) courseName = titleEl.textContent.trim();
        }
      }
      if (!courseName) courseName = 'Selected Course';

      // Required popup message
      const popupText = `learn "${courseName}" from scratch!`;

      // Display in modal popup or fallback alert
      if (courseModal && coursePopupMessage) {
        coursePopupMessage.textContent = popupText;
        courseModal.show();
      } else {
        alert(popupText);
      }
    });
  });

  // 2. Contact Us Form Handling
  const contactForm = document.getElementById('contactForm');
  const contactFormAlert = document.getElementById('contactFormAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Form validation check
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      const nameInput = document.getElementById('contactName');
      const senderName = nameInput ? nameInput.value.trim() : 'there';

      // Show friendly confirmation message
      if (contactFormAlert) {
        contactFormAlert.textContent = `Thank you, ${senderName}! Your message has been sent successfully. We will get back to you soon.`;
        contactFormAlert.classList.remove('d-none');
      }

      // Reset form
      contactForm.reset();
      contactForm.classList.remove('was-validated');

      // Auto-hide confirmation alert after 5 seconds
      setTimeout(() => {
        if (contactFormAlert) {
          contactFormAlert.classList.add('d-none');
        }
      }, 5000);
    });
  }

  // 3. Time-Based Greeting Message on Home Screen
  const greetingHeading = document.getElementById('greetingHeading');
  if (greetingHeading) {
    const currentHour = new Date().getHours();
    let timeGreeting = 'Welcome to the LMS Platform';

    if (currentHour >= 5 && currentHour < 12) {
      timeGreeting = 'Good morning, welcome to the LMS platform';
    } else if (currentHour >= 12 && currentHour < 17) {
      timeGreeting = 'Good afternoon, welcome to the LMS platform';
    } else if (currentHour >= 17 && currentHour < 21) {
      timeGreeting = 'Good evening, welcome to the LMS platform';
    } else {
      timeGreeting = 'Good night, welcome to the LMS platform';
    }

    greetingHeading.textContent = timeGreeting;
  }
});

