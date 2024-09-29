import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import persegipanjang from '../assets/persegiempat1.png';
import lingkaran from '../assets/lingkaran.png';
import oval from '../assets/oval.png';
import persegiempat from '../assets/persegiempat.png';
import segitiga from '../assets/segitiga.png';

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
                  { title: 'Local Image 1', value: persegipanjang },
                  { title: 'Local Image 2', value: oval},
                  { title: 'Online Image 1', value: lingkaran},
                  { title: 'Online Image 2', value: segitiga},
                  { title: 'Online Image 3', value: persegiempat},
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
