( function() {
  const D = document;

  let div = S.element( "<div>" ).addClass( "div", "span", "article" ).id( "div" ).appendTo( D.body ).on( "click", function() {
    div.toggleClass( "div" ).log();
  } );
  let div2 = S.element( "<div>" ).addClass( "div", "span", "article" ).id( "div2" ).appendTo( D.body ).on( "click", function() {
    div.toggleClass( "div" ).log();
  } );

  // S.element( ".div" )[0].log();

  S.element( ".div" ).addClass("ohe", "ehy"); //FIX: make it possible to return an array with elements and then do actions to every element in that array

} )();
