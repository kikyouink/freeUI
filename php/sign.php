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
    
    $create = "create table if not exists user (
        id int(6) unsigned auto_increment primary key, 
        name varchar(30) not null,
        nickname varchar(30),
        password varchar(50) not null,
        reg_date timestamp
    )";

    if (mysqli_query($conn, $create)) {
        // echo "数据表 user 创建成功";
    } 
    // else {
    //     echo "创建数据表错误: " . mysqli_error($conn);
    // }
    @$name=$_POST['username'];
    @$words=$_POST['password'];
	//查询用户名是否存在
	$result = mysqli_query($conn,"select * from user where name = '$name'");
	$row = mysqli_fetch_array($result);
	if(mysqli_num_rows($result) > 0){
		echo '用户名已注册，请登录';
	}
	else{
		$insert = "insert into user (name, password)
	    VALUES ('$name', '$words')";
	
	    if (mysqli_query($conn, $insert)) {
	        echo "注册成功";
	    } else {
	        echo "Error: " . $insert . "<br>" . mysqli_error($conn);
	    }
	}

    mysqli_close($conn); 
?>