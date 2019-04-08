$(function() {
  $('#search-icon').on('click', function() {
    //$('#search-main').addClass('d-none');
    //$('#search-text').removeClass('d-none');
    $('#search-main').hide('slow');
    $('#search-text').show('slow');
  });
  $("#search-clear").click(function(){
    let searchText = document.getElementById('search-item').value;
    if (searchText === "") {
      //$('#search-text').addClass('d-none');
      $('#search-text').hide('slow');
      $("#search-results").hide('slow', function(){
        $("#search-results").remove();
      });
      //$("#search-results").remove();
      //$('#search-main').removeClass('d-none');
      $('#search-main').show('slow');
    } else {
       $("#search-item").val('');
       $("#search-item").focus();
    }
  });
  $('#submit').on('click', function() {
    //console.log("Hello");
    $('.container').addClass('extra-height');
    $("#search-results").remove();
    $('#wiki-container').append("<div class='col-12' id='search-results' style='display: none;'></div>");
    let searchText = document.getElementById('search-item').value;
    let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' +
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
      for (let i = 0; i < wikiData[1].length; i++) {
        let title = wikiData[1][i];
        let description = wikiData[2][i];
        if (description === "") {
          description = "Description Not Available";
        }
        let link = wikiData[3][i];
        $('#search-results').append("<a href='" + link +
          "' target='_blank'><div class='col-12 results'><h4>" + title +
          "</h4><p>" + description + "</p></div></a>");
      }
      $('#search-results').show('slow');
    })
  });

  $("#search-item").on('keyup', function (e) {
    if (e.keyCode === 13) {
      event.preventDefault();
      $('#submit').click();
    }
  });
})