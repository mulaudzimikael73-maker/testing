// =============================================
// LIZZY-DATE
// Version 2.0
// =============================================

// Scenes
const loading = document.getElementById("loading");
const opening = document.getElementById("opening");
const storybook = document.getElementById("storybook");
const quiz = document.getElementById("quiz");
const tvSection = document.getElementById("tvSection");
const story = document.getElementById("story");
const proposal = document.getElementById("proposal");
const celebration = document.getElementById("celebration");
const secretEnding = document.getElementById("secretEnding");

// Progress Bar
const progressFill = document.getElementById("progressFill");

// Buttons
const startStory = document.getElementById("startStory");
const nextChapter = document.getElementById("nextChapter");
const continueStory = document.getElementById("continueStory");
const proposalButton = document.getElementById("proposalButton");
const secretButton = document.getElementById("secretButton");

let progress = 0;

// =============================================
// EMAILJS
// =============================================

function sendYesEmail() {

    fetch("https://formspree.io/f/mzdnaree", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },

        body: JSON.stringify({

            message: "🎉 Lizzy clicked YES! ❤️"

        })

    })
    .then(() => {

        console.log("✅ Formspree notification sent!");

    })
    .catch((error) => {

        console.error("❌ Formspree Error:", error);

    });

}
// =============================================
// Loading Screen
// =============================================

window.onload = () => {

    setTimeout(() => {

        loading.style.display = "none";

        opening.classList.remove("hidden");

    },3000);

};

// =============================================
// Progress
// =============================================

function updateProgress(){

    progress += 14;

    if(progress > 100){

        progress = 100;

    }

    progressFill.style.width = progress + "%";

}

// =============================================
// Scene Helper
// =============================================

function hideAll(){

    opening.classList.add("hidden");
    storybook.classList.add("hidden");
    quiz.classList.add("hidden");
    tvSection.classList.add("hidden");
    story.classList.add("hidden");
    proposal.classList.add("hidden");
    celebration.classList.add("hidden");
    secretEnding.classList.add("hidden");

}

// =============================================
// Opening
// =============================================

startStory.addEventListener("click",()=>{

    hideAll();

    storybook.classList.remove("hidden");

    updateProgress();

});

// =============================================
// Storybook
// =============================================

nextChapter.addEventListener("click",()=>{

    hideAll();

    quiz.classList.remove("hidden");

    updateProgress();

});

// =============================================
// Quiz Questions
// =============================================

const questions = [

{

question:"What's obviously the best colour? 🌸",

answers:[

"Pink 💗",

"Light Pink 🌸",

"Every Shade of Pink 💖"

]

},

{

question:"Choose dinner 🍝",

answers:[

"Pasta",

"More Pasta",

"Unlimited Pasta"

]

},

{

question:"Choose a TV world 📺",

answers:[

"The Office",

"Brooklyn Nine-Nine",

"Gilmore Girls",

"High School Musical"

]

}

];

let currentQuestion = 0;

const questionTitle = document.getElementById("questionTitle");
const answers = document.getElementById("answers");

function loadQuestion(){

    questionTitle.innerHTML =
    questions[currentQuestion].question;

    answers.innerHTML="";

    questions[currentQuestion].answers.forEach(answer=>{

        const button =
        document.createElement("button");

        button.innerHTML=answer;

        button.onclick = () => {

    playSelectionSound(answer);

    setTimeout(() => {

        nextQuestion();

    }, 1200);

};

        answers.appendChild(button);

    });

}

loadQuestion();
function playSelectionSound(answer){

    [officeAudio, brooklynAudio, gilmoreAudio, hsmAudio].forEach(audio => {
        if (!audio) return;
        audio.pause();
        audio.currentTime = 0;
    });

    function playClip(audio, startAt, durationMs) {
        if (!audio) return;

        audio.currentTime = startAt;
        audio.play().catch(() => {});

        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, durationMs);
    }

    switch(answer){

        case "The Office":
            // Uploaded clip is 4.27s: "That's what she said!" plus the few seconds after.
            playClip(officeAudio, 0, 4270);
            break;

        case "Brooklyn Nine-Nine":
            // One "Nine-Nine!" only.
            playClip(brooklynAudio, 0, 1500);
            break;

        case "Gilmore Girls":
            // Starts just before "I just got hit by a deer!" and keeps the short exchange.
            playClip(gilmoreAudio, 22.0, 10500);
            break;

        case "High School Musical":
            // Kept unchanged for now: the uploaded wildcats.mp3 contains
            // the "What team? Wildcats!" chant, not "Get'cha head in the game".
            hsmAudio.play();
            break;

    }

}

