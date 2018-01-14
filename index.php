<?php
    header('Access-Control-Allow-Origin:*');  
    header('Access-Control-Allow-Methods:POST');  
    header('Access-Control-Allow-Headers:x-requested-with,content-type');  

    $servername = "localhost:3306";
    $username = "root";
    $password = "123456";
    $dbname = "freeui";
     // 创建连接
    $conn = mysqli_connect($servername, $username, $password,$dbname);

    // 检测连接
    if (!$conn) {
        die("连接失败: " . mysqli_connect_error());
    }

    // 使用 sql 创建数据表
    $create = "CREATE TABLE user (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
        name VARCHAR(30) NOT NULL,
        nickname VARCHAR(30),
        password VARCHAR(50) NOT NULL,
        reg_date TIMESTAMP
    )";

    if (mysqli_query($conn, $create)) {
        echo "数据表 user 创建成功";
    } else {
        echo "创建数据表错误: " . mysqli_error($conn);
    }
    @$name=$_POST['username'];
    @$words=$_POST['password'];

    $insert = "INSERT INTO user (name, password)
    VALUES ('$name', '$words')";

    if (mysqli_query($conn, $insert)) {
        echo "新记录插入成功";
    } else {
        echo "Error: " . $insert . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn); 
?>