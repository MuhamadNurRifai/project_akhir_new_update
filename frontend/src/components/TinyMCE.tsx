import React from "react";
import { Editor } from "@tinymce/tinymce-react";

interface TinyMCEProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
}

const TinyMCE: React.FC<TinyMCEProps> = ({ value, onChange, height = 300 }) => {
  return (
    <Editor
      apiKey="ieu06mnezg6g69gniavhf5u8nceazats4uk2rtf42srz9xml"
      value={value}
      init={{
        height,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
      }}
      onEditorChange={(newValue) => onChange(newValue)}
    />
  );
};

export default TinyMCE;
