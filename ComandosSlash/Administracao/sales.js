const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { getPermissions } = require("../../Functions/PermissionsCache.js");
const { owner } = require("../../config.json")


module.exports = {
  name: "vendas",
  description: "Use para ver suas vendas esse mês",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction, message) => {
  
    await interaction.reply({ content: `🔄 Aguarde...`, ephemeral: true })

    if (interaction.user.id !== owner) {

      interaction.reply({ content: `❌ | Você não pode usar este comando!`, ephemeral: true });
      return;

    }

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("todayyyy")
          .setLabel('Hoje')
          .setStyle(2)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("7daysss")
          .setLabel('Últimos 7 dias')
          .setStyle(2)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("30dayss")
          .setLabel('Últimos 30 dias')
          .setStyle(2)
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("totalrendimento")
          .setLabel('Rendimento Total')
          .setStyle(3)
          .setDisabled(false),
      )

    interaction.editReply({ content: `Olá senhor **${interaction.user.username}**, selecione algum filtro.`, components: [row], ephemeral: true })
  }
}
