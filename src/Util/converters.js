const crypto = require('crypto');

module.exports = {

    createHash(hashType, word)
    {    
        return crypto.createHash(hashType)
        .update(word, 'utf8')
        .digest('hex');
    }
}

