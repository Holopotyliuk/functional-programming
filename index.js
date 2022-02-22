let flow = require('lodash/fp/flow');
let lodashFilter = require('lodash/fp/filter');
let lodashMap = require('lodash/fp/map')
let lodashSum = require('lodash/fp/sum')
let lodashMax = require('lodash/fp/max');
let rectangles = [
    {
        width: 10,
        height: 10,
        color: 'black'
    },
    {
        width: 11,
        height: 11,
        color: 'black'
    },
    {
        width: 11,
        height: 10,
        color: 'black'
    },
    {
        width: 10,
        height: 10,
        color: 'red'
    },
    {
        width: 11,
        height: 10,
        color: 'red'
    },
    {
        width: 11,
        height: 10,
        color: 'red'
    }
]
let hasColor = c => r => r.color == c;
let isSquare = r => r.width == r.height;
let calcArea = r => r.width * r.height;
let calcPerimeter = r => (r.width + r.height) * 2;

let maxAreaWithBlackSquare = flow(
    lodashFilter(hasColor('black')),
    lodashFilter(isSquare),
    lodashMap(calcArea),
    lodashMax
)
console.log(maxAreaWithBlackSquare(rectangles))

let sumPerimeterWithRedRectangle = flow(
    lodashFilter(hasColor('red')),
    lodashMap(calcPerimeter),
    lodashSum
)
console.log(sumPerimeterWithRedRectangle(rectangles))

function selectSquare(rectangles) {
    return filter(isSquare, rectangles);
}

function filter(fn, list) {
    let result = [];
    for (let item of list)
        if (fn(item))
            result.push(item);
    return result;
}
console.log('selectSquare', selectSquare(rectangles))

function calcAreas(rectangles) {
    return map(calcArea, rectangles);
}

function map(fn, list) {
    let result = [];
    for (let item of list)
        result.push(fn(item));
    return result
}
console.log('calcAreas', calcAreas(rectangles))
let number = [1, 1, 1, 1, 1];
function sum(number) {
    return reduce(add, 0, number);
}
function add(a, b) {
    return a + b;
}

function reduce(fn, initValue, list) {
    let result = initValue;
    for (let item of list)
        result = fn(result, item)
    return result;
}
console.log('sum', sum(number))

