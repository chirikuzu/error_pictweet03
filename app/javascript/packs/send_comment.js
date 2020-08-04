function send_comment() {
  const comment_form_button = document.getElementById("comment_form_button");
  const comment_form = document.getElementById("comment-form");

  comment_form_button.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData(comment_form);
    const XHR = new XMLHttpRequest();
    const url = pathname + "/comments"

    XHR.open("POST", url, true);
    XHR.responseType = "json";
    XHR.send(formData);

      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }

      const comment = XHR.response.text;
      const name = XHR.response.user_name;
      const comments_area = document.getElementsByClassName("comments")[0];

      const HTML = `
          <p>
          <strong><a href="/users/1">${name}</a>：</strong>
          ${comment.text}
        </p>
        `;
      comments_area.insertAdjacentHTML("beforeend", HTML);

    };

    XHR.onerror = function () {
      alert("Request failed");
    };

    comment_form.reset();
  });
}

window.addEventListener("load", send_comment);
