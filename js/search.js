$(function(){
    


        $("#find").click(function() {
          var value = $('#who').val();
                if(value != '')  
                {  
                     $.ajax({  
                          url:"search.php",  
                          type:"POST",  
                         data:{value:value},  
                          success:function(data)  
                          {  
                               $('#order').html(data).fadeIn(100);  
                               
                          }  
                     });  
           }
            else  
                {  
                     $('#who').attr({
            placeholder: 'write your tags and after add'
        });

                }  
        });


//����� �����
$('.who').bind("change keyup input click", function() {
    if(this.value.length >= 2){
        $.ajax({
            type: 'post',
            url: "searchin.php", //���� � �����������
            data: {'referal':this.value},
            response: 'text',
            success: function(data){
                $(".search_result").html(data).fadeIn(); //������� ��������� ������ � ������
           }
       })
    }
})
    
$(".search_result").hover(function(){
    $(".who").blur(); //������� ����� � input
})

$('html').click(function(){
        $('.search_result').hide();
    });
    
//��� ������ ���������� ������, ������ ������ � ������� ��������� ��������� � input
$(".search_result").on("click", "li", function(){
    s_user = $(this).text();
    $(".who").val(s_user); 
    $(".search_result").fadeOut();
})

})