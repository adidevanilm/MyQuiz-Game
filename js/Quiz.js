class Quiz {
  constructor() { }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if (contestantCountRef.exists()) {
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play() {
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    title = createElement('h1')
    title = title.html("RESULT OF THE QUIZ");
    title.position(280, 0);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if (allContestants != undefined) {

      //write code to add a note here
      fill("blue");
      textSize(20);
      text("*NOTE* : Contestants who answered correct are highlighted in *GREEN* colour", 130, 230)
      var y = 280;

      //write code to highlight contest who answered correctly
      for (var plr in allContestants) {    

        var correctAns = "2";
        if (correctAns === allContestants[plr].answer) {
          fill("green");
          text(allContestants[plr].name + " : " + allContestants[plr].answer, 360, y);
          y = y+30
        } else {
          fill("red")
          text(allContestants[plr].name + " : " + allContestants[plr].answer, 360, y);
          y = y+30


        }
      }
       button = createButton('RESET');
          button.position(290, 300);
          button.mousePressed(()=>{
            contestant.updateCount(0)
            quiz.update(0);
            button.hide();
            title.hide();
            quiz.getState();
            quiz.start();
          })

    }


  }

}
