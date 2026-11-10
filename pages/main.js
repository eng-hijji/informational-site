const menuButton = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    primaryNav.classList.toggle('is-open', !isOpen);
  });

  primaryNav.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('is-open');
    }
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const contactForm = document.querySelector('#contact-form');
if (contactForm instanceof HTMLFormElement) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || 'A message from the TaskFlow website');
    const message = String(formData.get('message') || '').trim();
    const body = `Hi TaskFlow,\n\n${message}\n\n— ${name}\n${email}`;
    const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const feedback = document.querySelector('#form-feedback');

    if (feedback) {
      feedback.textContent = 'Your email app should open with the message ready to send.';
    }
    window.location.href = mailto;
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const headings = document.querySelectorAll('h1, h2, h3');

  headings.forEach((heading) => {
    const accessibleText = heading.textContent.replace(/\s+/g, ' ').trim();
    if (!accessibleText) return;

    heading.setAttribute('aria-label', accessibleText);
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    let letterIndex = 0;
    textNodes.forEach((textNode) => {
      const parts = textNode.textContent.match(/\s+|[^\s]+/g) || [];
      const fragment = document.createDocumentFragment();

      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          fragment.append(document.createTextNode(part));
          return;
        }

        const word = document.createElement('span');
        word.className = 'letter-word';
        word.setAttribute('aria-hidden', 'true');

        [...part].forEach((character) => {
          const letter = document.createElement('span');
          letter.className = 'letter';
          letter.style.setProperty('--letter-delay', `${Math.min(letterIndex * 18, 540)}ms`);
          letter.textContent = character;
          word.append(letter);
          letterIndex += 1;
        });

        fragment.append(word);
      });

      textNode.replaceWith(fragment);
    });
  });

  const revealTargets = document.querySelectorAll(
    '.intro-grid, .section-heading, .feature-card, .quote-wrap, .bottom-cta-wrap, ' +
    '.story-visual, .story-copy, .principle-card, .step-item, .audience-grid > div, ' +
    '.contact-aside, .form-card, .contact-note-inner'
  );

  revealTargets.forEach((element) => {
    element.classList.add('scroll-reveal');
    const siblings = [...element.parentElement.children].filter((sibling) =>
      revealTargets.length && sibling.matches('.scroll-reveal')
    );
    element.style.setProperty('--reveal-delay', `${Math.min(siblings.indexOf(element) * 90, 270)}ms`);
  });

  document.querySelectorAll('.hero-copy, .hero-visual, .page-hero-inner').forEach((element, index) => {
    element.classList.add('load-reveal');
    element.style.setProperty('--load-delay', `${index * 130}ms`);
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible', 'letters-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
    headings.forEach((heading) => revealObserver.observe(heading));
  } else {
    document.querySelectorAll('.scroll-reveal, h1, h2, h3').forEach((element) => {
      element.classList.add('is-visible', 'letters-visible');
    });
  }
}
