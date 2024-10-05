import { EditorState, ContentState } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "./editor.css";

function Form() {
  const defaultTitle = "Untitled form";
  const defaultDesc = "Form description";

  const [titleEditorState, setTitleEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(defaultTitle))
  );
  const [descEditorState, setDescEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(defaultDesc))
  );

  const [currentInlineStyles, setCurrentInlineStyles] = useState([]);

  const onTitleEditorStateChange = (editorState) => {
    setTitleEditorState(editorState);
    const styles = editorState.getCurrentInlineStyle().toArray();
    setCurrentInlineStyles(styles);
  };

  const onDescEditorStateChange = (editorState) => {
    setDescEditorState(editorState);
  };

  return (
    <>
      <div className="container">
        <div className="w-full py-6">
          <form>
            <div className="p-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl border-x-2 border-gray-800">
              <div>
                <Editor
                  id="title"
                  editorState={titleEditorState}
                  wrapperClassName="wrapper-class text-3xl"
                  editorClassName="editor-class"
                  onEditorStateChange={onTitleEditorStateChange}
                  toolbar={{
                    options: ["inline"],
                    inline: {
                      options: ["bold", "italic", "underline"],
                      bold: {
                        className: currentInlineStyles.includes("BOLD") ? "my-custom-class active" : "my-custom-class",
                      },
                      italic: {
                        className: currentInlineStyles.includes("ITALIC") ? "my-custom-class active" : "my-custom-class",
                      },
                      underline: {
                        className: currentInlineStyles.includes("UNDERLINE") ? "my-custom-class active" : "my-custom-class",
                      },
                    },
                  }}
                  toolbarOnFocus={true}
                />
              </div>

              <div className="mt-2">
                <Editor
                  id="description"
                  editorState={descEditorState}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  onEditorStateChange={onDescEditorStateChange}
                  toolbar={{
                    options: ["inline"],
                    inline: {
                      options: ["bold", "italic", "underline"],
                      bold: {
                        className: currentInlineStyles.includes("BOLD") ? "my-custom-class active" : "my-custom-class",
                      },
                      italic: {
                        className: currentInlineStyles.includes("ITALIC") ? "my-custom-class active" : "my-custom-class",
                      },
                      underline: {
                        className: currentInlineStyles.includes("UNDERLINE") ? "my-custom-class active" : "my-custom-class",
                      },
                    },
                  }}
                  toolbarOnFocus={true}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
