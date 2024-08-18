const start = Date.now();
console.log('@@@', Date.now() - start);
let faker = require('@faker-js/faker');
console.log('@@@', Date.now() - start);
const mongoose = require('mongoose');
const PaymentModel = require('./../models/paymentModel'); // Adjust the path as needed

console.log('1', Date.now() - start);

const DATABASE_PASSWORD = '................';
const DATABASE_URL = `.............................................`;
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
  '66bfb0f5682b184fe989e098',
  '66bfb0f5682b184fe989e0a2',
  '66bfb0f5682b184fe989e097',
  '66bfb0f5682b184fe989e099',
  '66bfb0f5682b184fe989e096',
];

const memberIds = [
  '66bfb2d814566c86bacfa913',
  '66bfb2d814566c86bacfa901',
  '66bfb2d814566c86bacfa911',
  '66bfb2d814566c86bacfa912',
  '66bfb2d814566c86bacfa914',
  '66bfb2d814566c86bacfa902',
  '66bfb2d814566c86bacfa915',
  '66bfb2d814566c86bacfa903',
  '66bfb2d814566c86bacfa916',
  '66bfb2d814566c86bacfa904',
  '66bfb2d814566c86bacfa905',
  '66bfb2d814566c86bacfa917',
  '66bfb2d814566c86bacfa910',
  '66bfb2d814566c86bacfa906',
  '66bfb2d814566c86bacfa918',
  '66bfb2d814566c86bacfa907',
  '66bfb2d814566c86bacfa919',
  '66bfb2d814566c86bacfa908',
  '66bfb2d814566c86bacfa91a',
  '66bfb2d814566c86bacfa91b',
  '66bfb2d814566c86bacfa909',
  '66bfb2d814566c86bacfa91c',
  '66bfb2d814566c86bacfa90a',
  '66bfb2d814566c86bacfa91d',
  '66bfb2d814566c86bacfa91e',
  '66bfb2d814566c86bacfa90b',
  '66bfb2d814566c86bacfa91f',
  '66bfb2d814566c86bacfa90c',
  '66bfb2d814566c86bacfa920',
  '66bfb2d814566c86bacfa921',
  '66bfb2d814566c86bacfa90d',
  '66bfb2d814566c86bacfa922',
  '66bfb2d814566c86bacfa90f',
  '66bfb2d814566c86bacfa90e',
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
for (let i = 1; i < 100; i++) {
  //   samplePayment = [...samplePayment, generateFakePaymentData()];

  saveToDB(i);
}
// console.log(JSON.stringify(samplePayment));

console.log('4', Date.now() - start);
saveToDB();
console.log('5', Date.now() - start);
