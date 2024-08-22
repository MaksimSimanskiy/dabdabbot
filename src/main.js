import {Telegraf,Markup} from 'telegraf';
const token = '7158053419:AAGYXDTevDzsCPfL7_YZAqzN5dcLXsT3E3M';
const webAppUrl = 'https://dabdab-dcda2.web.app';
const bot = new Telegraf(token);
bot.command('start',(ctx)=>{
ctx.reply(
    'Добро пожаловать! Нажмите на кнопку чтобы запустить приложение'
)
});
bot.launch();