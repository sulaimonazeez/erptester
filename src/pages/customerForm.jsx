import { useState } from "react";

const API_URL = "https://vitalvida.systemforce.ng/api/method/vitalvida.orders.ingest";
const WEBHOOK_SECRET = "my-secret-key";

export default function OrderPage() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    address: "",
    state: "",
    lga: "",
    product: "",
    payment_method: "Pay on Delivery",
    source: "React-Web",
    amount: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        order_id: "ORD-" + Date.now(),
        source: form.source,
        event_type: "partial",
        customer_name: form.full_name,
        phone: form.phone,
        customer_email: form.email,
        address: form.address,
        state: form.state,
        lga: form.lga,
        amount: form.amount,
        product: form.product,
        payment_method: form.payment_method
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Webhook-Secret": WEBHOOK_SECRET
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.status === 200) {
        setMessage("✅ Order placed successfully! Queue ID: " + data.queue_id);
        setForm({
          full_name: "",
          phone: "",
          email: "",
          address: "",
          state: "",
          lga: "",
          product: "",
          payment_method: "Pay on Delivery",
          source: "React-Web",
          amount: ""
        });
      } else {
        setMessage("❌ " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Network or JSON error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Fulani Hair Secret</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Get thicker, longer, healthier hair naturally
          </p>
        </div>

        {/* Product Card */}
        <div className="bg-white text-black rounded-2xl p-5 shadow-xl mb-6">
          <h2 className="text-lg font-bold mb-2">Hair Growth Oil</h2>
          <p className="text-gray-600 mb-3 text-sm">
            100% natural blend for rapid hair growth
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">₦12,000</span>
            <span className="text-green-600 text-sm">Pay on Delivery</span>
          </div>
        </div>

        {/* Order Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black rounded-2xl p-5 shadow-xl flex flex-col gap-4"
        >
          <h3 className="font-bold text-lg mb-2">Place Your Order</h3>

          <input
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address (optional — for order updates)"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />
            <input
              name="lga"
              placeholder="LGA"
              value={form.lga}
              onChange={handleChange}
              required
              className="border p-3 rounded-lg"
            />
          </div>

          <select
            name="product"
            value={form.product}
            onChange={handleChange}
            required
            className="border p-3 rounded-lg"
          >
            <option value="">Select Product</option>
            <option value="Self Love Plus">Self Love Plus</option>
            <option value="Hair Combo Pack">Hair Combo Pack</option>
          </select>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>

          {message && (
            <p className="text-center text-sm mt-2">{message}</p>
          )}
        </form>

        {/* Trust Badges */}
        <div className="text-center text-xs text-gray-400 mt-4">
          ✔ Pay on Delivery • ✔ Fast Delivery • ✔ Trusted by 5,000+ customers
        </div>
      </div>
    </div>
  );
}
