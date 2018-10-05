//boş dizi tanımlayıp son tıklanan grid butonunun ID sini alıyorum
var tempArr=[];
var openedGrid=0;
var trueSound = $("#true");
var falseSound = $("#false");
//Ust-Grid Oluşturuluyor
for(var i=0;i<25;i++){
    $('#ust_grid').append("<div id='ust_grid"+i+"'></div>");
    $('#ust_grid'+i).css({
        'width':'60px',
        'height':'60px',
        'background-color':'gray',
        'float':'left',
        'margin-left':'2px',
        'margin-top':'2px'
    });
    $('#ust_grid'+i).data('renk','black');
}
//Alt grid oluşturuluyor
for(var i=0;i<25;i++){
    $('#alt_grid').append("<button id='alt_gridz"+i+"' class='altGrid'></button>");
    $('#alt_gridz'+i).css({
        'width':'60px',
        'height':'60px',
        'background-color':'gray',
        'float':'left',
        'margin-left':'2px',
        'margin-top':'2px',
        'border':'none',
        'cursor':'pointer'
    });
}
//butonu başlangıçta disable yap
$('#geriAl').attr('disabled',true);

//Background Color renkleri dizi içine kaydediliyor
var bgColors=['red','green','pink','blue','yellow'];
//Rastgele 5 adet kutuya renkler aktarılıyor
//set their data('color','bgColors[i]') yourself

//5 adet renk rastegele secildi
var bgArr = [];
//5 adet renklerin rastgele yerleştirileceği kutu seçildi
var boxArr = [];
$(tekrarOlustur);
function tekrarOlustur(){
    while(boxArr.length < 5){
        var boxNumber = Math.floor(Math.random()*25) ;
        if(boxArr.indexOf(boxNumber) > -1) continue;
        boxArr[boxArr.length] = boxNumber;
    }
    while(bgArr.length < 5){
        var randomBgNumber = Math.floor(Math.random()*5) ;
        if(bgArr.indexOf(randomBgNumber) > -1) continue;
        bgArr[bgArr.length] = randomBgNumber;
    }
    //secilen kutu secilen renk ile eşleştiriliyor
    for(var k=0;k<5;k++){
        $('#ust_grid'+boxArr[k]).data('renk',bgColors[bgArr[k]]);  
    }
}
//Alt gridde hover ile katmanların renkleri değişiyor
$('.altGrid').hover(function(){
    $(this).css('opacity','0.5');
},function(){
    $(this).css('opacity','1');
});

$('.altGrid').on('click', function(){
    var altGridId=$(this).attr("id");
    tempArr.pop();
    tempArr.push(altGridId);
    //alt gridlerden tıklanan karenin opacitysini 50% düşür, disable ve rengini gri yap
    $(this).css('opacity','0.5');
    $(this).attr('disabled','disabled');
    //geri al butonunu aktif hale getir
    $('#geriAl').attr('disabled',false);
    var altGridNumber=altGridId.split('z');
    //ust_grid data rengini kontrol et
    if($('#ust_grid'+altGridNumber[1]).data('renk')=='black'){
        $('#ust_grid'+altGridNumber[1]).css('background-color','black');
        falseSound.trigger('play');
    }else{
        $('#ust_grid'+altGridNumber[1]).css('background-color',$('#ust_grid'+altGridNumber[1]).data('renk'));
        openedGrid+=1;
        trueSound.trigger('play');
        if(openedGrid==5){
            $('#geriAl').attr('disabled',true);
            //animate yapılıyor açılmayan kutular açılıyor
            for(var i=0;i<25;i++){
                $('#alt_gridz'+i).attr('disabled',true);              
                    if($('#ust_grid'+i).css('background-color')=='rgb(128, 128, 128)'){
                        $('#ust_grid'+i).delay(i*100).animate({
                                'background-color':'black'
                        });
                    }   
            }
        }
    }
});
//Geri Al butonuna tıklandığında buton disable olur ve son  değerler geri alınır
$('#geriAl').on('click', function(){
    $('#geriAl').attr('disabled',true);
    var altGridNumber=tempArr[0].split('z');
    //Geri alma işleminde kare renkli ise Opened Grid 1 azalt
    var myColor=$('#ust_grid'+altGridNumber[1]).css('background-color');
    var colorRgb=['rgb(255, 0, 0)','rgb(0, 0, 255)','rgb(0, 128, 0)','rgb(255, 192, 203)','rgb(255, 255, 0)'];
    if((jQuery.inArray( myColor, colorRgb ))>=0){
        openedGrid-=1;
    }
    $('#'+tempArr[0]).css({
        'opacity':'1'
    });
    $('#'+tempArr[0]).attr('disabled',false);
    $('#ust_grid'+altGridNumber[1]).css('background-color','gray');
});
//Reset Butonuna basılıyor..
$('#reset').on('click', function(){
    for(var l=0;l<25;l++){
        $('#ust_grid'+l).css('background-color','gray');
        $('#alt_gridz'+l).css('opacity','1');
        $('#alt_gridz'+l).attr('disabled',false);
        $('#ust_grid'+l).removeData('renk');
        $('#ust_grid'+l).text('');
        $('#ust_grid'+l).data('renk','black'); 
    }
    //Geri Al butonu Disable ediliyor..
    $('#geriAl').attr('disabled',true);
    //Opened Grid sıfırlanıyor..
    openedGrid=0;
    for(var m=0;m<5;m++){
        bgArr.splice($.inArray(bgArr[m], bgArr), 1); 
        boxArr.splice($.inArray(boxArr[m], boxArr), 1); 
        tempArr.splice($.inArray(tempArr[m], tempArr), 1); 
    }
    $(tekrarOlustur);
});

