function num(){
	var inc="weather.html";
	var aiframe=document.createElement("iframe");
	aiframe.style.width="100%";
	aiframe.style.height="100%";
	aiframe.src=inc;
	document.getElementById("map").appendChild(aiframe);
}
num();
