/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  appDirectory: "app",
  cacheDirectory: "./node_modules/.cache/remix",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
};
