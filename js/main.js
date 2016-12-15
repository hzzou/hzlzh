window.onload = function (){
  hzlzh.app.nav();
  hzlzh.app.aside();
  hzlzh.app.page();
  hzlzh.app.sort();
  hzlzh.app.move();
  hzlzh.app.run();
}



var hzlzh = {};
hzlzh.tools = {};
hzlzh.tools.getStyle = function (obj,attr){
  return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
  //获取没有设置在内部样式中的css样式
}
hzlzh.tools.getClassName =function getElementsByClassName(obj,tagName,className){
  var aEls = obj.getElementsByTagName(tagName);
  var arr = [];

  for(var i=0;i<aEls.length;i++){
    /** if(aEls[i].className == className){
						arr.push(aEls[i]); //不能解决包含多个class名的情况
					} **/
    var aClassName = aEls[i].className.split(' '); //以空格为切割点
    for(var j=0;j<aClassName.length;j++){
      if(aClassName[j] == className){
        arr.push(aEls[i]); //依旧装aEls,不过是外层循环中的，是aEls[i],不是aEls[j]
        break;             //只要找到有一个相同的就跳出内层for循环
      }
    }
  }
  return arr;
}
hzlzh.ui = {};
hzlzh.ui.select = function (obj,str){
  for(var i=0;i<obj.length;i++){
    obj[i].onclick = function (){
      for(var j=0;j<obj.length;j++){
        obj[j].className = '';
      }
      this.className = str;
    };
  }
};
hzlzh.ui.oA = function (obj1,obj2){
  obj1.onclick = function (ev){
    var ev = ev||event;
    obj2.style.display = 'block';
    if(ev.stopPropagation){
      ev.stopPropagation();
    }
    else{
      ev.cancelBubble = true;
    }
  };
};
hzlzh.ui.aLi = function (obj1,obj2,obj3){
  for(var i=0;i<obj1.length;i++){
    obj1[i].onmouseover = function (){
      for(var j=0;j<obj1.length;j++){
        obj1[j].className = '';
      }
      this.className = 'active_s';
    };
    obj1[i].onclick = function (ev){
      var ev = ev||event;
      obj2.style.display = 'none';
      obj3.innerHTML = this.innerHTML;
      if(ev.stopPropagation){
        ev.stopPropagation();
      }
      else{
        ev.cancelBubble = true;
      }
    };
  }
};
hzlzh.ui.doc = function (obj){
  document.onclick = function (){
    for(var i=0;i<obj.length;i++){
      obj[i].style.display = 'none';
    }
  };
};
hzlzh.ui.moveLeft = function (obj,old,now){
  clearInterval(obj.timer); //清掉原来添加的定时器，再添加新的

  obj.timer = setInterval(function (){
    var iSpeed = (now-old)/10;
    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed):Math.floor(iSpeed);

    if(now == old){ //如果新位置和老位置相同,old添加一定数量的speed后等于now,也就是说移动到了想要的位置
      clearInterval(obj.timer);
    }
    else{
      old += iSpeed;
      obj.style.marginLeft = old + 'px';
    }
  },30);
};


