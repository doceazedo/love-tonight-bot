import * as tmi from 'tmi.js';
import dotenv from 'dotenv';
dotenv.config();

let didPlay = false;
const keywords = ['tocou', 'love', 'tonight'];
const trueMsg = 'sim, já tocou Love tonight hoje!!!1! 😎👍';
const falseMsg = 'ainda não tocou Love Tonight hoje 😭';

const client = new tmi.Client({
  identity: {
    username: process.env.TWITCH_USERNAME,
    password: `oauth:${process.env.TWITCH_OAUTH}`
  },
  channels: [ 'moniquelive' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  if (self) return;

  if (tags.username == 'moniquelive_bot' && message.toLowerCase().startsWith('shouse - love tonight')) {
    didPlay = true;
    client.say(channel, 'Atenção, @doceazedo911! Está tocando Love Tonight catJAM');
    client.say(channel, '!hino');
    return;
  }

  let keywordsFound = 0;
  message.toLowerCase().split(' ').forEach(word => {
    if (keywords.includes(word)) keywordsFound++;
  });
  if (keywordsFound < keywords.length) return;

  client.say(channel, `@${tags.username} ${didPlay ? trueMsg : falseMsg}`);
});