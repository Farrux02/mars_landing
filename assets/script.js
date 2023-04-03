window.addEventListener("load", () => {
  const firstname = window.document.querySelector("#firstname");
  const surname = window.document.querySelector("#surname");
  const telNumber = window.document.querySelector("#tel");
  const form = window.document.querySelector("#amoForm");
  const submit = window.document.querySelector(".form-btn");

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
  // const date = new Date();

  // const datePost = JSON.stringify({ datetime: date, referer: "" });

  const postMethod = async (e) => {
    e.preventDefault();
    let bodyRequest = {
      "fields[name_1]": `${nameValue} ${surnameValue}`,
      "fields[875069_1][451775]": `+998${telValue}`,
      form_id: 899833,
      hash: "9367fbb25908ffe1345ccdb61d5f3bac",
      visitor_uid: visitor_uid,
    };
    await fetch("http://localhost:3000/", {
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
