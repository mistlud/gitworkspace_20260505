# Progress

## 2026-05-05 — 초기 구현 완료

### 구현된 내용
- Electron + React + Vite 프로젝트 초기 세팅
- `main.js`: IPC 핸들러 (folder/memo CRUD), 메모 저장 경로 `userData/memos/`
- `preload.js`: contextBridge로 `window.api` 노출
- `vite.config.js`: renderer 빌드 설정, base `./` (Electron 프로덕션 호환)
- `FolderTree.jsx`: 폴더 목록, 생성/이름변경/삭제, 인라인 편집
- `MemoList.jsx`: 메모 목록, 생성/이름변경/삭제, 인라인 편집
- `Editor.jsx`: CodeMirror 마크다운 에디터, 1초 디바운스 자동저장
- `App.css`: 다크 테마 레이아웃

## 2026-05-05 — 포커스/생성 버그 수정

- `autoFocus` 대신 `useRef + useEffect`로 수동 포커스 (Electron에서 autoFocus 불안정)
- `onBlur` 경쟁 조건 수정: Enter 처리 중 onBlur가 먼저 실행되는 문제를 `submitting` ref 플래그로 방지
- dev 모드에서 DevTools 자동 열림 추가

### 실행 방법
- 개발: `npm run dev` (Vite + Electron 동시 실행)
- 빌드: `npm run build`
