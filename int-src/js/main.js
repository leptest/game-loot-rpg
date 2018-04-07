require('modernizr'); // Custom Modernizr build handled by a webpack plugin.

// import jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;

/* global jQuery */

import { mainNavInit } from './components/mainNavModule';

document.addEventListener('DOMContentLoaded', function() {
	mainNavInit();
});

$(document).ready(function() {
	let player = {
		level: 1,
		gold: 0,
		experience: 0,
		summons: 30,
		summonbosscounter: 0,
		summoninterval: 10000,
		bosslevel: 1,

		head: {},
		chest: {},
		leg: {},
		boot: {},
		ring: {},
		talisman: {},
		necklace: {},
		weapon: {},
		wrist: {},
		shoulder: {},
		book: {},
		glove: {},

		totalHealth: 0,
		totalMana: 0,
		totalDodge: 0,
		totalMagicPow: 0,
		totalDamage: 0,
		totalIceDMG: 0,
		totalFireDMG: 0,
		totalStormDMG: 0,
		totalCritical: 0,
		totalBloodDMG: 0,
		totalShadowDMG: 0,
		totalNatureDMG: 0,
		totalHealPow: 0,
		totalLifesteal: 0,

		basicattackcooldown: false,
		iceboltcooldown: false,
		fireboltcooldown: false,
		stormboltcooldown: false,
		shadowboltcooldown: false,
		thornscooldown: false,
		bloodstrikecooldown: false,
		healcooldown: false,
		shieldcooldown: false,
		buffmagiccooldown: false,
		naturehealcooldown: false,
		manarestorecooldown: false,

		icebuffcooldown: false,
		firebuffcooldown: false,
		stormbuffcooldown: false,
		shadowbuffcooldown: false,
		bloodsapcooldown: false,
		healwingscooldown: false,
		helmetcooldown: false,
		attackbuffcooldown: false,
		magebuffcooldown: false,
		lotuscooldown: false,
		magicattackcooldown: false,
		defensehealcooldown: false,

		buffHealth: 0,
		buffMana: 0,
		buffDodge: 0,
		buffMagicPow: 0,
		buffDamage: 0,
		buffIceDMG: 0,
		buffFireDMG: 0,
		buffStormDMG: 0,
		buffBloodDMG: 0,
		buffCritical: 0,
		buffShadowDMG: 0,
		buffNatureDMG: 0,
		buffHealPow: 0,
		buffLifesteal: 0,

		nerfHealth: 0,
		nerfMana: 0,
		nerfDodge: 0,
		nerfMagicPow: 0,
		nerfDamage: 0,
		nerfIceDMG: 0,
		nerfFireDMG: 0,
		nerfStormDMG: 0,
		nerfBloodDMG: 0,
		nerfCritical: 0,
		nerfShadowDMG: 0,
		nerfNatureDMG: 0,
		nerfHealPow: 0,
		nerfLifesteal: 0
	};

	let Health = 200 * player.level + player.buffHealth + player.totalHealth - player.nerfHealth;
	let Mana = 100 * player.level + player.buffMana + player.totalMana - player.nerfMana;
	let Dodge = 5 * player.level + player.buffDodge + player.totalDodge - player.nerfDodge;
	let MagicPow = 10 * player.level + player.buffMagicPow + player.totalMagicPow - player.nerfMagicPow;
	let Damage = 10 * player.level + player.buffDamage + player.totalDamage - player.nerfDamage;
	let IceDMG = 5 * player.level + player.buffIceDMG + player.totalIceDMG - player.nerfIceDMG;
	let FireDMG = 5 * player.level + player.buffFireDMG + player.totalFireDMG - player.nerfFireDMG;
	let StormDMG = 5 * player.level + player.buffStormDMG + player.totalStormDMG - player.nerfStormDMG;
	let Critical = 1 + player.buffCritical + player.totalCritical - player.nerfCritical;
	let BloodDMG = 5 * player.level + player.buffBloodDMG + player.totalBloodDMG - player.nerfBloodDMG;
	let ShadowDMG = 5 * player.level + player.buffShadowDMG + player.totalShadowDMG - player.nerfShadowDMG;
	let NatureDMG = 5 * player.level + player.buffNatureDMG + player.totalNatureDMG - player.nerfNatureDMG;
	let HealPow = 5 * player.level + player.buffHealPow + player.totalHealPow - player.nerfHealPow;
	let Lifesteal = player.buffLifesteal + player.totalLifesteal - player.nerfLifesteal;

	let currentplayerhealth;
	let currentplayermana;
	let currentbosshealth;
	let currentbosslevel;

	let battle = false;
	let boss = {
		level: 1,
		health: this.level * 500 + Math.floor(this.level / 10 * 5000),
		damage: this.level * 15
	};

	let clickeditemid;
	let affixnames = [
		'Blindness',
		'Bravery',
		'Burning',
		'Burrowing',
		'Conjuration',
		'Darkness',
		'Dawn',
		'Death',
		'Deception',
		'Defense',
		'Deflection',
		'Delerium',
		'Desire',
		'Despair',
		'Destruction',
		'Domination',
		'Doom',
		'Dragonslaying',
		'Dreaming',
		'Durability',
		'Dusk',
		'Evocation',
		'Fire',
		'Flame',
		'Freezing',
		'Fury',
		'Glory',
		'Growth',
		'Healing',
		'Heroism',
		'Hope',
		'Horror',
		'Ice',
		'Illusion',
		'Impact',
		'Imprisonment',
		'Incineration',
		'Insanity',
		'Invulnerability',
		'Invisibility',
		'Justice',
		'Life',
		'Light',
		'Lightlessness',
		'Lightning',
		'Love',
		'Madness',
		'Malice',
		'Mercy',
		'Midnight',
		'Obedience',
		'Peace',
		'Petrification',
		'Piercing',
		'Planeswalking',
		'Prophecy',
		'Rage',
		'Resurrection',
		'Retribution',
		'Seeking',
		'Shadow',
		'Shadowbinding',
		'Shattering',
		'Shieldbreaking',
		'Shielding',
		'Shocking',
		'Siege',
		'Sightblinding',
		'Silence',
		'Smiting',
		'Solidity',
		'Soul',
		'Soulbinding',
		'Soulcutting',
		'Spellbreaking',
		'Starlight',
		'Stealth',
		'Stonecutting',
		'Striking',
		'Sundering',
		'the Angel',
		'the Banshee',
		'the Centaur',
		'the Demon',
		'the Desert',
		'the Dragon',
		'the Dwarf',
		'the Elf',
		'the Elements',
		'the Fairie',
		'the Gargoyle',
		'the Genie',
		'the Ghost',
		'the Ghoul',
		'the Giant',
		'the Gnome',
		'the Goblin',
		'the God',
		'the Gremlin',
		'the Gryphon',
		'the Homunculus',
		'the Lich',
		'the Mermaid',
		'the Monster',
		'the Ogre',
		'the Orc',
		'the Titan',
		'the Troll',
		'the Vampire',
		'the Werebeast',
		'the Werewolf',
		'the Wight',
		'Thought',
		'Townsaving',
		'Treachery',
		'True Sight',
		'Twilight',
		'Valor',
		'Vengeance',
		'Void',
		'Warding',
		'Wayfinding',
		'Weightlessness',
		'Wind',
		'Winter',
		'Wisdom',
		'Woundhealing'
	];
	let itemname = '';
	let itemslotnames = [
		'Talisman',
		'Helmet',
		'Ring',
		'Shoulders',
		'Chestplate',
		'Book',
		'Bracelet',
		'Leggings',
		'Gloves',
		'Weapon',
		'Boots',
		'Necklace'
	];
	let slotplayernames = [
		'talisman',
		'head',
		'ring',
		'shoulder',
		'chest',
		'book',
		'wrist',
		'leg',
		'glove',
		'weapon',
		'boot',
		'necklace'
	];
	let itemslot = 0;
	let generateditem = {};
	let rarities = ['Common', 'Magic', 'Rare', 'Epic', 'Legendary'];
	let itemrarity;
	// affixes : name > starting stat > stat per level
	let affixes = [
		['Health', 15, 15],
		['Mana', 15, 15],
		['Dodge', 7, 0],
		['Critical', 10, 0],
		['Damage', 5, 5],
		['MagicPow', 7, 7],
		['ShadowDMG', 10, 10],
		['NatureDMG', 10, 10],
		['IceDMG', 10, 10],
		['FireDMG', 10, 10],
		['BloodDMG', 10, 10],
		['StormDMG', 10, 10],
		['HealPow', 7, 7],
		['Lifesteal', 6, 6]
	];
	let randomstat;
	let usedstats = [];
	let itempicturenum;
	let iconnumbers = {
		head: 5,
		chest: 17,
		leg: 7,
		boot: 10,
		ring: 11,
		talisman: 23,
		weapon: 56,
		wrist: 13,
		shoulder: 10,
		book: 11,
		glove: 11,
		necklace: 7
	};

	let inventory = {
		i1: {},
		i2: {},
		i3: {},
		i4: {},
		i5: {},
		i6: {},
		i7: {},
		i8: {},
		i9: {},
		i10: {},
		i11: {},
		i12: {},
		i13: {},
		i14: {},
		i15: {},
		i16: {},
		i17: {},
		i18: {},
		i19: {},
		i20: {},
		i21: {},
		i22: {},
		i23: {},
		i24: {},
		i25: {},
		i26: {},
		i27: {}
	};

	let mouseX;
	let mouseY;
	$(document).mousemove(function(e) {
		mouseX = e.pageX;
		mouseY = e.pageY;
	});

	function playerattack(object) {
		countplayerstats();
		updatespells();

		let i = 0;

		function resetcooldown() {
			player[object.namefunction + 'cooldown'] = false;
			$(object.nameid).removeClass('oncooldown');
		}

		function f() {
			if (
				player[object.namefunction + 'cooldown'] === false &&
				currentplayermana >= object.manacost &&
				battle === true
			) {
				player[object.namefunction + 'cooldown'] = true;

				// 0 means 1 spell use per battle
				useattack();
				if (object.cooldown !== 0) {
					setTimeout(resetcooldown, object.cooldown, object.namefunction);
				}
			}

			function removebuff() {
				player[object.buffname] = 0;
			}

			function useattack() {
				if (object.buffamount !== 0 && i === 0) {
					player[object.buffname] = object.buffamount;
					let classname = object.buffname.replace('buff', '');
					$('#rightinfo').prepend(
						`<p class="${classname}">${object.buffname.replace('buff', '')} buffed: ${
							object.buffamount
						}</p>`
					);
					if (object.buffduration !== 0) {
						setTimeout(removebuff, object.buffduration);
					}
				}

				if (object.damage > 0) {
					let critroll = Math.floor(Math.random() * (100 - Critical)) + 1;
					let ifcrit = ' does ';

					if (critroll < Critical) {
						object.damage = object.damage * 2;
						ifcrit = ' CRITS for';
					}
					currentbosshealth = currentbosshealth - object.damage;
					if (object.namefunction !== 'basicattack') {
						$('#rightinfo').prepend(`<p>${object.nameplayer} ${ifcrit} : ${object.damage} DMG! </p>`);
					}
				}

				if (object.spellfunction !== undefined) {
					object.spellfunction();
				}
				if (object.manacost > 0) {
					currentplayermana = currentplayermana - object.manacost;
				}

				if (object.healthcost > 0) {
					currentplayerhealth = currentplayerhealth - object.healthcost;
				}

				if (object.manarestore > 0) {
					currentplayermana = currentplayermana + object.manarestore;
					if (object.namefunction !== 'basicattack') {
						$('#rightinfo').prepend('<p>You restore: ' + object.manarestore + ' Mana!');
					}
				}

				if (object.healthrestore > 0) {
					currentplayerhealth = currentplayerhealth + object.healthrestore;
					if (object.namefunction !== 'basicattack') {
						$('#rightinfo').prepend('<p>You restore: ' + object.healthrestore + ' Health!');
					}
				}

				i++;
				if (i < object.repeat) {
					setTimeout(useattack, object.delay);
				}
			}
		}
		if (
			player[object.namefunction + 'cooldown'] === false &&
			currentplayermana >= object.manacost &&
			battle === true
		) {
			$(object.nameid).addClass('oncooldown');
			setTimeout(f, object.delay);
		}
	}

	let spellobject;

	function updatespells() {
		spellobject = {
			basicattack: {
				nameplayer: 'Attack',
				namefunction: 'basicattack',
				nameid: '.-basic',
				damage: Damage,
				manacost: 0,
				healthcost: 0,
				manarestore: Math.floor(Mana / 10),
				healthrestore: Math.floor(Lifesteal / 4),
				repeat: 0,
				delay: 0,
				buffname: 0,
				buffamount: 0,
				cooldown: 2000
			},

			icebolt: {
				nameplayer: 'Icebolt',
				namefunction: 'icebolt',
				nameid: '#icebolt',
				damage: Math.floor(Damage / 2 + IceDMG + MagicPow / 2),
				manacost: boss.level * 15,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 0,
				buffamount: 0,
				cooldown: 5000
			},

			firebolt: {
				nameplayer: 'Firebolt',
				namefunction: 'firebolt',
				nameid: '#firebolt',
				damage: Math.floor(Damage / 2 + FireDMG + MagicPow / 2),
				manacost: boss.level * 15,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 0,
				buffamount: 0,
				cooldown: 5000
			},

			stormbolt: {
				nameplayer: 'Stormbolt',
				namefunction: 'stormbolt',
				nameid: '#stormbolt',
				damage: Math.floor(Damage / 2 + StormDMG + MagicPow / 2),
				manacost: boss.level * 15,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 0,
				buffamount: 0,
				cooldown: 5000
			},

			shadowbolt: {
				nameplayer: 'Shadowbolt',
				namefunction: 'shadowbolt',
				nameid: '#shadowbolt',
				damage: Math.floor(Damage / 2 + ShadowDMG + MagicPow / 2),
				manacost: boss.level * 15,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 2000,
				buffname: 0,
				buffamount: 0,
				cooldown: 5000
			},

			bloodstrike: {
				nameplayer: 'Bloodstrike',
				namefunction: 'bloodstrike',
				nameid: '#bloodstrike',
				damage: Math.floor(BloodDMG + Damage),
				manacost: boss.level * 5,
				healthcost: boss.level * 30,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffLifesteal',
				buffamount: Math.floor(BloodDMG / 2),
				cooldown: 5000
			},

			thorns: {
				nameplayer: 'Thorns',
				namefunction: 'thorns',
				nameid: '#thorns',
				damage: Math.floor(Damage / 6 + NatureDMG / 3 + MagicPow / 6),
				manacost: boss.level * 4,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 3,
				delay: 1000,
				buffname: 0,
				buffamount: 0,
				cooldown: 5000
			},

			natureheal: {
				nameplayer: 'Natureheal',
				namefunction: 'natureheal',
				nameid: '#natureheal',
				damage: 0,
				manacost: boss.level * 5,
				healthcost: 0,
				manarestore: 0,
				healthrestore: Math.floor(NatureDMG / 4),
				repeat: 3,
				delay: 1000,
				buffname: 'buffNatureDMG',
				buffamount: Math.floor(NatureDMG),
				buffduration: 5000,
				cooldown: 10000
			},

			heal: {
				nameplayer: 'Heal',
				namefunction: 'heal',
				nameid: '#heal',
				damage: 0,
				manacost: boss.level * 4,
				healthcost: 0,
				manarestore: 0,
				healthrestore: HealPow * 2,
				repeat: 0,
				delay: 0,
				buffname: 0,
				buffamount: 0,
				cooldown: 10000
			},

			shield: {
				nameplayer: 'Shield',
				namefunction: 'shield',
				nameid: '#shield',
				damage: 0,
				manacost: boss.level * 15,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffDodge',
				buffamount: 100,
				cooldown: 10000,
				buffduration: 5000
			},

			manarestore: {
				nameplayer: 'Manarestore',
				namefunction: 'manarestore',
				nameid: '#manarestore',
				damage: 0,
				manacost: 0,
				healthcost: 0,
				manarestore: Math.floor(MagicPow / 2),
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 0,
				buffamount: 0,
				cooldown: 10000
			},

			lotus: {
				nameplayer: 'Lotus',
				namefunction: 'lotus',
				nameid: '#lotus',
				damage: 0,
				manacost: 0,
				healthcost: 0,
				manarestore: Math.floor(MagicPow / 2),
				healthrestore: 0,
				repeat: 5,
				delay: 1000,
				buffname: 0,
				buffamount: 0,
				cooldown: 0
			},

			buffmagic: {
				nameplayer: 'Magic Bottle',
				namefunction: 'buffmagic',
				nameid: '#buffmagic',
				damage: 0,
				manacost: boss.level * 25,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffMagicPow',
				buffamount: Math.floor(MagicPow / 2),
				cooldown: 10000,
				buffduration: 5000
			},

			icebuff: {
				nameplayer: 'Ice Mask',
				namefunction: 'icebuff',
				nameid: '#icebuff',
				damage: Math.floor(IceDMG / 2),
				manacost: boss.level * 10,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffIceDMG',
				buffamount: Math.floor(IceDMG),
				cooldown: 10000,
				buffduration: 5000
			},

			firebuff: {
				nameplayer: 'Hand of Fire',
				namefunction: 'firebuff',
				nameid: '#firebuff',
				damage: Math.floor(FireDMG / 2),
				manacost: boss.level * 10,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffFireDMG',
				buffamount: Math.floor(FireDMG),
				cooldown: 10000,
				buffduration: 5000
			},

			shadowbuff: {
				nameplayer: 'Eye of Shadow',
				namefunction: 'shadowbuff',
				nameid: '#shadowbuff',
				damage: Math.floor(ShadowDMG / 2),
				manacost: boss.level * 10,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffShadowDMG',
				buffamount: Math.floor(ShadowDMG),
				cooldown: 10000,
				buffduration: 5000
			},

			stormbuff: {
				nameplayer: 'Tree of Storm',
				namefunction: 'stormbuff',
				nameid: '#stormbuff',
				damage: Math.floor(StormDMG / 2),
				manacost: boss.level * 10,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffStormDMG',
				buffamount: Math.floor(StormDMG),
				cooldown: 10000,
				buffduration: 5000
			},

			magebuff: {
				nameplayer: 'Mage Burst',
				namefunction: 'magebuff',
				nameid: '#magebuff',
				damage: Math.floor(MagicPow / 2),
				manacost: Math.floor(currentplayermana / 2),
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffMagicPow',
				buffamount: Math.floor(MagicPow / 2),
				cooldown: 10000,
				buffduration: 10000
			},

			bloodsap: {
				nameplayer: 'Blood Sap',
				namefunction: 'bloodsap',
				nameid: '#bloodsap',
				damage: Math.floor(BloodDMG / 3),
				manacost: 0,
				healthcost: Math.floor(Health / 4),
				manarestore: 0,
				healthrestore: Math.floor(BloodDMG / 3),
				repeat: 3,
				delay: 1000,
				buffname: 'buffBloodDMG',
				buffamount: Math.floor(BloodDMG),
				cooldown: 10000,
				buffduration: 5000
			},

			healwings: {
				nameplayer: 'Heal Wings',
				namefunction: 'healwings',
				nameid: '#healwings',
				damage: 0,
				manacost: Math.floor(Mana / 10),
				healthcost: 0,
				manarestore: 0,
				healthrestore: HealPow,
				repeat: 5,
				delay: 800,
				buffname: 0,
				buffamount: 0,
				cooldown: 10000
			},

			defenseheal: {
				nameplayer: 'Palace of Gods',
				namefunction: 'defenseheal',
				nameid: '#defenseheal',
				damage: 0,
				manacost: boss.level * 7,
				healthcost: 0,
				manarestore: 0,
				healthrestore: Math.floor(HealPow / 2),
				repeat: 3,
				delay: 1000,
				buffname: 'buffDodge',
				buffamount: 30,
				buffduration: 4000,
				cooldown: 10000
			},

			attackbuff: {
				nameplayer: 'Damage Buff',
				namefunction: 'attackbuff',
				nameid: '#attackbuff',
				damage: 0,
				manacost: boss.level * 15,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffDamage',
				buffamount: Math.floor(Damage),
				cooldown: 10000,
				buffduration: 10000
			},

			helmet: {
				nameplayer: 'Vigor Of Vikings',
				namefunction: 'helmet',
				nameid: '#helmet',
				damage: 0,
				manacost: boss.level * 15,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 'buffHealth',
				buffamount: Math.floor(Mana / 2),
				cooldown: 10000,
				buffduration: 0
			},

			magicattack: {
				nameplayer: 'Finger Bolt',
				namefunction: 'magicattack',
				nameid: '#magicattack',
				damage: MagicPow,
				manacost: boss.level * 10,
				healthcost: 0,
				manarestore: 0,
				healthrestore: 0,
				repeat: 0,
				delay: 0,
				buffname: 0,
				buffamount: 0,
				cooldown: 7000,
				buffduration: 0
			}
		};
	}

	updatespells();

	$('#magicattack').click(function() {
		playerattack(spellobject.magicattack);
	});
	$('#helmet').click(function() {
		playerattack(spellobject.helmet);
	});
	$('#defenseheal').click(function() {
		playerattack(spellobject.defenseheal);
	});
	$('#attackbuff').click(function() {
		playerattack(spellobject.attackbuff);
	});
	$('#lotus').click(function() {
		playerattack(spellobject.lotus);
	});
	$('#healwings').click(function() {
		playerattack(spellobject.healwings);
	});
	$('#bloodsap').click(function() {
		playerattack(spellobject.bloodsap);
	});
	$('#magebuff').click(function() {
		playerattack(spellobject.magebuff);
	});
	$('#shadowbuff').click(function() {
		playerattack(spellobject.shadowbuff);
	});
	$('#stormbuff').click(function() {
		playerattack(spellobject.stormbuff);
	});
	$('#firebuff').click(function() {
		playerattack(spellobject.firebuff);
	});
	$('#icebuff').click(function() {
		playerattack(spellobject.icebuff);
	});

	$('#icebolt').click(function() {
		playerattack(spellobject.icebolt);
	});
	$('#firebolt').click(function() {
		playerattack(spellobject.firebolt);
	});
	$('#stormbolt').click(function() {
		playerattack(spellobject.stormbolt);
	});
	$('#thorns').click(function() {
		playerattack(spellobject.thorns);
	});
	$('#shadowbolt').click(function() {
		playerattack(spellobject.shadowbolt);
	});
	$('#heal').click(function() {
		playerattack(spellobject.heal);
	});
	$('#natureheal').click(function() {
		playerattack(spellobject.natureheal);
	});
	$('#manarestore').click(function() {
		playerattack(spellobject.manarestore);
	});
	$('#bloodstrike').click(function() {
		playerattack(spellobject.bloodstrike);
	});
	$('#shield').click(function() {
		playerattack(spellobject.shield);
	});
	$('#buffmagic').click(function() {
		playerattack(spellobject.buffmagic);
	});
	$('.-basic').click(function() {
		playerattack(spellobject.basicattack);
	});

	// keyboard spell clicking support! Woo :D
	$('body').bind('keypress', function(event) {
		switch (event.keyCode) {
			case 49:
				$('.spell1').trigger('click');
			case 50:
				$('.spell2').trigger('click');
			case 51:
				$('.spell3').trigger('click');
			case 52:
				$('.spell4').trigger('click');
			case 53:
				$('.spell5').trigger('click');
			case 54:
				$('.spell6').trigger('click');
			case 55:
				$('.spell7').trigger('click');
			case 56:
				$('.spell8').trigger('click');
			case 57:
				$('.spell9').trigger('click');
		}

		switch (event.charCode) {
			case 49:
				$('.spell1').trigger('click');
			case 50:
				$('.spell2').trigger('click');
			case 51:
				$('.spell3').trigger('click');
			case 52:
				$('.spell4').trigger('click');
			case 53:
				$('.spell5').trigger('click');
			case 54:
				$('.spell6').trigger('click');
			case 55:
				$('.spell7').trigger('click');
			case 56:
				$('.spell8').trigger('click');
			case 57:
				$('.spell9').trigger('click');
		}
	});

	let autobasic1;
	$('#autobasic').click(function() {
		function autobasicatk() {
			$('.spell1').trigger('click');
		}
		autobasic1 = setInterval(autobasicatk, 300);
	});

	$('#manualauto').click(function() {
		clearInterval(autobasic1);
	});

	function displaystats() {
		$('#health').text(Math.floor(Health));
		$('#mana').text(Math.floor(Mana));
		$('#damage').text(Math.floor(Damage));
		$('#critical').text(Math.floor(Critical));
		$('#dodge').text(Math.floor(Dodge));
		$('#healpow').text(Math.floor(HealPow));
		$('#magicpow').text(Math.floor(MagicPow));
		$('#ice').text(Math.floor(IceDMG));
		$('#fire').text(Math.floor(FireDMG));
		$('#storm').text(Math.floor(StormDMG));
		$('#nature').text(Math.floor(NatureDMG));
		$('#shadow').text(Math.floor(ShadowDMG));
		$('#blood').text(Math.floor(BloodDMG));
		$('#lifesteal').text(Math.floor(Lifesteal));

		$('#gold').text('Gold: ' + Math.floor(player.gold));
		$('#level').text('Level: ' + player.level);
	}

	function countplayerstats() {
		player.totalHealth = 0;
		player.totalMana = 0;
		player.totalDodge = 0;
		player.totalMagicPow = 0;
		player.totalDamage = 0;
		player.totalIceDMG = 0;
		player.totalFireDMG = 0;
		player.totalStormDMG = 0;
		player.totalCritical = 0;
		player.totalBloodDMG = 0;
		player.totalShadowDMG = 0;
		player.totalNatureDMG = 0;
		player.totalHealPow = 0;
		player.totalLifesteal = 0;

		for (let d = 0; d < slotplayernames.length; d++) {
			if ($.isEmptyObject(player[slotplayernames[d]]) === false) {
				for (let f = 0; f < affixes.length; f++) {
					player['total' + affixes[f][0]] =
						player['total' + affixes[f][0]] + player[slotplayernames[d]]['totalstats'][affixes[f][0]];
				}
			}
		} // for loops d f

		Health = 200 * player.level + player.buffHealth + player.totalHealth - player.nerfHealth;
		Mana = 100 * player.level + player.buffMana + player.totalMana - player.nerfMana;
		Dodge = player.buffDodge + player.totalDodge - player.nerfDodge;
		MagicPow = 20 * player.level + player.buffMagicPow + player.totalMagicPow - player.nerfMagicPow;
		Damage = 10 * player.level + player.buffDamage + player.totalDamage - player.nerfDamage;
		IceDMG = 15 * player.level + player.buffIceDMG + player.totalIceDMG - player.nerfIceDMG;
		FireDMG = 15 * player.level + player.buffFireDMG + player.totalFireDMG - player.nerfFireDMG;
		StormDMG = 15 * player.level + player.buffStormDMG + player.totalStormDMG - player.nerfStormDMG;
		Critical = 1 + player.buffCritical + player.totalCritical - player.nerfCritical;
		BloodDMG = 15 * player.level + player.buffBloodDMG + player.totalBloodDMG - player.nerfBloodDMG;
		ShadowDMG = 15 * player.level + player.buffShadowDMG + player.totalShadowDMG - player.nerfShadowDMG;
		NatureDMG = 15 * player.level + player.buffNatureDMG + player.totalNatureDMG - player.nerfNatureDMG;
		HealPow = 15 * player.level + player.buffHealPow + player.totalHealPow - player.nerfHealPow;
		Lifesteal = 15 * player.level + player.buffLifesteal + player.totalLifesteal - player.nerfLifesteal;

		if (Dodge < 0) {
			Dodge = 0;
		}
		if (MagicPow < 0) {
			MagicPow = 0;
		}
		if (Damage < 0) {
			Damage = 0;
		}
		if (IceDMG < 0) {
			IceDMG = 0;
		}
		if (FireDMG < 0) {
			FireDMG = 0;
		}
		if (StormDMG < 0) {
			StormDMG = 0;
		}
		if (NatureDMG < 0) {
			NatureDMG = 0;
		}
		if (ShadowDMG < 0) {
			ShadowDMG = 0;
		}
		if (NatureDMG < 0) {
			NatureDMG = 0;
		}
		if (HealPow < 0) {
			HealPow = 0;
		}
		if (Critical < 0) {
			Critical = 0;
		}
		if (Lifesteal < 0) {
			Lifesteal = 0;
		}
		if (BloodDMG < 0) {
			BloodDMG = 0;
		}
		if (Mana < 0) {
			Mana = 0;
		}

		updatespells();
		displaystats();
	} // count stats function

	function upgradeitem() {
		let theitem = inventory[clickeditemid];
		let upgraderarity = Math.floor(Math.random() * rarities.length);

		if (theitem['upgrade']['level'] < 5 && player.gold > theitem['level'] * 5) {
			player.gold = player.gold - theitem['level'] * 5;

			let randomupgradestat = Math.floor(Math.random() * affixes.length);
			let upgradestatamount = Math.floor(
				(upgraderarity + 1) * (theitem.level * affixes[randomupgradestat][2]) / 5
			);
			let maxupgradestatamount = Math.floor(5 * (theitem.level * affixes[randomupgradestat][2]) / 5);
			let upgradestatrarity = rarities[upgraderarity];

			theitem.upgrade.stats[affixes[randomupgradestat][0]] = [
				upgradestatamount,
				maxupgradestatamount,
				upgradestatrarity
			];
			theitem.upgrade.level++;

			// countitemstats
			for (let i = 0; i < affixes.length; i++) {
				theitem.totalstats[affixes[i][0]] =
					theitem.stats[affixes[i][0]][0] + theitem.upgrade.stats[affixes[i][0]][0];
			}
		} // if upgrade level
	} // function upgrade

	function upgradeitemonchar() {
		let theitem = player[clickeditemid];
		let upgraderarity = Math.floor(Math.random() * rarities.length);

		if (theitem['upgrade']['level'] < 5 && player.gold > theitem['level'] * 5) {
			player.gold = player.gold - theitem['level'] * 5;

			let randomupgradestat = Math.floor(Math.random() * affixes.length);
			let upgradestatamount = Math.floor(
				(upgraderarity + 1) * (theitem.level * affixes[randomupgradestat][2]) / 5
			);
			let maxupgradestatamount = Math.floor(5 * (theitem.level * affixes[randomupgradestat][2]) / 5);
			let upgradestatrarity = rarities[upgraderarity];

			theitem.upgrade.stats[affixes[randomupgradestat][0]] = [
				upgradestatamount,
				maxupgradestatamount,
				upgradestatrarity
			];
			theitem.upgrade.level++;

			// countitemstats
			for (let i = 0; i < affixes.length; i++) {
				theitem.totalstats[affixes[i][0]] =
					theitem.stats[affixes[i][0]][0] + theitem.upgrade.stats[affixes[i][0]][0];
			}
		} // if upgrade level
	} // function upgrade

	$('#upgrade').click(function() {
		upgradeitem();
	});
	$('#upgradeitemonchar').click(function() {
		upgradeitemonchar();
	});

	function createitem(bossLevel) {
		// choose rarity, slot and affix for item
		let randomslot = Math.floor(Math.random() * 12) + 1;
		let randomaffix = Math.floor(Math.random() * affixnames.length);
		let affixnumber = Math.floor(Math.random() * rarities.length) + 1;
		usedstats = [];
		// now generate the item
		function randomitem(slot) {
			for (let i = 0; i < affixnumber; i++) {
				if (i === 0) {
					generateditem = {};
					usedstats = [];
					itemname = itemslotnames[slot - 1] + ' of ' + affixnames[randomaffix];
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
					for (let g = 0; g < affixes.length; g++) {
						generateditem.totalstats[affixes[g][0]] = 0;
						generateditem.stats[affixes[g][0]] = [0, 0, 0];
						generateditem.upgrade.stats[affixes[g][0]] = [0, 0, 0];
					}

					itempicturenum = iconnumbers[itemslot];
					let randompicturenum = Math.floor(Math.random() * itempicturenum) + 1;
					generateditem.icon = itemslot.toString() + '-' + randompicturenum.toString();
				}

				randomstat = Math.floor(Math.random() * affixes.length);
				while (usedstats.indexOf(randomstat) !== -1) {
					randomstat = Math.floor(Math.random() * affixes.length);
				}
				usedstats.push(randomstat);

				let statnumber = Math.floor(
					Math.random() * (affixes[randomstat][1] + affixes[randomstat][2] * bossLevel)
				);
				let statmax = affixes[randomstat][1] + affixes[randomstat][2] * bossLevel;

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
			let invcount, itemidcount, itemid, allclasses;

			// item done generating
			for (let f = 1; f < 29; f++) {
				invcount = 'i' + f;
				itemidcount = '#' + invcount;
				itemid = itemidcount + 'S';
				if (jQuery.isEmptyObject(inventory[invcount])) {
					allclasses = 'item sprite ' + generateditem.icon + ' ' + generateditem.rarity;
					$(itemidcount).append("<img id='" + itemid + "'class='" + allclasses + "' '></img>");
					f = 50;
					inventory[invcount] = generateditem;
				}
			}
		}

		// this choses item slot

		randomitem(randomslot);
	}

	// so right click doesn't fuck up my options menu
	document.oncontextmenu = function() {
		return false;
	};

	function addsummon() {
		player.summonbosscounter++;

		if (player.summonbosscounter > 5) {
			player.summonbosscounter = 0;
			player.summons++;

			$('#bosssummons').text(`Boss Summons: ${player.summons}`);
		}
	}

	// easy leveling function
	function checkexp() {
		if (player.experience > 3 * player.level) {
			player.experience = 0;
			player.level++;
		}

		$('#bosssummons').text(`Boss Summons: ${player.summons}`);
	}

	function bosslevelkilled(x) {
		player.bosslevel = x;

		console.log(player.bosslevel);
	}

	function startfight() {
		battle = true;

		$('#leftinfo').prepend('<p>Fight has started!</p>');

		player.basicattackcooldown = false;
		player.iceboltcooldown = false;
		player.fireboltcooldown = false;
		player.stormboltcooldown = false;
		player.shadowboltcooldown = false;
		player.thornscooldown = false;
		player.bloodstrikecooldown = false;
		player.healcooldown = false;
		player.shieldcooldown = false;
		player.buffmagiccooldown = false;
		player.naturehealcooldown = false;
		player.manarestorecooldown = false;

		player.icebuffcooldown = false;
		player.firebuffcooldown = false;
		player.stormbuffcooldown = false;
		player.shadowbuffcooldown = false;
		player.bloodsapcooldown = false;
		player.healwingscooldown = false;
		player.helmetcooldown = false;
		player.attackbuffcooldown = false;
		player.magebuffcooldown = false;
		player.lotuscooldown = false;
		player.magicattackcooldown = false;
		player.defensehealcooldown = false;

		$('.oncooldown').removeClass('oncooldown');

		resetplayerstats();
		let randombossname = Math.floor(Math.random() * 13) + 1;
		let bossname = 'boss' + randombossname + ' ' + ' mobsprites bosspic';
		let bosshitroll;

		// there is bonus every 25 levels so you have to stop and get better gear, this is to balance the game
		boss.health = boss.level * 50 + Math.floor(boss.level / 25) * 2000 + Math.floor(boss.level / 100) * 50000;
		boss.damage = boss.level * 20 + Math.floor(boss.level / 25) * 150 + Math.floor(boss.level / 100) * 250;

		currentbosshealth = boss.health;
		currentplayerhealth = Health;
		currentplayermana = Mana;

		let bossdamage = boss.damage;
		let bosscritdamage = boss.damage * 2;

		$('#boss').html("<img class='" + bossname + "' ></img>");
		$('#bosshptext').text(currentbosshealth + '/' + currentbosshealth);
		$('#bosshpbar').css('width', '100%');

		function updatehealthbar() {
			let barpercent = currentbosshealth / boss.health * 100;
			let playerhpbar = currentplayerhealth / Health * 100;
			let playermanabar = currentplayermana / Mana * 100;

			if (playerhpbar > 100) {
				playerhpbar = 100;
			}
			if (playermanabar > 100) {
				playermanabar = 100;
			}

			$('#bosshpbar').animate(
				{
					width: barpercent + '%'
				},
				'slow'
			);
			$('#bosshptext').text(currentbosshealth + '/' + boss.health);
			$('#playerhpbar').animate(
				{
					width: playerhpbar + '%'
				},
				'slow'
			);
			$('#playermanabar').animate(
				{
					width: playermanabar + '%'
				},
				'slow'
			);
		}

		function bossattack() {
			bossdamage = boss.damage;
			bosscritdamage = boss.damage * 5;
			bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

			function attackbasicplayer() {
				bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

				if (bosshitroll > Dodge) {
					$('#leftinfo').prepend('<p>Boss Attacks for: ' + bossdamage + ' DMG!' + '</p>');
					currentplayerhealth = currentplayerhealth - bossdamage;
				}
				if (bosshitroll < Dodge) {
					$('#leftinfo').prepend('<p>Boss Missed a basic attack.</p>');
				}
			}

			function critplayer() {
				bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

				if (bosshitroll > Dodge) {
					$('#leftinfo').prepend('<p>Boss CRITS for: ' + bosscritdamage + ' DMG!' + '</p>');
					currentplayerhealth = currentplayerhealth - bosscritdamage;
				}
				if (bosshitroll < Dodge) {
					$('#leftinfo').prepend('<p>Boss Missed the crit.</p>');
				}
			}

			function castHealPowreduce() {
				player.nerfHealPow = 999999991000;
				function HealPowreduceremove() {
					player.nerfHealPow = 0;
				}
				setTimeout(HealPowreduceremove, 10000);
				$('#leftinfo').prepend("<p  class='heal' > Boss Casts NERF HealPow!</p>");
			}

			function castIceDMGreduce() {
				player.nerfIceDMG = 999991000;
				function IceDMGreduceremove() {
					player.nerfIceDMG = 0;
				}
				setTimeout(IceDMGreduceremove, 10000);
				$('#leftinfo').prepend("<p  class='ice'> Boss Casts NERF IceDMG!</p>");
			}

			function castFireDMGreduce() {
				player.nerfFireDMG = 9999991000;
				function FireDMGreduceremove() {
					player.nerfFireDMG = 0;
				}
				setTimeout(FireDMGreduceremove, 10000);
				$('#leftinfo').prepend("<p  class='fire'> Boss Casts NERF FireDMG!</p>");
			}

			function castStormDMGreduce() {
				player.nerfStormDMG = 9999991000;
				function StormDMGreduceremove() {
					player.nerfStormDMG = 0;
				}
				setTimeout(StormDMGreduceremove, 10000);
				$('#leftinfo').prepend("<p  class='storm'> Boss Casts NERF StormDMG!</p>");
			}

			function castShadowDMGreduce() {
				player.nerfShadowDMG = 9999991000;
				function ShadowDMGreduceremove() {
					player.nerfShadowDMG = 0;
				}
				setTimeout(ShadowDMGreduceremove, 10000);
				$('#leftinfo').prepend("<p  class='shadow'> Boss Casts NERF ShadowDMG!</p>");
			}

			function castNatureDMGreduce() {
				player.nerfNatureDMG = 9999991000;
				function NatureDMGreduceremove() {
					player.nerfNatureDMG = 0;
				}
				setTimeout(NatureDMGreduceremove, 10000);
				$('#leftinfo').prepend("<p class='nature'> Boss Casts NERF NatureDMG!</p>");
			}

			function castBloodDMGreduce() {
				player.nerfBloodDMG = 9999991000;
				function BloodDMGreduceremove() {
					player.nerfBloodDMG = 0;
				}
				setTimeout(BloodDMGreduceremove, 10000);
				$('#leftinfo').prepend("<p class='danger'> Boss Casts NERF BloodDMG!</p>");
			}

			let bosschoosespell = Math.floor(Math.random() * 100);

			if (bosschoosespell < 10) {
				$('#leftinfo').prepend("<p class='danger'> CRITICAL INCOMING!</p>");
				setTimeout(critplayer, 3000);
			} else if (bosschoosespell < 12) {
				castBloodDMGreduce();
			} else if (bosschoosespell < 14) {
				castIceDMGreduce();
			} else if (bosschoosespell < 16) {
				castFireDMGreduce();
			} else if (bosschoosespell < 18) {
				castStormDMGreduce();
			} else if (bosschoosespell < 20) {
				castNatureDMGreduce();
			} else if (bosschoosespell < 22) {
				castHealPowreduce();
			} else if (bosschoosespell < 24) {
				castShadowDMGreduce();
			} else if (bosschoosespell < 101) {
				attackbasicplayer();
			}

			updatehealthbar();
		}

		function checkdeath() {
			if (currentbosshealth < 1) {
				currentbosslevel = boss.level;
				battle = false;
				clearInterval(bossattackInterval);
				clearInterval(checkdeathInterval);
				currentbosshealth = boss.health;
				createitem(currentbosslevel);
				createitem(currentbosslevel);
				resetplayerstats();
				countplayerstats();
				currentplayerhealth = Health;
				currentplayermana = Mana;
				currentplayerhealth = Health;
				updatehealthbar();
				player.experience++;
				bosslevelkilled(currentbosslevel);
			}

			if (currentplayerhealth < 1) {
				battle = false;
				clearInterval(bossattackInterval);
				clearInterval(checkdeathInterval);
				resetplayerstats();
				countplayerstats();
				currentplayerhealth = Health;
				currentplayermana = Mana;
				currentplayerhealth = Health;
				currentbosshealth = boss.health;
				updatehealthbar();
			}

			// so mana doesn't overflow..
			if (currentplayermana > Mana) {
				currentplayermana = Mana;
			}
			if (currentplayerhealth > Health) {
				currentplayerhealth = Health;
			}
			if (currentplayermana < 0) {
				currentplayermana = 0;
			}

			updatehealthbar();
		}

		let checkdeathInterval = setInterval(checkdeath, 1000);
		let bossattackInterval = setInterval(bossattack, 3000);
	}

	$('#summonfaster').click(function() {
		if (player.summoninterval - 10000 > 0) {
			player.summoninterval = player.summoninterval - 10000;
			$('#summons').text('1 spawn per: ' + Math.floor(player.summoninterval / 10000) + 'min');
		}
	});

	$('#summonslower').click(function() {
		player.summoninterval = player.summoninterval + 10000;
		$('#summons').text('1 spawn per: ' + Math.floor(player.summoninterval / 10000) + 'min');
	});

	$('#minus').click(function() {
		if (boss.level > 1 && battle !== true) {
			boss.level--;
			$('#bosslevel').text('LVL: ' + boss.level);
		}
	});

	$('#plus').click(function() {
		if (battle !== true) {
			boss.level++;
			$('#bosslevel').text('LVL: ' + boss.level);
		}
	});

	// inventory options
	$('.slot').mousedown(function(e) {
		if (e.button === 2) {
			clickeditemid = this.id;
			$('#showdiv').css({ display: 'none' });
			$('#showdiv1').css({ display: 'none' });

			$('#showdiv').css({ top: mouseY, left: mouseX, display: 'block' });
		}
	});

	// inventory options
	$('.spellbar').mousedown(function(e) {
		if (e.button === 2) {
			clickeditemid = this.id;
			$('#showdiv').css({ display: 'none' });
			$('#showdiv1').css({ display: 'none' });
			$('#desc').css({ top: top, left: 0, display: 'block' });
		}
	});

	$('#unequip').click(function() {
		for (let ff = 1; ff < 29; ff++) {
			let invcount1 = 'i' + ff;
			let itemidcount1 = '#' + invcount1;

			if (jQuery.isEmptyObject(inventory[invcount1])) {
				$('#' + clickeditemid)
					.children()
					.appendTo(itemidcount1);
				ff = 50;
				inventory[invcount1] = player[clickeditemid];
				player[clickeditemid] = {};
			}
		}
		countplayerstats();
	});

	// closes all menus
	$('#main').click(function() {
		$('#showdiv').css({ display: 'none' });
		$('#showdiv1').css({ display: 'none' });

		$('#desc').css({ display: 'none' });
	});

	$('#sellall').click(function() {
		function clicked() {
			if (confirm('Are you sure you want to sell your whole inventory?')) {
				sellall();
			} else {
				return false;
			}
		}
		clicked();
	});

	function sellall() {
		for (let i = 1; i < 29; i++) {
			let sellitemid = 'i' + i;

			if (inventory[sellitemid]['value'] !== undefined && inventory[sellitemid]['value'] != null) {
				player.gold = player.gold + inventory[sellitemid]['value'];
				$('#' + sellitemid).empty();
				inventory[sellitemid] = {};
			}
		}
	}

	$('#sell').click(function() {
		function sell() {
			// this is to stop bug when you click an empty inventory slot...
			if (inventory[clickeditemid]['value'] !== undefined && inventory[clickeditemid]['value'] != null) {
				player.gold = player.gold + inventory[clickeditemid]['value'];
				$('#' + clickeditemid).empty();
				inventory[clickeditemid] = {};
			}
		}

		sell();
	});
	$('#equip').click(function() {
		function equip() {
			let equipslot = inventory[clickeditemid]['slot'];

			if ($.isEmptyObject(player[equipslot])) {
				$('#' + clickeditemid)
					.children()
					.appendTo('#' + equipslot);
				$('#' + clickeditemid).empty();
				// now to delete and transfer data
				player[equipslot] = inventory[clickeditemid];
				inventory[clickeditemid] = {};
			}
		}

		equip();
		countplayerstats();
	});

	$('#fightbutton').click(function() {
		function startfightonclick() {
			if (player.summons < 1 && battle !== true) {
				$('#leftinfo').prepend("<p>You don't have enough Boss summons!</p>");
			}

			if (battle === true) {
				$('#leftinfo').prepend('<p>Cannot start battle while in combat</p>');
			}
			if (player.summons > 0 && battle !== true) {
				battle = true;
				$('#leftinfo').empty();
				$('#rightinfo').empty();
				$('#leftinfo').prepend('<p>Fight is starting.</p>');

				player.summons--;
				setTimeout(startfight, 5000);
			}
		}
		startfightonclick();
	});

	// INVENTORY CLICK
	$('.slot').click(function() {
		clickeditemid = this.id; // this selects the item id so it can be used for other things in the menu

		$('td')
			.children()
			.removeClass('selected');
		$('#' + clickeditemid)
			.children()
			.addClass('selected');
		let rarityarr = [];

		$('#info').empty();
		$('#upgradeinfo').empty();
		$('#powerlevel').empty();

		for (let y = 0; y < affixes.length; y++) {
			let statstuff = inventory[clickeditemid]['stats'][affixes[y][0]];
			let upgradestatstuff = inventory[clickeditemid]['upgrade']['stats'][affixes[y][0]];
			rarityarr.push(inventory[clickeditemid]['upgrade']['stats'][affixes[y][0]][2]);
			rarityarr.push(inventory[clickeditemid]['stats'][affixes[y][0]][2]);

			if (y === 0) {
				let namerarity = inventory[clickeditemid]['rarity'];
				let clickeditemname = inventory[clickeditemid]['name'];

				$('#info').append("<p class='" + namerarity + "'>" + clickeditemname + "</p><div class='line'></div>");
				$('#upgradeinfo').html('<p> Upgrade stats:</p>');
			}

			if (statstuff !== undefined && statstuff[0] > 0) {
				$('#info').append(
					'<p>' +
						affixes[y][0] +
						": <span class='" +
						statstuff[2] +
						"'>" +
						statstuff[0] +
						'/' +
						statstuff[1] +
						'</span></p>'
				);
			}

			if (upgradestatstuff[0] !== undefined && upgradestatstuff[0] > 0) {
				$('#upgradeinfo').append(
					'<p>' +
						affixes[y][0] +
						": <span class='" +
						upgradestatstuff[2] +
						"'>" +
						upgradestatstuff[0] +
						'/' +
						upgradestatstuff[1] +
						'</span></p>'
				);
			}

			if (y === affixes.length - 1) {
				$('#info').append('<p>Item Level: ' + inventory[clickeditemid]['level'] + '</p>');
			}
		}

		let totalperc = 0;
		for (let i = 0; i < rarityarr.length; i++) {
			if (rarityarr[i] === 'Common') {
				totalperc = totalperc + 1;
			}
			if (rarityarr[i] === 'Magic') {
				totalperc = totalperc + 2;
			}
			if (rarityarr[i] === 'Rare') {
				totalperc = totalperc + 3;
			}
			if (rarityarr[i] === 'Epic') {
				totalperc = totalperc + 4;
			}
			if (rarityarr[i] === 'Legendary') {
				totalperc = totalperc + 5;
			}
		}

		totalperc = Math.floor(totalperc / 45 * 100) + '%';
		inventory[clickeditemid].powerlevel = totalperc;
		$('#powerlevel').text('Power Level:' + inventory[clickeditemid].powerlevel);
	});

	// CHARACTER CLICK
	$('.slot1').click(function() {
		clickeditemid = this.id; // this selects the item id so it can be used for other things in the menu

		$('td')
			.children()
			.removeClass('selected');
		$('#' + clickeditemid)
			.children()
			.addClass('selected');
		let rarityarr = [];

		$('#powerlevel').empty();
		$('#info').empty();
		$('#upgradeinfo').empty();

		for (let y = 0; y < affixes.length; y++) {
			let statstuff = player[clickeditemid]['stats'][affixes[y][0]];
			let upgradestatstuff = player[clickeditemid]['upgrade']['stats'][affixes[y][0]];
			rarityarr.push(player[clickeditemid]['upgrade']['stats'][affixes[y][0]][2]);
			rarityarr.push(player[clickeditemid]['stats'][affixes[y][0]][2]);

			if (y === 0) {
				let namerarity = player[clickeditemid]['rarity'];
				let clickeditemname = player[clickeditemid]['name'];

				$('#info').append("<p class='" + namerarity + "'>" + clickeditemname + "</p><div class='line'></div>");
				$('#upgradeinfo').html('<p> Upgrade stats:</p>');
			}

			if (statstuff !== undefined && statstuff[0] > 0) {
				$('#info').append(
					'<p>' +
						affixes[y][0] +
						": <span class='" +
						statstuff[2] +
						"'>" +
						statstuff[0] +
						'/' +
						statstuff[1] +
						'</span></p>'
				);
			}
			if (upgradestatstuff[0] !== undefined && upgradestatstuff[0] > 0) {
				$('#upgradeinfo').append(
					'<p>' +
						affixes[y][0] +
						": <span class='" +
						upgradestatstuff[2] +
						"'>" +
						upgradestatstuff[0] +
						'/' +
						upgradestatstuff[1] +
						'</span></p>'
				);
			}
			if (y === affixes.length - 1) {
				$('#info').append('<p>Item Level: ' + player[clickeditemid]['level'] + '</p>');
			}
		}

		let totalperc = 0;
		for (let i = 0; i < rarityarr.length; i++) {
			if (rarityarr[i] === 'Common') {
				totalperc = totalperc + 1;
			}
			if (rarityarr[i] === 'Magic') {
				totalperc = totalperc + 2;
			}
			if (rarityarr[i] === 'Rare') {
				totalperc = totalperc + 3;
			}
			if (rarityarr[i] === 'Epic') {
				totalperc = totalperc + 4;
			}
			if (rarityarr[i] === 'Legendary') {
				totalperc = totalperc + 5;
			}
		}

		totalperc = Math.floor(totalperc / 45 * 100) + '%';
		player[clickeditemid].powerlevel = totalperc;
		$('#powerlevel').text('Power Level:' + player[clickeditemid].powerlevel);
	});

	// to unequip items
	$('.slot1').mousedown(function(e) {
		if (e.button === 2) {
			clickeditemid = this.id;
			$('#showdiv').css({ display: 'none' });
			$('#showdiv1').css({ display: 'none' });
			$('#showdiv1').css({ top: mouseY, left: mouseX, display: 'block' });
		}
	});

	function resetplayerstats() {
		player.buffHealth = 0;
		player.buffMana = 0;
		player.buffDodge = 0;
		player.buffMagicPow = 0;
		player.buffDamage = 0;
		player.buffIceDMG = 0;
		player.buffFireDMG = 0;
		player.buffStormDMG = 0;
		player.buffBloodDMG = 0;
		player.buffCritical = 0;
		player.buffShadowDMG = 0;
		player.buffNatureDMG = 0;
		player.nerfHealPow = 0;

		player.nerfHealth = 0;
		player.nerfMana = 0;
		player.nerfDodge = 0;
		player.nerfMagicPow = 0;
		player.nerfDamage = 0;
		player.nerfIceDMG = 0;
		player.nerfFireDMG = 0;
		player.nerfStormDMG = 0;
		player.nerfBloodDMG = 0;
		player.nerfCritical = 0;
		player.nerfShadowDMG = 0;
		player.nerfNatureDMG = 0;
		player.nerfHealPow = 0;
	}

	function reloadeverything() {
		// we load inventory items
		for (let f = 1; f < 29; f++) {
			let invcount1 = 'i' + f;
			let itemidcount1 = '#' + invcount1;
			let itemid1 = itemidcount1 + 'S';
			if (jQuery.isEmptyObject(inventory[invcount1]) === false) {
				let allclasses1 = 'item sprite ' + inventory[invcount1]['icon'] + ' ' + inventory[invcount1]['rarity'];
				$(itemidcount1).append("<img id='" + itemid1 + "'class='" + allclasses1 + "' '></img>");
			}
		}
		// we also load character items
		for (let x = 0; x < slotplayernames.length; x++) {
			let itemslot1 = slotplayernames[x];
			let itemid1 = '#' + slotplayernames[x];
			let newid1 = '#c' + x;

			if (jQuery.isEmptyObject(player[itemslot1]) === false) {
				let allclasses1 = 'item sprite ' + player[itemslot1]['icon'] + ' ' + player[itemslot1]['rarity'];
				$(itemid1).append("<img id='" + newid1 + "'class='" + allclasses1 + "' '></img>");
			}
		}
	}

	function autoitems() {
		createitem(player.bosslevel);
	}

	setInterval(checkexp, 20000);
	setInterval(countplayerstats, 300);

	function save() {
		let save = {
			player1: player,
			inventory1: inventory,
			boss1: boss
		};
		localStorage.setItem('save', JSON.stringify(save));
	}

	function load() {
		let savegame = JSON.parse(localStorage.getItem('save'));
		let basicint = setInterval(addsummon, 10000);

		if (savegame != null && savegame !== undefined) {
			clearInterval(basicint);
			inventory = savegame.inventory1;
			player = savegame.player1;
			resetplayerstats();
			reloadeverything();
			countplayerstats();
			displaystats();
			boss = savegame.boss1;
			$('#bosslevel').text('LVL: ' + boss.level);
			$('#summons').text('1 spawn per: ' + Math.floor(player.summoninterval / 10000) + 'min');
			setInterval(addsummon, player.summoninterval);
			setInterval(autoitems, 600000);
		}
	}

	setInterval(save, 10000);

	window.onload = function() {
		load();
	};
}); // doc rdy
