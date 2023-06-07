const { Client, GatewayIntentBits } = require("discord.js");
const { MongoClient } = require("mongodb");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/discord"; // Replace with your actual MongoDB connection URL

// Connect to MongoDB
const mongoClient = new MongoClient(mongoURL);

mongoClient.connect()
    .then(() => {
        console.log('Connected to MongoDB');
        client.login('MTExNTU4MTExMTg4NDU5OTMyNg.Gb1mwf.BHQT8rVpCHvGJEDXT0sIYjOMTaB_anGwMuTniY'); // Replace with your actual bot token
    })
    .catch((error) => {
        console.error('Could not connect to MongoDB:', error);
    });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("create")) {
        const url = message.content.split("create")[1].trim();

        try {
            // Store the URL in the database
            const database = mongoClient.db();
            const urlsCollection = database.collection("urls");
            const result = await urlsCollection.insertOne({ url });
            const insertedId = result.insertedId;

            // Generate short ID
            const shortId = generateShortId(insertedId);

            // Reply to the user
            return message.reply(`Generated Short ID for ${url}: ${shortId}`);
        } catch (error) {
            console.error("Error accessing MongoDB:", error);
            return message.reply("An error occurred while accessing the database.");
        }
    }

    // Default reply
    message.reply("Hi From Bot");
});

function generateShortId(id) {
    // Generate a short ID based on the given MongoDB ObjectId
    // You can use any algorithm or library to generate short IDs here
    // For simplicity, this example uses a simple conversion of the ObjectId to a hexadecimal string
    return id.toHexString();
}
