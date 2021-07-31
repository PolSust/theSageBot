import { CommandoClient } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import path from "path";
import { prefix, discordToken } from "./config.json";
import { DiscordMenus, MenuBuilder } from "discord-menus";

const client: CommandoClient = new CommandoClient({
	commandPrefix: prefix,
	owner: "244134758286753799",
});

client.registry
	.registerDefaultTypes()
	.registerGroups([["steam"], ["other"]])
	.registerDefaultGroups()
	.registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
	console.log(`Logged in as ${client.user?.tag}! (${client.user?.id})`);
	// client.user?.setActivity("you from a dark corner", { type: "WATCHING" });

	client.user?.setStatus("idle");
});

client.on("error", console.error);

client.login(discordToken);

const MenusManager = new DiscordMenus(client);

client.on("message", async (msg) => {
	if (msg.author.id === "244517253750456320") {
		// msg.react("💩");
	}

	/* 	const menu = new MessageMenuOptions()
		.addLabel("Value 1", {
			description: "This the value 1 description",
			value: "value-1",
		})
		.setMaxValues(3)
		.setMinValues(1)
		.setCustomID("cool-custom-id")
		.setPlaceHolder("Select an option");

	await MenusManager.sendMenu(msg, "content", { menu }).catch((err) => {
		console.error(err);
	}); */
});
//give a member a role to all new users
client.on("guildMemberAdd", (member) => {
	if (member.guild.id === "244135020401393665") {
		member.roles.add("244517253750456320").catch(console.error);
	}
});

client.on("disconnect", () => {
	client.user?.setActivity("offline");
});
