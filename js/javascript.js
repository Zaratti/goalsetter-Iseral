

function _(str) {
  return document.querySelector(str);
}


// the path we dont want just anyone to see
if(location.pathname == "/profile.html") {
// check if there is a token
const checkToken = !! localStorage.getItem("goaltoken");

    // if there's jo token, redirect the user to login
    if(!checkToken) {
    location.replace('/login.html');
    }

}

// For registration
regForm = _("#addPost");

if (regForm) {

  addPost.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = _("#name").value;
    const email = _("#email").value;
    const phone = _("#phone_number").value;
    const type = _("#accounttype").value;
    const pwd = _("#password").value;
    const cpwd = _("#confirm_password").value;

    // if(name == "" || email == "" || phone == "" || pwd == "" || cpwd == "") {

    //   _('#info').innerHTML = `Field cannot be Empty, please fill up!`;

    // }
  


    const userData = {
      name: name,
      email: email,
      phone_number: phone,
      account_type: type,
      password: pwd,
      password_confirmation: cpwd
    }

    const registerUrl = "https://goalsetterapi.herokuapp.com/api/register";

    axios.post(registerUrl, userData).then(function (response) {

      console.log(response.data);


    }).catch(function (err) {
      console.log(err.response);
      console.log(err.response.data.email[0])

      if (err.response.data.hasOwnProperty("name")) {
           let msg = err.response.data.name[0];
           _('#err_name').innerHTML = `${msg}`;
      }
      
      if (err.response.data.hasOwnProperty("email")) {
        let msg = err.response.data.email[0];
        _('#err_email').innerHTML = `${msg}`;
   }
   
   if (err.response.data.hasOwnProperty("phone_number")) {
    let msg = err.response.data.phone_number[0];
    _('#err_number').innerHTML = `${msg}`;
  }

  if (err.response.data.hasOwnProperty("password")) {
    let msg = err.response.data.password[0]
    _('#err_pwd').innerHTML = `${msg}`;
  }

    })

    


  })

}


// Login User
loginForm = _("#loginForm");

if (loginForm) {

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = _("#Email").value;
    const pwd = _("#password").value;

    const userData = {
      email: email,
      password: pwd
    }


    const loginUrl = "https://goalsetterapi.herokuapp.com/api/login";

    axios.post(loginUrl, userData).then(function (response) {

      console.log(response.data)

      const token = response.data.data.token

      localStorage.setItem('goaltoken', token);

      location.replace("dashboard.html")

    }).catch(function (err) {
      console.log(err.response)
    })


  })
}


// View Users Profile
profile = _("#profile");

if (profile) {

  const profileUrl = "https://goalsetterapi.herokuapp.com/api/profile";

  const token = localStorage.getItem("goaltoken");


  console.log(token)

  const options = {
    headers: {
      Authorization: token,
    }
  }

  console.log(_('#basicInfo').innerHTML)

  axios.get(profileUrl, options).then(function (response) {
    console.log(response.data.data.user);


    const user = response.data.data.user;

    localStorage.setItem('user', user)

    console.log(user.name)

    if(user) {
      _('#user_img').innerHTML = ``;
    }

    _('#bigName').innerHTML = `Name: ${user.name}`;
         _("#show_image").innerHTML = `
         <img src="http://res.cloudinary.com/getfiledata/image/upload/v1552380958/${user.user_image}">
         `;
        _("#user_details").innerHTML = `

        <tr>
          <td>NAME</td>
            <td>${user.name}</td>
          </tr>

          <tr>
            <td>EMAIL</td>
            <td>${user.email}</td>
          </tr>
          <tr>
            <td>NUMBER</td>
            <td>${user.phone_number}</td>
          </tr>
          <tr>
            <td>ACCOUNT TYPE</td>
            <td>${user.account_type} </td>
          </tr>

          <tr>
            <td>DATE CREATED</td>
            <td>${new Date(user.created_at).toLocaleDateString()}</td>
          </tr> 
  
        `;
  }).catch(function (err) {
   
  })
}



logoutForm = _("#logoutForm");

if (logoutForm) {

  logoutForm.addEventListener('submit', function (e) {
    e.preventDefault();

      localStorage.removeItem('goaltoken');

      location.replace("index.html")
    

  })
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

