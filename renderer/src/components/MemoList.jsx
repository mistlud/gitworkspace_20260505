import { useState, useRef, useEffect } from 'react'

export default function MemoList({ memos, selected, folder, onSelect, onCreate, onRename, onDelete }) {
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

  function startEdit(name) {
    setEditing(name)
    setEditValue(name)
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

  if (!folder) {
    return (
      <div className="memo-list">
        <div className="section-header"><span>메모</span></div>
        <p className="empty-hint">폴더를 선택하세요</p>
      </div>
    )
  }

  return (
    <div className="memo-list">
      <div className="section-header">
        <span>메모</span>
        <button className="icon-btn" onClick={startCreate} title="새 메모">+</button>
      </div>
      <ul>
        {memos.map(name => (
          <li
            key={name}
            className={`list-item ${name === selected ? 'selected' : ''}`}
            onClick={() => editing !== name && onSelect(name)}
          >
            {editing === name ? (
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
                <span className="item-name">{name}</span>
                <div className="item-actions">
                  <button className="icon-btn" onClick={e => { e.stopPropagation(); startEdit(name) }} title="이름 변경">✎</button>
                  <button className="icon-btn danger" onClick={e => { e.stopPropagation(); onDelete(name) }} title="삭제">×</button>
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
              placeholder="메모 이름"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={confirmCreate}
              onBlur={() => { if (!submitting.current) setCreating(false) }}
            />
          </li>
        )}
        {memos.length === 0 && !creating && (
          <p className="empty-hint">메모가 없습니다</p>
        )}
      </ul>
    </div>
  )
}
