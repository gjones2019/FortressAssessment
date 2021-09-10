import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
// import './styles.scss';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(
        'https://www.reddit.com/r/programmerhumor/top.json',
        () => {},
      )
      .then((response) => {
        let top20Data = response.data.data.children.slice(0, 20);
        let newData = [];
        let oddOrEven = (num) => {
            if (num % 2 == 0) {
                return true;
            } else{
                return false;
            }
        }
        top20Data.map((post, index) => {
        let newPost =
        {
            'index': index,
            'title': post.data.title, 
            'permalink': post.data.permalink,
            'author': post.data.author,
            'num_comments': post.data.num_comments,
            'ups': post.data.ups,
            'score': post.data.score,
            'link': `https://www.reddit.com${post.data.permalink}`,
            'even': oddOrEven(post.data.score)
        }
        newData.push(newPost);
        })
        setData(newData);
    }).catch((err) => console.warn('ERROR', err));
  }, []);
   
  if (data.sort((a,b) => b.num_comments - a.num_comments).map(post => post.title !== '' || null || undefined)) {
    return (
        <table>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Comments</th>
                    <th>Ups</th>
                </tr>
            </thead>
            <tbody>
            {data.map((post, index) => (
                <tr key={index} style={post.even === true ? {backgroundColor: '#FFB74D'} : {backgroundColor: '#0277BD'} }>
                <td>{index}</td>
                <td>
                    <a href={`https://www.reddit.com${post.permalink}`}>
                        {post.title}
                    </a>
                </td>
                <td>{post.author}</td>
                <td>{post.num_comments}</td>
                <td>{post.ups}</td>
                </tr>
                ))}
            </tbody>
        </table>
    )
} else {return null}
}

export default App;


// {data.map((post) => (
//     <div>
//         test
//       {/* {post.data.title}      */}
//       {/* {post.data.permalink} */}
//       {/* {post.data.author} */}
//       {/* {post.data.num_comments} */}
//       {/* {post.data.ups} */}
//     </div>
// ))}