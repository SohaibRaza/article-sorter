export let sortBy = (function () {
    let toString = Object.prototype.toString,
    // default parser function
    parse = function (x) { return x; },
    // gets the item to be sorted
    getItem = function (x) {
        let isObject = x != null && typeof x === "object";
        let isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
    };
    return function sortby (array, cfg) {
        if (!(array instanceof Array && array.length)) return [];
        if (toString.call(cfg) !== "[object Object]") cfg = {};
        if (typeof cfg.parser !== "function") cfg.parser = parse;
        cfg.desc = !!cfg.desc ? -1 : 1;
        return array.sort(function (a, b) {
            a = getItem.call(cfg, a);
            b = getItem.call(cfg, b);
            return cfg.desc * (a < b ? -1 : +(a > b));
        });
    };

}());