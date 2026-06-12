const Loading = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 bg-white p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <div className="h-8 w-32 bg-gray-200 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Loading