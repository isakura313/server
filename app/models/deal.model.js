const sql = require("./db.js");


const Deal = function(deal) {
    this.prioritet = deal.prioritet;
    this.content = deal.content;
    this.create_date = deal.create_date;
}

const TableName = "todos";

Deal.getAll = result =>{
    let QueryAll = `SELECT * FROM ${TableName}`;
    sql.query(QueryAll, (err, res)=>{
        if(err){
            console.log("error: ", err)
            result(null, err)
            return;
        }else{
            console.log("deals: ", res)
            result(null, res)
        }
    })
}

Deal.create = (newDeal, result) =>{
    let QueryCreate = `INSERT INTO ${TableName} SET ?`;
    sql.query(QueryCreate, newDeal, (err, res)=>{
        if(err){
            console.log("error:", err);
            return;
        }
        console.log("Создание дела:", {id: res.insertId, ...newDeal})
        // result отвечает за ответ сервера
        result(null, {id:res.insertId, ...newDeal});
    })
}

module.exports = Deal;
