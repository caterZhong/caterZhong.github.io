
$(function(){
	// if(sessionStorage.nav == null){
	// 	sessionStorage.nav = "first";
	// }
	switch(sessionStorage.nav){
		case "first": $("#first").addClass("nav-active");break;
		case "study": $("#study").addClass("nav-active");break;
		case "mood": $("#mood").addClass("nav-active");break;
		case "sports": $("#sports").addClass("nav-active");break;
		case "music": $("#music").addClass("nav-active");break;
		case "about": $("#about").addClass("nav-active");break;
		default:$("#first").addClass("nav-active");break;
	}

	if(sessionStorage.category != null){
		console.log(sessionStorage.nav);
		var category = $("#" + sessionStorage.category);
		$(category).addClass("category-active");
		$(category).parent().parent().slideDown(80);
		// $(category).parent().parent().slideDown(80);
	}

	$(window).scroll(function(){
		var x = document.body.scrollTop||document.documentElement.scrollTop; 
		if(x>150){
			$(".ScrollToTop").fadeIn();
		}else{
			$(".ScrollToTop").fadeOut();
		}
	});

	$(".ScrollToTop").bind("click",function(){
		$('html, body').animate({scrollTop:0}, 'fast');
		return false;
	})

	$(".category-first").bind("click",function(){
		// $(this).children("ul").css("height","0");
		if($(this).hasClass("nav")){
			sessionStorage.nav = $(this).attr("id");
			sessionStorage.category = null;
		}else{
			if($(this).next("ul").is(':hidden') ){
				$(this).next("ul").slideDown(80);
			}else{
				$(this).next("ul").slideUp(80);
			}
			return false;
		}
		
		
	})

	$(".category-second").bind("click",function(){
		sessionStorage.category = $(this).attr("id");
		sessionStorage.nav = $(this).parent().parent().prev().attr("id");
	})

});