$$('document').ready(function(){
    
    $$('#addTalk').tap(function(){

        var data = {
            talkName:        $$("#talkName").val(),
            talkDate:        util_stringToDate($$("#talkDate").val()),
            talkSpeaker:     $$("#talkSpeaker").val(),
            talkSpeakerMail: $$("#talkSpeakerMail").val(),
            talkPoints:      $$("#talkPoints").val()
        };

        // send data to server
        util_ajaxPost('/talk', data, function(json) {

            if(!json || json.error) {

                util_errorNotification('ERROR adding talk', json.error);

            } else {

                util_successNotification('Talk saved', function() {
                    window.location.replace('talk-list.html');
                });
            }
        });
    });
});
