
$(document).ready(function(){
 		$('.sidenav').sidenav();
 	});
var submitted = false;
//console.log(test)

//const order = "23456789TJQKA"

// compare two hands
// function compare_two_hands(h1,h2){
//     let score_1 = undefined;
//     let score_2 = undefined;
//     if(score_1  < score_2){
//         return "win"
//     }else if (score_1 > score_2){
//         return "loose"
//     }else{
//         return ""
//     }
// }


var playerOneRank = 0;
var playerTwoRank = 0;

window.onload = function() {
    var form = document.getElementById("form");
    form.onsubmit = play.bind(form);
}

function card_suit(card) {
  return card.slice(-1);
}

// document.getElementById("suit").innerHTML = card_suit("AC");

function card_value(card) {
  if (card.charAt(0) == 'A') {
    return 14;
  } else if (card.charAt(0) == "K") {
    return 13;
  } else if (card.charAt(0) == "Q") {
    return 12;
  } else if (card.charAt(0) == "J") {
    return 11;
  } else if (card.charAt(0) == "T") {
    return 10;
  } else {
    return parseInt(card.charAt(0));
  }
}

function play(e)
{
  e.preventDefault();
  
  var inputHand1 = document.getElementById("hand1").value
  var inputHand2 = document.getElementById("hand2").value
  var inputHands = [inputHand1, inputHand2]
  // console.log(inputHands)

  // var highestCardP1 = 0;
  // var highestCardP2 = 0;
  inputHands.map(function(hand, index) {
  console.log(hand)
  const cards = hand.split(" ");
  console.log("cards",cards)
  const faces =  cards.map(a=> card_value(a));
  console.log("faces",faces)
  const suits = cards.map(a => a.slice(-1)).sort()
  console.log("suits ", suits)
  const check_flush = (suits)  => suits[0] === suits[4];
  const sorted_faces =  faces.sort((a, b) => b-a)
  const check_royal_flush = (faces , suits) => faces.join("") === "1413121110" && suits[0] === suits[4]


  function findDuplicates(arr) {
    let obj = {};
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        obj[arr[i]] = 0;
      }
      obj[arr[i]]++;
    }
    for (let card in obj) {
      for (let i = 0; i < obj[card]; i++) {
        result.push({card, count: obj[card]});
      }
    }
    const findUniques = [...new Map(result.map(item =>
    [item['card'], item])).values()];

    return findUniques;
  }

  function check_straight(faces) {
    let sorted_faces = faces.sort((a, b) => b-a);
    let consecutive = true;
    for (let i = 0; i < sorted_faces.length - 1; i++) {
      if (sorted_faces[i] - sorted_faces[i+1] != 1) {
        consecutive = false;
      }
    }
    return consecutive;
  }

  function check_four_of_a_kind(faces) {
    let duplicates = findDuplicates(faces);
    let four_of_a_kind = false;
    for (let i = 0; i < duplicates.length; i++) {
      if (duplicates[i].count === 4) {
        four_of_a_kind = true;
      }
    }
    return four_of_a_kind;
  }

  function check_full_house(faces) {
    let duplicates = findDuplicates(faces);
    let full_house = false;
    for (let i = 0; i < duplicates.length; i++) {
      if (duplicates[i].count === 3) {
        for (let j = 0; j < duplicates.length; j++) {
          if (duplicates[j].count === 2) {
            full_house = true;
          }
        }
      }
    }
    return full_house;
  }

  function check_three_of_a_kind(faces) {
    let sorted_faces = faces.sort((a, b) => b-a);
    let three_of_a_kind = false;
    for (let i = 0; i < sorted_faces.length - 2; i++) {
      if (sorted_faces[i] === sorted_faces[i+1] && sorted_faces[i] === sorted_faces[i+2]) {
        three_of_a_kind = true;
      }
    }
    return three_of_a_kind;
  }

  function check_pair(faces) {
    let sorted_faces = faces.sort((a, b) => b-a);
    let pair = false;
    for (let i = 0; i < sorted_faces.length - 1; i++) {
      if (sorted_faces[i] === sorted_faces[i+1]) {
        pair = true;
      }
    }
    return pair;
  }

  var rank = undefined;

  function check_two_pair(faces) {
      let two_pair = false
      faces.forEach(element => {
          if(faces.filter(x => x === element).length == 2){
              two_pair = true
          }
      });
      return two_pair
  }

  function find_highest_card(faces) {
      let sorted_faces = faces.sort((a, b) => 
      {
        b-a
      });
      return sorted_faces[0]
  }

  // var flag_1 = false;
  // var flag_2 = false;

  switch (true) {
    case check_royal_flush(sorted_faces, suits):
      rank = 24;
      break;
    case check_flush(suits) && check_straight(faces):
      rank = 23;
      break;
    case check_four_of_a_kind(faces):
      rank = 22;
      break;
    case check_full_house(faces):
      rank = 21;
      break;
      case check_flush(suits):
      rank = 20;
      break;
    case check_straight(faces):
      rank = 19;
      break;
    case check_three_of_a_kind(faces):
      rank = 18;
      break;
    case check_two_pair(faces):
      rank = 17;
      break;
    case check_pair(faces):
      rank = 16;
      break;
    default:
      rank = find_highest_card(faces)
      // rank = 99;
      // if(index === 0){
      //   console.log('switch idx 0')
      //   highestCardP1 = find_highest_card(faces);
      //   flag_1 = true
      //   flag_2 = false
      // } else {
      //   console.log('switch idx 1')
      //   highestCardP2 = find_highest_card(faces);
      //   flag_1 = false
      //   flag_2 = true
      // }
  }
  

  document.getElementById(`rank${index}`).innerHTML = rank === 24 ? "Royal Flush" : rank === 23 ? "Straight Flush" : rank === 22 ? "Four of a Kind" : rank === 21 ? "Full House" : rank === 20 ? "Flush" : rank === 19 ? "Straight" : rank === 18 ? "Three of a Kind" : rank === 17 ? "Two Pair" : rank === 16 ? "Pair" : rank === 15 ? "High Card" : `Highest Card: ${rank}`;
  

  // if (flag_1 && rank > 9 &&){
  //   console.log('executing if flag1')
  //   console.log(highestCardP1, highestCardP2)
  //     if(highestCardP1 > highestCardP2) {
  //   console.log('executing if inside if flag1')
  //     rank = 10;
  //   }  else {
  //   console.log('executing else inside if flag1')
  //     rank = 99;
  //   }
  // } else 

  if (index == 0) {
    // console.log('final if')
    playerOneRank = rank;
  } else {
    // console.log('final else')
    playerTwoRank = rank;
  }
    $('.poker-input').css('display', 'none');
    $('.poker-output').css('display', 'block');
})

console.log(playerOneRank, playerTwoRank)
if (playerOneRank > playerTwoRank) {
  document.getElementById("winner").innerHTML = "Player One Wins";
} else if (playerOneRank < playerTwoRank) {
  document.getElementById("winner").innerHTML = "Player Two Wins";
} else {
  document.getElementById("winner").innerHTML = "Tie";
}
} 

function reset() {
    $('.poker-input').css('display', 'block');
    $('.poker-output').css('display', 'none');
}
