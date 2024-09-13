class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: "savana", tamanhoTotal: 10, animais: { MACACO: 3 } },
      { numero: 2, bioma: "floresta", tamanhoTotal: 5, animais: {} },
      {
        numero: 3,
        bioma: "savana e rio",
        tamanhoTotal: 7,
        animais: { GAZELA: 1 },
      },
      { numero: 4, bioma: "rio", tamanhoTotal: 8, animais: {} },
      { numero: 5, bioma: "savana", tamanhoTotal: 9, animais: { LEAO: 1 } },
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana"] },
      LEOPARDO: { tamanho: 2, biomas: ["savana"] },
      CROCODILO: { tamanho: 3, biomas: ["rio"] },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"] },
      GAZELA: { tamanho: 2, biomas: ["savana"] },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"] },
    };
  }
  analisaRecintos(tipoAnimal, quantidade) {
    if (!this.animais[tipoAnimal]) {
      return { erro: "Animal inválido" };
    }

    if (isNaN(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const animalInfo = this.animais[tipoAnimal];
    const tamanhoNecessario = animalInfo.tamanho * quantidade;
    const biomasAdequados = animalInfo.biomas;
    const carnivoro = animalInfo.carnivoro;

    let recintosViaveis = [];

    for (const recinto of this.recintos) {
      const { bioma, tamanhoTotal, animais, numero } = recinto;

      if (
        !biomasAdequados.includes(bioma) &&
        !(bioma.includes("e") && biomasAdequados.includes("savana"))
      ) {
        continue;
      }

      let espacoOcupado = 0;
      let podeAlocar = true;

      for (const [animalPresente, qtdPresente] of Object.entries(animais)) {
        const infoAnimalPresente = this.animais[animalPresente];
        espacoOcupado += infoAnimalPresente.tamanho * qtdPresente;

        if (carnivoro && animalPresente !== tipoAnimal) {
          podeAlocar = false;
          break;
        }
        if (infoAnimalPresente.carnivoro && animalPresente !== tipoAnimal) {
          podeAlocar = false;
          break;
        }
      }

      const numeroDeEspecies = Object.keys(animais).length;
      const espacoNecessario =
        tamanhoNecessario + (numeroDeEspecies > 0 ? 1 : 0);

      const espacoLivre = tamanhoTotal - espacoOcupado;
      if (podeAlocar && espacoNecessario <= espacoLivre) {
        recintosViaveis.push({
          numero,
          espacoLivre: espacoLivre - espacoNecessario,
          espacoTotal: tamanhoTotal,
        });
      }
    }

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    recintosViaveis.sort((a, b) => a.numero - b.numero);

    return {
      recintosViaveis: recintosViaveis.map(
        (recinto) =>
          `Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre} total: ${recinto.espacoTotal})`
      ),
    };
  }
}
export { RecintosZoo as RecintosZoo };
