import cn from 'clsx'
import s from './TextArea.module.css'
import React, { TextareaHTMLAttributes } from 'react'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  rows?: number
  onChange?: (...args: any[]) => any
}

const TextArea: React.FC<TextareaProps> = (props) => {
  const { className, children, rows, onChange, ...rest } = props

  const rootClassName = cn(s.root, {}, className)

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return (
    <label>
      <textarea
        className={rootClassName}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        rows={rows}
        {...rest}
      />
    </label>
  )
}

export default TextArea
