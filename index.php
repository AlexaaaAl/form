<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Form</title>
</head>
<body>
<div class="container">
<div id="message"></div>
    <form id="myForm" method="post" action="form.php">
        <input type="text" name="name" id="name">
        <input type="email" name="email" id="email" placeholder="Email">
        <input type="tel" name="phone" id="phone" placeholder="+_(___)___-__-__">
        <button type="submit">Отправить</button>
    </form>
</div>
    
    <script src="script.js"></script>

</body>
</html>