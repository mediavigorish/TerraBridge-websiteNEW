(function(){
'use strict';
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var WA='233535086004', EMAIL='info@terrabridgeagri.com';

/* ---------- nav ---------- */
var nav=$('#nav'), tog=$('#navToggle');
tog.addEventListener('click',function(){var o=nav.classList.toggle('open');tog.setAttribute('aria-expanded',String(o));tog.setAttribute('aria-label',o?'Close menu':'Open menu')});
$$('#nav a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');tog.setAttribute('aria-expanded','false')})});

/* ---------- toast ---------- */
var toastEl=$('#toast'), tt;
function toast(msg){toastEl.textContent=msg;toastEl.hidden=false;clearTimeout(tt);tt=setTimeout(function(){toastEl.hidden=true},2600)}

/* ---------- package state ---------- */
var pkg=[]; // list of equipment labels
function has(x){return pkg.indexOf(x)>-1}
function addItem(x){if(!has(x)){pkg.push(x);sync();toast('Added to your package: '+x)}}
function removeItem(x){pkg=pkg.filter(function(p){return p!==x});sync()}
function toggleItem(x){has(x)?removeItem(x):addItem(x)}

/* ---------- machine sizes: ONUA to OKATAKYIE ---------- */
var TRACTOR_FEATS=['4WD','PTO','3-point linkage','Hydraulics'];
var HP=[
 {nm:'ONUA',v:'14–15.5 HP',n:15,c:'HIROTA power tiller',k:'power tiller',f:['Walk-behind','Diesel engine','Plough · rotavator · ridger','Trailer'],
  d:'The smart first step. HIROTA walking tractors (RT and ZT series, 14 and 15.5 HP) plough, rotavate, ridge and pull a trailer: ideal for smallholdings, vegetable plots and paddy rice.'},
 {nm:'OBOUR',v:'25–35 HP',n:30,c:'Compact',k:'compact tractor',f:['PTO','3-point linkage','Hydraulics'],d:'Shown: TAVOL 354. A compact tractor for small farms, orchards and light haulage, with enough power for light tillage and spraying.'},
 {nm:'ODENDEN',v:'50 HP',n:50,c:'Utility',k:'utility tractor',d:'Shown: TAVOL 504. An all-rounder for mixed farms: ploughing, harrowing, planting and transport with mid-size implements.'},
 {nm:'OHENE',v:'70 HP',n:70,c:'General purpose',k:'general-purpose tractor',d:'Shown: TAVOL 704. A dependable workhorse for growing farms that need to cover more ground each day.'},
 {nm:'OBREMPONG',v:'90–100 HP',n:95,c:'Medium farm',k:'medium-farm tractor',d:'4WD power for medium farms and service providers, able to pull heavier ploughs and wider harrows.'},
 {nm:'OBRANE',v:'120 HP',n:120,c:'Heavy duty',k:'heavy-duty tractor',d:'Shown: TAVOL 1204. For heavy soils, large implements and long working days on commercial plots.'},
 {nm:'OSONO',v:'160 HP+',n:160,c:'Commercial',k:'commercial tractor',d:'Shown: TAVOL 1604. High-output tractors for commercial grain farms and contractors running wide equipment.'},
 {nm:'OKATAKYIE',v:'Up to 280 HP',n:280,c:'Large-scale',k:'large-scale tractor',d:'Shown: TAVOL 2804. Top-end power for large-scale estates and institutional mechanisation programmes.'}
];
var bandsEl=$('.hp-bands'), cur=4;
HP.forEach(function(h,i){
  var b=document.createElement('button');b.type='button';b.className='hp-band';b.setAttribute('role','tab');b.id='hpb'+i;
  b.innerHTML='<span class="nm">'+h.nm+'</span><b>'+h.v+'</b><span>'+h.c+'</span><i style="width:'+Math.max(6,Math.round(h.n/280*100))+'%"></i>';
  b.addEventListener('click',function(){showHp(i);reveal(b)});
  b.addEventListener('keydown',function(e){if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();var j=(i+(e.key==='ArrowRight'?1:-1)+HP.length)%HP.length;showHp(j);$('#hpb'+j).focus()}});
  bandsEl.appendChild(b);
});
/* after a tap, keep the chosen size and its photo in view */
function reveal(b){
  var strip=bandsEl; if(strip.scrollWidth>strip.clientWidth){strip.scrollTo({left:b.offsetLeft-strip.clientWidth/2+b.clientWidth/2,behavior:'smooth'})}
  var d=$('.hp-detail'), r=d.getBoundingClientRect();
  if(r.top<70||r.bottom>window.innerHeight){d.scrollIntoView({behavior:'smooth',block:r.height<window.innerHeight-80?'center':'start'})}
}
function hpLabel(h){return h.nm+' – '+h.k+', '+h.v}
function showHp(i){
  cur=i;var h=HP[i];
  $$('.hp-band').forEach(function(b,j){b.setAttribute('aria-selected',String(j===i));b.tabIndex=j===i?0:-1});
  var img=$('#hpImg');img.src='img/hp'+i+'.webp';img.alt=h.nm+': '+h.c+', '+h.v;
  $('#hpClass').textContent=h.c;$('#hpName').textContent=h.nm;$('#hpValue').textContent=h.v;$('#hpDesc').textContent=h.d;
  $('#hpFeats').innerHTML=(h.f||TRACTOR_FEATS).map(function(x){return '<li>'+x+'</li>'}).join('');
  $('#hpFill').style.width=Math.max(6,Math.round(h.n/280*100))+'%';
  updHpBtn();
}
function updHpBtn(){var l=hpLabel(HP[cur]);$('#hpAdd').textContent=has(l)?'Added to your package ✓':'Add '+HP[cur].nm+' to my package'}
$('#hpAdd').addEventListener('click',function(){toggleItem(hpLabel(HP[cur]))});
showHp(4);
/* preload all eight size photos so switching is instant */
window.addEventListener('load',function(){HP.forEach(function(h,i){var im=new Image();im.src='img/hp'+i+'.webp'})});

