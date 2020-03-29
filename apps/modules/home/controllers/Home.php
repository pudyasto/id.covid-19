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
 * Description of Home
 *
 * @author adi
 */
class Home extends MY_Controller
{

  protected $data = array();
  protected $countries = array();

  public function __construct()
  {
    parent::__construct();
    $this->load->model('Home_qry');
    $jsonHis = $this->getHistory();
    $dataHis = json_decode($jsonHis, true);
    $sum_baru = 0;
    $kasus_baru = 0;
    if(is_array($dataHis) && count($dataHis) > 0){
      foreach($dataHis['features'] as $val){
        if(is_null($val['attributes']['Jumlah_Kasus_Kumulatif'])){
          break;
        }
        $kasus_baru = $val['attributes']['Jumlah_Kasus_Baru_per_Hari'];
        $sum_baru += $val['attributes']['Jumlah_Kasus_Baru_per_Hari'];
        $this->data['last_info'] = $val['attributes'];
      }
      $this->data['avg'] = ($kasus_baru/$sum_baru) * 100;
    }
  }

  //redirect if needed, otherwise display the user list

  public function index()
  {
    $this->initIndex();
    $this->template
      ->title("Dashboard")
      ->set_layout('main')
      ->build('index', $this->data);
  }

  public function getGlobal()
  {
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    echo $response;
  }

  public function getRoadMap(){
    echo $this->getHistory();
  }

  private function getHistory(){
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
    ));
    
    $response = curl_exec($curl);
    
    curl_close($curl);
    return $response;
    
  }

  private function initIndex()
  {
    $this->data['form'] = array(
      'periode' => array(
        'placeholder' => 'Periode',
        'id' => 'periode',
        'name' => 'periode',
        'value' => date('d-m-Y'),
        'class' => 'form-control add-input-text calendar',
        'maxlength' => '10',
      ),
      'countries' => array(
        'attr' => array(
          'placeholder' => 'Negara',
          'id' => 'countries',
          'class' => 'form-control ',
        ),
        'data' => $this->countries,
        'value' => 'Indonesia',
        'name' => 'countries',
      ),
    );
  }
}
