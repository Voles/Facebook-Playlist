/**
 * Created by JetBrains PhpStorm.
 * User: Niels
 * Date: 5/6/12
 * Time: 4:59 PM
 * To change this template use File | Settings | File Templates.
 */
define([
    'jQuery',
    'Underscore',
    'Backbone'
],

    function ( $, _, Backbone )
    {
        var AppRouter = Backbone.Router.extend({

            // properties
            routes:
            {
                'playlist': 'playlist',
                'playlist/:id': 'playlist',
                '*actions': 'home'
            },

            /**
             * Home
             * @param actions
             */
            home: function ( actions )
            {
                // show the home view
                App.views.HomePageView.render();
            },

            /**
             * Playlist
             */
            playlist: function ( songId )
            {
                // show playlist view
                App.views.PlaylistPageView.render();
                
                if ( songId && songId.length > 3 )
                {
                    // play specific song
                    App.collections.PlaylistCollection.playSong( songId );
                }
            }
        });

        var initialize = function ()
        {
            App.routers.AppRouter = new AppRouter();
            Backbone.history.start( {pushState: true } );
        };

        return {
            initialize: initialize
        };
    }

);