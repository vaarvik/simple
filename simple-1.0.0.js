/**
 *
 * ███████╗██╗███╗   ███╗██████╗ ██╗     ███████╗
 * ██╔════╝██║████╗ ████║██╔══██╗██║     ██╔════╝
 * ███████╗██║██╔████╔██║██████╔╝██║     █████╗
 * ╚════██║██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝
 * ███████║██║██║ ╚═╝ ██║██║     ███████╗███████╗
 * ╚══════╝╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝
 *
 * Simple JavaScript Library
 *
 * @version 1.0.0
 *
 * @copyright 2020 Johann Vårvik
 *
 * Date: xxxx-xx-xxTxx:xxUTC+01.00
 *
 * @author  Johann Vårvik
 *
 * @since 1.0.0
 */

//Script starts here
(
	/**
	 * Initial function
	 * ----------
	 * The function that runs when the script loads.
	 *
	 * @param   {Window}  		global    	The global element - the DOM's window in most cases	 *
	 * @param   				factory   	The callback function to be called inside the function.
	 */
	function( global, factory ) {

		"use strict";

		if ( typeof module === "object" && typeof module.exports === "object" ) {

			/*
			* Just get the library if the environment has a 'window' object with a document.
			* Environments as Node.js that do not have this must import the library through
			* module.exports as this is needed to create a 'window' object for the library.
			* _______________________________________________________________________________
			* Examples:
			* * let Simple = require("simple")(window);
			*
			*/

			module.exports = global.document ?
				factory( global, true ) :
				function( windw ) {
					if ( !windw.document ) {
						throw new Error( "Simple needs to have a window with a document in order to work properly" );
					}
					return factory( windw );
				};
		} else {
			factory( global );
		}
	}
)( typeof window !== "undefined" ? window : this, function( window, isModern ){

	"use strict";

	//Short hands
	const D = document;

	class Simple {
		/**
		 * Simple
		 * ----------
		 * The instance of another class that extends this one or null.
		 * __________
		 * Examples:
		 * * @instance Element
		 */
		simple = null;

		/**
		 * Element
		 * ----------
		 * Create a new Element and triggers its constructor.
		 *
		 * @param   {String}  selector  The selector that the Element constructor takes in as an parameter.
		 *
		 * @return  {Simple}  The new Element that was initalized.
		 */
		element() {
			this.simple = new Element();
			return this.simple;
		}

		/**
		 * Element
		 * ----------
		 * Create a new Element and triggers its constructor.
		 *
		 * @param   {String|HTMLElement}  selector  The selector that the Element constructor takes in as an parameter.
		 *
		 * @return  {Simple}  The new Element that was initalized.
		 */
		element( selector ) {
			this.simple = new Element( selector );
			//if not return the Element itself
			return this.simple;
		}

		/**
		 * Log
		 * ----------
		 * Logs whatever is stored in this.simple to the console.
		 * __________
		 * Logs the Element instance if there this.simple has no value.
		 *
		 * @return  {Simple}  The new Element that was initalized.
		 */
		log() {
			if( this.simple ) console.log( this.simple );
			else console.log( this );
			return this;
		}
	};

	//Reconsider using class for IE support
	class Element extends Simple{
		element = null;
		//can create a static variable that holds all the elements created with Simple

		/**
		 * Element Constructor
		 * ----------
		 * Creates or gets an HTML Element based of the selector.
		 * __________
		 *
		 * @param   {String}  selector  The selector that defines the element to be created or received.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		constructor( selector ) {
			super();
			if( !selector ) return this;
			else if( selector[0] === "<" && selector[selector.length - 1] === ">" ) this.new( selector.slice( 1, -1 ) );
			else this.get( selector );
			return this;
		}

		/**
		 * New
		 * ----------
		 * Creates a new HTML element.
		 *
		 * @param   {String}  tagName  The HTML tag that we want to new element to be.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		new( tagName ) {
			//add so that a user can type # or . to declare id and/or class inside first declaration
			this.element = D.createElement( tagName );
			return this;
		}

		/**
		 * Get
		 * ----------
		 * Gets an HTML element from the DOM.
		 *
		 * @param   {String|HTMLElement}  selector  The selector that defines the element to be received.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		get( selector ) {
			if( selector[0] === "#" ) {
				return this.getById( selector );
			}
			else if( this.#isNode( selector ) ) {
				this.element = selector;
				return this;
			}
			else {
				return this.getAll( selector );
			}
		}

		/**
		 * Get All
		 * ----------
		 * Gets all HTML elements associated with a selector.
		 * __________
		 * Makes this.element into an array with Element instances.
		 *
		 * @param   {String}  selector  The selector that defines the elements to be received.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		getAll( selector ) {
			let nodeElements = D.querySelectorAll( selector );
			let nodeElementsArray = Array.prototype.slice.call( nodeElements ); //does not work correctly yet
			this.element = [];
			nodeElementsArray.forEach( element => {
				this.element.push( new Element( element ) );
			} );
			return this;
		}

		/**
		 * Index
		 * ----------
		 * Gets a Element at a specific index if there is multiple elements stored in an array.
		 *
		 * @param   {Number}  index  The index of the elements that's requested.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		index( index ) {
			if( Array.isArray( this.element ) ) {
				this.element = this.element[index].element;
			}
			return this;
		}

		/**
		 * Get By ID
		 * ----------
		 * Gets an HTML element from the DOM by its ID.
		 *
		 * @param   {String}  id  The ID that should be used to get the HTML Element.
		 *
		 * @return  {[type]}      [return description]
		 */
		getById( id ) {
			if( id[0] === "#" ) id = id.substring(1);
			this.element = D.querySelector( "#" + id );
			return this;
		}

		/**
		 * Remove
		 * ----------
		 * Removes an element from the DOM
		 *
		 * @return  {HTMLElement}  The HTML Element that was deleted which therefore stops the possibility to add methods on the current instance after this method is run.
		 */
		remove() {
			//MODIFY: Make it possible to remove several elements
			if( !Array.isArray( this.element ) ) this.element.remove();
			return this.element;
		}

		/**
		 * Append To
		 * ----------
		 * Appends an element to another HTML element.
		 *
		 * @param   {HTMLElement}  element  The HTML element that the current element should be appended to.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		appendTo( element ) {
			//MODIFY: could take in an string and/or an array and append the element (or elements) to every element.
			element.appendChild( this.element );
			return this;
		}

		/**
		 * ID
		 * ----------
		 * Adds or change the ID of a single HTML Element.
		 *
		 * @param   {String}  id  The ID
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		id( id ) {
			this.element.id = id;
			return this;
		}

		/**
		 * Add Class
		 * ----------
		 * Adds classes for a single HTML element.
		 * ____________
		 * Takes in any number of string arguments.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		addClass() {
			let args = arguments;
			return this.updateClasses( true, args );
		}

		/**
		 * Remove Class
		 * ----------
		 * Removes classes for a single HTML element.
		 * ____________
		 * Takes in any number of string arguments.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		removeClass() {
			let args = arguments;
			return this.updateClasses( false, args );
		}

		/**
		 * Update Classes In Array
		 * ----------
		 * Updates class names on several elements.
		 *
		 * @param   {String}  	option  "add" or "remove". Used to know if it should add/remove class(es).
		 * @param   {Array}  	classNames  An array of the classnames to be added/removed.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		updateClassesInArray( option, classNames ) {
			this.element.forEach( function( element ) {
				let classList = element.element.classList;
				classList[option].apply( classList, classNames ); //first parameter could be thought as "apply to"
			} );
			return this;
		}

		/**
		 * Update Classes In Single
		 * ----------
		 * Updates class names on a single element.
		 *
		 * @param   {String}  option  "add" or "remove". Used to know if it should add/remove class(es).
		 * @param   {Array}  	classNames  An array of the classnames to be added/removed.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		updateClassesInSingle( option, classNames ) {
			let classList = this.element.classList;
			classList[option].apply( classList, classNames ); //first parameter could be thought as "apply to"
			return this;
		}

		/**
		 * Update Classes
		 * ----------
		 * Updates class names on a single or several elements.
		 *
		 * @param   {Boolean}  add  Adds class(es) if true. Removes if false.
		 * @param   {Array}  	classNames  An array of the classnames to be added/removed.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		updateClasses( add, classNames ) {
			let option;
			if( add ) option = "add";
			else option = "remove";

			if( Array.isArray( this.element ) ) {
				return this.updateClassesInArray( option, classNames );
			}
			//else
			return this.updateClassesInSingle( option, classNames );
		}

		/**
		 * Toggle Class
		 * ----------
		 * Toggles classes for a single HTML element.
		 * ____________
		 * Takes in any number of string arguments.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		toggleClass() {
			let classList = this.element.classList;
			Array.from( arguments ).forEach( argument => {
				if( classList.contains( argument ) ) this.removeClass( argument );
				else this.addClass( argument );
			});
			return this;
		}

		/**
		 * On
		 * ----------
		 * Add Event Listener simplified.
		 * __________
		 * PS: "this" keyword can be used to refer to the element itself inside the callback function.
		 *
		 * @param   {String}  event     The event.
		 * @param   {Function}  callback  The function to be triggered by the event.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		on( event, callback ) {
			this.element.addEventListener( event, callback );
			return this;
		}

		/**
		 * Log
		 * ----------
		 * Logs the HTML Element to the console.
		 * __________
		 * Logs the Element instance if there is no HTML Element.
		 *
		 * @return  {Element}  The instance of this Element.
		 */
		log() {
			//Might add a possibility to add own args to the log.
			if( this.element ) console.log( this.element );
			else console.log( this );
			return this;
		}

		/**
		 * Is Node?
		 * ----------
		 * Checks if a given parameter is an HTML Element.
		 * __________
		 * Private method.
		 *
		 * @param {HTMLElement}		element		The parameter to be checked.
		 *
		 * @return {Boolean}
		 */
		#isNode( element ){
			if( typeof Node === "object" ) {
				return element instanceof Node;
			}
			else {
				return (
					element &&
					typeof element === "object" &&
					typeof element.nodeType === "number" &&
					typeof element.nodeName==="string"
					);
			}
		  }

	}

	let S = new Simple();

	//as long as there is a window then add the Simple instance as a global variable that can be accessed by writing "Simple" or just "S".
	if ( typeof isModern === "undefined" ) {
		window.Simple = window.S = S;
	}

	return S;
 } );
