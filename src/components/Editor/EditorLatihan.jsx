import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditorMahasiswa = ({ initialContent, onChange }) => {
  return (
    <div className="App">
      <Editor
        apiKey="ijde5ilasygmo15m0nuu5cfx0f5z6olerzelozcf4i10e0r0"
        value={initialContent}
        init={{
          height: 500,
          menubar: true,
          plugins: "eqneditor visualchars image table media wordcount link autoresize code pagebreak lists",
          toolbar: "undo redo customImageGallery drawioButton table | eqneditor image media numlist bullist | formatselect bold italic backcolor removeformat pagebreak | alignleft aligncenter alignright alignjustify | link outdent indent downloadImage",
          image_title: true,
          table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: (callback, value, meta) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", ".svg");

            input.onchange = function () {
              const file = this.files[0];
              const reader = new FileReader();
              reader.onload = function (e) {
                callback(e.target.result, { alt: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          },
          setup: (editor) => {
            editor.ui.registry.addButton("drawioButton", {
              text: "Insert Diagram",
              onAction: () => {
                const drawioUrl = "https://app.diagrams.net/?dev=1#R"
                const win = window.open(drawioUrl, "DrawIO", "width=1000,height=800");
                window.addEventListener("message", (event) => {
                  if (event.origin === "https://app.diagrams.net") {
                    const diagramLink = event.data; 
                    editor.insertContent(
                      `<img src="${diagramLink}" alt="Diagram from Draw.io" data-edit-url="${diagramLink}" style="max-width: 100%; height: auto;" />`
                    );

                    win.close();
                  }
                }, false);
              },
            });
            editor.ui.registry.addButton("downloadImage", {
              text: "Download Image",
              onAction: () => {
                const selectedImg = editor.selection.getNode();
                if (selectedImg.nodeName === "IMG" && selectedImg.src) {
                  const link = document.createElement('a');
                  link.href = selectedImg.src;
                  link.download = 'downloaded-image.svg'; 
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                } else {
                  alert("Silakan pilih gambar terlebih dahulu.");
                }
              },
            });

            editor.on("click", (event) => {
              const target = event.target;
              if (target.nodeName === "IMG" && target.getAttribute("data-edit-url")) {
                const editUrl = target.getAttribute("data-edit-url");
                const win = window.open(editUrl, "EditDiagram", "width=1000,height=800");
                window.addEventListener("message", (event) => {
                  if (event.origin === "https://app.diagrams.net") {
                    const updatedDiagramLink = event.data;
                    target.src = updatedDiagramLink;
                    target.setAttribute("data-edit-url", updatedDiagramLink);
                    win.close();
                  }
                }, false);
              }
            });
          },
          external_plugins: {
            eqneditor: "/plugins/eqneditor.js",
          },
          branding: false,
        }}
        onEditorChange={(content) => {
          onChange(content);
        }}
      />
    </div>
  );
};

export default EditorMahasiswa;
