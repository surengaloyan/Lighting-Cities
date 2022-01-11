//---Sorry for the bad English, I'm still learning :) 
// Here there are many BUGS and it's OK :)


//----------globals-----------
let timeleft = 0;
let player = 0;
let time = 0;

let players = [];
let cities = [];

let firstCity = 'first city';
let computer = 'computer';
let single = '1 player';
let twoPlusPlayers = '2+ players';
let youLose = 'you lose';
let back = 'back';
let playerName = 'player ';
let lang = 'eng';
let message = 'Type on english';

let MYtimer;
let mode;
let allCities = citiesENG;

// ---------key events-----------------
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            addCity()
            break;
        default:
            break;
    }
})


//--------audio---------------------
const audio = document.querySelector("#music")
const musicBtn = document.querySelector(".music-btn")

musicBtn.addEventListener('click', onOff)
function onOff() {
    musicBtn.classList.toggle('fa-volume-mute')
    musicBtn.classList.toggle('fa-music')
    if (musicBtn.classList.contains('fa-music')) {
        audio.play()
    } else {
        audio.pause()
    }
}



// go to hompage
const homeBtn = document.querySelector('.home-btn')
homeBtn.addEventListener('click', () => {
    singleControl.classList.remove('active');
    singleBox.classList.remove('active');

    hy.addEventListener('click', changeToHy);
    eng.addEventListener('click', changeToEng);
    langBar.classList.remove('passive');

    groupControl.classList.remove('active');
    groupBox.classList.remove('active');

    gamingArea.classList.remove('active');

    cityInput.disabled = false;
    addBtn.innerHTML = '<i class="fas fa-angle-double-up"></i>';

    singleBtn.value = single;
    groupBtn.value = twoPlusPlayers;

    back1 = false;
    back2 = false;

    clearInterval(MYtimer);
    loadingThumb.style.transition = "none";
    loadingThumb.classList.remove('active');
    cities = [];
    players = [];
    player = 0;
    citiesList.innerHTML = '';
    lastCity.innerHTML = firstCity;
    cityInput.value = '';
})


//-----------show/hide main box and control box------------------
const singleBtn = document.querySelector("#single")
const groupBtn = document.querySelector("#group")

const singleBox = document.querySelector(".box1")
const groupBox = document.querySelector(".box2")

const singleControl = document.querySelector(".single-control")
const groupControl = document.querySelector(".group-control")

let back1 = false;
singleBtn.addEventListener('click', () => {
    if (!back1) {
        singleBtn.value = back;
        back1 = true;
    }
    else {
        singleBtn.value = single;
        back1 = false;
    }
    groupBox.classList.toggle('active');
    singleControl.classList.toggle('active');
})


let back2 = false;
groupBtn.addEventListener('click', () => {
    if (!back2) {
        groupBtn.value = back;
        back2 = true;
    }
    else {
        groupBtn.value = twoPlusPlayers;
        back2 = false;
    }
    singleBox.classList.toggle('active');
    groupControl.classList.toggle('active');
})


//-------check group players count-----------------------
let countBtns = document.querySelectorAll(".check-count")
const playerList = document.querySelector(".player-names")

for (let i = 1; i < countBtns.length; i++) {
    countBtns[i].addEventListener('click', () => {
        playerList.innerHTML = '';
        for (let j = 0; j < countBtns.length; j++) {
            if (j <= i && i >= 1) {
                let listItem = document.createElement('input')
                listItem.type = 'text';
                listItem.value = playerName + (j + 1);
                listItem.classList.add('inp-show')
                playerList.appendChild(listItem)

                countBtns[j].classList.add('active')
            } else {
                countBtns[j].classList.remove('active')
            }

        }
    })

}


//------start single game---------------------

const timingInput = document.querySelector('#time')
const singleStart = document.querySelector("#single-start")


singleStart.addEventListener('click', () => {
    blockLang();
    player = 0;
    timeleft = timingInput.innerHTML;
    time = timeleft;
    mode = single;
    // get player's names 
    players.push(document.querySelector('#name').value);
    players.push(computer);
    playerContainer.innerHTML = players[player];

    // show gaming area
    gamingArea.classList.add('active')
    singleControl.classList.remove('active');
    singleBox.classList.add('active');
    setTimeout(() => {
        loadingThumb.style.transition = "all " + timeleft + "s linear";
        loadingThumb.classList.add('active')
    }, 00);


    // timer
    MYtimer = setInterval(timer, 1000);
})


//------start group game---------------------

const gamingArea = document.querySelector('.gaming-area')
const timingInput2 = document.querySelector('#time2')
const loadingThumb = document.querySelector('.loading-thumb')
const groupStart = document.querySelector("#group-start")
const playerContainer = document.querySelector('.player-container')


