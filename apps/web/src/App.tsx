import { useEffect, useState } from 'react'
import { tasksApi, type Task } from './api'

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  function load() {
    tasksApi
      .list()
      .then(setTasks)
      .catch((e) => setError(e.message))
  }

  useEffect(load, [])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    await tasksApi.create(title.trim())
    setTitle('')
    load()
  }

  async function handleToggle(task: Task) {
    await tasksApi.toggle(task.id, !task.done)
    load()
  }

  async function handleRemove(id: string) {
    await tasksApi.remove(id)
    load()
  }

  return (
    <main style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Tasks</h1>
      {error && <p style={{ color: 'crimson' }}>Erro: {error}</p>}
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nova tarefa"
          style={{ flex: 1, padding: 8 }}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0' }}>
            <input type="checkbox" checked={task.done} onChange={() => handleToggle(task)} />
            <span style={{ flex: 1, textDecoration: task.done ? 'line-through' : 'none' }}>{task.title}</span>
            <button onClick={() => handleRemove(task.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </main>
  )
}
