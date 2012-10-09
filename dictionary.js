/*
    Copyright Nicolas Vanhoren, 2012

    Released under the terms of the MIT license.
*/

Dictionary = function() {
    this.table = {};
    this.to_string = Dictionary.default_to_string;
    this.extend.apply(this, arguments);
}

Dictionary.default_to_string = function(val) {return val};

Dictionary.prototype = {
    set: function(k, v) {
        this.table[this.to_string(k)] = v !== undefined ? [k, v] : undefined;
        return this;
    },
    get: function(k, v) {
        var tmp = this.table[this.to_string(k)];
        return tmp !== undefined ? tmp[1] : undefined;
    },
    each: function(iterator, context) {
        var self = this;
        return _.each(this.table, function(v) { return _.bind(iterator, context)(v[1], v[0], self)} );
    },
    map: function(iterator, context) {
        var self = this;
        return _.map(this.table, function(v) { return _.bind(iterator, context)(v[1], v[0], self) });
    },
    reduce: function(iterator, memo, context) {
        var self = this;
        return _.reduce(this.table, function(mem, v) { return _.bind(iterator, context)(mem, v[1], v[0], self) }, memo);
    },
    reduceRight: function(iterator, memo, context) {
        var self = this;
        return _.reduceRight(this.table, function(mem, v) { return _.bind(iterator, context)(mem, v[1], v[0], self) }, memo);
    },
    find: function(iterator, context) {
        var self = this;
        var tmp = _.find(this.table, function(v) { return _.bind(iterator, context)(v[1], v[0], self) })
        if (tmp instanceof Array)
            return tmp[1];
        return tmp;
    },
    filter: function(iterator, context) {
        var self = this;
        return _.pluck(_.filter(this.table, function(v) { return _.bind(iterator, context)(v[1], v[0], self) }), 1);
    },
    where: function(properties) {
        var self = this;
        return _.where(this.toArray(), properties);
    },
    reject: function(iterator, context) {
        var self = this;
        return _.pluck(_.reject(this.table, function(v) { return _.bind(iterator, context)(v[1], v[0], self) }), 1);
    },
    all: function(iterator, context) {
        var self = this;
        return _.all(this.table, function(v) { return _.bind(iterator, context)(v[1], v[0], self) });
    },
    any: function(iterator, context) {
        var self = this;
        return _.any(this.table, function(v) { return _.bind(iterator, context)(v[1], v[0], self) });
    },
    contains: function(value) {
        var self = this;
        return _.contains(this.toArray(), value);
    },
    invoke: function() {
        var self = this;
        return _.invoke.apply(_, [this.toArray()].concat(_.toArray(arguments)));
    },
    pluck: function(propertyName) {
        var self = this;
        return _.pluck(this.toArray(), propertyName);
    },
    max: function(iterator, context) {
        var self = this;
        var tmp = _.max(this.table, iterator ? function(v) { return _.bind(iterator, context)(v[1], v[0], self) } : function(v) { return v[1] });
        return tmp === undefined ? undefined : tmp[1];
    },
    min: function(iterator, context) {
        var self = this;
        var tmp = _.min(this.table, iterator ? function(v) { return _.bind(iterator, context)(v[1], v[0], self) } : function(v) { return v[1] });
        return tmp instanceof Array ? tmp[1] : tmp;
    },
    sortBy: function(iterator, context) {
        var self = this;
        return _.pluck(_.sortBy(this.table, typeof iterator === "function" ? function(v) { return _.bind(iterator, context)(v[1], v[0], self) } :
            function(v) {return v[1][iterator]}), 1);
    },
    /*
        Returns a Dictionary.
    */
    groupBy: function(iterator, context, new_to_string) {
        var self = this;
        var dict = new Dictionary();
        dict.to_string = new_to_string || Dictionary.default_to_string;
        var fct = typeof iterator === "function" ? _.bind(iterator, context) : function(v) {return v[iterator]};
        this.each(function(v, k) {
            var tmp = fct(v, k, self);
            if (dict.get(tmp) === undefined)
                dict.set(tmp, []);
            dict.get(tmp).push(v);
        });
        return dict;
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
    invert: function(new_to_string) {
        var tmp = new Dictionary();
        tmp.to_string = new_to_string || Dictionary.default_to_string;
        this.each(function(v, k) {
            tmp.set(v, k);
        });
        return tmp;
    },
    functions: function() {
        var tmp = {};
        return _.filter(this.map(function(v, k) {return typeof v === "function" ? k : tmp}), function(el) {return el !== tmp});;
    },
    /*
        Accepts objects, Dictionary or list of tuples
    */
    extend: function() {
        var self = this;
        _.each(_.toArray(arguments), function(el) {
            if (el instanceof Dictionary) {
                el.each(function(v, k) {
                    self.set(k, v);
                });
            } else if (el instanceof Array) {
                _.each(el, function(v) {
                    self.set(v[0], v[1]);
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
        tmp.to_string = this.to_string;
        return tmp.extend(this);
    },
    pick: function() {
        var self = this;
        var tmp = this.clone();
        var index = {};
        _.each(_.toArray(arguments), function(k) {
            index[self.to_string(k)] = true;
        });
        _.each(tmp.keys(), function(k) {
            if (! index[self.to_string(k)]) {
                tmp.set(k, undefined);
            }
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
        var self = this;
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
        return _.isEmpty(this.table);
    },
    isEqual: function(other) {
        // not sure this will work
        return _.isEqual(this.table, other.table);
    }, 
}
