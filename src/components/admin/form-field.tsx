interface FormFieldProps {
  label: string;
  id: string;
  children: React.ReactNode;
}

export default function FormField({ label, id, children }: FormFieldProps) {
  return (
    <div className='grid grid-cols-[1fr_4fr] t-m-16 divide-x divide-btn-gray-d bg-white hover:bg-primary/10'>
      <label
        htmlFor={id}
        className='min-h-[44px] flex items-center justify-center text-center t-b-14 bg-bg-gray-fa whitespace-pre'
      >
        {label}
      </label>
      <div className='min-h-[44px] flex items-center justify-center t-r-14'>
        {children}
      </div>
    </div>
  );
}
