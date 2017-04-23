var a = new Array(1024*90*60);
document.querySelector("body").addEventListener("click",function (e) {
    if(e.target.className=="btn"){
        e.preventDefault();
    }
},false);