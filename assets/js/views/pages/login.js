/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 16:20
 * To change this template use File | Settings | File Templates.
 */

define(
    [
        'Underscore',
        'jQuery',
        'Backbone',
        //'text!templates/pages/login.html'
    ],

    function ( _, $, Backbone )
    {
        var loginPageView = Backbone.View.extend({

            // properties
            el: '#page',
            template: _.template( loginPageTemplate ),
            timerAmount: 3,

            // events
            events:
            {
                'click .login-button': 'loginbuttonClick'
            },

            /**
             * Init
             */
            initialize: function ()
            {

            },

            /**
             * Render
             */
            render: function ()
            {
                this.$el.html( this.template );

                this.$el.find( '.alert' ).hide();

                // chaining
                return this;
            },

            /**
             * Login button click
             */
            loginbuttonClick: function ()
            {
                var thisRef = this;

                // login with FB
                if (FB)
                {
                    FB.getLoginStatus( function ( response )
                    {
                        if ( response.status !== 'connected' )
                        {
                            FB.login( function ( response )
                                {
                                    thisRef.afterLogin()
                                },
                                {
                                    scope: 'user_status,read_stream'
                                }
                            );
                        }
                        else
                        {
                            thisRef.afterLogin();
                        }
                    });
                }

                return false;
            },

            /**
             * After login
             */
            afterLogin: function ()
            {
                var thisRef = this;

                // show success message
                this.$el.find( '.alert-success' ).show();

                // redirect
                var interval = setInterval( function ()
                    {
                        thisRef.timerAmount--;

                        if (thisRef.timerAmount <= 0)
                        {
                            clearInterval( interval );
                            thisRef.timerAmount = 3;

                            // go to the playlist page
                            App.routers.AppRouter.navigate('/playlist', true);
                        }

                        thisRef.$el.find( '.timer-amount' ).html( '' + thisRef.timerAmount );
                    },
                    1000
                );

            }

        });

        return loginPageView;
    }
);