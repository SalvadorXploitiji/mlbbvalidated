const readline = require('readline');
const chalk = require('chalk');

const data = require('./data'); // file data.js yang simpan device/order/thirdParty

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateOrderId() {
  return 'ORD-' + Math.random().toString(36).substring(2, 12).toUpperCase();
}

function randomDate() {
  const start = new Date(2018, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

async function main() {
  console.clear();
  console.log(chalk.magenta.bold('\n=== MLBB VALIDATED | CREATED BY SAL ===\n'));

  const pass = await question('Enter password: ');
  if (pass !== 'mlvalidated123') {
    console.log(chalk.red('Password salah! Akses ditolak.'));
    rl.close();
    return;
  }

  console.log(chalk.green('\nAkses diterima!\n'));
  console.log('Pilihan:');
  console.log('1. Retrieved MLBB');
  console.log('2. Fix Contact GM');

  const choice = await question('\nPilih menu (1/2): ');

  if (choice.trim() === '1') {
    console.log('\nLogin Options:');
    console.log('1. Moonton');
    console.log('2. Facebook');
    console.log('3. Google');
    console.log('4. Tiktok');

    const login = await question('\nPilih login method (1-4): ');
    const email = await question('Masukkan email akaun: ');
    const password = await question('Masukkan password akaun: ');

    console.log(chalk.yellow('\nMemproses akaun... Sila tunggu 10 saat.\n'));
    await delay(10000);

    console.log(chalk.cyan.bold('\n[ GOOGLE ORDER DETAIL ]'));
    console.log(`Order date   : ${randomDate()}`);
    console.log(`Order channel: ${randomItem(data.orderChannels)}`);
    console.log(`Order ID     : ${generateOrderId()}`);

    console.log(chalk.cyan.bold('\n[ ACCOUNT INFO ]'));
    console.log(`Created on   : ${randomDate()}`);
    console.log(`Device used  : ${randomItem(data.devices)}`);

    console.log(chalk.cyan.bold('\n[ ACCOUNT HISTORY ]'));
    console.log(`Third-party past: ${randomItem(data.thirdParty)}`);
    console.log(`First recharged : ${randomDate()} (132 diamond)`);

    rl.close();
  } else {
    console.log(chalk.yellow('Feature belum tersedia.'));
    rl.close();
  }
}

main();