<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('terbilang'))
{      
    function terbilang($angka) {
        $angka = (float)$angka;
        if($angka<0){
            return "Nol";
        }
        $bilangan = array(
                '',
                'satu',
                'dua',
                'tiga',
                'empat',
                'lima',
                'enam',
                'tujuh',
                'delapan',
                'sembilan',
                'sepuluh',
                'sebelas'
        );

        if ($angka < 12) {
            return $bilangan[$angka];
        } else if ($angka < 20) {
            return $bilangan[$angka - 10] . ' belas';
        } else if ($angka < 100) {
            $hasil_bagi = (int)($angka / 10);
            $hasil_mod = $angka % 10;
            return trim(sprintf('%s puluh %s', $bilangan[$hasil_bagi], $bilangan[$hasil_mod]));
        } else if ($angka < 200) {
            return sprintf('seratus %s', terbilang($angka - 100));
        } else if ($angka < 1000) {
            $hasil_bagi = (int)($angka / 100);
            $hasil_mod = $angka % 100;
            return trim(sprintf('%s ratus %s', $bilangan[$hasil_bagi], terbilang($hasil_mod)));
        } else if ($angka < 2000) {
            return trim(sprintf('seribu %s', terbilang($angka - 1000)));
        } else if ($angka < 1000000) {
            $hasil_bagi = (int)($angka / 1000); // karena hasilnya bisa ratusan jadi langsung digunakan rekursif
            $hasil_mod = $angka % 1000;
            return sprintf('%s ribu %s', terbilang($hasil_bagi), terbilang($hasil_mod));
        } else if ($angka < 1000000000) {

            // hasil bagi bisa satuan, belasan, ratusan jadi langsung kita gunakan rekursif
            $hasil_bagi = (int)($angka / 1000000);
            $hasil_mod = $angka % 1000000;
            return trim(sprintf('%s juta %s', terbilang($hasil_bagi), terbilang($hasil_mod)));
        } else if ($angka < 1000000000000) {
            // bilangan 'milyaran'
            $hasil_bagi = (int)($angka / 1000000000);
            $hasil_mod = fmod($angka, 1000000000);
            return trim(sprintf('%s milyar %s', terbilang($hasil_bagi), terbilang($hasil_mod)));
        } else if ($angka < 1000000000000000) { 
            // bilangan 'triliun'                           
            $hasil_bagi = $angka / 1000000000000;                           
            $hasil_mod = fmod($angka, 1000000000000);                           
            return trim(sprintf('%s triliun %s', terbilang($hasil_bagi), terbilang($hasil_mod))); 
        } else {
            return 'Format angka melebihi batas';                        
        }                   
    
    }        
}
/* 
 * Created by Pudyasto Adi Wibowo
 * Email : pawdev.id@gmail.com
 * pudyasto.wibowo@gmail.com
 */

