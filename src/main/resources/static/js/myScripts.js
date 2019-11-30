/* Deshabilitar scroll del body cuando un colorbox este abierto y habilitarlo cuando se cierre */
var screen_position;
$(document).bind('cbox_open', function() {
screen_position = $('body').scrollTop();
$('body').css({ overflow: 'hidden' });
$('body').scrollTop(0);
}).bind('cbox_closed', function() {
$('body').css({ overflow: 'auto' });
$('body').scrollTop(screen_position);
});

$(document).ready(function(){
	 
	//Colorbox	
	$(".iframe").colorbox({
		iframe:true, 
		width:"972px", 
		scrolling:false, 
		height:"580px", 
		close:"<b>X</b>" });
	$(".inline").colorbox({
		inline:true, 
		width:"972px", 
		scrolling:false, 
		height:"580px", 
		close:"<b>X</b>" });
	//$(".exit").colorbox({inline:true, scrolling:false, width:"570px", height:"190px"});
	$(".CambioMoneda").colorbox({inline:true, scrolling:false, width:"300px", height:"190px"});
	$(".noMoreFlight").colorbox({inline:true, scrolling:false, width:"420px", height:"130px"});
	$(".cupones").colorbox({inline:true, scrolling:false, width: "700", height: "250", close: "<b>X</b>"});
	$(".colorBox").colorbox({inline:true, scrolling:false, width:"420px", height:"130px"});	
	
		
	$(".cntCbox").colorbox({
		width:"800px", 
		close: "<b>X</b>", 
		height:"400px", 
		inline:true, 
		href:"#contColorbox",
	});
	
	$("#slider").roundSlider({
			sliderType: "min-range",
			editableTooltip: false,
	    	radius: '100%',
			width: 25,
			value: 500000,
			showTooltip: false,
			handleSize: 0,
			handleShape: "square",
	    	circleShape: "half-top",
			startAngle: 315,
			min: 100,
			max: 1000000,
			create: "onSliderCreate",
			tooltipFormat: "changeTooltip"
		});
		var countScroll = 0;
			$(window).scroll(function() {
				if(countScroll >= 1){
					countScroll++;
				}else{
					countScroll = 0;
				}
				var offset = $(".contColorbox").offset();
				var w = $(window);
			   if(($(window).scrollTop() + $(window).height() > ($(document).height()-200)) && countScroll == 0) {
					//alert("(x,y): ("+(offset.left-w.scrollLeft())+","+(offset.top-w.scrollTop())+")");
					$("#slider").roundSlider({
						value: 500000
					});
					setTimeout(function(){
						$("#slider").roundSlider({
							value: 5000
						});
					  }, 1000);
					countScroll = 1;
				   // getData();
			   }
		});	
			
			//Mostrar fees
		  	$("#table-fee, #fees-on" ).hide()
			$("#fees").click(function() {
		$(".aside").removeClass("sticky");
		  	$("#table-fee" ).show();
			$("#fees").hide();
			$("#fees-on").show();
			
			});
			$("#fees-on").click(function() {
		  	$("#table-fee" ).hide();
			$("#fees").show();
			$("#fees-on").hide();

			});
			$.each($('.operado'), function( index, value ) {
				 if($(value).parent().find(".opHidden").html() != ""){
					 $(value).tooltip($(value).parent().find(".opHidden").html(), { width: 250, style: 'alert', sticky: 0, hook: 1 });
				 }
			});

			$(".unobtrusive").click(function(e) {	    			     
			    event.stopPropagation();
			    event.preventDefault();
			    $("#btnAbPage").attr('rel',$(this).attr('href'));
			    //$(this).removeAttr("href");
			    $.colorbox({inline:true, href:$("#exitBook")});		         
			});

			$("#btnAbPage").click(function(){
				//$("#unobtrusive").click();
				location.href = $(this).attr('rel');
			});
			
			$(document).on( "keydown", ".select2", function(event) {
		    	if (event.keyCode == 40)
		    		$(this).prev().select2('open');
		    });

	if(lang == "es") {
		$('#restriccion').tooltip('Al seleccionar diferentes productos, las condiciones aplicables a ambos son las del producto más restrictivo', {width:250, style: 'alert', sticky: 0, hook: 1});
	} else {
		$('#restriccion').tooltip('When choosing combined seat types (Limited or All), the most restrictive conditions apply to the entire selection', {width:250, style: 'alert', sticky: 0, hook: 1});
    }

});