function nextQuestion(){

    currentQuestion++;

    if(currentQuestion>=questions.length){

        hideAll();

        tvSection.classList.remove("hidden");

        updateProgress();

        return;

    }

    loadQuestion();

}
// =============================================
// Continue Story
// =============================================

continueStory.addEventListener("click", () => {

    hideAll();

    story.classList.remove("hidden");

    updateProgress();

});

// =============================================
// Proposal
// =============================================

proposalButton.addEventListener("click", () => {

    hideAll();

    proposal.classList.remove("hidden");

    updateProgress();

});

// =============================================
// Proposal Buttons
// =============================================

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const funnyMessage = document.getElementById("funnyMessage");

const noMessages = [

    "Nice try 😂",

    "That button seems a little shy...",

    "Little Miss Attitude strikes again 😏",

    "The No button has entered witness protection.",

    "Brooklyn Nine-Nine says... cool cool cool... but maybe press Yes.",

    "Even Michael Scott thinks Yes is the better option.",

    "Pasta is waiting on the other button 🍝"

];

let attempts = 0;

function moveButton(){

    attempts++;

    const x = Math.random()*300-150;

    const y = Math.random()*220-110;

    noButton.style.transform =
    `translate(${x}px, ${y}px)`;

    funnyMessage.innerHTML =
    noMessages[attempts % noMessages.length];

}

noButton.addEventListener("mouseover", moveButton);

noButton.addEventListener("click", moveButton);


// ========================================
// RIDDLE CARDS
// ========================================

document.querySelectorAll(".riddleCard").forEach(card => {

    card.addEventListener("click", () => {

        const answer = card.querySelector(".riddleAnswer");

        answer.innerHTML = card.dataset.answer;

        answer.classList.remove("hidden");

        card.style.cursor = "default";

    });

});

// =============================================
// Sound Toggle
// =============================================

const music =
document.getElementById("backgroundMusic");

const soundButton =
document.getElementById("soundButton");

let playing=false;

soundButton.addEventListener("click",()=>{

    if(!music){

        return;

    }

    if(playing){

        music.pause();

        soundButton.innerHTML="🔈";

    }

    else{

        music.play();

        soundButton.innerHTML="🔊";

    }

    playing=!playing;

});
// =============================================
// ACHIEVEMENTS
// =============================================

const achievements = [];

function unlockAchievement(name){

    if(achievements.includes(name)) return;

    achievements.push(name);

    console.log("Achievement Unlocked:", name);

    showAchievement(name);

}

function showAchievement(name){

    const popup = document.createElement("div");

    popup.className = "achievementPopup";

    popup.innerHTML =
    `🏆 Achievement Unlocked<br><strong>${name}</strong>`;

    document.body.appendChild(popup);

    setTimeout(()=>{

        popup.classList.add("show");

    },100);

    setTimeout(()=>{

        popup.classList.remove("show");

        setTimeout(()=>{

            popup.remove();

        },500);

    },3000);

}

// =============================================
// UNLOCKS
// =============================================

startStory.addEventListener("click",()=>{

    unlockAchievement("The Adventure Begins");

});

yesButton.addEventListener("click", () => {

    sendYesEmail();

    hideAll();

    celebration.classList.remove("hidden");

    updateProgress();

    if (typeof confetti === "function") {

        confetti({
            particleCount: 250,
            spread: 180,
            origin: { y: 0.6 }
        });

    }

    unlockAchievement("Date Accepted ❤️");

});
secretButton.addEventListener("click",()=>{

    unlockAchievement("Secret Ending 🌸");

});

// =============================================
// SECRET KEYWORDS
// =============================================

