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
          plugins: "eqneditor visualchars image media wordcount link autoresize code pagebreak lists",
          toolbar:
            " undo redo customImageGallery | eqneditor image media numlist bullist | formatselect bold italic backcolor removeformat pagebreak | alignleft aligncenter alignright alignjustify | link outdent indent",
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
                  { title: 'Local Image 1', value: 'https://images.vexels.com/media/users/3/139342/isolated/svg/61cddf9cfe50f4baaa8f472c253d1cb4.svg' },
                  { title: 'Local Image 2', value: 'https://png.pngtree.com/png-clipart/20200801/ourmid/pngtree-black-ring-png-image_2319165.png' },
                  { title: 'Online Image 1', value: 'https://icon2.cleanpng.com/20180723/yzl/kisspng-canvas-painting-printing-picture-frames-censored-bar-5b55c2f45195f0.7504779415323471243342.jpg' },
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
