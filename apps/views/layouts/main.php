<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Pantau Covid-19 Indonesia</title>
    <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="description" content="Informasi Jumlah Penderita Virus Covid-19">
    <meta name="author" content="Pudyasto Adi Wibowo">
    <meta name="keyword" content="Covid-19, Corona Virus">
    <meta name="csrf" id="<?= $this->security->get_csrf_token_name(); ?>" content="<?= $this->security->get_csrf_hash(); ?>">
    <meta name="mapbookapi" id="mapbookapi" content="<?= KEY_MAPBOXAPI; ?>">
    <!-- base:css -->
    <link rel="stylesheet" href="<?= base_url('kapella/vendors/mdi/css/materialdesignicons.min.css'); ?>">
    <link rel="stylesheet" href="<?= base_url('kapella/vendors/base/vendor.bundle.base.css'); ?>">
    <!-- endinject -->
    <!-- plugin css for this page -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css">
    <!-- Data Tables -->
    <link rel="stylesheet" href="<?= base_url('plugins/datatables/datatables.min.css'); ?>">
    <link rel="stylesheet" href="<?= base_url('plugins/datatables/DataTables-1.10.16/css/dataTables.bootstrap4.min.css'); ?>">
    <link rel="stylesheet" href="<?= base_url('plugins/datatables/Select-1.2.4/css/select.bootstrap4.min.css'); ?>">
    <!-- End plugin css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="<?= base_url('kapella/css/style.css'); ?>">
    <!-- endinject -->
    <link rel="shortcut icon" href="<?= base_url('kapella/images/favicon.png'); ?>" />

    <script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.9.0/moment-with-locales.js"></script>
    <script>
        var public_html = "<?= base_url(); ?>";
    </script>
    <!-- base:js -->
    <script src="<?= base_url('kapella/vendors/base/vendor.bundle.base.js'); ?>"></script>
    <!-- datatables -->
    <script src="<?= base_url('plugins/datatables/datatables.min.js'); ?>"></script>
    <script src="<?= base_url('plugins/datatables/DataTables-1.10.16/js/dataTables.bootstrap4.min.js'); ?>"></script>
    <script src="<?= base_url('plugins/datatables/Select-1.2.4/js/dataTables.select.min.js'); ?>"></script>
    <!-- endinject -->
    <script src="<?= base_url('kapella/js/my.js'); ?>" type="text/javascript"></script>
</head>

<body>
    <div class="container-scroller">
        <!-- partial:partials/_horizontal-navbar.html -->
        <div class="horizontal-menu">
            <nav class="navbar top-navbar col-lg-12 col-12 p-0">
                <div class="container-fluid">
                    <div class="navbar-menu-wrapper d-flex align-items-center justify-content-between" style="height: 40px;">
                        <ul class="navbar-nav navbar-nav-left">
                            <li class="nav-item ml-0 mr-5 d-lg-flex d-none">
                                <a href="#" class="nav-link horizontal-nav-left-menu"><i class="mdi mdi-format-list-bulleted"></i></a>
                            </li>
                        </ul>
                        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center" style="height: auto;">
                            <a class="navbar-brand brand-logo" style="font-size: 1.2rem;" href="<?= site_url('home'); ?>">INA COVID-19</a>
                            <a class="navbar-brand brand-logo-mini" style="font-size: 1.2rem;" href="<?= site_url('home'); ?>">COVID-19</a>
                        </div>
                        <ul class="navbar-nav navbar-nav-right">
                            <li class="nav-item nav-profile dropdown">
                                <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" id="profileDropdown">
                                    <img src="<?= base_url('kapella/images/logo.jpg'); ?>" alt="profile" />
                                </a>
                                <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                    <a class="dropdown-item" href="<?= site_url('about'); ?>">
                                        <i class="mdi mdi-settings text-primary"></i>
                                        About
                                    </a>
                                </div>
                            </li>
                        </ul>
                        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="horizontal-menu-toggle">
                            <span class="mdi mdi-menu"></span>
                        </button>
                    </div>
                </div>
            </nav>
            <nav class="bottom-navbar">
                <div class="container">
                    <ul class="nav page-navigation">
                        <?php
                        $url = array(
                            0 => array(
                                'name' => 'Home',
                                'url' => site_url('home'),
                                'class' => 'home',
                                'icon' => 'mdi-file-document-box',
                            ),
                            1 => array(
                                'name' => 'Wilayah',
                                'url' => site_url('wilayah'),
                                'class' => 'wilayah',
                                'icon' => 'mdi-map-marker-radius',
                            ),
                            2 => array(
                                'name' => 'About',
                                'url' => site_url('about'),
                                'class' => 'about',
                                'icon' => 'mdi-account-box-outline',
                            ),
                        );

                        $class = ($this->uri->segment(1)) ? $this->uri->segment(1) : 'home';
                        $title = "Home";
                        foreach ($url as $value) {
                            if (($value['class'] == $class)) {
                                $title = $value['name'];
                            }
                        ?>

                            <li class="nav-item <?= ($value['class'] == $class) ? 'active' : ''; ?>">
                                <a class="nav-link" href="<?= $value['url']; ?>" style="padding: 5px 32px;">
                                    <i class="mdi <?= $value['icon']; ?> menu-icon"></i>
                                    <span class="menu-title"><?= $value['name']; ?></span>
                                </a>
                            </li>
                        <?php
                        }
                        ?>
                    </ul>
                </div>
            </nav>
        </div>
        <!-- partial -->
        <div class="container-fluid page-body-wrapper">
            <div class="main-panel">
                <div class="content-wrapper">
                    <?php echo $template['body']; ?>
                </div>
                <!-- content-wrapper ends -->
                <!-- partial:partials/_footer.html -->
                <footer class="footer">
                    <div class="footer-wrap" style="padding: 5px 1rem;">
                        <div class="w-100 clearfix">
                            <span class="d-block text-center text-sm-left d-sm-inline-block">
                                Pudyasto Adi Wibowo
                                &copy;
                                <script>
                                    document.write(new Date().getFullYear())
                                </script>
                            </span>
                            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
                                Themes by <a href="http://www.templatewatch.com/kapella-free/template/index.html" target=" _blank">templatewatch</a>
                            </span>
                        </div>
                    </div>
                </footer>
                <!-- partial -->
            </div>
            <!-- main-panel ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <!-- inject:js -->
    <script src="<?= base_url('kapella/js/template.js'); ?>"></script>
    <!-- endinject -->
</body>

</html>