groupStart.addEventListener('click', () => {
    blockLang();

    timeleft = timingInput2.innerHTML;
    time = timeleft;
    mode = 'group';
    // get player's names 
    players = document.querySelectorAll('.inp-show');
    playerContainer.innerHTML = players[player++].value;

    // show gaming area
    gamingArea.classList.add('active')
    groupControl.classList.remove('active');
    groupBox.classList.add('active');
    setTimeout(() => {
        loadingThumb.style.transition = "all " + timeleft + "s linear";
        loadingThumb.classList.add('active')
    }, 00);


    // timer
    MYtimer = setInterval(timer, 1000);


})

const addBtn = document.querySelector('#add-btn')
const lastCity = document.querySelector('.last-city')
const cityInput = document.querySelector('.enter-city')
const citiesList = document.querySelector('.cities-list')

addBtn.addEventListener('click', addCity)

//------check and add city name----------------------

function addCity() {
    if (mode == 'group') {//----------------------GROUP GAME------------------------   
        if (addBtn.innerHTML == '<i class="fas fa-angle-double-up"></i>') {
            if (!cityInput.value.trim()) return;

            // clear the loading thumb
            loadingThumb.style.transition = "none";
            loadingThumb.classList.remove('active');
            if (!checkLang(cityInput.value)) {
                lastCity.innerHTML = message;
                time = timeleft;
                setTimeout(() => {
                    loadingThumb.style.transition = "all " + timeleft + "s linear";
                    loadingThumb.classList.add('active')
                }, 000);
            } else {
                if (cities.length == 0) { // first city
                    if (checkInArr(cityInput.value)) {
                        cities.push(cityInput.value.toLowerCase());
                        lastCity.innerHTML = cityInput.value;

                        time = timeleft;
                        setTimeout(() => {
                            loadingThumb.style.transition = "all " + timeleft + "s linear";
                            loadingThumb.classList.add('active')
                        }, 000);

                        if (player == players.length) player = 0;
                        playerContainer.innerHTML = players[player++].value

                        let list = document.createElement('li');
                        list.innerHTML = cityInput.value;
                        citiesList.appendChild(list);
                    } else (lose())
                } else { //----------second city-----------------
                    let right = true;
                    //get of last city's last letter
                    let index = cities[cities.length - 1].length - 1;
                    let str = cities[cities.length - 1][index];
                    //check the city in cities array
                    for (let i = 0; i < cities.length; i++) {
                        if (cityInput.value == cities[i]) right = false;
                    }

                    if (right && cityInput.value[0].toLowerCase() == str.toLowerCase() && checkInArr(cityInput.value)) {// if it's OK 
                        cities.push(cityInput.value.toLowerCase());
                        lastCity.innerHTML = cityInput.value;
                        time = timeleft;

                        // start loading
                        setTimeout(() => {
                            loadingThumb.style.transition = "all " + timeleft + "s linear";
                            loadingThumb.classList.add('active');
                        }, 000);

                        if (player == players.length) player = 0;
                        playerContainer.innerHTML = players[player++].value;

                        // add the city's list item in cities list
                        let list = document.createElement('li');
                        list.innerHTML = cityInput.value;
                        citiesList.appendChild(list);
                    } else {
                        lose()
                    }
                }
            }
        } else {
            // restart
            loadingThumb.style.transition = "none";
            loadingThumb.classList.remove('active');
            player = 0;
            time = timeleft;
            citiesList.innerHTML = '';
            MYtimer = setInterval(timer, 1000);
            playerContainer.innerHTML = players[player++].value;
            cityInput.disabled = false;
            cities = [];
            lastCity.innerHTML = firstCity;
            addBtn.innerHTML = '<i class="fas fa-angle-double-up"></i>';
            setTimeout(() => {
                loadingThumb.style.transition = "all " + timeleft + "s linear";
                loadingThumb.classList.add('active');
            }, 000)
        }
        cityInput.value = '';
    } else {//----------------SINGLE GAME-------------------------
        if (addBtn.innerHTML == '<i class="fas fa-angle-double-up"></i>') {
            if (!cityInput.value.trim()) return;
            // clear the loading thumb
            loadingThumb.style.transition = "none";
            loadingThumb.classList.remove('active')

            if (!checkLang(cityInput.value)) {
                lastCity.innerHTML = message;
                time = timeleft;
                setTimeout(() => {
                    loadingThumb.style.transition = "all " + timeleft + "s linear";
                    loadingThumb.classList.add('active')
                }, 000);
            } else {
                if (checkInArr(cityInput.value)) {
                    if (cities.length == 0) { // first city
                        cities.push(cityInput.value.toLowerCase())
                        lastCity.innerHTML = cityInput.value;

                        time = timeleft;
                        setTimeout(() => {
                            loadingThumb.style.transition = "all " + timeleft + "s linear";
                            loadingThumb.classList.add('active')
                        }, 000);

                        player++
                        if (player == players.length) player = 0;
                        playerContainer.innerHTML = players[player]

                        let list = document.createElement('li');
                        list.innerHTML = cityInput.value;
                        citiesList.appendChild(list)
                        setTimeout(() => {
                            computerPlay()
                        }, 1000);
                    }
                    else { //----------second city-----------------
                        let right = true;
                        //get of last city's last letter
                        let index = cities[cities.length - 1].length - 1;
                        let str = cities[cities.length - 1][index];
                        //check the city in cities array
                        for (let i = 0; i < cities.length; i++) {
                            if (cityInput.value.toLowerCase() == cities[i]) right = false;
                        }

                        if (right && cityInput.value[0].toLowerCase() == str.toLowerCase() && checkInArr(cityInput.value)) {// if it's OK 
                            cities.push(cityInput.value.toLowerCase());
                            lastCity.innerHTML = cityInput.value;
                            time = timeleft;
                            // start loading
                            setTimeout(() => {
                                loadingThumb.style.transition = "all " + timeleft + "s linear";
                                loadingThumb.classList.add('active');
                            }, 000);

                            player++;
                            if (player == players.length) player = 0;
                            playerContainer.innerHTML = players[player];

                            // add the city's list item in cities list
                            let list = document.createElement('li');
                            list.innerHTML = cityInput.value;
                            citiesList.appendChild(list);
                            setTimeout(() => {
                                computerPlay()
                            }, 1000);
                        } else {
                            lose()
                        }
                    }
                } else { lose() }
            }
        } else {
            // restart
            loadingThumb.style.transition = "none";
            loadingThumb.classList.remove('active');
            player = 0;
            time = timeleft;
            citiesList.innerHTML = '';
            MYtimer = setInterval(timer, 1000);
            playerContainer.innerHTML = players[player];
            cities = [];
            cityInput.disabled = false;
            lastCity.innerHTML = firstCity;
            addBtn.innerHTML = '<i class="fas fa-angle-double-up"></i>';
            setTimeout(() => {
                loadingThumb.style.transition = "all " + timeleft + "s linear";
                loadingThumb.classList.add('active');
            }, 000)
        }
        cityInput.value = '';
    }
}

