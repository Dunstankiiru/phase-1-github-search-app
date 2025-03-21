document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
    const toogleBtn = document.createElement("button");

    let searchType = "users";

    toogleBtn.textContent = "search Repositories Instead";
    toogleBtn.style.margin = "10px";
    form.appendChild(toogleBtn);

    toogleBtn.addEventListener("click", () => {

        searchType = searchType ==="users" ? "Search Repositories Instead" : "Search Users Instead";
    });

    form. addEventListener("submit", (event) => {
        event.preventDefault();

        const query = searchInput.value.trim();
        if (query ==="") return;

        if (searchType=== "users"){
            searchGitHubUsers(query);
        } else {
            searchGitHubRepos(query);
        }
    });

    function searchGitHubUsers(query) {
        fetch(`https://api.github.com/search/users?q=${query}`, {
            headers: { "Accept": "application/vnd.github.v3+json" }
        })
        .then(response => response.json())
        .then(data => displayUsers(data.items))
        .catch(error => console.error("Error fetching users:", error));
    }
    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: { "Accept": "application/vnd.github.v3+json" }
        })
            .then(response => response.json())
            .then(repos => displayRepos(repos))
            .catch(error => console.error("Error fetching repos:", error));
    }

    function displayRepos(repos) {
        repoList.innerHTML = "<h3>Repositories:</h3>";
        repos.forEach(repo => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            repoList.appendChild(li);
        });
    }

    function searchGitHubRepos(query) {
        fetch(`https://api.github.com/search/repositories?q=${query}`, {
            headers: { "Accept": "application/vnd.github.v3+json" }
        })
            .then(response => response.json())
            .then(data => displayRepos(data.items))
            .catch(error => console.error("Error fetching repositories:", error));
    }
});
