"use client";

export default function FilterContent({
    search,
    setSearch,
    category,
    author,
    publisher,
    sort,
    maxPrice,
    categories,
    authors,
    publishers,
    updateParams,
    resetFilters,
}) {

    return (
        <>
            <input
                type="text"
                placeholder="Search books..."
                value={search}
                onChange={(e) => updateParams("search", e.target.value)}
                className="w-full border rounded-lg p-3 mb-4"
            />

            <select
                value={category}
                onChange={(e) => updateParams("category", e.target.value)}
                className="w-full border rounded-lg p-3 mb-4"

            >
                <option value="">All Categories</option>

                {categories.map((cat) => (
                    <option
                        key={cat._id}
                        value={cat._id}
                    >
                        {cat.name}
                    </option>
                ))}
            </select>

            <select
                value={author}
                onChange={(e) => updateParams("author", e.target.value)}
                className="w-full border rounded-lg p-3 mb-4"
            >
                <option value="">All Authors</option>
                {authors.map((author) => (
                    <option
                        key={author._id}
                        value={author._id}
                    >
                        {author.name}
                    </option>
                ))}
            </select>

            <select
                value={publisher}
                onChange={(e) => updateParams("publisher", e.target.value)}
                className="w-full border rounded-lg p-3 mb-4"
            >
                <option value="">All Publishers</option>
                {publishers.map((publisher) => (
                    <option
                        key={publisher._id}
                        value={publisher._id}
                    >
                        {publisher.name}
                    </option>
                ))}
            </select>

            <div className="mb-4">
                <label className="block mb-2 font-medium">
                    Max Price: ৳{maxPrice}
                </label>

                <input
                    type="range"
                    min={0}
                    max={5000}
                    value={maxPrice}
                    onChange={(e) =>
                        updateParams("maxPrice", e.target.value)
                    }
                    className="w-full"
                />
            </div>

            <select
                value={sort}
                onChange={(e) => updateParams("sort", e.target.value)}
                className="w-full border rounded-lg p-3 mb-4"
            >
                <option value="">Sort By</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="price-low">Price Low → High</option>
                <option value="price-high">Price High → Low</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
            </select>

            <button
                onClick={resetFilters}
                className="w-full bg-red-500 text-white py-3 rounded-lg"
            >
                Reset Filters
            </button>
        </>
    );
}