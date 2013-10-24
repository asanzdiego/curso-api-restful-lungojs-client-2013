# APIs RESTful

## ¿Qué es REST?

- REST (**Representational State Transfer**) es una técnica de arquitectura de
  software para sistemas hipermedia distribuidos como la World Wide Web.

- En REST una **URL** (Uniform Resource Locator) representa un **recurso**.

- Se puede acceder al recurso o modificarlo mediante los **métodos del protocolo HTTP**:

        GET, POST, PUT, DELETE

## Ejemplo API

- **http://myhost.com/talk**

    - GET > Devuelve todas las charlas.
    - POST > Crear una nueva charla.

- **http://myhost.com/talk/123**

    - GET > Devuelve la charla con id=123
    - PUT > Actualiza la charla con id=123
    - DELETE > Borra la charla con id=123

## Manejo de errores

- **Se pueden utilizar los errores del protocolo HTTP**:

    - 200 Successful
    - 201 Created
    - 202 Accepted
    - 301 Moved Permanently
    - 400 Bad Request
    - 401 Unauthorised
    - 402 Payment Required
    - 403 Forbidden
    - 404 Not Found
    - 405 Method Not Allowed
    - 500 Internal Server Error
    - 501 Not Implemented

## ¿Por qué REST?

- Es **más sencillo** (tanto la API como la implementación).
- Es **más rápido** (peticiones más lijeras que se pueden cachear).
- Es **multiformato** (HTML, XML, JSON, etc.).
- Se complementa muy bien con **AJAX**.

## REST vs RESTful

- REST se refiere a un tipo de arquitectura de software

    - Se utiliza como **nombre**
    - Se utiliza como por ejemplo: success = éxito.

- Si un servicio web es REST**ful** indica que implementa dicha arquitectura.

    - Se utiliza como **adjetivo**
    - Se utiliza como por ejemplo: success**ful** = éxito**so**).

## REST vs RESTful

- A veces el **ful** se confunde con **full** = completo.

    - Y se refiere a los servicios web REST**full** 

            Aquellos que implementan una API con
            todos los métodos del protócolo HTTP.

    - Y se refiere a los servicios web REST (**sin el full**)

            Aquellos que NO implementan una API con
            todos los métodos del protócolo HTTP.

# Lungo.js

## Competidores

