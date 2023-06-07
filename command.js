const { REST, Routes } = require("discord.js");

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken('MTExNTU4MTExMTg4NDU5OTMyNg.Gb1mwf.BHQT8rVpCHvGJEDXT0sIYjOMTaB_anGwMuTniY');

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands('1115581111884599326'), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();