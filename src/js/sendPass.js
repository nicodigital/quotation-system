function sendPass(){

    const passForm = document.querySelector("#passForm");
    const result = document.getElementById('result');
  
    if ( passForm ) {

      const slug = passForm.querySelector('[name=slug]').value;
      const ajax_url = 'https://nicowebsite.com/docs/wp-json/wp/v2/quotation?slug=' + slug;
      let pass = '';
      let passCoded = "";
      // console.log(ajax_url)

      passForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        fetch( ajax_url , {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }).then(async (response) => {

            let json = await response.json();

            if (response.status == 200) {

              const user_pass = passForm.querySelector('[name=user_pass]').value;
              pass = json[0].acf.pass;

              passCoded = btoa(user_pass); // Codifica en base64

              if( user_pass === pass ){
                window.location.href ="/quotes/"+ slug+"?p="+passCoded;
              }else{
                result.innerHTML = "😭 Ups... esa no es la contraseña.";
              }

            } else {
              console.log(response);
              // result.innerHTML = json.message;
            }

          }).catch(error => {

            console.log(error);
            result.innerHTML = "😭 Wrong password. Try again.";

          }).then(function () {

            // passForm.reset();
            // setTimeout(() => {
            //   result.style.display = "none";
            // }, 3000);

          });

      })

    }


}

export default sendPass