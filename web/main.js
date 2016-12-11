/**
 * Created by wangyue on 2016/12/3.
 */
var todoCount = 0 ;
var doneCount = 0;

var todoArray = new Array();
var doneArray = new Array();
$(function(){
        if($.cookie("todoList")!='null' && $.cookie("todoList")!='')
            todoArray =  $.cookie("todoList").split(',');
        if($.cookie("doneList")!='null' && $.cookie("doneList")!='')
            doneArray =  $.cookie("doneList").split(',');


        for(var i =0;i<todoArray.length;i++){
            var task = todoArray[i];
            var newItem = '<li class="list-group-item"><div class="checkbox"><label>'+
                '<input type="checkbox">'+task+'</label>'+
                '<a><span class="glyphicon glyphicon-trash" data-task="'+task+'"></span></a></div></li>';
            $("#todoList").append(newItem);
        }


        for(var i =0;i<doneArray.length;i++){
            var task = doneArray[i];
            var newItem = '<li class="list-group-item"><div class="checkbox"><label>'+
                '<input type="checkbox">'+task+'</label>'+
                '<a><span class="glyphicon glyphicon-trash" data-task="'+task+'"></span></a></div></li>';
            $("#doneList").append(newItem);
        }

        calListItemCount();

        $("#todoCount").text(todoCount);
        $("#doneCount").text(doneCount);
        $("#taskItem").bind("keypress",function(event){
            if(event.keyCode == "13"){
                var task = $(this).val();
                createNewTask(task);
            }

        });
        $("#todoList").on("click","input[type='checkbox']",function(){
            var isChecked = $(this).prop('checked');
            if(isChecked){
                $("#doneList").append($(this).parent().parent().parent());
            }
            calListItemCount();

            var task = $(this).parent().text();
            todoArray.splice($.inArray(task,todoArray),1);
            doneArray.push(task);

            saveCookie();
        });

        $("#doneList").on("click","input[type='checkbox']",function(){
            var isChecked = $(this).prop('checked');
            if(isChecked){
                $("#todoList").append($(this).parent().parent().parent());
            }
            calListItemCount();

            var task = $(this).parent().text();
            doneArray.splice($.inArray(task,doneArray),1);
            todoArray.push(task);

            saveCookie();
        });


        $("#doneList").on("click","span",function(){

            doneArray.splice($.inArray($(this).data("task").toString(),doneArray),1);
            saveCookie();
            $(this).parent().parent().parent().remove();
            calListItemCount();
        });

        $("#todoList").on("click","span",function(){
            todoArray.splice($.inArray($(this).data("task").toString(),todoArray),1);
            saveCookie();
            $(this).parent().parent().parent().remove();
            calListItemCount();
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

function clearCookie(){
    $.cookie('todoList', null);
    $.cookie('doneList', null);
    location.reload();
}

function createNewTask(task){

    var newItem = '<li class="list-group-item"><div class="checkbox"><label>'+
        '<input type="checkbox">'+task+'</label>'+
        '<a><span class="glyphicon glyphicon-trash" data-task="'+task+'"></span></a></div></li>';
    $("#todoList").append(newItem);
    $("#taskItem").val("");

    calListItemCount();

    todoArray.push(task);
    saveCookie();
}

