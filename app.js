const signals=[
 {category:'Tendencia',title:'La reserva de última hora crece los viernes',text:'Las búsquedas entre las 18:00 y las 20:00 aumentan en los barrios de ocio.',impact:'Impacto alto',tone:'green'},
 {category:'Local',title:'El tardeo gana espacio en la agenda',text:'Los grupos de 30–45 años adelantan el encuentro y alargan el consumo.',impact:'Oportunidad',tone:'gold'},
 {category:'Costes',title:'La energía vuelve a pedir atención',text:'Revisar horarios y potencia contratada puede proteger el margen este mes.',impact:'A vigilar',tone:''},
 {category:'Tendencia',title:'La carta corta transmite más confianza',text:'Los clientes valoran una propuesta clara, ágil y fácil de recordar.',impact:'En alza',tone:'green'},
 {category:'Local',title:'El barrio busca más opciones vegetarianas',text:'Las consultas de menú sin carne avanzan con fuerza durante la semana.',impact:'Oportunidad',tone:'gold'},
 {category:'Costes',title:'El café especial deja mejor margen',text:'Una carta simple con origen y método ayuda a elevar el ticket medio.',impact:'A revisar',tone:''}
];
const cards=document.querySelector('#signalCards'),count=document.querySelector('#resultCount'),toast=document.querySelector('#toast');
function render(filter='Todos'){const data=filter==='Todos'?signals:signals.filter(s=>s.category===filter);count.textContent=`${data.length} señales`;cards.innerHTML=data.map(s=>`<article class="card"><div class="card-top"><span class="category">${s.category}</span><span class="signal ${s.tone}"></span></div><h3>${s.title}</h3><p>${s.text}</p><footer><span>${s.impact}</span><span>↗ Leer señal</span></footer></article>`).join('')}
render();document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');button.classList.add('active');render(button.dataset.filter)}));
function notify(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)}
document.querySelector('#saveTip').addEventListener('click',e=>{e.currentTarget.classList.toggle('saved');e.currentTarget.textContent=e.currentTarget.classList.contains('saved')?'♥':'♡';notify(e.currentTarget.classList.contains('saved')?'Recomendación guardada':'Recomendación eliminada')});
document.querySelector('#themeButton').addEventListener('click',()=>{document.body.classList.toggle('dark');notify('Tema actualizado')});
document.querySelector('#shareButton').addEventListener('click',async()=>{const share={title:'Radar Hostelería',text:'Las señales que importan para tu negocio.',url:location.href};if(navigator.share){try{await navigator.share(share)}catch{}}else{await navigator.clipboard.writeText(location.href);notify('Enlace copiado')}});
let deferredPrompt;window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredPrompt=event;document.querySelector('#installButton').hidden=false});document.querySelector('#installButton').addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.querySelector('#installButton').hidden=true});
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
