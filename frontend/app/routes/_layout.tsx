import * as React from "react"
import { Outlet, Link, useNavigate, useLocation } from "react-router"
import { PlusIcon, HomeIcon, SearchIcon, SettingsIcon } from "lucide-react"

import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarInput,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "~/components/ui/sidebar"
import { Button } from "~/components/ui/button"

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <MainLayout />
    </SidebarProvider>
  )
}

function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  
  return (
    <>
      <Sidebar variant="floating" side="left">
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              type="button"
              className="justify-start gap-2 h-10"
              onClick={() => navigate("/")}
            >
              <span className="font-semibold">WOW PKM</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
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
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {/* Example pages - would be dynamically loaded in a real app */}
                {["Getting Started", "Workspace", "Projects", "Notes"].map((page) => (
                  <SidebarMenuItem key={page}>
                    <SidebarMenuButton 
                      isActive={location.pathname === `/${page.toLowerCase().replace(/\s+/g, "-")}`}
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
      
      <SidebarInset className="p-4 md:p-6">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <SidebarTrigger />
              {/* Breadcrumb would go here */}
            </div>
          </div>
        </div>
        
        <main className="max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </SidebarInset>
    </>
  )
}
