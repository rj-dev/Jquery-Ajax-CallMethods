var Photo = {
  getPhoto: function(location){
    var promise = $.Deferred();
    $.ajax('/vacation/photos', {
      data: {q: location},
      success: function(result){
        promise.resolve(result.url);
      }
    });
    return promise;
  }
}
