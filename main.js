let liveryobj;
let panelopen = 0;
let multiplayertexture

//init

async function init(){

    // Panel for list
    
    let listdiv = document.createElement("div");
    listdiv.setAttribute("data-noblur", "true");
    listdiv.setAttribute("data-onshow", "{geofs.initializePreferencesPanel()}");
    listdiv.setAttribute("data-onhide", "{geofs.savePreferencesPanel()}");
    listdiv.setAttribute("class", "geofs-list geofs-toggle-panel geofs-livery-list geofs-visible")
    listdiv.innerHTML = '<h3><img src=https://raw.githubusercontent.com/Sunrise-6/Kittyo-Group-Livery-Selector/main/images/KGLS-transparent.png" width="95%" title="Livery selector" style="display: block; margin-left: auto; margin-right: auto; border-radius: 20%"/></h3><div class="mdl-textfield mdl-js-textfield geofs-stopMousePropagation geofs-stopKeyupPropagation" style="width: 100%; padding-right: 86px;"><input class="mdl-textfield__input address-input" type="text" id="address" placeholder="Search liveries" onkeydown="search(this.value)" id="searchlivery"><label class="mdl-textfield__label" for="searchlivery">Search liveries</label></div><h6>Favorite liveries</h6><ul id="favorites" class="geofs-list geofs-visible"></ul><h6>Available liveries</h6><ul id="liverylist" class=" geofs-list geofs-visible"></ul>'
    document.getElementsByClassName("geofs-ui-left")[0].appendChild(listdiv);

    let aboutdiv = document.createElement("div");
    aboutdiv.setAttribute("data-noblur", "true");
    aboutdiv.setAttribute("data-onshow", "{geofs.initializePreferencesPanel()}");
    aboutdiv.setAttribute("data-onhide", "{geofs.savePreferencesPanel()}");
    aboutdiv.setAttribute("class", "geofs-list geofs-toggle-panel geofs-about-list geofs-visible")
    aboutdiv.innerHTML = '<style> .aboutButton { background-color: rgb(46, 65, 94, 0.6); border-radius: 15px / 15px; border: none; color: white; padding: 15px 25px; text-align: center; text-decoration: none; display: inline-block; font-size: 9px; margin: 4px 2px; cursor: pointer; } .aboutDiv { background-color: rgb(211, 211, 211, 0.3); border-radius: 15px / 15px; border: none; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 13px; margin: 4px 2px; width: 90%; } </style> <h3> <img src="https://raw.githubusercontent.com/Sunrise-6/Kittyo-Group-Livery-Selector/main/images/KGLS-transparent.png" width="95%" title="Livery selector" style=" display: block; margin-left: auto; margin-right: auto; border-radius: 20%; " /> </h3> <div class = "aboutDiv"> <h4 style="font-weight: normal">About KittyoLS</h4> Links below!! </div> <div class = "aboutDiv"> <button class = "aboutButton" onclick= "redirect(0)" > Github LS Releases </button> <button class = "aboutButton" onclick="redirect(1))" > Github LS Prereleases </button> <button class = "aboutButton" onclick="redirect(2)" > Project Roadmap </button> <button class = "aboutButton" onclick="redirect(3)"> Feedback Here! </button> </div> <div class = "aboutDiv"> <h5 style="font-weight: normal">Maintained by Parrot Man & Sunrise 6</h5> <h5 style="font-weight: normal">Based off the Kolos26 Livery Selector</h5> For more information about Livery Selector or issues please check the Github Releases page. </div> <div class = "aboutDiv"> <br> Build Number: v1.1.0p-1 </br> <br> JSC Kernel: v2.0.3 </br> <br> TPM Kernel: v2.0.3 </br> </div>' //Add stuff here
    document.getElementsByClassName("geofs-ui-left")[0].appendChild(aboutdiv);
    

    // Button for panel
    let buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = '<button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-toggle-panel=".geofs-livery-list" data-tooltip-classname="mdl-tooltip--top" id="liverybutton" tabindex="0" data-upgraded=",MaterialButton" onclick="listLiveries()" title="Change livery">LIVERY</button>'
    document.body.appendChild(buttonDiv);
    let element = document.getElementById("liverybutton");
    if (geofs.version >= 3.6){
        document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(element, document.getElementsByClassName("geofs-ui-bottom")[0].children[4]);
    } else {
        document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(element, document.getElementsByClassName("geofs-ui-bottom")[0].children[3]);
    }

    let buttonTwoDiv = document.createElement("div");
    buttonTwoDiv.innerHTML = '<button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-toggle-panel=".geofs-about-list" data-tooltip-classname="mdl-tooltip--top" id="aboutbutton" tabindex="0" data-upgraded=",MaterialButton" onclick="aboutPage()" title="About LS">(?)</button>'
    document.body.appendChild(buttonTwoDiv);
    let elementTwo = document.getElementById("aboutbutton");
    if (geofs.version >= 3.6){
        document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(elementTwo, document.getElementsByClassName("geofs-ui-bottom")[0].children[5]);
    } else {
        document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(elementTwo, document.getElementsByClassName("geofs-ui-bottom")[0].children[4]);
    }

    let styles = document.createElement("div");
    styles.innerHTML = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/><style>.checked {text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;color: rgb(255,193,7); display: inline; text align: right; cursor: pointer;}.nocheck {text-shadow: 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;color: white; display: inline; text align: right; cursor: pointer;}</style>';
    document.body.appendChild(styles);

    //Load liveries


    await fetch("https://raw.githubusercontent.com/Sunrise-6/Kittyo-Group-Livery-Selector/main/livery.json").then(res => res.json()).then(data => liveryobj = data)

    //remove original buttons

    document.querySelectorAll('[data-livery]').forEach(function(e){
        e.parentElement.removeChild(e);
    })

}

