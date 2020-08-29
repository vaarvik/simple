( function() {
  const D = document;

  let div = E( "<div>" ).addClass( "div", "span", "article" ).id( "div" ).appendTo( D.body ).on( "click", function() {
    div.toggleClass( "div" ).log();
  } );
  let div2 = E( "<div>" ).addClass( "div", "span", "article" ).id( "div2" ).appendTo( D.body ).on( "click", function() {
    div.toggleClass( "div" ).log();
  } );
  let div3 = E( "<div>" ).addClass( "wrapper" ).id( "div3" ).appendTo( D.body );

  let span1 = E( "<span>" ).id("hett").appendTo( D.body );
  let span2 = E( "<span>" ).id("s12").appendTo( D.body );
  let span3 = E( "<span>" ).id("3").appendTo( D.body );
  let span4 = E().new("article").id("fejl3").appendTo( D.body );

  // E( ".div" )[0].log();
  E("#hett").log();
  E( "#3ssdfe-ee").log(); //FIX: make it possible to return an array with elements and then do actions to every element in that array
  E( "div" ).appendTo( "span" ) //FIX: make it possible to return an array with elements and then do actions to every element in that array

} )();
