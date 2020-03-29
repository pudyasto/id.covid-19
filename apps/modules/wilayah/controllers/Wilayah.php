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
 * Description of Wilayah
 *
 * @author adi
 */
class Wilayah extends MY_Controller
{

  protected $data = array();
  protected $countries = array();

  public function __construct()
  {
    parent::__construct();
    $this->load->model('Wilayah_qry');
  }

  public function index()
  {
    $this->template
      ->title("Wilayah")
      ->set_layout('lock')
      ->build('index', $this->data);
  }
}
