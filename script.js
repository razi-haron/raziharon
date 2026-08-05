document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    });
  });

  // 2. Multi-Section Ladder Timeline Accordion (Career & Education)
  const timelines = document.querySelectorAll('.ladder-timeline');

  timelines.forEach(timeline => {
    const timelineCards = timeline.querySelectorAll('.ladder-card');

    timelineCards.forEach(card => {
      const header = card.querySelector('.card-header');
      
      header.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        
        // Close siblings within the SAME timeline section
        timelineCards.forEach(item => item.classList.remove('open'));

        if (!isOpen) {
          card.classList.add('open');
        }
      });
    });

    // Auto-open first item in each timeline section by default
    if (timelineCards.length > 0) {
      timelineCards[0].classList.add('open');
    }
  });

  // 3. Active Nav Highlighting on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 4. Certificate Image Preview Modal with Watermark Support
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('fullCertImage');
  const certThumbnails = document.querySelectorAll('.cert-thumbnail');

  certThumbnails.forEach(thumb => {
    const wrapper = thumb.closest('.watermark-protected-wrapper') || thumb;
    wrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      if (modal && modalImg) {
        modal.style.display = 'flex';
        modalImg.src = thumb.src;
      }
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('cert-modal-close')) {
        modal.style.display = 'none';
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });

  // 5. Global Image Protection
  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.watermark-protected-wrapper')) {
      e.preventDefault();
    }
  });

  // 6. Projects Gallery Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Auto-assign blurred background image to project card wrappers
  document.querySelectorAll('.project-img-wrapper').forEach(wrapper => {
    const img = wrapper.querySelector('img');
    if (img) {
      wrapper.style.setProperty('--bg-img', `url("${img.src}")`);
    }
  });

  // 7. Interactive 3D Portfolio CAD Gallery Switcher
  const portfolioData = [
    {
      src: "assets/CDLR Turntable Conveyor.glb",
      title: "CLDR Turntable Conveyor Line",
      desc: "Conceptual design of a Chain Driven Live Roller (CLDR) and turntable conveyor system.",
      specs: [
        { label: "CAD Software", value: "Solid Edge 2023 CE" },
        { label: "Tolerances", value: "ISO 2768-m <br>ISO 13920-B (welding)" },
        { label: "Material Class", value: "ASTM A36 / SS400 (Frame) <br>JIS S45C / AISI 1045 (Rollers & Gears) <br>AISI 4140 (Pinions & Chain Drives)" },
        { label: "Process", value: "Sheet Metal Fabrication / MIG Welding" }
      ]
    },

    {
      src: "assets/BP Foam Skid.glb",
      title: "Balanced Pressure Foam Proportioning Skid",
      desc: "Design of balanced pressure foam proportioning skid fitted with 40 GPM external gear foam pump powered by a 22kW 3-phase induction electric motor.",
      specs: [
        { label: "CAD Software", value: "Solid Edge 2023 CE" },
        { label: "Tolerances", value: "ISO 2768-m <br>ISO 13920-B (welding)" },
        { label: "Material Class", value: "Stainless Steel 316L / Carbon Steel" },
        { label: "Process", value: "Structural Fabrication & Machining" }
      ]
    },

    {
      src: "assets/Fr Subframe.glb",
      title: "Engine Subframe Module",
      desc: "Conceptual design of an engine subframe module for passenger car.",
      specs: [
        { label: "CAD Software", value: "Solid Edge 2023 CE" },
        { label: "Tolerances", value: "ISO 2768-m / ISO 13920-B / GD&T" },
        { label: "Material Class", value: "HSLA Steel (S355MC / S460MC)" },
        { label: "Process", value: "Stamping / Robotic MAG Welding" }
      ]
    },

    {
      src: "assets/Steering Knuckle.glb",
      title: "Steering Knuckle/Upright",
      desc: "Conceptual design of a steering knuckle for passenger car.",
      specs: [
        { label: "CAD Software", value: "Solid Edge 2023 CE" },
        { label: "Tolerances", value: "ISO 2768-m / GD&T" },
        { label: "Material Class", value: "JIS FCD450" },
        { label: "Process", value: "Gravity Die Casting / 5-Axis CNC Machining" }
      ]
    },

    {
      src: "assets/Diesel Genset Skid.glb",
      title: "Diesel Genset Skid",
      desc: "Conceptual design of a diesel generator skid.",
      specs: [
        { label: "CAD Software", value: "Solid Edge 2023 CE" },
        { label: "Tolerances", value: "ISO 2768-m / GD&T" },
        { label: "Material Class", value: "ASTM A36 / SS400 (Frame)" },
        { label: "Process", value: "Sheet Metal Fabrication / MIG Welding" }
      ]
    }
  ];

  let currentModelIndex = 0;
  const cadViewer = document.getElementById('cad-viewer');
  const prevBtn = document.getElementById('prevModelBtn');
  const nextBtn = document.getElementById('nextModelBtn');
  const modelTitle = document.getElementById('model-title');
  const modelDesc = document.getElementById('model-desc');
  const specGrid = document.getElementById('spec-grid');
  const infoCard = document.getElementById('portfolio-info-card');

  function updatePortfolioGallery(index) {
    const item = portfolioData[index];
    if (!item) return;

    // Smooth transition opacity
    if (cadViewer) cadViewer.style.opacity = '0.3';
    if (infoCard) infoCard.style.opacity = '0.3';

    setTimeout(() => {
      // Update 3D Model Source
      if (cadViewer) {
        cadViewer.setAttribute('src', item.src);
        cadViewer.style.opacity = '1';
      }

      // Update Spec Text Card
      if (modelTitle) modelTitle.textContent = item.title;
      if (modelDesc) modelDesc.textContent = item.desc;

      // Build Spec Rows Dynamically
      if (specGrid) {
        specGrid.innerHTML = item.specs.map(spec => `
          <div class="spec-item">
            <span class="spec-label">${spec.label}</span>
            <span class="spec-value">${spec.value}</span>
          </div>
        `).join('');
      }

      if (infoCard) infoCard.style.opacity = '1';
    }, 200);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentModelIndex = (currentModelIndex - 1 + portfolioData.length) % portfolioData.length;
      updatePortfolioGallery(currentModelIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentModelIndex = (currentModelIndex + 1) % portfolioData.length;
      updatePortfolioGallery(currentModelIndex);
    });
  }
});