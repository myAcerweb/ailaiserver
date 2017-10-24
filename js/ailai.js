var app=angular.module('myApp', ['ionic']);

//设置路由地址
app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state('home',{
            url:'/myHome',
            templateUrl:'tpl/home.html',
            controller:'homeCtrl'
        })

        .state('book',{    //登陆
            url:'/myBook',
            templateUrl:'tpl/book.html',
            controller:'bookCtrl'
        })
        .state('user1',{    //登陆
            url:'/myUser1',
            templateUrl:'tpl/user1.html',
            controller:'user1Ctrl'
        })
        .state('register',{   //注册
            url:'/myRegister',
            templateUrl:'tpl/register.html',
            controller:'registerCtrl'
        })
        .state('reset',{   //重置
            url:'/myReset',
            templateUrl:'tpl/reset.html',
            controller:'resetCtrl'
        })
        .state('notice',{   //领票须知
            url:'/myNotice',
            templateUrl:'tpl/notice.html',
            controller:'noticeCtrl'
        })
        .state('bookingseat',{   //选座页面
            url:'/mybookingseat',
            templateUrl:'tpl/bookingseat.html',
            controller:'bookingseatCtrl'
        })

        .state('notice2',{   //免费领票
            url:'/myNotice2',
            templateUrl:'tpl/notice2.html',
            controller:'notice2Ctrl'
        })
        .state('checkmsg',{   //二维码和座位信息
            url:'/mybookingseat',
            templateUrl:'tpl/checkmsg.html',
            controller:'checkmsgCtrl'
        })
        .state('book2',{   //协议条款
            url:'/mybook2',
            templateUrl:'tpl/book2.html',
            controller:'book2Ctrl'
        })
        .state('person',{   //协议条款
            url:'/myperson',
            templateUrl:'tpl/person.html',
            controller:'personCtrl'
        })
        .state('liveplayer',{   //协议条款
            url:'/myLivePlayer',
            templateUrl:'tpl/liveplayer.html',
            controller:'liveplayerCtrl'
        })
        .state('map',{   //协议条款
            url:'/myMap',
            templateUrl:'tpl/map.html',
            controller:'mapCtrl'
        })

    $urlRouterProvider.otherwise('myHome');
});
app.directive("loadinga",function(){    //创建一个自定义标签
    return{
        restrict:"EA",
        replace:false,
        scope:{
            isLoaded:"=isLoaded"
        },
        transclude:true,
        templateUrl:"./tpl/load.html",
        controller:["$scope",function($scope){
            $scope.isLoaded=false;
        }]
    }
});

//parentCtrl控制器
app.controller('parentCtrl',['$scope','$ionicSlideBoxDelegate','$state','$timeout',function($scope,$ionicSlideBoxDelegate,$state,$timeout){
    //如何让滑动框滑动到指定的位置，让对应的选项卡变色？？
    $scope.slideStart=function(index){
        $state.go('start');
        $timeout(function(){
            $ionicSlideBoxDelegate.slide(index);
        },10);
    }
}]);

//home控制器
app.controller('homeCtrl',['$scope','$ionicSlideBoxDelegate','$state',function($scope,$ionicSlideBoxDelegate,$state){
    $scope.slideTo=function(index){
        $ionicSlideBoxDelegate.slide(index);
    };

    ////登录
    //$scope.login=function(){
    //    console.log(localStorage['phone']);
    //    if(localStorage['phone']){
    //        alert('您已登录');
    //        return;
    //    }
    //    $state.go('user1');
    //}
    //我爱爱来
    //href="http://m.ailaiwenhua.com/index.jsp"
    $scope.love=function(){
        if(!localStorage['phone']){
            alert('请先登录');
            $state.go('user1');
            return;
        }
        window.location.href="http://m.ailaiwenhua.com/index.jsp"
    };
    //轮播1_才艺大赛
    $scope.scene1=function(){
        if(!localStorage['phone']){
            alert('请先登录');
            $state.go('user1');
            return;
        }
       $state.go();
    };
    //轮播2_爱来电视台
    $scope.scene2=function(){
        if(!localStorage['phone']){
            alert('请先登录');
            $state.go('user1');
            return;
        }
        $state.go();
    };
    //轮播3_现场直播
    $scope.scene3=function(){
        if(!localStorage['phone']){
            alert('请先登录');
            $state.go('user1');
            return;
        }
        $state.go('liveplayer');
    };
    //轮播4_往届精彩
    $scope.scene4=function(){
        if(!localStorage['phone']){
            alert('请先登录');
            $state.go('user1');
            return;
        }
        window.location.href="http://m.ailaiwenhua.com/col.jsp?id=173"
    }
    //个人中心
    $scope.book=function(){
        if(!localStorage['phone']){
            alert('请先登录');
            $state.go('user1');
            return;
        }
        $state.go('book');
    }

    //选座
    $scope.notice=function(){
        console.log(localStorage['phone']);
        if(!localStorage['phone']){
            alert('请先登录');
            $state.go('user1');
            return;
        }
        $state.go('notice');
    }

}]);

