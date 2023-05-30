let points = [[-5, 17], [-8,13], [-9, 10],[-10,7],[-10,3],[-11,0],[-12,-2],[-12,0],[-11,-2],[-10,-3],[-10,-4],[-11,-6],[-12,-8],[-14,-9],[-14,-10],[-15,-8], [-16,-8], [-17, -9],[-17,-10],[-16,-13],[-14,-16],[-7,-16], [-7, -17],[-4,-17],[-2,-16],[-3,-17],[0,-17],[2,-16],[4,-16],[5,-15],[7,-11],[7,-8],[6,-8], [5,-9], [4, -8],[3,-8],[1,-4],[1,-2],[2,-1], [2, 2],[3,2],[9,4],[14,7],[15,8],[10,8], [0, 5],[-5,6],[-4,9],[-4,12],[-4,16]]; //list資料，
var fill_colors = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a=>"#"+a)
var line_colors = "ffd6ff-e7c6ff-c8b6ff-b8c0ff-bbd0ff".split("-").map(a=>"#"+a)


//++++++++設定畫points所有"點"的物件變數
var ball //"目前要處理"的物件,暫時放在ball變數內
var balls =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++

//++++++++設定飛彈物件的變數
var bullet  //"目前要處理"的物件,暫時放在ball變數內
var bullets =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++

//++++++++設定怪物物件的變數
var monster  //"目前要處理"的物件,暫時放在monster變數內
var monsters =[] //把產生的"所有"的物件，為物件的倉庫，所有的物件資料都在此
//+++++++++++++++++++++

var score=0

function preload(){ //程式碼準備執行之前,所執行的程式碼內容,
  elephant_sound=loadSound("sound/elephant.wav")
  elephant_sound=loadSound("sound/elephant.wav")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(var i=0;i<10;i=i+1){ //i=0、1、2、3、4、...、8、9
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball的物件放入到balls陣列內
  }
  for(var i=0;i<10;i=i+1){ //i=0、1、2、3、4、...、8、9
    monster = new Monster({}) //產生一個Obj class元件
    monsters.push(monster) //把ball的物件放入到balls陣列內
  }
}

function draw() {
 background(220);
//  for(var j=0;j<balls.length;j=j+1){
//    ball = balls[j]
//    ball.draw()
//    ball.update()
//  }

//大象的顯示
for(let ball of balls) //只要是陣列的方式，都可以利用此方式處理
 {
  ball.draw()
  ball.update()
  for(let bullet of bullets){ //檢查每一個飛彈物件
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){ //飛彈物件有沒有接觸現在的ball
        balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball))
        bullets.splice(bullets.indexOf(bullet),1)
        score = score + 1
        elephant_sound.play()
      }

  }
 }


 //飛彈的顯示
 for(let bullet of bullets) //只要是陣列的方式，都可以利用此方式處理
 {
  bullet.draw()
  bullet.update()
 }
 //怪物的顯示
 for(let monster of monsters) //只要是陣列的方式，都可以利用此方式處理
 {
  monster.draw()
  monster.update()
 }

textSize(50)
text(score,50,50) //在座標為(50,50)上，顯示score分數內容
push() //重新規劃原點(0,0),在視窗的中間
  let dx = mouseX - width/2
  let dy = mouseY - height/2
  let angle = atan2(dy,dx)
  translate(width/2,height/2)
  fill("#c9ada7")
  noStroke()
  rotate(angle)
  triangle(-25,-25,-25,25,50,0) //設定三個點,畫成一個三角形
  ellipse(0,0,50)
pop() //恢復原本設定,原點(0,0)在視窗的左上角
}

function mousePressed(){

  //++++++++++++產生一個物件+++++++++++++++++++++++++++++++++++
  // ball = new Obj({p:{x:mouseX,y:mouseY}})//在滑鼠按下的地方，產生一心的obj class元件
  // p:{x:mouseX,y:mouseY}
  // balls.push(ball) //把ball的物件放入到balls的物件放入到balls陣列內(丟到倉庫)
  //+++++++++++++++++++++++++++++++++++++++++

  // 在物件上按下滑鼠,物件消失不見,分數+1分
  // for(let ball of balls){ //檢查每一個物件
  // if(ball.isBallInRanger(mouseX,mouseY)){
  // balls.splice(balls.indexOf(ball),1) //從倉庫balls取出被滑鼠按到的物件編號(balls.indexOf(ball),1)，只取一個
  // score = score + 1
  // }
  // }
  //+++++++++++++++++++++++++++

 //++++++++++++按一下產生一個飛彈+++++++++++++
 bullet = new Bullet({}) //在滑鼠按下的地方，產生一個新的Bullet class元件(產生一個飛彈)
 bullets.push(bullet) //把bullet的物件放入到bullet陣列內(丟到倉庫)
 bullet_sound.play()
}