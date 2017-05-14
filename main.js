(function () {
    console.log('Image Switcher start');
    console.log(document.querySelectorAll('img'));
    document.querySelectorAll('img').forEach(function (img) {
        if (img.src.startsWith("https://avatars3.githubusercontent.com/u/1906512")) {
            img.src = "https://example.com";
        }
        if (img.src.startsWith("https://avatars2.githubusercontent.com/u/1906512")) {
            img.src = "https://example.com";
        }
        if (img.src.startsWith("https://avatars1.githubusercontent.com/u/1906512")) {
            img.src = "https://example.com";
        }
    });
}());
