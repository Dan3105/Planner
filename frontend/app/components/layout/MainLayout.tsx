import * as React from "react"
import { Outlet, useNavigate, useLocation } from "react-router"
import { PlusIcon, HomeIcon, SearchIcon, SettingsIcon } from "lucide-react"

import { useSidebar, SidebarProvider, Sidebar, SidebarContent, SidebarHeader, 
  SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, 
  SidebarTrigger, SidebarInset, SidebarInput, SidebarGroup, 
  SidebarGroupLabel, SidebarGroupContent } from "~/components/ui/sidebar"
import { Button } from "~/components/ui/button"
import { cn } from "~/lib/utils"

type MainLayoutProps = {
  className?: string
}

function MainLayoutContent({ className }: MainLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleSidebar } = useSidebar()
  
  return (
    <>
      <Sidebar variant="floating" side="left">
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2 h-10"
              onClick={() => navigate("/")}
            >
              <span className="font-semibold">WOW PKM</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-7" 
              onClick={() => navigate("/new")}
            >
              <PlusIcon className="size-4" />
              <span className="sr-only">New Page</span>
            </Button>
          </div>
          <SidebarInput type="text" placeholder="Search..." />
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    isActive={location.pathname === "/"} 
                    onClick={() => navigate("/")}
                    tooltip="Home"
                  >
                    <HomeIcon />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate("/search")}
                    tooltip="Search"
                  >
                    <SearchIcon />
                    <span>Search</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent>
              {/* Pages would be dynamically loaded here */}
              <SidebarMenu>
                {/* Example static pages for now */}
                {["Getting Started", "Tasks", "Projects", "Notes"].map((page) => (
                  <SidebarMenuItem key={page}>
                    <SidebarMenuButton 
                      onClick={() => navigate(`/${page.toLowerCase().replace(/\s+/g, "-")}`)}
                    >
                      <span>{page}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start gap-2"
            onClick={() => navigate("/settings")}
          >
            <SettingsIcon className="size-4" />
            <span>Settings</span>
          </Button>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className={cn("p-4 md:p-6", className)}>
        {/* Page header with breadcrumbs could go here */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <SidebarTrigger />
              {/* Breadcrumbs would go here */}
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="max-w-5xl w-full mx-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </>
  )
}

export function MainLayout({ className }: MainLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainLayoutContent className={className} />
    </SidebarProvider>
  )
}
