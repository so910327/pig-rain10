//register_form
var checkEmail = (email) => {
  var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
      str = '';
  email = document.getElementById(email).value;
  (email.search(emailRule)=== -1)
  ? str='email格式錯誤'+'<br>'
  : str;
  document.getElementById('notice_email').innerHTML=str;
}

var password;
var checkPw = (pw) => {
  var pwRule=  /^(?=.*\d)(?=.*[A-Za-z]).{6,12}$/,
      str = '', pw1;
  if(document.getElementById('password01') !== null) 
    pw1 = document.getElementById('password01').value;
  pw = document.getElementById('password').value;
  (!pw.match(pwRule))
  ? str='密碼格式錯誤'+'<br>' 
  : str;
  (pw !== pw1 && typeof pw1 !== undefined)
  ? str='密碼輸入不同'+'<br>' 
  : str;
  document.getElementById('notice_pw').innerHTML=str;
  password = pw;
}

var againPw = (pw1) => {
  pw1 = document.getElementById(pw1).value;
  (!pw1.match(password))
  ? document.getElementById('notice_pw').innerHTML='密碼輸入不同'+'<br>'
  : checkPw(pw1); 
}

var register = () => {
  var email = document.getElementById('user').value,
      pw = document.getElementById('password').value,
      pw1 = document.getElementById('password01').value,
      str = '';
  if(email === '') str+='帳號 ';
  if(pw === '' || pw1 === '') str+='密碼 ';
  if(str !== ''){
    str += '欄位不為空';
    document.getElementById('notice_register').innerHTML=str;
    return false;
  }
  return true;
}

//login_form
var login = () => {
  var email = document.getElementById('user').value,
      pw = document.getElementById('password').value;
  if(pw === '' || email === ''){
    document.getElementById('notice_login').innerHTML='帳號或密碼有誤';
    return false;
  }
  return true;
}


