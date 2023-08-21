const languages = [
  "English",
  "हिन्दी",
  "français"
];

new vanilla_i18n(
  languages,
  opts = {
      path: "docs/assets/vanilla-i18n",
      debug: true,
      i18n_attr_name: "vanilla-i18n",
      toggler_id: "vanilla-i18n-toggler",
      default_language: languages[0],
  }
).run();