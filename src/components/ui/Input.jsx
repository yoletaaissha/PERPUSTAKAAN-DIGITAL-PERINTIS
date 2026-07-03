import { forwardRef } from 'react'

const Input = forwardRef(({ label, error, required, className = '', ...rest }, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className={`label-form ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`input-field ${error ? 'input-error' : ''} ${className}`}
        {...rest}
      />
      {error && <p className="field-error">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
