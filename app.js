const apiKey = 'your-api-key'; // You will replace this with your OpenAI API key
const generateDescriptionButton = document.getElementById('generate-description-button');
const descriptionOutput = document.getElementById('description-output');

generateDescriptionButton.addEventListener('click', async () => {
    const product = document.getElementById('product-input').value;
    
    if (!product) {
        alert('Please enter a product name');
        return;
    }

    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Bearer ${apiKey},
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: Write a product description for: ${product},
            max_tokens: 100,
        }),
    });
    
    const data = await response.json();
    descriptionOutput.innerText = data.choices[0].text.trim();
});
const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

productForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const productName = document.getElementById('product-name').value;
    const productDescription = document.getElementById('product-description').value;
    const productPrice = document.getElementById('product-price').value;

    const product = {
        name: productName,
        description: productDescription,
        price: productPrice,
    };

    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
});

function displayProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ₹${product.price}</p>
        `;
        productList.appendChild(productDiv);
    });
}

displayProducts();