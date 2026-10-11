export default function Hours() {
  return (
    <section id="hours" className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-red-600 uppercase">
            Visit Us
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Hours &amp; Location
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-red-600 to-orange-500"
            aria-hidden="true"
          />
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Hours card */}
          <div className="rounded-2xl bg-orange-50 p-8 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-xl"
                aria-hidden="true"
              >
                🕐
              </span>
              <h3 className="text-xl font-semibold text-gray-900">
                Opening Hours
              </h3>
            </div>
            <dl className="space-y-3">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Monday – Sunday</dt>
                <dd className="font-semibold text-gray-900">11 AM – 11 PM</dd>
              </div>
              <div className="border-t border-orange-200 pt-3">
                <p className="text-sm text-gray-500">
                  Open every day of the week — holidays included!
                </p>
              </div>
            </dl>
          </div>

          {/* Location card */}
          <div className="rounded-2xl bg-orange-50 p-8 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-xl"
                aria-hidden="true"
              >
                📍
              </span>
              <h3 className="text-xl font-semibold text-gray-900">Location</h3>
            </div>
            <address className="not-italic">
              <p className="mb-3 text-gray-700">
                12 Garden Road, Pune, India
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <span aria-hidden="true">📞</span>
                  <a
                    href="tel:+919876543210"
                    className="font-medium text-red-700 hover:text-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    98765 43210
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span aria-hidden="true">🚚</span>
                  Free delivery within 5 km (min order ₹300)
                </p>
                <p className="flex items-center gap-2">
                  <span aria-hidden="true">💳</span>
                  Cash, UPI &amp; cards accepted
                </p>
              </div>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
