let DATA;
// DATA = { 
//     '2024-04-10': {
//         rooms_count: 3,
//         windows_for_room: [3, 2, 1],
//         windows: [
//             [
//                 false,
//                 true,
//                 false,
//                 true,
//                 false,
//                 false
//             ],
//             [
//                 true,
//                 false,
//                 true,
//                 false,
//                 false,
//                 true
//             ],
//             [
//                 false,
//                 false,
//                 true,
//                 false,
//                 true,
//                 false
//             ],
//             [
//                 false,
//                 false,
//                 false,
//                 true,
//                 false,
//                 true
//             ]
//         ]
//     }, 
//     '2024-04-09': {
//         rooms_count: 3,
//         windows_for_room: [3, 2, 1],
//         windows: [
//             [
//                 false,
//                 true,
//                 false,
//                 true,
//                 false,
//                 false
//             ],
//             [
//                 true,
//                 false,
//                 true,
//                 false,
//                 false,
//                 true
//             ],
//             [
//                 false,
//                 false,
//                 true,
//                 false,
//                 true,
//                 false
//             ],
//             [
//                 false,
//                 false,
//                 false,
//                 true,
//                 false,
//                 true
//             ]
//         ]
//     }
// }

document.getElementById('btn-see-one-day-data').addEventListener('click', () => {
    console.log(1);
    fetch('/api/get_data')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            DATA = data;
            console.log(DATA['2023-01-24']['windows'])
            viewDataByDay(document.getElementById('inp-date').value);
        })

    
})

document.getElementById('btn-see-all-days-data').addEventListener('click', () => {
    fetch('/api/get_data')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            DATA = data;
            viewAllData();
        })
    
})

let ANSWER = new Set();


function viewDataByDay(date) {
    document.getElementById('one-day-data').innerHTML = '';
    drawBoard(date, document.getElementById('one-day-data'));
    drawAnswer(date, document.getElementById('one-day-data'));
}

function reverseChildren(parent) {
    for (var i = 1; i < parent.childNodes.length; i++){
        parent.insertBefore(parent.childNodes[i], parent.firstChild);
    }
}

function drawBoard(date, parent) {
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
    // console.log(windowsRoomsArr);
    
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
                ANSWER.add(windowsRoomsArr[i][kwin]);
            }
            kwin++;
            floorDiv.appendChild(windowDiv);
        }
        
        windowsTableDiv.append(floorDiv);
    }
    reverseChildren(windowsTableDiv);
    parent.appendChild(windowsTableDiv);
}

function drawAnswer(date, parent) {
    const answerDiv = document.createElement('div');
    answerDiv.classList.add('answerDiv');
    const inputDataDiv = document.createElement('div');
    inputDataDiv.classList.add('inpDataDiv');
    const lblRoomCount = document.createElement('p');
    lblRoomCount.textContent = 'Кол-во комнат на этаже:';
    inputDataDiv.appendChild(lblRoomCount);
    const dataRoomCount = document.createElement('p');
    dataRoomCount.textContent = String(DATA[date]['rooms_count']);
    inputDataDiv.appendChild(dataRoomCount);
    const lblWindowsCount = document.createElement('p');
    lblWindowsCount.textContent = 'Окна на этаже:';
    inputDataDiv.appendChild(lblWindowsCount);
    const dataWindowsCount = document.createElement('p');
    dataWindowsCount.textContent = String(DATA[date]['windows_for_room'].join(' '));
    inputDataDiv.appendChild(dataWindowsCount);


    const outputDataDiv = document.createElement('div');
    outputDataDiv.classList.add('outpDataDiv');

    const lblRoomCountAnswer = document.createElement('p');
    lblRoomCountAnswer.textContent = 'Кол-во комнат:';
    outputDataDiv.appendChild(lblRoomCountAnswer);

    const dataRoomCountAnswer = document.createElement('p');
    dataRoomCountAnswer.textContent = ANSWER.size;
    outputDataDiv.appendChild(dataRoomCountAnswer);

    const lblRoomNumAnswer = document.createElement('p');
    lblRoomNumAnswer.textContent = 'Номера комнат:';
    outputDataDiv.appendChild(lblRoomNumAnswer);

    const dataRoomNumsAnswer = document.createElement('p');
    dataRoomNumsAnswer.textContent = Array.from(ANSWER).join(', ');
    outputDataDiv.appendChild(dataRoomNumsAnswer);

    answerDiv.appendChild(inputDataDiv);
    answerDiv.appendChild(outputDataDiv);
    parent.appendChild(answerDiv);
}

function viewAllData() {
    document.getElementById('all-days-data').innerHTML = '';
    for (date of Object.keys(DATA)) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('dayDiv');
        drawBoard(date, dayDiv);
        drawAnswer(date, dayDiv);
        document.getElementById('all-days-data').appendChild(dayDiv);
    }
    
}