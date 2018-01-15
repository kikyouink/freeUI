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
   
    @$name=$_POST['username'];
    @$words=$_POST['password'];

    $result = mysqli_query($conn,"select * from user where name = '$name' ");
	$row = mysqli_fetch_array($result);
	if(mysqli_num_rows($result) == 0){
		echo '用户名不存在';
	}
	else{
		if($words==$row['password']) echo '登录成功';
		else echo '密码错误';
	}

    mysqli_close($conn); 
?>