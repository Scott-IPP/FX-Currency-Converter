<?php
// If uninstall not called from WordPress exit
if (!defined('WP_UNINSTALL_PLUGIN'))
  exit();

delete_option('ipp_currency_converter');
