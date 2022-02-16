// Declaring variable with a defined type
let muted: boolean = true;
muted = false;
// muted = 'silent'; // Type 'string' is not assignable to type 'boolean'

let age = 6;
let numerator: number = 42;
let denominator: number = age;
let result = numerator / denominator; // result is of type number

let myName: string = 'Nico';
let greet = `My name is ${myName}`; // greet is of type string

// TypeScript allows to define the arrays of a certain type or group of types
let people: string[] = [];
people = ['Myke', 'Jhon', 'Laureen'];
// people.push(9000); // Argument of type 'number' is not assignable to parameter of type 'string'.

let peopleAndNumber: Array<string|number>

// TypeScript also contains a type enum that group values that can not be modified elsewhere in the code
enum Color {
    Red = 'Red',
    Green = 'Green',
    Blue = 'Blue'
}

let favoriteColor: Color = Color.Red;
console.log(`My favorite color is ${favoriteColor}`);

// In case the type of a varible used is unknown, TypeScript provies the type any 
let anyType: any = 'Joker';
anyType = { type: 'Wildcard' };

let someObject = { type: 'Wildcard' };
let alsoAnObject = { objKey: 'ObjValue'};

/**
 * Functions
 */

function add(a:number, b:number): number {
    return a + b;
}
const sum = add(2,3); // sum's type is number


// Function returning another function
type NewType = (b: number) => number;
function createAdder(a:number): NewType {
    return function (b:number) {
        return b + a;
    }
}

// Function with optional parameters
// lastname is optional thanks to the ? symbol
function fullName(firstName:string, lastName?: string) {
    return `${firstName} ${lastName}`;
}

// Parameters with default values
function fullNameWithDefault(firstName:string, lastName: string = 'Smith') {
    return `${firstName} ${lastName}`;
}

/**
 * Interfaces
 */
interface Rectangle {
    width: number,
    height: number,
    color?: string
}

// Both with & height must be included or an error would be shown. Color is optional
let rect: Rectangle = {
    width: 4,
    height: 12
}

function area(r:Rectangle) {
    return r.height * r.width; // IDE autocompletes the object parameters
}