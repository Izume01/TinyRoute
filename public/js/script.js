const shortenLink = document.getElementsByClassName('link-card');
const originalUrl = document.querySelector('.originalUrl');
const form = document.getElementById('shortenForm');

let shortUrl = ` `;

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = originalUrl.value;
    console.log(url);
    
    if (!url) {
        alert('Please enter a URL');
        return;
    }

    try {
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                originalUrl: url
            })
        });

        if (!response.ok) {
            throw new Error('Failed to shorten link');
        }

        const data = await response.json();

        shortUrl= `http://localhost:8000/api/${data.slug}`;
        console.log(shortUrl);
        const shortlinkTextBox = document.querySelector('.short-link');
        shortlinkTextBox.textContent = shortUrl;
    } catch (error) {
        console.log(error);
    }
})

const copyToClickBoard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

const copyBtn = document.querySelector('.link-card')
copyBtn.addEventListener('click', () => {
    copyToClickBoard(shortUrl);
})
