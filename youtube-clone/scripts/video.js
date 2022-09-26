var videoId = localStorage.getItem("video-id");

    let loadVideoDetails = async () => {
        try {
            let res = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=AIzaSyCZMnqTfi7zEgsaaZcKFhirl3OrJBHpFQ4`);
            let data = await res.json();
            console.log(data.items);
            appendVideo(data.items);
        } catch(err) {
            console.log(err);
        }
    }

    let appendVideo = (data) => {
        let element = data[0];
        document.title = element.snippet.title;
        document.querySelector("#video-container").textContent = "";
        let div = document.createElement("div");
        let iframe = document.createElement("iframe");
        iframe.src = "https://www.youtube.com/embed/" + element.id;
        iframe.setAttribute('allowFullScreen', '');
        let h2 = document.createElement("h2");
        h2.textContent = element.snippet.title;
        let h4 = document.createElement("h4");
        h4.textContent = element.snippet.channelTitle;
        let p = document.createElement("pre");
        p.textContent = element.snippet.description;
        let views = document.createElement("p");
        views.innerHTML = element.statistics.viewCount + " views &middot; " + element.statistics.likeCount + " likes";
        div.append(iframe, h2, views, h4, p);
        document.querySelector("#video-container").append(div);
    }

    let loadVideos = async () => {
        try {
            let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&type=video&key=AIzaSyCZMnqTfi7zEgsaaZcKFhirl3OrJBHpFQ4`);
            let data = await res.json();
            console.log(data.items);
            appendVideos(data.items);
        } catch(err) {
            console.log(err);
        }
    }

    let appendVideos = (data) => {
        document.querySelector("#recommended-results").textContent = "";
        data.forEach(element => {
            if(element.snippet) {
            let div = document.createElement("div");
            let img = document.createElement("img");
            img.src = element.snippet.thumbnails.medium.url;
            let h4 = document.createElement("h4");
            h4.textContent = element.snippet.title;
            let p = document.createElement("p");
            p.textContent = element.snippet.channelTitle;
            div.append(img, h4, p);
            div.addEventListener("click", function() {
                localStorage.setItem("video-id", element.id.videoId);
                window.location.href = "./video.html";
            });
            document.querySelector("#recommended-results").append(div);
            }
        });
    }

    loadVideoDetails();
    loadVideos();