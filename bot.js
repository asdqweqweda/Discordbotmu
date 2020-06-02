const qs = require("querystring");
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
                            \n- lista {evento (cs, arka, iwc)} // lista los participantes registrados para el evento \
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
                message.reply('Usa este formato: lista {evento (cs, arka, iwc)} ');
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

                    let table = new Table({
                        head: ['Piloto', 'Personaje', 'Guild', 'Raza', 'Radiance']
                      , colWidths: [15, 15, 10, 15, 15]
                    });

                    for(let listkey in parsedResponse) 
                    {                        
                        let personaje = parsedResponse[listkey]['personaje']
                        let raza = parsedResponse[listkey]['raza']
                        let guild = parsedResponse[listkey]['guild']
                        let radiance = parsedResponse[listkey]['radiance']
					    
                        table.push([listkey, personaje, guild, raza, radiance])
				    }
                    message.reply("```" + table.toString() + "```");
                });
            });
            listarequest.shouldKeepAlive = false
            break;
    
        case 'registrar':
         
            if (args.length < 6){
                console.log(args.length)
                message.reply('Usa este formato: registrar {evento (cs, arka, iwc)} {personaje} {raza} {radiance} {guild}');
                break
            }
            
            let tabla2 = ''

            let lista2 = args[1]
            if (lista2 === 'cs') tabla2 = 'aadfacd'
            else if (lista2 === 'arka') tabla2 = 'abbfdfe'
            else if (lista2 === 'iwc') tabla2 = 'adedaff'
            else{
                message.reply('Solo se permite registrar a cs, arka, o iwc ');
                break;
            }

            let sender2 = message.sender
            let personaje2 = args[2]
            let raza2 = args[3]
            let radiance2 = args[4]
            let guild2 = args[5]

            let options = {
                "method": "PATCH",
                "hostname": "extendsclass.com",
                "path": '/api/json-storage/bin/' + tabla2 + ''+'?stuff='+ Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                "headers": 
                { 
                    'security-key': 'JorgeEsGay',
                    'Cache-Control': 'no-cache, no-store'
                },
                "body":
                {
                    sender2: 
                    {
                        "personaje": personaje2,
                        "raza": raza2,
                        "guild": guild2,
                        "radiance": radiance2
                    }  
				}
            };
            let http2 = require('http');
            let req = http2.request(options, function (res) {

                let chunks = '';

                res.on("data", function (chunk) {
                    chunks += chunk;
                });

                res.on("end", function () {
                        let body2 = Buffer.concat(chunks);
                        console.log(body2)
                        message.reply("Inscrito al evento: " + lista2);
                });
            });
    }
});
            
           
bot.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
