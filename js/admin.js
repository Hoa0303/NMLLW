var manufactureList = {
    "Đồ Trang Trí": [
        "Bàn", "Tủ", "Đèn"
    ],
    "Đồ Điện": [
        "Quạt", "Mấy sấy tóc"
    ],
    "Đồ Dùng Cá Nhân": [
        "Sữa tắm", "Kem đánh răng", "Dầu gội"
    ],
    "Đồ Dùng Nhà Bếp": [
        "Bình đun", "Bếp gas", "Nồi"
    ],
    "Chất Tẩy Rửa": [
        "Bột giặt", "Chổi", "Thuốc tẩy"
    ]
}

var productList = []

var manuafaturerTag = document.getElementById('manuafaturer_name')
for(var key in manufactureList) {
    manuafaturerTag.innerHTML += `<option value='${key}'>${key}</option>`
}

function changeManufaturer() {
    key = manuafaturerTag.value
    categoryList = manufactureList[key]
    console.log(categoryList)

    var categoruTag = document.getElementById('category_name')
    categoruTag.innerHTML = ''

    if(categoryList != null) {
        for (var i = 0; i < categoryList.length; i++) {
            categoruTag.innerHTML += `<option value='${categoryList[i]}'>${categoryList[i]}</option>`
        }
    }
}

function updateTotalPrice() {
    var price = document.getElementById('price').value
    var quantity = document.getElementById('quantity').value

    totalPrice = price * quantity

    document.getElementById('total_price').value = totalPrice
}

var count = 0
function addProduct() {
    var index = document.getElementById('index').value
    var productName = document.getElementById('product_name').value
    var manufactureName = document.getElementById('manuafaturer_name').value
    var categoryName = document.getElementById('category_name').value
    var price = document.getElementById('price').value
    var quantity = document.getElementById('quantity').value
    var totalPrice = document.getElementById('total_price').value

    var product = {
        'productName': productName,
        'manufactureName': manufactureName,
        'categoryName': categoryName,
        'price': price,
        'quantity': quantity,
        'totalPrice': totalPrice
    }

    if(index != '') {
        productList[index] = product
        showProduct()
        return;
    }

    productList.push(product)

    document.getElementById('result').innerHTML += `<tr>
                <td>${++count}</td>
                <td>${productName}</td>
                <td>${manufactureName}</td>
                <td>${categoryName}</td>
                <td>${price}</td>
                <td>${quantity}</td>
                <td>${totalPrice}</td>
                <td><button class="btn btn-warning" onclick="editProduct(${count - 1})">Edit</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${count - 1})">Delete</button></td>
            </tr>`
}

function deleteProduct(index) {
    console.log(index)
    productList.splice(index, 1)
    showProduct();
}

function showProduct() {
    document.getElementById('result').innerHTML = ''

    for (var i = 0; i < productList.length; i++) {
        document.getElementById('result').innerHTML += `<tr>
                <td>${i+1}</td>
                <td>${productList[i].productName}</td>
                <td>${productList[i].manufactureName}</td>
                <td>${productList[i].categoryName}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].quantity}</td>
                <td>${productList[i].totalPrice}</td>
                <td><button class="btn btn-warning" onclick="editProduct(${i})">Edit</button></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`
    }
}

function editProduct(index) {
    var product = productList[index]
    console.log(product)
    document.getElementById('index').value = index
    document.getElementById('product_name').value = product.productName
    document.getElementById('manuafaturer_name').value = product.manufactureName
    changeManufaturer()
    document.getElementById('category_name').value = product.categoryName
    document.getElementById('price').value = product.price
    document.getElementById('quantity').value = product.quantity
    document.getElementById('total_price').value = product.totalPrice
}