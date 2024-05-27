
let listCart = [];
function checkCart(){
        var cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('listCart='));
        if(cookieValue){
            listCart = JSON.parse(cookieValue.split('=')[1]);
        }
}
checkCart();
addCartToHTML();
function addCartToHTML(){
    // clear data default
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';

    let totalQuantityHTML = document.querySelector('.totalQuantity');
    let totalPriceHTML = document.querySelector('.totalPrice');
    let totalQuantity = 0;
    let totalPrice = 0;
    // if has product in Cart
    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                    `<img src="${product.image}">
                    <div class="info">
                        <div class="name">${product.name}</div>
                        <div class="price">৳${product.price}/1 product</div>
                    </div>
                    <div class="quantity">${product.quantity}</div>
                    <div class="returnPrice">৳${product.price * product.quantity}</div>`;
                listCartHTML.appendChild(newCart);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity;
    totalPriceHTML.innerText = '৳' + totalPrice;
}
// Define memoContent globally
var memoContent = '';

document.getElementById('checkoutButton').addEventListener('click', function() {
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var eventDate = document.getElementById('eventDate').value; // Retrieve the date of the event
    var products = document.querySelectorAll('.item');
    var totalQuantity = 0;
    var totalPrice = 0;
    var productListHTML = '';

    products.forEach(function(product) {
        var productName = product.querySelector('.name').textContent;
        var quantity = parseInt(product.querySelector('.quantity').textContent);
        var priceString = product.querySelector('.price').textContent;
        var unitPrice = parseFloat(priceString.substring(1, priceString.indexOf('/')));
        var amount = unitPrice * quantity;

        totalQuantity += quantity;
        totalPrice += amount;

        productListHTML += `
            <tr>
                <td>${productName}</td>
                <td>${quantity}</td>
                <td>${unitPrice.toFixed(2)}৳</td>
                <td>${amount.toFixed(2)}৳</td>
            </tr>
        `;
    });

    // Create the cash memo content
    var memoContent = `
        <html>
        <head>
            <title>Cash Memo</title>
            <link rel="stylesheet" href="recide.css">
        </head>
        <body>
        <div class="container">
        <div class="cash-memo">
        <div class="logo-container">
            <img src="images/logo.png" alt="Logo" class="logo">
            <span class="logo-name">  Yeasin Sound & Light ♦ Sumon Decoretor </span>
         </div>
        <p class="shop-info">Address: Nandipara Bridge, Ward No. 74, Khilgaon, Madartek, Dhaka-1219 </p>
        <p class="shop-contact" >Mobile: +01752000451, 01919550637, 01942939339 </p> 
        <h2 class="subtitle">Cash Memo</h2>
        <div class="customer-info">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Date of event:</strong> ${eventDate}</p> <!-- Display the date of the event -->
        </div>
                
                
                <div class="product-table">
                    <table>
                        <thead>
                            <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Per Unit</th>
                            <th>Price</th> 
                            </tr>
                        </thead>
                        <tbody>
                            ${productListHTML}
                        </tbody>
                    </table>
                </div>
                
                <div class="total-info">
                    <p class="total-quantity"><strong>Total Quantity:</strong> ${totalQuantity}</p>
                    <p class="total-amount"><strong>Total Amount:</strong> ${totalPrice.toFixed(2)}৳</p>
                </div>
                <p class="thanks">Thanks for being with us!</p>
            </div>
        </div>
        </body>
        </html>
    `;

    // Open a new window to display the cash memo
    var memoWindow = window.open('', '_blank');
    memoWindow.document.write(memoContent);
    memoWindow.document.close();
     // Create and append the print button dynamically
     var printButton = document.createElement('button');
     printButton.id = 'printButton';
     printButton.textContent = 'Print';
     printButton.addEventListener('click', function() {
         memoWindow.print(); // Print the cash memo when the print button is clicked
     });
     memoWindow.document.body.appendChild(printButton);
});

