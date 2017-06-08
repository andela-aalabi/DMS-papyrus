require('dotenv').config();
console.log(process.env.DATABASE_URL);

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL"
  },
  test: {
    username: "andeladeveloper",
    password: "",
    database: "dms-test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false
  },
  production: {
    use_env_variable: "DATABASE_URL"
  }
};