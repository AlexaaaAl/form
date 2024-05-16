<?php
// Проверяем, был ли отправлен POST запрос
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из POST запроса
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    // Проверка, было ли введено имя
    if (empty($name)) {
        echo json_encode(array("success" => false, "message" => "Пожалуйста, введите ваше имя"));
        exit;
    }

    // Валидация email на сервере
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(array("success" => false, "message" => "Некорректный email"));
        exit;
    }

    // Валидация телефона на сервере
    if (!preg_match("/^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$/", $phone)) {
        echo json_encode(array("success" => false, "message" => "Некорректный номер телефона"));
        exit;
    }

    // Подключаемся к базе данных
    $servername = "localhost";
    $username = "root";
    $password = "secret";
    $dbname = "formbd";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Проверяем соединение
    if ($conn->connect_error) {
        echo json_encode(array("success" => false, "message" => "Ошибка подключения: " . $conn->connect_error));
        exit;
    }

    // Проверяем, есть ли запись с таким email и телефоном
    $sql = "SELECT * FROM formTable WHERE email='$email' AND phone='$phone'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo json_encode(array("success" => false, "message" => "Заявка уже отправлена"));
    } else {
        // Вставляем данные в таблицу
        $sql = "INSERT INTO formTable (name, email, phone) VALUES ('$name', '$email', '$phone')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("success" => true, "message" => "Заявка успешно отправлена"));
        } else {
            echo json_encode(array("success" => false, "message" => "Ошибка: " . $sql . "<br>" . $conn->error));
        }
    }

    $conn->close();
}
?>
