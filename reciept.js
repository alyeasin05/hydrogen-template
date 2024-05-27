function addToCart() {
    // Get input values
    var name = document.getElementById('name').value;
    var quantity = document.getElementById('quantity').value;
    var perUnit = document.getElementById('perUnit').value;

    // Calculate amount
    var amount = parseFloat(quantity) * parseFloat(perUnit);

    // Create table row
    var newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${quantity}</td>
        <td>৳${perUnit}</td>
        <td>৳${amount.toFixed(2)}</td>
    `;

    // Add row to the table
    document.querySelector('.receipt table tbody').appendChild(newRow);

    // Update total quantity and price
    var totalQuantity = parseInt(document.getElementById('totalQuantity').innerText);
    var totalPrice = parseFloat(document.getElementById('totalPrice').innerText);

    totalQuantity += parseInt(quantity);
    totalPrice += amount;

    document.getElementById('totalQuantity').innerText = totalQuantity;
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}
