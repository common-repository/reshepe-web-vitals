<?php

namespace reshepe\webvitals\controllers\menu;

use reshepe\webvitals\ReshepeWebVitals;

class Menu {
    /**
     * @since 0.0.1
     */
    public function __construct(
        private readonly ReshepeWebVitals $plugin,
    ) {
        add_action('init', [$this, 'init']);
    }

    /**
     * @since 0.0.1
     */
    public function init(): void {
        add_action('admin_menu', [$this, 'menu']);

        new Settings($this->plugin);
    }

    /**
     * @since 0.0.1
     */
    public function menu(): void {
        add_menu_page(
            $this->plugin->author,
            $this->plugin->author,
            'manage_options',
            $this->plugin->slug,
            [$this, 'view'],
            $this->plugin->assets_url . 'images/icon.png',
            90,
        );
    }

    /**
     * @since 0.0.1
     */
    public function view(): void {
        ?>
        <section class="bg-reshepe-bg-500">
            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-reshepe-text-500 md:text-5xl lg:text-6xl">
                    <?php echo esc_html__(
                        'reshepe',
                        'reshepe-web-vitals',
                    ); ?>
                </h1>
                <p class="mb-8 text-lg font-normal text-reshepe-text-700 lg:text-xl sm:px-16 lg:px-48">
                    <?php echo esc_html__(
                        'monitor core web vitals on your website',
                        'reshepe-web-vitals',
                    ); ?>
                </p>
                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <a href="https://reshepe.dev"
                       target="_blank"
                       class="py-3 px-5 text-sm font-medium text-reshepe-text-700 focus:outline-none rounded-lg border border-gray-200 hover:text-reshepe-text-500 focus:z-10 focus:ring-4 focus:ring-gray-100 no-underline">
                        <?php echo esc_html__('learn more', 'reshepe-web-vitals'); ?>
                    </a>
                    <a href="https://dashboard.reshepe.dev"
                       target="_blank"
                       class="py-3 px-5 sm:ms-4 inline-flex justify-center items-center text-base font-medium text-center text-reshepe-primary-700 rounded-lg bg-reshepe-bg-700 hover:text-reshepe-primary-500 hover:bg-reshepe-bg-900 focus:ring-4 focus:ring-blue-300 no-underline">
                        <?php echo esc_html__('sign up', 'reshepe-web-vitals'); ?>
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 14 10">
                            <path stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
        <div class="grid mb-0 border border-reshepe-bg-700 shadow-sm md:grid-cols-2 bg-reshepe-bg-500">
            <figure class="flex flex-col items-center justify-center p-8 text-center bg-reshepe-bg-700 border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
                <blockquote class="max-w-2xl mx-auto mb-4 text-reshepe-text-500 lg:mb-8">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        <?php echo esc_html__(
                            'visit your dashboard to see the metrics',
                            'reshepe-web-vitals',
                        ); ?>
                    </h3>
                    <p class="my-4 text-reshepe-text-700">
                        <?php echo esc_html__(
                            "if you don't have an account, you can sign up for free",
                            'reshepe-web-vitals',
                        ); ?>
                    </p>
                </blockquote>
                <a href="https://dashboard.reshepe.dev"
                   target="_blank"
                   class="py-3 px-5 sm:ms-4 inline-flex justify-center items-center text-base font-medium text-center text-reshepe-primary-700 rounded-lg bg-reshepe-bg-900 hover:text-reshepe-primary-500 hover:bg-reshepe-bg-900 focus:ring-4 focus:ring-blue-300 no-underline">
                    <?php echo esc_html__('go to dashboard', 'reshepe-web-vitals'); ?>
                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 14 10">
                        <path stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </figure>
            <figure class="flex flex-col items-center justify-center p-8 text-center bg-reshepe-bg-700 border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
                <blockquote class="max-w-2xl mx-auto mb-4 text-reshepe-text-500 lg:mb-8">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        <?php echo esc_html__(
                            'manage plugin settings',
                            'reshepe-web-vitals',
                        ); ?>
                    </h3>
                    <p class="my-4 text-reshepe-text-700">
                        <?php echo esc_html__(
                            'enable or disable toolbar, update api key and more',
                            'reshepe-web-vitals',
                        ); ?>
                    </p>
                </blockquote>
                <a href="<?php echo esc_url(admin_url('admin.php?page=reshepe-web-vitals-settings')); ?>"
                   class="py-3 px-5 sm:ms-4 inline-flex justify-center items-center text-base font-medium text-center text-reshepe-primary-700 rounded-lg bg-reshepe-bg-900 hover:text-reshepe-primary-500 hover:bg-reshepe-bg-900 focus:ring-4 focus:ring-blue-300 no-underline">
                    <?php echo esc_html__('settings', 'reshepe-web-vitals'); ?>
                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 14 10">
                        <path stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </figure>
            <figure class="flex flex-col items-center justify-center p-8 text-center bg-reshepe-bg-700 border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e">
                <blockquote class="max-w-2xl mx-auto mb-4 text-reshepe-text-500 lg:mb-8">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        <?php echo esc_html__(
                            'need help?',
                            'reshepe-web-vitals',
                        ); ?>
                    </h3>
                    <p class="my-4 text-reshepe-text-700">
                        <?php echo esc_html__(
                            'check out the documentation',
                            'reshepe-web-vitals',
                        ); ?>
                    </p>
                </blockquote>
                <a href="https://docs.reshepe.dev/web-vitals/wordpress"
                   class="py-3 px-5 sm:ms-4 inline-flex justify-center items-center text-base font-medium text-center text-reshepe-primary-700 rounded-lg bg-reshepe-bg-900 hover:text-reshepe-primary-500 hover:bg-reshepe-bg-900 focus:ring-4 focus:ring-blue-300 no-underline">
                    <?php echo esc_html__('documentation', 'reshepe-web-vitals'); ?>
                    <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                         aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         viewBox="0 0 14 10">
                        <path stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </figure>
        </div>
        <?php
    }
}