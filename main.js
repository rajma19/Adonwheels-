document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("carForm");

  if (form) {
    const urlParams = new URLSearchParams(window.location.search);
    const editIndex = urlParams.get("edit");
    let editing = editIndex !== null;

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      alert("Please log in first.");
      window.location.href = "login.html";
      return;
    }

    if (editing) {
      const allCars = JSON.parse(localStorage.getItem("cars")) || [];
      const userCars = allCars.filter(car => car.ownerPhone === loggedInUser.phone);
      const car = userCars[editIndex];

      if (car) {
        form.owner.value = car.owner;
        form.model.value = car.model;
        form.regno.value = car.regno;
        form.kmPerDay.value = car.kmPerDay;
        form.city.value = car.city;
        form.pricePerKm.value = car.pricePerKm || '';
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const owner = form.owner.value;
      const model = form.model.value;
      const regno = form.regno.value;
      const kmPerDay = form.kmPerDay.value;
      const city = form.city.value;
      const pricePerKm = form.pricePerKm.value;
      const imageFile = form.querySelector('input[type="file"]').files[0];

      function saveData(base64Image = null) {
        const carData = {
          owner,
          model,
          regno,
          kmPerDay,
          city,
          pricePerKm,
          image: base64Image,
          ownerPhone: loggedInUser.phone
        };

        let allCars = JSON.parse(localStorage.getItem("cars")) || [];

        if (editing) {
          const userCars = allCars.filter(car => car.ownerPhone === loggedInUser.phone);
          const carToEdit = userCars[editIndex];
          const indexInAll = allCars.findIndex(
            car => car.ownerPhone === loggedInUser.phone &&
                   car.regno === carToEdit.regno
          );

          if (!base64Image) {
            carData.image = allCars[indexInAll].image;
          }

          allCars[indexInAll] = carData;
        } else {
          allCars.push(carData);
        }

        localStorage.setItem("cars", JSON.stringify(allCars));
        alert(editing ? "✅ Car Updated!" : "✅ Car Registered!");
        form.reset();
        window.location.href = "view-cars.html";
      }

      if (imageFile) {
        const reader = new FileReader();
        reader.onload = function () {
          saveData(reader.result);
        };
        reader.readAsDataURL(imageFile);
      } else {
        saveData();
      }
    });
  }
});