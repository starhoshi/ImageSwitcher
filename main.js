(function () {
    function switchImages(){
        document.querySelectorAll('img').forEach(function (img) {
            chrome.storage.sync.get(null, function (items) {
                if (items.data) {
                    items.data.forEach(function (switcher) {
                        if (img.src.startsWith(switcher.from)) {
                            img.src = switcher.to;
                        }
                    });
                }
            });
        });
    }
    switchImages();
}());