// Open external webpages!
function redirect(webpageSelect){
    if (webpageSelect == 0){
        window.open("https://github.com/Sunrise-6/Kittyo-Group-Livery-Selector");
    }
    if (webpageSelect == 1){
        window.open("https://github.com/GrumpyMusician/Kittyo-Group-LS-Prerelease/tree/main");
    }
    if (webpageSelect == 2){
        window.open("https://docs.google.com/document/d/1zbSxtskQzCmVbgs93H4jcPZ2rJ7LBL9yUURcCs6yh64/edit?usp=sharing");
    }
    if (webpageSelect == 3){
        window.open("https://docs.google.com/forms/d/e/1FAIpQLScgcPHYzc96PIP6G6KOIjxQg678isy7921l3Vksqp7XBfrdmA/viewform");
    }
}

function loadLivery(texture, index, parts){
    //change livery
    //console.log(texture.length);
    for(let i = 0; i<texture.length; i++){
        //console.log(i)
        //console.log(texture[i]+"-"+mode[i]+"-"+parts[i]);
        if (geofs.version == 2.9) {
            geofs.api.Model.prototype.changeTexture(texture[i], index[i], geofs.aircraft.instance.definition.parts[parts[i]]["3dmodel"]);
            } else {
            geofs.api.changeModelTexture(geofs.aircraft.instance.definition.parts[parts[i]]["3dmodel"]._model, texture[i], index[i]);
        }
        //change multiplayer texture
        multiplayertexture = texture;
    };
}

function sortList(id) {
    var list, i, switching, b, shouldSwitch;
    list = document.getElementById(id);
    switching = true;
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("LI");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
  }

function listLiveries(){
    document.getElementById("liverylist").innerHTML = "";

    let airplane = geofs.aircraft.instance.id;

    let index = liveryobj.aircrafts[airplane].index;
    let parts = liveryobj.aircrafts[airplane].parts;

    liveryobj.aircrafts[airplane].liveries.forEach(function(e){
        var dropdown = document.createElement('li');
//        dropdown.setAttribute("style", "display: table;")
        dropdown.setAttribute("onpointerenter", "this.style.background='#dedede'");
        dropdown.setAttribute("onpointerleave", "this.style.background='#ffffff'");
        dropdown.innerHTML = e.name;
        let star = document.createElement("span");
        star.setAttribute("class", "fa fa-star nocheck");
        star.setAttribute("id", geofs.aircraft.instance.id + "_" + e.name);
        star.setAttribute("onclick", "star(this)");
        star.setAttribute("style", "float: right; padding-top: 15px;")
        dropdown.appendChild(star);
        dropdown.style.display = "block";
        dropdown.setAttribute("id", geofs.aircraft.instance.id + "_" + e.name + "_button");
        document.getElementById("liverylist").appendChild(dropdown);
        dropdown.setAttribute("onclick", 'loadLivery(["'+ e.texture.toString().replaceAll(',', '","') +'"], ['+ index +"], ["+ parts +"])")
    })
    sortList("liverylist");
    loadFavorites();
    sortList("favorites");
}

function search(text){
    //console.log("search");
    if (text === ""){
        listLiveries();
    }

    else {
        var liveries = document.getElementById("liverylist").childNodes;
        liveries.forEach(function(e){
            if (e.innerText.toLowerCase().includes(text.toLowerCase())){
                e.style.display = "block";
            }
            else {
                e.style.display = "none";
            }
        })
    }
}

function star(element){
    let e = element.classList;
    //console.log(e);
    //console.log("clicked");
    if (e == "fa fa-star nocheck"){
        //console.log("checked");
        let btn = document.getElementById(element.id +"_button");
        let fbtn = document.createElement("li");
        fbtn.innerText = btn.innerText;
        fbtn.setAttribute("id", element.id + "_favorite");
        fbtn.setAttribute("onclick", btn.getAttribute('onclick'));
        document.getElementById("favorites").appendChild(fbtn);
        let list = localStorage.favorites.split(",");
        list.push(element.id);
        list = [...new Set(list)]
        localStorage.favorites = list;

    }
    else if (e == "fa fa-star checked"){
        //console.log("checked out");
        document.getElementById("favorites").removeChild(document.getElementById(element.id + "_favorite"));
        let list = localStorage.favorites.split(",");
        let index = list.indexOf(element.id);
        if (index !== -1) {
            list.splice(index, 1);
        }
        localStorage.favorites = list;
    }
    //style animation
    e.toggle("checked");
    e.toggle("nocheck");
}

function loadFavorites(){
    document.getElementById("favorites").innerHTML = "";
    let list = localStorage.favorites.split(",");
    //console.log(list);
    let airplane =  geofs.aircraft.instance.id;
    list.forEach(function(e){
        //console.log(e.slice(0, airplane.length));
        if ((airplane == e.slice(0, airplane.length)) && (e.charAt(airplane.length) == "_")){
            star(document.getElementById(e));
            //console.log(document.getElementById("favorites").innerHTML);
        }
    })
}

function updateMultiplayer(){
    Object.values(multiplayer.visibleUsers).forEach(function(e){
        geofs.api.changeModelTexture(multiplayer.visibleUsers[e.id].model, multiplayertexture, 0);
        })
}

init();

let refreshMultiplayer = setInterval(function(){  
    updateMultiplayer();
}, 5000)
