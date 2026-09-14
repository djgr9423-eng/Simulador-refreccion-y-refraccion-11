const $=id=>document.getElementById(id);
const tabs=document.querySelectorAll('.tab');
tabs.forEach(t=>t.addEventListener('click',()=>{tabs.forEach(x=>x.classList.remove('active'));document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));t.classList.add('active');$(t.dataset.target).classList.add('active');draw();}));
const fc=$('fc'),rc=$('rc');
function resize(c){const r=c.getBoundingClientRect(),d=devicePixelRatio||1;c.width=r.width*d;c.height=r.height*d;const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);return [r.width,r.height,x]}
function fiber(){
 const [w,h,c]=resize(fc),nc=+$('nc').value,nl=+$('nl').value,a=+$('a').value;
 $('ncVal').textContent=nc.toFixed(2);$('nlVal').textContent=nl.toFixed(2);$('aVal').textContent=a+'°';
 c.clearRect(0,0,w,h);
 const critical=nc>nl?Math.asin(nl/nc)*180/Math.PI:null;
 $('critical').textContent=critical?critical.toFixed(1)+'°':'—';
 const tir=critical!==null && a>critical;
 $('fiberStatus').textContent=tir?'Reflexión interna total':'La luz escapa del núcleo';
 const top=h*.28,bottom=h*.72;
 c.fillStyle='#102f49';c.fillRect(0,top,w,bottom-top);
 c.strokeStyle='#477da4';c.lineWidth=2;c.strokeRect(0,top,w,bottom-top);
 c.fillStyle='#07111f';c.fillRect(0,top-22,w,22);c.fillRect(0,bottom,w,22);
 c.strokeStyle='#ffdc54';c.lineWidth=4;c.beginPath();
 let x=35,y=bottom-(bottom-top)*.35,dx=3.2,dy=-dx*Math.tan(a*Math.PI/180);
 c.moveTo(x,y);
 for(let i=0;i<1200&&x<w;i++){x+=dx;y+=dy;if(y<=top+3){y=top+3+(top+3-y);dy=-dy}if(y>=bottom-3){y=bottom-3-(y-(bottom-3));dy=-dy}c.lineTo(x,y)}c.stroke();
 c.fillStyle='#d9e9f7';c.font='14px Arial';c.fillText('Núcleo',16,top+24);c.fillText('Revestimiento',16,top-7);
}
function refr(){
 const [w,h,c]=resize(rc),n1=+$('m1').value,n2=+$('m2').value,a=+$('ra').value;
 $('raVal').textContent=a+'°';$('incAngle').textContent=a+'°';
 const rad=a*Math.PI/180,s=n1*Math.sin(rad)/n2;
 let total=s>1,theta=total?null:Math.asin(s)*180/Math.PI;
 $('outAngle').textContent=total?'—':theta.toFixed(1)+'°';$('refStatus').textContent=total?'Reflexión interna total':'Refracción';
 c.clearRect(0,0,w,h);const mid=w/2,ny=h/2;
 c.fillStyle='#102f49';c.fillRect(0,ny,w,h-ny);c.fillStyle='#0b1d30';c.fillRect(0,0,w,ny);
 c.strokeStyle='#6e9fc8';c.lineWidth=2;c.beginPath();c.moveTo(0,ny);c.lineTo(w,ny);c.stroke();
 c.strokeStyle='#49677f';c.setLineDash([7,7]);c.beginPath();c.moveTo(mid,25);c.lineTo(mid,h-20);c.stroke();c.setLineDash([]);
 const L=Math.min(w,h)*.38;let x0=mid-L*Math.sin(rad),y0=ny-L*Math.cos(rad);
 c.strokeStyle='#ffdc54';c.lineWidth=4;c.beginPath();c.moveTo(x0,y0);c.lineTo(mid,ny);c.stroke();
 if(total){c.beginPath();c.moveTo(mid,ny);c.lineTo(mid+L*Math.sin(rad),ny-L*Math.cos(rad));c.stroke()}else{const rr=theta*Math.PI/180;c.beginPath();c.moveTo(mid,ny);c.lineTo(mid+L*Math.sin(rr),ny+L*Math.cos(rr));c.stroke()}
 c.fillStyle='#d9e9f7';c.font='14px Arial';c.fillText('Medio 1 · n='+n1.toFixed(2),16,28);c.fillText('Medio 2 · n='+n2.toFixed(2),16,h-18);
}
function draw(){fiber();refr()}
['nc','nl','a','ra'].forEach(id=>$(id).addEventListener('input',draw));['m1','m2'].forEach(id=>$(id).addEventListener('change',draw));window.addEventListener('resize',draw);draw();