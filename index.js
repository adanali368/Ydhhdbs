const { Client } = require('@jubbio/core');

// Jubbio bot istemcisini başlatıyoruz
const client = new Client();

client.on('ready', () => {
    console.log(`${client.user.username} aktif ve selamları almaya hazır!`);
});

client.on('messageCreate', async (message) => {
    // Botların kendi mesajlarına veya diğer botlara cevap vermesini engelleyelim
    if (message.author.bot) return;

    // Mesajı küçük harfe çevirip sağındaki solundaki boşlukları temizleyelim
    const msg = message.content.toLowerCase().trim();

    // Algılanmasını istediğin tüm selamlaşma varyasyonları
    const selamlar = [
        'sa', 
        'selam', 
        'selamun aleyküm', 
        'selamün aleyküm', 
        'selâm', 
        'merhaba', 
        'mrb', 
        'slm', 
        'hey',
        'sea'
    ];

    // Eğer yazılan mesaj selam listemizde varsa
    if (selamlar.includes(msg)) {
        // Dini selamlaşmalar için Aleyküm Selam, diğerleri için Merhaba/Selam cevabı
        if (msg === 'sa' || msg === 'selamun aleyküm' || msg === 'selamün aleyküm' || msg === 'sea') {
            await message.reply('**Aleyküm Selam, hoş geldin!**');
        } else {
            await message.reply('**Merhaba, hoş geldin!**');
        }
    }
});

// Jubbio panelindeki config veya env üzerinden tokenı otomatik çeker
client.login();
