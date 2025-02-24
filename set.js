const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUJaNkNhMDJKcUVhUHp0dVg0N1FZekFFcWVpZnpMeHpQTmhwYjhCcTJHRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieklZcHRpSzlER2FJNmtCK2tncEpVZDhoYXZrbkJTaU95ZHdmcndNK0JCTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSm9CNHdkZ1RXV0pRNW1kWTRPUmhJUlU1YWE4bzdtRnpCRWVLek1IRjJJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvdFRGLysxM1dGNW95T3ZVUllLZ1BVQUh0QmVhWFZmQlUvRzEzUC9adGxNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVFRjNZVGdleCtTa0FWSmJCcUY4SGNvd3Z4N1BYeHpuNnhkbU9xcGZVMkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxZQjI0U3RZdzNUTzBBY1J1REdLWDBsa01hcEdQZ0xiR2doMjQzekxpMkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUVQamtPT1lFS2wyOS9JK05hbjVobXkxODlHTkp3Z2xGUXVYaVJWNk4wbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaDZ4aFRzYmpuTTh1K0dKcHAyeDVtZjdCV0RDRGU4aHNhSEpmR3FLZHFDbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhhS1FxdkRTWUZSV3VjWnRQa0E1Q1drQ0NMMGx2S3pTT3Z6MzliUkphajBBdUk2VXNwdWhMTUNvQWwxNEo0dFJzQko0bGJVUm8zNFRJamJqcWJhVmpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODgsImFkdlNlY3JldEtleSI6IkVXNUFGNE1jTXFCajNpakI2bXFlZWxUMWVIc0tYcjVjVGtFcVg5UjVxZlE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IktpWUZ5YnJXUlVhUV9BOFNQMmZpTVEiLCJwaG9uZUlkIjoiZDdlYzFlOGMtZjBhNi00MTE2LWJiNjUtNDVhYjJlYzg1M2QzIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhUEN1Z002SEd2U2xJR0tyRUQ4dWthV1lUbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJblE3cUs0cE5BVEpYc01ENU1LVGh4Z0FhQjQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWFFOMUpHQVgiLCJtZSI6eyJpZCI6IjkxNjkwOTk1MDU4Mjo0NkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3J6c2ZZQ0VNMlk4TDBHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNy8vQ2U3SElJZnNaSHJvSmVqMXkrMUlCK2J0VnAxMUx6cmpoRUpMM01DND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZTlWVjlsdmV5YWJmMDNsZWJpRTZzTjBGQzVsQ2tURGZZUnk5L1pCQ3ljS2Y5c0dQTW16bml6YWxDM0pxd3hkUUFENEplcGNYMUxuVnpDTEs5NE9KQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6InpQVHY0d0FaOW5zRlA2bktsU01qM1kvZnVBZWhySXNPQVloWklsUDlic0RVeWMwc2x3SWwzb2ZVT2htRGtGV3poT2xueUlCSEVabkFjYVAxeTFucGlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE2OTA5OTUwNTgyOjQ2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmUvL3dudXh5Q0g3R1I2NkNYbzljdnRTQWZtN1ZhZGRTODY0NFJDUzl6QXUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDAzNzcxNzh9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/rdx690/ALONE-MD',
    OWNER_NAME : process.env.OWNER_NAME || "SOURAJIT-AI",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "916909950582",  
    ANTI_LINK : process.env.ANTI_LINK || "yes",
    ANTI_BAD : process.env.ANTI_BAD || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "no",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',             
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "yes",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    WEBSITE :process.env.URL || "https://files.catbox.moe/y16skc.jpg",
    CAPTION : process.env.CAPTION || "ALONE-MD",
    BOT : process.env.BOT_NAME || 'ALONE_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/y16skc.jpg',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
                  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
