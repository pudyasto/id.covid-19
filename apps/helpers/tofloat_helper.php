<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

if (!function_exists('tofloat')) {
    function tofloat($string)
    {
        return floatval(preg_replace("/[^0-9.]/", "", $string));
    }
}
/* 
 * Created by Pudyasto Adi Wibowo
 * Email : pawdev.id@gmail.com
 * pudyasto.wibowo@gmail.com
 */
