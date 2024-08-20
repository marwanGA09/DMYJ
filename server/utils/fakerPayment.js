const start = Date.now();
console.log('@@@', Date.now() - start);
let faker = require('@faker-js/faker');
console.log('@@@', Date.now() - start);
const mongoose = require('mongoose');
const PaymentModel = require('./../models/paymentModel'); // Adjust the path as needed

console.log('1', Date.now() - start);

const DATABASE_PASSWORD = '...............';
const DATABASE_URL = `...............`;
const DB_URL = DATABASE_URL.replace('<PASSWORD>', DATABASE_PASSWORD);

mongoose
  .connect(DB_URL, {
    serverSelectionTimeoutMS: 10000, // 5 seconds to connect
    socketTimeoutMS: 120000, // 45 seconds to perform operations
  })
  .then((conn) => {
    console.log('connected');
  });
console.log('2', Date.now() - start);
faker = faker.faker;

const UserIds = [
  '66c4aa84ffe7570643edcabb',
  '66c4aa84ffe7570643edcac5',
  '66c4aa84ffe7570643edcaba',
  '66c4aa84ffe7570643edcabc',
  '66c4aa84ffe7570643edcab9',
];

const memberIds = [
  '66c4ad1a62cfe353272b8043',
  '66c4ad1a62cfe353272b8031',
  '66c4ad1a62cfe353272b8041',
  '66c4ad1a62cfe353272b8042',
  '66c4ad1a62cfe353272b8044',
  '66c4ad1a62cfe353272b8032',
  '66c4ad1a62cfe353272b8045',
  '66c4ad1a62cfe353272b8033',
  '66c4ad1a62cfe353272b8046',
  '66c4ad1a62cfe353272b8034',
  '66c4ad1a62cfe353272b8035',
  '66c4ad1a62cfe353272b8047',
  '66c4ad1a62cfe353272b8040',
  '66c4ad1a62cfe353272b8036',
  '66c4ad1a62cfe353272b8048',
  '66c4ad1a62cfe353272b8037',
  '66c4ad1a62cfe353272b8049',
  '66c4ad1a62cfe353272b8038',
  '66c4ad1a62cfe353272b804a',
  '66c4ad1a62cfe353272b804b',
  '66c4ad1a62cfe353272b8039',
  '66c4ad1a62cfe353272b804c',
  '66c4ad1a62cfe353272b803a',
  '66c4ad1a62cfe353272b804d',
  '66c4ad1a62cfe353272b804e',
  '66c4ad1a62cfe353272b803b',
  '66c4ad1a62cfe353272b804f',
  '66c4ad1a62cfe353272b803c',
  '66c4ad1a62cfe353272b8050',
  '66c4ad1a62cfe353272b8051',
  '66c4ad1a62cfe353272b803d',
  '66c4ad1a62cfe353272b8052',
  '66c4ad1a62cfe353272b803f',
  '66c4ad1a62cfe353272b803e',
];

function generateFakePaymentData() {
  const totalMonth = faker.number.int({ min: 1, max: 5 });
  const monthlyPaymentAmount = faker.number.int({ min: 10, max: 1000 });
  const totalAmount = totalMonth * monthlyPaymentAmount;

  const months = [];
  for (let i = 0; i < totalMonth; i++) {
    const month = faker.date.month({ abbreviated: true });
    const year = faker.number.int({ min: 2020, max: 2024 });

    // Avoid duplicate month-year combinations
    if (!months.some((m) => m.month === month && m.year === year)) {
      months.push({ month, year });
    } else {
      i = i - 1;
    }
  }

  return {
    memberId: memberIds[Math.floor(Math.random() * 34)], // Replace with actual memberId if needed
    totalMonth,
    monthlyPaymentAmount,
    totalAmount,
    userId: UserIds[Math.floor(Math.random() * 5)], // Replace with actual userId if needed
    months,
  };
}

const saveToDB = async (i) => {
  const db = await PaymentModel.create(generateFakePaymentData());

  console.log('save', i);
};

console.log('3', Date.now() - start);
// let samplePayment = [];
for (let i = 1; i < 150; i++) {
  //   samplePayment = [...samplePayment, generateFakePaymentData()];

  saveToDB(i);
}
// console.log(JSON.stringify(samplePayment));

console.log('4', Date.now() - start);
saveToDB();
console.log('5', Date.now() - start);
