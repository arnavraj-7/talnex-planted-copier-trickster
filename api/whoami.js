// GET /api/whoami : is there a guest session? 200 if yes, 401 if not.
module.exports = (request, response) => {
  const cookies = String(request.headers.cookie || "");
  const active = /(?:^|;\s*)qk_session=guest-[0-9a-f]{24}(?:;|$)/.test(cookies);
  if (!active) return response.status(401).json({ error: "Please continue as a guest first." });
  return response.status(200).json({ guest: true });
};
