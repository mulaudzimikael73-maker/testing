const App = (() => {
const $ = id => document.getElementById(id);
const state = { sound:true, persona:localStorage.getItem("lizzyPersona") || "Agent Yelizaveta" };
const FORMS = { mail:"https://formspree.io/f/xoeadnoe", calendar:"https://formspree.io/f/mgawkljk" };

function showDesktop(){ $("landing").classList.remove("active"); $("desktop").classList.add("active"); }
function hideDesktop(){ $("desktop").classList.remove("active"); $("landing").classList.add("active"); }
$("enterButton").onclick=showDesktop; $("homeButton").onclick=hideDesktop;

setInterval(()=>{$("liveClock").textContent=new Date().toLocaleString("en-ZA",{weekday:"short",hour:"2-digit",minute:"2-digit"})},1000);
$("soundToggle").onclick=()=>{state.sound=!state.sound;$("soundToggle").textContent=state.sound?"🔊":"🔇"};

function createWindow(title,html){
  const layer=$("windowLayer"); layer.innerHTML="";
  const frag=$("windowTemplate").content.cloneNode(true);
  frag.querySelector(".windowTitle").textContent=title;
  frag.querySelector(".windowBody").innerHTML=html;
  layer.appendChild(frag); layer.classList.remove("hidden");
  const win=layer.querySelector(".appWindow");
  layer.querySelectorAll('[data-window-action="close"]').forEach(b=>b.onclick=()=>{layer.classList.add("hidden");layer.innerHTML=""});
  layer.querySelector('[data-window-action="minimize"]').onclick=()=>{layer.classList.add("hidden")};
  layer.querySelector('[data-window-action="maximize"]').onclick=()=>win.classList.toggle("maximized");
  return win;
}
$("windowLayer").addEventListener("click",e=>{if(e.target===$("windowLayer")){$("windowLayer").classList.add("hidden");$("windowLayer").innerHTML=""}});

const apps = {
archives(){createWindow("📁 Lizzy Archives",`<p class="eyebrow">THE LIZZY ARCHIVES</p><h3>Collected memories, photos and little things worth keeping.</h3><div class="cardGrid"><div class="glassCard"><span>📸</span><strong>Gallery</strong><small>Your photo archive lives here.</small></div><div class="glassCard"><span>🎥</span><strong>Videos</strong><small>Your video archive lives here.</small></div><div class="glassCard"><span>💗</span><strong>Favourite Moments</strong><small>Reserved for the best bits.</small></div></div>`)},
mission(){createWindow("🗂️ Mission Log",`<p class="eyebrow">CLASSIFIED</p><h3>Agent Yelizaveta Mission Log</h3><div class="glassCard"><strong>Mission #001</strong><p>Continue being suspiciously good at bowling while pretending this is normal behaviour.</p></div><div class="glassCard"><strong>Mission #002</strong><p>Occasionally be nice to Agent Mikhail. Optional but encouraged.</p></div>`)},
readme(){createWindow("💗 Read Me",`<h3>Congratulations...</h3><p>You found the little operating system somebody built specifically for you. That alone should tell you this was never going to be a normal website 😭❤️</p><p>Explore. Click things. Judge everything. Just remember Agent Mikhail can neither confirm nor deny how much time went into this.</p>`)},
openwhen(){createWindow("💌 Open When...",`<div class="cardGrid"><div class="glassCard"><span>❤️</span><strong>Open when you miss me</strong><small>Someone is probably missing you too.</small></div><div class="glassCard"><span>🌸</span><strong>Open when you need reminding</strong><small>Kind. Smart. Beautiful. Stunning. Amazing.</small></div><div class="glassCard"><span>😂</span><strong>Open when Mikhail annoys you</strong><small>This file may be accessed frequently.</small></div></div>`)},
lizzyquiz(){startSimpleQuiz("Lizzy Quiz",[
["What colour has administrator privileges in LizzyOS?",["Pink","Grey","Orange"],0],
["Where do banned nicknames belong?",["Recycle Bin","Mission Log","Desktop"],0],
["Who has the unfair bowling advantage?",["Agent Yelizaveta","Agent Mikhail","The pins"],0],
["What food has suspiciously high priority?",["Pasta","Plain toast","Lettuce"],0]
])},
heartcatch(){heartGame()},
mikhailquiz(){mikhailLevelSelect()},
mystery(){mysteryBox()},
calendar(){calendarApp()},
recycle(){recycleBin()},
personality(){personalityApp()},
mail(){mailApp()}
};
document.querySelectorAll(".desktopIcon").forEach(btn=>btn.onclick=()=>apps[btn.dataset.app]?.());

function startSimpleQuiz(title,questions){
 let i=0,score=0;
 const win=createWindow("🧠 "+title,`<div id="simpleQuiz"></div>`);
 function render(){
  const box=$("#simpleQuiz"); const q=questions[i];
  box.innerHTML=`<div class="quizMeta"><span>Question ${i+1}/${questions.length}</span><span>Score ${score}</span></div><h3>${q[0]}</h3><div class="answerGrid">${q[1].map((a,n)=>`<button data-a="${n}">${a}</button>`).join("")}</div><p class="status"></p>`;
  box.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{const ok=+b.dataset.a===q[2];if(ok)score++;box.querySelector(".status").textContent=ok?"Correct 💗":"LizzyOS is taking notes 🤨😂";box.querySelectorAll("button").forEach(x=>x.disabled=true);setTimeout(()=>{i++;if(i<questions.length)render();else box.innerHTML=`<div class="resultMedal">🏆</div><h2>${score}/${questions.length}</h2><p>${score===questions.length?"Perfect. Suspiciously perfect.":"Mission complete 💗"}</p>`},650)});
 }
 render();
}

function mikhailLevelSelect(){
 const win=createWindow("🧠 How Well Do You Know Mikhail?",`<p>Choose your clearance level 😏</p><div class="levelGrid"><button data-l="easy"><span>🌸</span>Easy</button><button data-l="medium"><span>👀</span>Medium</button><button data-l="hard"><span>🕵️</span>Agent Level</button></div>`);
 win.querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>runMikhailQuiz(b.dataset.l));
}
const mikhailBank={
 easy:[
 ["What does Mikhail usually go by when coaching?",["Coach Micky","Coach Scott","Coach 99"],0],
 ["Which sport has Mikhail coached a lot of?",["Soccer","Baseball","Ice hockey"],0],
 ["What is his LizzyOS agent surname?",["Petrov","Peralta","Hunt"],0],
 ["What does he call the kids he coaches?",["Champions","Cadets","Minions"],0]],
 medium:[
 ["Which fitness event has Mikhail planned for?",["HYROX","Wimbledon","Tour de France"],0],
 ["Which sport has he looked for casual teams to play?",["Basketball","Golf","Rugby"],0],
 ["What organisation appears on his coaching messages?",["The B-Active Group","Active HQ","B-Sport"],0],
 ["Which theme is heavily used in LizzyOS?",["Secret agents","Pirates","Space school"],0]],
 hard:[
 ["What is Mikhail's coaching nickname?",["Micky","Mikey P","M"],0],
 ["What is his full LizzyOS alias?",["Mikhail Petrov","Mikhail Peralta","Mikhail Hunt"],0],
 ["Which HYROX categories has he planned?",["Open Men's Doubles & Mixed Doubles","Singles & Relay","Pro Singles & Mixed Relay"],0],
 ["Which name belongs in LizzyOS rather than the bin?",["Agent Mikhail","The OPP","Jaden Smith"],0]]
};
function runMikhailQuiz(level){
 let i=0,score=0,qs=[...mikhailBank[level]].sort(()=>Math.random()-.5);
 const win=createWindow("🧠 Mikhail Quiz — "+level.toUpperCase(),`<div id="mq"></div>`);
 function render(){const q=qs[i],box=$("#mq");box.innerHTML=`<div class="quizMeta"><span>${i+1}/${qs.length}</span><span>${score} correct</span></div><h3>${q[0]}</h3><div class="answerGrid">${q[1].map((x,n)=>`<button data-n="${n}">${x}</button>`).join("")}</div><p class="status"></p>`;box.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>{if(+b.dataset.n===q[2]){score++;box.querySelector(".status").textContent="Correct 😌❤️"}else box.querySelector(".status").textContent="Incorrect clearance code 😂";box.querySelectorAll("button").forEach(x=>x.disabled=true);setTimeout(()=>{i++;i<qs.length?render():finish()},650)})}
 function finish(){const p=Math.round(score/qs.length*100);let r=p===100?["👑 Ultimate Mikhail Expert","One completely unreasonable bragging session."]:p>=75?["🍝 Pasta Emergency Pass","Valid for one dramatic pasta-related request."]:p>=50?["🎳 Bowling Rematch Ticket","One official request for a rematch."]:["📚 Mikhail Revision Pass","Permission to investigate Agent Mikhail further 😂"];$("#mq").innerHTML=`<div class="resultMedal">🏆</div><h2>${p}% Mikhail Knowledge</h2><div class="ticket"><small>LIZZYOS OFFICIAL REWARD</small><strong>${r[0]}</strong><p>${r[1]}</p><span>AUTHORIZED BY AGENT MIKHAIL ❤️</span></div>`}
 render();
}

