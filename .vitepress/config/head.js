/**
 * @type {()=>import('vitepress').HeadConfig[]}
 */
module.export = [
  ["meta", { name: "author", content: "Soybean" }],
  [
    "meta",
    {
      name: "keywords",
      content: "soybean, soybean-admin, vue, vue3, vite, naive-ui, TypeScript",
    },
  ],
  ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],
  [
    "meta",
    {
      name: "viewport",
      content:
        "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
    },
  ],
  ["meta", { name: "keywords", content: "soybean admin docs" }],
  ["link", { rel: "icon", href: "/favicon.ico" }],
];
