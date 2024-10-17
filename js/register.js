document.getElementById("btnRegister").onclick = function (event) {
  event.preventDefault();

  let nguoiDung = getValueForm();

  // ĐĂNG KÝ TÀI KHOẢN LÊN HỆ THỐNG
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

// LẤY GIÁ TRỊ TỪ FORM NGƯỜI DÙNG
function getValueForm() {
  // Tạo đối tượng để lưu dữ liệu form
  // let nguoiDung = {};
  let nguoiDung = new NguoiDung();

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

  // tạo một biến cờ hiệu để check trường hợp khi nào trả về đối tượng sinh viên
  let flag = true;

  for (let field of arrField) {
    // let value = field.value; // destructuring
    let { value, id } = field; // field = mã sinh viên ==>txtMaSV
    console.log(id);
    if (id == "gender1" || id == "gender2") {
      continue; // Bỏ qua vòng lặp này
    }
    nguoiDung[id] = value;
    // Truy cập tới thẻ cha gần nhất của input
    let theThongBao = field.parentElement.querySelector("span");
    console.log(theThongBao);

    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
    } else {
      // dữ liệu không bị rỗng
      // if (id == "txtPass" && !checkMinMaxValue(theThongBao, value, 6, 10)) {
      //   flag = false;
      // }
      // truy xuất tới các thuộc tính data-validation
      let dataValue = field.getAttribute("data-validation"); // undifinded | email | minmax
      let dataMin = field.getAttribute("data-min") * 1;
      let dataMax = field.getAttribute("data-max") * 1;
      if (dataValue == "email" && !checkEmailValue(theThongBao, value)) {
        flag = false;
      } else if (
        dataValue == "minMax" &&
        !checkMinMaxValue(theThongBao, value, dataMin, dataMax)
      ) {
        flag = false;
      }
    }
  }
  console.log(nguoiDung); // Kiểm tra dữ liệu trong console
  return flag ? nguoiDung : null;
}
