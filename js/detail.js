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
  const { name, price, shortDescription, image } = sanPham;
  const content = `
    <div class="col-6">
        <div class="product_item">
            <div class="product_img">
                <img src="${image}" alt="${name}" />
            </div>
        </div>
    </div>
    <div class="col-6">
        <div class="product_content">
            <h2>${name}</h2>
            <p>${shortDescription}</p>
            <p class="product_price">${price} $</p>
            <button>Thêm vào giỏ hàng</button>
        </div>
    </div>
  `;
  document.getElementById("product-detail").innerHTML = content;
}
