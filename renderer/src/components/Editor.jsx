import { useEffect, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

export default function Editor({ content, onChange, onSave, disabled, memoName, folderName }) {
  const isDirty = useRef(false)

  useEffect(() => { isDirty.current = false }, [])

  useEffect(() => {
    if (!isDirty.current) return
    const timer = setTimeout(() => { onSave(content) }, 1000)
    return () => clearTimeout(timer)
  }, [content])

  function handleChange(value) {
    isDirty.current = true
    onChange(value)
  }

  if (disabled) {
    return (
      <div className="editor-placeholder">
        <p>메모를 선택하면 여기서 편집할 수 있습니다</p>
      </div>
    )
  }

  return (
    <div className="editor">
      <div className="editor-header">
        <span className="editor-path">{folderName} / {memoName}</span>
        <span className="editor-hint">자동 저장</span>
      </div>
      <div className="editor-body">
        <CodeMirror
          value={content}
          extensions={[markdown()]}
          theme={oneDark}
          onChange={handleChange}
          height="100%"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  )
}
