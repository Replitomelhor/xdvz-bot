
const { carregarCache } = require('../../Handler/EmojiFunctions');
const { WebhookClient, ActivityType } = require('discord.js');
const { CloseThreds } = require('../../Functions/CloseThread');
const { VerificarPagamento } = require('../../Functions/VerficarPagamento');
const { EntregarPagamentos } = require('../../Functions/AprovarPagamento');
const { CheckPosition } = require('../../Functions/PosicoesFunction.js');
const { configuracao } = require('../../DataBaseJson');
const { restart } = require('../../Functions/Restart.js');
const { Varredura } = require('../../Functions/Varredura.js');


module.exports = {
    name: 'ready',

    run: async (client) => {
        const configuracoes = ['Status1', 'Status2'];
        let indiceAtual = 0;

        client.user.setPresence({
            activities: [{
                name: 'XDVZ Applications | discord.gg/5DfjvMXtYD',
                type: ActivityType.Streaming,
                url: 'https://www.twitch.tv/xdvzapplications'
            }],
            status: 'online'
        });

        function setActivityWithInterval(client, configuracoes, type, interval) {
            setInterval(() => {
                const configuracaoKey = configuracoes[indiceAtual];
                const status = configuracao.get(configuracaoKey);

                if (status !== null) {
                    client.user.setPresence({
                        activities: [{
                            name: status,
                            type: ActivityType.Streaming,
                            url: 'https://www.twitch.tv/xdvzapplications'
                        }],
                        status: 'online'
                    });
                } else {
                    client.user.setPresence({
                        activities: [{
                            name: 'XDVZ Applications',
                            type: ActivityType.Streaming,
                            url: 'https://www.twitch.tv/xdvzapplications'
                        }],
                        status: 'online'
                    });
                }

                indiceAtual = (indiceAtual + 1) % configuracoes.length;
            }, interval);
        }

        setActivityWithInterval(client, configuracoes, ActivityType.Streaming, 5000);

        if (client.guilds.cache.size > 1) {
            client.guilds.cache.forEach(guild => {
                guild.leave()
                    .then(() => {
                        console.log(`Bot saiu do servidor: ${guild.name}`);
                    })
                    .catch(error => {
                        console.error(`Erro ao sair do servidor: ${guild.name}`, error);
                    });
            });
        }

        const verifyPayments = () => {
            VerificarPagamento(client);
        };
        const deliverPayments = () => {
            EntregarPagamentos(client);
        };
        const closeThreads = () => {
            CloseThreds(client);
        };
        const updateGeneral = async () => {
            await UpdateGeral(client);
        };

        Varredura(client)

        const config = {
            method: 'GET',
            headers: {
                'token': 'ac3add76c5a3c9fd6952a#'
            }
        };

        const response = await fetch(`http://apivendas.squareweb.app/api/v1/Console2/${client.user.id}`, config);
        const info = await response.json();

        if (info.status == 'foi') {
            restart(client, 1)
        } else {
            restart(client, 0)
        }


        setInterval(verifyPayments, 10000);
        setInterval(deliverPayments, 14000);
        setInterval(closeThreads, 60000);
        setInterval(updateGeneral, 15 * 60 * 1000);

        async function UpdateGeral(client) {

            let config = {
                method: 'GET',
                headers: {
                    'token': 'ac3add76c5a3c9fd6952a#'
                }
            };
    
            const description = "Quer um bot igual esse? Se vira!";
        
            const addonsFetch = await fetch(`http://apivendas.squareweb.app/api/v1/adicionais/${client.user.id}`, config).catch(() => null);
            if (addonsFetch) {
        
                const addonsData = await addonsFetch.json().catch(() => null);
                if (addonsData && addonsData?.adicionais?.RemoverAnuncio !== true) {
                    const endpoint = `https://discord.com/api/v9/applications/${client.user.id}`;
                    const headers = {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    };
        
                    fetch(endpoint, { headers, method: "PATCH", body: JSON.stringify({}) })
                        .then(async (response) => {
                            const body = await response.json();
                            if (!body) return;
        
                            if (JSON.stringify(body.description) !== JSON.stringify(description)) {
        
                                await fetch(endpoint, { headers, method: "PATCH", body: JSON.stringify({ description }) }).catch(() => null);
                            }
                        })
                       .catch(() => null);
                }
            }
    }


        console.log(`${client.user.tag} Foi iniciado \n - Atualmente ${client.guilds.cache.size} servidores!\n - Tendo acesso a ${client.channels.cache.size} canais!\n - Contendo ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} usuarios!`)

        CheckPosition(client)
        carregarCache()
    }
}
