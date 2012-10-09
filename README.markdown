
DictionaryJS
============

A javascript library to define dictionaries that can be indexed using any data type. This library also provides utility methods similar to the functions provided by underscore.

Dependencies
------------

* Underscore 1.4.1 or superior

How to use
----------

Include the dictionary.js script in your page. Then you can use the Dictionary class. Sample usage:

    var dict = new Dictionary();

    dict.set(53, 44);

    console.log(dict.get(53));
    // print "44"

    dict.each(function(v, k) {
        console.log(typeof k, typeof v);
        // print "number number"
    });
