/**
 * Created by JetBrains PhpStorm.
 * User: Niels
 * Date: 5/6/12
 * Time: 5:16 PM
 * To change this template use File | Settings | File Templates.
 */
define(['order!libs/backbone/backbone.min'],

    function () {
        _.noConflict();
        $.noConflict();
        return Backbone.noConflict();
    }
);