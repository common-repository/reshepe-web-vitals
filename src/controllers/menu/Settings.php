<?php

namespace reshepe\webvitals\controllers\menu;

use reshepe\webvitals\ReshepeWebVitals;

class Settings {
    /**
     * @since 0.0.1
     */
    public function __construct(
        private readonly ReshepeWebVitals $plugin,
    ) {
        add_action('admin_menu', [$this, 'menu']);
        add_action('admin_init', [$this, 'init']);

        add_filter("plugin_action_links_{$this->plugin->slug}/{$this->plugin->slug}.php", [$this, 'settings_link']);
    }

    /**
     * @since 0.0.1
     */
    public function settings_link(array $links): array {
        $links[] = sprintf(
            '<a href="%s">%s</a>',
            esc_url(admin_url("admin.php?page={$this->plugin->slug}-settings")),
            esc_html__('settings', 'reshepe-web-vitals'),
        );

        return $links;
    }

    /**
     * @since 0.0.1
     */
    public function init(): void {
        register_setting($this->plugin->author, "{$this->plugin->slug}--api-key");
        register_setting($this->plugin->author, "{$this->plugin->slug}--enable-toolbar");
        register_setting($this->plugin->author, "{$this->plugin->slug}--developer-mode");

        add_settings_section(
            "{$this->plugin->slug}-settings",
            esc_html__('reshepe web vitals - settings', 'reshepe-web-vitals'),
            [$this, 'section'],
            "{$this->plugin->slug}-settings",
            [
                'info' => esc_html__('configure reshepe web vitals', 'reshepe-web-vitals'),
            ]
        );

        add_settings_field(
            "{$this->plugin->slug}--api-key",
            esc_html__('api key', 'reshepe-web-vitals'),
            [$this, 'field_text'],
            "{$this->plugin->slug}-settings",
            "{$this->plugin->slug}-settings",
            [
                'name'      => esc_html__('api key', 'reshepe-web-vitals'),
                'info'      => esc_html__('put your public api key here', 'reshepe-web-vitals'),
                'label_for' => "{$this->plugin->slug}--api-key",
                'value'     => get_option("{$this->plugin->slug}--api-key"),
            ]
        );

        add_settings_field(
            "{$this->plugin->slug}--enable-toolbar",
            esc_html__('enable toolbar for admins', 'reshepe-web-vitals'),
            [$this, 'field_checkbox'],
            "{$this->plugin->slug}-settings",
            "{$this->plugin->slug}-settings",
            [
                'name'      => esc_html__('enable toolbar for admins', 'reshepe-web-vitals'),
                'info'      => esc_html__('show toolbar on the page', 'reshepe-web-vitals'),
                'label_for' => "{$this->plugin->slug}--enable-toolbar",
                'value'     => get_option("{$this->plugin->slug}--enable-toolbar"),
            ],
        );

        add_settings_field(
            "{$this->plugin->slug}--developer-mode",
            esc_html__('developer mode', 'reshepe-web-vitals'),
            [$this, 'field_checkbox'],
            "{$this->plugin->slug}-settings",
            "{$this->plugin->slug}-settings",
            [
                'name'      => esc_html__('developer mode', 'reshepe-web-vitals'),
                'info'      => esc_html__('enable developer mode', 'reshepe-web-vitals'),
                'label_for' => "{$this->plugin->slug}--developer-mode",
                'value'     => get_option("{$this->plugin->slug}--developer-mode"),
            ],
        );
    }

    /**
     * @since 0.0.1
     */
    public function section(array $args): void {
        // nothing here
    }

    /**
     * @since 0.0.1
     */
    public function field_text(array $args): void {
        ?>
        <div>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="<?php echo esc_attr($args['label_for']); ?>"
                   name="<?php echo esc_attr($args['label_for']); ?>"
                   value="<?php echo esc_attr($args['value']); ?>"
                   type="text">
            <p class="description"><?php echo esc_html($args['info']); ?></p>
        </div>
        <?php
    }

    /**
     * @since 0.0.1
     */
    public function field_checkbox(array $args): void {
        ?>
        <div>
            <input class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                   id="<?php echo esc_attr($args['label_for']); ?>"
                   name="<?php echo esc_attr($args['label_for']); ?>"
                   value="1"
                   type="checkbox"
                <?php checked(1, $args['value']); ?>>
            <p class="description"><?php echo esc_html($args['info']); ?></p>
        </div>
        <?php
    }

    /**
     * @since 0.0.1
     */
    public function menu(): void {
        add_submenu_page(
            $this->plugin->slug,
            esc_html__('reshepe web vitals - settings', 'reshepe-web-vitals'),
            esc_html__('settings', 'reshepe-web-vitals'),
            'manage_options',
            "{$this->plugin->slug}-settings",
            [$this, 'view'],
        );
    }

    /**
     * @since 0.0.1
     */
    public function view(): void {
        if (!current_user_can('manage_options')) {
            return;
        }

        if (isset($_GET['settings-updated'])) {
            add_settings_error(
                $this->plugin->slug,
                'settings-updated',
                esc_html__('settings saved', 'reshepe-web-vitals'),
                'updated'
            );
        }

        settings_errors($this->plugin->slug);

        ?>
        <div class="wrap">
            <form action="options.php"
                  method="post">
                <?php

                wp_nonce_field('reshepe-web-vitals-settings', 'reshepe-web-vitals-settings-nonce');
        do_settings_sections("{$this->plugin->slug}-settings");
        settings_fields($this->plugin->author);
        submit_button('save');
        ?>
            </form>
        </div>
        <?php
    }
}