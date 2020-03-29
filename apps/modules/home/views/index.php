<link href="https://api.mapbox.com/mapbox-gl-js/v1.9.0/mapbox-gl.css" rel="stylesheet" />
<div class="row">
    <div class="col-sm-3 flex-column d-flex stretch-card">
        <div class="row flex-grow">
            <div class="col-sm-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">Kasus Per Provinsi</h4>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-sm table-provinsi">
                                        <thead>
                                            <tr>
                                                <th rowspan="2">Provinsi</th>
                                                <th colspan="3" style="text-align: center !important;">Jumlah (Orang)</th>
                                                <th colspan="3" style="text-align: center !important;">Persentase (%)</th>
                                            </tr>
                                            <tr>
                                                <th style="width: 10px;text-align: center !important;">Positif</th>
                                                <th style="width: 10px;text-align: center !important;">Sembuh</th>
                                                <th style="width: 10px;text-align: center !important;">Meninggal</th>

                                                <th style="width: 10px;text-align: center !important;">Positif</th>
                                                <th style="width: 10px;text-align: center !important;">Sembuh</th>
                                                <th style="width: 10px;text-align: center !important;">Meninggal</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th colspan="7">Provinsi</th>
                                            </tr>
                                        </tfoot>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <!-- <canvas id="chart-per-wilayah" style="display: block; height: 580px;"></canvas> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-6 grid-margin stretch-card">
        <div class="card">
            <div class="card-body">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row" style="padding: 0px 15px;">
                                    <div style="padding: 0px;" class="col-sm-3 grid-margin ">
                                        <div class="card card-solid bg-primary">
                                            <div class="card-body text-white slim-widget">
                                                <h3 class="font-weight-bold mb-1">
                                                    <span class="total-data"><?= number_format($last_info['Jumlah_Kasus_Kumulatif'], 0, '.', ','); ?></span> (+<?= number_format($last_info['Jumlah_Kasus_Baru_per_Hari'], 0, '.', ','); ?>)
                                                </h3>
                                                <div class="progress mb-2">
                                                    <div class="progress-bar bg-dark" role="progressbar" style="width: <?= number_format($avg, 0, '.', ',') . '%'; ?>" aria-valuenow="<?= number_format($avg, 0, '.', ','); ?>" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p class="pb-0 mb-0">Terkonfirmasi</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="padding: 0px;" class="col-sm-3 grid-margin ">
                                        <div class="card card-solid bg-warning">
                                            <div class="card-body text-white slim-widget">
                                                <h3 class="font-weight-bold mb-1">
                                                    <span class="total-perawatan"><?= number_format($last_info['Jumlah_pasien_dalam_perawatan'], 0, '.', ','); ?></span> (<?= number_format($last_info['Persentase_Pasien_dalam_Perawatan'], 2, '.', ','); ?>%)
                                                </h3>
                                                <div class="progress mb-2">
                                                    <div class="progress-bar bg-dark" role="progressbar" style="width: <?= number_format($last_info['Persentase_Pasien_dalam_Perawatan'], 0, '.', ',') . '%'; ?>" aria-valuenow="<?= number_format($last_info['Persentase_Pasien_dalam_Perawatan'], 0, '.', ','); ?>" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p class="pb-0 mb-0">Perawatan</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="padding: 0px;" class="col-sm-3 grid-margin ">
                                        <div class="card card-solid bg-success">
                                            <div class="card-body text-white slim-widget">
                                                <h3 class="font-weight-bold mb-1">
                                                    <span class="total-sembuh"><?= number_format($last_info['Jumlah_Pasien_Sembuh'], 0, '.', ','); ?></span> (<?= number_format($last_info['Persentase_Pasien_Sembuh'], 2, '.', ','); ?>%)
                                                </h3>
                                                <div class="progress mb-2">
                                                    <div class="progress-bar bg-dark" role="progressbar" style="width: <?= number_format($last_info['Persentase_Pasien_Sembuh'], 0, '.', ',') . '%'; ?>" aria-valuenow="<?= number_format($last_info['Persentase_Pasien_Sembuh'], 0, '.', ','); ?>" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p class="pb-0 mb-0">Sembuh</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="padding: 0px;" class="col-sm-3 grid-margin ">
                                        <div class="card card-solid bg-danger">
                                            <div class="card-body text-white slim-widget">
                                                <h3 class="font-weight-bold mb-1">
                                                    <span class="total-meninggal"><?= number_format($last_info['Jumlah_Pasien_Meninggal'], 0, '.', ','); ?></span> (<?= number_format($last_info['Persentase_Pasien_Meninggal'], 2, '.', ','); ?>%)
                                                </h3>
                                                <div class="progress mb-2">
                                                    <div class="progress-bar bg-dark" role="progressbar" style="width: <?= number_format($last_info['Persentase_Pasien_Meninggal'], 0, '.', ',') . '%'; ?>" aria-valuenow="<?= number_format($last_info['Persentase_Pasien_Meninggal'], 0, '.', ','); ?>" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p class="pb-0 mb-0">Meninggal</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div id="mapid" style="height: 400px;"></div>
                                <table>
                                    <tr>
                                        <td>
                                            Sumber Data : <a href="https://bnpb-inacovid19.hub.arcgis.com/datasets/covid19-indonesia-per-provinsi/geoservice">bnpb-inacovid19.hub.arcgis.com</a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="col-sm-12">
                                <small>
                                    Catatan:
                                    <br>
                                    1. Titik lokasi yang ditunjukkan pada peta didasarkan pada centroid geografis dan mewakili kasus terkonfirmasi COVID-19 pada tingkat provinsi, serta tidak mewakili alamat tertentu, bangunan, atau lokasi apa pun.
                                    <br>
                                    2. Terdapat <strong class="unknown-case"></strong> kasus terkonfirmasi yang masih dalam investigasi di lapangan, oleh karena itu belum terpetakan di atas peta untuk lokasi provinsi kasusnya.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-sm-3 flex-column d-flex stretch-card">
        <div class="row flex-grow">
            <div class="col-sm-12 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12 mt-4 mt-lg-0">
                                <div class="bg-primary text-white px-4 py-4 card">
                                    <div class="row">
                                        <div class="col-sm-6 text-center ">
                                            <h3 class="avg-value-recover">0</h3>
                                            <small class="mb-0 avg-label-recover">Rata-Rata Pasien Sembuh</small>
                                        </div>
                                        <div class="col-sm-6 text-center ">
                                            <h3 class="avg-value-death">0</h3>
                                            <small class="mb-0 avg-label-death">Rata-Rata Pasien Meninggal</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mt-md-1">
                            <div class="col-sm-6">
                                <div class="d-flex purchase-detail-legend align-items-center">
                                    <canvas id="chart-top-recover" style="display: block; height: 200px;"></canvas>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="d-flex purchase-detail-legend align-items-center">
                                    <canvas id="chart-top-death" style="display: block; height: 200px;"></canvas>
                                </div>
                            </div>
                            <div class="col-sm-12 pt-3 ">
                                <div class="d-flex purchase-detail-legend align-items-center">
                                    <canvas id="chart-death-recover" style="display: block; height: 260px;"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-3 flex-column d-flex stretch-card">
        <div class="row flex-grow">
            <div class="col-sm-12 stretch-card">
                <div class="card">
                    <div class="card-body slim-widget">
                        <div class="row">
                            <div class="col-sm-12">
                                <canvas id="chart-history-cases" style="display: block; height: 200px;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3 flex-column d-flex stretch-card">
        <div class="row flex-grow">
            <div class="col-sm-12 stretch-card">
                <div class="card">
                    <div class="card-body slim-widget">
                        <div class="row">
                            <div class="col-sm-12">
                                <canvas id="chart-history-active" style="display: block; height: 200px;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3 flex-column d-flex stretch-card">
        <div class="row flex-grow">
            <div class="col-sm-12 stretch-card">
                <div class="card">
                    <div class="card-body slim-widget">
                        <div class="row">
                            <div class="col-sm-12">
                                <canvas id="chart-history-recover" style="display: block; height: 200px;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3 flex-column d-flex stretch-card">
        <div class="row flex-grow">
            <div class="col-sm-12 stretch-card">
                <div class="card">
                    <div class="card-body slim-widget">
                        <div class="row">
                            <div class="col-sm-12">
                                <canvas id="chart-history-death" style="display: block; height: 200px;"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- chartjs -->
<script src="<?= base_url('plugins/chartjs/Chart.bundle.js'); ?>" type="text/javascript"></script>
<script src="<?= base_url('plugins/chartjs/utils.js'); ?>" type="text/javascript"></script>

<script src="https://api.mapbox.com/mapbox-gl-js/v1.9.0/mapbox-gl.js"></script>
<script src="<?= base_url('kapella/js/home.js'); ?>" type="text/javascript"></script>