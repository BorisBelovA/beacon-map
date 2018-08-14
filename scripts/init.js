$( document ).ready(function() {

    $(window).on('click',function () {
        //alert( event.clientX+':'+event.clientY)
    })

    $('g').on('click', function () {
        console.log(this.id);
    });

    $('line').on('click', function () {
        console.log(this.id);
    });

    $('.find-btn').on('click', function () {
        var startNode = $('.input-field [data-id = "Start"]').val();
        var endNode = $('.input-field [data-id = "End"]').val();
        if(startNode.indexOf('-way')===-1){
            startNode +='-way';
        }

        if(endNode.indexOf('-way')===-1){
            endNode +='-way';
        }

        var road = findPath(startNode,endNode)[0];
        var totalLength = findPath(startNode,endNode)[1];

        startNode = startNode.split('-')[0] + '-group';
        endNode = endNode.split('-')[0] + '-group';

        $('g').each(function(){

                var id = this.id;
                $('#'+id+'>*').removeClass('Start').removeClass('End');

        });
        $('line').each(function () {
            $(this).removeClass('road');
        });
        $('#'+startNode+'>*').addClass('Start');
        $('#'+endNode+'>*').addClass('End');

        for(let i = 0; i<(road.length)-1; i++){
            //$("#" + road[i] + "-" + road[i+1]).addClass('road');
            let way = road[i] + "-" + road[i+1];
            /*try{
                console.log($("#"+way).length);
            }catch(err){
                console.log('Error name: ' + err.name + " error message: " + err.message);
            }*/

            if(document.getElementById(way)){
                //console.log(document.getElementById(way).id);
                $('#'+way).addClass('road');
            }else{
                let tempArr = way.split('-');
                way = tempArr[2]+'-'+tempArr[3]+'-'+tempArr[0]+'-'+tempArr[1];
                $('#'+way).addClass('road');
            }
        }
    });

    $('[data-id="swipe-btn"]').on('click', function () {
        let text = $('.input-field [data-id = "End"]').val();
        $('.input-field [data-id = "End"]').val($('.input-field [data-id = "Start"]').val());
        $('.input-field [data-id = "Start"]').val(text);
    })
});