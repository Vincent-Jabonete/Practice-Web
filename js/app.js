$(function(){
    //Cached selectors
    var jokeButton = $('#joke-button');
    var jokeResetButton = $('#joke-reset-button');
    var jokesList = $('#jokes-list');
    var reaction = $('#reaction');
    var jokeLoader = $('#joke-loader');
  


    // variables
    var count=0;   
    var reactionCount=0;
    var MaxJoke="You reached 5 max Joke";
    var funnyMessageGif="./img/funny.gif";
    var notfunnyMessageGif="./img/not-funny.gif";

    jokeLoader.hide();
    jokeResetButton.hide();

    jokeButton.on('click', function(e){

      CreateJokes();

    });
  jokeResetButton.on('click', function(){
          RemoveAll();
  });

    async function CreateJokes(){
      try {
           jokeButtonDisabled(true);
           jokeLoader.show();
           var randomJoke= await getRandomJoke();
           var randomAnswer = await getRandomAnswer();

           await MakeJokes(randomJoke, randomAnswer.image);
              jokeLoader.hide();
           if(randomJoke!=null && randomAnswer!=null){
             count++;
           }
           if(randomAnswer.answer =="yes"){
              reactionCount++;
           }

           if(count!=5){
             jokeButtonDisabled(false);
           }
           if(count==5){
             jokeButtonDisabled(true);
             check();
             ImageShow();
           }

            console.log(count);

      }catch(error){
        alert(error);
        jokeButtonDisabled(false);
        jokeResetButton.hide();
      }


    }


    function RemoveAll(){
      count=0;
      reaction.empty();
      jokesList.empty();
      jokeButtonDisabled(false);
      jokeResetButton.hide();
    }
    function check(){
      jokeResetButton.show();
      jokeButton.text(MaxJoke);


    }

    function ImageShow(){
      var FunnyMessage=  ` <p>Congratulation you are lucky today</p>
                            <img src="${funnyMessageGif}"/>
                            
                            `;
      var NotFunnyMessage= `<p>You are not lucky today</p>
                            <img src="${notfunnyMessageGif}"/>
                            
                            `;
              if(reactionCount<3){
                reaction.append(FunnyMessage);
              }
              if(reactionCount>3){
                reaction.append(NotFunnyMessage);
              }
    }

   function getRandomJoke(){
     return Jokes_API.get();

   }

   function getRandomAnswer(){
     return Jokes_API.answer();
   }

   function jokeButtonDisabled(val){
     jokeButton.attr("disabled",val);
     
   }


   function MakeJokes(joke,img){
       var list= `<li> 
                        <p>${joke}</p>
                        <img src="${img}"/>
                        </li>`;

          jokesList.append(list);
   }
           
    }); // the end
