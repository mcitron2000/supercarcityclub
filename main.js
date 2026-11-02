(()=>{const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const s=[...document.querySelectorAll('.slide')],dots=document.getElementById('dots');let i=0,t;
s.forEach((_,k)=>{const b=document.createElement('button');b.setAttribute('aria-label','Slide '+(k+1));b.onclick=()=>go(k);dots.appendChild(b)});
const go=k=>{s[i].classList.remove('on');dots.children[i].classList.remove('on');i=k;s[i].classList.add('on');dots.children[i].classList.add('on');clearTimeout(t);if(!rm)t=setTimeout(()=>go((i+1)%s.length),5500)};go(0);
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const nav=document.getElementById('nav');addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>40),{passive:true});
document.getElementById('burger').onclick=()=>document.body.classList.toggle('open');
document.querySelectorAll('#menu a').forEach(a=>a.onclick=()=>document.body.classList.remove('open'));
if(!rm&&matchMedia('(hover:hover)').matches)document.querySelectorAll('.tilt').forEach(el=>{
 el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;el.style.setProperty('--mx',(x+.5)*100+'%');el.style.setProperty('--my',(y+.5)*100+'%')});
 el.addEventListener('mouseleave',()=>el.style.transform='')});
const f=document.getElementById('waitlist');f.addEventListener('submit',async e=>{e.preventDefault();const b=f.querySelector('button');b.disabled=true;b.textContent='Sending…';const d=Object.fromEntries(new FormData(f));d._subject='New invitation request: '+(d.name||'');d._template='table';d._captcha='false';try{const r=await fetch('https://formsubmit.co/ajax/meg@supercarcityclub.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)});const j=await r.json().catch(()=>({}));if(!r.ok||String(j.success)!=='true')throw 0;f.innerHTML='<div class="thanks"><h3>Welcome back.</h3><p>Thank you — your request is in. We\'ll be in touch when the doors open.</p></div>'}catch(_){b.disabled=false;b.textContent='Request an Invitation';alert('Sorry, that didn\'t go through. Please email contact@supercarcityclub.com.')}});
})();