let typed = "";

document.addEventListener("keydown",(e)=>{

    typed += e.key.toLowerCase();

    if(typed.length > 30){

        typed = typed.slice(-30);

    }

    if(typed.includes("pink")){

        unlockAchievement("Pink Expert 💗");

        document.body.style.filter =
        "saturate(1.15)";

    }

    if(typed.includes("pasta")){

        unlockAchievement("Pasta Lover 🍝");

        alert("🍝 Pasta rain activated... okay maybe not yet 😄");

    }

    if(typed.includes("nine")){

        unlockAchievement("Nine-Nine 🚔");

    }

    if(typed.includes("office")){

        unlockAchievement("Dunder Fan 📄");

    }

    if(typed.includes("gilmore")){

        unlockAchievement("Stars Hollow ☕");

    }

});

// =============================================
// END
// =============================================

console.log("Lizzy-Date Loaded Successfully ❤️");

// =====================================================
// macOS SECRET DESKTOP
// =====================================================

// Desktop Elements

const desktopArea = document.getElementById("desktopArea");
const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminalText");

const folderIcon = document.getElementById("folderIcon");
const readMeIcon = document.getElementById("readMeIcon");
const missionIcon = document.getElementById("missionIcon");
const openWhenIcon = document.getElementById("openWhenIcon");

const finderWindow = document.getElementById("finderWindow");
const readMeWindow = document.getElementById("readMeWindow");
const missionWindow = document.getElementById("missionWindow");
const openWhenWindow = document.getElementById("openWhenWindow");

const closeReadMe = document.getElementById("closeReadMe");
const closeMission = document.getElementById("closeMission");
const closeOpenWhen = document.getElementById("closeOpenWhen");

const letterList = document.getElementById("letterList");
const letterContent = document.getElementById("letterContent");
const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");
const backLetters = document.getElementById("backLetters");
const viewer = document.getElementById("viewer");
const viewerImage = document.getElementById("viewerImage");
const viewerVideo = document.getElementById("viewerVideo");

const viewerClose = document.getElementById("viewerClose");
const viewerPrev = document.getElementById("viewerPrev");
const viewerNext = document.getElementById("viewerNext");

const closeFinder = document.querySelector(".closeBtn");

const finalMessage = document.getElementById("finalMessage");

// ========================================
// SECRET BUTTON
// ========================================

secretButton.addEventListener("click", () => {

    hideAll();

    secretEnding.classList.remove("hidden");

    progressFill.style.width = "100%";

    startTerminal();

});

// ========================================
// TERMINAL
// ========================================

const bootLines = [

"Booting LizzyOS 1.0...",

"Loading Memories...",

"Checking Cherry Blossoms... OK",

"Loading Pasta Database... OK",

"Loading Pink Theme... OK",

"Decrypting Hidden Files...",

"Access Granted ✔",

"Opening Desktop..."

];

function startTerminal(){

    terminal.classList.remove("hidden");

    desktopArea.classList.add("hidden");

    terminalText.innerHTML="";

    let i=0;

    function nextLine(){

        if(i<bootLines.length){

            terminalText.innerHTML+=bootLines[i]+"<br>";

            terminal.scrollTop=terminal.scrollHeight;

            i++;

            setTimeout(nextLine,700);

        }

        else{

            setTimeout(()=>{

                terminal.style.display="none";

                desktopArea.classList.remove("hidden");

            },1200);

        }

    }

    nextLine();

}

// ========================================
// THE LIZZY ARCHIVES
// ========================================

const archiveItems = [

    "She is short in a cute way",

    "She is going to do HYROX",

    "She is actually very funny, even though I can't tell her",

    "She is bossy in a cute way",

    "She has an amazing smile",

    "She might want to be Zulu",

    "She's into nerdy Mikael",

    "I could smoke her in a race",

    "She is my favourite bully",

    "She's a real gangster",

    "She claims she can sing",

    "She is a Baddie"

];

function loadArchive(){

    const archiveList = document.getElementById("archiveList");

    archiveList.innerHTML = "";

    archiveItems.forEach(item => {

        const entry = document.createElement("div");

        entry.className = "likeItem";

        entry.innerHTML = item;

        archiveList.appendChild(entry);

    });

}

