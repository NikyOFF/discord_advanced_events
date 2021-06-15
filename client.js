"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const index_1 = __importDefault(require("./index"));
const colors_1 = require("colors");
const client = new discord_js_1.default.Client();
const DiscordAdvancedEventsClient = new index_1.default.AdvancedEventsClient(client);
client.on('ready', () => {
    console.clear();
    console.log("Client started");
});
DiscordAdvancedEventsClient.on('GUILD_MEMBER_SERVER_MUTE', (voiceState, executor) => {
    if (!voiceState.member)
        return;
    console.log(`User ${colors_1.green(voiceState.member.displayName)} server muted state changed to: ${colors_1.yellow(voiceState.serverMute ? 'true' : 'false')}, by ${colors_1.green(executor.username)}`);
});
DiscordAdvancedEventsClient.on('GUILD_MEMBER_SELF_MUTE', (voiceState) => {
    if (!voiceState.member)
        return;
    console.log(`User ${colors_1.green(voiceState.member.displayName)} self muted state changed to: ${colors_1.yellow((voiceState.selfMute ? 'true' : 'false'))}`);
});
DiscordAdvancedEventsClient.on('GUILD_MEMBER_SERVER_DEAF', (voiceState, executor) => {
    if (!voiceState.member)
        return;
    console.log(`User ${colors_1.green(voiceState.member.displayName)} server deaf state changed to: ${colors_1.yellow(voiceState.serverDeaf ? 'true' : 'false')}, by ${colors_1.green(executor.username)}`);
});
DiscordAdvancedEventsClient.on('GUILD_MEMBER_SELF_DEAF', (voiceState) => {
    if (!voiceState.member)
        return;
    console.log(`User ${colors_1.green(voiceState.member.displayName)} self deaf state changed to: ${colors_1.yellow((voiceState.selfDeaf ? 'true' : 'false'))}`);
});
DiscordAdvancedEventsClient.on('GUILD_CHANNEL_CONNECT', (oldVoiceState, newVoiceState) => {
    var _a;
    if (!newVoiceState.member || !newVoiceState.channel)
        return;
    console.log(`User ${colors_1.green(newVoiceState.member.displayName)} connect to ${colors_1.yellow((_a = newVoiceState.channel) === null || _a === void 0 ? void 0 : _a.name)} channel`);
});
DiscordAdvancedEventsClient.on('GUILD_CHANNEL_DISCONNECT', (oldVoiceState, newVoiceState) => {
    if (!oldVoiceState.member || !oldVoiceState.channel)
        return;
    console.log(`User ${colors_1.green(oldVoiceState.member.displayName)} disconnect from ${colors_1.yellow(oldVoiceState.channel.name)} channel`);
});
client.login('token');
