var t = document.getElementById('btn_check');
t.addEventListener('click',checking);

var idtext = document.getElementById('id');
idtext.addEventListener('keyup',idlenghtCheck);

var p = document.getElementById('pw');
p.addEventListener('keyup',checkpassword);

var c = document.getElementById('pw2');
c.addEventListener('keyup',confirmcheck);

var pn = document.getElementById('phone');
pn.addEventListener('keyup',checkphone);

t.addEventListener('blur',change_submit);
p.addEventListener('blur',change_submit);
c.addEventListener('blur',change_submit);
pn.addEventListener('blur',change_submit);

var btn_submit = document.getElementById('sm');

var name_f, id_f=false, pw_f=false, pwc_f=false, pn_f = false;
name_f = true;

function idlenghtCheck(){
    var id = $('#id').val();
    if(id.length<5){
        t.setAttribute('disabled',true);
    }
    else{
        t.removeAttribute('disabled');
    }
}

function checking(){
    var id = $("#id").val();
    console.log(id);
    $.ajax({
        url:"/idcheck",
        type:'POST',
        data:{id:id},
        dataType:"json",
        
        success:function(resdata){
            console.log(resdata);
            if(!resdata){  // res가 false == 이미 있는 id
                alert("사용가능한 아이디 입니다.");
                id_f = true;
            }                    
            else{ 
                alert("이미 사용중인 id");
                id_f=false;
            }
        }
    });
};
    

function checkpassword(){
    var pass = $('#pw').val();   
    
    if(pass.length <8){
        $('#pwhelper').css({color:"red"});
        $('#pwhelper').text("비밀번호는 최소 8자리 입니다.");
        pw_f = false;
    }
    
    else if(!RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(pass)){ 
        $('#pwhelper').css({color:"red"});
        $('#pwhelper').text("pw는 대문자/소문자/숫자 를 하나이상 포함시켜주세요.");
        pw_f = false;
    }

    else{
        $('#pwhelper').css({color:"green"});
        $('#pwhelper').text("사용가능"); 
        pw_f = true;
    }
    console.log(pass);
};

function confirmcheck(){
    var pass = $('#pw').val();
    var pass2 = $('#pw2').val();

    if(pass==pass2){
        $('#confirmhelper').css({color:"green"});
        $('#confirmhelper').text("일치");
        pwc_f=true;
    }

    else{
        $('#confirmhelper').css({color:"red"});
        $('#confirmhelper').text("불일치");
        pwc_f = false;
    }
}

function checkphone(){
    var phone = $('#phone').val();

    if(!RegExp(/^\d{3}-\d{3,4}-\d{4}$/).test(phone)){
        $('#phonehelper').css({color:"red"});
        $('#phonehelper').text("xxx-xxxx-xxxx 형식을 지켜주세요");
        pn_f = false;
    }
    else{
        $('#phonehelper').css({color:"green"});
        $('#phonehelper').text("");
        pn_f=true;
    }
}

function change_submit(){ // 모든 체크 후에 버튼 활성화
    console.log(name_f);
    console.log(id_f);
    console.log(pw_f);
    console.log(pwc_f);
    console.log(pn_f);
if(name_f && id_f && pw_f && pwc_f && pn_f){
    btn_submit.removeAttribute('disabled');
}
else{
    btn_submit.setAttribute('disabled',true);
}
};