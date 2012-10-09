
module("Dictionary");

test("getset", function() {
    var tmp = new Dictionary();
    tmp.set("test", "value");
    equal(tmp.get("test"), "value");
});

test("getsetint", function() {
    var tmp = new Dictionary();
    tmp.set(5, "value");
    equal(tmp.get(5), "value");
});

test("toArray", function() {
    var tmp = new Dictionary().set(8, 5);
    var res = tmp.toArray();
    equal(res[0], 5);
});

test("each", function() {
    var tmp = new Dictionary();
    tmp.set("test", "value");
    tmp.each(function(v, k) {
        equal(k, "test");
        equal(v, "value");
    });
});

test("eachint", function() {
    var tmp = new Dictionary();
    tmp.set(3, "value");
    tmp.each(function(v, k) {
        equal(k, 3);
        equal(v, "value");
    });
});

test("equal", function() {
    var tmp = new Dictionary();
    tmp.set(3, "value1")
        .set(5, "value2");
    var tmp2 = new Dictionary();
    tmp2.set(5, "value2")
        .set(3, "value1");
    ok(tmp.isEqual(tmp2));
});

test("map", function() {
    var tmp = new Dictionary().set(8, "value");
    var res = tmp.map(function(v, k) { return "" + k*2 + v });
    equal(res[0], "16value");
});

test("reduce", function() {
    var tmp = new Dictionary().set(8, "value");
    var res = tmp.reduce(function(mem, v, k) { return mem + (k*2) + v}, "xxx");
    equal(res, "xxx16value");
});

test("reduceRight", function() {
    var tmp = new Dictionary().set(8, "value");
    var res = tmp.reduceRight(function(mem, v, k) { return mem + (k*2) + v}, "xxx");
    equal(res, "xxx16value");
});

test("find", function() {
    var tmp = new Dictionary().set(8, "value").set(9, "value");
    var res = tmp.find(function(v, k) { return k === 8 && v === "value"});
    equal(res, "value");
    res = tmp.find(function(v, k) { return k === 10});
    equal(res, undefined);
});

test("filter", function() {
    var tmp = new Dictionary().set(8, "value").set(9, "value");
    var res = tmp.filter(function(v, k) { return v === "value"});
    equal(res[0], "value");
    equal(res[1], "value");
});

test("where", function() {
    var tmp = new Dictionary().set(8, {xxx:5}).set(9, {xxx:2});
    var res = tmp.where({xxx: 5});
    equal(res[0].xxx, 5);
});

test("reject", function() {
    var tmp = new Dictionary().set(8, 5).set(9, 2);
    var res = tmp.reject(function(v) { return v === 5 });
    equal(res[0], 2);
});

test("all", function() {
    var tmp = new Dictionary().set(8, 5).set(9, 5);
    var res = tmp.all(function(v) { return v === 5 });
    equal(res, true);
    tmp.set(8, 2);
    res = tmp.all(function(v) { return v === 5 });
    equal(res, false);
});

test("any", function() {
    var tmp = new Dictionary().set(8, 5).set(9, 5);
    var res = tmp.any(function(v) { return v === 5 });
    equal(res, true);
    tmp.set(8, 2);
    res = tmp.any(function(v) { return v === 5 });
    equal(res, true);
    tmp.set(9, 2);
    res = tmp.any(function(v) { return v === 5 });
    equal(res, false);
});

test("contains", function() {
    var tmp = new Dictionary().set(8, 5).set(9, 5);
    var res = tmp.contains(5);
    equal(res, true);
    var res = tmp.contains(2);
    equal(res, false);
});

test("invoke", function() {
    var myvar = null;
    var tmp = new Dictionary().set(8, {fct: function(arg) {myvar = arg}});
    tmp.invoke("fct", "something");
    equal(myvar, "something");
});

test("pluck", function() {
    var tmp = new Dictionary().set(8, {key: "haha"});
    var res = tmp.pluck("key");
    equal(res[0], "haha");
});

test("max", function() {
    var tmp = new Dictionary().set(8, 8).set(9, 9);
    var res = tmp.max();
    equal(res, 9);
});

test("min", function() {
    var tmp = new Dictionary().set(8, 8).set(9, 9);
    var res = tmp.min();
    equal(res, 8);
});

