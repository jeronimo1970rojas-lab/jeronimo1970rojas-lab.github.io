document.addEventListener("DOMContentLoaded", function () {

  // PEGA TU URL DE APPS SCRIPT
  var URL = "https://script.google.com/macros/s/AKfycbzf5up_ixliJAUzBybWzedsDCtyUCHssd7gtpwZVlWbu-TTqu3ViT8xQgIBdwDJXBuc/exec";

  // PANTALLA INICIAL
  document.getElementById("contenido").innerHTML = `
    <div class="pantalla azul">
      <h1>PRE PROMO B</h1>
      <p>Bienvenido</p>
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

        <h2>Iniciar Sesión</h2>

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

        <h2>
          ${data.nombre}
          <button
  class="boton"
  onclick="cerrarSesion()"
  style="margin-bottom:20px;">

  Cerrar Sesión

</button>
        </h2>

        <h3>Notas</h3>
    `;

    data.notas.forEach(n => {

      html += `
        <div class="card">
          <b>${n.materia}</b><br>
          Nota: ${n.nota}
        </div>
      `;

    });

    html += `<h3>Disciplina</h3>`;

    data.disciplina.forEach(d => {

      html += `
        <div class="card">
          <b>${d.fecha}</b><br>
          ${d.detalle}
        </div>
      `;

    });

    html += `</div>`;

    document.getElementById("contenido").innerHTML = html;

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