//book控制器
app.controller('bookCtrl',['$scope','$http','$state',function($scope,$http,$state){

    //登录页面传过来的
    $scope.user=localStorage['phone'];
    $http.get('http://m.ailai920.com:85/read?id='+$scope.user)
        .success(function(data){
            $scope.data=data;
            if(data.name=='null'){
                data.name='';
            }
            if(data.gender==1){
                data.gender='男';
            }else {
                data.gender='女';
            }
            console.log(data);
        })
        .error(function(){
            console.log("读取失败");
        })
    //注册页面传过来的
    //$scope.sex=localStorage['sex'];
    //notice页面传过来的
    //$scope.name=localStorage['username'];
    //$scope.cell=localStorage['cell'];
    //$scope.row=localStorage['row'];
    //console.log(localStorage['sex']);
    //console.log($scope.sex);
    $scope.check=function(){
        $http.get('http://m.ailai920.com:85/query?id='+$scope.user)
            .success(function(data){
                console.log(data);
                $scope.list=data;
                if($scope.list.message=='无领票记录'){
                    alert('您还未领票哦~')
                }
            })
            .error(function(){
                console.log('异步请求失败');
            })
    }

    //退出登录
    $scope.quit=function(){
        //localStorage.clear();
        localStorage['phone']='';
        $state.go('home');

    }
}]);

//user1控制器
app.controller('user1Ctrl',['$scope','$http','$state','$rootScope',function($scope,$http,$state,$rootScope){
    $scope.agree=true;
    $scope.phone='';
    $scope.password='';
    $scope.login=function(){
            if(localStorage['phone']){
                alert('您已登录');
                $state.go('home');
                return;
            }
        if($scope.agree!==true){
            alert('请同意协议');
            return;
        }

        $http.get('http://m.ailai920.com:85/login?account='+$scope.phone+'&password='+$scope.password)
            .success(function(data){
                console.log(data);
                if(data.message=='登录成功'){
                    //登录成功后，将用户手机号保存到localstorage中；
                    localStorage['phone'] = $scope.phone;
                    console.log(localStorage['phone']);
                    //将数据共享给其他控制器
                    $rootScope.phone=$scope.phone;

                    alert('您已登录成功');

                    //localStorage.clear();
                    $state.go('home');

                    // $state.go('person');
                }else if(data.message=='密码不正确'){
                    alert('密码不正确');
                }else if(data.message=='账户不存在'){
                    alert('该手机号未注册');
                    return;
                }
            })
            .error(function(){
                console.log('请求错误');

            })

    }
}]);

