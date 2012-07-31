/**
 * Created by JetBrains PhpStorm.
 * User: nielsdequeker
 * Date: 1/07/12
 * Time: 21:38
 * To change this template use File | Settings | File Templates.
 */

function youtubeIdFromUrl( url )
{
    var p = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?=.*v=((\w|-){11}))(?:\S+)?$/;
    return (url.match(p)) ? RegExp.$1 : false;
}

function is_int( value )
{ 
  if ( ( parseFloat(value) == parseInt( value ) ) && !isNaN( value ) )
  {
      return true;
  }
  else
  { 
      return false;
  } 
}