var Weather = {
  today: function(location){
    var promise = $.Deferred();
    $.ajax ('/weather', {
      data: {q: location},
      success: function(result) {
        promise. (result.weather);
      },
      error: function(){
        var error = 'invalid location';
        promise.reject(error);
      }
    });
    return promise;
  }
}
