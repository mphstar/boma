import { useState } from 'react';
import { AddWisataDialog } from '../../components/admin/catalog/AddWisataDialog';
import { WisataCard } from '../../components/admin/catalog/WisataCard';
import { WisataDetailDialog } from '../../components/admin/catalog/WisataDetailDialog';
import { AdminIcon } from '../../components/admin/ui/AdminIcon';
import { useAdmin } from '../../context/AdminContext';
import { WISATA_TABS, type WisataTab } from '../../data/admin';

export function CatalogPage() {
  const { wisata, search, toggleWisata, addWisata } = useAdmin();
  const [tab, setTab] = useState<WisataTab>('Semua');
  const [detailId, setDetailId] = useState<number | null>(null);
  const [adding, setAdding] = useState(false);

  const query = search.toLowerCase();
  const list = wisata.filter(
    (item) =>
      (tab === 'Semua' || item.status === tab) && item.name.toLowerCase().includes(query),
  );
  const detail = wisata.find((item) => item.id === detailId) ?? null;

  return (
    <div className="box">
      <div className="bar-top">
        <div className="tabs" role="tablist" aria-label="Filter status wisata">
          {WISATA_TABS.map((item) => (
            <button
              type="button"
              role="tab"
              key={item}
              aria-selected={tab === item}
              className={tab === item ? 'on' : undefined}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button type="button" className="add" onClick={() => setAdding(true)}>
          <AdminIcon name="plus" size={14} strokeWidth={2.5} />
          Tambah Wisata
        </button>
      </div>

      <div className="cards">
        {list.length ? (
          list.map((item) => (
            <WisataCard
              key={item.id}
              wisata={item}
              onDetail={() => setDetailId(item.id)}
            />
          ))
        ) : (
          <div className="empty">Tidak ada wisata ditemukan.</div>
        )}
      </div>

      {detail && (
        <WisataDetailDialog
          wisata={detail}
          onClose={() => setDetailId(null)}
          onToggle={() => toggleWisata(detail.id)}
        />
      )}
      {adding && (
        <AddWisataDialog onClose={() => setAdding(false)} onSave={addWisata} />
      )}
    </div>
  );
}
