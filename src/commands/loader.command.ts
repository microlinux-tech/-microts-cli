import chalk from "chalk";
import { Command } from "commander";
import { ERROR_PREFIX } from "../lib/ui";
const { InfoCommand } = require("../commands/info.command");
const { InfoAction } = require("../actions/info.action");
const { NewCommand } = require("../commands/new.command");
const { NewAction } = require("../actions/new.action");
export class CommandLoader {
  public static async load(program: Command): Promise<void> {
    new InfoCommand(new InfoAction()).load(program);
    new NewCommand(new NewAction()).load(program);
    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: Command) {
    program.on("command:*", () => {
      console.error(
        `\n${ERROR_PREFIX} Invalid command: ${chalk.red("%s")}`,
        program.args.join(" ")
      );
      console.log(
        `See ${chalk.red("--help")} for a list of available commands.\n`
      );
      process.exit(1);
    });
  }
}
