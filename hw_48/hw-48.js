// HW 48. Виведення зображень
// У папці images є зображення 1.jpg, 2.jpg, 3.jpg, 4.jpg, 5 .jpg, 6.jpg, 7.jpg, 8.jpg, 9.jpg Вивести зображення з цієї папки, отримане випадковим чином (Math.random)

const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg'];
const randomImageIndex = Math.floor(Math.random() * images.length);

const imgRandomFile = images[randomImageIndex];

const img = document.createElement('img');
img.src = 'images/' + imgRandomFile;
img.alt = imgRandomFile.split('.')[0];

document.body.append(img);