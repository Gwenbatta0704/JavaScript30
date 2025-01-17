

/*Get our elements*/
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipbuttons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/*Build out function*/
function togglePlay(){
    const method = video.paused? 'play':'pause';
    video[method]();
}
function updateButton(){
    const icon = this.paused? '⏵':'⏸';
    toggle.textContent = icon;
    console.log('Update the button');
}
function skip(){
    video.currentTime+= parseFloat(this.dataset.skip);
}
function handleRangeUpdate(){
    console.log(this.value);
    video[this.name] = this.value;
}
function handleProgress(){
    const pourcent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${pourcent}%`;
}
function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
    console.log(e)
}
/*Event listeners*/
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);

toggle.addEventListener('click',togglePlay);
skipbuttons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change', handleRangeUpdate));
let mousedown = false;
ranges.forEach(range=>range.addEventListener('mousemove', handleRangeUpdate));
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=>{mousedown && scrub(e)});
progress.addEventListener('mousedown', ()=> mousedown=true);
progress.addEventListener('mouseup', ()=> mousedown=false);