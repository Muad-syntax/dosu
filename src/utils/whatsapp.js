/**
 * whatsapp.js — Pembuat URL dan pesan WhatsApp
 */

const WA_NUMBER = import.meta.env.VITE_WA_NUMBER || '62895414296707'

/**
 * Format harga ke rupiah
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Buat pesan WhatsApp dari item keranjang.
 * @param {Array} items - Array { name, qty, price }
 * @param {number} total
 * @param {string} username
 * @param {string} [note]
 * @returns {string}
 */
export function buildOrderMessage(items, total, username, note = '') {
  const lines = items.map((item, i) => {
    const subtotal = item.price * item.qty
    return `${i + 1}. ${item.name} x${item.qty} = ${formatRupiah(subtotal)}`
  })

  let message = `Halo Dosu! Saya ingin memesan:\n\n`
  message += lines.join('\n')
  message += `\n\nTotal: ${formatRupiah(total)}`

  if (note && note.trim()) {
    message += `\n\nCatatan: ${note.trim()}`
  }

  message += `\n\nNama pemesan: ${username}`

  return message
}

/**
 * Buka WhatsApp dengan pesan yang sudah terformat.
 */
export function openWhatsApp(items, total, username, note = '') {
  const message = buildOrderMessage(items, total, username, note)
  const encoded = encodeURIComponent(message)
  const url = `https://wa.me/${WA_NUMBER}?text=${encoded}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