function heartGame(){
 const win=createWindow("💖 Heart Catch",`<div class="quizMeta"><span>Score: <b id="heartScore">0</b></span><span>Time: <b id="heartTime">20</b>s</span></div><div id="heartArena" class="heartArena"></div><button id="startHeart" class="primaryButton">Start Game</button>`);
 let score=0,time=20,spawn,timer;
 $("#startHeart").onclick=()=>{score=0;time=20;$("#heartScore").textContent=0;$("#heartTime").textContent=20;$("#heartArena").innerHTML="";clearInterval(spawn);clearInterval(timer);spawn=setInterval(()=>{const b=document.createElement("button");b.className="catchHeart";b.textContent=Math.random()<.12?"✨":"💗";b.style.left=Math.random()*88+"%";b.style.top=Math.random()*78+"%";b.onclick=()=>{score+=b.textContent==="✨"?3:1;$("#heartScore").textContent=score;b.remove()};$("#heartArena").appendChild(b);setTimeout(()=>b.remove(),1200)},430);timer=setInterval(()=>{time--;$("#heartTime").textContent=time;if(time<=0){clearInterval(spawn);clearInterval(timer);$("#heartArena").innerHTML=`<h2>Mission Complete 💗</h2><p>${score} points</p>`}},1000)}
}

