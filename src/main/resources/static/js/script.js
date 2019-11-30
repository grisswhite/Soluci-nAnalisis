var theCookies = document.cookie.split(';');
var aString = '';
var lang = "es";
var newSearch=false;
var count = 0;
var infopago = [];
var count3 = [0,0,0,0,0,0,0,0,0,0]; //llenamos con 0 el array que llevara la cuenta de las variables.
var count2 = 0;
var claseField = "";
var element="";
var estado="";
var path = "/checkout";

for (var i = 1 ; i <= theCookies.length; i++) {
	//alert(theCookies[i-1].split("=")[1]);
    if(theCookies[i-1].split("=")[0].indexOf("org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE") != -1)
    	lang = theCookies[i-1].split("=")[1];
}

$(document).on("focusout", "input, .select2-container", function(){
	//console.log("valor "+$(this).val().trim());
	if($(this).attr("class") != undefined && $(this).attr("class").indexOf('select2-container') != -1 &&
			$(this).prev().val().trim() != ""){
		$(this).removeClass("error");
		$(this).prev().removeClass("error");
	}
	else if($(this).val() != null && $(this).val().trim() != ""){
		
		$(this).removeClass("error");
	}
});
$(document).ready(function(){	
	$("#pagos option").each(function(){
		   if ($(this).attr('value') != " "){
			   infopago[count2] = $(this).attr('value')
			   count2 += 1;
		   }
		});
		
	//console.log(infopago);
	$("select.e1").select2();
	$('select.req').next().addClass("req");
	//Select radio	
	var claseRadio = $('input[name=factura]:nth(0)').attr('class');
	if (claseRadio !== undefined){
		var sClaseRadio = claseRadio.split(" ");
	}else {
		var sClaseRadio = "";
	}		
	if(sClaseRadio[0] == "novalidate"){
		$('input:radio[name=factura]:nth(0)').attr('checked',false);
		//$('input:radio[name=factura]:nth(1)').attr('checked',false);
			$(".factura").hide();

	}
	else if(sClaseRadio[0] == "validate"){
		$('input:radio[name=factura]:nth(0)').attr('checked',true);
	}
	if(! $("#credito").is(":checked")){
		$(".credito").hide();
	}
	$(document).on( "focusout", "input[name='email']", function(event) {
		var $th = $(this);
		if($th.attr("format") != "null" && $th.attr("format") != undefined){
			var format = $th.attr("format");
			var re = new RegExp(format,"g");
			if(!re.test($th.val()))
				 $th.val("");
		}
	});

	$(document).on( "focusout", "input[name='codigoPos']", function() {
		var $th = $(this);
		if($th.attr("format2") != "null" && $th.attr("format2") != undefined){
			var format = $th.attr("format2");
			var re = new RegExp(format,"g");
			if(!re.test($th.val()))
				 $th.val("");
		}
	});
	
	// Elimina un elemento seleccionado de forma de pago.
	$(document).on("click", "[button-name=btRemove]", function(event) { 
		//se hace un recorrido por el div seleccionado para ver el elemento a borrar y disminuir su conteo en 1
		if (count != 0) { 

			for (var j = 0; j < infopago.length; j++){			
				if (infopago[j] == $(this).closest('div').attr("info-pago")){
					$(this).closest('div').remove();
					count3[j] =  count3[j] - 1;						
				}
			}					
		}
		if (count == 0) { 
			$("#formaPagoTipo"+count).empty();
			$("#formaPagoTipo"+count).remove();
		}
	});
	
	//funcion para retornar las formas de pago y construir el formulario en base a la opcion elegida 
	$("#formasPago").click(function(evento){				
		//Se revisa el json a mostrar con la forma de pago especifica
		$.ajax({
			
		    type: "GET",
		    dataType: "json",
		    url: path+"/formOfPayment/"+$("select[name*='pagos']").val()+"?rnd="+new Date().getTime(),			  
			}).done(function(data,textStatus, jqXHR ) {
				//console.log(data.fields.length);
				count = count + 1;
				var fopCode = data.fopCode;
				var maxfop = data.fopMaxfop;
				//valida el maximo de elementos a crear de la forma de pago especifica
				for (var j = 0; j < infopago.length; j++){
					if (infopago[j] == $("select[name*='pagos']").val()){
						if (count3[j] < maxfop){
							count3[j] =  count3[j] + 1;	
						var CO = count3[2] 
						//alert("CO="+CO);
						//se crean los formularios en base a la forma de pago
						$(formPagoDiv).append('<div id=formaPagoTipo'+ count +' style = "border:1px dashed; padding-left: 30px;" info-pago="'+ fopCode +'" canal="CTO">');
						$("#formaPagoTipo"+count).append('<div class="clear"></div>');					    
					    $("#formaPagoTipo"+count).append('<div class="w-140 f-left pass-label"><p>FORMA DE PAGO:</p></div>');
					    $("#formaPagoTipo"+count).append('<div class="w-140 f-left pass-label"><p>' + data.fopName + '</p></div>');
					    $("#formaPagoTipo"+count).append('<div class="clear"></div>');					    
						for(var i = 0; i< data.fields.length; i++){					
							var labelfield = data.fields[i].name; // name label					
							var idfield = data.fields[i].code; // id del field									
							var namefield = data.fields[i].code; // name del field					
							var fieldtype = data.fields[i].fieldtype; //field type					
							var fieldreq = data.fields[i].required; // field required					
							var minchars = data.fields[i].minchars; //field min chars					
							var maxchars = data.fields[i].maxchars; //field max chars					
							var order = data.fields[i].order; //field order	
							
							//valido si el campo es requerido
							if (fieldreq=="Y")
								claseField = "input-dyn w-240 req";
							else
								claseField = "input-dyn w-240";							
							
						    //agregar campo					
						    $("#formaPagoTipo"+count).append('<div class="w-140 f-left pass-label">'+ labelfield +'</div>');						    
						    $("#formaPagoTipo"+count).append('<div class="w-244 f-left"><div class="content-text-10"></div><input type="text"  class="' + claseField + '" format="' + fieldtype + '" name="' + idfield + count + '" id="'+ idfield + count +'" pattern=".{'+ minchars +"," + maxchars +'}" orden="'+ 1 +'" maxlength="'+ maxchars +'" /></div>');
						    $("#formaPagoTipo"+count).append('<div class="clear"></div>');
						    $("#formaPagoTipo"+count).append('<div class="w-space-min"></div>');
						}				
						$("#formaPagoTipo"+count).append('<input type="button" id=btRemove'+count+'" name=btRemove'+count+' value="Eliminar" button-name="btRemove" style="float:right;" />');
						$("#formaPagoTipo"+count).append('<div class="clear"></div>');
						$("#formaPagoTipo"+count).append('</div>');
						
						}						
						else{
							//alert("limite alcanzado");
							//
							$("#lblmsgerr").html("Limite de forma de pago alcanzado");
							$.colorbox({inline:true, href:$("#errorPop")});
						}
						if ( console && console.log ) {
					         console.log( "La solicitud se ha completado correctamente." );			         			         
								//alert(count);
					     }						
					}
				}
				
			 })
			 .fail(function( jqXHR, textStatus, errorThrown ) {
			     if ( console && console.log ) {
			         console.log( "La solicitud a fallado: " +  textStatus);	
					 $("#lblmsgerr").html("Seleccione una forma de pago");
			         $.colorbox({inline:true, href:$("#errorPop")});
				}
			
			});
	   });	

	$(document).on( "keydown", "input[type='text']:not(input[name='email'])", function(event) {
		if(event.which !=127 && event.which > 46){ //teclas de control
			var $th = $(this);
			if($th.attr("format") != "null" && $th.attr("format") != undefined){
				
				var format = $th.attr("format");
				var re = new RegExp(format,"g");
				if(!re.test(event.key))
					 event.preventDefault();
					//$th.val("");
				//console.log(replace);
				//var replace = $th.attr("format");
				/*var re = new RegExp(replace,"");
			    $th.val( $th.val().replace(re, 
			    		function(str) {  return ''; } ) );*/
				/*if(event.which !=127 && event.which > 31){
					var re = new RegExp("^["+$(this).attr("format")+"]$");
					if(!re.test(event.key))
						 event.preventDefault();
				}*/
			}
		}
	});

	$(document).on( "change", "select[name*='pais']", function() {
		$("select[name*='estado'] option:not(:first)").remove();
		$(".newState, .newState + .select2").remove();
		$.ajax({
			  url: path+"/states/"+$("select[name*='pais']").val()+ "/"+lang+"?rnd="+new Date().getTime()
			}).done(function(data) {				
				$("input[name='estado']").val('');
				if(data.length> 0){
					dropDwn = "<select class='newState e1 populate w-240 req'>";
					dropDwn += "<option value=' '></option>";
					for(var i = 0; i< data.length; i++){
						dropDwn += "<option value='"+data[i].id+"'>"+data[i].name+"</option>";
						//$("select[name*='estado']").append("<option value='"+data[i].id+"'>"+data[i].name+"</option>");
					}
					dropDwn += "</select>";
					$("input[name='estado']").after(dropDwn);
					$("input[name='estado']").hide();
					$(".newState").select2();
				}
				else{
					$("input[name='estado']").show();
				}
			});
		
		//otro ajax para obtener si es requerido el codigo postal y el formato
		$.ajax({
			  url: path+"/zipCode/"+$("select[name*='pais']").val()+"?rnd="+new Date().getTime()
			}).done(function(data) {
				if(data!= null && data.countryCode != null){
					if(data.required == 'Y'){
						$("input[name='codigoPos']").addClass("req");
						$("input[name='codigoPos']").parent().prev().html("* "+$("input[name='codigoPos']").parent().prev().html() );
						//$("input[name='codigoPos']").attr("format2",$("input[name='codigoPos']").attr("format"));
						$("input[name='codigoPos']").attr("format2",data.format);
					}
					else{
						$("input[name='codigoPos']").parent().prev().html($("input[name='codigoPos']").parent().prev().html().replace("* ", ""));
						$("input[name='codigoPos']").removeClass("req");
						$("input[name='codigoPos']").attr("format2", "null");
						$("input[name='codigoPos']").removeClass("error");
					}
				}
				else{
					$("input[name='codigoPos']").parent().prev().html($("input[name='codigoPos']").parent().prev().html().replace("* ", ""));
					$("input[name='codigoPos']").removeClass("req");
					$("input[name='codigoPos']").attr("format2", "null");
					$("input[name='codigoPos']").removeClass("error");
					//$("input[name='codigoPos']").attr("format",$("input[name='codigoPos']").attr("format2"));
				}
			});
	});
	$(document).on( "click", ".itinerary", function() {
		
		$(".detItin").html($(".itineraryDet").eq($(".itinerary").index($(this))).html());
		$.colorbox({inline:true, href:$("#showItin")});
		return false;
	});
	
	$(document).on( "click", ".msgIva", function() {
		//$(".detItin").html($(".itineraryDet").eq($(".itinerary").index($(this))).html());
		$.colorbox({inline:true, href:$("#showMsgIva")});
		return false;
	});
	
	$(document).on( "click", ".startPay", function() {	
		$("form").submit();
	});
	
	$(document).on( "change", ".newState", function() {
		$("input[name='estado']").val($(this).val());
	});
	$(document).on( "submit", "form", function() {		
		estado = false;
		element="";
		//addErrorClass(".req");
		$(".req").each( function( index ) {
		  if(($(this).attr("class").indexOf('select2-container') == -1 && ($(this).val() == null || $(this).val().trim() == "")) || 
			($(this).attr("class").indexOf('select2-container') != -1 && ($(this).prev().val() == null || $(this).prev().val().trim() == "")))	{	

			  if(!estado && $(this).is(':visible')) {
				  element = this;
				  estado =  true;
			  }
			  $(this).addClass("error");
		  }
		  else $(this).removeClass("error");
		});		
		
		if (sClaseRadio[0] == "validate"){						
			addErrorClass(".reqFac");
			$(".reqCref").removeClass("error");
		}else if(sClaseRadio[0] == "novalidate"){
			$(".reqCref").removeClass("error");
		}
		
		if($('input[name=factura]:nth(1)').is(':checked')){	
			addErrorClass(".reqCref");
			$(".reqFac").removeClass("error");
		}	
		
		if($("div[info-pago]").length == 0 && ($("#form-pago").attr("action")) == "/redemd" ){
			 if(!estado) element = $(pagos);
			  $(pagos).addClass("error");
			  estado =  true;			 
		 }
		else{
			if (($("#form-pago").attr("action")) == "/redemd") 
				$(pagos).removeClass("error");
		}
		
		 if(estado) {

			$("#lblmsgerr").html(msgErrorReq);
			$.colorbox({inline:true, href:$("#errorPop")});	
			/* $('html, body').animate({
			        scrollTop: $(element).offset().top
			    }, 1000);*/
			
			 return false;
		 }
		 else{

			/*if($("input[name='numTarjeta']").val().length > parseInt($("input[name='numTarjeta']").attr("maxlength"))){
				$("input[name='numTarjeta']").addClass("error");
				$("#lblmsgerr").html(msgErrorInvCard);
				$.colorbox({inline:true, href:$("#errorPop")});	
				 return false;
			}*/
			if(! $("input[name='tycpayment']").is(':checked')){
				  //levantar pop

				$("#lblmsgerr").html(msgErrorTycPay);
		        $.colorbox({inline:true, href:$("#errorPop")});
				 return false;
			}
			else if( $("input[name='tycprogram']").length > 0 && ! $("input[name='tycprogram']").is(':checked')){
				  //levantar pop
				 $("#lblmsgerr").html(msgErrorTycPro);
		         $.colorbox({inline:true, href:$("#errorPop")});
				
				  return false;
			}
			if($(this).attr("action").indexOf('process') != -1){
				$(".continueOD").attr("disabled", "disabled");
			}
		 }		 		
	});

	$(document).on( "change", "#cardOther:not(.cce)", function() {
		$(".cvv").removeClass("req");
		$(".cvv").val("");
		$("input[name='tarjeta']:not(#cardOther)").parents("tr").find(".cvv").attr("readonly",true);
		$("input[name='tarjeta']:not(#cardOther)").parents("tr").find(".cvv").attr("name","cvv");
		//$("input[name='tarjeta']:not(#cardOther)").parents("tr").find(".cvv").attr("name","cvvSelected");
		
		$(".other input:not(#checkSaveCard)").val('');
		$(".other select").val(' ').change();
		if($(this).is(':checked')){
			$(".other").show();
			$(".bancoDiv").hide();
		}
		$(".checkDiv").before($(".cuotasDiv"));
	});
	$(document).on( "focusout", "input[name*='-out']", function() {
		if($(this).val().trim() != "")
		$("input[name*='"+$(this).attr("name").substring(0, $(this).attr("name").indexOf("-out"))+"']").val($(this).val());
	});
	$(document).on( "change", "input[name='tarjeta']:not(#cardOther):not(.cce)", function() {
		$(".selectcardtopay").append($(".cuotasDiv"));
		$(".cvv").removeClass("req");
		$(".cvv").val("");
		$("input[name='tarjeta']:not(#cardOther)").parents("tr").find(".cvv").attr("readonly",true);
		$("input[name='tarjeta']:not(#cardOther)").parents("tr").find(".cvv").attr("name","cvv");
		//$("input[name='tarjeta']:not(#cardOther)").parents("tr").find(".cvv").attr("name","cvvSelected");
		
		if($(this).is(':checked')){
			$(".bancoDiv").show();
			$(".other").hide();
			$(this).parents("tr").find(".cvv").attr("readonly", false);
			$(this).parents("tr").find(".cvv").attr("name", "cvvSelected");
			$(this).parents("tr").find(".cvv").focus();
			$(this).parents("tr").find(".cvv").addClass("req");
			//ajax
			$.ajax({
			  url: path+"/getCreditCardInfo/"+$(this).val()+"?rnd="+new Date().getTime()
			}).done(function(data) {
				//console.log(data);
				$("input[name='direccion']").val(data.address1);
				$("input[name='direccion2']").val(data.address2);
				$("select[name='pais']").val(data.country); //data.pais <-- viene con 3 digitos :s
				$("input[name='estado']").val(data.state);
				$("input[name='ciudad']").val(data.city);
				$("input[name='codigoPos']").val(data.postalCode);
				$("input[name='telefono']").val(data.phoneNumber);
				$("input[name='email']").val(data.email);
				$("input[name='nombres']").val(data.givenName);
				$("input[name='apellidos']").val(data.familyName);
				$("select[name='tipoDocumento']").val(data.documentType); //data.documentType);
				$("input[name='numTarjeta']").val(data.cardNumber);
				$("input[name='documento']").val(data.documentNumber);
				$("select[name='franquicia']").val($("select[name='franquicia'] option:contains('"+data.cardType+"')").val()); // data.cardType
			});
		}
	});
	

	$("input[name='tarjeta']:checked").change();
});

function addErrorClass(validateClass){
	$(validateClass).each( function( index ) {			
		if(($(this).attr("class").indexOf('select2-container') == -1 && $(this).val().trim() == "") || 
			($(this).attr("class").indexOf('select2-container') != -1 && $(this).prev().val().trim() == ""))	{
			  if(!estado && $(this).is(':visible')) {
				  element = this;
				  estado =  true;
			  }
			  $(this).addClass("error");
		  }
		  else $(this).removeClass("error");
		});
}