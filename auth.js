// ==========================================
// FOR THEM - AUTHENTICATION
// ==========================================

// VERCEL BACKEND
const API_URL = "https://forthem-backend.vercel.app";


// ==========================================
// SIGNUP
// ==========================================

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("signupMessage");


        // Validate
        if (!name || !email || !password) {

            message.textContent =
                "Please fill all fields.";

            return;
        }


        try {

            console.log(
                "📤 Signup request:",
                `${API_URL}/api/signup`
            );


            const response = await fetch(
                `${API_URL}/api/signup`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                }
            );


            const data =
                await response.json();


            console.log(
                "📥 Signup response:",
                data
            );


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Signup failed"
                );

            }


            if (data.success) {

                message.textContent =
                    "Account created successfully!";


                // Save temporary details
                localStorage.setItem(
                    "userName",
                    name
                );

                localStorage.setItem(
                    "userEmail",
                    email
                );


                // Go to login
                setTimeout(() => {

                    window.location.href =
                        "login.html";

                }, 1000);

            }

            else {

                message.textContent =
                    data.message ||
                    "Signup failed.";

            }


        }

        catch (error) {

            console.error(
                "❌ Signup error:",
                error
            );

            message.textContent =
                error.message ||
                "Cannot connect to server.";

        }

    });

}


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;

            const message =
                document.getElementById(
                    "loginMessage"
                );


            // Validate
            if (!email || !password) {

                message.textContent =
                    "Enter email and password.";

                return;
            }


            try {

                console.log(
                    "📤 Login request:",
                    `${API_URL}/api/login`
                );


                const response =
                    await fetch(
                        `${API_URL}/api/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );


                const data =
                    await response.json();


                console.log(
                    "📥 Login response:",
                    data
                );


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Login failed"
                    );

                }


                if (data.success) {

                    // ==================================
                    // SAVE LOGGED-IN USER
                    // ==================================

                    localStorage.setItem(
                        "userId",
                        data.user.id
                    );

                    localStorage.setItem(
                        "userName",
                        data.user.name
                    );

                    localStorage.setItem(
                        "userEmail",
                        data.user.email
                    );

                    localStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );


                    // IMPORTANT:
                    // nexus.html uses forthem_user
                    localStorage.setItem(
                        "forthem_user",
                        JSON.stringify({
                            id: data.user.id,
                            name: data.user.name,
                            email: data.user.email
                        })
                    );


                    message.textContent =
                        "Login successful!";


                    // ==================================
                    // GO TO NEXUS
                    // ==================================

                    setTimeout(() => {

                        window.location.href =
                            "nexus.html";

                    }, 700);

                }

                else {

                    message.textContent =
                        data.message ||
                        "Login failed.";

                }


            }

            catch (error) {

                console.error(
                    "❌ Login error:",
                    error
                );

                message.textContent =
                    error.message ||
                    "Cannot connect to server.";

            }

        }
    );

}
