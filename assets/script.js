window.addEventListener("load", () => {
  const firstname = window.document.querySelector("#firstname");
  const surname = window.document.querySelector("#surname");
  const telNumber = window.document.querySelector("#tel");
  const form = window.document.querySelector("#amoForm");
  const submit = window.document.querySelector(".form-btn");
  const inputs = window.document.querySelectorAll("input");
  const errMsg = window.document.querySelector(".err");

  let nameValue, surnameValue, telValue;

  firstname.addEventListener("input", (e) => {
    nameValue = e.target.value;
  });
  surname.addEventListener("input", (e) => {
    surnameValue = e.target.value;
  });
  telNumber.addEventListener("input", (e) => {
    telValue = e.target.value;
  });

  console.log(errMsg);

  const getCookie = async () => {
    let response = await fetch("https://gso.amocrm.ru/humans/visitor", {
      method: "GET",
      headers: {
        Accept: "text/javascript, text/html, application/xml, text/xml, */*",
      },
    });
    return await response.json();
  };
  let visitor_uid;
  getCookie().then((res) => {
    console.log(res.visitor_uid);
    visitor_uid = res.visitor_uid;
  });

  const postMethod = async (e) => {
    e.preventDefault();

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        errMsg.style.display = 'block';
      } else {
        submit.setAttribute('data-bs-toggle', 'modal')
      }
    }

    let bodyRequest = {
      "fields[name_1]": `${nameValue} ${surnameValue}`,
      "fields[875069_1][451775]": `+998${telValue}`,
      form_id: 899833,
      hash: "9367fbb25908ffe1345ccdb61d5f3bac",
      visitor_uid: visitor_uid,
    };
    await fetch("https://landing.marsit.uz/", {
      method: "POST",
      // body: formData,
      body: JSON.stringify(bodyRequest),
    }).then(() => {
      (firstname.value = ""), (surname.value = ""), (telNumber.value = "");
    });
  };

  //   form.addEventListener("click", postMethod);

  submit.addEventListener("click", postMethod);
});
