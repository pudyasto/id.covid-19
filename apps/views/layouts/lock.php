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
    <!-- endinject -->
    <script src="<?= base_url('kapella/js/my.js'); ?>" type="text/javascript"></script>
</head>

<body>
    <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
            <div class="content-wrapper d-flex align-items-center auth lock-full-bg">
                <?php echo $template['body']; ?>
            </div>
            <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
    <!-- base:js -->
    <!-- endinject -->
    <!-- inject:js -->
    <script src="<?= base_url('kapella/js/template.js'); ?>"></script>
    <!-- endinject -->
</body>

</html>