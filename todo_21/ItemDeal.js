export default class ItemDeal{
    /*
    класс конструктор, собирает
    нам объект todo с текстом,
    цветом срочности, временем

    */
    constructor(text, color){
        this.text = text;
        this.color = color;
        // TODO поправить генерацию месяцев на +1 и переделать на getDate()  
        this.now = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`;
    }
}
