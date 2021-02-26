///variaveis

const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const token = "TOKEN DO DISCORD";
const exec = require("child_process");

let ligado = true;

bot.login(token);

let posicao = ["Carry", "Mid", "Top", "Supp 4", "Supp 5"];
let foi = false;

//funções

function shuffle(){
        if (foi === false){
                posicao = ["Carry", "Mid", "Top", "Supp 4", "Supp 5"];
        }
}

function refaz(msg){
        //Refaz a lista de posições do Dota.
        if (msg.content==="$refaz"){
                foi = false;
                posicao = ["Carry", "Mid", "Top", "Supp 4", "Supp 5"];
                foi = true;
                msg.channel.send("A lista foi refeita.")
                setTimeout(function(){foi = false}, 300000);                
        }
}


function getPosicao(msg){
        //Responde uma posião aleatoria no Dota, se acabar as 5 responde coach e se invocado mais uma vez pede pra refazer a lista.
        if (msg.content === "$r"){
                msg.content = "$random"
        }
        if (posicao.length === 4){
                setTimeout(function(){shuffle()}, 300000);
                //console.log(tamanho);
        }
        if (msg.content === "$random" && posicao.length > 0){
                //console.log(posicao.length)
                let pos = Math.floor(Math.random()*posicao.length);
                msg.reply(posicao[pos]+ ". Oh no no ")
                msg.channel.send({files:["/home/ariel/Imagens/PL.gif"]});
                posicao.splice(pos, 1); 
                //console.log(posicao);
        }else{
                if (foi === false && msg.content === "$random"){
                        msg.reply("Coach")
                        msg.channel.send({files:["/home/ariel/Imagens/KEKL.png"]});
                        foi = true;
                }else{
                        if (foi === true && msg.content === "$random"){
                                msg.channel.send("Para embaralhar tudo dnv, escreva: $refaz")
                        }
                }
        }     

}



function jaaj(msg){
        //Auto explicativo
        if (msg.content === "chaach"){
                return msg.channel.send("Jooj");
        }
}

function responde(msg){
        if ((msg.author.discriminator === "####" || msg.author.discriminator === "####" || msg.author.discriminator === "####") && typeof msg.content === 'string' && ligado == true && msg.content.length > 7){
                let frase = [];
                let palavras = ''
                let tamanho = msg.content.length;
                for (i=0; i<tamanho;i++){
                        if(msg.content[i] != ' ' ){
                                palavras += msg.content[i] 

                        }else{
                                frase.push(palavras);
                                palavras = '';
                        }
                }
                frase.push(palavras)
                //console.log(frase);
                palavras = ''
                for(i=frase.length-1; i>-1; i--){
                        let ran = Math.floor(Math.random()*i)
                        palavras += frase[ran]+ ' '
                        frase.splice(ran, 1)
                        
                }
                console.log(palavras);
                msg.channel.send(palavras);
        }
}





function respondeP(msg){
        //Tem uma chance de mandar um weirdChamp pro Pelé.
        if (msg.author.discriminator === "####"){
                let num = Math.floor(Math.random() * 10);
                if(num == 1){
                        msg.channel.send({files:["/home/ariel/Imagens/wierdChamp.gif"]});
                }
        }
}

function weirdChamp(msg){
                if (msg.author.discriminator === "####" && msg.content === "$weird"){
                        msg.channel.send({files:["/home/ariel/Imagens/wierdChamp.gif"]});
                }
}


function respondeM(msg){
        //Responde a comandos de música do groove
        if(msg.content.startsWith("-p")){
                msg.channel.send({files:["/home/ariel/Imagens/3x.gif"]});

        }else{  
                if(msg.content.startsWith("-skip") || msg.content.startsWith("-dc")){
                        msg.channel.send({files: ["/home/ariel/Imagens/kekbye.gif"]});
                }       
        }
}

