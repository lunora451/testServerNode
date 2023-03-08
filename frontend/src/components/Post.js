import React from "react";

const Post = ({ post }) => {
  /*
      axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
*/

  return (
    <li className="post">
      <p>{post.message}</p>
    </li>
  );
};
export default Post;
