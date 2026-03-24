import { EditorContent, type Editor } from "@tiptap/react";
import { EditorToolbar } from "./EditorToolbar";

interface TipTapEditorProps {
  editor: Editor | null;
}

export function TipTapEditor({ editor }: TipTapEditorProps) {
  return (
    <div className="flex flex-col h-full bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
      <EditorToolbar editor={editor} />
      
      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto w-full p-4 sm:p-8 md:p-12 relative flex justify-center bg-[#0a0a0a]">
        <div className="w-full max-w-3xl lg:max-w-4xl bg-neutral-900 border border-neutral-800 shadow-xl rounded-lg min-h-[800px] p-8 md:p-12 lg:p-16 relative">
          <EditorContent 
            editor={editor} 
            className="prose prose-invert prose-blue max-w-none focus:outline-none min-h-full prose-headings:font-bold prose-p:leading-relaxed prose-a:text-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
