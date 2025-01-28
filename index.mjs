import { process } from "./process.mjs";

// Первые значения для проверки
const store = [
  { size: 1, quantity: 2 },
  { size: 2, quantity: 3 },
  { size: 3, quantity: 1 },
];

const order = [
  { id: 100, size: [1] },
  { id: 101, size: [2] },
  { id: 102, size: [2, 3], masterSize: "s1" },
  { id: 103, size: [1, 2], masterSize: "s2" },
];

let result = process(store, order);
console.log(result);

// Вторые значения для проверки
/*
const store1 = [
  { size: 1, quantity: 1 },
  { size: 2, quantity: 1 },
  { size: 3, quantity: 1 },
];

const order1 = [
  { id: 100, size: [1] },
  { id: 101, size: [2, 3], masterSize: "s2" },
];

result = process(store1, order1);
console.log(result);
*/