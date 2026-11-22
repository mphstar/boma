import { useState } from 'react';
import { ToggleSwitch } from '../../components/admin/ui/ToggleSwitch';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { SETTING_TOGGLES } from '../../data/admin';
import type { AdminSettingFlag, AdminSettings } from '../../types/admin';

export function SettingsPage() {
  const { settings, saveSettings } = useAdmin();
  const toast = useToast();
  const [form, setForm] = useState<AdminSettings>(settings);

  const toggleFlag = (key: AdminSettingFlag) => {
    setForm((current) => ({
      ...current,
      flags: { ...current.flags, [key]: !current.flags[key] },
    }));
  };

  return (
    <div className="box set">
      <h3 className="pt">Pengaturan</h3>

      <div className="r">
        <b>Nama kawasan</b>
        <input
          className="fld fld-sm"
          value={form.areaName}
          onChange={(event) => setForm((current) => ({ ...current, areaName: event.target.value }))}
          aria-label="Nama kawasan"
        />
      </div>
      <div className="r">
        <b>Lokasi</b>
        <input
          className="fld fld-sm"
          value={form.location}
          onChange={(event) => setForm((current) => ({ ...current, location: event.target.value }))}
          aria-label="Lokasi"
        />
      </div>

      {SETTING_TOGGLES.map((setting) => (
        <div className="r" key={setting.key}>
          <div>
            <b>{setting.title}</b>
            <br />
            <small>{setting.detail}</small>
          </div>
          <ToggleSwitch
            checked={form.flags[setting.key]}
            label={setting.title}
            onChange={() => toggleFlag(setting.key)}
          />
        </div>
      ))}

      <div style={{ marginTop: 16 }}>
        <button
          type="button"
          className="add"
          onClick={() => {
            saveSettings(form);
            toast('Pengaturan disimpan');
          }}
        >
          Simpan
        </button>
      </div>
    </div>
  );
}
