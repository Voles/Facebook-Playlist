/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 22:17
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'Underscore',
        'jQuery',
        'Backbone'
    ],

    function ( _, $, Backbone )
    {

        var playerView = Backbone.View.extend({

            // properties
            tagName: 'div',
            collection: null,
            player: null,

            /**
             * Init
             */
            initialize: function ()
            {
                // load the YouTube API
            },

            /**
             * Render
             */
            render: function ()
            {
                this.collection = App.collections.PlaylistCollection;
                this.updatePlayer();

                // events
                this.collection.on( 'change', this.updatePlayer, this );
            },

            /**
             * Update player
             */
            updatePlayer: function ()
            {
                // get current song
                var currentSong = this.collection.currentlyPlaying();
                
                if ( currentSong )
                {
                    // new player
                    if ( !this.player )
                    {
                        var thisRef = this;

                        this.player = new YT.Player('player', {
                            height: '390',
                            width: '640',
                            videoId: currentSong.get('youtube_id'),
                            playerVars: { controls: 0},
                            events:
                            {
                                'onReady': function (evt)
                                {
                                    evt.target.playVideo();
                                },
                                'onStateChange': function (evt)
                                {
                                    // video ended
                                    if (evt.data == YT.PlayerState.ENDED)
                                    {
                                        App.collections.PlaylistCollection.playNextSong();
                                    }
                                }
                            }
                        });
                    }
                    else
                    {
                        this.player.loadVideoById( currentSong.get( 'youtube_id' ) );
                    }
                }
            }

        });

        return playerView;

    }
);