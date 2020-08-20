function comp_fun(id){
	if(document.getElementById(id + 'a').style.display == "none"){
		document.getElementById(id + 'a').style.display = "";
		document.getElementById(id + 'c').setAttribute("class", "fas fa-caret-up");

	}
	else{
		document.getElementById(id + 'a').style.display = "none";
		document.getElementById(id + 'c').setAttribute("class", "fas fa-caret-down");
	}
	
}