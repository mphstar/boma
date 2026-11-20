import { DESTINATIONS } from '../../data/destinations';

export function DatasetTable() {
  return (
    <div className="tbl rv">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Aktivitas wisata</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Durasi</th>
            <th>Tingkat aktivitas</th>
            <th>Wisatawan</th>
          </tr>
        </thead>
        <tbody>
          {DESTINATIONS.map((destination) => (
            <tr key={destination.id}>
              <td>{destination.id}</td>
              <td>{destination.name}</td>
              <td>{destination.category}</td>
              <td>{destination.price}</td>
              <td>{destination.duration}</td>
              <td>{destination.activity}</td>
              <td>{destination.tourist}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
