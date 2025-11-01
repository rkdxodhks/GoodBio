let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let slideDirection = 1; // 1: 다음, -1: 이전

// 슬라이드 인디케이터 업데이트
function updateSlideIndicator() {
  document.getElementById("current-slide").textContent = currentSlide + 1;
  document.getElementById("total-slides").textContent = totalSlides;
  
  // 슬라이드 번호 배지 업데이트
  const badgeCurrent = document.getElementById("badge-current");
  const badgeTotal = document.getElementById("badge-total");
  if (badgeCurrent) badgeCurrent.textContent = currentSlide + 1;
  if (badgeTotal) badgeTotal.textContent = totalSlides;
  
  // 진행 바 업데이트
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
    
    // ARIA 속성 업데이트
    const progressContainer = document.querySelector(".progress-bar-container");
    if (progressContainer) {
      progressContainer.setAttribute("aria-valuenow", currentSlide + 1);
    }
  }
  
  // 미니맵 업데이트
  updateMinimap();
  
  // 발표자 패널 업데이트
  updatePresenterPanel();
}

// 슬라이드 변경 함수
function changeSlide(direction) {
  if (slides.length === 0) return;
  
  const prevSlide = currentSlide;
  slides[currentSlide].classList.remove("active");
  slides[currentSlide].classList.remove("prev", "next");
  
  slideDirection = direction;
  currentSlide += direction;

  // 순환 처리
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }

  // 방향 클래스 추가
  if (direction > 0) {
    slides[prevSlide].classList.add("prev");
  } else {
    slides[prevSlide].classList.add("next");
  }

  slides[currentSlide].classList.add("active");
  updateSlideIndicator();
  
  // 첫 방문 힌트 숨기기
  hideHint();
}

// 특정 슬라이드로 이동
function goToSlide(index) {
  if (index < 0 || index >= totalSlides) return;
  
  const direction = index > currentSlide ? 1 : -1;
  const diff = Math.abs(index - currentSlide);
  
  // 직접 이동
  slides[currentSlide].classList.remove("active");
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  updateSlideIndicator();
  hideHint();
}

// 키보드 네비게이션 (아래 통합된 이벤트 핸들러로 이동)

// 터치 스와이프 지원 (모바일)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

document.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // 왼쪽으로 스와이프 (다음 슬라이드)
      changeSlide(1);
    } else {
      // 오른쪽으로 스와이프 (이전 슬라이드)
      changeSlide(-1);
    }
  }
}

// 미니맵 초기화
function initMinimap() {
  const minimapContent = document.getElementById("minimap-content");
  if (!minimapContent) return;
  
  minimapContent.innerHTML = "";
  
  slides.forEach((slide, index) => {
    const slideItem = document.createElement("button");
    slideItem.className = "minimap-slide-item";
    slideItem.setAttribute("role", "listitem");
    slideItem.setAttribute("aria-label", `슬라이드 ${index + 1}로 이동`);
    
    const slideNumber = document.createElement("span");
    slideNumber.className = "slide-number";
    slideNumber.textContent = index + 1;
    
    slideItem.appendChild(slideNumber);
    slideItem.addEventListener("click", () => goToSlide(index));
    
    minimapContent.appendChild(slideItem);
  });
  
  updateMinimap();
}

// 미니맵 업데이트
function updateMinimap() {
  const minimapItems = document.querySelectorAll(".minimap-slide-item");
  minimapItems.forEach((item, index) => {
    item.classList.toggle("active", index === currentSlide);
  });
}

// 미니맵 토글
function toggleMinimap() {
  const minimapContent = document.getElementById("minimap-content");
  const minimapToggle = document.getElementById("minimap-toggle");
  
  if (!minimapContent || !minimapToggle) return;
  
  const isExpanded = minimapContent.classList.contains("active");
  
  if (isExpanded) {
    minimapContent.classList.remove("active");
    minimapToggle.setAttribute("aria-expanded", "false");
  } else {
    minimapContent.classList.add("active");
    minimapToggle.setAttribute("aria-expanded", "true");
  }
}

// 첫 방문 힌트 표시
function showHint() {
  // localStorage 확인
  const hasVisited = localStorage.getItem("hasVisitedSlide");
  if (hasVisited) return;
  
  const hint = document.getElementById("first-visit-hint");
  if (hint) {
    hint.classList.add("show");
    // 5초 후 자동 숨김
    setTimeout(() => {
      hideHint();
    }, 5000);
  }
}

// 힌트 숨기기
function closeHint() {
  hideHint();
  localStorage.setItem("hasVisitedSlide", "true");
}

