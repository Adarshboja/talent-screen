const WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL
const REQUEST_TIMEOUT_MS = 90_000

export async function submitApplication(payload: {
  name: string
  email: string
  role: string
  file: File
}) {
  if (!WEBHOOK_URL) {
    throw new Error('submission_failed')
  }

  const formData = new FormData()
  formData.append('name', payload.name)
  formData.append('email', payload.email)
  formData.append('role', payload.role)
  formData.append('data', payload.file)

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error('submission_failed')
    }

    try {
      return await response.json()
    } catch {
      return null
    }
  } finally {
    window.clearTimeout(timeout)
  }
}
