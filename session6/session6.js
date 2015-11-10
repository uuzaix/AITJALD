$('#SelectAll').click(function(){
	$('input[type=checkbox]').attr('checked', 'checked');
});

$('#AddNew').click(function(){
	$('#paraWhere').after('<a href="https://www.google.com/maps/place/Institut+f%C3%BCr+Geoinformatik/@51.9691134,7.5957799,15z">See location at Google Maps</a>');
});

$('#FadeOutParagraphs').click(function(){
	$('p').fadeOut(5000);
});

$('#HideInput').click(function(){
	$('input').hide();
});

$('#DisableSubmit').click(function(){
	$('input[type=submit]').attr('disabled', 'disabled');
});

$('#datepicker').datepicker({
	dateFormat: "yy-mm-dd"
});

$('#sendbutton').click(function(){
	$('#welldone').fadeIn(500);
});