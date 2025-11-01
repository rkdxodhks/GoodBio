#!/usr/bin/env node

// 발표대본.md를 읽어서 script-data.js를 자동 생성하는 스크립트
const fs = require('fs');
const path = require('path');

const SCRIPT_MD_PATH = path.join(__dirname, '발표대본.md');
const OUTPUT_JS_PATH = path.join(__dirname, 'script-data.js');

function parseScript(markdownText) {
  const slides = {};
  const lines = markdownText.split('\n');
  
  let currentSlide = null;
  let currentContent = [];
  let slideNumber = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 슬라이드 헤더 감지 (## 슬라이드 N: 제목 형식)
    const slideHeaderMatch = line.match(/^##\s*슬라이드\s*(\d+):/);
    if (slideHeaderMatch) {
      // 이전 슬라이드 저장
      if (currentSlide !== null && currentContent.length > 0) {
        slides[currentSlide] = currentContent.join('\n').trim();
      }
      
      // 새 슬라이드 시작
      slideNumber = parseInt(slideHeaderMatch[1]);
      currentSlide = slideNumber;
      currentContent = [];
      continue;
    }
    
    // 구분선 또는 빈 줄은 무시
    if (line.trim() === '---' || line.trim() === '') {
      continue;
    }
    
    // 현재 슬라이드에 내용 추가
    if (currentSlide !== null) {
      // 헤더 라인이 아니면 내용으로 추가
      if (!line.startsWith('#')) {
        currentContent.push(line);
      }
    }
  }
  
  // 마지막 슬라이드 저장
  if (currentSlide !== null && currentContent.length > 0) {
    slides[currentSlide] = currentContent.join('\n').trim();
  }
  
  return slides;
}

function generateScriptDataJS(slides) {
  let jsContent = `// 발표대본 데이터 (발표대본.md에서 자동 생성)
// 이 파일은 발표대본.md를 수정할 때마다 자동으로 업데이트됩니다.

const SCRIPT_NOTES = {
`;

  // 슬라이드를 번호순으로 정렬
  const sortedSlides = Object.keys(slides)
    .map(Number)
    .sort((a, b) => a - b);

  sortedSlides.forEach((slideNum, index) => {
    const content = slides[slideNum];
    // 템플릿 리터럴 이스케이프 처리
    const escapedContent = content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\${/g, '\\${');
    
    jsContent += `  ${slideNum}: \`${escapedContent}\``;
    
    if (index < sortedSlides.length - 1) {
      jsContent += ',\n\n';
    } else {
      jsContent += '\n';
    }
  });

  jsContent += `};

// speaker-notes 자동 업데이트 함수
function updateSpeakerNotesFromScript() {
  if (typeof SCRIPT_NOTES === 'undefined') {
    console.warn('SCRIPT_NOTES가 정의되지 않았습니다.');
    return;
  }

  // 모든 슬라이드의 speaker-notes 업데이트
  const slides = document.querySelectorAll('.slide');
  slides.forEach((slide, index) => {
    const slideNumber = index + 1;
    const notesElement = slide.querySelector('.speaker-notes');
    
    if (notesElement && SCRIPT_NOTES[slideNumber]) {
      // 발표대본 내용으로 교체
      notesElement.textContent = SCRIPT_NOTES[slideNumber];
    }
  });
  
  // 발표자 패널도 업데이트 (이미 로드된 경우)
  if (typeof updatePresenterPanel === 'function') {
    updatePresenterPanel();
  }
}

// 페이지 로드 시 자동 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateSpeakerNotesFromScript);
} else {
  updateSpeakerNotesFromScript();
}
`;

  return jsContent;
}

// 메인 실행
try {
  if (!fs.existsSync(SCRIPT_MD_PATH)) {
    console.error(`오류: ${SCRIPT_MD_PATH} 파일을 찾을 수 없습니다.`);
    process.exit(1);
  }

  const markdownText = fs.readFileSync(SCRIPT_MD_PATH, 'utf8');
  const slides = parseScript(markdownText);
  const jsContent = generateScriptDataJS(slides);
  
  fs.writeFileSync(OUTPUT_JS_PATH, jsContent, 'utf8');
  
  console.log(`✓ script-data.js가 성공적으로 생성되었습니다.`);
  console.log(`  ${Object.keys(slides).length}개의 슬라이드 노트가 포함되었습니다.`);
} catch (error) {
  console.error('오류 발생:', error.message);
  process.exit(1);
}

