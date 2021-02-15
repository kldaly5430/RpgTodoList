var current = null;

function openPanel(subNav) {
    var tab = subNav.replace("menuItem-", "tab-"),
        ul = document.getElementById(tab);

    if(current && current != ul) {
        document.getElementById('navbar-collapse').style.display = 'none';
        current.style.display = 'none';
    }

    if(ul.style.display == 'none') {
        document.getElementById('navbar-collapse').style.display = 'block';
        ul.style.display = 'block';
        current = ul;
    } else {
        ul.style.display = 'none';
        document.getElementById('navbar-collapse').style.display = 'none';
    }
}

function closePanel(subNav) {
    document.getElementById('navbar-collapse').style.display = "none"
    document.getElementById(subNav).style.display = "none";
}