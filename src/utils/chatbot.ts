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

  // ─── TENTANG APP ─────────────────────────────────────────────────────────
  {
    patterns: [/\b(apa\s*(ini|itu)|tentang|about|futurestack|apk\s*ini|app\s*ini)\b/i],
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
      'Automated EDA dengan library:\n```python\n# ydata-p  rofiling (dulu pandas-profiling)\nfrom ydata_profiling import ProfileReport\nreport = ProfileReport(df)\nreport.to_notebook_iframe()\n\n# Sweetviz\nimport sweetviz as sv\nreport = sv.analyze(df)\nreport.show_html("report.html")\n```',
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