function hideHint() {
  const hint = document.getElementById("first-visit-hint");
  if (hint) {
    hint.classList.remove("show");
  }
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  updateSlideIndicator();
  initMinimap();
  
  // 미니맵 토글 이벤트
  const minimapToggle = document.getElementById("minimap-toggle");
  if (minimapToggle) {
    minimapToggle.addEventListener("click", toggleMinimap);
  }
  
  // 첫 방문 힌트 (약간의 지연 후 표시)
  setTimeout(() => {
    showHint();
  }, 1000);
  
  // 외부 클릭 시 미니맵 닫기
  document.addEventListener("click", (e) => {
    const minimap = document.getElementById("slide-minimap");
    const minimapContent = document.getElementById("minimap-content");
    
    if (minimap && minimapContent && minimapContent.classList.contains("active")) {
      if (!minimap.contains(e.target)) {
        minimapContent.classList.remove("active");
        document.getElementById("minimap-toggle")?.setAttribute("aria-expanded", "false");
      }
    }
  });
});

// 발표자 패널 업데이트
function updatePresenterPanel() {
  const presenterSlide = document.getElementById("presenter-current-slide");
  const presenterTitle = document.getElementById("presenter-slide-title");
  const nextPreview = document.getElementById("next-slide-preview");
  const presenterNotes = document.getElementById("presenter-notes");
  
  if (presenterSlide) {
    presenterSlide.textContent = currentSlide + 1;
  }
  
  // 현재 슬라이드 제목 가져오기
  const currentSlideElement = slides[currentSlide];
  if (currentSlideElement && presenterTitle) {
    const slideHeading = currentSlideElement.querySelector("h2");
    if (slideHeading) {
      presenterTitle.textContent = slideHeading.textContent || "슬라이드 제목 없음";
    } else {
      presenterTitle.textContent = "타이틀 슬라이드";
    }
  }
  
  // 발표자 노트 가져오기
  if (presenterNotes && currentSlideElement) {
    const notesElement = currentSlideElement.querySelector(".speaker-notes");
    if (notesElement) {
      // 텍스트를 가져와서 줄바꿈을 자연스럽게 처리
      let notesText = notesElement.textContent.trim() || "";
      // HTML의 줄바꿈을 실제 줄바꿈으로 변환
      notesText = notesText.replace(/\s+/g, ' ').trim();
      // 문장 단위로 줄바꿈 추가 (마침표, 느낌표, 물음표 뒤)
      notesText = notesText.replace(/([.!?])\s+/g, '$1\n\n');
      presenterNotes.textContent = notesText;
      presenterNotes.style.display = "block";
    } else {
      presenterNotes.textContent = "";
      presenterNotes.style.display = "none";
    }
  }
  
  // 다음 슬라이드 미리보기
  if (nextPreview) {
    const nextIndex = (currentSlide + 1) % totalSlides;
    const nextSlide = slides[nextIndex];
    
    if (nextSlide) {
      const nextHeading = nextSlide.querySelector("h2");
      const nextContent = nextSlide.querySelector(".slide-content");
      
      if (nextHeading) {
        nextPreview.innerHTML = `<strong>${nextHeading.textContent}</strong>`;
      } else {
        nextPreview.textContent = "다음 슬라이드 없음";
      }
    }
  }
}

// 발표 모드 토글
function togglePresentationMode() {
  const panel = document.getElementById("presenter-panel");
  const btn = document.getElementById("presentation-mode-btn");
  
  if (panel && btn) {
    const isActive = panel.classList.toggle("active");
    btn.classList.toggle("active", isActive);
    
    if (isActive) {
      updatePresenterPanel();
      // 발표 모드 시작 시 타이머 자동 시작
      if (!timerRunning) {
        startTimer();
      }
    }
  }
}

// 전체 화면 토글
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log("전체 화면 진입 실패:", err);
    });
    document.body.classList.add("fullscreen");
  } else {
    document.exitFullscreen();
    document.body.classList.remove("fullscreen");
  }
}

// 최소 UI 모드 토글
function toggleMinimalUI() {
  document.body.classList.toggle("minimal-ui");
  const btn = document.getElementById("minimal-ui-btn");
  if (btn) {
    btn.classList.toggle("active");
  }
}

// 타이머 관련 변수
let timerStartTime = null;
let timerPausedTime = 0;
let timerRunning = false;
let timerInterval = null;

// 타이머 시작
function startTimer() {
  if (timerStartTime === null) {
    timerStartTime = Date.now();
  }
  timerRunning = true;
  const timerEl = document.getElementById("presentation-timer");
  if (timerEl) {
    timerEl.classList.add("running");
    timerEl.classList.remove("warning", "danger");
  }
  
  if (timerInterval) clearInterval(timerInterval);
  
  timerInterval = setInterval(() => {
    updateTimer();
  }, 100);
}

