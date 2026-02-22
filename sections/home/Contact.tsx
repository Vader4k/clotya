import { contactData } from "@/constants"

const Contact = () => {
  return (
    <section className="mb-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 font-jost">
        {contactData.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <item.icon strokeWidth={0.5} className="size-13 text-black" />
            <div className="grid gap-1">
              <h3 className="text-lg font-medium capitalize">{item.title}</h3>
              <p className="text-sm text-gray-600 font-light font-inter max-w-40">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Contact