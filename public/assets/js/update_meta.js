var loc = window.location.pathname;
var dir = loc.substring(0, loc.lastIndexOf('/'));

window.onload = function(){
    document.getElementById('title').innerHTML = "AxZ - Descubra o "+produtos.name+" feito para você!";
    document.getElementById('prod_name').innerHTML = " "+produtos.name;
    document.getElementById('meta_keywords').setAttribute("content", "descobrir, comparar, "+ produtos.keywords);
    document.getElementById('meta_description').setAttribute("content", "O jeito mais fácil, rápido e confiável de descobir seu "+produtos.name+".");
    document.getElementById('meta_author').setAttribute("content", "André Goulart Nogueira & "+produtos.author);
};