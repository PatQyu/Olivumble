const guys=[
    {
        name: "James Edward Sevilla",
        pronouns: "He/Him",
        shortDesc: "Chinese na Fruit Vendor typa guy",
        longDesc: "Nakakatawa to liv legit, cute na mukhang chinese, nakahulog den yan ng monitor nung first day namin kay sir mon, busog ka sa tawa dito.",
        image: "srcs/783588717_1076856585031100_2661576659154829663_n.png",
        facebook: "https://www.facebook.com/sevillajames31"
    },
    {
        name: "Marc Darryl Soriano",
        pronouns: "He/Him",
        shortDesc: "Chinese na taga BGC typa guy",
        longDesc: "May 10k na bag to idek who will buy such a thing like that pero yun, magaling magrepair mapa-phone, tablet, baka pati ref kaya neto.",
        image: "srcs/639695172_26014237408228319_8704038230614982226_n.jpg", 
        facebook: "https://www.facebook.com/marcdarryl.soriano" 
    },
    {
        name: "James Christian Canoza",
        pronouns: "He/Him",
        shortDesc: "MALCOLM TODD NG PINAS",
        longDesc: "Kung gusto mo ng lalaking uuwing walang sintas ang sapatos kasi ngumanga sapatos mo eto na siya pre. Mabait, mech eng major, matalino sa physics and math.",
        image: "srcs/787619775_1265928879945550_4106308832848569810_n.jpg", 
        facebook: "https://www.facebook.com/jachr0za" 
    },
    {
        name: "Isiah Austin Angco",
        pronouns: "He/Him",
        shortDesc: "Mas matangkad pa sa Eiffel Tower",
        longDesc: "Nag-ggym? (YES) Matangkad? (YES) Matalino? (YES) Taga UP? (YES) Walang nanay? (YES). Isiah nga pala, psych major, masipag sa org, dadalhin ka neto sa sinehan ng libre.",
        image: "srcs/791245941_1721433362492391_4691195534918851881_n.jpg", 
        facebook: "https://www.facebook.com/isiahaustinangco.5555" 
    }
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffleArray(guys);
let currentIndex = 0;

const loginBtn = document.getElementById("login-button") || document.getElementById("login button");
const popup = document.getElementById("pop-up");
const continueBtn = document.getElementById("pop-up-continue");
const loginScreen = document.getElementById("login");
const mainScreen = document.getElementById("main");

const profileImg = document.getElementById("profile");
const nameEl = document.getElementById("name");
const pronounsEl = document.getElementById("pronouns");
const shortDescEl = document.querySelector("#s-description p");

const cardFront = document.getElementById("card");
const cardBack = document.getElementById("back-card");
const longDescEl = document.querySelector("#description p");

function loadProfile(index) {
    if (index >= guys.length) {
        cardFront.style.display = "none";
        cardBack.style.display = "none";
        mainScreen.innerHTML = "<h1 style='text-align:center; margin-top: 50%; color: #111;'>Ampili mo pre hahanap pa ako iba weyt lang.</h1>";
        return;
    }
    const guy = guys[index];
    profileImg.src = guy.image;
    nameEl.textContent = guy.name;
    pronounsEl.textContent = guy.pronouns;
    shortDescEl.textContent = guy.shortDesc;
    longDescEl.textContent = guy.longDesc;
    cardFront.style.display = "flex";
    cardBack.style.display = "none";
}

loginBtn.addEventListener("click", () => {
    popup.style.display = "block";
});

continueBtn.addEventListener("click", () => {
    popup.style.display = "none";
    loginScreen.style.display = "none";
    mainScreen.style.display = "flex";
    loadProfile(currentIndex);
});

mainScreen.addEventListener("click", (e) => {
    if (Math.abs(touchendX - touchstartX) < 20) {
        if (cardFront.style.display === "none") {
            cardFront.style.display = "flex";
            cardBack.style.display = "none";
        } else {
            cardFront.style.display = "none";
            cardBack.style.display = "flex";
        }
    }
});

let touchstartX = 0;
let touchendX = 0;

function handleGesture() {
    const swipeDistance = touchendX - touchstartX;
    const activeCard = cardFront.style.display === "none" ? cardBack : cardFront;
    
    if (swipeDistance > 75) {
        activeCard.classList.add("swipe-right");
        
        setTimeout(() => {
            window.location.href = guys[currentIndex].facebook;
            activeCard.classList.remove("swipe-right"); 
        }, 400);
    } 

    else if (swipeDistance < -75) {
        activeCard.classList.add("swipe-left");

        setTimeout(() => {
            currentIndex++;
            loadProfile(currentIndex);
            activeCard.classList.remove("swipe-left");
        }, 400);
    }
}

mainScreen.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

mainScreen.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleGesture();
});