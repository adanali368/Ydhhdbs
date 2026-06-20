const { Client, GatewayIntentBits, EmbedBuilder } = require('@jubbio/core');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Jubbio uygulamasının aktiflik kontrolü
client.once('ready', () => {
    console.log(`[BAŞARILI] Jubbio uygulaması şu anda aktif ve 7/24 çalışıyor! 🚀`);
});

// Mesaj kontrolleri (Sa-As Sistemi)
client.on('messageCreate', async (message) => {
    // Botun kendi mesajlarına cevap vermesini engeller
    if (message.author.bot) return;

    // Gelen mesajı küçük harfe çevirip boşlukları temizler (Sa, SA, sA fark etmez)
    const msg = message.content.toLowerCase().trim();

    // --- SA-AS SİSTEMİ ---
    if (msg === 'sa' || msg === 'selamun aleykum' || msg === 'selamün aleyküm' || msg === 'selam') {
        return message.reply({ content: 'Aleyküm Selam, Jubbio dünyasına hoş geldin! 👋' });
    }

    // Jubbio Bilgi Komutu
    if (msg === '!jubbio' || msg === 'jubbio') {
        const embed = new EmbedBuilder()
            .setColor('#7289DA')
            .setTitle('✨ Jubbio Uygulaması Aktif!')
            .setDescription('Premium kalitede, sorunsuz altyapı ile hizmetinizdeyim.')
            .setTimestamp()
            .setFooter({ text: 'Jubbio Geliştirici Modu' });

        return message.reply({ embeds: [embed] });
    }
});

// Botu BOT_TOKEN ortam değişkeni ile başlatır
client.login(process.env.BOT_TOKEN);
