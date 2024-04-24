// Ponto de entrada do API Server 
  
const express = require('express');
  
/* Cria uma aplicação Express . 
   a função express() é um nivel superior 
   Função exportada pelo express module.
*/
const app = express();
const Pool = require('pg').Pool;
  
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gfgbackend',
    password: 'postgres',
    dialect: 'postgres',
    port: 5432
});
  
  
/* Para lidar com o HTTP o métodos Body Parser é usado, 
  geralmente usado para extrair a
   parte inteira do corpo de uma entrada
   solicitando fluxo e o expõe em req.body 
*/
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
  
  
pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})
  
app.get('/testdata', (req, res, next) => {
    console.log("TEST DATA :");
    pool.query('Select * from test')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})
  
// Exigir as Routes API  
// Criar um Server e rodar na port 3000
const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
    // Iniciar o Server na port 3000
})