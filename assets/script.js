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

  //   const formSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(nameValue, surnameValue, telValue);
  //   };

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
  const formData = new FormData();
  const date = new Date();

  const datePost = JSON.stringify({ datetime: date, referer: "" });

  console.log(datePost);
  console.log(visitor_uid);

  const postMethod = async (e) => {
    e.preventDefault();
    formData.append("fields[name_1]", `${nameValue} ${surnameValue}`);
    formData.append("fields[875069_1][451775]", `+998${telValue}`);
    formData.append("form_id", 899833);
    formData.append("hash", "9367fbb25908ffe1345ccdb61d5f3bac");
    formData.append("user_origin", datePost);
    formData.append("visitor_uid", visitor_uid);
    let bodyRequest = {
      "fields[name_1]": `${nameValue} ${surnameValue}`,
      "fields[875069_1][451775]": `+998${telValue}`,
      "form_id": 899833,
      "hash": "9367fbb25908ffe1345ccdb61d5f3bac",
      "visitor_uid": visitor_uid
    }
    await fetch("http://localhost:3000", {
      method: "POST",
      // body: formData,
      body: JSON.stringify(bodyRequest),
    });
  };

  //   form.addEventListener("click", postMethod);

  submit.addEventListener("click", postMethod);
});
