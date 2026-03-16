"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Markdown, type MarkdownStorage } from "tiptap-markdown";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  Link as LinkIcon,
  Image as ImageIcon
} from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TiptapEditor = ({ content, onChange, placeholder = "Write your blog content here..." }: TiptapEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Markdown,
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      const storage = editor.storage as unknown as Record<string, MarkdownStorage>;
      onChange(storage.markdown.getMarkdown());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px] max-h-[600px] overflow-y-auto p-4 border rounded-md bg-white border-gray-200",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== undefined) {
      const storage = editor.storage as unknown as Record<string, MarkdownStorage>;
      if (content !== storage.markdown.getMarkdown()) {
        editor.commands.setContent(content);
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden border-gray-200 flex flex-col">
      <div className="flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-200">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          icon={<Bold size={18} />}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          icon={<Italic size={18} />}
          title="Italic"
        />
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor.isActive("heading", { level: 1 })}
          icon={<Heading1 size={18} />}
          title="Heading 1"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          icon={<Heading2 size={18} />}
          title="Heading 2"
        />
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          icon={<List size={18} />}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          icon={<ListOrdered size={18} />}
          title="Ordered List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          icon={<Quote size={18} />}
          title="Blockquote"
        />
        <div className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <ToolbarButton
          onClick={addLink}
          active={editor.isActive("link")}
          icon={<LinkIcon size={18} />}
          title="Add Link"
        />
        <ToolbarButton
          onClick={addImage}
          icon={<ImageIcon size={18} />}
          title="Add Image"
        />
        <div className="grow" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={<Undo size={18} />}
          title="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={<Redo size={18} />}
          title="Redo"
        />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

interface ToolbarButtonProps {
  onClick: () => void;
  active?: boolean;
  icon: React.ReactNode;
  title: string;
}

const ToolbarButton = ({ onClick, active, icon, title }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-2 rounded hover:bg-gray-200 transition-colors ${
      active ? "bg-gray-200 text-blue-600" : "text-gray-600"
    }`}
    title={title}
  >
    {icon}
  </button>
);

export default TiptapEditor;
