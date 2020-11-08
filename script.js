function createDeck() {
    let suits = ['diamonds','hearts','clubs','spades'];
    let deck = [];
    let obj = {};
    suits.forEach((suit) => {
        for(i=2;i<15;i++){
            obj = {rank: i, suit: suit, value: i};
            deck.push(obj);
        }
    })

    deck.forEach((item) => {
        
        switch(item.rank){
            case 11:
                item.rank = 'ace';
                item.value = 1;
                break;
            case 12:
                item.rank = 'jack';
                item.value = 10;
                break;
            case 13:
                item.rank = 'queen';
                item.value = 10;
                break;
            case 14:
                item.rank = 'king';
                item.value = 10;
                break
        }
    })

    //Shuffle the deck
    for(let i = deck.length-1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }

    return deck;
}

function deal(deck){   
    appendItemsToDom(buildInitialDeal(deck));
    moveCards();
    displayScore('player');
    displayPlayButtons();
}

function displayScore(person) {
    scoreDiv = document.querySelector(`.${person}-score`)
    scoreDiv.classList.remove('hidden');
}

function updateScore(score){
    let scoreDiv = document.querySelector('.player-score');
    let presentScore = parseInt(scoreDiv.innerText);
    presentScore += score;
    scoreDiv.innerText = presentScore;
    if(presentScore > 21) {
        console.log('Player Busts')   
    } else if(presentScore == 21) {
        console.log('Player Blackjack')
    }   
}

function buildInitialDeal(deck){
    let playerDeck = [];
    let dealerDeck = [];
    let card;
    let playerScore = 0;
    let dealerScore = 0;
    let body = document.querySelector('body');

    for(i=0;i<2;i++) {
        card = deck.pop();
        card.person = 'player';
        playerDeck.push(card)
        playerScore += card.value
    }

    for(i=0;i<2;i++) {
        card = deck.pop();
        card.person = 'dealer';
        dealerDeck.push(card)
        dealerScore += card.value
    }
    
    //Create initial score
    playerScoreDisplay = document.createElement('div');
    dealerScoreDisplay = document.createElement('div');
    playerScoreDisplay.classList.add('player-score', 'hidden');
    dealerScoreDisplay.classList.add('dealer-score', 'hidden');
    playerScoreDisplay.innerText = playerScore;
    dealerScoreDisplay.innerText = dealerScore;
    body.append(playerScoreDisplay);
    body.append(dealerScoreDisplay);

    let dealerAndPlayerDeck =[];  
    dealerAndPlayerDeck.push(playerDeck);
    dealerAndPlayerDeck.push(dealerDeck);
    return dealerAndPlayerDeck;
}

function appendItemsToDom(deck){
    let rank;
    let suit;
    let img; 
    let body = document.querySelector('body');

    for (i=0;i<2;i++){
        deck.forEach((item) => {
            rank = item[i].rank;
            suit = item[i].suit;
            img = document.createElement('img');
            img.src = `myImages/${rank}_of_${suit}.png`;
            img.classList.add(`card`, `${item[i].person}${i}`)
            body.append(img)
        })
    }
    createHiddenDealerCard()
}


function moveCards() {
    let player1 = document.querySelector('.player0');
    let player2 = document.querySelector('.player1');
    let dealer1 = document.querySelector('.dealer0');
    let dealer2 = document.querySelector('.dealer1');
    let flippedCard = document.querySelector('.image-container');
    let rotationMax = 6; 
    setTimeout(()=>{
        player1.style.top = `70%`;
        player1.style.left = `30%`;
        player1.style.transform = `rotate(${Math.floor(Math.random() * rotationMax)}deg)`;
        setTimeout(() => {
            dealer1.style.top = `8%`;
            dealer1.style.left = `30%` 
            dealer1.style.transform = `rotate(${Math.floor(Math.random() * rotationMax)+1}deg)`;
            setTimeout(() => {
                player2.style.top = `70%`;
                player2.style.left = `50%`
                player2.style.transform = `rotate(${Math.floor(Math.random() * rotationMax)}deg)`;
                setTimeout(() => {
                    flippedCard.style.top = '8%';
                    flippedCard.style.left = '44%';
                
            }, 200)}, 200)}, 100)}, 200)
    

}

