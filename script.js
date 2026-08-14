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

    fetch("https://formspree.io/f/mrpzkqez", {

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



// YES BUTTON PRIVACY NOTE: No Formspree/network notification is attached to yesButton.
// The Yes choice stays local to the LizzyOS experience.
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

openWhenLetters.hug = {
    title: "🫂 Open When You Need a Hug",
    body: `
        <p><strong>Come here, Lizzy 🫂❤️</strong></p>
        <p>I don't know what's happened or why you need a hug right now, but since I can't physically give you one through a computer screen, this will have to do for now.</p>
        <p>Consider yourself officially hugged.</p>
        <p>The long kind too — not one of those awkward two-second hugs. 😂</p>
        <p>Whatever is going on, I hope this makes things feel even just a tiny bit better.</p>
        <p>And if this digital hug isn't enough...</p>
        <p><strong>You know where to find the real one. ❤️</strong></p>
        <p class="letterSignature">— Mikael a.k.a Mr Perfect</p>
    `
};

openWhenLetters.laugh = {
    title: "😂 Open When You Need to Laugh",
    body: `
        <p><strong>🚨 LIZZYOS EMERGENCY COMEDY PROTOCOL</strong></p>
        <p>Apparently you require immediate assistance.</p>
        <p>First of all...</p>
        <p>Why did you come to <strong>ME</strong> for comedy? 😭</p>
        <p>That's a lot of pressure.</p>
        <p>So here's your emergency procedure:</p>
        <p><strong>Step 1:</strong> Think about something embarrassing I've done.</p>
        <p><strong>Step 2:</strong> Remember that there are probably several options.</p>
        <p><strong>Step 3:</strong> Laugh.</p>
        <p>If that hasn't worked, please switch yourself off and back on again.</p>
        <p>Still nothing?</p>
        <p>Fine.</p>
    `
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
// LIZZYOS EXTRA — QUIZ + HEART CATCH GAME
// =====================================================
(() => {
    const $ = id => document.getElementById(id);

    // ---------- Windows ----------
    function openWindow(id){ $(id)?.classList.remove("hidden"); }
    function closeWindow(id){ $(id)?.classList.add("hidden"); }

    $("funQuizIcon")?.addEventListener("click", () => {
        openWindow("funQuizWindow");
        startFunQuiz();
        if (typeof unlockAchievement === "function") unlockAchievement("Lizzy Quiz Activated 🧠");
    });
    $("closeFunQuiz")?.addEventListener("click", () => closeWindow("funQuizWindow"));
    $("funQuizRedClose")?.addEventListener("click", () => closeWindow("funQuizWindow"));

    $("heartGameIcon")?.addEventListener("click", () => {
        openWindow("heartCatchWindow");
        updateHeartBest();
        if (typeof unlockAchievement === "function") unlockAchievement("Operation: Catch Her Heart 💗");
    });
    $("closeHeartCatch")?.addEventListener("click", () => closeWindow("heartCatchWindow"));
    $("heartGameRedClose")?.addEventListener("click", () => closeWindow("heartCatchWindow"));

    // ---------- Lizzy Quiz ----------
    const lizzyQuizQuestions = [
        {
            q: "What colour has administrator privileges in LizzyOS? 💗",
            a: ["Blue", "Pink — obviously", "Corporate grey"],
            correct: 1,
            right: "Correct. Pink has full system access. 🌸",
            wrong: "Security alert: this answer was suspiciously un-Lizzy."
        },
        {
            q: "Who has the unfair advantage on the first bowling mission? 🎳",
            a: ["Agent Mikhail", "Agent Yelizaveta", "The bowling ball"],
            correct: 1,
            right: "Correct 😭 Intelligence reports say Agent Yelizaveta is dangerously experienced.",
            wrong: "Nice try. Agent Mikhail has approximately one mission of experience 😂"
        },
        {
            q: "Where should banned nicknames be sent?",
            a: ["The Recycle Bin 🗑️", "The Mission Log", "Pinned to the desktop"],
            correct: 0,
            right: "Correct. Delete immediately. Empty Bin optional 😂",
            wrong: "Absolutely not. LizzyOS recommends immediate deletion."
        },
        {
            q: "What food has suspiciously high priority in this system? 🍝",
            a: ["Pasta", "Plain toast", "A single lettuce leaf"],
            correct: 0,
            right: "Correct. Pasta database verified. 🍝",
            wrong: "LizzyOS refuses to accept this answer."
        },
        {
            q: "What is Agent Mikhail's most important mission objective?",
            a: ["Win every argument", "Make Agent Yelizaveta smile ❤️", "Become a professional bowler overnight"],
            correct: 1,
            right: "Mission intelligence confirms this answer. ❤️",
            wrong: "Incorrect. Please review Mission Log #001."
        }
    ];

    let fqIndex = 0;
    let fqScore = 0;

    function startFunQuiz(){
        fqIndex = 0;
        fqScore = 0;
        $("funQuizScore").textContent = "0";
        $("funQuizTotal").textContent = lizzyQuizQuestions.length;
        $("restartFunQuiz").classList.add("hidden");
        renderFunQuiz();
    }

    function renderFunQuiz(){
        const q = lizzyQuizQuestions[fqIndex];
        if (!q) {
            $("funQuizQuestion").innerHTML =
                fqScore === lizzyQuizQuestions.length
                ? `🏆 Perfect score! ${fqScore}/${lizzyQuizQuestions.length}`
                : `Mission complete: ${fqScore}/${lizzyQuizQuestions.length}`;
            $("funQuizAnswers").innerHTML = "";
            $("funQuizFeedback").innerHTML =
                fqScore === lizzyQuizQuestions.length
                ? "Okay... either you know LizzyOS extremely well or you have classified information. 😏❤️"
                : fqScore >= 3
                ? "Approved. Your Lizzy knowledge clearance remains active. 💗"
                : "Agent Mikhail is requesting a formal investigation into this score 😂";
            $("restartFunQuiz").classList.remove("hidden");
            if (fqScore === lizzyQuizQuestions.length && typeof unlockAchievement === "function") {
                unlockAchievement("Certified Lizzy Expert 💗");
            }
            return;
        }

        $("funQuizQuestion").textContent = q.q;
        $("funQuizFeedback").textContent = "";
        $("funQuizAnswers").innerHTML = q.a.map((answer, i) =>
            `<button class="funQuizAnswer" data-fq-answer="${i}">${answer}</button>`
        ).join("");

        document.querySelectorAll("[data-fq-answer]").forEach(btn => {
            btn.addEventListener("click", () => {
                const chosen = Number(btn.dataset.fqAnswer);
                const correct = chosen === q.correct;
                if (correct) {
                    fqScore++;
                    $("funQuizScore").textContent = fqScore;
                }
                $("funQuizFeedback").textContent = correct ? q.right : q.wrong;
                document.querySelectorAll("[data-fq-answer]").forEach(b => b.disabled = true);
                btn.classList.add(correct ? "answerCorrect" : "answerWrong");
                setTimeout(() => {
                    fqIndex++;
                    renderFunQuiz();
                }, 1200);
            });
        });
    }

    $("restartFunQuiz")?.addEventListener("click", startFunQuiz);

    // ---------- Heart Catch ----------
    let heartScore = 0;
    let heartTime = 20;
    let spawnTimer = null;
    let countdownTimer = null;
    let gameRunning = false;

    function updateHeartBest(){
        if ($("heartCatchBest")) {
            $("heartCatchBest").textContent = localStorage.getItem("lizzyHeartBest") || "0";
        }
    }

    function spawnHeart(){
        const arena = $("heartCatchArena");
        if (!arena || !gameRunning) return;

        const heart = document.createElement("button");
        heart.className = "catchableHeart";
        const rare = Math.random() < 0.12;
        heart.textContent = rare ? "✨" : "💗";
        heart.dataset.points = rare ? "3" : "1";
        heart.style.left = (4 + Math.random() * 84) + "%";
        heart.style.top = (5 + Math.random() * 75) + "%";

        heart.addEventListener("click", (e) => {
            e.stopPropagation();
            heartScore += Number(heart.dataset.points);
            $("heartCatchScore").textContent = heartScore;
            heart.classList.add("caughtHeart");
            setTimeout(() => heart.remove(), 120);
        });

        arena.appendChild(heart);
        setTimeout(() => heart.remove(), 1200);
    }

    function finishHeartGame(){
        gameRunning = false;
        clearInterval(spawnTimer);
        clearInterval(countdownTimer);

        const oldBest = Number(localStorage.getItem("lizzyHeartBest") || 0);
        const best = Math.max(oldBest, heartScore);
        localStorage.setItem("lizzyHeartBest", best);
        updateHeartBest();

        $("heartCatchArena").innerHTML = `
            <div class="gameStartMessage">
                <strong>Mission Complete 💗</strong><br>
                You caught ${heartScore} points.<br>
                ${heartScore >= 30 ? "Okay Agent Yelizaveta... overachiever 😏" :
                  heartScore >= 18 ? "Excellent heart-catching skills ❤️" :
                  "Agent Mikhail has requested a rematch 😂"}
            </div>`;
        $("startHeartCatch").textContent = "Play Again";

        if (heartScore >= 30 && typeof unlockAchievement === "function") {
            unlockAchievement("Heart Thief 💗");
        }
    }

    $("startHeartCatch")?.addEventListener("click", () => {
        clearInterval(spawnTimer);
        clearInterval(countdownTimer);
        heartScore = 0;
        heartTime = 20;
        gameRunning = true;

        $("heartCatchScore").textContent = "0";
        $("heartCatchTime").textContent = "20";
        $("heartCatchArena").innerHTML = "";
        $("startHeartCatch").textContent = "Mission Active...";

        spawnHeart();
        spawnTimer = setInterval(spawnHeart, 430);
        countdownTimer = setInterval(() => {
            heartTime--;
            $("heartCatchTime").textContent = heartTime;
            if (heartTime <= 0) finishHeartGame();
        }, 1000);
    });

    updateHeartBest();
})();


// =====================================================
// OUR DATE FOLDER — RANDOM MESSAGES + CLEAN FIRST RUN
// =====================================================
(() => {
 const $=id=>document.getElementById(id);
 const URL="https://formspree.io/f/mrpzkqez";
 const msgs=[
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
 let last=sessionStorage.getItem("lizzyLastCalendarMessage")||"";
 function randomMsg(){let a=msgs.filter(x=>x!==last);let x=a[Math.floor(Math.random()*a.length)];last=x;sessionStorage.setItem("lizzyLastCalendarMessage",x);return x}
 function fmtD(v){if(!v)return"";return new Intl.DateTimeFormat("en-ZA",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date(v+"T12:00:00"))}
 function fmtT(v){if(!v)return"";let [h,m]=v.split(":").map(Number),d=new Date();d.setHours(h,m,0,0);return new Intl.DateTimeFormat("en-ZA",{hour:"2-digit",minute:"2-digit"}).format(d)}
 function preview(){let d=$("desktopDateChoice")?.value,t=$("desktopTimeChoice")?.value,b=$("desktopDatePreview");if(!b)return;if(!d&&!t)b.innerHTML="<span>💗</span><p>Select the next mission date.</p>";else if(!d)b.innerHTML=`<span>📆</span><p>Time: <strong>${fmtT(t)}</strong><br>Now choose the day.</p>`;else if(!t)b.innerHTML=`<span>🕐</span><p><strong>${fmtD(d)}</strong><br>Now choose a time.</p>`;else b.innerHTML=`<span>🎳</span><p><strong>${fmtD(d)}</strong><br>at <strong>${fmtT(t)}</strong><br><small>Mission: Operation Strike Her Heart ❤️</small></p>`}
 function saved(){let b=$("savedMissionDate"),d=localStorage.getItem("lizzySelectedDate"),t=localStorage.getItem("lizzySelectedTime");if(!b)return;b.innerHTML=d&&t?`<div class="savedMissionCard"><span>📌</span><div><small>CURRENT MISSION DATE</small><strong>${fmtD(d)}</strong><p>${fmtT(t)} ❤️</p></div></div>`:'<p class="memoryMessage">No mission date has been locked in yet.</p>'}
 const now=new Date(),today=now.getFullYear()+"-"+String(now.getMonth()+1).padStart(2,"0")+"-"+String(now.getDate()).padStart(2,"0");if($("desktopDateChoice"))$("desktopDateChoice").min=today;
 // Clear developer/test date exactly once for this final rebuild.
 const CLEAN="final-chain-calendar-clean-v1";
 if(localStorage.getItem("lizzyCalendarCleanVersion")!==CLEAN){localStorage.removeItem("lizzySelectedDate");localStorage.removeItem("lizzySelectedTime");localStorage.setItem("lizzyCalendarCleanVersion",CLEAN)}
 $("calendarIcon")?.addEventListener("click",()=>{let d=localStorage.getItem("lizzySelectedDate"),t=localStorage.getItem("lizzySelectedTime");if($("desktopDateChoice"))$("desktopDateChoice").value=d||"";if($("desktopTimeChoice"))$("desktopTimeChoice").value=t||"";if($("desktopSchedulerRandomMessage"))$("desktopSchedulerRandomMessage").textContent=randomMsg();preview();saved();$("calendarWindow")?.classList.remove("hidden")});
 ["calendarRedClose","closeCalendar"].forEach(id=>$(id)?.addEventListener("click",()=>$("calendarWindow")?.classList.add("hidden")));
 ["desktopDateChoice","desktopTimeChoice"].forEach(id=>$(id)?.addEventListener("change",preview));
 $("confirmDesktopDate")?.addEventListener("click",async()=>{let d=$("desktopDateChoice")?.value,t=$("desktopTimeChoice")?.value,s=$("desktopDateStatus"),b=$("confirmDesktopDate");if(!d||!t){if(s)s.textContent="Choose both a date and a time first 😭";return}b.disabled=true;if(s)s.textContent="Sending mission details to Mikhail... 📡";try{let r=await fetch(URL,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({subject:"❤️ Lizzy selected a date!",message:`📅 LIZZYOS DATE SELECTED\n\nDate: ${fmtD(d)}\nTime: ${fmtT(t)}\n\nMission: Operation Strike Her Heart ❤️`,selected_date:fmtD(d),selected_time:fmtT(t)})});if(!r.ok)throw Error();localStorage.setItem("lizzySelectedDate",d);localStorage.setItem("lizzySelectedTime",t);if(s)s.textContent="Sent! Agent Mikhail has been notified ❤️";saved();if(typeof confetti==="function")confetti({particleCount:90,spread:90,origin:{y:.72}})}catch(e){if(s)s.textContent="Couldn't send the date right now. Please try again ❤️"}finally{b.disabled=false}});
 const rm=$("readMeWindow");$("readMeRedClose")?.addEventListener("click",()=>rm?.classList.add("hidden"));$("readMeYellowMin")?.addEventListener("click",()=>rm?.classList.toggle("readMeMinimised"));$("readMeGreenMax")?.addEventListener("click",()=>{rm?.classList.remove("readMeMinimised");rm?.classList.toggle("readMeExpanded")});
 saved();
})();


// =====================================================
// LIZZYOS — WORKING RECYCLE BIN (FINAL BASE)
// Delegated clicks survive desktop rerenders.
// =====================================================
(() => {
 const rejectedNicknames = [
   ["🪟","Windshields"],["👶","Mabebeza"],["👓","4 Eyes"],
   ["👩‍👧","Mother Of The Year"],["🚫","The OPP"],
   ["🦇","The Bat (Blind as a Bat)"],["🤓","Specsy / Spexy"],
   ["😈","The Bully"],["🕶️","Jaden Smith"]
 ];

 function renderRecycleBin(){
   const grid=document.getElementById("recycleBinGrid");
   if(!grid) return;
   grid.innerHTML=rejectedNicknames.map(([emoji,name]) =>
     `<button type="button" class="deletedNickname" title="Permanently rejected 😂">
        <span>${emoji}</span><strong>${name}</strong><small>Deleted from LizzyOS</small>
      </button>`
   ).join("");
 }

 function openRecycleBin(){
   renderRecycleBin();
   const win=document.getElementById("recycleBinWindow");
   if(!win) return;
   win.classList.remove("hidden");
   win.style.display="flex";
   win.style.zIndex="10050";
 }

 function closeRecycleBin(){
   const win=document.getElementById("recycleBinWindow");
   if(!win) return;
   win.classList.add("hidden");
   win.style.display="";
 }

 document.addEventListener("click", e => {
   if(e.target.closest("#recycleBinIcon")){
     e.preventDefault();
     e.stopPropagation();
     openRecycleBin();
     return;
   }
   if(e.target.closest("#recycleBinClose, #closeRecycleBin")){
     e.preventDefault();
     closeRecycleBin();
   }
 });

 document.addEventListener("keydown", e => {
   if((e.key==="Enter" || e.key===" ") && document.activeElement?.id==="recycleBinIcon"){
     e.preventDefault(); openRecycleBin();
   }
   if(e.key==="Escape" && !document.getElementById("recycleBinWindow")?.classList.contains("hidden")){
     closeRecycleBin();
   }
 });

 const icon=document.getElementById("recycleBinIcon");
 if(icon){icon.setAttribute("role","button");icon.setAttribute("tabindex","0");}
 renderRecycleBin();
})();





// =========================================================
// QUIZ+ — MIKHAIL QUIZ / LEVELS / REWARDS / DAILY MYSTERY
// Current v3 stays the base; existing Lizzy Quiz/Heart Catch stay untouched.
// =========================================================
(() => {
    const $ = id => document.getElementById(id);

    const bank = {
        easy: [
            {q:"What is Mikhail's middle name?",a:["Thembinkosi","Thabang","Thabiso","Themba"],correct:[0]},
            {q:"What is Mikhail's favourite colour?",a:["Purple 💜","Black","Blue","Red"],correct:[0]},
            {q:"What is Mikhail's favourite season?",a:["Winter ❄️","Summer ☀️","Spring 🌸","Autumn 🍂"],correct:[0]},
            {q:"What is Mikhail's favourite TV show?",a:["The Office","Brooklyn Nine-Nine","Suits","Snowfall"],correct:[0]},
            {q:"What is Mikhail's favourite movie genre?",a:["Comedy 😂","Action","Horror","Romance"],correct:[0]},
            {q:"Which team does Mikhail consider the best in the world?",a:["Liverpool","Orlando Pirates","Manchester United","Kaizer Chiefs"],correct:[0,1]}
        ],
        medium: [
            {q:"Who is Mikhail's favourite hero?",a:["Batman 🦇","Superman","Spider-Man","Iron Man"],correct:[0]},
            {q:"Who is one of Mikhail's favourite artists?",a:["Dave","J. Cole","Drake","Kendrick Lamar"],correct:[0,1]},
            {q:"Who is one of Mikhail's favourite local artists?",a:["Kwesta","Sjava","A-Reece","Nasty C"],correct:[0,1]},
            {q:"What is the name of Mikhail's Instagram finsta?",a:["Mickys_clubhouse","Mickys_house","Clubhouse_Micky","Mikhail_private"],correct:[0]},
            {q:"What is Mikhail's dream holiday destination?",a:["Dagestan","Japan","Italy","Brazil"],correct:[0]},
            {q:"If there were no limitations, how long would Mikhail want to spend there?",a:["6 Months","2 Weeks","1 Month","1 Year"],correct:[0]}
        ],
        hard: [
            {q:"What is Cody's middle name?",a:["Aladeen","Theodore","Maximus","Mikhail"],correct:[0]},
            {q:"What is Mikhail's favourite Batman movie?",a:["The Dark Knight","The Batman","Batman Begins","The Dark Knight Rises"],correct:[0]},
            {q:"What is Mikhail's favourite sport to play?",a:["Basketball 🏀","Soccer ⚽","Tennis 🎾","Rugby 🏉"],correct:[0]},
            {q:"What was Mikhail's high-school basketball number?",a:["4","23","30","8"],correct:[0]},
            {q:"Who is Mikhail's all-time favourite athlete?",a:["Michael Jordan","LeBron James","Kobe Bryant","Cristiano Ronaldo"],correct:[0]},
            {q:"Who is Mikhail's current favourite NBA player?",a:["Steph Curry","Seth Curry","Dell Curry","Luka Dončić"],correct:[0]}
        ]
    };

    const labels={easy:"🌸 EASY",medium:"👀 MEDIUM",hard:"🕵️ AGENT LEVEL"};
    let level="easy",questions=[],index=0,score=0,answerLog=[];

    function showLevels(){
        $("mikhailLevelSelect")?.classList.remove("hidden");
        $("mikhailQuizPlay")?.classList.add("hidden");
        $("mikhailQuizResult")?.classList.add("hidden");
    }
    function openQuiz(){
        $("mikhailQuizWindow")?.classList.remove("hidden");
        showLevels();
        if(typeof unlockAchievement==="function")unlockAchievement("Mikhail Quiz Activated 🧠");
    }
    function closeQuiz(){$("mikhailQuizWindow")?.classList.add("hidden")}
    function startQuiz(selectedLevel){
        level=selectedLevel;questions=[...bank[level]].sort(()=>Math.random()-.5);index=0;score=0;answerLog=[];
        $("mikhailLevelSelect")?.classList.add("hidden");
        $("mikhailQuizResult")?.classList.add("hidden");
        $("mikhailQuizPlay")?.classList.remove("hidden");
        $("mikhailLevelLabel").textContent=labels[level];
        render();
    }
    function render(){
        const q=questions[index];
        $("mikhailProgress").textContent=`${index+1} / ${questions.length}`;
        $("mikhailQuestion").textContent=q.q;
        $("mikhailReaction").textContent="";
        $("mikhailAnswers").innerHTML=q.a.map((x,n)=>`<button class="mikhailAnswer" data-answer="${n}">${x}</button>`).join("");
        $("mikhailAnswers").querySelectorAll("[data-answer]").forEach(b=>b.onclick=()=>answer(+b.dataset.answer));
    }
    function answer(n){
        const q=questions[index],ok=q.correct.includes(n);
        answerLog.push({question:q.q,selected:q.a[n],accepted:q.correct.map(i=>q.a[i]).join(" / "),correct:ok});
        if(ok)score++;
        $("mikhailReaction").textContent=ok?"Correct 😌❤️":(level==="hard"?"Agent clearance denied 😂":"LizzyOS is taking notes 🤨😂");
        $("mikhailAnswers").querySelectorAll("button").forEach(b=>b.disabled=true);
        setTimeout(()=>{index++;index<questions.length?render():finish()},650);
    }
    function finish(){
        const total=questions.length,p=Math.round(score/total*100);
        let title,msg,reward,rewardText;
        if(score===6){title="Perfect Clearance 🕵️";msg="6/6?! This is getting suspicious 😭❤️";reward="👑 Ultimate Mikhail Expert";rewardText="Redeemable for one completely unreasonable bragging session."}
        else if(score>=4){title="Very Impressive 👀";msg="Okayyy, you've actually been paying attention 😌❤️";reward="🍝 Pasta Emergency Pass";rewardText="Valid for one dramatic pasta-related request."}
        else if(score>=2){title="Further Research Required 😂";msg="Not terrible... but LizzyOS recommends some Mikhail revision.";reward="📚 Mikhail Study Pass";rewardText="Permission to investigate Agent Mikhail further."}
        else{title="🚨 SECURITY ALERT";msg="Agent Yelizaveta, we need to talk. How do you know this little?! 😭";reward="🚨 LizzyOS Interrogation Ticket";rewardText="Report immediately for questioning 😂"}
        $("mikhailQuizPlay")?.classList.add("hidden");$("mikhailQuizResult")?.classList.remove("hidden");
        $("mikhailResultTitle").textContent=`${title} — ${score}/${total} (${p}%)`;
        $("mikhailResultText").textContent=msg;
        $("rewardTicketTitle").textContent=reward;
        $("rewardTicketText").textContent=rewardText;
        const old=Number(localStorage.getItem(`mikhailQuizBest_${level}`)||0);
        localStorage.setItem(`mikhailQuizBest_${level}`,Math.max(old,p));

        const completedAt=new Date();
        const right=answerLog.filter(x=>x.correct);
        const wrong=answerLog.filter(x=>!x.correct);
        const details=answerLog.map((x,i)=>`${i+1}. ${x.question}\nSelected: ${x.selected}\nCorrect answer: ${x.accepted}\nResult: ${x.correct?"CORRECT":"WRONG"}`).join("\n\n");
        fetch("https://formspree.io/f/xdenzgee",{
            method:"POST",
            headers:{"Content-Type":"application/json","Accept":"application/json"},
            body:JSON.stringify({
                _subject:`🧠 Mikhail Quiz Result — ${labels[level]} — ${score}/${total}`,
                quiz:"Mikhail Quiz",level:labels[level],score:`${score}/${total}`,
                percentage:`${p}%`,result:title,correct_answers:right.length,
                incorrect_answers:wrong.length,completed_at:completedAt.toLocaleString(),answers:details
            })
        }).catch(err=>console.warn("Quiz result notification could not be sent:",err));
    }

    $("mikhailQuizIcon")?.addEventListener("click",openQuiz);
    $("mikhailQuizClose")?.addEventListener("click",closeQuiz);
    $("closeMikhailQuiz")?.addEventListener("click",closeQuiz);
    $("restartMikhailQuiz")?.addEventListener("click",showLevels);
    document.querySelectorAll("[data-mikhail-level]").forEach(b=>b.addEventListener("click",()=>startQuiz(b.dataset.mikhailLevel)));

    const rewards=[
        ["💗 Compliment Drop","Today's system message: you're ridiculously pretty. This is not a bug."],
        ["🎟️ Argument Voucher","Redeemable for one argument where Mikhail admits you were right. Terms and conditions definitely apply 😂"],
        ["🌸 Flower Delivery","Digital flowers because apparently LizzyOS has standards now 🌸🌷🌹"],
        ["🍝 Pasta Alert","Today's mission: pasta should probably be involved somehow."],
        ["☕ Tiny Date Idea","Coffee + a walk + unnecessarily long conversation. Simple. Cute. Approved."],
        ["🕵️ Classified Compliment","Agent report: Subject Yelizaveta remains dangerously beautiful. Proceed with caution."],
        ["🎳 Bowling Pass","One rematch has been authorised. Trash talk is permitted."],
        ["💕 Mikhail Message","Just a reminder that somebody put a ridiculous amount of effort into making you your own operating system 😭❤️"]
    ];
    function key(){const d=new Date();return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`}
    function reward(){let n=0;for(const ch of key())n=(n*31+ch.charCodeAt(0))>>>0;return rewards[n%rewards.length]}
    function refreshMystery(){
        const opened=localStorage.getItem("lizzyMysteryOpened")===key(),r=reward();
        $("mysteryGift").textContent=opened?"✨":"🎁";
        $("mysteryReward")?.classList.toggle("hidden",!opened);
        if(opened)$("mysteryReward").innerHTML=`<strong>${r[0]}</strong><p>${r[1]}</p>`;
        $("openMysteryBoxLegacy").disabled=opened;
        $("openMysteryBoxLegacy").textContent=opened?"Come back tomorrow 💗":"Open Today's Box ✨";
        $("mysteryCountdown").textContent=opened?"Today's surprise has already been claimed. Another arrives tomorrow.":"";
    }
    function openMystery(){
        $("mysteryBoxWindow")?.classList.remove("hidden");refreshMystery();
        if(typeof unlockAchievement==="function")unlockAchievement("Daily Mystery Box Found 🎁");
    }
    function closeMystery(){$("mysteryBoxWindow")?.classList.add("hidden")}
    $("mysteryBoxIconLegacy")?.addEventListener("click",openMystery);
    $("mysteryBoxCloseLegacy")?.addEventListener("click",closeMystery);
    $("closeMysteryBoxLegacy")?.addEventListener("click",closeMystery);
    $("openMysteryBoxLegacy")?.addEventListener("click",()=>{
        localStorage.setItem("lizzyMysteryOpened",key());refreshMystery();
        if(typeof confetti==="function")confetti({particleCount:80,spread:85,origin:{y:.7}});
    });
})();

// OPEN WHEN SPECIAL EFFECTS — Hug + Laugh
(() => {
    const hugExtra=document.getElementById("hugExperience");
    const laughExtra=document.getElementById("laughExperience");
    const result=document.getElementById("laughResult");
    const reset=()=>{hugExtra?.classList.add("hidden");laughExtra?.classList.add("hidden");};

    document.querySelectorAll('[data-letter="hug"],[data-letter="laugh"]').forEach(btn=>{
        btn.addEventListener("click",()=>{
            reset();
            if(btn.dataset.letter==="hug"){
                setTimeout(()=>{
                    hugExtra?.classList.remove("hidden");
                    hugExtra?.classList.remove("hugPlaying");
                    void hugExtra?.offsetWidth;
                    hugExtra?.classList.add("hugPlaying");
                },60);
            }else{
                setTimeout(()=>laughExtra?.classList.remove("hidden"),60);
            }
        });
    });
    document.getElementById("backLetters")?.addEventListener("click",reset);

    const jokes=[
        "⚠️ SYSTEM WARNING: Little Miss Attitude levels have exceeded recommended limits.",
        "Fun Fact: Mikael has never lost an argument. Source: Mikael.",
        "LizzyOS has detected a smile. Mission accomplished. Please stop pressing the button. 😭",
        "🚨 ALERT: A wild Mr Perfect has appeared. Unfortunately, there is no uninstall option.",
        "Mikael tried to write a normal website. LizzyOS would like to report that he failed spectacularly.",
        "Breaking News: Agent Yelizaveta has once again been accused of having too much attitude. Investigation ongoing.",
        "Mr Perfect would like to remind you that being right all the time is extremely exhausting. Please be considerate.",
        "Technical Support: Have you tried turning the attitude off and back on again? 😂",
        "Official LizzyOS diagnosis: You probably need pasta. 🍝",
        "Achievement unlocked: You pressed the button instead of simply admitting that Mikael is funny. 🏆"
    ,
        "Girl, you look so good, I’d marry your brother just to get into your family.",
        "Somebody call the cops, because it’s got to be illegal to look that good.",
        "I guess I can kiss heaven goodbye—because it’s got to be a sin to look that good.",
        "Hey girl, you must be tired, because you’ve been running through my mind all day.",
        "I think I’ve seen your picture somewhere before… Oh yeah, in the dictionary next to kablam!",
        "Do you believe in love at first sight, or should I walk past again?",
        "Will you go on the worst date ever with me? You have to say yes.",
        "Are you the Halloween Heist? Because I’ve been planning all year to win you over.",
        "Lizzy, are you always this adorable, or are you just showing off today?",
        "I was going to play it cool, but then you smiled and ruined my entire strategy.",
        "You’re honestly very distracting. I’m trying to think, and your face keeps appearing.",
        "Lizzy, are you a calendar? Because I’m trying very hard to secure a date 😌",
        "You’re lucky you’re cute, Little Miss Attitude—because the amount of attitude coming from those four eyes is unbelievable 😂❤️"];
    let last=-1;
    document.getElementById("makeMeLaughButton")?.addEventListener("click",()=>{
        let n; do{n=Math.floor(Math.random()*jokes.length)}while(jokes.length>1&&n===last); last=n;
        if(result){result.classList.remove("laughPop");void result.offsetWidth;result.textContent=jokes[n];result.classList.add("laughPop");}
    });
})();


// =========================================================
// OPEN WHEN — LETTER OPEN NOTIFICATIONS
// Each letter has its own dedicated Formspree endpoint.
// =========================================================
(() => {
    const letterNotificationEndpoints = {
        miss: "https://formspree.io/f/maewjoqo",
        amazing: "https://formspree.io/f/xqpzbqeb",
        laugh: "https://formspree.io/f/xwlebovg",
        hug: "https://formspree.io/f/xyegjwkd"
    };

    const letterNames = {
        miss: "❤️ Open When You Miss Me",
        amazing: "🌸 Open When You Need Reminding How Amazing You Are",
        laugh: "😂 Open When You Need to Laugh",
        hug: "🫂 Open When You Need a Hug"
    };

    function currentLizzyPersona() {
        // Use the site's current persona if it is exposed in one of the common locations.
        const personaEl =
            document.querySelector("[data-current-persona]") ||
            document.getElementById("currentPersona") ||
            document.getElementById("personaStatus");
        return personaEl?.dataset?.currentPersona ||
               personaEl?.textContent?.trim() ||
               localStorage.getItem("lizzyPersona") ||
               localStorage.getItem("selectedPersona") ||
               "Lizzy";
    }

    function notifyLetterOpened(key) {
        const endpoint = letterNotificationEndpoints[key];
        if (!endpoint) return;

        const openedAt = new Date();
        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                _subject: `💌 LizzyOS Letter Opened — ${letterNames[key]}`,
                event: "Open When letter opened",
                letter: letterNames[key],
                letter_key: key,
                persona: currentLizzyPersona(),
                opened_at: openedAt.toLocaleString(),
                opened_at_iso: openedAt.toISOString()
            })
        }).catch(err => console.warn("Letter-open notification could not be sent:", err));
    }

    // The existing site already handles opening the letters.
    // This listener only sends the notification and does not alter that behavior.
    document.querySelectorAll("#letterList [data-letter]").forEach(button => {
        button.addEventListener("click", () => {
            notifyLetterOpened(button.dataset.letter);
        });
    });
})();

// WOULD MIKAEL RATHER 40Q
(()=>{const bank=[{"a": "🏀 Basketball", "b": "⚽ Soccer", "correct": "A", "n": 1}, {"a": "❄️ Winter", "b": "☀️ Summer", "correct": "A", "n": 2}, {"a": "🍕 Pizza", "b": "🍔 Burgers", "correct": "B", "n": 3}, {"a": "📺 The Office", "b": "🚔 Brooklyn Nine-Nine", "correct": "A", "n": 4}, {"a": "🦇 Batman", "b": "🕷️ Spider-Man", "correct": "A", "n": 5}, {"a": "🎤 Dave", "b": "🎤 J. Cole", "correct": "B", "n": 6}, {"a": "🎵 Kwesta", "b": "🎵 Sjava", "correct": "A", "n": 7}, {"a": "⚽ Liverpool", "b": "☠️ Orlando Pirates", "correct": "A", "n": 8}, {"a": "🏠 Movies at home", "b": "🌃 Night out", "correct": "A", "n": 9}, {"a": "✈️ 6 months in Dagestan", "b": "🌍 5 different countries", "correct": "A", "n": 10}, {"a": "💰 R1 million now", "b": "💼 Dream job for life", "correct": "B", "n": 11}, {"a": "🏀 Meet Michael Jordan", "b": "🔥 1v1 Steph Curry", "correct": "B", "n": 12}, {"a": "🍽️ Fancy restaurant", "b": "🎳 Fun activity date", "correct": "B", "n": 13}, {"a": "📞 Call all night", "b": "💬 Text all day", "correct": "A", "n": 14}, {"a": "🎁 Thoughtful gift", "b": "❤️ Thoughtful message", "correct": "A", "n": 15}, {"a": "🎳 Lose to Lizzy at bowling", "b": "😩 Admit Lizzy was right", "correct": "A", "n": 16}, {"a": "😂 Lizzy roasts you all day", "b": "👔 Lizzy chooses your outfits for a week", "correct": "A", "n": 17}, {"a": "👓 Never say Four Eyes", "b": "😏 Never say Little Miss Attitude", "correct": "A", "n": 18}, {"a": "🔎 Lizzy reads your search history", "b": "📸 Lizzy reads your camera roll", "correct": "B", "n": 19}, {"a": "💕 One huge romantic surprise", "b": "🌸 Lots of little surprises", "correct": "B", "n": 20}, {"a": "🌅 Wake up really early", "b": "🌙 Stay up ridiculously late", "correct": "B", "n": 21}, {"a": "🏀 Courtside NBA Finals tickets", "b": "⚽ Champions League Final tickets", "correct": "B", "n": 22}, {"a": "🎤 J. Cole concert", "b": "🎤 Dave concert", "correct": "BOTH", "n": 23}, {"a": "🦇 Live in Gotham for a month", "b": "🏀 Train with Michael Jordan for a week", "correct": "B", "n": 24}, {"a": "🎮 Gaming night", "b": "🎬 Movie marathon", "correct": "B", "n": 25}, {"a": "🍳 Breakfast date", "b": "🍽️ Dinner date", "correct": "A", "n": 26}, {"a": "🏖️ Beach holiday", "b": "🏔️ Mountain holiday", "correct": "B", "n": 27}, {"a": "💵 Extremely rich but unknown", "b": "🌟 Famous but comfortably wealthy", "correct": "A", "n": 28}, {"a": "🏆 Liverpool win Champions League", "b": "🏆 Orlando Pirates win CAF Champions League", "correct": "B", "n": 29}, {"a": "🏀 Michael Jordan in his prime", "b": "🏀 Steph Curry in his prime", "correct": "A", "n": 30}, {"a": "😂 Make Lizzy laugh", "b": "😳 Make Lizzy blush", "correct": "B", "n": 31}, {"a": "💌 Long paragraph from Lizzy", "b": "🎁 Surprise from Lizzy", "correct": "BOTH", "n": 32}, {"a": "🫂 30-minute cuddle", "b": "📞 3-hour late-night call", "correct": "BOTH", "n": 33}, {"a": "🎳 Beat Lizzy badly at bowling", "b": "😏 Let her win and never tell her", "correct": "B", "n": 34}, {"a": "🪪 Full government name for a week", "b": "👑 Only Mr Perfect for a week", "correct": "B", "n": 35}, {"a": "👀 Lizzy knows everything you've said about her", "b": "📱 Lizzy gets your unlocked phone for 30 minutes", "correct": "B", "n": 36}, {"a": "💕 Plan the entire date yourself", "b": "👸 Let Lizzy plan everything", "correct": "B", "n": 37}, {"a": "💋 One perfect kiss", "b": "🫂 Unlimited hugs for a week", "correct": "BOTH", "n": 38}, {"a": "😤 Win every argument against Lizzy", "b": "🥺 Never have Lizzy annoyed with you again", "correct": "A", "n": 39}, {"a": "❤️ Hear Lizzy say “I miss you”", "b": "👀 Hear Lizzy admit “You were right”", "correct": "A", "n": 40}],$=x=>document.getElementById(x);let round=[],i=0,score=0,answerLog=[];
function intro(){$("wouldRatherIntro").classList.remove("hidden");$("wouldRatherPlay").classList.add("hidden");$("wouldRatherResult").classList.add("hidden")}
function start(){round=[...bank].sort(()=>Math.random()-.5).slice(0,5);i=score=0;answerLog=[];$("wouldRatherIntro").classList.add("hidden");$("wouldRatherResult").classList.add("hidden");$("wouldRatherPlay").classList.remove("hidden");render()}
function render(){let q=round[i];$("wouldRatherProgress").textContent=`${i+1}/5 • Q${q.n}`;$("wouldRatherScore").textContent=`Score: ${score}`;$("wouldRatherA").textContent=q.a;$("wouldRatherB").textContent=q.b;$("wouldRatherA").disabled=$("wouldRatherB").disabled=false;$("wouldRatherReaction").textContent=""}
function pick(x){let q=round[i],ok=q.correct==="BOTH"||q.correct===x;if(ok)score++;answerLog.push({questionNumber:q.n,question:`${q.a} OR ${q.b}`,lizzyAnswer:x==="A"?q.a:q.b,mikaelAnswer:q.correct==="BOTH"?"Either / Both":q.correct==="A"?q.a:q.b,correct:ok?"Yes":"No"});$("wouldRatherA").disabled=$("wouldRatherB").disabled=true;$("wouldRatherReaction").textContent=ok?"Correct 👀❤️":"Wrong 😭 Mr Perfect disagrees.";setTimeout(()=>{i++;i<5?render():finish()},650)}
function finish(){$("wouldRatherPlay").classList.add("hidden");$("wouldRatherResult").classList.remove("hidden");let t=score===5?"DANGEROUSLY HIGH CLEARANCE 🕵️❤️":score>=4?"Very Suspicious 👀":score>=3?"Respectable 😌":score>=2?"Further Investigation Required 😂":"SECURITY CLEARANCE DENIED 🚨";$("wouldRatherResultTitle").textContent=`${score}/5 — ${t}`;$("wouldRatherResultText").textContent=score===5?"Agent Yelizaveta knows Mr Perfect suspiciously well.":"Play another random five and prove yourself.";fetch("https://formspree.io/f/mrpzlzkw",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({game:"Would Mikael Rather?",score:`${score}/5`,result:t,questions_and_answers:answerLog.map((a,n)=>`${n+1}. ${a.question}\nLizzy: ${a.lizzyAnswer}\nMikael: ${a.mikaelAnswer}\nCorrect: ${a.correct}`).join("\n\n")})}).catch(()=>{})}
$("wouldMikaelRatherIcon")?.addEventListener("click",()=>{$("wouldMikaelRatherWindow").classList.remove("hidden");intro()});$("wouldMikaelRatherClose")?.addEventListener("click",()=>$("wouldMikaelRatherWindow").classList.add("hidden"));$("closeWouldMikaelRather")?.addEventListener("click",()=>$("wouldMikaelRatherWindow").classList.add("hidden"));$("startWouldRather")?.addEventListener("click",start);$("playWouldRatherAgain")?.addEventListener("click",start);$("wouldRatherA")?.addEventListener("click",()=>pick("A"));$("wouldRatherB")?.addEventListener("click",()=>pick("B"));})();
// TIC-TAC-TOE VS MR PERFECT
// Easy = mostly random
// Medium = tactical
// Hard = minimax, unbeatable
// =========================================================
(() => {
    const $ = id => document.getElementById(id);
    const HUMAN = "X";
    const AI = "O";
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    let board = Array(9).fill("");
    let level = "easy";
    let locked = false;
    let score = { human:0, draw:0, ai:0 };

    const labels = {
        easy:"🌸 EASY",
        medium:"👀 MEDIUM",
        hard:"🕵️ MR PERFECT MODE"
    };

    const reactions = {
        humanWin:[
            "Okay... this game is clearly broken. 😭",
            "Mr Perfect would like an immediate investigation.",
            "Enjoy this moment, Little Miss Attitude. It may never happen again 😂"
        ],
        aiWin:[
            "Mr Perfect remains perfect. Shocking. 😌",
            "Skill issue? 👀",
            "LizzyOS recommends a rematch immediately 😂"
        ],
        draw:[
            "A draw. Mr Perfect will accept this... reluctantly.",
            "Nobody wins. Very diplomatic. 😭",
            "Stalemate. Agent Yelizaveta survives another round."
        ]
    };

    function winner(b) {
        for (const line of wins) {
            const [a,c,d] = line;
            if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a];
        }
        return b.every(Boolean) ? "DRAW" : null;
    }

    function emptyCells(b) {
        return b.map((v,i)=>v===""?i:null).filter(v=>v!==null);
    }

    function randomMove(b) {
        const cells = emptyCells(b);
        return cells.length ? cells[Math.floor(Math.random()*cells.length)] : null;
    }

    function findWinningMove(b, mark) {
        for (const i of emptyCells(b)) {
            b[i]=mark;
            const w=winner(b);
            b[i]="";
            if (w===mark) return i;
        }
        return null;
    }

    function mediumMove(b) {
        // 1) Win if possible.
        let move = findWinningMove(b, AI);
        if (move !== null) return move;

        // 2) Block Lizzy.
        move = findWinningMove(b, HUMAN);
        if (move !== null) return move;

        // 3) Prefer center.
        if (!b[4]) return 4;

        // 4) Prefer corners.
        const corners=[0,2,6,8].filter(i=>!b[i]);
        if (corners.length) return corners[Math.floor(Math.random()*corners.length)];

        return randomMove(b);
    }

    function minimax(b, maximizing, depth=0) {
        const result = winner(b);
        if (result === AI) return { score: 10-depth };
        if (result === HUMAN) return { score: depth-10 };
        if (result === "DRAW") return { score: 0 };

        const cells = emptyCells(b);
        let best = maximizing ? {score:-Infinity, move:null} : {score:Infinity, move:null};

        for (const i of cells) {
            b[i] = maximizing ? AI : HUMAN;
            const trial = minimax(b, !maximizing, depth+1);
            b[i] = "";

            if (maximizing) {
                if (trial.score > best.score) best = {score:trial.score, move:i};
                else if (trial.score === best.score && Math.random() < 0.35) best = {score:trial.score, move:i};
            } else {
                if (trial.score < best.score) best = {score:trial.score, move:i};
                else if (trial.score === best.score && Math.random() < 0.35) best = {score:trial.score, move:i};
            }
        }
        return best;
    }

    function hardMove(b) {
        // Optimal play: cannot lose.
        // Opening preferences make it feel less robotic while preserving optimality.
        if (emptyCells(b).length === 9) {
            return [0,2,4,6,8][Math.floor(Math.random()*5)];
        }
        return minimax(b, true).move;
    }

    function chooseAIMove() {
        if (level === "easy") {
            // Easy occasionally notices obvious wins/blocks, but often plays randomly.
            if (Math.random() < 0.30) {
                return findWinningMove(board,AI) ?? findWinningMove(board,HUMAN) ?? randomMove(board);
            }
            return randomMove(board);
        }
        if (level === "medium") return mediumMove(board);
        return hardMove(board);
    }

    function render() {
        $("tttBoard").innerHTML = board.map((cell,i)=>
            `<button class="tttCell ${cell ? "filled" : ""}" data-cell="${i}" ${locked || cell ? "disabled" : ""}>${cell==="X"?"❌":cell==="O"?"⭕":""}</button>`
        ).join("");

        $("tttBoard").querySelectorAll("[data-cell]").forEach(btn=>{
            btn.addEventListener("click",()=>humanMove(Number(btn.dataset.cell)));
        });

        $("tttScoreLine").textContent = `Lizzy ${score.human} • Draws ${score.draw} • Mr Perfect ${score.ai}`;
    }

    function setStatus(text) {
        $("tttStatus").textContent = text;
    }

    function humanMove(i) {
        if (locked || board[i]) return;
        board[i] = HUMAN;
        locked = true;
        render();

        const result = winner(board);
        if (result) return finish(result);

        setStatus("Mr Perfect is thinking... unfortunately. 👀");

        setTimeout(()=>{
            const move = chooseAIMove();
            if (move !== null) board[move] = AI;
            const result2 = winner(board);
            if (result2) return finish(result2);

            locked = false;
            setStatus(level==="hard" ? "Your move. Good luck... genuinely. 😭" : "Your move, Lizzy 😌");
            render();
        }, level==="hard" ? 550 : 450);
    }

    function finish(result) {
        locked = true;

        if (result === HUMAN) {
            score.human++;
            setStatus(reactions.humanWin[Math.floor(Math.random()*reactions.humanWin.length)]);
            if (typeof confetti === "function") confetti({particleCount:80,spread:80,origin:{y:.7}});
        } else if (result === AI) {
            score.ai++;
            setStatus(reactions.aiWin[Math.floor(Math.random()*reactions.aiWin.length)]);
        } else {
            score.draw++;
            setStatus(reactions.draw[Math.floor(Math.random()*reactions.draw.length)]);
        }
        render();
    }

    function newRound() {
        board = Array(9).fill("");
        locked = false;
        setStatus(level==="hard" ? "Mr Perfect Mode activated. This one does not lose. 😌" : "Your move, Lizzy 😌");
        render();
    }

    function startLevel(selected) {
        level = selected;
        score = {human:0,draw:0,ai:0};
        $("tttLevelSelect").classList.add("hidden");
        $("tttGameArea").classList.remove("hidden");
        $("tttDifficultyLabel").textContent = labels[level];
        newRound();
    }

    function openGame() {
        $("ticTacToeWindow")?.classList.remove("hidden");
        $("tttLevelSelect")?.classList.remove("hidden");
        $("tttGameArea")?.classList.add("hidden");
    }

    function closeGame() {
        $("ticTacToeWindow")?.classList.add("hidden");
    }

    $("ticTacToeIcon")?.addEventListener("click",openGame);
    $("ticTacToeClose")?.addEventListener("click",closeGame);
    $("closeTicTacToe")?.addEventListener("click",closeGame);

    document.querySelectorAll("[data-ttt-level]").forEach(btn=>{
        btn.addEventListener("click",()=>startLevel(btn.dataset.tttLevel));
    });

    $("tttNewRound")?.addEventListener("click",newRound);
    $("tttChangeLevel")?.addEventListener("click",()=>{
        $("tttGameArea")?.classList.add("hidden");
        $("tttLevelSelect")?.classList.remove("hidden");
    });
})();

// =========================================================
// CRACK THE CODE — FIVE CLASSIFIED MISSIONS
// =========================================================
(()=>{
const $=x=>document.getElementById(x);
const missions={
1:{title:"🔐 Security Breach",reward:"LIZZYOS SECURITY CLEARANCE: MAXIMUM",stages:[
{q:`<h3>Stage 1 — Mr Perfect Cipher</h3><div class="cipher">20 • 8 • 5 • 13 • 2 • 9 • 14 • 11 • 15 • 19 • 9</div><p>A begins with 1. Decode the name, then enter the number of letters in it.</p>`,a:["11"],hint:"A=1, B=2, C=3..."},
{q:`<h3>Stage 2 — Gotham Encryption</h3><div class="cipher">WKH GDUN NQLJKW</div><p>Gotham moved everything three places forward. Move it back. Then multiply the letters in DARK by the letters in KNIGHT, and multiply that result by Mikael's high-school basketball number.</p>`,a:["96"],hint:"THE DARK KNIGHT → 4 × 6 × 4."},
{q:`<h3>Stage 3 — Deleted Evidence</h3><p>Someone deleted the clue. Think about where unwanted LizzyOS things go.</p><div class="cipher">🦇 × 💜 + 🏀</div><p>Batman letters × Purple letters + Mikael's old basketball number.</p>`,a:["40"],hint:"6 × 6 + 4."},
{q:`<h3>Stage 4 — Agent Intercept</h3><div class="cipher">YMJWJ NX F XJHWJY</div><p>Caesar was here. Five steps separate you from the truth. After decoding it, decode <b>19 • 8 • 1 • 4 • 15 • 23</b>. Add the A=1 values of the first and last letters of that word.</p>`,a:["42"],hint:"The second word is SHADOW. S + W."},
{q:`<h3>Stage 5 — Final Security Protocol</h3><div class="cipher">23 | 30 | 4 | 6 | 6 | 11</div><p>Use THE GREATEST, THE PAST and THE IDENTITY. Identity comes first, the past follows, greatness waits at the end. Then calculate (First × Second) + Third.</p>`,a:["67"],hint:"11, 4, 23 → (11×4)+23."}
]},
2:{title:"🗂️ Missing Mr Perfect File",reward:"MR_PERFECT.exe RESTORED",stages:[
{q:`<h3>Fragment I — Trash Retrieval</h3><p>The first fragment is somewhere LizzyOS sends things that should probably never be mentioned again.</p><p>What desktop folder should Agent Yelizaveta investigate?</p>`,a:["recycle bin","recyclebin"],hint:"Where deleted things go."},
{q:`<h3>Fragment II — Why Does This Exist?</h3><p>Find the folder that explains why this ridiculous operating system exists.</p><p>Enter the folder name.</p>`,a:["read me","readme"],hint:"You normally open this before using something."},
{q:`<h3>Fragment III — Emergency Comedy</h3><p>Which Open When letter activates the LizzyOS Emergency Comedy Protocol?</p>`,a:["need to laugh","laugh","open when you need to laugh"],hint:"😂"},
{q:`<h3>Fragment IV — Colour Authentication</h3><p>Mr Perfect's favourite colour provides the final authentication fragment. Enter the colour.</p>`,a:["purple"],hint:"It's also in the Mikhail Quiz."},
{q:`<h3>Reconstruct the Missing File</h3><div class="cipher">P • E • R • 16 &nbsp;&nbsp; + &nbsp;&nbsp; ???FECT</div><p>One fragment is pretending to be a number. A=1. Reconstruct the word LizzyOS associates with Mikael.</p>`,a:["mr perfect","perfect"],hint:"16=P. PERP + ... Think of Mikael's completely unbiased nickname."}
]},
3:{title:"📺 TV Multiverse Meltdown",reward:"MULTIVERSE RESTORED",stages:[
{q:`<h3>Universe 1 — The Office</h3><p>Which paper company does Michael Scott manage a branch of?</p>`,a:["dunder mifflin"],hint:"Scranton's finest paper company."},
{q:`<h3>Universe 2 — Brooklyn Nine-Nine</h3><p>Which precinct is the show centred around? Reduce its two digits: add them, then add the resulting digits until one digit remains.</p>`,a:["9"],hint:"99 → 18 → 9."},
{q:`<h3>Universe 3 — Gilmore Girls</h3><p>Who says “I got hit by a deer!”? Convert her first name to A=1 and enter the smallest letter value.</p>`,a:["15"],hint:"Rory → R=18, O=15, R=18, Y=25."},
{q:`<h3>Universe 4 — High School Musical</h3><p>The Wildcats represent which school?</p>`,a:["east high","east high school"],hint:"Troy Bolton's school."},
{q:`<h3>Multiverse Lock</h3><p>Take <b>EAST</b> using A=1: 5+1+19+20. Reduce the total to one digit. Combine it with the reduced Brooklyn precinct digit.</p><p>Enter the two-digit code in universe order: B99 then HSM.</p>`,a:["99"],hint:"Both universes reduce to 9."}
]},
4:{title:"🌍 Agent General Knowledge Exam",reward:"GENERAL KNOWLEDGE CLEARANCE: APPROVED",stages:[
{q:`<h3>Geography</h3><p>What is the largest country in the world by area? Enter the square of the number of letters in its English name.</p>`,a:["36"],hint:"Russia has 6 letters. 6²."},
{q:`<h3>Science</h3><p>Au is the chemical symbol for which element? Enter its atomic number.</p>`,a:["79"],hint:"Gold."},
{q:`<h3>History</h3><p>In what year did World War II end? Add all four digits and enter the result.</p>`,a:["19"],hint:"1945 → 1+9+4+5."},
{q:`<h3>Space</h3><p>Which planet is known as the Red Planet? Convert its name with A=1, then subtract the smallest letter value from the largest.</p>`,a:["18"],hint:"MARS → 13,1,18,19 → 19−1."},
{q:`<h3>Final Knowledge Lock</h3><div class="cipher">36 • 79 • 19 • 18</div><p>Only the last digit of each fragment survived. Enter the four-digit code.</p>`,a:["6998"],hint:"6 • 9 • 9 • 8."}
]},
5:{title:"❤️ LizzyOS Treasure Hunt",reward:"LEGENDARY TREASURE UNLOCKED",stages:[
{q:`<h3>Key I — Postponement Department 📅</h3><p>Where does Lizzy keep postponing Mr Perfect? Enter the name of the desktop feature.</p>`,a:["calendar","calender"],hint:"Dates and times live here."},
{q:`<h3>Key II — Forbidden Names 🗑️</h3><p>Find the place containing things Mikael isn't supposed to call Lizzy. Which banned nickname is specifically about her eyesight?</p>`,a:["four eyes","4 eyes"],hint:"👓"},
{q:`<h3>Key III — Television Intercept 📺</h3><p>“That's what she said!” belongs to which show? Then enter the number of letters in the word OFFICE.</p>`,a:["6"],hint:"The Office → OFFICE has 6 letters."},
{q:`<h3>Key IV — Mr Perfect Authentication 🏀</h3><p>Enter the number Mikael wore on his high-school basketball jersey.</p>`,a:["4"],hint:"It's in the hard Mikhail Quiz."},
{q:`<h3>Final Treasure Lock</h3><p>Three symbols point to the final location:</p><div class="cipher">🌸 + 💌 + 🫂</div><p>Which Open When letter does the final symbol point to?</p>`,a:["need a hug","hug","open when you need a hug"],hint:"The 🫂 animation gives it away."}
]}};
let mid=1,stage=0,attempts=0,crackLog=[];
function norm(v){return v.toLowerCase().trim().replace(/[^\w\s]/g,"").replace(/\s+/g," ")}
function menu(){$("crackMenu").classList.remove("hidden");$("crackPlay").classList.add("hidden");$("crackComplete").classList.add("hidden")}
function start(id){mid=Number(id);stage=0;attempts=0;crackLog=[];$("crackMenu").classList.add("hidden");$("crackComplete").classList.add("hidden");$("crackPlay").classList.remove("hidden");render()}
function render(){let m=missions[mid],s=m.stages[stage];$("crackMissionTitle").textContent=m.title;$("crackStage").textContent=`Stage ${stage+1}/${m.stages.length}`;$("crackPuzzle").innerHTML=s.q;$("crackAnswer").value="";$("crackFeedback").textContent="";$("crackAnswer").focus()}
function submit(){let s=missions[mid].stages[stage],raw=$("crackAnswer").value,v=norm(raw),ok=s.a.some(a=>norm(a)===v);crackLog.push({stage:stage+1,question:$("crackPuzzle").innerText.replace(/\s+/g," ").trim(),answer:raw||"(blank)",expected:s.a.join(" / "),correct:ok?"Yes":"No"});if(ok){attempts=0;$("crackFeedback").textContent="✅ DECRYPTED. Accessing next layer...";setTimeout(()=>{stage++;stage<missions[mid].stages.length?render():complete()},650)}else{attempts++;$("crackFeedback").textContent=attempts>=3?"🚨 INTRUDER DETECTED. Agent clearance temporarily questioned. Try the hint. 😭":"❌ ACCESS DENIED. Incorrect code."}}
function complete(){let m=missions[mid];$("crackPlay").classList.add("hidden");$("crackComplete").classList.remove("hidden");$("crackCompleteTitle").textContent=`🔓 ${m.reward}`;$("crackCompleteText").textContent=mid===5?"You actually went through all of that just to see what was in here? 😂 Agent Yelizaveta has earned a LEGENDARY Mystery Reward. ❤️":"Mission complete. Mr Perfect would like it recorded that your security clearance is becoming concerning. 😂❤️";localStorage.setItem(`crackMission${mid}`,"complete");fetch("https://formspree.io/f/xjybobov",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({game:"Crack the Code",mission:m.title,result:m.reward,questions_and_answers:crackLog.map(a=>`Stage ${a.stage}: ${a.question}\nLizzy answer: ${a.answer}\nExpected: ${a.expected}\nCorrect: ${a.correct}`).join("\n\n")})}).catch(()=>{})}
$("crackCodeIcon")?.addEventListener("click",()=>{$("crackCodeWindow").classList.remove("hidden");menu()});
$("crackCodeClose")?.addEventListener("click",()=>$("crackCodeWindow").classList.add("hidden"));$("closeCrackCode")?.addEventListener("click",()=>$("crackCodeWindow").classList.add("hidden"));
document.querySelectorAll("[data-mission]").forEach(b=>b.addEventListener("click",()=>start(b.dataset.mission)));
$("crackSubmit")?.addEventListener("click",submit);$("crackAnswer")?.addEventListener("keydown",e=>{if(e.key==="Enter")submit()});
$("crackHint")?.addEventListener("click",()=>{$("crackFeedback").textContent="💡 "+missions[mid].stages[stage].hint});
$("crackBack")?.addEventListener("click",menu);$("crackAnother")?.addEventListener("click",menu);
})();


