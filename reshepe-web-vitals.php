<?php
/**
 * reshepe web vitals.
 *
 * @author    reshepe <hello@reshepe.dev>
 *
 * @see       https://reshepe.dev
 *
 * @copyright reshepe
 *
 * @wordpress-plugin
 * Plugin Name: reshepe web vitals
 * Description: monitor core web vitals on your website
 * Version: 0.0.35
 * Author: reshepe
 * Author URI: https://reshepe.dev
 * Requires PHP: 8.2
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 */

use reshepe\webvitals\ReshepeWebVitals;

if (!defined('ABSPATH')) {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

$plugin = ReshepeWebVitals::getInstance();

register_activation_hook(__FILE__, [$plugin, 'activation']);
register_deactivation_hook(__FILE__, [$plugin, 'deactivation']);
register_uninstall_hook(__FILE__, [ReshepeWebVitals::class, 'uninstall']);

add_action('plugins_loaded', [$plugin, 'init']);

