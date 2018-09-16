
var painter = function(save_to){
    var colorPurple = "#cb3594";
    var colorGreen = "#659b41";
    var colorYellow = "#ffcf33";
    var colorBrown = "#986928";

    var curColor = colorGreen;
    var clickColor = new Array();


    var clickX = new Array();
    var clickY = new Array();
    var clickDrag = new Array();
    var paint;

    canvas = document.getElementById('canvas_id');
    context = canvas.getContext("2d");
    function resize(){    
        $("#canvas_id").outerHeight($(window).height()-$("#canvas_id").offset().top- Math.abs($("#canvas_id").outerHeight(true) - $("#canvas_id").outerHeight()));
    }

    //resize();
    context.canvas.height = 250;

    $(window).on("resize", function(){                      
        //resize();
    });

    $('#submit_pic').on('click', function(){
        $.ajax({
            method: 'post',
            url: save_to,
            data: {
                canvas: canvas.toDataURL()
            },
            success: function(){

            }
        })
    });

    /* function resize(){    
        $("#canvas_id").outerHeight($(window).height()-$("#canvas_id").offset().top - Math.abs($("#canvas_id").outerHeight(true) - $("#canvas_id").outerHeight()));
    }
    resize();
    $(window).on("resize", function(){                      
        resize();
    }); */

    $('#clear_canvas').on('click', function(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
    });

    $('#canvas_id').mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
                
        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
        });

    $('#canvas_id').mousemove(function(e){
        if(paint){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas_id').mouseup(function(e){
        paint = false;
    });

    $('#canvas_id').mouseleave(function(e){
        paint = false;
    });

    function addClick(x, y, dragging)
    {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    function redraw(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        
        context.strokeStyle = curColor;
        context.lineJoin = "round";
        context.lineWidth = 5;
                    
        for(var i=0; i < clickX.length; i++) {		
            context.beginPath();
            if(clickDrag[i] && i){
                context.moveTo(clickX[i-1], clickY[i-1]);
            }else{
                context.moveTo(clickX[i]-1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.stroke();
        }
    }
}