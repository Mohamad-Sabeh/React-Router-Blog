import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';

import { format } from 'date-fns';

import { Route, Switch, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {

    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "My First Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 2,
            title: "My 2nd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 3,
            title: "My 3rd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 4,
            title: "My Fourth Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        }
    ]);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');

    const history = useHistory();

    useEffect(() => {

        const filteredResults = posts.filter(post =>
            post.body.toLowerCase().includes(search.toLowerCase()) ||
            post.title.toLowerCase().includes(search.toLowerCase())
        );

        setSearchResults([...filteredResults].reverse());

    }, [posts, search]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = posts.length
            ? posts[posts.length - 1].id + 1
            : 1;

        const datetime = format(
            new Date(),
            'dd MMMM, yyyy pp'
        );

        const newPost = {
            id,
            title: postTitle,
            datetime,
            body: postBody
        };

        const allPosts = [...posts, newPost];

        setPosts(allPosts);

        setPostTitle('');
        setPostBody('');

        history.push('/');
    };

    const handleDelete = (id) => {

        const postList = posts.filter(
            post => post.id !== id
        );

        setPosts(postList);

        history.push('/');
    };

    return (
        <div className="App">

            <Header title="React JS Blog" />

            <Nav
                search={search}
                setSearch={setSearch}
            />

            <Switch>

                <Route exact path="/">
                    <Home posts={searchResults} />
                </Route>

                <Route exact path="/Post">
                    <NewPost
                        handleSubmit={handleSubmit}
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postBody={postBody}
                        setPostBody={setPostBody}
                    />
                </Route>

                <Route path="/Post/:id">
                    <PostPage
                        posts={posts}
                        handleDelete={handleDelete}
                    />
                </Route>

                <Route
                    path="/About"
                    component={About}
                />

                <Route
                    path="*"
                    component={Missing}
                />

            </Switch>

            <Footer />

        </div>
    );
}

export default App;