export default function Footer() {
  return (
    <div className='bg-blue-800 py-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <span className='te3xl font-bold text-white tracking-tight'>
          MernHolidays.com
        </span>
        <span className='text-white font-bold tracking-tight flex gap-4'>
          <p className='cursor-pointer'>Privacy Policy</p>
          <p className='cursor-pointer'>Terms of Service</p>
        </span>
      </div>
    </div>
  );
}
