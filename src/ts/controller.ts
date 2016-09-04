declare let angular: any;

let app = angular.module("app", []);

class Music {
    author: String;
    title: String;
    id: Number;

    constructor(author: String, title: String, id: Number) {
        this.author = author;
        this.title = title;
        this.id = id;
    }
}

app.controller("appController", ($scope, $log) => {

    let player = angular.element(document.getElementById("player"))[0];

    player.ontimeupdate = () => {

        let percent = player.currentTime / player.duration;

        if (percent == Infinity) {
            percent = 0;
        }

        document.getElementById("progress-value").style.width = percent * 100 + "%";
        document.getElementById("indicator").style.left = percent * 100 + "%";

    };

    let list = [
        new Music("Author", "Title of audio 1", 0),
        new Music("Author", "Title of audio 2", 1),
    ];

    let idMap = {
        0: "http://localhost/yourfriends/*music*.mp3",
        1: "http://localhost/yourfriends/*music*.mp3"
    };

    $scope.musicList = list;
    $scope.volume = .5;

    $scope.play = () => {

        if (player.paused) {
            player.play();
        }
        else {
            player.pause();
        }

    };

    $scope.updateVolume = () => {
        player.volume = $scope.volume;
    };

    $scope.changeSource = (id) => {
        player.src = idMap[id];
        player.play();
    };

    $scope.changePosition = (e) => {
        let barOffset = document.getElementById("progress").offsetLeft;
        let barWidth = document.getElementById("progress").clientWidth;
        let mouseX = e.clientX - barOffset;
        let percent = (mouseX * 100) / barWidth;
        player.currentTime = (player.duration * percent) / 100;
        $log.info((player.duration * percent) / 100);

        if (player.paused) {
            player.play();
        }
    };

    angular.element(document).ready(() => {
        $scope.updateVolume();
    });
});