console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

$('#viewKoalas').on('click', '.readyForTransferIn', function(){
  console.log('transfer clicked');
  var transferId = $(this).data('koalaid');
  console.log('transfering', transferId);
    $.ajax({
      type: 'PUT',
      url: '/koalas',
      data: {id: transferId},
      success: function(response){
        console.log(response);
        getKoalas();
      }
    });

});


  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var newKoala = {};
    newKoala.name = $('#nameIn').val();
    newKoala.gender = $('#genderIn').val();
    newKoala.age = $('#ageIn').val();
    newKoala.transfer = $('#readyForTransferIn').val();
    newKoala.notes = $('#notesIn').val();


    // function addKoala(newKoala){
      $.ajax({
        url: '/koalas',
        type: 'POST',
        data: newKoala,
        success: function( data ){
          console.log( 'got some koalas: ', data );
            getKoalas();


        } // end success

      });
getKoalas();
    // call saveKoala with the new obejct
    // saveKoala(newKoala);
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      // console.log(data.)
      // var data = {koalas: [Object, Object...]};
      console.log(data.koalas);
      appendToDom(data.koalas);
    } // end success
  }); //end ajax

  // display on DOM with buttons that allow edit of each
} // end getKoalas


// koalas should ba an array
function appendToDom(koalas) {
  // Remove books that currently exist in the table
  $('#viewKoalas').empty();
  for(var i = 0; i < koalas.length; i += 1) {
    var koala = koalas[i];
    // For each book, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('koala', koala);
    $tr.append('<td>' + koala.name + '</td>');
    $tr.append('<td>' + koala.age + '</td>');
    $tr.append('<td>' + koala.gender + '</td>');
    $tr.append('<td>' + koala.transfer + '</td>');
    $tr.append('<td>' + koala.notes + '</td>');
    if(koala.transfer === true){
    $tr.append('<td></td>');
    $tr.append('<td><button class="deleteBuddy" data-koalaid="' + koala.id + '">Delete</button></td>');
    $('#viewKoalas').append($tr);
  }else if(koala.transfer === false){
    $tr.append('<td><button class="readyForTransferIn" data-koalaid="' + koala.id + '">Ready For Transfer</button></td>');
    $tr.append('<td><button class="deleteBuddy" data-koalaid="' + koala.id + '">Delete</button></td>');

    $('#viewKoalas').append($tr);
  }
  }
}
