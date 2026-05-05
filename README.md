# MemoApp

폴더 기반 마크다운 메모 데스크탑 앱

## Stack

- **Electron 29** — 데스크탑 런타임 (frame: false, 메뉴바 없음)
- **React 18 + Vite 5** — UI
- **CodeMirror 6** — 마크다운 에디터 (one dark 테마)
- **파일 저장** — `.md` 파일 (`%APPDATA%\MemoApp\memos\<폴더>\<메모>.md`)

## 현재 구조

```
main.js              # Electron main — IPC 핸들러, 파일시스템
preload.js           # contextBridge → window.api 노출
vite.config.js       # root: renderer, base: ./
renderer/
  index.html
  src/
    main.jsx
    App.jsx                      # 상태 관리, 레이아웃
    components/
      NavSidebar.jsx             # 좌측 탭 사이드바 (메모/설정)
      IconGrid.jsx               # 폴더·메모 아이콘 그리드 + breadcrumb
      Editor.jsx                 # CodeMirror 에디터 + 경로 헤더
    styles/App.css
```

## 레이아웃

```
┌──────┬────────────────────────────────────┐
│      │ breadcrumb (메모 / 폴더명)          │ ← 상단 고정 (150px)
│ nav  │ [폴더/메모 아이콘 그리드] [새 폴더] │   아이콘 클릭으로 이동
│      ├────────────────────────────────────┤
│      │ 에디터 (폴더명 / 메모명 | 자동저장) │ ← 하단 flex: 1
└──────┴────────────────────────────────────┘
```

- 폴더 클릭 → 상단이 해당 폴더의 메모 그리드로 전환
- breadcrumb "메모" 클릭 → 루트(폴더 목록)로 복귀 (폴더 진입 시에만 활성화)
- 메모 클릭 → 하단 에디터 활성화
- 생성: 그리드 내 "새 폴더"/"새 메모" 버튼 클릭 → 이름 입력 → Enter 또는 다른 곳 클릭
- 이름 변경/삭제: 아이콘에 마우스 올리면 우측 상단에 버튼 표시

## IPC API (`window.api`)

| 메서드 | 설명 |
|---|---|
| `folder.list()` | 폴더 목록 |
| `folder.create(name)` | 폴더 생성 |
| `folder.rename(old, new)` | 폴더 이름 변경 |
| `folder.delete(name)` | 폴더 삭제 |
| `memo.list(folder)` | 메모 목록 |
| `memo.read(folder, name)` | 메모 내용 읽기 |
| `memo.save(folder, name, content)` | 메모 저장 |
| `memo.rename(folder, old, new)` | 메모 이름 변경 |
| `memo.delete(folder, name)` | 메모 삭제 |

## Dev

```bash
npm install
npm run dev    # Vite + Electron 동시 실행 (DevTools 자동 열림)
npm run build  # dist/ 에 빌드
```
