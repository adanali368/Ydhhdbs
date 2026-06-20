const { Client, GatewayIntentBits, EmbedBuilder } = require('@jubbio/core');

// Çift güvence: Hem iç ayara hem de doğrudan login'e tokeni bağlıyoruz
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    token: process.env.BOT_TOKEN // Bazı core altyapıları tokeni burada bekler
});

// Jubbio uygulamasının aktiflik kontrolü
client.once('ready', () => {
    console.log(`[BAŞARILI] Jubbio uygulaması şu anda aktif ve 7/24 çalışıyor! 🚀`);
});

// Mesaj kontrolleri (Sa-As Sistemi)
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

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

// Eğer token hala boş algılanıyorsa kodu çökertmeden önce log detayını görmek için kontrol ekledik
const token = process.env.BOT_TOKEN;
if (!token) {
    console.error("[HATA] Render ortam değişkenlerinden 'BOT_TOKEN' okunamadı! Lütfen Environment panelini kontrol edin.");
}

client.login(token);
