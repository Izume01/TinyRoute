    const LoginPass = document.querySelector('.passwordLogin');
    const LoginEmail = document.querySelector('.emailAddressLogin');

    const LoginSumbitbtn = document.querySelector('.LoginSubmit');

    LoginSumbitbtn.addEventListener('click' , async (e)=> {
        e.preventDefault();
        const email = LoginEmail.value;
        const password = LoginPass.value;
        
        const existingSessionId = localStorage.getItem('sessionId');

        console.log(email, password);
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/auth/login' ,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    sessionIds : [existingSessionId]
                })
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed'); // Throw an error for non-200 responses
                return;
            }

            const data = await response.json();
            localStorage.setItem('sessionId', data.sessionId);
            console.log('Redirecting to index.html...');
            
            window.location.href = 'index.html';
            
            
        } catch (error) {
            console.log(error);
        }
    })
