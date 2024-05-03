type TODO = unknown;
type DIFFERENT_TODO = unknown;
// All you gotta do is correct this code to fully compile on `npm run test`
// replace all todo by the type needed, try to use interface, types, union, etc ....

type Animal = {
    name: string
}
type QuietFunction = () => void;
type Dog = Animal & {
    bark: QuietFunction
}

let vare : string|number = 5;
vare = "changing";

const test1 : Animal = {name: "pedro"}

console.log(test1.name)

function makeBark(shyAnimal : Animal) : Dog {
    return {...shyAnimal, bark: () => console.log("ouaf")}
}

const test2 = makeBark(test1);

test2.bark();
