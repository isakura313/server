const sql = require("./db.js");

const Deal = function(deal) {
    this.prioritet = deal.prioritet;
    this.content = deal.content;
    this.create_date = deal.create_date
}

const TableName = "todos";
Deal.create = (newDeal, result) => {
    sql.query(`INSERT INTO ${TableName} SET ?`, newDeal, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Создание дела: ", {id: res.insertId, ...newDeal});
        result(null, {id: res.insertId, ...newDeal});
    });
}



Deal.findById = (id, result) => {
    console.log(id);
    const queryFind = `SELECT * FROM ${TableName} WHERE id = id`;
    console.log(queryFind);

    sql.query(queryFind, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("найдено дело: ", res[0]);
            result(null, res[0]);
            return;
        }

        // когда ничего не удалось найти
        result({ kind: "not_found" }, null);
    });
};


Deal.getAll = result =>{
    let QueryAll = `SELECT * FROM ${TableName}`;
    sql.query(QueryAll, (err, res)=>{
        if(err){
            console.log("error: ", err)
            result(null, err)
        }else{
            console.log("deals: ", res)
            result(null, res)
        }
    })
}

Deal.updateById = (id, deal, result) => {
    const queryUpdate = `UPDATE ${TableName} SET (prioriry = ?, text = ?, create_data = ? )  WHERE id = ${id}`;
    sql.query(
        queryUpdate,
        [deal.content],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Обновлено дело ", { id: id, ...deal });
            result(null, { id: id, ...deal });
        }
    );
};


Deal.remove = (id, result) => {
    const queryDelete = `DELETE FROM ${TableName} WHERE id = ?`;
    sql.query(queryDelete, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            //  если дело не удалось получить по id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Удален пользователь с  ", id);
        result(null, res);
    });
};

Deal.removeAll = result => {
    const queryDeleteAll = `DELETE FROM ${TableName}`;
    sql.query(queryDeleteAll, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} deals`);
        result(null, res);
    });
};

module.exports = Deal;
