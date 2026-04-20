const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder,ButtonBuilder } = require("discord.js");
const startTime = Date.now();
const maxMemory = 100;
const usedMemory = process.memoryUsage().heapUsed / 1024 / 1024;
const memoryUsagePercentage = (usedMemory / maxMemory) * 100;
const roundedPercentage = Math.min(100, Math.round(memoryUsagePercentage));
const { Painel } = require("../../Functions/Painel");
const { getPermissions } = require("../../Functions/PermissionsCache.js");
const { owner } = require("../../config.json")

module.exports = {
  name: "painel",
  description: "Use para configurar minhas funções",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction, message) => {

    if (interaction.user.id !== owner) {

      interaction.reply({ content: `❌ | Você não pode usar este comando!`, ephemeral: true });
      return;

    }

    Painel(interaction, client)
  }
}
