# Progress

## 현재 상태 (2026-05-05 기준)

### 완료된 기능
- 폴더/메모 CRUD (생성·이름변경·삭제)
- 마크다운 에디터 (CodeMirror, 자동저장 1초 디바운스)
- 아이콘 그리드 레이아웃 + breadcrumb 내비게이션
- 좌측 탭 사이드바 (메모/설정)
- 제목표시줄·메뉴바 제거 (`frame: false`, `Menu.setApplicationMenu(null)`)
- 사이드바 드래그로 창 이동
- 커스텀 스크롤바 스타일
- 디자인 점검 전항목 수정 완료 (2026-05-05)

### 미완료 / 예정
- 설정 탭 내용 (현재 "준비 중" 플레이스홀더)
- 추가 UX 개선 (feedback.txt 기반 작업 진행 중)

---

## 디자인 점검 결과 (2026-05-05) — 전항목 완료

| 우선순위 | 항목 | 처리 |
|---|---|---|
| 높음 | breadcrumb 루트 버튼 | 루트에서 span으로 교체, 클릭 불가 처리 |
| 높음 | 하드코딩 색상 | `--bg-editor-header` CSS 변수 추가 및 교체 |
| 중간 | top-pane 고정 높이 | **의도된 설계** — 변경 없음 |
| 중간 | icon-actions 버튼 | 유니코드(`✎` `×`) → SVG 아이콘 교체 |
| 낮음 | 아이콘 크기 불균형 | FolderIcon·MemoIcon 모두 42×42 통일 |
| 낮음 | 설정 아이콘 | sun-ray → gear(Feather 스타일) 교체 |
| 정리 | 미사용 파일 | `FolderTree.jsx`, `MemoList.jsx` 삭제 |

---

## 변경 이력

### 2026-05-05 — 초기 구현
- Electron + React + Vite 세팅, IPC 핸들러, CodeMirror 에디터

### 2026-05-05 — 폴더/메모 생성 버그 수정
- `autoFocus` → `useRef + useEffect` (Electron에서 불안정)
- `onBlur` 경쟁 조건 수정 (`created` ref 플래그)
- Enter 외 blur로도 생성 가능하도록 변경

### 2026-05-05 — UX 전면 재설계 (feedback.txt 반영)
- 레이아웃: 좌우 → 좌측 사이드바 + 상하 분할
- 폴더/메모 아이콘 그리드 + breadcrumb
- 빈 상태 안내 문구를 add 버튼 내부에 통합
- 상단 고정 높이 150px, 커스텀 스크롤바
- 제목표시줄 제거

### 2026-05-05 — 디자인 점검 수정
- breadcrumb 루트 버튼 비활성화 (span 조건 분기)
- CSS 변수 `--bg-editor-header` 추가, 하드코딩 색상 교체
- icon-actions 버튼 SVG 교체 (연필·×)
- FolderIcon·MemoIcon 크기 42×42 통일
- 설정 아이콘 gear 형태로 교체
- 미사용 파일 삭제 (`FolderTree.jsx`, `MemoList.jsx`)
