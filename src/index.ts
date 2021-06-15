import { Client, VoiceState, GuildMember, User, GuildAuditLogs, GuildAuditLogsEntry } from 'discord.js'

const log = (...data: any[]) => console.log(`[${new Date().toLocaleTimeString()}]: `, ...data);

function checkUserRestrictions(voiceState: VoiceState | any, callback?: (executor: User, isAdmin: boolean) => void, moderatorRoleId?: string, limit: number = 1) {
    if (!voiceState.member) return;

    voiceState.guild.fetchAuditLogs({
        type: 24,
        limit,
        user: voiceState
    })
        .then((audit: GuildAuditLogs) => {
            const entry: GuildAuditLogsEntry | undefined = audit.entries.last();

            if (entry) {
                const executor: User = entry.executor;

                voiceState.guild.members.fetch(executor)
                    .then((_member: GuildMember) => {
                        if (_member) {
                            callback?.call(undefined, executor, (_member.hasPermission('ADMINISTRATOR') || (moderatorRoleId && _member.roles.cache.find(_role => _role.id === moderatorRoleId) ? true : false)));
                        } else {
                            throw new Error("Member not found")
                        }
                    })
                    .catch(log);
            }
        })
        .catch(log);
}

export interface MemberSelfMuteEvenet {
    voiceState: VoiceState
}

export interface MemberSelfDeafEvenet {
    voiceState: VoiceState
}

export interface MemberServerMuteEvenet {
    voiceState: VoiceState,
    executor: User,
    isAdmin: boolean
}

export interface MemberServerDeafEvenet {
    voiceState: VoiceState,
    executor: User,
    isAdmin: boolean
}

export interface ChannelDisconnect {
    oldVoiceState: VoiceState
    newVoiceState: VoiceState
}

export interface ChannelConnect {
    oldVoiceState: VoiceState
    newVoiceState: VoiceState
}

export interface AdvancedEvents {
    GUILD_MEMBER_SELF_MUTE: [MemberSelfMuteEvenet]
    GUILD_MEMBER_SELF_DEAF: [MemberSelfDeafEvenet]
    GUILD_MEMBER_SERVER_MUTE: [MemberServerMuteEvenet]
    GUILD_MEMBER_SERVER_DEAF: [MemberServerDeafEvenet]
    GUILD_CHANNEL_DISCONNECT: [ChannelDisconnect]
    GUILD_CHANNEL_CONNECT: [ChannelConnect]
}

export class AdvancedEventsClient {
    protected client: Client;

    constructor(client: Client) {
        this.client = client;

        this.client.on('voiceStateUpdate', (oldVoiceState: VoiceState, newVoiceState: VoiceState) => {
            if (oldVoiceState.channel && newVoiceState.channel && oldVoiceState.channel === newVoiceState.channel && newVoiceState.member) {                    
                /*on state changed*/

                if (oldVoiceState.selfMute !== newVoiceState.selfMute) {
                    /*self mute state changed*/
                    this.client.emit("GUILD_MEMBER_SELF_MUTE", newVoiceState);
                }

                if (oldVoiceState.selfDeaf !== newVoiceState.selfDeaf) {
                    /*self deaf state changed*/
                    this.client.emit("GUILD_MEMBER_SELF_DEAF", newVoiceState);
                }

                if (oldVoiceState.serverMute !== newVoiceState.serverMute) {
                    /*server mute state changed*/
                    checkUserRestrictions(newVoiceState, (executor, isAdmin) => {
                        if (!newVoiceState.member) return;
        
                        this.client.emit("GUILD_MEMBER_SERVER_MUTE", newVoiceState, executor, isAdmin);
                    });
                }

                if (oldVoiceState.serverDeaf !== newVoiceState.serverDeaf) {
                    /*server deaf state changed*/
                    checkUserRestrictions(newVoiceState, (executor, isAdmin) => {
                        if (!newVoiceState.member) return;
        
                        this.client.emit("GUILD_MEMBER_SERVER_DEAF", newVoiceState, executor, isAdmin);
                    });
                }
            }

            if (oldVoiceState.channel && oldVoiceState.channel !== newVoiceState.channel) {
                /*disconnect from channel*/
                this.client.emit("GUILD_CHANNEL_DISCONNECT", oldVoiceState, newVoiceState);
            }

            if (newVoiceState.channel && oldVoiceState.channel !== newVoiceState.channel) {
                /*connect to channel*/
                this.client.emit("GUILD_CHANNEL_CONNECT", oldVoiceState, newVoiceState);
            }
        });
    }

    public on<K extends keyof AdvancedEvents>(event: K, listener: (...args: any[]) => void): AdvancedEventsClient {
        this.client.on(event.toString(), listener);
        return this;
    }
}