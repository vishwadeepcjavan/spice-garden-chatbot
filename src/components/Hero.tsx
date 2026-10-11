'use client';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #7f1d1d 0%, #991b1b 25%, #c2410c 50%, #ea580c 75%, #f97316 100%)',
      }}
    >
      {/* Decorative overlay pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Floating decorative emojis */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <span className="absolute left-[10%] top-[15%] animate-bounce text-5xl opacity-20 [animation-delay:0.5s] [animation-duration:3s]">🌶️</span>
        <span className="absolute right-[15%] top-[20%] animate-bounce text-4xl opacity-20 [animation-delay:1s] [animation-duration:4s]">🍛</span>
        <span className="absolute bottom-[20%] left-[20%] animate-bounce text-4xl opacity-20 [animation-delay:1.5s] [animation-duration:3.5s]">🌿</span>
        <span className="absolute bottom-[25%] right-[10%] animate-bounce text-5xl opacity-20 [animation-delay:2s] [animation-duration:4.5s]">🫓</span>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="mb-4 text-lg font-medium tracking-widest text-orange-200 uppercase sm:text-xl">
          Authentic Indian Cuisine
        </p>
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Where Every Bite Tells a <span className="text-orange-300">Story</span>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-orange-100/90 sm:text-xl">
          Experience the warmth of home-cooked flavours crafted with the finest
          spices, right in the heart of Pune.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#menu"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-red-800 shadow-lg transition-all duration-200 hover:bg-orange-50 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            View Menu
          </a>
          <button
            type="button"
            onClick={() => {
              const event = new CustomEvent('open-chatbot');
              window.dispatchEvent(event);
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
          >
            <span aria-hidden="true">💬</span>
            Chat with us
          </button>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#FFF7ED"
          />
        </svg>
      </div>
    </section>
  );
}
