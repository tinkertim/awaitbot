import { CommandsLoader } from '../deps.ts'
import {
  Client,
  event,
  slash,
  ApplicationCommandInteraction,
  ApplicationCommandOptionType
} from '../deps.ts'

export class AwaitBotClient extends Client {
    @event()
    async ready(): Promise<void> {
      console.log(`Bot registered (logged-in) as ${this.user?.tag}!`)
      // There *should* be some better way of knowing if we need to refresh commands. 
      const commands = await this.interactions.commands.all()
      if (commands.size !== 4) {
        this.interactions.commands.bulkEdit([
          {
            name: 'await',
            description: 'Let awaitbot know that you are promising to build something.',
            options: [
              {
                name: 'project',
                description: 'A one-sentence summary of what you intend to build.',
                required: true,
                type: ApplicationCommandOptionType.STRING
              }
            ]
          },
          {
            name: 'remind',
            description: 'Remind (print) what you said you were going to build.'
          },
          {
            name: 'forget',
            description: 'Cancel your outstanding promise, if any.',
          },
          {
            name: 'return',
            description: 'Let awaitbot know that you completed something you promised to build.',
            options: [
              {
                name: 'link',
                description: 'Link to verify some kind of implementation has been achieved.',
                required: true,
                type: ApplicationCommandOptionType.STRING
              }
            ]
          }
        ])
      }
    }
  
    @slash()
    await(d: ApplicationCommandInteraction): void {
      const arg = d.option<string | undefined>('project')
      d.reply(`Your project begins now. Go forth and "${arg !== undefined ? arg : 'nothing'}"; we're here if you need help!`)
      console.log('promise posted')
    }
  
    @slash()
    remind(d: ApplicationCommandInteraction): void {
      d.reply(`You said you were going to do something ... can't quite put my finger on it ...`)
      console.log('reminder requested')
    }
  
    @slash()
    forget(d: ApplicationCommandInteraction): void {
      d.reply(`Your project has been recycled. Type /await to begin a new one!`)
      console.log('promise cancelled')
    }
  
    @slash()
    return(d: ApplicationCommandInteraction): void {
      d.reply(`Your submission has been recorded, and our community team has been notified. They will reach out to you soon!`)
      console.log('promise handed in')
    }
}
  