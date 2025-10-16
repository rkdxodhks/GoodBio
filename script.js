// 라이브맵 발표자용 페이지 JavaScript

// 스무스 스크롤 함수
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// AI 분석 시뮬레이터
function analyzePosting(type) {
  const analysisResult = document.getElementById("analysis-result");
  const scoreElement = document.getElementById("score");
  const badgeElement = document.getElementById("result-badge");

  // 결과 표시
  analysisResult.classList.add("show");

  // 분석 단계 애니메이션
  const steps = analysisResult.querySelectorAll(".analysis-step");
  steps.forEach((step, index) => {
    setTimeout(() => {
      step.style.opacity = "0";
      step.style.transform = "translateX(-20px)";
      step.style.transition = "all 0.3s ease";

      setTimeout(() => {
        step.style.opacity = "1";
        step.style.transform = "translateX(0)";
      }, 100);
    }, index * 500);
  });

  // 최종 결과 표시
  setTimeout(() => {
    if (type === "real") {
      scoreElement.textContent = "82점 / 100점";
      badgeElement.textContent = "✅ 지도에 표시";
      badgeElement.className = "result-badge approved";
    } else {
      scoreElement.textContent = "38점 / 100점";
      badgeElement.textContent = "❌ 필터링됨";
      badgeElement.className = "result-badge filtered";
    }

    // 결과 애니메이션
    scoreElement.style.transform = "scale(1.1)";
    setTimeout(() => {
      scoreElement.style.transform = "scale(1)";
    }, 200);
  }, 2000);
}

// 새 포스팅 추가 시뮬레이터
function addNewPosting() {
  const mapArea = document.getElementById("map-area");
  const newPin = document.createElement("div");

  newPin.className = "map-pin new";
  newPin.innerHTML = "📍 해운대 ○○카페";
  newPin.setAttribute("data-time", "방금 전");

  // 새 핀 추가 애니메이션
  newPin.style.opacity = "0";
  newPin.style.transform = "scale(0)";
  mapArea.appendChild(newPin);

  // 애니메이션 실행
  setTimeout(() => {
    newPin.style.transition = "all 0.5s ease";
    newPin.style.opacity = "1";
    newPin.style.transform = "scale(1)";
  }, 100);

  // 분석 시뮬레이션
  setTimeout(() => {
    showAnalysisSimulation();
  }, 1000);

  // 3초 후 NEW 배지 제거
  setTimeout(() => {
    newPin.classList.remove("new");
  }, 3000);
}

