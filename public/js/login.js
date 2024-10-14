const LoginPass = document.getElementsByClassName('passwordLogin');
const LoginEmail = document.getElementsByClassName('emailAddressLogin');

const LoginSumbitbtn = document.querySelector('.LoginSubmit');

LoginSumbitbtn.addEventListener('click' , async (e)=> {
    e.preventDefault();
    const email = LoginEmail.value.trim();
    const password = LoginPass.value.trim();


    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const response = await fetch('/auth/login' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed'); // Throw an error for non-200 responses
        }

        const data = await response.json();
    } catch (error) {
        console.log(error);
    }
})
