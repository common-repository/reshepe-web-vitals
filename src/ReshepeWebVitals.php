<?php

namespace reshepe\webvitals;

use Composer\InstalledVersions;
use reshepe\webvitals\controllers\Assets;
use reshepe\webvitals\controllers\menu\Menu;

class ReshepeWebVitals {
    public string $name;

    public string $slug;

    public string $author;

    public string $website;

    public string $version;

    public string $assets_dir;

    public string $assets_url;

    public string $views_dir;

    public Menu $menu;

    public Assets $assets;

    private static ReshepeWebVitals $instance;

    protected function __construct() {
        $this->name       = 'reshepe web vitals';
        $this->slug       = 'reshepe-web-vitals';
        $this->author     = 'reshepe';
        $this->website    = 'https://reshepe.dev';
        $this->version    = InstalledVersions::getRootPackage()['pretty_version'];
        $this->assets_dir = plugin_dir_path(__FILE__) . '../assets/';
        $this->assets_url = plugin_dir_url(__FILE__) . '../assets/';
        $this->views_dir  = plugin_dir_path(__FILE__) . 'views/';
        $this->menu       = new Menu($this);
    }

    /**
     * @since 0.0.1
     */
    public function __clone(): void {
        _doing_it_wrong(
            __FUNCTION__,
            esc_html__('cloning of reshepe web vitals is forbidden', 'reshepe-web-vitals'),
            esc_attr($this->version),
        );
    }

    /**
     * @since 0.0.1
     */
    public function __wakeup(): void {
        _doing_it_wrong(
            __FUNCTION__,
            esc_html__('unserializing of reshepe web vitals is forbidden', 'reshepe-web-vitals'),
            esc_attr($this->version),
        );
    }

    /**
     * @since 0.0.1
     */
    public static function getInstance(): self {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * @since 0.0.1
     */
    public function activation(): void {
        // nothing to do yet
    }

    /**
     * @since 0.0.1
     */
    public function deactivation(): void {
        flush_rewrite_rules();
    }

    /**
     * @since 0.0.1
     */
    public static function uninstall(): void {
        $slug = 'reshepe-web-vitals';

        delete_option("{$slug}--api-key");
        delete_option("{$slug}--enable-toolbar");
        delete_option("{$slug}--developer-mode");
    }

    /**
     * @since 0.0.1
     */
    public function init(): void {
        $this->assets = new Assets($this);
    }
}

