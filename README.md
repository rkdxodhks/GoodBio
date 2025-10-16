# 🗺️ Live Map - 발표자용 페이지

## 📋 프로젝트 소개

**Live Map**은 SNS 포스팅을 실시간으로 수집하여 AI가 필터링하고 개인 맞춤 추천을 제공하는 혁신적인 지도 서비스입니다.

이 페이지는 발표자가 기술적 내용을 쉽게 설명할 수 있도록 제작된 **발표자용 페이지**입니다.

## ✨ 주요 기능

### 🎯 핵심 특징
- **실시간 SNS 크롤링**: 10분 내 최신 정보 업데이트
- **AI 광고 필터링**: 85% 정확도로 광고 자동 제거
- **개인 맞춤 추천**: 30초 내 AI 추천 시스템
- **숨은 명소 발굴**: 30% 비율로 새로운 장소 발견
- **소상공인 지원**: 30% 수익 환원 시스템

### 🔧 기술 설명 (쉽게 이해하기)
1. **전체 시스템 구조**: 4층 건물에 비유한 시스템 아키텍처
2. **SNS 크롤링**: 신문 배달부 비유로 설명하는 데이터 수집
3. **AI 필터링 기술**: TF-IDF + LLM API 2단계 검증 시스템
4. **지도 기술**: PostGIS 공간 데이터베이스 + Mapbox 렌더링

### 🎮 인터랙티브 시뮬레이터
- **신뢰 스코어 계산기**: AI가 실제로 분석하는 과정 시뮬레이션
- **공간 인덱싱 시뮬레이터**: PostGIS 공간 검색 체험
- **크롤링 대시보드**: 실시간 데이터 수집 현황 모니터링

## 🚀 기술 스택

### Frontend
- **HTML5**: 시맨틱 마크업
- **CSS3**: Toss 스타일 디자인 시스템
- **JavaScript (ES6+)**: 인터랙티브 시뮬레이터

### Backend (참고용)
- **FastAPI**: Python 웹 프레임워크
- **PostgreSQL + PostGIS**: 공간 데이터베이스
- **Redis**: 캐싱 시스템
- **Gemini API**: AI 필터링

### AI/ML
- **TF-IDF**: 텍스트 분석
- **LLM API**: 문맥 이해
- **협업 필터링**: 추천 시스템

## 📱 반응형 디자인

- **데스크톱**: 풀 기능 인터랙티브 시뮬레이터
- **태블릿**: 터치 친화적 인터페이스
- **모바일**: 세로 배치 최적화

## 🎨 디자인 시스템

### Toss 스타일 적용
- **컬러 팔레트**: Primary (#0066FF), Success (#22C55E), Accent (#EF4444)
- **타이포그래피**: Pretendard 폰트 패밀리
- **그라데이션**: 135deg 그라데이션 효과
- **그림자**: 계층별 shadow 시스템

### 인터랙션
- **호버 효과**: 부드러운 transform 애니메이션
- **로딩 애니메이션**: 시뮬레이터 진행 상태 표시
- **스크롤 애니메이션**: IntersectionObserver 활용

## 📊 발표 활용법

### 🎤 발표자 도구
```javascript
// 개발자 콘솔에서 사용 가능한 함수들
presentationHelpers.calculateDetailedTrustScore()  // 신뢰 스코어 분석
presentationHelpers.searchNearbyPlaces()           // 공간 검색 시뮬레이션
presentationHelpers.showNotification()             // 알림 표시
```

### 📋 발표 순서 추천
1. **원라인 컨셉**: 핵심 가치 제안
2. **3단계 스토리**: 문제 → 아이디어 → 결과
3. **핵심 기술**: AI 필터링 시뮬레이터 실행
4. **지도 기술**: 공간 검색 시뮬레이션
5. **VS 기존 서비스**: 차별화 포인트 강조
6. **라이브 데모**: 실제 시나리오 시연

## 🔧 로컬 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/live-map-presentation.git

# 디렉토리 이동
cd live-map-presentation

# 웹 서버 실행 (Python 3)
python -m http.server 8000

# 또는 Node.js
npx serve .

# 브라우저에서 접속
open http://localhost:8000/live-map-landing/
```

## 📁 프로젝트 구조

```
live-map-landing/
├── index.html          # 메인 HTML 파일
├── styles.css          # Toss 스타일 CSS
├── script.js           # 인터랙티브 JavaScript
└── README.md           # 프로젝트 문서
```

## 🎯 타겟 오디언스

- **투자자**: 기술적 우위와 시장 차별화 포인트
- **개발자**: 시스템 아키텍처와 기술 스택
- **사용자**: 직관적인 UI/UX와 혁신적 기능
- **파트너**: 비즈니스 모델과 성장 전략

## 📈 주요 지표

- **실시간성**: 10분 내 정보 업데이트
- **정확도**: AI 필터링 85% 정확도
- **속도**: 30초 내 개인 맞춤 추천
- **발굴률**: 숨은 명소 30% 발굴 비율
- **지원률**: 소상공인 30% 수익 환원

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**Live Map** - 실시간으로 발견하는 새로운 세상 🌍
