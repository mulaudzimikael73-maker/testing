(() => {
const $=id=>document.getElementById(id);
const scenes=["loading","opening","storybook","quiz","tvSection","story","proposal","celebration","secretEnding"];
let progress=0, musicOn=false;
const FORM_YES="https://formspree.io/f/mzdnaree";
const FORM_DATE="https://formspree.io/f/mgawkljk";

function showScene(id){
 scenes.forEach(s=>$(s).classList.add("hidden"));
 $(id).classList.remove("hidden");
}
function updateProgress(amount=14){progress=Math.min(100,progress+amount);$("progressFill").style.width=progress+"%";}
window.addEventListener("load",()=>setTimeout(()=>showScene("opening"),2800));
$("startStory").onclick=()=>{showScene("storybook");updateProgress();achievement("The Adventure Begins")};
$("nextChapter").onclick=()=>{showScene("quiz");updateProgress();loadStoryQuestion()};
$("continueStory").onclick=()=>{showScene("story");updateProgress()};
$("proposalButton").onclick=()=>{showScene("proposal");updateProgress()};

const storyQuestions=[
 {q:"What's obviously the best colour? 🌸",a:["Pink 💗","Light Pink 🌸","Every Shade of Pink 💖"]},
 {q:"Choose dinner 🍝",a:["Pasta","More Pasta","Unlimited Pasta"]},
 {q:"Choose a TV world 📺",a:["The Office","Brooklyn Nine-Nine","Gilmore Girls","High School Musical"]}
];
let sq=0;
function loadStoryQuestion(){
 const q=storyQuestions[sq]; $("questionTitle").textContent=q.q;$("answers").innerHTML=q.a.map(x=>`<button data-story-answer="${x}">${x}</button>`).join("");
 $("answers").querySelectorAll("button").forEach(b=>b.onclick=()=>{playSelectionSound(b.dataset.storyAnswer);b.disabled=true;setTimeout(()=>{sq++;if(sq>=storyQuestions.length){showScene("tvSection");updateProgress()}else loadStoryQuestion()},1200)});
}

function stopAudio(a){if(!a)return;a.pause();try{a.currentTime=0}catch{}}
let clipTimer;
function timedClip(audio,start,duration){
 clearTimeout(clipTimer);["officeAudio","brooklynAudio","gilmoreAudio","hsmAudio"].forEach(id=>stopAudio($(id)));
 audio.currentTime=start;audio.play().catch(()=>{});clipTimer=setTimeout(()=>audio.pause(),duration*1000);
}
function playSelectionSound(answer){
 if(answer==="The Office")timedClip($("officeAudio"),0,4.27);
 if(answer==="Brooklyn Nine-Nine")timedClip($("brooklynAudio"),0,1.5);
 if(answer==="Gilmore Girls")timedClip($("gilmoreAudio"),22,10.5);
 if(answer==="High School Musical")timedClip($("hsmAudio"),0,3.0);
}

const noMessages=["Nice try 😂","That button seems a little shy...","Little Miss Attitude strikes again 😏","The No button has entered witness protection.","Brooklyn Nine-Nine says... cool cool cool... but maybe press Yes.","Even Michael Scott thinks Yes is the better option.","Pasta is waiting on the other button 🍝"];
let noAttempts=0;
function moveNo(){noAttempts++;$("noButton").style.transform=`translate(${Math.random()*300-150}px,${Math.random()*220-110}px)`;$("funnyMessage").textContent=noMessages[noAttempts%noMessages.length]}
$("noButton").onmouseenter=moveNo;$("noButton").onclick=moveNo;
$("yesButton").onclick=async()=>{fetch(FORM_YES,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({message:"🎉 Lizzy clicked YES! ❤️"})}).catch(()=>{});showScene("celebration");updateProgress();if(window.confetti)confetti({particleCount:230,spread:170,origin:{y:.6}});achievement("Date Accepted ❤️")};
document.querySelectorAll(".riddleCard").forEach(card=>card.onclick=()=>{const a=card.querySelector(".riddleAnswer");a.textContent=card.dataset.answer;a.classList.remove("hidden")});
$("secretButton").onclick=()=>{showScene("secretEnding");$("progressFill").style.width="100%";achievement("Secret Ending 🌸");startTerminal()};

$("soundButton").onclick=()=>{const m=$("backgroundMusic");musicOn?m.pause():m.play().catch(()=>{});musicOn=!musicOn;$("soundButton").textContent=musicOn?"🔊":"🔈"};

function achievement(name){const p=document.createElement("div");p.className="achievement";p.innerHTML=`🏆 Achievement Unlocked<br><strong>${name}</strong>`;document.body.appendChild(p);setTimeout(()=>p.classList.add("show"),50);setTimeout(()=>{p.classList.remove("show");setTimeout(()=>p.remove(),350)},2800)}

const boot=["Booting LizzyOS 1.0...","Loading Memories...","Checking Cherry Blossoms... OK","Loading Pasta Database... OK","Loading Pink Theme... OK","Decrypting Hidden Files...","Access Granted ✔","Opening Desktop..."];
function startTerminal(){
 $("terminal").style.display="block";$("desktopArea").classList.add("hidden");$("terminalText").innerHTML="";let i=0;
 const next=()=>{if(i<boot.length){$("terminalText").innerHTML+=boot[i++]+"<br>";setTimeout(next,360)}else setTimeout(()=>{$("terminal").style.display="none";$("desktopArea").classList.remove("hidden")},600)};next();
}

function openApp(title,html,onOpen){
 const layer=$("appOverlay");layer.innerHTML="";const frag=$("appWindowTemplate").content.cloneNode(true);frag.querySelector(".windowTitle").textContent=title;frag.querySelector(".windowScroll").innerHTML=html;layer.appendChild(frag);layer.classList.remove("hidden");const win=layer.querySelector(".desktopWindow");
 layer.querySelectorAll('[data-action="close"]').forEach(b=>b.onclick=()=>{layer.classList.add("hidden");layer.innerHTML=""});
 layer.querySelector('[data-action="min"]').onclick=()=>layer.classList.add("hidden");
 layer.querySelector('[data-action="max"]').onclick=()=>win.classList.toggle("max");
 if(onOpen)onOpen(win);return win;
}
$("appOverlay").onclick=e=>{if(e.target===$("appOverlay")){$("appOverlay").classList.add("hidden");$("appOverlay").innerHTML=""}};

const archiveItems=["She is short in a cute way","She is going to do HYROX","She is actually very funny, even though I can't tell her","She is bossy in a cute way","She has an amazing smile","She might want to be Zulu","She's into nerdy Mikhail","I could smoke her in a race","She is my favourite bully","She's a real gangster","She claims she can sing","She is a Baddie"];
const banned=["Windshields","Mabebeza","4 Eyes","Mother Of The Year","The OPP","The Bat (Blind as a Bat)","Specsy / Spexy","The Bully","Jaden Smith"];
const apps={
 archives:()=>openApp("📁 The Lizzy Archives",`<p>Files Stored 💗</p><div class="cardGrid">${archiveItems.map(x=>`<div class="card"><span>💗</span><strong>${x}</strong></div>`).join("")}</div><p class="memoryMessage">❤️ My version of the folder in her brain that stores all the info about me.</p>`),
 mission:()=>openApp("🗂️ Mission Log",`<div class="card"><strong>MISSION #001</strong><p>Continue being suspiciously good at bowling while pretending this is normal behaviour.</p></div><div class="card"><strong>MISSION #002</strong><p>Occasionally be nice to Agent Mikhail. Optional but encouraged.</p></div>`),
 readme:()=>openApp("❤️ Read Me",`<h3>Congratulations...</h3><p>You found the hidden folder.<br><br>These aren't just photos and videos. They're little moments that made me smile.<br><br>Thank you for being part of them. ❤️</p>`),
 openwhen:()=>openApp("💌 Open When...",`<div class="cardGrid"><div class="card"><span>❤️</span><strong>Open when you miss me</strong><p>If you're reading this because you miss me, just know that I'm probably thinking about you too. Until our next mission... ❤️</p></div><div class="card"><span>🌸</span><strong>Open when you need reminding how amazing you are</strong><p>You are kind, smart, beautiful, stunning and amazing. Whenever you forget, come back here.</p></div></div>`),
 recycle:()=>openApp("🗑️ Recycle Bin",`<p>Things permanently rejected by LizzyOS 😂</p><div class="cardGrid">${banned.map(x=>`<div class="card"><span>🗑️</span><strong>${x}</strong><small>Deleted from LizzyOS</small></div>`).join("")}</div><p>⚠️ Restoration disabled.</p>`),
 lizzyquiz:()=>runQuiz("🧠 Lizzy Quiz",[
  ["What colour has administrator privileges in LizzyOS?",["Pink","Grey","Orange"],0],
  ["Where do banned nicknames belong?",["Recycle Bin","Mission Log","Desktop"],0],
  ["Who has the unfair bowling advantage?",["Agent Yelizaveta","Agent Mikhail","The pins"],0],
  ["What food has suspiciously high priority?",["Pasta","Plain toast","Lettuce"],0]
 ]),
 heartcatch:()=>heartCatch(),
 mikhailquiz:()=>mikhailLevels(),
 mystery:()=>dailyMystery(),
 calendar:()=>calendarApp()
};
document.querySelectorAll(".desktopIcon").forEach(b=>b.onclick=()=>apps[b.dataset.app]?.());

function runQuiz(title,qs){
 let i=0,score=0;openApp(title,`<div id="genericQuiz"></div>`,()=>render());
 function render(){const q=qs[i],box=$("#genericQuiz");box.innerHTML=`<div class="quizMeta"><span>${i+1}/${qs.length}</span><span>Score ${score}</span></div><h3>${q[0]}</h3><div class="answerGrid">${q[1].map((a,n)=>`<button data-n="${n}">${a}</button>`).join("")}</div><p class="status"></p>`;box.querySelectorAll("button").forEach(b=>b.onclick=()=>{if(+b.dataset.n===q[2])score++;box.querySelector(".status").textContent=+b.dataset.n===q[2]?"Correct 💗":"LizzyOS is taking notes 🤨😂";box.querySelectorAll("button").forEach(x=>x.disabled=true);setTimeout(()=>{i++;if(i<qs.length)render();else box.innerHTML=`<div class="resultMedal">🏆</div><h2>${score}/${qs.length}</h2><p>${score===qs.length?"Perfect. Suspiciously perfect.":"Mission Complete 💗"}</p>`},550)})}
}
const mBank={
 easy:[["What name does Mikhail usually go by when coaching?",["Coach Micky","Coach Scott","Coach 99"],0],["Which sport has Mikhail coached a lot of?",["Soccer","Baseball","Ice hockey"],0],["What is Mikhail's LizzyOS agent surname?",["Petrov","Peralta","Hunt"],0],["What does he call the kids he coaches?",["Champions","Cadets","Minions"],0]],
 medium:[["Which fitness event has Mikhail planned to take part in?",["HYROX","Wimbledon","Tour de France"],0],["Which sport has Mikhail looked for casual teams to play?",["Basketball","Golf","Rugby"],0],["What organisation appears on his coaching messages?",["The B-Active Group","Active HQ","B-Sport"],0],["Which theme is heavily used in LizzyOS?",["Secret agents","Pirates","Space school"],0]],
 hard:[["What is Mikhail's coaching nickname?",["Micky","Mikey P","M"],0],["What is his full LizzyOS agent alias?",["Mikhail Petrov","Mikhail Peralta","Mikhail Hunt"],0],["Which HYROX categories has he planned?",["Open Men's Doubles & Mixed Doubles","Singles & Relay","Pro Singles & Mixed Relay"],0],["Which name belongs in LizzyOS rather than the bin?",["Agent Mikhail","The OPP","Jaden Smith"],0]]
};
function mikhailLevels(){openApp("🧠 How Well Do You Know Mikhail?",`<p>Choose your clearance level 😏</p><div class="levelGrid"><button data-level="easy"><span>🌸</span>Easy</button><button data-level="medium"><span>👀</span>Medium</button><button data-level="hard"><span>🕵️</span>Agent Level</button></div>`,win=>win.querySelectorAll("[data-level]").forEach(b=>b.onclick=()=>mikhailQuiz(b.dataset.level)))}
function mikhailQuiz(level){
 let i=0,score=0,qs=[...mBank[level]].sort(()=>Math.random()-.5);
 openApp(`🧠 Mikhail Quiz — ${level.toUpperCase()}`,`<div id="mq"></div>`,()=>render());
 function render(){const q=qs[i],box=$("#mq");box.innerHTML=`<div class="quizMeta"><span>${i+1}/${qs.length}</span><span>${score} correct</span></div><h3>${q[0]}</h3><div class="answerGrid">${q[1].map((a,n)=>`<button data-n="${n}">${a}</button>`).join("")}</div><p class="status"></p>`;box.querySelectorAll("button").forEach(b=>b.onclick=()=>{if(+b.dataset.n===q[2])score++;box.querySelector(".status").textContent=+b.dataset.n===q[2]?"Correct 😌❤️":"Incorrect clearance code 😂";box.querySelectorAll("button").forEach(x=>x.disabled=true);setTimeout(()=>{i++;i<qs.length?render():finish()},550)})}
 function finish(){const p=Math.round(score/qs.length*100),r=p===100?["👑 Ultimate Mikhail Expert","One completely unreasonable bragging session."]:p>=75?["🍝 Pasta Emergency Pass","Valid for one dramatic pasta-related request."]:p>=50?["🎳 Bowling Rematch Ticket","One official request for a rematch."]:["📚 Mikhail Revision Pass","Permission to investigate Agent Mikhail further 😂"];$("#mq").innerHTML=`<div class="resultMedal">🏆</div><h2>${p}% Mikhail Knowledge</h2><div class="ticket"><small>LIZZYOS OFFICIAL REWARD</small><strong>${r[0]}</strong><p>${r[1]}</p><span>AUTHORIZED BY AGENT MIKHAIL ❤️</span></div>`}
}
function heartCatch(){let score=0,time=20,sp,timer;openApp("💗 Heart Catch",`<div class="quizMeta"><span>Score <b id="heartScore">0</b></span><span>Time <b id="heartTime">20</b>s</span></div><div id="heartArena" class="heartArena"></div><button id="heartStart">Start Game</button>`,()=>{$("heartStart").onclick=()=>{score=0;time=20;$("heartScore").textContent=0;$("heartTime").textContent=20;$("heartArena").innerHTML="";clearInterval(sp);clearInterval(timer);sp=setInterval(()=>{const b=document.createElement("button");b.className="catchHeart";b.textContent=Math.random()<.12?"✨":"💗";b.style.left=Math.random()*88+"%";b.style.top=Math.random()*78+"%";b.onclick=()=>{score+=b.textContent==="✨"?3:1;$("heartScore").textContent=score;b.remove()};$("heartArena").appendChild(b);setTimeout(()=>b.remove(),1100)},430);timer=setInterval(()=>{time--;$("heartTime").textContent=time;if(time<=0){clearInterval(sp);clearInterval(timer);$("heartArena").innerHTML=`<h2>Mission Complete 💗</h2><p>${score} points</p>`}},1000)}})}
const gifts=[["💗 Compliment Drop","Today's system message: you're ridiculously pretty. This is not a bug."],["🎟️ Argument Voucher","Redeemable for one argument where Mikhail admits you were right 😂"],["🌸 Flower Delivery","Digital flowers: 🌸🌷🌹"],["🍝 Pasta Alert","Today's mission: pasta should probably be involved somehow."],["☕ Tiny Date Idea","Coffee + a walk + unnecessarily long conversation."],["🕵️ Classified Compliment","Agent report: Subject Yelizaveta remains dangerously beautiful."],["🎳 Bowling Pass","One rematch has been authorised. Trash talk is permitted."],["💕 Mikhail Message","Somebody made you your own operating system 😭❤️"]];
function dayKey(){const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
function dailyMystery(){let n=0;for(const ch of dayKey())n=(n*31+ch.charCodeAt(0))>>>0;const reward=gifts[n%gifts.length],opened=localStorage.getItem("lizzyMysteryOpened")===dayKey();openApp("🎁 Daily Mystery Box",`<div class="mysteryGift">${opened?"✨":"🎁"}</div><h3>One surprise every day.</h3><div id="mysteryReward" class="mysteryReward">${opened?`<strong>${reward[0]}</strong><p>${reward[1]}</p>`:"<p>LizzyOS has prepared today's classified delivery...</p>"}</div><button id="openGift" ${opened?"disabled":""}>${opened?"Come back tomorrow 💗":"Open Today's Box ✨"}</button>`,()=>{$("openGift").onclick=()=>{localStorage.setItem("lizzyMysteryOpened",dayKey());$("mysteryReward").innerHTML=`<strong>${reward[0]}</strong><p>${reward[1]}</p>`;$("openGift").disabled=true;$("openGift").textContent="Come back tomorrow 💗";if(window.confetti)confetti({particleCount:80,spread:80,origin:{y:.72}})}})}
const scheduleMessages=["Alright Little Miss Attitude 😭❤️ You pick the day, you pick the time, and I’ll handle the rest.","Agent Yelizaveta, Mission Control requires your availability 🕵️❤️","Pick a day I get to steal you for a little while 🌸❤️","No pressure 😌❤️ You tell me when you’re free, and I’ll take care of everything else.","Mikhail has officially surrendered control of the calendar to you 😭📅"];
function calendarApp(){const msg=scheduleMessages[Math.floor(Math.random()*scheduleMessages.length)];openApp("📁 Our Date",`<p>${msg}</p><div class="dateGrid"><label><span>📆 Date</span><input id="datePick" type="date"></label><label><span>🕐 Time</span><input id="timePick" type="time"></label></div><button id="sendDate">Send Mission Update ❤️</button><p id="dateStatus" class="status"></p>`,()=>{const d=new Date();$("datePick").min=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;$("sendDate").onclick=async()=>{const date=$("datePick").value,time=$("timePick").value,status=$("dateStatus");if(!date||!time){status.textContent="Choose both a date and time first 😭";return}status.textContent="Sending...";try{const r=await fetch(FORM_DATE,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({subject:"❤️ Lizzy selected a date!",selected_date:date,selected_time:time,message:`Lizzy selected ${date} at ${time}`})});if(!r.ok)throw Error();status.textContent="Sent! Agent Mikhail has been notified ❤️"}catch{status.textContent="Couldn't send right now. Try again ❤️"}}})}
})();