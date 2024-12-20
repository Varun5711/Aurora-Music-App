//Defining Everything (one by one) 
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = document.querySelectorAll(".songItem")
let Items = document.querySelectorAll(".songItemPlay");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let masterSongName = document.getElementById("masterSongName");
let data = document.getElementById("container");

let songs = [
    { songName: "Hikari", filePath: "Songs/1.mp3", coverPath: "Covers/cover2.jpg" },
    { songName: "Automotivo Liberado 1.0 (Super Slowed)", filePath: "Songs/2.mp3", coverPath: "Covers/cover2.jpg" },
    { songName: "Funk Estrelas", filePath: "Songs/3.mp3", coverPath: "Covers/cover3.jpg" },
    { songName: "Number One - Bankai", filePath: "Songs/4.mp3", coverPath: "Covers/cover4.jpg" },
    { songName: "Softcore", filePath: "Songs/5.mp3", coverPath: "Covers/cover5.jpg" },
    { songName: "Funk Universo (Slowed)", filePath: "Songs/6.mp3", coverPath: "Covers/cover6.jpg" },
    { songName: "Sleepwalker (Slowed)", filePath: "Songs/7.mp3", coverPath: "Covers/cover7.jpg" },
    { songName: "Kompa - Rarin", filePath: "Songs/8.mp3", coverPath: "Covers/cover8.jpg" },
    { songName: "Beautiful", filePath: "Songs/9.mp3", coverPath: "Covers/cover9.jpg" },
    { songName: "New Page", filePath: "Songs/10.mp3", coverPath: "Covers/cover10.jpg" }
];

//Playing the song

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
        gif.style.opacity = 0;
    }
});

//To Update the time and implimenting the changes

audioElement.addEventListener("timeupdate", () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
});

//To Track items for each and every song from the given 10 songs

songItems.forEach((el, i) => {
    el.getElementsByTagName("img")[0] == songs[i].coverPath;
    el.getElementsByClassName("songName")[0] == songs[i].songName;
});

//A function which is used in many ways to remove and add the icons dynamically

const makeAllPlays = () => {
    Items.forEach((element) => {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
}

//To make a playbar for playing  (pausing through the masterPlayBar) 

Items.forEach((el) => {
    el.addEventListener("click", (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `Songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
    });
});

//Dynamically implimenting the backward and forward button

Backward = () => {
    previous.addEventListener("click", () => {
        if (songIndex <= 0) {
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
        gif.style.opacity = 1;
        if(Items[songIndex].classList.contains("fa-play-circle")) {
            if(songIndex >= 0) {
                Items[songIndex].classList.add("fa-pause-circle");
                Items[songIndex+1].classList.add("fa-play-circle");
                Items[songIndex+1].classList.remove("fa-pause-circle");
            }
        }
    });
}

Backward();

Forward = () => {
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
        gif.style.opacity = 1;
        Items[songIndex].classList.remove("fa-play-circle");
        Items[songIndex].classList.add("fa-pause-circle");
        if (Items[songIndex].classList.contains("fa-pause-circle")) {
            if (songIndex <= 9) {
                Items[songIndex - 1].classList.add("fa-play-circle");
                Items[songIndex - 1].classList.remove("fa-pause-circle");
            }
        }
    });
}

Forward();

//Physically implimenting the playbar

const interactiveKeys = () => {
    if (masterPlay) {
        document.addEventListener("keypress", (e) => {
            if (e.key === " " || e.key === "Spacebar") {
                masterPlay.click();
                e.preventDefault();
            }
        });
    }

    if (next) {
        document.addEventListener("keypress", (e) => {
            if (e.shiftKey && e.code === "F11") {
                next.click();
            }
        });
    }

    if (previous) {
        document.addEventListener("keypress", (e) => {
            if (e.shiftKey && e.code === "F9") {
                previous.click();
            }
        });
    }
};

interactiveKeys();

//Updating the playpause in the songList (play-pause icons)

masterPlay.addEventListener("click", () => {
    makeAllPlays();
    if (masterPlay.classList.contains("fa-pause-circle")) {
        Items[songIndex].classList.remove("fa-play-circle");
        Items[songIndex].classList.add("fa-pause-circle");
    }
});

//Continuing the song after one ends

audioElement.addEventListener("ended", () => {
    if (audioElement.ended) {
        songIndex = (songIndex + 1) % songs.length;
        audioElement.src = `Songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        makeAllPlays();
        Items[songIndex].classList.remove("fa-play-circle");
        Items[songIndex].classList.add("fa-pause-circle");
    }
});
