module.exports = {
  apps: [
    {
      name: "next-app",
      script: "node_modules/next/dist/bin/next", // Next.js CLI
      args: "start -p 3000", // production port
      instances: "max", // cluster mode
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/next-app-error.log",
      out_file: "./logs/next-app-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      combine_logs: true,
      autorestart: true,
    },
  ],
};
