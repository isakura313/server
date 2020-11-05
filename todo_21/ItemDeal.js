export default class ItemDeal{
    /*
    класс конструктор, собирает 
    нам объект todo с текстом, 
    цветом срочности, временем

    */
    constructor(text, color){
        this.text = text;
        this.color = color;
        this.now = new Date;
    }
}