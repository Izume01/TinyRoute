const RegistrationPassword = document.querySelector('#password');
const RegistrationEmail = document.querySelector('#email');
const RegistrationUsername = document.querySelector('#username');

const RegistrationSumbitbtn = document.querySelector('.Reg-btn');

RegistrationSumbitbtn.addEventListener('click' , async (e)=> {
    e.preventDefault();
    const username = RegistrationUsername.value.trim();
    const email = RegistrationEmail.value.trim();
    const password = RegistrationPassword.value.trim();

    if (!email || !password || !username) {
        alert('Please enter all details.');
        return;
    }

    try {

        const response = await fetch('http://localhost:8000/auth/register' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name : username,
                email,
                password,
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed'); 
        }
        const data = await response.json();
        localStorage.setItem('sessionId', data.sessionId);
        window.location.href = 'login.html';        
    } catch (error) {
        console.log(error);
    }
})
