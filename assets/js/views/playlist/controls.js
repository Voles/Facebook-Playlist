/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 22:23
 * To change this template use File | Settings | File Templates.
 */

define(
	[
		'Underscore',
		'jQuery',
		'Backbone',
		'text!templates/playlist/controls.html'
	],

	function ( _, $, Backbone, controlsTemplate )
	{
		var controlsView = Backbone.View.extend({

			// properties
			el: '#controls',
			template: _.template( controlsTemplate ),
			isPaused: false,

			// events
			events:
			{
				'click a.backward'	: 'previousButtonClicked',
				'click a.play'		: 'playButtonClicked',
				'click a.forward'	: 'forwardButtonClicked'
			},

			/**
			* Initialize
			*/
			initialize: function ()
			{

			},

			/**
			* Render
			*/
			render: function ()
			{
				// events
				App.collections.PlaylistCollection.on( 'change', this.renderPlayButton, this );
				App.collections.PlaylistCollection.on( 'add', this.renderPlayButton, this );

				// render template
				this.$el.html( this.template );
				this.renderPlayButton();

				// chaining
				return this;
			},

			/**
			* Previous button clicked
			*/
			previousButtonClicked: function ()
			{
				var nextSong = App.collections.PlaylistCollection.playPreviousSong();
				this.isPaused = false;
				this.renderPlayButton();

				return false;
			},

			/**
			* Play button clicked
			*/
			playButtonClicked: function ()
			{
				var currentSong = App.collections.PlaylistCollection.currentlyPlaying();

				if ( !currentSong )
				{
					App.collections.PlaylistCollection.playNextSong();
					this.isPaused = false;
				}
				else if ( this.isPaused )
				{
					App.views.PlaylistPageView.player.player.playVideo();
					this.isPaused = false;
				}
				else
				{
					App.views.PlaylistPageView.player.player.pauseVideo();
					this.isPaused = true;
				}

				// icon
				this.renderPlayButton();

				return false;
			},

			/**
			* Forward button clicked
			*/
			forwardButtonClicked: function ()
			{
				var nextSong = App.collections.PlaylistCollection.playNextSong();
				this.isPaused = false;
				this.renderPlayButton();

				return false;
			},

			/**
			* Render play button
			*/
			renderPlayButton: function ()
			{
				var currentSong = App.collections.PlaylistCollection.currentlyPlaying();

				if ( !currentSong || this.isPaused )
				{
					this.$el.find('a.play span').removeClass('icon-pause').addClass('icon-play');
				}
				else
				{
					this.$el.find('a.play span').removeClass('icon-play').addClass('icon-pause');
				}
			}

		});

		return controlsView;
	}
);