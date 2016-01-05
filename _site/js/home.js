
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

	if(sessionStorage.category != null &&  $(document).width()>500){
		console.log(sessionStorage.nav);
		var category = $("#" + sessionStorage.category);
		$(category).addClass("category-active");
		$(category).parent().parent().slideDown(80);
		// $(category).parent().parent().slideDown(80);
	}

	$(window).scroll(function(){
		var x = document.body.scrollTop||document.documentElement.scrollTop; 
		// console.log(x);
		if(x>150 && $(document).width()<=500){
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
			// console.log($(this).nextAll("ul"));
			if($(this).nextAll("ul").is(':hidden') ){
				console.log("yes");
				$(this).next().slideDown(10);
				$(this).nextAll("ul").slideDown(80);
			}else{
				$(this).nextAll("ul").slideUp(80);
				$(this).next().slideUp(90);
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

	$(".category-second").bind("click touchstart",function(){
		console.log("点击到了");
	})

	$(".blog-cat").bind("click touchstart",function(){
		sessionStorage.category = $(this).children().attr("id");
		sessionStorage.nav = $(this).parent().prevAll("a").attr("id");
		$(".mask").trigger("touchstart");
	})

});