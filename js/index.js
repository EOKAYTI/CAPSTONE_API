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
        <div class="product_item">
            <div class="product_img">
            <a href="./../html/detail.html?id=${id}"><img src=${image} alt="${name}" /></a>
            </div>
            <div class="product_content">
                <a href="./../html/detail.html?id=${id}">
                  <h6>${name}</h6>
                </a>
                <p class="product_price">${price} $</p>
            </div>
        </div>
    </div>
    `;
  }
  document.getElementById("add").innerHTML = content;
}
