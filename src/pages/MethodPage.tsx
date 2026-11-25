import { DatasetTable } from '../components/method/DatasetTable';
import { GuideCards } from '../components/method/GuideCards';
import { RulesTable } from '../components/method/RulesTable';

export function MethodPage() {
  return (
    <section className="view" id="metode">
      <div className="wrap">
        <div className="rv">
          <h2 className="h2">Cara SAI-Agro merekomendasikan</h2>
          <p className="sub">
            Decision Tree ID3 memilih atribut dengan Information Gain tertinggi sebagai akar pohon.
            Dari dataset tipe wisata SAI-Agro, atribut itu adalah Tingkat Aktivitas (0.7014).
          </p>
        </div>

        <h3 className="mh rv">Aturan klasifikasi</h3>
        <RulesTable />
        <p className="note2">
          Cabang Aktif dan Santai dipecah berdasarkan harga, cabang Sedang berdasarkan jenis
          wisatawan. Nilai simpul pada bagan: Aktif 0.9183, Sedang 0.9183, Santai 0.9710.
        </p>

        <h3 className="mh rv">Dataset tipe wisata</h3>
        <DatasetTable />

        <h3 className="mh rv">Panduan dari booklet</h3>
        <GuideCards />
        <p className="note2">
          Kategori dan harga adalah panduan awal, bukan daftar resmi. Selalu konfirmasi tarif aktual
          dan ketersediaan kepada pengelola Perumda Perkebunan Kahyangan Jember.
        </p>
      </div>
    </section>
  );
}
