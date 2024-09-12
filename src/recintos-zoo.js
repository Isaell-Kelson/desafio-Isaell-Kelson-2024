import {AnimalService} from "./services/animal-service.js";
import {RecintoRepository} from "./repositories/recinto-repository.js";
import {Recinto} from "./domain/entities/recinto.js";
import {CustomErrors} from "./errors/custom-errors.js";


class RecintosZoo {

    constructor() {
        this.animalService = new AnimalService();
        this.recintoRepository = new RecintoRepository();
    }

    // Método para analisar recintos viáveis para um tipo de animal e quantidade especificados
    analisaRecintos(tipoAnimal, quantidade) {
        // Obtém o animal pelo tipo
        const animal = this.animalService.getAnimal(tipoAnimal);

        // Verifica se o animal é válido
        if (!animal) {
            return {erro: CustomErrors.ANIMAL_INVALIDO, recintosViaveis: false};
        }

        // Verifica se a quantidade é válida
        if (quantidade <= 0) {
            return {erro: CustomErrors.QUANTIDADE_INVALIDA, recintosViaveis: false};
        }

        // Lista todos os recintos disponíveis
        const recintos = this.recintoRepository.listarRecintos();
        const recintosViaveis = [];

        // Verifica cada recinto para ver se é viável para o animal e quantidade especificados
        recintos.forEach(recinto => {
            if (recinto.isViavelParaAnimal(animal, quantidade)) {
                // Cria uma cópia do recinto para simulação, respeitando a regra número 7
                const copiaRecinto = new Recinto(recinto.numero, recinto.tamanho, recinto.bioma, [...recinto.animais]);
                copiaRecinto.adicionarAnimais(animal, quantidade);
                const espacoLivre = copiaRecinto.espacoDisponivel();
                recintosViaveis.push({
                    numero: copiaRecinto.numero,
                    descricao: `Recinto ${copiaRecinto.numero} (espaço livre: ${espacoLivre} total: ${copiaRecinto.tamanho})`
                });
            }
        });

        // Verifica se há recintos viáveis
        if (recintosViaveis.length === 0) {
            return {erro: CustomErrors.NAO_HA_RECINTO_VIAVEL, recintosViaveis: false};
        }

        // Ordena os recintos viáveis pelo número
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        // Retorna a lista de recintos viáveis
        return {recintosViaveis: recintosViaveis.map(r => r.descricao)};
    }
}


export {RecintosZoo as RecintosZoo};