loadArchive();
// ========================================
// FOLDER
// ========================================

folderIcon.addEventListener("click",()=>{

    finderWindow.classList.remove("hidden");

    unlockAchievement("Opened Lizzy Folder 📁");

});

// ========================================
// READ ME
// ========================================

readMeIcon?.addEventListener("click", () => {

    readMeWindow?.classList.remove("hidden");

    readMeIntro?.classList.remove("hidden");
    readMeContent?.classList.add("hidden");

});

closeReadMe?.addEventListener("click", () => {

    readMeWindow?.classList.add("hidden");

});

const openMemoriesButton =
document.getElementById("openMemoriesButton");

const readMeIntro =
document.getElementById("readMeIntro");

const readMeContent =
document.getElementById("readMeContent");

openMemoriesButton?.addEventListener("click", () => {

    readMeIntro?.classList.add("hidden");
    readMeContent?.classList.remove("hidden");

});

// ========================================
// MISSION LOG
// ========================================

missionIcon?.addEventListener("click", () => {

    missionWindow?.classList.remove("hidden");

    unlockAchievement("Opened Mission Log 🗂️");

});

closeMission?.addEventListener("click", () => {

    missionWindow?.classList.add("hidden");

});

// ========================================
// OPEN WHEN...
// ========================================

openWhenIcon?.addEventListener("click", () => {

    openWhenWindow?.classList.remove("hidden");

    letterList?.classList.remove("hidden");
    letterContent?.classList.add("hidden");

    unlockAchievement("Opened Open When Folder 💌");

});

closeOpenWhen?.addEventListener("click", () => {

    openWhenWindow?.classList.add("hidden");

});

backLetters?.addEventListener("click", () => {

    letterContent?.classList.add("hidden");
    letterList?.classList.remove("hidden");

});

const openWhenLetters = {

    miss: {

        title: "❤️ Open when you miss me",

        body: `Hey Agent Yelizaveta,<br><br>

If you're reading this because you miss me, just know that I'm probably thinking about you too.<br><br>

Life gets busy sometimes, but that never changes how much I enjoy talking to you, laughing with you, and making memories with you.<br><br>

In <em>The Office</em>, even the most ordinary workdays become special because of the people sharing them. You have a way of making ordinary moments feel like the ones worth remembering, and I hope I get to keep being part of yours.<br><br>

Until our next mission...<br><br>

Your favourite Rookie Operative,<br>

<strong>Agent Mikhail Petrov ❤️</strong>`

    },

    amazing: {

        title: "🌸 Open when you need reminding how amazing you are",

        body: `Agent Yelizaveta,<br><br>

In case today made you forget, you are incredibly kind, genuinely smart, unbelievably beautiful, absolutely stunning, and completely amazing.<br><br>

You care about people in a way that makes them feel seen, and that kindness is one of the most special things about you.<br><br>

Early in <em>Gilmore Girls</em>, Rory faces the intimidating first days at Chilton, but Lorelai keeps showing up for her and reminding her that she belongs there.<br><br>

So consider this my reminder to you: you belong in every room you walk into, and you are capable of far more than you sometimes give yourself credit for.<br><br>

Never let one difficult day convince you that you are anything less than extraordinary.<br><br>

Whenever you forget, come back here. I'll happily remind you again.<br><br>

<strong>— Agent Mikhail Petrov ❤️</strong>`

    }

};

function showOpenWhenLetter(letterKey) {

    const letter = openWhenLetters[letterKey];

    if (!letter || !letterList || !letterContent) {

        return;

    }

    letterTitle.innerHTML = letter.title;
    letterText.innerHTML = letter.body;

    letterList.classList.add("hidden");
    letterContent.classList.remove("hidden");

}

document.querySelectorAll("[data-letter]").forEach((button) => {

    button.addEventListener("click", () => {

        showOpenWhenLetter(button.dataset.letter);

    });

});

