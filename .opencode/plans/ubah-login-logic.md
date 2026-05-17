# Rencana Perubahan Login Logic

## 1. Hapus Google OAuth

### `src/database/supabase.ts`
- Hapus fungsi `signInWithGoogle` (baris 14-21)

### `src/store/AppContext.tsx`
- Hapus import `signInWithGoogle` dari supabase (baris 5)
- Hapus `signInWithGoogle` dari interface `AppActions` (baris 42)
- Hapus implementasi `signInWithGoogle` (baris 302-304)
- Hapus `signInWithGoogle` dari context value (baris 387)
- Tambah state `showAuthModal` dan method `requireAuth`

### `src/features/LoginPage.tsx`
- Hapus `signInWithGoogle` dari destructuring (baris 12)
- Hapus `handleGoogleSignIn` function (baris 18-26)
- Hapus divider "or continue with" (baris 134-138)
- Hapus Google button (baris 141-165)

### `src/features/RegisterPage.tsx`
- Hapus `signInWithGoogle` dari destructuring (baris 11)
- Hapus `handleGoogleSignUp` function (baris 19-27)
- Hapus divider "or continue with" (baris 163-167)
- Hapus Google button (baris 170-194)

### `src/features/Settings.tsx`
- Hapus komponen `GoogleSignInButton` (baris 66-107)
- Di tab Data & Storage, ganti `<GoogleSignInButton />` dengan form login email/password atau link ke login

### `src/components/CookieConsent.tsx`
- Ubah teks baris 30: hapus "(Google OAuth)"

## 2. Buat AuthModal (`src/features/AuthModal.tsx`)

Component baru yang berisi:
- Toggle antara Login dan Register form (email/password only)
- Desain yang cocok dengan theme neo-brutalist
- Props: `open: boolean`, `onClose: () => void`
- Import dari `LoginPage.tsx` dan `RegisterPage.tsx` untuk reuse form style
- Setelah login sukses, panggil `onClose()` dan jalankan pending action callback

## 3. Ubah Routing di `App.tsx`

- Hapus blok: `if (!isAuthenticated) { ... show LoginPage/RegisterPage ... }`
- Ganti dengan: setelah landing page, langsung render `<AppShell />` (tanpa cek auth)
- Login/Register hanya muncul sebagai modal via `AppContext`

## 4. Tambah `requireAuth` di AppContext

```typescript
interface AppActions {
  // ... existing actions
  showAuthModal: boolean;
  setShowAuthModal: (open: boolean) => void;
  requireAuth: (callback: () => void) => void;
}
```

Implementasi `requireAuth`:
```typescript
const requireAuth = useCallback((callback: () => void) => {
  if (user) {
    callback();
  } else {
    setPendingAction(() => callback);
    setShowAuthModal(true);
  }
}, [user]);
```

## 5. Auth Guard di Feature Pages

### `src/features/Projects.tsx`
- Di `handleSave`: bungkus dengan `requireAuth`
- Di `handleDelete`: bungkus dengan `requireAuth`
- Di tombol "New Project": bungkus dengan `requireAuth`

### `src/features/Kanban.tsx`
- Di `handleSave`: bungkus dengan `requireAuth`
- Di `handleDelete`: bungkus dengan `requireAuth`
- Di `handleMove`: bungkus dengan `requireAuth`
- Di `handleDropTask`: bungkus dengan `requireAuth`
- Di tombol "Add Task": bungkus dengan `requireAuth`

### `src/features/Notes.tsx`
- Di `createNote`: bungkus dengan `requireAuth`
- Di `handlePin`: bungkus dengan `requireAuth`
- Di `confirmDelete`: bungkus dengan `requireAuth`

### `src/features/Dashboard.tsx`
- Di tombol "New Project": bungkus dengan `requireAuth`

### `src/components/Topbar.tsx`
- Di dropdown "New": bungkus navigasi dengan `requireAuth`

## Catatan
- Semua data tetap bisa dibaca tanpa login (dari IndexedDB)
- Mutasi (create/edit/delete) baru bisa setelah login
- Sync ke Supabase tetap jalan hanya untuk user yang sudah login
