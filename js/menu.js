
const
    menuAcessList = document.getElementsByClassName('menu-nav-btn'),
    menuBtn = document.getElementById('menu-btn'),
    menuWindow = document.getElementById('menu-window'),
    menuAttach = document.getElementById('menu');

menuBtn.addEventListener('click', function () {
    let menuNav = document.getElementById('menu-nav'),
        menuBtnImg = menuBtn.getElementsByTagName('img')[0];

    menuBtn.value == 'on' ? closeMenu() : openMenu();


    function closeMenu() {
        menuAttach.style.right = '0';
        menuWindow.style.left = '100%';
        menuNav.style.display = 'none';
        menuBtnImg.style.transform = "";

        menuBtn.value = 'off'
    }

    function openMenu() {
        menuNav.style.display = 'flex';
        menuBtnImg.style.transform = "scaleX(-1)";

        menuBtn.value = 'on'
    }
})

for (let btn of menuAcessList) {
    btn.addEventListener('click', function () {
        let windowBoxList = document.getElementsByClassName('window-box');

        menuAttach.style.right = '20%';
        menuWindow.style.left = 'calc(80% - 4px)';

        for (let box of windowBoxList) {
            if (box.id + '-acess' == btn.id) {
                box.style.display = 'flex';
            } else {
                box.style.display = 'none';
            }
        }
    })
}