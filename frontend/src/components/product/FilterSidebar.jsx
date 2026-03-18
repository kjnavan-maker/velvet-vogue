function FilterSidebar({ filters, query, onChange, onReset }) {
  return (
    <div className="card-surface p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm font-medium text-slate-500 transition hover:text-velvet-gold"
        >
          Reset
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Search products..."
          className="input-field"
          value={query.keyword}
          onChange={(e) => onChange("keyword", e.target.value)}
        />

        <select
          className="select-field"
          value={query.category}
          onChange={(e) => onChange("category", e.target.value)}
        >
          <option value="">All categories</option>
          {filters.categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="select-field"
          value={query.gender}
          onChange={(e) => onChange("gender", e.target.value)}
        >
          <option value="">All genders</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>

        <select
          className="select-field"
          value={query.clothingType}
          onChange={(e) => onChange("clothingType", e.target.value)}
        >
          <option value="">All clothing types</option>
          {filters.clothingTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="select-field"
          value={query.size}
          onChange={(e) => onChange("size", e.target.value)}
        >
          <option value="">All sizes</option>
          {filters.sizes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          className="select-field"
          value={query.color}
          onChange={(e) => onChange("color", e.target.value)}
        >
          <option value="">All colors</option>
          {filters.colors.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            min="0"
            placeholder="Min price"
            className="input-field"
            value={query.minPrice}
            onChange={(e) => onChange("minPrice", e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Max price"
            className="input-field"
            value={query.maxPrice}
            onChange={(e) => onChange("maxPrice", e.target.value)}
          />
        </div>

        <select
          className="select-field"
          value={query.sort}
          onChange={(e) => onChange("sort", e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
          <option value="rating">Top Rated</option>
          <option value="stock">Stock</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;