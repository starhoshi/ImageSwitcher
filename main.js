(function () {
    function switchImages() {
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

    var lastTime = new Date().getTime();
    var lastTimeDiff = 2000;
    var mutationObserver = new MutationObserver(function () {
        var date = new Date().getTime();
        if ((date - lastTime) > lastTimeDiff) {
            lastTime = date;
            switchImages();
        }
    });

    switchImages();
    var body = document.querySelector('body');
    mutationObserver.observe(body, {childList: true, subtree: true});
}());
