import { useState } from "react";

export default function App() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Submit to Netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => console.error("Form submission error:", error));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Thank You!
          </h2>
          <p className="text-gray-600">
            Your food stall details have been submitted successfully. We'll be in touch soon!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Submit Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">🍽️</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Food Stall Details
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Fill in the details below to register your food stall
          </p>
        </div>

        {/* Form */}
        <form
          name="food-stall-details"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Hidden field for Netlify */}
          <input type="hidden" name="form-name" value="food-stall-details" />

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your full name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>

          {/* Phone/WhatsApp */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Phone / WhatsApp No. <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="e.g. 03XX-XXXXXXX"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>

          {/* Appetizer or Dessert */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Do you want to make an Appetizer or Dessert?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="Appetizer"
                  required
                  className="peer sr-only"
                />
                <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                  <span className="text-2xl">🥘</span>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    Appetizer
                  </p>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="Dessert"
                  required
                  className="peer sr-only"
                />
                <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                  <span className="text-2xl">🍰</span>
                  <p className="text-sm font-medium text-gray-700 mt-1">
                    Dessert
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* 3 Items */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              3 Items That You Can Make <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              <input
                type="text"
                name="item1"
                required
                placeholder="Item 1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              />
              <input
                type="text"
                name="item2"
                required
                placeholder="Item 2"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              />
              <input
                type="text"
                name="item3"
                required
                placeholder="Item 3"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Serving Quantity */}
          <div>
            <label
              htmlFor="serving"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Serving Quantity (No. of People){" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="serving"
              name="serving"
              required
              min="1"
              placeholder="e.g. 50"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>

          {/* Drinks & Tea Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">☕</span>
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Drinks & Tea Welcome!
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  You can also sell drinks, tea, and other beverages at your
                  stall. Feel free to include them in your items above!
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Submit Details
          </button>
        </form>
      </div>
    </div>
  );
}
