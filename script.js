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
// LIZZYOS — LIVING DESKTOP MERGE
// Built on top of the current Quiz + Game version.
// =====================================================
(() => {
    const $ = id => document.getElementById(id);
    const qsa = sel => [...document.querySelectorAll(sel)];
    const store = localStorage;

    const moods = {
        "Lizzy": {label:"💗 Mood: Soft Pink", cls:"mood-lizzy", model:"Lizzy Pro 💗", quote:"Powered by kindness, pink, pasta and the ability to make ordinary days better."},
        "Little Miss Attitude": {label:"😏 Mood: Maximum Attitude", cls:"mood-attitude", model:"Little Miss Attitude Pro Max 😏", quote:"Warning: sass is a permanent system feature and cannot be uninstalled."},
        "Agent Yelizaveta": {label:"🕵️ Mood: Classified", cls:"mood-agent", model:"Agent Yelizaveta — Classified Edition", quote:"Security clearance confirmed. Bowling intelligence remains deeply concerning."}
    };
    const warnings = {
        "Lizzy":[["Beauty Limit Reached","LizzyOS cannot calculate a higher value. Please stop being so pretty. 💗"],["Cuteness Alert","A suspicious amount of cuteness has been detected."]],
        "Little Miss Attitude":[["Attitude Spike Detected","Sass levels have exceeded the recommended daily allowance. 😏"],["Low Patience Warning","Mikhail should proceed with extreme caution."]],
        "Agent Yelizaveta":[["SECURITY ALERT","Agent Mikhail has been detected nearby. Threat level: probably annoying."],["CLASSIFIED WARNING","Excessive beauty has compromised facial-recognition accuracy."]]
    };
    const genericWarnings = [["SYSTEM ERROR","Beauty value exceeds supported range."],["BOWLING ALERT","Opponent skill level detected: unnecessarily high. 🎳"],["MEMORY WARNING","Too many cute moments are being stored. Extra heart space allocated. ❤️"]];

    const persona = () => store.getItem("lizzyPersona") || "Agent Yelizaveta";

    function applyMood(){
        const p=persona(), m=moods[p]||moods["Agent Yelizaveta"];
        document.body.classList.remove("mood-lizzy","mood-attitude","mood-agent");
        document.body.classList.add(m.cls);
        if($("desktopMoodLabel")) $("desktopMoodLabel").textContent=m.label;
        if($("aboutLizzyModel")) $("aboutLizzyModel").textContent=m.model;
        if($("aboutCurrentUser")) $("aboutCurrentUser").textContent=p;
        if($("aboutQuote")) $("aboutQuote").textContent=m.quote;
        if($("mailFrom")) $("mailFrom").value=p;
        if($("composeGreeting")) $("composeGreeting").textContent=p==="Agent Yelizaveta"?"Secure Message to Agent Mikhail ❤️":p==="Little Miss Attitude"?"Fine... message Mikhail 🙄❤️":"Message Mikhail ❤️";
    }
    qsa("[data-persona]").forEach(b=>b.addEventListener("click",()=>setTimeout(applyMood,0)));

    // Night mode: automatic after 19:00, with manual toggle.
    let manualNight=store.getItem("lizzyNightMode");
    const autoNight=()=>{const h=new Date().getHours();return h>=19||h<6};
    function applyNight(force){
        const night=typeof force==="boolean"?force:manualNight==="on"?true:manualNight==="off"?false:autoNight();
        document.body.classList.toggle("lizzy-night",night);
        if($("nightStatus")) $("nightStatus").textContent=night?"🌙 Night":"☀️ Day";
        if($("nightModeEmoji")) $("nightModeEmoji").textContent=night?"☀️":"🌙";
    }
    $("nightModeIcon")?.addEventListener("click",()=>{const next=!document.body.classList.contains("lizzy-night");manualNight=next?"on":"off";store.setItem("lizzyNightMode",manualNight);applyNight(next)});
    $("nightStatus")?.addEventListener("dblclick",()=>{manualNight=null;store.removeItem("lizzyNightMode");applyNight();showWarning("Automatic Night Mode","LizzyOS will switch automatically after 7 PM. 🌙")});

    // About
    $("aboutLizzyIcon")?.addEventListener("click",()=>{applyMood();$("aboutLizzyWindow")?.classList.remove("hidden")});
    ["closeAboutLizzy","aboutLizzyRedClose"].forEach(id=>$(id)?.addEventListener("click",()=>$("aboutLizzyWindow")?.classList.add("hidden")));

    // Mail
    const inbox=[
        {id:"welcome",from:"Mikhail Petrov",subject:"Just in case you forgot ❤️",date:"Pinned",body:"You are kind, smart, beautiful, stunning and one of my favourite people to annoy. Some facts shouldn't be allowed to expire."},
        {id:"mission",from:"Agent Mikhail Petrov",subject:"Mission Control Update 🕵️",date:"Classified",body:"Agent Yelizaveta: your current mission is to continue being suspiciously good at bowling while pretending this is normal behaviour."}
    ];
    const readSet=()=>new Set(JSON.parse(store.getItem("lizzyMailRead")||"[]"));
    function updateUnread(){
        const n=inbox.filter(m=>!readSet().has(m.id)).length;
        if($("mailUnreadBadge")){$("mailUnreadBadge").textContent=n;$("mailUnreadBadge").classList.toggle("hidden",n===0)}
        if($("mailInboxCount")) $("mailInboxCount").textContent=n;
    }
    function renderInbox(){
        const list=$("mailInboxList"); if(!list)return; const read=readSet();
        list.innerHTML=inbox.map(m=>`<article class="mailMessage ${read.has(m.id)?"":"unread"}" data-lmail="${m.id}"><div class="mailMessageTop"><strong>${m.from}</strong><span>${m.date}</span></div><h4>${m.subject}</h4><p>${m.body}</p></article>`).join("");
        qsa("[data-lmail]").forEach(card=>card.onclick=()=>{const r=readSet();r.add(card.dataset.lmail);store.setItem("lizzyMailRead",JSON.stringify([...r]));card.classList.remove("unread");updateUnread()});
        updateUnread();
    }
    const sent=()=>JSON.parse(store.getItem("lizzySentMail")||"[]");
    function renderSent(){const l=$("mailSentList");if(!l)return;const s=sent();l.innerHTML=s.length?s.map(m=>`<article class="mailMessage"><div class="mailMessageTop"><strong>${m.from}</strong><span>${m.date}</span></div><h4>${m.subject||"No subject"}</h4><p>${m.body}</p></article>`).join(""):`<div class="emptyMail">No messages sent from this device yet. 💗</div>`}
    function mailView(v){
        ["inbox","compose","sent"].forEach(n=>{const id="mail"+n[0].toUpperCase()+n.slice(1)+"View";$(id)?.classList.toggle("hidden",n!==v)});
        qsa(".mailNav").forEach(b=>b.classList.toggle("active",b.dataset.mailView===v));
        if(v==="sent")renderSent(); if(v==="compose")applyMood();
    }
    qsa("[data-mail-view]").forEach(b=>b.onclick=()=>mailView(b.dataset.mailView));
    $("mailIcon")?.addEventListener("click",()=>{applyMood();renderInbox();mailView("inbox");$("mailWindow")?.classList.remove("hidden")});
    ["closeMail","mailRedClose"].forEach(id=>$(id)?.addEventListener("click",()=>$("mailWindow")?.classList.add("hidden")));

    $("sendLizzyMail")?.addEventListener("click",async()=>{
        const from=persona(),subject=($("mailSubject")?.value||"").trim(),body=($("mailBody")?.value||"").trim(),status=$("mailSendStatus"),button=$("sendLizzyMail");
        if(!body){if(status)status.textContent="Write something first 😭";return}
        if(button)button.disabled=true;if(status)status.textContent="Sending securely to Mikhail...";
        try{
            const r=await fetch("https://formspree.io/f/mzdnaree",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({message:`💌 LizzyOS message from ${from}\nSubject: ${subject||"(No subject)"}\n\n${body}`,sender:from,subject:subject||"LizzyOS Message"})});
            if(!r.ok)throw new Error("send failed");
            const s=sent();s.unshift({from,subject,body,date:new Date().toLocaleString("en-ZA",{dateStyle:"medium",timeStyle:"short"})});store.setItem("lizzySentMail",JSON.stringify(s.slice(0,30)));
            $("mailSubject").value="";$("mailBody").value="";if(status)status.textContent="Sent to Mikhail ❤️";showWarning("Message Delivered 💌","Mikhail has officially been notified.");
        }catch(e){if(status)status.textContent="Couldn't send right now. Try again in a moment."}finally{if(button)button.disabled=false}
    });

    // Fake warnings
    let wt;
    function showWarning(title,message){const w=$("fakeWarning");if(!w)return;clearTimeout(wt);$("warningTitle").textContent=title;$("warningMessage").textContent=message;w.classList.remove("hidden");requestAnimationFrame(()=>w.classList.add("show"));wt=setTimeout(hideWarning,6500)}
    function hideWarning(){const w=$("fakeWarning");if(!w)return;w.classList.remove("show");setTimeout(()=>w.classList.add("hidden"),350)}
    $("dismissWarning")?.addEventListener("click",hideWarning);
    function randomWarning(){const opts=[...genericWarnings,...(warnings[persona()]||[])],x=opts[Math.floor(Math.random()*opts.length)];showWarning(x[0],x[1])}
    setTimeout(()=>{if($("desktopArea")&&!$("desktopArea").classList.contains("hidden"))randomWarning()},22000);
    setInterval(()=>{if($("desktopArea")&&!$("desktopArea").classList.contains("hidden")&&Math.random()<.55)randomWarning()},65000);

    renderInbox();renderSent();applyMood();applyNight();setInterval(()=>{if(!manualNight)applyNight()},60000);
})();


