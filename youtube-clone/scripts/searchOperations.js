    var timerId;
    document.querySelector("#search-input").addEventListener("keyup", () => {
        debounce(callSearch, 1000);
    });

    let callSearch = () => {
        localStorage.setItem("search", document.querySelector("#search-input").value);
        window.location.href = "./search.html";
    }


let debounce = (func, delay) => {
    if (timerId) {
        clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
        func();
    }, delay);
}