class PostList extends HTMLElement {
  constructor() {
    super()

    this.posts = '1';

    this.getPosts();
  }

  getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => this.insertPosts(data) )
  }

  insertPosts(data) {
    const postsCount = data.length;

    for (let i = 0; i < postsCount; i++ ) {
      const userId = data[i].userId;
      const id = data[i].id;
      const title = data[i].title;
      const body = data[i].body;

      const titleElement = document.createElement('li');
      titleElement.innerHTML = '<a href="#id=' + id + '">' + title + '</a>';

      this.querySelector('.posts__list').append(titleElement);
      console.log(title, body);
    }

  }
}

customElements.define('post-list', PostList);
