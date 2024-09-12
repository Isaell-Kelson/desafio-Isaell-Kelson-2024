import {AnimalService} from "../services/animal-service.js";
import {Recinto} from "../domain/entities/recinto.js";

export class RecintoRepository {
    constructor() {
        // Inicializa o serviço de animais para obter informações sobre os animais
        const animalService = new AnimalService();

        // Define a lista de recintos com suas características e animais presentes, respeitando a tabela Recintos Existentes
        this.recintos = [
            new Recinto(1, 10, 'savana', [
                {animal: animalService.getAnimal('MACACO'), quantidade: 3}
            ]),
            new Recinto(2, 5, 'floresta', []),
            new Recinto(3, 7, 'savana e rio', [
                {animal: animalService.getAnimal('GAZELA'), quantidade: 1}
            ]),
            new Recinto(4, 8, 'rio', []),
            new Recinto(5, 9, 'savana', [
                {animal: animalService.getAnimal('LEAO'), quantidade: 1}
            ]),
        ];
    }

    // Método para listar todos os recintos
    listarRecintos() {
        return this.recintos;
    }
}
