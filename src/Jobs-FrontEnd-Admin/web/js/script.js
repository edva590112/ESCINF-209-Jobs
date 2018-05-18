
        function add(){    
        window.alert($("#username").val());
        //window.alert($("#password").val());
        //$("#formulario").trigger("reset");
        //document.getElementById("formulario").reset();
      var admin = {
        administradorUserName:$("#username").val(),
        administradorClave:$("#password").val()
      }  
      if (check(admin)) {    
        addToDataBase(admin);
        //updateList(admin);
      }
    }
function updateList(obj){
  //var list =$("#list");
  //window.alert(obj.administradorUserName);
   $("#list").append("<tr><td>"+obj.administradorUserName+"</td>"+
              "<td>"+obj.administradorClave+"</td></tr>");
  //window.alert(obj.administradorUserName+" "+obj.administradorClave);zzz
  /*tr.setAttribute("administradorUserName",obj.administradorUserName);
	tr.persona=obj;*/
}
function check(obj){
  $("#username_error").text("");
  $("#password_error").text("");
  if (obj.administradorUserName == "" || obj.administradorClave == "") {
    showErrorMessage(obj);
    return false;
  }
  else {      
    return true;
  }
}
function addToDataBase(obj){
    
    data=new FormData();
    data.append("objeto",JSON.stringify(obj));
    $.ajax({type: "POST", 
                  url:"add", 
                  data:data,
                  datatype:'json',
                  processData: false,
                  contentType: false,                  
                  success: 
                    function(object){
                        updateList(object); 
                        $("#formulario").trigger("reset");
                        //alert("success : "+object.administradorUserName);
                    },
                  error: function(status){
                         window.alert("Error");
                    }                    
                }); 
}
function showErrorMessage(obj){
  if (obj.administradorUserName == "" && obj.administradorClave == "") {
    $("#username_error").text("Ingrese un nombre de Usuario");
    $("#password_error").text("Ingrese una Contrasenha");
  }
  else if (obj.administradorUserName == "") {
    $("#username_error").text("Ingrese un nombre de Usuario");
  }
  else {
    $("#password_error").text("Ingrese una Contrasenha");
  }
}
function remove(x){
        alert("Remove:"+x.id);
        $("#"+x.id).remove();
    }
function update(x){
        alert("Update:"+x.id);
    }
function aproveOferente(x){
    //alert(x.id);
    changeEstadoOferente(x,"APROVADO") 
}
function disaproveOferente(x){
    //alert(x.id);
    changeEstadoOferente(x,"DENEGADO") 
}
function changeEstadoOferente(x,estado){    
    alert(x.id+" "+estado);
    $("tr#"+x.id).remove();
   
    data=new FormData();
    data.append("Email",x.id);
    data.append("Estado",estado);
    $.ajax({type: "POST", 
                  url:"changeEstadoOferente", 
                  data:data,                  
                  processData: false,
                  contentType: false,                  
                  success: 
                    function(object){                        
                        $("#"+x.id).remove();                        
                    },
                  error: function(status){
                         window.alert("Error");
                    }                    
                }); 
}