//register控制器
app.controller('registerCtrl',['$scope','$interval','$timeout','$http','$state','$rootScope',function($scope,$interval,$timeout,$http,$state,$rootScope){
    //验证码计时
    $scope.paracont="获取验证码";
    $scope.paraclass="but_null";
    $scope.paraevent="true";
    var second=60;
    timePromise = undefined;
    $scope.i=1;
    $scope.sex1 = function(){
        $scope.x = document.getElementById('imgx');
        $scope.e = document.getElementById('imge') ;
        $scope.s = document.getElementById('imgs');
        if($scope.i == 0)
        {
            imge.src = 'img/sex_2.png' ;
            imgx.src = 'img/sex_3.png' ;
            imgs.src = 'img/sex_6.png' ;
            $scope.i = 1 ;
        }

    };
    $scope.sex2 = function(){
        $scope.x = document.getElementById('imgx');
        $scope.s = document.getElementById('imgs');
        $scope.e = document.getElementById('imge') ;
        if($scope.i== 1){
            imgx.src = 'img/sex_4.png';
            imge.src = 'img/sex_1.png' ;
            imgs.src = 'img/sex_5.png' ;
            $scope.i=0;
        }
    }

    //phone=手机号&gender=性别&password=密码&code=验证码&share=推荐人
    $scope.phone='';
    $scope.gender='';
    $scope.password='';
    $scope.code='';
    $scope.share='';
    //手机号&gender=性别&password=密码&code=验证码
    $scope.agree=true;

    //点击注册按钮
    $scope.register=function(){
        //将性别保存到本地
        //if($scope.i==1){
        //    localStorage['sex'] = '男';
        //}else{
        //    localStorage['sex'] = '女';
        //}
        //将性别分享给其他控制器
        $rootScope=$scope.i;
        console.log($scope.i);
        if($scope.agree!==true){
            alert('请同意协议');
            return;
        }

        $http.get('http://m.ailai920.com:85/regis?&phone='+$scope.phone+'&gender='+$scope.i+'&password='+$scope.password+'&code='+$scope.code+'&share='+$scope.share)
            .success(function(data){
                console.log(data);
                //异步请求成功跳转到登录页面
                    if(data.message==='注册成功'){
                       // 将性别保存到本地
                       // if($scope.i==1){
                       //     localStorage['sex'] = '男';
                       // }else{
                       //     localStorage['sex'] = '女';
                       // }

                        alert('注册成功');
                        $state.go('user1');
                    }

            })
            .error(function(){
                console.log('注册异步请求失败');
            })
    }

    //短信验证异步请求
    $scope.on=function(){
        if($scope.phone==""){
            alert("请填写手机号");
          return;
        }else if($scope.agree!==true){
            alert("您未同意用户协议无法获取验证码");
            return;
        }

        if($('#register1').html()=='获取验证码'||$('#register1').html()=='重发验证码'){
            //短信验证异步请求
            $http.get('http://m.ailai920.com:85/sendsms?&phone='+$scope.phone)
                .success(function(data){
                    console.log(data);
                    if(data.message=='该手机号已注册'){
                        alert('该手机号已注册');
                        return;
                    }
                    timePromise = $interval(function(){
                        $scope.paracont = "重发验证码";
                        $scope.paraclass = "but_null";
                        $scope.paraevent = true;
                        if(second<=0){
                            second = 60;
                            $interval.cancel(timePromise);
                            timePromise = undefined;

                        }else{
                            $scope.paracont = second + "秒后可重发";
                            $scope.paraclass = "not but_null";
                            second--;

                        }
                    },1000);
                })
                .error(function(){
                    console.log('短信验证请求失败');
                })

        }



    };

}]);

//reset控制器
app.controller('resetCtrl',['$scope','$interval','$http','$state',function($scope,$interval,$http,$state){
    $scope.paracont="获取验证码";
    $scope.paraclass="but_null";
    $scope.paraevent="true";
    var second=54;
    timePromise = undefined;
    $scope.phone='';
    $scope.on=function(){
        //当手机号未输入时验证码禁止发送
        if($scope.phone==""){
            alert("请填写手机号");
            return;
        }
        if($('#register2').html()=='获取验证码'||$('#register2').html()=='重发验证码'){
            //获取手机验证的异步请求
            $http.get('http://m.ailai920.com:85/backsms?phone='+$scope.phone)
                .success(function(data){
                    console.log(data);
                })
                .error(function(){
                    console.log('获取验证码失败');
                })
            timePromise = $interval(function(){
                $scope.paracont = "重发验证码";
                $scope.paraclass = "but_null";
                $scope.paraevent = true;
                if(second<=-1){
                    second = 54;
                    $interval.cancel(timePromise);
                    timePromise = undefined;

                }else{
                    $scope.paracont = second + "秒后可重发";
                    $scope.paraclass = "not but_null";
                    second--;

                }
            },1000);
        }

    }
    $scope.password='';
    $scope.code='';
    //重置密码异步请求

    $scope.reset=function(){
        $http.get('http://m.ailai920.com:85/back?phone='+$scope.phone+'&password='+$scope.password+'&code='+$scope.code)
            .success(function(data){
                console.log(data);
                if(data.message==='密码重置成功'){
                    alert(data.message);
                    localStorage['phone']='';
                    $state.go('user1');
                }
            })
            .error(function(){
                console.log('重置密码异步请求失败');
            })
    }
}]);

