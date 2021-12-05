// @id             TabunBS
// @name           TabunBigSister
// @version        1.3
// @namespace
// @author         Zayka
// @description
// @include        http://tabun.everypony.ru/blog/*
// @include        https://tabun.everypony.ru/blog/*
// @run-at         document-end
// @require    	   https://code.jquery.com/jquery-2.1.1.min.js
// @grant 		   GM_addStyle
// @grant 		   GM_getResourceText
// ==/UserScript==

/* global $ */

function MyLittleCallback(msg)
{
	var names = $("<div>", { class: "names"});
	for (var i = 0;i<msg.length;i++)
	{
		var color = "grey";
		if (msg[i].event.result>0) color = "green"
		else if (msg[i].event.result<0) color = "red"
        var name = $("<font>",{color:color});
		//console.log(name);
		//name.append("<b>"+msg[i].event.autor+"</b> ");
        name.append("<a href=https://tabun.everypony.ru/profile/"+msg[i].event.autor+"/ target=_blank style=text-decoration:none;color:"+color+";><b>"+msg[i].event.autor+"</b></a> ");
		names.append(name);
	}
	$("header").find(".topic-info").append(names);
}
let pattern = /http[\w\W\s\S]+?([\d]+)[\.]/g;
var topicN=pattern.exec(document.URL);
$.ajax({
	type:"POST",
	dataType: "json",
	data:"id="+topicN[1],
	url:"https://tabunstats.com/events/", //
	success: function (msg){MyLittleCallback(msg)},
	error: function (jqXHR, textStatus, errorThrown )
	{
		console.log("jqXHR:"+jqXHR);
		console.log("textStatus:"+textStatus);
		console.log("errorThrown:"+errorThrown);
	}
});
