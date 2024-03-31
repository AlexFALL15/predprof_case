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
    fetch('/api/get_data_one_day')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            DATA = data;
        })
})



function viewDataByDay(date) {
    drawBoard();
}

function drawBoard() {
    const windowsTableDiv = document.createElement('div');
    windowsTableDiv.id = 'windowsTable';
    const firstFloor = document.createElement('')
    windowsTableDiv.appendChild()
    for (let i=0;i<4;i++) {
        windowsTableDiv.insert
    }
}