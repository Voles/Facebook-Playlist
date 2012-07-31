/**
 * Created by JetBrains PhpStorm.
 * User: Niels
 * Date: 5/6/12
 * Time: 4:59 PM
 * To change this template use File | Settings | File Templates.
 */

require.config({

    paths: {
        jQuery: 'libs/jquery/jquery',
        Underscore: 'libs/underscore/underscore',
        Backbone: 'libs/backbone/backbone'
    }

});


require(
    [
        'app',
        'views/pages/home',
        'views/pages/playlist',
        'collections/playlist',
        'order!libs/jquery/jquery.min',
        'order!libs/underscore/underscore.min',
        'order!libs/backbone/backbone.min',
        'utilities/facebook'
    ],

    function ( App, HomePageView, PlaylistPageView, PlaylistCollection )
    {
        window.App =
        {
            'models': {},
            'collections':
            {
                'PlaylistCollection'    : new PlaylistCollection()
            },
            'routers': {},
            'views':
            {
                'HomePageView'          : new HomePageView(),
                'PlaylistPageView'      : new PlaylistPageView()
            }
        };
        
        App.initialize();
    }
);