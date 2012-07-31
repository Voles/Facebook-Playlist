/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 21:53
 * To change this template use File | Settings | File Templates.
 */
define(
	[
		'Underscore',
		'jQuery',
		'Backbone',
		'views/playlist/song'
	],

	function ( _, $, Backbone, SongView )
	{
		var songlistView = Backbone.View.extend({

			// properties
			el: '#songlist',

			/**
			* Initialize
			*/
			initialize: function ()
			{
				App.collections.PlaylistCollection.on( 'change', this.render, this );
				App.collections.PlaylistCollection.on( 'add', this.render, this );
			},

			/**
			* Render
			*/
			render: function ()
			{
				this.$el.html( '<ul></ul>');

				var elementRef = this.$el;

				// loop through songs in collection
				App.collections.PlaylistCollection.each( function ( songModel )
				{
					var songView = new SongView({model: songModel.toJSON() });
					$(elementRef).find('ul').append( songView.el );
				});
				
				// chaining
				return this;
			}

		});

		return songlistView;
	}
);