module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "globals": {
      "window": true,
      "document": true,
      "jQuery": true,
      "Zoolander": true
    },
    "rules": {
      // Errors.
      "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["$", "Zoolander"] }],
      "no-bitwise": [0, { allow: ["~"] }],
    }
};
