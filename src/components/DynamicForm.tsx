import { useForm } from '@tanstack/react-form'
import { useState } from 'react'
import type { FormField, DynamicFormProps } from '../types/form'

export default function DynamicForm<T extends Record<string, unknown>>({
  fields,
  onSubmit,
  defaultValues = {},
  submitLabel = 'Submit',
  className = '',
}: DynamicFormProps<T>) {
  const form = useForm({
    defaultValues: defaultValues as T,
    onSubmit: ({ value }) => onSubmit(value),
  })

  const [newOptionText, setNewOptionText] = useState('')

  const renderField = (field: FormField<T>) => {
    const baseClassName = "w-full px-4 py-3 bg-white/20 border border-white/10 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent backdrop-blur-sm"
    
    return (
      <form.Field
        key={field.name}
        name={field.name}
        children={(fieldApi) => {
          const handleChange = (value: unknown) => {
            fieldApi.handleChange((old) => value as typeof old)
          }

          const handleMultiSelectChange = (value: string) => {
            const currentValues = (fieldApi.state.value as string[]) || []
            if (!currentValues.includes(value)) {
              handleChange([...currentValues, value])
            }
          }

          const handleRemoveValue = (valueToRemove: string) => {
            const currentValues = (fieldApi.state.value as string[]) || []
            handleChange(currentValues.filter(v => v !== valueToRemove))
          }

          const handleAddNewOption = () => {
            if (newOptionText && field.options) {
              const newOption = {
                label: newOptionText,
                value: newOptionText.toLowerCase().replace(/\s+/g, '-')
              }
              field.options.push(newOption)
              handleMultiSelectChange(newOption.value)
              setNewOptionText('')
            }
          }

          switch (field.type) {
            case 'multiselect':
            case 'multiselect-fixed':
              const selectedValues = (fieldApi.state.value as string[]) || []
              
              return (
                <div className="space-y-2">
                  {field.label && (
                    <label className="block text-white/80 text-sm font-medium">
                      {field.label}
                    </label>
                  )}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <select
                        value=""
                        onChange={(e) => handleMultiSelectChange(e.target.value)}
                        className={`${baseClassName} flex-1`}
                      >
                        <option value="" disabled>Select {field.label}</option>
                        {field.options?.filter(opt => !selectedValues.includes(String(opt.value))).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {field.type === 'multiselect' && field.addNewOption && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newOptionText}
                            onChange={(e) => setNewOptionText(e.target.value)}
                            placeholder="Add new option"
                            className={`${baseClassName} w-40`}
                          />
                          <button
                            type="button"
                            onClick={handleAddNewOption}
                            className="px-3 py-2 bg-purple-400 rounded-xl hover:bg-purple-300 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>
                    {selectedValues.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedValues.map((value) => {
                          const option = field.options?.find(opt => String(opt.value) === value)
                          return (
                            <div
                              key={value}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-400/40 rounded-lg"
                            >
                              <span className="text-sm text-white">
                                {option?.label || value}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveValue(value)}
                                className="text-white/80 hover:text-white"
                              >
                                ×
                              </button>
                            </div>
                          )}
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )

            case 'radio':
              return (
                <div className="space-y-2">
                  {field.label && (
                    <label className="block text-white/80 text-sm font-medium">
                      {field.label}
                    </label>
                  )}
                  <div className="space-y-2">
                    {field.options?.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          value={String(option.value)}
                          checked={String(fieldApi.state.value) === String(option.value)}
                          onChange={(e) => handleChange(e.target.value)}
                          className="text-purple-400 focus:ring-purple-300"
                        />
                        <span className="text-white/80">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )

            case 'switch':
              return (
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-white/80 text-sm font-medium group-hover:text-white/90">
                    {field.label}
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={Boolean(fieldApi.state.value)}
                      onChange={(e) => handleChange(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-11 h-6 rounded-full transition ${
                      Boolean(fieldApi.state.value) ? 'bg-purple-400' : 'bg-white/20'
                    }`}>
                      <div className={`absolute w-4 h-4 rounded-full transition-transform bg-white top-1 left-1 ${
                        Boolean(fieldApi.state.value) ? 'translate-x-5' : ''
                      }`} />
                    </div>
                  </div>
                </label>
              )

            case 'rating':
              const rating = Number(fieldApi.state.value) || 0
              return (
                <div className="space-y-2">
                  {field.label && (
                    <label className="block text-white/80 text-sm font-medium">
                      {field.label}
                    </label>
                  )}
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleChange(value)}
                        className={`p-1 text-2xl ${
                          value <= rating ? 'text-yellow-400' : 'text-white/20'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              )

            case 'datetime-local':
            case 'date':
            case 'time':
              return (
                <div className="space-y-2">
                  {field.label && (
                    <label className="block text-white/80 text-sm font-medium">
                      {field.label}
                    </label>
                  )}
                  <input
                    type={field.type}
                    value={String(fieldApi.state.value || '')}
                    onChange={(e) => handleChange(e.target.value)}
                    className={baseClassName}
                  />
                </div>
              )

            default:
              return (
                <div className="space-y-2">
                  {field.type === 'checkbox' ? (
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-white/80 text-sm font-medium group-hover:text-white/90">
                        {field.label}
                      </span>
                      <input
                        type="checkbox"
                        checked={Boolean(fieldApi.state.value)}
                        onChange={(e) => handleChange(e.target.checked)}
                        className="relative w-5 h-5 rounded-full border-2 border-white/10 bg-white/20 text-white checked:bg-purple-400 focus:ring-2 focus:ring-purple-300 focus:ring-offset-0 focus:border-transparent backdrop-blur-sm transition-colors appearance-none cursor-pointer 
                        checked:after:content-[''] checked:after:absolute checked:after:left-[6px] checked:after:top-[2px] checked:after:w-[6px] checked:after:h-[10px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white checked:after:rotate-45"
                      />
                    </label>
                  ) : (
                    <>
                      {field.label && (
                        <label className="block text-white/80 text-sm font-medium">
                          {field.label}
                        </label>
                      )}
                      {field.type === 'select' ? (
                        <select
                          value={String(fieldApi.state.value)}
                          onChange={(e) => handleChange(e.target.value)}
                          className={`${baseClassName} ${field.className || ''} pr-10 bg-[position:right_0.75rem_center] appearance-none bg-no-repeat bg-[length:1rem] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%2F%3E%3C%2Fsvg%3E')]`}
                        >
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={String(fieldApi.state.value)}
                          onChange={(e) => handleChange(e.target.value)}
                          placeholder={field.placeholder}
                          className={`${baseClassName} ${field.className || ''}`}
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={String(fieldApi.state.value)}
                          onChange={(e) => {
                            const value = field.type === 'number'
                              ? Number(e.target.value)
                              : e.target.value
                            handleChange(value)
                          }}
                          placeholder={field.placeholder}
                          min={field.min}
                          max={field.max}
                          pattern={field.pattern}
                          required={field.required}
                          className={`${baseClassName} ${field.className || ''}`}
                        />
                      )}
                    </>
                  )}
                </div>
              )
          }
        }}
      />
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={`space-y-6 p-8 bg-gradient-to-br from-purple-400/30 to-indigo-400/30 backdrop-blur-lg rounded-2xl shadow-xl max-w-md mx-auto border border-white/20 ${className}`}
    >
      <div className="space-y-4">
        {fields.map(renderField)}
      </div>
      <button
        type="submit"
        className="w-full bg-purple-400 text-white py-3 px-6 rounded-xl font-medium hover:bg-purple-300 transition-colors shadow-lg hover:shadow-purple-400/25"
      >
        {submitLabel}
      </button>
    </form>
  )
}
