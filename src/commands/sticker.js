const moment = require("moment-timezone")
const fs = require("fs")
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const { exec } = require("child_process")
const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

module.exports = async (bot, message, args, from) => {
    const image = await bot.downloadAndSaveMediaMessage(message)
    exec('cwebp -q 50 ' + image + ' -o trash/' + time + '.webp', (error, stdout, stderr) => {
        let result = fs.readFileSync('trash/' + time + '.webp')
        bot.sendMessage(from, result, sticker, { quoted: message })
    })
};