// 타이머 업데이트
function updateTimer() {
  const timerEl = document.getElementById("presentation-timer");
  if (!timerEl) return;
  
  const now = Date.now();
  const elapsed = Math.floor((now - timerStartTime) / 1000) + timerPausedTime;
  
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  
  timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  
  // 경고 상태
  if (elapsed >= 600) { // 10분
    timerEl.classList.remove("running", "warning");
    timerEl.classList.add("danger");
  } else if (elapsed >= 480) { // 8분
    timerEl.classList.remove("running", "danger");
    timerEl.classList.add("warning");
  }
}

// 타이머 토글 (일시정지/재개)
function toggleTimer() {
  const toggleBtn = document.getElementById("timer-toggle");
  
  if (timerRunning) {
    // 일시정지
    timerPausedTime += Math.floor((Date.now() - timerStartTime) / 1000);
    timerStartTime = null;
    timerRunning = false;
    clearInterval(timerInterval);
    if (toggleBtn) toggleBtn.textContent = "시작";
    const timerEl = document.getElementById("presentation-timer");
    if (timerEl) {
      timerEl.classList.remove("running");
    }
  } else {
    // 재개
    timerStartTime = Date.now();
    startTimer();
    if (toggleBtn) toggleBtn.textContent = "일시정지";
  }
}

// 타이머 리셋
function resetTimer() {
  timerStartTime = null;
  timerPausedTime = 0;
  timerRunning = false;
  clearInterval(timerInterval);
  
  const timerEl = document.getElementById("presentation-timer");
  const toggleBtn = document.getElementById("timer-toggle");
  
  if (timerEl) {
    timerEl.textContent = "00:00";
    timerEl.classList.remove("running", "warning", "danger");
  }
  if (toggleBtn) toggleBtn.textContent = "시작";
}

// 통합 키보드 단축키
document.addEventListener("keydown", (e) => {
  // input/textarea에서는 처리하지 않음
  if (e.target.matches("input, textarea")) return;
  
  // 슬라이드 네비게이션
  if (e.key === "ArrowLeft") {
    changeSlide(-1);
  } else if (e.key === "ArrowRight") {
    changeSlide(1);
  } else if (e.key === "Home") {
    goToSlide(0);
  } else if (e.key === "End") {
    goToSlide(totalSlides - 1);
  }
  // F키 - 발표 모드
  else if (e.key === "f" || e.key === "F") {
    e.preventDefault();
    togglePresentationMode();
  }
  // M키 - 최소 UI 모드
  else if (e.key === "m" || e.key === "M") {
    e.preventDefault();
    toggleMinimalUI();
  }
  // ESC - 발표자 패널 닫기
  else if (e.key === "Escape") {
    const panel = document.getElementById("presenter-panel");
    if (panel && panel.classList.contains("active")) {
      togglePresentationMode();
    }
  }
});

// 전체 화면 변화 감지
document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    document.body.classList.remove("fullscreen");
  }
});

// 시뮬레이터 관련 변수
let isCompareMode = false;
let currentArea = 1; // 기본 1ha
const baseAbsorptionRate = 250; // 1ha당 연간 250 ton
const comparisonReduction = 0.4; // 기존 시스템은 40% 감소

// 탄소 흡수량 계산 함수
function calculateAbsorption(area, year, isComparison = false) {
  const baseRate = baseAbsorptionRate * area;
  
  // 연차별 성장률 (60%, 80%, 90%, 100%)
  const growthRates = [0.6, 0.8, 0.9, 1.0];
  const rate = growthRates[Math.min(year - 1, 3)];
  
  let result = baseRate * rate;
  
  // 비교 모드 (기존 시스템)
  if (isComparison) {
    result = result * (1 - comparisonReduction); // 40% 감소
    // 정착률도 낮음 (60% 정착률 가정)
    result = result * 0.6;
  }
  
  return Math.round(result);
}

// 시뮬레이터 업데이트
function updateSimulator() {
  const areaInput = document.getElementById("area-input");
  const area = parseFloat(areaInput.value) || 1;
  currentArea = area;
  
  const selectedArea = document.getElementById("selected-area");
  const calculatedAbsorption = document.getElementById("calculated-absorption");
  const totalAbsorption = document.getElementById("total-absorption");
  const annualAbsorption = document.getElementById("annual-absorption");
  const settlementRate = document.getElementById("settlement-rate");
  
  // 면적 표시
  if (selectedArea) {
    selectedArea.textContent = `${area} ha`;
  }
  
  // 연간 탄소 흡수량 (4년차 기준)
  const annualAbs = calculateAbsorption(area, 4, isCompareMode);
  if (calculatedAbsorption) {
    calculatedAbsorption.textContent = `${annualAbs.toLocaleString()} ton CO₂`;
  }
  if (annualAbsorption) {
    annualAbsorption.textContent = `${annualAbs.toLocaleString()} ton`;
  }
  
  // 누적 탄소 흡수량
  let total = 0;
  for (let year = 1; year <= 4; year++) {
    total += calculateAbsorption(area, year, isCompareMode);
  }
  if (totalAbsorption) {
    totalAbsorption.textContent = `${total.toLocaleString()} ton CO₂`;
  }
  
  // 정착률 업데이트
  const settlement = isCompareMode ? "60%" : "93%";
  if (settlementRate) {
    settlementRate.textContent = settlement;
  }
  
  // 차트 업데이트
  updateChart();
}

