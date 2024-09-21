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
          menubar: false,
          plugins: "eqneditor image media insertdatetime link autoresize code",
          toolbar:
            "customImageGallery | eqneditor image media undo redo | formatselect bold italic backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help insertdatetime link code",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: 'image',
          file_picker_callback: (callback, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            
            input.onchange = function() {
              const file = this.files[0];
              const reader = new FileReader();
              reader.onload = function(e) {
                callback(e.target.result, { alt: file.name });
              };
              reader.readAsDataURL(file);
            };
            
            input.click();
          },
          setup: (editor) => {
            editor.ui.registry.addButton('customImageGallery', {
              text: 'Image Gallery',
              onAction: () => {
                const imageList = [
                  { title: 'Local Image 1', value: 'https://w7.pngwing.com/pngs/94/824/png-transparent-square-frame-square-frame-white-thumbnail.png' },
                  { title: 'Local Image 2', value: '' },
                  { title: 'Online Image 1', value: 'https://png.pngtree.com/png-vector/20240322/ourmid/pngtree-api-application-programming-interface-software-integration-technology-png-image_12189159.png' },
                  { title: 'Online Image 2', value: 'https://www.shutterstock.com/image-vector/application-programming-interface-illustration-concept-260nw-2174940029.jpg' },
                ];

                const imageItems = imageList.map((img) => {
                  return {
                    type: 'htmlpanel',
                    html: `<img src="${img.value}" alt="${img.title}" style="width:100px;height:auto;cursor:pointer;margin:5px;" onclick="insertImage('${img.value}')"/>`,
                  };
                });

                const panel = editor.windowManager.open({
                  title: 'Select an image',
                  body: {
                    type: 'panel',
                    items: imageItems,
                  },
                  buttons: [
                    {
                      type: 'cancel',
                      text: 'Close',
                    },
                  ],
                });
                window.insertImage = (src) => {
                  editor.insertContent(`<img src="${src}" alt="Selected Image" />`);
                  panel.close(); 
                };
              },
            });
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
