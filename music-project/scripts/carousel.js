class Carousel {
            constructor(carousel) {
                this.carousel=carousel;
                this.init();
                this.bind();
                this.AutoPlay();
            }
        
            init() {
                this.ButtonPre = this.carousel.find('.pre');
                this.ButtonNext = this.carousel.find('.next');
                this.carouselImg = this.carousel.find('.carousel-img');
                this.ImgLi = this.carousel.find('.carousel-img li');
                this.pane = this.carousel.find('.pane');
                this.firstImg = this.carouselImg.find('li').first();
                this.lastImg = this.carouselImg.find('li').last();
                
                this.curIndex = 0;
                this.Animating = false;

                this.carouselImg.css('left', '-1000px');
                this.carouselImg.append(this.firstImg.clone());
                this.carouselImg.prepend(this.lastImg.clone());
                this.carouselImg.width(this.firstImg.width() * this.carouselImg.children().length);
            }

            bind() {
                var _this = this;
                
                _this.ImgLi.on('mouseenter',function(){
                    _this.Animating=true  //鼠标进入轮播停止
                })
                _this.ImgLi.on('mouseleave',function(){
                    _this.Animating=false
                })
                this.ButtonNext.on('click', function (e) {
                    _this.StopAuto();
                    e.preventDefault();
                    _this.PlayNext();
                    _this.AutoPlay()
                })

                this.ButtonPre.on('click', function (e) {
                    _this.StopAuto();
                    e.preventDefault();
                    _this.PlayPre();
                    _this.AutoPlay()
                })

                this.pane.on('click', 'li', function (e) {
                    _this.StopAuto();
                    var distance = ($(this).index() - _this.pane.find('li').index($('.active'))) * _this.firstImg.width();
                    _this.carouselImg.animate({
                        left: '-=' + distance + 'px'
                    })
                    _this.curIndex = $(this).index();
                    _this.pane.children().removeClass('active');
                    $(this).addClass('active');
                    _this.AutoPlay()
                })
            }

            PlayNext() {
                if (this.Animating) {
                    return;
                }
                // console.log(this)
                var _this = this;
                this.Animating = true;
                this.carouselImg.animate({
                    left: '-=1000px'
                }, function () {
                    _this.curIndex++;
                    if (_this.curIndex > _this.ImgLi.length - 1) {
                        _this.carouselImg.css('left', '-1000px');
                        _this.curIndex = 0;
                    }
                    _this.setPane()
                    _this.Animating = false;
                })
            }


            PlayPre() {
                if (this.Animating) {
                    return;
                }
                var _this = this;
                this.Animating = true;
                this.carouselImg.animate({
                    left: '+=1000px'
                }, function () {
                    _this.curIndex--;
                    if (_this.curIndex < 0) {
                        _this.carouselImg.css('left', -(_this.ImgLi.length * _this.firstImg.width()) + 'px')
                        _this.curIndex = 3;
                    }
                    _this.setPane()
                    _this.Animating = false;
                })
            }

            setPane() {
                this.pane.children()
                    .removeClass('active')
                    .eq(this.curIndex)
                    .addClass('active')
            }

            StopAuto() {
                clearInterval(this.clock)
            }

            AutoPlay() {
                var _this = this;
                this.clock = setInterval(function () {
                    _this.PlayNext()
                }, 2000) 
                // this.clock=setInterval(_this.PlayNext, 2000)  //报错,此时this是window对象
            }
        }

carousel=(function(){
            return {
                init: function($content){
                $content.each(function(index,node){
                    new Carousel($(node))
                })
            }
            }            
        })()
        carousel.init($('.carousel'))