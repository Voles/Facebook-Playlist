define(
	[
		'jQuery',
		'Underscore',
		'Backbone',
		'models/song',
		'text!templates/playlist/song.html'
	],
	
	function ( $, _, Backbone, songModel, songTemplate )
	{
		var songView = Backbone.View.extend({

			// properties
			tagName: 'li',
			model: songModel,
			template: _.template( songTemplate ),

			/**
			* Initialize
			*/
			initialize: function()
			{
				this.render();
			},

			/**
			* Render
			*/
			render: function()
			{
				// template
				this.$el.html( this.template( this.model ) );

				// chaining
				return this;
			}

		});

		return songView;
	}
);