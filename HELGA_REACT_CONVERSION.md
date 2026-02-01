# Helga Wedding Template - React Conversion

## Deskripsi

Konversi template HTML wedding invitation Helga dari Katsudoto ke React component dengan mempertahankan semua CSS asli.

## Struktur File

```
resources/js/
├── pages/
│   └── HelgaTemplate.tsx          # Main component wrapper
│
└── components/helga/
    ├── PrimaryPane.tsx            # Left sidebar (desktop)
    ├── SecondaryPane.tsx          # Main content area
    ├── TopCover.tsx               # Opening cover dengan tombol "Open Invitation"
    ├── CoverSection.tsx           # Cover dengan foto couple dan frame
    ├── QuoteSection.tsx           # Ayat Al-Quran section
    ├── CoupleSection.tsx          # Detail mempelai pria & wanita
    └── StubSections.tsx           # Placeholder untuk section lainnya
```

## Komponen Yang Sudah Diimplementasi

### 1. **HelgaTemplate** (Main Component)

- Wrapper utama dengan structure side-to-side layout
- Inisialisasi AOS (Animate On Scroll)
- Music player container
- Alert dan modal containers

### 2. **PrimaryPane**

- Sidebar kiri (desktop view)
- Ornamen dekoratif (trees, flowers)
- Nama pengantin
- Guest name display

### 3. **SecondaryPane**

- Container untuk semua section konten
- Mengorganisir 15+ section dalam urutan yang benar

### 4. **TopCover**

- Cover pembuka dengan background
- Ornamen dekoratif
- Nama pengantin
- Nama tamu
- Tombol "Open Invitation"

### 5. **CoverSection**

- Foto couple dengan frame ornamen
- 6 flower ornaments dengan animasi
- Title dan hashtag

### 6. **QuoteSection**

- Quote ayat Al-Quran (QS. Ar-Rum: 21)

### 7. **CoupleSection**

- Detail mempelai pria (Marcell)
- Detail mempelai wanita (Lisa)
- Foto couple masing-masing
- Link Instagram
- Separator "&" di tengah

### 8. **StubSections**

Placeholder components untuk:

- SaveDateSection
- AgendaSection
- RundownSection
- RsvpSection
- GallerySection
- VideoGallerySection
- LoveStorySection
- LiveStreamingSection
- InstagramFilterSection
- WeddingGiftSection
- ProtocolSection
- WeddingWishSection
- NotesSection
- FootnoteSection
- FooterSection

## CSS Yang Digunakan

Semua CSS asli dari template HTML tetap digunakan tanpa perubahan:

- `src/template/exclusive-helga.1764902159.css`
- `src/universal.css`
- `src/template/global.css`
- `src/kado-template.css`
- `src/rundown-template.css`
- `src/note-template.css`
- `src/bank-template.css`
- Plugin CSS (AOS, Slick, LightGallery, dll)

## Inline Styles

Beberapa CSS custom colors menggunakan CSS variables:

```css
--background-primary: #eae2dc --background-secondary: #7d2229 --background-tertiary: #a5785d --text-primary: #89565c --text-secondary: #404040
    --text-tertiary: #eae2dc --button-text-primary: #eae2dc --button-background-primary: #89565c;
```

## Dependencies JavaScript

Template ini memerlukan library berikut (sudah ada di HTML head):

- jQuery
- AOS (Animate On Scroll)
- Slick Slider
- LightGallery
- Modal Video
- Video.js
- tsParticles
- Selectize
- HTML2Canvas

## Cara Implementasi Lebih Lanjut

Untuk mengimplementasi section yang masih stub:

1. Buka file `/resources/js/components/helga/StubSections.tsx`
2. Pilih section yang ingin diimplementasi
3. Buat file component baru, misalnya `SaveDateSection.tsx`
4. Copy struktur HTML dari `marcelisa.katsudoto.id/490068.html`
5. Convert HTML ke JSX React
6. Update import di `SecondaryPane.tsx`

Contoh:

```tsx
// SaveDateSection.tsx
import React from 'react';

export default function SaveDateSection() {
    return (
        <section className="save-date-wrap">
            <div className="save-date" data-aos="zoom-out" data-aos-duration="1200">
                {/* Tambahkan konten HTML di sini */}
            </div>
        </section>
    );
}
```

## Features Yang Perlu Diperhatikan

1. **AOS Animations**: Semua animasi menggunakan data attributes

    ```tsx
    data-aos="fade-up"
    data-aos-duration="1200"
    data-aos-delay="300"
    ```

2. **LightGallery**: Untuk foto gallery yang clickable

    ```tsx
    className = 'lightgallery';
    ```

3. **Countdown Timer**: Perlu implementasi JavaScript untuk countdown

4. **Music Player**: Perlu implementasi player dengan auto-play

5. **Form Handling**: RSVP, Wedding Gift, Wedding Wish forms

6. **Slick Slider**: Untuk love story carousel

## Data Yang Perlu Di-customize

Ganti data berikut dengan data wedding sebenarnya:

- Nama pengantin (Marcell & Lisa)
- Nama tamu (Chindy & Partner)
- Tanggal wedding (January 28, 2024)
- Lokasi (Four Points by Sheraton Bali, Kuta)
- Foto couple
- Gallery photos
- Video URL (YouTube)
- Instagram links
- Filter Instagram URL
- Bank account untuk gift
- Hashtag (#PromDateToLifeMate)

## Next Steps

1. ✅ Konversi struktur HTML dasar ke React
2. ✅ Implementasi komponen utama (Top Cover, Cover, Couple)
3. ⏳ Implementasi section lainnya (save date, agenda, dll)
4. ⏳ Implementasi interaktivity (countdown, music, forms)
5. ⏳ Implementasi gallery dan slider
6. ⏳ Testing semua animasi dan transitions
7. ⏳ Integration dengan Laravel backend

## Catatan Penting

- **Jangan ubah nama class CSS** - Semua class sudah didefinisikan di CSS template asli
- **Pertahankan struktur HTML** - Layout bergantung pada struktur yang tepat
- **Data attributes AOS** - Penting untuk animasi scroll
- **Responsive design** - Template sudah responsive dengan class yang ada
