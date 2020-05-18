const BlockChain = require('./BlockChain');
const TransactionGenerator = require('./TransactionGenerator');
const Block = require('./Block');
const converters = require('./Util/converters');

let block_chain = new BlockChain();    
let transaction_generator = new TransactionGenerator();   

module.exports = 
{
    input: (hashTypeToBeApplyed) => {
        this.hashType = hashTypeToBeApplyed;
        let last_block_header = '0e0fb2e3ae9bd2a0fa8b6999bfe6ab7df197a494d4a02885783a697ac74940d9';
        let last_block_target = this.hashType==='sha256' ? '0'.repeat(3) + 'd'.repeat(61) : '0'.repeat(3) + 'd'.repeat(37);
        
        //Preenche um bloco com transações. Temos 1500 transações pendentes.
        //Mas 500 transações terão que esperar pelo próximo bloco!
        execute(last_block_header, last_block_target, 1500, this.hashType);

        //Dificuldade é atualizada a cada 2016 blocos
        //Objetivo é ter um bloco gerado a cada 10 minutos.
        //Se durante as duas últimas semanas blocos forem gerados a cada 5 minutos, 
        //então a dificuldade é multiplicada por 2.
        
        execute(null, last_block_target, 1232, this.hashType);

        //Para aumentar mais a dificuldade,
        //teremos agora 4 zeros no início ao invés de 3.
        last_block_target = '0' + last_block_target.substring(0,last_block_target.length -1);
        execute(null, last_block_target, 1876, this.hashType);

        console.log('')
        console.log('Resumo')
        console.log('')
        let counter=0;
        let result = '';

        block_chain.block_chain.forEach( b => {
            result+=`\rBloco #${counter} foi adicionado. Foram ${b.nounce} passos para encontrá-lo`;
            result+='\rA dificuldade foi aumentada para o próximo bloco!';
            counter++;
        })

        return result;
        
    }
}


async function execute(last_block_header, last_block_target, length, hashType)
{
    if(last_block_header===null)
        last_block_header = converters.createHash(hashType, String(block_chain.get_last_block()));

    let block = new Block(last_block_header, last_block_target);

    Array.from({length: length}, (x,i) => 
        block.add_transaction(transaction_generator.generate_transaction())
    );

    console.assert(block.is_block_full());
    console.assert(block.is_block_ready_to_mine());

    //Agora que o bloco está cheio, podemos começar a minerá-lo    
    while(!block.apply_mining_step())
        continue;

    block_chain.push(block);
    block_chain.notify_everybody();
    await setInterval(()=>{}, 5000);
}
