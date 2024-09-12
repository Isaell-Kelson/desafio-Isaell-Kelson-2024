import { AnimalService } from "./services/animal-service.js";
import { RecintoRepository } from "./repositories/recinto-repository.js";
import { Recinto } from "./domain/entities/recinto.js";
import { CustomErrors } from "./errors/custom-errors.js";

class RecintosZoo {
    constructor() {
        this.animalService = new AnimalService();
        this.recintoRepository = new RecintoRepository();
    }

    analisaRecintos(tipoAnimal, quantidade) {
        const animal = this.animalService.getAnimal(tipoAnimal);

        if (!animal) {
            return { erro: CustomErrors.ANIMAL_INVALIDO, recintosViaveis: false };
        }

        if (quantidade <= 0) {
            return { erro: CustomErrors.QUANTIDADE_INVALIDA, recintosViaveis: false };
        }

        const recintos = this.recintoRepository.listarRecintos();
        const recintosViaveis = [];

        recintos.forEach(recinto => {
            if (recinto.isViavelParaAnimal(animal, quantidade)) {
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
            return { erro: CustomErrors.NAO_HA_RECINTO_VIAVEL, recintosViaveis: false };
        }

        recintosViaveis.sort((a, b) => a.numero - b.numero);

        return { recintosViaveis: recintosViaveis.map(r => r.descricao) };
    }
}


export { RecintosZoo as RecintosZoo };
