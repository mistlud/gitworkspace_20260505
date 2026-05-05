import { useState, useEffect } from 'react'
import NavSidebar from './components/NavSidebar'
import IconGrid from './components/IconGrid'
import Editor from './components/Editor'
import './styles/App.css'

export default function App() {
  const [tab, setTab] = useState('memo')
  const [folders, setFolders] = useState([])
  const [currentFolder, setCurrentFolder] = useState(null)
  const [memos, setMemos] = useState([])
  const [selectedMemo, setSelectedMemo] = useState(null)
  const [content, setContent] = useState('')

  useEffect(() => { loadFolders() }, [])

  async function loadFolders() {
    const list = await window.api.folder.list()
    setFolders(list)
  }

  async function loadMemos(folder) {
    const list = await window.api.memo.list(folder)
    setMemos(list)
  }

  async function openFolder(folder) {
    setCurrentFolder(folder)
    await loadMemos(folder)
    setSelectedMemo(null)
    setContent('')
  }

  function goToRoot() {
    setCurrentFolder(null)
    setMemos([])
    setSelectedMemo(null)
    setContent('')
  }

  async function selectMemo(name) {
    setSelectedMemo(name)
    const text = await window.api.memo.read(currentFolder, name)
    setContent(text)
  }

  async function createFolder(name) {
    await window.api.folder.create(name)
    await loadFolders()
  }

  async function renameFolder(oldName, newName) {
    await window.api.folder.rename(oldName, newName)
    if (currentFolder === oldName) setCurrentFolder(newName)
    await loadFolders()
  }

  async function deleteFolder(name) {
    await window.api.folder.delete(name)
    if (currentFolder === name) goToRoot()
    await loadFolders()
  }

  async function createMemo(name) {
    await window.api.memo.save(currentFolder, name, '')
    await loadMemos(currentFolder)
    await selectMemo(name)
  }

  async function renameMemo(oldName, newName) {
    await window.api.memo.rename(currentFolder, oldName, newName)
    setSelectedMemo(newName)
    await loadMemos(currentFolder)
  }

  async function deleteMemo(name) {
    await window.api.memo.delete(currentFolder, name)
    if (selectedMemo === name) { setSelectedMemo(null); setContent('') }
    await loadMemos(currentFolder)
  }

  async function saveContent(text) {
    if (currentFolder && selectedMemo) {
      await window.api.memo.save(currentFolder, selectedMemo, text)
    }
  }

  const memoKey = currentFolder && selectedMemo ? `${currentFolder}:${selectedMemo}` : null

  return (
    <div className="app">
      <NavSidebar tab={tab} onTabChange={setTab} />
      <div className="main">
        {tab === 'memo' ? (
          <>
            <div className="top-pane">
              <IconGrid
                currentFolder={currentFolder}
                folders={folders}
                memos={memos}
                selectedMemo={selectedMemo}
                onOpenFolder={openFolder}
                onGoToRoot={goToRoot}
                onSelectMemo={selectMemo}
                onCreateFolder={createFolder}
                onRenameFolder={renameFolder}
                onDeleteFolder={deleteFolder}
                onCreateMemo={createMemo}
                onRenameMemo={renameMemo}
                onDeleteMemo={deleteMemo}
              />
            </div>
            <div className="bottom-pane">
              <Editor
                key={memoKey}
                content={content}
                onChange={setContent}
                onSave={saveContent}
                disabled={!memoKey}
                memoName={selectedMemo}
                folderName={currentFolder}
              />
            </div>
          </>
        ) : (
          <div className="settings-panel">
            <h2>설정</h2>
            <p>준비 중입니다.</p>
          </div>
        )}
      </div>
    </div>
  )
}
