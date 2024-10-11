function sendPass() {
  const passForm = document.querySelector("#passForm");
  const result = document.getElementById('result');

  if (passForm) {
    passForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const slug = passForm.querySelector('[name=slug]').value;
      const user_pass = passForm.querySelector('[name=user_pass]').value;
      const ajax_url = 'https://nicowebsite.com/docs/wp-json/custom/v1/check-password';

      try {
        const response = await fetch(ajax_url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            slug: slug,
            password: user_pass
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        
        if (json.success) {
          const passCoded = btoa(user_pass);
          window.location.href = `/quotes/${slug}?p=${passCoded}`;
        } else {
          result.innerHTML = "😭 Ups... esa no es la contraseña.";
        }
      } catch (error) {
        console.error('Fetch error:', error);
        result.innerHTML = "😭 Error al verificar la contraseña. Intente nuevamente.";
      }
    });
  }
}

export default sendPass;