window.openLetter = function (numberOrKey) {

    if (
        numberOrKey === 1 ||
        numberOrKey === "1" ||
        numberOrKey === "miss"
    ) {

        showOpenWhenLetter("miss");

        return;

    }

    if (
        numberOrKey === 2 ||
        numberOrKey === "2" ||
        numberOrKey === "amazing"
    ) {

        showOpenWhenLetter("amazing");

    }

};

// ========================================
// CLOSE FINDER
// ========================================

closeFinder?.addEventListener("click", () => {

    finderWindow?.classList.add("hidden");

});

// ========================================
// SECRET MESSAGE
// ========================================

// ========================================
// MEDIA VIEWER
// ========================================

const archiveMediaItems = [

    ...document.querySelectorAll(".memoryGrid img"),

    ...document.querySelectorAll(".videoGrid video source")

].map((element) => {

    if (element.tagName === "IMG") {

        return {

            type: "image",

            url: element.getAttribute("src")

        };

    }

    return {

        type: "video",

        url: element.getAttribute("src")

    };

});

let readMeMemories = [];

let activeViewerItems = archiveMediaItems;

let currentMediaIndex = 0;

function openViewer(index, items = activeViewerItems) {

    if (!Array.isArray(items) || items.length === 0) {

        return;

    }

    activeViewerItems = items;

    currentMediaIndex =
        (index + activeViewerItems.length) %
        activeViewerItems.length;

    const item = activeViewerItems[currentMediaIndex];

    viewerImage.classList.add("hidden");
    viewerVideo.classList.add("hidden");

    viewerVideo.pause();
    viewerVideo.removeAttribute("src");
    viewerVideo.innerHTML = "";

    if (item.type === "image") {

        viewerImage.src = item.url || item.src;

        viewerImage.classList.remove("hidden");

    } else if (item.type === "video") {

        viewerVideo.src = item.url || item.src;

        viewerVideo.classList.remove("hidden");

        viewerVideo.load();

    }

    viewer.classList.remove("hidden");

}

// Archive photos

document
.querySelectorAll(".memoryGrid a")
.forEach((link, index) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        openViewer(index, archiveMediaItems);

    });

});

// Archive videos

const archivePhotoCount =
document.querySelectorAll(".memoryGrid img").length;

document
.querySelectorAll(".videoGrid video")
.forEach((video, index) => {

    video.addEventListener("click", () => {

        openViewer(

            archivePhotoCount + index,

            archiveMediaItems

        );

    });

});

// Viewer controls

viewerClose?.addEventListener("click", () => {

    viewer?.classList.add("hidden");

    viewerVideo?.pause();

});

viewerNext?.addEventListener("click", () => {

    openViewer(

        currentMediaIndex + 1,

        activeViewerItems

    );

});

viewerPrev?.addEventListener("click", () => {

    openViewer(

        currentMediaIndex - 1,

        activeViewerItems

    );

});

// ========================================
// READ ME LOADER
// ========================================

async function loadReadMe() {

    const container =
    document.getElementById("readMeContent");

    if (!container) {

        return;

    }

    try {

        const response = await fetch(

            "data/readme.json?v=" + Date.now(),

            {

                cache: "no-store"

            }

        );

        if (!response.ok) {

            throw new Error(

                `Could not load readme.json (${response.status})`

            );

        }

        const memories = await response.json();

        if (!Array.isArray(memories)) {

            throw new Error(

                "readme.json must contain an array."

            );

        }

        readMeMemories = memories;

        container.innerHTML = "";

        memories.forEach((memory, index) => {

            const item =
            document.createElement("div");

            item.className = "readme-item";

            if (memory.type === "image") {

                item.innerHTML = `

                    <img

                        src="${memory.url}"

                        class="readme-photo"

                        loading="lazy"

                        alt="Read Me memory">

                `;

                item.addEventListener("click", () => {

                    openViewer(

                        index,

                        readMeMemories

                    );

                });

            } else if (memory.type === "video") {

                item.innerHTML = `

                    <video

                        controls

                        playsinline

                        preload="metadata"

                        class="readme-video">

                        <source src="${memory.url}">

                        Your browser could not play this video.

                    </video>

                `;

                item.addEventListener("dblclick", () => {

                    openViewer(

                        index,

                        readMeMemories

                    );

                });

            }

            container.appendChild(item);

        });

        if (memories.length === 0) {

            container.innerHTML =

            "<p>No memories have been added yet. ❤️</p>";

        }

    } catch (error) {

        container.innerHTML =

        "<p>Unable to load memories.</p>";

        console.error(

            "Read Me error:",

            error

        );

    }

}

