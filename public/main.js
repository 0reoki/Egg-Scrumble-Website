/* For login form */





//hover event to showed carted items
let cart = document.getElementById(cart);

cart.addEventListener("mouseenter", function(event){
   
    setTimeout(function() {
      event.target.style.color = "";
    }, 500);
  }, false);
//WIP not yet prio


async function LoginValidation() {
    // get the values
    let email = document.getElementById("exampleInputLoginID").value;
    let password = document.getElementById("exampleInputPassword").value;
    // clear error message
    document.getElementById("error").innerHTML = null;

    try {
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
            if (data.errors.email)
                document.getElementById("error").innerHTML = `<span style='color: red;'> ${data.errors.email}</span>`;
            else if (data.errors.password)
                document.getElementById("error").innerHTML = `<span style='color: red;'> ${data.errors.password}</span>`;
            else
                document.getElementById("error").innerHTML = `<span style='color: red;'>incorrect email or password</span>`;
        }
        if (data.user) {
            console.log(data.user.user_type);
            if(data.user_type === "Administrator"){
                location.assign('/admin');
            }
            else if(data.user_type === "Standard User"){
                location.assign('/');
            }      
        }
    } catch (err) {
        console.log(err);
    }


}

/* For sign-up form */
async function SignUpSubmit() {
    let first_name = document.getElementById("exampleInputFirstNameID").value;
    let last_name = document.getElementById("exampleInputLastNameID").value;
    let email = document.getElementById("exampleInputEmail").value;
    let password = document.getElementById("exampleInputPassword").value;
    let re_password = document.getElementById("exampleInputPasswordRe").value;
    let firstnameValid = true,
        lastnameValid = true,
        emailValid = true,
        passwordValid = true,
        repasswordValid = true;

    // clear error messages
    document.getElementById("FirstNameRequired").innerHTML = null;
    document.getElementById("LastNameRequired").innerHTML = null;
    document.getElementById("EmailRequired").innerHTML = null;
    document.getElementById("PasswordRequired").innerHTML = null;
    document.getElementById("RePasswordRequired").innerHTML = null;

    // Check for simple errors before fetch 
    if (first_name == "") {
        firstnameValid = false;
        document.getElementById("FirstNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        firstnameValid = true;
        document.getElementById("FirstNameRequired").innerHTML = null;
    }
    if (last_name == "") {
        lastnameValid = false;
        document.getElementById("LastNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        lastnameValid = true;
        document.getElementById("LastNameRequired").innerHTML = null;
    }
    if (email == "") {
        emailValid = false;
        document.getElementById("EmailRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        emailValid = true;
        document.getElementById("EmailRequired").innerHTML = null;
    }
    if (password == "") {
        passwordValid = false;
        document.getElementById("PasswordRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        passwordValid = true;
        document.getElementById("PasswordRequired").innerHTML = null;
    }
    if (re_password == "") {
        repasswordValid = false;
        document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        repasswordValid = true;
        document.getElementById("RePasswordRequired").innerHTML = null;
    }
    if (re_password != password) {
        repasswordValid = false;
        document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>Password did not match</span>";
    } else {
        repasswordValid = true;
        document.getElementById("RePasswordRequired").innerHTML = null;
    }

    if (firstnameValid && lastnameValid && emailValid && passwordValid && repasswordValid) {
        try {
            const res = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password, first_name, last_name }),
                headers: { 'Content-Type': 'application/json' }
            });


            const data = await res.json();
            console.log(data);

            // Set error messages
            if (data.errors) {
                if (first_name == "")
                    document.getElementById("FirstNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
                if (last_name == "")
                    document.getElementById("LastNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
                document.getElementById("EmailRequired").innerHTML = `<span style='color: red;'> ${data.errors.email} </span>`;
                document.getElementById("PasswordRequired").innerHTML = `<span style='color: red;'> ${data.errors.password} </span>`;
                if (re_password != password)
                    document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>Password did not match</span>";
            }

            if (data.user)
                location.assign('/');
        } catch (err) {
            console.log(err);
        }
    }
}

async function PasswordReset() {

    let email = document.getElementById("exampleInputLoginID").value;
    let emailValid = false;
    var Remail = email;

    document.getElementById("error").innerHTML = null;
    //Display email format specific errors
    if (email == "") {
        document.getElementById("error").innerHTML = `<span style='color: red;'>Enter A Valid Email</span>`;
        emailValid = false;
    } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        emailValid = true;
    else
        document.getElementById("error").innerHTML = `<span style='color: red;'>Enter A Valid Email</span>`;

    if (emailValid)
    //pass the email to check if it exist in the db
        try {
        const res = await fetch('/forgotpass', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(res);
        if (res.status == 400)
        //email not in db
            document.getElementById("error").innerHTML = `<span style='color: red;'>No such email exist</span>`;
        else {
            //email is in db and has been sent a code
            alert("Code sent to " + Remail);
            location.replace ('/forgotpasscode' + '?' + 'email=' + Remail);

        }
    } catch (err) {
        console.log(err);
    }

}



function ProcessDisplaysFPC() {
    let parameters = location.search.substring(1).split("&");
    let temp = parameters[0].split("=");
    let receivedemail = unescape(temp[1]);
    // alert(receivedemail);
    document.getElementById("display").innerHTML = `${receivedemail}`;
}

async function ConfirmCode() {


    let parameters = location.search.substring(1).split("&");
    let temp = parameters[0].split("=");
    const receivedemail = unescape(temp[1]);
    //alert(receivedemail);
    const inputCode = document.getElementById("verificationCodeID").value;


    // sends email and input code to the controller for verification 
    try {
        const res = await fetch('/forgotpasscode', {
            method: 'POST',
            body: JSON.stringify({ email: receivedemail, code: inputCode }),
            headers: { 'Content-Type': 'application/json' }
        });
       
        if (res.status == 400)
            alert("Wrong Code");
        else {
            alert("Code Match");
         
            location.replace ('/enterpassword?email='+receivedemail+'&code='+inputCode) ;
            


        }
    } catch (err) {
        console.log(err);
    }
}

async function ResendCode()
{
    let url_string = window.location.href;
    let url = new URL(url_string);
    const email = url.searchParams.get("email");

    try {
        const res = await fetch('/forgotpass', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(res);
        if (res.status == 400)
        
            alert("error found : email is not exist");
        else {
            
            alert("code resent");
           

        }
    } catch (err) {
        console.log(err);
    }

}

async function ConfirmResetPassword() {
    let url_string = window.location.href;
    let url = new URL(url_string);
    const receivedemail = url.searchParams.get("email");
    const inputCode = url.searchParams.get("code");
    
    const newpass =  document.getElementById('verificationCodeID').value;
    let ReNewPass = document.getElementById('verificationCodeID2').value;

    if (newpass != ReNewPass){
                    document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>Password did not match</span>";
    }
    else if(newpass == " " || ReNewPass == "" ){
        document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>Please complete the fields</span>";
    }
        else{
    try {
      
        const res = await fetch('/enterpassword', {
            method: 'POST',
            body: JSON.stringify({ email: receivedemail, code: inputCode , newpass: newpass}),
            headers: { 'Content-Type': 'application/json' }
        });
       
        if (res.status == 200)
            {
            alert("Password Changed");
            location.replace ('/login') ;
            }
        else {
            alert("Password not changed due to error");
         
            
            


        }
    } catch (err) {
        console.log(err);
    }
     }
}


async function SaveSearch_RedirectSearch()
{
   const search = document.getElementById("searchBox").value; 
   if (search!="")
   {
    try {
      
        const res = await fetch('/search', {
            method: 'POST',
            body: JSON.stringify({ search }),
            headers: { 'Content-Type': 'application/json' }
        });
       
        if (res.status == 200)
           {console.log("Searched");
           console.log("Good Job " + search);
           location.href =  "/?s=" + search;
        }
        else {
            

        }
    } catch (err) {
        console.log(err);
    }
    
   }
   
}
//preloads the book for the user
async function LoadContent()
{

}
//handles the redirection for recommendated books
async function RecommendedRedirect(num)
{
    
}

async function LoadChosenGenre(genre)
{
    console.log((genre))
    try {
      
        const res = await fetch('/viewbooks', {
            method: 'POST',
            body: JSON.stringify({ genre }),
            headers: { 'Content-Type': 'application/json' }
        });
       
        if (res.status == 200)
           {
              // console.log(res.data);
               location.assign(res.url);
            }
        else {
           

        }
    } catch (err) {
        console.log(err);
    }
}