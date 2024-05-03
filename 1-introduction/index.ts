type TODO = unknown;
// All you gotta do is correct this code to fully compile on `npm run test`
// replace all todo by the type needed, try to use interface, types, union, etc ....

let vare : TODO = 5;
vare = "changing";

const test1 : TODO = {name: "pedro"}

console.log(test1.name)

function makeBark(shyAnimal : TODO) : TODO {
    return {...shyAnimal, bark: () => console.log("ouaf")}
}

const test2 = makeBark(test1);

test2.bark();
