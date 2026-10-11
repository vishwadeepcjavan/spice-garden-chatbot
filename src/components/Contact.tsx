'use client';

import { useState, type FormEvent } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="bg-orange-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold tracking-widest text-red-600 uppercase">
            Get in Touch
          </p>
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-red-600 to-orange-500"
            aria-hidden="true"
          />
        </div>

        <div className="mx-auto max-w-lg">
          {submitted ? (
            <div
              role="status"
              className="rounded-2xl bg-white p-8 text-center shadow-sm"
            >
              <span className="mb-4 block text-5xl" aria-hidden="true">✅</span>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Thank you!
              </h3>
              <p className="text-gray-600">
                We&apos;ve received your message and will get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-full bg-red-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl bg-white p-8 shadow-sm"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  required
                  placeholder="Your phone number"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/20 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
