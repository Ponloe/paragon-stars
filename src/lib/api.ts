const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export const api = {
  async getProfile() {
    const token = localStorage.getItem('authToken')
    if (!token) throw new Error('No auth token found')

    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }

    return response.json()
  },

  // (for development)
//   async testLogin(email: string, firstName?: string, lastName?: string) {
//     const response = await fetch(`${API_BASE_URL}/auth/test-login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, firstName, lastName }),
//     })

//     if (!response.ok) {
//       throw new Error('Test login failed')
//     }

//     return response.json()
//   },
}