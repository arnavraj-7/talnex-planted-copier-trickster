const nodeCrypto = require("crypto");

// POST /api/start : begin a guest session (no account needed) that lasts an hour.
module.exports = (request, response) => {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Use POST." });
  }
  const token = nodeCrypto.randomBytes(12).toString("hex");
  response.setHeader("Set-Cookie", `qk_session=guest-${token}; Path=/; Max-Age=3600; HttpOnly; SameSite=Lax; Secure`);
  return response.status(200).json({ ok: true, guest: true });
};
