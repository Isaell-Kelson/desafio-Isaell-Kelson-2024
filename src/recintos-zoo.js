import {AnimalService} from "./services/animal-service.js";
import {RecintoRepository} from "./repositories/recinto-repository.js";
import {Recinto} from "./domain/entities/recinto.js";

class RecintosZoo {
    constructor() {
        this.animalService = new AnimalService();
        this.recintoRepository = new RecintoRepository();
    }

    analisaRecintos(tipoAnimal, quantidade) {
        const animal = this.animalService.getAnimal(tipoAnimal);

        if (!animal) {
            return {erro: "Animal inválido", recintosViaveis: false};
        }

        if (quantidade <= 0) {
            return {erro: "Quantidade inválida", recintosViaveis: false};
        }

        const recintos = this.recintoRepository.listarRecintos();
        const recintosViaveis = [];

        recintos.forEach(recinto => {
            if (recinto.isViavelParaAnimal(animal, quantidade)) {
                // Cria uma cópia do recinto para evitar alterar o estado original
                const copiaRecinto = new Recinto(recinto.numero, recinto.tamanho, recinto.bioma, [...recinto.animais]);
                copiaRecinto.adicionarAnimais(animal, quantidade);
                const espacoLivre = copiaRecinto.espacoDisponivel();
                recintosViaveis.push({
                    numero: copiaRecinto.numero,
                    descricao: `Recinto ${copiaRecinto.numero} (espaço livre: ${espacoLivre} total: ${copiaRecinto.tamanho})`
                });
            }
        });

        if (recintosViaveis.length === 0) {
            return {erro: "Não há recinto viável", recintosViaveis: false};
        }

        // Ordenar os recintos viáveis pelo número do recinto
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        return {recintosViaveis: recintosViaveis.map(r => r.descricao)};
    }
}

export {RecintosZoo};





