// LẤY DANH SÁCH SẢN PHẨM
function getProduct() {
  let promise = axios({
    // url : Request URLs
    url: "https://shop.cyberlearn.vn/api/Product",
    // method : Phương thức (GET - POST - PUT - DELETE)
    method: "GET",
  });

  // thành công .then(callback funtion) | thất bại .catch(callback funtion)
  promise
    .then((res) => {
      console.log(res.data.content);
      renderDataProduct(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}

getProduct();

// HIỂN THỊ DANH SÁCH SẢN PHẨM
function renderDataProduct(arr) {
  let content = "";
  for (let sanPham of arr) {
    const {
      id,
      name,
      alias,
      price,
      description,
      size,
      shortDescription,
      quantity,
      deleted,
      categories,
      relatedProducts,
      feature,
      image,
    } = sanPham;
    content += `
    <div class="col-3">
        <div class="product_item animate__animated animate__zoomInUp">
            <div class="product_img">
                <a href="./../html/detail.html?id=${id}"><img src=${image} alt="${name}" /></a>
            </div>
            <div class="product_content">
                <a href="./../html/detail.html?id=${id}">${name}
                </a>
                <p>${shortDescription}</p>
                <p class="product_price">${price} $</p>
            </div>
        </div>
    </div>
    `;
  }
  document.getElementById("add").innerHTML = content;
}

// Xử lý class ACTIVE
// Lấy tất cả các thẻ <a> trong menu
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

// Duyệt qua từng thẻ <a>
navLinks.forEach((link) => {
  // Bắt sự kiện click cho từng thẻ <a>
  link.addEventListener("click", function (event) {
    // Xóa lớp active của tất cả các thẻ <a> khác
    navLinks.forEach((link) => link.classList.remove("active"));

    // Thêm lớp active vào thẻ <a> vừa được click
    this.classList.add("active");
  });
});
