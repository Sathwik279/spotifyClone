
let currentSong = new Audio();
function convertSecondsToMinutes(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds =Math.floor( seconds % 60);
  
    // Ensure the remaining seconds are always displayed with two digits
    let formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  
    return minutes + ':' + formattedSeconds;
  }
  
async function getSongs(){
    let a = await fetch('http://127.0.0.1:5500/songs/')
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName('a')
    
    let songs = []
    for(let index = 0;index<as.length;index++)
    {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split('/songs/')[1]);
            // console.log(element)
        }
    }
    // console.log(songs)
    return songs
}

const playMusic = (track,pause)=>{
    // let audio = new Audio("/songs/"+track);
    currentSong.src = "/songs/"+track;
    if(!pause)
    {
        currentSong.play();
        play.src="pause.svg"

    }
    document.querySelector(".songinfo").innerHTML = track.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll("%5D"," ")
    document.querySelector(".songtime").innerHTML = "00:00";
}

async function main(){
    //get the list of all the songs
   
    let songs = await getSongs()
    // console.log(songs)
    
        playMusic(songs[0],true)
        play.svg = "pause.svg"
    let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];
    for(const song of songs)
    {
        songUL.innerHTML = songUL.innerHTML+`<li class>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                 <div class="noDis">${song}</div>
                                  <div>${song.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll("%5D"," ")}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playNow">
                                <span></span>
                            <img class="invert" src="play.svg" alt="">
                            </div>
                        </li>`
    }

    //attach an event listener to each song
    Array.from( document.querySelector(".songList").getElementsByTagName("li")).forEach((e=>{
        e.addEventListener("click",element=>{

            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            
        })
    }))
    
    //attach an event listener to play prev and next
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src = "play.svg"
        }
    })

    //listen for timeupdate event
    currentSong.addEventListener('timeupdate',()=>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(currentSong.currentTime)} / ${convertSecondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100+"%"
    })

    //add an event listener to seek bar
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
        console.log(e.target,e.offsetX);
        document.querySelector(".circle").style.left = percent +"%";
        currentSong.currentTime = currentSong.duration*percent/100;
        
    })
    //add an event listener for hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left = 0;
    })
    //add an event listener for close
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = '-100%';
    })
} 

main();

{/* <div>${song.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll("%5D"," ")}</div>
<div>Harry</div> */}