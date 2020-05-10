window.alert = new Audio('./alert.aac');
const nothing = new Audio("http://touchbasicapp.com/nothing.wav");

const tapped = function() {
    nothing.play();
    nothing.currentTime = 0;

};
document.body.addEventListener('touchstart', tapped, false);
document.body.addEventListener('click', tapped, false);

// Check if audio starts already unlocked by playing a blank wav.
nothing.play().then(function() {
    console.log("Audio started unlocked!");
}).catch(function() {
    console.log("Audio started locked :(");
});
