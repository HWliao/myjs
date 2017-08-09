class Animal {
  public name: string;

  constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(theName: string) {
    super(theName);
  }

  public move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(theName: string) {
    super(theName);
  }

  public move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}


// this
interface Card {
  suit: string;
  card: string;
}

interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
  cards: Array(52),
  suits: ["hearts", "spades", "clubs", "diamonds"],
  createCardPicker(this: Deck) {
    return () => {
      let pickedCard = Math.floor(Math.random() * 52);
      let pickedSuit = Math.floor(Math.random() / 13);
      return {suit: this.suits[pickedSuit], card: this.cards[pickedCard]};
    };
  }
};

