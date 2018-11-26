var emojiButtonToggle = false;
$('.emoji-nav .emoji').click(function () {
    // $('.emoji-menu-button').html($(this).html());
    var navButtons = $('.emoji-nav .emoji').toArray();
    
    for (var i in navButtons) {
        // $('.emoji-menu').hide();
        $('.emoji-nav .emoji').removeClass('active');
    }
    var newButton = $(this).attr('id');
    changeMenu(newButton);
    
    $(this).addClass('active');
});

$('.emoji-menu-button').click(function () {
    emojiButtonToggle = !emojiButtonToggle;
    if(emojiButtonToggle) {
        $('.emoji-dialog').fadeIn({ duration: 100 });
    } else {
        $('.emoji-dialog').fadeOut({ duration: 100 });
    }
});

function changeMenu(button) {
    var emojiMenus = $(".emoji-menu [id*='menu']").toArray();
    var newButton = button.split('-')[0];
    for (var i in emojiMenus) {
        var newMenu = emojiMenus[i].id.split('-')[0];
        if (newMenu == newButton) {
            $('#' + newMenu + '-menu').show();
        } else {
            $('#' + newMenu + '-menu').hide();
        }
    }
}
function startup() {
    for (var i in activities.activity) {
        $('.emoji-menu #activities-menu').append($('<div class="emoji">').text(activities.activity[i].value));
    }

    for (var i in flags.flag) {
        $('.emoji-menu #flags-menu').append($('<div class="emoji">').text(flags.flag[i].value));
    }

    for (var i in foods.food) {
        $('.emoji-menu #foods-menu').append($('<div class="emoji">').text(foods.food[i].value));
    }

    for (var i in natures.nature) {
        $('.emoji-menu #natures-menu').append($('<div class="emoji">').text(natures.nature[i].value));
    }

    for (var i in objects.object) {
        $('.emoji-menu #objects-menu').append($('<div class="emoji">').text(objects.object[i].value));
    }

    for (var i in peoples.people) {
        $('.emoji-menu #peoples-menu').append($('<div class="emoji">').text(peoples.people[i].value));
    }

    for (var i in symbols.symbol) {
        $('.emoji-menu #symbols-menu').append($('<div class="emoji">').text(symbols.symbol[i].value));
    }

    for (var i in travels.travel) {
        $('.emoji-menu #travels-menu').append($('<div class="emoji">').text(travels.travel[i].value));
    }

    $('.emoji-menu .emoji').click(function () {
        $('#m').val($('#m').val() + $(this).html());
    });
    changeMenu('activities-menu');
}
startup();

