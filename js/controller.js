var app = angular.module("app", []);
var Music = (function () {
    function Music(author, title, id) {
        this.author = author;
        this.title = title;
        this.id = id;
    }
    return Music;
}());
app.controller("appController", function ($scope, $log) {
    var player = angular.element(document.getElementById("player"))[0];
    player.ontimeupdate = function () {
        var percent = player.currentTime / player.duration;
        if (percent == Infinity) {
            percent = 0;
        }
        document.getElementById("progress-value").style.width = percent * 100 + "%";
        document.getElementById("indicator").style.left = percent * 100 + "%";
    };
    var list = [
        new Music("Моцарт", "Реквием по мечте", 0),
        new Music("Arkasia", "Know your enemies", 1),
    ];
    var idMap = {
        0: "http://localhost/yourfriends/mozart.mp3",
        1: "http://localhost/yourfriends/music.mp3"
    };
    $scope.musicList = list;
    $scope.volume = .5;
    $scope.play = function () {
        if (player.paused) {
            player.play();
        }
        else {
            player.pause();
        }
    };
    $scope.updateVolume = function () {
        player.volume = $scope.volume;
    };
    $scope.changeSource = function (id) {
        player.src = idMap[id];
        player.play();
    };
    $scope.changePosition = function (e) {
        var barOffset = document.getElementById("progress").offsetLeft;
        var barWidth = document.getElementById("progress").clientWidth;
        var mouseX = e.clientX - barOffset;
        var percent = (mouseX * 100) / barWidth;
        player.currentTime = (player.duration * percent) / 100;
        $log.info((player.duration * percent) / 100);
        if (player.paused) {
            player.play();
        }
    };
    angular.element(document).ready(function () {
        $scope.updateVolume();
    });
});
//# sourceMappingURL=controller.js.map