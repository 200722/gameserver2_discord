import {Client, TextChannel} from "discord.js";
import welcomeSchema from '../models/welcome-schema'


// load and store data only when needed

const welcomeData = {} as {
    [key:string] : [TextChannel, string]
}

export default (client: Client) => {
    client.on('guildMemberAdd', async member => {
        const {guild, id} = member

        let data = welcomeData[guild.id]
        // IT IS NO SAVE IN AMEMORY WE MUST FETCH IT FROM DATABASE EN THEN save it in amemory
        if (!data){
            const results = await welcomeSchema.findById(guild.id)
            if(!results){
                return
            }
            const{ channelId, text} = results
            const channel = guild.channels.cache.get(channelId) as TextChannel
            data = welcomeData[guild.id] = [channel, text]

        }

        data[0].send({
            content: data[1].replace(/@/g,`<@${id}>`)

        })

    })
}

export const config = {
    displayName:'welcome channnel',
    dbName:'WELCOME_CHANNEL'
}
