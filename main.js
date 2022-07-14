class PostList extends HTMLElement {
  constructor() {
    super()

    this.posts = '';
    this.getPosts();

    this.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const id = e.target.href.split('#')[1].split('=')[1];
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
    const singlePost = document.querySelector('.posts__single-post');
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

class UserList extends HTMLElement {
  constructor() {
    super()

    this.getContent('users', this.insertUsers );
    this.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const id = e.target.href.split('#')[1].split('=')[1];

        this.getContent('users/' + id, this.showUserCard );
        this.getContent('albums/' + id + '/photos', this.showUserPhotos );
        this.getContent('users/' + id + '/todos', this.showUserTodos);
      }

    });
  }

  getContent(source, callback) {
    const URL = 'https://jsonplaceholder.typicode.com/' + source;
    fetch(URL)
        .then(response => response.json())
        .then(data => callback(data) )
  }

  showUserTodos(data) {
    const userTodos = document.querySelector('.user-todos');
    userTodos.innerHTML = '';

    for (let i = 0; i < data.length; i++ ) {
      const {userId, id, title, completed} = data[i];
      const completedStr = completed ? 'OK' : 'X';

      userTodos.innerHTML +=  '<div class="task">' +
                                '<div>UserId: ' + userId + '</div>' +
                                '<div>TaskId: ' + id + '</div>' +
                                '<div>Task title: ' + title + '</div>' +
                                '<div>Status: ' + completedStr + '</div>' +
                              '</div>';
    }
  }

  showUserPhotos(data) {
    const userThumbs = document.querySelector('.user-thumbs');
    userThumbs.innerHTML = '';

    for (let i = 0; i < data.length; i++ ) {
      const {title, thumbnailUrl} = data[i];
      const img = document.createElement('img');

      img.setAttribute('src', thumbnailUrl);
      img.setAttribute('alt', title);
      userThumbs.append(img);
    }
  }

  showUserCard(data) {
    const userCard = document.querySelector('.user-card');
    const { name, username, email, phone, website, company } = data;

    userCard.innerHTML = '';
    userCard.innerHTML = '<div><span>Name:</span> ' + name + '</div>' +
                         '<div><span>UserName:</span> ' + username + '</div>' +
                         '<div><span>Email:</span> ' + email + '</div>' +
                         '<div><span>Phone:</span> ' + phone + '</div>' +
                         '<div><span>Website:</span> ' + website + '</div>' +
                         '<div><span>Company:</span> ' + company.name + '</div>';
  }

  insertUsers(data) {
    const usersCount = data.length;

    for (let i = 0; i < usersCount; i++ ) {
      const id = data[i].id;
      const name = data[i].name;
      const nameElement = document.createElement('li');

      nameElement.innerHTML = '<a href="#id=' + id + '">' + name + '</a>';
      document.querySelector('.user-list').append(nameElement);
    }

  }
}

customElements.define('post-list', PostList);
customElements.define('user-list', UserList);
