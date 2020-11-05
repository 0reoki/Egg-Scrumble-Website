/* For login form */

function LoginValidation()
    {
        let Email = document.getElementById("exampleInputLoginID").value ;
        let Password = document.getElementById("exampleInputPassword").value;  
        
        /* 
        
        DB commands here 
        
        */

        /*for testing purposes -- remove after final db*/
    if (Email == "default" && Password == "default")
        {
            alert("Log-In Successfully");
            window.location = "index.html";
        }
    else
        alert("Incorrect Credentials");

    }

/* For sign-up form */

function SignUpSubmit(mail)
    {
        let FirstName = document.getElementById("exampleInputFirstNameID").value;
        let LastName = document.getElementById("exampleInputLastNameID").value;
        let Email = document.getElementById("exampleInputEmail").value;
        let Password = document.getElementById("exampleInputPassword").value;
        let RePassword = document.getElementById("exampleInputPasswordRe").value;
        let valid;

        if (FirstName == "")
            document.getElementById("FirstNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
                else
                    document.getElementById("FirstNameRequired").innerHTML = null;
        if (LastName == "")
            document.getElementById("LastNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
                else
                    document.getElementById("LastNameRequired").innerHTML = null;
        if (Email == "")
            document.getElementById("EmailRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
                else
                    document.getElementById("EmailRequired").innerHTML = null;
        if (ValidateEmail()==false)
            document.getElementById("EmailRequired").innerHTML = "<span style='color: red;'>Not A Valid Email</span>";
        
        if (Password == "")
                document.getElementById("PasswordRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
                else
                    document.getElementById("PasswordRequired").innerHTML = null;
        if (Repassword != Password)
        document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>Password did not match</span>";
            /* 
        Restriction goes here
        */
      /*  if (FirstName == "" || LastName == "" || Email == "" || Password == "" || RePassword == "")
            alert("Fill up all area");*/
    }

    function ValidateEmail() 
    {
     if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(document.getElementById("exampleInputEmail").value))
        return true;
            else
             return false;
    }

    function ValidatePassword()
    {
        
    }
