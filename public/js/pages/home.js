/**
 * 移动官网
 * @since 2016.05.25
 */
define(function (require, exports, module) {
    //'特定区域内容向上滚动'模块
    if($('#J_Roll').length){
        var marquee = require('marquee');

        $.marquee({
            wrap: $('#J_Prize'),
            ul: $('#J_Prize').find('ul'),
            li: $('#J_Prize').find('li'),
            auto: true,
            interval: 3000,
            speed: 500,
            showNum: 3,
            stepLen: 3
        });
    }
});