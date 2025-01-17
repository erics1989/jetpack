<?php // phpcs:ignore WordPress.Files.FileName.InvalidClassFileName
/**
 * Extend the REST API functionality for VideoPress users.
 *
 * @package automattic/jetpack-videopress
 * @since-jetpack 7.1.0
 * @since 0.3.1
 */

namespace Automattic\Jetpack\VideoPress;

/**
 * Add per-attachment VideoPress data.
 *
 * { # Attachment Object
 *   ...
 *   jetpack_videopress: (object) VideoPress data
 *   ...
 * }
 *
 * @since 7.1.0
 */
class WPCOM_REST_API_V2_Attachment_VideoPress_Data {
	/**
	 * The REST Object Type to which the jetpack_videopress field will be added.
	 *
	 * @var string
	 */
	protected $object_type = 'attachment';

	/**
	 * The name of the REST API field to add.
	 *
	 * @var string $field_name
	 */
	protected $field_name = 'jetpack_videopress';

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_fields' ) );

		// do this again later to collect any CPTs that get registered later.
		add_action( 'restapi_theme_init', array( $this, 'register_fields' ), 20 );
	}

	/**
	 * Registers the jetpack_videopress field and adds a filter to remove it for attachments that are not videos.
	 */
	public function register_fields() {
		global $wp_rest_additional_fields;

		if ( ! empty( $wp_rest_additional_fields[ $this->object_type ][ $this->field_name ] ) ) {
			return;
		}

		register_rest_field(
			$this->object_type,
			$this->field_name,
			array(
				'get_callback'    => array( $this, 'get' ),
				'update_callback' => null,
				'schema'          => $this->get_schema(),
			)
		);

		add_filter( 'rest_prepare_attachment', array( $this, 'remove_field_for_non_videos' ), 10, 2 );
	}

	/**
	 * Defines data structure and what elements are visible in which contexts
	 */
	public function get_schema() {
		return array(
			'$schema'     => 'http://json-schema.org/draft-04/schema#',
			'title'       => $this->field_name,
			'type'        => 'object',
			'context'     => array( 'view', 'edit' ),
			'readonly'    => true,
			'description' => __( 'VideoPress Data', 'jetpack-videopress-pkg' ),
		);
	}

	/**
	 * Getter: Retrieve current VideoPress data for a given attachment.
	 *
	 * @param array           $attachment Response from the attachment endpoint.
	 * @param WP_REST_Request $request Request to the attachment endpoint.
	 *
	 * @return string
	 */
	public function get( $attachment, $request ) { // phpcs:ignore VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		if ( defined( 'IS_WPCOM' ) && IS_WPCOM ) {
			$blog_id = get_current_blog_id();
		} else {
			$blog_id = \Jetpack_Options::get_option( 'id' );
		}

		$post_id = absint( $attachment['id'] );

		$videopress = $this->get_videopress_data( $post_id, $blog_id );

		if ( ! $videopress ) {
			return array();
		}

		return $videopress;
	}

	/**
	 * Gets the VideoPress GUID for a given attachment.
	 *
	 * This is pulled out into a separate method to support unit test mocking.
	 *
	 * @param int $attachment_id Attachment ID.
	 * @param int $blog_id Blog ID.
	 *
	 * @return string
	 */
	public function get_videopress_data( $attachment_id, $blog_id ) {
		$info = video_get_info_by_blogpostid( $blog_id, $attachment_id );
		$info = video_get_info_by_blogpostid( $blog_id, $attachment_id );
		if ( defined( 'IS_WPCOM' ) && IS_WPCOM ) {
			$title       = video_get_title( $blog_id, $attachment_id );
			$description = video_get_description( $blog_id, $attachment_id );
		} else {
			$title       = $info->title;
			$description = $info->description;
		}

		return array(
			'title'           => $title,
			'description'     => $description,
			'guid'            => $info->guid,
			'rating'          => $info->rating,
			'allow_download'  =>
				isset( $info->allow_download ) && $info->allow_download ? 1 : 0,
			'privacy_setting' => ! isset( $info->privacy_setting ) ? \VIDEOPRESS_PRIVACY::SITE_DEFAULT : intval( $info->privacy_setting ),
		);
	}

	/**
	 * Checks if the given attachment is a video.
	 *
	 * @param object $attachment The attachment object.
	 *
	 * @return false|int
	 */
	public function is_video( $attachment ) {
		return isset( $attachment->post_mime_type ) && wp_startswith( $attachment->post_mime_type, 'video/' );
	}

	/**
	 * Removes the jetpack_videopress field from the response if the
	 * given attachment is not a video.
	 *
	 * @param WP_REST_Response $response Response from the attachment endpoint.
	 * @param WP_Post          $attachment The original attachment object.
	 *
	 * @return mixed
	 */
	public function remove_field_for_non_videos( $response, $attachment ) {
		if ( ! $this->is_video( $attachment ) ) {
			unset( $response->data[ $this->field_name ] );
		}

		return $response;
	}
}

if ( defined( 'IS_WPCOM' ) && IS_WPCOM ) {
	wpcom_rest_api_v2_load_plugin( 'Automattic\Jetpack\VideoPress\WPCOM_REST_API_V2_Attachment_VideoPress_Data' );
}
