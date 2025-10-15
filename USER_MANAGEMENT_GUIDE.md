# Panduan Manajemen User

## Overview
Sistem manajemen user memungkinkan admin untuk mengelola pengguna dengan berbagai role (admin, pm, team, client).

## URL Endpoints

### Frontend
- **Daftar User**: `http://127.0.0.1:5173/users`
- **Tambah User**: `http://127.0.0.1:5173/users/create`
- **Edit User**: `http://127.0.0.1:5173/users/{id}/edit`

### Backend API
- **GET** `/api/admin/users` - Daftar semua user
- **POST** `/api/admin/users` - Tambah user baru
- **GET** `/api/admin/users/{id}` - Detail user
- **PUT** `/api/admin/users/{id}` - Update user
- **DELETE** `/api/admin/users/{id}` - Hapus user

## Fitur yang Tersedia

### 1. Daftar User (`/users`)
- Tampilan tabel dengan informasi user lengkap
- Search berdasarkan nama atau email
- Filter berdasarkan role
- Aksi Edit dan Hapus untuk setiap user
- Badge role dengan warna berbeda

### 2. Tambah User (`/users/create`)
- Form input untuk nama, email, password, dan role
- Validasi input real-time
- Pilihan role: Admin, Project Manager, Team Member, Client

### 3. Edit User (`/users/{id}/edit`)
- Form pre-filled dengan data user yang ada
- Password opsional (kosongkan jika tidak ingin mengubah)
- Update role dan informasi lainnya

## Role dan Permission

### Admin
- Akses penuh ke semua fitur manajemen user
- Dapat membuat, membaca, mengupdate, dan menghapus user
- Dapat mengubah role user

### Role Lainnya
- Tidak memiliki akses ke halaman manajemen user
- Akan diarahkan ke halaman unauthorized jika mencoba mengakses

## Cara Menggunakan

1. **Login sebagai Admin**
   - Pastikan user yang login memiliki role 'admin'

2. **Akses Halaman User**
   - Klik menu "Pengguna" di sidebar
   - Atau akses langsung ke `/users`

3. **Tambah User Baru**
   - Klik tombol "Tambah User"
   - Isi form dengan data yang diperlukan
   - Pilih role yang sesuai
   - Klik "Simpan User"

4. **Edit User**
   - Klik tombol "Edit" pada user yang ingin diedit
   - Ubah data yang diperlukan
   - Klik "Update User"

5. **Hapus User**
   - Klik tombol "Hapus" pada user yang ingin dihapus
   - Konfirmasi penghapusan

## Validasi

### Frontend
- Nama: Required, maksimal 100 karakter
- Email: Required, format email valid, unique
- Password: Required untuk user baru, minimal 6 karakter
- Role: Required, harus salah satu dari: admin, pm, team, client

### Backend
- Validasi yang sama dengan frontend
- Hash password otomatis
- Check unique email (kecuali untuk user yang sedang diedit)

## Error Handling

- Error validasi ditampilkan di bawah setiap field
- Error umum ditampilkan di atas form
- Loading state saat proses save/load
- Konfirmasi sebelum menghapus user

## Security

- Hanya admin yang bisa mengakses endpoint user management
- Password di-hash menggunakan bcrypt
- CSRF protection enabled
- Sanctum authentication required

## Troubleshooting

### User tidak bisa akses halaman user management
- Pastikan user login dengan role 'admin'
- Check apakah token authentication masih valid

### Error 403 Unauthorized
- Pastikan user sudah login
- Pastikan user memiliki role 'admin'
- Check apakah token masih valid

### Error 422 Validation Error
- Periksa data yang diinput
- Pastikan email unique
- Pastikan password minimal 6 karakter

### Data tidak muncul
- Check koneksi ke backend
- Pastikan backend server berjalan di port 8000
- Check console browser untuk error detail
