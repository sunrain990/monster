/**
 * Created by kevin on 16/6/22.
 */
// function* foo () {
//     var index = 0;
//     while (index < 2) {
//         yield ++index
//     }
// }
// var bar =  foo();
//
// console.log(bar.next());    // { value: 0, done: false }
// console.log(bar.next());    // { value: 1, done: false }
// console.log(bar.next());    // { value: undefined, done: true }

function *foo () {
    yield 1;
    yield 2;
    yield 3;
}

for (v of foo()) {
    console.log(v);
}