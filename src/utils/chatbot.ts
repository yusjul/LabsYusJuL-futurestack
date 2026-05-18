/**
 * Offline Smart Chatbot — No API key needed!
 * Pattern-matching + contextual responses untuk FutureStack assistant.
 * Extended version — 60+ rule categories, 200+ responses.
 */

interface BotRule {
  patterns: RegExp[];
  responses: string[];
}

const rules: BotRule[] = [
  // ─── SAPAAN ──────────────────────────────────────────────────────────────
  {
    patterns: [/\b(hai|halo|hello|hi|hey|assalamu|selamat\s*pagi|selamat\s*siang|selamat\s*sore|selamat\s*malam|hei|howdy|yo\b|oi\b)\b/i],
    responses: [
      'Hai! 👋 Ada yang bisa aku bantu hari ini?',
      'Halo! Senang bisa ngobrol denganmu. Ada pertanyaan?',
      'Hey! Siap membantu kamu. Mau tanya apa?',
      'Halo! Aku assistant FutureStack. Tanya apa saja ya! 😊',
      'Selamat datang di FutureStack! Ada yang bisa aku bantu? 🚀',
      'Halo, developer! Siap ngulik apa hari ini? 💻',
    ],
  },

  // ─── TERIMA KASIH ────────────────────────────────────────────────────────
  {
    patterns: [/\b(makasih|terima\s*kasih|thanks|thank\s*you|thx|tengkyu|ty\b)\b/i],
    responses: [
      'Sama-sama! 😊 Senang bisa membantu.',
      'Siap! Jangan ragu tanya lagi ya.',
      'Sama-sama! Kalau ada yang lain, kabari aja.',
      'No problem! Happy coding! 🔥',
      'Dengan senang hati! Semangat terus ya! 💪',
    ],
  },

  // ─── TENTANG APP (dipersempit) ──────────────────────────────────────────
  {
    patterns: [
      /\bfuturestack\b/i,
      /\b(app|apk|aplikasi)\s*(ini|itu)\b/i,
      /\btentang\s*(app|apk|aplikasi|platform)\s*ini\b/i,
    ],
    responses: [
      'FutureStack adalah developer OS — platform untuk mengelola project, task, notes, dan workflow coding kamu dalam satu tempat! 🚀',
      'Ini FutureStack! Sebuah project management app dengan gaya neobrutalism yang keren. Kamu bisa kelola task, tulis notes, dan banyak lagi.',
      'FutureStack = tools developer modern. Project board, catatan markdown, timer Pomodoro, dan chatbot offline — semua dalam satu app! ⚡',
    ],
  },

  // ─── SIAPA YANG BUAT ─────────────────────────────────────────────────────
  {
    patterns: [/\b(siapa\s*yang\s*(buat|bikin|develop|create)|pembuat|developer\s*app|yang\s*ngoding)\b/i],
    responses: [
      'Yang membuat app ini adalah YUSJUL 🧑‍💻 Jangan lupa like dan share ya!',
      'FutureStack dibuat oleh YUSJUL. Follow instagramnya di @m.yuusufj untuk update terbaru! 🌟',
      'Developer di balik FutureStack adalah YUSJUL — mahasiswa yang passionate di bidang web dev! 🚀',
    ],
  },

  // ─── BIOGRAFI / PROFIL ───────────────────────────────────────────────────
  {
    patterns: [/\b(biografi|profil|tentang\s*yusjul|siapa\s*yusjul|biodata)\b/i],
    responses: [
      'Yusjul adalah mahasiswa semester awal yang sedang belajar dan terus berkembang di dunia web development. Jangan lupa like dan share ya! 🌱',
      'Yusjul — Web developer muda, pecinta React & TypeScript, dan pemilik FutureStack. Cek IG-nya: @m.yuusufj 📸',
    ],
  },

  // ─── SOSIAL MEDIA ────────────────────────────────────────────────────────
  {
    patterns: [/\b(instagram|ig|sosmed|social\s*media|kontak|contact|follow)\b/i],
    responses: [
      'Kamu bisa temukan Yusjul di Instagram: @m.yuusufj 📸 Jangan lupa follow ya!',
      'Sosial media Yusjul: Instagram @m.yuusufj. Stay updated untuk fitur-fitur baru FutureStack! 🔔',
    ],
  },

  // ─── TASK / TODO ─────────────────────────────────────────────────────────
  {
    patterns: [/\b(task|tugas|todo|to-do|kerjaan|pekerjaan|assignment)\b/i],
    responses: [
      'Untuk mengelola task, kamu bisa buka panel Tasks di sidebar. Tambah task baru dengan tombol "+" dan atur prioritasnya! ✅',
      'Tips task management: pisahkan task besar jadi sub-task kecil. Gunakan label prioritas (High/Medium/Low) untuk fokus yang tepat.',
      'Kamu bisa drag & drop task untuk mengubah urutannya. Coba juga fitur filter untuk melihat task berdasarkan status atau prioritas!',
      'Gunakan metode Eisenhower Matrix: Urgent+Important = kerjakan sekarang, Important tapi tidak urgent = jadwalkan, Urgent tapi tidak important = delegasikan. 🎯',
      'Tandai task selesai dengan centang hijau, dan jangan lupa rayakan kemenangan kecil! 🎉',
    ],
  },

  // ─── PROJECT ─────────────────────────────────────────────────────────────
  {
    patterns: [/\b(project|proyek|projek|workspace|ruang\s*kerja)\b/i],
    responses: [
      'Untuk membuat project baru, klik "New Project" di dashboard. Setiap project bisa punya task, notes, dan timeline sendiri! 📁',
      'Tips: beri nama project yang deskriptif dan tambahkan deskripsi singkat agar mudah dikenali nanti.',
      'Organisir project berdasarkan client atau domain (frontend, backend, infra) untuk workflow yang lebih rapi! 🗂️',
      'Gunakan label warna untuk membedakan project berdasarkan prioritas atau kategori. Mata kamu akan berterima kasih! 🎨',
    ],
  },

  // ─── NOTES ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(note|notes|catatan|catat|dokumen|dokumentasi|memo)\b/i],
    responses: [
      'Fitur Notes bisa diakses dari sidebar. Kamu bisa tulis catatan dalam format markdown — cocok untuk dokumentasi atau brainstorming! 📝',
      'Tips notes: gunakan heading (#, ##) untuk struktur, dan code block (```) untuk snippet kode.',
      'Manfaatkan notes untuk menyimpan snippet kode yang sering dipakai, command-command penting, atau ide fitur baru! 💡',
      'Notes mendukung Markdown: **bold**, *italic*, - bullet list, > blockquote, dan [link](url). Powerful banget! 📄',
    ],
  },

  // ─── CODING / PROGRAMMING ────────────────────────────────────────────────
  {
    patterns: [/\b(coding|code|kode|program|ngoding|develop|pemrograman)\b/i],
    responses: [
      'Butuh bantuan coding? Ceritakan masalahnya, aku coba bantu sebisa mungkin! 💻',
      'Tips coding: selalu break down masalah besar jadi bagian kecil. Debug satu per satu, dan jangan lupa console.log! 😄',
      'Golden rule coding: "Make it work, make it right, make it fast." Jangan over-engineer dari awal! 🛠️',
      'Clean code itu investasi. Nama variabel yang jelas > komentar panjang yang menjelaskan kode jelek. 📖',
      'Kalau stuck lebih dari 30 menit, coba rubber duck debugging — jelaskan kode ke objek apapun di sekitarmu! 🦆',
    ],
  },

  // ─── JAVASCRIPT ──────────────────────────────────────────────────────────
  {
    patterns: [/\b(javascript|js\b|vanilla\s*js|es6|es2015|ecmascript)\b/i],
    responses: [
      'JavaScript tips: gunakan `const` by default, `let` kalau perlu reassign, hindari `var`. Arrow functions untuk callback singkat! ⚡',
      'Async/Await > Promise chain > Callback hell. Selalu handle error dengan try-catch! 🔄',
      'Destructuring, spread operator, optional chaining (?.) dan nullish coalescing (??) adalah fitur modern JS yang wajib kamu tahu! 🧰',
      'Hati-hati dengan `==` vs `===`. Selalu pakai triple equals untuk perbandingan yang aman! ⚠️',
      'Array methods favoritku: .map(), .filter(), .reduce(), .find(), .some(), .every(). Master ini dan hidupmu lebih mudah! 🎯',
    ],
  },

  // ─── TYPESCRIPT ──────────────────────────────────────────────────────────
  {
    patterns: [/\b(typescript|ts\b|tipe\s*data|interface\b|type\s*alias)\b/i],
    responses: [
      'TypeScript tips: aktifkan strict mode di tsconfig.json untuk keamanan tipe yang maksimal! 🛡️',
      'Gunakan `interface` untuk object shapes dan `type` untuk union/intersection types. Keduanya powerful dengan use case berbeda.',
      'Manfaatkan Generic Types untuk membuat fungsi/komponen yang reusable tapi tetap type-safe. `<T>` adalah temanmu! 🧬',
      'Utility types bawaan TS yang berguna: `Partial<T>`, `Required<T>`, `Pick<T,K>`, `Omit<T,K>`, `Readonly<T>`. Pelajari ini! 📚',
      'Selalu definisikan return type fungsi secara eksplisit. Membuat kode lebih readable dan bug lebih mudah terdeteksi. ✅',
    ],
  },

  // ─── REACT ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(react|jsx|tsx|hooks|usestate|useeffect|component|komponen)\b/i],
    responses: [
      'FutureStack dibangun dengan React + TypeScript + Vite. Stack yang solid untuk web app modern! ⚡',
      'React hooks tips: gunakan useState untuk state lokal, useEffect untuk side effects, useMemo/useCallback untuk optimasi performa.',
      'Hindari prop drilling yang dalam — pertimbangkan Context API atau state manager (Zustand, Jotai) untuk state yang shared. 🔗',
      'Ingat: React re-render terjadi saat state/props berubah. Gunakan React.memo() untuk komponen yang mahal untuk di-render. ⚡',
      'Custom hooks adalah cara elegant untuk reuse logic. Nama selalu mulai dengan "use" ya! e.g., `useLocalStorage`, `useFetch`. 🪝',
      'Key prop dalam list wajib unik dan stabil — jangan pakai index sebagai key kalau list bisa berubah urutannya! 🔑',
    ],
  },

  // ─── CSS / STYLING ───────────────────────────────────────────────────────
  {
    patterns: [/\b(css|styling|style|tailwind|sass|scss|flexbox|grid|animasi\s*css|desain)\b/i],
    responses: [
      'Tailwind CSS tips: gunakan @apply di CSS file untuk style yang berulang, jangan copy-paste class panjang! 🎨',
      'CSS Grid untuk layout dua dimensi, Flexbox untuk satu dimensi. Kombinasi keduanya = layout superpower! 📐',
      'Variabel CSS (--var-name) sangat berguna untuk theming. Bisa diakses dengan var(--var-name) di mana saja! 🌈',
      'Animasi CSS: gunakan `transform` dan `opacity` untuk animasi yang smooth (GPU-accelerated). Hindari animasi `width/height`! 🎬',
      'Mobile-first approach: mulai styling dari layar kecil, lalu tambahkan breakpoint untuk layar lebih besar. 📱➡️🖥️',
    ],
  },

  // ─── HTML ────────────────────────────────────────────────────────────────
  {
    patterns: [/\b(html|markup|semantic|aksesibilitas|accessibility|aria|a11y)\b/i],
    responses: [
      'Gunakan semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`. Baik untuk SEO dan aksesibilitas! 🏗️',
      'Alt text di gambar itu wajib! Gunakan deskripsi bermakna, bukan hanya "gambar" atau "image". ♿',
      'ARIA attributes (aria-label, aria-describedby, role) membantu screen reader memahami UI kamu. Accessibility bukan opsional! 🔊',
      'Hindari `<div>` soup — setiap elemen harus punya makna semantik yang jelas. 📝',
    ],
  },

  // ─── GIT & VERSION CONTROL ───────────────────────────────────────────────
  {
    patterns: [/\b(git|version\s*control|commit|branch|merge|pull\s*request|pr\b|repository|repo)\b/i],
    responses: [
      'Git workflow tips: buat branch untuk setiap fitur/bug fix. Jangan langsung commit ke main/master! 🌿',
      'Pesan commit yang baik: "[type]: deskripsi singkat" — contoh: "feat: tambah fitur dark mode" atau "fix: perbaiki bug login". 📝',
      'Command git penting:\n• `git status` — cek perubahan\n• `git stash` — simpan perubahan sementara\n• `git log --oneline` — lihat riwayat\n• `git rebase -i` — bersihkan history',
      'Selalu `git pull` sebelum mulai kerja untuk menghindari conflict! Dan push sesering mungkin sebagai backup. ☁️',
      'Gunakan `.gitignore` untuk mengecualikan file sensitif (`.env`, `node_modules/`, `dist/`). Jangan pernah commit API key! 🔒',
      'Git aliases bisa menghemat banyak waktu:\n`git config --global alias.st status`\n`git config --global alias.co checkout` 🚀',
    ],
  },

  // ─── ERROR / BUG / DEBUGGING ─────────────────────────────────────────────
  {
    patterns: [/\b(error|bug|masalah|problem|gagal|fail|crash|rusak|tidak\s*bisa|nggak\s*jalan|debug)\b/i],
    responses: [
      'Ada error? Coba ceritakan detail errornya — pesan error apa yang muncul? Aku coba bantu troubleshoot! 🔧',
      'Tips debugging: 1) Baca pesan error dengan teliti, 2) Cek console browser (F12), 3) Google pesan errornya, 4) Cek stack trace.',
      'Kalau app crash, coba clear cache browser (Ctrl+Shift+Delete) dan restart dev server.',
      'Debugging checklist:\n✅ Cek typo di nama variabel/fungsi\n✅ Pastikan import sudah benar\n✅ Cek tipe data (null/undefined check)\n✅ Isolasi masalah dengan console.log\n✅ Cek network tab untuk API error',
      'Error "Cannot read properties of undefined" → selalu cek apakah data sudah ada sebelum akses propertinya. Optional chaining (?.) sangat membantu! 🛡️',
      '"It works on my machine" — cek versi Node.js, package, dan environment variable di semua environment! 🌍',
    ],
  },

  // ─── CYBERSECURITY ───────────────────────────────────────────────────────
  {
    patterns: [/\b(security|keamanan|cybersecurity|hacker|hack|vulnerability|celah|xss|sql\s*injection|csrf|exploit)\b/i],
    responses: [
      '🔒 Security tips web dev:\n• Sanitasi semua input user (hindari XSS)\n• Gunakan parameterized queries (hindari SQL Injection)\n• Implement CSP headers\n• Selalu HTTPS di production',
      'XSS (Cross-Site Scripting) bisa dicegah dengan: escape output HTML, gunakan `textContent` bukan `innerHTML`, dan terapkan Content Security Policy (CSP). 🛡️',
      'OWASP Top 10 adalah checklist security wajib bagi setiap developer. Pelajari dan amankan app kamu dari celah-celah umum! 🔐',
      'Jangan pernah simpan password plain text! Gunakan bcrypt/argon2 untuk hashing. Dan pakai HTTPS untuk semua komunikasi. 🔑',
      'JWT tips: jangan simpan JWT di localStorage (rentan XSS). Gunakan httpOnly cookie sebagai gantinya! 🍪',
      'Environment variables (.env) adalah tempat menyimpan secret key, API key, dan kredensial. JANGAN commit file ini ke Git! ⚠️',
      'Rate limiting dan CAPTCHA membantu mencegah brute force attack. Selalu batasi percobaan login yang gagal! 🚫',
      'Dependency audit rutin itu penting! Jalankan `npm audit` secara berkala untuk cek vulnerability di package yang kamu pakai. 🔍',
    ],
  },

  // ─── PASSWORD & AUTENTIKASI ───────────────────────────────────────────────
  {
    patterns: [/\b(password|kata\s*sandi|autentikasi|authentication|login|logout|session|token|jwt|oauth)\b/i],
    responses: [
      'Password yang kuat: minimal 12 karakter, kombinasi huruf besar-kecil, angka, dan simbol. Gunakan password manager! 🔑',
      'Multi-factor Authentication (MFA/2FA) menambah lapisan keamanan ekstra. Aktifkan di semua akun pentingmu! 📱',
      'JWT (JSON Web Token) terdiri dari header, payload, dan signature. Verifikasi selalu di sisi server, bukan hanya client! 🎟️',
      'Session expiry yang wajar: access token ~15 menit, refresh token ~7 hari. Balance antara UX dan security! ⏱️',
      'OAuth 2.0 = standar autentikasi pihak ketiga (Login with Google, dll). Lebih aman dari menyimpan password sendiri. 🔗',
    ],
  },

  // ─── API ─────────────────────────────────────────────────────────────────
  {
    patterns: [/\b(api|rest|restful|endpoint|fetch|axios|http|request|response|json)\b/i],
    responses: [
      'REST API best practices: gunakan HTTP verb yang tepat (GET, POST, PUT, PATCH, DELETE) dan HTTP status code yang benar! 📡',
      'Selalu handle loading state dan error state di sisi client. Jangan asumsi API akan selalu sukses! ⏳',
      'Gunakan `async/await` dengan try-catch untuk fetch yang bersih:\n```js\ntry {\n  const res = await fetch(url);\n  const data = await res.json();\n} catch (err) {\n  console.error(err);\n}\n```',
      'Rate limiting API: implementasikan debounce/throttle untuk request yang dipicu user (search, autocomplete). ⚡',
      'Dokumentasikan API kamu dengan Swagger/OpenAPI. Tim (dan versi kamu di masa depan) akan berterima kasih! 📚',
    ],
  },

  // ─── DATABASE ────────────────────────────────────────────────────────────
  {
    patterns: [/\b(database|db|mysql|postgresql|postgres|mongodb|sqlite|query|sql|nosql|orm|prisma|supabase|firebase)\b/i],
    responses: [
      'SQL vs NoSQL: pilih SQL (PostgreSQL, MySQL) untuk data yang terstruktur dan butuh relasi kompleks. NoSQL untuk fleksibilitas dan skala besar. 🗄️',
      'Indexing di database sangat penting untuk query cepat. Tapi jangan over-index — setiap index memperlambat write! 📊',
      'Gunakan ORM (Prisma, Drizzle, TypeORM) untuk keamanan tipe dan menghindari SQL injection. Tapi tetap pahami SQL dasarnya! 🔧',
      'Selalu backup database secara rutin. Data yang hilang tidak bisa dikembalikan oleh kode secanggih apapun! 💾',
      'Supabase adalah alternatif Firebase yang open-source berbasis PostgreSQL. Sangat cocok untuk project React/Next.js! ⚡',
    ],
  },

  // ─── PERFORMA / PERFORMANCE ───────────────────────────────────────────────
  {
    patterns: [/\b(performa|performance|lambat|slow|optimasi|optimize|loading|cepat|speed|lighthouse)\b/i],
    responses: [
      'Optimasi React: gunakan React.memo(), useMemo(), dan useCallback() untuk mencegah re-render yang tidak perlu. 🚀',
      'Lazy loading: `React.lazy()` + `Suspense` untuk code splitting. Hanya load komponen yang dibutuhkan! ⚡',
      'Image optimization: gunakan format WebP, tentukan width dan height, dan implementasikan lazy loading gambar. 🖼️',
      'Core Web Vitals yang perlu diperhatikan: LCP (loading), FID/INP (interactivity), CLS (visual stability). Cek dengan Lighthouse! 📊',
      'Bundle analyzer (`vite-bundle-visualizer`) bisa membantu identifikasi package yang membengkak. Audit secara berkala! 🔍',
      'Memoize hasil kalkulasi yang mahal dengan useMemo. Jangan lupa dependencies array-nya yang tepat! 🧮',
    ],
  },

  // ─── VITE / BUILD TOOLS ───────────────────────────────────────────────────
  {
    patterns: [/\b(vite|webpack|bundler|build|rollup|esbuild|parcel|npm\s*run\s*build)\b/i],
    responses: [
      'Vite jauh lebih cepat dari Webpack untuk development berkat ES modules native. Cold start instant! ⚡',
      'Perintah Vite yang berguna:\n• `npm run dev` — development server\n• `npm run build` — production build\n• `npm run preview` — preview build lokal',
      'Konfigurasi Vite di `vite.config.ts`. Kamu bisa set alias path, proxy API, dan plugin di sini. 🔧',
      'Gunakan import.meta.env untuk environment variables di Vite. Prefix dengan VITE_ agar bisa diakses di browser! 🌍',
    ],
  },

  // ─── NODE.JS & NPM ───────────────────────────────────────────────────────
  {
    patterns: [/\b(node|nodejs|npm|npx|yarn|pnpm|package\.json|package\s*manager)\b/i],
    responses: [
      'pnpm > yarn > npm dari segi kecepatan dan efisiensi disk space. Pertimbangkan ganti ke pnpm! 🚀',
      'Selalu lock versi dependency dengan `package-lock.json` atau `pnpm-lock.yaml`. Hindari `^` untuk production deps! 🔒',
      'Perintah npm berguna:\n• `npm ci` — clean install di CI/CD\n• `npm audit fix` — perbaiki vulnerability\n• `npm outdated` — cek update\n• `npx` — jalankan package tanpa install',
      'Jangan install package sembarangan! Cek terlebih dulu: jumlah download/minggu, update terakhir, dan security audit-nya. 🕵️',
      'Node.js versi manager: gunakan `nvm` atau `fnm` untuk switch versi Node dengan mudah antar project. 🔄',
    ],
  },

  // ─── DEPLOYMENT ──────────────────────────────────────────────────────────
  {
    patterns: [/\b(deploy|deployment|hosting|vercel|netlify|cloudflare|vps|server|production|prod)\b/i],
    responses: [
      'Untuk project React/Next.js: Vercel adalah pilihan terbaik — zero config, preview deploy otomatis, dan edge network! 🚀',
      'Checklist sebelum deploy:\n✅ Environment variables sudah diset\n✅ Build sukses tanpa error\n✅ HTTPS aktif\n✅ Error monitoring terpasang\n✅ Backup database',
      'CI/CD pipeline otomatis deploy setiap kali push ke main. Setup dengan GitHub Actions untuk workflow yang efisien! 🔄',
      'Cloudflare Pages dan R2 adalah alternatif gratis yang powerful untuk static sites dan file storage! ☁️',
      'Monitoring production: pasang Sentry untuk error tracking dan Uptime monitoring agar tau kalau app down! 🔔',
    ],
  },

  // ─── DARK MODE ───────────────────────────────────────────────────────────
  {
    patterns: [/\b(dark\s*mode|light\s*mode|tema|theme|mode\s*gelap|mode\s*terang|warna\s*app)\b/i],
    responses: [
      'FutureStack mendukung dark mode! Cek ikon toggle tema di pojok atas untuk beralih antara mode terang dan gelap. 🌙☀️',
      'Tips implementasi dark mode: gunakan CSS variables untuk warna, dan `prefers-color-scheme` media query untuk deteksi otomatis! 🎨',
      'Dark mode tidak cuma estetika — membantu mengurangi kelelahan mata saat coding larut malam. Kamu sebaiknya pakai! 🌙',
    ],
  },

  // ─── KEYBOARD SHORTCUTS ──────────────────────────────────────────────────
  {
    patterns: [/\b(shortcut|hotkey|keyboard|pintasan|command|ctrl|cmd)\b/i],
    responses: [
      'Shortcut browser dev tools:\n• F12 — buka DevTools\n• Ctrl+Shift+I — inspect element\n• Ctrl+Shift+J — console\n• Ctrl+L — clear console 🖥️',
      'VS Code shortcuts berguna:\n• Ctrl+P — quick file open\n• Ctrl+Shift+P — command palette\n• Alt+Up/Down — pindah baris\n• Ctrl+/ — toggle komentar\n• Ctrl+D — select next occurrence ⌨️',
      'Shortcut umum:\n• Ctrl+Z — undo\n• Ctrl+Y — redo\n• Ctrl+S — save\n• Ctrl+F — find\n• Ctrl+H — find & replace 🔍',
    ],
  },

  // ─── POMODORO / TIME MANAGEMENT ───────────────────────────────────────────
  {
    patterns: [/\b(pomodoro|timer|fokus|focus|istirahat|break|manajemen\s*waktu|time\s*management)\b/i],
    responses: [
      'Teknik Pomodoro: 25 menit fokus, 5 menit istirahat. Setelah 4 sesi, istirahat panjang 15-30 menit. Simple tapi powerful! ⏱️',
      'FutureStack punya fitur timer built-in! Gunakan untuk sesi Pomodoro atau time-box task tertentu. ⏰',
      'Batasi notifikasi selama sesi fokus. Mode Do Not Disturb + headphone = produktivitas maksimal! 🎧',
      'Time blocking: alokasikan slot waktu spesifik untuk tipe pekerjaan tertentu (coding, meeting, review). Jadikan kebiasaan! 📅',
    ],
  },

  // ─── TIPS & SARAN ────────────────────────────────────────────────────────
  {
    patterns: [/\b(tips|saran|advice|suggest|rekomendasi|cara)\b/i],
    responses: [
      'Tips produktivitas: 🎯\n1. Mulai hari dengan review task\n2. Fokus 1 task besar per sesi\n3. Break tiap 25 menit (Pomodoro)\n4. Review progress di akhir hari',
      'Tips coding workflow:\n1. Commit sering dengan pesan jelas\n2. Tulis test sebelum fix bug\n3. Code review = belajar\n4. Dokumentasi itu investasi',
      'Tips belajar programming:\n• Build project nyata, bukan cuma tutorial\n• Baca kode orang lain (open source)\n• Ajarkan apa yang kamu pelajari\n• Konsisten > intensif 📚',
      'Tips kerja remote:\n• Buat dedicated workspace\n• Pakai aturan jam kerja yang jelas\n• Over-communicate dengan tim\n• Pisahkan waktu kerja dan istirahat 🏠',
    ],
  },

  // ─── MOTIVASI ────────────────────────────────────────────────────────────
  {
    patterns: [/\b(motivasi|semangat|capek|cape|lelah|males|malas|bosan|stuck|burnout|menyerah|give\s*up)\b/i],
    responses: [
      'Istirahat sebentar itu bukan kelemahan — itu strategi! Minum air, stretch, lalu balik lagi dengan semangat baru. 💪',
      'Setiap developer pernah stuck. Yang penting jangan menyerah! Break masalah jadi bagian kecil dan tackle satu per satu. 🚀',
      '"The best error message is the one that never shows up." — Kamu sudah di jalur yang benar! Terus coding! 🔥',
      'Fun fact: kebanyakan bug terselesaikan setelah istirahat dan melihat kode dengan mata segar. Coba jalan-jalan sebentar! 🌿',
      'Burnout itu nyata. Tanda-tandanya: kehilangan minat, kelelahan kronis, produktivitas turun. Kalau kamu merasakan ini, ambil istirahat yang cukup! 🧘',
      '"Setiap expert dulunya adalah pemula." Progress kamu mungkin tidak terlihat hari ini, tapi sangat nyata dalam jangka panjang! 📈',
      'Compare yourself to who you were yesterday, not to who someone else is today. Fokus pada pertumbuhanmu sendiri! 🌱',
    ],
  },

  // ─── BELAJAR PROGRAMMING ─────────────────────────────────────────────────
  {
    patterns: [/\b(belajar|learn|mulai\s*dari|pemula|beginner|newbie|resources|sumber\s*belajar|roadmap)\b/i],
    responses: [
      'Roadmap web developer 2024:\n1. HTML & CSS dasar\n2. JavaScript ES6+\n3. React/Vue\n4. TypeScript\n5. Node.js & API\n6. Database\n7. Git & Deployment 🗺️',
      'Sumber belajar gratis terbaik:\n• MDN Web Docs (referensi)\n• The Odin Project (kurikulum)\n• freeCodeCamp (latihan)\n• JavaScript.info (JS mendalam)\n• React docs (react.dev) 📚',
      'Build project nyata! Todo app → Weather app → Blog dengan auth → Fullstack app. Setiap project mengajarkan sesuatu yang baru! 🏗️',
      'Jangan tutorial hell! Setelah menonton tutorial, langsung coba rebuild sendiri tanpa lihat kode. Itu cara paling efektif belajar! 💪',
    ],
  },

  // ─── VS CODE ─────────────────────────────────────────────────────────────
  {
    patterns: [/\b(vscode|vs\s*code|editor|ide|extension|plugin\s*vscode|intellisense)\b/i],
    responses: [
      'Extension VS Code wajib untuk web dev:\n• ESLint — linting\n• Prettier — formatting\n• GitLens — git history\n• Thunder Client — test API\n• Tailwind CSS IntelliSense ⚡',
      'VS Code tips: buka settings.json (Ctrl+Shift+P → "Open Settings JSON") untuk konfigurasi yang lebih detail dan portabel! ⚙️',
      'Multi-cursor editing: Alt+Click untuk tambah cursor, Ctrl+D untuk select occurrence berikutnya. Game changer buat editing massal! ✨',
      'Emmet di VS Code sangat powerful untuk HTML. Coba ketik `div.container>ul>li*5` lalu tekan Tab! 🚀',
    ],
  },

  // ─── TESTING ─────────────────────────────────────────────────────────────
  {
    patterns: [/\b(testing|test|unit\s*test|e2e|jest|vitest|cypress|playwright|tdd)\b/i],
    responses: [
      'Testing pyramid: banyak unit test (cepat), beberapa integration test, sedikit E2E test (lambat tapi komprehensif). 🔺',
      'Vitest adalah testing framework yang natively terintegrasi dengan Vite — super cepat dan mudah setup! ⚡',
      'TDD (Test-Driven Development): tulis test dulu, baru kode. Terasa aneh awalnya, tapi menghasilkan kode yang lebih clean! 🔄',
      'Jest/Vitest tips: gunakan `describe` untuk grup test, `it/test` untuk satu test case, `beforeEach` untuk setup. 🧪',
      'Cypress dan Playwright adalah pilihan terbaik untuk E2E testing. Playwright lebih cepat dan support multi-browser natively! 🌐',
    ],
  },

  // ─── OPEN SOURCE ─────────────────────────────────────────────────────────
  {
    patterns: [/\b(open\s*source|github|gitlab|kontribusi|contribute|fork|pull\s*request|star\s*repo)\b/i],
    responses: [
      'Berkontribusi ke open source itu cara terbaik belajar dari kode production! Mulai dari issue berlabel "good first issue". 🌟',
      'GitHub profile yang bagus: README.md yang menarik, pinned repositories terbaik, kontribusi aktif (green squares!). 🟩',
      'Fork → Clone → Branch → Code → Commit → Push → Pull Request. Itu alur kontribusi open source yang standar! 🔄',
      'Baca CONTRIBUTING.md dan CODE_OF_CONDUCT.md sebelum berkontribusi. Setiap project punya aturannya sendiri! 📜',
    ],
  },

  // ─── DOCKER / CONTAINER ───────────────────────────────────────────────────
  {
    patterns: [/\b(docker|container|kubernetes|k8s|docker-compose|image\s*docker|dockerfile)\b/i],
    responses: [
      'Docker memastikan "works on my machine" juga works di production. Konsistensi environment = less bugs! 🐳',
      'Perintah Docker dasar:\n• `docker build -t nama .` — build image\n• `docker run -p 3000:3000 nama` — jalankan\n• `docker ps` — lihat container aktif\n• `docker compose up` — jalankan multi-service',
      'Dockerfile best practices: gunakan multi-stage build, layer caching yang optimal, dan jangan run sebagai root! 🛡️',
      'Docker Compose sangat berguna untuk development — satu file YAML untuk orkestrasi frontend, backend, dan database! 📋',
    ],
  },

  // ─── CLOUD ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(cloud|aws|gcp|azure|firebase|supabase|s3|lambda|serverless)\b/i],
    responses: [
      'Big 3 cloud provider: AWS (market leader), Google Cloud (AI/ML terbaik), Azure (enterprise). Pilih sesuai kebutuhan! ☁️',
      'Untuk startup/indie dev: Vercel + Supabase + Cloudflare adalah stack cloud yang powerful dan hemat biaya! 💰',
      'Serverless functions (Vercel Edge, AWS Lambda) ideal untuk API yang tidak butuh server 24/7. Pay-per-request! ⚡',
      'Firebase Realtime Database atau Firestore sangat cocok untuk app yang butuh real-time sync antar device! 🔄',
    ],
  },

  // ─── AI / MACHINE LEARNING ───────────────────────────────────────────────
  {
    patterns: [/\b(ai|artificial\s*intelligence|machine\s*learning|ml\b|gpt|llm|openai|claude|chatgpt|copilot|gemini)\b/i],
    responses: [
      'AI tools untuk developer: GitHub Copilot, Cursor, Claude, ChatGPT. Bisa percepat coding, tapi tetap pahami kode yang digenerate! 🤖',
      'Prompt engineering tips: be specific, provide context, give examples, dan iterasi sampai dapat output yang tepat! 💬',
      'AI tidak menggantikan developer — tapi developer yang pakai AI akan menggantikan yang tidak. Manfaatkan tools ini! 🚀',
      'Hati-hati dengan AI-generated code: selalu review, test, dan pahami kode sebelum dipakai di production! ⚠️',
    ],
  },

  // ─── WAKTU ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(jam\s*berapa|waktu|tanggal|hari\s*apa|date|time|sekarang)\b/i],
    responses: [
      `Sekarang ${new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}, jam ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}. ⏰`,
      `Waktu saat ini: ${new Date().toLocaleTimeString('id-ID')} — Semangat produktif! ⚡`,
    ],
  },

  // ─── SIAPA KAMU (BOT) ────────────────────────────────────────────────────
  {
    patterns: [/\b(siapa\s*(kamu|lo|lu|anda)|nama\s*(kamu|mu)|who\s*are\s*you|kamu\s*ini\s*apa|bot\s*apa)\b/i],
    responses: [
      'Aku FutureStack Assistant! 🤖 Aku chatbot offline yang siap membantu kamu navigasi app ini dan menjawab pertanyaan seputar coding & produktivitas.',
      'Namaku FutureStack Assistant. Aku berjalan offline — jadi selalu siap kapanpun tanpa perlu koneksi API! ⚡',
      'Aku chatbot built-in FutureStack, dibuat oleh Yusjul. Spesialis di developer tools, coding tips, dan produktivitas! 🧑‍💻',
    ],
  },

  // ─── CUACA ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(cuaca|weather|hujan|panas|cerah|mendung|dingin)\b/i],
    responses: [
      'Aku chatbot offline jadi nggak bisa cek cuaca real-time 😅 Tapi semoga hari ini cerah dan produktif! ☀️',
      'Wah, untuk cuaca kamu bisa cek weather app ya! Aku spesialisnya di coding dan task management. 😄',
      'Hujan = waktu perfect buat fokus coding! Nyalakan lo-fi music dan masuk ke zone! 🌧️💻',
    ],
  },

  // ─── MAKANAN / MINUM ─────────────────────────────────────────────────────
  {
    patterns: [/\b(makan|lapar|minum|kopi|coffee|snack|ngemil|ngopi|capuccino|latte)\b/i],
    responses: [
      'Jangan skip makan! Otak butuh energi untuk coding yang optimal. Coba makan dulu baru lanjut coding! 🍱',
      'Kopi memang teman coding sejati! Tapi jangan lebih dari 3-4 cangkir per hari ya — hidrasi dengan air putih juga penting! ☕💧',
      'Snack sehat untuk programmer: kacang-kacangan, buah, dark chocolate. Hindari junk food yang bikin ngantuk! 🥜',
    ],
  },

  // ─── MUSIK ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(musik|music|lagu|song|playlist|lo-fi|lofi|spotify|headphone)\b/i],
    responses: [
      'Lo-fi hip hop adalah soundtrack coding paling populer! Rytme monoton-nya membantu otak masuk ke mode fokus. 🎵',
      'Playlist coding recommendation:\n• Lo-fi Girl (YouTube)\n• Brain.fm (fokus saintifik)\n• Synthwave playlist\n• Ambient music',
      'Penelitian menunjukkan musik instrumental meningkatkan fokus saat coding. Tapi musik dengan lirik bisa mengganggu untuk task kompleks! 🧠',
    ],
  },

  // ─── WORK-LIFE BALANCE ───────────────────────────────────────────────────
  {
    patterns: [/\b(work.life|balance|kehidupan|tidur|sleep|olahraga|exercise|kesehatan|health)\b/i],
    responses: [
      'Work-life balance itu penting! Kode terbaik ditulis saat kamu fresh, bukan saat kelelahan dan terpaksa. 😴',
      'Tidur 7-9 jam bukan kemewahan — itu investasi produktivitas. Kekurangan tidur = bug rate lebih tinggi! 🛌',
      'Aturan 20-20-20 untuk kesehatan mata: setiap 20 menit, lihat sesuatu berjarak 20 kaki selama 20 detik. 👀',
      'Duduk seharian itu berbahaya! Set reminder untuk berdiri dan stretch setiap jam. Invest di standing desk kalau bisa! 🧘',
    ],
  },

  // ─── FREELANCE ───────────────────────────────────────────────────────────
  {
    patterns: [/\b(freelance|client|klien|proyek\s*lepas|rate|harga|invoice|kontrak|contract)\b/i],
    responses: [
      'Tips freelance: selalu buat kontrak tertulis sebelum mulai project. Tentukan scope, deadline, dan payment terms yang jelas! 📝',
      'Rate freelance: hitung biaya hidup bulananmu, bagi hari kerja produktif, lalu tambahkan margin profit. Jangan jual terlalu murah! 💰',
      'Invoice tips: kirim invoice segera setelah milestone tercapai, set payment term 7-14 hari, dan track dengan tool seperti Wave atau Bonsai. 📊',
      'Manajemen klien: selalu dokumentasikan semua request via email/chat. "Kalau tidak tertulis, tidak terjadi." 📧',
    ],
  },

  // ─── KARIR ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(karir|career|gaji|salary|interview|magang|internship|kerja|job|hire|rekrut)\b/i],
    responses: [
      'Portfolio > Gelar. Buat 3-5 project yang solid dan deploy, itu lebih meyakinkan dari CV biasa! 🏗️',
      'Persiapan interview teknis: LeetCode, sistem design, dan pastikan bisa jelaskan project portfolio-mu dengan baik! 📚',
      'Soft skills yang dicari perusahaan tech: komunikasi, problem-solving, teamwork, dan growth mindset. Jangan cuma fokus hard skills! 🤝',
      'LinkedIn yang baik: foto profesional, headline menarik, deskripsi dengan kata kunci relevan, dan aktif posting tentang hal yang kamu pelajari! 💼',
    ],
  },

  // ─── MAKASSAR / INDONESIA ────────────────────────────────────────────────
  {
    patterns: [/\b(makassar|sulawesi|indonesia|lokal|nusantara|indo)\b/i],
    responses: [
      'Ekosistem tech Indonesia terus berkembang pesat! Banyak startup lokal butuh developer handal. Kamu di jalur yang tepat! 🇮🇩',
      'Developer dari Makassar? Keren! Komunitas tech lokal seperti GDG, JakartaJS, dan lokal meetup bisa jadi networking yang bagus. 🌏',
      'Bangga jadi developer Indonesia! Kontribusi ke open source global dari sini, tunjukkan talenta lokal! 🚀',
    ],
  },

  // ─── RESPONSIF / MOBILE ───────────────────────────────────────────────────
  {
    patterns: [/\b(responsif|responsive|mobile|tablet|breakpoint|viewport|media\s*query)\b/i],
    responses: [
      'Mobile-first design: desain untuk layar kecil dulu, lalu tambahkan complexity untuk layar yang lebih besar! 📱',
      'Breakpoints Tailwind CSS: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px). Familiar dulu sama ini! 📐',
      'Test responsiveness: Chrome DevTools (F12 → toggle device toolbar) atau tes langsung di device asli untuk hasil akurat. 🔍',
    ],
  },

  // ─── REGEX ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(regex|regular\s*expression|regexp|pattern\s*match)\b/i],
    responses: [
      'Regex itu powerful tapi kompleks! Gunakan regex101.com untuk test dan debug regex kamu secara visual. 🔍',
      'Regex tips dasar:\n• `.` — any character\n• `*` — 0 or more\n• `+` — 1 or more\n• `?` — 0 or 1\n• `^` — start, `$` — end\n• `\\d` — digit, `\\w` — word char',
      '"Some people, when confronted with a problem, think: I know, I\'ll use regular expressions. Now they have two problems." 😄 Tapi tetap, regex itu wajib dikuasai!',
    ],
  },

  // ─── PUJIAN KE BOT ───────────────────────────────────────────────────────
  {
    patterns: [/\b(keren|bagus|mantap|canggih|hebat|awesome|great|cool|pintar|jago)\b/i],
    responses: [
      'Makasih! 😊 Aku akan terus belajar dan berkembang. Masukan kamu sangat berarti!',
      'Terima kasih pujiannya! Itu karena Yusjul yang membuatku dengan penuh cinta dan kopi ☕😄',
      'Aww, terima kasih! Semoga FutureStack terus membantu produktivitasmu! 🚀',
    ],
  },

  // ─── KRITIK / FEEDBACK ───────────────────────────────────────────────────
  {
    patterns: [/\b(jelek|buruk|kurang|feedback|saran\s*perbaikan|improve|fitur\s*baru)\b/i],
    responses: [
      'Masukan kamu sangat berharga! Silakan sampaikan ke Yusjul lewat Instagram @m.yuusufj. Setiap feedback membantu FutureStack jadi lebih baik! 💪',
      'Kritik yang membangun = bahan bakar improvement! Terima kasih sudah mau kasih feedback. Aku akan forward ke developer! 📝',
    ],
  },

  // ─── KEBOSANAN / FUN ─────────────────────────────────────────────────────
  {
    patterns: [/\b(bored|bosen|iseng|fun|lucu|joke|candaan|hiburan|game)\b/i],
    responses: [
      'Mau dengar joke programmer? "Why do programmers prefer dark mode? Because light attracts bugs!" 🐛😄',
      'Fun fact: rata-rata programmer menulis 10-12 baris kode yang efektif per hari — sisanya debugging dan googling! 😅',
      'Easter egg: coba ketik "Konami Code" (↑↑↓↓←→←→BA) di banyak website developer... sesuatu yang lucu mungkin terjadi! 🎮',
      '"99 little bugs in the code, 99 little bugs... take one down, patch it around... 127 little bugs in the code." 😂',
    ],
  },

  // ─── BYE ─────────────────────────────────────────────────────────────────
  {
    patterns: [/\b(bye|dadah|sampai\s*jumpa|see\s*you|selamat\s*tinggal|pamit|cabut|ciao|later)\b/i],
    responses: [
      'Dadah! 👋 Semoga harimu produktif. Aku di sini kalau butuh bantuan lagi!',
      'See you! Jangan lupa commit kode sebelum tutup laptop ya! 😄',
      'Sampai jumpa! Happy coding! 🚀',
      'Ciao! Semoga semua task selesai sebelum deadline! ✅',
      'Bye! Ingat: istirahat yang cukup itu penting. Selamat beristirahat! 😴',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ██████████████████   DATA SCIENCE & DATA ANALYTICS   ██████████████████████
  // ════════════════════════════════════════════════════════════════════════════

  // ─── DATA SCIENCE UMUM ───────────────────────────────────────────────────
  {
    patterns: [/\b(data\s*science|data\s*scientist|ilmu\s*data|science\s*data|bidang\s*data)\b/i],
    responses: [
      'Data Science adalah bidang interdisipliner yang menggabungkan statistik, pemrograman, dan domain knowledge untuk mengekstrak insight dari data! 📊',
      'Roadmap Data Scientist:\n1️⃣ Statistika & Matematika dasar\n2️⃣ Python / R\n3️⃣ SQL & Database\n4️⃣ Data Wrangling (Pandas)\n5️⃣ Visualisasi data\n6️⃣ Machine Learning\n7️⃣ Deep Learning\n8️⃣ Deploy model ke production',
      'Data Science lifecycle:\n🔍 Business Understanding → 📦 Data Collection → 🧹 Data Cleaning → 🔬 EDA → 🤖 Modeling → 📈 Evaluation → 🚀 Deployment → 🔄 Monitoring',
      'Tools data scientist modern: Python, Jupyter Notebook, Pandas, NumPy, Scikit-learn, TensorFlow/PyTorch, Tableau/Power BI, SQL, Spark! 🛠️',
      '"Data is the new oil" — tapi seperti minyak mentah, data perlu diolah dulu sebelum jadi berharga! ⛽➡️💎',
    ],
  },

  // ─── DATA ANALYST ────────────────────────────────────────────────────────
  {
    patterns: [/\b(data\s*anal(yst|ysis|itik|isis)|analis\s*data|analisis\s*data|business\s*intel)\b/i],
    responses: [
      'Data Analyst vs Data Scientist:\n📊 Analyst → fokus pada "apa yang terjadi?" (descriptive & diagnostic)\n🤖 Scientist → fokus pada "apa yang akan terjadi?" (predictive & prescriptive)',
      'Skill wajib Data Analyst:\n✅ SQL (query data dari database)\n✅ Excel/Google Sheets (pivot table, VLOOKUP)\n✅ Python atau R (analisis lebih dalam)\n✅ Visualisasi (Tableau, Power BI, Matplotlib)\n✅ Statistika dasar\n✅ Business communication',
      'Tahapan analisis data:\n1. Define question/problem\n2. Collect data\n3. Clean & preprocess\n4. Explore (EDA)\n5. Analyze\n6. Visualize\n7. Communicate insight\n8. Recommend action 🎯',
      'KPI yang sering dianalisis: conversion rate, churn rate, ARPU, DAU/MAU, retention rate, NPS. Pahami metric bisnis sebelum analisis data! 📈',
      'Portofolio Data Analyst yang baik: project dengan dataset nyata, cerita insight yang jelas, dan visualisasi yang bersih. Kaggle dan GitHub adalah tempat terbaik! 💼',
    ],
  },

  // ─── PYTHON UNTUK DATA ────────────────────────────────────────────────────
  {
    patterns: [/\b(python|py\b|anaconda|conda|pip\s*install|virtual\s*env|venv)\b/i],
    responses: [
      'Python adalah bahasa #1 untuk data science! Ekosistemnya sangat kaya: Pandas, NumPy, Matplotlib, Scikit-learn, TensorFlow, PyTorch. 🐍',
      'Setup Python untuk data science:\n```bash\npip install pandas numpy matplotlib seaborn scikit-learn jupyter\n```\nAtau pakai Anaconda untuk semua-dalam-satu! 📦',
      'Python tips untuk data:\n• List comprehension untuk transformasi cepat\n• f-strings untuk format output\n• `with open()` untuk baca file\n• `enumerate()` dan `zip()` untuk iterasi elegan\n• `*args` dan `**kwargs` untuk fungsi fleksibel 🐍',
      'Virtual environment itu wajib! Gunakan `python -m venv venv` atau conda environment untuk isolasi dependencies antar project. 🔒',
      'Anaconda vs pip: Anaconda cocok untuk data science (sudah include banyak library), pip untuk developer yang suka kontrol penuh. Keduanya valid! ⚖️',
    ],
  },

  // ─── PANDAS ──────────────────────────────────────────────────────────────
  {
    patterns: [/\b(pandas|dataframe|df\b|series\s*pandas|iloc|loc\b|groupby|merge\s*df|concat\s*df)\b/i],
    responses: [
      'Pandas adalah library wajib data science Python! DataFrame = tabel data yang powerful. Import dengan `import pandas as pd`. 🐼',
      'Operasi Pandas yang paling sering dipakai:\n```python\ndf.head()        # lihat 5 baris pertama\ndf.info()        # ringkasan tipe data\ndf.describe()    # statistik deskriptif\ndf.shape         # dimensi (rows, cols)\ndf.isnull().sum() # cek missing values\n```',
      'Pandas selection:\n• `df["kolom"]` — pilih satu kolom\n• `df[["kol1","kol2"]]` — multi kolom\n• `df.loc[baris, kolom]` — label-based\n• `df.iloc[0:5, 0:3]` — integer-based\n• `df[df["nilai"] > 100]` — filter kondisi 🎯',
      'Pandas groupby adalah salah satu operasi terpenting:\n```python\ndf.groupby("kategori")["nilai"].agg(["mean","sum","count"])\n```\nSangat berguna untuk analisis segmentasi! 📊',
      'Merge DataFrame seperti SQL JOIN:\n```python\npd.merge(df1, df2, on="id", how="left")  # left join\npd.merge(df1, df2, on="id", how="inner") # inner join\n```',
      'Pandas tips performa: gunakan `vectorized operations` bukan loop, `query()` untuk filter yang readable, dan `category` dtype untuk kolom string berulang! ⚡',
      'Data cleaning dengan Pandas:\n```python\ndf.dropna()                    # hapus baris null\ndf.fillna(df.mean())           # isi null dengan mean\ndf.drop_duplicates()           # hapus duplikat\ndf["kol"].str.strip()          # hapus whitespace\ndf["kol"].str.lower()          # lowercase\n```',
    ],
  },

  // ─── NUMPY ───────────────────────────────────────────────────────────────
  {
    patterns: [/\b(numpy|np\b|array\s*numpy|ndarray|linspace|arange|reshape|broadcasting)\b/i],
    responses: [
      'NumPy adalah fondasi komputasi numerik Python. Array NumPy jauh lebih cepat dari Python list biasa karena operasinya di-vectorized! 🔢',
      'NumPy essentials:\n```python\nimport numpy as np\narr = np.array([1, 2, 3, 4, 5])\nnp.zeros((3, 3))     # matrix nol\nnp.ones((2, 4))      # matrix satu\nnp.random.randn(100) # distribusi normal\nnp.arange(0, 10, 2)  # [0,2,4,6,8]\nnp.linspace(0,1,50)  # 50 titik 0-1\n```',
      'Broadcasting NumPy: operasi antar array dengan shape berbeda secara otomatis disesuaikan. Sangat powerful untuk komputasi matrix! 📐\n```python\narr + 10          # tambah 10 ke semua elemen\narr * 2           # kali 2 semua elemen\narr ** 2          # kuadrat semua elemen\n```',
      'NumPy untuk statistik:\n```python\nnp.mean(arr)      # rata-rata\nnp.median(arr)    # median\nnp.std(arr)       # standar deviasi\nnp.var(arr)       # varians\nnp.percentile(arr, 75) # persentil ke-75\nnp.corrcoef(x, y) # korelasi\n```',
      'Reshape dan transpose:\n```python\narr.reshape(4, 5)  # ubah bentuk\narr.T              # transpose matrix\narr.flatten()      # jadikan 1D\nnp.concatenate([a, b], axis=0) # gabung\n```',
    ],
  },

  // ─── JUPYTER NOTEBOOK ────────────────────────────────────────────────────
  {
    patterns: [/\b(jupyter|notebook|ipynb|colab|google\s*colab|jupyter\s*lab|magic\s*command)\b/i],
    responses: [
      'Jupyter Notebook adalah environment interaktif terbaik untuk eksplorasi data! Kode + visualisasi + teks dalam satu dokumen. 📓',
      'Jupyter keyboard shortcuts:\n• `Shift+Enter` — run cell & next\n• `Ctrl+Enter` — run cell\n• `A` — insert cell above\n• `B` — insert cell below\n• `DD` — delete cell\n• `M` — ubah ke Markdown\n• `Y` — ubah ke Code ⌨️',
      'Jupyter magic commands berguna:\n```python\n%time kode()       # ukur waktu eksekusi\n%timeit kode()     # benchmark berulang\n%matplotlib inline # tampilkan plot inline\n%%sql             # jalankan SQL query\n!pip install lib   # install package\n```',
      'Google Colab adalah Jupyter Notebook gratis di cloud dengan GPU/TPU gratis! Perfect untuk belajar ML tanpa setup lokal. ☁️🆓',
      'JupyterLab adalah versi modern Jupyter dengan interface lebih lengkap — bisa buka banyak notebook, file browser, dan terminal sekaligus! 🖥️',
      'Tips Jupyter: pisahkan EDA, preprocessing, modeling, dan evaluasi dalam sections yang jelas. Restart & Run All secara berkala untuk pastikan kode berjalan berurutan! ✅',
    ],
  },

  // ─── MATPLOTLIB ──────────────────────────────────────────────────────────
  {
    patterns: [/\b(matplotlib|pyplot|plt\b|plot\b|scatter|histogram|bar\s*chart|line\s*chart|figure|axes)\b/i],
    responses: [
      'Matplotlib adalah library visualisasi dasar Python. Sangat fleksibel tapi verbose — biasanya dipakai bersama Seaborn! 📉',
      'Plot dasar Matplotlib:\n```python\nimport matplotlib.pyplot as plt\n\nplt.plot(x, y)            # line chart\nplt.scatter(x, y)         # scatter plot\nplt.bar(kategori, nilai)  # bar chart\nplt.hist(data, bins=30)   # histogram\nplt.boxplot(data)         # box plot\nplt.pie(nilai, labels=lb) # pie chart\nplt.show()\n```',
      'Customisasi plot Matplotlib:\n```python\nplt.figure(figsize=(10, 6))\nplt.title("Judul", fontsize=16)\nplt.xlabel("Sumbu X")\nplt.ylabel("Sumbu Y")\nplt.legend()\nplt.grid(True, alpha=0.3)\nplt.tight_layout()\n```',
      'Subplot untuk banyak plot sekaligus:\n```python\nfig, axes = plt.subplots(2, 2, figsize=(12, 8))\naxes[0,0].plot(x, y)\naxes[0,1].scatter(x, y)\naxes[1,0].hist(data)\naxes[1,1].bar(kat, val)\nplt.tight_layout()\n```',
      'Simpan plot ke file:\n```python\nplt.savefig("plot.png", dpi=300, bbox_inches="tight")\nplt.savefig("plot.svg")  # format vektor\n```',
    ],
  },

  // ─── SEABORN ─────────────────────────────────────────────────────────────
  {
    patterns: [/\b(seaborn|sns\b|heatmap|pairplot|violinplot|boxplot\s*sns|distplot|catplot)\b/i],
    responses: [
      'Seaborn membuat visualisasi statistik menjadi indah dengan sedikit kode. Built on top of Matplotlib dengan desain yang lebih bersih! 🎨',
      'Plot Seaborn yang paling berguna:\n```python\nimport seaborn as sns\n\nsns.heatmap(df.corr(), annot=True)  # korelasi matrix\nsns.pairplot(df)                     # semua kombinasi scatter\nsns.boxplot(x="kol", y="val", data=df)\nsns.violinplot(x="kol", y="val", data=df)\nsns.histplot(data, kde=True)         # histogram + KDE\nsns.scatterplot(x="x", y="y", hue="grup", data=df)\n```',
      'Seaborn themes:\n```python\nsns.set_theme(style="whitegrid")  # grid putih\nsns.set_theme(style="darkgrid")   # grid gelap\nsns.set_theme(style="ticks")\nsns.set_palette("husl")           # palette warna\n```',
      'Seaborn untuk analisis distribusi:\n```python\nsns.histplot(df["kolom"], kde=True, bins=30)\nsns.kdeplot(df["kolom"], shade=True)\nsns.ecdfplot(df["kolom"])  # cumulative distribution\n```',
      'FacetGrid untuk visualisasi per grup:\n```python\ng = sns.FacetGrid(df, col="kategori", row="tipe")\ng.map(sns.histplot, "nilai")\n```',
    ],
  },

  // ─── PLOTLY & VISUALISASI INTERAKTIF ─────────────────────────────────────
  {
    patterns: [/\b(plotly|dash\b|bokeh|altair|visualisasi\s*interaktif|interactive\s*plot|chartjs\s*data)\b/i],
    responses: [
      'Plotly membuat chart interaktif dengan Python! Hover, zoom, pan — perfect untuk dashboard dan presentasi! 📊✨',
      'Plotly Express (px) sangat mudah dipakai:\n```python\nimport plotly.express as px\n\npx.scatter(df, x="x", y="y", color="grup", size="nilai")\npx.bar(df, x="kategori", y="total", color="segmen")\npx.line(df, x="tanggal", y="revenue")\npx.histogram(df, x="kolom", nbins=50)\npx.box(df, x="grup", y="nilai")\npx.choropleth(df, locations="negara", color="nilai")\n```',
      'Plotly Dash adalah framework untuk membuat web dashboard analitik dengan Python — tanpa JavaScript! 🖥️',
      'Streamlit adalah alternatif Dash yang lebih simpel untuk deploy data app:\n```python\nimport streamlit as st\nst.title("Dashboard Analitik")\nst.line_chart(df)\nst.dataframe(df)\n```\nJalankan dengan `streamlit run app.py`! 🚀',
    ],
  },

  // ─── STATISTIKA DESKRIPTIF ────────────────────────────────────────────────
  {
    patterns: [/\b(statistik|statistika|statistic|mean|median|modus|mode\b|standar\s*deviasi|std|varians|variance|distribusi|skewness|kurtosis)\b/i],
    responses: [
      'Statistika deskriptif merangkum data:\n📊 Mean (rata-rata) — sensitif terhadap outlier\n📊 Median (nilai tengah) — robust terhadap outlier\n📊 Modus (paling sering muncul) — untuk data kategorik\n📊 Std Dev — seberapa tersebar data\n📊 Range = max - min',
      'Kapan pakai mean vs median?\n• Data normal/simetris → pakai mean\n• Data skewed/ada outlier → pakai median\n• Contoh: median lebih tepat untuk gaji (karena distribusi sangat skewed ke kanan!) 💰',
      'Distribusi data:\n• Normal (Gaussian) — kurva lonceng, paling umum\n• Skewed right/left — ekor ke kanan/kiri\n• Bimodal — dua puncak\n• Uniform — semua nilai sama sering\nCek dengan histogram + KDE! 📈',
      'Outlier detection:\n• Z-score > 3 atau < -3 → outlier\n• IQR method: < Q1-1.5*IQR atau > Q3+1.5*IQR\n• Visualisasi dengan boxplot\n```python\nz_scores = np.abs(stats.zscore(df["kolom"]))\ndf_clean = df[z_scores < 3]\n```',
      'Five-number summary: Min, Q1 (25%), Median (50%), Q3 (75%), Max. Tampilkan dengan `df.describe()` di Pandas! 📋',
    ],
  },

  // ─── STATISTIKA INFERENSIAL ───────────────────────────────────────────────
  {
    patterns: [/\b(hipotesis|hypothesis|p.value|t.test|chi.square|anova|confidence\s*interval|significance|signifikan|uji\s*statistik)\b/i],
    responses: [
      'Hypothesis testing framework:\n1️⃣ Rumuskan H0 (null) dan H1 (alternative)\n2️⃣ Tentukan significance level (α = 0.05)\n3️⃣ Pilih uji statistik yang tepat\n4️⃣ Hitung p-value\n5️⃣ Jika p < α → tolak H0\n6️⃣ Interpret dalam konteks bisnis! 🔬',
      'Pilih uji statistik yang tepat:\n• 1 grup, data normal → One-sample t-test\n• 2 grup, data normal → Independent t-test\n• 2 grup berpasangan → Paired t-test\n• 3+ grup → ANOVA\n• Data kategorik → Chi-square test\n• Data tidak normal → Mann-Whitney U (non-parametrik)',
      'p-value yang sering disalahpahami:\n❌ "p-value = probabilitas H0 benar"\n✅ "p-value = probabilitas mendapat data seekstrem ini jika H0 benar"\n\nSelalu report effect size (Cohen\'s d), bukan hanya p-value! 📏',
      'Confidence Interval (CI):\n```python\nfrom scipy import stats\nmean, se = np.mean(data), stats.sem(data)\nci = stats.t.interval(0.95, len(data)-1, mean, se)\nprint(f"95% CI: ({ci[0]:.2f}, {ci[1]:.2f})")\n```',
      'A/B Testing di bisnis:\n1. Tentukan metric utama (conversion rate, ARPU)\n2. Hitung sample size yang dibutuhkan\n3. Randomisasi user ke group A dan B\n4. Jalankan cukup lama\n5. Uji dengan t-test atau chi-square\n6. Keputusan berdasarkan statistical significance + practical significance! 🧪',
    ],
  },

  // ─── KORELASI & REGRESI ───────────────────────────────────────────────────
  {
    patterns: [/\b(korelasi|correlation|regresi|regression|linear\s*regression|logistic\s*regression|pearson|spearman|r.squared|multicollinearity)\b/i],
    responses: [
      'Korelasi Pearson mengukur hubungan linear antar variabel numerik (-1 hingga +1):\n• r = 1 → korelasi positif sempurna\n• r = 0 → tidak ada korelasi linear\n• r = -1 → korelasi negatif sempurna\n⚠️ Ingat: korelasi ≠ kausalitas! 🔗',
      'Linear Regression dengan Scikit-learn:\n```python\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\nprint(f"R² = {model.score(X_test, y_test):.4f}")\nprint(f"Koefisien: {model.coef_}")\n```',
      'Logistic Regression untuk klasifikasi biner:\n```python\nfrom sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression(max_iter=1000)\nmodel.fit(X_train, y_train)\ny_pred = model.predict(X_test)\n```',
      'Interpretasi R²:\n• R² = 0.9 → model menjelaskan 90% variasi data\n• R² tinggi belum tentu baik (bisa overfitting!)\n• Adjusted R² lebih baik untuk multiple regression karena penalizes fitur tambahan 📊',
      'Multicollinearity (korelasi antar fitur independen) menjadi masalah di regresi. Cek dengan VIF:\n```python\nfrom statsmodels.stats.outliers_influence import variance_inflation_factor\nvif = [variance_inflation_factor(X.values, i) for i in range(X.shape[1])]\n# VIF > 10 → ada multicollinearity\n```',
    ],
  },

  // ─── DATA CLEANING ────────────────────────────────────────────────────────
  {
    patterns: [/\b(data\s*clean|missing\s*value|null\s*value|nan\b|imputation|duplikat|duplicate|outlier|data\s*quality|kotor)\b/i],
    responses: [
      'Data cleaning biasanya memakan 60-80% waktu dalam proyek data science. It\'s not glamorous, but it\'s crucial! 🧹',
      'Strategi handle missing values:\n• Drop row/kolom jika > 30% missing\n• Imputation dengan mean/median (numerik)\n• Imputation dengan modus (kategorik)\n• Imputation dengan prediksi model (KNN, IterativeImputer)\n• Pertahankan sebagai kategori "Unknown" 🔧',
      'Missing value handling dengan Pandas:\n```python\ndf.isnull().sum()                      # cek jumlah null\ndf.isnull().mean() * 100               # persentase null\ndf.dropna(subset=["kolom_penting"])    # drop baris\ndf["kolom"].fillna(df["kolom"].mean()) # isi mean\ndf["kolom"].fillna(method="ffill")     # forward fill\n```',
      'Handle duplikat:\n```python\ndf.duplicated().sum()              # jumlah duplikat\ndf.drop_duplicates(inplace=True)   # hapus semua duplikat\ndf.drop_duplicates(subset=["id"])  # duplikat berdasar kolom\n```',
      'Data type conversion:\n```python\ndf["tanggal"] = pd.to_datetime(df["tanggal"])\ndf["kategori"] = df["kategori"].astype("category")\ndf["harga"] = pd.to_numeric(df["harga"], errors="coerce")\n```',
      'Normalisasi & standardisasi fitur:\n```python\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler\n\n# Standardisasi: mean=0, std=1\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\n\n# Normalisasi: range [0,1]\nscaler = MinMaxScaler()\nX_norm = scaler.fit_transform(X)\n```',
    ],
  },

  // ─── EDA (EXPLORATORY DATA ANALYSIS) ─────────────────────────────────────
  {
    patterns: [/\b(eda|exploratory|eksplorasi\s*data|analisis\s*eksplorasi|profiling\s*data|ydata\s*profiling|sweetviz)\b/i],
    responses: [
      'EDA (Exploratory Data Analysis) adalah tahap krusial untuk memahami data sebelum modeling. "Look before you leap!" 🔍',
      'Checklist EDA lengkap:\n✅ Shape & dimensi dataset\n✅ Tipe data setiap kolom\n✅ Missing values\n✅ Duplikat\n✅ Statistik deskriptif\n✅ Distribusi setiap variabel\n✅ Outlier\n✅ Korelasi antar variabel\n✅ Distribusi target variable\n✅ Insight bisnis awal',
      'Automated EDA dengan library:\n```python\n# ydata-profiling (dulu pandas-profiling)\nfrom ydata_profiling import ProfileReport\nreport = ProfileReport(df)\nreport.to_notebook_iframe()\n\n# Sweetviz\nimport sweetviz as sv\nreport = sv.analyze(df)\nreport.show_html("report.html")\n```',
      'EDA questions yang harus dijawab:\n1. Berapa banyak data dan berapa fiturnya?\n2. Apakah ada missing values? Di mana?\n3. Bagaimana distribusi target variable?\n4. Fitur mana yang paling berkorelasi dengan target?\n5. Apakah ada data leak atau anomali? 🎯',
    ],
  },

  // ─── FEATURE ENGINEERING ─────────────────────────────────────────────────
  {
    patterns: [/\b(feature\s*engineering|feature\s*selection|fitur|encoding|one.hot|label\s*encoding|feature\s*extraction|dimensionality)\b/i],
    responses: [
      'Feature Engineering sering lebih berpengaruh pada performa model daripada pilihan algoritma! "Garbage in, garbage out." 🏗️',
      'Teknik feature engineering umum:\n• Binning/discretization (angka → kategori)\n• Polynomial features (x, x², x³)\n• Interaction features (A × B)\n• Date features (tahun, bulan, hari, jam)\n• Text features (TF-IDF, bag of words)\n• Lag features (untuk time series)',
      'Encoding variabel kategorik:\n```python\nfrom sklearn.preprocessing import LabelEncoder, OneHotEncoder\n\n# Label Encoding (ordinal)\nle = LabelEncoder()\ndf["kol_encoded"] = le.fit_transform(df["kol"])\n\n# One-Hot Encoding (nominal)\ndf_dummies = pd.get_dummies(df, columns=["kol"])\n\n# Pandas factorize\ndf["kol_code"] = pd.factorize(df["kol"])[0]\n```',
      'Feature Selection methods:\n• Filter: korelasi, chi-square, mutual info\n• Wrapper: RFE (Recursive Feature Elimination)\n• Embedded: L1 regularization (Lasso), feature importance tree\n```python\nfrom sklearn.feature_selection import SelectKBest, f_classif\nselector = SelectKBest(f_classif, k=10)\nX_selected = selector.fit_transform(X, y)\n```',
      'Dimensionality Reduction:\n• PCA — untuk data numerik, linear\n• t-SNE / UMAP — untuk visualisasi 2D/3D\n• Autoencoder — untuk data kompleks (deep learning)\n```python\nfrom sklearn.decomposition import PCA\npca = PCA(n_components=2)\nX_2d = pca.fit_transform(X_scaled)\n```',
    ],
  },

  // ─── MACHINE LEARNING UMUM ────────────────────────────────────────────────
  {
    patterns: [/\b(machine\s*learning|ml\s*model|belajar\s*mesin|supervised|unsupervised|semi.supervised|reinforcement\s*learning)\b/i],
    responses: [
      'Machine Learning dibagi menjadi:\n🏷️ Supervised Learning — data berlabel (klasifikasi, regresi)\n🔍 Unsupervised Learning — tanpa label (clustering, dimensionality reduction)\n🎮 Reinforcement Learning — belajar dari reward/punishment\n🔀 Semi-supervised — sebagian data berlabel',
      'ML workflow dengan Scikit-learn:\n```python\n# 1. Split data\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\n# 2. Train model\nmodel.fit(X_train, y_train)\n\n# 3. Predict\ny_pred = model.predict(X_test)\n\n# 4. Evaluate\nfrom sklearn.metrics import accuracy_score\nprint(accuracy_score(y_test, y_pred))\n```',
      'Masalah umum dalam ML:\n⬆️ Overfitting — model terlalu hafal training data\n⬇️ Underfitting — model terlalu sederhana\n📊 Data imbalance — kelas minoritas terabaikan\n🔀 Data leakage — info dari masa depan masuk training\n🎯 Wrong metric — optimasi metric yang salah',
      'Hyperparameter tuning:\n```python\nfrom sklearn.model_selection import GridSearchCV, RandomizedSearchCV\n\n# Grid Search (exhaustive)\ngrid = GridSearchCV(model, param_grid, cv=5, scoring="f1")\ngrid.fit(X_train, y_train)\n\n# Random Search (lebih efisien)\nrandom = RandomizedSearchCV(model, param_dist, n_iter=100, cv=5)\n```',
    ],
  },

  // ─── KLASIFIKASI ──────────────────────────────────────────────────────────
  {
    patterns: [/\b(klasifikasi|classification|decision\s*tree|random\s*forest|svm|naive\s*bayes|knn|k.nearest|gradient\s*boosting|xgboost|lightgbm)\b/i],
    responses: [
      'Algoritma klasifikasi populer:\n🌳 Decision Tree — mudah diinterpretasi\n🌲 Random Forest — ensemble, robust\n⚡ XGBoost/LightGBM — top performer\n🔲 SVM — bagus untuk high-dimensional data\n📊 Logistic Regression — baseline, sangat interpretable\n🏘️ KNN — sederhana, non-parametrik',
      'Random Forest dalam Scikit-learn:\n```python\nfrom sklearn.ensemble import RandomForestClassifier\n\nrf = RandomForestClassifier(\n    n_estimators=100,\n    max_depth=10,\n    min_samples_split=5,\n    random_state=42,\n    n_jobs=-1\n)\nrf.fit(X_train, y_train)\n\n# Feature importance\nimportances = pd.Series(rf.feature_importances_, index=X.columns)\nimportances.sort_values().plot(kind="barh")\n```',
      'XGBoost — salah satu algoritma terbaik untuk tabular data:\n```python\nimport xgboost as xgb\n\nmodel = xgb.XGBClassifier(\n    n_estimators=500,\n    learning_rate=0.05,\n    max_depth=6,\n    subsample=0.8,\n    colsample_bytree=0.8,\n    use_label_encoder=False,\n    eval_metric="logloss"\n)\nmodel.fit(X_train, y_train, eval_set=[(X_test, y_test)], early_stopping_rounds=50)\n```',
      'Kapan memilih algoritma:\n• Data kecil, interpretasi penting → Logistic Regression, Decision Tree\n• Data sedang, performa bagus → Random Forest\n• Data tabular, kompetisi → XGBoost/LightGBM\n• Data dimensi tinggi, sedikit fitur → SVM\n• Data dengan banyak kategori → CatBoost 🎯',
    ],
  },

  // ─── CLUSTERING ───────────────────────────────────────────────────────────
  {
    patterns: [/\b(clustering|kluster|k.means|dbscan|hierarchical|segmentasi\s*pelanggan|customer\s*segment|elbow\s*method|silhouette)\b/i],
    responses: [
      'Clustering adalah unsupervised learning untuk menemukan kelompok alami dalam data — tanpa label! 🔍\nAplikasi: segmentasi pelanggan, deteksi anomali, kompresi gambar, rekomendasi.',
      'K-Means Clustering:\n```python\nfrom sklearn.cluster import KMeans\n\n# Cari k optimal dengan Elbow Method\ninertias = []\nfor k in range(1, 11):\n    km = KMeans(n_clusters=k, random_state=42)\n    km.fit(X_scaled)\n    inertias.append(km.inertia_)\n\nplt.plot(range(1, 11), inertias, "bo-")\nplt.xlabel("Jumlah Cluster K")\nplt.ylabel("Inertia")\nplt.title("Elbow Method")\n```',
      'Evaluasi kualitas clustering:\n```python\nfrom sklearn.metrics import silhouette_score, davies_bouldin_score\n\nsil = silhouette_score(X_scaled, labels)  # makin tinggi makin baik\ndb = davies_bouldin_score(X_scaled, labels)  # makin rendah makin baik\n```',
      'DBSCAN untuk cluster bentuk bebas:\n```python\nfrom sklearn.cluster import DBSCAN\n\ndbscan = DBSCAN(eps=0.5, min_samples=5)\nlabels = dbscan.fit_predict(X_scaled)\n# Label -1 = noise points/outlier!\n```',
      'Customer Segmentation dengan RFM Analysis:\n• R = Recency (kapan terakhir beli)\n• F = Frequency (seberapa sering beli)\n• M = Monetary (berapa total belanja)\nSegmentasi ini sangat powerful untuk marketing! 💰',
    ],
  },

  // ─── EVALUASI MODEL ───────────────────────────────────────────────────────
  {
    patterns: [/\b(akurasi|accuracy|precision|recall|f1.score|roc|auc|confusion\s*matrix|evaluasi\s*model|mse|rmse|mae|r2\s*score)\b/i],
    responses: [
      'Metric evaluasi klasifikasi:\n• Accuracy — proporsi prediksi benar (hindari untuk imbalanced!)\n• Precision — dari semua prediksi positif, berapa yang benar?\n• Recall — dari semua positif aktual, berapa yang terdeteksi?\n• F1-Score — harmonic mean precision & recall\n• ROC-AUC — kemampuan model membedakan kelas 📊',
      'Classification report Scikit-learn:\n```python\nfrom sklearn.metrics import classification_report, confusion_matrix\nimport seaborn as sns\n\nprint(classification_report(y_test, y_pred))\n\n# Confusion matrix\ncm = confusion_matrix(y_test, y_pred)\nsns.heatmap(cm, annot=True, fmt="d", cmap="Blues")\n```',
      'ROC Curve:\n```python\nfrom sklearn.metrics import roc_curve, roc_auc_score\n\ny_prob = model.predict_proba(X_test)[:, 1]\nfpr, tpr, thresholds = roc_curve(y_test, y_prob)\nauc = roc_auc_score(y_test, y_prob)\n\nplt.plot(fpr, tpr, label=f"AUC = {auc:.3f}")\nplt.plot([0,1], [0,1], "k--")\nplt.xlabel("False Positive Rate")\nplt.ylabel("True Positive Rate")\n```',
      'Metric evaluasi regresi:\n```python\nfrom sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score\n\nmse = mean_squared_error(y_test, y_pred)\nrmse = np.sqrt(mse)\nmae = mean_absolute_error(y_test, y_pred)\nr2 = r2_score(y_test, y_pred)\n\nprint(f"RMSE: {rmse:.4f}")\nprint(f"MAE:  {mae:.4f}")\nprint(f"R²:   {r2:.4f}")\n```',
      'Cross-validation untuk evaluasi yang lebih robust:\n```python\nfrom sklearn.model_selection import cross_val_score, StratifiedKFold\n\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nscores = cross_val_score(model, X, y, cv=cv, scoring="f1")\nprint(f"F1: {scores.mean():.4f} ± {scores.std():.4f}")\n```',
    ],
  },

  // ─── DEEP LEARNING ────────────────────────────────────────────────────────
  {
    patterns: [/\b(deep\s*learning|neural\s*network|tensorflow|keras|pytorch|cnn|rnn|lstm|transformer|bert|fine.tuning|gpu\s*training)\b/i],
    responses: [
      'Deep Learning vs Machine Learning tradisional:\n• ML → butuh feature engineering manual\n• DL → belajar fitur secara otomatis dari raw data\n• DL butuh lebih banyak data dan compute! 🧠',
      'Arsitektur Neural Network populer:\n🖼️ CNN (Convolutional NN) — gambar & image recognition\n📝 RNN/LSTM/GRU — sequence & time series\n🤖 Transformer — NLP state-of-the-art (BERT, GPT)\n🎨 GAN — generate gambar sintetis\n🔢 ANN/MLP — tabular data umum',
      'Keras/TensorFlow quickstart:\n```python\nimport tensorflow as tf\nfrom tensorflow import keras\n\nmodel = keras.Sequential([\n    keras.layers.Dense(128, activation="relu", input_shape=(n_features,)),\n    keras.layers.Dropout(0.3),\n    keras.layers.Dense(64, activation="relu"),\n    keras.layers.Dense(1, activation="sigmoid")  # binary classification\n])\n\nmodel.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])\nmodel.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2)\n```',
      'Masalah umum training DL:\n• Vanishing gradient → pakai ReLU, batch normalization\n• Overfitting → dropout, L2 regularization, early stopping\n• Learning rate terlalu besar/kecil → learning rate scheduler\n• Mode collapse (GAN) → teknik training khusus ⚠️',
      'Transfer Learning — manfaatkan model pre-trained:\n```python\nfrom tensorflow.keras.applications import MobileNetV2\n\nbase_model = MobileNetV2(weights="imagenet", include_top=False)\nbase_model.trainable = False  # freeze base\n\nmodel = keras.Sequential([\n    base_model,\n    keras.layers.GlobalAveragePooling2D(),\n    keras.layers.Dense(num_classes, activation="softmax")\n])\n```',
    ],
  },

  // ─── NLP / TEXT ANALYTICS ─────────────────────────────────────────────────
  {
    patterns: [/\b(nlp|natural\s*language|text\s*mining|sentiment|analisis\s*teks|tokenization|tfidf|tf.idf|word2vec|embedding|spacy|nltk)\b/i],
    responses: [
      'NLP (Natural Language Processing) memungkinkan komputer memahami bahasa manusia. Aplikasi: sentiment analysis, chatbot, translation, summarization! 💬',
      'Text preprocessing pipeline:\n```python\nimport re\nfrom nltk.tokenize import word_tokenize\nfrom nltk.corpus import stopwords\nfrom nltk.stem import PorterStemmer\n\ndef preprocess(text):\n    text = text.lower()               # lowercase\n    text = re.sub(r"[^a-z\\s]", "", text)  # hapus non-alfabet\n    tokens = word_tokenize(text)      # tokenisasi\n    stop = set(stopwords.words("english"))\n    tokens = [t for t in tokens if t not in stop]  # hapus stopwords\n    stemmer = PorterStemmer()\n    tokens = [stemmer.stem(t) for t in tokens]    # stemming\n    return " ".join(tokens)\n```',
      'TF-IDF Vectorization:\n```python\nfrom sklearn.feature_extraction.text import TfidfVectorizer\n\nvectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1,2))\nX_tfidf = vectorizer.fit_transform(corpus)\n\n# Lihat kata paling penting\nfeature_names = vectorizer.get_feature_names_out()\n```',
      'Sentiment Analysis dengan TextBlob:\n```python\nfrom textblob import TextBlob\n\ntext = "FutureStack is an amazing productivity tool!"\nblob = TextBlob(text)\nprint(f"Polarity: {blob.sentiment.polarity}")    # -1 negatif, +1 positif\nprint(f"Subjectivity: {blob.sentiment.subjectivity}")  # 0 objektif, 1 subjektif\n```',
      'Hugging Face Transformers untuk NLP modern:\n```python\nfrom transformers import pipeline\n\n# Sentiment analysis\nsentiment = pipeline("sentiment-analysis")\nresult = sentiment("I love using FutureStack!")\n\n# Text summarization\nsummarizer = pipeline("summarization")\nsummary = summarizer(long_text, max_length=130, min_length=30)\n\n# Named Entity Recognition\nner = pipeline("ner", aggregation_strategy="simple")\n```',
    ],
  },

  // ─── TIME SERIES ──────────────────────────────────────────────────────────
  {
    patterns: [/\b(time\s*series|deret\s*waktu|forecasting|arima|prophet|seasonality|trend\s*data|lag\s*feature|autocorrelation)\b/i],
    responses: [
      'Time Series Analysis: data yang diurutkan berdasarkan waktu. Komponen utama: Trend, Seasonality, Cyclical, Residual! 📅',
      'Time Series decomposition:\n```python\nfrom statsmodels.tsa.seasonal import seasonal_decompose\n\nresult = seasonal_decompose(df["value"], model="additive", period=12)\nresult.plot()\n# Lihat trend, seasonal, residual secara terpisah!\n```',
      'ARIMA Model:\n```python\nfrom statsmodels.tsa.arima.model import ARIMA\n\nmodel = ARIMA(train, order=(p, d, q))\nresult = model.fit()\nforecast = result.forecast(steps=30)\n\n# p = AR order, d = differencing, q = MA order\n# Gunakan ACF/PACF plot untuk menentukan p dan q!\n```',
      'Facebook Prophet — forecasting yang mudah:\n```python\nfrom prophet import Prophet\n\ndf_prophet = df.rename(columns={"tanggal": "ds", "nilai": "y"})\n\nmodel = Prophet(\n    yearly_seasonality=True,\n    weekly_seasonality=True,\n    daily_seasonality=False\n)\nmodel.fit(df_prophet)\n\nfuture = model.make_future_dataframe(periods=365)\nforecast = model.predict(future)\nmodel.plot(forecast)\n```',
      'Feature engineering untuk time series:\n```python\ndf["year"] = df["date"].dt.year\ndf["month"] = df["date"].dt.month\ndf["dayofweek"] = df["date"].dt.dayofweek\ndf["is_weekend"] = df["dayofweek"].isin([5,6]).astype(int)\n\n# Lag features\ndf["lag_1"] = df["value"].shift(1)\ndf["lag_7"] = df["value"].shift(7)\ndf["rolling_mean_7"] = df["value"].rolling(7).mean()\n```',
    ],
  },

  // ─── SQL UNTUK DATA ───────────────────────────────────────────────────────
  {
    patterns: [/\b(sql\s*data|query\s*data|select\s*from|join\s*sql|window\s*function|cte\b|aggregate|group\s*by|having|subquery)\b/i],
    responses: [
      'SQL adalah skill wajib Data Analyst! Hampir semua data bisnis ada di database relasional. Master SQL = buka banyak pintu! 🗄️',
      'Query SQL esensial untuk analyst:\n```sql\n-- Basic\nSELECT kolom1, kolom2, COUNT(*) as total\nFROM tabel\nWHERE kondisi = \'nilai\'\nGROUP BY kolom1, kolom2\nHAVING COUNT(*) > 10\nORDER BY total DESC\nLIMIT 100;\n\n-- Kalkulasi persen\nSELECT kategori,\n       COUNT(*) as jumlah,\n       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as persen\nFROM tabel\nGROUP BY kategori;\n```',
      'SQL JOINs:\n```sql\n-- INNER JOIN: hanya baris yang match\nSELECT a.id, a.nama, b.nilai\nFROM tabel_a a\nINNER JOIN tabel_b b ON a.id = b.id_a;\n\n-- LEFT JOIN: semua baris dari kiri\nSELECT a.id, b.nilai\nFROM tabel_a a\nLEFT JOIN tabel_b b ON a.id = b.id_a;\n```',
      'Window Functions — powerful untuk analisis:\n```sql\n-- Running total\nSELECT tanggal, revenue,\n       SUM(revenue) OVER (ORDER BY tanggal) as running_total\nFROM penjualan;\n\n-- Rank dalam grup\nSELECT nama, departemen, gaji,\n       RANK() OVER (PARTITION BY departemen ORDER BY gaji DESC) as rank_dept\nFROM karyawan;\n\n-- Month-over-month growth\nSELECT bulan, revenue,\n       LAG(revenue) OVER (ORDER BY bulan) as prev_month,\n       ROUND((revenue - LAG(revenue) OVER (ORDER BY bulan)) / LAG(revenue) OVER (ORDER BY bulan) * 100, 2) as growth_pct\nFROM penjualan_bulanan;\n```',
      'CTE (Common Table Expression) untuk query yang readable:\n```sql\nWITH monthly_revenue AS (\n    SELECT DATE_TRUNC(\'month\', tanggal) as bulan,\n           SUM(total) as revenue\n    FROM orders\n    GROUP BY 1\n),\ntop_customers AS (\n    SELECT customer_id, SUM(total) as total_spend\n    FROM orders\n    GROUP BY 1\n    HAVING SUM(total) > 1000000\n)\nSELECT * FROM monthly_revenue\nWHERE bulan >= \'2024-01-01\';\n```',
    ],
  },

  // ─── POWER BI & TABLEAU ───────────────────────────────────────────────────
  {
    patterns: [/\b(power\s*bi|tableau|looker|metabase|dashboard|bi\s*tool|business\s*intelligence|dax|measure|calculated\s*field)\b/i],
    responses: [
      'BI Tools untuk visualisasi:\n📊 Power BI — terintegrasi sempurna dengan ekosistem Microsoft\n📊 Tableau — visualisasi paling powerful dan fleksibel\n📊 Looker — cloud-native, bagus untuk enterprise\n📊 Metabase — open-source, mudah untuk tim kecil\n📊 Google Data Studio/Looker Studio — gratis! 🆓',
      'Power BI tips:\n• Gunakan Star Schema di data model (fact + dimension tables)\n• DAX untuk kalkulasi custom\n• Slicers untuk filter interaktif\n• Bookmark untuk navigasi halaman\n• Row-level security untuk akses per user! 🔒',
      'DAX measures berguna di Power BI:\n```dax\n// Total Sales\nTotal Sales = SUM(Sales[Amount])\n\n// Year-over-Year Growth\nYoY Growth = DIVIDE(\n    [Total Sales] - CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Date[Date])),\n    CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Date[Date]))\n)\n\n// Running Total\nRunning Total = CALCULATE([Total Sales], FILTER(ALL(Date), Date[Date] <= MAX(Date[Date])))\n```',
      'Prinsip dashboard yang baik:\n• Fokus pada 5-7 KPI utama\n• Hirarki informasi yang jelas (overview → detail)\n• Konsistensi warna dan font\n• Interaktivitas yang intuitif\n• Mobile-friendly layout\n• Refresh data otomatis! 📱',
    ],
  },

  // ─── BIG DATA ─────────────────────────────────────────────────────────────
  {
    patterns: [/\b(big\s*data|spark|pyspark|hadoop|hive|kafka|airflow|etl|data\s*pipeline|data\s*engineering|data\s*lake|data\s*warehouse)\b/i],
    responses: [
      'Big Data 5V: Volume (besar), Velocity (cepat), Variety (beragam), Veracity (akurat), Value (bernilai). Data memenuhi ini butuh tools khusus! 🏔️',
      'PySpark untuk data besar:\n```python\nfrom pyspark.sql import SparkSession\nfrom pyspark.sql import functions as F\n\nspark = SparkSession.builder.appName("FutureStackData").getOrCreate()\n\ndf = spark.read.csv("data.csv", header=True, inferSchema=True)\n\n# Operasi mirip Pandas tapi di-distribute!\nresult = df.groupBy("kategori").agg(\n    F.sum("revenue").alias("total_revenue"),\n    F.count("*").alias("jumlah_transaksi"),\n    F.avg("nilai").alias("rata_rata")\n)\nresult.show()\n```',
      'ETL Pipeline:\n• Extract — ambil data dari source (DB, API, file)\n• Transform — bersihkan, format, aggregate\n• Load — simpan ke destination (data warehouse, data lake)\n\nTools: Apache Airflow, dbt, Luigi, Prefect! 🔄',
      'Modern Data Stack:\n🏗️ Ingestion: Fivetran, Airbyte\n🗄️ Storage: Snowflake, BigQuery, Redshift\n🔄 Transform: dbt\n📊 BI: Looker, Metabase, Power BI\n🔍 Observability: Monte Carlo, Great Expectations',
      'Data Warehouse vs Data Lake:\n• Warehouse (Snowflake, BigQuery) → structured, schema-on-write, untuk BI\n• Lake (S3, GCS, ADLS) → semua format, schema-on-read, untuk ML\n• Lakehouse (Databricks Delta Lake) → kombinasi keduanya! ⚖️',
    ],
  },

  // ─── DATA STORYTELLING ────────────────────────────────────────────────────
  {
    patterns: [/\b(data\s*storytelling|presentasi\s*data|insight|cerita\s*data|komunikasi\s*data|data\s*driven|laporan\s*data|executive\s*summary)\b/i],
    responses: [
      'Data Storytelling = Data + Narrative + Visualisasi. Insight terbaik tidak berguna kalau tidak bisa dikomunikasikan! 📖',
      'Struktur presentasi data yang efektif:\n1. Context & Situasi (apa yang sedang terjadi?)\n2. Insight utama (apa yang ditemukan?)\n3. Evidence (data apa yang mendukung?)\n4. Implication (apa artinya untuk bisnis?)\n5. Recommendation (apa yang harus dilakukan?)\n6. Next steps (langkah konkret) 🎯',
      'Tips visualisasi untuk non-teknikal:\n• 1 chart = 1 insight utama\n• Judul chart = kesimpulan, bukan deskripsi\n• Gunakan warna untuk highlight, bukan dekorasi\n• Annotate langsung di chart (jangan rely pada legend)\n• Simplify, simplify, simplify! 🎨',
      'Avoid misleading charts:\n⚠️ Y-axis tidak mulai dari 0 (membesar-besarkan perbedaan)\n⚠️ Pie chart untuk > 5 kategori (susah dibaca)\n⚠️3D chart (distorsi persepsi)\n⚠️ Dual Y-axis yang menyesatkan\n✅ Selalu tampilkan sample size dan konteks! 📊',
      'Buku data storytelling wajib baca:\n📚 "Storytelling with Data" — Cole Nussbaumer Knaflic\n📚 "The Visual Display of Quantitative Information" — Edward Tufte\n📚 "Data Story" — Nancy Duarte',
    ],
  },

  // ─── KAGGLE & KOMPETISI ───────────────────────────────────────────────────
  {
    patterns: [/\b(kaggle|kompetisi\s*data|competition|leaderboard|notebook\s*kaggle|dataset\s*publik)\b/i],
    responses: [
      'Kaggle adalah platform terbaik untuk belajar data science secara praktis:\n🏆 Competitions — tanding dengan data scientist dunia\n📂 Datasets — ribuan dataset gratis\n📓 Notebooks — belajar dari solusi orang lain\n📚 Courses — kursus gratis berkualitas tinggi! 🎓',
      'Tips memulai di Kaggle:\n1. Mulai dari competition "Getting Started" (Titanic, House Prices)\n2. Pelajari winning solutions dari kompetisi sebelumnya\n3. Fork notebook bagus dan eksperimen\n4. Bergabung ke team untuk belajar lebih cepat\n5. Fokus pada fitur engineering, bukan cuma algoritma! 🥇',
      'Kaggle strategy untuk top leaderboard:\n• Solid cross-validation (jangan percaya LB saja!)\n• Feature engineering yang kreatif\n• Ensemble banyak model (blending, stacking)\n• Post-processing prediksi\n• Belajar dari discussion dan notebooks publik! 🔬',
      'Dataset publik menarik untuk latihan:\n• Titanic (klasifikasi survival)\n• House Prices (prediksi harga)\n• MNIST (image classification)\n• IMDb Reviews (sentiment analysis)\n• COVID-19 datasets (time series)\n• Indonesian datasets di Kaggle! 🇮🇩',
    ],
  },

  // ─── TOOLS & LIBRARY TAMBAHAN ────────────────────────────────────────────
  {
    patterns: [/\b(scipy|statsmodels|sklearn|scikit.learn|mlflow|optuna|shap|lime|interpretability|explainability)\b/i],
    responses: [
      'Scipy untuk statistik lanjutan:\n```python\nfrom scipy import stats\n\n# T-test\nt_stat, p_value = stats.ttest_ind(grup_a, grup_b)\n\n# Chi-square test\nchi2, p, dof, expected = stats.chi2_contingency(contingency_table)\n\n# Shapiro-Wilk (uji normalitas)\nstat, p = stats.shapiro(data)\n```',
      'MLflow untuk experiment tracking:\n```python\nimport mlflow\n\nwith mlflow.start_run():\n    mlflow.log_param("n_estimators", 100)\n    mlflow.log_param("max_depth", 10)\n    mlflow.log_metric("accuracy", accuracy)\n    mlflow.log_metric("f1_score", f1)\n    mlflow.sklearn.log_model(model, "model")\n```',
      'Optuna untuk hyperparameter optimization:\n```python\nimport optuna\n\ndef objective(trial):\n    n_estimators = trial.suggest_int("n_estimators", 50, 300)\n    max_depth = trial.suggest_int("max_depth", 3, 10)\n    lr = trial.suggest_float("learning_rate", 0.01, 0.3, log=True)\n    model = XGBClassifier(n_estimators=n_estimators, max_depth=max_depth, learning_rate=lr)\n    return cross_val_score(model, X, y, cv=3).mean()\n\nstudy = optuna.create_study(direction="maximize")\nstudy.optimize(objective, n_trials=100)\n```',
      'SHAP untuk model interpretability:\n```python\nimport shap\n\nexplainer = shap.TreeExplainer(model)\nshap_values = explainer.shap_values(X_test)\n\nshap.summary_plot(shap_values, X_test)       # feature importance global\nshap.force_plot(explainer.expected_value,    # explain satu prediksi\n                shap_values[0], X_test.iloc[0])\n```\nSHAP menjelaskan "mengapa" model membuat prediksi tertentu! 🔍',
    ],
  },

  // ─── KARIR DATA ───────────────────────────────────────────────────────────
  {
    patterns: [/\b(karir\s*data|data\s*job|gaji\s*data|data\s*scientist\s*job|data\s*analyst\s*job|portfolio\s*data|cv\s*data)\b/i],
    responses: [
      'Jalur karir di bidang data:\n📊 Data Analyst → Business Intelligence Analyst → Analytics Manager\n🤖 Data Scientist → Senior DS → Lead DS → Head of Data\n🏗️ Data Engineer → Senior DE → Data Architect\n🎨 ML Engineer → Senior MLE → ML Platform Engineer\n📈 Quant Analyst → berbeda domain khusus keuangan',
      'Portfolio data science yang kuat:\n✅ 3-5 project end-to-end (problem → insight → rekomendasi)\n✅ Gunakan dataset nyata/relevan, bukan hanya Iris atau Titanic\n✅ Kode bersih dan terdokumentasi di GitHub\n✅ Notebook yang bercerita (bukan hanya kode)\n✅ Blog post atau writeup yang menjelaskan insight\n✅ Satu project dengan deployment (Streamlit, Flask, Hugging Face) 🚀',
      'Tools yang wajib dikuasai untuk kerja di bidang data:\n• SQL (wajib!)\n• Python (Pandas, NumPy, Scikit-learn)\n• Visualisasi (Matplotlib, Seaborn, Tableau/Power BI)\n• Git & version control\n• Cloud basics (AWS/GCP/Azure)\n• Communication skill (sering dilupakan tapi sangat penting!) 💼',
      'Sumber belajar data science gratis:\n📚 Kaggle Courses (Python, ML, SQL, Deep Learning)\n📚 fast.ai (Deep Learning practical approach)\n📚 Stat Quest with Josh Starmer (statistika visual)\n📚 Towards Data Science (Medium)\n📚 CS229 Stanford (ML course)\n📚 "Hands-On ML" — Aurélien Géron (buku terbaik!) 📖',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ████████   PERTANYAAN SPESIFIK "APA ITU / JELASKAN / PENGERTIAN"   ████████
  // ════════════════════════════════════════════════════════════════════════════

  // ─── APA ITU DATA SCIENCE ────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(data\s*science|ilmu\s*data)/i,
      /jelaskan\s*(tentang\s*)?data\s*science/i,
      /data\s*science\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Data Science adalah bidang ilmu yang menggabungkan statistika, pemrograman, dan domain knowledge untuk mengekstrak wawasan (insight) bermakna dari data mentah. 📊\n\nIntinya: mengubah data jadi keputusan bisnis yang cerdas!',
      'Data Science = Statistika + Coding + Domain Knowledge. Prosesnya: kumpulkan data → bersihkan → eksplorasi → buat model → komunikasikan insight → ambil keputusan. 🔬',
      'Sederhananya, Data Science adalah seni dan ilmu menjawab pertanyaan bisnis menggunakan data. Contoh: "Kenapa penjualan turun bulan ini?" atau "Pelanggan mana yang akan churn?" 💡',
    ],
  },

  // ─── APA ITU MACHINE LEARNING ────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(machine\s*learning|ml\b|belajar\s*mesin)/i,
      /jelaskan\s*(tentang\s*)?machine\s*learning/i,
      /machine\s*learning\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Machine Learning adalah cabang AI di mana komputer belajar dari data tanpa diprogram secara eksplisit. Komputer menemukan pola sendiri! 🤖\n\nContoh: Netflix merekomendasikan film berdasarkan riwayat tontonanmu.',
      'ML = program yang belajar dari pengalaman (data). Ada 3 jenis:\n🏷️ Supervised — belajar dari data berlabel\n🔍 Unsupervised — temukan pola tanpa label\n🎮 Reinforcement — belajar dari reward & punishment',
      'Machine Learning membuat komputer "pintar" tanpa harus ditulis aturannya satu per satu. Kamu kasih data → komputer cari polanya sendiri! Inilah fondasi AI modern. 🧠',
    ],
  },

  // ─── APA ITU DEEP LEARNING ───────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(deep\s*learning|neural\s*network|jaringan\s*saraf)/i,
      /jelaskan\s*(tentang\s*)?deep\s*learning/i,
      /deep\s*learning\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Deep Learning adalah sub-bidang Machine Learning yang menggunakan Neural Network berlapis-lapis (deep = banyak lapisan). Terinspirasi cara kerja otak manusia! 🧠\n\nSangat powerful untuk gambar, suara, dan teks.',
      'Deep Learning vs ML biasa:\n• ML biasa → butuh feature engineering manual\n• Deep Learning → belajar fitur otomatis dari raw data\n• Deep Learning butuh lebih banyak data & GPU! ⚡',
      'Neural Network adalah otak dari Deep Learning. Terdiri dari neuron buatan yang tersambung berlapis. Semakin "deep" (banyak layer), semakin kompleks yang bisa dipelajari! 🔬',
    ],
  },

  // ─── APA ITU PANDAS ──────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*pandas/i,
      /jelaskan\s*(tentang\s*)?pandas/i,
      /pandas\s*(itu\s*apa|adalah|artinya|digunakan\s*untuk)/i,
      /fungsi\s*pandas/i,
      /kegunaan\s*pandas/i,
    ],
    responses: [
      'Pandas adalah library Python untuk manipulasi dan analisis data. Bisa dibilang "Excel-nya Python" — tapi jauh lebih powerful! 🐼\n\nStruktur utamanya:\n• DataFrame — tabel 2D (baris × kolom)\n• Series — satu kolom/baris data',
      'Pandas digunakan untuk:\n✅ Membaca data (CSV, Excel, JSON, SQL)\n✅ Membersihkan data (handle null, duplikat)\n✅ Transformasi & agregasi data\n✅ Merge/join antar tabel\n✅ Analisis statistik dasar\n\nImport dengan: `import pandas as pd` 🐍',
      'Pandas = library wajib #1 data scientist Python. Tanpa Pandas, analisis data di Python akan sangat menyakitkan! Install dengan: `pip install pandas` 📦',
    ],
  },

  // ─── APA ITU NUMPY ───────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(numpy|num\s*py)/i,
      /jelaskan\s*(tentang\s*)?numpy/i,
      /numpy\s*(itu\s*apa|adalah|artinya|digunakan\s*untuk)/i,
      /fungsi\s*numpy|kegunaan\s*numpy/i,
    ],
    responses: [
      'NumPy (Numerical Python) adalah library untuk komputasi numerik di Python. Fondasi dari hampir semua library data science! 🔢\n\nFitur utama: array N-dimensi yang super cepat karena operasinya di-vectorized (tidak pakai loop Python).',
      'NumPy digunakan untuk:\n• Operasi matematika pada array/matrix\n• Aljabar linear\n• Transformasi Fourier\n• Statistik dasar\n\nImport: `import numpy as np`\nFun fact: Pandas, Scikit-learn, dan TensorFlow semuanya built on top of NumPy! 📐',
    ],
  },

  // ─── APA ITU DATAFRAME ───────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(dataframe|data\s*frame)/i,
      /jelaskan\s*(tentang\s*)?dataframe/i,
      /dataframe\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'DataFrame adalah struktur data 2 dimensi di Pandas — seperti tabel Excel atau tabel database. Punya baris (rows) dan kolom (columns) dengan label! 📋\n\n```python\nimport pandas as pd\ndf = pd.read_csv("data.csv")\ndf.head()  # lihat 5 baris pertama\n```',
      'DataFrame = tabel data di Python. Tiap kolom bisa punya tipe data berbeda (angka, teks, tanggal). Sangat fleksibel untuk analisis data! 🐼\n\nBisa dibuat dari: dict, list, CSV, Excel, JSON, SQL query, dan banyak lagi.',
    ],
  },

  // ─── APA ITU EDA ─────────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(eda|exploratory\s*data\s*analysis|analisis\s*eksplorasi)/i,
      /jelaskan\s*(tentang\s*)?eda/i,
      /eda\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'EDA (Exploratory Data Analysis) adalah proses awal analisis data untuk memahami karakteristik, pola, dan anomali sebelum membangun model. 🔍\n\nSeperti "kenalan dulu" dengan datamu sebelum mengambil kesimpulan!',
      'EDA mencakup:\n📊 Statistik deskriptif (mean, median, std)\n📈 Visualisasi distribusi\n🔗 Analisis korelasi antar variabel\n🚨 Deteksi outlier & missing values\n🎯 Identifikasi pola & insight awal\n\nTahap yang paling sering dilewatkan padahal paling penting! ⚠️',
    ],
  },

  // ─── APA ITU OVERFITTING ─────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(overfitting|underfitting)/i,
      /jelaskan\s*(tentang\s*)?(overfitting|underfitting)/i,
      /(overfitting|underfitting)\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Overfitting = model terlalu "hafal" data training sehingga buruk saat prediksi data baru. Seperti siswa yang menghafal soal ujian tapi tidak paham materinya! 📚\n\nSolusi: regularisasi, lebih banyak data, dropout, cross-validation.',
      'Underfitting = model terlalu sederhana, bahkan tidak bisa menangkap pola di training data. Akurasi training & test sama-sama rendah.\n\nOverfitting vs Underfitting:\n📈 Overfit → training tinggi, test rendah\n📉 Underfit → training rendah, test rendah\n🎯 Ideal → keduanya tinggi & dekat! ⚖️',
    ],
  },

  // ─── APA ITU RANDOM FOREST ───────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(random\s*forest|hutan\s*acak)/i,
      /jelaskan\s*(tentang\s*)?random\s*forest/i,
      /random\s*forest\s*(itu\s*apa|adalah|artinya|cara\s*kerja)/i,
      /cara\s*kerja\s*random\s*forest/i,
    ],
    responses: [
      'Random Forest adalah kumpulan (ensemble) dari banyak Decision Tree. Setiap tree "voting" untuk prediksi akhir — mayoritas menang! 🌲🌲🌲\n\nKenapa "random"? Karena setiap tree dilatih dengan:\n• Subset data yang random (bootstrap sampling)\n• Subset fitur yang random',
      'Random Forest sangat powerful karena:\n✅ Robust terhadap overfitting\n✅ Handle missing values\n✅ Bisa data numerik & kategorik\n✅ Kasih feature importance\n✅ Hampir tidak butuh tuning\n\nKekurangan: lambat untuk data sangat besar & sulit diinterpretasi. 🌳',
    ],
  },

  // ─── APA ITU GRADIENT BOOSTING / XGBOOST ────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(gradient\s*boosting|xgboost|lightgbm|catboost|boosting)/i,
      /jelaskan\s*(tentang\s*)?(gradient\s*boosting|xgboost|boosting)/i,
      /(gradient\s*boosting|xgboost)\s*(itu\s*apa|adalah|artinya|cara\s*kerja)/i,
    ],
    responses: [
      'Gradient Boosting membangun model secara sekuensial — setiap model baru belajar dari kesalahan model sebelumnya. Berbeda dengan Random Forest yang paralel! 🔄\n\nXGBoost, LightGBM, CatBoost = implementasi Gradient Boosting yang sangat dioptimasi. Sering menang di kompetisi Kaggle!',
      'Perbedaan Random Forest vs Gradient Boosting:\n🌲 Random Forest → pohon dibangun PARALEL, voting\n⚡ Gradient Boosting → pohon dibangun BERURUTAN, koreksi error\n\nGradient Boosting biasanya lebih akurat tapi lebih sensitif terhadap hyperparameter dan outlier! 🎯',
    ],
  },

  // ─── APA ITU CROSS VALIDATION ────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(cross.?validat|k.?fold|validasi\s*silang)/i,
      /jelaskan\s*(tentang\s*)?(cross.?validat|k.?fold)/i,
      /cross\s*validat\w*\s*(itu\s*apa|adalah|artinya|cara\s*kerja)/i,
    ],
    responses: [
      'Cross-Validation adalah teknik evaluasi model yang lebih robust dari train-test split biasa. Data dibagi ke-K fold, model dilatih K kali — setiap kali fold berbeda jadi test set! 🔄\n\nHasil: estimasi performa yang lebih akurat dan stabil.',
      '5-Fold Cross Validation:\n1. Bagi data jadi 5 bagian\n2. Iterasi 1: fold 1 = test, fold 2-5 = train\n3. Iterasi 2: fold 2 = test, fold 1,3-5 = train\n4. ... ulangi 5x\n5. Rata-rata 5 hasil = performa final\n\nMenggunakan semua data untuk training DAN testing! ⚖️',
    ],
  },

  // ─── APA ITU FEATURE ENGINEERING ─────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(feature\s*engineering|rekayasa\s*fitur)/i,
      /jelaskan\s*(tentang\s*)?feature\s*engineering/i,
      /feature\s*engineering\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Feature Engineering adalah proses membuat atau memodifikasi fitur (kolom) input untuk meningkatkan performa model ML. Sering disebut sebagai "seni" dalam data science! 🏗️\n\nContoh: dari kolom "tanggal", bisa diekstrak: tahun, bulan, hari, hari-dalam-seminggu, is_weekend, is_holiday.',
      '"Feature engineering is the most important part of ML." — kebanyakan kaggle winner. Model yang bagus dengan fitur jelek kalah dari model biasa dengan fitur bagus! 🥇\n\nTeknik umum: binning, encoding, interaksi fitur, lag feature, rolling statistics.',
    ],
  },

  // ─── APA ITU NORMALISASI / STANDARDISASI ─────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(normalisasi|standardisasi|scaling|feature\s*scaling)/i,
      /jelaskan\s*(tentang\s*)?(normalisasi|standardisasi|scaling)/i,
      /(normalisasi|standardisasi)\s*(itu\s*apa|adalah|perbedaan|bedanya)/i,
      /bedanya\s*(normalisasi|standardisasi)/i,
    ],
    responses: [
      'Normalisasi vs Standardisasi:\n📏 Normalisasi (Min-Max) → rescale ke range [0,1]\n📐 Standardisasi (Z-score) → mean=0, std=1\n\nKapan pakai:\n• Normalisasi → kalau distribusi tidak normal, Neural Network\n• Standardisasi → distribusi normal, SVM, PCA, regresi 📊',
      'Feature scaling penting agar fitur dengan skala berbeda tidak mendominasi model. Contoh: "usia (0-100)" vs "gaji (1jt-100jt)" tanpa scaling akan buat model bias ke gaji! ⚖️\n\n```python\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler\n```',
    ],
  },

  // ─── APA ITU CONFUSION MATRIX ────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(confusion\s*matrix|matriks\s*konfusi)/i,
      /jelaskan\s*(tentang\s*)?confusion\s*matrix/i,
      /confusion\s*matrix\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Confusion Matrix adalah tabel yang merangkum performa model klasifikasi:\n\n|              | Prediksi Positif | Prediksi Negatif |\n|---|---|---|\n| Aktual Positif | TP (True Positive)  | FN (False Negative) |\n| Aktual Negatif | FP (False Positive) | TN (True Negative)  |\n\nDari sini dihitung: Accuracy, Precision, Recall, F1! 🎯',
      'Confusion Matrix membantu kita lihat JENIS kesalahan model:\n❌ False Positive (FP) = prediksi positif padahal negatif (Type I Error)\n❌ False Negative (FN) = prediksi negatif padahal positif (Type II Error)\n\nContoh: model deteksi kanker → FN lebih berbahaya dari FP! ⚠️',
    ],
  },

  // ─── APA ITU PRECISION RECALL F1 ─────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(precision|recall|f1.score|f1\s*score)/i,
      /jelaskan\s*(tentang\s*)?(precision|recall|f1)/i,
      /perbedaan\s*(precision|recall|f1|accuracy)/i,
      /bedanya\s*(precision|recall|f1|accuracy)/i,
    ],
    responses: [
      'Metric klasifikasi:\n🎯 Accuracy = (TP+TN)/(total) — proporsi benar keseluruhan\n🔍 Precision = TP/(TP+FP) — dari prediksi positif, berapa yang benar?\n📡 Recall = TP/(TP+FN) — dari semua positif aktual, berapa yang tertangkap?\n⚖️ F1 = 2×(P×R)/(P+R) — harmonic mean precision & recall',
      'Kapan prioritaskan metric apa?\n• Spam detection → tingkatkan Precision (tidak mau email penting masuk spam)\n• Deteksi penyakit → tingkatkan Recall (tidak mau kasus positif terlewat)\n• Imbalanced data → F1-score atau ROC-AUC, bukan Accuracy! 🏥',
    ],
  },

  // ─── APA ITU ROC AUC ─────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(roc|auc|roc.?auc|kurva\s*roc)/i,
      /jelaskan\s*(tentang\s*)?(roc|auc|roc.auc)/i,
      /roc.?auc\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'ROC (Receiver Operating Characteristic) adalah kurva yang menunjukkan trade-off antara True Positive Rate (Recall) vs False Positive Rate pada berbagai threshold. 📈\n\nAUC (Area Under Curve):\n• AUC = 1.0 → model sempurna\n• AUC = 0.5 → model random (tidak berguna)\n• AUC > 0.8 → model bagus',
      'AUC-ROC mengukur kemampuan model membedakan kelas positif dan negatif, INDEPENDENT dari threshold. Sangat berguna untuk imbalanced dataset! ⚖️\n\nBerbeda dengan accuracy yang sensitif terhadap class imbalance.',
    ],
  },

  // ─── APA ITU K-MEANS ─────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(k.?means|kmeans)/i,
      /jelaskan\s*(tentang\s*)?k.?means/i,
      /k.?means\s*(itu\s*apa|adalah|artinya|cara\s*kerja)/i,
      /cara\s*kerja\s*k.?means/i,
    ],
    responses: [
      'K-Means adalah algoritma clustering yang mengelompokkan data ke dalam K cluster. Cara kerja:\n1. Pilih K centroid secara random\n2. Assign setiap titik ke centroid terdekat\n3. Update centroid = rata-rata titik di cluster\n4. Ulangi langkah 2-3 sampai konvergen! 🔵🟢🟡',
      'K-Means cocok untuk:\n✅ Segmentasi pelanggan\n✅ Kompresi gambar\n✅ Anomaly detection\n\nKeterbatasan:\n❌ Harus tentukan K terlebih dahulu\n❌ Sensitif terhadap outlier\n❌ Hanya bisa cluster berbentuk bulat (spherical)\n\nGunakan Elbow Method atau Silhouette Score untuk cari K optimal! 🎯',
    ],
  },

  // ─── APA ITU PCA ─────────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(pca|principal\s*component|dimensionality\s*reduction|reduksi\s*dimensi)/i,
      /jelaskan\s*(tentang\s*)?(pca|principal\s*component|reduksi\s*dimensi)/i,
      /pca\s*(itu\s*apa|adalah|artinya|cara\s*kerja)/i,
    ],
    responses: [
      'PCA (Principal Component Analysis) adalah teknik untuk mengurangi jumlah fitur (dimensi) sambil mempertahankan sebanyak mungkin informasi (variance). 📉\n\nMengubah fitur asli → kombinasi linear baru yang tidak berkorelasi (Principal Components).',
      'Kegunaan PCA:\n• Kurangi curse of dimensionality\n• Visualisasi data tinggi dimensi ke 2D/3D\n• Hapus noise dan redudansi\n• Percepat training ML\n\n```python\nfrom sklearn.decomposition import PCA\npca = PCA(n_components=2)\nX_2d = pca.fit_transform(X_scaled)\nprint(pca.explained_variance_ratio_)  # berapa % info yang dipertahankan\n``` 🔬',
    ],
  },

  // ─── APA ITU TRANSFER LEARNING ───────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(transfer\s*learning|fine.?tuning)/i,
      /jelaskan\s*(tentang\s*)?(transfer\s*learning|fine.?tuning)/i,
      /transfer\s*learning\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Transfer Learning = memanfaatkan model yang sudah dilatih pada dataset besar, lalu fine-tune untuk task spesifik kamu. Tidak perlu mulai dari nol! ♻️\n\nContoh: pakai ResNet yang sudah dilatih 1M gambar ImageNet → fine-tune untuk klasifikasi X-ray penyakit.',
      'Transfer Learning sangat berguna ketika:\n• Data kamu terbatas\n• Komputasi terbatas\n• Task mirip dengan domain pre-trained model\n\nModel populer: BERT (NLP), ResNet/EfficientNet (gambar), GPT (teks generasi) 🚀',
    ],
  },

  // ─── APA ITU NLP ─────────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(nlp|natural\s*language\s*processing|pemrosesan\s*bahasa)/i,
      /jelaskan\s*(tentang\s*)?nlp/i,
      /nlp\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'NLP (Natural Language Processing) adalah cabang AI yang memungkinkan komputer memahami, menginterpretasi, dan menghasilkan bahasa manusia. 💬\n\nAplikasi nyata: chatbot, Google Translate, Siri/Alexa, analisis sentimen, summarization.',
      'NLP pipeline standar:\n1. Tokenization (pecah teks jadi kata/token)\n2. Stop word removal (hapus kata tidak penting)\n3. Stemming/Lemmatization (kata dasar)\n4. Vectorization (TF-IDF, Word2Vec, BERT)\n5. Model (klasifikasi, clustering, dll) 📝',
    ],
  },

  // ─── APA ITU SENTIMENT ANALYSIS ──────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(sentiment\s*anal|analisis\s*sentimen)/i,
      /jelaskan\s*(tentang\s*)?(sentiment\s*anal|analisis\s*sentimen)/i,
      /sentiment\s*anal\w*\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Sentiment Analysis adalah teknik NLP untuk mendeteksi polaritas emosi dalam teks: positif, negatif, atau netral. 😊😐😠\n\nAplikasi: analisis review produk, monitoring brand di sosmed, feedback pelanggan, analisis berita.',
      'Pendekatan Sentiment Analysis:\n• Rule-based: kamus kata positif/negatif (VADER, TextBlob)\n• ML: Naive Bayes, SVM dengan TF-IDF\n• Deep Learning: LSTM, BERT (state of the art!)\n\nBahasa Indonesia: pakai IndoBERT dari HuggingFace! 🇮🇩',
    ],
  },

  // ─── APA ITU TIME SERIES ─────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(time\s*series|deret\s*waktu|data\s*berkala)/i,
      /jelaskan\s*(tentang\s*)?(time\s*series|deret\s*waktu)/i,
      /time\s*series\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'Time Series adalah data yang dikumpulkan secara berurutan berdasarkan waktu. Setiap titik data memiliki timestamp. ⏱️\n\nContoh: harga saham harian, suhu per jam, penjualan bulanan, traffic website per menit.',
      'Komponen Time Series:\n📈 Trend — kecenderungan naik/turun jangka panjang\n🔄 Seasonality — pola berulang periodik (harian/mingguan/tahunan)\n〰️ Cyclical — fluktuasi jangka panjang (tidak periodik tetap)\n🔀 Residual/Noise — variasi acak yang tidak bisa dijelaskan\n\nDecompose dengan `seasonal_decompose` dari statsmodels! 📊',
    ],
  },

  // ─── APA ITU SQL ─────────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*sql\b/i,
      /jelaskan\s*(tentang\s*)?sql\b/i,
      /sql\s*(itu\s*apa|adalah|artinya|digunakan\s*untuk)\b/i,
      /fungsi\s*sql|kegunaan\s*sql/i,
    ],
    responses: [
      'SQL (Structured Query Language) adalah bahasa untuk berkomunikasi dengan database relasional — membuat, membaca, mengupdate, dan menghapus data. 🗄️\n\nSQL digunakan di hampir semua database: MySQL, PostgreSQL, SQLite, BigQuery, Snowflake, dll.',
      'SQL command utama:\n📖 SELECT — ambil data\n➕ INSERT — tambah data\n✏️ UPDATE — ubah data\n🗑️ DELETE — hapus data\n🏗️ CREATE TABLE — buat tabel\n\nSQL adalah skill WAJIB untuk Data Analyst dan Data Engineer! Hampir semua wawancara kerja di bidang data pasti ada SQL. 💼',
    ],
  },

  // ─── APA ITU A/B TESTING ─────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(a\/b\s*test|ab\s*test|split\s*test)/i,
      /jelaskan\s*(tentang\s*)?(a\/b\s*test|ab\s*test)/i,
      /(a\/b|ab)\s*test\w*\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'A/B Testing adalah eksperimen terkontrol untuk membandingkan dua versi (A dan B) dari sesuatu — untuk menentukan mana yang lebih efektif. 🧪\n\nContoh: tombol "Beli Sekarang" warna merah (A) vs hijau (B) — mana yang conversion rate-nya lebih tinggi?',
      'Alur A/B Testing yang benar:\n1️⃣ Tentukan hipotesis & metric utama\n2️⃣ Hitung sample size yang dibutuhkan\n3️⃣ Randomisasi user ke grup A & B\n4️⃣ Jalankan cukup lama (jangan hentikan terlalu cepat!)\n5️⃣ Analisis dengan t-test atau chi-square\n6️⃣ Keputusan berdasarkan statistical significance + business impact 🎯',
    ],
  },

  // ─── APA ITU ETL ─────────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(etl|elt|data\s*pipeline|pipeline\s*data)/i,
      /jelaskan\s*(tentang\s*)?(etl|elt|data\s*pipeline)/i,
      /etl\s*(itu\s*apa|adalah|artinya)/i,
    ],
    responses: [
      'ETL (Extract, Transform, Load) adalah proses memindahkan data dari source ke destination:\n📤 Extract — ambil data dari sumber (DB, API, file)\n🔄 Transform — bersihkan, format, agregasi\n📥 Load — simpan ke data warehouse/lake\n\nTools: Apache Airflow, dbt, Talend, Fivetran 🔧',
      'ETL vs ELT:\n• ETL (tradisional) → transform SEBELUM load ke warehouse\n• ELT (modern) → load dulu RAW, transform di dalam warehouse\n\nELT lebih populer sekarang karena cloud warehouse (BigQuery, Snowflake) sangat powerful untuk transform data besar! ☁️',
    ],
  },

  // ─── APA ITU DATA WAREHOUSE ──────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(data\s*warehouse|gudang\s*data|snowflake|bigquery|redshift)/i,
      /jelaskan\s*(tentang\s*)?data\s*warehouse/i,
      /data\s*warehouse\s*(itu\s*apa|adalah|artinya|vs\s*database)/i,
      /bedanya\s*data\s*warehouse\s*(dan|vs|dengan)\s*database/i,
    ],
    responses: [
      'Data Warehouse adalah sistem penyimpanan data yang dioptimasi untuk analitik dan pelaporan — bukan untuk operasional transaksi harian. 🏛️\n\nBerbeda dengan database biasa (OLTP), Data Warehouse (OLAP) didesain untuk query besar, aggregasi, dan historical analysis.',
      'OLTP vs OLAP:\n⚡ OLTP (Database) → transaksi cepat, data terkini, banyak write\n📊 OLAP (Warehouse) → query analitik, data historis, banyak read\n\nPopuler: BigQuery (Google), Snowflake, Amazon Redshift\nQuery ribuan juta baris dalam detik! 🚀',
    ],
  },

  // ─── APA ITU KORELASI ────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(korelasi|correlation)/i,
      /jelaskan\s*(tentang\s*)?korelasi/i,
      /korelasi\s*(itu\s*apa|adalah|artinya)/i,
      /korelasi\s*(vs|dan)\s*kausalitas/i,
    ],
    responses: [
      'Korelasi mengukur seberapa kuat hubungan antara dua variabel. Nilai -1 hingga +1:\n• r = +1 → korelasi positif sempurna (naik bersama)\n• r = 0 → tidak ada hubungan linear\n• r = -1 → korelasi negatif sempurna (berlawanan)\n\nContoh: es krim terjual vs suhu udara → korelasi positif! 🍦☀️',
      '⚠️ Korelasi ≠ Kausalitas!\n\nFun example: Konsumsi es krim berkorelasi dengan tenggelam — tapi bukan berarti es krim menyebabkan orang tenggelam! (keduanya tinggi di musim panas)\n\nSelalu cari penjelasan kausal yang logis sebelum mengambil kesimpulan dari korelasi! 🔬',
    ],
  },

  // ─── APA ITU REGRESI ─────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(regresi|regression)(?!\s*logistik)/i,
      /jelaskan\s*(tentang\s*)?regresi\s*linear/i,
      /regresi\s*(itu\s*apa|adalah|artinya|linear)/i,
    ],
    responses: [
      'Regresi Linear adalah algoritma ML untuk memprediksi nilai numerik kontinu berdasarkan satu atau lebih variabel input. 📈\n\nContoh: prediksi harga rumah berdasarkan luas, lokasi, jumlah kamar.\n\nFormula dasar: y = mx + b (garis terbaik yang fit data!)',
      'Jenis regresi:\n📏 Simple Linear Regression — 1 variabel independen\n📐 Multiple Linear Regression — banyak variabel independen\n📊 Polynomial Regression — hubungan non-linear\n🔢 Ridge/Lasso Regression — dengan regularisasi\n✅ Logistic Regression — untuk klasifikasi (bukan regresi!)',
    ],
  },

  // ─── APA ITU VISUALISASI DATA ────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(visualisasi\s*data|data\s*visualization)/i,
      /jelaskan\s*(tentang\s*)?visualisasi\s*data/i,
      /visualisasi\s*data\s*(itu\s*apa|adalah|artinya|penting)/i,
      /kenapa\s*visualisasi\s*data\s*(penting|perlu)/i,
    ],
    responses: [
      'Visualisasi data adalah representasi grafis dari data untuk membantu manusia memahami pola, tren, dan insight lebih mudah dari angka mentah. 📊\n\n"A picture is worth a thousand words" — berlaku juga untuk data!',
      'Memilih jenis chart yang tepat:\n📈 Line chart → tren waktu\n📊 Bar chart → perbandingan kategori\n🔵 Scatter plot → hubungan 2 variabel\n🥧 Pie chart → proporsi (max 5 kategori!)\n📦 Box plot → distribusi & outlier\n🔥 Heatmap → korelasi atau matrix\n📉 Histogram → distribusi satu variabel 🎨',
    ],
  },

  // ─── APA ITU OUTLIER ─────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*(itu|yang\s*dimaksud|arti|definisi|pengertian)\s*(outlier|pencilan|anomali)/i,
      /jelaskan\s*(tentang\s*)?(outlier|pencilan)/i,
      /outlier\s*(itu\s*apa|adalah|artinya|cara\s*deteksi|cara\s*handle)/i,
      /cara\s*(deteksi|handle|tangani)\s*outlier/i,
    ],
    responses: [
      'Outlier adalah titik data yang sangat berbeda dari sebagian besar data lainnya. Bisa karena kesalahan pengukuran, atau memang kejadian langka yang nyata. 🔴\n\nContoh: gaji rata-rata karyawan 5 juta, tapi CEO bergaji 1 miliar → outlier!',
      'Cara deteksi outlier:\n• Z-score > 3 atau < -3\n• IQR method: nilai < Q1-1.5×IQR atau > Q3+1.5×IQR\n• Visualisasi boxplot\n• DBSCAN clustering (label -1 = outlier)\n\nCara handle:\n🗑️ Drop (kalau noise/error)\n✂️ Cap/winsorize\n🔄 Transform (log)\n🤖 Pakai algoritma robust (Median, MAD) ⚠️',
    ],
  },

  // ─── PERBANDINGAN UMUM DS TOOLS ──────────────────────────────────────────
  {
    patterns: [
      /python\s*(vs|atau|dibanding)\s*r\b/i,
      /r\s*(vs|atau|dibanding)\s*python\b.*data/i,
      /pilih\s*(python|r\b)\s*(untuk|buat)\s*data/i,
    ],
    responses: [
      'Python vs R untuk Data Science:\n🐍 Python → lebih serbaguna, bisa web dev & ML production, komunitas besar, lebih mudah dipelajari\n📊 R → lebih kuat untuk statistika akademik & visualisasi (ggplot2), banyak dipakai di riset & bioinformatika\n\nRekomendasi: mulai Python kalau mau karir industri! 🏆',
    ],
  },
  {
    patterns: [
      /tableau\s*(vs|atau|dibanding)\s*power\s*bi/i,
      /power\s*bi\s*(vs|atau|dibanding)\s*tableau/i,
      /pilih\s*(tableau|power\s*bi)/i,
    ],
    responses: [
      'Tableau vs Power BI:\n📊 Tableau → visualisasi lebih fleksibel & powerful, lebih mahal, banyak dipakai di enterprise besar\n📊 Power BI → terintegrasi dengan Microsoft ecosystem, lebih terjangkau, DAX untuk kalkulasi advanced\n\nKeduanya punya versi free untuk belajar. Coba keduanya! ⚖️',
    ],
  },

  // ─── PERTANYAAN UMUM DS ───────────────────────────────────────────────────
  {
    patterns: [
      /bagaimana\s*(cara|langkah|tahapan|proses)\s*(belajar|mulai|memulai)\s*(data\s*science|data\s*anal|machine\s*learning)/i,
      /mulai\s*(dari\s*mana|darimana|dari\s*mana)\s*(data\s*science|data\s*anal|ml\b)/i,
      /mau\s*(belajar|mulai)\s*(data\s*science|data\s*anal)/i,
    ],
    responses: [
      'Roadmap belajar Data Science dari nol:\n\n🌱 Tahap 1 — Fondasi (1-2 bulan):\n• Matematika: aljabar linear, kalkulus dasar, probabilitas\n• Statistika deskriptif & inferensial\n• Python dasar (variabel, loop, fungsi, OOP)\n\n🌿 Tahap 2 — Data Manipulation (1-2 bulan):\n• Pandas & NumPy\n• SQL (sangat penting!)\n• Matplotlib & Seaborn\n\n🌳 Tahap 3 — Machine Learning (2-3 bulan):\n• Scikit-learn\n• Algoritma klasifikasi, regresi, clustering\n• Evaluasi model\n\n🏔️ Tahap 4 — Spesialisasi:\n• Deep Learning (TF/PyTorch)\n• NLP atau Computer Vision\n• Big Data (Spark) 🚀',
      'Quick start Data Science:\n1. Pelajari Python dasar (2 minggu)\n2. Pandas & visualisasi (1 bulan)\n3. Buat proyek EDA dari dataset Kaggle (terus-terusan!)\n4. Scikit-learn untuk ML dasar (1 bulan)\n5. Upload ke GitHub, tulis blog\n6. Apply kerja atau kompetisi Kaggle! 💪',
    ],
  },

  // ─── PERBEDAAN DATA ROLES ─────────────────────────────────────────────────
  {
    patterns: [
      /perbedaan\s*(data\s*scientist|data\s*analyst|data\s*engineer)/i,
      /bedanya\s*(data\s*scientist|data\s*analyst|data\s*engineer)/i,
      /(data\s*scientist|data\s*analyst|data\s*engineer)\s*(vs|atau|dibanding|beda)/i,
    ],
    responses: [
      'Perbedaan role data:\n\n📊 Data Analyst\n→ Fokus: "Apa yang terjadi?"\n→ Tools: SQL, Excel, Power BI/Tableau\n→ Output: laporan, dashboard, insight\n\n🤖 Data Scientist\n→ Fokus: "Apa yang akan terjadi?"\n→ Tools: Python, ML, statistika\n→ Output: model prediktif, eksperimen\n\n🏗️ Data Engineer\n→ Fokus: "Bagaimana data sampai ke sana?"\n→ Tools: Spark, Airflow, dbt, cloud\n→ Output: pipeline, data warehouse\n\n🧠 ML Engineer\n→ Fokus: "Bagaimana model berjalan di production?"\n→ Tools: MLOps, Docker, APIs\n→ Output: deployed model, monitoring 💼',
    ],
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ██████████████   GELOMBANG 3 — MASSIVE EXPANSION   ████████████████████████
  // ════════════════════════════════════════════════════════════════════════════

  // ══════════════════════  WEB DEVELOPMENT LANJUTAN  ═══════════════════════════

  // ─── NEXT.JS ─────────────────────────────────────────────────────────────
  {
    patterns: [
      /\bnext\.?js\b/i,
      /apa\s*itu\s*next\.?js/i,
      /next\.?js\s*(itu\s*apa|adalah|vs\s*react|keunggulan)/i,
      /\b(ssr|ssg|isr|server\s*side\s*rendering|static\s*site\s*generation)\b/i,
    ],
    responses: [
      'Next.js adalah React framework dengan fitur tambahan: SSR, SSG, file-based routing, API routes, dan optimasi built-in. Production-ready dari hari pertama! ⚡',
      'SSR vs SSG vs ISR di Next.js:\n🖥️ SSR (getServerSideProps) — render di server tiap request\n📄 SSG (getStaticProps) — render saat build, super cepat\n🔄 ISR (revalidate) — SSG yang bisa diupdate berkala\n🎯 CSR — render di browser (React biasa)',
      'Next.js 13+ App Router adalah masa depan Next.js! Gunakan Server Components untuk performa maksimal, Client Components hanya saat butuh interaktivitas. 🚀',
      'Struktur folder Next.js App Router:\n```\napp/\n  layout.tsx    → root layout\n  page.tsx      → halaman utama\n  loading.tsx   → loading UI\n  error.tsx     → error boundary\n  api/route.ts  → API endpoint\n```',
    ],
  },

  // ─── VUE.JS ──────────────────────────────────────────────────────────────
  {
    patterns: [
      /\bvue\.?js\b|\bvuejs\b/i,
      /apa\s*itu\s*vue/i,
      /vue\s*(vs\s*react|itu\s*apa|adalah)/i,
      /\b(nuxt|pinia|vuex|vue\s*router)\b/i,
    ],
    responses: [
      'Vue.js adalah JavaScript framework progresif — bisa dipakai sebagian kecil atau full SPA. Kurva belajar lebih landai dari React! 💚',
      'Vue.js vs React:\n💚 Vue → template syntax lebih familiar (mirip HTML), two-way binding, opinionated\n⚛️ React → JSX, one-way data flow, ekosistem lebih besar\n\nKeduanya excellent — pilih sesuai preferensi tim!',
      'Vue 3 Composition API sangat mirip React Hooks. Nuxt.js = Next.js-nya Vue. Pinia = state manager modern Vue 3. 🔧',
    ],
  },

  // ─── SVELTE ──────────────────────────────────────────────────────────────
  {
    patterns: [
      /\bsvelte\b|\bsveltekit\b/i,
      /apa\s*itu\s*svelte/i,
      /svelte\s*(vs\s*react|itu\s*apa|adalah)/i,
    ],
    responses: [
      'Svelte adalah framework yang berbeda — tidak ada Virtual DOM! Svelte compile ke vanilla JS saat build, hasil akhirnya sangat kecil dan cepat. 🚀',
      'Svelte keunggulan:\n✅ Bundle size sangat kecil\n✅ Sintaks paling simpel\n✅ Reaktivitas built-in (tidak butuh useState)\n✅ Performa excellent\n\nSvelteKit = Next.js-nya Svelte. Worth learning! ⚡',
    ],
  },

  // ─── STATE MANAGEMENT ─────────────────────────────────────────────────────
  {
    patterns: [
      /\b(state\s*management|redux|zustand|jotai|recoil|context\s*api|global\s*state)\b/i,
      /apa\s*itu\s*(redux|zustand|state\s*management)/i,
      /kapan\s*(pakai|gunakan)\s*(redux|zustand|context)/i,
    ],
    responses: [
      'State management pilihan 2024:\n🏆 Zustand — simpel, ringan, tidak boilerplate (rekomendasi!)\n⚛️ Redux Toolkit — powerful, DevTools bagus, cocok project besar\n🔮 Jotai — atomic, sangat fleksibel\n🌊 Recoil — dari Facebook, atom-based\n📦 Context API — built-in React, cocok state sederhana',
      'Kapan butuh state manager?\n✅ State diakses banyak komponen yang tidak berhubungan langsung\n✅ State kompleks dengan banyak aksi\n✅ Butuh time-travel debugging\n\n❌ Jangan over-engineer! useState + props sudah cukup untuk banyak kasus. 🎯',
      'Zustand quickstart (paling direkomendasikan):\n```ts\nimport { create } from "zustand"\n\nconst useStore = create((set) => ({\n  count: 0,\n  increment: () => set((s) => ({ count: s.count + 1 })),\n  reset: () => set({ count: 0 }),\n}))\n\n// Di komponen:\nconst { count, increment } = useStore()\n```',
    ],
  },

  // ─── WEBSOCKET & REALTIME ─────────────────────────────────────────────────
  {
    patterns: [
      /\b(websocket|socket\.?io|realtime|real.time|sse|server.sent\s*event)\b/i,
      /apa\s*itu\s*(websocket|socket\.io)/i,
      /\b(chat\s*app|live\s*update|push\s*notification)\b/i,
    ],
    responses: [
      'WebSocket memungkinkan komunikasi dua arah real-time antara browser dan server — berbeda dari HTTP yang one-direction! 🔌\n\nAplikasi: chat app, live dashboard, collaborative editing, game multiplayer, notifikasi real-time.',
      'WebSocket vs HTTP:\n📡 HTTP → request-response, client harus polling\n🔌 WebSocket → full-duplex, koneksi persistent, server bisa push data kapan saja\n📨 SSE → server push saja (satu arah), lebih sederhana dari WS\n\nSocket.io = library WS dengan fallback dan room management! 🚀',
      'Socket.io quickstart:\n```js\n// Server (Node.js)\nconst io = require("socket.io")(server)\nio.on("connection", (socket) => {\n  socket.on("message", (data) => {\n    io.emit("message", data) // broadcast ke semua\n  })\n})\n\n// Client\nconst socket = io()\nsocket.emit("message", "Hello!")\nsocket.on("message", (data) => console.log(data))\n```',
    ],
  },

  // ─── PWA ─────────────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(pwa|progressive\s*web\s*app|service\s*worker|manifest\.json|offline\s*app|installable)\b/i,
      /apa\s*itu\s*pwa/i,
      /buat\s*(app|aplikasi)\s*(offline|installable)/i,
    ],
    responses: [
      'PWA (Progressive Web App) adalah web app yang bisa diinstall di device seperti native app, berjalan offline, dan dapat push notification! 📱\n\nTiga pilar PWA: HTTPS + Service Worker + Web App Manifest.',
      'Vite + PWA setup:\n```bash\nnpm install vite-plugin-pwa\n```\n```ts\n// vite.config.ts\nimport { VitePWA } from "vite-plugin-pwa"\nexport default defineConfig({\n  plugins: [VitePWA({\n    registerType: "autoUpdate",\n    manifest: {\n      name: "FutureStack",\n      short_name: "FutureStack",\n      theme_color: "#000000",\n    }\n  })]\n})\n```',
    ],
  },

  // ─── GRAPHQL ─────────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(graphql|apollo|relay|gql\b|query\s*graphql|mutation\s*graphql)\b/i,
      /apa\s*itu\s*graphql/i,
      /graphql\s*(vs\s*rest|itu\s*apa|adalah)/i,
    ],
    responses: [
      'GraphQL adalah query language untuk API — berbeda dari REST, client menentukan sendiri data apa yang dibutuhkan. Tidak ada over-fetching atau under-fetching! 🎯',
      'GraphQL vs REST:\n📡 REST → multiple endpoints, fixed response structure\n🔮 GraphQL → single endpoint (/graphql), client-driven data fetching\n\nKapan pakai GraphQL:\n✅ Data kompleks dan berhubungan\n✅ Banyak tipe client (web, mobile)\n✅ Tim frontend butuh fleksibilitas\n❌ Overkill untuk CRUD sederhana!',
    ],
  },

  // ─── MICROSERVICES ────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(microservice|micro\s*service|monolith|monolithic|api\s*gateway|service\s*mesh)\b/i,
      /apa\s*itu\s*microservice/i,
      /microservice\s*(vs\s*monolith|itu\s*apa|adalah)/i,
    ],
    responses: [
      'Microservices vs Monolith:\n🏛️ Monolith → satu codebase besar, simple awalnya, makin susah scale\n🔬 Microservices → banyak service kecil independen, complex tapi scalable\n\n"Start with monolith, extract microservices when needed." — Martin Fowler 🎯',
      'Microservices keuntungan:\n✅ Scale service tertentu saja\n✅ Deploy independent\n✅ Tech stack berbeda per service\n\nKerugian:\n❌ Kompleksitas operasional tinggi\n❌ Network latency antar service\n❌ Debugging lebih susah\n\nJangan pakai microservices kalau belum butuh! ⚠️',
    ],
  },

  // ─── LINUX & TERMINAL ─────────────────────────────────────────────────────
  {
    patterns: [
      /\b(linux|terminal|bash|shell|command\s*line|cli\b|unix|zsh|chmod|ssh\b|grep\b|curl\b|wget\b)\b/i,
      /perintah\s*(linux|terminal|bash)/i,
      /cara\s*(pakai|belajar)\s*(linux|terminal)/i,
    ],
    responses: [
      'Perintah Linux wajib developer:\n📁 `ls -la` — list file + hidden\n📂 `cd`, `mkdir`, `rm -rf`\n📄 `cat`, `nano`, `vim`\n🔍 `grep -r "text" .` — cari teks dalam file\n⚡ `chmod +x file` — beri izin eksekusi\n🌐 `curl -X GET url` — HTTP request\n🔗 `ssh user@server` — remote login',
      'Terminal tips produktivitas:\n• `Ctrl+R` — search history command\n• `!!` — ulangi command terakhir\n• `&&` — jalankan command berantai\n• `|` (pipe) — output jadi input command berikutnya\n• `alias ll="ls -la"` — buat shortcut command\n• `tmux` atau `screen` — sesi terminal multipel! 🖥️',
      'Bash script dasar:\n```bash\n#!/bin/bash\n# Deploy script\necho "Building..."\nnpm run build\necho "Deploying..."\ngit add .\ngit commit -m "deploy: $(date)"\ngit push\necho "Done! ✅"\n```',
    ],
  },

  // ─── CI/CD ────────────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(ci\/cd|cicd|continuous\s*(integration|deployment|delivery)|github\s*actions|gitlab\s*ci|jenkins|pipeline\s*ci)\b/i,
      /apa\s*itu\s*(ci\/cd|cicd|github\s*actions)/i,
      /otomatis\s*(deploy|test|build)/i,
    ],
    responses: [
      'CI/CD:\n🔄 CI (Continuous Integration) — otomatis test & build setiap push\n🚀 CD (Continuous Deployment) — otomatis deploy ke production\n\nManfaat: bug terdeteksi lebih awal, deploy lebih sering & aman, kurangi manual error! 🎯',
      'GitHub Actions workflow lengkap:\n```yaml\nname: CI/CD Pipeline\non: [push]\njobs:\n  test-and-deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: actions/setup-node@v3\n        with:\n          node-version: 18\n          cache: npm\n      - run: npm ci\n      - run: npm test\n      - run: npm run build\n      - name: Deploy\n        if: github.ref == "refs/heads/main"\n        run: npm run deploy\n```',
    ],
  },

  // ─── MONOREPO ─────────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(monorepo|turbo\s*repo|nx\b|lerna|workspace\s*npm|pnpm\s*workspace)\b/i,
      /apa\s*itu\s*monorepo/i,
      /monorepo\s*(itu\s*apa|adalah|vs\s*polyrepo)/i,
    ],
    responses: [
      'Monorepo = satu repository berisi banyak package/app. Kebalikannya polyrepo (satu repo per project).\n\nContoh: Vercel, Google, Meta pakai monorepo untuk ratusan package! 📦',
      'Tools monorepo populer:\n⚡ Turborepo — caching build cerdas, super cepat\n🔧 Nx — feature lengkap, cocok enterprise\n📦 pnpm workspaces — simpel dan ringan\n\nKapan pakai monorepo: shared component library, frontend + backend di satu repo, banyak app yang saling berbagi kode! 🔗',
    ],
  },

  // ══════════════════════  BACKEND & SERVER  ═══════════════════════════════════

  // ─── NODE.JS BACKEND ──────────────────────────────────────────────────────
  {
    patterns: [
      /\b(express\.?js|express\s*js|fastify|hono\b|koa\b|nestjs|nest\.js)\b/i,
      /\bbackend\s*(node|javascript|typescript)\b/i,
      /apa\s*itu\s*(express|nestjs|fastify)/i,
    ],
    responses: [
      'Node.js backend frameworks:\n⚡ Express.js — paling populer, minimal, fleksibel\n🚀 Fastify — 2x lebih cepat dari Express, schema validation\n🏗️ NestJS — opinionated, TypeScript-first, cocok enterprise\n🔥 Hono — ultra lightweight, edge-ready\n\nRekomendasi 2024: Fastify atau Hono untuk performa! 💪',
      'Express.js REST API dasar:\n```js\nconst express = require("express")\nconst app = express()\napp.use(express.json())\n\napp.get("/api/users", (req, res) => {\n  res.json({ users: [] })\n})\n\napp.post("/api/users", (req, res) => {\n  const { name, email } = req.body\n  // simpan ke database\n  res.status(201).json({ message: "Created" })\n})\n\napp.listen(3000, () => console.log("Server running! 🚀"))\n```',
    ],
  },

  // ─── PRISMA ORM ───────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(prisma\b|drizzle\b|orm\b|type\s*orm|sequelize)\b/i,
      /apa\s*itu\s*(prisma|orm\b|drizzle)/i,
      /database\s*(dengan|pakai)\s*(prisma|orm)/i,
    ],
    responses: [
      'Prisma adalah ORM TypeScript-first yang paling populer untuk Node.js. Type-safe queries, auto-migration, dan Prisma Studio! 🔧\n```bash\nnpm install prisma @prisma/client\nnpx prisma init\nnpx prisma migrate dev\n```',
      'Prisma schema contoh:\n```prisma\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String?\n  posts     Post[]\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id       Int    @id @default(autoincrement())\n  title    String\n  content  String?\n  author   User   @relation(fields: [authorId], references: [id])\n  authorId Int\n}\n```',
      'Prisma vs Drizzle 2024:\n🔷 Prisma → lebih mature, lebih mudah, Prisma Studio GUI\n🔶 Drizzle → lebih ringan, SQL-like syntax, lebih cepat, zero dependency\n\nKeduanya type-safe. Drizzle trending naik! 📈',
    ],
  },

  // ─── REST API BEST PRACTICE ───────────────────────────────────────────────
  {
    patterns: [
      /\brest\s*api\s*(best\s*practice|standar|yang\s*baik|design)\b/i,
      /\bapi\s*design\b/i,
      /cara\s*(buat|design|rancang)\s*api\s*(yang\s*baik|rest)/i,
      /\b(http\s*status\s*code|status\s*code\s*api|200|201|400|401|403|404|500)\b/i,
    ],
    responses: [
      'HTTP Status Code yang benar:\n✅ 200 OK — sukses GET/PUT\n✅ 201 Created — sukses POST (data baru)\n✅ 204 No Content — sukses DELETE\n❌ 400 Bad Request — input user salah\n❌ 401 Unauthorized — belum login\n❌ 403 Forbidden — tidak punya akses\n❌ 404 Not Found — resource tidak ada\n💥 500 Internal Server Error — bug di server',
      'REST API naming conventions:\n✅ `/api/v1/users` — plural noun\n✅ `/api/v1/users/123` — resource by ID\n✅ `/api/v1/users/123/posts` — nested resource\n❌ `/api/v1/getUsers` — jangan pakai verb!\n❌ `/api/v1/user` — jangan singular!\n\nGunakan HTTP verb (GET/POST/PUT/PATCH/DELETE) sebagai "kata kerja"! 🎯',
      'API versioning penting! Selalu prefix dengan `/v1/`, `/v2/` agar tidak breaking change untuk client lama. Rate limiting & pagination juga wajib di production! 🔒',
    ],
  },

  // ─── AUTHENTICATION JWT ───────────────────────────────────────────────────
  {
    patterns: [
      /\bimplementasi\s*(jwt|auth|autentikasi)\b/i,
      /cara\s*(buat|implement|pasang)\s*(jwt|login\s*system|autentikasi)/i,
      /\b(refresh\s*token|access\s*token|bearer\s*token)\b/i,
    ],
    responses: [
      'JWT Auth flow yang benar:\n1️⃣ User login → server validasi → buat access token (15 menit) + refresh token (7 hari)\n2️⃣ Client simpan access token di memory, refresh token di httpOnly cookie\n3️⃣ Setiap request: kirim access token di Authorization header\n4️⃣ Access token expired → gunakan refresh token untuk dapat yang baru\n5️⃣ Logout → hapus refresh token dari database + clear cookie 🔐',
      'JWT implementation Node.js:\n```js\nconst jwt = require("jsonwebtoken")\n\n// Generate token\nconst accessToken = jwt.sign(\n  { userId: user.id, role: user.role },\n  process.env.JWT_SECRET,\n  { expiresIn: "15m" }\n)\n\n// Verify token (middleware)\nconst verifyToken = (req, res, next) => {\n  const token = req.headers.authorization?.split(" ")[1]\n  if (!token) return res.status(401).json({ error: "Unauthorized" })\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET)\n    next()\n  } catch {\n    res.status(401).json({ error: "Token invalid/expired" })\n  }\n}\n```',
    ],
  },

  // ══════════════════════  DATA SCIENCE LANJUTAN  ══════════════════════════════

  // ─── APA ITU NEURAL NETWORK ───────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(neural\s*network|jaringan\s*saraf\s*tiruan|ann\b|jst\b)/i,
      /jelaskan\s*(tentang\s*)?(neural\s*network|jaringan\s*saraf)/i,
      /neural\s*network\s*(cara\s*kerja|itu\s*apa|adalah)/i,
      /cara\s*kerja\s*neural\s*network/i,
    ],
    responses: [
      'Neural Network adalah model ML yang terinspirasi dari otak manusia. Terdiri dari neuron buatan yang tersusun dalam lapisan (layers):\n\n🔵 Input Layer — menerima data\n🟡 Hidden Layer(s) — proses & transformasi\n🟢 Output Layer — hasil prediksi\n\nSetiap koneksi punya bobot (weight) yang dioptimasi saat training! 🧠',
      'Cara kerja Neural Network sederhana:\n1️⃣ Forward pass: data → input → hidden → output (prediksi)\n2️⃣ Hitung error (loss function)\n3️⃣ Backward pass: hitung gradient setiap weight\n4️⃣ Update weight dengan gradient descent\n5️⃣ Ulangi ribuan kali hingga error kecil\n\nProses update weight = "belajar" dari data! 📈',
    ],
  },

  // ─── APA ITU CNN ──────────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(cnn\b|convolutional\s*neural|jaringan\s*konvolusi)/i,
      /jelaskan\s*(tentang\s*)?(cnn\b|convolutional)/i,
      /cnn\s*(itu\s*apa|adalah|cara\s*kerja|digunakan\s*untuk)/i,
      /\b(image\s*classification|object\s*detection|computer\s*vision)\s*(itu\s*apa|adalah)/i,
    ],
    responses: [
      'CNN (Convolutional Neural Network) adalah arsitektur deep learning khusus untuk data visual (gambar & video). 🖼️\n\nIde utama: scan gambar dengan filter kecil (kernel) untuk mendeteksi fitur — mulai dari tepi sederhana hingga wajah yang kompleks!',
      'Lapisan CNN:\n🔍 Conv Layer — deteksi fitur dengan filter\n📉 Pooling Layer — kurangi dimensi, pertahankan fitur penting\n🔗 Flatten — ubah ke 1D\n🧠 Dense Layer — klasifikasi akhir\n\nAplikasi: face recognition, medical imaging, self-driving car, OCR! 🚗',
    ],
  },

  // ─── APA ITU RNN / LSTM ───────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(rnn\b|lstm\b|gru\b|recurrent\s*neural)/i,
      /jelaskan\s*(tentang\s*)?(rnn\b|lstm\b|recurrent)/i,
      /(rnn|lstm|gru)\s*(itu\s*apa|adalah|cara\s*kerja|digunakan\s*untuk)/i,
    ],
    responses: [
      'RNN (Recurrent Neural Network) didesain untuk data sekuensial — teks, time series, audio. Punya "memori" dari input sebelumnya! 🔄\n\nMasalah RNN: vanishing gradient untuk sekuens panjang.\nSolusi: LSTM dan GRU yang punya mekanisme "gerbang" untuk kontrol memori.',
      'LSTM (Long Short-Term Memory):\n🚪 Forget Gate — putuskan info mana yang dilupakan\n🚪 Input Gate — info baru mana yang disimpan\n🚪 Output Gate — info mana yang dikeluarkan\n\nSangat baik untuk: prediksi teks, speech recognition, machine translation, time series forecasting! 📝',
    ],
  },

  // ─── APA ITU TRANSFORMER ──────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(transformer\s*model|attention\s*mechanism|self.attention)/i,
      /jelaskan\s*(tentang\s*)?(transformer|attention\s*mechanism)/i,
      /transformer\s*(itu\s*apa|adalah|cara\s*kerja)/i,
      /kenapa\s*(bert|gpt|transformer)\s*(bagus|powerful|canggih)/i,
    ],
    responses: [
      'Transformer adalah arsitektur revolusioner (2017, "Attention is All You Need") yang menggantikan RNN untuk NLP. Kunci utamanya: Attention Mechanism! 🤖\n\nBerbeda RNN yang proses sekuensial, Transformer proses semua token secara paralel → jauh lebih cepat!',
      'Self-Attention memungkinkan model fokus ke bagian teks yang relevan saat memproses setiap kata. Contoh:\n\n"Bank [sungai] mengalir deras" vs "Saldo [bank] habis"\n→ Transformer tahu "bank" bermakna berbeda berdasarkan konteks sekitar! 🧠\n\nDari Transformer lahir: BERT, GPT, T5, LLaMA, Claude, dan semua LLM modern!',
    ],
  },

  // ─── APA ITU BERT & GPT ───────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(bert\b|gpt\b|llm\b|large\s*language\s*model)/i,
      /jelaskan\s*(tentang\s*)?(bert\b|gpt\b|llm\b)/i,
      /(bert|gpt|llm)\s*(itu\s*apa|adalah|cara\s*kerja|perbedaan)/i,
      /bedanya\s*(bert|gpt)/i,
    ],
    responses: [
      'BERT vs GPT:\n🔵 BERT (Google, 2018) → encoder-only, dilatih dengan masked language modeling, bagus untuk klasifikasi & NER\n🟢 GPT (OpenAI) → decoder-only, dilatih untuk predict next token, bagus untuk generate teks\n\nBERT "memahami" teks, GPT "menghasilkan" teks! 🤖',
      'LLM (Large Language Model) adalah model bahasa skala besar yang dilatih dengan data teks masif. Contoh: GPT-4, Claude, Gemini, LLaMA.\n\nCara kerja sederhana: prediksi token berikutnya berulang-ulang. Tapi dengan miliaran parameter → bisa "mengerti" dan "bernalar"! 🧠',
    ],
  },

  // ─── APA ITU RAG ──────────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(rag\b|retrieval.augmented|vector\s*database|embedding\s*vector)/i,
      /jelaskan\s*(tentang\s*)?(rag\b|retrieval\s*augmented|vector\s*db)/i,
      /(rag|vector\s*database)\s*(itu\s*apa|adalah|cara\s*kerja)/i,
    ],
    responses: [
      'RAG (Retrieval-Augmented Generation) adalah teknik menggabungkan LLM dengan knowledge base eksternal:\n1️⃣ Dokumen di-embed ke vector\n2️⃣ Pertanyaan user di-embed\n3️⃣ Cari dokumen paling relevan (similarity search)\n4️⃣ Kirim dokumen + pertanyaan ke LLM\n5️⃣ LLM jawab berdasarkan konteks itu\n\nHasil: LLM yang bisa akses data up-to-date & private! 🔍',
      'Vector Database untuk RAG:\n• Pinecone — managed, production-ready\n• Weaviate — open source, powerful\n• Chroma — local dev, mudah dipakai\n• pgvector — ekstensi PostgreSQL\n\n```python\nfrom langchain.embeddings import OpenAIEmbeddings\nfrom langchain.vectorstores import Chroma\n\ndb = Chroma.from_documents(docs, OpenAIEmbeddings())\nresults = db.similarity_search("pertanyaan", k=3)\n```',
    ],
  },

  // ─── APA ITU COMPUTER VISION ──────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(computer\s*vision|visi\s*komputer|image\s*processing)/i,
      /jelaskan\s*(tentang\s*)?(computer\s*vision|image\s*processing)/i,
      /\b(opencv|yolo\b|object\s*detection|image\s*segmentation)\s*(itu\s*apa|adalah)/i,
    ],
    responses: [
      'Computer Vision adalah bidang AI yang memungkinkan komputer "melihat" dan memahami gambar/video. 👁️\n\nAplikasi:\n🚗 Self-driving car\n🏥 Deteksi kanker dari MRI/X-ray\n😊 Face recognition\n🛒 Checkout tanpa kasir (Amazon Go)\n🔍 Quality control di manufaktur',
      'OpenCV untuk Computer Vision Python:\n```python\nimport cv2\nimport numpy as np\n\nimg = cv2.imread("foto.jpg")\ngray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nblur = cv2.GaussianBlur(gray, (5,5), 0)\nedges = cv2.Canny(blur, 50, 150)\n\n# Deteksi wajah\nface_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")\nfaces = face_cascade.detectMultiScale(gray, 1.1, 4)\n```',
    ],
  },

  // ─── APA ITU DATA LAKE ────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(data\s*lake|data\s*lakehouse|delta\s*lake)/i,
      /jelaskan\s*(tentang\s*)?(data\s*lake|lakehouse)/i,
      /(data\s*lake|lakehouse)\s*(itu\s*apa|adalah|vs\s*warehouse)/i,
    ],
    responses: [
      'Data Lake adalah storage repository yang menyimpan data dalam format RAW (raw) — terstruktur, semi-terstruktur, dan tidak terstruktur. 🏞️\n\nPerbedaan dengan Data Warehouse:\n🏛️ Warehouse → structured, schema-on-write, mahal\n🏞️ Lake → semua format, schema-on-read, murah (S3/GCS)',
      'Lakehouse = terbaik dari Data Lake + Data Warehouse. Konsep modern yang diimplementasikan oleh Databricks Delta Lake, Apache Iceberg, dan Apache Hudi.\n\n✅ ACID transactions di atas object storage\n✅ Schema enforcement + evolution\n✅ Time travel (lihat data di masa lalu!)\n✅ Bisa untuk BI dan ML sekaligus 🚀',
    ],
  },

  // ─── APA ITU MLOPS ────────────────────────────────────────────────────────
  {
    patterns: [
      /apa\s*itu\s*(mlops|ml\s*ops|model\s*deployment|model\s*monitoring)/i,
      /jelaskan\s*(tentang\s*)?mlops/i,
      /mlops\s*(itu\s*apa|adalah|tools|pipeline)/i,
      /\b(model\s*drift|data\s*drift|model\s*monitoring\s*production)\b/i,
    ],
    responses: [
      'MLOps = DevOps untuk Machine Learning. Praktik dan tools untuk deploy, monitor, dan maintain model ML di production secara reliable. 🤖⚙️\n\nTantangan tanpa MLOps: "Model bagus di notebook, disaster di production!"',
      'MLOps pipeline:\n📦 Data versioning (DVC)\n🧪 Experiment tracking (MLflow, W&B)\n🔄 CI/CD untuk model\n🚀 Model serving (FastAPI, Seldon, BentoML)\n📊 Model monitoring (Evidently, Arize)\n🔀 A/B testing model\n\nModel drift = performa model menurun karena data dunia nyata berubah! Monitor selalu. 🔍',
    ],
  },

  // ─── STATISTIKA — PROBABILITAS ────────────────────────────────────────────
  {
    patterns: [
      /\b(probabilitas|probability|peluang|bayes|bayesian|prior|posterior|conditional\s*probability)\b/i,
      /apa\s*itu\s*(probabilitas|teorema\s*bayes|bayesian)/i,
      /teorema\s*bayes/i,
    ],
    responses: [
      'Probabilitas adalah ukuran kemungkinan suatu kejadian terjadi (0 = tidak mungkin, 1 = pasti). 🎲\n\nRumus dasar:\n• P(A ∪ B) = P(A) + P(B) - P(A ∩ B)\n• P(A ∩ B) = P(A) × P(B|A)\n• P(A|B) = P(B|A) × P(A) / P(B) ← Teorema Bayes!',
      'Teorema Bayes sangat penting di data science:\n\nP(A|B) = P(B|A) × P(A) / P(B)\n\nArtinya: "Perbarui keyakinan kita berdasarkan bukti baru"\n\nAplikasi: spam filter, medical diagnosis, Naive Bayes classifier, A/B testing!\n\nFun example: test positif COVID, berapa kemungkinan benar-benar sakit? Butuh Bayes! 🔬',
    ],
  },

  // ─── STATISTIKA — DISTRIBUSI ──────────────────────────────────────────────
  {
    patterns: [
      /\b(distribusi\s*normal|distribusi\s*binomial|distribusi\s*poisson|central\s*limit|hukum\s*bilangan\s*besar|gaussian\b)\b/i,
      /apa\s*itu\s*(distribusi\s*normal|gaussian|central\s*limit)/i,
      /distribusi\s*(normal|binomial|poisson)\s*(itu\s*apa|adalah)/i,
    ],
    responses: [
      'Distribusi yang sering dipakai di data science:\n📊 Normal (Gaussian) — simetris, kurva lonceng. Paling umum di alam\n🎯 Binomial — sukses/gagal dalam n percobaan\n⏱️ Poisson — jumlah kejadian dalam interval waktu\n📈 Exponential — waktu antar kejadian\n🎰 Uniform — semua nilai sama sering',
      'Central Limit Theorem (CLT) — teorema terpenting statistika!\n\n"Distribusi rata-rata sampel akan mendekati normal, apapun distribusi populasinya, jika ukuran sampel cukup besar (n ≥ 30)"\n\nIni mengapa banyak metode statistik parametrik bekerja dengan baik di praktik! 📐',
    ],
  },

  // ─── PANDAS LANJUTAN ──────────────────────────────────────────────────────
  {
    patterns: [
      /\b(pivot\s*table\s*pandas|melt\s*pandas|stack\s*pandas|multiindex|resample\s*pandas|apply\s*lambda)\b/i,
      /cara\s*(buat|pakai)\s*pivot\s*table\s*(pandas|python)/i,
      /pandas\s*(lanjutan|advanced|tips\s*pandas)/i,
    ],
    responses: [
      'Pandas Pivot Table:\n```python\n# Mirip pivot table Excel!\npivot = df.pivot_table(\n    values="revenue",\n    index="region",\n    columns="product_category",\n    aggfunc="sum",\n    fill_value=0\n)\n\n# Tambah margin (total)\npivot = df.pivot_table(\n    values="sales", index="month",\n    columns="category", aggfunc="sum",\n    margins=True, margins_name="Total"\n)\n```',
      'Pandas tips lanjutan:\n```python\n# apply() dengan lambda\ndf["bmi"] = df.apply(lambda r: r["weight"]/(r["height"]**2), axis=1)\n\n# Melt — wide to long format\ndf_long = df.melt(id_vars=["id","name"], var_name="bulan", value_name="nilai")\n\n# Resample time series\ndf_monthly = df.set_index("date").resample("M").agg({"revenue":"sum","orders":"count"})\n\n# Rolling window\ndf["ma7"] = df["price"].rolling(window=7).mean()\ndf["std7"] = df["price"].rolling(window=7).std()\n```',
    ],
  },

  // ─── SCIKIT-LEARN LANJUTAN ────────────────────────────────────────────────
  {
    patterns: [
      /\b(pipeline\s*sklearn|column\s*transformer|imbalanced|smote|oversampling|undersampling|class\s*weight)\b/i,
      /cara\s*handle\s*(imbalanced|class\s*imbalance|data\s*tidak\s*seimbang)/i,
      /sklearn\s*(pipeline|lanjutan|advanced)/i,
    ],
    responses: [
      'Scikit-learn Pipeline — hindari data leakage & bersihkan kode:\n```python\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.ensemble import RandomForestClassifier\n\nnum_features = ["age", "income"]\ncat_features = ["city", "category"]\n\npreprocessor = ColumnTransformer([\n    ("num", StandardScaler(), num_features),\n    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_features)\n])\n\npipeline = Pipeline([\n    ("prep", preprocessor),\n    ("model", RandomForestClassifier(n_estimators=100))\n])\n\npipeline.fit(X_train, y_train)\ny_pred = pipeline.predict(X_test)  # preprocessing otomatis!\n```',
      'Handle Class Imbalance:\n```python\nfrom imblearn.over_sampling import SMOTE\nfrom imblearn.under_sampling import RandomUnderSampler\n\n# SMOTE — generate sampel sintetis kelas minoritas\nsmote = SMOTE(random_state=42)\nX_res, y_res = smote.fit_resample(X_train, y_train)\n\n# Atau pakai class_weight di model\nmodel = RandomForestClassifier(class_weight="balanced")\n\n# Cek distribusi kelas\nprint(pd.Series(y).value_counts(normalize=True))\n```',
    ],
  },

  // ─── DATA WRANGLING LANJUTAN ──────────────────────────────────────────────
  {
    patterns: [
      /\b(data\s*wrangling|data\s*munging|reshape\s*data|wide\s*to\s*long|long\s*to\s*wide|tidy\s*data)\b/i,
      /cara\s*(reshape|ubah\s*format|transformasi)\s*data/i,
      /data\s*wrangling\s*(itu\s*apa|adalah|tips)/i,
    ],
    responses: [
      'Data Wrangling adalah proses membersihkan dan mengstrukturkan data agar siap dianalisis. Prinsip "Tidy Data":\n✅ Setiap variabel = satu kolom\n✅ Setiap observasi = satu baris\n✅ Setiap nilai = satu sel\n\n"Data wrangling takes 80% of time but gets 0% of the glory." 😅',
      'Teknik reshape data:\n```python\n# Wide to Long (melt)\ndf_long = pd.melt(df, id_vars=["nama"], value_vars=["jan","feb","mar"],\n                  var_name="bulan", value_name="penjualan")\n\n# Long to Wide (pivot)\ndf_wide = df_long.pivot(index="nama", columns="bulan", values="penjualan")\n\n# Stack / Unstack MultiIndex\ndf.stack()    # kolom → baris (wide to long)\ndf.unstack()  # baris → kolom (long to wide)\n```',
    ],
  },

  // ─── ANALISIS BISNIS & METRICS ────────────────────────────────────────────
  {
    patterns: [
      /\b(kpi\b|metrik\s*bisnis|business\s*metric|cohort\s*analysis|funnel\s*analysis|retention\s*rate|churn\s*rate|ltv\b|cac\b|arpu\b|dau|mau\b)\b/i,
      /apa\s*itu\s*(churn|retention|ltv|cac|arpu|cohort)/i,
      /cara\s*analisis\s*(churn|retention|funnel|cohort)/i,
    ],
    responses: [
      'Business Metrics penting:\n📊 DAU/MAU — Daily/Monthly Active Users\n🔄 Retention Rate — % user yang kembali\n📉 Churn Rate — % user yang berhenti\n💰 ARPU — Average Revenue Per User\n📈 LTV — Lifetime Value pelanggan\n💸 CAC — Cost to Acquire Customer\n\nRatio sehat: LTV / CAC > 3 adalah benchmark yang baik! 🎯',
      'Cohort Analysis — analisis kelompok user berdasarkan waktu join:\n```python\n# Hitung retention per cohort\ndf["cohort"] = df.groupby("user_id")["date"].transform("min").dt.to_period("M")\ndf["period"] = df["date"].dt.to_period("M")\ndf["period_number"] = (df["period"] - df["cohort"]).apply(lambda x: x.n)\n\ncohort_data = df.groupby(["cohort","period_number"])["user_id"].nunique().unstack()\ncohort_size = cohort_data.iloc[:, 0]\nretention = cohort_data.divide(cohort_size, axis=0)\n\nsns.heatmap(retention, annot=True, fmt=".0%", cmap="YlOrRd")\n```',
      'Funnel Analysis — analisis konversi per tahap:\n```python\n# Misal: Visit → Signup → Purchase\nfunnel_data = {\n    "Stage": ["Visit", "Signup", "Purchase"],\n    "Users": [10000, 3000, 800]\n}\ndf_funnel = pd.DataFrame(funnel_data)\ndf_funnel["Conversion"] = df_funnel["Users"] / df_funnel["Users"].iloc[0]\ndf_funnel["Drop-off"] = 1 - df_funnel["Users"] / df_funnel["Users"].shift(1)\n```',
    ],
  },

  // ─── FEATURE IMPORTANCE ───────────────────────────────────────────────────
  {
    patterns: [
      /\b(feature\s*importance|fitur\s*penting|fitur\s*mana\s*yang\s*penting|permutation\s*importance)\b/i,
      /cara\s*(cek|lihat|tampilkan)\s*feature\s*importance/i,
      /fitur\s*(mana|apa\s*saja)\s*yang\s*(paling\s*)?penting/i,
    ],
    responses: [
      'Feature Importance — fitur mana yang paling berpengaruh pada prediksi model:\n```python\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\n# Dari tree-based model\nfeature_imp = pd.Series(\n    rf_model.feature_importances_,\n    index=X_train.columns\n).sort_values(ascending=True)\n\nfeature_imp.plot(kind="barh", figsize=(10,8))\nplt.title("Feature Importance")\nplt.tight_layout()\n\n# Permutation importance (model-agnostic)\nfrom sklearn.inspection import permutation_importance\nresult = permutation_importance(model, X_test, y_test, n_repeats=10)\n```',
    ],
  },

  // ─── HYPOTHESIS TESTING LANJUTAN ─────────────────────────────────────────
  {
    patterns: [
      /\b(mann.whitney|wilcoxon|kruskal|non.parametrik|shapiro.wilk|uji\s*normalitas|levene|bartlett)\b/i,
      /cara\s*uji\s*(normalitas|homogenitas|non.parametrik)/i,
      /uji\s*statistik\s*(non.parametrik|alternatif)/i,
    ],
    responses: [
      "Flowchart pilih uji statistik yang benar:\n\n1. Data normal? Cek dengan Shapiro-Wilk (p>0.05 = normal)\n2. Jika NORMAL:\n   • 2 grup independen → t-test independen\n   • 2 grup berpasangan → t-test berpasangan\n   • 3+ grup → ANOVA\n3. Jika TIDAK NORMAL:\n   • 2 grup independen → Mann-Whitney U\n   • 2 grup berpasangan → Wilcoxon\n   • 3+ grup → Kruskal-Wallis\n4. Kategorik → Chi-square / Fisher's Exact 🔬",
      'Non-parametrik tests dengan Python:\n```python\nfrom scipy import stats\n\n# Uji normalitas Shapiro-Wilk\nstat, p = stats.shapiro(data)\nprint(f"Shapiro-Wilk: stat={stat:.4f}, p={p:.4f}")\nif p > 0.05: print("Data normal")\nelse: print("Data tidak normal → pakai non-parametrik")\n\n# Mann-Whitney U (2 grup tidak normal)\nu_stat, p = stats.mannwhitneyu(grup_a, grup_b, alternative="two-sided")\n\n# Kruskal-Wallis (3+ grup tidak normal)\nstat, p = stats.kruskal(grup_a, grup_b, grup_c)\n```',
    ],
  },

  // ─── DATA VISUALIZATION BEST PRACTICES ────────────────────────────────────
  {
    patterns: [
      /\b(chart\s*yang\s*baik|visualisasi\s*yang\s*efektif|tips\s*visualisasi|warna\s*chart|color\s*blind|colorblind)\b/i,
      /cara\s*(buat|design)\s*(chart|visualisasi|dashboard)\s*yang\s*(baik|efektif|menarik)/i,
      /\b(misleading\s*chart|chart\s*menyesatkan|visualisasi\s*salah)\b/i,
    ],
    responses: [
      'Prinsip Gestalt untuk visualisasi data efektif:\n👁️ Proximity — elemen dekat = berhubungan\n🎨 Similarity — warna/bentuk sama = kategori sama\n📐 Continuity — mata mengikuti garis\n🔲 Enclosure — border/kotak mengelompokkan\n\nGuide: 1 chart = 1 pesan. Judul = kesimpulan! 🎯',
      'Pilihan warna yang aman (colorblind-friendly):\n• Pakai palette: Viridis, Cividis, ColorBrewer\n• Hindari merah+hijau bersamaan (8% pria color blind!)\n• Tambahkan pattern/texture sebagai alternatif warna\n```python\nsns.set_palette("colorblind")  # Seaborn\n# atau\nimport matplotlib as plt\nplt.style.use("tableau-colorblind10")\n```',
      'Chart yang sering disalahgunakan:\n🥧 Pie chart → max 5 slice, gunakan bar chart untuk lebih banyak\n📊 3D chart → selalu hindari! Distorsi persepsi\n📉 Y-axis tidak dari 0 → membesar-besarkan perbedaan\n📈 Dual Y-axis → sering menyesatkan\n✂️ Truncated axis → manipulasi visual 🚫',
    ],
  },

  // ─── SQL WINDOW FUNCTIONS LANJUTAN ────────────────────────────────────────
  {
    patterns: [
      /\b(window\s*function|fungsi\s*window|rank\b|dense_rank|row_number|lead\b|lag\b|ntile|percent_rank|cumulative)\b/i,
      /cara\s*(pakai|buat)\s*window\s*function/i,
      /sql\s*(lanjutan|advanced|window)/i,
    ],
    responses: [
      'SQL Window Functions — analisis tanpa GROUP BY:\n```sql\n-- RANK vs DENSE_RANK vs ROW_NUMBER\nSELECT nama, nilai,\n  RANK() OVER (ORDER BY nilai DESC) as rank_with_gap,\n  DENSE_RANK() OVER (ORDER BY nilai DESC) as rank_no_gap,\n  ROW_NUMBER() OVER (ORDER BY nilai DESC) as nomor_urut\nFROM siswa;\n-- Nilai sama: RANK=1,1,3 | DENSE_RANK=1,1,2 | ROW_NUMBER=1,2,3\n\n-- Top N per group\nSELECT * FROM (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY departemen ORDER BY gaji DESC) as rn\n  FROM karyawan\n) WHERE rn <= 3;  -- top 3 gaji per departemen\n```',
      'LAG & LEAD untuk analisis perbandingan:\n```sql\nSELECT\n  bulan, revenue,\n  LAG(revenue) OVER (ORDER BY bulan) as revenue_bulan_lalu,\n  revenue - LAG(revenue) OVER (ORDER BY bulan) as selisih,\n  ROUND(\n    (revenue - LAG(revenue) OVER (ORDER BY bulan)) /\n    LAG(revenue) OVER (ORDER BY bulan) * 100, 2\n  ) as growth_pct,\n  LEAD(revenue) OVER (ORDER BY bulan) as revenue_bulan_depan\nFROM penjualan_bulanan;\n```',
    ],
  },

  // ─── REGEX UNTUK DATA ─────────────────────────────────────────────────────
  {
    patterns: [
      /\b(regex\s*pandas|str\.extract|str\.contains|str\.replace|text\s*cleaning\s*python)\b/i,
      /cara\s*(bersihkan|clean)\s*(teks|text)\s*(python|pandas)/i,
      /pandas\s*string\s*(operation|method|manipulation)/i,
    ],
    responses: [
      'Pandas String Operations untuk text cleaning:\n```python\n# Semua method str.X()\ndf["teks"].str.lower()           # lowercase\ndf["teks"].str.upper()           # uppercase\ndf["teks"].str.strip()           # hapus whitespace\ndf["teks"].str.replace(",", "")  # replace karakter\ndf["teks"].str.contains("error") # filter yang mengandung\ndf["teks"].str.startswith("ID")  # filter prefix\ndf["teks"].str.len()             # hitung panjang\n\n# Regex di Pandas\ndf["teks"].str.extract(r"(\\d{4})")  # ekstrak 4 digit\ndf["teks"].str.replace(r"[^a-zA-Z0-9]", " ", regex=True)  # hapus simbol\ndf["email"].str.extract(r"@(\\w+)\\.com")[0]  # ekstrak domain\n```',
    ],
  },

  // ══════════════════════  PROGRAMMING FUNDAMENTALS  ═══════════════════════════

  // ─── ALGORITMA & STRUKTUR DATA ────────────────────────────────────────────
  {
    patterns: [
      /\b(algoritma|algorithm|struktur\s*data|data\s*structure|big\s*o|kompleksitas\s*waktu|time\s*complexity|sorting|searching)\b/i,
      /apa\s*itu\s*(big\s*o|time\s*complexity|struktur\s*data)/i,
      /\b(linked\s*list|stack\b|queue\b|tree\b|graph\b|hash\s*table|binary\s*search)\b.*\b(itu\s*apa|adalah|cara\s*kerja)\b/i,
    ],
    responses: [
      'Big O Notation mengukur efisiensi algoritma:\n⚡ O(1) — konstan (akses array by index)\n📋 O(log n) — logaritmik (binary search)\n📈 O(n) — linear (loop sederhana)\n📊 O(n log n) — merge sort, quick sort\n😱 O(n²) — nested loop (bubble sort)\n💀 O(2ⁿ) — exponential (hindari!)\n\nSemakin kecil Big O, semakin efisien! 🎯',
      'Struktur data yang wajib dikuasai:\n📋 Array/List — akses cepat by index\n🔗 Linked List — insert/delete cepat di tengah\n📚 Stack — LIFO (Last In First Out), undo/redo\n🎫 Queue — FIFO (First In First Out), task queue\n🌳 Tree — hirarki, binary search tree\n🕸️ Graph — relasi kompleks, social network\n🗝️ Hash Table — key-value, O(1) lookup (dict Python!)',
      'Algoritma sorting:\n🐌 Bubble Sort O(n²) — untuk belajar saja\n🔀 Merge Sort O(n log n) — stable, divide & conquer\n⚡ Quick Sort O(n log n) avg — in-place, sering paling cepat\n🎯 Python sorted() pakai TimSort — hybrid merge+insertion!',
    ],
  },

  // ─── OOP (OBJECT ORIENTED PROGRAMMING) ───────────────────────────────────
  {
    patterns: [
      /\b(oop|object\s*oriented|class\b|inheritance|encapsulation|polymorphism|abstraction|constructor|method\b|instance\b)\b/i,
      /apa\s*itu\s*(oop|inheritance|encapsulation|polymorphism)/i,
      /prinsip\s*(oop|solid\b|dry\b|kiss\b|yagni\b)/i,
    ],
    responses: [
      '4 Pilar OOP:\n📦 Encapsulation — sembunyikan detail internal, expose interface\n🧬 Inheritance — class anak mewarisi class induk\n🔄 Polymorphism — satu interface, banyak implementasi\n🎭 Abstraction — sembunyikan kompleksitas, tunjukkan essential',
      'SOLID Principles — panduan OOP berkualitas:\n🔴 S — Single Responsibility: 1 class, 1 tanggung jawab\n🟠 O — Open/Closed: terbuka untuk extension, tertutup untuk modification\n🟡 L — Liskov Substitution: subclass harus bisa gantikan superclass\n🟢 I — Interface Segregation: interface kecil & spesifik\n🔵 D — Dependency Inversion: depend pada abstraction, bukan concrete class 📐',
      'OOP Python contoh:\n```python\nclass Animal:\n    def __init__(self, name: str):\n        self.name = name  # encapsulation\n    def speak(self) -> str:\n        raise NotImplementedError  # abstraction\n    def __repr__(self): return f"Animal({self.name})"\n\nclass Dog(Animal):  # inheritance\n    def speak(self): return f"{self.name}: Woof!"\n\nclass Cat(Animal):\n    def speak(self): return f"{self.name}: Meow!"\n\nanimals = [Dog("Rex"), Cat("Luna")]\nfor a in animals: print(a.speak())  # polymorphism\n```',
    ],
  },

  // ─── DESIGN PATTERNS ──────────────────────────────────────────────────────
  {
    patterns: [
      /\b(design\s*pattern|pola\s*desain|singleton|factory|observer|decorator\s*pattern|strategy\s*pattern|mvc|mvvm|repository\s*pattern)\b/i,
      /apa\s*itu\s*(singleton|factory\s*pattern|observer\s*pattern|mvc)/i,
    ],
    responses: [
      'Design Patterns adalah solusi yang sudah terbukti untuk masalah desain software yang umum. Dibagi 3 kategori:\n🏗️ Creational — cara membuat objek (Singleton, Factory, Builder)\n🔗 Structural — cara menyusun objek (Adapter, Decorator, Facade)\n🎭 Behavioral — cara objek berkomunikasi (Observer, Strategy, Command)',
      'Design patterns paling sering dipakai:\n1️⃣ Singleton — pastikan hanya ada 1 instance\n2️⃣ Factory — buat objek tanpa specify class konkret\n3️⃣ Observer — pub/sub, event-driven (addEventListener!)\n4️⃣ Strategy — pilih algoritma saat runtime\n5️⃣ Repository — abstraksi akses database\n\nPahami masalahnya dulu, baru gunakan pattern yang tepat! 🎯',
    ],
  },

  // ─── FUNCTIONAL PROGRAMMING ───────────────────────────────────────────────
  {
    patterns: [
      /\b(functional\s*programming|fp\b|pure\s*function|immutable|higher.order\s*function|map\s*filter\s*reduce|lambda\b|closure\b|currying)\b/i,
      /apa\s*itu\s*(functional\s*programming|pure\s*function|closure|currying)/i,
    ],
    responses: [
      'Functional Programming (FP) prinsip utama:\n✅ Pure functions — output hanya bergantung pada input, no side effects\n✅ Immutability — data tidak diubah, dibuat copy baru\n✅ Higher-order functions — fungsi yang terima/return fungsi lain\n✅ Function composition — gabungkan fungsi kecil jadi pipeline\n\nJavaScript & Python mendukung FP! 🔧',
      'FP di JavaScript praktis:\n```js\n// Pure function\nconst add = (a, b) => a + b  // selalu sama hasilnya\n\n// Higher-order functions\nconst numbers = [1,2,3,4,5]\nnumbers.map(x => x * 2)        // [2,4,6,8,10]\nnumbers.filter(x => x % 2 === 0) // [2,4]\nnumbers.reduce((acc, x) => acc + x, 0) // 15\n\n// Closure\nconst counter = () => {\n  let count = 0\n  return () => ++count\n}\nconst inc = counter()\ninc() // 1, inc() // 2\n```',
    ],
  },

  // ─── ASYNC PROGRAMMING ────────────────────────────────────────────────────
  {
    patterns: [
      /\b(async|await|promise|callback\s*hell|event\s*loop|concurrency|parallelism|async\s*programming)\b/i,
      /apa\s*itu\s*(promise|async\s*await|event\s*loop)/i,
      /cara\s*(handle|tangani)\s*(async|asynchronous|promise)/i,
    ],
    responses: [
      'JavaScript Async evolution:\n😱 Callback Hell → 🔗 Promise → ✨ Async/Await\n\nAsync/Await adalah Promise dengan syntax yang lebih bersih:\n```js\n// Promise\nfetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err))\n\n// Async/Await (lebih bersih!)\nasync function getData() {\n  try {\n    const res = await fetch(url)\n    const data = await res.json()\n    return data\n  } catch (err) {\n    console.error(err)\n  }\n}\n```',
      'Promise patterns yang berguna:\n```js\n// Parallel (jalankan sekaligus)\nconst [users, posts] = await Promise.all([\n  fetchUsers(), fetchPosts()\n])\n\n// Race (ambil yang paling cepat)\nconst result = await Promise.race([fastApi(), slowApi()])\n\n// Sequential dengan loop\nfor (const id of ids) {\n  const data = await fetchById(id) // satu per satu\n}\n\n// Parallel dengan loop\nconst results = await Promise.all(ids.map(fetchById))\n```',
    ],
  },

  // ══════════════════════  TOOLS & ECOSYSTEM  ══════════════════════════════════

  // ─── LINTING & FORMATTING ─────────────────────────────────────────────────
  {
    patterns: [
      /\b(eslint|prettier|biome\b|linting|formatting|husky\b|lint.staged|pre.commit\s*hook)\b/i,
      /cara\s*(setup|pasang|config)\s*(eslint|prettier|husky)/i,
      /code\s*(quality|style|format)\s*tools/i,
    ],
    responses: [
      'ESLint + Prettier setup untuk React/TS:\n```bash\nnpm install -D eslint prettier eslint-config-prettier\nnpx eslint --init\n```\n\n`.prettierrc`:\n```json\n{\n  "semi": false,\n  "singleQuote": true,\n  "tabWidth": 2,\n  "trailingComma": "es5"\n}\n```',
      'Husky + lint-staged — auto lint sebelum commit:\n```bash\nnpm install -D husky lint-staged\nnpx husky init\n```\n`package.json`:\n```json\n"lint-staged": {\n  "*.{ts,tsx}": ["eslint --fix", "prettier --write"]\n}\n```\n\nSekarang setiap `git commit` otomatis format kode! ✨',
      'Biome — alternatif modern (ESLint + Prettier dalam 1 tool, 10x lebih cepat):\n```bash\nnpm install -D @biomejs/biome\nnpx @biomejs/biome init\nnpx @biomejs/biome check --apply .\n```',
    ],
  },

  // ─── ENVIRONMENT VARIABLES ────────────────────────────────────────────────
  {
    patterns: [
      /\b(\.env|environment\s*variable|env\s*variable|dotenv|process\.env|secret\s*management)\b/i,
      /cara\s*(pakai|setup|manage)\s*(env|environment\s*variable|\.env)/i,
      /simpan\s*(api\s*key|secret|credential)\s*(yang\s*aman|aman)/i,
    ],
    responses: [
      'Environment Variables best practices:\n```bash\n# .env (JANGAN commit ke Git!)\nDATABASE_URL=postgresql://...\nJWT_SECRET=supersecretkey\nAPI_KEY=abc123\n\n# .env.example (commit ini — template tanpa nilai)\nDATABASE_URL=\nJWT_SECRET=\nAPI_KEY=\n```\n\n`.gitignore` wajib include `.env`! 🔒',
      'Vite env vars (prefix VITE_):\n```ts\n// .env\nVITE_API_URL=https://api.example.com\nVITE_APP_NAME=FutureStack\n\n// Di kode\nconst apiUrl = import.meta.env.VITE_API_URL\nconst isProd = import.meta.env.PROD\nconst isDev = import.meta.env.DEV\n```\n\nTanpa prefix VITE_, variabel tidak bisa diakses di browser (keamanan)! 🛡️',
    ],
  },

  // ─── MONITORING & LOGGING ─────────────────────────────────────────────────
  {
    patterns: [
      /\b(monitoring|logging|sentry\b|error\s*tracking|log\s*management|observability|datadog|grafana|prometheus)\b/i,
      /cara\s*(monitor|pantau)\s*(app|aplikasi|error|production)/i,
      /apa\s*itu\s*(sentry|observability|monitoring\s*app)/i,
    ],
    responses: [
      'Sentry — error tracking wajib di production:\n```bash\nnpm install @sentry/react\n```\n```ts\nimport * as Sentry from "@sentry/react"\n\nSentry.init({\n  dsn: import.meta.env.VITE_SENTRY_DSN,\n  tracesSampleRate: 1.0,\n  environment: import.meta.env.MODE\n})\n```\nSetiap error + stack trace langsung masuk dashboard Sentry! 🔍',
      'Observability 3 pilar:\n📋 Logs — apa yang terjadi? (Winston, Pino)\n📊 Metrics — seberapa sering/lama? (Prometheus + Grafana)\n🔍 Traces — perjalanan request? (OpenTelemetry, Jaeger)\n\nTanpa observability = "blind flying" di production! ✈️',
    ],
  },

  // ─── TESTING LANJUTAN ────────────────────────────────────────────────────
  {
    patterns: [
      /\b(mock\b|stub\b|spy\b|test\s*double|integration\s*test|unit\s*test\s*react|testing\s*library|msw\b|snapshot\s*test)\b/i,
      /cara\s*(mock|test)\s*(api|component|react)/i,
      /react\s*testing\s*library/i,
    ],
    responses: [
      'React Testing Library — test UI dari perspektif user:\n```tsx\nimport { render, screen, fireEvent } from "@testing-library/react"\nimport userEvent from "@testing-library/user-event"\n\ntest("tombol counter increment", async () => {\n  render(<Counter />)\n  \n  expect(screen.getByText("Count: 0")).toBeInTheDocument()\n  \n  await userEvent.click(screen.getByRole("button", { name: /increment/i }))\n  \n  expect(screen.getByText("Count: 1")).toBeInTheDocument()\n})\n```',
      'MSW (Mock Service Worker) — mock API di test dan development:\n```ts\nimport { http, HttpResponse } from "msw"\nimport { setupServer } from "msw/node"\n\nconst server = setupServer(\n  http.get("/api/users", () => {\n    return HttpResponse.json([{ id: 1, name: "Yusjul" }])\n  })\n)\n\nbeforeAll(() => server.listen())\nafterEach(() => server.resetHandlers())\nafterAll(() => server.close())\n```',
    ],
  },

  // ──════════════════════  SOFT SKILLS & KARIR  ════════════════════════════════

  // ─── CODE REVIEW ─────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(code\s*review|peer\s*review|review\s*kode|pull\s*request\s*review)\b/i,
      /cara\s*(lakukan|berikan|minta)\s*code\s*review/i,
      /tips\s*code\s*review/i,
    ],
    responses: [
      'Code Review yang efektif:\n👍 Berikan pujian untuk kode yang bagus\n🎯 Tunjukkan masalah + solusi, bukan hanya kritik\n❓ Gunakan pertanyaan, bukan pernyataan ("Apakah kita bisa..." bukan "Ini salah")\n📏 Fokus pada kode, bukan orangnya\n⏱️ Review dalam 24 jam agar tidak blocking\n✅ Setujui PR yang sudah cukup baik, jangan perfectionism! 🤝',
      'Checklist Code Review:\n✅ Logic benar?\n✅ Edge case sudah dihandle?\n✅ Error handling ada?\n✅ Naming yang jelas?\n✅ Duplikasi bisa dihindari?\n✅ Test sudah ada/update?\n✅ Performance issue?\n✅ Security concern? 🔍',
    ],
  },

  // ─── DOKUMENTASI ─────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(dokumentasi|documentation|readme|jsdoc|tsdoc|swagger|openapi|wiki\b|changelog)\b/i,
      /cara\s*(tulis|buat)\s*(dokumentasi|readme|changelog)/i,
      /tips\s*dokumentasi/i,
    ],
    responses: [
      'README.md yang baik wajib punya:\n📌 Project name + deskripsi singkat\n🚀 Quick start (cara run dalam 3 langkah)\n📋 Prerequisites\n⚙️ Installation\n🔑 Environment variables\n📡 API endpoints (jika ada)\n🤝 Contributing guide\n📄 License\n\n"Documentation is a love letter to your future self." 💌',
      'JSDoc untuk TypeScript:\n```ts\n/**\n * Menghitung total harga dengan diskon\n * @param price - Harga awal dalam rupiah\n * @param discount - Persentase diskon (0-100)\n * @returns Harga akhir setelah diskon\n * @example\n * calculatePrice(100000, 20) // 80000\n */\nfunction calculatePrice(price: number, discount: number): number {\n  return price * (1 - discount / 100)\n}\n```',
    ],
  },

  // ─── PROBLEM SOLVING ─────────────────────────────────────────────────────
  {
    patterns: [
      /\b(problem\s*solving|pemecahan\s*masalah|cara\s*berpikir|computational\s*thinking|divide\s*and\s*conquer)\b/i,
      /cara\s*(selesaikan|pecahkan|hadapi)\s*(masalah|problem)\s*(programming|coding)/i,
      /strategi\s*(coding|programming|problem\s*solving)/i,
    ],
    responses: [
      "Framework Problem Solving untuk coding:\n1️⃣ UNDERSTAND — baca soal/requirement 2x, tanya sampai jelas\n2️⃣ EXPLORE — buat contoh input-output manual\n3️⃣ PLAN — pseudocode dulu, baru kode\n4️⃣ CODE — implementasi dari yang paling sederhana\n5️⃣ TEST — coba berbagai case, termasuk edge case\n6️⃣ REFACTOR — bersihkan dan optimalkan 🎯",
      `"If you can't explain it simply, you don't understand it well enough." — Einstein\n\nRubber duck debugging: jelaskan kode baris per baris ke bebek (atau siapapun). Sering menemukan bug sendiri sebelum selesai menjelaskan! 🦆`,
    ],
  },

  // ─── NETWORKING & INTERNET ────────────────────────────────────────────────
  {
    patterns: [
      /\b(http|https|dns\b|tcp|ip\b|ssl|tls|cdn\b|cors\b|proxy|load\s*balancer|bandwidth|latency|protocol)\b/i,
      /apa\s*itu\s*(http|https|dns|tcp\/ip|ssl|tls|cdn|cors)/i,
      /cara\s*kerja\s*(internet|http|dns|ssl)/i,
    ],
    responses: [
      'Cara kerja HTTP request:\n1. Browser resolve DNS (domain → IP address)\n2. TCP handshake (3-way: SYN → SYN-ACK → ACK)\n3. TLS handshake (jika HTTPS)\n4. Kirim HTTP request\n5. Server proses & kirim response\n6. Browser render halaman\n\nTotal ini terjadi dalam milidetik! ⚡',
      'CORS (Cross-Origin Resource Sharing) — kenapa API kamu kena error CORS:\n\nBrowser blokir request dari domain berbeda demi keamanan. Solusi di server:\n```js\n// Express.js\nconst cors = require("cors")\napp.use(cors({\n  origin: ["https://futurestack.app", "http://localhost:5173"],\n  methods: ["GET", "POST", "PUT", "DELETE"],\n  credentials: true\n}))\n```',
      'SSL/TLS mengenkripsi komunikasi browser-server. HTTP = tidak aman, HTTPS = aman. CDN (Content Delivery Network) mendistribusikan file ke server terdekat user → load time lebih cepat! 🌐',
    ],
  },

  // ─── KEAMANAN WEB LANJUTAN ────────────────────────────────────────────────
  {
    patterns: [
      /\b(csp\b|content\s*security\s*policy|helmet\.?js|security\s*header|https.only|hsts\b|sanitize\b|input\s*validation)\b/i,
      /cara\s*(amankan|secure)\s*(express|api|web\s*app)/i,
      /security\s*header/i,
    ],
    responses: [
      'Security Headers wajib di production:\n```js\n// Express dengan Helmet.js\nconst helmet = require("helmet")\napp.use(helmet())  // auto set semua security headers!\n\n// Manual headers:\n// X-Frame-Options: DENY\n// X-Content-Type-Options: nosniff\n// Strict-Transport-Security: max-age=31536000\n// Content-Security-Policy: default-src \'self\'\n```',
      'Input validation & sanitization:\n```js\n// Zod untuk validasi TypeScript\nimport { z } from "zod"\n\nconst UserSchema = z.object({\n  email: z.string().email(),\n  password: z.string().min(8).max(100),\n  age: z.number().int().min(0).max(150),\n  name: z.string().trim().min(1).max(100)\n})\n\n// Express middleware\napp.post("/register", (req, res) => {\n  const result = UserSchema.safeParse(req.body)\n  if (!result.success) return res.status(400).json(result.error)\n  // lanjut proses...\n})\n```',
    ],
  },

  // ─── INTERVIEW TEKNIS ─────────────────────────────────────────────────────
  {
    patterns: [
      /\b(interview\s*teknis|technical\s*interview|coding\s*test|leetcode|hackerrank|sistem\s*design\s*interview|whiteboard)\b/i,
      /persiapan\s*(interview|wawancara)\s*(teknis|developer|software\s*engineer)/i,
      /tips\s*(interview|wawancara)\s*teknis/i,
    ],
    responses: [
      'Persiapan Technical Interview:\n📚 DSA: pelajari Array, String, HashMap, Tree, Graph\n🔄 Patterns: Two Pointers, Sliding Window, BFS/DFS, DP\n🏗️ System Design: scaling, database design, caching, load balancing\n💬 Behavioral: STAR method (Situation, Task, Action, Result)\n⏱️ Practice: LeetCode Easy 50%, Medium 50% — jangan langsung Hard!',
      'Tips saat coding interview:\n1. Clarify requirements dulu (jangan langsung kode!)\n2. Discuss approach sebelum implement\n3. Think out loud — interviewer ingin tahu cara berpikirmu\n4. Start dengan brute force, lalu optimasi\n5. Test dengan example + edge case\n6. Kalau stuck, minta hint — itu OK! 💪',
    ],
  },

  // ─── TIPS BELAJAR UMUM ────────────────────────────────────────────────────
  {
    patterns: [
      /\b(spaced\s*repetition|active\s*recall|feynman\s*technique|pomodoro\s*belajar|cara\s*belajar\s*efektif|learning\s*tips)\b/i,
      /cara\s*belajar\s*(yang\s*efektif|lebih\s*cepat|programming|coding)\s*(dengan\s*baik)?/i,
      /tips\s*belajar\s*(programming|coding|data\s*science)/i,
    ],
    responses: [
      'Teknik belajar paling efektif (berdasarkan penelitian):\n🔁 Spaced Repetition — review materi di interval yang makin jarang\n🧠 Active Recall — test diri sendiri, bukan hanya baca\n🦆 Feynman Technique — ajarkan ke orang lain (atau bebek!)\n🎯 Deliberate Practice — latihan di zona yang sedikit di atas kemampuan saat ini\n😴 Tidur cukup — memori dikuatkan saat tidur! 📚',
      'Anti-patterns belajar yang harus dihindari:\n❌ Tutorial hell — nonton tutorial terus tanpa praktek\n❌ Passive reading — baca buku tanpa ngoding\n❌ Copy-paste kode tanpa memahami\n❌ Belajar terlalu banyak topik sekaligus\n❌ Skip fundamentals — langsung ke framework\n\n✅ Build > Watch. Code > Read. Teach > Learn alone! 🚀',
    ],
  },

  // ─── PRODUKTIVITAS DEVELOPER ──────────────────────────────────────────────
  {
    patterns: [
      /\b(produktivitas\s*developer|developer\s*workflow|deep\s*work|context\s*switching|flow\s*state|zona\s*produktif)\b/i,
      /cara\s*(jadi|menjadi)\s*(lebih\s*)?produktif\s*(sebagai\s*developer|coding)/i,
      /tips\s*produktivitas\s*(developer|programmer|coding)/i,
    ],
    responses: [
      'Deep Work untuk developer:\n🎯 Blok waktu 90-120 menit tanpa distraksi\n📵 Matikan notifikasi HP & Slack saat coding\n🎧 White noise / lo-fi untuk fokus\n📋 Clear to-do list sebelum mulai\n🚫 Tolak meeting yang tidak perlu\n\n"The ability to do deep work is becoming rare and valuable." — Cal Newport 💎',
      'Optimalkan development environment:\n⚡ Pelajari shortcut editor (hemat 1-2 jam/minggu!)\n🔧 Automasi task berulang dengan scripts\n📋 Snippet untuk boilerplate code\n🖥️ Multi-monitor untuk referensi + coding\n☕ Ritual memulai coding (playlist, kopi, todo list)\n🌡️ Jaga suhu ruangan 20-22°C — optimal untuk fokus! 🧠',
    ],
  },

  // ─── REMOTE WORK ──────────────────────────────────────────────────────────
  {
    patterns: [
      /\b(remote\s*work|kerja\s*remote|wfh|work\s*from\s*home|async\s*communication|timezone)\b/i,
      /tips\s*(kerja|bekerja)\s*(remote|dari\s*rumah|wfh)/i,
      /cara\s*(kerja|bekerja)\s*efektif\s*(remote|dari\s*rumah)/i,
    ],
    responses: [
      'Tips Remote Work yang efektif:\n🏠 Dedicated workspace — pisahkan area kerja dan istirahat\n⏰ Jam kerja yang konsisten — mulai dan selesai di waktu yang sama\n📢 Over-communicate — lebih baik terlalu banyak update dari pada kurang\n📹 Nyalakan kamera di video call — membangun kepercayaan\n🤝 1-on-1 rutin dengan manager dan rekan tim\n🔋 Keluar rumah setiap hari — penting untuk mental health! 🧠',
      'Tools remote collaboration terbaik:\n💬 Slack / Discord — komunikasi async\n📹 Zoom / Meet — video call\n📋 Notion / Confluence — dokumentasi\n🗂️ Linear / Jira — project management\n🎨 Figma — design collaboration\n🕐 Loom — async video message (kurangi meeting!) 🎥',
    ],
  },

  // ─── BAHASA INDONESIA / BASA BASI ────────────────────────────────────────
  {
    patterns: [
      /\b(gimana\s*kabar|apa\s*kabar|how\s*are\s*you|kabarmu|kamu\s*(baik|oke|sehat))\b/i,
      /kamu\s*(lagi\s*)?(apa|ngapain|sibuk)/i,
    ],
    responses: [
      'Baik-baik aja! Siap membantu kamu 100%. Ada yang bisa aku kerjakan? 😊',
      'Aku selalu siap dan semangat! Gimana denganmu? Ada project atau pertanyaan yang mau dibahas? 🚀',
      'Baik! Kalau kamu baik, aku juga baik. Yuk ngoding atau diskusi data science! 💻',
    ],
  },

  // ─── PERTANYAAN EKSISTENSIAL BOT ──────────────────────────────────────────
  {
    patterns: [
      /\b(kamu\s*bisa\s*apa|kemampuan\s*kamu|fitur\s*(bot|chatbot)|topik\s*apa\s*(saja|yang)\s*(bisa|kamu|kamu\s*jawab))\b/i,
      /apa\s*saja\s*yang\s*kamu\s*(tahu|bisa|kuasai)/i,
      /list\s*(topik|kemampuan|fitur)\s*(bot|kamu|chatbot)/i,
    ],
    responses: [
      'Aku bisa membantu tentang:\n\n💻 Web Dev: React, TypeScript, Next.js, CSS, HTML\n🐍 Python & Data: Pandas, NumPy, Matplotlib, Scikit-learn\n📊 Data Science: ML, Deep Learning, NLP, Time Series\n🗄️ Database & SQL: PostgreSQL, Prisma, MongoDB\n🔒 Cybersecurity & Auth: JWT, OAuth, XSS, CSRF\n🛠️ DevOps: Git, Docker, CI/CD, Deploy\n🤖 AI Tools: Prompt engineering, LLM, RAG\n⚡ Performance & Testing\n💼 Karir, Freelance, Interview\n🎯 Produktivitas & Motivasi\n\nTanya apa saja! 😊',
      'Kemampuanku mencakup 100+ topik seputar development dan data science! Mulai dari "apa itu pandas?" sampai "bagaimana cara deploy ke production". Tanya langsung aja, aku siap! 🚀',
    ],
  },

  // ─── TOOLS KOLABORASI ─────────────────────────────────────────────────────
  {
    patterns: [
      /\b(jira|trello|asana|linear\b|clickup|notion\b|confluence|monday\.com|project\s*management\s*tool)\b/i,
      /tools\s*(project\s*management|kolaborasi|tim)/i,
      /rekomendasi\s*tools\s*(tim|kolaborasi|project)/i,
    ],
    responses: [
      'Project Management Tools:\n🎯 Linear — modern, cepat, developer-friendly (rekomendasi!)\n📋 Jira — powerful, standard enterprise, banyak fitur\n🃏 Trello — sederhana, kanban visual, cocok tim kecil\n✅ Asana — timeline + task, cocok project non-dev\n📝 Notion — all-in-one doc + database + kanban\n\nSolo developer atau tim kecil → Linear atau Trello. Enterprise → Jira. 🏆',
    ],
  },

  // ─── AI UNTUK CODING ──────────────────────────────────────────────────────
  {
    patterns: [
      /\b(github\s*copilot|cursor\s*ide|claude\s*coding|ai\s*coding|ai\s*code\s*assistant|codeium|tabnine)\b/i,
      /\b(ai\s*untuk\s*coding|gunakan\s*ai\s*(untuk|buat)\s*coding)\b/i,
      /rekomendasi\s*ai\s*(coding|code)\s*(assistant|tools)/i,
    ],
    responses: [
      'AI Coding Tools terbaik 2024:\n🤖 GitHub Copilot — terintegrasi VS Code, context-aware\n🖱️ Cursor — IDE berbasis AI, edit kode dengan chat\n⚡ Codeium — gratis, support 70+ bahasa\n🧠 Claude (Anthropic) — bagus untuk explain + debug kompleks\n\nCombination terbaik: Cursor + Claude untuk project serius! 💪',
      'Tips efektif pakai AI coding:\n✅ Berikan context yang cukup (tempel kode + error)\n✅ Iterasi prompt kalau hasil kurang tepat\n✅ Selalu review kode yang digenerate (jangan blind trust!)\n✅ Gunakan untuk boilerplate, bukan logic bisnis kritis\n✅ Manfaatkan untuk belajar (minta explain kode) 🎓',
    ],
  },

  // ─── PENUTUP / TERIMA KASIH SERIUS ────────────────────────────────────────
  {
    patterns: [
      /\b(sangat\s*membantu|helpful|berguna|bermanfaat|aku\s*(jadi\s*)?paham|sekarang\s*(aku\s*)?mengerti|makasih\s*(banyak|banget|ya))\b/i,
      /terima\s*kasih\s*(atas\s*)?(penjelasan|info|jawaban|bantuannya)/i,
    ],
    responses: [
      'Syukurlah kalau membantu! 😊 Itu tujuan utamaku. Kalau ada yang kurang jelas atau mau lanjut topik lain, tanya aja!',
      'Senang bisa membantu kamu paham! Semangat belajarnya dijaga ya. Konsisten > intensif sesekali! 🔥',
      'Sama-sama! Kalau ada pertanyaan lain — entah soal coding, data science, atau apapun — aku siap. Keep building! 🚀',
    ],
  },
];