loadReadMe();

// ========================================
// KEYBOARD CONTROLS
// ========================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        viewer?.classList.add("hidden");

        viewerVideo?.pause();

        finderWindow?.classList.add("hidden");

        readMeWindow?.classList.add("hidden");

        missionWindow?.classList.add("hidden");

        openWhenWindow?.classList.add("hidden");

    }

    if (

        event.key === "ArrowRight" &&

        viewer &&

        !viewer.classList.contains("hidden")

    ) {

        openViewer(

            currentMediaIndex + 1,

            activeViewerItems

        );

    }

    if (

        event.key === "ArrowLeft" &&

        viewer &&

        !viewer.classList.contains("hidden")

    ) {

        openViewer(

            currentMediaIndex - 1,

            activeViewerItems

        );

    }

});

// =====================================================
// LIZZYOS — INTERACTIVE DATE SCHEDULER
// =====================================================
(() => {
    const $ = id => document.getElementById(id);
    const FORMSPREE_URL = "https://formspree.io/f/mzdnaree";

    const formatDate = value => {
        if (!value) return "";
        const d = new Date(value + "T12:00:00");
        return new Intl.DateTimeFormat("en-ZA", {weekday:"long", day:"numeric", month:"long", year:"numeric"}).format(d);
    };
    const formatTime = value => {
        if (!value) return "";
        const [h,m] = value.split(":").map(Number);
        const d = new Date(); d.setHours(h,m,0,0);
        return new Intl.DateTimeFormat("en-ZA", {hour:"2-digit", minute:"2-digit"}).format(d);
    };

    const now = new Date();
    const today = now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");
    ["lizzyDateChoice","desktopDateChoice"].forEach(id => { if ($(id)) $(id).min = today; });

    function preview(dateId,timeId,previewId){
        const date=$(dateId)?.value, time=$(timeId)?.value, box=$(previewId);
        if(!box) return;
        if(!date && !time){ box.innerHTML="<span>💗</span><p>Pick a date and time to create the mission.</p>"; return; }
        if(!date){ box.innerHTML=`<span>📆</span><p>Time selected: <strong>${formatTime(time)}</strong><br>Now pick the day.</p>`; return; }
        if(!time){ box.innerHTML=`<span>🕐</span><p><strong>${formatDate(date)}</strong><br>Now choose a time.</p>`; return; }
        box.innerHTML=`<span>🎳</span><p><strong>${formatDate(date)}</strong><br>at <strong>${formatTime(time)}</strong><br><small>Mission: Operation Strike Her Heart ❤️</small></p>`;
    }

    ["lizzyDateChoice","lizzyTimeChoice"].forEach(id => $(id)?.addEventListener("change",()=>preview("lizzyDateChoice","lizzyTimeChoice","dateChoicePreview")));
    ["desktopDateChoice","desktopTimeChoice"].forEach(id => $(id)?.addEventListener("change",()=>preview("desktopDateChoice","desktopTimeChoice","desktopDatePreview")));

    async function sendSelection(date,time,statusId,confirmedId,confirmedTextId){
        const status=$(statusId);
        if(!date || !time){ if(status) status.textContent="Choose both a date and a time first 😭"; return; }
        const prettyDate=formatDate(date), prettyTime=formatTime(time);
        if(status) status.textContent="Sending mission details to Mikhail... 📡";
        try{
            const r=await fetch(FORMSPREE_URL,{
                method:"POST",
                headers:{"Content-Type":"application/json","Accept":"application/json"},
                body:JSON.stringify({
                    subject:"❤️ Lizzy selected a date!",
                    message:`📅 LIZZYOS DATE SELECTED\n\nDate: ${prettyDate}\nTime: ${prettyTime}\n\nMission: Operation Strike Her Heart ❤️`,
                    selected_date:prettyDate,
                    selected_time:prettyTime,
                    raw_date:date,
                    raw_time:time
                })
            });
            if(!r.ok) throw new Error("Formspree "+r.status);
            localStorage.setItem("lizzySelectedDate",date);
            localStorage.setItem("lizzySelectedTime",time);
            if(status) status.textContent="Sent! Agent Mikhail has been notified ❤️";
            if(confirmedId && $(confirmedId)) $(confirmedId).classList.remove("hidden");
            if(confirmedTextId && $(confirmedTextId)) $(confirmedTextId).textContent=`${prettyDate} • ${prettyTime}`;
            renderSavedMission();
            if(typeof unlockAchievement==="function") unlockAchievement("Mission Date Locked In 📅❤️");
            if(typeof confetti==="function") confetti({particleCount:90,spread:90,origin:{y:.72}});
        }catch(e){
            console.error("Date scheduler:",e);
            if(status) status.textContent="Couldn't send the date right now. Please try again ❤️";
        }
    }

    $("confirmLizzyDate")?.addEventListener("click", async ()=>{
        const b=$("confirmLizzyDate"); if(b)b.disabled=true;
        await sendSelection($("lizzyDateChoice")?.value,$("lizzyTimeChoice")?.value,"dateSchedulerStatus","confirmedDateCard","confirmedDateText");
        if(b)b.disabled=false;
    });

    $("confirmDesktopDate")?.addEventListener("click", async ()=>{
        const b=$("confirmDesktopDate"); if(b)b.disabled=true;
        await sendSelection($("desktopDateChoice")?.value,$("desktopTimeChoice")?.value,"desktopDateStatus");
        if(b)b.disabled=false;
    });

    $("calendarIcon")?.addEventListener("click",()=>{
        const d=localStorage.getItem("lizzySelectedDate"), t=localStorage.getItem("lizzySelectedTime");
        if(d && $("desktopDateChoice")) $("desktopDateChoice").value=d;
        if(t && $("desktopTimeChoice")) $("desktopTimeChoice").value=t;
        preview("desktopDateChoice","desktopTimeChoice","desktopDatePreview");
        renderSavedMission();
        $("calendarWindow")?.classList.remove("hidden");
    });
    ["closeCalendar","calendarRedClose"].forEach(id=>$(id)?.addEventListener("click",()=>$("calendarWindow")?.classList.add("hidden")));

    function renderSavedMission(){
        const box=$("savedMissionDate"); if(!box)return;
        const d=localStorage.getItem("lizzySelectedDate"), t=localStorage.getItem("lizzySelectedTime");
        if(!d || !t){ box.innerHTML='<p class="memoryMessage">No mission date has been locked in yet.</p>'; return; }
        box.innerHTML=`<div class="savedMissionCard"><span>📌</span><div><small>CURRENT MISSION DATE</small><strong>${formatDate(d)}</strong><p>${formatTime(t)} ❤️</p></div></div>`;
    }

    const sd=localStorage.getItem("lizzySelectedDate"), st=localStorage.getItem("lizzySelectedTime");
    if(sd && $("lizzyDateChoice")) $("lizzyDateChoice").value=sd;
    if(st && $("lizzyTimeChoice")) $("lizzyTimeChoice").value=st;
    if(sd || st) preview("lizzyDateChoice","lizzyTimeChoice","dateChoicePreview");
    if(sd && st){
        $("confirmedDateCard")?.classList.remove("hidden");
        if($("confirmedDateText")) $("confirmedDateText").textContent=`${formatDate(sd)} • ${formatTime(st)}`;
    }
    renderSavedMission();

    const readMe=$("readMeWindow");
    $("readMeRedClose")?.addEventListener("click",()=>readMe?.classList.add("hidden"));
    $("readMeYellowMin")?.addEventListener("click",()=>readMe?.classList.toggle("readMeMinimised"));
    $("readMeGreenMax")?.addEventListener("click",()=>{
        if(!readMe)return;
        readMe.classList.remove("readMeMinimised");
        readMe.classList.toggle("readMeExpanded");
    });
})();


