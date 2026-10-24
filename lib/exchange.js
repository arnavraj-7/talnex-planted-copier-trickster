// Money exchange with fixed prices (units per 1 US dollar). Kept apart from the API file so it can be tested alone.
const PRICES = { USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.2 };

const TOP_VALUE = 1e12;

// Returns { ok: true, result, rate } or { ok: false, error } with a message a person can understand.
function exchange(valueText, source, target) {
  const raw = String(valueText ?? "").trim();
  if (raw === "") return { ok: false, error: "Please enter an amount." };
  const value = Number(raw.replace(/,/g, ""));
  if (!Number.isFinite(value)) return { ok: false, error: "That is not a number." };
  if (value < 0) return { ok: false, error: "Amount cannot be negative." };
  if (value > TOP_VALUE) return { ok: false, error: "That amount is too large." };
  if (!(source in PRICES) || !(target in PRICES)) return { ok: false, error: "Choose one of USD, EUR, GBP or INR." };

  const ratio = PRICES[target] / PRICES[source];
  const answer = Math.round(value * ratio * 100) / 100;
  return { ok: true, amount: value, from: source, to: target, rate: Math.round(ratio * 1e6) / 1e6, result: answer };
}

module.exports = { exchange, PRICES, TOP_VALUE };
