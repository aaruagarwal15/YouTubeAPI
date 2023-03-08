const express = require('express');
const refresh = require('../handlers/refreshHandler');
const constants = require('../utils/constants');
const route = require('../routes/routes');
const app = express();

route(app);

refresh.refreshDataHandler;
setInterval(refresh.refreshDataHandler, constants.REFRESH_INTERVAL * 1000);

// const jsonArray = [
//     {
//       videoId: 'Q1QfAT3SvU8',
//       title: 'NON PERDETE CODE VEIN sul PS Plus: la POTENTE LORE del SOULS di BANDAI',
//       description: 'Code Vein è un souls con elementi shonen dalla forte componente narrativa. Guardate questo video prima di iniziarlo, ora che è ...',
//       thumbnail: 'https://i.ytimg.com/vi/Q1QfAT3SvU8/hqdefault.jpg',
//       channelId: 'UCC9qCcyZQ2ul_A9hX-6Yxlw',
//       channelTitle: 'Everyeye',
//       publishTime: '2023-03-08T17:00:12Z'
//     },
//     {
//       videoId: 'CZye3b4df9w',
//       title: 'επιστροφη της Pump | use code ch1llys #ad 118/150 members !member !betcord',
//       description: 'INSTAGRAM : https://www.instagram.com/ch1llys/?hl=el TWITTER : https://twitter.com/ch1llys?lang=el TWITCH ...',
//       thumbnail: 'https://i.ytimg.com/vi/CZye3b4df9w/hqdefault.jpg',
//       channelId: 'UCEx6zMafDE6lQyNe6slGMag',
//       channelTitle: 'Ch1llys',
//       publishTime: '2023-03-08T16:06:43Z'
//     },
//     {
//       videoId: 'NKZiuR_r0RY',
//       title: 'Code with ChatGPT &amp; Whisper API',
//       description: '',
//       thumbnail: 'https://i.ytimg.com/vi/NKZiuR_r0RY/hqdefault.jpg',
//       channelId: 'UC4MZ7zUHb5eAxU75Dc_nqdQ',
//       channelTitle: 'Tiff In Tech',
//       publishTime: '2023-03-08T14:00:22Z'
//     },
//     {
//       videoId: 'ykqT2Ssj2CU',
//       title: 'How I Brainwashed Myself to Learn to Code',
//       description: 'MY FREE CLASS: How to Successfully Learn to Code and Become a Software Developer - A Step-by-Step Framework ...',
//       thumbnail: 'https://i.ytimg.com/vi/ykqT2Ssj2CU/hqdefault.jpg',
//       channelId: 'UCcJQ96WlEhJ0Ve0SLmU310Q',
//       channelTitle: 'Internet Made Coder',
//       publishTime: '2023-03-08T14:00:40Z'
//     }
// ]

// //const arrayOfArrays = jsonArray.map(obj => Object.values(obj));
// const arrayOfArrays = jsonArray.map(obj => [obj.videoId, obj.title, obj.description, obj.thumbnail, obj.channelId, obj.channelTitle,
//     new Date(obj.publishTime).toLocaleString('en-US', { timeZone: 'UTC', hour12: false }).replace(',', '').replaceAll('/','-')]);

// console.log(arrayOfArrays);

module.exports = app;
