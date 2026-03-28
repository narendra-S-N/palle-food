const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  reactStrictMode: true,
  turbopack: {}, // ✅ VERY IMPORTANT (fixes your error)
});