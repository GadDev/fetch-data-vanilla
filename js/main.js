function fetchData(){
    
    fetch('./assets/data.json')
        .then(response => response.json())
        .then(data => {
            let result = '';
            let menu = '';
            let submenu = '';
            data.menu.map( item => {
                if(item.submenu) {
                    item.submenu.map( submenuItem => {
                        return submenu += `<li><a href="${submenuItem.url}">${submenuItem.title}</a></li>`
                    });
                    return menu += `<li class="item item__with-submenu">
                    <a href="${item.url}">${item.title}</a>
                        <div class="submenu">
                            <ul>
                            ${submenu}
                            </ul>
                        </div>                    
                    </li>`;
                } else {
                    return menu += `
                        <li class="item">
                            <a href="${item.url}">${item.title}</a>
                        </li>`;
                }
            });
            const header = `<header>
                <div class="wrapper-menu">
                    <input id="click" name="exit" type="checkbox" />
                    <label for="click">
                        <span class="burger"></span>
                    </label>
                    <div class="inner-wrapper">
                        <ul>
                            ${menu}
                        </ul>
                    </div>
                </div>
                <h1 class="title">
                    ${data.header}
                </h1>
            </header>`;
            const main = `<main>
                <article>
                    <h1>${data.title}</h1>
                    <p>${data.body}</p>
                </article>
            </main>`

            const footer = `<footer>${data.footer}</footer>`;
            result += header;
            result += main;
            result += footer;
            document.getElementById('root').innerHTML = result;
            document.getElementById('click').addEventListener('click', () => {
                if(document.body.classList.contains('menuOpen')) {
                    document.body.classList.remove('menuOpen');
                } else {
                    document.body.classList.add('menuOpen');
                }
                
            })
            
            
        })
        .catch(e => console.log(e));
}

function init() {
    let loader = `<div class="loader__wrapper"><img src="./img/loader.jpg" /></div>`;
    document.getElementById('root').innerHTML = loader;
    setTimeout(() => {
        fetchData();
    }, 1500);
}

window.onload = init;