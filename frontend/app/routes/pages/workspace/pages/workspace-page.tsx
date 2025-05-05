import {
  LucideFileText,
  LucideChevronDown,
  LucideCalendar,
  LucideMoreHorizontal,
  LucideCheck,
  LucideShare2,
  MessageCircleMoreIcon,
} from "lucide-react";
import { useParams } from "react-router";
import { useGetPageContent } from "~/api/workspace/read/useGetPageContent";
import { useUpdatePageContent } from "~/api/workspace/write/useUpdatePageContent";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

// Extracted smaller components
const PageLoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 w-64 bg-gray-200 rounded mb-6"></div>
    <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>
    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
  </div>
);

interface PageHeaderProps {
  title: string;
  onTitleChange: () => void;
}

const PageHeader = ({ title, onTitleChange }: PageHeaderProps) => (
  <div className="flex items-center gap-2 mb-2 group">
    <div className="flex items-center justify-center w-10 h-10 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer">
      <LucideFileText className="w-6 h-6 text-gray-600" />
    </div>
    <input
      type="text"
      className="text-4xl font-bold outline-none border-none w-full bg-transparent"
      defaultValue={title}
      onChange={onTitleChange}
      placeholder="Untitled"
    />
  </div>
);

interface PageMetadataProps {
  lastEdited: string;
  onSave: () => void;
  hasChanges: boolean;
}

const PageMetadata = ({ lastEdited, onSave, hasChanges }: PageMetadataProps) => (
  <div className="flex flex-wrap text-sm text-gray-500 items-center mb-6 ml-10 gap-4">
    <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-md transition">
      <span>Draft</span>
      <LucideChevronDown className="w-4 h-4" />
    </button>

    <div className="h-3 w-px bg-gray-300"></div>

    <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-md transition">
      <LucideCalendar className="w-4 h-4" />
      <span>Today</span>
    </button>

    <div className="h-3 w-px bg-gray-300"></div>

    <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-md transition">
      <LucideCheck className="w-4 h-4" />
      <span>0/4</span>
    </button>

    <div className="h-3 w-px bg-gray-300"></div>

    <span className="text-gray-400">Edited {lastEdited}</span>

    <div className="flex-grow"></div>

    <button 
      type="button"
      onClick={onSave}
      className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-md hover:bg-primary/90 transition relative"
    >
      Save
      {hasChanges && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      )}
    </button>

    <button className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded-md transition">
      <MessageCircleMoreIcon className="w-4 h-4" />
    </button>

    <button className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded-md transition">
      <LucideShare2 className="w-4 h-4" />
    </button>

    <button className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded-md transition">
      <LucideMoreHorizontal className="w-4 h-4" />
    </button>
  </div>
);

// Function to format date to relative time
const formatRelativeTime = (date: Date | undefined): string => {
  if (!date) return "never";
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return new Date(date).toLocaleDateString();
};

export default function WorkspacePage() {
  const { pageId } = useParams();
  const { data: page, isLoading } = useGetPageContent(pageId as string);
  const updatePageMutation = useUpdatePageContent();
  const editor = useCreateBlockNote({
    initialContent: page?.content ? JSON.parse(page?.content) : undefined,
  });
  const [hasChanges, setHasChanges] = useState(false);

  // Set up a change detector whenever editor is ready
  useEffect(() => {
    if (editor) {
      const unsubscribe = editor.onChange(() => {
        setHasChanges(true);
      });
      
      // Return the unsubscribe function to clean up on unmount or when editor changes
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [editor]);

  const onSave = async () => {
    if (!pageId || !editor) return;
    
    try {
      // Get current content from editor and save it
      const content = JSON.stringify(editor.document);
      await updatePageMutation.mutateAsync({ 
        id: pageId, 
        content 
      });
      
      // Reset indicators
      setHasChanges(false);

      toast.success("Page saved successfully", {
        description: "Your changes have been saved",
        position: "bottom-right",
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to save page content:", error);
    }
  }

  const handleTitleChange = () => {
    setHasChanges(true);
  };

  return (
    <div className="overflow-auto">
      {/* Main content */}
      <div className="mx-auto">
        {isLoading ? (
          <PageLoadingSkeleton />
        ) : (
          <>
            <PageHeader 
              title={page?.title || "Untitled"} 
              onTitleChange={handleTitleChange}
            />

            <PageMetadata 
              lastEdited={formatRelativeTime(page?.updatedAt)}
              onSave={onSave}
              hasChanges={hasChanges}
            />

            {/* Content area */}
            <div className="w-full border-t pt-4">
              <BlockNoteView
                editor={editor}
                theme={"light"}
                className="min-h-[500px] prose max-w-none"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
