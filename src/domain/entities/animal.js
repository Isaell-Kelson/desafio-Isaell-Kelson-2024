class Animal {
    constructor(nome, tamanho, biomas, carnivoro) {
        this.nome = nome;
        this.tamanho = tamanho;
        this.biomas = biomas;
        this.carnivoro = carnivoro;
    }

    isBiomaAdequado(bioma) {
        // Lida com o bioma duplo, que seria savana e rio
        const biomasRecinto = bioma.split(' e ').map(b => b.trim());
        return biomasRecinto.some(b => this.biomas.includes(b));
    }
    //Definição de animal carnivoro, para poder conviver com animais da mesma espécie
    isCarnivoro() {
        return this.carnivoro;
    }
}

export {Animal};
