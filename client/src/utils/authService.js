// Token management functions
export const getToken = () => {
  return localStorage.getItem("accessToken")
}

export const setToken = (token) => {
  localStorage.setItem("accessToken", token)
}

export const removeToken = () => {
  localStorage.removeItem("accessToken")
}

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken")
}

export const setRefreshToken = (token) => {
  localStorage.setItem("refreshToken", token)
}

export const removeRefreshToken = () => {
  localStorage.removeItem("refreshToken")
}

// User role management
export const getUserRole = () => {
  return localStorage.getItem("role")
}

export const setUserRole = (role) => {
  localStorage.setItem("role", role)
}

export const removeUserRole = () => {
  localStorage.removeItem("role")
}

// Username management
export const getUsername = () => {
  return localStorage.getItem("username")
}

export const setUsername = (username) => {
  localStorage.setItem("username", username)
}

export const removeUsername = () => {
  localStorage.removeItem("username")
}

// Token expiry management
export const getTokenExpiry = () => {
  return localStorage.getItem("tokenExpiry")
}

export const setTokenExpiry = (expiry) => {
  localStorage.setItem("tokenExpiry", expiry)
}

export const removeTokenExpiry = () => {
  localStorage.removeItem("tokenExpiry")
}

// Check if token is expired
export const isTokenExpired = () => {
  const expiry = getTokenExpiry()
  if (!expiry) return true

  return new Date(expiry) < new Date()
}

// Complete logout function
export const logout = () => {
  removeToken()
  removeRefreshToken()
  removeUserRole()
  removeUsername()
  removeTokenExpiry()
}

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken()
  if (!token) return false

  return !isTokenExpired()
}

// Get dashboard URL based on role
export const getDashboardUrl = (role) => {
  const roleRedirects = {
    admin: "/admin-dashboard",
    student: "/studentdashboard",
    lecturer: "/lecturer-dashboard",
    academic_registrar: "/registrar-dashboard",
  }

  return roleRedirects[role] || "/login"
}

