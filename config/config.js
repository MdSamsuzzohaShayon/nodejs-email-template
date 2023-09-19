module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'database',
    host: '127.0.0.1',
    dialect: 'sqlite',
    storage: "database.sqlite",
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: 'root',
    password: null,
    database: 'database',
    host: '127.0.0.1',
    dialect: 'sqlite',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.HOST,
    port: process.env.MYSQLDB_LOCAL_PORT,
    dialect: 'sqlite',
    // dialectOptions: {
    //   bigNumberStrings: true,
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
    //   }
    // }
  }
};