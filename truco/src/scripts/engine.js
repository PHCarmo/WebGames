const state = {
    view: {
        intro: document.querySelector(".intro"),
        game: document.querySelector(".game"),
        title: document.getElementById('title'),
        subtitle: document.getElementById('subtitle'),
        play: document.querySelector(".play"),
        player: {
            card1: document.getElementById('player1'),
            card2: document.getElementById('player2'),
            card3: document.getElementById('player3'),
        },
        opponent: {
            card1: document.getElementById('opponent1'),
            card2: document.getElementById('opponent2'),
            card3: document.getElementById('opponent3'),
        },
        battle: {
            player: document.getElementById('player'),
            opponent: document.getElementById('opponent'),
        },
        points: {
            player: document.getElementById('player-points'),
            opponent: document.getElementById('opponent-points'),
        },
    },
    values: {
        naipes: ["D", "S", "H", "C"],
        types: ["4", "5", "6", "7", "8", "9", "10", "12", "11", "13", "1", "2", "3"],
        cards: {
            deck: [],
            player: [],
            opponent: [],
        },
        points: {
            player: 0,
            opponent: 0,
        },
    },
    actions: {
        timerId: setInterval(undefined, 1000),
    }
};

function shuffleCards() {
    let cards = [];
    state.values.naipes.forEach(naipe => {
        for (let i = 1; i < 14; i++) {
            cards.push(naipe + i);
        }
    });
    cards = cards.sort(() => (Math.random() > 0.5 ? 2 : -1));
    state.values.cards.deck = cards;
    state.values.cards.player = [cards[0], cards[2], cards[4]];
    state.values.cards.opponent = [cards[1], cards[3], cards[5]];
}

function cleanView() {
    state.view.game.classList.remove("disappear");
    Object.values(state.view.opponent).forEach(card => {
        card.classList.add('card');
        card.classList.remove('hidden');
        card.style.backgroundImage = `url(./src/images/back.jpg)`;
    });
    Object.values(state.view.player).forEach(card => {
        card.classList.add('card');
        card.classList.add('my-card');
        card.classList.remove('hidden');
    });
    Object.values(state.view.battle).forEach(card => {
        card.style.backgroundImage = `url(./src/images/back.jpg)`;
    });
    state.values.points.player = 0;
    state.values.points.opponent = 0;
    state.view.points.opponent.innerText = state.values.points.opponent;
    state.view.points.player.innerText = state.values.points.player;
}

function startGameView() {
    state.view.intro.classList.add("disappear");
    setTimeout(() => state.view.game.classList.remove("hidden"), 1000);
    state.view.player.card1.style.backgroundImage = `url(./src/images/${state.values.cards.player[0]}.png)`;
    state.view.player.card2.style.backgroundImage = `url(./src/images/${state.values.cards.player[1]}.png)`;
    state.view.player.card3.style.backgroundImage = `url(./src/images/${state.values.cards.player[2]}.png)`;
}

function init() {
    cleanView();
    shuffleCards();
    startGameView();
}

function setEndGame() {
    state.view.game.classList.add("disappear");
    if (state.values.points.opponent > state.values.points.player) {
        state.view.title.innerText = "Derrota";
        state.view.subtitle.innerText = "Eu esperava mais de você...";
    } else {
        state.view.title.innerText = "Vitória";
        state.view.subtitle.innerText = "Impressionante!";
    }
    state.view.play.innerText = "PLAY AGAIN";
    setTimeout(() => state.view.intro.classList.remove("disappear"), 1000);
}

function setWinner(index) {
    let onaipe = state.values.naipes.indexOf(state.values.cards.opponent[index].substring(0, 1));
    let onumber = state.values.types.indexOf(state.values.cards.opponent[index].substring(1, 3));
    
    let pnaipe = state.values.naipes.indexOf(state.values.cards.player[index].substring(0, 1));
    let pnumber = state.values.types.indexOf(state.values.cards.player[index].substring(1, 3));

    if (pnumber > onumber || (pnumber === onumber && pnaipe > onaipe)) state.values.points.player++;
    else  state.values.points.opponent++;

    state.view.points.opponent.innerText = state.values.points.opponent;
    state.view.points.player.innerText = state.values.points.player;
    if (state.values.points.opponent + state.values.points.player === 3) setTimeout(() => setEndGame(), 2000);
}

function selectOpponentCard(index) {
    state.view.battle.opponent.style.backgroundImage = `url(./src/images/${state.values.cards.opponent[index]}.png)`;
    state.view.opponent['card' + (index+1)].style.backgroundImage = `url(./src/images/${state.values.cards.opponent[index]}.png)`;
}

function selectCard(index) {
    state.view.battle.player.style.backgroundImage = `url(./src/images/${state.values.cards.player[index]}.png)`;
    state.view.player['card' + (index+1)].classList.remove('my-card');
    state.view.player['card' + (index+1)].style.backgroundImage = `url(./src/images/back.jpg)`;
    selectOpponentCard(index);
    setWinner(index);
}

document.querySelector("audio").volume = 0.5;