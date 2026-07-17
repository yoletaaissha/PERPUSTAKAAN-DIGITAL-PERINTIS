import logoSekolah from "../../assets/logo-sekolah.png";
import { ChevronRight } from 'lucide-react';

export default function SplashScreen({ fading, ready, onStart }) {
  return (
    <div className={`splash-screen ${fading ? 'splash-fade-out' : ''}`}>
      <div className={`splash-content ${fading ? '' : 'splash-fade-in'}`}>

        <div className="flex justify-center">
          <img
            src={logoSekolah}
            alt="Logo SMP Perintis"
            className="w-28 h-28 object-contain"
          />
        </div>

        <h1 className="text-[22px] font-semibold text-neutral-900 mt-5">
          Perpustakaan SMP Perintis Yogyakarta
        </h1>

        <p className="text-sm text-neutral-500 mt-2 max-w-[280px] text-center leading-relaxed">
          Akses koleksi buku fisik dan digital sekolah dengan mudah
        </p>

        {ready && (
          <button className="splash-start-btn" onClick={onStart}>
            Mulai <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}