//notice控制器
app.controller('noticeCtrl',['$scope',function($scope){

}])

//bookingseat控制器
app.controller('bookingseatCtrl',['$scope','$http','$state','$rootScope','$timeout',function($scope,$http,$state,$rootScope,$timeout){
    //代码端在视口中显示立马发起异步请求，获取已经被选择的座位，让其颜色变灰
    $http.get('http://m.ailai920.com:85/stare?')
        .success(function(data){
                $scope.isLoaded=true;
            console.log(data);
            //对返回的座位信息进行处理，使其变色,遍历返回的座位数据，然后用jquery调用id=row_cell,给其添加灰色样式的class，bookingCtrl中设置了含有灰色样式class的span无法提交发起异步请求
            if(data.message=='读取成功'){
                for(var i=0;i<data.seats.length;i++){
                    $('#'+data.seats[i].cells+'_'+data.seats[i].rows).addClass('seat_changed');
                }
            }
        })
        .error(function(){
            console.log('异步请求让已选座位变色失败');
        })

    $scope.now='';
    $scope.id='';
    $scope.row='';
    $scope.cell='';
    //点击当前座位变色，其他选中的座位取消变色
    $scope.clickMe=function(id){
        $('#seat>div>span').removeClass('seat_change');
        $('#seat>div>span').removeClass('seat_no');
        $('#'+id).addClass('seat_change');
        if($('#'+id).hasClass('seat_changed')){
            //$('#seat>div>span').removeClass('seat_no');
            $('#'+id).addClass('seat_no');
        }
        $scope.now=$('#'+id);
        $scope.id=$scope.now.attr('id').split('_');
        $scope.row=$scope.id[1];
        $scope.cell=$scope.id[0];
    }

    //按上，让上一个span的变色
    $scope.clickUp=function(){
        $('#seat>div>span').removeClass('seat_no');
        if($scope.now==''){
            $scope.now=$('#1_13');
        }
        $scope.now.removeClass('seat_change');
        //将字符串打断成数组
        $scope.id=$scope.now.attr('id').split('_');
        $scope.id[1]=parseInt($scope.id[1])-1;
        if($scope.id[1]==0){
            $scope.id[1]=24;
            //如果当前列为1，排为1，上移排要变成18
            if($scope.id[0]==31||$scope.id[0]==32){
                $scope.id[1]=18;
            }else if($scope.id[0]==29||$scope.id[0]==30){
                $scope.id[1]=19;
            }else if($scope.id[0]==27||$scope.id[0]==25||$scope.id[0]==23||$scope.id[0]==24||$scope.id[0]==26||$scope.id[0]==28){
                $scope.id[1]=22;
            }else if($scope.id[0]==21||$scope.id[0]==19||$scope.id[0]==20||$scope.id[0]==22){
                $scope.id[1]=23;
            }
        }
        //如果当前列为2，排为1，上移排要变成19
        $('#'+$scope.id[0]+'_'+$scope.id[1]).addClass('seat_change');
        //更新当前座位
        $scope.now=$('#'+$scope.id[0]+'_'+$scope.id[1]);
        $scope.row=$scope.id[1];
        $scope.cell=$scope.id[0];

        if($scope.now.hasClass('seat_changed')){
            $scope.now.addClass('seat_no');

        }


    };

    //按下，让下一个span的变色
    $scope.clickDown=function(){
        $('#seat>div>span').removeClass('seat_no');
        if($scope.now==''){
            $scope.now=$('#1_13');
        }
        $scope.now.removeClass('seat_change');
        //将字符串打断成数组
        $scope.id=$scope.now.attr('id').split('_');
        $scope.id[1]=parseInt($scope.id[1])+1;

        //让特殊的列最后一个座位的下一个变成第一个
        if($scope.id[1]==19){
            if($scope.id[0]==31||$scope.id[0]==32){
                $scope.id[1]=1;
            }
        }else if($scope.id[1]==20){
            if($scope.id[0]==29||$scope.id[0]==30){
                $scope.id[1]=1;
            }
        }else if($scope.id[1]==23){
            if($scope.id[0]==27||$scope.id[0]==25||$scope.id[0]==23||$scope.id[0]==24||$scope.id[0]==26||$scope.id[0]==28){
                $scope.id[1]=1;
            }
        }else if($scope.id[1]==24){
            if($scope.id[0]==21||$scope.id[0]==19||$scope.id[0]==20||$scope.id[0]==22){
                $scope.id[1]=1;
            }
        }else if($scope.id[1]==25){
            $scope.id[1]=1;
        }
        $('#'+$scope.id[0]+'_'+$scope.id[1]).addClass('seat_change');
        //更新当前座位
        $scope.now=$('#'+$scope.id[0]+'_'+$scope.id[1]);
        $scope.row=$scope.id[1];
        $scope.cell=$scope.id[0];
        if($scope.now.hasClass('seat_changed')){
            $scope.now.addClass('seat_no');
        }

    };

    //按左，让左一个span的变色
    $scope.clickLeft=function(){
        $('#seat>div>span').removeClass('seat_no');
        if($scope.now==''){
            $scope.now=$('#1_13');
        }
        $scope.now.removeClass('seat_change');
        //将字符串打断成数组
        $scope.id=$scope.now.attr('id').split('_');
        if($scope.id[0]%2==0){
            $scope.id[0]=parseInt($scope.id[0])-2;
            if($scope.id[0]==28){
                $scope.id[1]=parseInt($scope.id[1])+2;
            }else if($scope.id[0]==0){
                $scope.id[0]=1;
            }
        }else{
            $scope.id[0]=parseInt($scope.id[0])+2;
            if($scope.id[0]==33){
                $scope.id[0]=32;
            }
            if($scope.id[0]==29){
                $scope.id[1]=parseInt($scope.id[1])-2;
            }
        }

        $('#'+$scope.id[0]+'_'+$scope.id[1]).addClass('seat_change');
        ////更新当前座位
        $scope.now=$('#'+$scope.id[0]+'_'+$scope.id[1]);
        $scope.row=$scope.id[1];
        $scope.cell=$scope.id[0];
        if($scope.now.hasClass('seat_changed')){
            $scope.now.addClass('seat_no');
        }
    };

    //按右，让右一个span的变色
    $scope.clickRight=function(){
        $('#seat>div>span').removeClass('seat_no');
        if($scope.now==''){
            $scope.now=$('#1_13');
        }
        $scope.now.removeClass('seat_change');
        //将字符串打断成数组
        $scope.id=$scope.now.attr('id').split('_');
        if($scope.id[0]%2==0){
            $scope.id[0]=parseInt($scope.id[0])+2;
            if($scope.id[0]==30){
                $scope.id[1]=parseInt($scope.id[1])-2;
            }else if($scope.id[0]==34){
                $scope.id[0]=31;
            }
        }else{
            $scope.id[0]=parseInt($scope.id[0])-2;
            if($scope.id[0]==27){
                $scope.id[1]=parseInt($scope.id[1])+2;
            }else if($scope.id[0]==-1){
                $scope.id[0]=2;
            }
        }
        $('#'+$scope.id[0]+'_'+$scope.id[1]).addClass('seat_change');
        //更新当前座位
        $scope.now=$('#'+$scope.id[0]+'_'+$scope.id[1]);
        $scope.row=$scope.id[1];
        $scope.cell=$scope.id[0];
        if($scope.now.hasClass('seat_changed')){
            $scope.now.addClass('seat_no');
        }
    };

    //确认选座按钮点击时间
    $scope.clickYes=function(){
        console.log($scope.cell);
        console.log($scope.row);
        console.log($scope.now);
        if($scope.now==''){
            alert('请选择座位');
            return;

        }else if($scope.now.hasClass('seat_changed')){
            alert('当前座位不可选,请重新选择座位');
            return;
        }

        //发起异步请求，提交座位行和列，请求成功后，跳转到notice2页面
        //将localstorage['phone']保存过来
        //$http.get('http://139.224.33.228:88/regis?row='+$scope.row+'&cell='+$scope.cell)
        //    .success(function(data){
        //        conosle.log(data);
        //        if(data.message==='选座成功'){
        //            alert('您已选座成功');
        //            $rootScope.cell=$scope.cell;
        //            $rootScope.row=$scope.row;
        //            $rootScope.image=data.image;
        //            $state.go('notice2');
        //        }
        //    })
        //    .error(function(){
        //        console.log('点击确认选座发起异步请求失败');
        //    })

        $state.go('notice2');

        //使数据可以让其他控制器使用
        $rootScope.cell=$scope.cell;
        $rootScope.row=$scope.row;

    };


}]);

