const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

function getData(url) {
  ajax.open("GET", url, false); // 데이터 오픈
  ajax.send(); // send라는 함수를 호출하면 데이터 가져옴

  return JSON.parse(ajax.response);
}

// console.log(ajax.response); // 응답하기

// JSON 형태를 객체로 변환하기
const newsFeed = getData(NEWS_URL);
const ul = document.createElement("ul");

// 받아온 데이터를 반복문 사용해서 보여주기

window.addEventListener("hashchange", function () {
  const id = location.hash.substr(1);

  const newsContent = getData(CONTENT_URL.replace("@id", id));
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;
  content.appendChild(title);
  console.log(newsContent);
});

for (let i = 0; i < 10; i++) {
  const div = document.createElement("div");

  div.innerHTML = `
    <li>
      <a href='#${newsFeed[i].id}'>
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `;

  ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
