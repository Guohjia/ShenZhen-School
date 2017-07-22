// var data=[

// 			{id:'001',name:'Someone like you',type:'Davorak:symphony NO.9',singer:'Coke Jiang',Time:'03.66'},
// 			{id:'002',name:'Someone like you',type:'Davorak:symphony NO.9',singer:'Coke Jiang',Time:'03.66'},
// 			{id:'003',name:'Someone like you',type:'Davorak:symphony NO.9',singer:'Coke Jiang',Time:'03.66'},
// 			{id:'004',name:'Someone like you',type:'Davorak:symphony NO.9',singer:'Coke Jiang',Time:'03.66'},
// 			{id:'005',name:'Someone like you',type:'Davorak:symphony NO.9',singer:'Coke Jiang',Time:'03.66'},
// 			{id:'006',name:'Someone like you',type:'Davorak:symphony NO.9',singer:'Coke Jiang',Time:'03.66'}
//  ];
function grid(config) {
		//这里的config赋值有什么用？
		grid.config = config;
		grid.initTable();
		//判断是否有必要做一个编辑窗口
		if (typeof config.addHandler == 'function' ||
			typeof config.updateHandler == 'function')
			grid.initEditDialog();

	}

grid.curTr = null;

window.onmessage = function (e) {

	var data = JSON.parse(e.data)
	function id(ID) { return document.getElementById(ID); }
	function tag(name, father) {
		father = father || document;
		return father.getElementsByTagName(name);
	}

	grid.createTr = function (obj) {
		var tr = document.createElement('tr'), td;
		for (var p in obj) {
			td = document.createElement('td');
			//?
			if (typeof this.config.updateHandler == 'function'
				&& p == this.config.key)
				td.innerHTML = '<a href="#" onclick="grid.showDialog(this)">' + obj[p] + '</a>';
			else
				td.innerText = obj[p];
			tr.appendChild(td);
		}
		if (typeof this.config.delHandler == 'function') {
			td1 = document.createElement('td');
			td1.innerHTML = '<a href="#" data-id="'
				+ obj[this.config.key]
				+ '" onclick="grid.del(this)">Del</a>';

			tr.appendChild(td1);
		}
		return tr;
	};


	grid.createCaption = function () {
		var caption = document.createElement('caption');
		var captionHtml = '';
		captionHtml += this.config.title;
		//?==function干吗用的？
		if (typeof this.config.addHandler == 'function')
			captionHtml += '<a href="#" onclick="grid.showDialog();grid.change()">+</a>';
		caption.innerHTML = captionHtml;

		return caption;
	};
	grid.change = function () {
		id('h').style.display = "none";
		var contents = id('content');
		var newh1 = '';
		//    var overlay=document.getElementsByTagName('div');
		// overlay.id='overlay';
		newh1 = '<div id="mmp"><h1>新增</h1><span id="span3" onclick="grid.closeDialog()">×</span></div>'
		contents.innerHTML += newh1;
	}
	grid.createTHead = function () {
		var thead = document.createElement('thead');
		var theadHtml = '';
		theadHtml += '<tr>';
		for (var p in this.config.data[0]) {
			theadHtml += '<th>' + p + '</th>';
		}
		if (typeof this.config.delHandler == 'function') {

			theadHtml += '<th>operation</th>';
		}
		theadHtml += '</tr>';
		thead.innerHTML = theadHtml;
		return thead;
	};
	grid.createTBody = function () {
		var tbody = document.createElement('tbody');
		var data = this.config.data;
		for (var i in data) {
			tbody.appendChild(grid.createTr(data[i]));
		}
		return tbody;
	};
	grid.createTable = function () {
		var table = document.createElement('table');
		table.appendChild(this.createCaption());
		table.appendChild(this.createTHead());
		table.appendChild(this.createTBody());
		return table;
	};
	grid.initTable = function () {
		//id指的是什么?
		id(this.config.container)
			.appendChild(this.createTable());
	};
	grid.initEditDialog = function () {
		var overlay = document.createElement('div');
		overlay.id = 'overlay';
		document.body.appendChild(overlay);
		//根据用户传来fields字段来拼content
		var fields = this.config.fields;
		var contentHtml =
			'<div id="content">\
		<div class="title">\
			<h1  id="h">修改</h1>\
			<span onclick="grid.closeDialog()">×</span>\
		</div>\
		<ul>';

		for (var i in fields) {
			contentHtml += '<li>';
			contentHtml += '<label>' + fields[i].name + '</label>';
			switch (fields[i].type) {
				case 'select':
					contentHtml += '<select id="' + fields[i].name + '">';
					for (var j in fields[i].option) {
						contentHtml += '<option value="'
							+ fields[i].option[j].value + '">'
						contentHtml += fields[i].option[j].text;
						contentHtml += '</option>';
					}
					contentHtml += '</select>';
					break;
				default:
					//input这里什么意思？
					contentHtml += '<input id="' + fields[i].name + '" />';
					break;
			}
			contentHtml += '</li>';

		}
		//拼两个按钮
		contentHtml +=
			'<li>\
				<input type="button" class="btn" value="Save" data-flag="1" onclick="grid.save(this)" id="save">\
				<input type="button" class="btn" value="Cancel" onclick="grid.closeDialog()">\
			 </li>'
		contentHtml +=
			'</ul>\
	</div>';

		overlay.innerHTML = contentHtml;
	};
	grid.closeDialog = function () {
		id('content').className = 'hide';
		setTimeout(function () {
			id('overlay').style.display = 'none';
		}, 700);
	};
	grid.showDialog = function (target) {//弹出编辑窗口
		id('overlay').style.display = 'block';
		id('content').className = 'show';
		id('save').setAttribute('data-flag', target ? "0" : "1");
		if (!target) {
			this.resetDialog()
		} else {
			this.curTr = target.parentNode.parentNode;
			var data = this.config.data
			for (var i in data) {
				if (data[i][this.config.key]
					== target.innerText) {
					this.resetDialog(data[i]);
					break;
				}
			}
		}
	};
	grid.resetDialog = function (obj) {
		var fields = this.config.fields;
		for (var i in fields) {
			id(fields[i].name).value =
				obj ? obj[fields[i].name] : "";
			id(fields[i].name).disabled =
				obj && fields[i].name == this.config.key
					? 'disabled' : '';
		}
	};
	grid.del = function (target) {
		if (!confirm('delete?')) return;
		//!
		this.config.delHandler(
			target.getAttribute('data-id'));
		var tr = target.parentNode.parentNode;
		tr.parentNode.removeChild(tr);
	};
	grid.save = function (target) {
		//搜集整理用户的输入信息,封装到obj对象
		var obj = {}, fields = this.config.fields;
		for (var i in fields) {
			obj[fields[i].name] = id(fields[i].name).value;
		}
		if (target.getAttribute('data-flag') == "1") {	//新增
			this.config.addHandler(obj);
			tag('tbody')[0].appendChild(this.createTr(obj));
			alert('add successful...');
		} else {										//修改
			this.config.updateHandler(obj);
			var tds = tag('td', this.curTr);
			for (var i in fields) {
				if (fields[i].name != this.config.key)
					tds[i].innerText = obj[fields[i].name];
			}
			alert('ok...');
		}
		this.closeDialog();
	};
	


	function delAnimal(id) {
		for (var i = 0; i <= data.length; i++) {
			if (data[i].id == id) {
				data.splice(i, 1);
				return;

			}
		}
	}

	function addAnimal(animal) {
		data.push(animal);
	}
	function updateAnimal(animal) {
		for (var i in data) {
			if (data[i].id == animal.id) {
				for (var p in data[i])
					data[i][p] = animal[p];
				return;
			}
		}
	}

	grid({
		title: 'Music List',//必须有
		data: data,			 //必须有
		container: 'con',     //必须有
		key: 'id',
		delHandler: delAnimal,
		addHandler: addAnimal,
		updateHandler: updateAnimal,
		fields: [
			{ name: 'id', isKey: true },
			{ name: 'name' },
			{
				name: 'type', type: 'select',
				option: [{ text: 'Rock music', value: 'Rock music' },
				{ text: 'Soft Music', value: 'Soft Music' },
				{ text: 'Classic', value: 'Classic' }]
			},
			{ name: "singer" },
			{ name: 'time' },
		]
	});

}
