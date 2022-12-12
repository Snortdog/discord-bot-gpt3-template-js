require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let prompt =``;

client.on("messageCreate", function (message) {
  if (message.content.startsWith('pls')) {
    // Slice the message content string starting at the 3rd character, after the "pls" trigger
    prompt = message.content.slice(3);
  (async () => {
        const gptResponse = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 256,
            temperature: 0.5,
            top_p: 0.3,
            presence_penalty: 0,
            frequency_penalty: 0.5,
          });
        message.reply(`${gptResponse.data.choices[0].text.substring(2)}`);
        prompt += `${gptResponse.data.choices[0].text}\n`;
    })();
  }});            
               

client.login(process.env.BOT_TOKEN);
