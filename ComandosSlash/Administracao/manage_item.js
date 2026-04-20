const { EmbedBuilder, ApplicationCommandType, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const { GerenciarCampos2 } = require("../../Functions/GerenciarCampos");
const { getPermissions } = require("../../Functions/PermissionsCache.js");
const { owner } = require("../../config.json")
const db = new QuickDB();

module.exports = {
  name: "manage_item",
  description: "Use para configurar minhas funções",
  type: ApplicationCommandType.ChatInput,

  options: [{ name: "item", description: "-", type: 3, required: true, autocomplete: true }],


  run: async (client, interaction, message) => {

    if (interaction.user.id !== owner) {

      interaction.reply({ content: `❌ | Você não pode usar este comando!`, ephemeral: true });
      return;

    }

    if (interaction.options._hoistedOptions[0].value == 'nada') return interaction.reply({ content: `Nenhum item registrado em seu BOT`, ephemeral: true })


    const separarpor_ = interaction.options._hoistedOptions[0].value.split('_')
    const produtoname = separarpor_[0]
    const camponame = separarpor_[1]

    GerenciarCampos2(interaction, camponame, produtoname)



  }
}
