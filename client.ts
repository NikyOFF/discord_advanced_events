import Discord, { User, VoiceState } from 'discord.js'
import DiscordAdvancedEvents from './index'
import { green, yellow } from 'colors';

const client: Discord.Client = new Discord.Client();
const DiscordAdvancedEventsClient: DiscordAdvancedEvents.AdvancedEventsClient = new DiscordAdvancedEvents.AdvancedEventsClient(client);

client.on('ready', () => {
    console.clear();
    console.log("Client started");
});

DiscordAdvancedEventsClient.on('GUILD_MEMBER_SERVER_MUTE', (voiceState: VoiceState, executor: User) => {
    if (!voiceState.member) return;

    console.log(`User ${green(voiceState.member.displayName)} server muted state changed to: ${yellow(voiceState.serverMute ? 'true' : 'false')}, by ${green(executor.username)}`);
});

DiscordAdvancedEventsClient.on('GUILD_MEMBER_SELF_MUTE', (voiceState: VoiceState) => {
    if (!voiceState.member) return;

    console.log(`User ${green(voiceState.member.displayName)} self muted state changed to: ${yellow((voiceState.selfMute ? 'true' : 'false'))}`);
});

DiscordAdvancedEventsClient.on('GUILD_MEMBER_SERVER_DEAF', (voiceState: VoiceState, executor: User) => {
    if (!voiceState.member) return;

    console.log(`User ${green(voiceState.member.displayName)} server deaf state changed to: ${yellow(voiceState.serverDeaf ? 'true' : 'false')}, by ${green(executor.username)}`);
});

DiscordAdvancedEventsClient.on('GUILD_MEMBER_SELF_DEAF', (voiceState: VoiceState) => {
    if (!voiceState.member) return;

    console.log(`User ${green(voiceState.member.displayName)} self deaf state changed to: ${yellow((voiceState.selfDeaf ? 'true' : 'false'))}`);
});

DiscordAdvancedEventsClient.on('GUILD_CHANNEL_CONNECT', (oldVoiceState: VoiceState, newVoiceState: VoiceState) => {
    if (!newVoiceState.member || !newVoiceState.channel) return;

    console.log(`User ${green(newVoiceState.member.displayName)} connect to ${yellow(newVoiceState.channel?.name)} channel`);
});

DiscordAdvancedEventsClient.on('GUILD_CHANNEL_DISCONNECT', (oldVoiceState: VoiceState, newVoiceState: VoiceState) => {
    if (!oldVoiceState.member || !oldVoiceState.channel) return;

    console.log(`User ${green(oldVoiceState.member.displayName)} disconnect from ${yellow(oldVoiceState.channel.name)} channel`);
});

client.login('token');