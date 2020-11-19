export const config = {
  authentication: {
    options: {
      userName: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    },
    type: "default",
  },
  server: process.env.DATABASE_SERVER,
  options: {
    database: process.env.DATABASE_NAME,
    encrypt: true,
    validateBulkLoadParameters: true,
  },
};
