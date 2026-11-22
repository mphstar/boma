interface PaginationProps {
  page: number;
  pageCount: number;
  total: number;
  rangeStart: number;
  rangeEnd: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, total, rangeStart, rangeEnd, onChange }: PaginationProps) {
  return (
    <div className="pgn">
      <span>
        Menampilkan {total ? rangeStart + 1 : 0}–{rangeEnd} dari {total}
      </span>
      <div>
        <button
          type="button"
          className="mini"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Sebelumnya"
        >
          ‹
        </button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
          <button
            type="button"
            key={number}
            className={`mini${number === page ? ' on' : ''}`}
            onClick={() => onChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          type="button"
          className="mini"
          disabled={page === pageCount}
          onClick={() => onChange(page + 1)}
          aria-label="Berikutnya"
        >
          ›
        </button>
      </div>
    </div>
  );
}
