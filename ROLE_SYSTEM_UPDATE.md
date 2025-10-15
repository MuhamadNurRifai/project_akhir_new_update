# Perubahan Role System untuk Tim Kreatif

## Perubahan yang Dilakukan
Mengubah sistem role dari role umum menjadi role spesifik untuk tim kreatif.

## Role Lama vs Role Baru

### Role Lama
- Admin
- Project Manager (pm)
- Team Member (team)
- Client

### Role Baru
- Admin
- Designer
- Copywriter
- Web Designer

## Perubahan di Frontend

### 1. UserForm Component (`frontend/src/pages/users/UserForm.tsx`)
```typescript
// Sebelum
<option value="admin">Admin</option>
<option value="pm">Project Manager</option>
<option value="team">Team Member</option>
<option value="client">Client</option>

// Sesudah
<option value="admin">Admin</option>
<option value="designer">Designer</option>
<option value="copywriter">Copywriter</option>
<option value="web_designer">Web Designer</option>
```

### 2. UserList Component (`frontend/src/pages/users/UserList.tsx`)
```typescript
// Filter dropdown
<option value="admin">Admin</option>
<option value="designer">Designer</option>
<option value="copywriter">Copywriter</option>
<option value="web_designer">Web Designer</option>

// Role badge colors
const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'admin': return 'bg-red-100 text-red-800';
    case 'designer': return 'bg-purple-100 text-purple-800';
    case 'copywriter': return 'bg-green-100 text-green-800';
    case 'web_designer': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Role labels
const getRoleLabel = (role: string) => {
  switch (role) {
    case 'admin': return 'Admin';
    case 'designer': return 'Designer';
    case 'copywriter': return 'Copywriter';
    case 'web_designer': return 'Web Designer';
    default: return role;
  }
};
```

### 3. Default Role
```typescript
// Sebelum
const [role, setRole] = useState('team');

// Sesudah
const [role, setRole] = useState('designer');
```

## Perubahan di Backend

### 1. UserController (`backend/app/Http/Controllers/Admin/UserController.php`)
```php
// Validasi untuk store
'role' => 'required|in:admin,designer,copywriter,web_designer'

// Validasi untuk update
'role' => 'sometimes|in:admin,designer,copywriter,web_designer'
```

### 2. Database Migration (`backend/database/migrations/2025_07_07_025502_create_tables.php`)
```php
// Sebelum
$t->enum('role', ['admin', 'pm', 'team', 'client']);

// Sesudah
$t->enum('role', ['admin', 'designer', 'copywriter', 'web_designer']);
```

### 3. UserFactory (`backend/database/factories/UserFactory.php`)
```php
// Default definition
'role' => fake()->randomElement(['admin', 'designer', 'copywriter', 'web_designer'])

// Factory methods
public function designer(): static
{
    return $this->state(fn (array $attributes) => [
        'role' => 'designer',
    ]);
}

public function copywriter(): static
{
    return $this->state(fn (array $attributes) => [
        'role' => 'copywriter',
    ]);
}

public function webDesigner(): static
{
    return $this->state(fn (array $attributes) => [
        'role' => 'web_designer',
    ]);
}
```

## Warna Badge Role

| Role | Warna Badge |
|------|-------------|
| Admin | Merah (`bg-red-100 text-red-800`) |
| Designer | Ungu (`bg-purple-100 text-purple-800`) |
| Copywriter | Hijau (`bg-green-100 text-green-800`) |
| Web Designer | Biru (`bg-blue-100 text-blue-800`) |

## Keuntungan

1. **Spesifik untuk Tim Kreatif**: Role yang lebih sesuai dengan struktur tim kreatif
2. **Jelas dalam Pembagian Tugas**: Setiap role memiliki tanggung jawab yang jelas
3. **Visual yang Lebih Baik**: Badge warna yang berbeda untuk setiap role
4. **Konsistensi**: Frontend dan backend menggunakan role yang sama

## Database Migration

Jika database sudah ada dengan role lama, perlu membuat migration untuk mengubah enum:

```php
// Migration untuk mengubah role enum
Schema::table('users', function (Blueprint $table) {
    $table->enum('role', ['admin', 'designer', 'copywriter', 'web_designer'])
          ->change();
});
```

## Testing

Setelah perubahan, sistem seharusnya:
- ✅ Dropdown role menampilkan opsi yang benar
- ✅ Filter role berfungsi dengan baik
- ✅ Badge role menampilkan warna yang sesuai
- ✅ Backend validasi menerima role yang baru
- ✅ Database mendukung role yang baru

## Status
✅ **SELESAI** - Sistem role telah diubah menjadi spesifik untuk tim kreatif
