'use client'

import { useRef, useState } from 'react'

type SelectOption = { value: string; label: string; disabled?: boolean }

interface ButtonField {
  name: string
  label: string
  type: 'text' | 'email' | 'url'
  placeholder: string
  required: boolean
  description?: string
}

interface SelectField {
  name: string
  label: string
  type: 'select'
  options: SelectOption[]
  required: boolean
}

interface TextareaField {
  name: string
  label: string
  type: 'textarea'
  placeholder: string
  required: boolean
  description?: string
}

type Field = ButtonField | SelectField | TextareaField

const FIELDS: Field[] = [
  {
    name: 'name',
    label: 'Name',
    description: 'Your full name',
    type: 'text',
    placeholder: 'Name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@company.com',
    required: true,
  },
  {
    name: 'company',
    label: 'Company / Business',
    type: 'text',
    placeholder: 'e.g. Acme Corp',
    required: false,
  },
  {
    name: 'website',
    label: 'Website',
    type: 'url',
    placeholder: 'https://',
    required: false,
  },
  {
    name: 'project_type',
    label: 'Project type',
    type: 'select',
    options: [
      { value: '', label: 'Choose one', disabled: true },
      { value: 'poc', label: 'Proof of concept' },
      { value: 'mvp', label: 'MVP / beta' },
      { value: 'production', label: 'Production product' },
      { value: 'redesign', label: 'Redesign or refresh' },
      { value: 'audit', label: 'Audit or consulting' },
    ],
    required: false,
  },
  {
    name: 'budget',
    label: 'Budget range',
    type: 'select',
    options: [
      { value: '', label: 'Prefer not to say', disabled: true },
      { value: 'small', label: 'Under $5k' },
      { value: 'medium', label: '$5k–$20k' },
      { value: 'large', label: '$20k+' },
      { value: 'not-sure', label: 'Not sure yet' },
    ],
    required: false,
  },
  {
    name: 'message',
    label: 'Message',
    description: 'Tell me about your project, goals and any technical requirements.',
    type: 'textarea',
    placeholder: 'Tell me about your project, goals and any technical requirements.',
    required: true,
  },
]

interface ContactFormState {
  sending: boolean
  sent: boolean
  error: string | null
}

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>({
    sending: false,
    sent: false,
    error: null,
  })
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState((s) => ({ ...s, sending: true, error: null }))

    const form = event.currentTarget
    const data = new FormData(form)

    for (const [key, value] of data.entries()) {
      if (value === '') data.delete(key)
    }

    fetch('https://formsubmit.co/ajax/faizyabdev@gmail.com', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && typeof json === 'object' && 'error' in json) {
          setState(() => ({
            sending: false,
            sent: false,
            error:
              typeof json.error === 'string'
                ? json.error
                : 'Something went wrong. Please email me directly.',
          }))
          return
        }
        setState({ sending: false, sent: true, error: null })
      })
      .catch(() => {
        setState(() => ({
          sending: false,
          sent: false,
          error:
            'Could not reach the form service. Please email me directly at faizyabdev@gmail.com.',
        }))
      })
  }

  if (state.sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-sm border border-rule bg-surface px-4 py-5 text-[0.9375rem] text-ink"
      >
        <p>Thanks. Your message has been sent. I will get back to you when I can.</p>
        <button
          type="button"
          onClick={() => {
            setState({ sending: false, sent: false, error: null })
            formRef.current?.reset()
          }}
          className="mt-3 text-[0.8125rem] underline underline-offset-[0.2em] hover:text-link"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form
      ref={formRef}
      action="https://formsubmit.co/faizyabdev@gmail.com"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-4"
      noValidate
      data-form-submit="true"
    >
      <input
        type="text"
        name="_honeypot"
        autoComplete="off"
        className="border-0 clip-[rect(0_0_0_0)] h-0 w-0 p-0 absolute -z-20"
        tabIndex={-1}
      />
      <input type="hidden" name="_captcha" value="false" />

      {FIELDS.map((field) => {
        if (field.type === 'textarea') {
          const { name, label, required, description, placeholder } = field
          return (
            <div key={name} className="group">
              <label
                htmlFor={name}
                className="block text-[0.9375rem] font-medium text-ink"
              >
                {label}
                {required ? (
                  <span className="text-ink-muted"> (required)</span>
                ) : null}
              </label>
              {description ? (
                <p className="mt-1 text-[0.875rem] text-ink-muted">{description}</p>
              ) : null}
              <textarea
                id={name}
                name={name}
                rows={5}
                required={required}
                placeholder={placeholder}
                className="mt-1.5 min-h-[5.5rem] resize-y rounded-sm border border-rule bg-transparent px-3 py-2 text-[0.9375rem] text-ink placeholder:text-ink-muted focus:border-link focus:outline-none"
              />
            </div>
          )
        }

        if (field.type === 'select') {
          const { name, label, required, options } = field
          return (
            <div key={name} className="group">
              <label
                htmlFor={name}
                className="block text-[0.9375rem] font-medium text-ink"
              >
                {label}
                {required ? (
                  <span className="text-ink-muted"> (required)</span>
                ) : null}
              </label>
              <select
                id={name}
                name={name}
                required={required}
                className="mt-1.5 block w-full rounded-sm border border-rule bg-transparent px-3 py-2 text-[0.9375rem] text-ink focus:border-link focus:outline-none"
              >
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )
        }

        const { name, label, type, required, description, placeholder } = field
        return (
          <div key={name} className="group">
            <label
              htmlFor={name}
              className="block text-[0.9375rem] font-medium text-ink"
            >
              {label}
              {required ? (
                <span className="text-ink-muted"> (required)</span>
              ) : null}
            </label>
            {description ? (
              <p className="mt-1 text-[0.875rem] text-ink-muted">{description}</p>
            ) : null}
            <input
              id={name}
              name={name}
              type={type}
              required={required}
              placeholder={placeholder}
              className="mt-1.5 block w-full rounded-sm border border-rule bg-transparent px-3 py-2 text-[0.9375rem] text-ink placeholder:text-ink-muted focus:border-link focus:outline-none"
            />
          </div>
        )
      })}

      {state.error ? (
        <p
          role="alert"
          className="rounded-sm border border-ink-muted bg-surface/60 px-3 py-2 text-[0.875rem] text-ink-secondary"
        >
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state.sending}
          className="inline-flex items-center justify-center rounded-sm border border-link bg-link px-5 py-2 text-[0.9375rem] text-paper transition-colors hover:bg-link/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-link focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state.sending ? 'Sending…' : 'Send message'}
        </button>
        <span className="text-[0.8125rem] text-ink-muted">
          Messages go straight to my inbox. No account needed.
        </span>
      </div>
      <p className="text-[0.8125rem] text-ink-muted">
        FormSubmit sends this to{' '}
        <a href="mailto:faizyabdev@gmail.com" className="link link-subtle">
          faizyabdev@gmail.com
        </a>{' '}
        and only me. There is no separate sign-up step.
      </p>
    </form>
  )
}

