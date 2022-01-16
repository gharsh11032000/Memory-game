const playerLivesCount = document.querySelector(".lives");
const cardBox = document.querySelector(".card-box");
const card = document.querySelectorAll(".card");
let playerLives = 5;

//ImageSource and ImageName
const getData = () => [
  { imageSrc: "pizza.jpg", name: "pizza" },
  { imageSrc: "pizza.jpg", name: "pizza" },
  { imageSrc: "burger.jpg", name: "burger" },
  { imageSrc: "burger.jpg", name: "burger" },
  { imageSrc: "junkfood.jpg", name: "junkfod" },
  { imageSrc: "junkfood.jpg", name: "junkfod" },
  { imageSrc: "pastry.jpg", name: "pastry" },
  { imageSrc: "pastry.jpg", name: "pastry" },
  { imageSrc: "juice.jpg", name: "juice" },
  { imageSrc: "juice.jpg", name: "juice" },
  { imageSrc: "hotdog.jpg", name: "hotdog" },
  { imageSrc: "hotdog.jpg", name: "hotdog" },
];

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

const cardGenrator = () => {
  const cardData = randomize();
  cardData.forEach((item) => {
    //Creating html elements
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    //setting created image source to data image source
    face.src = item.imageSrc;
    //adding classes to newly created elements
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //adding name to newly created elements
    card.setAttribute("name", item.name);
    //setting positions to newly created elements
    cardBox.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    //adding class after clicking on card
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCard(e);
    });
  });
};

const checkCard = (e) => {
  const clickedCard = e.target;
  //Adding class flipped to clicked card
  clickedCard.classList.add("flipped");
  //storing toggleCard and flippedCard
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");
  //Logic
  //If two flipped card is present
  if (flippedCards.length === 2) {
    //If name of both cards are smae
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        //Disable the click event in matched cards
        card.style.pointerEvents = "none";
        //Removing the flipped class from matched card
        card.classList.remove("flipped");
      });
    } else {
      flippedCards.forEach((card) => {
        //Removing the flipped class from unmatched card
        card.classList.remove("flipped");
        //Removing the toggleCard class to rotate back the card
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      //decrementing the player lives after every wrong move
      playerLives--;
      //Updating the UI
      playerLivesCount.textContent = playerLives;
      //Restart the game if you lose
      if (playerLives === 0) {
        restart("Sorry! You Lose. Try Again⏳");
      }
    }
  }
  //Restart the game if you win
  if (toggleCard.length === 12) {
    restart("Hurray! You Won🎉🎊🤩💥");
  }
};

const restart = (text) => {
  let cardData = randomize();
  //Storing the faces and cards into the variable
  let faces = document.querySelectorAll(".face");
  let card = document.querySelectorAll(".card");
  //Disabling the click event while the game is restarting
  cardBox.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    //Removing the toggleCard class from all cards
    card[index].classList.remove("toggleCard");
    setTimeout(() => {
      //inabling the click event to all cards
      card[index].style.pointerEvents = "all";
      //Setting the name and image to the card
      faces[index].src = item.imageSrc;
      card[index].setAttribute("name", item.name);
      //Inabling the click event after the restarts
      cardBox.style.pointerEvents = "all";
    }, 1000);
  });
  //Reseting the player lives and updating the UI
  playerLives = 5;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};

cardGenrator();
