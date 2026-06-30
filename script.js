const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 500;

let tool = "select";
let objects = [];

let isDrawing = false;
let startX = 0;
let startY = 0;

function setTool(t){
  tool = t;
}

/* MOUSE DOWN */
canvas.addEventListener("mousedown",(e)=>{
  const rect = canvas.getBoundingClientRect();

  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;

  isDrawing = true;

  if(tool === "rect"){
    objects.push({type:"rect",x:startX,y:startY,w:0,h:0});
  }

  if(tool === "circle"){
    objects.push({type:"circle",x:startX,y:startY,r:0});
  }
});

/* MOUSE MOVE */
canvas.addEventListener("mousemove",(e)=>{
  if(!isDrawing) return;

  const rect = canvas.getBoundingClientRect();

  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  let obj = objects[objects.length - 1];
  if(!obj) return;

  if(obj.type === "rect"){
    obj.w = x - obj.x;
    obj.h = y - obj.y;
  }

  if(obj.type === "circle"){
    let dx = x - obj.x;
    let dy = y - obj.y;
    obj.r = Math.sqrt(dx*dx + dy*dy);
  }

  draw();
});

/* MOUSE UP */
canvas.addEventListener("mouseup",()=>{
  isDrawing = false;
});

/* DRAW */
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  objects.forEach(o=>{
    if(o.type === "rect"){
      ctx.strokeRect(o.x,o.y,o.w,o.h);
    }

    if(o.type === "circle"){
      ctx.beginPath();
      ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      ctx.stroke();
    }
  });
}

draw();