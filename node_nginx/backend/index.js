const express = require('express')
const app = express()
const port = 3000
const { faker } = require('@faker-js/faker');
const config = {
  host: 'sqldb',
  user: 'nodeapp',
  password: 'N0d34pp',
  database: 'nodedb',
}
const pjson = require('./package.json');
const mysql = require('mysql')

const connection = mysql.createConnection(config)

const sql = `INSERT INTO TB_PEOPLE(FullName) values ('${faker.name.fullName().replace(`'`, '')}')`;
connection.query(sql)

app.get('/health', (req, res) => {
  res.status(200).send({
    status: 'UP',
    availableAt: new Date(),
    appVersion: pjson.version,
    database:  ['connected','authenticated'].includes(connection.state) ? 'UP' : 'DOWN',
  })
})


app.get('/', (req, res) => {
  try {
    const userName = faker.name.fullName().replace(`'`, '');
    connection.query(`INSERT INTO TB_PEOPLE(FullName) values ('${userName}')`, function (e, results, fields) {
      if (e) {
        res.status(500).send(e);
      };
      try {
        connection.query(`SELECT FullName from TB_PEOPLE`, function (e, results, fields) {
          if (e) {
            res.status(500).send(e);
          };
          const header = `<p><h1>Full Cycle Rocks!</h1></p>`
          const body = (results || []).map((result) => `<p>-${result.FullName}</p>`).join('')
          res.status(200).send(`${header}${body}`)
        })
      } catch (e){
        res.status(500).send(e)
      }
    })
  } catch (e){
    res.status(500).send(e)
  }
})

app.post('/', (req, res) => {
  try {
    const userName = faker.name.fullName().replace(`'`, '');
    connection.query(`INSERT INTO TB_PEOPLE(FullName) values ('${userName}')`, function (e, results, fields) {
      if (e) {
        res.status(500).send(e);
      };
      const header = 
      `</p>
        <p>&lt;h1&gt;Full Cycle Rocks!&lt;/h1&gt;</p>
      <p>`
      const body =
      `
      </p>
      <p>User ${userName} created successfully </p>
      <p>
      `
      res.send(`${header}${body}`)
    })
  } catch (e){
    res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Running at port ${port}`);
})