- jQTouch: [http://jqtjs.com/](http://jqtjs.com/)
- Sencha Touch: [http://www.sencha.com/products/touch/](http://www.sencha.com/products/touch/)
- jQueryMobile: [http://jquerymobile.com/](http://jquerymobile.com/)
- hammer.js: [http://eightmedia.github.io/hammer.js/](http://eightmedia.github.io/hammer.js/)

## Directorios

- Puedes usar la estructura de directorios que quieras.

- Yo he usado esta:

    - **html**: los HTML con una carpeta para cada entidad del domino
    - **js**: los JS con una carpeta para cada entidad del domino
    - **lib**: carpeta con las dependencias a otros proyectos

        - Lungo depende de Quo que es una librería de los mismos auotres
          de 'tipo' jQuery enfocada a móviles

## js/util.js

~~~{.JavaScript}
// Searh
$$('document').ready(function(){
    Lungo.dom('input[type=search]').on('keyup', ...);
});

// Server URL
var util_server_url = "http://localhost:3000";

// Error Notification
var util_errorNotification = function(message, error) {
    Lungo.Notification.error(message, "", "warning-sign", 2);
};

// Métodos REST
var util_ajaxGet = function(url, data, callback) {
    $$.get(util_server_url+url, data, ..., 'json');
};
var util_ajaxPost = function(url, data, callback) {...};
var util_ajaxPut = function(url, data, callback) {...};
var util_ajaxDelete = function(url, data, callback) {...};
~~~

## html/talk/talk-add.html

~~~{.html}
<body class="app">
 <section id="main" data-transition="">
  <header data-title="Add Talk" class="extended"></header>
  <footer>
   <nav>
    <a href="talk-list.html" data-icon="list"></a>
    <a href="talk-add.html" data-icon="plus" class="active"></a>
   </nav>
  </footer>
  <article id="main-article" class="active list">
   <div class="form">
    <fieldset>
     <label>NAME:</label><input type="text" id="talkName" />
    </fieldset>...
   </div>
   <div>
    <a href="#addTalk" id="addTalk" class="button">Add</a>
    <a href="talk-list.html" class="button cancel">Cancel</a>
   </div>
  </article>
 </section>
</body>
~~~

## js/talk/talk-add.js

~~~{.JavaScript}
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
~~~

## html/talk/talk-edit.html

~~~{.html}
<body class="app">
 <section id="main" data-transition="">
  <header data-title="Edit Talk" class="extended"></header>
  <nav data-control="groupbar">
   <a href="#editTalkArticle" ...>Edit</a>
   <a href="#deleteTalkArticle" ...>Delete</a>
  </nav>
  <footer>
   ...
  </footer>
  <article id="editTalkArticle" class="list indented scroll">
   ...
  </article>
  <article id="deleteTalkArticle" class="list indented scroll">
   ...
  </article>
 </section>
</body>
~~~

## js/talk/talk-get.js

~~~{.JavaScript}
$$('document').ready(function(){

 var talkId = util_urlParams["talkId"];

 // get data from server
 util_ajaxGet('/talk/'+talkId, {}, function(json) {
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
  ...
 };
});
~~~

## js/talk/talk-update.js

~~~{.JavaScript}
$$('#saveTalk').tap(function(){

 var talkId = util_urlParams["talkId"];

 var data = {
  talkName:        $$("#talkName").val(),
  ...
 };

 // send data to server
 util_ajaxPut('/talk/'+talkId, data, function(json) {
  if(!json || json.error) {
   util_errorNotification('ERROR saving talk', json.error);
  } else {
   util_successNotification('Talk saved', function() {
    window.location.replace('talk-list.html');
   });
  }
 });
});
~~~

## js/talk/talk-delete.js

~~~{.JavaScript}
$$('#deleteTalk').tap(function(){

 var talkId = util_urlParams["talkId"];

 // send data to server
 util_ajaxDelete('/talk/'+talkId, {}, function(json) {
  if(!json || json.error) {
   util_errorNotification('ERROR deleting talk', json.error);
  } else {
   util_successNotification('Talk deleted', function() {
    window.location.replace('talk-list.html');
   });
  }
 });
});
~~~

## html/talk/talk-list.html

~~~{.html}
<body class="app">
 <section id="main" data-transition="">
  <header data-title="Talks List" class="extended"></header>
  <footer>
   <nav>
    <a href="talk-list.html" data-icon="list" class="active"></a>
    <a href="talk-add.html" data-icon="plus"></a>
   </nav>
  </footer>
  <article id="main-article" class="active list indented scroll">
   <div class="form">
    <fieldset data-icon="search">
     <input type="search" placeholder="Search...">
    </fieldset>
   </div>
   <ul id="talks"></ul>
  </article>
 </section>
</body>
~~~

## js/talk/talk-list.js

~~~{.JavaScript}
$$('document').ready(function(){

 // get data from server
 util_ajaxGet('/talk', {}, function(json) {
  if(!json || json.error) {
   util_errorNotification('ERROR retrieving talks', json.error);
  } else {
   drawTalks(json);
  }
 });

 // draw data
 var drawTalks = function(talks) {
  for (var i = 0; i < talks.length; i++) {
   var talk = talks[i];
   $$("#talks").append(
    '<li data-action="search" class="selectable">'+
     '<a href="talk-edit.html?talkId='+talk._id+'">'+
      '<strong>'+talk.talkName+'</strong></a></li>');
  }
 };
});
~~~
