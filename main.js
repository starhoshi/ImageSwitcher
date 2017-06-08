(function () {
    function switchImage(img) {
        chrome.storage.sync.get(null, function (items) {
            if (items.data) {
                items.data.forEach(function (switcher) {
                    if (img.src.startsWith(switcher.from)) {
                        img.src = switcher.to;
                    }
                });
            }
        });
    }
    function switchAllImages() {
        document.querySelectorAll('img').forEach(function (img) {
            switchImage(img);
        });
    }
    switchAllImages();
    var mutationObserver = new MutationObserver(function (mutationRecordsList) {
        mutationRecordsList.forEach(function (mutationRecord) {
            switch(mutationRecord.type){
                case "childList":
                mutationRecord.addedNodes.forEach(function (addedNode) {
                    if(addedNode instanceof HTMLElement) {
                        addedNode.querySelectorAll('img').forEach(function (img) {
                            switchImage(img);
                        });
                    }
                });
                break;
                case "attributes":
                if(mutationRecord.target instanceof HTMLElement) {
                    if(mutationRecord.target.tagName.toLowerCase()==="img") {
                      switchImage(mutationRecord.target);
                    }
                }
                break;
                default:
                //DO NOTHING
                break;
            }
        });
    });

    var body = document.querySelector('body');
    var config={
        childList: true,
        subtree: true,
        attributes:true,
        attributeFilter:["src"],
    };
    mutationObserver.observe(body, config);


}());