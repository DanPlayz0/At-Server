/* eslint-disable indent */
const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { getModule, React } = require("powercord/webpack");

const {
  AUTOCOMPLETE_OPTIONS: { MENTIONS }
} = getModule(["AUTOCOMPLETE_OPTIONS"], false);

const Server = require("./Server");

module.exports = class atSomeone extends Plugin {
  async startPlugin() {
    this._injectAutoComplete();
    powercord.api.commands.registerCommand({
      command: "@/Server",
      aliases: ["@s"],
      description: "Ats Server",
      usage: "",
      async executor() {
        return {
          send: true,
          result: getRandomUserID()
        };
      }
    });
  }

  _injectAutoComplete() {
    inject("as-mention-container", MENTIONS, "renderResults", (args, res) => {
      if (!"server".includes(args[1].toLowerCase())) return res;

      res.props.children[3]?.unshift(React.createElement(Server));
      return res;
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("@/Server");
    uninject("as-mention-container");
  }
};
