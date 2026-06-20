import { Client } from '@jubbio/core';
import dotenv from 'dotenv';

// .env dosyasındaki değişkenleri yükle
dotenv.config();

const client = new Client({
    intents: ['Guilds', 'GuildMessages', 'MessageContent']
});

// Her 10 mesajda bir tetiklenmesi için sayaç
let messageCounter = 0;

// Geniş kapsamlı selamlaşma listesi (Küçük harfe duyarlı kontrol için hepsi küçük harf)
const greetings = [
    'sa', 'as', 'selam', 'selamlar', 'slm', 'merhaba', 'merhabalar', 
    's.a.', 'a.s.', 'sea', 'ase', 'selamun aleykum', 'selamün aleyküm', 
    'aleykum selam', 'aleyküm selam', 'mrb', 'sh'
];

client.on('ready', () => {
    console.log(`${client.user.username} olarak giriş yapıldı! Bot aktif.`);
});

client.on('messageCreate', async (message) => {
    // Botların kendi mesajlarını veya sistem mesajlarını görmezden gel
    if (message.author.bot || !message.content) return;

    const contentLower = message.content.trim().toLowerCase();

    // 1. Selamlaşma Sistemi (Gelen mesaj selam listesindeyse cevap verir)
    if (greetings.includes(contentLower)) {
        // Eğer kullanıcı doğrudan selam verdiyse ona uygun bir karşılık seçelim
        if (['sa', 's.a.', 'sea', 'selamun aleykum', 'selamün aleyküm'].includes(contentLower)) {
            await message.reply('Aleyküm Selam, hoş geldin!');
        } else if (['as', 'a.s.', 'ase', 'aleykum selam', 'aleyküm selam'].includes(contentLower)) {
            await message.reply('Selamlar, nasılsın?');
        } else {
            await message.reply('Selam! Merhaba, hoş geldin.');
        }
    }

    // 2. Her 10 Mesajda 1 Kural Hatırlatma Sistemi
    messageCounter++;
    
    if (messageCounter >= 10) {
        await message.channel.send('**Lütfen kurallara uyalım**');
        messageCounter = 0; // Sayacı sıfırla
    }
});

// .env içindeki BOT_TOKEN ile botu başlatır
client.login(process.env.BOT_TOKEN);