// lost process
function lose() {
    lastCity.innerHTML = youLose;
    addBtn.innerHTML = '<i class="fas fa-redo"></i>';
    cityInput.disabled = true;
    clearInterval(MYtimer);
}

// timer
function timer() {
    time--;
    if (time == 0) {
        clearInterval(MYtimer)
        lose()
    }
}

//check in Cities Name's array
function checkInArr(text) {
    for (let i = 0; i < allCities.length; i++) {
        if (allCities[i].toLowerCase() == text.toLowerCase()) {
            return true;
        }
    }
    return false;

}

// computer
function computerPlay() {
    let getStr = '';
    let i = 0;
    while (getStr == '') {
        for (let j = 0; j < cities.length; j++) {
            let index = cities[cities.length - 1].length - 1;
            let str = cities[cities.length - 1][index];
            if (allCities[i] != cities[j] && allCities[i][0].toLowerCase() == str.toLowerCase()) {
                getStr = allCities[i].toLowerCase();
                break;
            }
        }
        i++;
    }

    cities.push(getStr);
    lastCity.innerHTML = getStr;
    time = timeleft;

    // start loading
    setTimeout(() => {
        loadingThumb.style.transition = "all " + timeleft + "s linear";
        loadingThumb.classList.add('active');
    }, 000);

    player++
    if (player == players.length) player = 0;
    playerContainer.innerHTML = players[player];

    // add the city's list item in cities list
    let list = document.createElement('li');
    list.innerHTML = getStr;
    citiesList.appendChild(list);
}

//check typing language
function checkLang(text) {
    if (lang == 'hy') {
        if (text.charCodeAt(0) >= 1329 && text.charCodeAt(0) <= 1414) {
            return true;
        } else {
            return false;
        }
    } else {
        if (text.charCodeAt(0) >= 65 && text.charCodeAt(0) <= 122) {
            return true;
        } else {
            return false;
        }
    }
}


// plus or minus the timeleft ----group-----

let groupPlus = document.querySelector('.plus2')
let groupMinus = document.querySelector('.minus2')

groupMinus.addEventListener('click', () => {
    groupPlus.classList.remove('passive')
    if (timingInput2.innerHTML > 5) {
        timingInput2.innerHTML -= 5
        if (timingInput2.innerHTML == 5) {
            groupMinus.classList.add('passive')
        }
    } else {
        groupMinus.classList.add('passive')
    }
})

