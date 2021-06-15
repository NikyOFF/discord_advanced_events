import { Client, VoiceState, User } from 'discord.js';
export interface MemberSelfMuteEvenet {
    voiceState: VoiceState;
}
export interface MemberSelfDeafEvenet {
    voiceState: VoiceState;
}
export interface MemberServerMuteEvenet {
    voiceState: VoiceState;
    executor: User;
    isAdmin: boolean;
}
export interface MemberServerDeafEvenet {
    voiceState: VoiceState;
    executor: User;
    isAdmin: boolean;
}
export interface ChannelDisconnect {
    oldVoiceState: VoiceState;
    newVoiceState: VoiceState;
}
export interface ChannelConnect {
    oldVoiceState: VoiceState;
    newVoiceState: VoiceState;
}
export interface AdvancedEvents {
    GUILD_MEMBER_SELF_MUTE: [MemberSelfMuteEvenet];
    GUILD_MEMBER_SELF_DEAF: [MemberSelfDeafEvenet];
    GUILD_MEMBER_SERVER_MUTE: [MemberServerMuteEvenet];
    GUILD_MEMBER_SERVER_DEAF: [MemberServerDeafEvenet];
    GUILD_CHANNEL_DISCONNECT: [ChannelDisconnect];
    GUILD_CHANNEL_CONNECT: [ChannelConnect];
}
export declare class AdvancedEventsClient {
    protected client: Client;
    constructor(client: Client);
    on<K extends keyof AdvancedEvents>(event: K, listener: (...args: any[]) => void): AdvancedEventsClient;
}
//# sourceMappingURL=index.d.ts.map