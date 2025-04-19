#!/usr/bin/env node
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const data = require('./data'); // Import dari data.js

const password = 'salvalidated123';

function randomDate(start = new Date(2020, 0, 1), end = new Date()) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    .toISOString().split('T')[0];
}

function generateOrderId() {
  return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

async function startTool() {
  console.clear();
  console.log(chalk.bgBlue.bold('   MLBB VALIDATED - CREATES BY SAL   '));
  console.log();

  const { inputPassword } = await inquirer.prompt([
    {
      type: 'password',
      name: 'inputPassword',
      message: 'Enter Password to Access:',
    }
  ]);

  if (inputPassword !== password) {
    console.log(chalk.red('Access Denied. Password salah!'));
    return;
  }

  console.log(chalk.green('Access Granted!'));
  console.log();

  const { menu } = await inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
      message: 'Pilih Menu:',
      choices: ['Retrieved MLBB', 'Fix Contact GM']
    }
  ]);

  if (menu === 'Retrieved MLBB') {
    await retrievedFlow();
  } else {
    console.log(chalk.yellow('Fungsi "Fix Contact GM" belum tersedia.'));
  }
}

async function retrievedFlow() {
  const { method } = await inquirer.prompt([
    {
      type: 'list',
      name: 'method',
      message: 'Pilih Login Method:',
      choices: ['Moonton', 'Facebook', 'Google', 'TikTok']
    }
  ]);

  const { email, password } = await inquirer.prompt([
    { type: 'input', name: 'email', message: 'Email Account:' },
    { type: 'password', name: 'password', message: 'Password Account (Old / New):' }
  ]);

  const spinner = ora('Memproses... Sila tunggu 10 saat').start();
  await new Promise(r => setTimeout(r, 10000));
  spinner.succeed('Siap!');

  console.log('\n' + chalk.bgWhite.black.bold('  [1] GOOGLE ORDER DETAIL  '));
  console.log(chalk.cyan(`Order Date     : ${randomDate()}`));
  console.log(chalk.cyan(`Order Channel  : ${data.orderChannels[Math.floor(Math.random() * data.orderChannels.length)]}`));
  console.log(chalk.cyan(`Order ID       : ${generateOrderId()}`));

  console.log('\n' + chalk.bgWhite.black.bold('  [2] INFO ACCOUNT  '));
  console.log(chalk.magenta(`Tanggal Dibuat : ${randomDate(new Date(2018, 0, 1))}`));
  console.log(chalk.magenta(`Device         : ${data.devices[Math.floor(Math.random() * data.devices.length)]}`));

  console.log('\n' + chalk.bgWhite.black.bold('  [3] REKOD LAIN  '));
  console.log(chalk.yellow(`Third Party Past : ${data.thirdParty[Math.floor(Math.random() * data.thirdParty.length)]}`));
  console.log(chalk.yellow(`First Recharged  : ${randomDate()} (132 Diamond)`));

  console.log('\n' + chalk.green('Terima kasih guna MLVALIDATED CREATES BY SAL!'));
}

startTool();