module.exports = app =>{
    const deals = require("../controllers/deals.controller.js");

    //Получение всех дел
    app.get("/deals", deals.findAll)

    // Создание дела
    app.post("/deals", deals.create);

    app.delete("/deal/:dealId", deals.delete)

    //удаление дела TODO
    // app.delete("deal:dealId", deals.delete)
    // app.delete("/deals:/dealId", deals.delete);
}
