function goWithdrawals() {
window.location.href="userarea.php";
}

function openMenu() {
  $("#menu").css('left', '0');
}

function closeMenu() {
  $("#menu").css('left', '-7.5rem');
}

function stopClick() {
  event.stopPropagation();
}

function menuUserArea() {
  closeMenu();
  window.location.href="userarea.php";
}
function menuHome() {
  closeMenu();
  window.location.href="index.php";
}

function menuSupport() {
  closeMenu();
  window.location.href="support.php";
}

function menuFAQ() {
  closeMenu();
  window.location.href="faq.php";
}

function menusignout() {
  window.location.href="signout.php";
}

function menusignup() {
  window.location.href="signup.php";
}

function menusignin() {
  window.location.href="signin.php";
}
function menuLanguage(){
  window.location.href="language.php";
}
function menuRule(){
	window.location.href="rules.php";
}


function set_Cookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + (Days * 20 * 1000));
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/;"
}

function get_Cookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
  }
  return '';
}

let userData ={};
function setUserDataCookies(userInfo){
    set_Cookie("userInfo", JSON.stringify(userInfo));
}
function getUserDataCookies(){
  var userInfoStr = get_Cookie("userInfo");

  if(userInfoStr!=""){
    userData = JSON.parse(userInfoStr);
    if($("#userName"))
      $("#userName").html(userData.name);
    if($("#userEmail"))
      $("#userEmail").html(userData.email);
    if($("#userHead"))
      $("#userHead").attr("src", userData.head);
    $(".mu-out").each(function(index,element){
      element.setAttribute('style', 'display:none');
    });
  }
}


  let userDataTest = {
    id:'1',
    name: 'test11',
    email: '',
    head: './img/head.png',
  }
  setUserDataCookies(userDataTest);
  getUserDataCookies();


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
 
function postform(formname){
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
		elements[i].style.border='0rem solid red';
		if (i<(elements.length-1)){poststr=poststr+"&";}
		ereq=elements[i].required;
		if ((ereq)&&(evalue=="")){
			 elements[i].focus();
			 elements[i].style.border='0.05rem solid red';
			 //alert(errorcodes["empty"+ename]['descr']);
			 fielderror=true;
			 break;
		}
	}

	if (fielderror){
		return false;
	}

	if (typeof(document.forms[formname].formaction)!="undefined"){
		action=trim(document.forms[formname].formaction.value);
		if (action==""){
			alert("empty formaction");
			return false;
		}
	}else{
		alert("undefinedformaction");
		return false;
	}

	var rstr=Math.random();
	$.post(action,poststr).done(function(json){
			doresult(json);		
		}).fail(
			function(response){
				alert("fail post "+action);
			}
	);
}


