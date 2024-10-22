const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

console.log('Initializing WhatsApp client...');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    console.log('QR Code generated:');
    qrcode.generate(qr, { small: true }); 
});

client.on('ready', () => {
    console.log(' --- [+] Successfully logged in');
    sendMessages(); 
});

client.on('auth_failure', () => {
    console.log(" --- [+] Error: not logged in");
});

async function sendMessages() {
    try {
        const numbers = fs.readFileSync('number.txt', 'utf-8').split('\n').map(num => num.trim()).filter(num => num);
        
        const messageText = messagebolo;

        for (const number of numbers) {
            const formattedNumber = `${number}@c.us`;
            await client.sendMessage(formattedNumber, messageText);
            console.log(` --- [+] Successfully message to :  ${number}`);
        }
    } catch (error) {
        console.error(" --- [+] error message send", error);
    }
}

client.initialize();
