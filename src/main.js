import './style.css'
import { createIcons, Phone } from 'lucide'
import { T } from './i18n.js'

// ── Mobile nav ──
function toggleMob() {
  document.getElementById('mob-nav').classList.toggle('open')
}

// ── FAQ ──
function toggleFaq(el) {
  const item = el.closest('.faq-item')
  const isOpen = item.classList.contains('open')
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'))
  if (!isOpen) item.classList.add('open')
}

// ── Albums ──
const ALBUM_TITLES = {
  en: {
    bm05: 'Couple Ao Dai · Classic',
    bm13: 'Nine Tailed Fox',
    bm15: 'Birthday · Cute Candy',
    bm16: 'White Wedding · Blue Studio',
    bm17: 'Couple White Ao Dai · Retro Bicycle',
    bm19: 'Red Light Valentine',
    bm23: 'Pink Hanfu · Pipa',
    bm24: 'White Ao Dai · Lotus Lake'
  },
  vi: {
    bm05: 'Couple Áo Dài · Cổ Điển',
    bm13: 'Hồ Ly Chín Đuôi',
    bm15: 'Tiệc Sinh Nhật · Cute Candy',
    bm16: 'Váy Cưới Trắng · Studio Xanh',
    bm17: 'Couple Áo Dài Trắng · Xe Đạp Retro',
    bm19: 'Đèn Đỏ Valentine',
    bm23: 'Hanfu Hồng · Đàn Tỳ Bà',
    bm24: 'Áo Dài Trắng · Hồ Sen Tre'
  }
}

const ALBUMS = {
  bm05: { path: '/albums/blue-moon/05%20-%20Couple%20Ao%20dai%20hong%20den%20-%20Co%20dien/', files: ['36.webp','37.webp','38.webp','39.webp'] },
  bm13: { path: '/albums/blue-moon/13%20-%20Ho%20ly%209%20duoi/', files: ['106.webp','107.webp','108.webp','109.webp','110.webp'] },
  bm15: { path: '/albums/blue-moon/15%20-%20Tiec%20sinh%20nhat%20-%20Cute%20Candy/', files: ['115.webp','116.webp','117.webp','118.webp','119.webp','120.webp','121.webp'] },
  bm16: { path: '/albums/blue-moon/16%20-%20Vay%20cuoi%20trang%20-%20Studio%20xanh/', files: ['122.webp','123.webp','124.webp','125.webp','126.webp'] },
  bm17: { path: '/albums/blue-moon/17%20-%20Couple%20Ao%20dai%20trang%20-%20Xe%20dap%20retro/', files: ['127.webp','128.webp','129.webp','130.webp','131.webp'] },
  bm19: { path: '/albums/blue-moon/19%20-%20Den%20do%20Valentine/', files: ['139.webp','140.webp','141.webp','141A.webp'] },
  bm23: { path: '/albums/blue-moon/23%20-%20Hanfu%20hong%20-%20Dan%20ty%20ba/', files: ['160.webp','161.webp','162.webp','163.webp'] },
  bm24: { path: '/albums/blue-moon/24%20-%20Ao%20dai%20trang%20-%20Ho%20sen%20Tre/', files: ['164.webp','164A.webp','165.webp','165A.webp'] }
}

let curAlbum = null, curIdx = 0

function openAlbum(key) {
  curAlbum = ALBUMS[key]; curAlbum._key = key; curIdx = 0
  document.getElementById('alb-title').textContent = ALBUM_TITLES[_lang][key]
  document.getElementById('alb-photo-count').textContent = curAlbum.files.length + ' ' + (T[_lang]['alb.photos'] || 'photos')
  buildGrid()
  document.getElementById('alb-single').classList.remove('open')
  document.getElementById('album-modal').classList.add('open')
  document.body.style.overflow = 'hidden'
}

