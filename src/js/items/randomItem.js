import {
	affixnames, itemslotnames, slotplayernames, rarities, affixes, iconnumbers,
} from '../constants/constants';

// now generate the item
const randomItem = (slot, bossLevel) => {
	console.log('randomItem()');

	const randomaffix = Math.floor(Math.random() * affixnames.length);
	const affixnumber = Math.floor(Math.random() * rarities.length) + 1;

	let itemname = '';
	let itemslot = 0;
	let generateditem = {};
	let itemrarity;
	let randomstat;
	let usedstats = [];
	let itempicturenum;

	for (let i = 0; i < affixnumber; i++) {
		if (i === 0) {
			generateditem = {};
			usedstats = [];
			itemname = `${itemslotnames[slot - 1]} of ${affixnames[randomaffix]}`;
			itemslot = slotplayernames[slot - 1];
			itemrarity = rarities[affixnumber - 1];

			generateditem.name = itemname;
			generateditem.slot = itemslot;
			generateditem.stats = {};
			generateditem.rarity = itemrarity;
			generateditem.value = affixnumber * bossLevel;
			generateditem.upgrade = {};
			generateditem.upgrade.level = 0;
			generateditem.upgrade.stats = {};
			generateditem.level = bossLevel;
			generateditem.totalstats = {};

			// this generates all possible stats so there's no need for undefined checks and makes calculation easier
			affixes.forEach((item) => {
				generateditem.totalstats[item[0]] = 0;
				generateditem.stats[item[0]] = [0, 0, 0];
				generateditem.upgrade.stats[item[0]] = [0, 0, 0];
			});

			itempicturenum = iconnumbers[itemslot];
			const randompicturenum = Math.floor(Math.random() * itempicturenum) + 1;
			generateditem.icon = `${itemslot.toString()}-${randompicturenum.toString()}`;
		}

		randomstat = Math.floor(Math.random() * affixes.length);
		while (usedstats.indexOf(randomstat) !== -1) {
			randomstat = Math.floor(Math.random() * affixes.length);
		}
		usedstats.push(randomstat);

		const statnumber = Math.floor(Math.random() * (affixes[randomstat][1] + affixes[randomstat][2] * bossLevel));
		const statmax = affixes[randomstat][1] + affixes[randomstat][2] * bossLevel;

		let statcolor = 'Common';
		if (statnumber > statmax * 0.2) {
			statcolor = 'Magic';
		}
		if (statnumber > statmax * 0.4) {
			statcolor = 'Rare';
		}
		if (statnumber > statmax * 0.6) {
			statcolor = 'Epic';
		}
		if (statnumber > statmax * 0.8) {
			statcolor = 'Legendary';
		}

		// we finalize the item stats here
		generateditem.stats[affixes[randomstat][0]] = [statnumber, statmax, statcolor];
		generateditem.totalstats[affixes[randomstat][0]] = statnumber;
	}

	return generateditem;
};

export default randomItem;
