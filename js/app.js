// wait for the DOM to finish loading
$(document).ready(function() {
  // all code to manipulate the DOM
  // goes inside this function
  console.log("I'm in");
  // why use let instead of var given these variables are global in scope?
  let flag = "dog";
  let round = 0;
  let judge = [];
  let isOver = false;
  let winCount = {
  	"cat": 0,
  	"dog": 0
  };

  function firstGame(){
  	for(var y=1; y<=3; y++){
  		for(var x=1; x<=3; x++){
  			judge.push({
  				index: (x.toString()+y.toString()), // about to assign side(cat or dog) to it.
  				// "y":y.toString(),
  				side: "",
  			});
  		}
  	}
  	console.log(judge);
  }

	firstGame();

	function restart(){
		flag = "dog";
		round = 0;
		isOver = false;
		for(var i=0; i<9; i++){
			judge[i].side="";
		}
		$('.box').css("background-image", "");
		$('.box').attr("clicked", "0");
		$('.box').removeClass("infinite jackInTheBox zoomIn lightSpeedIn");
		$('#cat-side').removeClass("bounce infinite");

	}

	function winAnimate(a, b, c){
		  	$(".box[index="+a.index+"]").addClass("jackInTheBox infinite");
  			$(".box[index="+b.index+"]").addClass("jackInTheBox infinite");
  			$(".box[index="+c.index+"]").addClass("jackInTheBox infinite");
  			winCount[a.side] ++;
  			$('#'+a.side+'-win-count').text(winCount[a.side]);
  			$(`.score-board[side=${a.side}]`).addClass("rubberBand");
  			setTimeout(function(){
  				$(`.score-board[side=${a.side}]`).removeClass("rubberBand");
  			},500);

	}


// Very thoughtful, but do we need it?
  function isFinished(){
  	//minimon steps it takes to win the game
  	if(round<5){
  		return false;
  	}
  	let j=judge;
  	
  	//Here's the index's location
  	//  0   1   2
  	//  3   4   5
  	//  6   7   8
  	
  	if(j[0].side){
  		if(j[0].side===j[1].side && j[1].side===j[2].side){
  			console.log(j[0].side + " wins!");
  			winAnimate(j[0],j[1],j[2]);
  			return true;
  		}
  		if(j[0].side===j[3].side && j[3].side===j[6].side){
  			console.log(j[0].side + " wins!");
  			winAnimate(j[0],j[3],j[6]);
  			return true;	
  		}
  	}
  	if(j[8].side){
  		if(j[8].side===j[5].side && j[5].side===j[2].side){
			console.log(j[8].side + " wins!");
			winAnimate(j[2],j[5],j[8]);
			return true;
  		}
  		if(j[8].side===j[7].side && j[7].side===j[6].side){
			console.log(j[8].side + " wins!");
			winAnimate(j[6],j[7],j[8]);
			return true;
  		}
  	}
  	if(j[4].side){
  		if(j[4].side===j[1].side && j[4].side===j[7].side){
			console.log(j[4].side + " wins!");
			winAnimate(j[1],j[4],j[7]);
			return true;
  		}
  		if(j[4].side===j[3].side && j[4].side===j[5].side){
  			console.log(j[4].side + " wins!");
  			winAnimate(j[3],j[4],j[5]);
  			return true;			
  		}
  		if(j[4].side===j[0].side && j[4].side===j[8].side){
			console.log(j[4].side + " wins!");
			winAnimate(j[0],j[4],j[8]);
			return true;
  		}
  		if(j[4].side===j[2].side && j[4].side===j[6].side){
  			console.log(j[4].side + " wins!");
  			winAnimate(j[2],j[4],j[6]);
  			return true;			
  		}

	  	if(round===9){
			draw();
	  		return true;
	  	}else{
	  		return false;
	  	}
  	}
  }

  function gameOver(){
	$('.box').removeClass("zoomIn lightSpeedIn");
  	$(".box").attr("clicked", "1");
  	$('#dog-side').addClass("bounce infinite");
	$('#cat-side').addClass("bounce infinite");
  }

  function pick(indexIn, sideIn){
  	for(var i=0; i<9; i++){
  		if(judge[i].index==indexIn){
  			judge[i].side = sideIn;
  			break;
  		}
  	}
  }

  function draw(){
  	$('.box').addClass('jello');
  	setTimeout(function(){
  			$('.box').removeClass('jello');
  		},1000);
  }

  //Restart next game button
  $('#restart').on('click', function(){
  	restart();
  })

  //Reset score button
  $('#reset').on('click', function(){
  	winCount.dog=0;
  	winCount.cat=0;
  	$('.score-board').addClass('hinge');
  	// $('.score-board').removeClass('hinge');
  	setTimeout(function(){
  		$('.score-board').removeClass('hinge');
  		$('#dog-win-count').text('0');
  		$('#cat-win-count').text('0');
  		$('.score-board').addClass('bounce');
  		console.log("layer 1");
  		setTimeout(function(){
  			$('.score-board').removeClass('bounce');
  			console.log("layer 2");
  		},1000);
  }, 500);
  })


  //In game clicks listener
  $('.box').on('click', function(){

  	if(isOver){
  		// gameOver();
  		// restart();
  		return;
  	}
  	
  	var indexGet = $(this).attr("x")+$(this).attr("y");

  	if($(this).attr("clicked")==="0" && flag==="dog"){
  		pick(indexGet, flag);
  		console.log("indexGet points to: "+flag)
	  	$(this).css("background-image", "url(img/dog_play.jpg)");
	  	$(this).addClass("lightSpeedIn");
	  	// console.log("clicked");
	  	$(this).attr("clicked", "1");
	  	flag = "cat";
	  	$('#dog-side').removeClass("bounce infinite");
	  	$('#cat-side').addClass("bounce infinite");
	  	round++;
  		console.log("round: "+round);

  	}else if($(this).attr("clicked")==="0" && flag==="cat") {
  		pick(indexGet, flag);
  		console.log("indexGet points to: "+flag)
  		$(this).css("background-image", "url(img/cat_play.jpg)");
  		$(this).addClass("zoomIn");
	  	// console.log("clicked");
	  	$(this).attr("clicked", "1");
	  	flag = "dog";
	  	$('#cat-side').removeClass("bounce infinite");
	  	$('#dog-side').addClass("bounce infinite");
	  	round++;
  		console.log("round: "+round);
  }
  isOver = isFinished();
  if(isOver){
  	gameOver();
  }
  });

});
