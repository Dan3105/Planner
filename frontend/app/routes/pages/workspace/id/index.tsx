import { useParams, useNavigate } from "react-router";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "~/components/ui/card";
import { useGetWorkspaceById } from "~/api/workspace/read/useGetWorkspaceById";

export default function WorkspaceDetailPage() {
  const { workspaceId } = useParams();
  const navigate = useNavigate();
  
  // Fetch workspace data
  const { data: workspace, isLoading } = useGetWorkspaceById(workspaceId as string);

  if (isLoading) {
    return <div>Loading workspace content...</div>;
  }
  
  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  // Navigate to page details
  const handlePageClick = (pageId: string) => {
    navigate(`/pages/${pageId}`);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">{workspace.title}</h1>
      </div>

      {workspace.pages.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No pages yet. Create your first page by clicking the "Add Page" button in the sidebar.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspace.pages.map((page) => (
            <Card
              key={page.id}
              className="cursor-pointer hover:bg-accent/50 transition-colors"
              onClick={() => handlePageClick(page.id)}
            >
              <CardHeader>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>
                  Created: {new Date(page.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
