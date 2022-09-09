// function isPangram(string) {
//     let az = 'abcdefghijklmnopqrstuvwxyz';

//     let str = string.split('').map(el => {
//         return el.toLowerCase();
//     });

//     let regex = /^[A-Z]+$/i;

//     let x = [...new Set(str.filter(el => el.match(regex)).filte.sort().join(''))].join('');

//     return az === x ? true : false;
// };


// console.log(isPangram("The quick Brown fox jumps over the lazy dog"))
// console.log(isPangram('Pack my box with five dozen liquor jugs.'));
// console.log(isPangram('ABCD45EFGH,IJK,LMNOPQR56STUVW3XYZ'))