// ─── FALLBACK RESPONSES ──────────────────────────────────────────────────────
const fallbackResponses = [
  'Hmm, aku belum paham pertanyaannya. Coba tanya tentang task, coding, data science, atau produktivitas! 🤔',
  'Maaf, aku belum bisa jawab itu. Tapi aku bisa bantu soal:\n• Task & Project management\n• Coding tips (React, TS, Python, SQL)\n• Data Science & Analytics\n• Machine Learning & Deep Learning\n• Git, Deploy & Cybersecurity\n• Motivasi & produktivitas',
  'Pertanyaan menarik! Sayangnya aku offline chatbot jadi terbatas. Coba tanya hal lain seputar development, data science, atau FutureStack! 😊',
  'Aku belum mengerti itu. Coba ceritakan lebih detail? Atau tanya tentang Pandas, Scikit-learn, SQL, visualisasi data, atau machine learning! 📊',
  'Wah, itu di luar pengetahuanku saat ini. Tapi aku bisa bantu soal coding, data science, git, deploy, atau produktivitas ya. 🤖',
];

// ─── UTILITY ─────────────────────────────────────────────────────────────────
function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getOfflineResponse(input: string): string {
  const trimmed = input.trim().toLowerCase();

  for (const rule of rules) {
    for (const pattern of rule.patterns) {
      if (pattern.test(trimmed)) {
        return pickRandom(rule.responses);
      }
    }
  }

  return pickRandom(fallbackResponses);
}