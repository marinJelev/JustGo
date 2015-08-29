// var globe = (function () {
    var map;
    var isSpinning = false;
    var before = null;

    map = (function () {
        var map = WE.map('map', {
            center: [36.057944835, -112.18688965],
            zoom: 2,
            atmosphere: true,
            dragging: true,
            scrollWheelZoom: true,
            sky: true,
            proxyHost: 'http://srtm.webglearth.com/cgi-bin/corsproxy.fcgi?url='
        });

        var baselayer = WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg', {
            subdomains: '1234',
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
            maxZoom: 18
        }).addTo(map);

        var overlay = WE.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
            subdomains: '1234',
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
            maxZoom: 18,
            opacity: 0.01
        }).addTo(map);

        return map;
    })();

    function animate(now) {
        var c = map.getPosition();
        var elapsed = before ? now - before : 0;
        before = now;
        map.setCenter([c[0], c[1] + 5 * (elapsed / 30)]);
        if (isSpinning) {
            requestAnimationFrame(animate);
        }
    }

    function setZoom(zoom) {
        map.setZoom(zoom);
    }

    function panTo(coords) {
        map.panTo(coords);
    }

    function spin() {
        isSpinning = !isSpinning;
        if (isSpinning) {
            before = null;
            animate();
        }
    }

    export default {
        spin,
        panTo,
        map
    };
// })();