import { RecintosZoo } from './recintos-zoo.js';

const zoo = new RecintosZoo();

const resultado = zoo.analisaRecintos('MACACO', 2);

if (resultado.erro) {
    console.log('Erro:', resultado.erro);
} else {
    console.log('Recintos viáveis:', resultado.recintosViaveis);
}
