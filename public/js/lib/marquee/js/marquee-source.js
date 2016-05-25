/**
 * 特定区域向上滚动内容模块
 * @author zym
 * @version 1.0
 * @since 2016-05-25
 */
define(function(require, exports, module) {
    var Marquee = function(options) {
        this.settings = $.extend({}, Marquee.defaults, options);

        this.cache = { allowMarquee: true };

        this.init();
    };

    Marquee.prototype ={
        /**
         * 初始化
         */
        init : function() {
            this.create();
        },

        /**
         * 创建
         */
        create: function() {
            var _this = this;

            _this.setStyle();
            _this.move();
        },

        /**
         * 设置元素样式
         */
        setStyle: function(){
            var _this = this;

            var floatStyle, liMargin, liOuterH, ulH, wrapH;

            liOuterH = _this.settings.li.height();
            liMargin = Math.max(parseInt(_this.settings.li.css('margin-top'), 10), parseInt(_this.settings.li.css('margin-bottom'), 10));
            wrapH = _this.settings.showNum * liOuterH - liMargin;
            ulH = 9999;
            floatStyle = 'none';
            _this.cache.stepW = _this.settings.stepLen * liOuterH - liMargin;
            _this.cache.prevAnimateObj = {
                top: -_this.cache.stepW
            };
            _this.cache.nextAnimateObj = {
                top: 0
            };
            _this.cache.leftOrTop = 'top';

            _this.settings.wrap.css({
                position: 'absolute',
                width: '100%',
                height: wrapH,
                margin: '0 auto',
                overflow: 'hidden'
            });

            _this.settings.ul.css({
                position: 'relative',
                height: ulH,
                top: 0
            });

            _this.settings.li.css({
                float: floatStyle
            });
        },

        /**
         * 设置元素动画
         */
        move: function(){
            var _this = this;

            var interval, moveEvent;

            if (_this.settings.auto) {
                switch (_this.settings.direction) {
                    case 'forward':
                        moveEvent = _this.prev;
                        break;
                    case 'backward':
                        moveEvent = _this.next;
                }
                interval = _this.settings.interval;
                setTimeout(function() {
                    moveEvent.call(_this);
                    setTimeout(arguments.callee, interval);
                }, interval);
                _this.cache.moveBefore = _this.cache.moveAfter = function() {
                    return null;
                };
            }else{
                _this.cache.moveBefore = function() {
                    return _this.cache.allowMarquee = false;
                };
                _this.cache.moveAfter = function() {
                    return _this.cache.allowMarquee = true;
                };
            }
        },

        /**
         * 向上滚动事件
         */
        prev: function(){
            var _this = this;

            var preEls, ul;

            if (_this.cache.allowMarquee) {
                _this.cache.moveBefore.call(_this);
                //_this.settings.prevBefore.call(_this);
                ul = _this.settings.ul;
                preEls = ul.children().slice(0, _this.settings.stepLen);
                preEls.clone().appendTo(ul);

                ul.animate(_this.cache.prevAnimateObj, _this.settings.speed, function() {
                    ul.css(_this.cache.leftOrTop, 0);
                    preEls.remove();
                    //_this.cache.moveAfter.call(_this);
                    //_this.settings.prevAfter.call(_this);
                });
            }
        },

        /**
         * 向下滚动事件
         */
        next: function(){
            var _this = this;

            var sufEls, ul;

            if (_this.cache.allowMarquee) {
                _this.cache.moveBefore.call(this);
                //_this.settings.nextBefore.call(this);
                ul = _this.settings.ul;
                sufEls = ul.children().slice(-_this.settings.stepLen);
                sufEls.clone().prependTo(ul);
                ul.css(_this.cache.leftOrTop, -_this.cache.stepW).animate(_this.cache.nextAnimateObj, _this.settings.speed, function() {
                    sufEls.remove();
                    //_this.cache.moveAfter.call(_this);
                    //_this.settings.nextAfter.call(_this);
                });
            }
        }
    };

    // 默认配置
    Marquee.defaults = {
        //列表元素的盒子对象
        wrap: null,

        //列表元素的父对象
        ul: null,

        //列表元素对象
        li: null,

        //自动滚动标示符
        auto: true,

        //滚动间隔时间
        interval: 3000,

        //滚动方向
        direction: 'forward',

        //动画时间
        speed: 500,

        //显示条数
        showNum: 1,

        //滚动条数
        stepLen: 1
    };

    var rMarquee = function(options) {
        new Marquee(options);
    };

    window.rMarquee = $.rMarquee = $.marquee = rMarquee;
});