// =====================================================
// LIZZYOS — RANDOM CALENDAR MESSAGES
// A different message is selected whenever the calendar opens.
// =====================================================
(() => {
    const messages = [
        "Alright Little Miss Attitude 😭❤️ You pick the day, you pick the time, and I’ll handle the rest.",
        "Agent Yelizaveta, Mission Control requires your availability 🕵️❤️ Pick a date and time to continue the mission.",
        "Pick a day I get to steal you for a little while 🌸❤️ The when is completely up to you.",
        "No pressure 😌❤️ You tell me when you’re free, and I’ll take care of everything else.",
        "Okay, your turn 😂❤️ Date. Time. That’s all Agent Mikhail needs.",
        "Mikhail has officially surrendered control of the calendar to you 😭📅 Choose wisely.",
        "⚠️ Mission pending: awaiting availability from one very difficult Agent Yelizaveta. 😂❤️",
        "Choose wisely… I’m expecting a very important date with a very pretty girl 👀❤️",
        "The calendar has been opened. There’s no escaping now 😂📅❤️",
        "Little Miss Attitude has been granted full scheduling privileges. Please use them responsibly 😏❤️",
        "Your schedule, your choice 💗 Pick whatever day works best for you and I’ll make the rest happen.",
        "Mission Control is standing by 🫡❤️ All we need now is your preferred date and time."
    ];

    let lastMessage = sessionStorage.getItem("lizzyLastCalendarMessage") || "";

    function randomMessage() {
        let options = messages.filter(message => message !== lastMessage);
        if (!options.length) options = messages;
        const chosen = options[Math.floor(Math.random() * options.length)];
        lastMessage = chosen;
        sessionStorage.setItem("lizzyLastCalendarMessage", chosen);
        return chosen;
    }

    function updateCalendarMessage(targetId) {
        const target = document.getElementById(targetId);
        if (target) target.textContent = randomMessage();
    }

    // The celebration scheduler gets a random message when it becomes relevant.
    const yesButton = document.getElementById("yesButton");
    yesButton?.addEventListener("click", () => {
        setTimeout(() => updateCalendarMessage("schedulerRandomMessage"), 100);
    });

    // Give it a message immediately as a fallback if the celebration is already visible.
    updateCalendarMessage("schedulerRandomMessage");

    // Desktop "Our Date" app gets a fresh random message every time it opens.
    const calendarIcon = document.getElementById("calendarIcon");
    calendarIcon?.addEventListener("click", () => {
        updateCalendarMessage("desktopSchedulerRandomMessage");
    });

    // Also refresh when returning to the tab after a while.
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            const calendarWindow = document.getElementById("calendarWindow");
            if (calendarWindow && !calendarWindow.classList.contains("hidden")) {
                updateCalendarMessage("desktopSchedulerRandomMessage");
            }
        }
    });
})();