hzlzh.app = {};
hzlzh.app.nav = function (){
  var oNav = document.getElementById('nav');
  var aBtn = oNav.getElementsByTagName('a');
  hzlzh.ui.select(aBtn,'active');
};
hzlzh.app.aside = function (){

  var oSide = document.getElementById('sidebar');
  var oBar1 = hzlzh.tools.getClassName(oSide,'section','bar_a')[0];
  var oUl = oBar1.getElementsByTagName('ul')[0];
  var aLi = oUl.getElementsByTagName('li');
  hzlzh.ui.select(aLi,'active_a');
};
hzlzh.app.page = function (){
  var oMain = document.getElementById('contentMain');
  var oPage = hzlzh.tools.getClassName(oMain,'div','page')[0];
  var aBtn = oPage.getElementsByTagName('a');

  for(var i=0;i<aBtn.length;i++){
    aBtn[i].index = i;
    aBtn[i].onclick = function (){
      var oActive = hzlzh.tools.getClassName(oPage,'a','active_p')[0];
      for(var j=0;j<aBtn.length;j++){
          aBtn[j].className = '';
        }
      if(this.innerHTML == '<span>&lt;&lt;</span> FIRST' || this.innerHTML == '<SPAN>&lt;&lt;</SPAN> FIRST'){
        aBtn[2].className = 'active_p';
        this.href = aBtn[2].href;
      }
      else if(this.innerHTML == 'LAST <span>&gt;&gt;</span>' ||this.innerHTML == 'LAST <SPAN>&gt;&gt;</SPAN>'){
        aBtn[aBtn.length-3].className = 'active_p';
        this.href = aBtn[aBtn.length-3].href;
      }
      else if(this.innerHTML == '<span>&lt;</span> PREV' || this.innerHTML == '<SPAN>&lt;</SPAN> PREV'){
        if(oActive.index == 2){
          aBtn[oActive.index].className = 'active_p';
          this.href = aBtn[oActive.index].href;
          alert('已经是第一页了');
        }
        else{
          aBtn[oActive.index-1].className = 'active_p';
          this.href = aBtn[oActive.index-1].href;
        }
      }
      else if(this.innerHTML == 'NEXT <span>&gt;</span>' || this.innerHTML == 'NEXT <SPAN>&gt;</SPAN>'){
        if(oActive.index == aBtn.length-3){
          aBtn[oActive.index].className = 'active_p';
          this.href = aBtn[oActive.index].href;
          alert('已经是最后一页了');
        }
        else{
          aBtn[oActive.index+1].className = 'active_p';
          this.href = aBtn[oActive.index+1].href;
        }
      }
      else{
            this.className = 'active_p';
      }
    };
  }
};
hzlzh.app.sort = function (){

  var oSearch = hzlzh.tools.getClassName(document,'dl','contentSearch')[0];
  var aDd = oSearch.getElementsByTagName('dd');
  var aUl = oSearch.getElementsByTagName('ul');

  var oH1 = aDd[0].getElementsByTagName('h2')[0];
  var oA1 = aDd[0].getElementsByTagName('a')[0];
  var oUl1 = aDd[0].getElementsByTagName('ul')[0];
  var aLi1 = oUl1.getElementsByTagName('li');
  var oH2 = aDd[1].getElementsByTagName('h2')[0];
  var oA2 = aDd[1].getElementsByTagName('a')[0];
  var oUl2 = aDd[1].getElementsByTagName('ul')[0];
  var aLi2 = oUl2.getElementsByTagName('li');
  var oH3 = aDd[2].getElementsByTagName('h2')[0];
  var oA3 = aDd[2].getElementsByTagName('a')[0];
  var oUl3 = aDd[2].getElementsByTagName('ul')[0];
  var aLi3 = oUl3.getElementsByTagName('li');

  hzlzh.ui.oA(oA1,oUl1);
  hzlzh.ui.aLi(aLi1,oUl1,oH1);

  hzlzh.ui.oA(oA2,oUl2);
  hzlzh.ui.aLi(aLi2,oUl2,oH2);

  hzlzh.ui.oA(oA3,oUl3);
  hzlzh.ui.aLi(aLi3,oUl3,oH3);

  hzlzh.ui.doc(aUl);
};
hzlzh.app.move = function (){
  var oTop = document.getElementById('mainTop');
  var oBtn1 = document.getElementById('pre');
  var oBtn2 = document.getElementById('next');

  var arrHref = ['#1','#2','#3','#4'];
  var arrImg = ['images/banner/1.png','images/banner/2.png','images/banner/3.png','images/banner/4.png'];
  var arrText1 =['TITLE1','TITLE2','TITLE3','TITLE4'];
  var arrText2 =['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suscipit lacus dapibus ante mattis in adipiscing nibh placerat. Cras bibendum porta diam, non dignissim sapien malesuada vitae.',
    'Cras suscipit lacus dapibus ante mattis in adipiscing nibh placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras bibendum porta diam, non dignissim sapien malesuada vitae.',
    'Cras bibendum porta diam, non dignissim sapien malesuada vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras suscipit lacus dapibus ante mattis in adipiscing nibh placerat.',
    'Cras suscipit lacus dapibus ante mattis in adipiscing nibh placerat. Cras bibendum porta diam, non dignissim sapien malesuada vitae. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'];

  function fn1(num){
    var oLi = document.createElement('li');
    var oA = document.createElement('a');
    var oImg = document.createElement('img');
    oImg.src = arrImg[num];
    oA.href = arrHref[num];
    oA.appendChild(oImg);
    oLi.appendChild(oA);
    oTop.appendChild(oLi);

    oLi = document.createElement('li');
    oLi.id = 'li-2';
    var oSpan = document.createElement('span');
    oSpan.id = 'sp1';
    oSpan.innerHTML = arrText1[num];
    oLi.appendChild(oSpan);
    oSpan = document.createElement('span');
    oSpan.id = 'sp2';
    oSpan.innerHTML = arrText2[num];
    oLi.appendChild(oSpan);
    oTop.appendChild(oLi);
  }
  //fn1(0);

  /*var timer = null;
  var iNow = 0;

  function fn2(){
    oTop.innerHTML = '';
    if(iNow == arrImg.length-1){
      iNow = 0;
    }
    else{
      iNow++;
    }
    fn1(iNow);
  }
  clearInterval(timer);
  timer = setInterval(fn2,3000);

  oBtn1.onmouseover = function (){
    clearInterval(timer);
  };
  oBtn2.onmouseover = function (){
    clearInterval(timer);
  };

  oBtn1.onmouseout = function (){
    timer = setInterval(fn2,3000);
  };
  oBtn2.onmouseout = function (){
    timer = setInterval(fn2,3000);
  };

  oBtn1.onclick = function (){
    oTop.innerHTML = '';
    if(iNow == 0){
      iNow = arrImg.length-1;
    }
    else{
      iNow--;
    }
    fn1(iNow);
  };
  oBtn2.onclick = function (){
    oTop.innerHTML = '';
    if(iNow == arrImg.length-1){
      iNow = 0;
    }
    else{
      iNow++;
    }
    fn1(iNow);
  };*/

};
hzlzh.app.run = function ()  {
  var oBottom = document.getElementById('contentBottom');
  var oDiv = hzlzh.tools.getClassName(oBottom,'div','list')[0];
  var oUl = oDiv.getElementsByTagName('ul')[0];
  var aLi = oUl.getElementsByTagName('li');
  var oBtn1 = hzlzh.tools.getClassName(oBottom,'a','pre')[0];
  var oBtn2 = hzlzh.tools.getClassName(oBottom,'a','next')[0];



  oUl.innerHTML += oUl.innerHTML;

  var timer = null;
  var iNow = 0;

  function fn1(){
    if(iNow == aLi.length/2){
      iNow = 0;
      oUl.style.marginLeft = 0;
    }
    hzlzh.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow+1)*aLi[0].offsetWidth);
    //要保证 -(iNow+1)-(-iNow)结果任何时候都是1，也就是说每次移动的距离都是一个aLi[0].offsetWidth
    iNow++;
  }

  function fn2(){
    if(iNow == 0){
      iNow = aLi.length/2;
      oUl.style.marginLeft = '-600px';
    }
    hzlzh.ui.moveLeft(oUl,-iNow*aLi[0].offsetWidth,-(iNow-1)*aLi[0].offsetWidth);
    //要保证 -(iNow-1)-(-iNow)结果任何时候都是1，也就是说每次移动的距离都是一个aLi[0].offsetWidth
    iNow--;
  }
  timer = setInterval(fn1,3000);

  oBtn1.onmouseover = function (){
    clearInterval(timer);
  };
  oBtn1.onmouseout = function (){
    timer = setInterval(fn1,3000);
  };
  oBtn1.onclick = function (){
    fn2();
  };

  oBtn2.onmouseover = function (){
    clearInterval(timer);
  };
  oBtn2.onmouseout = function (){
    timer = setInterval(fn1,3000);
  };
  oBtn2.onclick = function (){
    fn1();
  };
};

