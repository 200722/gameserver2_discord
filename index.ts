import DiscordJS,{Intents, Interaction} from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'
import 'dotenv/config'
import testSchema from './test-schema'
import dotenv from 'dotenv'  
dotenv.config();

const client = new DiscordJS.Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        // Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Intents.FLAGS.GUILD_PRESENCES,

    ],

})


// import { Message } from "discord.js"

client.on('ready',async () =>{
    // console.log('The bot is ready')

    await mongoose.connect(
       process.env.MONGO_URI || '',
        {
            keepAlive:true
        }
    )


    new WOKCommands(client, {
      // The name of the local folder for your command files
      commandsDir: path.join(__dirname, 'commands'),
      // Allow importing of .ts files if you are using ts-node
      typeScript: true,
      testServers:['911216241107152926'],
      botOwners:['911216241107152926'],
     

     })


  setTimeout(async () => {
    await new testSchema({
      message:'hello world',
    }).save()
  }, 1000)
})





client.login(process.env.TOKEN)







