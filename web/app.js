const App = () => {
  async function api(url, method) {
    return await fetch(`http://localhost:4000/${url}`, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
  async function add(name) {
    await api(`add/${name}`, "POST");
    view();
  }
  async function remove() {
    const data = await api("remove", "POST");
    const name = data.name;
    view();
    alert(`Removendo ${name}`);
  }
  async function view() {
    const data = await api("view", "GET");
    const queue = data.queue.reverse();
    const list = document.getElementById("lista");
    list.innerHTML = "";
    queue.forEach((name, index) => {
      list.innerHTML += `<li>
        <span>${index + 1}. </span>
        <span>${name}</span>
      </li>`;
    });
  }
  return {
    init: function () {
      view();
      this.on();
    },
    on: function () {
      const buttonAdd = document.getElementById("add");
      buttonAdd.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        add(name);
        document.getElementById("name").value = "";
      });
      const buttonRemove = document.getElementById("remove");
      buttonRemove.addEventListener("click", () => {
        remove();
      });
    },
  };
};

App().init();
