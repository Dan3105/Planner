import { LucideFileText } from "lucide-react";
import { useParams } from "react-router";
import { useGetPageContent } from "~/api/workspace/read/useGetPageContent";

export default function WorkspacePage() {
  const { pageId } = useParams();
  const { data: page, isLoading } = useGetPageContent(pageId as string)
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <LucideFileText className="w-6 h-6" /> <p>{page?.title}</p>
      </div>
    </div>
  );
}
