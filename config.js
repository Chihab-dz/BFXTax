const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const taxRate = 0.10; // نسبة الضريبة (10%)

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', message => {
    // تجاهل الرسائل من البوت نفسه
    if (message.author.bot) return;

    // إذا كان الأمر يبدأ بـ "!tax"
    if (message.content.startsWith('!tax')) {
        // استخراج الرقم بعد الأمر
        const args = message.content.split(' ');

        // التأكد من أن المستخدم أدخل قيمة
        if (args.length === 2 && !isNaN(args[1])) {
            const creditAmount = parseFloat(args[1]);

            // حساب الضريبة
            const totalTax = creditAmount * taxRate;  // الضريبة الإجمالية
            const taxPerson1 = totalTax * 0.5;        // 50% للشخص الأول
            const taxPerson2 = totalTax * 0.5;        // 50% للشخص الثاني
            const taxPerson3 = totalTax - (taxPerson1 + taxPerson2); // الباقي للشخص الثالث

            // إرسال النتيجة في الدردشة
            message.channel.send(`المبلغ الأصلي: ${creditAmount} كريديت\nالضريبة الإجمالية (10%): ${totalTax}\n\n` +
                `الشخص الأول: ${taxPerson1} كريديت\n` +
                `الشخص الثاني: ${taxPerson2} كريديت\n` +
                `الشخص الثالث: ${taxPerson3} كريديت`);
        } else {
            message.channel.send('الرجاء إدخال المبلغ الصحيح بعد الأمر، على سبيل المثال: !tax 100');
        }
    }
});

client.login('YOUR_BOT_TOKEN'); // ضع توكن البوت هنا
