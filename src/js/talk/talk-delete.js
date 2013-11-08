$$('document').ready(function(){
    
    var talkId = util_urlParams["talkId"];
    var goto = '/talk/'+talkId;
    var data = {};
    
    $$('#deleteTalk').tap(function(){

        // send data to server
        util_ajaxDelete(goto, data, function(json) {

            if(!json || json.error) {
            
                util_errorNotification('ERROR deleting talk', json.error);
            
            } else {
            
                util_successNotification('Talk deleted', function() {
                    window.location.replace('talk-list.html');
                });
            }
        }); 
    });
});
