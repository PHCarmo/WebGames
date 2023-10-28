const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");

let audio = new Audio();

const playTune = (key) => {
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => {
            clickedKey.classList.remove("active");
        }, 150);
        audio.src = `src/tunes/${key}.wav`;
        audio.play();
    }
};

pianoKeys.forEach(key => {
    key.addEventListener("click", () => playTune(key.dataset.key))
});

document.addEventListener("keydown", (e) => {
    playTune(e.key)
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
};

volumeSlider.addEventListener("input", handleVolume);

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};

keysCheck.addEventListener("click", showHideKeys);