<?php

/*
 * ***************************************************************
 * Script : 
 * Version : 
 * Date :
 * Author : Pudyasto Adi W.
 * Email : pawdev.id@gmail.com
 * Description : 
 * ***************************************************************
 */

/**
 * Description of MY_Controller
 *
 * @author pudyasto
 */
class MY_Controller extends CI_Controller{  
    
    public function __construct()
    {
        parent::__construct();  
        
        header("cache-Control: no-store, no-cache, must-revalidate");
        header("cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");
        header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");
        
    }
}
