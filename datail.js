var comment;
var created_at;
var date_reported;
var id;
var latitude;
var longitude;
var updated_at;
var state;
var param;
var target;

window.onload = function onLoad() {
  param = GetQueryString();
  id = document.getElementById("id");
  id.innerHTML = param["id"];
  state = document.getElementById("state");
  prefDisp(param["id"]);
}

function GetQueryString() {
  if (1 < document.location.search.length) {
    // 最初の1文字 (?記号) を除いた文字列を取得する
     var query = document.location.search.substring(1);
 
    // クエリの区切り記号 (&) で文字列を配列に分割する
     var parameters = query.split('&');
 
    var result = new Object();
    for (var i = 0; i < parameters.length; i++) {
      // パラメータ名とパラメータ値に分割する
       var element = parameters[i].split('=');
 
      var paramName = decodeURIComponent(element[0]);
      var paramValue = decodeURIComponent(element[1]);
 
      // パラメータ名をキーとして連想配列に追加する
       result[paramName] = decodeURIComponent(paramValue);
    }
    return result;
  }
  return null;
}

function prefDisp(id) {
  state.innerHTML = "処理中です・・・<br />\n";
//  var url = "http://ino44-api.herokuapp/reports/";
  var url = id + ".json";
  var paramList = "";

  new Ajax.Request(url,
    {
      method: 'get',
      onSuccess: getreported,
      onFailure: showErrMsg,
      parameters: paramList
  });

  function getreported(data){
    var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function () {
       if (xmlhttp.readyState == 4) {
         if (xmlhttp.status == 200) {
           var data = JSON.parse(xmlhttp.responseText);
 
           var elem = document.getElementById("comment");
           elem.innerText = data.comment;
           var elem = document.getElementById("created_at");
           elem.innerText = data.created_at;
           var elem = document.getElementById("date_reported");
           elem.innerText = data.date_reported;
           var elem = document.getElementById("id");
           elem.innerText = data.id;
           var elem = document.getElementById("latitude");
           elem.innerText = data.latitude;
         } else {
         }
       }
     }
     xmlhttp.open("GET", id + ".json");
     xmlhttp.send();
    state.innerHTML = "データを取得しました。<br />\n";

  }

  function showErrMsg(){
    clearDisp();
    state.innerHTML = "データを取得できませんでした。<br />\n";
  }
}

function clearDisp() {
  comment.innerHTML = "";
  created_at.innerHTML = "";
  date_reported.innerHTML = "";
  id.innerHTML = "";
  latitude.innerHTML = "";
  longitude.innerHTML = "";
  updated_at.innerHTML = "";
  state.innerHTML = "";
}