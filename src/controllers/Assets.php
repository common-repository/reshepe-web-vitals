<?php

namespace reshepe\webvitals\controllers;

use reshepe\webvitals\ReshepeWebVitals;

class Assets {
    /**
     * @since 0.0.1
     */
    public function __construct(
        private readonly ReshepeWebVitals $plugin,
    ) {
        add_action('admin_enqueue_scripts', [$this, 'admin']);
        add_action('wp_enqueue_scripts', [$this, 'frontend']);
    }

    /**
     * @since 0.0.1
     */
    public function admin(): void {
        wp_register_style(
            $this->plugin->slug,
            $this->plugin->assets_url . 'css/styles.css',
            [],
            $this->plugin->version,
            'all',
        );
        wp_enqueue_style($this->plugin->slug);
    }

    /**
     * @since 0.0.1
     */
    public function frontend(): void {
        wp_register_script(
            $this->plugin->slug,
            $this->plugin->assets_url . 'js/index.global.js',
            [],
            $this->plugin->version,
            [
                'in_footer' => false,
            ],
        );
        wp_enqueue_script($this->plugin->slug);
        wp_localize_script(
            $this->plugin->slug,
            str_replace('-', '_', $this->plugin->slug) . '_config',
            [
                'version'    => $this->plugin->version,
                'api_key'    => get_option("{$this->plugin->slug}--api-key") ?: null,
                'platform'   => 'wordpress',
                'production' => get_option("{$this->plugin->slug}--developer-mode") ? 0 : 1,
            ],
        );

        if (current_user_can('manage_options') && get_option("{$this->plugin->slug}--enable-toolbar")) {
            wp_register_script(
                "{$this->plugin->slug}--toolbar",
                $this->plugin->assets_url . 'js/toolbar.global.js',
                [],
                $this->plugin->version,
                [
                    'in_footer' => true,
                ],
            );
            wp_enqueue_script("{$this->plugin->slug}--toolbar");
            wp_localize_script(
                "{$this->plugin->slug}--toolbar",
                str_replace('-', '_', "{$this->plugin->slug}-toolbar") . '_config',
                [
                    'logo_icon' => "{$this->plugin->assets_url}images/icon-128x128.png",
                ],
            );
        }
    }
}