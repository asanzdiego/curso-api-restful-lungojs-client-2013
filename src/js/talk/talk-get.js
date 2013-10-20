$$('document').ready(function(){
    
    var talkId = util_urlParams["talkId"];
    var goto = '/talk/'+talkId;
    var data = {};
    
    // get data from server
    util_ajaxGet(goto, data, function(json) {

        if(!json || json.error) {

            util_errorNotification('ERROR retrieving talk', json.error);

        } else {

            var talk = json;

            console.log('Talk retrieved');
            drawTalk(talk);
        }
    });
    
    // draw data
    var drawTalk = function(talk) {
    
        $$("#talkName").val(talk.talkName);
        $$("#talkDate").val(util_dateToString(talk.talkDate));
        $$("#talkSpeaker").val(talk.talkSpeaker);
        $$("#talkSpeakerMail").val(talk.talkSpeakerMail);
        $$("#talkPoints").val(""+talk.talkPoints);
    };
});
