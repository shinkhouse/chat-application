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
    if (emojiButtonToggle) {
        $('.emoji-dialog').addClass('move-up');
    } else {
        $('.emoji-dialog').removeClass('move-up');
    }
});

$('.emoji-menu-button').hover(function () {
    $('.emoji-menu-button').html("😄");
});

$('.emoji-menu-button').mouseout(function () {
    $('.emoji-menu-button').html("🙂");
});

$('.emoji-menu-button').mousedown(function () {
    $('.emoji-menu-button').html("😉");
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

function underscoreToSpaceDelimiter(string) {
    var oldPhrase = string.split('_');
    var newPhraseArray = [];
    oldPhrase.forEach(function(word) {
        newPhraseArray.push(word.charAt(0).toUpperCase() + word.slice(1));
    });

    var phrase = newPhraseArray.join(' ');
    return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}
function startup() {
    for (var i in activities.activity) {
        $('.emoji-menu #activities-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(activities.activity[i].key) +'">').text(activities.activity[i].value));
    }

    for (var i in flags.flag) {
        $('.emoji-menu #flags-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(flags.flag[i].key) +'">').text(flags.flag[i].value));
    }

    for (var i in foods.food) {
        $('.emoji-menu #foods-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(foods.food[i].key) +'">').text(foods.food[i].value));
    }

    for (var i in natures.nature) {
        $('.emoji-menu #natures-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(natures.nature[i].key) +'">').text(natures.nature[i].value));
    }

    for (var i in objects.object) {
        $('.emoji-menu #objects-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(objects.object[i].key) +'">').text(objects.object[i].value));
    }

    for (var i in peoples.people) {
        $('.emoji-menu #peoples-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(peoples.people[i].key) +'">').text(peoples.people[i].value));
    }

    for (var i in symbols.symbol) {
        $('.emoji-menu #symbols-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(symbols.symbol[i].key) +'">').text(symbols.symbol[i].value));
    }

    for (var i in travels.travel) {
        $('.emoji-menu #travels-menu').append($('<div class="emoji" title="' + travels.travel[i].value +'">').text(travels.travel[i].value));
    }

    $('.emoji-menu .emoji').click(function () {
        $('#m').val($('#m').val() + $(this).html());
    });
    changeMenu('activities-menu');
}
startup();

