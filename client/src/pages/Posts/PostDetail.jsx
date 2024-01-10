import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from 'axios';


const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    
    const [isClicked, setIsClicked] = useState(false);
    const [isClickedDislike, setIsClickedDislike] = useState(false);

  const handleClickLike = async e => {
    
    if (isClicked) {
        await axios.post(`/api/posts/${postId}/like`, {likeType:"dislike"} );
        setLikes(likes - 1);
    } else {
        await axios.post(`/api/posts/${postId}/like`, {likeType:"like"} );
        setLikes(likes + 1);
        if (isClickedDislike)
        {
            await axios.post(`/api/posts/${postId}/like`, {likeType:"like"} );
            setDislikes(isClickedDislike-1)
            setIsClickedDislike(false);
        }
    }
    setIsClicked(!isClicked);
  };

  const handleClickDislike = async e => {
    if (isClickedDislike) {
        await axios.post(`/api/posts/${postId}/like`, {likeType:"like"} );
        setDislikes(dislikes - 1);
    } else {
        await axios.post(`/api/posts/${postId}/like`, {likeType:"dislike"} );
        setDislikes(dislikes + 1);
        if (isClicked) {
            await axios.post(`/api/posts/${postId}/like`, {likeType:"dislike"} );
            setLikes(likes - 1);
            setIsClicked(false);
        }
    }
    setIsClickedDislike(!isClickedDislike);
  };


    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post(`/api/posts/${postId}/comments`, { content });
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    };

    function compareByDate(a, b) {
        if (a.publishDate > b.publishDate) {
            return -1; // a повинен бути перед b
          } else if (a.publishDate < b.publishDate) {
            return 1; // b повинен бути перед a
          } else {
            return 0; // a і b рівні
          }
      }

      function DataFormat(dateIn)
      {
        return dateIn.replace(/[TZ]/g, ' ').replace(/-/g, '.')
      }

    useEffect(() => {
        fetch(`/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => {setPost(data.post); setComments(data.comments.sort(compareByDate)); })
            .catch((error) => console.error('Error fetching category details:', error));
    }, [postId]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {                
                const responseUser = await axios.get('/api/users');
                setUsers(responseUser.data.rows);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}/like`);
                setLikes(response.data.countLike);
                setDislikes(response.data.countDislike);
                if(response.data.myChoose == "like")
                {
                    setIsClicked(true);
                }
                else if(response.data.myChoose == "dislike")
                {
                    setIsClickedDislike(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchLikes();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    

    return (
        <>
        <div>
                <div >
                    <p><h3>{post.title}</h3></p>
                    <p>{post.content}</p>
                    <p>{post.publishDate}</p>
                    <p><Link to={`/posts/${postId}/edit`}>Edit</Link></p>
                    <br></br>
                </div>
                <div><button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClickLike }>
                    <span className="likes-counter">{ `Like | ${likes}` }</span>
                    </button><button className={ `like-button ${isClickedDislike && 'liked'}` } onClick={ handleClickDislike }>
                    <span className="likes-counter">{ `Dislike | ${dislikes}` }</span>
                    </button>
                    </div>
                <div>
                <div>
                    <h2>Create Comment</h2>
                    <form onSubmit={handleSubmit}>
                        <textarea value={content} onChange={e => setContent(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                
            <h2>Comments</h2>
                {comments.map(comment => (
                <div key={comment.id}>                    
                    <p>{users.find(x => x.id === comment.author)?.full_name || "Unknown"} ({DataFormat(comment.publishDate)} ) :
                    {comment.content}</p>
                </div>
            ))}
        </div>
        </div>
         <style>
         {`
         .like-button {
             front-size:1rem;
             padding:5px 10px;
             color: #585858;
         }
         .liked{
             front-weight: bold;
             color: #FFA500;
         }`}
     </style>
     </>
    );
};

export default PostDetail;
