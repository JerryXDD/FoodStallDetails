import { useState } from "react";

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [stallType, setStallType] = useState<string>("");

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data: Record<string, string> = {
      "form-name": "stall-details",
    };
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(data),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
        } else {
          setError("Submission failed. Please try again.");
        }
      })
      .catch(() => {
        setError("Network error. Please check your connection and try again.");
      });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600">
            Your stall details have been submitted successfully. We'll be in touch soon!
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
          <div className="text-5xl mb-3">🏪</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Stall Details
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Fill in the details below to register your stall
          </p>
        </div>

        {/* Form */}
        <form
          name="stall-details"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Hidden field for Netlify */}
          <input type="hidden" name="form-name" value="stall-details" />

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
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
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
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

          {/* Food or Entrepreneur */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Is it Food or Entrepreneur? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="stall_type"
                  value="Food"
                  required
                  className="peer sr-only"
                  onChange={(e) => setStallType(e.target.value)}
                />
                <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                  <span className="text-2xl">🍳</span>
                  <p className="text-sm font-medium text-gray-700 mt-1">Food</p>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input
                  type="radio"
                  name="stall_type"
                  value="Entrepreneur"
                  required
                  className="peer sr-only"
                  onChange={(e) => setStallType(e.target.value)}
                />
                <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                  <span className="text-2xl">💼</span>
                  <p className="text-sm font-medium text-gray-700 mt-1">Entrepreneurial</p>
                </div>
              </label>
            </div>
          </div>

          {/* Category: Snack / Dessert / Beverages — only shown for Food stalls */}
          {stallType === "Food" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                What do you want to make? <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="category" value="Snack" required className="peer sr-only" />
                  <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                    <span className="text-2xl">🍿</span>
                    <p className="text-sm font-medium text-gray-700 mt-1">Snack</p>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="category" value="Dessert" required className="peer sr-only" />
                  <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                    <span className="text-2xl">🍰</span>
                    <p className="text-sm font-medium text-gray-700 mt-1">Dessert</p>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="category" value="Beverages" required className="peer sr-only" />
                  <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                    <span className="text-2xl">☕</span>
                    <p className="text-sm font-medium text-gray-700 mt-1">Beverages</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Single Item */}
          <div>
            <label htmlFor="item" className="block text-sm font-semibold text-gray-700 mb-1">
              {stallType === "Entrepreneur"
                ? "What are you selling?"
                : "What item will you make?"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="item"
              name="item"
              required
              placeholder={
                stallType === "Entrepreneur"
                  ? "e.g. Handmade jewelry, Toys, Books..."
                  : "e.g. Samosa, Brownie, Chai..."
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>

          {/* Serving Quantity / Approx Items */}
          <div>
            <label htmlFor="serving" className="block text-sm font-semibold text-gray-700 mb-1">
              {stallType === "Entrepreneur"
                ? "Approx. Quantity of Items You Will Make"
                : "Serving Quantity (No. of People)"}{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="serving"
              name="serving"
              required
              min="1"
              placeholder={
                stallType === "Entrepreneur"
                  ? "e.g. 20"
                  : "e.g. 50"
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all"
            />
          </div>

          {/* Managed by Child or Adult */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Will the stall managed by a Child or Adult? <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="managed_by" value="Child" required className="peer sr-only" />
                <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                  <span className="text-2xl">🧒</span>
                  <p className="text-sm font-medium text-gray-700 mt-1">Child</p>
                </div>
              </label>
              <label className="flex-1 cursor-pointer">
                <input type="radio" name="managed_by" value="Adult" required className="peer sr-only" />
                <div className="border-2 border-gray-200 rounded-lg p-3 text-center peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all hover:border-gray-300">
                  <span className="text-2xl">🧑</span>
                  <p className="text-sm font-medium text-gray-700 mt-1">Adult</p>
                </div>
              </label>
            </div>
          </div>

          {/* Drinks & Tea Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🥤</span>
              <div>
                <p className="text-sm font-semibold text-amber-800">
                  Drinks & Tea Welcome!
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  You can also sell drinks, tea, and other beverages at your
                  stall. Feel free to include them as your item!
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              {error}
            </div>
          )}

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
