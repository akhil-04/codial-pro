{

    //method to submit form data for new post using AJAX method
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();


            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    //console.log(data);
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container > ul'). prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                }, error:function(err){
                    console.log(error.responseText);
                }
            });
        });
    }


    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <p>
            
                <small>
                        <a class="delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                </small>
            
                ${ post.content }
                <br>
                <small>
                ${ post.user.name }    
                </small>    
        </p>
    
        <div class="post-container">
       
        <form action="/comments/create" method="POST">
        <input type="text" name="content" placeholder="Type comment here.." required >
        <input type="hidden" name="post" value="${post._id}">
        <input type="submit" value="Add Comment"> 
        </form>
      
    
        <div class="post-comments-list">
                <ul id="post-comments-${post._id}">
                        <% for(comment of post.comments) { %>
    
                            <!-- linking of _comment.ejs to home.ejs -->
                           <%- include('_comments') -%>
    
    
                            <% } %>                        
                </ul>
        </div>
    
    </div>
    </li>`)
    }


    createPost();

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $('#delete').click (function(e){
            e.preventDefault

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    $(`#post-${data.data.post._id}`).remove();
                },error:function(data){
                    console.log(responseText);
                }
            });
        });
    }

}