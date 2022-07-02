const { Telegraf, Markup } = require('telegraf')


require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : ctx.message.from.username }!
Меня зовут GameAVSSS и я игровой БОТ)
Что бы сыграть, выбери в меню команду /game ! `))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('game', async(ctx) => {
    try{
        await ctx.replyWithHTML('<b>Игры</b>', Markup.  inlineKeyboard(
            [
              [Markup.button.callback('Змейка', 'btn-1' ), Markup.  button.callback('FlyBird', 'btn-2' )]
          ]
        )) 
    }catch(e){
    console.error(e)
    }
})

function addActionBot(name, src, text){
    bot.action(name, async(ctx) =>{
        try{
            await ctx.answerCbQuery()
            if(src !== false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        }catch(e){
            console.error(e)
        }
    } )
}

addActionBot('btn-1', './img/1.png', text.text)
addActionBot('btn-2', './img/2.jpg', text.text1)



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))