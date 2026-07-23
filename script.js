// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form submission (Web3Forms — keeps your real email off the public page)
const contactForm = document.getElementById('contactForm');
const cfStatus = document.getElementById('cfStatus');
const cfSubmit = document.getElementById('cfSubmit');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    cfSubmit.disabled = true;
    cfSubmit.textContent = 'Sending...';
    cfStatus.textContent = '';
    cfStatus.className = 'contact-form__status';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const result = await response.json();

      if (result.success) {
        cfStatus.textContent = "Thanks — we've received your message and will be in touch within one business day.";
        cfStatus.classList.add('is-success');
        contactForm.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      cfStatus.textContent = 'Something went wrong. Please try again or email us directly.';
      cfStatus.classList.add('is-error');
    } finally {
      cfSubmit.disabled = false;
      cfSubmit.textContent = 'Send Message';
    }
  });
}

// Subtle scroll reveal (respects reduced-motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.card, .pillar-row, .step, .tag-card, .qa-panel, .kpi-chip');

  revealTargets.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}