// 분석 시뮬레이션 표시
function showAnalysisSimulation() {
  // 모달 창 생성
  const modal = document.createElement("div");
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <h3 style="color: #0064FF; margin-bottom: 1rem;">시뮬레이션: 새 포스팅 올라옴</h3>
            <p style="margin-bottom: 1rem; font-style: italic;">"해운대 ○○카페 지금 타임세일!"</p>
            <div style="margin-bottom: 1rem;">
                <p>AI 분석 중...</p>
                <div style="
                    width: 100%;
                    height: 8px;
                    background: #E5E8EB;
                    border-radius: 4px;
                    overflow: hidden;
                    margin-top: 0.5rem;
                ">
                    <div class="progress-bar" style="
                        width: 0%;
                        height: 100%;
                        background: #0064FF;
                        border-radius: 4px;
                        transition: width 2s ease;
                    "></div>
                </div>
            </div>
            <div class="result-message" style="
                padding: 1rem;
                border-radius: 8px;
                font-weight: 600;
                display: none;
            ">
                ✅ 승인됨!
            </div>
            <p style="margin-top: 1rem; color: #666;">
                → 지도에 새 핀이 뿅! 나타남
            </p>
        </div>
    `;

  document.body.appendChild(modal);

  // 모달 애니메이션
  setTimeout(() => {
    modal.style.opacity = "1";
    const modalContent = modal.querySelector("div");
    modalContent.style.transform = "scale(1)";
  }, 100);

  // 진행률 바 애니메이션
  setTimeout(() => {
    const progressBar = modal.querySelector(".progress-bar");
    progressBar.style.width = "100%";
  }, 500);

  // 결과 메시지 표시
  setTimeout(() => {
    const resultMessage = modal.querySelector(".result-message");
    resultMessage.style.display = "block";
    resultMessage.style.background = "#12C888";
    resultMessage.style.color = "white";
  }, 2500);

  // 모달 닫기
  setTimeout(() => {
    modal.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }, 4000);

  // 모달 클릭 시 닫기
  modal.addEventListener("click", () => {
    modal.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  });
}

// AI 추천 시뮬레이터
function selectOption(option) {
  const chatInterface = document.getElementById("chat-interface");
  const recommendationResult = document.getElementById("recommendation-result");

  // 선택된 옵션에 따른 메시지
  let messages = {
    alone: {
      question: "혼자만의 시간이 필요하시군요! 예산은 어느 정도 생각하세요?",
      options: ["💰 1만원대", "💰💰 2-3만원", "💰💰💰 상관없어요"],
    },
    friends: {
      question: "친구들과 함께라면 더 좋겠네요! 어떤 활동을 선호하세요?",
      options: ["🍕 맛집 투어", "🎮 놀이공원", "🎬 영화관람"],
    },
    date: {
      question: "로맨틱한 데이트 코스네요! 어떤 분위기를 원하세요?",
      options: ["🌅 조용한 카페", "🌆 야경 명소", "🎨 문화 공간"],
    },
    culture: {
      question: "문화생활을 즐기고 싶으시군요! 어떤 분야에 관심있으세요?",
      options: ["🎨 미술관", "🎭 연극/뮤지컬", "📚 독서 공간"],
    },
  };

  const selected = messages[option];

  // 새로운 메시지 추가
  const newMessage = document.createElement("div");
  newMessage.className = "chat-message ai-message";
  newMessage.innerHTML = `
        <span class="emoji">💬</span>
        ${selected.question}
    `;

  const newOptions = document.createElement("div");
  newOptions.className = "chat-options";
  selected.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => generateRecommendation(option, opt);
    newOptions.appendChild(btn);
  });

  chatInterface.appendChild(newMessage);
  chatInterface.appendChild(newOptions);

  // 기존 옵션 버튼들 숨기기
  const existingOptions = chatInterface.querySelector(".chat-options");
  if (existingOptions) {
    existingOptions.style.display = "none";
  }
}

// 추천 결과 생성
function generateRecommendation(option, budget) {
  const recommendationResult = document.getElementById("recommendation-result");

  const recommendations = {
    alone: [
      { name: "숨은 빈티지샵", time: "15분", desc: "조용하고 아늑한 분위기" },
      { name: "독립 갤러리", time: "20분", desc: "지금 전시 중" },
      { name: "소규모 카페", time: "30분", desc: "사람 적고 창가 자리 있음" },
    ],
    friends: [
      { name: "맛집 골목", time: "20분", desc: "친구들과 함께 즐기는 공간" },
      { name: "보드게임 카페", time: "45분", desc: "다양한 게임 보유" },
      { name: "노래방", time: "30분", desc: "프라이빗 룸 예약 가능" },
    ],
    date: [
      { name: "루프탑 카페", time: "25분", desc: "야경이 아름다운 공간" },
      { name: "한강 공원", time: "20분", desc: "산책하기 좋은 분위기" },
      { name: "영화관", time: "30분", desc: "최신 개봉작 상영" },
    ],
    culture: [
      { name: "현대미술관", time: "40분", desc: "특별전시 진행 중" },
      { name: "연극 극장", time: "35분", desc: "오늘 7시 공연" },
      { name: "독서 카페", time: "25분", desc: "조용한 독서 환경" },
    ],
  };

  const selectedRecommendations =
    recommendations[option] || recommendations["alone"];

  recommendationResult.innerHTML = `
        <h3 style="margin-bottom: 1rem;">✨ 맞춤 코스 생성됨!</h3>
        ${selectedRecommendations
          .map(
            (rec) => `
            <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(255,255,255,0.2); border-radius: 8px;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">
                    📍 ${rec.name} (${rec.time})
                </div>
                <div style="font-size: 0.9rem; opacity: 0.9;">
                    → ${rec.desc}
                </div>
            </div>
        `
          )
          .join("")}
        <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(255,255,255,0.2); border-radius: 8px;">
            총 거리: 2.3km | 예상 시간: 2시간
        </div>
        <div style="margin-top: 1rem; display: flex; gap: 1rem; justify-content: center;">
            <button onclick="showMap()" style="
                background: rgba(255,255,255,0.2);
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                color: white;
                cursor: pointer;
                font-weight: 600;
            ">지도로 보기</button>
            <button onclick="resetChat()" style="
                background: rgba(255,255,255,0.2);
                border: none;
                padding: 8px 16px;
                border-radius: 8px;
                color: white;
                cursor: pointer;
                font-weight: 600;
            ">다시 추천받기</button>
        </div>
    `;

  recommendationResult.classList.add("show");
}

// 지도 보기 (시뮬레이션)
function showMap() {
  alert("지도 시뮬레이터로 이동합니다! (실제 구현에서는 지도 페이지로 이동)");
}

// 채팅 리셋
function resetChat() {
  const chatInterface = document.getElementById("chat-interface");
  const recommendationResult = document.getElementById("recommendation-result");

  // 모든 추가된 메시지 제거
  const messages = chatInterface.querySelectorAll(".chat-message");
  messages.forEach((msg, index) => {
    if (index > 0) msg.remove();
  });

  // 모든 추가된 옵션 제거
  const options = chatInterface.querySelectorAll(".chat-options");
  options.forEach((opt, index) => {
    if (index > 0) opt.remove();
  });

  // 기존 옵션 버튼들 다시 보이기
  const existingOptions = chatInterface.querySelector(".chat-options");
  if (existingOptions) {
    existingOptions.style.display = "grid";
  }

  // 추천 결과 숨기기
  recommendationResult.classList.remove("show");
}

// FAQ 토글
function toggleFAQ(element) {
  const isActive = element.classList.contains("active");

  // 모든 FAQ 아이템 비활성화
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  // 클릭한 아이템만 활성화 (토글)
  if (!isActive) {
    element.classList.add("active");
  }
}

// 스크롤 애니메이션
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // 애니메이션 대상 요소들 관찰
  const animateElements = document.querySelectorAll(
    ".story-card, .stat-card, .method-card, .timeline-item-large, .faq-item, .flow-step-enhanced"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

  // 플로우 스텝 순차 애니메이션
  const flowSteps = document.querySelectorAll(".flow-step-enhanced");
  const flowObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          flowSteps.forEach((step, index) => {
            setTimeout(() => {
              step.style.opacity = "1";
              step.style.transform = "translateY(0)";
            }, index * 200);
          });
          flowObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const flowContainer = document.querySelector(".upgraded-flow-container");
  if (flowContainer) {
    flowObserver.observe(flowContainer);
  }
}

// 통계 숫자 카운트 애니메이션
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = stat.textContent;
    const isPercentage = target.includes("%");
    const isTime = target.includes("분") || target.includes("초");
    const numericValue = parseFloat(target.replace(/[^\d.]/g, ""));

    if (!isNaN(numericValue)) {
      const increment = numericValue / 50;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }

        let displayValue = Math.floor(current * 10) / 10;
        if (isPercentage) {
          stat.textContent = displayValue + "%";
        } else if (isTime) {
          stat.textContent =
            displayValue + (target.includes("분") ? "분" : "초");
        } else {
          stat.textContent = displayValue.toFixed(1);
        }
      }, 30);
    }
  });
}

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", function () {
  // 스크롤 애니메이션 초기화
  initScrollAnimations();

  // 통계 애니메이션 (스크롤 시)
  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);
  }

  // 부드러운 스크롤 (모든 링크)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // 키보드 네비게이션
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      window.scrollBy(0, window.innerHeight);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      window.scrollBy(0, -window.innerHeight);
    }
  });

  // 터치 제스처 (모바일)
  let startY = 0;
  document.addEventListener("touchstart", function (e) {
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", function (e) {
    const endY = e.changedTouches[0].clientY;
    const diff = startY - endY;

    if (Math.abs(diff) > 50) {
      // 최소 스와이프 거리
      if (diff > 0) {
        // 위로 스와이프 - 다음 섹션으로
        window.scrollBy(0, window.innerHeight);
      } else {
        // 아래로 스와이프 - 이전 섹션으로
        window.scrollBy(0, -window.innerHeight);
      }
    }
  });

  // 크롤링 대시보드 시간 업데이트
  updateCrawlingDashboard();
  setInterval(updateCrawlingDashboard, 60000); // 1분마다 업데이트

  console.log("🗺️ 라이브맵 발표자용 페이지가 로드되었습니다!");
  console.log("발표 연습을 시작해보세요! 🎤");
});

// 유틸리티 함수들
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#12C888"
            : type === "error"
            ? "#FF6B6B"
            : "#0064FF"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1001;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// 발표 모드 토글
function togglePresentationMode() {
  document.body.classList.toggle("presentation-mode");

  if (document.body.classList.contains("presentation-mode")) {
    showNotification("발표 모드가 활성화되었습니다", "success");
    document.body.style.fontSize = "1.2em";
  } else {
    showNotification("일반 모드로 돌아왔습니다", "info");
    document.body.style.fontSize = "1em";
  }
}

// 발표 타이머 (선택사항)
let presentationTimer = null;
function startPresentationTimer(minutes = 10) {
  if (presentationTimer) {
    clearInterval(presentationTimer);
  }

  let timeLeft = minutes * 60;

  presentationTimer = setInterval(() => {
    const minutesLeft = Math.floor(timeLeft / 60);
    const secondsLeft = timeLeft % 60;

    if (timeLeft <= 0) {
      clearInterval(presentationTimer);
      showNotification("발표 시간이 끝났습니다!", "error");
      return;
    }

    if (timeLeft <= 60) {
      showNotification(
        `${minutesLeft}:${secondsLeft.toString().padStart(2, "0")} 남았습니다`,
        "error"
      );
    }

    timeLeft--;
  }, 1000);

  showNotification(`${minutes}분 발표 타이머가 시작되었습니다`, "success");
}

// 키보드 단축키
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + P: 발표 모드 토글
  if ((e.ctrlKey || e.metaKey) && e.key === "p") {
    e.preventDefault();
    togglePresentationMode();
  }

  // Ctrl/Cmd + T: 발표 타이머 시작 (10분)
  if ((e.ctrlKey || e.metaKey) && e.key === "t") {
    e.preventDefault();
    startPresentationTimer(10);
  }

  // ESC: 모든 모달 닫기
  if (e.key === "Escape") {
    const modals = document.querySelectorAll('[style*="position: fixed"]');
    modals.forEach((modal) => modal.remove());
  }
});

// 신뢰 스코어 계산 시뮬레이터
function calculateTrustScore() {
  const resultSection = document.getElementById("trust-score-result");

  // 계산 중 상태 표시
  resultSection.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
      <div class="loading"></div>
      <span>AI가 분석 중입니다...</span>
    </div>
  `;
  resultSection.classList.add("show");

  // 3초 후 결과 표시
  setTimeout(() => {
    const score = Math.floor(Math.random() * 30) + 70; // 70-100점 랜덤
    const isApproved = score >= 75;

    resultSection.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 2rem; margin-bottom: 1rem;">
          ${isApproved ? "✅" : "❌"}
        </div>
        <div style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">
          신뢰도: ${score}점 / 100점
        </div>
        <div style="font-size: 1.2rem; margin-bottom: 1rem;">
          ${
            isApproved
              ? "✅ 지도에 표시됩니다!"
              : "❌ 광고로 분류되어 필터링됩니다"
          }
        </div>
        <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
          <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">
            <strong>분석 결과:</strong>
          </div>
          <div style="font-size: 0.8rem; line-height: 1.4;">
            ${
              isApproved
                ? "• 자연스러운 표현 사용<br>• 광고 키워드 없음<br>• 지역명 포함<br>• 긴급성 표현 적절"
                : "• 과장된 표현 사용<br>• 광고성 키워드 발견<br>• 협찬 언급 의심<br>• 과도한 이모지 사용"
            }
          </div>
        </div>
      </div>
    `;

    resultSection.style.background = isApproved
      ? "var(--success)"
      : "var(--accent)";
  }, 3000);
}

// 상세 신뢰 스코어 계산 시뮬레이터
function calculateDetailedTrustScore() {
  const resultSection = document.getElementById("trust-score-result");
  const analysisSteps = document.getElementById("analysis-steps");

  // 초기화
  resultSection.innerHTML = "";
  resultSection.classList.remove("show");
  analysisSteps.innerHTML = "";
  analysisSteps.classList.remove("show");

  // 계산 중 상태 표시
  resultSection.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
      <div class="loading"></div>
      <span>AI가 상세 분석 중입니다...</span>
    </div>
  `;
  resultSection.classList.add("show");

  // 2초 후 단계별 분석 시작
  setTimeout(() => {
    showAnalysisSteps();
  }, 2000);
}

function showAnalysisSteps() {
  const analysisSteps = document.getElementById("analysis-steps");

  // 단계별 분석 HTML 생성
  analysisSteps.innerHTML = `
    <!-- 1단계: 텍스트 분석 -->
    <div class="analysis-step analysis-animation">
      <div class="step-header">
        <div class="step-title">▼ 1. 텍스트 분석 (40점 만점)</div>
        <div class="step-subtitle">TF-IDF 키워드 스코어링</div>
      </div>
      <div class="step-content">
        <div class="analysis-grid">
          <div class="analysis-item negative">
            <span class="icon">⚠️</span>
            <div class="keyword">광고성 키워드</div>
            <div class="count">"협찬" (0개) ✓</div>
            <div class="count">"광고" (0개) ✓</div>
            <div class="count">"제공받음" (0개) ✓</div>
            <div class="result">안전</div>
          </div>
          <div class="analysis-item positive">
            <span class="icon">✅</span>
            <div class="keyword">진짜 정보 키워드</div>
            <div class="count">"방금" (1개) ✓</div>
            <div class="count">"나왔어요" (1개) ✓</div>
            <div class="count">"서면역" (1개) ✓</div>
            <div class="result">자연스러움</div>
          </div>
        </div>
        
        <div class="llm-analysis">
          <div class="label">LLM 문맥 분석:</div>
          <div class="content">"자연스러운 표현, 광고 아님"</div>
        </div>

        <div class="score-bar">
          <div class="score-fill" style="width: 95%"></div>
        </div>
        <div class="score-text">
          <span class="score-number">38점</span>
          <span class="score-max">/ 40점 ✅</span>
        </div>
      </div>
    </div>

    <!-- 2단계: 이미지/위치 증빙 -->
    <div class="analysis-step analysis-animation">
      <div class="step-header">
        <div class="step-title">▼ 2. 이미지/위치 증빙 (30점 만점)</div>
        <div class="step-subtitle">GPS 태그 및 메타데이터 분석</div>
      </div>
      <div class="step-content">
        <div class="analysis-grid">
          <div class="analysis-item positive">
            <span class="icon">📍</span>
            <div class="keyword">GPS 태그</div>
            <div class="count">있음 ✓</div>
            <div class="result">확인됨</div>
          </div>
          <div class="analysis-item positive">
            <span class="icon">✅</span>
            <div class="keyword">위치 일치</div>
            <div class="count">실제 가게 위치와 일치 ✓</div>
            <div class="result">정확함</div>
          </div>
          <div class="analysis-item positive">
            <span class="icon">📸</span>
            <div class="keyword">사진 메타데이터</div>
            <div class="count">조작 없음 ✓</div>
            <div class="result">신뢰함</div>
          </div>
        </div>

        <div class="score-bar">
          <div class="score-fill" style="width: 93%"></div>
        </div>
        <div class="score-text">
          <span class="score-number">28점</span>
          <span class="score-max">/ 30점 ✅</span>
        </div>
      </div>
    </div>

    <!-- 3단계: 사용자 신뢰도 -->
    <div class="analysis-step analysis-animation">
      <div class="step-header">
        <div class="step-title">▼ 3. 사용자 신뢰도 (30점 만점)</div>
        <div class="step-subtitle">과거 이력 및 인증 상태</div>
      </div>
      <div class="step-content">
        <div class="analysis-grid">
          <div class="analysis-item positive">
            <span class="icon">📊</span>
            <div class="keyword">과거 포스팅 이력</div>
            <div class="count">양호 ✓</div>
            <div class="result">일관성 있음</div>
          </div>
          <div class="analysis-item positive">
            <span class="icon">🏪</span>
            <div class="keyword">사업자 인증</div>
            <div class="count">완료 ✓</div>
            <div class="result">검증됨</div>
          </div>
          <div class="analysis-item positive">
            <span class="icon">🚫</span>
            <div class="keyword">사용자 신고</div>
            <div class="count">0건 ✓</div>
            <div class="result">문제없음</div>
          </div>
        </div>

        <div class="score-bar">
          <div class="score-fill" style="width: 87%"></div>
        </div>
        <div class="score-text">
          <span class="score-number">26점</span>
          <span class="score-max">/ 30점 ✅</span>
        </div>
      </div>
    </div>

    <!-- 최종 결과 -->
    <div class="final-score-section">
      <div class="final-score-display">92점 / 100점</div>
      <div class="final-score-breakdown">
        <div class="score-breakdown-item">
          <div class="breakdown-score">38</div>
          <div class="breakdown-label">텍스트 분석</div>
        </div>
        <div class="score-breakdown-item">
          <div class="breakdown-score">28</div>
          <div class="breakdown-label">위치 증빙</div>
        </div>
        <div class="score-breakdown-item">
          <div class="breakdown-score">26</div>
          <div class="breakdown-label">사용자 신뢰도</div>
        </div>
      </div>
      
      <div class="threshold-info">
        임계값: 65점 이상 통과
      </div>
      
      <div class="final-result">
        결과: ✅ 승인! 지도에 표시됩니다
      </div>
    </div>
  `;

  analysisSteps.classList.add("show");

  // 점수 바 애니메이션
  setTimeout(() => {
    const scoreFills = analysisSteps.querySelectorAll(".score-fill");
    scoreFills.forEach((fill, index) => {
      setTimeout(() => {
        fill.style.width = fill.style.width;
      }, index * 200);
    });
  }, 500);

  // 최종 결과 표시
  setTimeout(() => {
    const resultSection = document.getElementById("trust-score-result");
    resultSection.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 2rem; margin-bottom: 1rem;">🎉</div>
        <div style="font-size: 1.2rem; font-weight: 600;">
          상세 분석이 완료되었습니다!
        </div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.8;">
          위의 단계별 결과를 확인해보세요
        </div>
      </div>
    `;
    resultSection.style.background = "var(--success)";
  }, 1000);
}

// 공간 인덱싱 시뮬레이터
function searchNearbyPlaces() {
  const resultSection = document.getElementById("search-result");
  const selectedRadius = document.querySelector(
    'input[name="radius"]:checked'
  ).value;

  // 검색 중 상태 표시
  resultSection.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
      <div class="loading"></div>
      <span>PostGIS가 공간 검색 중...</span>
    </div>
  `;
  resultSection.classList.add("show");

  // 1.5초 후 결과 표시
  setTimeout(() => {
    const radiusText =
      selectedRadius === "500"
        ? "500m"
        : selectedRadius === "1000"
        ? "1km"
        : "2km";
    const places = generateNearbyPlaces(parseInt(selectedRadius));

    resultSection.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 1.3rem; font-weight: 600; margin-bottom: 1rem; color: var(--primary);">
          🔍 ${radiusText} 반경 내 ${places.length}개 발견
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
          ${places
            .map(
              (place, index) => `
            <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: var(--gray-100); border-radius: 8px; text-align: left;">
              <div style="font-size: 1.5rem;">${place.icon}</div>
              <div style="flex: 1;">
                <div style="font-weight: 600; color: var(--gray-800);">${
                  index + 1
                }. ${place.name}</div>
                <div style="font-size: 0.9rem; color: var(--gray-600);">${
                  place.description
                }</div>
              </div>
              <div style="text-align: right;">
                <div style="font-weight: 600; color: var(--primary);">${
                  place.distance
                }m</div>
                <div style="font-size: 0.8rem; color: var(--gray-500);">${
                  place.time
                }</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        
        <button class="calculate-btn" style="margin-right: 1rem;">
          지도에서 보기
        </button>
        
        <div style="margin-top: 1rem; padding: 1rem; background: var(--success); color: white; border-radius: 8px;">
          ⚡ 검색 소요 시간: 0.08초
        </div>
      </div>
    `;

    resultSection.style.background = "var(--success)";
  }, 1500);
}

function generateNearbyPlaces(radius) {
  const placeTypes = [
    {
      icon: "🏪",
      names: ["빈티지샵", "앤티크샵", "중고서점"],
      descriptions: ["타임세일 시작", "신상품 입고", "오픈"],
    },
    {
      icon: "☕",
      names: ["카페", "커피숍", "디저트카페"],
      descriptions: ["신메뉴 출시", "특가 이벤트", "오픈"],
    },
    {
      icon: "🎨",
      names: ["갤러리", "전시관", "문화공간"],
      descriptions: ["새 전시 오픈", "무료 관람", "특별 이벤트"],
    },
    {
      icon: "🛍️",
      names: ["플리마켓", "팝업스토어", "브랜드샵"],
      descriptions: ["오픈", "마지막 날", "특가 세일"],
    },
    {
      icon: "🍽️",
      names: ["레스토랑", "식당", "푸드트럭"],
      descriptions: ["신메뉴", "오픈", "특별 이벤트"],
    },
  ];

  const places = [];
  const numPlaces = Math.min(12, Math.floor(Math.random() * 8) + 5);

  for (let i = 0; i < numPlaces; i++) {
    const type = placeTypes[Math.floor(Math.random() * placeTypes.length)];
    const name = type.names[Math.floor(Math.random() * type.names.length)];
    const description =
      type.descriptions[Math.floor(Math.random() * type.descriptions.length)];
    const distance = Math.floor(Math.random() * radius) + 50;
    const timeAgo = Math.floor(Math.random() * 60) + 1;

    let timeIcon = "⚪";
    if (timeAgo <= 10) timeIcon = "🔴";
    else if (timeAgo <= 30) timeIcon = "🟠";
    else if (timeAgo <= 60) timeIcon = "🟡";

    places.push({
      icon: type.icon,
      name: `${name} ${String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
      )}`,
      description: `${timeIcon} ${timeAgo}분 전 ${description}`,
      distance: distance,
      time: `${timeAgo}분 전`,
    });
  }

  return places.sort((a, b) => a.distance - b.distance);
}

// 크롤링 대시보드 실시간 업데이트 시뮬레이터
function updateCrawlingDashboard() {
  const currentTimeElement = document.getElementById("current-time");
  if (currentTimeElement) {
    const now = new Date();
    const timeString = now.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    currentTimeElement.textContent = timeString;
  }
}

// 개발자 도구 (발표 연습용)
window.presentationHelpers = {
  scrollToSection,
  analyzePosting,
  addNewPosting,
  selectOption,
  toggleFAQ,
  showNotification,
  togglePresentationMode,
  startPresentationTimer,
  calculateTrustScore,
  calculateDetailedTrustScore,
  searchNearbyPlaces,
  updateCrawlingDashboard,
};

console.log("발표 연습 도구가 준비되었습니다!");
console.log("presentationHelpers 객체를 통해 기능을 사용할 수 있습니다.");
