/*
 * @Author: taoyage
 * @FileName: accord.js 						   
 * @Date:   2017-01-27 01:28:00 						   
 * @Last Modified by:   taoyage 	   
 * @Last Modified time: 2017-02-01 16:27:36 	   
 */


/**
 * @description
 * 
 * 将代码包裹在立即执行的匿名函数当中，以避免对全局环境造成污染
 * 通过传入 window 对象，可以使 window 对象变为局部变量，
 * 这样当在 jQuery 代码块中访问 window 对象时，不需要将作用域链回退到顶
 * 层作用域，从而可以更快地访问 window 对象
 * 
 * @param  {[Object]} 	 window 
 * @return {[type]}     [description]
 */
(function(w) {
    'use strict';

    /**
     * @discription 创建Accord构造函数
     * @param {[String]} selector 				  [选择器]
     * @param {[Object]} context  				  [HTMLElement 选择器上下文]
     * @return new Accord.init(selector,context)  [方便用户使用Accord()时,无需再次进行实例化操作]
     */
    var Accord = function(selector, context) {
        return new Accord.fn.init(selector, context);
    };

    /**
     * [创建原型对象,并添加一些默认的属性与方法]
     * @type {Function}
     */
    Accord.fn = Accord.prototype = {
        constructor: Accord,
        length: 0,
        toArray: function() {
            return arr.slice.call(this);
        },
        map: function() {

        }
    };

    /**
     * @discription 
     * 用来解析参数selector和context的类型并执行相应的查找
     * 
     * 
     * @param  {[String]} selector 	[选择器]
     * @param  {[Object]} context  	[选择器上下文]
     * @return {[type]}          	[description]
     */
    Accord.fn.init = function(selector, context) {
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

    /*扩展一些静态方法*/
    Accord.extend({

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
