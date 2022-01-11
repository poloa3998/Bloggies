import { Editor } from "@tinymce/tinymce-react";
import { useRef, useContext, useState } from "react";
import { PostContext } from "../context/postContext";

const CreatePost = () => {
  const { createPost } = useContext(PostContext);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
  });

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleSearch = (e) => {
    const value = e.target.value;
    setNewPost({
      ...newPost,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(newPost.title, newPost.excerpt, newPost.content);
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
    });
  };
  const parseEditorData = (content, editor) => {
    const { targetElm } = editor;
    const { name } = targetElm;

    return {
      target: {
        name,
        value: content,
      },
    };
  };
  console.log(newPost);
  return (
    <section className="min-h-screen flex items-center">
      <div className=" mt-5 p-3 pt-10  w-11/12 m-auto shadow-lg">
        <h1 className="font-Courgette text-rose-400 font-bold text-4xl text-center pb-5">
          Create a Bloggie
        </h1>
        <form className="" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <input
              type="text"
              value={newPost.title}
              className=" mb-10  w-screen max-w-xl border border-solid border-black rounded-lg text-center"
              name="title"
              placeholder="Title"
              onChange={handleSearch}
            />
          </div>
          <div className="flex justify-center">
            <textarea
              value={newPost.excerpt}
              className=" mb-10 container p-5 max-w-xl border border-solid border-black rounded-lg text-center"
              name="excerpt"
              placeholder="Summary (Max Length: 30 Words)"
              onChange={handleSearch}
            ></textarea>
          </div>
          <Editor
            className="hidden"
            apiKey={process.env.REACT_APP_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 450,
              selector: "textarea#open-source-plugins",
              plugins: [
                "print preview paste importcss searchreplace autolink autosave save directionality code",
                "visualblocks visualchars fullscreen image link media template codesample table charmap",
                "hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools",
                "textpattern noneditable help charmap quickbars emoticons",
              ],
              imagetools_cors_hosts: ["picsum.photos"],
              menubar: "file edit view insert format tools table help",
              toolbar:
                "undo redo | bold italic underline strikethrough |  numlist bullist | forecolor backcolor | alignleft aligncenter alignright alignjustify | fontselect fontsizeselect formatselect",
              toolbar_sticky: true,
              autosave_ask_before_unload: true,
              autosave_interval: "30s",
              autosave_prefix: "{path}{query}-{id}-",
              autosave_restore_when_empty: false,
              autosave_retention: "2m",
              image_advtab: true,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif,Courgette; font-size:14px }",
            }}
            value={newPost.content}
            textareaName="content"
            onEditorChange={(content, editor) => {
              handleSearch(parseEditorData(content, editor));
            }}
          />
          <div className="flex justify-center mt-5">
            <button
              type="submit"
              className="btn btn-green text-2xl"
              onClick={log}
            >
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
