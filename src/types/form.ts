import type { DeepKeys } from '@tanstack/form-core'

export type FieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'select'
  | 'textarea'
  | 'checkbox'
  | 'multiselect'
  | 'multiselect-fixed'
  | 'radio'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'file'
  | 'color'
  | 'range'
  | 'tel'
  | 'url'
  | 'switch'
  | 'rating'
  | 'autocomplete'
  | 'masked'
  | 'rich-text'
  | 'code-editor'

export interface FormFieldValidation {
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: string | RegExp
  validate?: (value: unknown) => Promise<string | undefined>
  customRules?: Array<{
    validator: (value: unknown) => boolean | Promise<boolean>
    message: string
  }>
}

export interface FormField<T> {
  name: DeepKeys<T>
  label?: string
  type: FieldType
  placeholder?: string
  helperText?: string
  tooltip?: string
  required?: boolean
  min?: number
  max?: number
  pattern?: string
  options?: Array<{
    label: string
    value: string | number
    disabled?: boolean
    description?: string
  }>
  className?: string
  disabled?: boolean
  readOnly?: boolean
  hidden?: boolean
  autoFocus?: boolean
  autoComplete?: string
  addNewOption?: boolean
  validation?: FormFieldValidation
  formatOptions?: {
    mask?: string
    prefix?: string
    suffix?: string
    decimal?: boolean
    precision?: number
  }
  dependencies?: Array<{
    field: DeepKeys<T>
    condition: (value: unknown) => boolean
    action: 'show' | 'hide' | 'enable' | 'disable' | 'require'
  }>
}

export interface FieldGroup {
  title: string
  description?: string
  fields: string[]
  collapsible?: boolean
  collapsed?: boolean
  badge?: string | number
}

export interface DynamicFormProps<T> {
  fields: FormField<T>[]
  onSubmit: (data: T) => void
  defaultValues?: Partial<T>
  submitLabel?: string
  className?: string
  layout?: {
    groups?: FieldGroup[]
    columns?: 1 | 2 | 3 | 'responsive'
    spacing?: 'compact' | 'normal' | 'relaxed'
    labelPosition?: 'top' | 'left' | 'floating'
  }
  behavior?: {
    mode?: 'onChange' | 'onBlur' | 'onSubmit'
    debounceMs?: number
    validateOnMount?: boolean
    resetOnSubmit?: boolean
    submitOnEnter?: boolean
    autoSave?: boolean
  }
  appearance?: {
    variant?: 'outlined' | 'filled' | 'standard'
    size?: 'small' | 'medium' | 'large'
    fullWidth?: boolean
    showRequiredMarker?: boolean
    showErrorIcon?: boolean
    showSuccessIcon?: boolean
  }
}
