import axios from 'axios'

const AUTH_COOKIE_KEY = 'auth_token'
const AUTH_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7

function readAuthTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null

  const authCookie = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${AUTH_COOKIE_KEY}=`))

  if (!authCookie) return null
  return decodeURIComponent(authCookie.split('=').slice(1).join('='))
}

function writeAuthTokenCookie(token: string): void {
  if (typeof document === 'undefined') return

  const isHttps = window.location.protocol === 'https:'
  document.cookie = [
    `${AUTH_COOKIE_KEY}=${encodeURIComponent(token)}`,
    'Path=/',
    `Max-Age=${AUTH_COOKIE_MAX_AGE_SECONDS}`,
    'SameSite=Lax',
    isHttps ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ')
}

function clearAuthTokenCookie(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${AUTH_COOKIE_KEY}=; Path=/; Max-Age=0; SameSite=Lax`
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function setAuthToken(token: string | null): void {
  if (token) {
    writeAuthTokenCookie(token)
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }

  clearAuthTokenCookie()
  delete apiClient.defaults.headers.common.Authorization
}

const bootToken = readAuthTokenFromCookie()
if (bootToken) {
  apiClient.defaults.headers.common.Authorization = `Bearer ${bootToken}`
}

apiClient.interceptors.request.use((config) => {
  const token = readAuthTokenFromCookie()

  if (!token) {
    if (config.headers) {
      delete (config.headers as Record<string, string>).Authorization
    }
    return config
  }

  config.headers = config.headers ?? {}
  ;(config.headers as Record<string, string>).Authorization = `Bearer ${token}`
  return config
})
