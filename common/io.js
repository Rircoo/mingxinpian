/*	Io.js-1.0 bate;
 *	update: 2016.7
 *	feedback: doxo-live@qq.com
 *	@Bruce
 */
"use strict";
(function(global, factory) {
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		define(function() {
			return factory(global)
		});
	} else {
		return factory(global);
	}
}(this, function(window) {
	var io = {
		browser: function() {
			var check = {};
			var u = navigator.userAgent,
				ua = u.toLowerCase(),
				app = navigator.appVersion;
			//检测是否微信
			check.isweixin = ua.match(/MicroMessenger/i) == 'micromessenger';

			//检测浏览器版本
			check.versions = { //移动终端浏览器版本信息
				trident: u.indexOf('Trident') > -1, //IE内核
				presto: u.indexOf('Presto') > -1, //opera内核
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
				mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/) && u.indexOf('QIHU') && u.indexOf('Chrome') < 0, //是否为移动终端
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
				iPad: u.indexOf('iPad') > -1, //是否iPad
				webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
				weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
				qq: u.match(/\sQQ/i) == " qq" //是否QQ
			};
			//检测浏览器语言
			check.language = (navigator.browserLanguage || navigator.language).toLowerCase();

			//检测当前环境是否支持触屏
			check.isTouch = "ontouchstart" in document ? true : false;

			//检测当前环境是支持css 属性
			check.css = function(style) {
				if (!style) {
					return false;
				}
				var prefix = ['webkit', 'moz', 'ms', 'o'],
					i,
					humpString = [],
					htmlStyle = document.documentElement.style,
					_toHumb = function(string) {
						return string.replace(/-(\w)/g, function($0, $1) {
							return $1.toUpperCase();
						});
					};
				for (i in prefix) {
					humpString.push(_toHumb(prefix[i] + '-' + style));
				}
				humpString.push(_toHumb(style));

				for (i in humpString) {
					if (humpString[i] in htmlStyle) {
						return humpString[i];
					}
				}
				return false;
			};

			check.cssPrefix = function() {
				var versions = this.versions,
					prefix;
				if (versions.webKit) {
					prefix = "webkit";
				} else if (versions.gecko) {
					prefix = "moz";
				} else if (versions.presto) {
					prefix = "o";
				} else if (versions.trident) {
					prefix = "ms";
				} else {
					prefix = "";
				}
				return prefix
			};

			check.getUrlParam = function(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
				var r = window.location.search.substr(1).match(reg); //匹配目标参数
				if (r != null) return unescape(r[2]);
				return null; //返回参数值
			};

			return check;
		},
		noConflict: function() {
			window.$$ = null;
			//return 
			return this;
		}
	};
	window.Io = io;
	window.$$ === undefined && (window.$$ = Io);
}));
//console.log(Io.browser().cssPrefix())
//DOC
/*
顶级对象 Io = $$

范例
Io.browser();
$$.browser();

browser： 检测浏览器支持类
	var checkBrowser = $$.browser();
	checkBrowser.isweixin;	//属性调用方式
	checkBrowser.versions().ios	//方法调用

noConflict：解决 $$ 与其他库冲突问题

	Io.noConflict(); //$$ = null; 只能使用用Io调用
	var o = Io.noConflict(); //o = Io
	o.browser();

*/