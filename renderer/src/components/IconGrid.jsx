import { useState, useRef, useEffect } from 'react'

function FolderIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 44 36" fill="none">
      <path d="M2 8C2 6.34 3.34 5 5 5H17L21 9H39C40.66 9 42 10.34 42 12V31C42 32.66 40.66 34 39 34H5C3.34 34 2 32.66 2 31V8Z" fill="#4a9eff" fillOpacity="0.75"/>
    </svg>
  )
}

function MemoIcon({ selected }) {
  return (
    <svg width="42" height="42" viewBox="0 0 36 44" fill="none">
      <rect x="2" y="2" width="32" height="40" rx="3" fill={selected ? '#1e3a5f' : '#2a2a2a'} stroke={selected ? '#4a9eff' : '#444'} strokeWidth="1.5"/>
      <line x1="8" y1="13" x2="28" y2="13" stroke={selected ? '#4a9eff' : '#666'} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="19" x2="28" y2="19" stroke={selected ? '#4a9eff' : '#666'} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="8" y1="25" x2="21" y2="25" stroke={selected ? '#4a9eff' : '#666'} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

export default function IconGrid({
  currentFolder, folders, memos, selectedMemo,
  onOpenFolder, onGoToRoot, onSelectMemo,
  onCreateFolder, onRenameFolder, onDeleteFolder,
  onCreateMemo, onRenameMemo, onDeleteMemo
}) {
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [editing, setEditing] = useState(null)
  const [editValue, setEditValue] = useState('')

  const newInputRef = useRef(null)
  const editInputRef = useRef(null)
  const created = useRef(false)

  const isInFolder = currentFolder !== null
  const items = isInFolder ? memos : folders

  useEffect(() => {
    setCreating(false)
    setEditing(null)
  }, [currentFolder])

  useEffect(() => {
    if (creating && newInputRef.current) newInputRef.current.focus()
  }, [creating])

  useEffect(() => {
    if (editing && editInputRef.current) editInputRef.current.focus()
  }, [editing])

  function startCreate() {
    created.current = false
    setCreating(true)
    setNewName('')
  }

  async function submitCreate(name) {
    if (created.current || !name.trim()) return
    created.current = true
    if (isInFolder) await onCreateMemo(name.trim())
    else await onCreateFolder(name.trim())
    setCreating(false)
  }

  async function confirmCreate(e) {
    if (e.key === 'Enter') await submitCreate(newName)
    else if (e.key === 'Escape') setCreating(false)
  }

  async function handleNewBlur() {
    await submitCreate(newName)
    if (!created.current) setCreating(false)
  }

  function startEdit(name, e) {
    e.stopPropagation()
    setEditing(name)
    setEditValue(name)
  }

  async function confirmEdit(e) {
    if (e.key === 'Enter' && editValue.trim() && editValue.trim() !== editing) {
      if (isInFolder) await onRenameMemo(editing, editValue.trim())
      else await onRenameFolder(editing, editValue.trim())
      setEditing(null)
    } else if (e.key === 'Escape' || e.key === 'Enter') {
      setEditing(null)
    }
  }

  async function handleDelete(name, e) {
    e.stopPropagation()
    if (isInFolder) await onDeleteMemo(name)
    else await onDeleteFolder(name)
  }

  function handleItemClick(name) {
    if (editing === name) return
    if (isInFolder) onSelectMemo(name)
    else onOpenFolder(name)
  }

  return (
    <div className="icon-grid-wrap">
      <div className="breadcrumb">
        {currentFolder
          ? <button className="bc-item" onClick={onGoToRoot}>메모</button>
          : <span className="bc-item bc-current">메모</span>
        }
        {currentFolder && (
          <>
            <span className="bc-sep">/</span>
            <span className="bc-item bc-current">{currentFolder}</span>
          </>
        )}
      </div>

      <div className="icon-grid">
        {items.map(name => (
          <div
            key={name}
            className={`icon-item ${isInFolder && name === selectedMemo ? 'selected' : ''}`}
            onClick={() => handleItemClick(name)}
          >
            {editing === name ? (
              <>
                <div className="icon-fig">
                  {isInFolder ? <MemoIcon /> : <FolderIcon />}
                </div>
                <input
                  ref={editInputRef}
                  className="icon-input"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onKeyDown={confirmEdit}
                  onBlur={() => setEditing(null)}
                  onClick={e => e.stopPropagation()}
                />
              </>
            ) : (
              <>
                <div className="icon-fig">
                  {isInFolder ? <MemoIcon selected={name === selectedMemo} /> : <FolderIcon />}
                </div>
                <div className="icon-label">{name}</div>
                <div className="icon-actions">
                  <button onClick={e => startEdit(name, e)} title="이름 변경">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M8.5 1.5l2 2L4 10H2v-2L8.5 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button className="danger" onClick={e => handleDelete(name, e)} title="삭제">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}

        {creating ? (
          <div className="icon-item creating">
            <div className="icon-fig new-fig">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <line x1="14" y1="6" x2="14" y2="22" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                <line x1="6" y1="14" x2="22" y2="14" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <input
              ref={newInputRef}
              className="icon-input"
              placeholder={isInFolder ? '메모 이름' : '폴더 이름'}
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={confirmCreate}
              onBlur={handleNewBlur}
            />
          </div>
        ) : (
          <button className="icon-item add-item" onClick={startCreate}>
            <div className="icon-fig new-fig">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <line x1="14" y1="6" x2="14" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="6" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="icon-label add-label">{isInFolder ? '새 메모' : '새 폴더'}</div>
            {items.length === 0 && (
              <div className="add-empty-hint">
                {isInFolder ? '아직 메모가 없어요' : '아직 폴더가 없어요'}
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
