import {
  ApplicationCommandInteraction,
  ApplicationCommandOptionType,
  Client,
  event,
  log,
  slash,
} from "../deps.ts";

import sql from "../db.ts";

export class AwaitBotClient extends Client {
  @event()
  async ready(): Promise<void> {
    log.info(`  -> Bot registered (logged-in) as ${this.user?.tag}!`);
    // There *should* be some better way of knowing if we need to refresh commands.
    const commands = await this.interactions.commands.all();
    if (commands.size !== 4) {
      this.interactions.commands.bulkEdit([
        {
          name: "await",
          description:
            "Let awaitbot know that you are promising to build something.",
          options: [
            {
              name: "project",
              description:
                "A one-sentence summary of what you intend to build.",
              required: true,
              type: ApplicationCommandOptionType.STRING,
            },
          ],
        },
        {
          name: "report",
          description: "Print the promises we're currently tracking (all)",
        },
        {
          name: "forget",
          description: "Cancel your outstanding promise.",
        },
        {
          name: "return",
          description: "Let awaitbot know that you completed a promise!",
          options: [
            {
              name: "link",
              description:
                "Link to URL or image to verify something has been achieved.",
              required: true,
              type: ApplicationCommandOptionType.STRING,
            },
          ],
        },
      ]);
    }
  }

  @slash()
  await(d: ApplicationCommandInteraction): void {
    const arg = d.option<string>("project");

    // Control is, we assume sanity is good unless a specific check says it isn't.
    // (checks will implement this)
    const valid = true;

    // First, check if active project, ask to finish that one first (or /forget it)
    // TODO

    if (valid == true) {
      // at this point it's okay to just register the project, so do it.
      d.reply(
        `Your project begins now. Go forth and "${arg}"; we're here if you need help!`,
      );
      log.info(`new promise posted by ${d.user.username}: ${arg}`);
    }
  }

  @slash()
  remind(d: ApplicationCommandInteraction): void {
    // query for active project, if any, and report
    d.reply(
      `You said you were going to do something ... can't quite put my finger on it ...`,
    );
    log.info(`reminder requested by ${d.user.username}`);
  }

  @slash()
  forget(d: ApplicationCommandInteraction): void {
    // Make sure there's something to forget

    // Fine, forget it already
    d.reply(`Your project has been recycled. Type /await to begin a new one!`);
    log.info(`promise cancelled by ${d.user.username}`);
  }

  @slash()
  return(d: ApplicationCommandInteraction): void {
    const arg = d.option<string>("link");
    d.reply(
      `Your submission has been recorded, and our community team has been notified. They will reach out to you soon!`,
    );
    log.info(`promise handed in by ${d.user.username}: ${arg}`);
  }
}
