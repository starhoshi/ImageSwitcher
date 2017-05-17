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
    switchList.insertAdjacentHTML("beforeend", newRow("", ""));
}

function newRow(from, to) {
    var inputLength = document.querySelectorAll('input').length / 2;
    var id = 0;
    if (inputLength > 0) {
        id = inputLength
    }
    console.log(id);

    if (to == null || to == '') {
        to = 'https://raw.githubusercontent.com/starhoshi/ImageSwitcher/master/icons/icon128.png';
    }

    var placeholder = 'https://www.gravatar.com/avatar/1';
    var div = "<div>";
    var fromLabel = "<label>from: <input placeholder='" + placeholder + "' class='from' id='from" + id + "' type='text' value='" + from + "'></label>";
    var toLabel = " <label>to: <input placeholder='" + placeholder + "' class='to' id='to" + id + "' type='text' value='" + to + "'></label>";
    return div + fromLabel + toLabel + "</div>"
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('status').addEventListener('click', saveOptions);
document.getElementById('add_row').addEventListener('click', insertEmptyRow);
