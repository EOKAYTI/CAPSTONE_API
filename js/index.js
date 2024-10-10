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

// HIỂN THỊ SẢN PHẨM
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
                <img src=${image} alt="" />
            </div>
            <div class="product_content">
                <h6 id="tenSanPham">${name}</h6>
                <p class="product_price">${price} $</p>
                <a href="./../html/detail.html" onclick="getProductById(${id})">Xem chi tiết</a>
            </div>
        </div>
    </div>
    `;
  }
  document.getElementById("add").innerHTML = content;
}

// // SẢN PHẨM BẰNG ID
// function getProductById(id) {
//   let promise = axios({
//     // url : Request URLs
//     url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`,
//     // method : Phương thức (GET - POST - PUT - DELETE)
//     method: "GET",
//   });

//   // thành công .then(callback funtion) | thất bại .catch(callback funtion)
//   promise
//     .then((res) => {
//       console.log(res.data.content);
//       renderDataProductById(res.data.content);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
