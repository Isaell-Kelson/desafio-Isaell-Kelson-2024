class Animal {
    constructor(nome, tamanho, biomas, carnivoro) {
        this.nome = nome;
        this.tamanho = tamanho;
        this.biomas = biomas;
        this.carnivoro = carnivoro;
    }

    isBiomaAdequado(bioma) {
        // Ajuste para lidar com biomas compostos (e.g., 'savana e rio')
        const biomasRecinto = bioma.split(' e ').map(b => b.trim());
        return biomasRecinto.some(b => this.biomas.includes(b));
    }

    isCarnivoro() {
        return this.carnivoro;
    }
}

export {Animal};
