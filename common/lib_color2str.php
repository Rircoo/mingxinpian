<?php
function color2str($color)
{
	$strColor = "";
	switch($color){
		case "#ffffff":
			$strColor = "白色";
		break;
		case "#ef68a5":
			$strColor = "杜鹃花色";
		break;
		case "#01a252":
			$strColor = "爱尔兰绿色";
		break;
		case "#dd0000":
			$strColor = "红色";
		break;
		case "#008fc4":
			$strColor = "翠蓝";
		break;
		case "#008fc3":
			$strColor = "宝石蓝";
		break;
		case "#008fc2":
			$strColor = "宝蓝色";
		break;
		case "#bfc1c5":
			$strColor = "运动灰";
		break;
		case "#101b33":
			$strColor = "藏青色";
		break;
		case "#eb6224":
			$strColor = "橙色";
		break;
		case "#111111":
			$strColor = "黑色";
		break;
		case "#fcd865":
			$strColor = "雛菊色";
		break;
		case "#f7c9d9":
			$strColor = "浅粉色";
		break;
		case "#44316e":
			$strColor = "紫色";
		break;
		case "#e52679":
			$strColor = "海里康花色";
		break;
		case "#a7d173":
			$strColor = "浅绿色";
		break;
		case "#cbe1f6":
			$strColor = "天蓝色";
		break;
		case "#f1b0b7":
			$strColor = "粉色";
		break;
		case "#789360":
			$strColor = "正绿色";
		break;

		
		default:
			$strColor = "其他";
	};
	return $strColor;
}
?>