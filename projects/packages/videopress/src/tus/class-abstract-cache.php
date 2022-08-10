<?php
/**
 * Abstract Cache
 *
 * @package jetpack-videopress
 */

// phpcs:disable Squiz.Commenting.FunctionComment.MissingParamComment
namespace Automattic\Jetpack\VideoPress\Tus;

use InvalidArgumentException;

/**
 * Abstract_Cache class
 */
abstract class Abstract_Cache implements Cacheable {

	/**
	 * TTL in secs (default 1 day)
	 *
	 * @var int */
	protected $ttl = 86400;

	/**
	 * Prefix for cache keys
	 *
	 * @var string */
	protected $prefix = 'tus:';

	/**
	 * Set time to live.
	 *
	 * @param int $secs
	 *
	 * @throws InvalidArgumentException If type is not respected.
	 * @return self
	 */
	public function setTtl( $secs ) {
		if ( ! is_int( $secs ) ) {
			throw new InvalidArgumentException( '$secs needs to be an integer' );
		}
		$this->ttl = $secs;

		return $this;
	}

	/**
	 * {@inheritDoc}
	 */
	public function getTtl() {
		return $this->ttl;
	}

	/**
	 * Set cache prefix.
	 *
	 * @param string $prefix
	 *
	 * @throws InvalidArgumentException If type is not respected.
	 * @return Cacheable
	 */
	public function setPrefix( $prefix ) {
		if ( ! is_string( $prefix ) ) {
			throw new InvalidArgumentException( '$prefix needs to be a string' );
		}
		$this->prefix = $prefix;

		return $this;
	}

	/**
	 * Get cache prefix.
	 *
	 * @return string
	 */
	public function getPrefix() {
		return $this->prefix;
	}

	/**
	 * Delete all keys.
	 *
	 * @param array $keys
	 *
	 * @return bool
	 */
	public function deleteAll( array $keys ) {
		if ( empty( $keys ) ) {
			return false;
		}

		$status = true;

		foreach ( $keys as $key ) {
			$status = $status && $this->delete( $key );
		}

		return $status;
	}
}