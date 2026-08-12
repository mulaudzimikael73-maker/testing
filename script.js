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

    fetch("https://formspree.io/f/mgawkljk", {

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
 const URL="https://formspree.io/f/mgawkljk";
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
    let level="easy",questions=[],index=0,score=0;

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
        level=selectedLevel;questions=[...bank[level]].sort(()=>Math.random()-.5);index=0;score=0;
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
        $("openMysteryBox").disabled=opened;
        $("openMysteryBox").textContent=opened?"Come back tomorrow 💗":"Open Today's Box ✨";
        $("mysteryCountdown").textContent=opened?"Today's surprise has already been claimed. Another arrives tomorrow.":"";
    }
    function openMystery(){
        $("mysteryBoxWindow")?.classList.remove("hidden");refreshMystery();
        if(typeof unlockAchievement==="function")unlockAchievement("Daily Mystery Box Found 🎁");
    }
    function closeMystery(){$("mysteryBoxWindow")?.classList.add("hidden")}
    $("mysteryBoxIcon")?.addEventListener("click",openMystery);
    $("mysteryBoxClose")?.addEventListener("click",closeMystery);
    $("closeMysteryBox")?.addEventListener("click",closeMystery);
    $("openMysteryBox")?.addEventListener("click",()=>{
        localStorage.setItem("lizzyMysteryOpened",key());refreshMystery();
        if(typeof confetti==="function")confetti({particleCount:80,spread:85,origin:{y:.7}});
    });
})();
