const
    toolList = document.getElementsByClassName('sidebar-btn'),
    slotList = document.getElementsByClassName('slot'),
    upgradeList = document.getElementsByClassName('upgrade-btn');

let currentTool,
    points = 0,
    cooldown = 4;

setToolsEvent();
setSlotsEvent();
setUpgradesEvent();

function setToolsEvent() {
    for (let tool of toolList) {
        tool.addEventListener('click', function () {
            // Change color of tool
            for (let tool of toolList) {
                tool.style.backgroundColor = 'white'
            }
            tool.style.backgroundColor = 'lightblue'

            // Change Current Tool
            currentTool = tool.id;
        })
    }
}

function setSlotsEvent() {
    for (let slot of slotList) {
        slot.value = 'empty';
        slot.innerHTML = "";
        slot.addEventListener('mousedown', function () {
            if (currentTool !== undefined) {
                switch (currentTool) {
                    case 'watering':
                        waterPlant(slot);
                        break;
                    case 'shovel':
                        removePlant(slot);
                        break;
                    default:
                        addPlant(slot, currentTool);
                        break;
                }
            }
        })
    }
}

function setUpgradesEvent() {
    for (let upgrade of upgradeList) {
        upgrade.addEventListener('click', function () {
            let target = upgrade.parentNode.parentNode,
                name = target.getElementsByTagName('h2')[0],
                level = name.innerHTML.match(/\d/).join(''),

                score = document.getElementById('pts'),
                price = target.getElementsByTagName('h3')[0],
                priceValue = Number(price.innerHTML.replace('pts', ''));

            console.log(points, priceValue)
            if (level == 4) return;

            if (points >= priceValue) {
                points -= priceValue;
                score.innerHTML = points;

                switch (target.id) {
                    case 'upgrade-flower':
                        upgradeFlowers(level);
                        break;
                    case 'upgrade-garden':
                        upgradeSlots(level);
                        break;
                    case 'upgrade-grow':
                        cooldown--
                        break;
                }

                price.innerHTML = priceValue + priceValue + 'pts'
                name.innerHTML = name.innerHTML.replace(level, '') + ++level

                if (level == 4) {
                    price.innerHTML = '---'
                    name.innerHTML = name.innerHTML.replace(level, '(Max.)')
                    target.style.opacity = '0.5';
                }
            }
        }
        )
    }
}

function waterPlant(slot) {
    if (slot.value == 'dry') {
        let plant = slot.getElementsByClassName('plant')[0];

        slot.style.backgroundColor = 'var(--clr-wet-dirty)'
        plant.style.transition = `scale ${cooldown}s`
        plant.style.scale = '1.2'
        setTimeout(function () {
            slot.style.backgroundColor = 'var(--clr-dry-dirty)'
            plant.style.animation = 'shiny 1s 1s infinite';
            slot.value = 'grow'
        }, cooldown * 1000)
    }
}

function removePlant(slot) {
    if (slot.value == 'grow') {
        let score = document.getElementById('pts'),
            plant = slot.getElementsByClassName('plant')[0];

        switch (plant.value) {
            case 'flower1':
                points += 10;
                break;
            case 'flower2':
                points += 20;
                break;
            case 'flower3':
                points += 30;
                break;
            case 'flower4':
                points += 40;
                break;
            case 'flower5':
                points += 50;
                break;
        }

        score.innerHTML = points;
    }

    slot.innerHTML = '';
    slot.value = 'empty';
}

function addPlant(slot, plant) {
    if (slot.value == 'empty') {
        let img = document.createElement('img');
        img.classList.add('plant');
        img.value = plant;
        img.src = `../img/${plant}.png`;
        img.setAttribute('draggable', 'false');

        slot.appendChild(img);

        slot.value = 'dry'
    }
}

function upgradeSlots(level) {
    let garden = document.getElementsByTagName('main')[0];

    switch (level) {
        case '1':
            garden.style.gridTemplateColumns = 'repeat(4, 1fr)'
            garden.style.width = '55vw'
            break;
        case '2':
            garden.style.gridTemplateColumns = 'repeat(5, 1fr)'
            garden.style.width = '70vw'
            break;
        case '3':
            garden.style.gridTemplateColumns = 'repeat(6, 1fr)'
            garden.style.width = '80vw'
            break;
    }

    garden.innerHTML +=
        '<div class="slot"></div>' +
        '<div class="slot"></div>' +
        '<div class="slot"></div>';

    setSlotsEvent();
}

function upgradeFlowers(level) {
    let toolbar = document.getElementsByTagName('aside')[0],
        num = Number(level) + 1,
        flower = 'flower' + num;

    toolbar.innerHTML +=
        '<abbr id="' + flower + '" class="sidebar-btn" title="Flor ' + num + '">' +
        '<img src="../img/' + flower + '-icon.png" draggable="false">' +
        '</abbr>'

    setToolsEvent();
}