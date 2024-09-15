import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorMahasiswa = ({ onChange }) => {
  return (
    <div className="App">
      <Editor
        apiKey="ijde5ilasygmo15m0nuu5cfx0f5z6olerzelozcf4i10e0r0"
        init={{
          height: 500,
          menubar: false,
          plugins: "eqneditor image media",
          toolbar:
            "eqneditor image media undo redo | formatselect bold italic backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
          branding: false,
          setup: (editor) => {
            editor.on("init", () => {});
          },
          external_plugins: {
            eqneditor: "/plugins/eqneditor.js",
          },
        }}
        onEditorChange={(content) => {
          onChange(content);
        }}
      />
    </div>
  );
};

export default EditorMahasiswa;
