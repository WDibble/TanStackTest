import type { FormField } from '../types/form'
import DynamicForm from './DynamicForm'

type UserData = {
  name: string
  email: string
  age: number
  role: string
  bio: string
  newsletter: boolean
  password: string
  industries: string[]
  notificationPreference: string
  rating: number
  availableFrom: string
  darkMode: boolean
}

interface UserFormProps {
  onSubmit: (data: UserData) => void
}

const userFormFields: FormField<UserData>[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'your@email.com',
    required: true,
    pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
  },
  {
    name: 'age',
    type: 'number',
    label: 'Age',
    placeholder: 'Your age',
    required: true,
    min: 0,
    max: 150,
  },
  {
    name: 'role',
    type: 'select',
    label: 'Role',
    required: true,
    options: [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' },
    ],
  },
  {
    name: 'bio',
    type: 'textarea',
    label: 'Biography',
    placeholder: 'Tell us about yourself',
  },
  {
    name: 'newsletter',
    type: 'checkbox',
    label: 'Subscribe to newsletter',
  },
  {
    name: 'industries',
    type: 'multiselect-fixed',
    label: 'Industries',
    required: true,
    options: [
      { label: 'Technology', value: 'technology' },
      { label: 'Healthcare', value: 'healthcare' },
      { label: 'Finance', value: 'finance' },
      { label: 'Education', value: 'education' },
      { label: 'Manufacturing', value: 'manufacturing' },
      { label: 'Retail', value: 'retail' },
      { label: 'Energy', value: 'energy' },
      { label: 'Transportation', value: 'transportation' },
      { label: 'Agriculture', value: 'agriculture' },
      { label: 'Entertainment', value: 'entertainment' }
    ],
  },
  {
    name: 'notificationPreference',
    type: 'radio',
    label: 'Notification Preference',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Push', value: 'push' },
      { label: 'SMS', value: 'sms' },
    ],
  },
  {
    name: 'rating',
    type: 'rating',
    label: 'Rate your experience',
  },
  {
    name: 'availableFrom',
    type: 'datetime-local',
    label: 'Available From',
  },
  {
    name: 'darkMode',
    type: 'switch',
    label: 'Enable Dark Mode',
  },
]

export default function UserForm({ onSubmit }: UserFormProps) {
  return (
    <DynamicForm<UserData>
      fields={userFormFields}
      onSubmit={onSubmit}
      defaultValues={{
        name: '',
        email: '',
        age: 0,
        role: 'user',
        bio: '',
        newsletter: false,
        password: '',
        industries: [],
        notificationPreference: 'email',
        rating: 0,
        availableFrom: '',
        darkMode: false,
      }}
      submitLabel="Add User"
    />
  )
}
