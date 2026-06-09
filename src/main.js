import './style.css'
import { createIcons, Phone } from 'lucide'
import { T } from './i18n.js'

// ── Nav scroll: transparent over hero, solid when scrolled ──
const _nav = document.getElementById('nav')
function _updateNav() {
  _nav.classList.toggle('solid', window.scrollY > window.innerHeight * 0.8)
}
window.addEventListener('scroll', _updateNav, { passive: true })

// ── Mobile nav ──
function toggleMob() {
  const open = document.getElementById('mob-nav').classList.toggle('open')
  _nav.classList.toggle('solid', open || window.scrollY > window.innerHeight * 0.8)
}

// ── Award photo lightbox ──
function openAwardPhoto(src, caption) {
  document.getElementById('award-modal-img').src = src
  document.getElementById('award-modal-caption').textContent = caption || ''
  document.getElementById('award-photo-modal').classList.add('open')
  document.body.style.overflow = 'hidden'
}
function closeAwardPhoto() {
  document.getElementById('award-photo-modal').classList.remove('open')
  document.getElementById('award-modal-img').src = ''
  document.body.style.overflow = ''
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAwardPhoto() })

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
    dt01: 'Northwest · Spring Blossoms',
    dt02: 'Highland Peoples',
    dt03: 'Countryside · Rice Terraces',
    dt04: 'Childhood Memories',
    dt05: 'Fishermen from Above',
    dt06: 'Fish Markets & Harbours',
    dt07: 'Life at Sea',
    dt08: 'Traditional Crafts'
  },
  vi: {
    dt01: 'Tây Bắc · Mùa Hoa',
    dt02: 'Tộc Người Vùng Cao',
    dt03: 'Đồng Quê · Ruộng Bậc Thang',
    dt04: 'Ký Ức Tuổi Thơ',
    dt05: 'Ngư Dân · Nhìn Từ Trên Cao',
    dt06: 'Chợ Biển · Bến Cảng',
    dt07: 'Nghề Biển',
    dt08: 'Làng Nghề Truyền Thống'
  }
}

const ALBUMS = {
  dt01: { path: '/albums/dt/01%20-%20Tay%20Bac%20-%20Mua%20Hoa/', files: ['photo_01.webp','photo_02.webp','photo_03.webp','photo_04.webp','photo_05.webp','photo_06.webp'] },
  dt02: { path: '/albums/dt/02%20-%20Toc%20Nguoi%20Vung%20Cao/', files: ['photo_01.webp','photo_02.webp','photo_03.webp','photo_04.webp','photo_05.webp'] },
  dt03: { path: '/albums/dt/03%20-%20Dong%20Que%20-%20Ruong%20Bac%20Thang/', files: ['photo_01.webp','photo_02.webp','photo_03.webp','photo_04.webp'] },
  dt04: { path: '/albums/dt/04%20-%20Ky%20Uc%20Tuoi%20Tho/', files: ['photo_01.webp','photo_02.webp','photo_03.webp','photo_04.webp'] },
  dt05: { path: '/albums/dt/05%20-%20Ngu%20Dan%20-%20Nhin%20Tu%20Tren%20Cao/', files: ['photo_01.webp','photo_02.webp','photo_03.webp','photo_04.webp','photo_05.webp'] },
  dt06: { path: '/albums/dt/06%20-%20Cho%20Bien%20-%20Ben%20Canh/', files: ['photo_01.webp','photo_02.webp','photo_03.webp'] },
  dt07: { path: '/albums/dt/07%20-%20Nghe%20Bien/', files: ['photo_01.webp','photo_02.webp','photo_03.webp','photo_04.webp'] },
  dt08: { path: '/albums/dt/08%20-%20Lang%20Nghe%20Truyen%20Thong/', files: ['photo_01.webp','photo_02.webp','photo_03.webp','photo_04.webp'] }
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

let _lang = 'vi'

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

setLang(localStorage.getItem('lang') || 'vi')

// Expose functions globally for HTML onclick attributes
window.toggleMob = toggleMob
window.toggleFaq = toggleFaq
window.openAlbum = openAlbum
window.closeAlbum = closeAlbum
window.closeSingle = closeSingle
window.albNav = albNav
window.setLang = setLang
window.openAwardPhoto = openAwardPhoto
window.closeAwardPhoto = closeAwardPhoto

// Lucide icons
createIcons({ icons: { Phone } })
