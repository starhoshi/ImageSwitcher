var switchList = document.getElementById('switch_list');

function saveOptions() {
    var status = document.getElementById('status');
    status.textContent = 'Saving...';

    chrome.storage.sync.clear();

    var switchers = []
    var switcher = {from: '', to: ''}
    document.querySelectorAll('input').forEach(function(input, index){
      if(index % 2 == 0){
        switcher.from = input.value
      }

      if(index % 2 == 1){
        switcher.to = input.value
        if(switcher.from !== '' && switcher.from !== null) {
          switchers.push(switcher);
        }
        switcher = {from: '', to: ''}
      }
    });

    chrome.storage.sync.set({'data': switchers} , function () {
        // Update status to let user know options were saved.
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 2000);
    });
}

function restoreOptions() {
    chrome.storage.sync.get(null, function (items) {
        if(items.data){
          items.data.forEach(function(switcher) {
            insertRow(switcher);
          });
        }
        insertEmptyRow()
    });
}

function insertRow(switcher){
  switchList.insertAdjacentHTML("beforeend", newRow(switcher.from, switcher.to));
}

function insertEmptyRow() {
    switchList.insertAdjacentHTML("beforeend", newRow("", ""));
}

function newRow(from, to) {
    if (to == null || to == '') {
        to = 'https://raw.githubusercontent.com/starhoshi/ImageSwitcher/master/icons/icon128.png';
    }

    var placeholder = 'https://www.gravatar.com/avatar/1';
    var div = "<div>";
    var fromLabel = "<label>from: <input placeholder='" + placeholder + "' class='from' type='text' value='" + from + "'></label>";
    var toLabel = " <label>to: <input placeholder='" + placeholder + "' class='to' type='text' value='" + to + "'></label>";
    return div + fromLabel + toLabel + "</div>"
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('add_row').addEventListener('click', insertEmptyRow);

