import {Animal} from "../domain/entities/Animal.js";


export class AnimalService {
    constructor() {
        this.animais = [
            new Animal('LEAO', 3, ['savana'], true),
            new Animal('LEOPARDO', 2, ['savana'], true),
            new Animal('CROCODILO', 3, ['rio'], true),
            new Animal('MACACO', 1, ['savana', 'floresta'], false),
            new Animal('GAZELA', 2, ['savana'], false),
            new Animal('HIPOPOTAMO', 4, ['savana', 'rio'], false)
        ];
    }

    getAnimal(nome) {
        return this.animais.find(animal => animal.nome === nome);
    }
}
