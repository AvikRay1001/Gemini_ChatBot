import genAI from "./config/gemini.js";
import readline from 'readline';
import colors from 'colors';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function run(){
  const model = genAI.getGenerativeModel({model: "gemini-pro"});
  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 500,
    },
  });
  console.log(colors.bold.green('Welcome to the Chatbot Program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));
  async function askandRespond(){
    rl.question(colors.yellow("You: "), async(msg) => {
      if(msg.toLowerCase() === "exit"){
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = await response.text();
        console.log(colors.green('Bot: ') + text);
        rl.close();
      }
      else{
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = await response.text();
        console.log(colors.green('Bot: ') + text);
        askandRespond();
      }
    });
  }

  askandRespond();
}

run();