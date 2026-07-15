const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4001'

export interface Task {
  id: string
  title: string
  done: boolean
  createdAt: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  if (res.status === 204) return undefined as T
  return res.json() as Promise<T>
}

export const tasksApi = {
  list: () => request<Task[]>('/tasks'),
  create: (title: string) => request<Task>('/tasks', { method: 'POST', body: JSON.stringify({ title }) }),
  toggle: (id: string, done: boolean) =>
    request<Task>(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ done }) }),
  remove: (id: string) => request<void>(`/tasks/${id}`, { method: 'DELETE' }),
}
