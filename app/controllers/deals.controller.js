const Deal = require("../models/deal.model.js");

exports.findAll = (req, res) =>{
    Deal.getAll((err, data)=>{
        if(err){
            res.status(500).send({
                message: err.message || "Some errors"
            })
        } else{
            res.send(data);
        }
    })
}

exports.create = (req, res) => {
// экспорт функции создания дела в роутинг

    if(!req.body){
        // проверка на пустое тело запроса
        console.log("Пустое тело(");
        res.status(400).send({
            message:"У вас не определено тело"
        })
    }

    const deal = new Deal({
        // создание дела из отправленных данных
        "prioritet": req.body.prioritet,
        "content": req.body.content,
        "create_date": req.body.create_date,
    })

    Deal.create(deal, (err, data) =>{
        // функция отправки данных дела в базу данных
        if(err){
            res.status(500).send({
                message:err.message || "Произошла ошибка"
            })
        } else{
            res.send(data);
        }
    })
}






