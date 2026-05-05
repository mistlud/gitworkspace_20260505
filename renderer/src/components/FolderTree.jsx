import { useState, useRef, useEffect } from 'react'

export default function FolderTree({ folders, selected, onSelect, onCreate, onRename, onDelete }) {
  const [editing, setEditing] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')

  const newInputRef = useRef(null)
  const editInputRef = useRef(null)
  const submitting = useRef(false)

  useEffect(() => {
    if (creating && newInputRef.current) newInputRef.current.focus()
  }, [creating])

  useEffect(() => {
    if (editing && editInputRef.current) editInputRef.current.focus()
  }, [editing])

  function startCreate() {
    setCreating(true)
    setNewName('')
  }

  async function confirmCreate(e) {
    if (e.key === 'Enter' && newName.trim()) {
      submitting.current = true
      await onCreate(newName.trim())
      submitting.current = false
      setCreating(false)
    } else if (e.key === 'Escape') {
      setCreating(false)
    }
  }

  function startEdit(folder) {
    setEditing(folder)
    setEditValue(folder)
  }

  async function confirmEdit(e) {
    if (e.key === 'Enter' && editValue.trim() && editValue.trim() !== editing) {
      submitting.current = true
      await onRename(editing, editValue.trim())
      submitting.current = false
      setEditing(null)
    } else if (e.key === 'Escape' || e.key === 'Enter') {
      setEditing(null)
    }
  }

  return (
    <div className="folder-tree">
      <div className="section-header">
        <span>폴더</span>
        <button className="icon-btn" onClick={startCreate} title="새 폴더">+</button>
      </div>
      <ul>
        {folders.map(folder => (
          <li
            key={folder}
            className={`list-item ${folder === selected ? 'selected' : ''}`}
            onClick={() => editing !== folder && onSelect(folder)}
          >
            {editing === folder ? (
              <input
                ref={editInputRef}
                className="inline-input"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onKeyDown={confirmEdit}
                onBlur={() => { if (!submitting.current) setEditing(null) }}
                onClick={e => e.stopPropagation()}
              />
            ) : (
              <>
                <span className="item-name">{folder}</span>
                <div className="item-actions">
                  <button className="icon-btn" onClick={e => { e.stopPropagation(); startEdit(folder) }} title="이름 변경">✎</button>
                  <button className="icon-btn danger" onClick={e => { e.stopPropagation(); onDelete(folder) }} title="삭제">×</button>
                </div>
              </>
            )}
          </li>
        ))}
        {creating && (
          <li className="list-item creating">
            <input
              ref={newInputRef}
              className="inline-input"
              placeholder="폴더 이름"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={confirmCreate}
              onBlur={() => { if (!submitting.current) setCreating(false) }}
            />
          </li>
        )}
      </ul>
    </div>
  )
}
