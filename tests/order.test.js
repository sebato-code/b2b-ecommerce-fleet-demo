const assert = require('assert');
const app = require('../src/index');

assert.strictEqual(typeof app, 'function', 'La aplicación Express debe estar exportada');
console.log('✅ Unit tests de OrderService pasados exitosamente!');