function createHiddenDealerCard() {
    let flippedCard = document.querySelector('.dealer1');
    let imageContainer = document.createElement('div');
    let body = document.querySelector('body');
    flippedCard.classList.add('image-front');
    imageContainer.classList.add('image-container');
    imageBack = document.createElement('img');
    imageBack.src = `myImages/back.png`;
    imageBack.classList.add('image-back');
    imageContainer.append(flippedCard);
    imageContainer.append(imageBack);
    body.append(imageContainer);
    
}

function displayPlayButtons(){
    let left = document.querySelector('.hiddenleft');
    let right = document.querySelector('.hiddenright');
    let deal = document.querySelector('.deal');
    left.style.top = `60%`;
    left.style.left = `10%`;
    right.style.top = `60%`;
    right.style.left = `80%`;
    deal.style.top = `80%`;
    deal.style.left = `100%`;

}

function hit(deck) {
    let body = document.querySelector('body');
    let card = deck.pop();
    let rank = card.rank;
    let suit = card.suit; 
    let img = document.createElement('img');

    img.src = `myImages/${rank}_of_${suit}.png`;
    img.classList.add('card-to-be-hit')
    body.append(img)
    updateScore(card.value);


}


function flipCard() {
     let front = document.querySelector('.image-front');
     let back = document.querySelector('.image-back');
     front.style.transform = 'rotateY(0deg)';
     back.style.transform = 'rotateY(180deg)';
}
function move(person) {
    let img = document.querySelector('.card-to-be-hit');
    if(person == 'player'){
        img.style.top = '70%';
        img.style.left = '60%';
        img.style.transform = `rotate(${Math.floor(Math.random() * 6)})`;
        img.classList.remove('card-to-be-hit')
    } else {
        img.style.top = '8%';
        img.style.left = '49%'
    }

    img.style.transform = `rotate(${Math.floor(Math.random() * 6)})`;
    img.classList.remove('card-to-be-hit')
}

function hitDealer(deck) {
    let body = document.querySelector('body');
    let card = deck.pop();
    let rank = card.rank;
    let suit = card.suit; 
    let cardValue = card.value;
    let img = document.createElement('img');
    let dealerScoreDiv = document.querySelector('.dealer-score');
    let dealerScore = parseInt(dealerScoreDiv.innerText);
    img.src = `myImages/${rank}_of_${suit}.png`;
    img.classList.add('card-to-be-hit')
    body.append(img)
    dealerScore += cardValue;
    dealerScoreDiv.innerText = dealerScore;     

}

function moveDealerCard() {
    let dealerCard = document.querySelector('.card-to-be-hit');
    dealerCard.style.top = `9%`;
    dealerCard.style.left = `55%`;
    dealerCard.classList.remove('card-to-be-hit');
}

function dealOutDealer(deck, playerScore){
    let dealerScore = parseInt(document.querySelector('.dealer-score').innerText);
    let card;
    let dealToWinArray = [];
    while(dealerScore <= 17) {
        card = deck.pop()
        dealToWinArray.push(card);
        dealerScore += card.value;
        console.log('The score is ' + dealerScore)
    }
    
    if(dealerScore == 21){
        console.log('dealer blackjack')
    } else if(dealerScore >21) {
        console.log('dealer busts')
    } else if(dealerScore < 21){
        if(dealerScore > playerScore){
            console.log('dealer wins');
        } else {
            console.log('player wins')
        }
        
    }
}



let dealButton = document.querySelector('.deal');
dealButton.addEventListener('click', () => {
    deal(deck);
})

let hitButton = document.querySelector('.hit');
hitButton.addEventListener('click', () => {
    hit(deck)
    setTimeout(() => {
        move('player')
    }, 10);

});
function revealDealerScore() {
    let dealerScoreDiv = document.querySelector('.dealer-score');
    dealerScoreDiv.classList.remove('hidden');
    let dealerScore = parseInt(dealerScoreDiv.innerText);
    return dealerScore
}

let stayButton = document.querySelector('.stay');
stayButton.addEventListener('click', () => {
    let playerScore = parseInt(document.querySelector('.player-score'));
    revealDealerScore();
    flipCard();
    dealOutDealer(deck, playerScore);
})


let deck = createDeck();

