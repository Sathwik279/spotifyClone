

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
            songs.push(element.href.split('/songs')[1]);
            // console.log(element)
        }
    }
    // console.log(songs)
    return songs
}

async function main(){
    //get the list of all the songs
    let songs = await getSongs()
    console.log(songs)

    let songUL = document.querySelector('.songList').getElementsByTagName('ul')[0];
    for(const song of songs)
    {
        songUL.innerHTML = songUL.innerHTML+`<li class>
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ").replaceAll("%5B"," ").replaceAll("%5D"," ")}</div>
                                <div>Harry</div>
                            </div>
                            <div class="playNow">
                                <span>Play Now</span>
                            <img class="invert" src="play.svg" alt="">
                            </div>
                            
                        </li>`
    }
    

} 

main();

