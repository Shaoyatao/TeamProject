/**
 * 
 */

;(function ($, window) {
	/**
	  opt: {
		linkNum: 5,		// 中间按钮个数 		默认5
		current: 1,		// 页面初始当前页 	默认1
		size: 10,		// 每页显示的条数 	默认10
		layout: 'total, prev, pager, next, jumper',	// 设置显示的内容		// 默认'total, prev, pager, next, jumper'
		prevHtml: '&lt;',	// 上一页html	默认&lt;
		nextHtml: '&gt;',	// 下一页html	默认&gt;
		jump: fn 		// 跳转时执行方法 	必须
	  }
	  jump方法中获取当前页数this.current，获取显示条数this.current
	  jump中必须调用this.setTotal(100)方法设置总页数
	 */
	function MyPaging (oPagingParent, opt) {
		this.oPagingParent = oPagingParent;	// 初始化分页的盒子
		this.total =  0;					// 总条数
		this.totalPage =  0;				// 总页数

		this.linkNum = opt.linkNum || 5;	// 中间按钮个数
		this.current = opt.current || 1;	// 当前页
		this.size = opt.size || 10;			// 每页多少条
		this.prevHtml = opt.prevHtml || '&lt;';	// 上一页html
		this.nextHtml = opt.nextHtml || '&gt;';	// 下一页html
		

		this.layout = [ 'prev', 'pager', 'next'];
		if (opt.layout) {
			this.layout = opt.layout.split(',');
		}

		if (!opt.jump) {
			return;
		}
		this.jump = opt.jump;

		this._init();
	}
	var prototype = {
		_init: function () {
			this.jump();
		},

		// 设置总页数方法 调用设置html方法
		setTotal: function (data) {
			if (data >= 1) {
				this.total = data;
				this.totalPage = Math.ceil(this.total / this.size);
				
				this._setPagingHtml();
			}
		},

		// 设置html
		_setPagingHtml: function () {
			var html = '<ul class="mx-auto my-paging-box">';
			for (var iKey = 0; iKey < this.layout.length; iKey++) {
				var key = this.layout[iKey].replace(/\s/g, '');

				// 总条数
				if (key == 'first') {
					html += '<li class="link-btn" data-current="1"><span>首页</span></li>';
				}
				
				// 上一条
				if (key == 'prev') {
					html += '<li class="link-btn prev' + (this.current == 1 ? ' disabled' : '') + '" data-current="prev">' + this.prevHtml + '</li>';
				}

				// 分页按钮
				if (key == 'pager') {
				

					
					var start = end = 0;
					var sPager = ''
					// 总页数小于按钮个数
					if (this.totalPage <= this.linkNum) {
						start = 1;
						end = this.totalPage;
						for (var i = 1; i <= this.totalPage; i++) {
							sPager += '<li class="link-btn' + (this.current == i ? ' active' : '') + '" data-current="' + i + '">' + i + '</li>';
						}

					// 当前页小于2分之最大按钮数
					} else if (this.current < Math.ceil(this.linkNum / 2)) {
						start = 1;
						end = this.linkNum;
						for (var i = 1; i <= this.linkNum; i++) {
							sPager += '<li class="link-btn' + (this.current == i ? ' active' : '') + '" data-current="' + i + '">' + i  + '</li>';
						}

					// 当前页大于总条数减2分之最大按钮数
					} else if (this.current > this.totalPage - Math.ceil(this.linkNum / 2)) {
						start = this.totalPage - this.linkNum + 1;
						end = this.totalPage;
						for (var i = this.totalPage - this.linkNum + 1; i <= this.totalPage; i++) {
							sPager += '<li class="link-btn' + (this.current == i ? ' active' : '') + '" data-current="' + i + '">' + i  + '</li>';
						}

					// 其它
					} else {
						start = this.current - Math.ceil(this.linkNum / 2) + 1;
						end = this.current - Math.ceil(this.linkNum / 2) + this.linkNum;
						for (var i = 1; i <= this.linkNum; i++) {
							var idx = this.current - Math.ceil(this.linkNum / 2) + i;
							sPager += '<li class="link-btn' + (this.current == idx ? ' active' : '') + '" data-current="' + idx + '">' + idx  + '</li>';
						}
					}

					// 当前页大于按钮页一般及总页数大于按钮数
					if (this.current > Math.ceil(this.linkNum / 2) && this.totalPage > this.linkNum) {
						html += '<li class="link-btn" data-current="1">1</li>';
						if (start > 2) {
							html += '<li>···</li>';
						}
					}

					html += sPager;

					// 当前页小于按钮数一般并且总页数大于按钮数
					if (this.current <= this.totalPage - Math.ceil(this.linkNum / 2) && this.totalPage > this.linkNum) {
						if (end < this.totalPage - 1) {
							html += '<li>···</li>';
						}
						html += '<li class="link-btn" data-current="' + this.totalPage + '">' + this.totalPage + '</li>';
					}
				}

				// 下一条
				if (key == 'next') {
					html += '<li class="link-btn next' + (this.current == this.totalPage ? ' disabled' : '') + '" data-current="next">' + this.nextHtml + '</li>';
				}

				if (key == 'end') {
					html += '<li class="link-btn" data-current="' + this.totalPage + '"><span>尾页</span></li>';
				}
			}
			html += '</ul>';

			this.oPagingParent.html(html);
			this._setPagingEvent();//设置事件
		},

		// 设置分页事件
		_setPagingEvent: function () {
			var _this = this;
			var oMyPaging = this.oPagingParent.find('.my-paging-box');
			var oLinkBtn = oMyPaging.find('.link-btn');

			// 按钮点击事件
			oLinkBtn.on('click', function () {
				var oTag = $(this);
				var current = oTag.data('current'); //当前
				var to = _this.current;

				if (current == 'prev') {
					to = to > 1 ? to - 1 : 1;
				} else if (current == 'next') {
					to = to <  _this.totalPage ? to + 1 : _this.totalPage;
				} else {
					to = current;
				}

				if (to == _this.current) {
					return;
				}

				_this.current = to;
				_this.jump();
			})

		},
	}
	for (var i in prototype) {
		MyPaging.prototype[i] = prototype[i];
	}


	$.fn.MyPaging = function (opt) {
		new MyPaging(this, opt || {});
	}
})(jQuery, window);