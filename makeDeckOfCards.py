def createDeck():
    suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs']
    deck = []
    for suit in suits:
        for i in range(14):
            obj = {}
            obj["rank"] = i
            obj["suit"] = suit
            deck.append(obj)
    return deck

print(createDeck())