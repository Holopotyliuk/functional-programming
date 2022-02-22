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
const flow = (...fn) => rectangles => fn.reduce((res, fn) => fn(res), rectangles)

let small = r => r.width < 10;
let hasColor = c => r => r.color == c;
let isSquare = r => r.width == r.height;
let isRectangle = r => r.width !== r.height;
let calcArea = r => r.width * r.height;
let calcPerimeter = r => (r.width + r.height) * 2;

let filter = fn => rectangles => rectangles.filter(fn)
console.log('Filter', filter(isSquare)(rectangles))

let map = fn => rectangles => rectangles.map(fn)
console.log('map', map(calcArea)(rectangles))

let reduce=fn=>rectangles=>rectangles.reduce((sum,r)=>sum+fn(r),0)
console.log('reduce', reduce(calcArea)(rectangles))

let maxAreaWithBlackSquare = flow(
    filter(hasColor('black')),
    filter(isSquare),
    map(calcArea),
    lodashMax
)
console.log('max area', maxAreaWithBlackSquare(rectangles))

let sumPerimeterWithRedRectangle = flow(
    filter(hasColor('red')),
    filter(isRectangle),
    reduce(calcPerimeter),
)
console.log('sum perimeter', sumPerimeterWithRedRectangle(rectangles))

let And = (f1, f2) => rectangl => f1(rectangl) && f2(rectangl);
let selectRedSquare = rectangles
    .filter(And(isSquare, hasColor('red')))
console.log('and', selectRedSquare)

let or = (f1, f2) => rectangl => f1(rectangl) || f2(rectangl);
let selectSquareOrRedRectangle = rectangles
    .filter(or(isSquare, hasColor('red')))
console.log('or', selectSquareOrRedRectangle)

let all = (...fn) => rectangl => fn.every(f => f(rectangl))
let selectWhereAllTrue = rectangles
    .filter(all(isSquare, small, hasColor('red')))
console.log('all', selectWhereAllTrue)

let any = (...fn) => rectangl => fn.some(f => f(rectangl))
let selectWhereAnyTrue = rectangles
    .filter(any(isSquare, small, hasColor('red')))
console.log('any', selectWhereAnyTrue)
