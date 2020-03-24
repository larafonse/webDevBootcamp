// Check off Todo's by clicking
$("ul").on("click","li",function(){
    $(this).toggleClass("completed");
});

// Click on X to delete To-Do
$("ul").on("click","span", function(event){
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    })
    event.stopPropagation();
});
// Add new To-Do to list
$("input[type='text']").on("keypress", function(event){
    if(event.which === 13){
        var text = $(this).val();
        $(this).val("")
        $("ul").append(`<li><span><i class="far fa-trash-alt"></i></span> ${text}</li>`);
    }
});
$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});