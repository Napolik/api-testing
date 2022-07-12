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

class UserList extends HTMLElement {
  constructor() {
    super()

    this.getUsers();
    this.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const id = e.target.href.split('#')[1].split('=')[1];
        this.getUserCard(id);
        this.getUserPhotos(id);
        this.getUserTodos(id);
      }

    });
  }

  getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => this.insertUsers(data) )
  }

  getUserCard(id) {
    fetch('https://jsonplaceholder.typicode.com/users/' + id)
        .then(response => response.json())
        .then(data => this.showUserCard(data) )
  }

  getUserPhotos(id) {
    fetch('https://jsonplaceholder.typicode.com/albums/' + id + '/photos')
        .then(response => response.json())
        .then(data => this.showUserPhotos(data) )
  }

  getUserTodos(id) {
    fetch('https://jsonplaceholder.typicode.com/users/' + id + '/todos')
        .then(response => response.json())
        .then(data => this.showUserTodos(data)  )
  }

  showUserTodos(data) {
    const userTodos = this.querySelector('.user-todos');
    userTodos.innerHTML = '';

    for (let i = 0; i < data.length; i++ ) {
      const {userId, id, title, completed} = data[i];

      const task = document.createElement('div');
      task.classList.add('task');
      const userIdEl = document.createElement('div');
      const idEl = document.createElement('div');
      const titleEl = document.createElement('div');
      const completedEl = document.createElement('div');
      const completedStr = completed ? 'OK' : 'X';

      userIdEl.innerHTML = 'UserId: ' + userId;
      idEl.innerHTML = 'TaskId: ' + id;
      titleEl.innerHTML = 'Taskname: ' + title;
      completedEl.innerHTML = 'Status: ' + completedStr;

      task.append(userIdEl, idEl, titleEl, completedEl);
      userTodos.append(task);
    }
  }

  showUserPhotos(data) {
    const userThumbs = this.querySelector('.user-thumbs');
    userThumbs.innerHTML = '';

    for (let i = 0; i < data.length; i++ ) {
      const title = data[i].title;
      const thumb = data[i].thumbnailUrl;
      const thumbEl = document.createElement('img');

      thumbEl.setAttribute('src', thumb);
      thumbEl.setAttribute('alt', title);
      userThumbs.append(thumbEl);
    }
  }

  showUserCard(data) {
    const userCard = this.querySelector('.user-card');
    userCard.innerHTML = '';

    const nameEl = document.createElement('li');
    const usernameEl = document.createElement('li');
    const emailEl = document.createElement('li');
    const phoneEl = document.createElement('li');
    const websiteEl = document.createElement('li');
    const companyEl = document.createElement('li');

    nameEl.innerHTML = 'Name: ' + data.name;
    usernameEl.innerHTML = 'Username: ' + data.username;
    emailEl.innerHTML = 'Email: ' + data.email;
    phoneEl.innerHTML = 'Phone: ' + data.phone;
    websiteEl.innerHTML = 'Website: ' + data.website;
    companyEl.innerHTML = 'Company: ' + data.company.name;

    userCard.append(nameEl, usernameEl, emailEl, phoneEl, websiteEl, companyEl);

  }

  insertUsers(data) {
    const usersCount = data.length;

    for (let i = 0; i < usersCount; i++ ) {
      const id = data[i].id;
      const name = data[i].name;
      const nameElement = document.createElement('li');

      nameElement.innerHTML = '<a href="#id=' + id + '">' + name + '</a>';
      this.querySelector('.user-list').append(nameElement);
    }

  }
}

customElements.define('post-list', PostList);
customElements.define('user-list', UserList);
