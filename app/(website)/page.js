import SearchBar from "@/components/HomepageSearch";
import MegaNavbar from "@/components/megaNavbar";
import Image from "next/image";
import Link from "next/link";

async function getFeaturedBooks() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/books?limit=8&sort=popular`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    const data = await res.json();

    return data.data || [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const books = await getFeaturedBooks();


  return (
    <main>

      {/* Hero */}
      <section className="bg-linear-to-r from-teal-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-4 py-24 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">
            Discover Your Next Favorite Book
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg">
            Browse thousands of books from bestselling authors,
            academics, programmers, and publishers worldwide.
          </p>


          {/* <form
            action="/books"
            className="mx-auto flex max-w-2xl overflow-hidden rounded-xl bg-white"
          >
            <input
              type="text"
              name="search"
              placeholder="Search books..."
              className="w-full px-4 py-4 text-black outline-none"
            />

            <button
              className="bg-indigo-600 px-8 text-white cursor-pointer"
              type="submit"
            >
              Search
            </button>
          </form> */}


          <SearchBar />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">
          Browse Categories
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {[
            "Programming",
            "Islamic",
            "Science",
            "History",
            "Novel",
            "Kids",
          ].map((category) => (
            <Link
              key={category}
              href={`/books?category=${category}`}
              className="rounded-xl border p-3 text-center font-medium transition hover:bg-indigo-600 hover:text-white"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              Featured Books
            </h2>

            <Link
              href="/books"
              className="font-medium text-indigo-600"
            >
              View All
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-xl bg-white shadow"
              >
                <Image
                  src={
                    book.media.secureUrl ||
                    "https://placehold.co/400x500"
                  }
                  alt={book.title}
                  height={300}
                  width={300}
                  className="h-72 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="line-clamp-2 text-lg font-semibold">
                    {book.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    {book.author?.name}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold">
                      ৳{book.price}
                    </span>

                    <Link
                      href={`/books/${book.slug}`}
                      className="rounded bg-indigo-600 px-3 py-2 text-white"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="rounded-xl border p-6 text-center">
            <h3 className="mb-2 font-bold">
              Free Delivery
            </h3>
            <p>On orders over ৳1000</p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            <h3 className="mb-2 font-bold">
              Secure Payment
            </h3>
            <p>bKash, Nagad & Cards</p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            <h3 className="mb-2 font-bold">
              Easy Returns
            </h3>
            <p>7 days replacement</p>
          </div>

          <div className="rounded-xl border p-6 text-center">
            <h3 className="mb-2 font-bold">
              24/7 Support
            </h3>
            <p>Always available</p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-indigo-600 py-20 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Stay Updated
          </h2>

          <p className="mb-8">
            Subscribe to receive book recommendations and
            special offers.
          </p>

          <form className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg px-4 py-3 text-black"
            />

            <button
              className="rounded-lg bg-black px-8 py-3"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}