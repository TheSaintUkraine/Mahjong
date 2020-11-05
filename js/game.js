var timer = 0;
var pars = 92;
var snam = ['Clubs','Diamonds','Hearts','Spades'];
var numb = ['2','3','4','5','6','7','8','9','10','J','Q','K'];
var need = [];
var img = [];
var img_html = '';
var cardSrc1 = '';
var cardSrc2 = '';
var card1;
var card2;
var a =0;
var b =0;
var c =12;
var e= 0;
var allcard=[];
var click = false;
var gameCont = localStorage.getItem('gameType');
var win = false;
var index = "document.location='index.html'";
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
function start() {

  for (var i = 0; i != 104; i++) {
    if (snam[a]==undefined) {
      break;
    }
    if (i==c) {
      c+=12;
      b=0;
      a++;

    }else {
    need.push('card'+snam[a]+numb[b])
    need.push('card'+snam[a]+numb[b])
    b++;
  }
  }
  need.push('card'+snam[3]+numb[11])
  need.push('card'+snam[3]+numb[11])


}



function ShowHtml() {


  for (var i = 0; i !=pars; i++) {
    a = getRandomInt(0,need.length)
    img_html += '<div onclick="showC('+i+')" class="block"><div class="title">#'+i+'</div><div class="img_bl"><img src="Cards/Back.png" alt=""></div></div>';
    img[i]=need[a]
    allcard.push(i);
    need.splice(a,1);
    c=1;
  }
  console.log(allcard);
  console.log(img);
  document.querySelector('main').innerHTML = img_html;
}
function ShowHtml2(id1,id2) {
  if (win == false) {
    img.splice(id1,1)
    if (id2<id1) {img.splice(id2,1)} else{img.splice(id2-1,1)}

    allcard.splice(id1,1)
    allcard.splice(id2-1,1)

    localStorage.setItem('left',pars)
    img_html = '';
    console.log(566);
    for (var i = 0; i !=img.length; i++) {
      img_html += '<div onclick="showC('+i+')" class="block"><div class="title">#'+allcard[i]+'</div><div class="img_bl"><img src="Cards/Back.png" alt=""></div></div>';
      c=1;
    }
    console.log(img);
    document.querySelector('main').innerHTML = img_html;
  }
}
var id1 =0;
var id2 = 0;
function showC(num) {
  if(click == false) {
    if (c==1) {
      b = img[num]
      id1= num;
      card1 = document.querySelectorAll('img')[num];
      card1.src='Cards/'+b+'.png';
      cardSrc1 = 'Cards/'+b+'.png';
      c=2;
    }
    else if(c==2) {

      e = img[num]
      id2 = num;
      card2 = document.querySelectorAll('img')[num];
      card2.src='Cards/'+e+'.png';
      cardSrc2 = 'Cards/'+e+'.png';
      if(cardSrc1==cardSrc2 && id1!=id2) {
        pars-=2;
        if (pars==0) {
          win = true;
          document.querySelector('main').innerHTML = '';
          document.querySelector('.win').innerHTML = '<h1 class="winT">You win</h1><button onclick="'+index+'" class="toMenu">Меню</button>';
        }
        document.querySelector('.pars').innerText='Left: '+pars;
        $.amaran({'message':'Пара найдена'});
        c=1;

        ShowHtml2(id1,id2)
      }
      else {
        c=1;
        click = true;
        setTimeout(()=>{
          card1.src='Cards/Back.png';
          card2.src='Cards/Back.png';
          click=false;
        },1000)

        $.amaran({'message':'Пара не найдена'});
      }
    }
  }
}
var config;
function save() {
  config = {
    time:timer,
    numb:allcard,
    img:img,
    left:pars
  }
  localStorage.setItem('data',JSON.stringify(config))

}
document.querySelector('.pars').innerText='Left: '+pars;
if (gameCont=='false') {

  start()
  ShowHtml()
}
else {
  config = JSON.parse(localStorage.getItem('data'));
  timer = config.time;
  img = config.img;
  allcard = config.numb;
  pars = config.left;
  document.querySelector('.pars').innerText='Left: '+pars;
  for (var i = 0; i !=img.length; i++) {
    img_html += '<div onclick="showC('+i+')" class="block"><div class="title">#'+allcard[i]+'</div><div class="img_bl"><img src="Cards/Back.png" alt=""></div></div>';
    c=1;
  }
  document.querySelector('main').innerHTML = img_html;
}


setInterval(()=>{
  if (win==false) {
    timer++;

    document.querySelector('.time').innerText='Time: '+timer;
    save()
  }
},1000)
