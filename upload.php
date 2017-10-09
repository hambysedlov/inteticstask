
<?php require_once("connection.php"); ?>
<?php
// Создаем подключение к серверу
// Все загруженные файлы помещаются в эту папку
$uploaddir = 'imgload/';

// Вытаскиваем необходимые данные


$data = $_POST['data'];
$Name = $_POST['Name'];
$tags = $_POST['tags'];
$description = $_POST['descripton'];
$name=$data['name'];
$file = $data['value'];
$tagsnew = explode("#", $tags);
// Получаем расширение файла
$getMime = explode('.', $name);
$mime = end($getMime);

// Выделим данные
$data = explode(',', $file);
// Декодируем данные, закодированные алгоритмом MIME base64
$encodedData = str_replace(' ','+',$data[1]);
$decodedData = base64_decode($encodedData);

// Вы можете использовать данное имя файла, или создать произвольное имя.
// Мы будем создавать произвольное имя!
$randomName = substr_replace(sha1(microtime(true)), '', 12).'.'.$mime;

// Создаем изображение на сервере
if(file_put_contents($uploaddir.$randomName, $decodedData)) {
	// Записываем данные изображения в БД
	mysqli_query ($con,"INSERT INTO images (name,catalog,ser_name,description) VALUES ('$Name','$uploaddir','$randomName', '$description')");
	$idlastimage = mysqli_insert_id($con);
	for ($i=0; $i <= count($tagsnew)-2; $i++) { 
		$res = mysqli_query($con,"SELECT * FROM tags WHERE name_tags =  '".$tagsnew[$i]."'");
		$count = mysqli_num_rows($res); 
		if($count>0){
			$result = mysqli_query($con,"SELECT * FROM tags WHERE name_tags =  '".$tagsnew[$i]."'");
			$row = mysqli_fetch_array($result);
		 	$idlaststags[] = $row['ID'];
		}	
		else{
		mysqli_query ($con,"INSERT INTO tags (name_tags,view) VALUES ('$tagsnew[$i]','0')");
		$idlaststags[] = mysqli_insert_id($con);
		}
	}
for ($i=0; $i <=count($idlaststags)-1; $i++) {
 mysqli_query ($con,"INSERT INTO tags_image (id_tags,id_image) VALUES ('$idlaststags[$i]','$idlastimage')");
}
	
	echo $Name.":загружен успешно";

//$last_id = mysqli_insert_id($conn);
}
else {
	// Показать сообщение об ошибке, если что-то пойдет не так.
	echo "Что-то пошло не так. Убедитесь, что файл не поврежден!";
}
?>