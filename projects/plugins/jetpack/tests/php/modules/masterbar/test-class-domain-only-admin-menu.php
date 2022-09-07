<?php
/**
 * Tests for Domain_Only_Admin_Menu class.
 *
 * @package automattic/jetpack
 */

use Automattic\Jetpack\Dashboard_Customizations\Domain_Only_Admin_Menu;
use Automattic\Jetpack\Status;

require_jetpack_file( 'modules/masterbar/admin-menu/class-domain-only-admin-menu.php' );
require_jetpack_file( 'tests/php/modules/masterbar/data/admin-menu.php' );

/**
 * Class Test_Domain_Only_Admin_Menu.
 *
 * @coversDefaultClass Automattic\Jetpack\Dashboard_Customizations\Domain_Only_Admin_Menu
 */
class Test_Domain_Only_Admin_Menu extends WP_UnitTestCase {

	/**
	 * Menu data fixture.
	 *
	 * @var array
	 */
	public static $menu_data;

	/**
	 * Test domain.
	 *
	 * @var string
	 */
	public static $domain;

	/**
	 * Admin menu instance.
	 *
	 * @var Domain_Only_Admin_Menu
	 */
	public static $admin_menu;

	/**
	 * Mock user ID.
	 *
	 * @var int
	 */
	private static $user_id = 0;

	/**
	 * Create shared fixtures.
	 *
	 * @param WP_UnitTest_Factory $factory Fixture factory.
	 */
	public static function wpSetUpBeforeClass( $factory ) {
		static::$domain    = ( new Status() )->get_site_suffix();
		static::$user_id   = $factory->user->create( array( 'role' => 'administrator' ) );
		static::$menu_data = get_menu_fixture();
	}

	/**
	 * Set up data.
	 */
	public function set_up() {
		parent::set_up();
		global $menu;

		// Initialize in setUp so it registers hooks for every test.
		static::$admin_menu = Domain_Only_Admin_Menu::get_instance();

		$menu = static::$menu_data;

		wp_set_current_user( static::$user_id );
	}

	/**
	 * Tests reregister_menu_items when email subscriptions don't exist.
	 *
	 * @covers ::reregister_menu_items
	 */
	public function test_reregister_menu_items_without_email_subscriptions() {
		global $menu;

		static::$admin_menu->reregister_menu_items();

		$this->assertCount( 3, $menu );

		$this->assertEquals( 'https://wordpress.com/domains/manage/' . static::$domain . '/edit/' . static::$domain, $menu[0][2] );
		$this->assertEquals( 'https://wordpress.com/purchases/subscriptions/' . static::$domain, $menu[1][2] );
		$this->assertEquals( 'https://wordpress.com/inbox/' . static::$domain, $menu[2][2] );
	}

	/**
	 * Tests reregister_menu_items with email subscriptions .
	 *
	 * @covers ::reregister_menu_items
	 */
	public function test_reregister_menu_items_with_email_subscriptions() {
		self::createTestEmailSubscription();

		global $menu;

		static::$admin_menu->reregister_menu_items();

		$this->assertCount( 4, $menu );

		$this->assertEquals( 'https://wordpress.com/domains/manage/' . static::$domain . '/edit/' . static::$domain, $menu[0][2] );
		$this->assertEquals( 'https://wordpress.com/email/' . static::$domain . '/manage/' . static::$domain, $menu[1][2] );
		$this->assertEquals( 'https://wordpress.com/purchases/subscriptions/' . static::$domain, $menu[2][2] );
		$this->assertEquals( 'https://wordpress.com/inbox/' . static::$domain, $menu[3][2] );

		self::removeTestEmailSubscription();
	}

	private static function createTestEmailSubscription() {
		global $wpdb;

		$product_id = WPCOM_TITAN_MAIL_YEARLY;
		$meta       = 'example.com';
		$user_id    = get_current_user_id();
		$expiry     = gmdate( 'Y-m-d', strtotime( '+1 day' ) );

		$subscription_data = array(
			'user_id'      => $user_id,
			'blog_id'      => get_current_blog_id(),
			'product_id'   => $product_id,
			'meta'         => $meta,
			'expiry'       => $expiry,
			'ownership_id' => wp_rand(),
		);

		$wpdb->insert( 'store_subscriptions', $subscription_data );
	}

	private static function removeTestEmailSubscription() {
		$subscription = \get_subscription( get_current_blog_id(), get_current_user_id(), WPCOM_TITAN_MAIL_YEARLY, 'example.com' );
		if ( $subscription ) {
			$subscription->remove();
		}
	}
}
