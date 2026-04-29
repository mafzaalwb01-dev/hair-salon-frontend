// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Loader
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1500);

  // 2. Navbar Scroll Effect & Back to Top
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
  });

  // 3. Dynamic Hairstyles Data
  const stylesData = [
    { name: "Classic Fade", desc: "Clean and sharp gradient fade.", img: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&h=600&fit=crop", tag: "Popular" },
    { name: "Textured Crop", desc: "Modern messy look with texture.", img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&h=600&fit=crop", tag: "Trending" },
    { name: "Pompadour", desc: "Voluminous classic style.", img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&h=600&fit=crop", tag: "Classic" },
    { name: "Buzz Cut", desc: "Short, minimal, and masculine.", img: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=500&h=600&fit=crop", tag: "Clean" },
    { name: "Side Part", desc: "Professional and neat style.", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&h=600&fit=crop", tag: "Pro" },
    { name: "Beard Trim & Shape", desc: "Perfectly sculpted beard styles.", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&h=600&fit=crop", tag: "Grooming" }
  ];

  const stylesGrid = document.getElementById('stylesGrid');
  if (stylesGrid) {
    stylesGrid.innerHTML = stylesData.map((style, index) => `
      <div class="style-card fade-in-element" style="transition-delay: ${index * 0.1}s">
        <img src="${style.img}" alt="${style.name}" class="style-card-img">
        <div class="style-card-badge">${style.tag}</div>
        <div class="style-card-overlay">
          <h3>${style.name}</h3>
          <p>${style.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 4. Dynamic Pricing Data
  const pricingData = [
    { title: "Standard Cut", price: "25", desc: "Classic haircuts and trims.", features: ["Consultation", "Hair Wash", "Standard Haircut", "Styling"], featured: false },
    { title: "Premium Grooming", price: "45", desc: "The ultimate styling package.", features: ["Haircut & Wash", "Beard Trim & Shape", "Hot Towel Shave", "Premium Styling"], featured: true },
    { title: "Executive Package", price: "70", desc: "Luxury treatment for gentlemen.", features: ["VIP Haircut & Wash", "Facial Massage", "Hot Towel Shave", "Premium Hair Products"], featured: false }
  ];

  const pricingGrid = document.getElementById('pricingGrid');
  if (pricingGrid) {
    pricingGrid.innerHTML = pricingData.map((plan, index) => `
      <div class="price-card ${plan.featured ? 'featured' : ''} fade-in-element" style="transition-delay: ${index * 0.1}s">
        ${plan.featured ? '<div class="price-featured-tag">Best</div>' : ''}
        <div class="price-icon">✂️</div>
        <h3>${plan.title}</h3>
        <div class="price-amount">$${plan.price}<span>/session</span></div>
        <ul class="price-features">
          ${plan.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <a href="#booking" class="btn-${plan.featured ? 'primary' : 'outline'}" style="display:block; text-align:center; margin-top:1rem;">Choose Plan</a>
      </div>
    `).join('');
  }

  // 5. Scroll Animations using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-element, .style-card, .price-card').forEach(el => {
    observer.observe(el);
  });
});

// Mobile Menu Functions
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
}

function closeMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.remove('active');
  hamburger.classList.remove('active');
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  if(section) {
    section.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  }
}

// Booking Form Functions
let currentStep = 1;
const totalSteps = 3;

function goToStep(step) {
  // Validate current step before moving next
  if (step > currentStep) {
    if (currentStep === 1 && (!document.getElementById('bookName').value || !document.getElementById('bookPhone').value || !document.getElementById('bookStyle').value)) {
      alert("Please fill in all details before proceeding.");
      return;
    }
    if (currentStep === 2 && (!document.getElementById('bookDate').value || !document.getElementById('bookTime').value)) {
      alert("Please select a date and time.");
      return;
    }
  }

  // Update UI for steps
  for (let i = 1; i <= totalSteps; i++) {
    const stepEl = document.getElementById(`formStep${i}`);
    if (stepEl) {
      if (i === step) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    }
  }

  // Update Indicators
  const indicators = document.querySelectorAll('.step-indicator');
  indicators.forEach((ind, index) => {
    if (index + 1 === step) {
      ind.classList.add('active');
    } else {
      ind.classList.remove('active');
    }
  });

  currentStep = step;

  // Prepare Summary if reaching Step 3
  if (step === 3) {
    prepareSummary();
  }
}

function prepareSummary() {
  const name = document.getElementById('bookName').value;
  const phone = document.getElementById('bookPhone').value;
  const style = document.getElementById('bookStyle').value;
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const notes = document.getElementById('bookNotes').value || "None";

  const summaryHTML = `
    <p><strong>Name:</strong> <span style="color:var(--gold);">${name}</span></p>
    <p><strong>Phone:</strong> <span style="color:var(--gold);">${phone}</span></p>
    <p><strong>Service:</strong> <span style="color:var(--gold);">${style}</span></p>
    <p><strong>Date & Time:</strong> <span style="color:var(--gold);">${date} at ${time}</span></p>
    <p><strong>Notes:</strong> <span style="color:var(--gold);">${notes}</span></p>
  `;

  document.getElementById('summaryDetails').innerHTML = summaryHTML;
}

function submitBooking() {
  alert("Thank you! Your appointment has been booked successfully. We will contact you soon.");
  // Reset form
  document.getElementById('bookName').value = '';
  document.getElementById('bookPhone').value = '';
  document.getElementById('bookStyle').value = '';
  document.getElementById('bookDate').value = '';
  document.getElementById('bookTime').value = '';
  document.getElementById('bookNotes').value = '';
  goToStep(1);
}
