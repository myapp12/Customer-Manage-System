$(document).ready(function () {

    $('#text-content-status').keydown(function (e) {
        //alert('Ahihi đồ ngốc nè');
        //alert(e.key);
        var me = $(this);
        var rows = parseInt(me.attr('rows'));
        var lines;

        lines = $(this).val().split('\n')
        // on enter
        //debugger;

        if ((e.which === 13 && rows < 15) || (rows < 15 && lines[lines.length - 1].length > ((63 * rows) + rows - 1))) {
            me.attr('rows', rows + 1);
        }
        // on backspace -- THIS IS THE PROBLEM
        if (e.which === 8 && rows !== 1) {
            if (lines[lines.length - 1].length == 0) {
                me.attr('rows', rows - 1);
            }

        }
    });

    $('#text-content-edit-status').keydown(function (e) {
        //alert('Ahihi đồ ngốc nè');
        //alert(e.key);
        var me = $(this);
        var rows = parseInt(me.attr('rows'));
        var lines;

        lines = $(this).val().split('\n')
        // on enter
        //debugger;

        if ((e.which === 13 && rows < 15) || (rows < 15 && lines[lines.length - 1].length > ((63 * rows) + rows - 1))) {
            me.attr('rows', rows + 1);
        }
        // on backspace -- THIS IS THE PROBLEM
        if (e.which === 8 && rows !== 1) {
            if (lines[lines.length - 1].length == 0) {
                me.attr('rows', rows - 1);
            }

        }
    });

    $('#text-content-status').click(function () {
        $('#bot-content-status').addClass('show-btn-post-status');
    })
    $('#text-content-edit-status').click(function () {
        $('#bot-content-edit-status').addClass('show-btn-post-status');
    })
    



});