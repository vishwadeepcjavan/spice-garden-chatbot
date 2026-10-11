import { menuItems } from '@/lib/menu-data';

export default function Menu() {
  return (
    <section id="menu" className="bg-orange-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-red-600 uppercase">
            Our Specialities
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            The Menu
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-red-600 to-orange-500"
            aria-hidden="true"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <article
              key={item.name}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Gradient accent bar */}
              <div
                className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-red-600 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                </div>
                <span
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-2xl transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {item.emoji}
                </span>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>

              <p className="text-lg font-bold text-red-700">
                ₹{item.price}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
