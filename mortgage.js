$(function() {
	document.getElementById("typetab-content-ul").addEventListener("swipeleft", function() {
		cc("left")
	});
	document.getElementById("typetab-content-ul").addEventListener("swiperight", function() {
		cc("right")
	});
	var headheight = $(".title").height() + $(".typetab-title").height();
	var liheight = window.screen.height - headheight;
	$(".typetab-content .typetab-content-li").css({
		"overflow-y": "scroll",
		"max-height": liheight,
		"margin-top": headheight
	});
	$("#typetab-title li").click(function() {
		var index = $("#typetab-title li").index($(this));
		$("#typetab-title li").removeClass("typetab-title-active").eq(index).addClass("typetab-title-active");
		var width = "-" + $("#typetab-content").width() * index;
		$("#typetab-content-ul").animate({
			left: width
		});
	})

	function cc(direction) {
		var index = $("#typetab-title li").index($(".typetab-title-active"));
		var width = $("#typetab-content").width()
		if(direction == "left") {
			if(index < 1) {
				width = ("-" + width) * (index + 1);
				$("#typetab-content-ul").animate({
					left: width
				});
				$("#typetab-title li").removeClass("typetab-title-active").eq(index + 1).addClass("typetab-title-active")
			}
		} else {
			if(index > 0) {
				width = ("-" + width) * (index - 1);
				console.log(width)
				$("#typetab-content-ul").animate({
					left: width
				});
				$("#typetab-title li").removeClass("typetab-title-active").eq(index - 1).addClass("typetab-title-active")
			}
		}
	}
	//房贷的年利率
	var rateArr = [
		["4.35", "4.75", "4.9"],
		["2.75", "3.25"]
	];
	$(".deadline-ul li").click(function() {
		var num = parseInt($(this).attr("deadlinenum"))+1;
		var standard;
		if($(".deadline-ul").index($(this).parent()) == "0" && $(this).parent().hasClass("open")) {
			var List = $(this).parent().parent().find(".rate-ul");
			List.empty();
			if(num == 1) {
				standard=rateArr[0][0];
			} else if(1 <num && num <= 5) {
				standard=rateArr[0][1];
			} else {
				standard=rateArr[0][2];
			}
			List.attr("num",(standard*1.3+0.004).toFixed(2)).html("<li class='rate inputbox-li' num="+(standard*1.3+0.004).toFixed(2)+"><h2>2018年1月1日利率上限（1.3倍）</h2></li><li class='rate inputbox-li' num="+(standard*1.2+0.004).toFixed(2)+"><h2>2018年1月1日利率上限（1.2倍）</h2>	</li><li class='rate inputbox-li' num="+(standard*1.1+0.004).toFixed(2)+"><h2>2018年1月1日利率上限（1.1倍）</h2></li><li class='rate inputbox-li' num="+(standard*0.85+0.004).toFixed(2)+"><h2>2018年1月1日利率下限（85折）</h2></li>	<li class='rate inputbox-li' num="+(standard*0.7+0.004).toFixed(2)+"><h2>2018年1月1日利率下限（7折）</h2></li>	<li class='rate inputbox-li' num="+standard+"><h2>2018年1月1日基准利率</h2></li>")
		} else if($(".deadline-ul").index($(this).parent()) == "1" && $(this).parent().hasClass("open")) {
			var List = $(this).parent().parent().find(".rate-ul");
			List.empty();
			if(num < 6) {
				standard=rateArr[1][0];
			} else {
				standard=rateArr[1][1];
			}
			List.attr("num",standard).html("<li class='rate' num="+standard+"><h2>2018年1月1日基准利率</h2></li>")
		}
	})
	$(".inputbox").on("click",".inputbox-li",function() {
		if($(this).parent().hasClass("open")) {
			$(this).parent().removeClass("open").css({
				"height": "1.7rem",
				"borderBottom": "1px solid #DDD"
			})
			$(this).parent().attr("num", $(this).attr("num")).prepend($(this));
		} else {
			$(this).parent().addClass("open").css({
				"height": "auto",
				"borderBottom": "0px"
			})
		}
	})
	$(".formulamode span").click(function() {
		var index = $(".formulamode span").index($(this));
		$(this).parent().find("span").removeClass("acitve");
		$(this).addClass("acitve")
		if(index == "0") {
			$(this).parent().parent().find(".price").hide()
			$(this).parent().parent().find(".area").show()
		} else {
			$(this).parent().parent().find(".area").hide()
			$(this).parent().parent().find(".price").show()
		}
	})
	$(".compute").click(function() {
		var computeIndex = $(".compute").index($(this));
		var activeIndex = $(".typetab-content-li").eq(computeIndex).find(".formulamode").find("span").index($(".typetab-content-li").eq(computeIndex).find(".formulamode").find(".acitve"))
		//按揭年份
		var deadlineval = parseInt($(".typetab-content-li").eq(computeIndex).find(".deadline-ul").attr("num"));
		var monthNum = deadlineval * 12;
		//贷款利率
		var rateval = $(".typetab-content-li").eq(computeIndex).find(".rate-ul").attr("num");
		//		if(computeIndex == "0") {
		//单位
		var unitval = parseFloat($(".typetab-content-li").eq(computeIndex).find(".unit-input").val());
		//面积
		var areaval = parseFloat($(".typetab-content-li").eq(computeIndex).find(".area-input").val());
		//按揭成数
		var loanval = $(".typetab-content-li").eq(computeIndex).find(".loan-ul").attr("num");
		//还款方式
		if($(".typetab-content-li").eq(computeIndex).find(".way-ul").attr("num") == "0") {
			if(activeIndex == "0") {
				//				console.log("商业贷款等额本息")
				//房屋总价
				var amountNum = unitval * areaval;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(0).find("span").text((amountNum).toFixed(2) + "元");
				//贷款总额
				var loanlNum = amountNum * loanval;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(1).find("span").text((loanlNum).toFixed(2) + "元");
				//每月还款额=[贷款本金×月利率×（1+月利率）^还款月数]÷[（1+月利率）^还款月数－1]
				var ratem = rateval / 1200;
				var aa = 1 + ratem;
				var cc = Math.pow(aa, monthNum);
				var loanamount = (loanlNum * ratem * cc) / (cc - 1);
				var loanlNums = (amountNum * (1 - loanval)).toFixed(2);
				var totalAmount = loanamount * monthNum;
				var interest = totalAmount - loanlNum;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(2).find("span").text((totalAmount).toFixed(2) + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(3).find("span").text((interest).toFixed(2) + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(4).find("span").text(loanlNums + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(5).find("span").text(monthNum + "月")
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(6).find("span").removeClass("calculate-ol-li").text((loanamount).toFixed(2) + "元");
			} else {
				var amountNum = parseFloat($(".typetab-content-li").eq(computeIndex).find(".amount-input").val()) * 10000;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(0).find("span").text("略");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(1).find("span").text((amountNum).toFixed(2) + "元");
				var ratem = rateval / 1200;
				var aa = 1 + ratem;
				var cc = Math.pow(aa, monthNum);
				var loanamount = (amountNum * ratem * cc) / (cc - 1);
				var totalAmount = loanamount * monthNum;
				var interest = totalAmount - amountNum;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(2).find("span").text((totalAmount).toFixed(2) + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(3).find("span").text((interest).toFixed(2) + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(4).find("span").text("0元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(5).find("span").text(monthNum + "月")
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(6).find("span").removeClass("calculate-ol-li").text((loanamount).toFixed(2) + "元");
			}
		} else {
			if(activeIndex == "0") {
				//				每月月供额=(贷款本金÷还款月数)+(贷款本金-已归还本金累计额)×月利率
				//     		每月应还利息=剩余本金×月利率=(贷款本金-已归还本金累计额)×月利率
				var amountNum = unitval * areaval;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(0).find("span").text((amountNum).toFixed(2) + "元");
				var loanlNum = amountNum * loanval;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(1).find("span").text((loanlNum).toFixed(2) + "元");
				var loanlNums = (amountNum * (1 - loanval)).toFixed(2);
				var ratem = rateval / 1200;
				var loanamount = "";
				var endNum = 0;
				var totalAmount = 0;
				for(var i = 0; i < monthNum; i++) {
					endNum = (loanlNum / monthNum) + (loanlNum - loanlNum / monthNum * i) * ratem;
					var endnum = (endNum).toFixed(2);
					loanamount += "第" + (i + 1) + "个月还款" + endnum + "元</br>";
					totalAmount += endNum;
				}
				var interest = totalAmount - loanlNum;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(2).find("span").text((totalAmount).toFixed(2) + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(3).find("span").text((interest).toFixed(2) + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(4).find("span").text(loanlNums + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(5).find("span").text(monthNum + "月")
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(6).find("span").addClass("calculate-ol-li").html(loanamount);
			} else {
				var amountNum = parseFloat($(".typetab-content-li").eq(computeIndex).find(".amount-input").val()) * 10000;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(0).find("span").text("略");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(1).find("span").text((amountNum).toFixed(2) + "元");
				var ratem = rateval / 1200;
				var loanamount = "";
				var endNum = 0;
				var totalAmount = 0;
				for(var i = 0; i < monthNum; i++) {
					endNum = (amountNum / monthNum) + (amountNum - amountNum / monthNum * i) * ratem;
					var endnum = (endNum).toFixed(2);
					loanamount += "第" + (i + 1) + "个月还款" + endnum + "元</br>";
					totalAmount += endNum;
				}
				var interest = totalAmount - amountNum;
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(2).find("span").text((totalAmount).toFixed(2) + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(3).find("span").text((interest).toFixed(2) + "元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(4).find("span").text("0元");
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(5).find("span").text(monthNum + "月")
				$(".typetab-content-li").eq(computeIndex).find(".calculate-ol").find("li").eq(6).find("span").addClass("calculate-ol-li").html(loanamount);
			}
		}
	})
	$(".reset-btn").click(function(){
		var index=$(".reset-btn").index($(this));
		$(".calculate-ol").eq(index).find("li").eq(0).find("span").text("0元");
		$(".calculate-ol").eq(index).find("li").eq(1).find("span").text("0元");
		$(".calculate-ol").eq(index).find("li").eq(2).find("span").text("0元");
		$(".calculate-ol").eq(index).find("li").eq(3).find("span").text("0元");
		$(".calculate-ol").eq(index).find("li").eq(4).find("span").text("0元");
		$(".calculate-ol").eq(index).find("li").eq(5).find("span").text("0月");
		$(".calculate-ol").eq(index).find("li").eq(6).find("span").text("0元");
	})
})