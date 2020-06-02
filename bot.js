
const Discord = require('discord.js');
const bot = new Discord.Client();
const Table = require('cli-table');
const fechaCS = new Date("May 26, 2020 20:00:00-05:00");
const fechaArkaWar = new Date("May 27, 2020 21:00:00-05:00");
const fechaIWC = new Date("May 31, 2020 20:00:00-05:00");

function showRemaining(timeto, frequency) {

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;

    var now = new Date();
    var distance = timeto - now;

    while (distance < 0) {
        distance += frequency  // + 2 weeks
    }

    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);

    return days + " dias, " + hours + " horas, " + minutes + " minutos, " + seconds + " segundos"
    }

bot.on("ready", function () {
	console.log("Ready to begin!")
});

bot.on("message", message => {

    if (message.author.bot) return;
    if (message.content.indexOf('?') !== 0) return;
    
    let args = message.content.substring(1).split(' ')
    let command = args[0];
    
    switch (command) 
    {
        case 'ping':
            message.reply("pong");
            break;

        case 'pong':
            message.reply("pongi me lo mama");
            break;

        case 'comoingresargremory':
            message.reply("3 cm o menos bb");
            break;

        case 'help':
            var helpresponse = "\n```- ping, pong, ayuda, goodbot, comoingresargremory, duqueesmarika, amyesmarika, ruleresmarika, arkanthosesmarika, rulozeroesmarika, magaoscuraesmarika // me obliga a decir huevadas\
                            \n- tiempoCS //reporta cuanto falta para el CS\
                            \n- tiempoArka //reporta cuanto falta para el Arka\
                            \n- tiempoIWC //reporta cuanto falta para el Ice Wind Castle \
                            \n- darkness {server} //reporta la muerte del god y en 4 horas sale mensaje de ventana abierta\
                            \n- elite {server} //reporta la muerte de los elite y en 11 horas 55 min horas avisa que van a salir```"
            message.reply(helpresponse); 
            break;
        
        case 'ayuda':
            message.reply("Te ayudare a aprender ingles, insecto.");
            break;

        case 'goodbot':
            message.reply("la geta pirobo");
            break;

        case 'duqueesmarika':
            message.reply("Si lo fuera me lo como.");
            break;

        case 'arkanthosesmarika':
            message.reply("xd");
            break;

        case 'amyesmarika':
            message.reply("Si pero solo le gusta dar a los claymore.");
            break
            ;
        case 'rulozeroesmarika':
            message.reply("Si el es marika todos aca somos unas floresitas hermosas.");
            break;
        
        case 'magaoscuraesmarika':
            message.reply("Y tiene pene");
            break;

        case 'ruleresmarika':
            message.reply("Tu comentario mato a sebasvarg de reflejo");
            break;

        case 'tiempoCS':
            message.reply(showRemaining(fechaCS, 12096e5));
            break;

        case 'tiempoArka':
            message.reply(showRemaining(fechaArkaWar, 604800*1000));
            break;

        case 'tiempoIWC':
            message.reply(showRemaining(fechaIWC, 604800*1000));
            break;

        case 'darkness':
            
            let darknessserver = 1
            
            if (args.length > 1) darknessserver = args[1]
            
            message.reply('Muerte de God of Darkness reportada en server: ' + darknessserver);

            let darknessreturner = 'Ventana del GOD abierta por 2 horas en server ' + darknessserver + ' @here';

            setTimeout(function () 
            {
                message.reply(message, darknessreturner);
            }, 14400000);
            
            break;
            
        case 'elite':
            
            let eliteserver = 1
            
            if (args.length > 1) eliteserver = args[1]

            message.reply('Muerte de Elites reportada en server: ' + eliteserver);

            let elitereturner = 'Elites salen en 5 minutos en el server ' + eliteserver + ' @here'

            setTimeout(function () 
            {
                message.reply(elitereturner);

            }, 43500000);
            
            break; 
        
        case 'lista':

            if (args.length < 2){
                message.reply('Porfavor indica la lista. (cs, arka, iwc) ');
                break;
            }

            let lista = args[1]
            let tabla = ''
            let body = '';
            let http = ''

            if (lista === 'cs') tabla = 'aadfacd'
            else if (lista === 'arka') tabla = 'abbfdfe'
            else if (lista === 'iwc') tabla = 'adedaff'
            else{
                message.reply('Solo se permite lista cs, arka, o iwc ');
                break;
            }
            console.log(body)
            console.log(http)

            http = require('http');

            let listarequest= http.get({
                host: 'extendsclass.com',
                path: '/api/json-storage/bin/' + tabla + ''+'?stuff='+ Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                headers: 
                { 
                    'security-key': 'JorgeEsGay',
                    'Cache-Control': 'no-cache, no-store'
                } 
            }, function(response) {
                // Continuously update stream with data
                response.on('data', function(chunk) {
                    body += chunk;
                });
                response.on('end', function() {

                    // Data reception is done, do whatever with it!
                    console.log(body)

                    let parsedResponse = JSON.parse(body)

                    let listrespuesta = '```'

                    let table = new Table({
                        head: ['Piloto', 'Personaje', 'Guild', 'Raza', 'Radiance']
                      , colWidths: [10, 10, 5, 10, 10]
                    });

                    for(let listkey in parsedResponse) 
                    {                        
                        let personaje = parsedResponse[listkey]['personaje']
                        let raza = parsedResponse[listkey]['raza']
                        let guild = parsedResponse[listkey]['guild']
                        let radiance = parsedResponse[listkey]['radiance']

                        listrespuesta += '\n Piloto: ' + listkey
                        listrespuesta += '     Personaje:' + personaje 
                        listrespuesta += '     Raza: ' + raza 
                        listrespuesta += '     Guild: ' + guild
                        listrespuesta += '     Radiance: ' + radiance
					    
                        table.push([listkey, personaje, raza, guild, radiance])
				    }

                    message.reply(listrespuesta + "```");
                    message.reply("```" + table.toString() + "```");
                });
            });
            listarequest.shouldKeepAlive = false
            break;
    
        case 'registrar':
            message.reply("Que partes de no funciona aun no entiendes pirobo? Que carajo acabas de decir sobre mi, pequenha perra? Te dire que me gradue como el mejor de mi clase en los Navy Seals, y he estado involucrado en numerosas incursiones secretas en Al-Quaeda, y tengo mas de 300 asesinatos confirmados. Estoy entrenado en la guerra de gorilas y soy el mejor francotirador de todas las fuerzas armadas de los Estados Unidos. Para mi no eres nada mas que otro objetivo. Te borrare con precision como nunca antes se habia visto en esta Tierra, marca mis malditas palabras.");
            
    }
});
            
           
bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
