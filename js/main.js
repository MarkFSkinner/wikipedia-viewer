$(function() {
  $('#search-icon').on('click', function() {
    $('#search-main').addClass('d-none');
    $('#search-text').removeClass('d-none');
  });
  $("#search-clear").click(function(){
    var searchText = document.getElementById('search-item').value;
    if (searchText === "") {
      $('#search-text').addClass('d-none');
      $("#search-results").remove();
      $('#search-main').removeClass('d-none');
    } else {
       $("#search-item").val('');
    }
});
  $('#submit').on('click', function() {
    //console.log("Hello");
    $('.container').addClass('extra-height');
    $("#search-results").remove();
    $('#wiki-container').append("<div class='col-12' id='search-results'></div>");
    var searchText = document.getElementById('search-item').value;
    var searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' +
    searchText + '&callback=?';
    /*$.ajax({
      type:"GET",
      url: searchUrl,
      async:false,
      dataType:"JSON",
      success:function(data){
        console.log(data);
      },
      error:function(errorMessage) {
        alert("Error");
      }
    })*/
    $.getJSON(searchUrl, function(wikiData) {
      //console.log("inside");
      for (var i = 0; i < wikiData[1].length; i++) {
        var title = wikiData[1][i];
        var description = wikiData[2][i];
        if (description === "") {
          description = "Description Not Available";
        }
        var link = wikiData[3][i];
        $('#search-results').append("<a href='" + link +
          "' target='_blank'><div class='col-12 results'><h4>" + title +
          "</h4><p>" + description + "</p></div></a>");
      }
    })
  });
})