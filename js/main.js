/**
 * Created by Administrator on 2017/12/18.
 */
$(function(){
    //当文档加载完成才会执行
    //根据屏幕的宽度变化，决定轮播图应该展示什么
    function resize(){
        //获取屏幕的宽度
        var windowWidth=$(window).width();
        //判断屏幕大小
        var isSmallScreen=windowWidth<768;
        //根据大小为轮播图设置背景
        //$('#main_ad>.carousel-inner>.item') 获取到的是一个DOM数组
        //遍历每一个轮播项
        $('#main_ad>.carousel-inner>.item').each(function(i,item){
            var $item=$(item);//因为获得的是DOM对象，需要转换
            //$element.data()是一个函数，用于获取元素上的自定义属性(data-abc)
            //函数的参数是要获取的属性名称(abc)
            var imgSrc=isSmallScreen?$item.data('image-xs'):$item.data('image-lg');
            $item.css('backgroundImage','url("'+imgSrc+'")');
            //当需要小图是，尺寸等比例变化，小图使用img方式
            if(isSmallScreen){
                $item.html('<img src="'+imgSrc+'" alt=""/>')
            }else{
                $item.empty();
            }
        });
    }
    //resize 屏幕缩放事件
    $(window).on('resize',resize).trigger('resize');//让window对象立即出发一次

    //初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();


    //控制标签页的标签容器宽度
    var $ulContainer = $('.nav-tabs');
    //获取所有子元素的宽度和
    var width=30;//因为原本的ul上有padding-left
    //遍历子元素
    $ulContainer.children().each(function(index,element){
        //console.log(element.clientWidth);// js方式 高效
        //console.log($(element).width()); //jquery方式
        width+=element.clientWidth;
        //console.log(width);
    });
    //此时的width等于所有li的总和
    //判断当前ul的宽度是否超出屏幕，如果超出就显示横向滚动条
    if(width > $(window).width()){
        $ulContainer
            .css('width',width)
            .parent().css('overflow-x','scroll');

    }

//新闻版块 a注册点击事件
    var $newsTitle=$('.news-title');
    $('#news .nav-pills li>a').on('click',function(){
        //获取当前点击元素
        var $this=$(this);
        //console.log(1);
        //获取对应的title 值
        var title=$this.data('title');
        //将title设置到相应位置
        $newsTitle.text(title);
    });


    //移动端轮播图滑动

    //1、先获取手指在轮播图元素上的滑动方向(左右)
    //手指触摸开始时记录手指所在的坐标X

    //获取界面上的轮播图容器
    var $carousels=$('.carousel');
    //注册滑动事件
    var startX;
    var endX;
    var offset=50;
    $carousels.on('touchstart',function(e){
        startX=e.originalEvent.touches[0].clientX;
        console.log(startX);
    });

    //变量重复赋值
    $carousels.on('touchmove',function(e){
        endX=e.originalEvent.touches[0].clientX;
        //console.log(endX);
    });

    //结束触摸的一瞬间记录最后手指所在坐标X
    //比较开始和结束的坐标大小
     $carousels.on('touchend',function(e){
     console.log(endX);
         //控制精度
         //获取每次手指滑动的距离，当距离大于一定值时，就认为有方向变化
         var distance=Math.abs(startX-endX);
         if(distance>offset){
             //有方向变化
             //console.log(startX>endX?'-':'+');

             //2、根据获得到的方向选择上一张或下一张

             // $('a').click();
             // 原生的carousel方法实现 手向左滑出现下一张
             //此处必须用$(this),若使用$carousels,当页面中有多个轮播图时，会一起动
             $(this).carousel(startX>endX?'next':'prev');



         }

     });








});