import { RULE_CASES } from '../../data/decisionTree';
import { byId } from '../../data/destinations';
import { classify } from '../../utils/classify';

export function RulesTable() {
  return (
    <div className="tbl rv">
      <table>
        <thead>
          <tr>
            <th>Kondisi</th>
            <th>Kategori</th>
            <th>Destinasi</th>
          </tr>
        </thead>
        <tbody>
          {RULE_CASES.map(({ label, selection }) => {
            const result = classify(selection);
            const destinations = result.ids
              .map((id) => byId(id)?.name)
              .filter(Boolean)
              .join(', ');

            return (
              <tr key={label}>
                <td>
                  <b>{label}</b>
                </td>
                <td>{result.category}</td>
                <td>{destinations}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
