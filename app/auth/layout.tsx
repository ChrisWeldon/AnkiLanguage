export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode,
}) {
  return (
    <section className="min-h-full flex flex-col xl:flex-row-reverse items-center">
      {/* Include shared UI here e.g. a header or sidebar */}
        <div className='h-screen xl:h-auto flex lined flex-col items-center '>
            {children}
            <div className="h-64 xl:h-32">
            </div>
            <div>
                <p>Chris W. Evans</p>
                <a>chriswevans.com</a>
            </div>
        </div>
    </section>
  );
}

