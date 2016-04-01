var video = $("#music_video")[0];
var timeDrag = false;   /* Drag status */
var currentPos=0;
var playProgress = 0;
var volume=0;
var volumeDrag = false;
// var musilList = 
$(function(){
	// if(sessionStorage.nav == null){
	// 	sessionStorage.nav = "first";
	// }
	switch(sessionStorage.nav){
		case "first": $("#first").addClass("nav-active");break;
		case "study": $("#study").addClass("nav-active");break;
		case "mood": $("#mood").addClass("nav-active");break;
		case "sports": $("#sports").addClass("nav-active");break;
		case "music": $("#music").addClass("nav-active");$(".music-controller").show();video.play();break;
		case "about": $("#about").addClass("nav-active");break;
		default:$("#first").addClass("nav-active");break;
	}

	if(sessionStorage.category != null &&  $(document).width()>500){
		console.log(sessionStorage.nav);
		var category = $("#" + sessionStorage.category);
		$(category).addClass("category-active");
		$(category).parent().parent().slideDown(40);
		// $(category).parent().parent().slideDown(80);
	}

	// setDuration();

	$(window).scroll(function(){
		var x = document.body.scrollTop||document.documentElement.scrollTop; 
		// console.log(x);
		if(x>150 && $(document).width()<=768){
			$(".blog-nav").addClass("down");
		}else{
			$(".blog-nav").removeClass("down");
		}
		if(x>150){
			$(".scrollToTop").fadeIn();
		}else{
			$(".scrollToTop").fadeOut();
		}
	});

	$(".scrollToTop").bind("click touchstart",function(){
		$('html, body').animate({scrollTop:0}, 'fast');
		return false;
	})

	$(".blog-nav").bind("click touchstart",function(){
		$(".mask").trigger("touchstart");
	})

	$(".category-first").bind("click touchstart",function(){
		
		if($(this).hasClass("nav")){
			sessionStorage.nav = $(this).attr("id");
			sessionStorage.category = null;
		}else{
			if($(this).nextAll("ul").is(':hidden') ){
				$(this).next().slideDown(5);
				$(this).nextAll("ul").slideDown(40);
			}else{
				$(this).nextAll("ul").slideUp(40);
				$(this).next().slideUp(45);
			}
			var screenWidth = $(document).width();
			if(screenWidth <= 500){
				$(".mask").show();
			}
			return false;
		}
	})

	$(".mask").bind("touchstart",function(){
		$(this).hide();
		$(".blog-nav>li>ul").slideUp(80);
		$(".blog-nav .arrow").slideUp(90);
		return false;
	});	

	$(".category-second").bind("click touchstart",function(event){
		sessionStorage.category = $(this).attr("id");
		sessionStorage.nav = $(this).parent().parent().prevAll("a").attr("id");
		$(".mask").trigger("touchstart");
		event.stopPropagation(); 
	})

	$(".blog-cat").bind("click touchstart",function(event){
		$(this).children(".category-second").trigger("touchstart");//.trigger("touchstart");
	})

	/*音乐播放暂停*/
	$("#btn-play-pause").bind("click touchstart",function(event){
		// var video = $("#music_video");
		console.log("play/pause");
		if(video.paused){
			video.play();
			$(".icon-play").removeClass("active");
			$(".icon-pause").addClass("active");
	    }
	    else{
	        video.pause();
	        $(".icon-pause").removeClass("active");
			$(".icon-play").addClass("active");

	    }
	    return false;
	});

	$(video).on('loadedmetadata', function() {
	   setDuration();
	});

	/*更新进度条*/
	$(video).on('timeupdate', function() { 
	   if(!timeDrag){
	   		var currentPos = video.currentTime; //Get currenttime
	   		modifyProgress(currentPos);
	   }
	  //  if(percentage == 100){
	  //  		$(".icon-pause").removeClass("active");
			// $(".icon-play").addClass("active");
	  //  }
	});

	$('.player-progress').mousedown(function(e) {
	   timeDrag = true;
	   // updatebar(e.pageX);
	});

	$(document).mouseup(function(e) {
	   if(timeDrag) {
	      timeDrag = false;
	      updatebar(e.pageX);
	      updateProgress();
	   }
	});
	$(document).mousemove(function(e) {
	   if(timeDrag) {
	      updatebar(e.pageX);
	   }
	});
	 
	//update Progress Bar control
	var updatebar = function(x) {
	   // video.pause();
	   var progress = $('.player-progress');
	   var maxduration = video.duration; //Video duraiton
	   var position = x - progress.offset().left; //Click pos
	   var percentage = 100 * position / progress.width();
	 
	   //Check within range
	   if(percentage > 100) {
	      percentage = 100;
	   }
	   if(percentage < 0) {
	      percentage = 0;
	   }
	 
	   //Update progress bar and video currenttime
	   // $('.timeBar').css('width', percentage+'%');
	   currentPos = Math.round(maxduration * percentage / 100);
	   modifyProgress(currentPos);
	};

	var updateProgress = function(){
		video.currentTime = currentPos;
	}

	var startBuffer = function() {
	   var maxduration = video.duration;
	   var currentBuffer = video.buffered.end(0);
	   // console.log(currentBuffer);
	   var percentage = 100 * currentBuffer / maxduration;
	   $('.loading').css('width', percentage+'%');
	 
	   if(currentBuffer < maxduration) {
	      setTimeout(startBuffer, 100);
	   }
	};
	setTimeout(startBuffer, 500);


	//Mute/Unmute control clicked
	$('.horn-box').click(function() {
	   video.muted = !video.muted;
	   return false;
	});

	$('.volume-progress').mousedown(function(e) {
	   volumeDrag = true;
	   // updatebar(e.pageX);
	});

	$(document).mouseup(function(e) {
	   if(volumeDrag) {
	      volumeDrag = false;
	      updateVolumeBar(e.pageX);//更新音量条
	      updateVolume();//更新音量
	   }
	});
	$(document).mousemove(function(e) {
	   if(volumeDrag) {
	      updateVolumeBar(e.pageX);
	      updateVolume();
	   }
	});
	 
	var updateVolumeBar = function(x){
		var position = x - $("#volume-progress").offset().left;
		console.log(position);
	   
	   var percentage = 100 * position / $("#volume-progress").children('.max').width();
	   if(percentage > 100) {
	      percentage = 100;
	   }
	   if(percentage < 0) {
	      percentage = 0;
	   }
	   $(".volume-progress").children('.current').css('width', percentage+'%');
	   $('.volume-dot').css('left', percentage+'%');
	   volume = percentage;
	}

	//Volume control clicked
	// $('.volume-progress').on('mousedown', function(e) {
	//    var position = e.pageX - $(this).children('.current').offset().left;
	//    if(position<0){
	//    		position = 0;
	//    }
	//    var percentage = 100 * position / $(this).children('.max').width();
	//    $(this).children('.current').css('width', percentage+'%');
	//    $('.volume-dot').css('left', percentage+'%');
	//    video.volume = percentage / 100;
	// });

	var updateVolume = function(){
		video.volume = volume / 100;
	}
});

function modifyProgress(currentPos){
	   var maxduration = video.duration; //Get video duration
	   var percentage = 100 * currentPos / maxduration; //in %
	   var minute = Math.floor(currentPos/60);
	   var second = Math.round(currentPos%60);
	   
	   var currentTimeStr = (minute>9?(""+minute):("0"+minute)) + ":" + (second>9?(""+second):("0"+second));
	   $('.playing').css('width', percentage+'%');
	   $('.progress-dot').css('left', percentage+'%');
	   $(".player-position-time").text(currentTimeStr);
}

function setDuration(){
	var maxduration = video.duration; //Get video duration
	console.log(maxduration);
	var minute = Math.floor(maxduration/60);
   	var second = Math.round(maxduration%60);
   
   	var maxdurationTimeStr = (minute>9?(""+minute):("0"+minute)) + ":" + (second>9?(""+second):("0"+second));
   	$(".total-time").text(maxdurationTimeStr);
}