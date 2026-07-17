# Class Diagram

## Sistem Informasi Perpustakaan Perintis

```mermaid
classDiagram

class User{
    +id
    +nama
    +username
    +password
    +login()
    +logout()
}

class Siswa{
    +lihatKatalog()
    +pinjamBuku()
    +lihatRiwayat()
    +beriReview()
    +lihatNotifikasi()
}

class GuruKaryawan{
    +kelolaBuku()
    +catatPeminjaman()
    +catatPengembalian()
    +uploadEbook()
}

class KepalaSekolah{
    +lihatLaporan()
    +lihatAnalisis()
}

class Admin{
    +kelolaAkun()
    +backupData()
    +maintenance()
}

class Buku{
    +idBuku
    +judul
    +penulis
    +penerbit
    +tahunTerbit
    +kategori
    +stok
    +jenis
}

class Ebook{
    +idEbook
    +filePDF
    +ukuranFile
}

class Peminjaman{
    +idPinjam
    +tanggalPinjam
    +batasKembali
    +status
}

class Pengembalian{
    +idKembali
    +tanggalKembali
    +denda
}

class Review{
    +idReview
    +rating
    +komentar
    +tanggal
}

class Notifikasi{
    +idNotif
    +judul
    +pesan
    +status
    +tanggal
}

class Laporan{
    +idLaporan
    +periode
    +tanggalCetak
}

%% Inheritance
User <|-- Siswa
User <|-- GuruKaryawan
User <|-- KepalaSekolah
User <|-- Admin

%% Relasi
Siswa "1" --> "*" Peminjaman : meminjam
Buku "1" --> "*" Peminjaman : dipinjam

Peminjaman "1" --> "0..1" Pengembalian : dikembalikan

Siswa "1" --> "*" Review : memberi
Buku "1" --> "*" Review : memiliki

Siswa "1" --> "*" Notifikasi : menerima

Buku "1" --> "0..1" Ebook : memiliki

GuruKaryawan "1" --> "*" Buku : mengelola
GuruKaryawan "1" --> "*" Ebook : mengunggah
GuruKaryawan "1" --> "*" Peminjaman : mencatat
GuruKaryawan "1" --> "*" Pengembalian : memproses

KepalaSekolah "1" --> "*" Laporan : melihat

Admin "1" --> "*" User : mengelola
Admin "1" --> "*" Laporan : backup
```