const converters = require('./Util/converters');
const main = require('./Main');

//block is a set of transactions and contains information of the previous blocks.
//https://bitcoin.stackexchange.com/questions/8031/what-are-bitcoin-miners-really-solving
class Block {
    constructor(hash_prev_block, target)
    {
        this.transactions = [];
        this.hash_prev_block = hash_prev_block;
        //hash of the all previous blocks. used to maintain integrity.
        this.hash_merkle_block;
        this.target = target;
        this.nounce = 0;
    }

    add_transaction(new_transac)
    {
        if(!this.is_block_full())
        {
            this.transactions.push(new_transac);
            this.hash_merkle_block = converters.createHash(main.hashType, this.transactions.join("-"));
        }
    }

    is_block_full() {
        //blocks cannot go above 1Mb. Here let's say we cannot go above 1000 transactions.
        return this.transactions.length >= 1000;
    }

    is_block_ready_to_mine() {
        return this.is_block_full()
    }

    getString() {
        return [this.hash_merkle_block,String(this.nounce)].join("-");
    }

    apply_mining_step() {
        let current_block_hash = converters.createHash(main.hashType, this.getString());
        console.log(`Bloco corrente = ${current_block_hash}, Alvo = ${this.target}`);
        if(parseInt(current_block_hash, 16) < parseInt(this.target, 16))
        {
            console.log('Bloco foi minerado corretamente!');
            console.log(`Foram executados ${this.nounce} passos para finalizar`);
            return true;
        }
        else
        {
            //Incrementando o nounce para alterar o bloco corrente (current_block_hash) para esperar que seja menor do que o alvo(target).
            this.nounce += 1;
        }
        return false;
    }
}

module.exports = Block;