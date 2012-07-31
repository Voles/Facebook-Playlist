/**
 * Created by JetBrains PhpStorm.
 * User: Niels
 * Date: 5/6/12
 * Time: 4:59 PM
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'jQuery',
        'Underscore',
        'Backbone',
        'router'
    ],

    function ($, _, Backbone, Router)
    {
        var initialize = function ()
        {
            Router.initialize();

            // links menu
            $('a.primary-navigation').click( function ()
            {
                var href = $(this).attr('href');
                Backbone.history.navigate( href, { trigger: true, replace: true } );

                return false;
            });
        };

        return {
            initialize: initialize
        };
    }

);