/*
 * @Author: taoyage
 * @FileName: accord.js                            
 * @Date:   2017-01-27 01:28:00                            
 * @Last Modified by:   taoyage        
 * @Last Modified time: 2017-02-04 00:43:21        
 */

(function(w) {
    'use strict';

    var
        arr = [],
        slice = arr.slice,
        push = arr.push;


        /**
         * @discription 创建Accord构造函数
         * @param {[String]} selector                 [选择器]
         * @param {[Object]} context                  [HTMLElement 选择器上下文]
         * @return new Accord.init(selector,context)  [方便用户使用Accord()时,无需再次进行实例化操作]
         */
        var Accord = function(selector, context) {
            return new Accord.fn.init(selector, context);
        };

    /**
     * [创建原型对象,并添加一些默认的属性与参加链式访问的方法]
     * @type {Function}
     */
    Accord.fn = Accord.prototype = {
        constructor: Accord,
        selector: '',
        length: 0,

        //获取当前对象元素个数
        size: function() {
            return this.length;
        },

        //将伪数组转换成真正的数组
        toArray: function() {
            return slice.call(this);
        },

        //通过下标获取dom元素
        get: function(num) {
            return num == null ? this.toArray() :
                (num < 0 ? this[this.length + num] : this[num]);
        },

        //创建一个新的空Accord对象,然后把DOM元素集合添加到新对象中,并将当前对象保存在prevObject中
        pushStack: function(elems) {
            console.log(elems)
            //通过merge方法合并对象
            var ret = Accord.merge(this.constructor(), elems)
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },

        //调用Accord.each方法进行遍历
        each: function(callback, args) {
            return Accord.each(this, callback, args);
        },

        //通过下标获取元素,并将元素添加到新对象中,返回该对象
        eq: function(i) {
            var
                len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        //获取第一个元素
        first: function() {
            return this.eq(0);
        },

        //获取最后一个
        last: function() {
            return this.eq(-1);
        },

        //通过begin,end截取元素,并添加到新对象中
        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },

        map: function() {},

        //结束当前链条中最近的筛选操作，并将匹配元素集合还原为之前的状态
        end: function() {
            return this.prevObject || this.constructor();
        },
    };

    /**
     * @discription 
     * 用来解析参数selector和context的类型并执行相应的查找
     * 
     * @param  {[String]} selector  [选择器]
     * @param  {[Object]} context   [选择器上下文]
     * @return {[type]}             [description]
     */
    var init = Accord.fn.init = function(selector, context) {
        var
            i = 0,
            nodeList;

        //selector是空字符串,null,undefined则返回空对象
        if (!selector) {
            return this;
        }

        //selector有属性nodeType则认为selector是一个dom元素,
        //设置对象第一个元素和context指向该DOM元素,length为1,返回该对象.
        if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;
        }

        //selector参数是字符串body,同时不存在参数context，存在document.body,
        //则将context指向document,将对象第一个元素指向document.body,
        //对象属性selector=selector,属性length = 1,返回该对象.
        if (selector === "body" && !context && document.body) {
            this.context = document;
            this[0] = document.body;
            this.selector = selector;
            this.length = 1;
            return this;
        }

        //  
        if (typeof selector === "string") {
            this.context = context || document;
            nodeList = this.context.querySelectorAll(selector);
            this.length = nodeList.length;
            this.selector = selector;
            for (; i < this.length; i++) {
                this[i] = nodeList[i];
            }
        }
        return this;
    };

    init.prototype = Accord.fn;

    /**
     * [extend 对Accord或Accord原型进行方法的扩展,也可指定对某个对象进行扩展]
     * @return {[object]} [返回当前对象]
     */
    Accord.extend = Accord.fn.extend = function() {
        var
            options,
            name,
            target = arguments[0] || {},
            length = arguments.length,
            i = 1;
        if (length === 0) {
            return;
        } else if (length === i) {
            target = this;
            i--;
        }
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    target[name] = options[name];
                }
            }
        }
        return target;
    };


    Accord.extend({

        /**
         * @name Accord.isArray
         * @kind function
         *
         * @description
         * Determines if a reference is an `Array`. Alias of Array.isArray.
         *
         * @param {*} value Reference to check.
         * @returns {Boolean} True if `value` is an `Array`.
         */
        isArray: Array.isArray,


        /**
         * @name Accord.isUndefined
         * @kind function
         *
         * @description
         * Determines if a reference is undefined
         * 
         * @param  {[*]}  value Reference to check
         * @return {Boolean}   True if `value` is a undefined
         */
        isUndefined: function(value) {
            return typeof value === 'undefined';
        },


        /**
         * @name Accord.isDefined
         * @kind function
         *
         * @description
         * Determines if a reference is defined
         * 
         * @param  {[*]}  value Reference to check
         * @return {Boolean}       True if `value` is a defined
         */
        isDefined: function(value) {
            return typeof value !== 'undefined';
        },


        /**
         * @name Accord.isObject
         * @kind function
         *
         * @description 
         * Determines if a reference is an `object`.Unlike `typeof` in JavaScript, 
         * null's are not considered to be objects. Note that JavaScript arrays are objects.
         * 
         * @param  {[*]}  value Reference to check 
         * @return {Boolean}     True if `value` is a object
         */
        isObject: function(value) {
            return value != null && typeof value === 'object';
        },


        /**
         * @name Accord.isString
         * @kind function
         *
         * @description
         * Determines if a refermence is a `String`
         * 
         * @param  {[*]}  value Refermence to check.
         * @return {Boolean}  True if value is a `String`
         */
        isString: function(value) {
            console.log(value);
            return typeof value === 'string';
        },

        isNumber: function(value) {
            return typeof value === 'number';
        },

        isDate: function(value) {
            return toString.call(value) === '[object Date]';
        },

        isFunction: function(value) {
            return typeof value === 'function';
        },

        isRegExp: function(value) {
            return toString.call(value) === '[object RegExp]';
        },

        isFile: function(obj) {
            return toString.call(value) === '[object File]';
        },

        isFormData: function(obj) {
            return toString.call(value) === '[object FormData]'
        },

        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

        trim: function(value) {
            return typeof value === 'String' ? value.trim() : value
        },

        //遍历
        each: function(obj, callback, args) {
            var
                name,
                i = 0,
                length = obj.length,
                isObj = length === undefined || this.isFunction(obj);

            if (isObj) {
                for (name in obj) {
                    callback.call(obj[name], obj[name]);
                }
            } else {
                for (; i < length; i++) {
                    callback.call(obj[i], obj[i], i, obj);
                }
            }
        },

        //合并对象
        merge: function(first, second) {
            var
                len = +second.length,
                j = 0,
                i = first.length;

            for (; j < len; j++) {
                first[i++] = second[j];
            }
            first.lenght = i;

            return first;
        }
    });

    /*扩展原型方法,主要用来扩展需要链式访问的方法*/
    Accord.fn.extend({

    });

    window.Accord = window.$ = Accord;


    /*数据类型判断*/
    /*字符串操作*/
    /*ajax封装*/
    /*事件封装*/
    /*选择器封装*/
    /*css属性封装*/
    /*常用动画*/
    //等等等。。。。。。。

})(window);
