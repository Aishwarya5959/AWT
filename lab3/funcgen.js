function* countUpTo(max) {
    let count = 1;
    while (count <= max) {
        yield count++;
    }
}
const counter = countUpTo(5);
console.log(counter.next()); 
console.log(counter.next()); 
console.log(counter.next());
console.log(counter.next());
console.log(counter.next());
console.log(counter.next());