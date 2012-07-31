/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 16:03
 * To change this template use File | Settings | File Templates.
 */
define(
    [
        'Underscore',
        'Backbone',
        'jQuery',
        'text!templates/pages/home.html'
    ],

    function ( _, Backbone, $, homePageTemplate )
    {
        var homePageView = Backbone.View.extend({

            // properties
            el: '#page',
            template: _.template( homePageTemplate ),

            // events
            events:
            {
                'click .login-button'   : 'loginbuttonClick',
                'click .logout-button'  : 'logoutbuttonClick'
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

                this.renderView();
                
                // enable chaining
                return this;
            },

            /**
            * Render view
            */
            renderView: function ()
            {
                var thisRef = this;

                thisRef.$el.find('div.logged-in').hide();
                thisRef.$el.find('div.logged-out').show();

                if ( FB )
                {
                    FB.getLoginStatus( function ( response )
                    {
                        if ( response.status == 'connected' )
                        {
                            thisRef.$el.find('div.logged-in').show();
                            thisRef.$el.find('div.logged-out').hide();
                        }
                        else
                        {
                            thisRef.$el.find('div.logged-in').hide();
                            thisRef.$el.find('div.logged-out').show();
                        }
                    });
                }
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
                    FB.login( function ( response )
                        {
                            thisRef.afterLogin();
                        },
                        {
                            scope: 'user_status,read_stream'
                        }
                    );
                }
                else
                {
                    this.$el.find('#facebook-api').show();
                }

                return false;
            },

            /**
             * Logout button click
             */
            logoutbuttonClick: function ()
            {
                var thisRef = this;

                // login with FB
                if (FB)
                {
                    FB.logout( function ( response )
                    {
                        thisRef.renderView();
                        thisRef.$el.find('#logged-out').show();
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

                App.routers.AppRouter.navigate('/playlist', true);
            }

        });

        return homePageView;
    }
);