var upload = document.getElementById('upload');
var preview = document.getElementById('preview');

console.log(upload);
upload.addEventListener('change',function(e){
    var get_file = e.target.files;
    console.log(get_file);

    var image = document.createElement('img');
    var reader = new FileReader();

    reader.onload = (function (IMG){
        console.log(1);
        $('#preview').empty();
        return function(e){
            console.log(3);
            IMG.src = e.target.result;
        }
    })(image)

    if(get_file){
        reader.readAsDataURL(get_file[0]);
        console.log(2);
    }

    preview.appendChild(image);
});