async function voiceChat(msg){
        if (msg.content.startsWith("entra") || msg.content === "sai"){
                if (!msg.member.voice.channel){
                        msg.channel.send("Vc não é ninguem")
                }else{
                        if (msg.content.startsWith('entra')){
                                msg.channel.send("Ok. Tocando a sua música favorita.")
                                const connection = await msg.member.voice.channel.join();
                                const dispatcher = connection.play('/home/ariel/Música/cw.mp3');
                                dispatcher.on('start', () => {
                                        console.log("Tá potente!")
                                })
                                dispatcher.on('finish', () => {
                                        console.log('audio.mp3 has finished playing!');
                                });
                                dispatcher.on('error', console.error);                                
                        }else{
                                msg.member.voice.channel.leave();
                        }
                }
        }
}

function botKick(msg){
        if(msg.content == "kick"){
                msg.channel.send("!disconnect")

        }
}

function feef(msg){
        if(msg.content === "$pato"){
               msg.channel.send({files: ["/home/ariel/Imagens/feef.png"]});
        }
}

function para(msg){
        //Faz o Buda Menor controlar o bot parando de responder a ele aleatoriamente.
        if (msg.author.discriminator === "####" && msg.content === "$vai" && ligado == true){
                ligado = false;
        }
}

function volta(msg){
        //Faz o Buda Menor controlar se o bot voltando a responder a ele aleatoriamente.
        if (msg.author.discriminator === "####" && msg.content === "$volta" && ligado == false){
                ligado = true;
        }
}

function posture(){
        //if (msg.content === "$start" || msg.content === "Posture check."){
        bot.channels.cache.get('##################').send("POSTURE CHECK");
        bot.channels.cache.get('##################').send("POSTURE CHECK");
        setTimeout(function(){posture();}, 360000);
        /*var postureDegenerates = bot.channels.cache.get('234151946913710080').send("POSTURE CHECK");/}, 50);*/
        //posture()
}

function test(msg){
        if (msg.content === "Teste" || msg.content === "$teste"){
                setTimeout(function(){ msg.channel.send("Teste")}, 1000);
        }
}

function tempo(msg){
        const cron = require("cron");
        let timeP = new cron.CronJob("00-59 00-59 00-23 * * *", posture(msg));
        timeP.start();
}

function dolarComercial(msg){
        if (msg.content === "$real"){
                exec.exec("curl -X GET https://economia.awesomeapi.com.br/json/USD-BRL -o /home/ariel/Documentos/budaMaior/moeda.json", (error, stdout, stderr)=>{
                        moeda = fs.readFileSync("/home/ariel/Documentos/budaMaior/moeda.json","utf-8");
                        moeda = JSON.parse(moeda)
                        if (error){
                                console.log("error: "+error.message)
                                return;
                        }else{
                                /*if (stderr){
                                        console.log("stderr: "+stderr)
                                        return;
                                }*/
                                msg.channel.send("O Dolar tá R$"+parseFloat(moeda[0].high).toFixed(2).toString().replace('.',','));
                                msg.channel.send({files: ["/home/ariel/Imagens/sadKEK.png"]})
                                /*var d = parseFloat(dolar[0].high)
                                console.log(d)
                                var d = d.toFixed(2)
                                msg.channel.send("O Dolar tá R$"+d.toString().replace('.',',')+".")
                                msg.channel.send({files: ["/home/ariel/Imagens/sadKEK.png"]})*/
                        }
                });
        }
}

//BOT


/*bot.on("ready", function(){ 
        posture();
         
});*/

bot.on("message", function(msg){
        para(msg); 
        volta(msg);
        jaaj(msg);      //auto explicativo
        responde(msg);
        voiceChat(msg);
        //botKick(msg);
        respondeM(msg);
        respondeP(msg);
        getPosicao(msg);
        weirdChamp(msg);
        refaz(msg);
        test(msg);      //Testa algo aleatório
        feef(msg);      //RIP pato
        dolarComercial(msg)
        //}
})
