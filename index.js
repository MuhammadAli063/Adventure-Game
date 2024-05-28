#! /usr/bin/env node
import inquirer from "inquirer";
// --------------- Games Variables ----------------
let enemies = ['Skeleton', 'Zombie', 'Warrior', 'Assassin'];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;
// ```` Player Variables````````
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;
// While Loop
let gameRunning = true;
console.log("Welcome To DeadZone");
while (gameRunning) {
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
    let enemyIndex = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[enemyIndex];
    console.log(`# ${enemy} has appeared #\n`);
    while (enemyHealth > 0) {
        console.log(`Your Health: ${heroHealth}`);
        console.log(`${enemy} Health: ${enemyHealth}`);
        let options = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "What would you like to do?",
            choices: ['1. Attack', '2. Take Health potion', '3. Run']
        });
        if (options.ans === '1. Attack') {
            let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
            let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);
            enemyHealth -= damageToEnemy;
            heroHealth -= damageToHero;
            console.log(`You strike the ${enemy} for ${damageToEnemy} damage`);
            console.log(`${enemy} strikes you for ${damageToHero} damage`);
            if (heroHealth < 1) {
                console.log("You have taken too much damage. You are too weak to continue.");
                gameRunning = false;
                break;
            }
            if (enemyHealth < 1) {
                console.log(`${enemy} was defeated!`);
                console.log(`You have ${heroHealth} health`);
                let randomNumber = Math.floor(Math.random() * 100 + 1);
                if (randomNumber < healthPotionDropChance) {
                    numHealthPotion++;
                    console.log('The enemy dropped a health potion!');
                    console.log(`You now have ${numHealthPotion} health potions`);
                }
            }
        }
        else if (options.ans === '2. Take Health potion') {
            if (numHealthPotion > 0) {
                heroHealth += healthPotionHealAmount;
                numHealthPotion--;
                console.log(`You used a health potion for ${healthPotionHealAmount}`);
                console.log(`You now have ${heroHealth} health`);
                console.log(`You have ${numHealthPotion} health potions left`);
            }
            else {
                console.log('You have no health potions left. Defeat enemies for a chance to get health potions.');
            }
        }
        else if (options.ans === '3. Run') {
            console.log(`You ran away from the ${enemy}`);
            continue;
        }
    }
    if (!gameRunning)
        break;
    let userOption = await inquirer.prompt({
        name: 'ans',
        type: 'list',
        message: 'What would you like to do now?',
        choices: ['1. Continue', '2. Exit']
    });
    if (userOption.ans === '1. Continue') {
        console.log('You continue on your adventure');
    }
    else {
        console.log('You successfully exited from DeadZone');
        gameRunning = false;
    }
}
