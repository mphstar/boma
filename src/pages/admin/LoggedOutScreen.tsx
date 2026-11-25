export function LoggedOutScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="bye">
      <div>
        <div className="bye-emoji">👋</div>
        <h2>Anda telah keluar</h2>
        <p>Sampai jumpa di SAI-Agro.</p>
        <button type="button" className="add" onClick={onLogin}>
          Masuk kembali
        </button>
      </div>
    </div>
  );
}