function mysteryBox(){
 const gifts=[
 ["💗 Compliment Drop","Today's system message: you're ridiculously pretty. This is not a bug."],
 ["🎟️ Argument Voucher","Redeemable for one argument where Mikhail admits you were right 😂"],
 ["🌸 Flower Delivery","Digital flowers: 🌸🌷🌹"],
 ["🍝 Pasta Alert","Today's mission: pasta should probably be involved somehow."],
 ["☕ Tiny Date Idea","Coffee + a walk + unnecessarily long conversation."],
 ["🕵️ Classified Compliment","Agent report: Subject Yelizaveta remains dangerously beautiful."],
 ["🎳 Bowling Pass","One rematch has been authorised. Trash talk is permitted."],
 ["💕 Mikhail Message","Somebody made you your own operating system 😭❤️"]];
 const d=new Date(),key=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;let n=0;for(const ch of key)n=(n*31+ch.charCodeAt(0))>>>0;const reward=gifts[n%gifts.length];const opened=localStorage.getItem("lizzyMysteryOpened")===key;
 const win=createWindow("🎁 Daily Mystery Box",`<div class="mysteryGift">${opened?"✨":"🎁"}</div><h3>One surprise every day.</h3><div id="mysteryReward" class="mysteryReward">${opened?`<strong>${reward[0]}</strong><p>${reward[1]}</p>`:"<p>LizzyOS has prepared today's classified delivery...</p>"}</div><button id="mysteryOpen" class="primaryButton" ${opened?"disabled":""}>${opened?"Come back tomorrow 💗":"Open Today's Box ✨"}</button>`);
 $("#mysteryOpen").onclick=()=>{localStorage.setItem("lizzyMysteryOpened",key);$("#mysteryReward").innerHTML=`<strong>${reward[0]}</strong><p>${reward[1]}</p>`;$("#mysteryOpen").disabled=true;$("#mysteryOpen").textContent="Come back tomorrow 💗"}
}

