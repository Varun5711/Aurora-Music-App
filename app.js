console.log("Welcome");

let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = document.querySelectorAll(".songItem")
let Items = document.querySelectorAll(".songItemPlay");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let masterSongName = document.getElementById("masterSongName")

let songs = [
    { songName: "Hikari", filePath: "Songs/1.p3", coverPath: "Covers/cover2.jpg" },
    { songName: "Automotivo Liberado 1.0 (Super Slowed)", filePath: "Songs/2.p3", coverPath: "Covers/cover2.jpg" },
    { songName: "Funk Estrelas", filePath: "Songs/3.p3", coverPath: "Covers/cover3.jpg" },
    { songName: "Number One - Bankai", filePath: "Songs/4.p3", coverPath: "Covers/cover4.jpg" },
    { songName: "Softcore", filePath: "Songs/5.p3", coverPath: "Covers/cover5.jpg" },
    { songName: "Funk Universo (Slowed)", filePath: "Songs/6.p3", coverPath: "Covers/cover6.jpg" },
    { songName: "Sleepwalker (Slowed)", filePath: "Songs/7.p3", coverPath: "Covers/cover7.jpg" },
    { songName: "Kompa - Rarin", filePath: "Songs/8.p3", coverPath: "Covers/cover8.jpg" },
    { songName: "Beautiful", filePath: "Songs/9.p3", coverPath: "Covers/cover9.jpg" },
    { songName: "New Page", filePath: "Songs/10.p3", coverPath: "Covers/cover10.jpg" }
];

masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity = 0
    }
});

audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
});

songItems.forEach((el , i) => {
    el.getElementsByTagName("img")[0] == songs[i].coverPath;
    el.getElementsByClassName("songName")[0] == songs[i].songName;
});

const makeAllPlays = () => {
    Items.forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
}

Items.forEach((el) => {
    el.addEventListener("click" , (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        gif.style.opacity = 1
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `Songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    });
});

previous.addEventListener("click" , () => {
    if(songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});

next.addEventListener("click", () => {
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});

if (masterPlay) {
    document.addEventListener("keypress", (e) => {
        if (e.key === " " || e.key === "Spacebar") {
            masterPlay.click();
            e.preventDefault();
        }
    });
}