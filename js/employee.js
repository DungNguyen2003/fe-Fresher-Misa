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

// for (let i = 0; i < btnFixInfo.length; i++) {
//   btnFixInfo[i].addEventListener("click", () => {
//     btnFixInfo[i].classList.toggle("btn--active");
//     var options = btnFixInfo[i].nextElementSibling;
//     options.style.display === "block"
//       ? (options.style.display = "none")
//       : (options.style.display = "block");
//   });
// }

function btnAddEmployee() {
  document.getElementById("formDetail").style.display = "block";
}
function onCloseFormDetail() {
  document.getElementById("formDetail").style.display = "none";
}

function onValidateFieldEmty() {
  try {
    let input = this;
    const value = input.value;
    if (!value) {
      input.classList.add("input--error");
      let elErrorContent = this.previousElementSibling;
      let elErrorInfoExist = this.nextElementSibling;
      if (elErrorInfoExist == null) {
        //create element error info
        let elError = document.createElement("div");
        elError.classList.add("input--error");
        elError.textContent = `${elErrorContent.firstChild.innerText} không được để trống`;
        elError.style.color = "#ff0000";
        elError.style.fontSize = "12px";
        //appendChild Element to parentElement
        this.parentElement.appendChild(elError);
      }
    } else {
      input.classList.remove("input--error");
      let elErrorExist = this.nextElementSibling;
      if (elErrorExist != null) {
        elErrorExist.remove();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
function createEvent() {
  document
    .getElementById("btnCancel")
    .addEventListener("click", onCloseFormDetail);
  document
    .getElementById("addEmployeeInfo")
    .addEventListener("click", btnAddEmployee);
  document.querySelectorAll(".input--required").forEach((element) => {
    element.addEventListener("blur", onValidateFieldEmty);
  });
}
window.onload = function () {
  new EmployeePage();
  createEvent();
};

class EmployeePage {
  ListEmployee;
  constructor() {
    this.intEvents();
    this.loadData();
  }
  /*
    Load data table
    Author: Dung Nguyen(24/02/2023)
  */
  loadData() {
    try {
      // Call api load data
      fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
        .then((res) => res.json())
        .then((data) => {
          this.ListEmployee = data;
          //Build table
          this.buildDataTable(data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  /*
    Build data table
    Author: Dung Nguyen(24/02/2023)
  */
  buildDataTable(data) {
    try {
      let table = document.getElementById("tbEmployeeList");
      let bodyTable = table.lastElementChild;
      //Duyet cac tieu de cua table, doc thong tin khai bao
      let thList = table.getElementsByTagName("th");

      // Duyet doi tuong trong ds du lieu lay ra thong tin
      for (const item of data) {
        let trElement = document.createElement("tr");
        for (const col of thList) {
          //Lay ra type
          const type = col.getAttribute("type");
          switch (type) {
            case "checkbox":
              let tdCheckbox = document.createElement("td");
              tdCheckbox.classList.add("check-column");
              let checkElement = document.createElement("input");
              checkElement.setAttribute("type", "checkbox");
              tdCheckbox.append(checkElement);
              trElement.append(tdCheckbox);
              break;
            case "feature":
              //Create td feature
              let tdFeature = document.createElement("td");
              tdFeature.classList.add("feature-column");
              let featureContainer = document.createElement("div");
              featureContainer.classList.add("feature-column__container");
              tdFeature.append(featureContainer);

              let featureText = document.createElement("span");
              featureText.textContent = "Sửa";

              let featureBtn = document.createElement("button");
              featureBtn.classList.add("btn-fix-info");
              featureBtn.addEventListener("click", () => {
                var options = featureBtn.nextElementSibling;
                options.style.display === "block"
                  ? (options.style.display = "none")
                  : (options.style.display = "block");
              });
              let btnIcon = document.createElement("img");
              btnIcon.setAttribute("src", "../assets/icons/Layer 2-2.svg");
              featureBtn.append(btnIcon);

              const featureOptions = ["Nhân bản", "Xóa", "Ngừng sử dụng"];

              let featureOption = document.createElement("div");
              featureOption.classList.add("feature-fix-options");

              featureOptions.map((item) => {
                let option = document.createElement("div");
                option.classList.add("fix-option");
                option.textContent = `${item}`;
                featureOption.append(option);
              });
              featureContainer.append(featureText);
              featureContainer.append(featureBtn);
              featureContainer.append(featureOption);

              trElement.append(tdFeature);
              break;

            default:
              //Lay ra modelName
              const modelName = col.getAttribute("model-name");
              const value = item[modelName];
              let tdElement = document.createElement("td");
              if (type == "date") {
                tdElement.textContent = this.formatDate(value);
                console.log(this.formatDate(value));
              } else {
                tdElement.textContent = value;
              }
              trElement.append(tdElement);
              break;
          }
        }
        bodyTable.append(trElement);
      }
    } catch (error) {
      console.log(error);
    }
  }
  formatDate(date) {
    try {
      date = new Date(date);
      // lấy ra ngày
      let dateValue = date.getDate();
      // lấy ra tháng
      let monthValue = date.getMonth() + 1;
      // lấy ra năm
      let yearValue = date.getFullYear();
      return `${dateValue}/${monthValue}/${yearValue}`;
    } catch (error) {
      console.log(error);
    }
  }
  intEvents() {}
}