/* ---------- implements ---------- */
var CAT={land:'Land preparation',crop:'Planting & crop care',handling:'Handling & post-harvest'};
var IMP=[
 ['disc-ploughs','Disc ploughs','land','Primary tillage to open and turn the soil.'],
 ['disc-harrows','Disc harrows','land','Break clods and level the field after ploughing.'],
 ['rotary-tillers','Rotary tillers','land','Fine seedbed preparation in a single pass.'],
 ['cultivators','Cultivators','land','Tined cultivation and weed control between seasons.'],
 ['maize-planters','Maize planters','crop','Row planting with accurate seed spacing.'],
 ['seeders','Seeders & planters','crop','Drilling for grains and small seeds.'],
 ['sprayers','Crop sprayers','crop','Boom spraying for crop protection.'],
 ['spreaders','Fertiliser spreaders','crop','Even broadcasting of fertiliser.'],
 ['trailers','Trailers & tippers','handling','Move produce, inputs and materials.'],
 ['loaders','Front loaders & backhoes','handling','Lifting, loading and earthworks.'],
 ['balers','Mowers & balers','handling','Hay and fodder for livestock farms.'],
 ['shellers','Shellers & processing','handling','Shelling, threshing and processing after harvest.']
];
var catEl=$('#catalogue');
IMP.forEach(function(m){
  var a=document.createElement('article');a.className='item';a.dataset.cat=m[2];
  a.innerHTML='<img src="img/'+m[0]+'.webp" alt="'+m[1]+'" loading="lazy" width="700" height="450"><div class="item-body"><span class="item-cat">'+CAT[m[2]]+'</span><h3>'+m[1]+'</h3><p>'+m[3]+'</p><button class="add" type="button" aria-pressed="false" data-item="'+m[1]+'">Add</button></div>';
  catEl.appendChild(a);
});
catEl.addEventListener('click',function(e){var b=e.target.closest('.add');if(b)toggleItem(b.dataset.item)});
$$('.chip').forEach(function(c){c.addEventListener('click',function(){
  $$('.chip').forEach(function(x){x.classList.toggle('is-on',x===c)});
  $$('.item').forEach(function(it){it.hidden=c.dataset.filter!=='all'&&it.dataset.cat!==c.dataset.filter});
})});

/* ---------- builder ---------- */
$$('.pick .pill').forEach(function(p){p.setAttribute('aria-pressed','false');p.addEventListener('click',function(){p.setAttribute('aria-pressed',String(p.getAttribute('aria-pressed')!=='true'));build()})});
function picked(g){return $$('.pick[data-group="'+g+'"] .pill[aria-pressed="true"]').map(function(p){return p.textContent})}
$$('a[data-type]').forEach(function(a){a.addEventListener('click',function(){$('#fType').value=a.dataset.type;build()})});
$('#builder').addEventListener('input',build);
$('#builder').addEventListener('change',build);
$('#builder').addEventListener('submit',function(e){e.preventDefault()});

