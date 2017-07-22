function id(ID){
	return document.getElementById(ID);
}
function tag(name,father){
	father=father||document;
	return father.getElementsByTagName(name);
}


//显示日期
function showDate(){
	var date_week=document.querySelector('.date h4');
	var date_day=document.querySelector('.date h2');
	var weekday=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	var day=new Date().getDay();
	date_week.innerText=weekday[day];
	date_day.innerText=new Date().getDate();
}
//显示每日推荐音乐
function showMusicList(musicList){
	var html='';
	var td_like=null;
	var trs=tag('tr');
	var tds;
	html+='<span class="left"><img src="images/play.png">播放全部</span>\
		<span class="right"><img src="images/collect.png">收藏全部</span>';
	html+='<table><tbody>';
	for(var i in musicList){
		html+='<tr>';
		for(var p in musicList[i]){
			html+='<td>'+musicList[i][p]+'</td>';
		}
		html+='</tr>';
	}
	html+='</tbody></table>';
	id('content').innerHTML=html;
	for(var i=0;i<trs.length;i++){
		tds=trs[i].getElementsByTagName('td');
		td_like=document.createElement('td');
		td_download=document.createElement('td');
		td_like.innerHTML='<img class="coll" src="images/notlike.png">';
		td_download.innerHTML='<img class="download" src="images/download.png">';
		trs[i].insertBefore(td_like,tds[1]);
		trs[i].insertBefore(td_download,tds[2]);
	}
}
//收藏图标
function collHover(){
	var colls=document.querySelectorAll('.coll');
	var downloads=document.querySelectorAll('.download');
	var index=true;
	for(var i=0;i<colls.length;i++){
		// colls[i].onmouseover=function(){
		// 	this.src="images/notlike_hover.png";
		// }
		// downloads[i].onmouseover=function(){
		// 	this.src="images/download_hover.png";
		// }
		// colls[i].onmouseout=function(){
		// 	this.src="images/notlike.png";
		// }
		// downloads[i].onmouseout=function(){
		// 	this.src="images/download.png";
		// }
		(function(i){
			colls[i].onclick=function(){
				if(index){
					this.src='images/like.png';
					index=false;
				}else{
					this.src='images/notlike.png';
					index=true;
				}
			}
		})(i);
	}
}
window.onload=function(){
	showDate();
	showMusicList();
	collHover();
};


window.onmessage = function (e) {
	var getData=JSON.parse(e.data)
	showMusicList(getData)
}





// var musicList=[
// 	{id:'01',name:'春夏秋冬的你',singer:'王宇良',时长:'04:56'},
// 	{id:'02',name:'凄美地',singer:'郭顶',时长:'04:10'},
// 	{id:'03',name:'乐生',singer:'愚青',时长:'04:39'},
// 	{id:'04',name:'塔吉汗',singer:'马条',时长:'04:58'},
// 	{id:'05',name:'披风',singer:'陈奕迅',时长:'03:56'},
// 	{id:'06',name:'白银饭店',singer:'张玮玮和郭龙',时长:'05:12'},
// 	{id:'07',name:'郭源潮',singer:'宋冬野',时长:'07:25'},
// 	{id:'08',name:'一封家书',singer:'好妹妹乐队',时长:'04:39'},
// 	{id:'09',name:'唱歌的孩子',singer:'谣乐队',时长:'05:52'},
// 	{id:'10',name:'空港曲',singer:'宋冬野',时长:'05:00'},
// 	{id:'11',name:'乱世巨星',singer:'陈小春',时长:'04:25'},
// 	{id:'12',name:'一无所有',singer:'崔健',时长:'05:35'},
// 	{id:'13',name:'第三人称',singer:'Hush!',时长:'04:35'},
// 	{id:'14',name:'热河',singer:'李志',时长:'08:04'},
// 	{id:'15',name:'走马',singer:'陈粒',时长:'03:53'},
// 	{id:'16',name:'这个年纪',singer:'齐一',时长:'04:44'},
// 	{id:'17',name:'和你在一起',singer:'李志',时长:'03:51'},
// 	{id:'18',name:'花房姑娘',singer:'崔健',时长:'04:49'},
// 	{id:'19',name:'我要你',singer:'任素汐',时长:'02:34'},
// 	{id:'20',name:'不要说话',singer:'陈奕迅',时长:'04:45'}
// ];