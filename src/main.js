import { HashMap } from './HashMap.js';

const test = new HashMap(16, 0.75);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('Before moon insertion:');
console.log('Length:', test.length());
console.log('Capacity:', test.capacity);

test.set('moon', 'silver'); // Triggers resize

console.log('\nAfter moon insertion and resize:');
console.log('Length:', test.length());
console.log('Capacity:', test.capacity);

// Overwrite existing
test.set('apple', 'green');
test.set('lion', 'white-golden');

console.log('\nCheck values after overwrite:');
console.log('apple:', test.get('apple'));
console.log('lion:', test.get('lion'));

console.log('\nOther Method Tests:');
console.log('Has "dog"?', test.has('dog'));
console.log('Remove "banana":', test.remove('banana'));
console.log('Has "banana"?', test.has('banana'));

console.log('All Keys:', test.keys());
console.log('All Values:', test.values());
console.log('All Entries:', test.entries());

test.clear();
console.log('\nAfter clear():');
console.log('Length:', test.length());
console.log('Keys:', test.keys());
