class Recinto {
    constructor(numero, tamanho, bioma, animais = []) {
        this.numero = numero;
        this.tamanho = tamanho;
        this.bioma = bioma;
        this.animais = animais;
    }

    espacoOcupado() {
        let espaco = 0;
        this.animais.forEach(({animal, quantidade}) => {
            espaco += animal.tamanho * quantidade;
        });

        const especiesDiferentes = new Set(this.animais.map(a => a.animal.nome));
        if (especiesDiferentes.size > 1) {
            espaco += 1;  // Espaço extra para espécies diferentes
        }

        return espaco;
    }

    espacoDisponivel() {
        return this.tamanho - this.espacoOcupado();
    }

    adicionarAnimais(animal, quantidade) {
        const existente = this.animais.find(a => a.animal.nome === animal.nome);
        if (existente) {
            existente.quantidade += quantidade;
        } else {
            this.animais.push({animal, quantidade});
        }
    }

    isViavelParaAnimal(animal, quantidade) {
        if (!animal.isBiomaAdequado(this.bioma)) {
            return false;
        }

        const copiaAnimais = JSON.parse(JSON.stringify(this.animais));
        const existente = copiaAnimais.find(a => a.animal.nome === animal.nome);
        if (existente) {
            existente.quantidade += quantidade;
        } else {
            copiaAnimais.push({animal, quantidade});
        }

        const especiesDiferentes = new Set(copiaAnimais.map(a => a.animal.nome));
        const temOutrasEspecies = especiesDiferentes.size > 1;

        if (animal.isCarnivoro() && (temOutrasEspecies || (this.animais.length > 0 && this.animais[0].animal.nome !== animal.nome))) {
            return false;
        }

        if (animal.nome === 'HIPOPOTAMO' && temOutrasEspecies && this.bioma !== 'savana e rio') {
            return false;
        }

        if (animal.nome === 'MACACO' && (this.animais.length === 0 || quantidade < 2)) {
            return false;
        }

        let espacoOcupado = this.espacoOcupado();
        espacoOcupado += animal.tamanho * quantidade;

        if (temOutrasEspecies) {
            espacoOcupado += 1;
        }

        return espacoOcupado <= this.tamanho;
    }
}

export {Recinto};
