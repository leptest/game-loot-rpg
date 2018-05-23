// require('modernizr'); // Custom Modernizr build handled by a webpack plugin.

// import jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;

/* global jQuery $ */

import { slotplayernames, affixes } from './constants/constants';
import { randomItem } from './items/randomItem';
import { upgradeitem } from './items/upgradeItem';
import NewItem from './classes/item';
import NewCharacter from './classes/character';

document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded');
});

$(document).ready(function () {
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
		nerfLifesteal: 0,
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
		damage: this.level * 15,
	};

	let clickeditemid;

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
		i27: {},
	};

	let mouseX;
	let mouseY;
	$(document).mousemove((e) => {
		mouseX = e.pageX;
		mouseY = e.pageY;
	});

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
				cooldown: 2000,
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
				cooldown: 5000,
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
				cooldown: 5000,
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
				cooldown: 5000,
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
				cooldown: 5000,
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
				cooldown: 5000,
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
				cooldown: 5000,
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
				cooldown: 10000,
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
				cooldown: 10000,
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
				buffduration: 5000,
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
				cooldown: 10000,
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
				cooldown: 0,
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
				buffduration: 5000,
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
				buffduration: 5000,
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
				buffduration: 5000,
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
				buffduration: 5000,
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
				buffduration: 5000,
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
				buffduration: 10000,
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
				buffduration: 5000,
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
				cooldown: 10000,
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
				cooldown: 10000,
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
				buffduration: 10000,
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
				buffduration: 0,
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
				buffduration: 0,
			},
		};
	}

	updatespells();

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

		$('#gold').text(`Gold: ${Math.floor(player.gold)}`);
		$('#level').text(`Level: ${player.level}`);
	}

	function countplayerstats() {
		// console.log('countplayerstats()');

		// reset player stats
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

		// update player stats bases on items
		slotplayernames.forEach((item) => {
			if ($.isEmptyObject(player[item]) === false) {
				affixes.forEach((affix) => {
					player[`total${affix[0]}`] = player[`total${affix[0]}`] + player[item].totalstats[affix[0]];
				});
			}
		});

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


	function playerattack(object) {
		countplayerstats();
		updatespells();

		let i = 0;

		function resetcooldown() {
			player[`${object.namefunction}cooldown`] = false;
			$(object.nameid).removeClass('oncooldown');
		}

		function f() {
			function removebuff() {
				player[object.buffname] = 0;
			}

			function useattack() {
				if (object.buffamount !== 0 && i === 0) {
					player[object.buffname] = object.buffamount;
					const classname = object.buffname.replace('buff', '');
					$('#rightinfo').prepend(`<p class="${classname}">${object.buffname.replace('buff', '')} buffed: ${
							object.buffamount
						}</p>`);
					if (object.buffduration !== 0) {
						setTimeout(removebuff, object.buffduration);
					}
				}

				if (object.damage > 0) {
					const critroll = Math.floor(Math.random() * (100 - Critical)) + 1;
					let ifcrit = ' does ';
					let finalDamage = object.damage;

					if (critroll < Critical) {
						finalDamage *= 2;
						ifcrit = ' CRITS for';
					}
					currentbosshealth -= finalDamage;
					if (object.namefunction !== 'basicattack') {
						$('#rightinfo').prepend(`<p>${object.nameplayer} ${ifcrit} : ${finalDamage} DMG! </p>`);
					}
				}

				if (object.spellfunction !== undefined) {
					object.spellfunction();
				}
				if (object.manacost > 0) {
					currentplayermana -= object.manacost;
				}

				if (object.healthcost > 0) {
					currentplayerhealth -= object.healthcost;
				}

				if (object.manarestore > 0) {
					currentplayermana += object.manarestore;
					if (object.namefunction !== 'basicattack') {
						$('#rightinfo').prepend(`<p>You restore: ${object.manarestore} Mana!`);
					}
				}

				if (object.healthrestore > 0) {
					currentplayerhealth += object.healthrestore;
					if (object.namefunction !== 'basicattack') {
						$('#rightinfo').prepend(`<p>You restore: ${object.healthrestore} Health!`);
					}
				}

				i++;
				if (i < object.repeat) {
					setTimeout(useattack, object.delay);
				}
			}

			if (
				player[`${object.namefunction}cooldown`] === false &&
				currentplayermana >= object.manacost &&
				battle === true
			) {
				player[`${object.namefunction}cooldown`] = true;

				// 0 means 1 spell use per battle
				useattack();
				if (object.cooldown !== 0) {
					setTimeout(resetcooldown, object.cooldown, object.namefunction);
				}
			}
		}

		if (
			player[`${object.namefunction}cooldown`] === false &&
			currentplayermana >= object.manacost &&
			battle === true
		) {
			$(object.nameid).addClass('oncooldown');
			setTimeout(f, object.delay);
		}
	}


	$('#upgrade').click(() => {
		inventory[clickeditemid] = upgradeitem(inventory[clickeditemid], player);
	});
	$('#upgradeitemonchar').click(() => {
		player[clickeditemid] = upgradeitem(player[clickeditemid], player);
	});

	function createitem(bossLevel) {
		// this choses item slot
		const randomslot = Math.floor(Math.random() * 12) + 1;

		// now generate the item
		const generateditem = randomItem(randomslot, bossLevel);

		// find first empty inv slot and add item to it

		for (let f = 1; f < 29; f++) {
			let allclasses;
			const invcount = `i${f}`;
			const itemidcount = `#${invcount}`;
			const itemid = `${itemidcount}S`;
			if (jQuery.isEmptyObject(inventory[invcount])) {
				// add random item to slot
				allclasses = `item sprite ${generateditem.icon} ${generateditem.rarity}`;
				$(itemidcount).append(`<img id='${itemid}'class='${allclasses}'></img>`);
				f = 50;
				inventory[invcount] = generateditem;
			}
		}
	}

	// so right click doesn't fuck up my options menu
	document.oncontextmenu = function () {
		return false;
	};

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
		const el = document.querySelectorAll('#level')[0];

		if (player.experience > 3 * player.level) {
			player.experience = 0;
			player.level++;
		}
		// $('#bosssummons').text(`Boss Summons: ${player.summons}`);
		el.textContent = `Level: ${player.level}`;
	}


	checkexp();

	function bosslevelkilled(x) {
		player.bosslevel = x;
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
		const randombossname = Math.floor(Math.random() * 13) + 1;
		const bossname = `boss${randombossname} mobsprites bosspic`;
		let bosshitroll;

		// there is bonus every 25 levels so you have to stop and get better gear, this is to balance the game
		boss.health = boss.level * 500 + Math.floor(boss.level / 25) * 20000 + Math.floor(boss.level / 100) * 50000;
		boss.damage = boss.level * 20 + Math.floor(boss.level / 25) * 150 + Math.floor(boss.level / 100) * 250;

		currentbosshealth = boss.health;
		currentplayerhealth = Health;
		currentplayermana = Mana;

		let bossdamage = boss.damage;
		let bosscritdamage = boss.damage * 2;

		$('#boss').html(`<img class='${bossname}' ></img>`);
		$('#bosshptext').text(`${currentbosshealth}/${currentbosshealth}`);
		$('#bosshpbar').css('width', '100%');

		function updatehealthbar() {
			// console.log('updatehealthbar()');
			const barpercent = currentbosshealth / boss.health * 100;
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
					width: `${barpercent}%`,
				},
				'slow',
			);
			$('#bosshptext').text(`${currentbosshealth}/${boss.health}`);
			$('#playerhpbar').animate(
				{
					width: `${playerhpbar}%`,
				},
				'slow',
			);
			$('#playermanabar').animate(
				{
					width: `${playermanabar}%`,
				},
				'slow',
			);
		}

		function bossattack() {
			console.log('bossattack()');
			bossdamage = boss.damage;
			bosscritdamage = boss.damage * 5;
			bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

			function attackbasicplayer() {
				bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

				if (bosshitroll > Dodge) {
					$('#leftinfo').prepend(`<p>Boss Attacks for: ${bossdamage} DMG!</p>`);
					currentplayerhealth -= bossdamage;
				}
				if (bosshitroll < Dodge) {
					$('#leftinfo').prepend('<p>Boss Missed a basic attack.</p>');
				}
			}

			function critplayer() {
				bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

				if (bosshitroll > Dodge) {
					$('#leftinfo').prepend(`<p>Boss CRITS for: ${bosscritdamage} DMG! </p>`);
					currentplayerhealth -= bosscritdamage;
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

			const bosschoosespell = Math.floor(Math.random() * 100);

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

		let checkdeathInterval;
		let bossattackInterval;

		function checkdeath() {
			if (currentbosshealth < 1) {
				console.log('!!WON!!');
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
				console.log('!!DIED!!');
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

		checkdeathInterval = setInterval(checkdeath, 1000);
		bossattackInterval = setInterval(bossattack, 3000);
	}

	$('#summonfaster').click(() => {
		if (player.summoninterval - 10000 > 0) {
			player.summoninterval -= 10000;
			$('#summons').text(`1 spawn per: ${Math.floor(player.summoninterval / 10000)}min`);
		}
	});

	$('#summonslower').click(() => {
		player.summoninterval += 10000;
		$('#summons').text(`1 spawn per: ${Math.floor(player.summoninterval / 10000)}min`);
	});

	$('#minus').click(() => {
		if (boss.level > 1 && battle !== true) {
			boss.level--;
			$('#bosslevel').text(`LVL: ${boss.level}`);
		}
	});

	$('#plus').click(() => {
		if (battle !== true) {
			boss.level++;
			$('#bosslevel').text(`LVL: ${boss.level}`);
		}
	});

	// inventory options
	$('.slot').mousedown(function (e) {
		if (e.button === 2) {
			clickeditemid = this.id;
			$('#showdiv').css({ display: 'none' });
			$('#showdiv1').css({ display: 'none' });

			$('#showdiv').css({ top: mouseY, left: mouseX, display: 'block' });
		}
	});

	// inventory options
	$('.spellbar').mousedown(function (e) {
		if (e.button === 2) {
			clickeditemid = this.id;
			$('#showdiv').css({ display: 'none' });
			$('#showdiv1').css({ display: 'none' });
			$('#desc').css({ top: 0, left: 0, display: 'block' });
		}
	});

	$('#unequip').click(() => {
		for (let ff = 1; ff < 29; ff++) {
			const invcount1 = `i${ff}`;
			const itemidcount1 = `#${invcount1}`;

			if (jQuery.isEmptyObject(inventory[invcount1])) {
				$(`#${clickeditemid}`)
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
	$('#main').click(() => {
		$('#showdiv').css({ display: 'none' });
		$('#showdiv1').css({ display: 'none' });

		$('#desc').css({ display: 'none' });
	});

	function sellall() {
		for (let i = 1; i < 29; i++) {
			const sellitemid = `i${i}`;

			if (inventory[sellitemid].value !== undefined && inventory[sellitemid].value != null) {
				player.gold += inventory[sellitemid].value;
				$(`#${sellitemid}`).empty();
				inventory[sellitemid] = {};
			}
		}
	}

	$('#sellall').click(() => {
		if (window.confirm('Are you sure you want to sell your whole inventory?')) {
			sellall();
		}
	});

	$('#sell').click(() => {
		function sell() {
			// this is to stop bug when you click an empty inventory slot...
			if (inventory[clickeditemid].value !== undefined && inventory[clickeditemid].value != null) {
				player.gold += inventory[clickeditemid].value;
				$(`#${clickeditemid}`).empty();
				inventory[clickeditemid] = {};
			}
		}

		sell();
	});
	$('#equip').click(() => {
		function equip() {
			const equipslot = inventory[clickeditemid].slot;

			if ($.isEmptyObject(player[equipslot])) {
				$(`#${clickeditemid}`)
					.children()
					.appendTo(`#${equipslot}`);
				$(`#${clickeditemid}`).empty();
				// now to delete and transfer data
				player[equipslot] = inventory[clickeditemid];
				inventory[clickeditemid] = {};
			}
		}

		equip();
		countplayerstats();
	});

	$('#fightbutton').click(() => {
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
	$('.slot').click(function () {
		clickeditemid = this.id; // this selects the item id so it can be used for other things in the menu

		$('td')
			.children()
			.removeClass('selected');
		$(`#${clickeditemid}`)
			.children()
			.addClass('selected');
		const rarityarr = [];

		$('#info').empty();
		$('#upgradeinfo').empty();
		$('#powerlevel').empty();

		console.log(clickeditemid, inventory[clickeditemid]);
		if (jQuery.isEmptyObject(inventory[clickeditemid])) {
			return;
		}

		affixes.forEach((affix, index) => {
			const statstuff = inventory[clickeditemid].stats[affix[0]];
			const upgradestatstuff = inventory[clickeditemid].upgrade.stats[affix[0]];
			rarityarr.push(inventory[clickeditemid].upgrade.stats[affix[0]][2]);
			rarityarr.push(inventory[clickeditemid].stats[affix[0]][2]);

			if (index === 0) {
				const namerarity = inventory[clickeditemid].rarity;
				const clickeditemname = inventory[clickeditemid].name;

				$('#info').append(`<p class='${namerarity}'>${clickeditemname}</p><div class='line'></div>`);
				$('#upgradeinfo').html('<p> Upgrade stats:</p>');
			}

			if (statstuff !== undefined && statstuff[0] > 0) {
				$('#info').append(`<p>${
						affix[0]
						}: <span class='${
						statstuff[2]
						}'>${
						statstuff[0]
						}/${
						statstuff[1]
						}</span></p>`);
			}

			if (upgradestatstuff[0] !== undefined && upgradestatstuff[0] > 0) {
				$('#upgradeinfo').append(`<p>${
						affix[0]
						}: <span class='${
						upgradestatstuff[2]
						}'>${
						upgradestatstuff[0]
						}/${
						upgradestatstuff[1]
						}</span></p>`);
			}

			if (index === affixes.length - 1) {
				$('#info').append(`<p>Item Level: ${inventory[clickeditemid].level}</p>`);
			}
		});

		let totalperc = 0;
		rarityarr.forEach((rarityName) => {
			if (rarityName === 'Common') {
				totalperc += 1;
			}
			if (rarityName === 'Magic') {
				totalperc += 2;
			}
			if (rarityName === 'Rare') {
				totalperc += 3;
			}
			if (rarityName === 'Epic') {
				totalperc += 4;
			}
			if (rarityName === 'Legendary') {
				totalperc += 5;
			}
		});

		totalperc = `${Math.floor(totalperc / 45 * 100)}%`;
		inventory[clickeditemid].powerlevel = totalperc;
		$('#powerlevel').text(`Power Level:${inventory[clickeditemid].powerlevel}`);
	});

	// CHARACTER CLICK
	$('.slot1').click(function () {
		clickeditemid = this.id; // this selects the item id so it can be used for other things in the menu

		$('td')
			.children()
			.removeClass('selected');
		$(`#${clickeditemid}`)
			.children()
			.addClass('selected');
		const rarityarr = [];

		$('#powerlevel').empty();
		$('#info').empty();
		$('#upgradeinfo').empty();

		console.log(clickeditemid, player[clickeditemid]);
		if (jQuery.isEmptyObject(player[clickeditemid])) {
			return;
		}

		affixes.forEach((affix, index) => {
			const statstuff = player[clickeditemid].stats[affix[0]];
			const upgradestatstuff = player[clickeditemid].upgrade.stats[affix[0]];
			rarityarr.push(player[clickeditemid].upgrade.stats[affix[0]][2]);
			rarityarr.push(player[clickeditemid].stats[affix[0]][2]);

			// if first item
			if (index === 0) {
				const namerarity = player[clickeditemid].rarity;
				const clickeditemname = player[clickeditemid].name;

				$('#info').append(`<p class='${namerarity}'>${clickeditemname}</p><div class='line'></div>`);
				$('#upgradeinfo').html('<p> Upgrade stats:</p>');
			}

			if (statstuff !== undefined && statstuff[0] > 0) {
				$('#info').append(`<p>${
						affix[0]
						}: <span class='${
						statstuff[2]
						}'>${
						statstuff[0]
						}/${
						statstuff[1]
						}</span></p>`);
			}
			if (upgradestatstuff[0] !== undefined && upgradestatstuff[0] > 0) {
				$('#upgradeinfo').append(`<p>${
						affix[0]
						}: <span class='${
						upgradestatstuff[2]
						}'>${
						upgradestatstuff[0]
						}/${
						upgradestatstuff[1]
						}</span></p>`);
			}

			// if last item
			if (index === affixes.length - 1) {
				$('#info').append(`<p>Item Level: ${player[clickeditemid].level}</p>`);
			}
		});


		let totalperc = 0;
		rarityarr.forEach((rarityName) => {
			if (rarityName === 'Common') {
				totalperc += 1;
			}
			if (rarityName === 'Magic') {
				totalperc += 2;
			}
			if (rarityName === 'Rare') {
				totalperc += 3;
			}
			if (rarityName === 'Epic') {
				totalperc += 4;
			}
			if (rarityName === 'Legendary') {
				totalperc += 5;
			}
		});

		totalperc = `${Math.floor(totalperc / 45 * 100)}%`;
		player[clickeditemid].powerlevel = totalperc;
		$('#powerlevel').text(`Power Level:${player[clickeditemid].powerlevel}`);
	});

	// to unequip items
	$('.slot1').mousedown(function (e) {
		if (e.button === 2) {
			clickeditemid = this.id;
			$('#showdiv').css({ display: 'none' });
			$('#showdiv1').css({ display: 'none' });
			$('#showdiv1').css({ top: mouseY, left: mouseX, display: 'block' });
		}
	});

	function reloadeverything() {
		// we load inventory items
		for (let f = 1; f < 29; f++) {
			const invcount1 = `i${f}`;
			const itemidcount1 = `#${invcount1}`;
			const itemid1 = `${itemidcount1}S`;
			if (jQuery.isEmptyObject(inventory[invcount1]) === false) {
				const allclasses1 = `item sprite ${inventory[invcount1].icon} ${inventory[invcount1].rarity}`;
				$(itemidcount1).append(`<img id='${itemid1}'class='${allclasses1}' '></img>`);
			}
		}
		// we also load character items
		slotplayernames.forEach((name, index) => {
			const itemid1 = `#${name}`;
			const newid1 = `#c${index}`;

			if (jQuery.isEmptyObject(player[name]) === false) {
				const allclasses1 = `item sprite ${player[name].icon} ${player[name].rarity}`;
				$(itemid1).append(`<img id='${newid1}'class='${allclasses1}' '></img>`);
			}
		});
	}

	function autoitems() {
		createitem(player.bosslevel);
	}

	/**
	 * UI binds
	 */
	$('#magicattack').click(() => {
		playerattack(spellobject.magicattack);
	});
	$('#helmet').click(() => {
		playerattack(spellobject.helmet);
	});
	$('#defenseheal').click(() => {
		playerattack(spellobject.defenseheal);
	});
	$('#attackbuff').click(() => {
		playerattack(spellobject.attackbuff);
	});
	$('#lotus').click(() => {
		playerattack(spellobject.lotus);
	});
	$('#healwings').click(() => {
		playerattack(spellobject.healwings);
	});
	$('#bloodsap').click(() => {
		playerattack(spellobject.bloodsap);
	});
	$('#magebuff').click(() => {
		playerattack(spellobject.magebuff);
	});
	$('#shadowbuff').click(() => {
		playerattack(spellobject.shadowbuff);
	});
	$('#stormbuff').click(() => {
		playerattack(spellobject.stormbuff);
	});
	$('#firebuff').click(() => {
		playerattack(spellobject.firebuff);
	});
	$('#icebuff').click(() => {
		playerattack(spellobject.icebuff);
	});

	$('#icebolt').click(() => {
		playerattack(spellobject.icebolt);
	});
	$('#firebolt').click(() => {
		playerattack(spellobject.firebolt);
	});
	$('#stormbolt').click(() => {
		playerattack(spellobject.stormbolt);
	});
	$('#thorns').click(() => {
		playerattack(spellobject.thorns);
	});
	$('#shadowbolt').click(() => {
		playerattack(spellobject.shadowbolt);
	});
	$('#heal').click(() => {
		playerattack(spellobject.heal);
	});
	$('#natureheal').click(() => {
		playerattack(spellobject.natureheal);
	});
	$('#manarestore').click(() => {
		playerattack(spellobject.manarestore);
	});
	$('#bloodstrike').click(() => {
		playerattack(spellobject.bloodstrike);
	});
	$('#shield').click(() => {
		playerattack(spellobject.shield);
	});
	$('#buffmagic').click(() => {
		playerattack(spellobject.buffmagic);
	});
	$('.-basic').click(() => {
		playerattack(spellobject.basicattack);
	});

	// keyboard spell clicking support! Woo :D
	const spellMappings = [
		{ key: 49, spell: 'spell1' },
		{ key: 50, spell: 'spell2' },
		{ key: 51, spell: 'spell3' },
		{ key: 52, spell: 'spell4' },
		{ key: 53, spell: 'spell5' },
		{ key: 54, spell: 'spell6' },
		{ key: 55, spell: 'spell7' },
		{ key: 56, spell: 'spell8' },
		{ key: 57, spell: 'spell9' },
	];
	$('body').bind('keypress', (event) => {
		spellMappings.forEach((item) => {
			if (item.key === event.keyCode || item.key === event.charCode) {
				$(`.${item.spell}`).trigger('click');
			}
		});
	});

	let autobasic1;
	$('#autobasic').click(() => {
		function autobasicatk() {
			$('.spell1').trigger('click');
		}
		autobasic1 = setInterval(autobasicatk, 300);
		$('#dan__autoattack').html('AUTO Attack:  ON');
	});

	$('#manualauto').click(() => {
		clearInterval(autobasic1);
		$('#dan__autoattack').html('AUTO Attack:  OFF');
	});

	$('#dan__giverandomitem').click(() => {
		createitem(200);
	});

	const classItem = new NewItem();

	$('#dan__item-sell').click(() => {
		classItem.sell();
	});
	$('#dan__item-upgrade').click(() => {
		classItem.upgrade();
	});

	const classPlayer = new NewCharacter();

	$('#dan__item-view').click(() => {
		console.log(classPlayer);
	});
	$('#dan__item-equip').click(() => {
		classPlayer.equip(classItem);
	});
	/**
	 * LOAD SAVE TIMOUTS
	 */
	setInterval(checkexp, 20000);
	setInterval(countplayerstats, 300);

	function saveGame() {
		console.log('saving...');
		const save = {
			player1: player,
			inventory1: inventory,
			boss1: boss,
		};
		localStorage.setItem('save', JSON.stringify(save));
	}

	function loadGame() {
		const savegame = JSON.parse(localStorage.getItem('save'));
		const basicint = setInterval(addsummon, 10000);

		if (savegame != null && savegame !== undefined) {
			clearInterval(basicint);
			inventory = savegame.inventory1;
			player = savegame.player1;
			resetplayerstats();
			reloadeverything();
			countplayerstats();
			displaystats();
			boss = savegame.boss1;
			$('#bosslevel').text(`LVL: ${boss.level}`);
			$('#summons').text(`1 spawn per: ${Math.floor(player.summoninterval / 10000)}min`);
			setInterval(addsummon, player.summoninterval);
			setInterval(autoitems, 600000);
		}
	}

	setInterval(saveGame, 10000);

	window.onload = function () {
		loadGame();
	};
}); // doc rdy
