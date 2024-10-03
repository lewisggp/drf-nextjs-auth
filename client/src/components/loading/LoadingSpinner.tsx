export default function LoadingSpinner() {
	return (
		<div className='flex flex-col items-center'>
			<div className='w-8 h-8 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-2'></div>
		</div>
	);
}
