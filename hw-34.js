function* getPartsOfWord (string) {
  let i = 0,
      value;
  while (i <= string.length) {
    i++;
    if (i > string.length) {
      return string.slice(0, i);      
    } else {
      // value = value ? yield string.slice(0, i).concat(value) : yield string.slice(0, i);
      value = yield string.slice(0, i).concat(value ?? '');
    }
  }
}

const iterator = getPartsOfWord("hello");
console.log(iterator.next()); // h
console.log(iterator.next()); // he
console.log(iterator.next('!')); // hel!
console.log(iterator.next()); // hell
console.log(iterator.next('@')); // hello@
console.log(iterator.next()); // hello
