

var menu_open = 0;
function menu_action(){
	if (menu_open == 0){
		document.getElementById("topnav").style.width = "50%";
		document.getElementById("sidemenu").style.width = "50%";
		document.getElementById("sidemenu").style.display = "block";
		menu_open = 1;
	} else {
		document.getElementById("topnav").style.width = "100%";
		document.getElementById("sidemenu").style.display = "none";
		menu_open = 0;
	}
}

var pic_full = 0;
var p;
function pic_switchsize(){
	var x = document.getElementsByClassName("w3-section");
	var i;
	for (i = 0; i < x.length - 2; i++){
		if (pic_full == 0)
			x[i].style.display = "none";
		else
			x[i].style.display = "block";
	}
	if (pic_full == 0){
		p = x[i].style.padding;
		x[i].style.display = "none";
		x[x.length-1].style.padding = 0;
		pic_full = 1;
	} else {
		x[x.length-1].style.padding = p;
		pic_full = 0;
	}
}


//check route & lego cost
var start, end, line_s, line_e, station_s, station_e;
var change_line = [[0, [108203], [110303], 0, [109508]], [[203108], 0, [206309, 209305], [205405, 211410], [208511]], [[303110], [309206, 305209], 0, [304407, 310404], [307512]], [0, [405205, 410211], [407304, 404310], 0, [406509]], [[508109], [511208], [512307], [509406], 0]];
var result, cost, tmp1, tmp2, tmp3, tmp4, i, j, k;
function check_lego(){
	document.getElementById("route_ul").innerHTML = "";
	document.getElementById("route_list").style.display = "none";

	start = parseInt(document.getElementById("sstation").value);
	end = parseInt(document.getElementById("estation").value);
	if (!Number.isInteger(start) || !Number.isInteger(end)){
		alert("Error!");
		return;
	}

	line_s = parseInt(start / 100);
	line_e = parseInt(end / 100);
	station_s = start % 100;
	station_e = end % 100;

	result = "";
	if (line_s == line_e){
		mrt_route([start, end]);
	} else {
		//change line *1
		if (change_line[line_s-1][line_e-1] != 0)
			for (i = 0; i < change_line[line_s-1][line_e-1].length; i++){
				tmp1 = parseInt(change_line[line_s-1][line_e-1][i]/1000);
				tmp2 = parseInt(change_line[line_s-1][line_e-1][i]%1000);
				mrt_route([start, tmp1, tmp2, end]);
			}

		//change line *2
		for (i = 1; i <= 5; i++)
			if (i != line_s && i != line_e)
				if (change_line[line_s-1][i-1] != 0 && change_line[i-1][line_e-1] != 0)
					for (j = 0; j < change_line[line_s-1][i-1].length; j++){
						tmp1 = parseInt(change_line[line_s-1][i-1][j]/1000);
						tmp2 = parseInt(change_line[line_s-1][i-1][j]%1000);
						for (k = 0; k < change_line[i-1][line_e-1].length; k++){
							tmp3 = parseInt(change_line[i-1][line_e-1][k]/1000);
							tmp4 = parseInt(change_line[i-1][line_e-1][k]%1000);
							mrt_route([start, tmp1, tmp2, tmp3, tmp4, end]);
						}
					}

	}

	document.getElementById("route_list").style.display = "block";
}

var lego_color = ["orange", "red", "green", "yellow", "blue"];
var mrt_value = {'100':'動物園', '101':'木柵', '102':'萬芳社區', '103':'萬芳醫院', '104':'辛亥', '105':'麟光', '106':'六張犁', '107':'科技大樓', '108':'大安', '109':'忠孝復興', '110':'南京復興', '111':'中山國中', '112':'松山機場', '113':'大直', '114':'劍南路', '115':'西湖', '116':'港墘', '117':'文德', '118':'內湖', '119':'大湖公園', '120':'葫洲', '121':'東湖', '122':'南港軟體園區', '123':'南港展覽館', '226':'淡水', '225':'紅樹林', '224':'竹圍', '223':'關渡', '222':'忠義', '221':'復興崗', '220':'新北投', '220':'北投', '219':'奇岩', '218':'唭哩岸', '217':'石牌', '216':'明德', '215':'芝山', '214':'士林', '213':'劍潭', '212':'圓山', '211':'民權西路', '210':'雙連', '209':'中山', '208':'台北車站', '207':'台大醫院', '206':'中正紀念堂', '205':'東門', '204':'大安森林公園', '203':'大安', '202':'信義安和', '201':'台北101/世貿', '200':'象山', '300':'松山', '301':'南京三民', '302':'台北小巨蛋', '303':'南京復興', '304':'松江南京', '305':'中山', '306':'北門', '307':'西門', '308':'小南門', '309':'中正紀念堂', '310':'古亭', '311':'台電大樓', '312':'公館', '313':'萬隆', '314':'景美', '315':'大坪林', '316':'七張', '316':'小碧潭', '317':'新店區公所', '318':'新店', '400':'南勢角', '401':'景安', '402':'永安市場', '403':'頂溪', '404':'古亭', '405':'東門', '406':'忠孝新生', '407':'松江南京', '408':'行天宮', '409':'中山國小', '410':'民權西路', '411':'大橋頭', '412':'台北橋', '413':'菜寮', '414':'三重', '415':'先嗇宮', '416':'頭前庄', '417':'新莊', '418':'輔大', '419':'丹鳳', '420':'迴龍', '412':'三重國小', '413':'三和國中', '414':'徐匯中學', '415':'三民高中', '416':'蘆洲', '523':'頂埔', '521':'永寧', '520':'土城', '519':'海山', '518':'亞東醫院', '517':'府中', '516':'板橋', '515':'新埔', '514':'江子翠', '513':'龍山寺', '512':'西門', '511':'台北車站', '510':'善導寺', '509':'忠孝新生', '508':'忠孝復興', '507':'忠孝敦化', '506':'國父紀念館', '505':'市政府', '504':'永春', '503':'後山埤', '502':'昆陽', '501':'南港', '500':'南港展覽館'};
function mrt_route(route){
	var cost = [0, 0, 0, 0, 0];
	var i;
	result ='<li class="w3-container"><div class="w3-card-2 w3-purple w3-padding-small w3-round-large">'

	for (i = 0; i < route.length-1; i++){
		if (parseInt(route[i]/100) == parseInt(route[i+1]/100)){
			result += mrt_value[route[i].toString()] + ' > ';
			cost[parseInt(route[i]/100) - 1] += Math.abs(route[i+1]%100 - route[i]%100);
		}
	}
	result += mrt_value[route[i].toString()] + '</div>';

	for (i = 0; i < 5; i++){
		result += '<div class="w3-tag w3-' + lego_color[i] + '"><p>' + cost[i] + '</p></div>'
	}
	result += '<button class="w3-btn w3-round w3-margin">Go</button></li>';

	document.getElementById("route_ul").innerHTML += result;
}