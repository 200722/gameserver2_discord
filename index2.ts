import DiscordJS,{Intents, Interaction} from 'discord.js'
import dotenv from 'dotenv'
dotenv.config();

const client = new DiscordJS.Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ],

})


// import { Message } from "discord.js"

client.on('ready',() =>{
    console.log('The bot is ready')

const guildId = '911216241107152926' 
const guild = client.guilds.cache.get(guildId)

let commands

if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }
  
  commands?.create({
    name: 'ping',
    description: 'Replies with pong',
  })

   commands?.create({
    name: 'add',
    description: 'Adds two numbers',
    options: [
      {
        name: 'number1',
        description: 'The first number.',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER,
      },
      {
        name: 'number2',
        description: 'The second number.',
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.INTEGER,
      },
    ],
  })


})



client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) {
        return
    }
    const { commandName, options } = interaction

    console.log(commandName)

    if(commandName === 'ping'){
        interaction.reply({
                content: 'pong',
                ephemeral: true,
            })
    } else if (commandName === 'add') {
      const num1 = options.getInteger('number1') || 0
      const num2 = options.getInteger('number2') || 0
      const sum = `The sum is ${num1 + num2}`
      interaction.reply({
        content: sum,
        ephemeral: true 
      })
    }
  })

client.login(process.env.TOKEN)