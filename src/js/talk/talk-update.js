$$('document').ready(function(){
    
    var talkId = util_urlParams["talkId"];
    var goto = '/talk/'+talkId;
    var data = {};
        
    $$('#saveTalk').tap(function(){

        data = {
            talkName:        $$("#talkName").val(),
            talkDate:        util_stringToDate($$("#talkDate").val()),
            talkSpeaker:     $$("#talkSpeaker").val(),
            talkSpeakerMail: $$("#talkSpeakerMail").val(),
            talkPoints:      $$("#talkPoints").val()
        };

        // send data to server
        util_ajaxPut(goto, data, function(json) {

            if(!json || json.error) {
                
                util_errorNotification('ERROR saving talk', json.error);

            } else {

                util_successNotification('Talk saved', function() {
                    window.location.replace('talk-list.html');
                });
            }
        });
    });
});
