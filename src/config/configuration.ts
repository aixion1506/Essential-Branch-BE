export default () => ({
  port: parseInt(process.env.PORT, 10),
  database: {
    host: process.env.HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.USER_NAME,
    password: process.env.DATABASE_PW,
    name: process.env.DATABASE_NAME,
  },
});
