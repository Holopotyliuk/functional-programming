let flow = require('lodash/fp/flow');
let lodashFilter = require('lodash/fp/filter');
let lodashMap = require('lodash/fp/map')
let lodashSum = require('lodash/fp/sum')
let lodashMax = require('lodash/fp/max');
const { F } = require('lodash/fp');
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
        width: 9,
        height: 9,
        color: 'red'
    },
    {
        width: 9,
        height: 9,
        color: 'black'
    },
    {
        width: 11,
        height: 10,
        color: 'red'
    },
    {
        width: 11,
        height: 11,
        color: 'red'
    }
]
let small = r => r.width < 10;
let hasColor = c => r => r.color == c;
let isSquare = r => r.width == r.height;
let calcArea = r => r.width * r.height;
let calcPerimeter = r => (r.width + r.height) * 2;

let selectSquare = fn => rectangles => rectangles.filter(fn)
console.log('filter', selectSquare(isSquare)(rectangles))

let calcAreas = fn => rectangles => rectangles.map(fn)
console.log('map', calcAreas(calcArea)(rectangles))

let sumCalcArea = fn => rectangles => rectangles.reduce((sum, r) => {
    return sum + fn(r);
}, 0)
console.log('reduce', sumCalcArea(calcArea)(rectangles))

let maxAreaWithBlackSquare = flow(
    lodashFilter(hasColor('black')),
    lodashFilter(isSquare),
    lodashMap(calcArea),
    lodashMax
)
console.log('max area', maxAreaWithBlackSquare(rectangles))

let sumPerimeterWithRedRectangle = flow(
    lodashFilter(hasColor('red')),
    lodashMap(calcPerimeter),
    lodashSum
)
console.log('sum perimeter', sumPerimeterWithRedRectangle(rectangles))
