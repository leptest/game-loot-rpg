export default class {
	constructor() {
		this.name = 'Danny Mon Tanny';
		this.level = 1;
		this.experience = 0;
		this.health = 182;
		this.strength = 4;

		this.slots = [];
	}

	equip(item) {
		this.slots.push(item);

		console.log('character: ', this);
	}
}

// // easy leveling function
// export const checkexp = ((player) => {
// 	const el = document.querySelectorAll('#level')[0];
//
// 	if (player.experience > 3 * player.level) {
// 		player.experience = 0;
// 		player.level++;
// 	}
// 	// $('#bosssummons').text(`Boss Summons: ${player.summons}`);
// 	el.textContent = `Level: ${player.level}`;
// });
