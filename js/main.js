function displaySearchField() {
  $('#search-icon').on('click', function() {
    $('#search-main').hide('slow');
    $('#search-text').show('slow');
  });
}

function clearSearchField() {
  $('#search-clear').click(function(){
    let searchText = document.getElementById('search-item').value;
    if (searchText === '') {
      $('#search-text').hide('slow');
      $('#search-results').hide('slow', function(){
        $('#search-results').remove();
      });
      $('#search-main').show('slow');
    } else {
       $('#search-item').val('');
       $('#search-item').focus();
    }
  });
}

function submitEntry() {
  $('#submit').on('click', function() {
    $('.container').addClass('extra-height');
    $('#search-results').remove();
    $('#wiki-container').append('<div class="col-12" id="search-results" style="display: none;"></div>');
    let searchText = document.getElementById('search-item').value;
    let searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' +
    searchText + '&callback=?';
    $.getJSON(searchUrl, function(wikiData) {
      for (let i = 0; i < wikiData[1].length; i++) {
        let title = wikiData[1][i];
        let description = wikiData[2][i];
        if (description === '') {
          description = 'Description Not Available';
        }
        let link = wikiData[3][i];
        $('#search-results').append('<a href="' + link +
          '" target="_blank"><div class="col-12 results"><h4>' + title +
          '</h4><p>' + description + '</p></div></a>');
      }
      $('#search-results').show('slow');
    })
  });
}

function enterKeySubmit() {
  $('#search-item').on('keyup', function (e) {
    if (e.keyCode === 13) {
      event.preventDefault();
      $('#submit').click();
    }
  });
}

//Run on page load
$(function() {
  displaySearchField();
  clearSearchField();
  submitEntry();
  enterKeySubmit()
});