const Deal = require("../models/deal.model.js");

//Создаем и сохраняем новое дело
exports.create = (req, res) => {
    // Валидизация запроса
    if (!req.body) {
        res.status(400).send({
            message: "У нас не может не быть контента"
        });
    }

    // создание своего дела
    const deal = new Deal({
        'prioritet': req.body.prioritet,
        'content': req.body.content,
        'create_date': req.body.create_date
    });


    //сохраняем дело в нашу базу данных
    Deal.create(deal, (err, data) => {
        console.warn("Собираюсь создать дело");

        if (err)
            res.status(500).send({
                message:
                    err.message || "Произошла ошибка во время выполнения кода"
            });
        else
            res.send(data);
    });
};

// Получение всех дел из базы данных
exports.findAll = (req, res) => {
    Deal.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Произошли ошибки во время получения дел"
            });
        else res.send(data);
    });
};

//  Найти одно дело по одному id
exports.findOne = (req, res) => {
    Deal.findById(req.params.id, (err, data) => {
        console.log(req.params.id)
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Нет дела с id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Ошибка во время получения дела с id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Обновляем пользователя по одному id
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Запрос не может быть пустым! Подумайте, что вы делаете? Вы точно отправляете, что надо?"
        });
    }

console.log(req.body);

    Deal.updateById(
        req.params.id,
        new Deal(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Не найдено никакого дела с ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Ошибка обновления дела с id" + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Удаление дела
exports.delete = (req, res) => {
    Deal.remove(req.params.dealId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.params.dealId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Customer with id " + req.params.dealId
                });
            }
        } else res.send({ message: `deal was deleted successfully!` });
    });
};

// Удаляем все дела из базы данных
exports.deleteAll = (req, res) => {
    Deal.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Какие-то ошибки случились во время удаления всех дел"
            });
        else res.send({message: `Все дела были удалены успешно`});
    });
};
