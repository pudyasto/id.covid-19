<?php

defined('BASEPATH') or exit('No direct script access allowed');
/*
 * ***************************************************************
 *  Script : 
 *  Version : 
 *  Date :
 *  Author : PAW! Development Semarang
 *  Email : pawdev.id@gmail.com
 *  Description : 
 * ***************************************************************
 */

/**
 * Description of About
 *
 * @author adi
 */
class About extends MY_Controller
{

  protected $data = array();
  protected $countries = array();

  public function __construct()
  {
    parent::__construct();
    $this->load->model('About_qry');
  }

  public function index()
  {
    $this->template
      ->title("About")
      ->set_layout('login')
      ->build('index', $this->data);
  }
}
