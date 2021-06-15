"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DiscordAdvancedEvents;
(function (DiscordAdvancedEvents) {
    const log = (...data) => console.log(`[${new Date().toLocaleTimeString()}]: `, ...data);
    function checkUserRestrictions(voiceState, callback, moderatorRoleId, limit = 1) {
        if (!voiceState.member)
            return;
        voiceState.guild.fetchAuditLogs({
            type: 24,
            limit,
            user: voiceState
        })
            .then((audit) => {
            const entry = audit.entries.last();
            if (entry) {
                const executor = entry.executor;
                voiceState.guild.members.fetch(executor)
                    .then((_member) => {
                    if (_member) {
                        callback === null || callback === void 0 ? void 0 : callback.call(undefined, executor, (_member.hasPermission('ADMINISTRATOR') || (moderatorRoleId && _member.roles.cache.find(_role => _role.id === moderatorRoleId) ? true : false)));
                    }
                    else {
                        throw new Error("Member not found");
                    }
                })
                    .catch(log);
            }
        })
            .catch(log);
    }
    class AdvancedEventsClient {
        constructor(client) {
            this.client = client;
            this.client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
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
                            if (!newVoiceState.member)
                                return;
                            this.client.emit("GUILD_MEMBER_SERVER_MUTE", newVoiceState, executor, isAdmin);
                        });
                    }
                    if (oldVoiceState.serverDeaf !== newVoiceState.serverDeaf) {
                        /*server deaf state changed*/
                        checkUserRestrictions(newVoiceState, (executor, isAdmin) => {
                            if (!newVoiceState.member)
                                return;
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
        on(event, listener) {
            this.client.on(event.toString(), listener);
            return this;
        }
    }
    DiscordAdvancedEvents.AdvancedEventsClient = AdvancedEventsClient;
})(DiscordAdvancedEvents || (DiscordAdvancedEvents = {}));
exports.default = DiscordAdvancedEvents;
//# sourceMappingURL=index.js.map