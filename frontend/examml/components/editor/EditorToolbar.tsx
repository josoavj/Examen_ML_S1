import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  const toggleConfig = [
    {
      icon: <Bold size={16} />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
      disabled: !editor.can().chain().focus().toggleBold().run(),
    },
    {
      icon: <Italic size={16} />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <Strikethrough size={16} />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <Code size={16} />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
  ];

  const headingConfig = [
    {
      icon: <Heading1 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    },
    {
      icon: <Heading2 size={16} />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    },
    {
      icon: <p className="font-bold text-sm">P</p>,
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive('paragraph'),
    },
  ];

  const listConfig = [
    {
      icon: <List size={16} />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      icon: <ListOrdered size={16} />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    {
      icon: <Quote size={16} />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
  ];

  const ToolbarDivider = () => <div className="mx-1 h-5 w-px bg-neutral-800 flex-shrink-0" />;

  return (
    <div className="flex items-center gap-1 p-2 bg-neutral-900 border-b border-neutral-800 w-full overflow-x-auto flex-shrink-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      
      {/* Undo / Redo */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <Redo size={16} />
        </button>
      </div>

      <ToolbarDivider />

      {/* Headings */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {headingConfig.map((item, idx) => (
          <button
            key={idx}
            onClick={item.onClick}
            className={cn(
              "p-1.5 rounded transition-colors flex items-center justify-center w-8 h-8",
              item.isActive 
                ? "bg-blue-500/20 text-blue-400 font-bold" 
                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            )}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <ToolbarDivider />

      {/* Toggles (Bold, Italic, Strike, Code) */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {toggleConfig.map((item, idx) => (
          <button
            key={idx}
            onClick={item.onClick}
            disabled={item.disabled}
            className={cn(
              "p-1.5 rounded transition-colors flex items-center justify-center w-8 h-8 disabled:opacity-50",
              item.isActive 
                ? "bg-blue-500/20 text-blue-400" 
                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            )}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <ToolbarDivider />

      {/* Lists & Quotes */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {listConfig.map((item, idx) => (
          <button
            key={idx}
            onClick={item.onClick}
            className={cn(
              "p-1.5 rounded transition-colors flex items-center justify-center w-8 h-8",
              item.isActive 
                ? "bg-blue-500/20 text-blue-400" 
                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            )}
          >
            {item.icon}
          </button>
        ))}
      </div>

      <ToolbarDivider />

      {/* Alignment (Text Align extension needed) */}
      <div className="flex items-center gap-1 flex-shrink-0">
         <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={cn(
              "p-1.5 rounded transition-colors w-8 h-8 flex items-center justify-center",
              editor.isActive({ textAlign: 'left' }) ? "bg-blue-500/20 text-blue-400" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            )}
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={cn(
              "p-1.5 rounded transition-colors w-8 h-8 flex items-center justify-center",
              editor.isActive({ textAlign: 'center' }) ? "bg-blue-500/20 text-blue-400" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            )}
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={cn(
              "p-1.5 rounded transition-colors w-8 h-8 flex items-center justify-center",
              editor.isActive({ textAlign: 'right' }) ? "bg-blue-500/20 text-blue-400" : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            )}
          >
            <AlignRight size={16} />
          </button>
      </div>
    </div>
  );
}
