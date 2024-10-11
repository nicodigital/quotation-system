function sendPass() {
  const passForm = document.querySelector("#passForm");
  const result = document.getElementById('result');

  if (passForm) {
    passForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const slug = passForm.querySelector('[name=slug]').value;
      const user_pass = passForm.querySelector('[name=user_pass]').value;
      const ajax_url = `https://nicowebsite.com/docs/wp-json/wp/v2/quotation?slug=${slug}`;

      try {
        // Intento 1: Usando mode: 'cors' explícitamente
        const response = await fetch(ajax_url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        const pass = json[0]?.acf?.pass;

        if (user_pass === pass) {
          const passCoded = btoa(user_pass);
          window.location.href = `/quotes/${slug}?p=${passCoded}`;
        } else {
          result.innerHTML = "😭 Ups... esa no es la contraseña.";
        }
      } catch (error) {
        console.error('Fetch error:', error);

        // Intento 2: Usar JSONP como fallback
        const script = document.createElement('script');
        const callbackName = 'jsonpCallback_' + Math.round(100000 * Math.random());
        window[callbackName] = function(data) {
          const pass = data[0]?.acf?.pass;
          if (user_pass === pass) {
            const passCoded = btoa(user_pass);
            window.location.href = `/quotes/${slug}?p=${passCoded}`;
          } else {
            result.innerHTML = "😭 Ups... esa no es la contraseña.";
          }
          delete window[callbackName];
          document.body.removeChild(script);
        };

        script.src = `${ajax_url}&callback=${callbackName}`;
        document.body.appendChild(script);
      }
    });
  }
}

export default sendPass;