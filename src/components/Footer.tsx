export default function Footer() {
  return (
    <footer className="bg-gray-900 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">🌿</span>
            <span className="text-lg font-bold text-white">Spice Garden</span>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex gap-6">
              <li>
                <a
                  href="#menu"
                  className="text-sm text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#hours"
                  className="text-sm text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  Hours
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm text-gray-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; 2026 Spice Garden. All rights reserved.
          </p>
          <p className="mt-1 text-xs text-gray-600">
            12 Garden Road, Pune, India &middot; 98765 43210
          </p>
        </div>
      </div>
    </footer>
  );
}