function sync(){
  var list=$('#selList');list.innerHTML='';
  pkg.forEach(function(x){var li=document.createElement('li');li.textContent=x;var b=document.createElement('button');b.type='button';b.setAttribute('aria-label','Remove '+x);b.textContent='×';b.addEventListener('click',function(){removeItem(x)});li.appendChild(b);list.appendChild(li)});
  $('#selEmpty').hidden=pkg.length>0;
  $('#selCount').textContent=pkg.length?pkg.length+(pkg.length===1?' item':' items'):'None yet';
  $$('[data-count]').forEach(function(c){c.textContent=pkg.length;c.hidden=!pkg.length});
  $$('.add').forEach(function(b){var on=has(b.dataset.item);b.setAttribute('aria-pressed',String(on));b.textContent=on?'Added':'Add'});
  updHpBtn();build();
}
function v(id){return ($(id).value||'').trim()}
function message(){
  var unit=($('input[name="unit"]:checked')||{}).value||'hectares';
  var L=['Hello TerraBridge, I would like a machinery quotation.',''];
  L.push('Name: '+(v('#fName')||'-'));
  L.push('Phone: '+(v('#fPhone')||'-'));
  if(v('#fLoc'))L.push('Location: '+v('#fLoc'));
  L.push('I am a: '+$('#fType').value);
  var c=picked('crops');if(c.length)L.push('We farm: '+c.join(', '));
  if(v('#fSize'))L.push('Farm size: '+v('#fSize')+' '+unit);
  var j=picked('jobs');if(j.length)L.push('Jobs to mechanise: '+j.join(', '));
  if(pkg.length){L.push('');L.push('Equipment of interest:');pkg.forEach(function(p){L.push('- '+p)})}
  if(v('#fNotes')){L.push('');L.push('Notes: '+v('#fNotes'))}
  return L.join('\n');
}
function build(){
  var m=message();
  $('#msgPreview').textContent=m;
  $('#sendWa').href='https://wa.me/'+WA+'?text='+encodeURIComponent(m);
  $('#sendMail').href='mailto:'+EMAIL+'?subject='+encodeURIComponent('Machinery quotation request'+(v('#fName')?' – '+v('#fName'):''))+'&body='+encodeURIComponent(m);
}
function valid(){
  var err=$('#formError');
  if(!v('#fName')||!v('#fPhone')){err.textContent='Please add your name and phone number so our team can reply.';err.hidden=false;(v('#fName')?$('#fPhone'):$('#fName')).focus();return false}
  err.hidden=true;return true;
}
['#sendWa','#sendMail'].forEach(function(id){$(id).addEventListener('click',function(e){build();if(!valid())e.preventDefault()})});

/* ---------- copy ---------- */
function copy(text,label){
  var done=function(){toast(label+' copied')};
  try{navigator.clipboard.writeText(text).then(done,function(){fallback(text);done()})}catch(e){fallback(text);done()}
}
function fallback(t){var ta=document.createElement('textarea');ta.value=t;ta.setAttribute('readonly','');ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(ta)}
$('#copyMsg').addEventListener('click',function(){build();if(valid())copy(message(),'Message')});
$$('.copy').forEach(function(b){b.addEventListener('click',function(){copy(b.dataset.copy,b.previousElementSibling.textContent)})});

/* ---------- videos: only one plays at a time ---------- */
$$('video').forEach(function(vd){vd.addEventListener('play',function(){$$('video').forEach(function(o){if(o!==vd&&!o.paused)o.pause()})})});

/* ---------- NAFAGRO countdown ---------- */
(function(){
  var start=new Date('2026-11-30T00:00:00Z'), end=new Date('2026-12-05T00:00:00Z'), now=new Date(), el=$('#fairCount');
  if(now>=end){$('#fair').hidden=true;return}
  if(now>=start){el.textContent='Happening now in Sunyani';return}
  var d=Math.ceil((start-now)/864e5);el.textContent=d+(d===1?' day':' days')+' to go';
})();

$('#year').textContent=new Date().getFullYear();
sync();
})();
