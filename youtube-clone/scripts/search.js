document.querySelector("#search-input").value = localStorage.getItem("search");
document.title = localStorage.getItem("search") + " - Youtube";

let searchValue = async () => {
    try {
        let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${document.querySelector("#search-input").value}&type=video&key=AIzaSyCZMnqTfi7zEgsaaZcKFhirl3OrJBHpFQ4`);
        let data = await res.json();
        console.log(data.items);
        appendVideos(data.items);
    } catch(err) {
        console.log(err);
    }
}

let appendVideos = (data) => {
    document.querySelector("#search-results").textContent = "";
    data.forEach(element => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.src = element.snippet.thumbnails.medium.url;
        let divInner = document.createElement("div");
        let h2 = document.createElement("h2");
        h2.textContent = element.snippet.title;
        let p = document.createElement("p");
        p.textContent = element.snippet.channelTitle;
        let desc = document.createElement("p");
        desc.textContent = element.snippet.description;
        divInner.append(h2, p, desc);
        div.append(img, divInner);
        div.addEventListener("click", function() {
                localStorage.setItem("video-id", element.id.videoId);
                window.location.href = "./video.html";
            });
        document.querySelector("#search-results").append(div);
    });
}

searchValue();