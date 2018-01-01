$(document).ready(function(){
	
   //submission scripts
  $('.contactForm').submit( function(){
		//statements to validate the form	
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var email = document.getElementById('e-mail');
		if (!filter.test(email.value)) {
			$('.email-missing').css({'opacity': 1 });
		} else {$('.email-missing').css({'opacity': 0 });}
		if (document.cform.name.value == "") {
			$('.name-missing').css({'opacity': 1 });
		} else {$('.name-missing').css({'opacity': 0 });}	
		if (document.cform.message.value == "") {
			$('.message-missing').css({'opacity': 1 });
		} else {$('.message-missing').css({'opacity': 0 });}		
		if ((document.cform.name.value == "") || (!filter.test(email.value)) || (document.cform.message.value == "")){
			return false;
		} 
		
		if ((document.cform.name.value != "") && (filter.test(email.value)) && (document.cform.message.value != "")) {
		
			//show the loading bar
			$('.loader').append();
		
			////send the ajax request
			//$.post('mail.php',{name:$('#name').val(),
			//				  email:$('#e-mail').val(),
			//				  message:$('#message').val()},
		
			////return the data
			//function(data){
			//  //hide the graphic
			//  $('.loader').append(data).slideDown(800);
			//});
          
            //waits 2000, then closes the form and fades out
			setTimeout('$(".mail_response").slideUp(800)', 6000);
          
			//stay on the page
			return false;
		} 
  }); 
});