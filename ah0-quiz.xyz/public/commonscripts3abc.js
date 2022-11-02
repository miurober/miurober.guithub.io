
 function trim(s){
  if (s!=""){
   try{
    s=s.replace(/ +$/, "") 
	
    s=s.replace(/^ +/, "") 
	
   }catch(err){
    s="";
   }
  }
  return s;
 }


 function strpos (haystack, needle, offset) {
  var i = (haystack+'').indexOf(needle, (offset ? offset : 0));
  return i === -1 ? false : i;
 }


 function hideerror(formname){
  document.forms[formname].errormessage.style.visibility="hidden";
 }


 function showerror(formname,mess){
  document.forms[formname].errormessage.value=mess;
  document.forms[formname].errormessage.style.visibility="visible";
  setTimeout("hideerror('"+formname+"')",5000);
 }


 function randomint(min_value,max_value) {
  let random_number = Math.random() * (max_value-min_value) + min_value;
  return Math.floor(random_number);
 }

 function postform(formname){
   var domain=getuserhost();
   var errorfunctiontype=typeof(errorfunction);
   var successfunctiontype=typeof(successfunction);


   if (typeof(errorfunction)!="function"){
    alert("Function errorfunction() not defined");
    return false;
   }

   if (typeof(successfunction)!="function"){
    alert("Function successfunction() not defined");
    return false;
   }


   if (typeof((document.forms[formname]))=="undefined"){
    alert("Form "+"'"+formname+"'"+" is undefined");
    return false;
   }

   if (typeof((document.forms[formname].formaction))=="undefined"){
    alert("Field "+"'formaction'"+" is undefined");
    return false;
   }


   var elements=document.forms[formname].elements;
   var poststr="";

   fielderror=false;
   for (i=0; i<elements.length; i++){
    ename=trim(elements[i].name);
    etype=trim(elements[i].type);
    evalue=trim(elements[i].value);
    poststr=poststr+ename+"="+evalue;
    if (i<(elements.length-1)){poststr=poststr+"&";}
    ereq=elements[i].required;
    if ((ereq)&&(evalue=="")){
     elements[i].focus();
     doerrorfunction("empty"+ename);
     fielderror=true;
     break;
    }
   }
   if (fielderror){
    return false;
   }


   if ((typeof(document.forms[formname].password)!="undefined")&&(typeof(document.forms[formname].password1)!="undefined")){
    var password=trim(document.forms[formname].password.value);
    var password1=trim(document.forms[formname].password1.value);
    if (password!=password1){
     document.forms[formname].password.focus();
     doerrorfunction("passwordnotmatchrepeat");
     return false;
    }
   }


   var rstr=Math.random();


   if (typeof(document.forms[formname].formaction)!="undefined"){
    action=trim(document.forms[formname].formaction.value);
    if (action==""){
     doerrorfunction("emptyformaction");
     return false;
    }
   }else{
    doerrorfunction("undefinedformaction");
    return false;
   }




   var rstr=Math.random();
   $.post(action,poststr).done(function(json){
     console.log(json);
     try{
      var obj=JSON.parse(json);
      lstatus=obj.stat;


      if (lstatus=="err"){
       lerr=obj.err;
       doerrorfunction(lerr);
       return false;
      }


      if (lstatus=="ok"){
       dosuccessfunction();



       id_users=obj.id_users;
       if (typeof(id_users)!="undefined"){
        setcookie("id_users",id_users,365);
       }
      }


      if ((lstatus!="ok")&&(lstatus!="err")){
        alert("JSON status not 'ok' and not 'err' "+json);
        return false;
      }

     }catch (err){
      alert("Error JSON parsing "+json);
      return false;
     }
    }
   ).fail(
    function(response){
      alert("fail post "+action);
     }
   );
  }


 function postformwithoutchecking(formname,formaction,completefunction){
   var ret="";
   if (typeof((document.forms[formname]))=="undefined"){
    alert("Form "+"'"+formname+"'"+" is undefined");
    return false;
   }



   var elements=document.forms[formname].elements;
   var poststr="";

   for (i=0; i<elements.length; i++){
    ename=trim(elements[i].name);
    etype=trim(elements[i].type);
    evalue=trim(elements[i].value);
    poststr=poststr+ename+"="+evalue;
    if (i<(elements.length-1)){poststr=poststr+"&";}
   }


   var rstr=Math.random();
   $.post(formaction,poststr).done(function(json){
     jcode=completefunction+"('"+json+"')";
      try{
       eval(jcode);
      }catch(err){
       alert("Error eval 'completefunction' in function postformwithoutchecking "+err);
      }
    }
   ).fail(
    function(response){
      alert("fail post "+formaction+" in function 'postformwithoutchecking'");
     }
   );
   return ret;
  }


 function doerrorfunction(lerr){
  try{
   if (typeof(id_projects)=="undefined"){
    id_projects=0;
   }
   errorfunction(lerr);
  }catch(err){
   alert("Error executing errorfunction() "+err);
   return false;
  }
 }


 function dosuccessfunction(){
  try{
   successfunction();
  }catch(err){
   alert("Error executing successfunction() "+err);
   return false;
  }
 }


 function doselect(oname){
  element=document.getElementById(oname);
  element.select();
  var successful = document.execCommand('copy');
 }


 function setcookie(name,value,days) {
  domain=getuserhost();

  var expires="";
  if (days) {
   var date = new Date();
   date.setTime(date.getTime()+(days*24*60*60*1000));
   expires="; expires=" + date.toUTCString();
  }
  document.cookie=name+"="+(value||"")+expires+";path=/;domain=."+domain;
 }

 function getcookie(name) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
 }

 function erasecookie(cname) {
   domain=getuserhost();
   var d = new Date(); 
   d.setTime(d.getTime() - (1000*60*60*24));
   var expires = "expires=" + d.toGMTString(); 
   window.document.cookie = cname+"="+"; "+expires+";path=/;domain=."+domain;
 }


 function getuserhost(){
  ret="";
  domain=document.location.hostname;
  domain=domain.toLowerCase();
  arr=domain.split(".");
  ln=arr.length;
  if (ln>=2){
   ret=arr[ln-2]+"."+arr[ln-1];
  }
  return ret;
 }


 function logout(){
  erasecookie("id_users");
  document.location="/";
 }


 function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
 }



 function copytoclipboard(obj,mess){
  obj.focus();
  obj.select();
  document.execCommand('copy');
  $(".copied").text(mess).show().fadeOut(3000);
 }



 function getvalfromjson(valname,json){
   var obj=JSON.parse(json);
   jcode="obj."+valname;
   ret=eval(jcode);
   return ret;
 }



 function geterrorfromcode(errorcode,errorcodes){
   allok=true;
   ret=errorcode;
   try{
    var obj=errorcodes;
   }catch(err){
    alert(err);
    allok=false;
   }

   if (allok){
    jcode="obj."+errorcode+".descr";
    try{
     if (typeof(eval(jcode))!="undefined"){
      ret=eval(jcode);
     }
    }catch(err){
     ret=errorcode;
    }
   }
   return ret;

 }

 function focuserrorfield(formname,errorcode,errorcodes){
   var focusedfiled="";
   if (typeof((document.forms[formname]))=="undefined"){
    alert("Form "+"'"+formname+"'"+" is undefined in function 'focuserrorfield'");
    return false;
   }

   try{
    var obj=errorcodes;
   }catch(err){
    alert("Error parsing json in function focuserrorfield "+err);
    allok=false;
   }

   if (allok){
    jcode="obj."+errorcode+".focusedfield";
    try{
     if (typeof(eval(jcode))!="undefined"){
      focusedfiled=eval(jcode);
     }
    }catch(err){
     alert("Error get focusedfield in function focuserrorfield "+err);
    }
   }
   if (focusedfiled!=""){
    var jcode="document.forms[formname]."+focusedfiled+".focus()";
    try{
     eval(jcode);
    }catch(err){
     alert("Error eval "+focusedfiled+" in function focuserrorfield"+err);
    }
   }
 }
