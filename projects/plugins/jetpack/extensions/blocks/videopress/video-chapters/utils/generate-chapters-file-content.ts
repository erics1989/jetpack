import { extractVideoChapters } from './extract-video-chapters';

/**
 * Converts milliseconds duration to a string in the hh:mm:ss format
 *
 * @param {number} milliseconds - The duration in milliseconds
 * @returns {string}             - The formatted time
 */
function millisecondsToClockTime( milliseconds: number ) {
	const hours = Math.floor( milliseconds / 3600000 );
	let remaining = milliseconds - hours * 3600000;

	const minutes = Math.floor( remaining / 60000 );
	remaining = remaining - minutes * 60000;

	const seconds = Math.floor( remaining / 1000 );

	return [ hours, minutes, seconds ]
		.map( value => ( value < 10 ? `0${ value }` : value ) )
		.join( ':' );
}

/**
 * Generates the contents of a WebVTT file from video data
 *
 * @param {string} description   - The video description
 * @param {number} videoDuration - The video duration, in milliseconds
 * @returns {string}             - WebVTT text content
 */
export default function generateChaptersFileContent(
	description: string,
	videoDuration: number
): string {
	const chapters = extractVideoChapters( description );
	let content = 'WEBVTT\n';
	let chapterCount = 1;

	for ( const [ index, chapter ] of chapters.entries() ) {
		const startMilliseconds = index === 0 ? '000' : '001';

		const endAt =
			index < chapters.length - 1
				? chapters[ index + 1 ].startAt
				: millisecondsToClockTime( videoDuration );

		content += `\n${ chapterCount++ }\n${
			chapter.startAt
		}.${ startMilliseconds } --> ${ endAt }.000\n${ chapter.title }\n`;
	}

	return content;
}

export { millisecondsToClockTime, generateChaptersFileContent };
