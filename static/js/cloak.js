if ((localStorage.getItem('tabTitle')) != null) {

    document.title = localStorage.getItem('tabTitle');
}

if (localStorage.getItem('tabIcon') != null) {

    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');

    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = localStorage.getItem('tabIcon');

    document.getElementsByTagName('head')[0].appendChild(link);


}