document.getElementById("btnRegister").onclick = function (event) {
  event.preventDefault();

  // LẤY GIÁ TRỊ TỪ FORM NGƯỜI DÙNG
  function getValueForm() {
    // Tạo đối tượng để lưu dữ liệu form
    let nguoiDung = {};

    // Lấy tất cả các input trong form
    let arrField = document.querySelectorAll("#register input");

    // Duyệt qua từng input
    arrField.forEach((field) => {
      const { type, id, name, value, checked } = field;

      // Xử lý radio button: chỉ lấy giá trị của radio được checked
      if (type === "radio") {
        if (checked) {
          // Chuyển đổi giá trị của gender thành true/false
          nguoiDung[name] = value === "male" ? true : false;
        }
      } else {
        // Với các input thông thường (text, email, password, ...)
        nguoiDung[id] = value; // Lưu vào theo id
      }
    });

    console.log(nguoiDung); // Kiểm tra dữ liệu trong console
    return nguoiDung; // Trả về dữ liệu form
  }

  // ĐĂNG KÝ TÀI KHOẢN
  function register() {
    let nguoiDung = getValueForm();

    let promise = axios({
      // url : Request URLs
      url: "https://shop.cyberlearn.vn/api/Users/signup",
      // method : Phương thức (POST)
      method: "POST",
      data: nguoiDung, // Dữ liệu người dùng từ form
    });

    // Xử lý kết quả từ API
    promise
      .then((res) => {
        console.log(res.data.content);
        renderThongBao("Đăng ký thành công", "success");
      })
      .catch((err) => {
        console.log(err.response.data);
        renderThongBao(
          err.response.data.message || "Đăng ký thất bại",
          "danger"
        );
      });
  }

  register();

  // Hàm thông báo thành công | thất bại
  function renderThongBao(content, error) {
    // success | danger
    const bgError = error == "success" ? "green" : "red";

    Toastify({
      text: content,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true,
      style: {
        background: bgError,
      },
      onClick: function () {
        console.log("Tôi đã bấm vào thông báo");
      },
    }).showToast();
  }
};

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
