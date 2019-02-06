

$(document).ready(()=>{
    $('#posts').on('click', '.rows-comment', postJS.keydownComment); 


    // $('#posts').on('click', '.btn-like', function(){
    //     $.ajax({
    //         method : "GET",
    //         url : '/home/posts',
    //         success : function(response){
    //             console.log(response);
    //         },
    //         fail : function(response) {

    //         }
    //     });
    // }); 

});


var postJS = {
    keydownComment: function() {
        //
        $(this).keydown(function (e) {
            //
            if (e.which === 8 || e.which === 13) {
                debugger;
                var me = $(this);
                var rows = parseInt(me.attr('rows'));
                var lines;
                // on enter
                if (e.which === 13 && rows < 8)
                    me.attr('rows', rows + 1);

                // on backspace -- THIS IS THE PROBLEM
                if (e.which === 8 && rows !== 1) {
                    lines = $(this).val().split('\n')
                    if (lines[lines.length - 1].length == 0) {
                        me.attr('rows', rows - 1);
                    }
                }
            }
        });
    },
}

