import { rarities, affixes } from '../constants/constants';

const upgradeitem = (theitem, player) => {
	const upgraderarity = Math.floor(Math.random() * rarities.length);
	const updatedItem = theitem;

	if (theitem.upgrade.level < 5 && player.gold > theitem.level * 5) {
		// TODO: see below, the player/gold/cost change should be handled elsewhere
		player.gold -= theitem.level * 5;

		const randomupgradestat = Math.floor(Math.random() * affixes.length);
		const upgradestatamount = Math.floor(((upgraderarity + 1) * (theitem.level * affixes[randomupgradestat][2])) / 5);
		const maxupgradestatamount = Math.floor((5 * (theitem.level * affixes[randomupgradestat][2])) / 5);
		const upgradestatrarity = rarities[upgraderarity];

		updatedItem.upgrade.stats[affixes[randomupgradestat][0]] = [
			upgradestatamount,
			maxupgradestatamount,
			upgradestatrarity,
		];
		updatedItem.upgrade.level++;

		// countitemstats
		affixes.forEach((affix) => {
			updatedItem.totalstats[affix[0]] = theitem.stats[affix[0]][0] + theitem.upgrade.stats[affix[0]][0];
		});
	}

	// TODO: return item and cost
	return updatedItem;
};

export default upgradeitem;
