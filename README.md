# component-roll
组件名称：特定区域向上滚动内容<br>
组件功能：特定区域内容向上滚动功能<br>
组件参数：

$.marquee({

            //列表元素的盒子对象
            wrap: $('#J_Prize'),
            
            //列表元素的父对象
            ul: $('#J_Prize').find('ul'),
            
            //列表元素对象
            li: $('#J_Prize').find('li'),
            
            //自动滚动标示符
            auto: true,
            
            //滚动间隔时间
            interval: 3000,
            
            //滚动方向
            direction: 'forward',
            
            //动画时间
            speed: 500,
            
            //显示条数
            showNum: 3,
            
            //滚动条数
            stepLen: 3
        });
