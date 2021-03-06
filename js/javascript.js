var $ = jQuery.noConflict();

$(document).ready(function() {
	// В dataTransfer помещаются изображения которые перетащили в область div
$(":file").filestyle();

$('#addtags').click(function (e){
	 if($('#tagsadd').val() == 0){
	 	$('#tagsadd').attr({
	 		placeholder: 'write your tags and after add'
	 	});
	 }
	 else{
	var m = $.trim($("#tags").val());
	e.preventDefault();
        var o=$.trim($('#tagsadd').val());
        var z =m + o;
        $("#tags").val(z+"#");
        $('#tagsinput')[0].reset();
    }
    });

$('#delete').click(function (event){
	event.preventDefault();
	$('#tagsdelete')[0].reset();
    });


$(":file").filestyle();


	jQuery.event.props.push('dataTransfer');
	
	// Максимальное количество загружаемых изображений за одни раз
	var maxFiles = 1;
	

	// Оповещение по умолчанию
	var errMessage = 0;
	
	// Кнопка выбора файлов
	var defaultUploadBtn = $('#uploadbtn');
	
	// Массив для всех изображений
	var dataArray = [];
	
	// Область информер о загруженных изображениях - скрыта
	$('#uploaded-files').hide();
	
	// Метод при падении файла в зону загрузки
	$('#drop-files').on('drop', function(e) {	
		// Передаем в files все полученные изображения
		var files = e.dataTransfer.files;
		// Проверяем на максимальное количество файлов
		if (files.length <= maxFiles) {
			// Передаем массив с файлами в функцию загрузки на предпросмотр
			loadInView(files);
		} else {
			alert('Вы не можете загружать больше '+maxFiles+' изображений!'); 
			files.length = 0; return;
		}
	});
	
	// При нажатии на кнопку выбора файлов
	defaultUploadBtn.on('change', function() {
   		// Заполняем массив выбранными изображениями
   		var files = $(this)[0].files;
   		// Проверяем на максимальное количество файлов
		if (files.length <= maxFiles) {
			// Передаем массив с файлами в функцию загрузки на предпросмотр
			loadInView(files);
			// Очищаем инпут файл путем сброса формы
            $('#frm').each(function(){
	        	    this.reset();
			});
		} else {
			alert('Вы не можете загружать больше '+maxFiles+' изображений!'); 
			files.length = 0;
		}
	});
	function validator() {
    return $("#namemedia,#description,#tags").filter(function() {
        return $.trim(this.value).length == 0;
    }).attr("placeholder", "text here").length == 0;
}


// $('#description').keyup(function(){
// 	if(validator()){
// 		
// 	}
// 	else{

// 	}
// });




	// Функция загрузки изображений на предросмотр
	function loadInView(files) {
	$('#uploaded-holder').show();


		
		
		// Для каждого файла
		$.each(files, function(index, file) {
						
			// Несколько оповещений при попытке загрузить не изображение
			if (!files[index].type.match('image.*')) {
				
				if(errMessage == 0) {
					$('#drop-files p').html('Hey! only images!');
					++errMessage
				}
				else if(errMessage == 1) {
					$('#drop-files p').html('STOP! only images!');
					++errMessage
				}
				else if(errMessage == 2) {
					$('#drop-files p').html("You dont can read? Only Image!");
					++errMessage
				}
				else if(errMessage == 3) {
					$('#drop-files p').html("Ok! Choose repeat");
					errMessage = 0;
				}
				return false;
			}
			
			// Проверяем количество загружаемых элементов
			if((dataArray.length+files.length) <= maxFiles ) {
				var form = $("#namemedia").val();
				$('#upload-button').css({'display' : 'block'});
			} 
			else { alert('You not can load more than '+maxFiles+' img!'); return; }
			
			// Создаем новый экземпляра FileReader
			var fileReader = new FileReader();
				// Инициируем функцию FileReader
				fileReader.onload = (function(file) {
					
					return function(e) {
						// Помещаем URI изображения в массив
						dataArray.push({name : file.name, value : this.result});
						addImage((dataArray.length-1));
					}; 
						
				})(files[index]);
			// Производим чтение картинки по URI
			fileReader.readAsDataURL(file);
		});
		return false;
	}
		
	// Процедура добавления эскизов на страницу
	function addImage(ind) {
		// Если индекс отрицательный значит выводим весь массив изображений
		if (ind < 0 ) { 
		start = 0; end = dataArray.length; 
		} else {
		// иначе только определенное изображение 
		start = ind; end = ind+1; } 
		// Оповещения о загруженных файлах
		if(dataArray.length == 0) {
			// Если пустой массив скрываем кнопки и всю область
			$('#upload-button').hide();
			$('#uploaded-holder').hide();
		} else if (dataArray.length == 1) {
			$('#upload-button span').html(" Сhoose 1 file");
		} else {
			$('#upload-button span').html(dataArray.length+" файлов были выбраны");
		}
		// Цикл для каждого элемента массива
		for (i = start; i < end; i++) {
			// размещаем загруженные изображения
			if($('#dropped-files > .image').length <= maxFiles) { 
				$('#dropped-files').append('<div id="img-'+i+'" class="image" style="background: url('+dataArray[i].value+'); background-size: cover;    background-position: center; "> <a href="#" id="drop-'+i+'" class="drop-button">Delete Images</a></div>'); 
			}
		}
		return false;
	}
	
	// Функция удаления всех изображений
	function restartFiles() {
	
		// Установим бар загрузки в значение по умолчанию
		$('#loading-bar .loading-color').css({'width' : '0%'});
		$('#loading').css({'display' : 'none'});
		$('#loading-content').html(' ');
		
		// Удаляем все изображения на странице и скрываем кнопки
		$('#upload-button').hide();
		$('#dropped-files > .image').remove();
		$('#uploaded-holder').hide();
	
		// Очищаем массив
		dataArray.length = 0;
		
		return false;
	}
	
	// Удаление только выбранного изображения 
	$("#dropped-files").on("click","a[id^='drop']", function() {
		// получаем название id
 		var elid = $(this).attr('id');
		// создаем массив для разделенных строк
		var temp = new Array();
		// делим строку id на 2 части
		temp = elid.split('-');
		// получаем значение после тире тоесть индекс изображения в массиве
		dataArray.splice(temp[1],1);
		// Удаляем старые эскизы
		$('#dropped-files > .image').remove();
		// Обновляем эскизи в соответсвии с обновленным массивом
		addImage(-1);		
	});
	
	// Удалить все изображения кнопка 
	$('#dropped-files #upload-button .delete').click(restartFiles);
	
	// Загрузка изображений на сервер
	$('#upload-button .upload').click(function(e) {
		
		
		e.preventDefault();
		if(validator()){
var Name = $('#namemedia').val();
var tags = $('#tags').val();
var descripton = $('#description').val();


		// Показываем прогресс бар
		$("#loading").show();
		// переменные для работы прогресс бара
		var totalPercent = 100 / dataArray.length;
		var x = 0;
		$('#loading-content').html('Загружен '+dataArray[0].name);
		// Для каждого файла

		$.each(dataArray, function(index, file) {	
			// загружаем страницу и передаем значения, используя HTTP POST запрос 
					$.ajax({
  url: 'upload.php',
  type: "POST",
  data: {data:dataArray[index], Name:Name, tags:tags, descripton:descripton},
  beforeSend : function(){
 $('#tagsinput')[0].reset();
    $('#tagsdelete')[0].reset();
    $('#info')[0].reset();
	 $('#desc')[0].reset();
  var fileName = dataArray.name;
				++x;
				
				// Изменение бара загрузки
				$('#loading-bar .loading-color').css({'width' : totalPercent*(x)+'%'});
				// Если загрузка закончилась
				if(totalPercent*(x) == 100) {
					// Загрузка завершена
					$('#loading-content').html('Loaded success!');
					
					// Вызываем функцию удаления всех изображений после задержки 1 секунда
					setTimeout(restartFiles, 1000);
				// если еще продолжается загрузка	
				} else if(totalPercent*(x) < 100) {
					// Какой файл загружается
					$('#loading-content').html('Loaded '+fileName);
				}
			},
				
   success: function(data){
   	var fileName = dataArray.name;
   	var dataSplit = data.split(':');
				if(dataSplit[1] == 'загружен успешно') {
					$('#ok').html(data);
					setTimeout(function() {window.location.reload();}, 1000);
								
				} else {
					$('#ok').html(data);
				}
			}
});
		});
	}

	else{cosole.log('required');}
		// Показываем список загруженных файлов
		return false;
	});
	
	// Простые стили для области перетаскивания
	$('#drop-files').on('dragenter', function() {
		$(this).css({'box-shadow' : 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', 'border' : '4px dashed #bb2b2b'});
		return false;
	});
	
	$('#drop-files').on('drop', function() {
		$(this).css({'box-shadow' : 'none', 'border' : '4px dashed rgba(0,0,0,0.2)'});
		return false;
	});
});