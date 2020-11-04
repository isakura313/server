module.exports = app =>{
    const deals = require("../controllers/deals.controller.js");

    // Получение всех дел
    app.get("/deals", deals.findAll);

    // Создание своего собственного дела
    app.post("/deals", deals.create);

    // Получение дела по id
    app.get("/deal/:dealId", deals.findOne);

    // Обновления дела по id
    app.put("/deal/:dealId", deals.update);

    // Удаление дела по id
    app.delete("/deal/:dealId", deals.delete);

    // Удаление всех дел
    app.delete("/deals", deals.deleteAll);
}