// =====================================================
// LIZZYOS — CALENDAR-ONLY CLEAN START
// Date selection is available ONLY inside the "Our Date" desktop folder.
// =====================================================
(() => {
    // Remove any legacy post-YES scheduler if an older HTML fragment is ever cached/injected.
    document.getElementById("dateScheduler")?.remove();

    // Start the real calendar blank on this release.
    // This intentionally clears the developer/test selection once.
    const CLEAN_VERSION = "calendar-clean-v1";
    if (localStorage.getItem("lizzyCalendarCleanVersion") !== CLEAN_VERSION) {
        localStorage.removeItem("lizzySelectedDate");
        localStorage.removeItem("lizzySelectedTime");
        localStorage.setItem("lizzyCalendarCleanVersion", CLEAN_VERSION);
    }

    const clearCalendarInputs = () => {
        const date = document.getElementById("desktopDateChoice");
        const time = document.getElementById("desktopTimeChoice");
        if (!localStorage.getItem("lizzySelectedDate") && date) date.value = "";
        if (!localStorage.getItem("lizzySelectedTime") && time) time.value = "";
    };

    clearCalendarInputs();

    // Ensure first opening is blank after the clean reset.
    document.getElementById("calendarIcon")?.addEventListener("click", () => {
        setTimeout(clearCalendarInputs, 0);
    });
})();
