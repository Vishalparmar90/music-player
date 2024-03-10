document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById("audioPlayer");
    const playlist = document.getElementById("playlist");
    const albumImage = document.querySelector(".album-image");
    const fileInput = document.getElementById("fileInput");
    const fileLabel = document.querySelector(".file-label");
    const addSongBtn = document.getElementById("addSongBtn");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const volumeBtn = document.getElementById("volumeBtn");
    const volumeSlider = document.getElementById("volumeSlider");
    const songTimeline = document.getElementById("songTimeline");

    let currentSongIndex = 0;
    let isPlaying = false;

    const songs = [];
// Function to display the cover image of an mp3 file

    function updatePlaylist() {
        playlist.innerHTML = "";
        songs.forEach((song, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = song.name;
            listItem.addEventListener("click", function () {
                playSong(song);
            });
            playlist.appendChild(listItem);
        });
    }

    function playSong(song) {
        audioPlayer.src = URL.createObjectURL(song);
        audioPlayer.play();

        albumImage.src = song.album || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/4QAuRXhpZgAATU0AKgAAAAgAAkAAAAMAAAABAAEAAEABAAEAAAABAAAAAAAAAAD/2wBDAAoHBwkHBgoJCAkLCwoMDxkQDw4ODx4WFxIZJCAmJSMgIyIoLTkwKCo2KyIjMkQyNjs9QEBAJjBGS0U+Sjk/QD3/2wBDAQsLCw8NDx0QEB09KSMpPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT3/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDbyj8Wrj2rQn5mSEcqCsBQg5xk9aiimFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUpSgP//Z";
        rotateAlbumImage();
    }

    function rotateAlbumImage() {
        let isPlaying = false; 

        const rotate = () => {
            if (!isPlaying) return; 

            const rotationSpeed = 0.5; 
            const currentTime = audioPlayer.currentTime;
            const rotationDegrees = (currentTime * rotationSpeed) % 360;

            albumImage.style.transform = `rotate(${rotationDegrees}deg)`;
            requestAnimationFrame(rotate);
        };

        // Start rotation when music starts playing
        audioPlayer.addEventListener("play", () => {
            isPlaying = true;
            rotate();
        });

        // // Stop rotation when music pauses or stops
        // audioPlayer.addEventListener("pause", () => {
        //     isPlaying = false;
        // });
        // audioPlayer.addEventListener("ended", () => {
        //     isPlaying = false;
        // });
    }

    // Event listener for file input changes
    fileInput.addEventListener("change", function (event) {
        const selectedFiles = event.target.files;
        for (const file of selectedFiles) {
            file.album = "unnamed.jpg";
            songs.push(file);
        }
        updatePlaylist();
    });

    // Event listener for the "Add Songs" label
    fileLabel.addEventListener("click", function () {
        fileInput.click();
    });

});
