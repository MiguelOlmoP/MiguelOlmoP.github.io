let usuario = "MiguelOlmoP"
let datos = {};

window.onload = function () {
    works();
}

function works() {
    let work = document.getElementById("works");
    fetch('https://api.github.com/users/' + usuario + '/repos')
        .then(response => response.json())
        .then(data => {
            data.forEach(repo => {
                // console.log(repo.name);
                // console.log(repo.owner["login"]);
                // console.log("-------------------");
                //console.log(repo.description);
                // console.log("-------------------");
                // console.log(repo.html_url);
                // console.log("-------------------");
                // console.log(repo);
                // console.log("-------------------");
                if (repo.name != usuario) {

                    let div = document.createElement("div");
                    div.classList.add("repo");

                    let content = document.createElement("div");
                    content.classList.add("content");

                    let figure = document.createElement("figure");
                    figure.classList.add("figure");

                    let img = document.createElement("img");
                    img.setAttribute("alt", "Imagen");
                    img.classList.add("img");
                    img.setAttribute("loading", "lazy");
                    //URL imagen "portada"
                    let imgSrc = new Image();
                    imgSrc.src = "https://raw.githubusercontent.com/" + repo.owner["login"] + "/" + repo.name + "/main/img/portada.png";

                    if (repo.name == usuario + ".github.io") {
                        img.src = "img/logo.png";
                    } else {
                        //La imagen ha cargado correctamente
                        imgSrc.onload = function () {
                            img.src = imgSrc.src;
                        };
                        //La imagen no ha cargado correctamente / no existe
                        imgSrc.onerror = function () {
                            img.src = "img/default.png";
                        };
                    }

                    figure.appendChild(img);
                    

                    let divInfo = document.createElement("div");
                    divInfo.classList.add("divInfo");

                    let h2 = document.createElement("h2");
                    h2.classList.add("title");
                    let titulo = document.createTextNode(repo.name);

                    h2.appendChild(titulo);

                    let p = document.createElement("p");
                    p.classList.add("description");
                    let texto = document.createTextNode(repo.description);

                    p.appendChild(texto);

                    divInfo.appendChild(h2);
                    divInfo.appendChild(p);


                    let divEn = document.createElement("div");
                    divEn.classList.add("divEn");

                   
                    console.log(repo.html_url);

                    let aGitHub = document.createElement("a");
                    aGitHub.setAttribute("href",repo.html_url);
                    aGitHub.classList.add("url");
                    aGitHub.innerHTML = "Visitar GitHub";

                    divEn.appendChild(aGitHub);

                    fetch("json/config.json")
                        .then(response => response.json())
                        .then(datosURL => {

                            Object.keys(datosURL).forEach(key => {
                                if (key == repo.name) {
                                    // console.log(key); 
                                    // console.log(datosURL); 
                                    // console.log(datosURL[key]); 

                                    let a = document.createElement("a");
                                    a.setAttribute("href", datosURL[key]);
                                    a.classList.add("url");
                                    a.innerHTML = "Visitar video";
                                    divEn.appendChild(a);
                                }
                            });

                        })
                        .catch(error => {
                            console.error('Error al cargar el JSON:', error);
                        });

                    content.appendChild(figure);
                    content.appendChild(divInfo);

                    div.appendChild(content);
                    div.appendChild(divEn);

                    work.appendChild(div);

                }

            });
        })
    .catch(error => console.error('Error:', error));


}


