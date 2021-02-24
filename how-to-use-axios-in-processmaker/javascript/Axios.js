
const host = PMDynaform.getHostName(); /* get the hostname */
const ws = PMDynaform.getWorkspaceName(); /* get the current workspace */
const token = PMDynaform.getAccessToken(); /* get the access Token */
const app_uid = frames.app_uid ? frames.app_uid : ''; /* get the case ID */

const postsTrigUid = "5981547606035f2a5306d74085295262"; /* Trigger ID of 'Get All Posts' */
const todosTrigUid = "2269777596035f2b352c5b0067833332"; /* Trigger ID of 'Get All Todos' */
const userTrigUid = "57622575360369f3db62b44094157946"; /* Trigger ID of 'Get User' */

/* AXIOS GLOBALS - set default global config */
axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;



/* get posts */
document.getElementById('btnGetPosts').addEventListener('click', function() {

  getPosts()
  .then(postsResponse => {
 
    showOutput({id: 'panelPostsResult', data: postsResponse.data});
    
  })

});



/* get todos and posts */
document.getElementById('btnGetTodos').addEventListener('click', function() {
  
  Promise.all([getPosts(), getTodos()])
  .then(function (results) {
    const posts = results[0];
    const todos = results[1];
    
    showOutput({id: 'panelPostsResult', data: posts.data});
    showOutput({id: 'panelTodosResult', data: todos.data});
    
  });

});


/* get user */
document.getElementById('btnGetUser').addEventListener('click', function() {
  
  let id;
  id = $('#userId').getValue();
  
  let getUserResponse = getUser(id);

  getUserResponse
  .then(userResponse => {
 
    showOutput({id: 'panelUserResult', data: userResponse.data});
    console.log(userResponse);
    
  })

});


function showOutput(output) {

  document.getElementById(output.id).innerHTML = `
		<pre>${JSON.stringify(output.data, null, 2)}</pre>
  `;

}


function getPosts() {
  const url = host + "/api/1.0/" + ws + "/cases/" + app_uid + "/execute-trigger/" + postsTrigUid;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
	
  return axios({

    method: 'put',
    url: url,
    config

  })
  

}

function getTodos() {
  const url = host + "/api/1.0/" + ws + "/cases/" + app_uid + "/execute-trigger/" + todosTrigUid;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
	
  return axios({

    method: 'put',
    url: url,
    config

  })
  

}

function getUser($id) {
  
  const url = host + "/api/1.0/" + ws + "/cases/" + app_uid + "/execute-trigger/" + userTrigUid;
  const data = JSON.stringify({ id: $id });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
	
  
  return axios({

    method: 'put',
    url: url,
    data,
    config

  })
  
  
}









