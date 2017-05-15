var emptyRow = "<div><label>from: <input type='text'></label> <label>to: <input type='text'></label></div>";
var switchList = document.getElementById('switch_list');

function saveOptions() {
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restoreOptions() {
    chrome.storage.sync.get(null, function (items) {
        console.log(items);
        insertEmptyRow()
    });
}

function insertEmptyRow() {
    switchList.insertAdjacentHTML("beforeend", emptyRow);
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('status').addEventListener('click', saveOptions);
document.getElementById('add_row').addEventListener('click', insertEmptyRow);