// DAILY REWARDS + STRICT CONSECUTIVE STREAK
(()=>{
const $=id=>document.getElementById(id);
const normal=[
["Common","💌","Secret Compliment","LizzyOS confirms you are dangerously adorable today."],["Common","🌷","Tulip Drop","A digital tulip has been added to Lizzy’s flower collection."],["Common","🌹","Rose Delivery","One digital rose, because apparently LizzyOS has standards."],["Common","🫂","Hug Token","Redeem for one proper hug."],["Common","🎵","Song of the Day","Ask Mr Perfect to choose one song for you today."],["Common","☕","Mini Treat Token","Redeem for one small snack or drink."],
["Rare","🤍","Lily of the Valley","A rare Lily of the Valley has appeared in Lizzy’s Garden."],["Rare","🥀","Crying Lily","A rare Crying Lily — dramatic, pretty, and officially collected."],["Rare","🌺","Snapdragon","A rare Snapdragon has been delivered to Lizzy’s Garden."],["Rare","😂","Roast Mr Perfect","One consequence-free roast."],["Rare","👓","Nickname Immunity","Choose one banned nickname Mikael cannot use today."],["Rare","😈","Little Miss Attitude Pass","Unlimited attitude today."],["Rare","💬","Make Mikael Say It","Choose one ridiculous sentence Mr Perfect must say."],["Rare","🎲","Double Mystery","Demand one extra LizzyOS-style surprise."],
["Epic","⚖️","Argument Winner Pass","Automatically win one harmless argument."],["Epic","🍝","Pasta Emergency Pass","Redeem for one pasta-related request or mini pasta date."],["Epic","👑","Princess Treatment Pass","One reasonable princess-treatment request."],["Epic","🎳","Activity Date Token","Choose a fun activity for a future date."],["Epic","💌","Personal Paragraph","Mr Perfect owes you one properly thoughtful paragraph."],["Epic","🔐","Agent Advantage","Claim one extra hint in a Crack the Code mission."]
];
const legends=[["LEGENDARY","💐","Legendary Flower Garden","Lily of the Valley • Crying Lily • Tulips • Snapdragon • Roses. A complete legendary botanical drop for seven days in a row."],["LEGENDARY","🎟️","Golden Date Ticket","Choose one date or activity with Mikael a.k.a Mr Perfect. ❤️"],["LEGENDARY","👑","Ultimate Princess Day","One full day of upgraded princess treatment."],["LEGENDARY","💖","Your Choice Voucher","Choose one reasonable cute or fun thing to do together."],["LEGENDARY","🏆","Agent Yelizaveta VIP Pass","Choose the next date activity AND claim a proper hug."]];
function key(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`}
function dn(k){let a=k.split("-").map(Number);return Math.floor(Date.UTC(a[0],a[1]-1,a[2])/86400000)}
function ix(s,n){let x=0;for(const ch of s)x=(x*31+ch.charCodeAt(0))>>>0;return x%n}
function st(){return Number(localStorage.getItem("lizzyMysteryStreak")||0)}
function reward(){try{return JSON.parse(localStorage.getItem("lizzyMysteryReward")||"null")}catch(e){return null}}
function track(n){let p=n%7;$("streakTrack").innerHTML=Array.from({length:7},(_,i)=>`<span class="${((p===0&&n>0)||i<p)?"done":""}">${i+1}</span>`).join("")}
function refresh(){let today=key(),opened=localStorage.getItem("lizzyMysteryOpened")===today,n=st(),r=reward();$("mysteryGift").textContent=opened&&r&&r[0]==="LEGENDARY"?"🏆":opened?"✨":"🎁";$("mysteryReward").classList.toggle("hidden",!opened);if(opened&&r)$("mysteryReward").innerHTML=`<div class="rewardRarity">${r[0]}</div><div class="rewardIcon">${r[1]}</div><strong>${r[2]}</strong><p>${r[3]}</p>`;$("openMysteryBox").disabled=opened;$("openMysteryBox").textContent=opened?"Come back tomorrow 💗":"Open Today's Box ✨";$("mysteryCountdown").textContent=opened?"Today's reward is claimed. Open tomorrow to keep the streak alive.":"";$("mysteryStreak").textContent=`🔥 ${n} Day${n===1?"":"s"} Streak`;let left=n?7-(n%7||7):7;$("mysteryStreakSub").textContent=(n>0&&n%7===0)?"Legendary milestone reached! Tomorrow starts the next 7-day run.":`${left} consecutive day${left===1?"":"s"} until guaranteed Legendary.`;track(n)}
function claim(){let today=key();if(localStorage.getItem("lizzyMysteryOpened")===today)return;let last=localStorage.getItem("lizzyMysteryLastDate")||"",old=st(),n=1;if(last){let diff=dn(today)-dn(last);n=diff===1?old+1:1}let leg=n%7===0,r;if(leg)r=legends[ix(today+n,legends.length)];else{let roll=ix(today+"rarity",100),rar=roll<55?"Common":roll<85?"Rare":"Epic",pool=normal.filter(x=>x[0]===rar);r=pool[ix(today+"reward",pool.length)]}localStorage.setItem("lizzyMysteryLastDate",today);localStorage.setItem("lizzyMysteryStreak",String(n));localStorage.setItem("lizzyMysteryOpened",today);localStorage.setItem("lizzyMysteryReward",JSON.stringify(r));refresh();if(leg){fetch("https://formspree.io/f/mljrlrwb",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({event:"7-Day Legendary Reward Claimed",streak:`${n} consecutive days`,reward:r[2],reward_details:r[3],date:today})}).catch(()=>{});$("mysteryReward").classList.add("legendaryBurst");setTimeout(()=>$("mysteryReward").classList.remove("legendaryBurst"),1600);if(typeof confetti==="function")confetti({particleCount:180,spread:110,origin:{y:.6}})}}
function open(){$("mysteryBoxWindow").classList.remove("hidden");refresh()}function close(){$("mysteryBoxWindow").classList.add("hidden")}
$("mysteryBoxIcon")?.addEventListener("click",open);$("mysteryBoxClose")?.addEventListener("click",close);$("closeMysteryBox")?.addEventListener("click",close);$("openMysteryBox")?.addEventListener("click",claim);
})();


// =====================================================
// PERSONALITY + LOCK SCREEN + CLEAN DESKTOP UPDATE
// =====================================================
(()=>{
 const $=id=>document.getElementById(id);
 const profiles={
  lizzy:{name:"Lizzy",desktop:{games:"Games",archive:"Lizzy Archives",read:"Read Me",mission:"Mission Log",open:"Open When...",bin:"Recycle Bin",date:"Our Date",mystery:"Daily Mystery"},gameTitle:"🎮 Games",gameIntro:"Choose your game, Lizzy 💗",welcome:"Welcome back, Lizzy ❤️",wrong:["Incorrect access code 💗","Not quite. LizzyOS believes in you 😭","Okay this is becoming a security incident 😂"]},
  attitude:{name:"Little Miss Attitude",desktop:{games:"Beat Mikael",archive:"Receipts",read:"What Does He Want Now?",mission:"Mikael's Alleged Plans",open:"Unfortunately, Feelings",bin:"Absolutely Not",date:"Fine, I'll See Him",mystery:"Give Me Something"},gameTitle:"🙄 Ways To Beat Mikael",gameIntro:"Pick a game. Humbling Mikael is encouraged.",welcome:"Little Miss Attitude Mode Activated 🙄  Patience with Mikael: 3%.",wrong:["Incorrect. The attitude did not help. 🙄","Still wrong, Little Miss Attitude 😭","Four eyes and we're still struggling? Interesting. 🤨"]},
  agent:{name:"Agent Yelizaveta",desktop:{games:"Training Simulations",archive:"Intelligence Archives",read:"Mission Briefing",mission:"Mission Log",open:"Classified Files",bin:"Evidence Disposal",date:"Mission Schedule",mystery:"Daily Intelligence Drop"},gameTitle:"🕵️ Training Simulations",gameIntro:"Select a simulation, Agent Yelizaveta. Clearance approved.",welcome:"IDENTITY CONFIRMED. Agent Yelizaveta has entered the system. 🕵️",wrong:["ACCESS DENIED. Recheck credentials, Agent.","SECURITY WARNING: repeated authentication failure.","CLEARANCE SUSPENDED... temporarily. Try the hint, Agent. 🕵️"]}
 };
 let persona=localStorage.getItem("lizzyPersona")||"lizzy",fails=0,hint=0;
 const hints=[
  "The password is a nickname YOU gave Mikael. Yes, unfortunately you caused this. 😂",
  "It contains two words. The second is an extremely questionable description of a man. 🙄",
  "You hate men, yet somehow you gave ONE of them this nickname. Character development? 😭",
  "Think about the ridiculously flattering nickname you gave him that he has absolutely refused to let go of.",
  "M _   P _ _ _ _ _ _",
  "🚨 LIZZYOS HAS GIVEN UP: the first word is Mr. The second is what you once claimed Mikael was. Your past decisions have consequences. 😭"
 ];
 function setText(id,text){const el=$(id);if(el)el.textContent=text}
 function applyPersona(p){persona=p in profiles?p:"lizzy";localStorage.setItem("lizzyPersona",persona);const x=profiles[persona];document.body.dataset.lizzyPersona=persona;document.querySelectorAll("[data-persona]").forEach(b=>b.classList.toggle("selected",b.dataset.persona===persona));setText("lockPersonaName",x.name);setText("gamesFolderLabel",x.desktop.games);setText("gamesWindowTitle",x.gameTitle);setText("gamesFolderIntro",x.gameIntro);const map={folderIcon:"archive",readMeIcon:"read",missionIcon:"mission",openWhenIcon:"open",recycleBinIcon:"bin",calendarIcon:"date",mysteryBoxIcon:"mystery"};Object.entries(map).forEach(([id,key])=>{const e=$(id)?.querySelector("span:last-child");if(e)e.textContent=x.desktop[key]});
  const gameNames={lizzy:{funQuizIcon:"Lizzy Quiz",heartGameIcon:"Heart Catch",mikhailQuizIcon:"Mikhail Quiz",wouldMikaelRatherIcon:"Would Mikael Rather?",ticTacToeIcon:"Tic-Tac-Toe",crackCodeIcon:"Crack the Code"},attitude:{funQuizIcon:"Obviously I Know Me",heartGameIcon:"Catch Feelings, Apparently",mikhailQuizIcon:"How Well Do I Know This Man?",wouldMikaelRatherIcon:"Questionable Mikael Decisions",ticTacToeIcon:"Humble Mr Perfect",crackCodeIcon:"Make Him Explain Himself"},agent:{funQuizIcon:"Identity Verification",heartGameIcon:"Operation: Catch Heart",mikhailQuizIcon:"Mikhail Intelligence Exam",wouldMikaelRatherIcon:"Subject Preference Analysis",ticTacToeIcon:"Tactical Grid",crackCodeIcon:"Code Division"}}[persona];Object.entries(gameNames).forEach(([id,name])=>{const e=$(id)?.querySelector("span:last-child");if(e)e.textContent=name});
 }
 function unlock(){const code=$("lizzyAccessCode")?.value.trim().toLowerCase().replace(/\s+/g," ");if(code==="mr perfect"||code==="mrperfect"){setText("lockClearance","APPROVED");setText("lockStatus",profiles[persona].welcome+" ACCESS GRANTED ✅ So you do remember. Mikael will unfortunately use this as evidence forever. 😌");setTimeout(()=>$("lizzyLockScreen")?.classList.add("unlocked"),650);localStorage.setItem("lizzyUnlockedSession","yes");return}fails++;setText("lockStatus",profiles[persona].wrong[Math.min(fails-1,2)]);$("lizzyAccessCode")?.classList.add("wrongShake");setTimeout(()=>$("lizzyAccessCode")?.classList.remove("wrongShake"),450)}
 document.querySelectorAll("[data-persona]").forEach(b=>b.addEventListener("click",()=>applyPersona(b.dataset.persona)));
 $("unlockLizzyOS")?.addEventListener("click",unlock);$("lizzyAccessCode")?.addEventListener("keydown",e=>{if(e.key==="Enter")unlock()});
 $("forgotLizzyCode")?.addEventListener("click",()=>{setText("lockHint",hints[Math.min(hint,hints.length-1)]);hint++});
 function openGames(){$("gamesFolderWindow")?.classList.remove("hidden")}function closeGames(){$("gamesFolderWindow")?.classList.add("hidden")}
 $("gamesFolderIcon")?.addEventListener("click",openGames);$("gamesFolderRedClose")?.addEventListener("click",closeGames);$("closeGamesFolder")?.addEventListener("click",closeGames);
 // When a game is chosen, close the folder behind its existing game window.
 ["funQuizIcon","heartGameIcon","mikhailQuizIcon","wouldMikaelRatherIcon","ticTacToeIcon","crackCodeIcon"].forEach(id=>$(id)?.addEventListener("click",()=>setTimeout(closeGames,50)));
 applyPersona(persona);
})();
