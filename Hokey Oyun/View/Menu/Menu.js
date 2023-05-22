const body = document.querySelector('body');
const element = document.getElementById("object");
const map = /** @type {HTMLCanvasElement} */ (document.getElementById("map"));
//bu yukarıdaki type çok önemli önerileri açtı neden bilmiyorum

//default position of elements
const defPosX = 50;
const defPosY = 50;

let ctx = map.getContext('2d');
const drawMap = (x,y,w,h,color) =>{
    ctx.fillStyle =color;
    ctx.fillRect(x,y,w,h);
}

const drawObject = (x,y,r,color) =>{
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI,false);
    ctx.closePath();
    ctx.fill();
}

const drawObjectS = (x,y,r,w,color) =>{
    ctx.strokeStyle=color;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.closePath();
    ctx.stroke();
}

const drawText = (text,x,y,color)=> {
    ctx.fillStyle=color;
    ctx.font="20px sans-serif";
    ctx.fillText(text,x,y);
}

const ball = {
    x:map.width/2,
    y:map.height/2,
    r:5,
    color:'#a51890',
    speed:5,
    velocityX:3,
    velocityY:4,
    stop:true
}


    // drawMap(0,0,600,400,'#fff')
    // drawObject(50,50,5,'#dd2c00');
    // drawObjectS(250,250,50,10,'#3800a8');
    // drawText('deneme',400,200,'#3800a8');
const user = {
    x:5,
    y:map.height/2-30,
    w:5,
    h:50,
    color:"#fff",
    score:0
}

const com = {
    x:map.width-15,
    y:map.height/2-30,
    w:5,
    h:50,
    color:"#fff",
    score:0
}

const movePaddle = (e)=>{
    let rect = map.getBoundingClientRect()
    user.y=e.clientY -rect.top - 2.2*user.h
    ball.stop = false
}
map.addEventListener('mousemove',movePaddle)


const collision = (b,p) =>{
b.top = b.y - b.r
b.bottom = b.y + b.r
b.left = b.x - b.r
b.right = b.x + b.r

p.top = p.y
p.bottom = p.y + p.h
p.left = p.x
p.right = p.x + p.w

return (b.top < p.bottom && b.bottom > p.top && b.left < p.right && b.right > p.left)
}


const resetBall = ()=>{
    ball.x=map.width/2
    ball.y = map.height/2
    ball.speed = 5
    ball.velocityX = 3
    ball.velocityY=4
    ball.stop = true
}

const update= ()=>{
    if(ball.stop)
    {
        ball.x += ball.velocityX
        ball.y += ball.velocityY
    }

    ball.x+=ball.velocityX;
    ball.y+=ball.velocityY;
    if(ball.y+ball.r >map.height || ball.y-ball.r<0)
    ball.velocityY=-ball.velocityY;
    let comLvl = 0.5
    com.y +=(ball.y-(com.y+com.h/2))*comLvl
    let player = (ball.x<map.width/2) ? user:com
    if(collision(ball,player))
    {
        let intersectY = ball.y - (player.y + player.h/2)
        intersectY/=player.h/2
        let maxBounceRate = Math.PI /3
        let bounceAngle = intersectY + maxBounceRate
        let direction = (ball.x < map.width/2) ? 1:-1
        ball.velocityX = direction*ball.speed * Math.cos(bounceAngle)
        ball.velocityY= ball.speed * Math.sin(bounceAngle)
        ball.speed+= 2
    }
    if(ball.x>map.width)
    {
        user.score++;
        resetBall()
    }
    else if(ball.x<0)
    {
        com.score++
        resetBall()
    }
    
}

const render = ()=>{
    drawMap(0,0,map.width,map.height,'#008374');
    drawMap(map.width/2-2,0,4,map.height,'#fff');
    drawObject(map.width/2,map.height/2,8,'#fff');
    drawObjectS(map.width/2,map.height/2,50,4,'#fff')
    drawText(user.score,map.width/7,20,'#fff')
    drawText(com.score,3*map.width/4,20,'#fff')
    drawMap(user.x,user.y,user.w,user.h,user.color)
    drawMap(com.x,com.y,com.w,com.h,com.color)

    drawObject(ball.x,ball.y,ball.r,ball.color)
}


const game =()=> {
    update();
    render();

}

const fps=30;
setInterval(game,1000/fps)


//user class
// class user{
//     object = element;
//     positionNumX = defPosX;
//     positionNumY=defPosY;
//     positionX=element.style.top;
//     positionY=element.style.left;
//     exp;
//     level;
//     pow;
//     moveSpeed;
//     user() {
//         this.positionX="55%";
//         this.positionY="50%";
//     }
// }
// let us = new user();


// //new object
// function move() {
//     us.positionNumX++;
//     let string = us.positionNumX+"%";
//     us.positionX=string;
//     console.log(us.positionX);
// }

// body.addEventListener('keydown',(event)=>{
// if(event.key == "ArrowDown") {
//     y=y+0.7;
//     if(y>100) {y=y-10; object.style.top=y+"%"; }
//     else object.style.top=y+"%";
//     }
// if(event.key == "ArrowLeft"){
//     x=x-0.7;
//     if(x<0) {x=x+10; object.style.top = x+"%"; }
//     else object.style.left=x+"%";
//     }
// if(event.key == "ArrowUp"){
//     y=y-0.7;
//     if(y<0){y=y+10; object.style.top=y+"%"; }
//     else object.style.top=y+"%";
//     }
// if(event.key == "ArrowRight"){
//     x+=0.7;
//     if(x>100) {x=x-10; object.style.left =x+"%"}
//     else object.style.left=x+"%";
//     }
// });

// body.addEventListener('keydown', (event)=>{
// if(event.key=="space") {
// for(let i=0; i<10; i++){
//     //ates
// }
// }
// });