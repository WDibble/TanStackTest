import { useState } from 'react'
import UserForm from './components/UserForm'
import UserTable from './components/UserTable'

type UserData = {
  name: string
  email: string
  age: number
}

function App() {
  const [users, setUsers] = useState<UserData[]>([])

  const handleSubmit = (data: UserData) => {
    setUsers((prev) => [...prev, data])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-semibold text-center mb-12 text-white drop-shadow-lg">
          User Management
        </h1>
        <div className="space-y-8 max-w-4xl mx-auto">
          <UserForm onSubmit={handleSubmit} />
          <UserTable data={users} />
        </div>
      </div>
    </div>
  )
}

export default App
