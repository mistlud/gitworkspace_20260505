import { useEffect, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'

export default function Editor({ content, onChange, onSave, disabled }) {
  const isDirty = useRef(false)

  // key prop on parent resets component per memo, so isDirty starts fresh each time
  useEffect(() => {
    isDirty.current = false
  }, [])

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
        <p>폴더와 메모를 선택하세요</p>
      </div>
    )
  }

  return (
    <div className="editor">
      <CodeMirror
        value={content}
        extensions={[markdown()]}
        theme={oneDark}
        onChange={handleChange}
        height="100%"
        style={{ height: '100%' }}
      />
    </div>
  )
}
