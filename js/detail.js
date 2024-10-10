// LẤY DANH SÁCH SẢN PHẨM
function getProductById(id) {
  let promise = axios({
    // url : Request URLs
    url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
    // method : Phương thức (GET - POST - PUT - DELETE)
    method: "GET",
  });

  // thành công .then(callback funtion) | thất bại .catch(callback funtion)
  promise
    .then((res) => {
      console.log(res.data.content);
      renderDataProductById(res.data.content);
    })
    .catch((err) => {
      console.log(err);
    });
}

// getProductById(1);

// HIỂN THỊ SẢN PHẨM
function renderDataProductById(sanPham) {
  let content = "";
  const {
    id,
    name,
    alias,
    price,
    feature,
    description,
    size,
    shortDescription,
    quantity,
    image,
    categories,
    relatedProducts,
  } = sanPham;
  content += `
    <div class="col-6">
        <div class="product_item">
            <div class="product_img">
            <img src=${image} alt="" />
            </div>
        </div>
    </div>
    <div class="col-6">
            <div class="product_content">
              <h2>${name}</h2>
              <p>${shortDescription}</p>
              <p class="product_price">${price}</p>
              <p>Kích thước</p>
              <p>[40],[41],[42]</p>
              <div class="product_banner">
                <div class="row">
                  <div class="col-12">
                    <p>THÊM VÀO GIỎ HÀNG</p>
                  </div>
                  <div class="col-4">MUA NGAY</div>
                  <div class="col-4">TRẢ GÓP QUA THẺ</div>
                  <div class="col-4">MUA NGAY - TRẢ SAU</div>
                </div>
              </div>
            </div>
          </div>
    `;
  document.getElementById("add").innerHTML = content;
}
