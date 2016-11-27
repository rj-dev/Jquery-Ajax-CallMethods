var tour = {
    init: function () {
        $("#tour").on("click", "button", this.fetchPhotos);
    },
    fetchPhotos: function () {
        $.ajax('/photos.html', {
            data: { location: $("#tour").data('location') },
            success: function (response) {
                $('.photos').html(response);
            },
            error: function () {
                alert('There was a problem fetching the latest photos. Please try again.')
            },
            timeout: 3000,
            beforeSend: function () {
                $('#tour').addClass('is-fetching');
            },
            complete: function () {
                $('#tour').removeClass('is-fetching');
            }
        });
    }
}
$(document).ready(function () {
    tour.init();
});