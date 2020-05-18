const converters = require('./Util/converters');
const main = require('./Main');

class TransactionGenerator
{
    contructor(){
        this.random_seed = 0
    }

    generate_transaction(){
        var transaction_payload = `Esta e uma transacao entre A and B. Adicionamos uma string aleatoriamente aqui ${this.random_seed} para faze-la unica`;
        let transaction_hash = converters.createHash(main.hashType, transaction_payload);
        this.random_seed += 1;
        return transaction_hash;
    }
}

module.exports = TransactionGenerator;