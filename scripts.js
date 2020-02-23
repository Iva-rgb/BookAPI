$(document).ready(function(){
    var url = 'https://www.googleapis.com/books/v1/volumes?';
    var title = '';
    var description = '';
    var picture = '';
    var numberOfPages = '';
    var details;
    var divs = $('#bookShelf div');

    $("#searchbar-area").submit(function(){
        event.preventDefault();
    
        var searchResult = $("#myBooks").val();

        if(searchResult == ''){
            alert("Please enter something first");
        } else{
            $.ajax({
                url: url  + "q=" + searchResult,
                dataType: 'json',
                cache: true,
                success: function(result){
                    $('#bookShelf').show();

                    // Sortiranje spored broj na stranici
                    result.items.sort(function(a, b) {
                        return a.volumeInfo.pageCount - b.volumeInfo.pageCount;
                    });
                
                    $('.innerContainer').html(null);
                    // Rendering
                    for(i = 0; i < result.items.length; i++){
                        
                        title = $('<h4 class="naslov"><a class="link" target="_blank" href='+ result.items[i].volumeInfo.infoLink +'>'+ result.items[i].volumeInfo.title +'</a></h4>');
                        details = $('<p class"more"><a href="#myModal" data-toggle="modal" class="btn btn-big">More »</a></p>');
                        //Given books don't have an image attribute 
                        if(result.items[i].volumeInfo.readingModes.image == true){
                            picture = $('<img class="slika">')
                            picture.attr('src', result.items[i].volumeInfo.imageLinks.thumbnail);
                            picture.appendTo(divs[i]);
                        }
                        title.appendTo(divs[i]);
                        details.appendTo(divs[i]);
                    }

                    //Details view
                    $('.btn').click(function(){
                        $('.modal-header').html(null);
                        $('.modal-body').html(null);
                        $('.modal-footer').html(null);
                        
                        //Fetching index of desired book
                        var index = $(this).parent().parent().index();

                        //Book details
                        var x = $('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
                        title = $('<h4 class="naslov"><a class="link" target="_blank" href='+ result.items[index].volumeInfo.infoLink +'>'+ result.items[index].volumeInfo.title +'</a></h4>');
                        description = $('<p class="opis"> <b>Description: </b>'+ result.items[index].volumeInfo.description +'</p>')
                        numberOfPages = $('<p class="stranici"> <b>Number of pages: </b> '+ result.items[index].volumeInfo.pageCount +'</p>')    
                        var footer = $('<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>');

                        title.appendTo(".modal-header");
                        x.appendTo(".modal-header");
                        description.appendTo(".modal-body");
                        numberOfPages.appendTo(".modal-footer");
                        footer.appendTo(".modal-footer");
                    });
                },
                error : function() {
                    alert("Error");
                }
            });
        }
    });

   

    return false;
});