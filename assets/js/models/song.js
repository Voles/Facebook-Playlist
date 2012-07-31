/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 18:29
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
        var songModel = Backbone.Model.extend({

            // properties
            defaults:
            {
                'title'             : 'Not Another Song',
                'artist'            : 'Not Another Artist',
                'facebook_title'    : 'Facebook title',
                'youtube_name'      : 'Youtube name',
                'youtube_id'        : 'Y0uTuB3Id',
                'is_playing'        : false
            }

        });

        return songModel;
    }
);