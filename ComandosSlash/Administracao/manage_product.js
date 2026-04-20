const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { GerenciarCampos } = require("../../Functions/GerenciarCampos");
const { getPermissions } = require("../../Functions/PermissionsCache.js");
const { owner } = require("../../config.json")

module.exports = {
  name: "manage_product",
  description: "Use para configurar minhas funções",
  type: ApplicationCommandType.ChatInput,
  options: [{ name: "product", description: "-", type: 3, required: true, autocomplete: true }],

  run: async (client, interaction, message) => {

    if (interaction.user.id !== owner) {

      interaction.reply({ content: `❌ | Você não pode usar este comando!`, ephemeral: true });
      return;

    }

    if (interaction.options._hoistedOptions[0].value == 'nada') return interaction.reply({ content: `Nenhum item registrado em seu BOT`, ephemeral: true })


    GerenciarCampos(interaction, interaction.options._hoistedOptions[0].value)


  }
}
