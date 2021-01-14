

var flag = false;

$('button[name=edit]').on('click',function(){
    if(!flag){
        $('div[name=edit-form]').removeClass("comment-edit")
        flag = true;
    }
        
    else{
        $('div[name=edit-form]').addClass("comment-edit")
        flag = false;
    }
})

$('button[name=delete]').on('click',function(){
    confirm('Do you want to delete this?')?this.parentElement.submit():null;
})