function buildGrid() {
  const grid = document.getElementById('alb-grid')
  grid.innerHTML = ''
  curAlbum.files.forEach((f, i) => {
    const item = document.createElement('div')
    item.className = 'alb-grid-item'
    const img = document.createElement('img')
    img.src = curAlbum.path + f
    img.alt = ALBUM_TITLES[_lang][curAlbum._key] + ' ' + (i + 1)
    img.loading = i < 6 ? 'eager' : 'lazy'
    item.appendChild(img)
    item.onclick = () => openSingle(i)
    grid.appendChild(item)
  })
}

function openSingle(idx) {
  curIdx = idx
  const imgEl = document.getElementById('alb-single-img')
  imgEl.classList.add('alb-single-img-fade')
  imgEl.src = curAlbum.path + curAlbum.files[curIdx]
  imgEl.onload = () => imgEl.classList.remove('alb-single-img-fade')
  document.getElementById('alb-single-counter').textContent = (curIdx + 1) + ' / ' + curAlbum.files.length
  document.getElementById('alb-single').classList.add('open')
}

function albNav(dir) {
  curIdx = (curIdx + dir + curAlbum.files.length) % curAlbum.files.length
  const imgEl = document.getElementById('alb-single-img')
  imgEl.classList.add('alb-single-img-fade')
  imgEl.src = curAlbum.path + curAlbum.files[curIdx]
  imgEl.onload = () => imgEl.classList.remove('alb-single-img-fade')
  document.getElementById('alb-single-counter').textContent = (curIdx + 1) + ' / ' + curAlbum.files.length
}

function closeSingle() {
  document.getElementById('alb-single').classList.remove('open')
}

function closeAlbum() {
  document.getElementById('album-modal').classList.remove('open')
  document.getElementById('alb-single').classList.remove('open')
  document.body.style.overflow = ''
}

// Touch swipe for lightbox
let _tx = 0
document.querySelector('.alb-single-body').addEventListener('touchstart', e => { _tx = e.touches[0].clientX }, { passive: true })
document.querySelector('.alb-single-body').addEventListener('touchend', e => {
  const d = _tx - e.changedTouches[0].clientX
  if (Math.abs(d) > 44 && document.getElementById('alb-single').classList.contains('open')) albNav(d > 0 ? 1 : -1)
}, { passive: true })

document.addEventListener('keydown', e => {
  const modal = document.getElementById('album-modal')
  const single = document.getElementById('alb-single')
  if (!modal.classList.contains('open')) return
  if (single.classList.contains('open')) {
    if (e.key === 'ArrowRight') albNav(1)
    else if (e.key === 'ArrowLeft') albNav(-1)
    else if (e.key === 'Escape') closeSingle()
  } else {
    if (e.key === 'Escape') closeAlbum()
  }
})

// ── Scroll reveal ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('in')
    else e.target.classList.remove('in')
  })
}, { threshold: 0.08 })
document.querySelectorAll('.reveal').forEach(el => io.observe(el))

let _lang = 'en'

function setLang(lang) {
  _lang = lang
  document.documentElement.lang = lang
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = T[lang][el.dataset.i18n]
    if (v !== undefined) el.textContent = v
  })
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = T[lang][el.dataset.i18nHtml]
    if (v !== undefined) el.innerHTML = v
  })
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang))
  localStorage.setItem('lang', lang)
  if (curAlbum) {
    document.getElementById('alb-title').textContent = ALBUM_TITLES[lang][curAlbum._key]
    document.getElementById('alb-photo-count').textContent = curAlbum.files.length + ' ' + (T[lang]['alb.photos'] || 'photos')
  }
}

setLang(localStorage.getItem('lang') || 'en')

// Expose functions globally for HTML onclick attributes
window.toggleMob = toggleMob
window.toggleFaq = toggleFaq
window.openAlbum = openAlbum
window.closeAlbum = closeAlbum
window.closeSingle = closeSingle
window.albNav = albNav
window.setLang = setLang

// Lucide icons
createIcons({ icons: { Phone } })
