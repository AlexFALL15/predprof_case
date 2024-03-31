let DATA;
// DATA = { 
//     '12.01.2024': {
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
// }
document.getElementById('btn-see-data').addEventListener('click', () => {
    fetch('/api/get_data')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            DATA = data;
        })
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
    for (let i=0;i<DATA[date]['windows'].length;i++) {
        const floorDiv = document.createElement('div');
        floorDiv.classList.add('floorDiv');
        for (let j=0; j<DATA[date]['windows_for_room'].reduce((partialSum, a) => partialSum + a, 0);j++) {
            const windowDiv = document.createElement('div');
            windowDiv.classList.add('window');
            windowDiv.
        }
        
        windowsTableDiv.append();
    }
}