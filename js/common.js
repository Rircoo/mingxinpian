//my js ：通用

//ajax
function getAjax(config) {
	//默认配置
	config.type = config.type || 'POST';
	if (config.async === false) {
		config.async = false
	} else {
		config.async = true;
	};
	config.url = config.url || 'api/ajax/interface_diy.php';
	$.ajax({
			type: config.type,
			async: config.async, //获得数据再执行
			url: config.url,
			data: config.data,
			dataType: 'json'
		})
		.done(function(data) {
			config.done && config.done(data)
		})
		.fail(function(xhr, status, err) {
			config.fail && config.fail(xhr, status, err)
		});
};

function getAjax2(config) {
	var defer = $.Deferred();
	//默认配置
	config.type = config.type || 'POST';
	if (config.async === false) {
		config.async = false
	} else {
		config.async = true;
	};
	config.url = config.url || 'api/ajax/interface_diy.php';

	function get() {
		var defer = $.Deferred();
		$.ajax({
				type: config.type,
				async: config.async, //获得数据再执行
				url: config.url,
				data: config.data,
				dataType: 'json'
			})
			.done(function(data) {
				defer.resolve(data)
					//config.done && config.done(data)
			})
			.fail(function(xhr, status, err) {
				//config.fail && config.fail(xhr, status, err)
			});
		return defer.promise();
	}
	$.when(get()).then(config.done, config.fail);
};


//订单状态
function returnSta(sta) {
	var status = "";
	if (sta == 0) {
		status = "未支付";
	};
	if (sta == 1) {
		status = "已支付";
	};
	if (sta == 2) {
		status = "生产中";
	};
	if (sta == 7) {
		status = "已申请退货";
	};
	if (sta == 9) {
		status = "已发货";
	};
	return status;
};

//url 参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
};

// 颜色转换
function colorToStr(color) {
	var strColor = "";
	switch (color) {
		case "#ffffff":
			strColor = "白色"
			break;
		case "#ef68a5":
			strColor = "杜鹃花色"
			break;
		case "#01a252":
			strColor = "爱尔兰绿色"
			break;
		case "#dd0000":
			strColor = "红色"
			break;
		case "#008fc4":
			strColor = "翠蓝"
			break;
		case "#bfc1c5":
			strColor = "运动灰"
			break;
		case "#101b33":
			strColor = "藏青色"
			break;
		case "#eb6224":
			strColor = "橙色"
			break;
		case "#111111":
			strColor = "黑色"
			break;
		case "#f59d1f":
			strColor = "金黄色"
			break;
		case "#f7c9d9":
			strColor = "浅粉色"
			break;
		case "#44316e":
			strColor = "紫色"
			break;
		case "#e52679":
			strColor = "海里康花色"
			break;
		case "#a7d173":
			strColor = "浅绿色"
			break;
		case "#bcd9eb":
			strColor = "天蓝色"
			break;
		case "#f1b0b7":
			strColor = "粉色"
			break;
		case "#05a277":
			strColor = "正绿色"
			break;
		default:
			strColor = "其他";
	};
	return strColor;
};

function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
};

//登录模块对象
var LoginModule = {
	createdLoginModule: function createdLoginModule() {
		var loginEle =
			'<div class="login-box">' +
			'<div class="login-code-wrap">' +
			'<iframe id="loginIframe" frameborder="0" border="0" width="100%" height="100%" scrolling="no"></iframe>' +
			'</div>' +
			'<div class="login-mask login-module-close"></div>' +
			'</div>';
		$("body").append(loginEle);

		//居中显示
		function loginView() {
			var winW = $(window).width(),
				winh = $(window).height(),
				loginW = $(".login-code-wrap").width(),
				loginH = $(".login-code-wrap").height();
			$(".login-code-wrap").css({
				left: (winW - loginW) / 2,
				top: (winh - loginH) / 2
			});
		}
		loginView();
		$(window).on("resize", function() {
			loginView();
		});

		//开关
		/*
		$(".login-module-close").on("click", function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(".login-box").hide();
		});
		*/
		$(".login-module-open").on("click", function(e) {
			e.stopPropagation();
			e.preventDefault();
			$(".login-box").show();
		})
	},
	setLoginUrl: function setLoginUrl(url) {
		//更改设置登陆url
		$(".login-box").show();
		$("#loginIframe").attr("src", url);
	}
};


//分享
var shareMoudle = {
	init: function(options) {
		var _html;
		var custom = options.custom || false;
		
		if (isWeiXin()) {
			wx.config({
				debug: false,
				appId: options.appId,
				timestamp: options.timestamp,
				nonceStr: options.nonceStr,
				signature: options.signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo'
				]
			});
			_html = '<div class="share-box">' +
				'<div class="mask-block close-method"></div>' +
				'<div class="share-img-box wx-box">' +
				'<span class="close-method close-btn">X</span>' +
				'<div class="img-wrap"><img src="../yourteebiz/images/0.png"></div>' +
				'</div>' +
				'</div>';
		} else {
			_html = '<div class="share-box">' +
				'<div class="mask-block close-method"></div>' +
				'<div class="share-img-box code-box">' +
				'<span class="share-title">' + options.title + '</span>' +
				'<span class="close-method close-btn">X</span>' +
				'<div class="img-wrap"></div>' +
				'<div class="input-wrap"><input class="share-txt"  readonly><span class="share-copy-btn" data-clipboard-target=".share-txt">复制</span></div>' +
				'</div>' +
				'</div>';
		}
		$('body').append(_html);
		$('.close-method').on('click', function() {
			$('.share-box').hide();
		});
	},
	renderCode: function(options) {
		var img;
		if (isWeiXin()) {
			wx.ready(function() {
				wx.checkJsApi({
					jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo'
					]
				});
				var shareData = {
					title: options.title,
					desc: options.desc,
					link: options.link,
					imgUrl: 'http://www.yourtee.cn/yourteebiz/share.jpg',
					trigger: function(res) {
						//alert('用户点击发送给朋友');
						;
					},
					success: function(res) {
						//alert('已分享');
					},
					cancel: function(res) {
						//alert('已取消');
						;
					},
					fail: function(res) {
						//alert(JSON.stringify(res));
						;
					}
				};
				wx.onMenuShareAppMessage(shareData);
				wx.onMenuShareTimeline(shareData);
				wx.onMenuShareQQ(shareData);
				wx.onMenuShareWeibo(shareData);
			});
			wx.error(function(res) {
				alert('wx.error: ' + JSON.stringify(res));
			});
		} else {
			$('.img-wrap').html('');
			img = new Image();
			img.src = options.src;
			img.onload = function() {
				$('.img-wrap').html('<img src="' + img.src + '">')
			};
			$('.share-txt').val(options.link);
		};
		$('.share-box').show();
	}
};