// SignUp
const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {
      action, method, username, email, password, confirmPassword,
    } = event.target;

    if (password.value !== confirmPassword.value) {
      alert('Пароли не совпадают!');
      window.location.href = action;
      return;
    }
    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });
    const responseJson = await response.json();
    if (responseJson.userHadRegistration) {
      alert('Пользователь с таким email существует!');
      window.location.href = action;
    }

    if (responseJson.userSignedUp) {
      window.location.href = '/';
    }
  });
}

// SignIn

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {
      action, method, email, password,
    } = event.target;

    const response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });
    const responseJson = await response.json();

    if (responseJson.isInvalidEmail) {
      alert('Неправильный Email!');
      window.location.href = action;
    }

    if (responseJson.isInvalidPassword) {
      alert('Неправильный пароль!');
      window.location.href = action;
    }

    if (responseJson.userSignedIn) {
      window.location.href = '/';
    }
  });
}

// Add to Fovourites
const addToFavouriteBtns = document.querySelectorAll('#add-to-favourite');

if (addToFavouriteBtns) {
  addToFavouriteBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const { filmId } = event.target.dataset;

      const response = await fetch('/favourites', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ filmId }),
      });

      const responseJson = await response.json();

      if (responseJson.isFilmAddedToFavourite) {
        window.location.href = '/favourites';
      }
    });
  });
}

// Delete from Fovourites
const deleteFromFavouriteBtns = document.querySelectorAll('#delete-from-favourite');

if (deleteFromFavouriteBtns) {
  deleteFromFavouriteBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const { filmId } = event.target.dataset;
      console.log(filmId);
      const response = await fetch(`/favourites/${filmId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });

      const responseJson = await response.json();

      if (responseJson.isDeleted) {
        window.location.href = '/favourites';
      }
    });
  });
}

// Search films
// by name
const searchFilmsByNameForm = document.getElementById('searchByNameForm');

if (searchFilmsByNameForm) {
  searchFilmsByNameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { filmInput: { value: filmInput }, action, method } = event.target;
    const response = await fetch(action, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ filmInput }),
    });
    const isResults = await response.json();
    if (isResults) {
      window.location.href = '/search/results';
    } else {
      window.location.href = '/notfound';
    }
  });
}
// by types
const searchByTypeForm = document.getElementById('searchByTypeForm');

if (searchByTypeForm) {
  searchByTypeForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // console.log(event.target.type.value);

    const { type: { value: type }, method, action } = event.target;

    const response = await fetch(action, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ type }),
    });
    const isResults = await response.json();

    if (isResults) {
      window.location.href = '/search/results';
    } else {
      window.location.href = '/notfound';
    }
  });
}

// Comment Film

const addCommentBtn = document.getElementById('add-comment');

if (addCommentBtn) {
  addCommentBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const { filmId } = event.target.dataset;
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/comment');
    form.classList.add('add-comment-form');

    const textarea = document.createElement('textarea');
    textarea.setAttribute('type', 'text');
    textarea.setAttribute('name', 'comment');
    textarea.setAttribute('placeholder', 'comment');
    textarea.setAttribute('rows', '5');
    textarea.style.width = '100%';

    const submit = document.createElement('input');
    submit.setAttribute('type', 'submit');
    submit.setAttribute('value', 'Submit');
    submit.classList.add('btn');
    submit.classList.add('btn-success');

    form.appendChild(textarea);

    form.appendChild(submit);

    const filmInfo = document.querySelector('.film-info-description');

    filmInfo.innerHTML = '';
    filmInfo.insertAdjacentElement('beforeend', form);
    event.target.parentNode.innerHTML = '';

    const addCommentForm = document.querySelector('.add-comment-form');

    if (addCommentForm) {
      addCommentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const { comment: { value: comment }, method, action } = e.target;

        const response = await fetch(action, {
          method,
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ comment, movieId: filmId }),
        });
        const isResults = await response.json();

        if (isResults) {
          window.location.href = `/info/${filmId}`;
        } else {
          window.location.href = '/notfound';
        }
      });
    }
  });
}

// Delete comments
const deleteCommentBtns = document.querySelectorAll('#delete-comment');

if (deleteCommentBtns) {
  deleteCommentBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      const { filmId, commentId } = event.target.dataset;

      console.log(filmId);
      const response = await fetch(`/info/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });

      const responseJson = await response.json();

      if (responseJson.isDeleted) {
        window.location.href = `/info/${filmId}`;
      }
    });
  });
}
