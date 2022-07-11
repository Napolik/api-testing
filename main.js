class PostList extends HTMLElement {
  constructor() {
    super()

    this.posts = '';
    this.getPosts();

    this.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const id = e.target.href.split('#')[1].split('=')[1];
        //console.log(id);
        this.getSinglePost(id);
      } else {
        this.querySelector('.posts__single-post').classList.remove('active');
      }

    });
  }

  getSinglePost(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id)
        .then(response => response.json())
        .then(data => this.showSinglePost(data) )
  }

  showSinglePost(data) {
    const singlePost = this.querySelector('.posts__single-post');
    singlePost.classList.add('active');
    singlePost.innerHTML = '';

    const titleEl = document.createElement('div');
    titleEl.classList.add('title');
    const bodyEl = document.createElement('div');
    bodyEl.classList.add('body');
    titleEl.innerHTML = data.title;
    bodyEl.innerHTML = data.body;

    singlePost.append(titleEl);
    singlePost.append(bodyEl);
  }

  getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => this.insertPosts(data) )
  }

  insertPosts(data) {
    const postsCount = data.length;

    for (let i = 0; i < postsCount; i++ ) {
      const id = data[i].id;
      const title = data[i].title;
      const titleElement = document.createElement('li');

      titleElement.innerHTML = '<a href="#id=' + id + '">' + title + '</a>';
      this.querySelector('.posts__list').append(titleElement);
    }

  }
}

customElements.define('post-list', PostList);
