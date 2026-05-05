# MemoApp

폴더 기반 마크다운 메모 데스크탑 앱

## Stack

- **Electron** — 데스크탑 런타임
- **React + Vite** — UI
- **CodeMirror 6** — 마크다운 에디터
- **파일 저장** — `.md` 파일 (`userData/memos/`)

## Features

- 폴더 생성 / 이름 변경 / 삭제
- 메모 생성 / 이름 변경 / 삭제
- 마크다운 에디터 (신택스 하이라이팅)
- 1초 디바운스 자동저장

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

빌드 결과물은 `dist/` 에 생성됩니다.
