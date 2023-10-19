
function greet(name) {
    return `Hello, ${name}!`;
}

function calculateTriangleArea(base, height) {
    return 0.5 * base * height;
}

function generateRandomArray(length, min, max) {
    const randomArray = [];
    for (let i = 0; i < length; i++) {
        randomArray.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return randomArray;
}

function reverseArray(arr) {
    return arr.reverse();
}

