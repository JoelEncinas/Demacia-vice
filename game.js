// generate images usin nightcafe AI

let xp = 0;
let health = 100;
let gold = 50;

let currentWeapon = 0;
let fighting;

let monsterHealth;

const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldText = document.querySelector('#goldText');
const monsterStats = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterName');
const monsterHealthText = document.querySelector('#monsterHealth');

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// weapons
const weapons = [
    {
        name: 'stick',
        power: 5
    },
    {
        name: 'dagger',
        power: 30
    },
    {
        name: 'claw hammer',
        power: 50
    },
    {
        name: 'sword',
        power: 100
    }
]

let inventory = [weapons[0].name];

//  locations
const locations = [
    {
        name: 'town square',
        'button text': ['Go to store', 'Go to cave', 'Fight dragon'],
        'button functions': [goStore, goCave, fightDragon],
        text: 'You are in the town hall'
    },
    {
        name: 'store',
        'button text': ['Buy health (10 gold)', 'Buy weapon (30 gold)', 'Go to town square'],
        'button functions': [buyHealth, buyWeapon, goTown],
        text: 'You enter the store'
    },
    {
        name: 'cave',
        'button text': ['Fight slime', 'Fight fanged beast', 'Go to town square'],
        'button functions': [fightSlime, fightBeast, goTown],
        text: 'You enter the cave. There are several monsters.'
    }
];

function update(location){
    button1.innerText = location['button text'][0];
    button2.innerText = location['button text'][1];
    button3.innerText = location['button text'][2];
    
    button1.onclick = location['button functions'][0];
    button2.onclick = location['button functions'][1];
    button3.onclick = location['button functions'][2];

    text.innerText = location.text;
}

function goTown(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goCave(){
    update(locations[2]);
}

function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 10;

        goldText.innerText = gold;
        healthText.innerText = health;
    } else {
        text.innerText = 'You do not have enough gold to buy health';
    }
}

function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
    
            goldText.innerText = gold;
    
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = 'You now have a new weapon: ' + newWeapon + ' .';
    
            inventory.push(newWeapon);
            text.innerText += 'In your inventory you have: ' + inventory;
        } else {
            text.innerText = 'You do not have enough gold to buy that weapon';
        }
    }
}

function fightDragon(){
    console.log('Fighting dragon.');
}

function fightSlime(){

}

function fightBeast(){

}