import * as tmi from 'tmi.js';
import dotenv from 'dotenv';
dotenv.config();

let didPlay = false;
let requested = false;
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
    setTimeout(() => client.say(channel, '!hino'), 1500);
    return;
  }

  let keywordsFound = 0;
  message.toLowerCase().split(' ').forEach(word => {
    if (keywords.includes(word)) keywordsFound++;
  });
  if (keywordsFound < keywords.length) return;

  client.say(channel, `@${tags.username} ${didPlay ? trueMsg : falseMsg} ${!didPlay && !requested ? '(mas jaja toca! 🤫)' : ''}`);
  if (!didPlay && !requested) {
    requested = true;
    setTimeout(() => {
      client.say(channel, '!sr https://open.spotify.com/track/6OufwUcCqo81guU2jAlDVP?si=2b1947f7d8124b7d');
    }, 2000);
  }
});

// setTimeout(() => {
//   client.say('moniquelive', '⬛ ⬛ ⬛ ⬛ gopherPls ⬛ ⬛ ⬛ ⬛');
//   setTimeout(() => {
//     client.say('moniquelive', '⬛ ⬛ ⬛ gopherPls gopherPls gopherPls ⬛ ⬛ ⬛');
//     setTimeout(() => {
//       client.say('moniquelive', '⬛ ⬛ gopherPls gopherPls gopherPls gopherPls gopherPls ⬛ ⬛');
//       setTimeout(() => {
//         client.say('moniquelive', '⬛ gopherPls gopherPls gopherPls gopherPls gopherPls gopherPls gopherPls ⬛');
//         setTimeout(() => {
//           client.say('moniquelive', 'gopherPls gopherPls gopherPls gopherPls gopherPls gopherPls gopherPls gopherPls gopherPls');
//         }, 1100);
//       }, 1100);
//     }, 1100);
//   }, 1100);
// }, 2000);

// setTimeout(() => {
//   client.say('moniquelive', '!xo');
// }, 2000);