import { useAdmin } from '../../context/AdminContext';

export function GuidesPage() {
  const { guides, toggleGuide } = useAdmin();

  return (
    <div className="box">
      <h3 className="pt" style={{ marginBottom: 14 }}>
        Pemandu
      </h3>
      <div className="cards">
        {guides.map((guide, index) => (
          <div className="c" key={guide.name}>
            <div className="ch">
              <div className="th">🧭</div>
              <div className="grow">
                <h4>{guide.name}</h4>
                <p>{guide.destination}</p>
              </div>
              <span className={`chip${guide.onDuty ? '' : ' p'}`}>
                <i />
                {guide.onDuty ? 'Bertugas' : 'Libur'}
              </span>
            </div>
            <button type="button" className="mini" onClick={() => toggleGuide(index)}>
              {guide.onDuty ? 'Set libur' : 'Set bertugas'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
