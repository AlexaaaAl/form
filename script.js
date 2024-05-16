document.addEventListener("DOMContentLoaded", function() {
    const phoneInput = document.getElementById("phone");

    // Добавляем обработчик события ввода на поле телефона
    phoneInput.addEventListener("input", function(event) {
        const input = event.target;
        const value = input.value.replace(/\D/g, ""); // Удаляем все символы, кроме цифр
        const formattedValue = formatPhone(value); // Форматируем номер телефона
        input.value = formattedValue; // Обновляем значение поля
    });

    // Функция для форматирования номера телефона
    function formatPhone(phone) {
        const cleaned = ('' + phone).replace(/\D/g, ''); // Удаляем все символы, кроме цифр
        const match = cleaned.match(/^(\d{1,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/); // Разбиваем номер на группы
        if (match) {
            return '+' + match[1] + (match[2] ? ' (' + match[2] : '') + (match[3] ? ') ' + match[3] : '') + (match[4] ? '-' + match[4] : '') + (match[5] ? '-' + match[5] : ''); // Форматируем номер
        }
        return phone; // Возвращаем оригинальное значение, если не удалось форматировать
    }
    const form = document.getElementById("myForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Предотвращаем отправку формы по умолчанию
        
        // Проверяем заполнены ли все поля формы
        if (!validateForm()) {
            message.innerHTML = "Пожалуйста, заполните все поля формы";
            return;
        }

        // Получаем данные формы
        const formData = new FormData(form);

        // Отправляем AJAX запрос
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "form.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    // Если запрос успешен
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        // Если успешно отправлено, скрываем форму и выводим сообщение
                        form.style.display = "none";
                        message.innerHTML = response.message;
                    } else {
                        // Если произошла ошибка, выводим сообщение об ошибке над формой
                        message.innerHTML = response.message;
                    }
                } else {
                    // Если произошла ошибка при запросе
                    message.innerHTML = "Произошла ошибка при отправке запроса";
                }
            }
        };

        // Преобразуем данные формы в строку для отправки
        const encodedData = new URLSearchParams(formData).toString();

        // Отправляем данные
        xhr.send(encodedData);
    });

    // Функция для проверки заполнения всех полей формы
    function validateForm() {
        const inputs = form.querySelectorAll("input");
        for (const input of inputs) {
            if (!input.value.trim()) {
                return false; // Если хотя бы одно поле не заполнено, возвращаем false
            }
        }
        return true; // Если все поля заполнены, возвращаем true
    }
});
