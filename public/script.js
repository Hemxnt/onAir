const userVideo = document.getElementById('user-video')
const startButton = document.getElementById('start-button');

const state = { media: null }
const socket = io();

startButton.addEventListener('click', async ()=> {
    const mediaRecoder = new MediaRecorder(state.media,{
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        frameRate: 25,
    });

    mediaRecoder.ondataavailable = ev => { 
        console.log('Data available:', ev.data);
        socket.emit('binarystream', ev.data);
    }

    mediaRecoder.start(25)
})

window.addEventListener('load', async e => {
    console.log('Load event fired');
    try {
        const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        state.media = media
        console.log('Media stream obtained:', media);
        userVideo.srcObject = media;
    } catch (error) {
        console.error('Error accessing media devices:', error);
    }
});