// 차트 업데이트
function updateChart() {
  const chartBars = document.querySelectorAll(".chart-bar");
  const selectedYear = document.getElementById("year-select")?.value;
  
  chartBars.forEach((bar, index) => {
    const year = index + 1;
    const absorption = calculateAbsorption(currentArea, year, isCompareMode);
    const maxAbsorption = calculateAbsorption(currentArea, 4, isCompareMode);
    const height = (absorption / maxAbsorption) * 100;
    
    // 연도 선택 시 해당 연도만 표시
    if (selectedYear && selectedYear !== "all") {
      if (year === parseInt(selectedYear)) {
        bar.style.display = "flex";
        bar.style.opacity = "1";
      } else {
        bar.style.display = "none";
      }
    } else {
      bar.style.display = "flex";
      bar.style.opacity = "1";
    }
    
    // 높이 및 값 업데이트
    bar.style.height = `${height}%`;
    bar.querySelector(".chart-value").textContent = absorption.toLocaleString();
    
    // 비교 모드 시 색상 변경
    if (isCompareMode) {
      bar.classList.add("comparison-mode");
      bar.classList.remove("highlight-bar");
    } else {
      bar.classList.remove("comparison-mode");
      if (year === 4) {
        bar.classList.add("highlight-bar");
      }
    }
  });
}

// 면적 입력 이벤트
function initSimulator() {
  const areaInput = document.getElementById("area-input");
  if (areaInput) {
    areaInput.addEventListener("input", () => {
      updateSimulator();
    });
    areaInput.addEventListener("change", () => {
      updateSimulator();
    });
  }
  
  // 초기 업데이트
  updateSimulator();
}

// 비교 모드 토글
function toggleCompare() {
  const toggleBtn = document.getElementById("compare-toggle");
  const toggleText = document.getElementById("toggle-text");
  const indicator = document.getElementById("comparison-indicator");
  
  isCompareMode = !isCompareMode;
  
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", isCompareMode);
  }
  
  if (toggleText) {
    toggleText.textContent = isCompareMode ? "우리 시스템 보기" : "기존 시스템 보기";
  }
  
  if (indicator) {
    indicator.style.display = isCompareMode ? "flex" : "none";
  }
  
  updateSimulator();
}

// 연도 선택 업데이트
function updateYearChart() {
  updateChart();
}

// 시뮬레이터 초기화
function resetSimulator() {
  const areaInput = document.getElementById("area-input");
  const yearSelect = document.getElementById("year-select");
  
  if (areaInput) {
    areaInput.value = 1;
  }
  if (yearSelect) {
    yearSelect.value = "all";
  }
  
  isCompareMode = false;
  const toggleBtn = document.getElementById("compare-toggle");
  const toggleText = document.getElementById("toggle-text");
  const indicator = document.getElementById("comparison-indicator");
  
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", "false");
  }
  if (toggleText) {
    toggleText.textContent = "기존 시스템 보기";
  }
  if (indicator) {
    indicator.style.display = "none";
  }
  
  updateSimulator();
}

// 슬라이드 전환 애니메이션을 위한 CSS 클래스 추가
slides.forEach((slide, index) => {
  if (index === 0) {
    slide.classList.add("active");
  }
});

// 시뮬레이터 슬라이드 진입 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  // 슬라이드 변경 감지하여 시뮬레이터 초기화
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "class") {
        const target = mutation.target;
        if (target.classList.contains("active")) {
          // 시뮬레이터 슬라이드인지 확인 (슬라이드 7)
          const slideIndex = Array.from(slides).indexOf(target);
          if (slideIndex === 6) { // 0-based index, 시뮬레이터는 7번째(6번 인덱스)
            setTimeout(() => {
              initSimulator();
            }, 100);
          }
        }
      }
    });
  });

  // 모든 슬라이드 관찰
  slides.forEach((slide) => {
    observer.observe(slide, { attributes: true });
  });
  
  // 초기 시뮬레이터 설정
  if (slides[6] && slides[6].classList.contains("active")) {
    initSimulator();
  }
});
