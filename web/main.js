/**
 * Created by wangyue on 2016/12/3.
 */
var todoCount = 0 ;
var doneCount = 0;

var todoArray = new Array();
var doneArray = new Array();
$(function(){
        if($.cookie("todoList"))
            todoArray =  $.cookie("todoList").split(',');
        if($.cookie("doneList"))
            doneArray =  $.cookie("doneList").split(',');


        for(var i =0;i<todoArray.length;i++){
            var task = todoArray[i];
            var newItem = '<li class="list-group-item"><div class="checkbox"><label>'+
                '<input type="checkbox">'+task+'</label>'+
                '<span class="glyphicon glyphicon-trash"></span></div></li>';
            $("#todoList").append(newItem);
        }


        for(var i =0;i<doneArray.length;i++){
            var task = doneArray[i];
            var newItem = '<li class="list-group-item"><div class="checkbox"><label>'+
                '<input type="checkbox">'+task+'</label>'+
                '<span class="glyphicon glyphicon-trash"></span></div></li>';
            $("#doneList").append(newItem);
        }

        calListItemCount();

        $("#todoCount").text(todoCount);
        $("#doneCount").text(doneCount);
        $("#taskItem").bind("keypress",function(event){
            if(event.keyCode == "13"){
                var task = $(this).val();
                var newItem = '<li class="list-group-item"><div class="checkbox"><label>'+
                    '<input type="checkbox">'+task+'</label>'+
                    '<span class="glyphicon glyphicon-trash"></span></div></li>';
                $("#todoList").append(newItem);
                $(this).val("");

                calListItemCount();

                todoArray.push(task);
                saveCookie();
            }

        });
        $("#todoList").on("click","li",function(){
            var isChecked = $(this).find("input[type='checkbox']").prop('checked');
            if(isChecked){
                $("#doneList").append($(this));
            }
            calListItemCount();

            var task = $(this).find("label").text();
            todoArray.splice($.inArray(task,todoArray),1);
            doneArray.push(task);

            saveCookie();
        });

    }
);

function calListItemCount(){
    todoCount = $("#todoList li").length;
    $("#todoCount").text(todoCount);
    doneCount = $("#doneList li").length;
    $("#doneCount").text(doneCount);
}

function saveCookie(){
    $.cookie('todoList', todoArray, { expires: 7 });
    $.cookie('doneList', doneArray, { expires: 7 });
}