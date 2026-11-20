import type { CatalogFilter } from '../../types';

interface CategoryFiltersProps {
  categories: CatalogFilter[];
  active: CatalogFilter;
  onChange: (category: CatalogFilter) => void;
}

export function CategoryFilters({ categories, active, onChange }: CategoryFiltersProps) {
  return (
    <div className="filters" aria-label="Filter jenis wisata">
      {categories.map((category) => (
        <button
          key={category}
          className={`f${category === active ? ' on' : ''}`}
          onClick={() => onChange(category)}
          aria-pressed={category === active}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
