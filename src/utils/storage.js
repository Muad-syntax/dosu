/**
 * storage.js — Helper localStorage dengan error handling
 */

export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw)
  } catch (err) {
    console.warn(`[Dosu] localStorage.getItem("${key}") gagal:`, err)
    return fallback
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (err) {
    console.warn(`[Dosu] localStorage.setItem("${key}") gagal:`, err)
    return false
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (err) {
    console.warn(`[Dosu] localStorage.removeItem("${key}") gagal:`, err)
    return false
  }
}
