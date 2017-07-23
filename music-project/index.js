var dataArray = {
    hotMusic: [{ ImgSrc: 'images/p1.jpg', content: '【有一种喜剧叫做周星驰】星爷电影配乐精选', number: '55万' },
    { ImgSrc: 'images/p2.jpg', content: '韩系蓝调小酒馆，沁入耳膜般温柔', number: '25868' },
    { ImgSrc: 'images/p3.jpg', content: '古风情调，醉美对吟', number: '69万' },
    { ImgSrc: 'images/p4.jpg', content: '夏虫不语冰，愿有人能陪你走过四季', number: '36942' },
    { ImgSrc: 'images/p5.jpg', content: '【去红馆听一场泪流满面的粤语盛宴】', number: '28万' },
    { ImgSrc: 'images/p6.jpg', content: '〖流行〗ACG，就该是这个感觉', number: '34万' },
    { ImgSrc: 'images/p7.jpg', content: '假装活在1997 (日语篇）', number: '36874' },
    { ImgSrc: 'images/p8.jpg', content: '华语女生 清新俏皮的英文歌', number: '80万' }],

    dailyMusic: [{ id: '01', name: '春夏秋冬的你', singer: '王宇良', 时长: '04:56' },
    { id: '02', name: '凄美地', singer: '郭顶', 时长: '04:10' },
    { id: '03', name: '乐生', singer: '愚青', 时长: '04:39' },
    { id: '04', name: '塔吉汗', singer: '马条', 时长: '04:58' },
    { id: '05', name: '披风', singer: '陈奕迅', 时长: '03:56' },
    { id: '06', name: '白银饭店', singer: '张玮玮和郭龙', 时长: '05:12' },
    { id: '07', name: '郭源潮', singer: '宋冬野', 时长: '07:25' },
    { id: '08', name: '一封家书', singer: '好妹妹乐队', 时长: '04:39' },
    { id: '09', name: '唱歌的孩子', singer: '谣乐队', 时长: '05:52' },
    { id: '10', name: '空港曲', singer: '宋冬野', 时长: '05:00' },
    { id: '11', name: '乱世巨星', singer: '陈小春', 时长: '04:25' },
    { id: '12', name: '一无所有', singer: '崔健', 时长: '05:35' },
    { id: '13', name: '第三人称', singer: 'Hush!', 时长: '04:35' },
    { id: '14', name: '热河', singer: '李志', 时长: '08:04' },
    { id: '15', name: '走马', singer: '陈粒', 时长: '03:53' },
    { id: '16', name: '这个年纪', singer: '齐一', 时长: '04:44' },
    { id: '17', name: '和你在一起', singer: '李志', 时长: '03:51' },
    { id: '18', name: '花房姑娘', singer: '崔健', 时长: '04:49' },
    { id: '19', name: '我要你', singer: '任素汐', 时长: '02:34' },
    { id: '20', name: '不要说话', singer: '陈奕迅', 时长: '04:45' }],

    myMusic: [{ id: '001', name: '不要说话', type: 'popular', singer: '陈奕迅', Time: '04:45' },
    { id: '002', name: '我要你', type: 'popular', singer: '任素汐', Time: '02:34' },
    { id: '003', name: '花房姑娘', type: 'folk', singer: '崔健', Time: '04:49' },
    { id: '004', name: '和你在一起', type: 'folk', singer: '李志', Time: '03:51' },
    { id: '005', name: '这个年纪', type: 'folk', singer: '齐一', Time: '04:44' },
    { id: '006', name: '走马', type: 'popular', singer: '陈粒', Time: '03:53' },
    { id: '007', name: '唱歌的孩子', type: 'popular', singer: '谣乐队', Time: '05:52' },
    { id: '008', name: '春夏秋冬的你', type: 'popular', singer: '王宇良', Time: '04:56' },
    { id: '009', name: '乱世巨星', type: 'folk', singer: '陈小春', Time: '04:25' },
    { id: '010', name: '郭源潮', type: 'folk', singer: '宋冬野', Time: '05:00' },
    { id: '011', name: '塔吉汗', type: 'folk', singer: '马条', Time: '04:58' },
    { id: '012', name: '凄美地', type: 'popular', singer: '郭顶', Time: '04:10' }]
}
var navUl = document.querySelector('.nav-item')
var navlis = document.querySelectorAll('.nav-item>li')
var iframeChild = document.getElementById('child')
var message = JSON.stringify(dataArray.hotMusic)  //初始化要发送的数据为热门推荐

//必须在iframe onload的时候发送数据 否则数据发送就晚了
iframeChild.onload = function () {
    console.log('发送数据')
    iframeChild.contentWindow.postMessage(message, '*');
}


//绑定点击事件
navUl.onclick = function (e) {
    var newSrc = e.target.getAttribute('data-to')
    if (newSrc !== null) {
        message = JSON.stringify(chooseData(newSrc));//此时已经确定要发送的数据
        iframeChild.src = newSrc  //此时触发iframe onload事件
    } else {
        console.log('点错位置了')
        return
    }
}


//根据点击事件确定要发送的事件
function chooseData(src) {
    if (/daily/.test(src)) {
        return dataArray.dailyMusic
    } else if (/hot/.test(src)) {
        return dataArray.hotMusic
    } else {
        return dataArray.myMusic
    }
}
