// ==UserScript==
// @name         cookie clicker hack
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  automating cookie production
// @author       You
// @match        http://orteil.dashnet.org/cookieclicker/
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// @updateURL    https://raw.githubusercontent.com/xswzaq44321/Cookie-Clicker-Hack/master/cookie_clicker_hack.user.js
// @downloadURL  https://raw.githubusercontent.com/xswzaq44321/Cookie-Clicker-Hack/master/cookie_clicker_hack.user.js
// ==/UserScript==

$(document).ready(function() {
    setInterval(function(){ Game.ClickCookie();}, 10);
    console.log("autoClicked");
    setInterval(function(){
        var toBuy = null, max = 0;
        if(toBuy == null){
            for(var i = 0; i <= 14; i++){
                var me = Game.ObjectsById[i];
                if(me == null){
                    continue;
                }
                if(max < me.storedCps / me.price){
                    max = me.storedCps / me.price;
                    toBuy = me;
                }
            }
        }
        var childs = document.getElementById("upgrades");
        for(i = 0; i < childs.childElementCount; i++){
            var child = childs.childNodes[i];
            var data = child.getAttribute("onclick").split("[")[1].split("]");
            if(child != null && Game.UpgradesById[data[0]].basePrice < toBuy.price){
                child.onclick();
                console.log("buy upgrade " + Game.UpgradesById[data[0]].name);
                return;
            }
        }
        console.log("buy product "+toBuy.name);
        if(toBuy != null){
            toBuy.buy();
        }
    }, 100);

    setInterval(function(){
        for(var i in Game.shimmers){
            Game.shimmers[i].pop();
        }
    }, 1000);
});
