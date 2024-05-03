var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var vare = 5;
vare = "changing";
var test1 = { name: "pedro" };
console.log(test1.name);
function makeBark(shyAnimal) {
    return __assign(__assign({}, shyAnimal), { bark: function () { return console.log("ouaf"); } });
}
var test2 = makeBark(test1);
test2.bark();
