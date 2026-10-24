const { exchange } = require("../lib/exchange");

// GET /api/rates?amount=100&from=USD&to=INR
module.exports = (request, response) => {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Use GET." });
  }
  const { amount, from, to } = request.query || {};
  const outcome = exchange(amount, String(from || "").toUpperCase(), String(to || "").toUpperCase());
  if (!outcome.ok) return response.status(400).json({ error: outcome.error });
  return response.status(200).json(outcome);
};
