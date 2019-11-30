function showIntermediatePage(submitActions,formAction,typeProcess){
		if(submitActions.indexOf(formAction) >-1){
			if(typeProcess==="notRedeem"){
				$.colorbox({
					escKey: false,
					overlayClose: false, 
					closeButton: false,
					innerWidth:"800px", 
					innerHeight:"500px",
					inline:true, 
					scrolling:false,
					href:$("#intermediatePageNotRedeem")});
			}else{
				$.colorbox({
					escKey: false,
					overlayClose: false, 
					closeButton: false,
					innerWidth:"800px", 
					innerHeight:"500px",
					inline:true,
					scrolling:false,
					href:$("#intermediatePageRedeem")});
			}
			
		}
	}