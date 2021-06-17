export default class {
	constructor() {
		this.name = 'Wooden Axe';
		this.level = 1;
		this.damage = 27;
		this.location = 'bag'; // this should allow for bags, equipped, trash, etc
	}

	sell() {
		const value = Math.ceil(this.level * 12.5);

		console.log(`selling item ${this.name} for ${value} gold`);
	}

	upgrade() {
		this.level += 1;
		this.damage = Math.ceil(this.damage * 1.1);

		console.log(`upgrading item ${this.name} to level ${this.level}`);
	}
}
