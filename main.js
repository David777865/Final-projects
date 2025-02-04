document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (firstName && email) {
        alert(`Your data has been accepted, ${firstName} ${lastName || ''}! We will contact you.`);
        this.reset();  
    } else {
        alert('Please fill in all required fields.');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const carDropdown = document.getElementById('carDropdown');
    const carImagesContainer = document.getElementById('carImages');
    const carYear = document.getElementById('carYear');
    const carMileage = document.getElementById('carMileage');
    const carPrice = document.getElementById('carPrice');

    let swiper; 

    fetch('./carsData.json')
        .then(response => response.json())
        .then(data => {
            populateDropdown(data);
            carDropdown.addEventListener('change', () => displayCarDetails(data));
        })
        .catch(error => console.error('Error loading car data:', error));

    function populateDropdown(cars) {
        cars.forEach(car => {
            const option = document.createElement('option');
            option.value = car.id;
            option.textContent = car.title;
            carDropdown.appendChild(option);
        });
    }

    function displayCarDetails(cars) {
        const selectedCar = cars.find(car => car.id == carDropdown.value);
        if (selectedCar) {
            carYear.textContent = selectedCar.year;
            carMileage.textContent = `${selectedCar.mileage}`;
            carPrice.textContent = `$${selectedCar.price}`;
    
            carImagesContainer.innerHTML = '';
    
            selectedCar.images.forEach(img => {
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');
                swiperSlide.innerHTML = `<img src="${img}" alt="${selectedCar.title}">`;
                carImagesContainer.appendChild(swiperSlide);
            });
    
            if (swiper) {
                swiper.update();
                swiper.slideTo(0); 
            } else {
                swiper = new Swiper('.swiper-container', {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    loop: true
                });
            }
        }
    }
    
});
