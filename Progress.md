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

### 실행 방법
- 개발: `npm run dev` (Vite + Electron 동시 실행)
- 빌드: `npm run build`
