class LocalStorageMock {
	constructor() {
	  this.store = {};
	}
  
	clear() {
	  this.store = {};
	}
  
	getItem(key) {
	  return this.store[key] || null;
	}
  
	setItem(key, value) {
	  this.store[key] = String(value);
	}
  
	removeItem(key) {
	  delete this.store[key];
	}
  }
  
global.localStorage = new LocalStorageMock;

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});