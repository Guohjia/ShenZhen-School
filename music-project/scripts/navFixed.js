function navFixed($node) {
    this.init($node);
    this.bindEvent()
}
navFixed.prototype.init = function ($node) {
    var _this=this
    this.$nav = $node
    this.$iframeChild=$('.child')
    this.$navClone = this.$nav.clone().css({ 'visibility': 'hidden', 'display': 'none' }).insertBefore(this.$nav); //clone一个相同的固定导航栏占位，避免导航栏fixed的时候出现跳动;
    this.offsetTop = this.$nav.offset().top; //this.offsetLeft = this.$nav.offset().left;
}

navFixed.prototype.bindEvent = function () {
    var _this = this;
    var currentY = 0;
    var $ulNav = $('.nav-item')
    var $lis = $('.nav-item>li')
    
    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop()
        if (scrollTop >= _this.offsetTop) {
            if (!_this.ifFixed()) {
                _this.setFixed();
            }
        } else {
            if (_this.ifFixed()) {
                _this.unsetFixed();
            }
        }
    })

    $ulNav.on('click', 'li', function (e) {
        // console.log($(e.target).attr("data-to"))
        $lis.removeClass('active')
        $(this).addClass('active')
    })
}

navFixed.prototype.ifFixed = function () {
    return this.$nav.data('data-fixed')
}

navFixed.prototype.setFixed = function () {
    this.$nav.data('data-fixed', true).css({ 'position': 'fixed', 'top': '0', 'left': '0', 'z-index': '9999', 'width': '100%' });
    //设置是否固定的标志:data-fixed
    this.$navClone.show();
}


navFixed.prototype.unsetFixed = function () {
    this.$nav.data('data-fixed', false).removeAttr('style');  //上述.css属性所添加的样式是内联样式,形如<p style="backgroud:red">,removeAttr同样删除内联;
    this.$navClone.hide();
}


fixed = (function () {
    return {
        init: function ($node) {
            new navFixed($node)
        }
    }
})()
fixed.init($('.nav'))