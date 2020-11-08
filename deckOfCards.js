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

    for(let i = deck.length-1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = deck[i]
        deck[i] = deck[j]
        deck[j] = temp
    }

    return deck;
}


function deal(deck) {
    let playerHand = [];
    let dealerHand = [];
    let dealerHandDiv = document.querySelector('.dealer-hand');
    let playerHandDiv = document.querySelector('.player-hand');
    let card;
    let img;
    let rank;
    let suit;
    let playerScore = 0;
    let dealerScore = 0;
    let imageContainer;
    let imageBack;
    
    setTimeout(() => {
        dealACard(deck, 'player', playerHand, dealerHand, playerHandDiv, dealerHandDiv);
        setTimeout(() => {
            dealACard(deck, 'dealer', playerHand, dealerHand, playerHandDiv, dealerHandDiv);
            setTimeout(()=> {
                dealACard(deck, 'player', playerHand, dealerHand, playerHandDiv, dealerHandDiv);
            
        }, 200)}, 200)}, 200)



    //setTimeout(dealCardFlipped(deck, dealerHand, dealerHandDiv), 1000);

    
    
    console.log('playerscore is ' + playerScore)
    dealButton = document.querySelector('.deal');
    hitButton = document.querySelector('.hit');
    stayButton = document.querySelector('.stay');
    doubleButton = document.querySelector('.double');
    surrenderButton = document.querySelector('.surrender');
    score = document.querySelector('.score');

    dealButton.classList.toggle('hidden');
    stayButton.classList.toggle('hidden');
    hitButton.classList.toggle('hidden');
    doubleButton.classList.toggle('hidden');
    surrenderButton.classList.toggle('hidden');
    score.classList.toggle('hidden');
    score.innerText = playerScore;

}

function hit(deck) {
    let playerHand = [];
    let dealerHand = [];
    let dealerHandDiv = document.querySelector('.dealer-hand');
    let playerHandDiv = document.querySelector('.player-hand');
    let card;
    let img;
    let rank;
    let suit;

    card = deck.pop();
    playerHand.push(card);
    img = document.createElement('img');
    img.src = `myImages/${card.rank}_of_${card.suit}.png`
    playerHandDiv.append(img)
    console.log(`deck length is ${deck.length}`)
    
    
}

function flipCard() {
    let cardFront = document.querySelector('.image-front');
    let cardBack = document.querySelector('.image-back');
    cardFront.style.transform = 'rotateY(0deg)';
    cardBack.style.transform = 'rotateY(180deg)';
}

hitButton = document.querySelector('.hit');
stayButton = document.querySelector('.stay');
dealButton = document.querySelector('.deal');

dealButton.addEventListener('click', () => {
    deal(deck)
});

function dealACard(deck, recipient, playerHand, dealerHand, playerHandDiv, dealerHandDiv) {
    card = deck.pop();
    if(recipient == 'player'){
        playerHand.push(card);
        img = document.createElement('img');
        img.src = `myImages/${card.rank}_of_${card.suit}.png`
        playerHandDiv.append(img)
    } else {
        dealerHand.push(card);
        img = document.createElement('img');
        img.src = `myImages/${card.rank}_of_${card.suit}.png`
        dealerHandDiv.append(img)
    }

    playerHand.forEach((item) => {playerScore += item.value});
    dealerHand.forEach((item) => {dealerScore += item.value});
    let scoreObj = {};
    scoreObj.dealer = dealerScore;
    scoreObj.player = playerScore;
    return scoreObj;
}

function dealCardFlipped(deck, dealerHand, dealerHandDiv) {
    card = deck.pop();
    dealerHand.push(card);
    img = document.createElement('img');
    img.src = `myImages/${card.rank}_of_${card.suit}.png`;
    img.classList.add('image-front');   
    imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageBack = document.createElement('img');
    imageBack.src = `myImages/back.png`;
    imageBack.classList.add('image-back');
    imageContainer.append(img);
    imageContainer.append(imageBack);
    dealerHandDiv.append(imageContainer);
}

hitButton.addEventListener('click', ()=> {
    hit(deck);
})


let deck = createDeck();