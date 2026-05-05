# Memo App — Plan

## Stack
- **Runtime**: Electron
- **Frontend**: React + Vite
- **Editor**: CodeMirror (Markdown support)
- **Data**: `.md` files stored in local folders (no DB)
- **IPC**: Electron `preload.js` pattern (contextBridge)

## Core Features
1. Folder tree sidebar — create, rename, delete folders
2. Memo list per folder
3. Markdown editor (CodeMirror) with preview toggle
4. Create, rename, delete memos (saved as `.md` files)
5. Auto-save on edit

## Project Structure
```
gitworkspace_20260505/
├── main.js              # Electron main process (file system, IPC handlers)
├── preload.js           # contextBridge API exposed to renderer
├── renderer/            # React + Vite app
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── FolderTree.jsx
│   │   │   ├── MemoList.jsx
│   │   │   └── Editor.jsx
│   │   └── styles/
└── package.json
```

## IPC API (main ↔ renderer)
| Channel | Direction | Description |
|---|---|---|
| `folder:list` | renderer→main | 루트 폴더 목록 조회 |
| `folder:create` | renderer→main | 폴더 생성 |
| `folder:rename` | renderer→main | 폴더 이름 변경 |
| `folder:delete` | renderer→main | 폴더 삭제 |
| `memo:list` | renderer→main | 특정 폴더의 메모 목록 조회 |
| `memo:read` | renderer→main | 메모 내용 읽기 |
| `memo:save` | renderer→main | 메모 저장 |
| `memo:rename` | renderer→main | 메모 이름 변경 |
| `memo:delete` | renderer→main | 메모 삭제 |

## Data Storage
- 메모 저장 루트 경로: `userData/memos/` (Electron `app.getPath('userData')`)
- 폴더 = 실제 디렉토리, 메모 = `.md` 파일
- 예시: `userData/memos/작업/회의록.md`

## Build Steps
1. 프로젝트 초기화 (package.json, Electron + Vite 설정)
2. main.js — IPC 핸들러 및 파일시스템 로직 구현
3. preload.js — contextBridge API 노출
4. FolderTree 컴포넌트
5. MemoList 컴포넌트
6. Editor 컴포넌트 (CodeMirror 연동)
7. Auto-save 구현
8. 스타일링
