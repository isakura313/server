const express = require("express");
// пакет node для работы с путями файлов
const path = require('path');
const bodyParser = require("body-parser")

const port = process.env.PORT || 3000;
// msql 3306

const app = express();
// создание объекта приложения
app.use(bodyParser.json())


app.use(express.static(path.join(__dirname, 'todo_21')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'todo_21', 'index.html'));
});
require("./app/routes/deals.routes")(app);


app.listen(port, () => {
  console.log(process)
  console.log(__dirname)
  console.log(`Example app listening at http://localhost:${port}`);
});
