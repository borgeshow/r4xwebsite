(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Menu mobile ------------------------------------------------------------ */
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    const toggle = topbar.querySelector('.topbar__toggle');
    const setMenu = (open) => {
      topbar.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    };
    toggle.addEventListener('click', () => setMenu(!topbar.classList.contains('is-open')));
    topbar.querySelectorAll('.topbar__menu a').forEach((link) => {
      link.addEventListener('click', () => setMenu(false));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setMenu(false);
    });
    window.matchMedia('(min-width: 1101px)').addEventListener('change', (event) => {
      if (event.matches) setMenu(false);
    });
  }

  /* Soluções: item ativo alimenta o card e avança sozinho ------------------ */
  const services = document.querySelector('[data-services]');
  if (services) {
    const items = [...services.querySelectorAll('.service')];
    const cardTitle = services.querySelector('[data-card-title]');
    const cardText = services.querySelector('[data-card-text]');
    const cardContent = services.querySelector('.service-card__content');
    let current = items.findIndex((item) => item.classList.contains('is-active'));

    const activate = (index) => {
      items.forEach((item) => {
        item.classList.remove('is-active');
        item.querySelector('.service__btn').setAttribute('aria-pressed', 'false');
      });
      void services.offsetWidth; // reinicia a animação da barra
      const item = items[index];
      item.classList.add('is-active');
      item.querySelector('.service__btn').setAttribute('aria-pressed', 'true');

      if (index !== current) {
        cardTitle.textContent = item.querySelector('.service__title').textContent;
        cardText.textContent = item.querySelector('.service__text').textContent;
        cardContent.classList.remove('is-swapping');
        void cardContent.offsetWidth;
        cardContent.classList.add('is-swapping');
      }
      current = index;
    };

    items.forEach((item, index) => {
      item.querySelector('.service__btn').addEventListener('click', () => activate(index));
      item.querySelector('.service__progress').addEventListener('animationend', () => {
        if (!reducedMotion.matches) activate((index + 1) % items.length);
      });
    });

    // Só corre o tempo enquanto a seção estiver visível
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        services.classList.toggle('is-paused', !entry.isIntersecting);
      }, { threshold: 0.35 }).observe(services);
    }
  }

  /* Depoimentos ------------------------------------------------------------ */
  const carousel = document.querySelector('[data-carousel]');
  if (carousel) {
    const slides = [...carousel.querySelectorAll('.testimonial')];
    let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));

    const show = (index) => {
      slides[current].classList.remove('is-active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    };

    carousel.querySelector('[data-prev]').addEventListener('click', () => show(current - 1));
    carousel.querySelector('[data-next]').addEventListener('click', () => show(current + 1));
  }

  /* Parceiros: duplica os logos para o loop contínuo ----------------------- */
  const track = document.querySelector('.partners__track');
  if (track) {
    [...track.children].forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelector('img').alt = '';
      track.appendChild(clone);
    });
  }
})();
