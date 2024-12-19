var itemList = {
    "sp001": {
        "name": "Kệ sách mini",
        "price": 299000,
        "photo": "./img/Decor/kesachmini.jpg"
    },
    "sp002": {
        "name": "Quạt thấp",
        "price": 250000,
        "photo": "./img/Electrical/Electrical1.jpg"
    },
    "sp003": {
        "name": "Cocoon-X",
        "price": 199000,
        "photo": "./img/Personal/cocoon.jpg"
    },
    "sp004": {
        "name": "Bình đun siêu tốc",
        "price": 199000,
        "photo": "./img/Kitchen/kitchen1.jpg"
    },
    "sp005": {
        "name": "Bột giặt Aba",
        "price": 49000,
        "photo": "./img/Clean/botgiat_aba.jpg"
    },
};

function addCart(code) {
    console.log(code);
    var usernum = code.charAt(code.length - 1);
    var number = parseInt(document.getElementById('usernum' + usernum).value);

    if (typeof localStorage[code] === "undefined") {
        if (number >= 100) {
            alert("Tối đa 100 sản phẩm");
            window.localStorage.setItem(code, 100);
        } else if (number == 0){
            alert("Số lượng lớn hơn 0");
            return false;
        }
        else {
            alert("Thêm sản phẩm thành công");
            window.localStorage.setItem(code, number);
        }
    } else {
        var current = parseInt(window.localStorage.getItem(code));
        if (number + current >= 100) {
            window.localStorage.setItem(code, 100);
        } else {
            window.localStorage.setItem(code, current + number);
        }
    }

}


function showCart() {
    var keys = Object.keys(localStorage)
    var tongthanhtien = 0,
        tongdonhang;
    for (let i = 0; i < keys.length; i++) {
        var key = keys[i],
            item = itemList[key],
            photo = item.photo,
            name = item.name,
            price = item.price,
            orderNumber = localStorage.getItem(key);

        var tbodyRef = document.getElementById('cart').getElementsByTagName('tbody')[0];
        var newRow = tbodyRef.insertRow();

        var x = newRow.insertCell();
        var img = document.createElement('img');
        img.src = photo;
        img.setAttribute('width', '150px')
        x.appendChild(img);

        var tenSP = newRow.insertCell();
        var ten = document.createTextNode(name);
        tenSP.appendChild(ten);

        var soluong = newRow.insertCell();
        var slValue = document.createTextNode(orderNumber);
        soluong.appendChild(slValue);

        var gia = newRow.insertCell();
        var giavalue = document.createTextNode(price);
        gia.appendChild(giavalue);

        var but = newRow.insertCell();
        var thea = document.createElement('a');
        thea.href = "#";
        var thei = document.createElement('i');
        thei.setAttribute("class", "fa-solid fa-trash")
        thea.appendChild(thei);
        var str = 'removeCart("' + key + '")';
        thea.setAttribute("onclick", str);
        but.appendChild(thea);

        var tong = price * orderNumber;
        var ttvalue = document.createTextNode(tong);

        tongthanhtien += tong;

    }
    var tongthanhtienrow = document.getElementById('bill_pre_tax_total')
    var tongttvalue = document.createTextNode(tongthanhtien);
    tongthanhtienrow.appendChild(tongttvalue);
}

function removeCart(code) {
    // console.log(window.localStorage[code]);
    if (typeof window.localStorage[code] !== "undefined") {
        window.localStorage.removeItem(code);
        document.getElementById("cart").getElementsByTagName('tbody')[0].innerHTML = "";
        location.reload();
        // showCart();
    }
}

//Đăng ký

function frmValidate() {
    var frm = document.forms["frm"];

    //Họ tên
    var hoten = frm.hoten;
    if (hoten.value.length > 50) {
        alert("Họ tên không rỗng và không vượt quá 50 ký tự!");
        hoten.focus();
        return false;
    }

    //SĐT
    var sdt = frm.sdt;
    if (sdt.value.length != 10) {
        alert("Số điện thoại phải đủ 10 ký tự!");
        sdt.focus();
        return false;
    }

    //email
    var email = frm.email;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        alert("Email không đúng định dạng!");
        email.focus();
        return false;
    }

    //password
    var pw = frm.pw;
    var pass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{5,20})");
    if (!pass.test(pw.value)) {
        alert("Mật khẩu phải bao gồm chữ HOA, thường, số và ký tự đặc biệt!");
        pw.focus();
        return false;
    }

    //Nhập lại password
    var pre_pw = frm.pre_pw;
    if (pre_pw.value != pw.value) {
        alert("Mật khẩu không trùng khớp!");
        pre_pw.focus();
        return false;
    }
    alert("Đăng ký thành công!");
    return true;
}


//Tài khoản đăng nhập

//Đăng nhập
function login() {
    var account = '{"khachhang":[{"name":"team5","username":"team5@gmail.com", "password":"Team5@"}]}';
    var obj = JSON.parse(account);

    var log = document.forms["frm1"];

    var username = log.username;
    var pw = log.pw;
    if ((username.value != obj.khachhang[0].username) || (pw.value != obj.khachhang[0].password)) {
        alert("Tài khoản hoặc mật khẩu không đúng!");
        return false;
    }
    alert("Đăng nhập thành công!");
    window.localStorage.setItem(obj.khachhang[0].username, obj.khachhang[0].name);
    return true;
}

//Show acc
function show() {
    if (localStorage.length != 0) {
        document.getElementById("acc").innerHTML = '<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-user"></i> ' + localStorage.getItem("team5@gmail.com") + '</a><ul class="dropdown-menu" aria-labelledby="navbarDropdown"><li><a class="dropdown-item" href="User.html">Thông tin</a></li><li><a class="dropdown-item" href="#" onclick="logout()">Đăng xuất</a></li></ul></li> '
            // document.getElementById("acc").innerHTML= '<a class="nav-link active" aria-current="page" href="DangNhap.html"><i class="fa-solid fa-user"></i>'+localStorage.getItem("team5@gmail.com") +'</a>';
    }
}

//Đăng xuất
function logout() {
    // alert("Bạn có chắc chắn muốn thoát không?");
    if (localStorage.length != 0) {
        window.localStorage.clear();
        alert("Đăng xuất thành công!");
        location.reload();
    }
}

//Mũi tên lên đầu trang

window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {

    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

document.getElementById('myBtn').addEventListener("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});