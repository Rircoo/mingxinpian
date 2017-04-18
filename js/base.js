//my js ：通用js文件

'use strict';
$(function() {
	var eclick = "click",
		initType;
	try {
		initType = initConfig.type;
	} catch (err) {

	};

	function wechatLogin(flag) {
		var user = $.cookie('biz_user_id');
		$.ajax({
			async: true,
			url: "../yourteebiz/api/ajax/interface_diy.php",
			type: "GET",
			data: {
				act: "checkLoginState",
				user: user
			},
			dataType: "json",
			success: function(data) {
				//console.log(data);
				//console.log(user);
				if (data.returnTag == "success") {; //已经登录
				} else {
					var host = window.location.host;
					var redirectUrl = "http://www.yourtee.cn" + location.pathname + location.search;
					redirectUrl = encodeURI(redirectUrl).replace("&", "---");

					//判断系统
					if (isWeiXin()) {
						location.href = "page_app_wx_redirect.php?url=" + redirectUrl;
					} else {
						var totalUrl = "http://www.yourtee.cn/yourteebiz/page_pc_wx_redirect.php?url=" + redirectUrl;
						var wxUrl = "https://open.weixin.qq.com/connect/qrconnect?appid=wx37ebcfcf32ae302c&redirect_uri=" + escape(totalUrl) + "&response_type=code&scope=snsapi_login&state=3d6be0a4035d839573b04816624a415e#wechat_redirect";
						if (flag) {
							wxUrl = "";
						}
						LoginModule.createdLoginModule();
						LoginModule.setLoginUrl(wxUrl);
					}
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				alert("error" + textStatus);
			}
		});
	}

	//登录
	function signin() {
		var loginBtn = $("#login-btn");
		var $uName = '',
			$uPass = '',
			nameIpt = $('.user-name'),
			passwordIpt = $('.user-password'),
			handleTips = $('.handle-tipss'),
			ajaxFlag = true;

		loginBtn.on(eclick, function(e) {
			$uName = $.trim(nameIpt.val());
			$uPass = $.trim(passwordIpt.val());

			if (!$uName) {
				nameIpt.focus();
				handleTips.html('请输入正确账号');
				return false;
			};

			if (!$uPass) {
				passwordIpt.focus();
				handleTips.html('请输入正确密码');
				return false;
			};

			if (ajaxFlag) {
				ajaxFlag = false;
				getAjax({
					data: {
						act: 'login',
						username: $uName,
						password: $uPass
					},
					done: function(data) {
						if (data.returnTag == 'success') {
							handleTips.html('登录成功，正在跳转');
							window.location.href = "index.php";
						} else {
							handleTips.html('账号或密码错误');
						};
						ajaxFlag = true;
					},
					fail: function(xhr, status, err) {
						ajaxFlag = true;
						handleTips.html('连接失败，请检查网络');
					}
				});
			};
		});
	};

	//注册
	function signup() {
		wechatLogin();
		var doneBtn = $(".done-btn");
		var $uName = '',
			$uPass = '',
			$confirmPass = '',
			$originName = '',
			$uEmail = '',
			$uMobile = '',
			nameIpt = $('.user-name'),
			passwordIpt = $('.user-password'),
			confirmPassword = $('.confirm-password'),
			origin = $('.origin'),
			emailIpt = $('.email'),
			mobileIpt = $('.mobile'),
			handleTips = $('.handle-tipss'),
			ajaxFlag = true;

		doneBtn.on(eclick, function(e) {
			handleTips.html('');
			$uName = $.trim(nameIpt.val());
			$uPass = $.trim(passwordIpt.val());
			$uEmail = $.trim(emailIpt.val());
			$uMobile = $.trim(mobileIpt.val());
			$confirmPass = $.trim(confirmPassword.val());
			$confirmPass = $.trim(confirmPassword.val());
			$originName = $.trim(origin.val());
			if (!$uName) {
				nameIpt.focus();
				handleTips.html('请输入账号');
				return false;
			};
			if (!$uPass) {
				passwordIpt.focus();
				handleTips.html('请确认密码');
				return false;
			};
			if ($uPass.length < 6) {
				passwordIpt.focus();
				handleTips.html('密码长度不能小于6位');
				return false;
			};
			if (!$confirmPass) {
				confirmPassword.focus();
				handleTips.html('请输入密码');
				return false;
			};
			if ($confirmPass != $uPass) {
				confirmPassword.focus();
				handleTips.html('两次密码不一致');
				return false;
			};
			var reg = /^\w+$/;
			if (!reg.test($originName)) {
				origin.focus();
				handleTips.html('请输入正确格式经销商标示（字母、数字）');
				return false;
			};
			if (!$uEmail) {
				emailIpt.focus();
				handleTips.html('请确认Email');
				return false;
			};
			if (!$uMobile) {
				mobileIpt.focus();
				handleTips.html('请确认联系电话');
				return false;
			} else {
				var numReg = /\d{11,11}/g;
				if (!numReg.test($uMobile)) {
					handleTips.html('请输入正确的手机号码');
					return false;
				}
			}



			if (ajaxFlag) {
				ajaxFlag = false;
				getAjax({
					data: {
						act: 'register',
						username: $uName,
						password: $uPass,
						password_confirm: $confirmPass,
						origin: $originName,
						user: $.cookie('biz_user_id'),
						email: $uEmail,
						mobile: $uMobile
					},
					done: function(data) {
						if (data.returnTag == 'success') {
							handleTips.html('注册成功，正在跳转');
							window.location.href = "index.php";
						} else {
							handleTips.html('注册失败，用户名、邮箱、联系电话或经销商标示存在重复');
						};
						ajaxFlag = true;
					},
					fail: function(xhr, status, err) {
						ajaxFlag = true;
						handleTips.html('连接失败，请检查网络');
					}
				});
			};
		});
	};

	//注销
	function logout() {
		var logoutBtn = $("#logout");
		logoutBtn.on(eclick, function() {
			getAjax({
				data: {
					act: 'logout'
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						window.location.reload();
					} else {
						alert('连接失败');
					};
				},
				fail: function(xhr, status, err) {
					alert('连接失败，请检查网络');
				}
			});
		});
	};

	//获取订单列表
	function order_list() {
		var countPage = 0; //数据总量

		function getData(currPage, paginationFn) {
			getAjax({
				data: {
					act: 'getOrderList',
					page: currPage
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						countPage = Math.ceil(data.returnCount / 10);
						ceated_order_list(data.returnValue);
						paginationFn && paginationFn(countPage);
					} else {
						$(".order-list-box").html('<p class="msg-tips">未有记录。</p>');
					};
				},
				fail: function(xhr, status, err) {
					alert('连接失败，请检查网络');
				}
			});
		}
		getData(1, pagination);
		//分页
		function pagination(countPage) {
			if (countPage > 1) {
				$('.ui-pagination').pagination({
					pageCount: countPage,
					coping: true,
					homePage: '首页',
					endPage: '末页',
					prevContent: '上页',
					nextContent: '下页',
					callback: function(api) {
						getData(api.getCurrent(), false)
					}
				});
			} else {
				$('.ui-pagination').remove();
			}
		};

		//创建订单列表
		function ceated_order_list(data) {
			var dataArr = []; //新数据
			//数据解析
			for (var i = 0; i < data.length; i++) {
				var order_sn = data[i].order_sn,
					truename = data[i].truename,
					goods_cate_name = data[i].goods_cate_name,
					province = data[i].province,
					status = data[i].status,
					num = parseInt(data[i].num),
					price = data[i].price,
					updateTime = data[i].update_time;

				for (var j = i + 1; j < data.length; j++) {
					if (data[i].order_sn == data[j].order_sn) {
						num += parseInt(data[j].num);
						data.splice(j, 1);
						j--;
					}
				}

				dataArr.push({
					order_sn: order_sn,
					truename: truename,
					goods_cate_name: goods_cate_name,
					num: num,
					totalPrice: price,
					status: status,
					province: province,
					updateTime: updateTime
				})
			};

			//创建订单节点
			var itemsHtml = "";
			for (i = 0; i < dataArr.length; i++) {
				itemsHtml += "<tr>" +
					"<td><a href='order_detail.php?para=" + dataArr[i].order_sn + "'>" + dataArr[i].order_sn + "</a></td>" +
					"<td><span>" + dataArr[i].truename + "</span></td>" +
					"<td><span>" + dataArr[i].goods_cate_name + "</span></td>" +
					"<td><span>" + dataArr[i].num + "</span></td>" +
					"<td><span>" + dataArr[i].totalPrice + "</span></td>" +
					"<td><span>" + returnSta(dataArr[i].status) + "</span></td>" +
					"<td><span>" + dataArr[i].updateTime + "</span></td>" +
					"</tr>";
			};
			$("#order-list-wrap").html(itemsHtml);
		};
	};

	//订单详情
	function order_detail() {
		var orderSn = getUrlParam('para');

		var collect,
			address, //地址
			mobile, //联系方式
			order, //订单号
			truename, //收件人
			update_time, //订单时间
			shipping_sn,
			status, //订单状态
			pay_location; //支付地址

		getAjax({
			data: {
				act: 'getOrderDetail',
				sn: orderSn
			},
			done: function(data) {
				console.log(data)

				if (data.returnTag == 'success') {
					ceated_order_detail(data.returnValue)
				} else {
					$(".order-detail-box").html('<p class="msg-tips">未有记录。</p>');
				};
			},
			fail: function(xhr, status, err) {
				alert('连接失败，请检查网络');
			}
		});

		function ceated_order_detail(data) {
			var order_sn,
				statusTxt;
			address = data[0].province + data[0].city + data[0].address; //地址
			mobile = data[0].mobile; //联系方式
			order_sn = data[0].order_sn; //订单号
			truename = data[0].truename; //收件人
			update_time = data[0].update_time; //订单时间
			shipping_sn = data[0].shipping_sn;
			status = data[0].status; //订单状态值
			statusTxt = returnSta(status); ////订单状态文字

			if (!shipping_sn) {
				shipping_sn = "无";
			}

			var itemsHtml = "",
				userInfoHtml = "";
			for (var i = 0; i < data.length; i++) {
				var goodsColor = colorToStr(data[i].goods_cate_color);
				itemsHtml += "<tr>" +
					"<td>" + data[i].goods_cate_name + "</td>" +
					"<td>" + data[i].goods_cate_size + "</td>" +
					"<td>" + data[i].num + "</td>" +
					"<td>" + goodsColor + "</td>" +
					"</tr>";
			};

			userInfoHtml = "<tr>" +
				"<td>" + order_sn + "</td>" +
				"<td>" + truename + "</td>" +
				"<td>" + address + "</td>" +
				"<td>" + mobile + "</td>" +
				"<td>" + statusTxt + "</td>" +
				"<td>" + shipping_sn + "</td>" +
				"<td>" + update_time + "</td>" +
				"</tr>";

			$("#order-detail-list").html(itemsHtml);
			$("#user-info-items").html(userInfoHtml);
			$(".order-detail-wrap").show();
		};
	};

	//编辑银行
	function bankEdit() {
		// init
		var submitBtn = $('.s-btn'),
			title = $('#title'),
			bankname = $('#bankname'),
			banksub = $('#banksub'),
			name = $('#name'),
			province = $('#province'),
			city = $('#city'),
			address = $('#address'),
			validate = $('#validate'),
			code = $('#code');

		getAjax({
			data: {
				act: 'getBank'
			},
			done: function(data) {
				initSet(data)
			},
			fail: function(xhr, status, err) {
				alert('连接失败，请检查网络');
			}
		});

		//初始化
		function initSet(data) {
			var oCity = new ui_area_loader();
			if (data.returnTag == 'success') {
				data = data.returnValue;
				if (data.bankname) {
					bankname.find("option").each(function() {
						if ($(this).text() == data.bankname) {
							$(this).prop("selected", true);
						}
					})
				}
				title.val(data.title);
				bankname.val(data.bankname);
				banksub.val(data.banksub);
				name.val(data.name);

				//地址plugin
				oCity.bind_elements({
					province: '.province',
					city: '.city',
					county: '.district'
				}, {
					province: data.province,
					city: data.city
				});

				address.val(data.address);
				code.val(data.code);
				validate.val(data.validate);
			} else {
				//地址plugin
				oCity.bind_elements({
					province: '.province',
					city: '.city',
					county: '.district'
				});
			}
		}

		//提交
		submitBtn.on(eclick, submitSet);

		function submitSet(e) {
			var titleVal = $.trim(title.val()), //国家
				banknameVal = $.trim(bankname.val()), //银行
				banksubVal = $.trim(banksub.val()), //分行
				nameVal = $.trim(name.val()), //户名
				provinceVal = $.trim(province.val()),
				cityVal = $.trim(city.val()),
				addressVal = $.trim(address.val()),
				codeVal = $.trim(code.val()), //卡号
				validateVal = $.trim(validate.val()); //证件号


			var msgTips = $('.msg-tips');
			msgTips.html('');

			if (!titleVal) {
				msgTips.html('请填写抬头信息');
				title.focus();
				return false;
			};
			if (!banknameVal) {
				msgTips.html('请填写银行信息');
				bankname.focus();
				return false;
			};
			if (!banksubVal) {
				msgTips.html('请填写分行信息');
				banksub.focus();
				return false;
			};
			if (!addressVal) {
				msgTips.html('请填写地址信息');
				address.focus();
				return false;
			};
			if (!nameVal) {
				msgTips.html('请填写开户人姓名');
				name.focus();
				return false;
			};
			if (!codeVal) {
				msgTips.html('请填写卡号');
				code.focus();
				return false;
			};
			if (!validateVal) {
				msgTips.html('请填写身份证件号');
				validate.focus();
				return false;
			};

			getAjax({
				data: {
					act: 'editBank',
					title: titleVal,
					province: provinceVal,
					city: cityVal,
					address: addressVal,
					bankname: banknameVal,
					banksub: banksubVal,
					validate: validateVal,
					name: nameVal,
					code: codeVal
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						alert('提交成功');
					} else {
						msgTips.html('提交失败');
					}
				},
				fail: function(xhr, status, err) {
					alert('连接失败，请检查网络');
				}
			});
		};
	};

	function mobileEdit() {
		var currPhone = 0;
		var handleTips = $('.msg-tips');

		getAjax({
			async: false,
			data: {
				act: 'getMobile'
			},
			done: function(data) {
				if (data.returnTag == 'success') {
					currPhone = data.returnValue;
					$('#mobile_old').val(currPhone);
				} else {}
			},
			fail: function(xhr, status, err) {
				alert('连接失败，请检查网络');
			}
		});

		//获取验证码
		var ajaxFlag = true;
		$('.get-validate').on('click', function() {
			var that = $(this);
			if (!ajaxFlag) {
				return false;
			}
			ajaxFlag = false;
			getAjax({
				data: {
					act: 'validateMobile',
					phone: currPhone
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						handleTips.html('验证码已发送至手机请查收，如未收到请稍后再试');

						var i = 30;
						var timer = setInterval(function() {
							that.html('重新获取 ' + i + ' s');
							i--;
							if (i <= 0) {
								that.html('获取验证码');
								clearInterval(timer)
							}
						}, 1000);
					} else {
						handleTips.html('获取验证码失败');
						ajaxFlag = true;
					}
				},
				fail: function(xhr, status, err) {
					alert('连接失败，请检查网络');
					ajaxFlag = true;
				}
			});

		});

		//提交
		$('.submit-btn').on('click', function() {

			var newNum = $.trim($('#mobile_new').val()),
				validate = $.trim($('#validate').val());

			handleTips.html('');
			if (!validate) {
				$('#validate').focus();
				handleTips.html('请输入正确的验证码');
				return false;
			}

			if (!newNum) {
				$('#mobile_new').focus();
				handleTips.html('请确认联系电话');
				return false;
			} else {
				var numReg = /\d{11,11}/g;
				if (!numReg.test(newNum)) {
					handleTips.html('请输入正确的手机号码');
					return false;
				}
			}
			getAjax({
				async: false,
				data: {
					act: 'editMobile',
					mobile_old: currPhone,
					mobile_new: newNum,
					validate: validate
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						alert('修改成功');
						location.reload();
					} else {
						handleTips.html('修改失败');
					}
				},
				fail: function(xhr, status, err) {
					alert('连接失败，请检查网络');
				}
			});

		});

	};

	//编辑密码
	function passwordEdit() {
		var currPhone = 0;
		var handleTips = $('.msg-tips');
		var ajaxFlag = true;

		//提交
		$('.submit-btn').on('click', function() {
			var passwordold = $('#passwordold').val(),
				passwordnew = $('#passwordnew').val(),
				passwordconfirm = $('#passwordconfirm').val();

			handleTips.html('');

			if (!passwordold) {
				handleTips.html('请输入正确的密码');
				$('#passwordold').focus();
				return false;
			}

			if (!passwordnew) {
				$('#passwordnew').focus();
				handleTips.html('请输入正确的新密码');
				return false;
			}

			if (!passwordconfirm) {
				$('#passwordconfirm').focus();
				handleTips.html('请输入确认密码');
				return false;
			} else {
				if (passwordconfirm != passwordnew) {
					handleTips.html('两次密码不一致');
					$('#passwordconfirm').focus();
					return false;
				}
			}
			getAjax({
				async: false,
				data: {
					act: 'editPassword',
					passwordold: passwordold,
					passwordnew: passwordnew
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						alert('修改成功');
						location.reload();
					} else {
						handleTips.html('修改失败');
					}
				},
				fail: function(xhr, status, err) {
					alert('连接失败，请检查网络');
				}
			});
		});
	};

	//申请提现
	function withdraw() {
		var amountInput = $('#amount-input'),
			bankName = $('#bank-name'),
			infoBox = $('#info-box'),
			passwordInput = $('#password-input'),
			validateInput = $('#validate'),
			submitBtn = $('.submit-btn'),
			msgTips = $('.msg-tips'),
			maxNumber; //最大金额

		//获取当前手机号码
		var currPhone = 0;
		getAjax({
			async: false,
			data: {
				act: 'getMobile'
			},
			done: function(data) {
				if (data.returnTag == 'success') {
					currPhone = data.returnValue;
					$('#mobile_old').val(currPhone);
				} else {}
			},
			fail: function(xhr, status, err) {
				alert('连接失败，请检查网络');
			}
		});

		//获取验证码
		var ajaxFlag = true;
		$('.get-validate').on('click', function() {
			var that = $(this);
			if (!ajaxFlag) {
				return false;
			}
			ajaxFlag = false;
			getAjax({
				data: {
					act: 'validateMobile',
					phone: currPhone
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						msgTips.html('验证码已发送至手机请查收，如未收到请稍后再试');

						var i = 30;
						var timer = setInterval(function() {
							that.html('重新获取 ' + i + ' s');
							i--;
							if (i <= 0) {
								that.html('获取验证码');
								clearInterval(timer)
							}
						}, 1000);
					} else {
						msgTips.html('获取验证码失败');
						ajaxFlag = true;
					}
				},
				fail: function(xhr, status, err) {
					alert('连接失败，请检查网络');
					ajaxFlag = true;
				}
			});

		});


		getAjax({
			data: {
				act: 'getMaxExtract'
			},
			async: false,
			done: function(data) {
				if (data.returnTag == 'success') {
					maxNumber = data.returnValue;
				} else {
					maxNumber = 0
				};
				amountInput.prop('placeholder', '当前最大可以提领金额 ￥' + data.returnValue + '元');
			},
			fail: function(xhr, status, err) {
				alert('连接失败，请检查网络');
			}
		});

		var amountVal, //金额val
			bankNameVal, // 银行val
			passwordVal, //密码
			validateVal, //验证码
			infoVal; //说明val
		var regNum; //金额正则;
		var ajaxFlag = true;
		//提交申请
		submitBtn.on(eclick, function() {
			if (!ajaxFlag) {
				return false;
			} else {
				ajaxFlag = false;
			};

			msgTips.text('');
			regNum = /^\d+(\.\d+)?$/g; //只能匹配数字和小数

			amountVal = $.trim(amountInput.val());
			bankNameVal = $.trim(bankName.val());
			infoVal = $.trim(infoBox.val());
			passwordVal = passwordInput.val();
			validateVal = validateInput.val();
			if (maxNumber == 0) {
				msgTips.text('当前没有可提领金额');
				ajaxFlag = true;
				return false;
			};
			if (!regNum.test(amountVal) || amountVal <= 0) {
				amountInput.focus();
				msgTips.text('请输入正确金额');
				ajaxFlag = true;
				return false;
			};
			if (amountVal > maxNumber) {
				amountInput.focus();
				msgTips.text('金额不能大于可提领金额');
				ajaxFlag = true;
				return false;
			};
			if (!bankNameVal) {
				bankName.focus();
				msgTips.text('请选择银行');
				ajaxFlag = true;
				return false;
			};
			if (!infoVal) {
				infoBox.focus();
				msgTips.text('请填写说明');
				ajaxFlag = true;
				return false;
			};
			if (!passwordVal) {
				passwordInput.focus();
				msgTips.text('请输入正确密码');
				ajaxFlag = true;
				return false;
			};
			if (!validateVal) {
				validateInput.focus();
				msgTips.text('请输入正确验证码');
				ajaxFlag = true;
				return false;
			};
			getAjax({
				data: {
					act: 'addExtract',
					pay: amountVal,
					remark: infoVal,
					password: passwordVal,
					validate: validateVal
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						alert('提领成功');
						window.location.href = "financial_list.php";
					} else {
						msgTips.text('密码错误');
					};
					ajaxFlag = true;
				},
				fail: function(xhr, status, err) {
					ajaxFlag = true;
					msgTips.text('连接失败，请检查网络');
				}
			});
		});
	};

	//提领纪录
	function withdraw_record() {
		getAjax({
			data: {
				act: 'getExtract'
			},
			done: function(data) {
				if (data.returnTag == 'success') {
					renderView(data.returnValue);
				} else {
					$('.withdraw-record-box').html('<p class="msg-tips">未有记录。</p>');
				};
			},
			fail: function(xhr, status, err) {
				alert('连接失败，请检查网络');
			}
		});

		function renderView(daga) {
			var itemsHtml = "";
			for (var i = 0; i < data.length; i++) {
				itemsHtml += "<tr>" +
					"<td>" + i + "</td>" +
					"<td><span>" + data[i].amount + "</span></td>" +
					"<td><span>" + data[i].remark + "</span></td>" +
					"<td><span>" + data[i].num + "</span></td>" +
					"<td><span>" + data[i].status + "</span></td>" +
					"<td><span>" + data[i].update_time + "</span></td>" +
					"</tr>";
			};
			$("#withdraw-record-list").html(itemsHtml);
		};
	};

	//红包查询
	function getCouponList() {
		getAjax({
			data: {
				act: 'getCoupon'
			},
			done: function(data) {
				if (data.returnTag == 'success') {
					renderView(data.returnValue);
				} else {
					$('.withdraw-record-box').html('<p class="msg-tips">未有记录。</p>');
				};
			},
			fail: function(xhr, status, err) {
				alert('连接失败，请检查网络');
			}
		});

		function renderView(data) {
			//$('.list-box').html('<p class="msg-tips">未有记录。</p>');
			var itemsHtml = "",
				orderSn = '';
			for (var i = 0; i < data.length; i++) {

				if (data[i].order_sn) {
					orderSn = '<b>（' + data[i].order_sn + '）</b>';
				} else {
					orderSn = '';
				}

				itemsHtml += "<tr>" +
					"<td><span>" + data[i].sn + orderSn + "</span></td>" +
					"<td><span>" + data[i].price + "</span></td>" +
					"<td><span>" + data[i].limit + "</span></td>" +
					"<td><span>" + couponStatus(data[i].status) + "</span></td>" +
					"<td><span>" + data[i].update_time + "</span></td>" +
					"<td><a class='remove-btn' href='javascript:;' data-sn=" + data[i].sn + orderSn + ">删除</a></td>" +
					"</tr>";
			};
			$("#list-wrap").html(itemsHtml);
		};


		function remove() {
			$("#list-wrap").on('click', '.remove-btn', function() {
				var sn = $(this).data('sn');
				var _that = $(this);
				if (!confirm('确定删除？')) {
					return false;
				}
				getAjax({
					async: false,
					data: {
						act: 'delCoupon',
						sn: sn
					},
					done: function(data) {
						if (data.returnTag == 'success') {
							_that.parents('tr').remove()
						} else {
							alert('删除失败');
						};
					},
					fail: function(xhr, status, err) {
						alert('连接失败，请检查网络');
					}
				});
			});
		}
		remove();

		function couponStatus(status) {
			var statusTxt = '';
			if (status == 0) {
				statusTxt = '未使用';
			};
			if (status == 1) {
				statusTxt = '已使用';
			};
			return statusTxt;
		};
	};

	//生成红包
	function makeCoupon() {
		var numInput = $('#num-input'),
			priceInput = $('#price-input'),
			limitInput = $('#limit-input'),
			typeBox = $('#type'),
			submitBtn = $('.s-btn'),
			msgTips = $('.msg-tips');

		var regNum, //金额正则;只能匹配数字和小数
			regInt = /^\d+$/; //整数
		var ajaxFlag = true;
		var num,
			price,
			limitNum,
			type;

		//时间
		$("#end-input").datepicker({
			format: 'yyyy-mm-dd'
		});

		var endTime = $('.date-input').val();

		/*var date = new Date(),
			inow = date.getFullYear() + '-' + timeInit(date.getMonth() + 1) + '-' + timeInit(date.getDate());
		timeStart.val(inow);
		function timeInit(t) {
			if (t < 10) {
				t ='0'+t;
			}
			return t;
		};*/

		submitBtn.on(eclick, function() {
			if (!ajaxFlag) {
				return false;
			} else {
				ajaxFlag = false;
			};
			msgTips.text('');
			regNum = /^\d+(\.\d+)?$/g; //只能匹配数字和小数

			num = $.trim(numInput.val());
			price = $.trim(priceInput.val());
			limitNum = $.trim(limitInput.val());
			type = $.trim(typeBox.val());
			endTime = $.trim($('.date-input').val());
			if (num == 0 || !num || !regInt.test(num)) {
				msgTips.text('请填写正确红包数量');
				ajaxFlag = true;
				return false;
			};
			if (!price || price == 0 || !regNum.test(price)) {
				msgTips.text('请填写正确红包金额');
				ajaxFlag = true;
				return false;
			};
			regNum = /^\d+(\.\d+)?$/g; //只能匹配数字和小数
			if (!limitNum || !regNum.test(limitNum)) {
				msgTips.text('请填写正确满减金额');
				ajaxFlag = true;
				return false;
			};

			if (Number(price) >= Number(limitNum)) {
				msgTips.text('红包金额必须小于满减金额');
				ajaxFlag = true;
				return false;
			};

			type = type || 1;

			if (!endTime) {
				endTime = '2099-01-01';
			};
			getAjax({
				data: {
					act: 'makeCoupon',
					num: num,
					limit: limitNum,
					price: price,
					type: type,
					limitDate: endTime
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						alert('已完成');
						location.href = "coupon_list.php";
					} else {
						msgTips.text('账户余额不足，生成红包失败');
					};
					ajaxFlag = true;
				},
				fail: function(xhr, status, err) {
					ajaxFlag = true;
					msgTips.text('连接失败，请检查网络');
				}
			});

		});
	};

	//我的定制
	function DesignList() {
		//wechatLogin();
	}

	//充值
	function TopUp() {
		var numInput = $('#amount-input');
		var submitBtn = $('.s-btn');
		var msgTips = $('.msg-tips');

		var regNum, //金额正则;只能匹配数字和小数
			regInt = /^\d+$/; //整数
		var ajaxFlag = true;
		var num;


		submitBtn.on(eclick, function() {
			if (!ajaxFlag) {
				return false;
			} else {
				ajaxFlag = false;
			};
			msgTips.text('');
			regNum = /^\d+(\.\d+)?$/g; //只能匹配数字和小数

			num = $.trim(numInput.val());
			if (num == 0 || !num || !regNum.test(num)) {
				msgTips.text('请填写正确充值金额');
				ajaxFlag = true;
				return false;
			};
			getAjax({
				data: {
					act: 'makeDeposit',
					price: num
				},
				done: function(data) {
					if (data.returnTag == 'success') {
						location.href = "pay_ali.php?type=1&pass=" + data.returnValue;
					} else {
						msgTips.text('充值失败');
					};
					ajaxFlag = true;
				},
				fail: function(xhr, status, err) {
					ajaxFlag = true;
					msgTips.text('连接失败，请检查网络');
				}
			});

		});
	};

	//模块调用
	signin(); //登录
	logout(); //注销
	if (initType == "signup") {
		//注册
		signup();
	};
	if (initType == "orderList") {
		//订单列表
		order_list();
	};
	if (initType == "orderDetail") {
		//订单详情
		//order_detail();
	};
	if (initType == "bankEdit") {
		//编辑银行
		bankEdit();
	};
	if (initType == "withdraw") {
		//申请提现
		withdraw();
	};
	if (initType == "withdraw_record") {
		//提现记录
		withdraw_record();
	};
	if (initType == "couponList") {
		//红包查询
		getCouponList();
	};
	if (initType == 'makeCoupon') {
		//红包生成
		makeCoupon();
	};
	if (initType == 'userDesignList') {
		//定制list
		DesignList();
	};
	if (initType == 'topUp') {
		//充值
		TopUp();
	};
	// 编辑手机
	if (initType == 'mobile_edit') {
		mobileEdit();
	}
	// 编辑密码
	if (initType == 'password_edit') {
		passwordEdit();
	}
});