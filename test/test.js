
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
    equal(res[5][0].xxx, 5);
    equal(res[5][1].xxx, 5);
    equal(res[9][0].xxx, 9);
});

test("groupBy", function() {
    var tmp = new Dictionary().set(8, {xxx:5}).set(9, {xxx:9}).set(10, {xxx:5});
    var res = tmp.countBy("xxx");
    equal(res[5], 2);
    equal(res[9], 1);
});


/*

    sortBy: function(iterator, context) {
        var self = this;
        return _.pluck(_.sortBy(this.table, typeof iterator === "function" ? function(v) { return _.bind(iterator, context)(v[1], v[0], self) } :
            function(v) {return v[1][iterator]}), 1);
    },
    groupBy: function(iterator, context) {
        // TODO: consider returning a dictionary ?
        var self = this;
        var tmp = _.groupBy(this.table, typeof iterator === "function" ? function(v) { return _.bind(iterator, context)(v[1], v[0], self) } :
            function(v) {return v[1][iterator]});
        _.each(_.keys(tmp), function(k) {
            tmp[k] = _.pluck(tmp[k], 1);
        })
        return tmp;
    },
    countBy: function(iterator, context) {
        var self = this;
        return _.countBy(this.table, typeof iterator === "function" ? function(v) { return _.bind(iterator, context)(v[1], v[0], self) } :
            function(v) {return v[1][iterator]});
    },
    shuffle: function() {
        var self = this;
        return _.shuffle(this.toArray());
    },
    toArray: function() {
        var self = this;
        return _.pluck(this.table, 1);
    },
    size: function() {
        return _.size(this.table);
    },
    keys: function() {
        return _.pluck(this.table, 0);
    },
    values: function() {
        return this.toArray();
    },
    pairs: function() {
        return this.map(function(v, k) {return [k, v];});
    },
    invert: function() {
        var tmp = new Dictionary();
        this.each(function(v, k) {
            tmp.set(v, k);
        });
        return tmp;
    },
    functions: function() {
        var tmp = {};
        return _.filter(this.map(function(v, k) {return typeof v === "function" ? k : tmp}), function(el) {return el !== tmp});;
    },
    extend: function() {
        var self = this;
        _.each(_.toArray(arguments), function(el) {
            if (el instanceof Dictionary) {
                el.each(function(v, k) {
                    self.set(k, v);
                });
            } else {
                _.each(el, function(v, k) {
                    self.set(k, v);
                });
            }
        });
        return this;
    },
    clone: function() {
        var tmp = new Dictionary();
        tmp.to_string = this.to_string();
        return tmp.extend(this);
    },
    pick: function() {
        var self = this;
        var tmp = this.clone();
        var index = {}
        _.each(_.toArray(arguments), function(k) {
            index[self.to_string(k)] = true;
        });
        _.each(tmp.keys(), function(k) {
            if (! index[self.to_string(k)])
                tmp.set(k, undefined);
        });
        return tmp;
    },
    omit: function() {
        var self = this;
        var tmp = this.clone();
        var index = {}
        _.each(_.toArray(arguments), function(k) {
            index[self.to_string(k)] = true;
        });
        _.each(tmp.keys(), function(k) {
            if (!! index[self.to_string(k)])
                tmp.set(k, undefined);
        });
        return tmp;
    },
    defaults: function() {
        _.each(_.toArray(arguments), function(def) {
            if (! (def instanceof Dictionary))
                def = (new Dictionary()).extend(def);
            def.each(function(v, k) {
                var tmp = self.get(k);
                if (tmp === undefined || tmp === null)
                    self.set(k, v);
            });
        });
        return this;
    },
    has: function(key) {
        return this.get(key) !== undefined;
    },
    isEmpty: function() {
        return this.size() === 0;
    }
    */