//notice2控制器
app.controller('notice2Ctrl',['$scope','$http','$rootScope',function($scope,$http,$rootScope){
    $scope.username='';
    $scope.userphone=localStorage['phone'];
    //$scope.img='';
    console.log($scope.cell);
    console.log($scope.row);
    //点击确认选座按钮发起异步请求
    $scope.submit=function(){
        $http.get('http://m.ailai920.com:85/seat?account='+$scope.userphone+'&username='+$scope.username+'&rows='+$scope.row+'&cells='+$scope.cell)
            .success(function(data){
                console.log(data);
                if(data.message=='选座成功'){
                    $scope.data=data;
                    localStorage['username'] = $scope.username;
                    localStorage['cell'] = $scope.cell;
                    localStorage['row'] = $scope.row;
                    alert('领票成功,可在个人中心查询座位信息');
                }else if(data.message=='您已领取过门票,一个账户只允许领取一张门票'){
                    alert('您已领取过门票,一个账户只允许领取一张门票');
                }

            })
            .error(function(){
                console.log('异步请求失败');
            })
    }

}])

//checkmsg控制器
app.controller('checkmsgCtrl',['$scope',function($scope){

}]);

//book2用户协议
app.controller('book2Ctrl',['$scope',function($scope){

}]);

//person控制器
app.controller('personCtrl',['$scope',function($scope){

}]);

