import {ICommand } from 'wokcommands'

export default {
    category: 'testing',
    description: 'Simulates a join',
    

    slash:'both',
    TestOnly:true,

    callback: ({member, client}) =>{
        client.emit('guildMemberAdd', member)
        return 'join simulated!'


    },


}as ICommand
