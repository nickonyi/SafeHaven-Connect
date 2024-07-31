import { useState } from 'react';
import './CreatePage.scss'
import Editor from '../editor/Editor';
import 'react-quill/dist/quill.snow.css';
import {Navigate} from "react-router-dom";
import { makeRequest } from '../../axios';


function CreateBlog() {
const [title, setTitle] = useState('');
const [author,setAuthor] = useState('');
const [summary, setSummary] = useState('');
const [content, setContent] = useState('');
const [files, setFiles] = useState([]);
const [redirect,setRedirect] = useState(false);


const upload = async() => {
  try {
    const formData = new FormData();
    formData.append('file',files[0]);
    const res = await makeRequest.post('/upload',formData);
    return res.data;
    
  } catch (error) {
    console.log(error);
  }
}



const createNewBlog = async (e) => {
   e.preventDefault();
   const imgURL = await upload();
   const formData = {
      title,
      summary,
      author,
      content,
      imgURL
   }
   console.log(formData);
   const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', imgURL);


    const response = await makeRequest.post('/posts/blog', formData);
    
    if(response.status === 200){
      setRedirect(true);
    }
    console.log(redirect);
 }

 if(redirect){
  return <Navigate to={'/resources'} />
}

  return (
  <div className="create-blog">
    <form onSubmit={createNewBlog}>
    <input type="title"
           placeholder={'Title'}
           value={title}
           onChange={ev => setTitle(ev.target.value)} />
    <input type="summary"
           placeholder={'Summary'}
           value={summary}
           onChange={ev => setSummary(ev.target.value)} />
    <input type="author"
           placeholder={'Author'}
           value={author}
           onChange={ev => setAuthor(ev.target.value)} />
    <input type="file"
           onChange={ev => setFiles(ev.target.files)} />
    <Editor value={content} onChange={setContent} />
    <button style={{marginTop:'5px'}}>Create post</button>
  </form>
  </div>
  )
}

export default CreateBlog