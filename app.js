document.addEventListener("DOMContentLoaded", function () {

  // PEGA TU URL DE APPS SCRIPT
  var URL = "https://script.google.com/macros/s/AKfycbzf5up_ixliJAUzBybWzedsDCtyUCHssd7gtpwZVlWbu-TTqu3ViT8xQgIBdwDJXBuc/exec";

  // PANTALLA INICIAL
  document.getElementById("contenido").innerHTML = `
  <div class="pantalla azul">

    <img src="logo.png" class="logo">

    <h1 class="titulo">
      PRE PROMO B
    </h1>

    <p class="subtitulo">
      Colegio Bautista Santa Cruz
    </p>

    <img src="profesor.jpg" class="profesor">

    <p style="margin-top:25px;">
      Bienvenidos al Sistema Académico
    </p>

  </div>
`;

  // IR A AVISOS
  setTimeout(cargarAvisos, 3000);

  // CARGAR AVISOS
  function cargarAvisos() {

    document.getElementById("contenido").innerHTML = `
      <div class="container">

        <h2 style="text-align:center;">
          Avisos
        </h2>

        <div id="lista">
          Cargando...
        </div>

        <button
  class="boton boton-fijo"
  onclick="continuarApp()">
  Continuar
</button>

      </div>
    `;

    fetch(URL + "?accion=avisos")
      .then(r => r.json())
      .then(data => {

        let html = "";

        data.forEach(a => {

          html += `
            <div class="card">
              <b>${a.fecha}</b><br><br>
              ${a.mensaje}
            </div>
          `;

        });

        document.getElementById("lista").innerHTML = html;

      })
      .catch(() => {

        document.getElementById("lista").innerHTML =
          "Error al cargar avisos";

      });

  }

  // LOGIN
  // CONTINUAR
window.continuarApp = function () {

  let usuario =
    localStorage.getItem(
      "usuarioGuardado"
    );

  let password =
    localStorage.getItem(
      "passwordGuardado"
    );

  // SI YA INICIO SESION
  if (usuario && password) {

    fetch(
      URL +
      "?usuario=" + usuario +
      "&password=" + password
    )

    .then(r => r.json())

    .then(data => {

      if (data.status == "ok") {

        mostrarPanel(data);

      } else {

        irLogin();

      }

    });

  } else {

    irLogin();

  }

}
  window.irLogin = function () {

    document.getElementById("contenido").innerHTML = `
      <div class="container">

 <h2 style="text-align:center;">
  Iniciar Sesión
</h2>

<img
  src="logo.png"
  class="logo"
  style="
    width:90px;
    display:block;
    margin:auto;
  ">

        <input
          type="text"
          id="u"
          class="input"
          placeholder="Usuario">

        <input
          type="password"
          id="p"
          class="input"
          placeholder="Contraseña">

        <button
          class="boton"
          onclick="login()">

          Ingresar

        </button>

      </div>
    `;

  }

  // LOGIN FUNCION
  window.login = function () {

    let u = document.getElementById("u").value;
    let p = document.getElementById("p").value;

    fetch(URL + "?usuario=" + u + "&password=" + p)

      .then(r => r.json())

      .then(data => {

        if (data.status == "ok") {

  // GUARDAR SESION
  localStorage.setItem(
    "usuarioGuardado",
    u
  );

  localStorage.setItem(
    "passwordGuardado",
    p
  );

  mostrarPanel(data);

} else {

          alert("Datos incorrectos");

        }

      })

      .catch(() => {

        alert("Error de conexión");

      });

  }

  // PANEL
  function mostrarPanel(data) {

    let html = `
      <div class="container">

       <div style="
  background:linear-gradient(135deg,#1565c0,#42a5f5);
  color:white;
  padding:25px;
  border-radius:0 0 25px 25px;
  margin:-20px -20px 20px -20px;
  text-align:center;
">

  <img
    src="logo.png"
    style="
      width:70px;
      margin-bottom:10px;
    ">

  <h2>
    ${data.nombre}
  </h2>

</div>

    html += `

<div style="
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  margin-bottom:20px;
">

  <button
    class="boton"
    onclick='mostrarNotas(${JSON.stringify(data.notas)})'>

    📘 Notas

  </button>

  <button
    class="boton"
    onclick='mostrarDisciplina(${JSON.stringify(data.disciplina)})'>

    ⚠️ Disciplina

  </button>

</div>

<div id="contenidoPanel">

</div>

`;
    html += `</div>`;

    document.getElementById("contenido").innerHTML = html;
    mostrarNotas(data.notas);

  }
// CERRAR SESION
window.cerrarSesion = function () {

  localStorage.removeItem(
    "usuarioGuardado"
  );

  localStorage.removeItem(
    "passwordGuardado"
  );

  location.reload();

}
});
