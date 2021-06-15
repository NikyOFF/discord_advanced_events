import { Client, VoiceState, User } from 'discord.js';
declare namespace DiscordAdvancedEvents {
    interface MemberSelfMuteEvenet {
        voiceState: VoiceState;
    }
    interface MemberSelfDeafEvenet {
        voiceState: VoiceState;
    }
    interface MemberServerMuteEvenet {
        voiceState: VoiceState;
        executor: User;
        isAdmin: boolean;
    }
    interface MemberServerDeafEvenet {
        voiceState: VoiceState;
        executor: User;
        isAdmin: boolean;
    }
    interface ChannelDisconnect {
        oldVoiceState: VoiceState;
        newVoiceState: VoiceState;
    }
    interface ChannelConnect {
        oldVoiceState: VoiceState;
        newVoiceState: VoiceState;
    }
    interface AdvancedEvents {
        GUILD_MEMBER_SELF_MUTE: [MemberSelfMuteEvenet];
        GUILD_MEMBER_SELF_DEAF: [MemberSelfDeafEvenet];
        GUILD_MEMBER_SERVER_MUTE: [MemberServerMuteEvenet];
        GUILD_MEMBER_SERVER_DEAF: [MemberServerDeafEvenet];
        GUILD_CHANNEL_DISCONNECT: [ChannelDisconnect];
        GUILD_CHANNEL_CONNECT: [ChannelConnect];
    }
    class AdvancedEventsClient {
        protected client: Client;
        constructor(client: Client);
        on<K extends keyof AdvancedEvents>(event: K, listener: (...args: any[]) => void): AdvancedEventsClient;
    }
}
export default DiscordAdvancedEvents;
//# sourceMappingURL=index.d.ts.map