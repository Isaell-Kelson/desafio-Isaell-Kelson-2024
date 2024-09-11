// import { CustomError } from "../errors/CustomError.js";
//
// export class AnalisaRecintosUseCase{
//     constructor(recintoRepository, animalService) {
//         this.recintoRepository = recintoRepository;
//         this.animalService = animalService;
//     }
//
//     execute(tipoAnimal, quantidade) {
//         const animal = this.animalService.getAnimal(tipoAnimal);
//         if (!animal) return { erro: CustomError.ANIMAL_INVALIDO };
//
//         if (quantidade <= 0) return { erro: CustomError.QUANTIDADE_INVALIDA };
//
//         const recintosViaveis = this.recintoRepository.listarRecintos().filter(recinto => {
//             return this.animalService.isRecintoViavel(animal, recinto, quantidade);
//         });
//
//         if (recintosViaveis.length === 0) {
//             return { erro: CustomError.NAO_HA_RECINTO_VIAVEL };
//         }
//
//         return {
//             recintosViaveis: recintosViaveis.map(recinto =>
//                 `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoDisponivel()} total: ${recinto.tamanho})`
//             )
//         };
//     }
// }
