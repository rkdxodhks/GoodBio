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
      const target = document.querySelector("#slide-1");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // 슬라이드 네비게이션 기능
  const slideDots = document.querySelectorAll(".slide-dot");
  const slideSections = document.querySelectorAll(".slide-section");

  // 슬라이드 네비게이션 클릭 이벤트
  slideDots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      e.preventDefault();
      const slideNum = dot.dataset.slide;
      const targetSlide = document.querySelector(`#slide-${slideNum}`);
      if (targetSlide) {
        targetSlide.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 현재 보이는 슬라이드에 따라 네비게이션 업데이트
  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const slideId = entry.target.id;
          const slideNum = slideId.split("-")[1];

          // 모든 dot에서 active 클래스 제거
          slideDots.forEach((dot) => dot.classList.remove("active"));

          // 현재 슬라이드의 dot에 active 클래스 추가
          const activeDot = document.querySelector(
            `.slide-dot[data-slide="${slideNum}"]`
          );
          if (activeDot) {
            activeDot.classList.add("active");
          }
        }
      });
    },
    {
      threshold: 0.5, // 슬라이드의 50% 이상 보일 때
      rootMargin: "-100px 0px -100px 0px",
    }
  );

  // 모든 슬라이드 섹션 관찰
  slideSections.forEach((section) => {
    slideObserver.observe(section);
  });

  // 키보드 네비게이션 (선택사항)
  let currentSlide = 1;
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      if (currentSlide < 7) {
        currentSlide++;
        const targetSlide = document.querySelector(`#slide-${currentSlide}`);
        if (targetSlide) {
          targetSlide.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      if (currentSlide > 1) {
        currentSlide--;
        const targetSlide = document.querySelector(`#slide-${currentSlide}`);
        if (targetSlide) {
          targetSlide.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });
});
