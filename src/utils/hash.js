/**
 * hash.js — SHA-256 password hashing via Web Crypto API
 * Salt disimpan bersama hash untuk keamanan dasar.
 */

function generateSalt(length = 16) {
  const arr = new Uint8Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('')
}

async function sha256(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Hash password dengan salt.
 * @returns {Promise<{ hash: string, salt: string }>}
 */
export async function hashPassword(password) {
  const salt = generateSalt()
  const hash = await sha256(salt + password)
  return { hash, salt }
}

/**
 * Verifikasi password dengan hash dan salt yang tersimpan.
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, storedHash, storedSalt) {
  const hash = await sha256(storedSalt + password)
  return hash === storedHash
}