groupPlus.addEventListener('click', () => {
    groupMinus.classList.remove('passive')
    if (timingInput2.innerHTML < 90) {
        timingInput2.innerHTML = +timingInput2.innerHTML + 5;
        if (timingInput2.innerHTML == 90) {
            groupPlus.classList.add('passive')
        }
    } else {
        groupPlus.classList.add('passive')
    }
})




// plus or minus the timeleft ----single-----

let singlePlus = document.querySelector('.plus1')
let singleMinus = document.querySelector('.minus1')

singleMinus.addEventListener('click', () => {
    singlePlus.classList.remove('passive')
    if (timingInput.innerHTML > 5) {
        timingInput.innerHTML -= 5
        if (timingInput.innerHTML == 5) {
            singleMinus.classList.add('passive')
        }
    } else {
        singleMinus.classList.add('passive')
    }
})

singlePlus.addEventListener('click', () => {
    singleMinus.classList.remove('passive')
    if (timingInput.innerHTML < 90) {
        timingInput.innerHTML = +timingInput.innerHTML + 5;
        if (timingInput.innerHTML == 90) {
            singlePlus.classList.add('passive')
        }
    } else {
        singlePlus.classList.add('passive')
    }
})




//-----shange interface language-----------
const hy = document.querySelector('.hy');
const eng = document.querySelector('.eng');

const playersCount = document.querySelector('.players-count');
const yourName = document.querySelector('.your-name');
const listH3 = document.querySelector('.info-bar h3');
const logo = document.querySelector('.logo');
let checkTime = document.querySelectorAll('.check-time');
const player1Inp = document.querySelector('.p1');
const player2Inp = document.querySelector('.p2');
const pName = document.querySelector('#name');

hy.addEventListener('click', changeToHy);
eng.addEventListener('click', changeToEng);


function changeToHy() {
    hy.classList.add('active')
    eng.classList.remove('active')

    lang = 'hy';
    allCities = citiesHY;
    firstCity = 'Առաջին քաղքաը';
    computer = 'Համակարգիչ';
    single = '1 խաղացող';
    twoPlusPlayers = '2+ խաղացողներ';
    youLose = 'Դուք պարտվեցիք';
    playerName = 'խաղացող ';
    back = 'հետ';
    message = 'Գրեք հայատառ';
    pName.value = 'խաղացող';
    groupStart.value = 'սկսել';
    singleStart.value = 'սկսել';
    player1Inp.value = 'խաղացող 1';
    player2Inp.value = 'խաղացող 2';
    logo.innerHTML = 'լուսավոր քաղաքներ';
    listH3.innerHTML = 'քաղաքների ցանկը';
    yourName.innerHTML = 'ընտրեք ձեր անունը';
    playersCount.innerHTML = 'ընտրեք խաղացողների քանակը';
    checkTime.forEach((elem) => { elem.innerHTML = 'ընտրեք ժամանակը' })

    if (lastCity.innerHTML == 'first city') lastCity.innerHTML = firstCity
    changeLang()
}

function changeToEng() {
    eng.classList.add('active');
    hy.classList.remove('active');

    lang = 'eng';
    allCities = citiesENG;
    firstCity = 'first city';
    computer = 'computer';
    single = '1 player';
    twoPlusPlayers = '2+ players';
    youLose = 'you lose';
    playerName = 'player '
    back = 'back'
    message = 'Type on english';
    pName.value = 'player'
    groupStart.value = 'start'
    singleStart.value = 'start'
    player1Inp.value = 'player 1'
    player2Inp.value = 'player 2'
    logo.innerHTML = 'Lighting Cities'
    listH3.innerHTML = 'cities list'
    yourName.innerHTML = 'enter your name'
    playersCount.innerHTML = 'check players count'
    checkTime.forEach((elem) => { elem.innerHTML = 'check the timeleft' })
    if (lastCity.innerHTML == 'Առաջին քաղքաը') lastCity.innerHTML = firstCity

    changeLang()
}

function changeLang() {
    singleBtn.value = single
    groupBtn.value = twoPlusPlayers

    if (back1) {
        singleBtn.value = back;
    }
    else {
        singleBtn.value = single;
    }
    if (back2) {
        groupBtn.value = back;
    }
    else {
        groupBtn.value = twoPlusPlayers;
    }

    let playersNames = document.querySelectorAll('.inp-show')
    for (let i = 0; i < playersNames.length; i++) {
        playersNames[i].value = playerName + (i + 1);
    }
}
//block the language changer
const langBar = document.querySelector('.lang');
function blockLang() {
    if (lang == 'eng') {
        hy.removeEventListener('click', changeToHy);
    } else {
        eng.removeEventListener('click', changeToEng);
    }
    langBar.classList.add('passive');
}