//liveplayer控制器
app.controller('liveplayerCtrl',['$scope','$timeout',function($scope,$timeout){
    //点赞
    //$scope.a=49500;
    //$scope.clickMe=function(){
    //    $('#img_zan').attr('src','img/zan.png');
    //    $scope.a+=10;
    //    $('#span_zan').html($scope.a);
    //    $timeout(function(){
    //        $('#img_zan').attr('src','img/zan1.png');
    //    },100)
    //
    //}
}]);

//map控制器
app.controller('mapCtrl',['$scope',function($scope){
    $scope.map=new BMap.Map("container");
    $scope.point=new BMap.Point(121.534812,31.284343);
    $scope.map.centerAndZoom($scope.point, 17);
    $scope.map.enableScrollWheelZoom(true);
    $scope.map.addControl(new BMap.NavigationControl());
    $scope.map.addControl(new BMap.OverviewMapControl());
    $scope.map.addControl(new BMap.ScaleControl());
    $scope.map.addControl(new BMap.MapTypeControl());
    $scope.map.addControl(new BMap.GeolocationControl());
    $scope.map.addOverlay(new BMap.Marker($scope.point));
    //map.addOverlay(marker);
    //marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    $scope.map.addOverlay(new BMap.Label('杨浦大剧院',{position: $scope.point}));

}]);

