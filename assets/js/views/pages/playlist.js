/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 16:38
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'Underscore',
        'jQuery',
        'Backbone',
        'text!templates/pages/playlist.html',
        'views/playlist/player',
        'views/playlist/controls',
        'views/playlist/songlist'
    ],

    function ( _, $, Backbone, playlistPageTemplate, PlayerView, ControlsView, SonglistView )
    {

        var playlistPageView = Backbone.View.extend({

            // properties
            el: '#page',
            template: _.template( playlistPageTemplate ),

            // subviews
            player: null,
            controls: null,
            songlist: null,

            /**
             * Init
             */
            initialize: function ()
            {

            },

            /**
            * Playlist changed
            */
            playlistChanged: function ()
            {
                // hide warning
                if ( App.collections.PlaylistCollection.length > 0)
                {
                    this.$el.find('div.alert.alert-warning').hide();
                    this.$el.find('div.alert.alert-info, #controls, #player').show();
                }
            },

            /**
             * Render
             */
            render: function ()
            {
                this.$el.html( this.template );

                // events
                App.collections.PlaylistCollection.on( 'add' , this.playlistChanged, this);
                this.playlistChanged();

                // subviews
                this.player = new PlayerView();
                this.player.render();

                this.controls = new ControlsView();
                this.controls.render();

                this.songlist = new SonglistView();
                this.songlist.render();

                // hide log-in message
                this.$el.find('.alert#login-message, #player, #controls').hide();
                this.$el.find('#songlist').show();

                // check for new songs
                if (FB)
                {
                    App.collections.PlaylistCollection.checkForNewSongs();
                }

                // login
                if ( !FB )
                {
                    // show logged-in message
                    this.$el.find('.alert#loading-songs').hide();
                    this.$el.find('.alert#login-message').show();
                }
                else
                {
                    var thisRef = this;

                    FB.getLoginStatus( function ( response )
                    {
                        console.log(response.status);
                        if ( response.status != 'connected' )
                        {
                            // show logged-in message
                            thisRef.$el.find('.alert#loading-songs, #player, #controls, #songlist').hide();
                            thisRef.$el.find('.alert#login-message').show();
                        }
                    });
                }

                this.playlistChanged();
                
                // allow chaining
                return this;
            }

        });

        return playlistPageView;
        
    }
);