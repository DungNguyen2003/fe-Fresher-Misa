const btnFixInfo = document.querySelectorAll(".btn-fix-info");
// btnFixInfo.addEventListener("click", btnFixInfoOnClick);
// btnFixInfo.forEach((e) => {
//   e.addEventListener("click", () => {
//     var options = e.nextElementSibling;
//     options.style.display === "block"
//       ? (options.style.display = "none")
//       : (options.style.display = "block");
//   });
// });

for (let i = 0; i < btnFixInfo.length; i++) {
  btnFixInfo[i].addEventListener("click", () => {
    btnFixInfo[i].classList.toggle("btn--active");
    var options = btnFixInfo[i].nextElementSibling;
    options.style.display === "block"
      ? (options.style.display = "none")
      : (options.style.display = "block");
  });
}

document
  .getElementById("btnCancel")
  .addEventListener("click", onCloseFormDetail);
document
  .getElementById("addEmployeeInfo")
  .addEventListener("click", btnAddOnClick);
function btnAddOnClick() {
  document.getElementById("formDetail").style.display = "block";
}
function onCloseFormDetail() {
  document.getElementById("formDetail").style.display = "none";
}

document.querySelectorAll(".input--required").forEach((element) => {
  element.addEventListener("blur", onValidateFieldEmty);
});

function onValidateFieldEmty() {
  try {
    //lay ra value trong input
    let input = this;
    // let elErrorInfo = this.nextElementSibling;
    const value = input.value;
    //kiem tra value
    if (!value) {
      console.log("duwx lieu trong");

      input.classList.add("input--error");
      //hien thi thong tin loi
      //1. lay ra thong tin loi
      //   elErrorInfo.style.display = "block";
      //them hien thi thong tin loi
      //kiem tra xem co element co tbao loi chua
      let elErrorInfoExist = this.nextElementSibling;
      if (elErrorInfoExist == null) {
        //tao element thong tin loi

        let elError = document.createElement("div");
        elError.classList.add("input--error");
        elError.textContent = "Không được để trống";
        elError.style.color = "#ff0000";
        elError.style.fontSize = "12px";
        //elememt cha cua input vaf append
        this.parentElement.appendChild(elError);
      }
    } else {
      console.log("ok");
      input.classList.remove("input--error");
      let elErrorExist = this.nextElementSibling;
      if (elErrorExist != null) {
        elErrorExist.remove();
      }
      //   elErrorInfo.style.display = "none";
    }
    //neu value trong hien tbao
  } catch (error) {
    console.log(error);
  }
}
