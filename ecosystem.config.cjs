module.exports = {
  apps: [
    {
      name: "token-calculator-ui",
      script: "node_modules/.bin/vite",
      cwd: "/Users/lizhuo/Desktop/Claude code/token caculater",
      watch: false,
      env: { NODE_ENV: "development" },
    },
    {
      name: "token-logger-api",
      script: "node_modules/.bin/tsx",
      args: "server/index.ts",
      cwd: "/Users/lizhuo/Desktop/Claude code/token caculater",
      watch: false,
      env: { NODE_ENV: "production" },
    },
  ],
};
