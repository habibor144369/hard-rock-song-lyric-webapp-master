// api link 
const apiLink = 'https://api.lyrics.ovh';

const button = document.getElementById("btn");
const search = document.getElementById("searchInput");
const result = document.getElementById("result")

// button addEventListener
button.addEventListener('click', function(e) {
    e.preventDefault()
        searchValue = search.value.trim();
    
    if (searchValue) {
        searchSong(searchValue)
    }
    else {    
        alert("nothing to search");
    } 
})

//search song 
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiLink}/suggest/${searchValue}`)
    const data = await searchResult.json();
    showData(data)   
}
// showData
function showData(data){
    
    result.innerHTML =`
      ${data.data
        .map(song=> `
       
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name"><strong>${song.artist.name}</strong> -${song.title} </h3>
            <p class="author lead">Album by <span>${song.album.title}</span></p>
        </div>
        <div class="col-md-3 text-md-right text-center">
           <button class="btn btn-success"><span data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</span></button>
        </div>
        </div>`).join('')}`;
}

// result 
result.addEventListener('click', e=>{
    const clickedElement = e.target;

    if (clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const title = clickedElement.getAttribute('data-songtitle');
        
        getLyrics(artist, title)
    }
})

// Get lyrics 
async function getLyrics(artist, title) {
    const res = await fetch(`${apiLink}/v1/${artist}/${title}`);
    const data = await res.json();
    const lyrics = data.lyrics; 
    
    result.innerHTML =` 
        <div class="single-lyrics text-center">
            <button class="btn go-back">&lsaquo;</button>
            <h2 class="text-success mb-4" >${artist} - ${title}</h2>
            <pre class="lyric text-white">${lyrics}</pre>  
        </div>
    `;
}