// =====================================================
// LIZZYOS V5 — FULL PERSONALITY ENGINE
// Built cumulatively on Master V4.
// =====================================================
(() => {
    const $ = id => document.getElementById(id);
    const qsa = s => [...document.querySelectorAll(s)];
    const store = localStorage;

    const personalities = {
        "Lizzy": {
            sample: "Hi Lizzy 💗 Everything is working perfectly. Also, system diagnostics say you're pretty today. Again.",
            login: "Welcome back, Lizzy 💗",
            gameOpen: "Okay Lizzy, be nice to the high score. 💗",
            quizRight: "Correct 💗 Obviously.",
            quizWrong: "Almost! LizzyOS is pretending not to notice.",
            heartHigh: "Okayyy heart thief 💗 That was actually impressive.",
            heartLow: "Cute attempt 💗 Agent Mikhail still approves.",
            bin: "These nicknames have been respectfully deleted for your peace and happiness. 💗"
        },
        "Little Miss Attitude": {
            sample: "🙄 LizzyOS is online. Try not to break anything, Little Miss Attitude.",
            login: "Oh great. Little Miss Attitude is back. 😏",
            gameOpen: "Try not to become unbearable if you beat the high score. 😏",
            quizRight: "Fine. You got it right. Don't get smug.",
            quizWrong: "Wrong 😂 Apparently attitude does not count as intelligence points.",
            heartHigh: "Of course you had to overachieve 🙄💗",
            heartLow: "That score was very... humble. 😂",
            bin: "Little Miss Attitude personally requested these names be permanently deleted. Complaints will be ignored."
        },
        "Agent Yelizaveta": {
            sample: "CLEARANCE CONFIRMED. 🕵️ Agent Yelizaveta, all systems operational. Agent Mikhail remains under surveillance.",
            login: "AGENT YELIZAVETA ONLINE — clearance confirmed. 🕵️",
            gameOpen: "MISSION ACTIVE. High-score intelligence has been classified.",
            quizRight: "INTELLIGENCE VERIFIED. Correct answer.",
            quizWrong: "MISSION ERROR. Intelligence requires recalibration.",
            heartHigh: "MISSION SUCCESS. Heart acquisition level: elite. 💗",
            heartLow: "MISSION INCOMPLETE. Agent Yelizaveta is authorised for another attempt.",
            bin: "CLASSIFIED DISPOSAL UNIT: prohibited aliases have been contained."
        }
    };

    const persona = () => store.getItem("lizzyPersona") || "Agent Yelizaveta";
    const text = () => personalities[persona()] || personalities["Agent Yelizaveta"];

    function applyPersonality(){
        const p=persona();
        document.body.dataset.personality=p;

        if($("personalitySample")) $("personalitySample").textContent=text().sample;

        // About This Lizzy profile details.
        const model=$("aboutLizzyModel"), quote=$("aboutQuote");
        if(model){
            model.textContent = p==="Lizzy" ? "Lizzy Pro 💗" :
                p==="Little Miss Attitude" ? "Little Miss Attitude Pro Max 😏" :
                "Agent Yelizaveta — Classified Edition";
        }
        if(quote){
            quote.textContent = p==="Lizzy" ?
                "Powered by kindness, pink, pasta and an unreasonable amount of prettiness." :
                p==="Little Miss Attitude" ?
                "Sass is a permanent system feature and cannot be uninstalled. Mikhail has tried." :
                "Security clearance confirmed. Agent Mikhail remains under observation.";
        }

        // Mail personality.
        if($("composeGreeting")){
            $("composeGreeting").textContent = p==="Lizzy" ? "Send Mikhail something cute 💗" :
                p==="Little Miss Attitude" ? "Fine... message Mikhail 🙄❤️" :
                "SECURE COMMS: Agent Mikhail 🕵️";
        }

        // Existing game intros.
        const heartIntro=document.querySelector("#heartCatchWindow .memoryMessage");
        if(heartIntro) heartIntro.textContent =
            p==="Lizzy" ? "Catch as many hearts as you can before the timer runs out 💗" :
            p==="Little Miss Attitude" ? "Catch the hearts. Try not to act too impressed with yourself 😏" :
            "MISSION OBJECTIVE: acquire maximum heart units before countdown expiry.";

        const quizIntro=document.querySelector("#funQuizWindow .memoryMessage");
        if(quizIntro) quizIntro.textContent =
            p==="Lizzy" ? "A very cute and extremely scientific test of your LizzyOS knowledge. 💗" :
            p==="Little Miss Attitude" ? "Five questions. Let's see if the attitude comes with answers. 😏" :
            "INTELLIGENCE ASSESSMENT: five questions. Clearance score pending.";
    }

    function selectPersona(name){
        store.setItem("lizzyPersona",name);

        // Reuse the current site's original selector if present so all old behavior remains synced.
        const old=document.querySelector(`[data-persona="${name}"]`);
        if(old) old.click();

        applyPersonality();

        // Brief personality-specific system acknowledgement.
        const message = name==="Lizzy" ? "Lizzy Mode activated 💗 Everything just got softer." :
            name==="Little Miss Attitude" ? "Little Miss Attitude Mode activated 😏 Mikhail has been warned." :
            "AGENT YELIZAVETA MODE ACTIVE 🕵️ Secure systems engaged.";

        if(typeof window.showToast==="function") window.showToast(message);
        else {
            const sample=$("personalitySample");
            if(sample) sample.textContent=message;
            setTimeout(applyPersonality,1800);
        }
    }

    $("personalityIcon")?.addEventListener("click",()=>{
        applyPersonality();
        $("personalityWindow")?.classList.remove("hidden");
    });
    ["closePersonality","personalityRedClose"].forEach(id =>
        $(id)?.addEventListener("click",()=>$("personalityWindow")?.classList.add("hidden"))
    );
    qsa("[data-v5-persona]").forEach(btn =>
        btn.addEventListener("click",()=>selectPersona(btn.dataset.v5Persona))
    );

    // Keep personality synced when original identity buttons are used.
    qsa("[data-persona]").forEach(btn =>
        btn.addEventListener("click",()=>setTimeout(applyPersonality,30))
    );

    // Personality reactions when opening games.
    $("funQuizIcon")?.addEventListener("click",()=>{
        setTimeout(()=>{
            const f=$("funQuizFeedback");
            if(f && !f.textContent) f.textContent=text().gameOpen;
        },100);
    });
    $("heartGameIcon")?.addEventListener("click",()=>{
        const arena=$("heartCatchArena");
        if(arena && !arena.querySelector(".catchableHeart") && !arena.textContent.includes("Mission Complete")){
            const start=arena.querySelector(".gameStartMessage");
            if(start) start.innerHTML=`${text().gameOpen}<br><small>Press Start Mission 💗</small>`;
        }
    });

    // Recycle Bin personality subtitle if current bin window exists.
    const binIcon=$("binIcon");
    if(binIcon){
        binIcon.addEventListener("click",()=>{
            setTimeout(()=>{
                const bin=$("binWindow");
                if(!bin) return;
                let note=bin.querySelector(".personalityBinNote");
                if(!note){
                    note=document.createElement("p");
                    note.className="personalityBinNote memoryMessage";
                    const scroll=bin.querySelector(".windowScroll");
                    if(scroll) scroll.prepend(note);
                }
                if(note) note.textContent=text().bin;
            },50);
        });
    }

    // Add persona line to quiz feedback without replacing existing correct/wrong content.
    const quizAnswers=$("funQuizAnswers");
    if(quizAnswers){
        quizAnswers.addEventListener("click",e=>{
            if(!e.target.closest("[data-fq-answer]")) return;
            setTimeout(()=>{
                const f=$("funQuizFeedback");
                if(!f) return;
                const chosen=e.target.closest("[data-fq-answer]");
                const isCorrect=chosen.classList.contains("answerCorrect");
                if(f.textContent && !f.textContent.includes(" • ")) f.textContent += " • " + (isCorrect?text().quizRight:text().quizWrong);
            },80);
        });
    }

    applyPersonality();
})();


// =====================================================
// OUR DATE FOLDER — RANDOM MESSAGES + CLEAN FIRST RUN
// =====================================================
(() => {
 const $=id=>document.getElementById(id);
 const URL="https://formspree.io/f/mzdnaree";
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
