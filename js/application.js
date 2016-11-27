//exemplo de chamada ajax
function Tour(el) {
    var tour = this;
    this.el = el;
    this.fetchPhotos = function () {
        $.ajax('/photos.html', {
            data: { location: tour.el.data('location') },
            context: tour,
            success: function (response) {
                this.el.find('.photos').html(response).fadeIn();
            },
            error: function () {
                this.el.find('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
            },
            timeout: 3000,
            beforeSend: function () {
                this.el.addClass('is-fetching');
            },
            complete: function () {
                this.el.removeClass('is-fetching');
            }
        });
    }
    this.el.on('click', 'button', this.fetchPhotos);
}
$(document).ready(function () {
    var paris = new Tour($('#paris'));
});

//exemplo de uso so each do jquery
$('button').on('click', function () {
    $.ajax('/cities/deals', {
        contentType: 'application/json',
        dataType: 'json',
        success: function (result) {
            $.each(result, function (index, dealItem) {
                var dealElement = $('.deal-' + index);
                dealElement.find('.name').html(dealItem.name);
                dealElement.find('.price').html(dealItem.price);
            });
        }
    });
});

//exemplo de uso do getJSON + map do jquery
$('.update-available-flights').on('click', function () {
    $.getJSON('/flights/late', function (result) {
        var flightElements = $.map(result, function (flightItem, index) {
            var flightEl = $('<li>' + flightItem.flightNumber + '-' + flightItem.time + '</li>');
            return flightEl;
        });
        $('.flight-times').html(flightElements)
    });
});

//exemplo de uso de metodos do jquery
$(document).ready(function () {
    // Get Weather
    $('button').on('click.weather', function () {
        var results = $(this).closest('li').find('.results');
        results.append('<p>Weather: 74&deg;</p>');
        $(this).off('click.weather');
    });

    // Show Photos
    $('button').on('click.photos', function () {
        var tour = $(this).closest('li');
        var results = tour.find('.results');
        results.append('<p><img src="/assets/photos/' + tour.data('loc') + '.jpg" /></p>');
        $(this).off('click.photos');
    });
});

//exemplo de criação e consumo de plugin com jquery
$.fn.photofy = function (options) {
    this.each(function () {
        var show = function (e) {
            e.preventDefault();
            settings.tour
                    .addClass('is-showing-photofy')
                    .find('.photos')
                    .find('li:gt(' + (settings.count - 1) + ')')
                    .hide();
        }
        var settings = $.extend({
            count: 3,
            tour: $(this)
        }, options);
        settings.tour.on('click.photofy', '.see-photos', show);
        settings.tour.on('show.photofy', show);
    });
}

$(document).ready(function () {
    $('.tour').photofy({ count: 1 });

    $('.show-photos').on('click', function (e) {
        e.preventDefault();
        $('.tour').trigger('show.photofy');
    });
});


//exemplo do uso de promise do jquery - vide arquivo vacation.js
$(document).ready(function() {
  $('button').on('click', function() {
 var location = $('.loc').text();
 var todayPromise = Weather.today(location);
 todayPromise.done(function(result) {
 $('.weather').text(result);
 }).fail(function(error) {
   console.log(error);
 });
});