test("sortBy", function() {
    var tmp = new Dictionary().set(8, {xxx:5}).set(9, {xxx:9});
    var res = tmp.sortBy("xxx");
    equal(res[0].xxx, 5);
    equal(res[1].xxx, 9);
});

test("sortBy", function() {
    var tmp = new Dictionary().set(8, {xxx:5}).set(9, {xxx:9});
    var res = tmp.sortBy("xxx");
    equal(res[0].xxx, 5);
    equal(res[1].xxx, 9);
});

test("groupBy", function() {
    var tmp = new Dictionary().set(8, {xxx:5}).set(9, {xxx:9}).set(10, {xxx:5});
    var res = tmp.groupBy("xxx");
    equal(res.get(5)[0].xxx, 5);
    equal(res.get(5)[1].xxx, 5);
    equal(res.get(9)[0].xxx, 9);
});

test("countBy", function() {
    var tmp = new Dictionary().set(8, {xxx:5}).set(9, {xxx:9}).set(10, {xxx:5});
    var res = tmp.countBy("xxx");
    equal(res[5], 2);
    equal(res[9], 1);
});

test("shuffle", function() {
    var tmp = new Dictionary().set(8, 5);
    var res = tmp.shuffle();
    equal(res[0], 5);
});

test("size", function() {
    var tmp = new Dictionary().set(8, 5).set(9, 5);
    equal(tmp.size(), 2);
});

test("keys", function() {
    var tmp = new Dictionary().set(8, 5);
    equal(tmp.keys()[0], 8);
});

test("values", function() {
    var tmp = new Dictionary().set(8, 5);
    equal(tmp. values()[0], 5);
});

test("pairs", function() {
    var tmp = new Dictionary().set(8, 5);
    var res = tmp.pairs();
    equal(res[0][0], 8);
    equal(res[0][1], 5);
});

test("invert", function() {
    var tmp = new Dictionary().set(8, 5);
    var res = tmp.invert();
    equal(res.get(5), 8);
    equal(res.get(8), undefined);
});

test("functions", function() {
    var tmp = new Dictionary().set(8, 5).set(9, function(){});
    var res = tmp.functions();
    equal(res.length, 1);
    equal(res[0], 9);
});

test("extend", function() {
    var tmp = new Dictionary().set(8, 5);
    var tmp2 = new Dictionary().set(9, 15);
    tmp.extend(tmp2);
    equal(tmp.size(), 2);
    equal(tmp.get(8), 5);
    equal(tmp.get(9), 15);
    tmp = new Dictionary().set(8, 5);
    tmp2 = new Dictionary().set(8, 15);
    tmp.extend(tmp2);
    equal(tmp.size(), 1);
    equal(tmp.get(8), 15);
    tmp = new Dictionary().set("a", 5);
    tmp.extend({"b": 15});
    equal(tmp.size(), 2);
    equal(tmp.get("a"), 5);
    equal(tmp.get("b"), 15);
    tmp = new Dictionary().set("a", 5);
    tmp.extend({"a": 15});
    equal(tmp.size(), 1);
    equal(tmp.get("a"), 15);
});

test("clone", function() {
    var tmp = new Dictionary().set(8, 5);
    var res = tmp.clone();
    equal(res.size(), 1);
    equal(res.get(8), 5);
});

test("pick", function() {
    var tmp = new Dictionary().set(8, 5).set(9, 6);
    var res = tmp.pick(9);
    equal(res.get(9), 6);
    equal(res.get(8), undefined);
});

test("omit", function() {
    var tmp = new Dictionary().set(8, 5).set(9, 6);
    var res = tmp.omit(8);
    equal(res.get(9), 6);
    equal(res.get(8), undefined);
});

test("defaults", function() {
    var tmp = new Dictionary().set(8, 5);
    var res = tmp.defaults(new Dictionary().set(8, 6).set(9,10));
    equal(res.get(8), 5);
    equal(res.get(9), 10);
});

test("has", function() {
    var tmp = new Dictionary().set(8, 5);
    equal(tmp.has(8), true);
    equal(tmp.has(9), false);
});

test("isEmpty", function() {
    var tmp = new Dictionary();
    equal(tmp.isEmpty(), true);
    tmp.set(8,5);
    equal(tmp.isEmpty(), false);
});

