import './style.css'
import { createIcons, Phone } from 'lucide'

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
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') })
}, { threshold: 0.08 })
document.querySelectorAll('.reveal').forEach(el => io.observe(el))

// ── i18n ──
const T = {
  en: {
    'float.zalo': 'Zalo chat', 'float.call': 'Call now',
    'nav.services': 'Services', 'nav.collections': 'Collections', 'nav.pricing': 'Pricing', 'nav.stories': 'Reviews', 'nav.about': 'About', 'nav.faq': 'FAQ', 'nav.cta': 'Book Now', 'mob.cta': 'Book Now',
    'hero.eyebrow': 'Photography studio in Hung Yen · Est. 2018', 'hero.h1': 'Every photo<br/><i>is a story</i>', 'hero.sub': "Blue Moon doesn't create new beauty, we honour the beauty already in you, through portraits, ao dai and wedding photography in Hung Yen.", 'hero.btn1': 'View collections →', 'hero.btn2': 'Book a session',
    'ticker.1': 'An Thi<span>·</span>Hung Yen', 'ticker.2': 'Portrait<span>·</span>Ao Dai<span>·</span>Wedding', 'ticker.3': 'Full wardrobe<span>·</span>Makeup included', 'ticker.4': 'Photographer Duong Thi Hang', 'ticker.5': 'Unlimited shooting time',
    'svc.eyebrow': 'Services', 'svc.h2': 'Every concept <i>has its own style</i>', 'svc.desc': 'Choose the story that fits you best. From personal portraits to milestone weddings, Blue Moon is here to listen and walk with you.',
    'svc.01': 'Portrait <i>photography</i>', 'svc.02': 'Ao dai <i>traditional</i>', 'svc.03': 'Wedding <i>&amp; engagement</i>', 'svc.04': 'Fashion <i>&amp; editorial</i>', 'svc.05': 'Muse <i>&amp; ancient costume</i>', 'svc.06': 'Tet <i>&amp; celebrations</i>', 'svc.07': 'Couple <i>&amp; pre-wedding</i>', 'svc.08': 'Birthday <i>&amp; events</i>',
    'about.eyebrow': 'About Blue Moon Studio', 'about.h2': 'A studio that tells stories<br/><i>through light</i>', 'about.p1': "Blue Moon was born from a simple belief: Vietnamese women deserve photos that celebrate their true beauty. No rigid posing, no heavy makeup, no retouching so heavy you become a stranger to yourself.", 'about.quote': '"I don\'t photograph beauty. I photograph the story of the person standing in front of my lens."', 'about.p2': 'Since opening in 2018, Blue Moon has walked alongside hundreds of clients in Hung Yen. Every shoot is its own journey, every set of photos a chapter of memory no one else can have.', 'about.sig': 'Duong Thi Hang, founding photographer of Blue Moon Studio', 'about.badge': 'sets completed',
    'usp.eyebrow': 'What only Blue Moon offers', 'usp.h2': 'Three things<br/><i>only at Blue Moon</i>', 'usp.01.title': 'Before your shoot<br/><i>consultation</i>', 'usp.01.desc': "Before your shoot, Blue Moon consults on your concept and helps you choose outfits from the studio's wardrobe via Zalo. On shoot day, you walk in and start enjoying immediately. Nothing left to worry about.", 'usp.02.title': 'A team with you<br/><i>throughout</i>', 'usp.02.desc': 'The photographer and posing assistant stay with you from start to finish, no rush, no pressure. The session continues until you have all the frames you love.', 'usp.03.title': 'Original files delivered<br/><i>the same day</i>', 'usp.03.desc': 'All retouched photos delivered same day or within 24 hours. Full-resolution originals, print-ready at any size, kept forever.',
    'col.eyebrow': 'Collections', 'col.h2': 'Eight stories,<br/><i>eight styles</i>', 'col.desc': 'Each album is an independent creative journey. Click any collection to view the full work.', 'col.btn': 'View collection',
    'col24.title': 'White Ao Dai · Lotus Lake', 'col24.tagline': '"Pure white amid lotus blooms, light as a morning breath."', 'col24.desc': 'Pure white ao dai amid a lotus pond and green bamboo groves. Natural light, quiet space, every frame like a poem written in light.',
    'col16.title': 'White Wedding · Blue Studio', 'col16.tagline': '"Pure white against cool blue. Like moonlight on still water."', 'col16.desc': 'A white wedding dress against a teal studio backdrop. A concept celebrating the pure beauty of the bride, soft light, every frame a still moment in time.',
    'col05.title': 'Couple Ao Dai · Classic', 'col05.tagline': '"Pink and black, a timeless love story."', 'col05.desc': 'Classic pink and black ao dai in a quiet, nostalgic setting. A couple portrait steeped in timeless elegance, every frame telling a story of quiet, enduring love.',
    'col17.title': 'Couple White Ao Dai · Retro Bicycle', 'col17.tagline': '"Two people, one bicycle, and an old street is enough to make a painting."', 'col17.desc': 'White ao dai, a retro bicycle, an old street. A couple portrait full of gentle romance. No elaborate staging needed. Just being together is beautiful enough.',
    'col23.title': 'Pink Hanfu · Pipa', 'col23.tagline': '"Ancient strings, pink silk, a moment suspended in time."', 'col23.desc': 'An ancient costume concept with an Eastern spirit. Vibrant pink hanfu, a pipa like an instrument from a fairy tale. Every frame is a page of poetry.',
    'col13.title': 'Nine Tailed Fox', 'col13.tagline': '"Mysterious and captivating, beauty from another world."', 'col13.desc': 'A fantasy concept inspired by the legend of the nine-tailed fox. Lavish costumes, an enigmatic gaze, every frame drawing the viewer into a world that is half real, half dream.',
    'col15.title': 'Birthday · Cute Candy', 'col15.tagline': '"Sweet as candy, bright as youth."', 'col15.desc': 'A colourful, vibrant birthday concept. Pastels, sweets, balloons. A set capturing the happiest moments of youth, a time you never want to outgrow.',
    'col19.title': 'Red Light Valentine', 'col19.tagline': '"Warm red light, intimate space. Love is most beautiful when it can be seen."', 'col19.desc': 'Warm red light envelopes the entire Valentine setting. A romantic, bold, and emotionally charged concept. Every frame a confession that needs no words.',
    'price.eyebrow': 'Pricing', 'price.h2': 'Three packages, <i>three stories</i>', 'price.desc': 'From one beautiful moment to a legacy kept forever. Every package includes full wardrobe, makeup and retouching. No hidden fees.', 'price.unit': 'VND / session',
    'price.01.tag': 'Package 01', 'price.01.title': 'The Moment', 'price.01.sub': 'Capture one beautiful moment, effortless and complete.', 'price.01.li1': '1 Blue Moon wardrobe concept', 'price.01.li2': 'Basic makeup & hair', 'price.01.li3': '10 carefully retouched photos', 'price.01.li4': 'Full-resolution original files', 'price.01.li5': 'Posing assistant on set', 'price.01.li6': 'Photos delivered same day',
    'price.02.tag': 'Package 02 · Most popular', 'price.02.title': 'The Story', 'price.02.sub': 'Tell your story through carefully crafted frames.', 'price.02.li1': '2 Blue Moon wardrobe concepts', 'price.02.li2': 'Advanced makeup & hair', 'price.02.li3': '20 carefully retouched photos', 'price.02.li4': 'Full-resolution original files', 'price.02.li5': 'Dedicated posing assistant throughout', 'price.02.li6': 'Advance concept consultation via Zalo', 'price.02.li7': 'Photos delivered same day',
    'price.03.tag': 'Package 03', 'price.03.title': 'The Legacy', 'price.03.sub': 'A body of work to keep, not just for today.', 'price.03.li1': '3 premium wardrobe concepts', 'price.03.li2': 'Premium makeup & hair', 'price.03.li3': '35 carefully retouched photos', 'price.03.li4': 'Full-resolution original files', 'price.03.li5': 'Full crew, unlimited hours', 'price.03.li6': 'Private concept & storyboard consultation', 'price.03.li7': 'Premium printed photo album included',
    'price.cta': 'Choose this package',
    'fb.eyebrow': 'Client Reviews', 'fb.h2': 'What our clients<br/><i>say about us</i>',
    'fb.01.quote': '"I was absolutely thrilled with our shoot at Blue Moon Studio. The team was enthusiastic and guided posing with great care. The photos turned out natural and elegant. Everyone who saw them was impressed!"', 'fb.01.name': 'Minh Anh', 'fb.01.service': 'Portrait · Victorian Salon',
    'fb.02.quote': '"The studio is beautiful and modern. I was quite nervous at first, but the photographer guided me so professionally that the whole shoot felt completely relaxed."', 'fb.02.name': 'Khánh Linh', 'fb.02.service': 'Portrait · Áo Dài Phố Cổ',
    'fb.03.quote': '"Our family shoot at Blue Moon Studio truly exceeded expectations. The team was incredibly patient with the kids and captured so many genuine, natural moments."', 'fb.03.name': 'The Hương Family', 'fb.03.service': 'Family · Phố Cổ Retro',
    'fb.04.quote': '"My branding photos were retouched with such subtlety and professionalism. The team understood exactly the concept I wanted and delivered a truly premium result."', 'fb.04.name': 'Hoàng Nam', 'fb.04.service': 'Branding · French Villa',
    'fb.05.quote': '"From booking to receiving the photos, everything was fast and professional. Our wedding shots came out with stunning colour, full of emotion, exactly the style we wanted."', 'fb.05.name': 'Tú & Phương', 'fb.05.service': 'Wedding · Garden',
    'fb.06.quote': '"Blue Moon Studio gave me an incredibly enjoyable shoot experience, even though I\'ve never been confident in front of the camera. The photographer\'s posing guidance was so thoughtful."', 'fb.06.name': 'Bảo Trân', 'fb.06.service': 'Portrait · Hanfu Lotus',
    'fb.07.quote': '"Highly recommend Blue Moon Studio for anyone wanting beautiful, quality photos. Friendly team, gorgeous makeup, precise retouching and delivered right on deadline."', 'fb.07.name': 'Đức Anh', 'fb.07.service': 'Portrait · Nine Tailed Fox',
    'proc.eyebrow': 'How It Works', 'proc.h2': 'From first contact<br/><i>to receiving your photos</i>',
    'proc.01.time': 'Day 1', 'proc.01.title': 'Contact & listen', 'proc.01.desc': 'Message on Zalo or call us. The Blue Moon team listens to your story and understands your vision before suggesting any package.',
    'proc.02.time': 'Day 1 to 3', 'proc.02.title': 'Concept consultation', 'proc.02.desc': 'We suggest concepts suited to your body, personality, and story. Preview outfits, backgrounds, and the planned moodboard.',
    'proc.03.time': 'Booking', 'proc.03.title': 'Confirm & deposit', 'proc.03.desc': 'Lock in a date with a 30% deposit. The team sends a detailed prep list so you walk into shoot day with confidence.',
    'proc.04.time': 'Shoot day', 'proc.04.title': 'Makeup & wardrobe', 'proc.04.desc': 'Arrive at the studio and relax with our makeup artist and stylist. Everything is prepared. No rush, no pressure.',
    'proc.05.time': 'Shoot day', 'proc.05.title': 'Unlimited shoot session', 'proc.05.desc': 'The team helps with posing, angles, and storytelling. We shoot until you love every frame, with unlimited test shots.',
    'proc.06.time': 'Same day', 'proc.06.title': 'Retouch & colour grade', 'proc.06.desc': "Photos are carefully retouched and colour-graded in Blue Moon's signature style. We enhance your natural beauty without erasing what makes you unique.",
    'proc.07.time': 'Within 24 hrs', 'proc.07.title': 'Receive & keep forever', 'proc.07.desc': 'All full-resolution originals delivered via Google Drive, kept forever, print-ready at any size, usable for any purpose.',
    'faq.eyebrow': 'FAQ', 'faq.h2': 'Frequently asked<br/><i>questions</i>', 'faq.note': "Can't find your answer? Message us on Zalo and the Blue Moon team will advise directly. No rush, no pressure.",
    'faq.q1': 'What do I need to prepare before the session?', 'faq.a1': 'Blue Moon prepares all outfits and accessories for the agreed concept. You just need to arrive on time with a relaxed mind. The team will send a detailed prep list via Zalo 2 to 3 days before, including tips on nails, hair, and things to note.',
    'faq.q2': 'How long does a session take?', 'faq.a2': 'On average 2 to 4 hours depending on the number of concepts and your package. Blue Moon sets no time limit. We shoot until you have all the frames you love. No one will rush you.',
    'faq.q3': 'When will I receive my photos?', 'faq.a3': 'Fully retouched photos are delivered the same day or within 24 hours via Google Drive. Full-resolution originals, printable at A0 and above. You retain personal usage rights.',
    'faq.q4': "I don't know how to pose. Can I still shoot?", 'faq.a4': "Absolutely. Our dedicated posing assistant guides you through every natural pose throughout the session. You don't need to know how to pose. Just relax and follow the guidance. The results will be more natural and beautiful than self-directed posing.",
    'faq.q5': 'Can I book a group or couple session?', 'faq.a5': 'Absolutely. Blue Moon welcomes couples, friends, families, and small groups. Contact us directly via Zalo for personalised package advice and an accurate quote based on group size.',
    'faq.q6': 'What is the cancellation and refund policy?', 'faq.a6': 'Cancellations more than 72 hours in advance receive a 100% deposit refund. Within 48 hours: 50% refund. Same-day cancellations are non-refundable. Rescheduling is free if requested at least 48 hours in advance and subject to availability.',
    'cta.eyebrow': 'Book a session', 'cta.h2': 'Your story<br/><i>is waiting to be told</i>', 'cta.sub': 'Let the Blue Moon team listen to your story, find the concept that fits you best, no rush, no pressure.', 'cta.zalo': 'Message us on Zalo', 'cta.call': 'Call for consultation',
    'footer.brand.desc': 'A photography studio specialising in portraits, ao dai, and wedding photography in An Thi, Hung Yen. Every photo is a story, told through light and heart.',
    'footer.col1': 'Services', 'footer.svc.01': 'Portrait photography', 'footer.svc.02': 'Ao dai traditional', 'footer.svc.03': 'Wedding & engagement', 'footer.svc.04': 'Fashion & editorial', 'footer.svc.05': 'Muse & ancient costume',
    'footer.col2': 'Explore', 'footer.exp.01': 'Collections', 'footer.exp.02': 'Client stories', 'footer.exp.03': 'Pricing', 'footer.exp.04': 'How it works', 'footer.exp.05': 'FAQ',
    'footer.col3': 'Contact', 'footer.hours': 'Open: 8:00 – 20:00<br/>Monday – Sunday',
    'footer.copy': '© 2018–2026 Blue Moon Studio. All rights reserved.', 'footer.made': 'Photographer Duong Thi Hang',
    'alb.back': 'Back to gallery', 'alb.photos': 'photos'
  },
  vi: {
    'float.zalo': 'Zalo tư vấn', 'float.call': 'Gọi ngay',
    'nav.services': 'Dịch vụ', 'nav.collections': 'Bộ sưu tập', 'nav.pricing': 'Bảng giá', 'nav.stories': 'Đánh giá', 'nav.about': 'Về chúng tôi', 'nav.faq': 'Hỏi đáp', 'nav.cta': 'Đặt lịch', 'mob.cta': 'Đặt lịch ngay',
    'hero.eyebrow': 'Studio nhiếp ảnh tại Hưng Yên, từ 2018', 'hero.h1': 'Mỗi bức ảnh<br/><i>là một câu chuyện</i>', 'hero.sub': 'Blue Moon không tạo ra vẻ đẹp mới, chúng tôi tôn vinh vẻ đẹp vốn có của bạn qua chân dung, áo dài và ảnh cưới tại Hưng Yên.', 'hero.btn1': 'Xem bộ sưu tập →', 'hero.btn2': 'Đặt lịch chụp',
    'ticker.1': 'An Thi<span>·</span>Hưng Yên', 'ticker.2': 'Chân dung<span>·</span>Áo dài<span>·</span>Ảnh cưới', 'ticker.3': 'Trọn gói trang phục<span>·</span>Makeup', 'ticker.4': 'Nhiếp ảnh gia Dương Thị Hằng', 'ticker.5': 'Không giới hạn thời gian chụp',
    'svc.eyebrow': 'Dịch vụ', 'svc.h2': 'Mỗi concept <i>là một phong cách riêng</i>', 'svc.desc': 'Chọn câu chuyện phù hợp nhất với bạn. Từ chân dung cá nhân đến ảnh cưới trọng đại, Blue Moon luôn ở đây lắng nghe và đồng hành cùng bạn.',
    'svc.01': 'Chân dung <i>cá nhân</i>', 'svc.02': 'Áo dài <i>truyền thống</i>', 'svc.03': 'Ảnh cưới <i>&amp; đám hỏi</i>', 'svc.04': 'Thời trang <i>&amp; editorial</i>', 'svc.05': 'Nàng thơ <i>&amp; cổ trang</i>', 'svc.06': 'Ảnh Tết <i>&amp; kỷ niệm</i>', 'svc.07': 'Couple <i>&amp; pre-wedding</i>', 'svc.08': 'Sinh nhật <i>&amp; sự kiện</i>',
    'about.eyebrow': 'Về Blue Moon Studio', 'about.h2': 'Studio kể chuyện<br/><i>bằng ánh sáng</i>', 'about.p1': 'Blue Moon ra đời từ niềm tin đơn giản: phụ nữ Việt Nam xứng đáng có những bộ ảnh tôn vinh vẻ đẹp thật sự của mình. Không tạo dáng cứng nhắc, không makeup dày, không retouch đến mức xa lạ với chính bạn.', 'about.quote': '"Tôi không chụp vẻ đẹp. Tôi chụp câu chuyện của người đứng trước ống kính."', 'about.p2': 'Kể từ khi ra đời năm 2018, Blue Moon đã đồng hành cùng hàng trăm khách hàng tại Hưng Yên. Mỗi buổi chụp là một hành trình riêng, mỗi bộ ảnh là một chương ký ức không ai khác có được.', 'about.sig': 'Dương Thị Hằng, nhiếp ảnh gia sáng lập Blue Moon Studio', 'about.badge': 'bộ ảnh đã thực hiện',
    'usp.eyebrow': 'Điều chỉ có ở Blue Moon', 'usp.h2': 'Ba điều<br/><i>chỉ có ở Blue Moon</i>', 'usp.01.title': 'Chăm sóc trước<br/><i>buổi chụp</i>', 'usp.01.desc': 'Trước ngày chụp, Blue Moon tư vấn concept và hỗ trợ bạn chọn trang phục từ kho đồ của studio qua Zalo. Để đến ngày chụp, bạn bước vào là bắt đầu tận hưởng ngay, không phải lo thêm gì nữa.', 'usp.02.title': 'Ekip đồng hành<br/><i>xuyên suốt</i>', 'usp.02.desc': 'Nhiếp ảnh gia và trợ lý tạo dáng đồng hành từ đầu đến cuối, không vội vàng, không áp lực. Buổi chụp kéo dài đến khi bạn có đủ những khung hình ưng ý mới kết thúc.', 'usp.03.title': 'Giao file ảnh gốc<br/><i>trong ngày</i>', 'usp.03.desc': 'Toàn bộ ảnh đã retouch được gửi về trong ngày hoặc trong vòng 24 giờ. File gốc độ phân giải cao, in được khổ lớn, lưu giữ mãi mãi.',
    'col.eyebrow': 'Bộ sưu tập', 'col.h2': 'Tám câu chuyện,<br/><i>tám phong cách</i>', 'col.desc': 'Mỗi album là một hành trình sáng tạo độc lập. Nhấn vào từng bộ để xem toàn bộ tác phẩm.', 'col.btn': 'Xem bộ sưu tập',
    'col24.title': 'Áo Dài Trắng · Hồ Sen Tre', 'col24.tagline': '"Trắng tinh giữa hồ sen, nhẹ như hơi thở buổi sáng."', 'col24.desc': 'Áo dài trắng thuần khiết giữa đầm sen và rặng tre xanh. Ánh sáng tự nhiên, không gian tĩnh lặng, từng khung hình như một bài thơ viết bằng ánh sáng.',
    'col16.title': 'Váy Cưới Trắng · Studio Xanh', 'col16.tagline': '"Trắng muốt giữa nền xanh, như trăng soi mặt hồ tĩnh lặng."', 'col16.desc': 'Váy cưới trắng nổi bật trên nền studio xanh ngọc. Concept tôn vinh vẻ đẹp cô dâu thuần khiết, ánh sáng dịu nhẹ, mỗi khung hình như một khoảnh khắc đứng yên trong thời gian.',
    'col05.title': 'Couple Áo Dài · Cổ Điển', 'col05.tagline': '"Hồng và đen, hai sắc màu của một câu chuyện tình cổ điển."', 'col05.desc': 'Áo dài hồng và đen cổ điển, không gian cổ điển trầm mặc. Bộ ảnh đôi mang hơi thở hoài cổ, từng khung hình đều kể một câu chuyện tình yên bình và bền chặt.',
    'col17.title': 'Couple Áo Dài Trắng · Xe Đạp Retro', 'col17.tagline': '"Hai người, một chiếc xe đạp, và con phố cũ đủ để thành một bức tranh."', 'col17.desc': 'Áo dài trắng tinh, chiếc xe đạp retro, con phố cổ. Bộ ảnh đôi mang nét lãng mạn dịu dàng, không cần cầu kỳ. Chỉ cần có nhau là đủ đẹp.',
    'col23.title': 'Hanfu Hồng · Đàn Tỳ Bà', 'col23.tagline': '"Tiếng tỳ bà vang giữa đêm trăng, và tà hanfu hồng bay trong gió."', 'col23.desc': 'Concept cổ trang mang hơi thở Đông phương. Hanfu hồng rực, đàn tỳ bà như nhạc cụ của một câu chuyện cổ tích. Mỗi khung hình là một trang thơ.',
    'col13.title': 'Hồ Ly Chín Đuôi', 'col13.tagline': '"Huyền bí và quyến rũ, vẻ đẹp đến từ một thế giới khác."', 'col13.desc': 'Concept fantasy lấy cảm hứng từ truyền thuyết hồ ly chín đuôi. Trang phục lộng lẫy, ánh mắt huyền bí, từng khung hình dẫn người xem vào một câu chuyện vừa thực vừa mộng.',
    'col15.title': 'Tiệc Sinh Nhật · Cute Candy', 'col15.tagline': '"Ngọt ngào như kẹo, rực rỡ như tuổi trẻ."', 'col15.desc': 'Concept tiệc sinh nhật đầy màu sắc và sức sống. Pastel, kẹo ngọt, bong bóng. Một bộ ảnh ghi lại khoảnh khắc hạnh phúc nhất của tuổi trẻ, không bao giờ muốn lớn thêm.',
    'col19.title': 'Đèn Đỏ Valentine', 'col19.tagline': '"Ánh đèn đỏ, không gian ấm. Tình yêu đẹp nhất khi được nhìn thấy."', 'col19.desc': 'Ánh đèn đỏ ấm áp bao phủ toàn bộ không gian Valentine. Concept tình yêu lãng mạn, táo bạo và đầy cảm xúc. Mỗi khung hình là một lời thú nhận không cần lời.',
    'price.eyebrow': 'Bảng giá', 'price.h2': 'Ba gói, <i>ba câu chuyện</i>', 'price.desc': 'Từ một khoảnh khắc đẹp đến di sản lưu giữ mãi mãi. Mỗi gói đã bao gồm đầy đủ trang phục, makeup và retouch. Không phụ thu, không vặn vẹo.', 'price.unit': 'đồng / buổi chụp',
    'price.01.tag': 'Gói 01', 'price.01.title': 'Khoảnh Khắc', 'price.01.sub': 'Ghi lại một khoảnh khắc đẹp, nhẹ nhàng và trọn vẹn.', 'price.01.li1': '1 concept trang phục của Blue Moon', 'price.01.li2': 'Makeup & làm tóc cơ bản', 'price.01.li3': '10 ảnh retouch kỹ lưỡng', 'price.01.li4': 'File gốc độ phân giải cao', 'price.01.li5': 'Ekip hỗ trợ tạo dáng', 'price.01.li6': 'Giao ảnh trong ngày',
    'price.02.tag': 'Gói 02 · Phổ biến nhất', 'price.02.title': 'Câu Chuyện', 'price.02.sub': 'Kể câu chuyện của bạn qua từng khung hình tinh tế.', 'price.02.li1': '2 concept trang phục của Blue Moon', 'price.02.li2': 'Makeup & làm tóc nâng cao', 'price.02.li3': '20 ảnh retouch kỹ lưỡng', 'price.02.li4': 'File gốc độ phân giải cao', 'price.02.li5': 'Ekip hỗ trợ tạo dáng xuyên suốt', 'price.02.li6': 'Tư vấn concept qua Zalo trước', 'price.02.li7': 'Giao ảnh trong ngày',
    'price.03.tag': 'Gói 03', 'price.03.title': 'Di Sản', 'price.03.sub': 'Tác phẩm để lưu giữ, không chỉ cho hôm nay.', 'price.03.li1': '3 concept trang phục cao cấp', 'price.03.li2': 'Makeup & làm tóc cao cấp', 'price.03.li3': '35 ảnh retouch kỹ lưỡng', 'price.03.li4': 'File gốc độ phân giải cao', 'price.03.li5': 'Ekip đầy đủ, không giới hạn giờ', 'price.03.li6': 'Tư vấn concept & storyboard riêng', 'price.03.li7': 'Album ảnh in cao cấp kèm theo',
    'price.cta': 'Chọn gói này',
    'fb.eyebrow': 'Đánh giá khách hàng', 'fb.h2': 'Khách hàng nói gì<br/><i>về Blue Moon Studio</i>',
    'fb.01.quote': '"Mình cực kỳ hài lòng với buổi chụp tại Blue Moon Studio. Team rất nhiệt tình, hỗ trợ tạo dáng tận tâm nên ảnh lên vừa tự nhiên vừa sang. Nhận ảnh xong ai cũng khen!"', 'fb.01.name': 'Minh Anh', 'fb.01.service': 'Chân dung · Áo Dài Cổ Điển',
    'fb.02.quote': '"Không gian studio rất đẹp và hiện đại. Ban đầu mình khá ngại chụp hình nhưng photographer hướng dẫn rất chuyên nghiệp nên buổi chụp diễn ra cực kỳ thoải mái."', 'fb.02.name': 'Khánh Linh', 'fb.02.service': 'Chân dung · Áo Dài Trắng',
    'fb.03.quote': '"Gia đình mình chụp bộ ảnh kỷ niệm tại Blue Moon Studio và thật sự vượt ngoài mong đợi. Các bé được ekip hỗ trợ rất kiên nhẫn, bắt được nhiều khoảnh khắc tự nhiên."', 'fb.03.name': 'Gia đình chị Hương', 'fb.03.service': 'Ảnh gia đình · Phố Cổ Retro',
    'fb.04.quote': '"Ảnh branding cho công việc của mình được chỉnh rất tinh tế và chuyên nghiệp. Team hiểu rõ concept mình muốn và cho ra thành phẩm rất cao cấp."', 'fb.04.name': 'Hoàng Nam', 'fb.04.service': 'Branding · Studio Xanh',
    'fb.05.quote': '"Từ khâu booking đến lúc nhận ảnh đều rất nhanh chóng và chuyên nghiệp. Ảnh cưới của tụi mình lên màu cực đẹp, cảm xúc và đúng style mong muốn."', 'fb.05.name': 'Tú & Phương', 'fb.05.service': 'Ảnh cưới · Váy Cưới Trắng',
    'fb.06.quote': '"Blue Moon Studio giúp mình có trải nghiệm chụp ảnh cực kỳ dễ chịu dù trước giờ không tự tin trước ống kính. Photographer hướng dẫn pose dáng rất có tâm."', 'fb.06.name': 'Bảo Trân', 'fb.06.service': 'Chân dung · Hanfu Hồng',
    'fb.07.quote': '"Rất recommend Blue Moon Studio cho ai muốn có bộ ảnh đẹp và chất lượng. Ekip thân thiện, makeup đẹp, chỉnh ảnh tinh tế và đúng deadline."', 'fb.07.name': 'Đức Anh', 'fb.07.service': 'Chân dung · Hồ Ly Chín Đuôi',
    'proc.eyebrow': 'Quy trình', 'proc.h2': 'Từ lần đầu liên hệ<br/><i>đến khi nhận ảnh</i>',
    'proc.01.time': 'Ngày 1', 'proc.01.title': 'Liên hệ & lắng nghe', 'proc.01.desc': 'Nhắn Zalo hoặc gọi điện. Ekip Blue Moon lắng nghe câu chuyện của bạn, hiểu mong muốn trước khi tư vấn bất kỳ gói dịch vụ nào.',
    'proc.02.time': 'Ngày 1 đến 3', 'proc.02.title': 'Tư vấn concept', 'proc.02.desc': 'Gợi ý concept phù hợp với vóc dáng, tính cách và câu chuyện của bạn. Xem trước trang phục, background và moodboard dự kiến.',
    'proc.03.time': 'Đặt lịch', 'proc.03.title': 'Xác nhận & cọc', 'proc.03.desc': 'Chốt ngày giờ, đặt cọc 30% để giữ lịch. Ekip gửi danh sách chuẩn bị chi tiết để bạn tự tin bước vào ngày chụp.',
    'proc.04.time': 'Ngày chụp', 'proc.04.title': 'Makeup & trang phục', 'proc.04.desc': 'Đến studio, thư giãn với makeup artist và stylist. Toàn bộ trang phục đã chuẩn bị sẵn, không vội vàng, không áp lực.',
    'proc.05.time': 'Ngày chụp', 'proc.05.title': 'Buổi chụp không giới hạn', 'proc.05.desc': 'Ekip hỗ trợ tạo dáng, chọn góc, kể câu chuyện. Ekip chụp đến khi bạn ưng ý mới dừng, không giới hạn số lượng ảnh thử.',
    'proc.06.time': 'Trong ngày', 'proc.06.title': 'Retouch & chỉnh màu', 'proc.06.desc': 'Ảnh được retouch kỹ lưỡng, chỉnh màu theo phong cách Blue Moon. Blue Moon tôn vẻ đẹp tự nhiên, không làm mất đi nét riêng của bạn.',
    'proc.07.time': '24 giờ sau', 'proc.07.title': 'Nhận ảnh & lưu giữ', 'proc.07.desc': 'Toàn bộ file ảnh gốc độ phân giải cao gửi qua Google Drive, lưu giữ mãi mãi, in được khổ lớn, dùng cho mọi mục đích.',
    'faq.eyebrow': 'Hỏi đáp', 'faq.h2': 'Câu hỏi<br/><i>thường gặp</i>', 'faq.note': 'Không tìm thấy câu trả lời? Nhắn Zalo để ekip Blue Moon tư vấn trực tiếp, không vội vàng, không áp lực.',
    'faq.q1': 'Tôi cần chuẩn bị gì trước buổi chụp?', 'faq.a1': 'Blue Moon chuẩn bị toàn bộ trang phục và phụ kiện theo concept đã thống nhất. Bạn chỉ cần đến đúng giờ với tinh thần thoải mái. Ekip sẽ gửi danh sách chuẩn bị cụ thể qua Zalo trước ngày chụp từ 2 đến 3 ngày, bao gồm gợi ý về móng tay, tóc và những điều nên lưu ý.',
    'faq.q2': 'Buổi chụp kéo dài bao lâu?', 'faq.a2': 'Trung bình từ 2 đến 4 giờ tùy theo số concept và gói dịch vụ. Blue Moon không giới hạn thời gian. Chụp đến khi bạn có đủ những khung hình ưng ý mới kết thúc. Không ai thúc giục bạn.',
    'faq.q3': 'Bao giờ thì nhận được ảnh?', 'faq.a3': 'Ảnh retouch hoàn chỉnh được gửi trong ngày hoặc trong vòng 24 giờ sau buổi chụp qua Google Drive. File gốc độ phân giải cao, có thể in khổ A0 trở lên. Bạn giữ bản quyền sử dụng cho mục đích cá nhân.',
    'faq.q4': 'Tôi không biết tạo dáng, có chụp được không?', 'faq.a4': 'Hoàn toàn được. Ekip có trợ lý tạo dáng đồng hành xuyên suốt, hướng dẫn từng tư thế tự nhiên. Bạn không cần biết tạo dáng, chỉ cần thư giãn và làm theo hướng dẫn. Kết quả sẽ tự nhiên và đẹp hơn cả khi tự tạo dáng.',
    'faq.q5': 'Có thể đặt lịch nhóm hoặc cặp đôi không?', 'faq.a5': 'Hoàn toàn được. Blue Moon nhận chụp cặp đôi, bạn bè, gia đình và nhóm nhỏ. Liên hệ trực tiếp qua Zalo để được tư vấn gói phù hợp và báo giá chính xác theo số người.',
    'faq.q6': 'Chính sách hủy lịch và hoàn tiền như thế nào?', 'faq.a6': 'Hủy lịch trước 72 giờ sẽ được hoàn lại 100% tiền cọc. Hủy trong vòng 48 giờ hoàn lại 50%. Hủy trong ngày không hoàn tiền cọc. Dời lịch sang ngày khác được thực hiện miễn phí nếu báo trước 48 giờ và còn lịch trống.',
    'cta.eyebrow': 'Đặt lịch chụp', 'cta.h2': 'Câu chuyện của bạn<br/><i>đang chờ được kể</i>', 'cta.sub': 'Hãy để đội ngũ Blue Moon lắng nghe câu chuyện của bạn, tư vấn concept phù hợp nhất, không vội vàng, không áp lực.', 'cta.zalo': 'Nhắn Zalo ngay', 'cta.call': 'Gọi điện tư vấn',
    'footer.brand.desc': 'Studio nhiếp ảnh chuyên chân dung, áo dài, ảnh cưới tại An Thi, Hưng Yên. Mỗi bức ảnh là một câu chuyện, được kể bằng ánh sáng và trái tim.',
    'footer.col1': 'Dịch vụ', 'footer.svc.01': 'Chân dung cá nhân', 'footer.svc.02': 'Áo dài truyền thống', 'footer.svc.03': 'Ảnh cưới & đám hỏi', 'footer.svc.04': 'Thời trang & editorial', 'footer.svc.05': 'Nàng thơ & cổ trang',
    'footer.col2': 'Khám phá', 'footer.exp.01': 'Bộ sưu tập', 'footer.exp.02': 'Câu chuyện khách hàng', 'footer.exp.03': 'Bảng giá', 'footer.exp.04': 'Quy trình', 'footer.exp.05': 'Hỏi đáp',
    'footer.col3': 'Liên hệ', 'footer.hours': 'Mở cửa: 8:00 – 20:00<br/>Thứ 2 – Chủ nhật',
    'footer.copy': '© 2018–2026 Blue Moon Studio. Mọi quyền được bảo lưu.', 'footer.made': 'Nhiếp ảnh gia Dương Thị Hằng',
    'alb.back': 'Quay lại thư viện', 'alb.photos': 'bức ảnh'
  }
}

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
