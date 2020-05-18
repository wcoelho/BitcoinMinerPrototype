class BlockChain
{
    constructor()
    {
        this.block_chain = []
    }

    push(block){
        this.block_chain.push(block);
    }

    notify_everybody()
    {    
        console.log("-".repeat(80));
        console.log('Bloco adicionado para todos os nós da rede')
        console.log(`[bloco #${this.block_chain.length}] : ${this.get_last_block()}`)
        console.log("-".repeat(80));
    }

    get_last_block(){
        return this.block_chain.slice(-1)[0].hash_prev_block;
    }        
}

module.exports = BlockChain;