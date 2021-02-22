const argon2 = require('argon2');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//método question recebe um retorno de chamada para que
//você possa usar os dados que o usuário entrou.
//fazer um retorno de chamada assíncrono porque o argon2
//para a biblioteca é assíncrono
rl.question('Entra com sua senha: ', async(password) => {
    //comando await; argon2->tipo ID híbrido
    const hash = await argon2.hash(password, {type: argon2.argon2id});
    console.log(`Hash: ${hash}`);

    rl.question('Reinsira sua senha: ',async(pw) => {
        const correct = await argon2.verify(hash, pw);
        console.log(correct ? 'Correto' : 'Incorreto');
        process.exit(0);
    });
});