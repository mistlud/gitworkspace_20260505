import { useState, useEffect } from 'react'
import FolderTree from './components/FolderTree'
import MemoList from './components/MemoList'
import Editor from './components/Editor'

export default function App() {
  const [folders, setFolders] = useState([])
  const [selectedFolder, setSelectedFolder] = useState(null)
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
    setSelectedMemo(null)
    setContent('')
  }

  async function selectFolder(folder) {
    setSelectedFolder(folder)
    await loadMemos(folder)
  }

  async function selectMemo(name) {
    setSelectedMemo(name)
    const text = await window.api.memo.read(selectedFolder, name)
    setContent(text)
  }

  async function createFolder(name) {
    await window.api.folder.create(name)
    await loadFolders()
  }

  async function renameFolder(oldName, newName) {
    await window.api.folder.rename(oldName, newName)
    if (selectedFolder === oldName) setSelectedFolder(newName)
    await loadFolders()
  }

  async function deleteFolder(name) {
    await window.api.folder.delete(name)
    if (selectedFolder === name) {
      setSelectedFolder(null)
      setMemos([])
      setSelectedMemo(null)
      setContent('')
    }
    await loadFolders()
  }

  async function createMemo(name) {
    await window.api.memo.save(selectedFolder, name, '')
    await loadMemos(selectedFolder)
    await selectMemo(name)
  }

  async function renameMemo(oldName, newName) {
    await window.api.memo.rename(selectedFolder, oldName, newName)
    setSelectedMemo(newName)
    await loadMemos(selectedFolder)
  }

  async function deleteMemo(name) {
    await window.api.memo.delete(selectedFolder, name)
    if (selectedMemo === name) {
      setSelectedMemo(null)
      setContent('')
    }
    await loadMemos(selectedFolder)
  }

  async function saveContent(text) {
    if (selectedFolder && selectedMemo) {
      await window.api.memo.save(selectedFolder, selectedMemo, text)
    }
  }

  const memoKey = selectedFolder && selectedMemo ? `${selectedFolder}:${selectedMemo}` : null

  return (
    <div className="app">
      <div className="sidebar">
        <FolderTree
          folders={folders}
          selected={selectedFolder}
          onSelect={selectFolder}
          onCreate={createFolder}
          onRename={renameFolder}
          onDelete={deleteFolder}
        />
        <MemoList
          memos={memos}
          selected={selectedMemo}
          folder={selectedFolder}
          onSelect={selectMemo}
          onCreate={createMemo}
          onRename={renameMemo}
          onDelete={deleteMemo}
        />
      </div>
      <div className="editor-area">
        <Editor
          key={memoKey}
          content={content}
          onChange={setContent}
          onSave={saveContent}
          disabled={!memoKey}
        />
      </div>
    </div>
  )
}
