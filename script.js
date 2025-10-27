// 스크롤 애니메이션
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// 메트릭 카운터 애니메이션
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// 숫자 카드 카운터 애니메이션
function animateNumberCard(card) {
  const target = parseInt(card.dataset.number);
  const suffix = card.dataset.suffix;
  const counterElement = card.querySelector(".counter");

  let current = 0;
  const increment = target / 60; // 60프레임으로 나눔

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      counterElement.textContent = target;
      clearInterval(timer);
    } else {
      counterElement.textContent = Math.floor(current);
    }
  }, 16);
}

// 숫자 카드용 Intersection Observer
const numberCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        !entry.target.classList.contains("animated")
      ) {
        entry.target.classList.add("visible", "animated");
        animateNumberCard(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

// 모든 섹션에 애니메이션 적용
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section, .hero-content");
  sections.forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  // 숫자 카드에 애니메이션 적용
  const numberCards = document.querySelectorAll(".number-card");
  numberCards.forEach((card) => {
    numberCardObserver.observe(card);
  });

  // Smooth scroll for CTA button
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(ctaButton.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
