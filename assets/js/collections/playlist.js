/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 18:32
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'Underscore',
        'jQuery',
        'Backbone',
        'models/song',
        'utilities/utilities'
    ],

    function ( _, $, Backbone, songModel )
    {

        var playlistCollection = Backbone.Collection.extend({

            // properties
            model: songModel,

            /**
             * Check for new songs
             */
            checkForNewSongs: function ()
            {
                var thisReference = this;
                
                if ( FB )
                {
                    FB.getLoginStatus( function ( response )
                    {
                        if ( response.status == 'connected' )
                        {
                            FB.api( 'me/links', function( response )
                            {
                                if ( response && response.data.length > 0 )
                                {
                                    _.each ( response.data , function ( linkData )
                                    {
                                        // get duplicate songs
                                        var arrDuplicateSongs = thisReference.filter(function ( song ) { return song.get("youtube_id") == youtubeIdFromUrl( linkData.link ); });

                                        // add song to collection
                                        if ( youtubeIdFromUrl( linkData.link ) && arrDuplicateSongs.length < 1 )
                                        {
                                            App.collections.PlaylistCollection.add(
                                                new songModel( { youtube_id: youtubeIdFromUrl( linkData.link ), facebook_title: linkData.message, youtube_name: linkData.name } )
                                            );
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            },

            /**
             * Currently playing
             */
            currentlyPlaying: function ()
            {
                var allPlayingSongs = this.filter( function ( song ) { return song.get( 'is_playing' ); }, this );
                var currentPlayingSong = null;

                return ( !allPlayingSongs || ( allPlayingSongs && allPlayingSongs.length < 1 ) ) ? false : allPlayingSongs[0];
            },

            /**
            * Play song
            */
            playSong: function ( songId )
            {
                console.log('NEXT SONG');
                console.log(songId);

                // update is_playing from song
                App.collections.PlaylistCollection.each( function ( songModel )
                {
                    var isPlaying = ( songModel.get('youtube_id') == songId ) ? true : false;
                    songModel.set( 'is_playing', isPlaying );
                });

                Backbone.history.navigate( 'playlist/' + songId, { trigger: false, replace: true } );

                return false;
            },

            /**
            * Play the next song
            */
            playNextSong: function ()
            {
                var currentlyPlaying = this.currentlyPlaying();
                var songToPlay = null;
                
                if ( currentlyPlaying )
                {
                    var nextSong = this.at( this.indexOf( currentlyPlaying ) + 1 );
                    nextSong = ( !nextSong ) ? this.first() : nextSong;
                    
                    songToPlay = nextSong;
                }
                else
                {
                    // play first song
                    songToPlay = this.first();
                }

                this.playSong( songToPlay.get( 'youtube_id' ) );
            },

            /**
            * Play the previous song
            */
            playPreviousSong: function ()
            {
                var currentlyPlaying = this.currentlyPlaying();
                var songToPlay = null;
                
                if ( currentlyPlaying )
                {
                    var previousSong = this.at( this.indexOf( currentlyPlaying ) - 1 );
                    previousSong = ( !previousSong ) ? this.last() : previousSong;
                    
                    songToPlay = previousSong;
                }
                else
                {
                    // play last song
                    songToPlay = this.last();
                }

                this.playSong( songToPlay.get( 'youtube_id' ) );
            }

        });

        return playlistCollection;

    }

);