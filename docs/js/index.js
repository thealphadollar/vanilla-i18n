const languages = [
  "English",
  "Español",
  "français",
  "हिन्दी"
];

new vanilla_i18n(
  languages,
  opts = {
      path: "vanilla-i18n/assets/vanilla-i18n",
      debug: true,
      i18n_attr_name: "vanilla-i18n",
      toggler_id: "vanilla-i18n-toggler",
      default_language: languages[0],
  }
).run();