function recycleBin(){
 const names=["Windshields","Mabebeza","4 Eyes","Mother Of The Year","The OPP","The Bat (Blind as a Bat)","Specsy / Spexy","The Bully","Jaden Smith"];
 createWindow("🗑️ Recycle Bin",`<p>Things permanently rejected by LizzyOS 😂</p><div class="cardGrid">${names.map(n=>`<div class="glassCard"><span>🗑️</span><strong>${n}</strong><small>Deleted from LizzyOS</small></div>`).join("")}</div><p>⚠️ Restoration disabled.</p>`);
}

const scheduleMessages=[
"Alright Little Miss Attitude 😭❤️ You pick the day, you pick the time, and I’ll handle the rest.",
"Agent Yelizaveta, Mission Control requires your availability 🕵️❤️",
"Pick a day I get to steal you for a little while 🌸❤️",
"No pressure 😌❤️ You tell me when you’re free, and I’ll take care of everything else.",
"Mikhail has officially surrendered control of the calendar to you 😭📅"
];
function calendarApp(){
 const msg=scheduleMessages[Math.floor(Math.random()*scheduleMessages.length)];
 const win=createWindow("📁 Our Date",`<p>${msg}</p><div class="dateGrid"><label><span>📆 Date</span><input id="dateChoice" type="date"></label><label><span>🕐 Time</span><input id="timeChoice" type="time"></label></div><button id="sendDate" class="primaryButton">Send Mission Update ❤️</button><p id="dateStatus" class="status"></p>`);
 const d=new Date();$("#dateChoice").min=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
 $("#sendDate").onclick=async()=>{const date=$("#dateChoice").value,time=$("#timeChoice").value,status=$("#dateStatus");if(!date||!time){status.textContent="Choose both a date and time first 😭";return}status.textContent="Sending...";try{const r=await fetch(FORMS.calendar,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({subject:"❤️ Lizzy selected a date!",selected_date:date,selected_time:time,message:`Lizzy selected ${date} at ${time}`})});if(!r.ok)throw Error();status.textContent="Sent! Agent Mikhail has been notified ❤️";localStorage.setItem("lizzySelectedDate",date);localStorage.setItem("lizzySelectedTime",time)}catch(e){status.textContent="Couldn't send right now. Try again ❤️"}}
}

function personalityApp(){
 const win=createWindow("🎭 Personality",`<p>Who are we dealing with today? 😭</p><div class="personalityGrid">${["Lizzy","Little Miss Attitude","Agent Yelizaveta"].map(p=>`<button data-p="${p}"><span>${p==="Lizzy"?"💗":p==="Little Miss Attitude"?"😏":"🕵️"}</span>${p}</button>`).join("")}</div><p id="personaPreview" class="status"></p>`);
 win.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{state.persona=b.dataset.p;localStorage.setItem("lizzyPersona",state.persona);$("#currentPersona").textContent=(state.persona==="Lizzy"?"💗 ":state.persona==="Little Miss Attitude"?"😏 ":"🕵️ ")+state.persona;$("#personaPreview").textContent=`${state.persona} mode activated.`})
}

function mailApp(){
 const win=createWindow("💌 Lizzy Mail",`<form id="mailForm" class="mailForm"><label>From<input name="from" value="${state.persona}" readonly></label><label>Subject<input name="subject" placeholder="What are you thinking?"></label><label>Message<textarea name="message" placeholder="Type your message..."></textarea></label><button class="primaryButton">Send to Mikhail ❤️</button><p id="mailStatus" class="status"></p></form>`);
 $("#mailForm").onsubmit=async e=>{e.preventDefault();const status=$("#mailStatus"),fd=new FormData(e.target);status.textContent="Sending...";try{const r=await fetch(FORMS.mail,{method:"POST",headers:{"Accept":"application/json"},body:fd});if(!r.ok)throw Error();status.textContent="Sent to Mikhail 💌";e.target.reset()}catch(err){status.textContent="Couldn't send right now ❤️"}}
}

$("#currentPersona").textContent=(state.persona==="Lizzy"?"💗 ":state.persona==="Little Miss Attitude"?"😏 ":"🕵️ ")+state.persona;
return {};
})();