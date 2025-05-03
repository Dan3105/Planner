import { Link } from "react-router"

export default function PagesIndex() {
  // In a real app, you'd fetch these pages from your database
  const pages = [
    { id: "getting-started", title: "Getting Started" },
    { id: "work-space", title: "Work space" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">All Pages</h1>
      
      <div className="space-y-2">
        {pages.map(page => (
          <Link 
            key={page.id}
            to={`/${page.id}`}
            className="flex items-center p-3 rounded-md hover:bg-accent/50 transition-colors"
          >
            <div>
              <h2 className="text-lg font-medium">{page.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
