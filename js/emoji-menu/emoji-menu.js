var emojiButtonToggle = false;
var timer = null;
function changeActiveClass(selector) {
    $('.emoji-nav .emoji').removeClass('active');
    selector.addClass('active');
}
$('.emoji-nav .emoji').click(function () {
    // $('.emoji-menu-button').html($(this).html());
    var newButton = $(this).attr('id');
    changeMenu(newButton);
    changeActiveClass($(this));
});

function getActiveMenu() {
    return $('.active').attr('id');
}

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

$('#emoji-search').keyup(function () {
    clearTimeout(timer);
    timer = setTimeout(searchEmojis, 300)
});
function searchEmojis() {
    $('#search-menu').empty();
    changeMenu("search-menu")
    var searchValue = $('#emoji-search').val().toLowerCase().trim();
    for (var i in allEmojis) {
        var emojiKey = allEmojis[i].key.split('_').join(' ').trim();
        // console.log(emojiKey + ": " + searchValue);
        // console.log("Emoji index: " + emojiKey.indexOf(searchValue));
        // console.log("Word length: " + searchValue.length);
        if (emojiKey.includes(searchValue) > 0 && searchValue.length != 0) {
            $('.emoji-menu #search-menu').append($('<div class="emoji">').text(allEmojis[i].value));
            $('.emoji-menu .emoji').click(function () {
                $('.emoji-menu-button').html($(this).html());
            });
        } else if(searchValue.length == 0) {
            var activeMenu = getActiveMenu().split("-")[0] + "-menu";
            changeActiveClass($("#"+ getActiveMenu()));
            changeMenu(activeMenu);
        }
        // console.log(allEmojis[i].value);
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

var allEmojis = [];
function startup() {
    for (var i in activities.activity) {
        $('.emoji-menu #activities-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(activities.activity[i].key) +'">').text(activities.activity[i].value));
        allEmojis.push(activities.activity[i]);
    }

    for (var i in flags.flag) {
        $('.emoji-menu #flags-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(flags.flag[i].key) +'">').text(flags.flag[i].value));
        // allEmojis.push(flags.flag[i]);
    }

    for (var i in foods.food) {
        $('.emoji-menu #foods-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(foods.food[i].key) +'">').text(foods.food[i].value));
        allEmojis.push(foods.food[i]);
    }

    for (var i in natures.nature) {
        $('.emoji-menu #natures-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(natures.nature[i].key) +'">').text(natures.nature[i].value));
        allEmojis.push(natures.nature[i]);
    }

    for (var i in objects.object) {
        $('.emoji-menu #objects-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(objects.object[i].key) +'">').text(objects.object[i].value));
        allEmojis.push(objects.object[i]);
    }

    for (var i in peoples.people) {
        $('.emoji-menu #peoples-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(peoples.people[i].key) +'">').text(peoples.people[i].value));
        allEmojis.push(peoples.people[i]);
    }

    for (var i in symbols.symbol) {
        $('.emoji-menu #symbols-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(symbols.symbol[i].key) +'">').text(symbols.symbol[i].value));
        allEmojis.push(symbols.symbol[i]);
    }

    for (var i in travels.travel) {
        $('.emoji-menu #travels-menu').append($('<div class="emoji" title="' + underscoreToSpaceDelimiter(travels.travel[i].value) +'">').text(travels.travel[i].value));
        allEmojis.push(travels.travel[i]);
    }

    $('.emoji-menu .emoji').click(function () {
        $('#m').val($('#m').val() + $(this).html());
    });
    changeMenu('activities-menu');
}
startup();

