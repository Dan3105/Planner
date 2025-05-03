import * as React from "react"
import { Link } from "react-router"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to WOW PKM</h1>
      <p className="text-muted-foreground">Your personal knowledge management workspace.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {[
          {
            title: "Getting Started",
            description: "Learn how to use WOW PKM effectively",
            href: "/getting-started"
          },
          {
            title: "Work space",
            description: "Manage your ongoing Work Space",
            href: "/workspace"
          },
          {
            title: "Notes",
            description: "Access your quick notes",
            href: "/notes"
          }
        ].map((item) => (
          <Link 
            key={item.title}
            to={item.href}
            className="block p-6 border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <h2 className="font-semibold text-lg">{item.title}</h2>
            <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
