// Hàm lấy tham số từ URL (Query String)
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Lấy ID từ URL
const productId = getQueryParam("id");

if (productId) {
  getProductById(productId);
}

function getProductById(id) {
  axios({
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    method: "GET",
  })
    .then((res) => {
      console.log(res.data.content);
      renderDataProductById(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}

// Hàm hiển thị chi tiết sản phẩm
function renderDataProductById(sanPham) {
  const {
    id,
    name,
    alias,
    price,
    feature,
    size,
    description,
    quantity,
    shortDescription,
    image,
    categories,
    relatedProducts,
  } = sanPham;

  // Chuyển đổi categories để lấy tên thương hiệu
  const brand =
    categories.length > 0 ? categories[0].category : "Chưa xác định";

  const content = `
  <div class="col-12 col-lg-6">
    <div class="product_item">
      <div class="product_img">
        <img src="${image}" alt="${name}" />
      </div>
    </div>
  </div>
  <div class="col-12 col-lg-6">
    <div class="product_content">
      <h2>${name}</h2>
      <p class="product_brand">Thương hiệu: ${brand}</p>
      <p>Mô tả: ${shortDescription}</p>
      <div class="sizes">
        <p>Kích thước</p>
        <div class="size_options">
          ${size.map((s) => `<span class="size_option">${s}</span>`).join("")}
        </div>
      </div>
      <p class="product_price">${price} $</p>
      <button class="btn_add_to_cart">Thêm vào giỏ hàng</button>
    </div>
  </div>
`;

  document.getElementById("product-detail").innerHTML = content;
}

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
