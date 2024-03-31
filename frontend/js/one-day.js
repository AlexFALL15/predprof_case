let DATA;
DATA = { 
    '12.01.2024': {
        rooms_count: 3,
        windows_for_room: [3, 2, 1],
        windows: [
            [
                false,
                true,
                false,
                true,
                false,
                false
            ],
            [
                true,
                false,
                true,
                false,
                false,
                true
            ],
            [
                false,
                false,
                true,
                false,
                true,
                false
            ],
            [
                false,
                false,
                false,
                true,
                false,
                true
            ]
        ]
    }, 
}

document.getElementById('btn-see-data').addEventListener('click', () => {
    // fetch('/api/get_data')
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         DATA = data;
    //     })
    viewDataByDay('12.01.2024');
})




function viewDataByDay(date) {
    drawBoard(date);
}

function reverseChildren(parent) {
    for (var i = 1; i < parent.childNodes.length; i++){
        parent.insertBefore(parent.childNodes[i], parent.firstChild);
    }
}

function drawBoard(date) {
    const windowsTableDiv = document.createElement('div');
    windowsTableDiv.id = 'windowsTable';
    let windowsRoomsArr = [];
    for (let i=0;i<DATA[date]['windows'].length;i++) {
        let floorWinsArr = [];
        for (let j=1;j<=DATA[date]['rooms_count'];j++) {
            
            let winsArr = Array(DATA[date]['windows_for_room'][j-1]).fill(i*DATA[date]['windows_for_room'].length + j);
            // console.log(DATA[date]['windows_for_room'][i], i, j);
            floorWinsArr.push(...winsArr);
        }
        windowsRoomsArr.push(floorWinsArr);
        // console.log(windowsRoomsArr);
    }
    console.log(windowsRoomsArr);
    
    // let windowsLights = [];
    // for (let l=0;l<DATA[date]['windows'].length;l++) {
    //     windowsLights.push(...DATA[date]['windows'][l]);
    // }
    let windowsLights = DATA[date]['windows'];
    // console.log(windowsLights);
    
    for (let i=0;i<DATA[date]['windows'].length;i++) {
        let kwin = 0;
        const floorDiv = document.createElement('div');
        floorDiv.classList.add('floorDiv');
        for (let j=0; j<DATA[date]['windows_for_room'].reduce((partialSum, a) => partialSum + a, 0);j++) {
            const windowDiv = document.createElement('div');
            windowDiv.classList.add('window');
            console.log(windowsRoomsArr[i][kwin]);
            windowDiv.textContent = windowsRoomsArr[i][kwin];
            if (windowsLights[i][kwin] == true) {
                windowDiv.classList.add('windowLight');
            }
            kwin++;
            floorDiv.appendChild(windowDiv);
        }
        
        windowsTableDiv.append(floorDiv);
    }
    reverseChildren(windowsTableDiv);
    document.querySelector('body').appendChild(windowsTableDiv);
}