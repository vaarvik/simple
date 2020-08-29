( function() {
  const D = document;

  let div = S.element( "<div>" ).addClass( "div", "span", "article" ).id( "div" ).appendTo( D.body ).on( "click", function() {
    div.toggleClass( "div" ).log();
  } );
  let div2 = S.element( "<div>" ).addClass( "div", "span", "article" ).id( "div2" ).appendTo( D.body ).on( "click", function() {
    div.toggleClass( "div" ).log();
  } );
  let div3 = S.element( "<div>" ).addClass( "wrapper" ).id( "div3" ).appendTo( D.body );

  let span1 = S.element( "<span>" ).id("hett").appendTo( D.body );
  let span2 = S.element( "<span>" ).id("s12").appendTo( D.body );
  let span3 = S.element( "<span>" ).id("3").appendTo( D.body );

  // S.element( ".div" )[0].log();
  S.element( "span").log(); //FIX: make it possible to return an array with elements and then do actions to every element in that array
  S.element( "div" ).appendTo( "span" ) //FIX: make it possible to return an array with elements and then do actions to every element in that array

} )();
