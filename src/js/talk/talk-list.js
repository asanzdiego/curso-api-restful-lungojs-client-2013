$$('document').ready(function(){
    
    var data = {};
    
    // get data from server
    util_ajaxGet('/talk', data, function(json) {

        if(!json || json.error) {
        
            util_errorNotification('ERROR retrieving talks', json.error);
        
        } else {

            var talks = json;

            console.log(talks.length+' talks retrieved');
            drawTalks(talks);
        }
    });
    
    // draw data
    var drawTalks = function(talks) {
    
        for (var i = 0; i < talks.length; i++) {
        
            var talk = talks[i];
            
            $$("#talks").append(
                '<li data-action="search" class="selectable">'+
                    '<a href="talk-edit.html?talkId='+talk._id+'">'+
                        '<strong>'+talk.talkName+' ('+util_dateToString(talk.talkDate)+')</strong>'+
                        '<small>'+talk.talkSpeaker+' ('+talk.talkSpeakerMail+')</small>'+
                        '<small>Points: '+talk.talkPoints+'</small></a></li>');
        }
    };
});
