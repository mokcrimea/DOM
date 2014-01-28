//создает NodeList со ссылками
var i, link = document.getElementsByClassName('popup-link');
//Слушатели всех удовлетворяющих ссылок
for (i = 0; i < link.length; i++) {
    link[i].addEventListener('click', openPopupFromLink, false);
    link[i].onclick = function() {
        return false; //чтобы не переходило сразу на внешнюю ссылку
    };
}

function openPopupFromLink() {
    //делаем проверку на существующий popup, если уже открыт то удаляем.
    if (document.getElementsByClassName('popup')[0]) {
        document.body.removeChild(document.getElementsByClassName('popup')[0]);
    }
    var linkTitle, linkMessage, linkURL, position, yes, no;
    linkTitle = this.dataset.title;
    linkMessage = this.dataset.message;
    linkURL = this.href;
    //заменяем символ /% на адрес сайта.
    linkMessage = linkMessage.replace(/%s/g, linkURL);

    //если нажать "Да"
    function onConfirm() {
        return location.assign(linkURL);
    }
    //если нажать "Нет"
    function onReject() {
        popup.parentNode.removeChild(popup);
    }

    popup = createPopup(linkTitle, linkMessage, onConfirm);
    positionOfPopup(popup); //выравнивание на странице блока popup
    document.body.appendChild(popup);

    yes = popup.getElementsByTagName('button')[0];
    no = popup.getElementsByTagName('button')[1];

    yes.onclick = onConfirm;
    no.onclick = onReject;

}

function createPopup(title, message, onOk) {
    var temp_el = document.createElement('div');

    temp_el.innerHTML = '<div class="popup"> <div class="title">' + title + '</div> <div class="message">' + message + '</div> <div class="btns"><button>Да </button> <button>Нет </button></div> </div>';
    return temp_el.firstChild;
}

function positionOfPopup(elem) {
    elem.style.position = 'absolute';
    elem.style.top = 200 + 'px';
    elem.style.left = Math.floor(document.clientWidth / 2) - 150 + 'px';
}