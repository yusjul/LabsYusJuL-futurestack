/**
 * Offline Smart Chatbot — No API key needed!
 * Pattern-matching + contextual responses untuk FutureStack assistant.
 */

interface BotRule {
  patterns: RegExp[];
  responses: string[];
}

const rules: BotRule[] = [
  // Sapaan
  {
    patterns: [/\b(hai|halo|hello|hi|hey|assalamu|selamat)\b/i],
    responses: [
      'Hai! 👋 Ada yang bisa aku bantu hari ini?',
      'Halo! Senang bisa ngobrol denganmu. Ada pertanyaan?',
      'Hey! Siap membantu kamu. Mau tanya apa?',
      'Halo! Aku assistant FutureStack. Tanya apa saja ya! 😊',
    ],
  },
  // Terima kasih
  {
    patterns: [/\b(makasih|terima\s*kasih|thanks|thank\s*you|thx)\b/i],
    responses: [
      'Sama-sama! 😊 Senang bisa membantu.',
      'Siap! Jangan ragu tanya lagi ya.',
      'Sama-sama! Kalau ada yang lain, kabari aja.',
    ],
  },
  // Apa ini / tentang app
  {
    patterns: [/\b(apa\s*(ini|itu)|tentang\s*(app|aplikasi|futurestack)|about\s*(app|futurestack)|futurestack)\b/i],
    responses: [
      'FutureStack adalah developer OS — platform untuk mengelola project, task, notes, dan workflow coding kamu dalam satu tempat! 🚀',
      'Ini FutureStack! Sebuah project management app dengan gaya neobrutalism yang keren. Kamu bisa kelola task, tulis notes, dan banyak lagi.',
    ],
  },
  // yang punya app
  {
    patterns: [
      /\b(siapa\s*(yang\s*buat|pemilik|pembuat|punya|developer|creator|owner))/i,
      /\b(dibuat\s*(oleh|sama)|made\s*by|created\s*by|developed\s*by)/i,
      /\b(yusjul|yus\s*jul)/i,
      /\b(pemilik|pembuat|developer|creator)\s*(nya|web|app|ini)/i,
    ],
    responses: [
      'Yang membuat app ini adalah YUSJUL 👨‍💻 — mahasiswa Sistem Informasi yang passionate di web development. Jangan lupa like dan share ya!',
      'Web ini dikembangkan oleh **YusJuL**, mahasiswa Sistem Informasi. Sosmed: Instagram @m.yuusufj 🚀',
      'Pemilik web ini adalah **YusJuL** — mahasiswa Sistem Informasi. FutureStack adalah salah satu project andalannya! 💻',
    ],
  },
  // Biografi
  {
    patterns: [/\b(biografi|bio|profil|profile)\b/i],
    responses: [
      'Yusjul adalah mahasiswa semester awal Sistem Informasi yang sedang belajar dan terus berkembang. Jangan lupa like dan share ya! 🎓',
    ],
  },
  // Skill / Keahlian
  {
    patterns: [
      /\b(skill|keahlian|bisa\s*apa|kemampuan|expertise|tech\s*stack)/i,
      /\b(bahasa\s*pemrograman|programming\s*language)/i,
    ],
    responses: [
      'YusJuL punya keahlian di:\n• **Frontend**: React, TypeScript, Vite, Tailwind CSS\n• **Backend**: Node.js, Express, Supabase\n• **Database**: PostgreSQL, MySQL, IndexedDB\n• **Tools**: Git, Figma, VS Code\n• **Lainnya**: UI/UX Design, REST API, Analisis Sistem 💻',
    ],
  },
  // Pendidikan / Jurusan
  {
    patterns: [
      /\b(kuliah|kampus|universitas|jurusan|pendidikan|mahasiswa|education|student|prodi)/i,
      /\b(sistem\s*informasi|information\s*system)/i,
    ],
    responses: [
      'YusJuL adalah mahasiswa **Sistem Informasi** 🎓 — jurusan yang mempelajari bagaimana teknologi informasi digunakan untuk memecahkan masalah bisnis dan organisasi.',
      'Sebagai mahasiswa **Sistem Informasi**, YusJuL mempelajari:\n• Analisis & Perancangan Sistem\n• Basis Data & Data Mining\n• Pemrograman Web & Mobile\n• Manajemen Proyek IT\n• Sistem Enterprise (ERP, CRM)\n• Keamanan Informasi 📚',
    ],
  },
  // Portfolio
  {
    patterns: [
      /\b(portfolio|portofolio|project\s*lain|karya|hasil\s*kerja|project\s*apa)/i,
    ],
    responses: [
      'Berikut portfolio project YusJuL:\n\n1️⃣ **FutureStack** — Developer OS & Project Management\n   React + TypeScript + Vite + Supabase\n\n2️⃣ **SiAkademik** — Sistem Informasi Akademik\n   PHP Laravel + MySQL + Bootstrap\n\n3️⃣ **InventoryPro** — Sistem Manajemen Inventaris\n   Node.js + Express + PostgreSQL\n\n4️⃣ **ClinicCare** — Rekam Medis Elektronik\n   React + Firebase + Tailwind CSS\n\n5️⃣ **BudgetMate** — Aplikasi Keuangan Pribadi\n   React Native + SQLite\n\nSemua menerapkan prinsip SI! 🚀',
    ],
  },
  // Kontak / Sosmed
  {
    patterns: [
      /\b(kontak|contact|hubungi|sosmed|social\s*media|instagram|github|email|ig)/i,
    ],
    responses: [
      'Hubungi YusJuL:\n• 📸 Instagram: @m.yuusufj\n• 🐙 GitHub: github.com/YusJuL\n• 📧 Email: dev@futurestack.io 😊',
    ],
  },
  // Task / todo
  {
    patterns: [/\b(task|tugas|todo|to-do|kerjaan)\b/i],
    responses: [
      'Untuk mengelola task, kamu bisa buka panel Tasks di sidebar. Tambah task baru dengan tombol "+" dan atur prioritasnya! ✅',
      'Tips task management: pisahkan task besar jadi sub-task kecil. Gunakan label prioritas (High/Medium/Low) untuk fokus yang tepat.',
    ],
  },
  // Project
  {
    patterns: [/\b(project|proyek|projek)\b/i],
    responses: [
      'Untuk membuat project baru, klik "New Project" di dashboard. Setiap project bisa punya task, notes, dan timeline sendiri! 📁',
    ],
  },
  // Notes
  {
    patterns: [/\b(note|notes|catatan|catat)\b/i],
    responses: [
      'Fitur Notes bisa diakses dari sidebar. Kamu bisa tulis catatan dalam format markdown! 📝',
    ],
  },
  // Coding
  {
    patterns: [/\b(coding|code|kode|program|ngoding|javascript|typescript|react|html|css)\b/i],
    responses: [
      'Butuh bantuan coding? Ceritakan masalahnya, aku coba bantu! 💻',
      'FutureStack dibangun dengan React + TypeScript + Vite. Stack yang solid! ⚡',
    ],
  },
  // Error / bug
  {
    patterns: [/\b(error|bug|masalah|problem|gagal|fail|crash|rusak)\b/i],
    responses: [
      'Ada error? Coba: 1) Baca pesan error, 2) Cek console (F12), 3) Google errornya 🔧',
    ],
  },
  // Tips
  {
    patterns: [/\b(tips|saran|advice|suggest|rekomendasi)\b/i],
    responses: [
      'Tips produktivitas: 🎯\n1. Mulai hari dengan review task\n2. Fokus 1 task besar per sesi\n3. Break tiap 25 menit (Pomodoro)\n4. Review progress di akhir hari',
    ],
  },
  // Motivasi
  {
    patterns: [/\b(motivasi|semangat|capek|cape|lelah|males|malas|bosan|stuck)\b/i],
    responses: [
      'Istirahat sebentar itu strategi! Minum air, stretch, lalu balik lagi. 💪',
      'Setiap developer pernah stuck. Break masalah jadi kecil dan tackle satu per satu! 🚀',
    ],
  },
  // Siapa kamu
  {
    patterns: [/\b(siapa\s*(kamu|lo|lu|anda)|nama\s*(kamu|mu)|who\s*are\s*you)\b/i],
    responses: [
      'Aku FutureStack Assistant! 🤖 Siap membantu navigasi app dan menjawab pertanyaan!',
    ],
  },
  // Bye
  {
    patterns: [/\b(bye|dadah|sampai\s*jumpa|see\s*you|selamat\s*tinggal)\b/i],
    responses: [
      'Dadah! 👋 Semoga harimu produktif!',
      'See you! Happy coding! 🚀',
    ],
  },
];

const fallbackResponses = [
  'Hmm, coba tanya tentang task, project, coding, atau tips produktivitas! 🤔',
  'Aku bisa bantu soal:\n• Task management\n• Coding tips\n• Navigasi FutureStack\n• Info tentang YusJuL',
];

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
