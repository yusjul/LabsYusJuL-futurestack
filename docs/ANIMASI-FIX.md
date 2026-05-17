# Perbaikan Animasi Chat AI Assistant

## Daftar Isi
- [1. Mata Tidak Muncul / Hilang](#1-mata-tidak-muncul--hilang)
- [2. Animasi Idle Float 3D Tidak Berjalan](#2-animasi-idle-float-3d-tidak-berjalan)
- [3. Chat Panel Open/Close Tidak Stabil](#3-chat-panel-openclose-tidak-stabil)
- [4. Klik Face Tidak Perlu Animasi Shrink](#4-klik-face-tidak-perlu-animasi-shrink)
- [5. Preview: Animasi 3D Face](#5-preview-animasi-3d-face)

---

## 1. Mata Tidak Muncul / Hilang

### Root Cause

Animejs v4 menggunakan **CSS Transform** (`style.transform`) untuk semua properti transform seperti `scaleY` / `scaleX`. Masalahnya:

| Elemen | Default `transform-origin` |
|--------|---------------------------|
| **HTML** (`<div>`, `<button>`) | `50% 50%` — center ✅ |
| **SVG** (`<circle>`, `<ellipse>`) | `0, 0` — viewport origin ❌ |

Saat `scaleY: { from: 1, to: 0.1 }` dijalankan pada pupil `<circle>`, scaling dilakukan dari `(0,0)` — sudut kiri atas SVG. Pupil loncat ke pojok lalu mengecil/menghilang.

### Fix

Ganti animasi pupil dari CSS transform (`scaleY`) ke **SVG attribute (`r`)**:

```
Sebelum                              Sesudah
───────                              ───────
scaleY: 1 → 0.1                     r: 2 → 0.3 🟢
scaleX: 1 → 1.5                     (animasi langsung di radius)
(CSS transform → loncat)            (SVG attribute → mulus di tempat)
```

```ts
animate(leftPupil, { r: 0.3, duration: 80, easing: 'easeOutQuad' });
```

Animejs v4 otomatis mendeteksi `r` sebagai valid SVG attribute untuk `<circle>`, sehingga menulis langsung ke `setAttribute('r', ...)` — bukan CSS transform. Bebas dari masalah `transform-origin`.

### Fix 2: Pupil Kembali ke Ukuran Normal

Wink sebelumnya cuma **mengecil** tanpa kembali. Ditambahkan fase dua via `setTimeout`:

```
Timeline:
0ms      → r: 2 → 0.3  (close, 80ms)
120ms    → r: 0.3 → 2  (open, 80ms)
─────
200ms    ✅ Selesai
```

```ts
// Phase 1: close
animate(leftPupil, { r: 0.3, duration: 80 });
setTimeout(() => {
  // Phase 2: open
  if (leftPupil) animate(leftPupil, { r: 2, duration: 80 });
}, 120);
```

### File
`src/components/AssistantFace.tsx`

---

## 2. Animasi Idle Float 3D Tidak Berjalan

### Root Cause

`createTimeline()` di animejs v4 punya `composition: true` secara default. Setiap kali child ditambahkan via `.add()`, timeline memanggil `this.init(true)` yang mereset state play — konflik dengan autoplay. Akibatnya timeline tidak pernah mulai.

```
createTimeline({ loop: true, alternate: true })
  │
  ├─ .add(face, { translateY }) → init(true) → reset play state
  ├─ .add(pupil, { scaleY })    → init(true) → reset lagi
  └─ .add(face, {})             → init(true) → reset lagi
                                      │
                                      └─ ❌ Timeline tetap paused
```

### Fix

Ganti `createTimeline` → **individual `animate()` calls**. Dua animasi independen berjalan paralel:

```ts
         ┌─────────────────────────────┐
         │         animate() #1        │
         │  translateY: -6 ────→ 6     │ ← melayang naik-turun
         │  duration: 3000ms           │
         │  loop: true, alternate: true│
         └─────────────────────────────┘
                        +
         ┌─────────────────────────────┐
         │         animate() #2        │
         │  rotateY: -12° ────→ 12°    │ ← efek 3D bergoyang
         │  duration: 3000ms           │
         │  loop: true, alternate: true│
         └─────────────────────────────┘
```

```ts
// Float — melayang vertikal
const floatAnim = animate(face, {
  translateY: { from: -6, to: 6 },
  duration: 3000,
  loop: true,
  alternate: true,
});

// Rotate 3D — goyang kiri-kanan (perspective 3D)
const rotateAnim = animate(face, {
  rotateY: { from: -12, to: 12 },
  duration: 3000,
  loop: true,
  alternate: true,
});
```

**Bedanya?** `animate()` langsung membuat `JSAnimation` yang autoplay-nya tidak diganggu. Tidak ada `init()` ulang.

### Detail Perspective 3D

Pada button diterapkan `perspective: 400` via inline style:

```tsx
style={{ perspective: 400 }}
```

Ini memberi ilusi kedalaman 3D: saat face berotasi `rotateY(-12°)`, sisi kiri menjauh dan sisi kanan mendekat — menciptakan efek **"hologram" melayang**.

### File
`src/components/AssistantFace.tsx`

---

## 3. Chat Panel Open/Close Tidak Stabil

### Root Cause

Panel menggunakan `{open && (...)}` — muncul/hilang instan tanpa transisi. Masalah dengan klik cepat:

```
User click #1 (buka)
  → panelVisible = true
  → animasi open: translateY 20→0, opacity 0→1

User click #2 (tutup) — cepat, sebelum animasi open selesai
  → animasi close: translateY 0→20, opacity 1→0
  → onComplete: panelVisible = false

User click #3 (buka lagi)
  → panelVisible = true
  → animasi open baru mulai

📛 BOOM: onComplete dari click #2 masih jalan
  → panelVisible = false lagi ❌
  → Panel menghilang padahal harusnya terbuka
```

### Fix: Tiga Lapisan Pengaman

```
Layer 1: Cancel animasi sebelumnya
Layer 2: Guard onComplete dengan latest state
Layer 3: Timing pasti (setTimeout, bukan rAF)
```

**a) Cancel animasi sebelumnya — `useRef`**
```ts
const animRef = useRef<ReturnType<typeof animate> | null>(null);

useEffect(() => {
  if (animRef.current) {
    animRef.current.pause();  // HENTIKAN animasi yang masih jalan
    animRef.current = null;
  }
  // ...
}, [open]);
```

**b) Guard `onComplete` — cek state terbaru**
```ts
onComplete: () => {
  if (!open) setPanelVisible(false);  // hanya jalan jika masih "tutup"
}
```

**c) Timing DOM — `setTimeout` bukan `requestAnimationFrame`**
```ts
setTimeout(() => {
  // DOM sudah siap → animasi aman
  if (panelRef.current) { animate(panelRef.current, ...); }
}, 10);
```

### Detail Animasi Panel

```
Buka (300ms)              Tutup (200ms)
─────────────────────     ─────────────────────
translateY: 20 → 0        translateY: 0 → 20
opacity: 0 → 1            opacity: 1 → 0
easing: easeOutQuad       easing: easeInQuad
(smooth masuk)            (cepat keluar)
```

```ts
// OPEN
animate(panel, {
  translateY: { from: 20, to: 0 },
  opacity: { from: 0, to: 1 },
  duration: 300,
  easing: 'easeOutQuad',
});

// CLOSE
animate(panel, {
  translateY: { from: 0, to: 20 },
  opacity: { from: 1, to: 0 },
  duration: 200,
  easing: 'easeInQuad',
  onComplete: () => { if (!open) setPanelVisible(false); },
});
```

### File
`src/components/ChatBubble.tsx`

---

## 4. Klik Face Tidak Perlu Animasi Shrink

### Sebelum

Saat panel dibuka, face dikecilkan — keliatan "hilang":

```
Click → onToggle()
       → animate(face, { scale: 1 → 0.4, opacity: 1 → 0 })
       → Face mengecil, nyaris tidak terlihat 😟
```

### Sesudah

Click handler hanya `onToggle()` — face tetap utuh:

```ts
function handleClick() {
  onToggle();  // Cuma toggle panel, face aman
}
```

### Hover Effect (tetap menggunakan animejs)

```ts
function handleMouseEnter() {
  animate(face, {
    scale: 1.3,
    rotateY: 360,              // rotasi 360° penuh!
    duration: 800,
    easing: 'easeOutElastic(1, .5)',  // efek elastis
  });
  animate(mouth, {
    d: 'M 14 24 Q 21 32 28 24',  // mulut membuka
    duration: 300,
  });
}
```

### File
`src/components/AssistantFace.tsx`

---

## 5. Gemini API Error 429 (Quota Habis)

### Error

```json
{
  "error": {
    "code": 429,
    "message": "You exceeded your current quota...",
    "status": "RESOURCE_EXHAUSTED"
  }
}
```

### Penyebab

Google Gemini API Free Tier punya batasan:

| Metric | Limit | Reset |
|--------|-------|-------|
| Requests per menit | 60 request | per menit |
| Input token per menit | 1.000.000 token | per menit |
| Requests per hari | 1.500 request | per hari |

Setelah kuota habis, API mengembalikan **HTTP 429** dengan info kapan bisa retry (biasanya 30-60 detik).

### Fix di Kode

`src/utils/gemini.ts` — deteksi 429 dan tampilkan pesan user-friendly:

```ts
if (res.status === 429) {
  return {
    text: '',
    error: '⚠️ Kuota Gemini API habis. Tunggu beberapa saat, lalu coba lagi.',
  };
}
```

Sebelumnya error mentah ditampilkan ke user (raw JSON — bingung). Sekarang user melihat pesan yang jelas.

### Solusi Lain (jika sering kena 429)

| Opsi | Cara |
|------|------|
| **Tunggu** | Free tier reset dalam 30-60 detik |
| **Upgrade** | Google AI Studio → Paid tier (kuota jauh lebih besar) |
| **Ganti model** | `gemini-2.0-flash` → model lain dengan kuota terpisah |

### File
`src/utils/gemini.ts`

---

## 6. Animasi Panel Open/Close — Scale Pop Effect

### Sebelum

Panel cuma slide up + fade in:

```
translateY: 20 → 0
opacity: 0 → 1
```

### Sesudah

Panel muncul dengan efek **"pop out"** dari posisi face (bottom-right):

```
                    ┌────────────────────┐
                    │     scale: 0.85    │
                    │     translateY: 20 │ ← mulai dari bawah
                    │     opacity: 0     │
                    └────────────────────┘
                           ↓ animejs ↓
                    ┌────────────────────┐
                    │     scale: 1       │
                    │     translateY: 0  │ ← posisi akhir
                    │     opacity: 1     │
                    └────────────────────┘
                         easeOutBack(1.2)
                        ─────────────────
                       🎯 overshoot ringan
```

### Detail Teknis

**`transform-origin: bottom right`** — panel scaling dari sudut kanan bawah (posisi face button), bukan dari tengah:

```tsx
<div style={{ maxHeight: 'min(500px, 70vh)', transformOrigin: 'bottom right' }}>
```

**Open (350ms):**
```ts
animate(panel, {
  translateY: { from: 20, to: 0 },
  opacity: { from: 0, to: 1 },
  scale: { from: 0.85, to: 1 },
  duration: 350,
  easing: 'easeOutBack(1.2)',  // pop + sedikit overshoot
});
```

**Close (200ms):**
```ts
animate(panel, {
  translateY: { from: 0, to: 20 },
  opacity: { from: 1, to: 0 },
  scale: { from: 1, to: 0.85 },
  duration: 200,
  easing: 'easeInQuad',  // cepat menghilang
});
```

### File
`src/components/ChatBubble.tsx`

---

## 7. Preview: Animasi 3D Face

### Diagram Alur Animasi

```
┌─────────────────────────────────────────────────────────┐
│                    IDLE (setiap saat)                    │
│                                                         │
│  ┌────────────────┐    ┌─────────────────────┐         │
│  │ Float naik-turun │    │    RotateY 3D       │         │
│  │ translateY: -6  │    │    -12° ────→ 12°    │         │
│  │        ↓        │    │         ↓            │         │
│  │ translateY: +6  │    │    easing: inOutSine │         │
│  │  4k-ms loop     │    │    3s loop           │         │
│  └────────────────┘    └─────────────────────┘         │
│                                                         │
│  ⏰ Setiap 4 detik: Kedip                               │
│     r: 2 → 0.3 → 2  (80ms + 80ms)                     │
├─────────────────────────────────────────────────────────┤
│                    HOVER                                 │
│                                                         │
│  scale: 1 → 1.3                                         │
│  rotateY: 360° (satu putaran penuh)                     │
│  mouth: membuka (d path berubah)                        │
│  easing: easeOutElastic(1, .5) — efek getar             │
├─────────────────────────────────────────────────────────┤
│                    CLICK                                 │
│                                                         │
│  → onToggle() (buka/tutup panel)                        │
│  → Face tetap utuh (tidak shrink)                       │
└─────────────────────────────────────────────────────────┘
```

### Ringkasan Parameter Animejs

| Animasi | Target | Properti | Dari → Ke | Durasi | Easing | Loop |
|---------|--------|----------|-----------|--------|--------|------|
| Float | face | `translateY` | `-6 ↔ 6` | 3000ms | `easeInOutSine` | ♾️ |
| Rotasi 3D | face | `rotateY` | `-12 ↔ 12` | 3000ms | `easeInOutSine` | ♾️ |
| Kedip | pupil kiri | `r` | `2 ↔ 0.3` | 80ms | `easeOutQuad` | tiap 4s |
| Kedip | pupil kanan | `r` | `2 ↔ 0.3` | 80ms | `easeOutQuad` | tiap 4s |
| Hover | face | `scale` | `1 → 1.3` | 800ms | `easeOutElastic(1, .5)` | sekali |
| Hover | face | `rotateY` | `→ 360°` | 800ms | `easeOutElastic(1, .5)` | sekali |
| Hover | mulut | `d` | `→ membuka` | 300ms | `easeOutQuad` | sekali |
| Panel Open | panel | `translateY` | `20 → 0` | 350ms | `easeOutBack(1.2)` | sekali |
| Panel Open | panel | `opacity` | `0 → 1` | 350ms | `easeOutBack(1.2)` | sekali |
| Panel Open | panel | `scale` | `0.85 → 1` | 350ms | `easeOutBack(1.2)` | sekali |
| Panel Close | panel | `translateY` | `0 → 20` | 200ms | `easeInQuad` | sekali |
| Panel Close | panel | `opacity` | `1 → 0` | 200ms | `easeInQuad` | sekali |
| Panel Close | panel | `scale` | `1 → 0.85` | 200ms | `easeInQuad` | sekali |

### File yang Diubah

| File | Perubahan |
|------|-----------|
| `src/components/AssistantFace.tsx` | Fix mata, fix idle animasi, fix hover, hapus shrink |
| `src/components/ChatBubble.tsx` | Fix panel open/close, cancel animasi, timing guard |
| `docs/ANIMASI-FIX.md` | Dokumentasi ini |
